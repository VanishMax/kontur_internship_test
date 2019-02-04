const { getAllFilePathsWithExtension, readFile } = require('./fileSystem');
const { readLine } = require('./console');
const { parseTodo } = require('./parseTodo');

app();

function app () {
    console.log('Please, write your command!');
    readLine(processCommand);
}

function show () {
    const files = getFiles();
    const todos = parseTodo(files);
    console.log(todos);
}

function getFiles () {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
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
