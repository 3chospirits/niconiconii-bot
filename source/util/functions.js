const colors = require('colors');

const display = (message = '', type) => {
  switch (type) {
    case 'warn':
      console.log(colors.blue('warn\u0020').concat(message));
      break;
    case 'error':
      console.log(colors.red('error\u0020').concat(message));
      break;
    default:
      console.log(colors.yellow('log\u0020').concat(message));
      break;
  }
};

module.exports = {
  display,
};
