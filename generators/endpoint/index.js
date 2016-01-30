'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var ejs = require('ejs');
var find_up = require('find-up');

var base_path = path.dirname(find_up.sync('.yo-rc.json', {}));
var app_name = base_path.split(path.sep).pop().toLowerCase() + "App";

String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.splice = function(idx, str) {
  return this.slice(0, idx) + str + this.slice(idx);
};

String.prototype.set_path_to = function(file) {
  return this + "/" + file;
};

module.exports = yeoman.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the classy ' + chalk.red('generator-python-parse') + ' generator!'
    ));

    var prompts = [{
        validate: function(input) {
          if (input.length === 0)
          {
            return 'This field is required. Enter a name';
          }
          return true;
        },
        type: 'input',
        name: 'endpoint',
        message: 'What do you want to call your new endpoint'
      },{
        validate: function(input) {
          if (input.length === 0)
          {
            return 'This field is required. Enter a name';
          }
          return true;
        },
        type: 'input',
        name: 'table',
        message: 'What database table do you want this endpoint to connect to'
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {
    var endpoint_name = this.props.endpoint;
    var file_name;
    var lower_case_endpoint_name = endpoint_name.toLowerCase();
    var formal_endpoint_name = endpoint_name.capitalizeFirstLetter();
    var options  =  { 
      endpoint: formal_endpoint_name,
      endpoint_lowercase: lower_case_endpoint_name,
      app_name: app_name,
      table: this.props.table
    };

    // Create new form file
    file_name = lower_case_endpoint_name + '_form.py';
    this.fs.copyTpl(
      this.templatePath('form_template.py'),
      this.destinationPath('src/forms/'.set_path_to(file_name)),
      options
    );

    // Create new controller file
    file_name = lower_case_endpoint_name + '_controller.py';
    this.fs.copyTpl(
      this.templatePath('controller_template.py'),
      this.destinationPath('src/controllers/'.set_path_to(file_name)),
      options
    );
    
    // Create new model file
    file_name = lower_case_endpoint_name + '_model.py';
    this.fs.copyTpl(
      this.templatePath('model_template.py'),
      this.destinationPath('src/models/'.set_path_to(file_name)),
      options
    );

    // Create new test file
    file_name = 'test_' + lower_case_endpoint_name + '.py';
    this.fs.copyTpl(
      this.templatePath('test_template.py'),
      this.destinationPath('test/live/integration/'.set_path_to(file_name)),
      options
    );

    // Add BaseClass to controllers/__init__.py
    var path = this.destinationPath('src/controllers/__init__.py');
    var current_init_controller = this.fs.read(path);
    path = this.templatePath('init_template.py');
    var new_init_controller = this.fs.read(path);
    new_init_controller = ejs.render(new_init_controller, options);
    new_init_controller = current_init_controller + '\n' + new_init_controller;

    var import_position = new_init_controller.indexOf('# MARKED: DO NOT REMOVE THIS LINE');
    path = this.templatePath('init_import_template.py');
    var init_import = this.fs.read(path);
    init_import = ejs.render(init_import, options);
    new_init_controller = new_init_controller.splice(import_position, init_import + '\n');
    this.write(this.destinationPath('src/controllers/__init__.py'), new_init_controller);

  },

  install: function () {
    // this.installDependencies();
  }
});
