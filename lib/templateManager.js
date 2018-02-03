const path = require('path');
const readline = require('readline');
const fs = require('fs');
const ncp = require('ncp');
const templatesRoot = path.join(__dirname, '..', 'templates');

module.exports = {

  /* eslint no-console: 0*/
  /* eslint no-sync: 0*/

  /**
   * Initializes project template in current or specified directory.
   *
   * @param {Object} options Command options.
   */
  initTemplate(options) {
    const parameters = {};
    parameters.destination = options.dest || process.cwd();

    if (!checkDestination(parameters.destination)) {
      return;
    }

    const isNotEmpty = fs.readdirSync(parameters.destination).some(name => name && name[0] !== '.');

    if (isNotEmpty) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      rl.question('Destination directory is not empty, continue? (y/n): ', answer => {
        answer = (answer || 'n').toLowerCase();

        if (answer[0] === 'y') {
          copyTemplateTo(parameters);
        }

        rl.close();
      });
    } else {
      copyTemplateTo(parameters);
    }
  }
};

/**
 * Copies project template to specified destination.
 *
 * @param {Object} parameters Parameters of copying.
 */
function copyTemplateTo(parameters) {
  const templateFolder = path.join(templatesRoot, 'empty');

  if (!fs.existsSync(templateFolder)) {
    console.log('\nNo such template. Templates are:\n');
    fs.readdirSync(templatesRoot).forEach(name => {
      if (name[0] === '.') {
        return;
      }
      console.log(` ${name}`);
    });
    console.log();
    return;
  }

  ncp(templateFolder, parameters.destination, error => {
    if (error) {
      console.error(error);
      return;
    }

    console.log(`\nProject has been deployed to "${parameters.destination}"\n`);
    console.log('Now install dependencies:\n\n\tnpm install --production\n');
    console.log('To start:\n\n\tnpm start\n');
  });
}

/**
 * Checks if destination exists.
 * @param {string} destination Path to destination folder.
 * @returns {boolean} If destination is valid.
 */
function checkDestination(destination) {
  if (!fs.existsSync(destination)) {
    console.log('Destination directory does not exist');
    return false;
  }

  if (!fs.statSync(destination).isDirectory()) {
    console.log('Destination is not a directory');
    return false;
  }

  return true;
}