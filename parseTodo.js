// Parses all the files to get the good format
parseTodos = (files) => {
  // RegExp for the todo string

  var regexp = /\/\/ ?todo ?.*?(\n|$)/gi;

  let todos = [];
  files.forEach( (file) => {

    // File content is a Todo string
    file.content = file.content.match(regexp) || [];
    file.content = file.content.forEach( (todo) => {
      // Split the todo with ';'. It is an array now
      let todoSplitted = todo.split(/;/);

      // If TODO does not have ';' - it should have only a comment
      // Explanation in the else {} section
      if(todoSplitted.length === 1) {

        let comment = todoSplitted[0].match(/todo ?(.*)\n?/i)[1].trim();

        let importantArr = comment.match(/!/g);
        let important = importantArr ? importantArr.length : 0;

        todos.push({
          important: important,
          user: '',
          date: '',
          comment: comment,
          file: file.name
        });

      // Assume that if todo contain only 1 ';' - there is no date
      } else if(todoSplitted.length === 2) {
        let comment = todoSplitted[1].match(/ ?(.*)\n?/i)[1].trim();
        let user = todoSplitted[0].match(/todo ?(.*)/i)[1].trim();

        let importantArr = comment.match(/!/g);
        let important = importantArr ? importantArr.length : 0;

        todos.push({
          important: important,
          user: user,
          date: '',
          comment: comment,
          file: file.name
        });

      // Else todo contain 2 ';' and all the necessary fields
      } else {
        // Catch the username from the array and delete all spaces
        // The same for the date and comment
        let user = todoSplitted[0].match(/todo ?(.*)/i)[1].trim();
        let date = todoSplitted[1].trim();
        let comment = todoSplitted[todoSplitted.length - 1].match(/ ?(.*)\n?/i)[1].trim();

        // Find all the exclamation marks, count them and pass to object as number
        let importantArr = todoSplitted[todoSplitted.length - 1].match(/!/g);
        let important = importantArr ? importantArr.length : 0;

        // Finally, add the todo object to todos array and return it back
        todos.push({
          important: important,
          user: user,
          date: date,
          comment: comment,
          file: file.name
        });
      }
    });
  });

  return todos;
};

// Returns the string - table of all satisfying todos
printTodo = (todos) => {

  // What is the length of the cells of the printed table
  let counts = { user: 4, date: 4, comment: 7, file: 8, todos: 0 };

  // Count the length
  todos.forEach( (todo) => {
    counts.todos++;

    // Reduce the size of the long string and
    // Set the maximum length of the table cell
    if(todo.user.length > 10){
      todo.user = todo.user.substr(0, 7) + '...';
      counts.user = 10;
    } else if (todo.user.length > counts.user) counts.user = todo.user.length;

    if(todo.date.length > 10){
      todo.date = todo.date.substr(0, 7) + '...';
      counts.date = 10;
    } else if (todo.date.length > counts.date) counts.date = todo.date.length;

    if(todo.comment.length > 50){
      todo.comment = todo.comment.substr(0, 47) + '...';
      counts.comment = 50;
    } else if (todo.comment.length > counts.comment) counts.comment = todo.comment.length;

    if(todo.file.length > 15) {
      todo.file = todo.file.substr(0, 12) + '...';
      counts.file = 15;
    } else if(todo.file.length > counts.file) counts.file = todo.file.length;
  });

  // The header of the table with calculated width
  let printTodos = ['  !  |  user', ' '.repeat(counts.user - 4),
    '  |  date', ' '.repeat(counts.date - 4),
    '  |  comment', ' '.repeat(counts.comment - 7),
    '  |  fileName', ' '.repeat(counts.file - 8), '  \n',
    '-'.repeat(counts.user + counts.file + counts.date + counts.comment + 25), '\n'];

  // All others rows of the table
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
  // The bottom border
  if(counts.todos !== 0) printTodos.push('-'.repeat(counts.user + counts.file + counts.date + counts.comment + 25));

  // Return the string, not an array, by joining
  return printTodos.join('');
};

// TODO max; 2019-02-04; it is not a difficult task at all

module.exports = {
  parseTodos,
  printTodo
};
