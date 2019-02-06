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
sortImportance = () => {
    const files = getFiles();
    let todos = parseTodos(files);

    // Sorts by importance, because it is a number
    todos.sort( (a, b) => {
        if (a.important < b.important)
            return 1;
        if (a.important > b.important)
            return -1;
        return 0;
    });
    console.log(printTodo(todos));
};

findUser = (command) => {
    let user = command.match(/ (.*)/)[1];
    const files = getFiles();

    // Gives the second argument to parseTodos.
    // It does not include todos where is the wrong username
    let todos = parseTodos(files, user);
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
        case (command.match(/user .*/i) || {}).input:
            findUser(command);
            break;
        case 'sort importance':
            sortImportance();
            break;
        case 'sort user':
            sortImportance();
            break;
        case 'sort date':
            sortImportance();
            break;
        default:
            console.log('wrong command');
            break;
    }
}

// TODO dev; 04-02-2019; you can do it!
