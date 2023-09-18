import fs, { readFileSync } from 'fs';
import https from 'https';
import express from 'express';
import {Response} from 'express-serve-static-core';
import ListlabApiConfig from 'listlab-api/ListlabApiConfig';
import ReactDOMServer from 'react-dom/server';
import React from 'react';

type SsrComponentType = React.ComponentType<{ssr: boolean, config: ListlabApiConfig}>;

export type ListlabBuildHtmlRoute = {
  jsPayloadName: string,
  expressPath: string,
  buildPath: string,
  amplitudeAppPath?: string,
  ssrComponent?: SsrComponentType,
};

const localListlabApiConfig: Partial<ListlabApiConfig> = {
  Env: 'local',
  WebAddress: 'https://www.local.listlab.io:3004',
  AppAddress: 'https://app.local.listlab.io:3006',
  InternAddress: 'https://intern.local.listlab.io:3007',
  StaticAddress: 'https://static.local.listlab.io',
  RootDomain: 'local.listlab.io',
  TaskServiceAddress: 'https://api.local.listlab.io/tasks',
  AuthServiceAddress: 'https://api.local.listlab.io/sts',
  UserServiceAddress: 'https://api.local.listlab.io/users',
  NotificationServiceAddress: 'https://api.local.listlab.io/notifications',
  CommentServiceAddress: 'https://api.local.listlab.io/comments',
  ListServiceAddress: 'https://api.local.listlab.io/lists',
  RootServiceAddress: 'https://api.local.listlab.io',
  TaskSyncWsServiceAddress: 'wss://api.local.listlab.io/tasksync',
};

const prodListlabApiConfig: Partial<ListlabApiConfig> = {
  Env: 'prod',
  WebAddress: 'https://www.listlab.io',
  AppAddress: 'https://app.listlab.io',
  InternAddress: 'https://intern.listlab.io',
  StaticAddress: 'https://static.listlab.io',
  RootDomain: 'listlab.io',
  TaskServiceAddress: 'https://api.listlab.io/tasks',
  AuthServiceAddress: 'https://api.listlab.io/sts',
  UserServiceAddress: 'https://api.listlab.io/users',
  NotificationServiceAddress: 'https://api.listlab.io/notifications',
  CommentServiceAddress: 'https://api.listlab.io/comments',
  ListServiceAddress: 'https://api.listlab.io/lists',
  RootServiceAddress: 'https://api.listlab.io',
  TaskSyncWsServiceAddress: 'wss://api.listlab.io/tasksync',
};

const getTarget = () => {
  const targetArgStr = process.argv.find(a => a.startsWith('-target'));
  if (targetArgStr) {
    const splitArgAndVal = targetArgStr.split('=');
    if (splitArgAndVal.length !== 2) {
      throw new Error('Invalid target given');
    }
    const target = splitArgAndVal[1];
    if (target !== 'prod' && target !== 'local') {
      throw new Error('Invalid target given. Must be prod or local.');
    }
    return target;
  } else {
    return 'prod';
  }
};
const target = getTarget();

const config = target === 'local' ? localListlabApiConfig : prodListlabApiConfig;

// Replace the content placeholder in the template with the rendered React component
export const replaceEnvVariablesInTemplate = (params: {
  templateStr: string,
  jsPayloadName: string,
  jsPayloadPort: number,
  staticVersion: string,
  env: 'local' | 'prod',
  amplitudeAppPath?: string,
}) => {
  const {jsPayloadName, staticVersion, env, templateStr, jsPayloadPort, amplitudeAppPath} = params;

  let html = templateStr
    .split('%LISTLAB_ENV%').join(env)
    .split('%LISTLAB_DOMAIN_ROOT%').join(config.RootDomain)
    .split('%LISTLAB_ADDRESS_STATIC%').join(config.StaticAddress)
    .split('%LISTLAB_STATIC_VERSION%').join(staticVersion)
    .split('%AMPLITUDE_APP_PATH%').join(amplitudeAppPath || 'null')
    .split('%LISTLAB_API_CONFIG_JSON%').join(JSON.stringify(config));

  if (env === 'local') {
    html = html
      .split('%LISTLAB_ADDRESS_APP_WEBPACK%').join(`//static.${config.RootDomain}:3000`)
      .split('%LISTLAB_ADDRESS_WWW_WEBPACK%').join(`//static.${config.RootDomain}:3005`)
      .split('%LISTLAB_JS_PAYLOAD_LOCATION%')
      .join(`//static.${config.RootDomain}:${jsPayloadPort}/${jsPayloadName}.js?v=${staticVersion}`)

  } else {
    html = html
      .split('%LISTLAB_ADDRESS_APP_WEBPACK%').join(`//static.${config.RootDomain}/js`)
      .split('%LISTLAB_ADDRESS_WWW_WEBPACK%').join(`//static.${config.RootDomain}/js`)
      .split('%LISTLAB_JS_PAYLOAD_LOCATION%')
      .join(`//static.${config.RootDomain}/js/${jsPayloadName}.js?v=${staticVersion}`)
  }

  return html;
};

const buildHtml = (route: ListlabBuildHtmlRoute, jsPayloadPort: number, version: string) => {
  const {jsPayloadName, ssrComponent, amplitudeAppPath} = route;
  const template: string = readFileSync('../listlab-build/template.html', 'utf8');
  const html = replaceEnvVariablesInTemplate({
    templateStr: template,
    jsPayloadName,
    staticVersion: version,
    env: target,
    jsPayloadPort,
    amplitudeAppPath
  });
  if (ssrComponent == null) {
    return html.replace('%LISTLAB_CONTENT%', '');
  } else {
    const ssrComponentHtml = ReactDOMServer.renderToString(
      React.createElement(ssrComponent, {ssr: true, config: config as ListlabApiConfig})
    );
    return html.replace('%LISTLAB_CONTENT%', ssrComponentHtml);
  }
};

export const startHtmlServer = (args: {
  routes: Array<ListlabBuildHtmlRoute>,
  port: number,
  jsPayloadPort: number,
  version: string,
}) => {
  const {routes, port, jsPayloadPort, version} = args;
  const outputInsteadOfServer = process.argv.find(a => a === '-o');
  const app = express();

  if (outputInsteadOfServer) {
    for (const route of Object.values(routes)) {
      const buildPath = route.buildPath;
      const html = buildHtml(route, jsPayloadPort, version);
      const outputBaseDir = `./build/${target}/html`;
      const outputDir = `${outputBaseDir}${buildPath.substring(0, buildPath.lastIndexOf('/'))}`;
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, {recursive: true});
      }
      fs.writeFileSync(`${outputBaseDir}${buildPath}.html`, html);
    }
  } else {
    for (const route of Object.values(routes)) {
      const expressPath = route.expressPath;
      app.get(expressPath, (_: any, res: Response) => {
        const html = buildHtml(route, jsPayloadPort, version);
        res.send(html);
      });
    }

    https.createServer({
      key: fs.readFileSync(`../listlab-secrets/${target === 'local' ? 'local.listlab.io.key' : 'listlab.io.key'}`),
      cert: fs.readFileSync(`../listlab-secrets/${target === 'local' ? 'local.listlab.io.crt' : 'listlab.io.crt'}`),
    }, app).listen(port, () => {
      console.log(`HTML server started on port ${port}`);
    });
  }
}