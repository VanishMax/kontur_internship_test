parseTodo = (files) => {
  var regexp = /\/\/ ?todo ?.*?\n/gi;
  return files.map( (file) => {
    file.content = file.content.match(regexp);
    file.content = file.content.map( (todo) => {
      let important = /!/.test(todo);
      let todoSplitted = todo.split(/;/);
      let user = todoSplitted[0].match(/todo ?(.*)/i)[1].trim();
      let date = todoSplitted[1].trim();
      let comment = todoSplitted[todoSplitted.length - 1].match(/ ?(.*)\n/i)[1].trim();
      if(comment.length >= 40){
        comment = comment.substr(0, 37) + '...'
      }
      return {
        full: todo,
        important: important,
        user: user,
        date: date,
        comment: comment
      };
    });
    return file;
  });
};

printTodo = (files) => {

  // What is the length of the cells of the printed table
  let counts = { user: 0, date: 0, comment: 0, name: 0 };

  // Count the length
  files.forEach( (file) => {
    if(file.name.length > counts.name) counts.name = file.name.length;
    file.content.forEach( (todo) => {
      if(todo.user.length > counts.user) counts.user = todo.user.length;
      if(todo.date.length > counts.date) counts.date = todo.date.length;
      if(todo.comment.length > counts.comment) counts.comment = todo.comment.length;
    });
  });

  let printTodos = ['  !  |  user', ' '.repeat(counts.user - 4),
    '  |  date', ' '.repeat(counts.date - 4),
    '  |  comment', ' '.repeat(counts.comment - 7),
    '  |  fileName', ' '.repeat(counts.name - 8), '  \n',
    '-'.repeat(counts.user + counts.name + counts.date + counts.comment + 25), '\n'];

  // Print everything
  files.forEach( (file) => {
    file.content.forEach( (todo) => {
      if(todo.important) {
        printTodos.push('  !  |');
      } else {
        printTodos.push('     |');
      }
      printTodos.push(' '.repeat(2) + todo.user + ' '.repeat(counts.user - todo.user.length + 2) + '|');
      printTodos.push(' '.repeat(2) + todo.date + ' '.repeat(counts.date - todo.date.length + 2) + '|');
      printTodos.push(' '.repeat(2) + todo.comment + ' '.repeat(counts.comment - todo.comment.length + 2) + '|');
      printTodos.push(' '.repeat(2) + file.name + ' '.repeat(counts.name - file.name.length + 2) + '\n');
    });
  });
  printTodos.push('-'.repeat(counts.user + counts.name + counts.date + counts.comment + 25) + '\n');

  return printTodos.join('');
};

// TODO max; 04-02-2019; it is not a difficult task at all

module.exports = {
  parseTodo,
  printTodo
};
