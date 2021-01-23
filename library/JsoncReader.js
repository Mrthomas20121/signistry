/*
  Jsonc reader by Mrthomas20121(https://github.com/Mrthomas20121) and Tefek(https://github.com/493msi)
*/

/**
 * read jsonc files
 * @param {string} file
 * @param {{ encoding?: string; flag?: string; } | string} options
 */
function reader(file, options='utf8') {
    const fs = require('fs');
    let data = fs.readFileSync(file, options);
    let lines = data.replace(/(\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$)/gm, '');
    return JSON.parse(lines);
  }
  
  
  module.exports = {
    read: reader
  }