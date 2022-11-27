const fs = require('fs');
const path = require('path');
const {keyBy, mapValues, pickBy, includes} = require('lodash');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const listlabPackages = [
  'listlab-api',
  'listlab-chrome',
  'listlab-internweb',
  'listlab-web',
  'ququmber-ui'
];

const packagePaths = {
  'listlab-api': path.resolve(__dirname + '/../listlab-api-js'),
  'listlab-chrome': path.resolve(__dirname + '/../listlab-chrome'),
  'listlab-internweb': path.resolve(__dirname + '/../listlab-internweb'),
  'listlab-web': path.resolve(__dirname + '/../listlab-web'),
  'ququmber-ui': path.resolve(__dirname + '/../ququmber-ui'),
};

const sibilingPackages = (packageName) => {
  return listlabPackages.filter(p => p !== packageName);
};

const parseCommandLineArgs = (env) => {
  const api = env && env.api === 'local' ? 'local' : 'prod';
  const target = env && env.target === 'local' ? 'local' : 'prod';
  return {api, target};
};

const assertPackageName = (packageName) => {
  if (packageName == null) {
    throw 'eslintLoaderConfig: no package name';
  }
  if (!listlabPackages.includes(packageName)) {
    throw 'eslintLoaderConfig: package name unknown';
  }
};

const eslintPluginConfig = (packageName) => {
  assertPackageName(packageName);
  return new ESLintPlugin({
    extensions: ['ts', 'tsx'],
    files: [packagePaths[packageName]],
    exclude: [
      './bundles',
      './node_modules',
      ...sibilingPackages(packageName).map(p => packagePaths[p]),
    ],
    fix: true,
  });
};

const resolveConfig = (packageName) => {
  assertPackageName(packageName);
  return {
    extensions: ['.ts', '.tsx', '.js', '.sass'],
    alias: {
      [packageName]: path.resolve('src'),
      ...mapValues(
        keyBy(sibilingPackages(packageName)),
        p => path.resolve(`./node_modules/${p}/src`)
      ),
      'react': path.resolve('./node_modules/react'),
      'react-dnd': path.resolve('./node_modules/react-dnd'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    }
  };
};

const tsLoaderConfig = (target, disableHmr) => {
  return {
    test: /\.tsx?$/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          plugins: (target === 'local' && !disableHmr) ? [require.resolve('react-refresh/babel')] : [],
        },
      },
      'ts-loader'
    ],
    exclude: [
      /node_modules/,
    ]
  };
};

const externalsConfig = () => {
  return {
    'fb': {amd: 'fb', commonjs2: 'fb', commonjs: 'fb' },
    'gapi': { amd: 'gapi', commonjs2: 'gapi', commonjs: 'gapi' },
    'amplitude': { root: 'amplitude', commonjs2: 'amplitude', commonjs: 'amplitude' },
    'paypal': { root: 'paypal', commonjs2: 'paypal', commonjs: 'paypal' },
  };
};

const devServerConfig = (port) => ({
  inline: true,
  host: 'local.listlab.io',
  https: true,
  key: fs.readFileSync('../listlab-secrets/local.listlab.io.key'),
  cert: fs.readFileSync('../listlab-secrets/local.listlab.io.crt'),
  hot: true,
  allowedHosts: [
    '.listlab.io',
  ],
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
  }
});

const stylelintPluginConfig = () => {
  return new StyleLintPlugin({
    customSyntax: 'postcss-sass',
    files: '**/*.sass',
  });
}

module.exports = {
  eslintPluginConfig,
  resolveConfig,
  tsLoaderConfig,
  externalsConfig,
  parseCommandLineArgs,
  devServerConfig,
  stylelintPluginConfig
}