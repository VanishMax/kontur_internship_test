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
    let user = command.match(/ *user (.*)/)[1];
    const files = getFiles();

    // Gives the second argument to parseTodos.
    // It does not include todos where is the wrong username
    let todos = parseTodos(files, user);
    console.log(printTodo(todos));
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
        case (command.match(/ *user .*/i) || {}).input:
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
        // date <date>
        case (command.match(/ *date .*/i) || {}).input:
            findUser(command);
            break;
        default:
            console.log('wrong command');
            break;
    }
}

// TODO dev; 2019-03-02; you can do it!
