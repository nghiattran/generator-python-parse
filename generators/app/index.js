'use strict';
var fs = require('fs');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var findUp = require('find-up');

var base_path = path.dirname(findUp.sync('.yo-rc.json', {}));
var app_name = base_path.split(path.sep).pop().toLowerCase() + 'App';


String.prototype.set_path_to = function(file) {
  return this + '/' + file;
};

module.exports = yeoman.Base.extend({

  config: function() {
    this.config.set();
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the luminous ' + chalk.red('generator-python-parse') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'virtualenv',
        message: 'What do you want to call your virtualenv directory',
        default: 'env'
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {
    this.clone_files_in_dir = function(srcpath, despath, option)
    {
      var full_srcpath = this.templatePath(srcpath);
      if (fs.statSync(full_srcpath).isDirectory()) {
        var files = fs.readdirSync(full_srcpath);
        for (var i = 0; i < files.length; i++) {
          if (files[i] === 'static') {
            this.fs.copy(
              this.templatePath(srcpath.set_path_to(files[i])),
              this.destinationPath(despath.set_path_to(files[i]))
            );
          } else {
            this.clone_files_in_dir(
              srcpath.set_path_to(files[i]),
              despath.set_path_to(files[i]),
              option
            );
          }
        }
      } else {
        this.fs.copyTpl(
          this.templatePath(srcpath),
          this.destinationPath(despath),
          option
        );
      }
    };


    this.fs.copy(
      this.templatePath('python-parse/requirements.txt'),
      this.destinationPath('requirements.txt')
    );

    this.fs.copyTpl(
      this.templatePath('python-parse/app.py'),
      this.destinationPath('app.py'),
      {app_name: app_name}
    );

    this.fs.copy(
      this.templatePath('python-parse/config'),
      this.destinationPath('config')
    );

    var option = {app_name: app_name};
    this.clone_files_in_dir('python-parse/src', 'src',option);
    this.clone_files_in_dir('python-parse/test', 'test',option);

    this.fs.copy(
      this.templatePath('python-parse/bin'),
      this.destinationPath('bin')
    );

    this.fs.copy(
      this.templatePath('python-parse/.coveragerc'),
      this.destinationPath('.coveragerc')
    );
  },

  install: function () {
    // this.spawnCommand('virtualenv', [this.props.virtualenv]);
  },

  end: function () {
    this.log(yosay(
      'You need to activate virtualenv by running ' + 
      chalk.red('source '.concat(this.props.virtualenv.concat('/bin/activate'))) +
      ' and install all dependencies by running ' + chalk.red('bin/install')
    ));
  }
});