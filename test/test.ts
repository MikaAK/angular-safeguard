import 'lodash'
import 'core-js'
import 'rxjs/Rx'
import 'zone.js/dist/zone'
import 'zone.js/dist/long-stack-trace-zone'
import 'zone.js/dist/async-test'
import 'zone.js/dist/fake-async-test'
import 'zone.js/dist/sync-test'
import 'zone.js/dist/proxy'
import 'zone.js/dist/mocha-patch'
import 'assert'

const {TestBed} = require('@angular/core/testing')

const {BrowserDynamicTestingModule, platformBrowserDynamicTesting} = require('@angular/platform-browser-dynamic/testing')

TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
)

const testsContext = require.context('./', true, /.*\.spec.*/)

testsContext.keys().forEach(testsContext)
