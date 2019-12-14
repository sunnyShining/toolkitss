const defaultCfg = require('../../jest.config')

module.exports = {
  ...defaultCfg,
  'setupFilesAfterEnv': [
    './setup.enzyme.js'
  ],
  'testEnvironment': 'enzyme',
  rootDir: './'
}
