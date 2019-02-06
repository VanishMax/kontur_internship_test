parseTodos = (files) => {
  var regexp = /\/\/ ?todo ?.*?\n/gi;

  let todos = [];
  files.forEach( (file) => {
    if(file.name.length > 15){
      file.name = file.name.substr(0, 12) + '...'
    }

    file.content = file.content.match(regexp) || [];
    file.content = file.content.forEach( (todo) => {
      let todoSplitted = todo.split(/;/);
      let todoReady = parseTodo(todoSplitted);
      todoReady.file = file.name;
      todos.push( todoReady );
    });
  });
  return todos;
};

parseTodo = (todoSplitted) => {

  let user = todoSplitted[0].match(/todo ?(.*)/i)[1].trim();
  if(user.length > 10){
    user = user.substr(0, 7) + '...'
  }

  let date = todoSplitted[1].trim();
  if(date.length > 10){
    date = date.substr(0, 7) + '...'
  }

  let comment = todoSplitted[todoSplitted.length - 1].match(/ ?(.*)\n/i)[1].trim();
  if(comment.length > 50){
    comment = comment.substr(0, 47) + '...'
  }

  let importantArr = todoSplitted[todoSplitted.length - 1].match(/!/g);
  let important = importantArr ? importantArr.length : 0;

  return {
    important: important,
    user: user,
    date: date,
    comment: comment
  };
};

printTodo = (todos) => {

  // What is the length of the cells of the printed table
  let counts = { user: 4, date: 4, comment: 7, file: 4, todos: 0 };

  // Count the length
  todos.forEach( (todo) => {
    counts.todos++;
    if(todo.user.length > counts.user) counts.user = todo.user.length;
    if(todo.date.length > counts.date) counts.date = todo.date.length;
    if(todo.comment.length > counts.comment) counts.comment = todo.comment.length;
    if(todo.file.length > counts.file) counts.file = todo.file.length;
  });

  let printTodos = ['  !  |  user', ' '.repeat(counts.user - 4),
    '  |  date', ' '.repeat(counts.date - 4),
    '  |  comment', ' '.repeat(counts.comment - 7),
    '  |  fileName', ' '.repeat(counts.name - 8), '  \n',
    '-'.repeat(counts.user + counts.file + counts.date + counts.comment + 25), '\n'];

  // Print everything
  todos.forEach( (todo) => {
    if(todo.important) {
      printTodos.push('  !  |');
    } else {
      printTodos.push('     |');
    }
    printTodos.push(' '.repeat(2) + todo.user + ' '.repeat(counts.user - todo.user.length + 2) + '|');
    printTodos.push(' '.repeat(2) + todo.date + ' '.repeat(counts.date - todo.date.length + 2) + '|');
    printTodos.push(' '.repeat(2) + todo.comment + ' '.repeat(counts.comment - todo.comment.length + 2) + '|');
    printTodos.push(' '.repeat(2) + todo.file + ' '.repeat(counts.file - todo.file.length + 2) + '\n');
  });
  if(counts.todos !== 0) printTodos.push('-'.repeat(counts.user + counts.name + counts.date + counts.comment + 25) + '\n');

  return printTodos.join('');
};

// TODO max; 04-02-2019; it is not a difficult task at all

module.exports = {
  parseTodos,
  parseTodo,
  printTodo
};
