const { getAllFilePathsWithExtension, readFile } = require('./fileSystem');
const { readLine } = require('./console');
const { parseTodo, printTodo } = require('./parseTodo');

app();

function app () {
    console.log('Please, write your command!');
    readLine(processCommand);
}

function show () {
    const files = getFiles();
    const todos = parseTodo(files);
    const todosStr = printTodo(todos);
    console.log(todosStr);
}

function getFiles () {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(function (path) {
        let name = path.split(/\\?\//);
        return { name: name[name.length - 1], content: readFile(path) }
    });
}

function processCommand (command) {
    switch (command) {
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            show();
            break;
        default:
            console.log('wrong command');
            break;
    }
}

// TODO dev; 04-02-2019; you can do it!
