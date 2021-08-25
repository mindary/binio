const {mergeMochaConfigs} = require('@loopback/build');
const defaultConfig = require('@loopback/build/config/.mocharc.json');

const MONOREPO_CONFIG = {
  parallel: true,
};

module.exports = mergeMochaConfigs(defaultConfig, MONOREPO_CONFIG);
