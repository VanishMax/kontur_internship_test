const { getFiles } = require('./fileSystem');
const { readLine } = require('./console');
const { parseTodos, printTodo } = require('./parseTodo');

// Start the app
app();
function app () {
    console.log('Please, write your command!');
    readLine(processCommand);
}

// Main functions

show = () => {
    // Get files by extension in format { name: 'FileName.js', content: '...' }
    const files = getFiles();
    // Parses Todos to format
    // { important: 0, user: 'userName', date: '2018-10-03', content: '...', file: 'fileName.js' }
    const todos = parseTodos(files);
    // At all - printTodo returns the string of the table of todos to print
    console.log(printTodo(todos));
};

important = () => {
    const files = getFiles();
    const todos = parseTodos(files);

    // Deletes useless objects leaving only where important == true
    let important = todos.filter( (todo) => {
        return todo.important;
    });
    console.log(printTodo(important));
};

findUser = (command) => {
    let username = command.match(/^ *user ?(.*)/)[1];
    const files = getFiles();

    // Gives the second argument to parseTodos.
    // It does not include todos where is the wrong username
    let todos = parseTodos(files);
    let todosReady = todos.filter( (todo) => {
        return todo.user.toLowerCase().startsWith(username.toLowerCase())
    });
    console.log(printTodo(todosReady));
};

sortByImportance = () => {
    const files = getFiles();
    let todos = parseTodos(files);

    // Sorts by Importance(!). It is a number, the biggest at the top
    todos.sort( (a, b) => {
        if (a.important < b.important)
            return 1;
        if (a.important > b.important)
            return -1;
        return 0;
    });
    console.log(printTodo(todos));
};

sortByUser = () => {
    const files = getFiles();
    let todos = parseTodos(files);

    // Sorts by User. It is a string - simple alphabetical sort
    todos.sort( (a, b) => {
        if(a.user === '')
            return 1;
        if (a.user.toLowerCase() > b.user.toLowerCase())
            return 1;
        if (a.user.toLowerCase() < b.user.toLowerCase())
            return -1;
        return 0;
    });
    console.log(printTodo(todos));
};

sortByDate = () => {
    const files = getFiles();
    let todos = parseTodos(files);

    // Sorts by User. It is a string - simple alphabetical sort
    todos.sort( (a, b) => {
        if (a.date < b.date)
            return 1;
        if (a.date > b.date)
            return -1;
        return 0;
    });
    console.log(printTodo(todos));
};

dates = (command) => {
    const files = getFiles();
    let todos = parseTodos(files);

    let todosReady = [];
    let date = command.match(/^ *date ?(.*)/)[1];

    // If the command matches regExp {yyyy[-mm-dd]} - leave only todos newer than that date
    if(/^\d\d\d\d-\d\d-\d\d$|^\d\d\d\d-\d\d$|^\d\d\d\d$/.test(date)){
      todosReady = todos.filter( (todo) => {
          // String comparison because date has a very easy format for it
          return todo.date >= date;
      });
    }

    console.log(printTodo(todosReady));
};


// Process commands from console
function processCommand (command) {
    switch (command) {
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            show();
            break;
        case 'important':
            important();
            break;
        // user <username>
        case (command.match(/^ *user ?.*/i) || {}).input:
            findUser(command);
            break;
        case 'sort importance':
            sortByImportance();
            break;
        case 'sort user':
            sortByUser();
            break;
        case 'sort date':
            sortByDate();
            break;
        // date {yyyy[-mm-dd]}
        case (command.match(/^ *date .*/i) || {}).input:
            dates(command);
            break;
        default:
            console.log('wrong command');
            break;
    }
}

// TODO dev; 2019-03-02; you can do it!
