'use strict';
var fs = require('fs');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var findUp = require('find-up');

var base_path = path.dirname(findUp.sync('.yo-rc.json', {}));
var app_name = base_path.split(path.sep).pop().toLowerCase() + "App";

String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.set_path_to = function(file) {
  return this + "/" + file;
}

function get_directories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

function get_files(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isFile();
  });
}

var Generator = module.exports = yeoman.generators.Base.extend({

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
        type: 'list',
        name: 'operation',
        message: 'What operation do you want:',
        choices: [ 'Create project', 'Add endpoint']
      },{
        when: function (response) {
          return response.operation === 'Create project'
        },
        type: 'input',
        name: 'virtualenv',
        message: 'What do you want to call your virtualenv directory',
        default: 'env'
      },{
        when: function (response) {
          return response.operation === 'Add endpoint'
        },
        type: 'input',
        name: 'endpoint',
        message: 'What do you want to call your new endpoint'
      }
    ];

    // when: function (props) {
    //   return !gulp && (props.bootstrap && compass);
    // }

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {
    if (typeof this.props.endpoint !== 'undefined') {

      var lower_case_endpoint_name;
      var formal_endpoint_name;
      var endpoint_name;

      endpoint_name = this.props.endpoint;
      lower_case_endpoint_name = endpoint_name.toLowerCase();
      formal_endpoint_name = endpoint_name.capitalizeFirstLetter();

      this.fs.copyTpl(
        this.templatePath('form_template.py'),
        this.destinationPath(lower_case_endpoint_name + '_form.py'),
        { title: formal_endpoint_name }
      );
    } else {
      // this.fs.copy(
      //   this.templatePath('python-parse/requirements.txt'),
      //   this.destinationPath('requirements.txt')
      // );

      // this.fs.copyTpl(
      //   this.templatePath('python-parse/app.py'),
      //   this.destinationPath('app.py'),
      //   {app_name: app_name}
      // );

      // this.fs.copyTpl(
      //   this.templatePath('python-parse/config'),
      //   this.destinationPath('config'),
      //   {}
      // );

      // this.fs.copyTpl(
      //   this.templatePath('user_controller.py'),
      //   this.destinationPath('user_controller.py'),
      //   {app_name: app_name}
      // );
      
      // Clone all templates in 'src' folder
      // var dirs = get_directories(this.templatePath('python-parse/src'));
      // for (var i = 0; i < dirs.length; i++) {
      //   var from_dir_path = this.templatePath('python-parse/src').set_path_to(dirs[i]);
      //   var to_dir_path = 'src'.set_path_to(dirs[i]);
      //   var files = get_files(from_dir_path);

      //   if (dirs[i] !== 'static') {
      //     for (var index = 0; index < files.length; index++) {
      //       var from_path = from_dir_path.set_path_to(files[index]);
      //       var to_path = to_dir_path.set_path_to(files[index]);
      //       this.fs.copyTpl(
      //         this.templatePath(from_path),
      //         this.destinationPath(to_path),
      //         {app_name: app_name}
      //       );
      //     };
      //   };
      // };

      function clone_files_in_dir(srcpath, subpath)
      {
        if (fs.statSync(srcpath).isDirectory()) {
          return false;
        } else {
          var file_name = path.basename(srcpath);
          var relative_file_path;
          if (subpath === undefined) {
            relative_file_path = file_name;
          } else {
            relative_file_path = subpath + "/" + file_name;
          }
          // console.log(file_name)
          // console.log(relative_file_path)
          this.fs.copyTpl(
            this.templatePath(from_path),
            this.destinationRoot(to_path),
            {app_name: app_name}
          );
        }
      }
      console.log(clone_files_in_dir(this.templatePath('test/app.py')));
      // console.log(clone_files_in_dir('user_controller.py'));

      // this.fs.copy(
      //   this.templatePath('python-parse/test'),
      //   this.destinationPath('test')
      // );

      // this.fs.copy(
      //   this.templatePath('python-parse/bin'),
      //   this.destinationPath('bin')
      // );

      // this.fs.copy(
      //   this.templatePath('python-parse/.coveragerc'),
      //   this.destinationPath('.coveragerc')
      // );
    }
  },

  install: function () {
    // this.spawnCommand('virtualenv', [this.props.virtualenv]);
  },

  end: function () {
    // this.log(yosay(
    //   'You need to activate virtualenv by running ' + chalk.red("source ".concat(this.props.virtualenv.concat("/bin/activate"))) 
    //     + ' and install all dependencies by running ' + chalk.red("bin/install")
    // ));
  }
});