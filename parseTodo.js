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

// printTodo = (files) => {
//
//   // What is the length of the cells of the printed table
//   let counts = { user: 0, date: 0, comment: 0, name: 0 };
//
//   // Count the length
//   for(let file in files) {
//     console.log(file);
//     if(file.name.length > counts.name) counts.name = file.name.length;
//     for(let todo in file.content) {
//       if(todo.user.length > counts.user) counts.user = todo.user.length;
//       if(todo.date.length > counts.date) counts.date = todo.date.length;
//       if(todo.comment.length > counts.comment) counts.comment = todo.comment.length;
//     }
//   }
//
//   let printTodos = ['  !  |  user', ' '.repeat(counts.user - 4),
//     '  |  date', ' '.repeat(counts.date - 4),
//     '  |  comment', ' '.repeat(counts.comment - 7),
//     '  |  fileName', ' '.repeat(counts.name - 8), '  \n',
//     '_'.repeat(counts.user + counts.name + counts.date + counts.comment + 25), '\n'];
//   console.log(printTodos.join());
//   // Print everything
//   // for(file in files) {
//   //   for(todo in file.content) {
//   //   }
//   // }
// };

// TODO max; 04-02-2019; it is not a difficult task at all

module.exports = {
  parseTodo,
  printTodo
};
