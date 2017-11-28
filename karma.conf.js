const {default: webpackTestConfig} = require('./webpack-test.config')
      // './test/*\.spec\.ts'

module.exports = (config) => {
  config.set({
    // Base path that will be used to resolve all patterns (eg. files, exclude).
    basePath: './',

    // Frameworks to use.
    // Available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'power-assert'],

    // List of files to load in the browser.
    files: [
      './test/test.ts'
    ],

    plugins: [
      require('karma-mocha'),
      require('karma-power-assert'),
      require('karma-sourcemap-loader'),
      require('karma-chrome-launcher'),
      require('karma-espower-preprocessor'),
      require('karma-spec-reporter'),
      require('karma-webpack')
    ],
    webpack: webpackTestConfig,

    // Preprocess matching files before serving them to the browser.
    // Available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/test.ts': ['webpack', 'sourcemap', 'espower'],
      './test/*\.spec\.ts': ['webpack', 'sourcemap', 'espower']
    },
    mime: {
      'text/x-typescript': [ 'ts' ]
    },

    coverageIstanbulReporter: {
      reports: ['text-summary', 'html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },

    // Test results reporter to use.
    // Possible values: 'dots', 'progress'.
    // Available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],

    // Level of logging
    // Possible values:
    // - config.LOG_DISABLE
    // - config.LOG_ERROR
    // - config.LOG_WARN
    // - config.LOG_INFO
    // - config.LOG_DEBUG
    logLevel: config.LOG_WARN,

    // Start these browsers.
    // Available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox', // required to run without privileges in docker
          '--user-data-dir=/tmp/chrome-test-profile',
          '--disable-web-security'
        ]
      }
    },

    browserConsoleLogOptions: {
      terminal: true,
      level: 'log'
    },

    singleRun: true,
    colors: true
  })
}
