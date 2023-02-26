'format cjs';

var wrap = require('word-wrap');
var map = require('lodash.map');
var longest = require('longest');
var chalk = require('chalk');

var filter = function(array) {
  return array.filter(function(x) {
    return x;
  });
};

var headerLength = function(answers) {
  return (
    answers.type.length + 2 + (answers.scope ? answers.scope.length + 2 : 0)
  );
};

var maxSummaryLength = function(options, answers) {
  return options.maxHeaderWidth - headerLength(answers);
};

var filterSubject = function(subject, disableSubjectLowerCase) {
  subject = subject.trim();
  if (!disableSubjectLowerCase && subject.charAt(0).toLowerCase() !== subject.charAt(0)) {
    subject =
      subject.charAt(0).toLowerCase() + subject.slice(1, subject.length);
  }
  while (subject.endsWith('.')) {
    subject = subject.slice(0, subject.length - 1);
  }
  return subject;
};

// This can be any kind of SystemJS compatible module.
// We use Commonjs here, but ES6 or AMD would do just
// fine.
module.exports = function(options) {
  var types = options.types;
  var scopes = options.scopes;

  var maxTypeLength = longest(Object.keys(types)).length + 1;
  var maxScopeLength = longest(Object.keys(scopes)).length + 1;
  var choiceMapping = function(maxLength) {
    return function(obj, key) {
      return {
        name: (key + ':').padEnd(maxLength) + ' ' + obj.description,
        value: key
      };
    };
  };
  var typeChoices = map(types, new choiceMapping(maxTypeLength));
  var scopeChoices = map(scopes, new choiceMapping(maxScopeLength));

  return {
    // When a user runs `git cz`, prompter will
    // be executed. We pass you cz, which currently
    // is just an instance of inquirer.js. Using
    // this you can ask questions and get answers.
    //
    // The commit callback should be executed when
    // you're ready to send back a commit template
    // to git.
    //
    // By default, we'll de-indent your commit
    // template and will keep empty lines.
    prompter: function(cz, commit) {
      // Let's ask some questions of the user
      // so that we can populate our commit
      // template.
      //
      // See inquirer.js docs for specifics.
      // You can also opt to use another input
      // collection library if you prefer.
      cz.prompt([
        {
          type: 'list',
          name: 'type',
          message: "Select the type:",
          choices: typeChoices,
          default: options.defaultType
        },
        {
          type: 'list',
          name: 'scope',
          message: 'Select the scope:',
          choices: scopeChoices,
          default: options.defaultScope,
          filter: function(value) {
            return options.disableScopeLowerCase
              ? value.trim()
              : value.trim().toLowerCase();
          },
          validate: function(subject, answers) {
            var filteredSubject = filterSubject(subject, options.disableSubjectLowerCase);
            return filteredSubject.length == 0
              ? 'This is mandatory'
              : true;
          }
        },
        {
          type: 'input',
          name: 'subject',
          message: function(answers) {
            return (
              'Describe the change (max ' +
              maxSummaryLength(options, answers) +
              ' chars):\n'
            );
          },
          default: options.defaultSubject,
          validate: function(subject, answers) {
            var filteredSubject = filterSubject(subject, options.disableSubjectLowerCase);
            return filteredSubject.length == 0
              ? 'This is mandatory'
              : filteredSubject.length <= maxSummaryLength(options, answers)
              ? true
              : 'The asnwer should have less than  ' +
                maxSummaryLength(options, answers) +
                ' chars.';
          },
          transformer: function(subject, answers) {
            var filteredSubject = filterSubject(subject, options.disableSubjectLowerCase);
            var color =
              filteredSubject.length <= maxSummaryLength(options, answers)
                ? chalk.green
                : chalk.red;
            return color('(' + filteredSubject.length + ') ' + subject);
          },
          filter: function(subject) {
            return filterSubject(subject, options.disableSubjectLowerCase);
          }
        },
        {
          type: 'input',
          name: 'issues',
          message: 'Add the number of the affected cards (example: #123,#345,#678):\n',
          validate: function(subject) {
            var filteredSubject = filterSubject(subject, options.disableSubjectLowerCase);
            return filteredSubject.length == 0
              ? 'This is mandatory'
              : true;
          }
        }
      ]).then(function(answers) {
        var wrapOptions = {
          trim: true,
          cut: false,
          newline: '\n',
          indent: '',
          width: options.maxLineWidth
        };

        // parentheses are only needed when a scope is present
        var scope = answers.scope ? '(' + answers.scope + ')' : '';

        // Hard limit this line in the validate
        var head = answers.type + scope + ': ' + answers.subject;

        // Wrap these lines at options.maxLineWidth characters
        var body = answers.body ? wrap(answers.body, wrapOptions) : false;

        // Apply breaking change prefix, removing it if already present
        var breaking = answers.breaking ? answers.breaking.trim() : '';
        breaking = breaking
          ? 'BREAKING CHANGE: ' + breaking.replace(/^BREAKING CHANGE: /, '')
          : '';
        breaking = breaking ? wrap(breaking, wrapOptions) : false;

        var issues = answers.issues ? wrap(answers.issues, wrapOptions) : false;

        head = `${head} [${issues}]`

        commit(filter([head, body, breaking, '']).join('\n\n'));
      });
    }
  };
};
