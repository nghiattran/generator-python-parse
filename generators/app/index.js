'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the luminous ' + chalk.red('generator-python-parse') + ' generator!'
    ));
    var str1 ="hello";
    var str2 = " world"

    var prompts = [{
      type: 'input',
      name: 'virtualenv',
      message: 'What do you want to call your virtualenv directory',
      default: 'env'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('python-parse/requirements.txt'),
      this.destinationPath('requirements.txt')
    );

    this.fs.copy(
      this.templatePath('python-parse/app.py'),
      this.destinationPath('app.py')
    );

    this.fs.copy(
      this.templatePath('python-parse/config'),
      this.destinationPath('config')
    );

    this.fs.copy(
      this.templatePath('python-parse/src'),
      this.destinationPath('src')
    );

    this.fs.copy(
      this.templatePath('python-parse/test'),
      this.destinationPath('test')
    );

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
    this.spawnCommand('virtualenv', [this.props.virtualenv]);
  },

  end: function () {
    this.log(yosay(
      'You need to activate virtualenv by running ' + chalk.red("source ".concat(this.props.virtualenv.concat("/bin/activate"))) 
        + ' and install all dependencies by running ' + chalk.red("bin/install")
    ));
  }
});
