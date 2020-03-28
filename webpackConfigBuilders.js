const path = require('path');
const {keyBy, mapValues, pickBy, includes} = require('lodash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const listlabPackages = [
  'listlab-api',
  'listlab-web',
  'ququmber-ui'
];

const packagePaths = {
  'listlab-api': path.resolve(__dirname + '/../listlab-api-js'),
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

const eslintLoaderConfig = (packageName) => {
  return {
    test: /\.tsx?$/,
    loader: ['eslint-loader'],
    include: [path.resolve(__dirname)],
    exclude: [
      /bundles/,
      /node_modules/,
      ...sibilingPackages(packageName).map(p => packagePaths[p]),
    ]
  };
};

const resolveConfig = (packageName) => {
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

const tsLoaderConfig = () => {
  return {
    test: /\.tsx?$/,
    use: [
      'babel-loader',
      'awesome-typescript-loader'
    ],
    exclude: [/node_modules/]
  };
};

const externalsConfig = () => {
  return {
    'fb': { amd: 'fb' },
    'gapi': { amd: 'gapi' },
    'amplitude': { amd: 'amplitude' }
  };
};

module.exports = {
  eslintLoaderConfig,
  resolveConfig,
  tsLoaderConfig,
  externalsConfig,
  parseCommandLineArgs
}