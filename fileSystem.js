const fs = require('fs');

// TODO PE; 2018-08-20; переименовать?
// TODO Anonymous Developer; 2016-03-17; Необходимо переписать этот код и использовать асинхронные версии функций для чтения из файла
// TODO WinDev; ; Убедиться, что будет работать под Windows.
// TODO Digi; 2018-09-21; Добавить функцию getFileName, которая по пути файла будет возвращать его имя. Воспользоваться модулем path из Node.js
// TODO Veronika; 2018-08-16; сделать кодировку настраиваемой

getAllFilePathsWithExtension = (directoryPath, extension, filePaths) => {
    filePaths = filePaths || [];
    const fileNames = fs.readdirSync(directoryPath);
    for (const fileName of fileNames) {
        const filePath = directoryPath + '/' + fileName;
        if (filePath.endsWith(`.${extension}`)) {
            filePaths.push(filePath);
        }
    }
    return filePaths;
};

readFile = (filePath) => {
    return fs.readFileSync(filePath, 'utf8');
};

getFiles = () => {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(function (path) {
        let name = path.split(/\\?\//);
        return { name: name[name.length - 1], content: readFile(path) }
    });
};

module.exports = {
    getFiles
};
