'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-python-parse:endpoint', function () {
  before(function (done) {
    helpers
      .run(path.join(__dirname, '../generators/endpoint'))
      .withGenerators([
        require.resolve('../generators/app'),
        [helpers.createDummyGenerator(), 'python-parse:app']
      ])
      .withOptions({someOption: true})
      .withPrompts({
        endpoint: 'test',
        table: '_User'
      })
      .on('ready', function (generator) {
      })
      .on('end', done);
  });

  // it('creates files', function () {
  //   assert.file([
  //     'src/controllers/test_controller.py',
  //     'src/forms/test_form.py',
  //     'src/models/test_model.py'
  //   ]);
  // });
});
