'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-python-parse:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({someOption: true})
      .withPrompts({someAnswer: true})
      .on('end', done);
  });

  it('creates bin folder', function () {
    assert.file([
      'bin', 
      'bin/clean', 
      'bin/cover', 
      'bin/install', 
      'bin/install_ec2',
      'bin/mock', 
      'bin/start', 
      'bin/start_redis', 
      'bin/test'
    ]);
  });

    it('creates config folder', function () {
    assert.file([
      'config', 
      'config/dev.json',
      'config/test.json'
    ]);
  });

  it('creates src folder', function () {
    assert.file([
      'src', 
      'src/controllers', 
      'src/forms', 
      'src/models', 
      'src/static',
      'src/templates', 
      'src/utils', 
      'src/__init__.py'
    ]);
  });

  it('creates src/controllers folder', function () {
    assert.file([
      'src/controllers/__init__.py',
      'src/controllers/user_controller.py'
    ]);
  });

  it('creates src/forms folder', function () {
    assert.file([
      'src/forms/__init__.py',
      'src/forms/user_form.py'
    ]);
  });

  it('creates src/models folder', function () {
    assert.file([
      'src/models/__init__.py',
      'src/models/authentication_model.py',
      'src/models/email_model.py',
      'src/models/sms_model.py',
      'src/models/user_model.py'
    ]);
  });

  it('creates src/utils folder', function () {
    assert.file([
      'src/utils/__init__.py'
    ]);
  });

  it('creates src/utils folder', function () {
    assert.file([
      'src/utils/__init__.py'
    ]);
  });

  it('creates test folder', function () {
    assert.file([
      'test',
      'test/live',
      'test/__init__.py'
    ]);
  });

  it('creates test/live folder', function () {
    assert.file([
      'test/live/integration/__init__.py',
      'test/live/integration/test_user.py'
    ]);
  });

  it('creates base files', function () {
    assert.file([
      '.coveragerc',
      'app.py'
    ]);
  });

});
