function parseTodo (files) {
  var regexp = /\/\/ ?todo ?.*?\n/gi;
  return files.map(function (file) {
    return file.match(regexp);
  });
}

// TODO max; 04-02-2019; it is not a difficult task at all

module.exports = {
  parseTodo
};
