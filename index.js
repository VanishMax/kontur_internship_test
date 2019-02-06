const { getAllFilePathsWithExtension, readFile } = require('./fileSystem');
const { readLine } = require('./console');
const { parseTodos, printTodo } = require('./parseTodo');

app();

function app () {
    console.log('Please, write your command!');
    readLine(processCommand);
}

show = () => {
    const files = getFiles();
    const todos = parseTodos(files);
    console.log(printTodo(todos));
};
important = () => {
    const files = getFiles();
    const todos = parseTodos(files);
    let important = todos.filter( (todo) => {
        return todo.important;
    });
    console.log(printTodo(important));
};
sortImportance = () => {
    const files = getFiles();
    let todos = parseTodos(files);
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
    let todos = parseTodos(files, user);

    console.log(printTodo(todos));
};

getFiles = () => {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(function (path) {
        let name = path.split(/\\?\//);
        return { name: name[name.length - 1], content: readFile(path) }
    });
};

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
