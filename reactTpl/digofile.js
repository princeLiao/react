const digo = require("digo");

exports.build = function () {
    digo.src("./src").dest("./dest");
};

exports.default = function () {
    digo.watch(exports.build);
};

// exports.new = function () {
//     const data = digo.parseArgs();
//     if (!data[1]) {
//         digo.info("用法: digo new <组件名> [组件显示名] [组件描述]\n  如: digo new textBox 文本框 用于输入内容的组件");
//         digo.report = false;
//         return;
//     }

//     data.moduleName = data[1];
//     data.name = data.name || digo.getFileName(data.moduleName, false);
//     data.nameLower = data.name.toLowerCase();
//     data.namePascal = data.name.charAt(0).toUpperCase() + data.name.slice(1);

//     data.displayName = data[2] || data.name;
//     data.description = data[3] || data.displayName;

//     data.author = data.author || digo.exec("git config user.name", { slient: true }).output.join("").trim();
//     data.email = data.email || digo.exec("git config user.email", { slient: true }).output.join("").trim();
//     data.version = data.version || "0.0.1";
//     data.date = data.date || digo.formatDate(undefined, "yyyy/MM/dd");
//     data.tpl = './src/tpl/react/tpl.jsx';

//     data.dir = data.dir || "src/entry";
//     data.rootDir = data.rootDir || digo.relativePath(data.dir + "/" + data.moduleName, "");
//     data.cssTpl = './src/tpl/react/tpl.scss';
//     data.cssDir = "src/css";

//     if (!digo.existsFile(data.tpl)) {
//         digo.fatal("Cannot find tpl folder: {tpl}", data);
//         return;
//     }

//     digo.walk(data.tpl, {
//         file(path) {
//             digo.writeFileIf(`${data.dir}/${digo.getFileName(data.tpl, path).replace("tpl", data.name)}`, new digo.File(path).content.replace(/__(\w+)__/g, (all, field) => data[field] || ""));
//         },
//         end() { }
//     });
//     digo.walk(data.cssTpl, {
//         file(path) {
//             digo.writeFileIf(`${data.cssDir}/${digo.getFileName(data.cssTpl, path).replace("tpl", data.name)}`, new digo.File(path).content.replace(/__(\w+)__/g, (all, field) => data[field] || ""));
//         },
//         end() { }
//     })
// };

function renderTpl(tpl, data) {
    return tpl.replace(/__(\w+)__/g, (all, field) => data[field] == undefined ? all : data[field]);
}
exports.new = (options) => {
    const data = options || digo.parseArgs();
    digo.info(data);
    if (!data[1]) {
        digo.info("用法: digo new <分类>/<组件名> [组件显示名] [组件描述]\n  如: digo new ui/textBox 文本框 用于输入内容的组件");
        digo.report = false;
        return;
    }

    data.moduleName = data[1];
    data.name = data.name || digo.getFileName(data.moduleName, false);
    data.nameLower = data.name.toLowerCase();
    data.namePascal = data.name.charAt(0).toUpperCase() + data.name.slice(1);

    data.displayName = data[2] || data.name;
    data.description = data[3] || data.displayName;

    data.author = data.author || digo.exec("git config user.name", { slient: true }).output.join("").trim();
    data.email = data.email || digo.exec("git config user.email", { slient: true }).output.join("").trim();
    data.version = data.version || "0.0.1";
    data.date = data.date || digo.formatDate(undefined, "yyyy/MM/dd");

    data.dir = data.dir || "src/entry";
    data.rootDir = data.rootDir || digo.relativePath(data.dir + "/" + data.moduleName, "");
    data.tpl = data.tpl || `src/tpl/react/`;
    if (!digo.existsDir(data.tpl)) {
        if (!digo.existsDir(`assets/tpl/default`)) {
            digo.fatal("Cannot find tpl folder: {tpl}", data);
            return;
        }
        data.tpl = `assets/tpl/default`;
    }

    digo.walk(data.tpl, {
        file(path) {
            digo.writeFileIf(`${data.dir}/${data.moduleName}/${digo.relativePath(data.tpl, path).replace("tpl", data.name)}`, renderTpl(new digo.File(path).content, data));
        },
        end() { }
    });
};
exports.create = (options) => {
    options = options || digo.parseArgs();
    var fileName = options[1];
    if (!fileName) {
        digo.info("用法：digo create <页面名>");
        return;
    }
    const tpl = "index", tplPascal = tpl.charAt(0).toUpperCase() + tpl.slice(1); // xulch 2017/12/29
    digo.writeFileIf(`src/entry/${fileName}.jsx`, digo.readFile(`src/entry/${tpl}.jsx`).toString().replace(new RegExp(tpl, "g"), fileName).replace(new RegExp(tplPascal, "g"), fileName.charAt(0).toUpperCase() + fileName.slice(1))); // xulch 2017/12/29
};
exports.api = () => {
    digo.src("./api.json").pipe("digo-api", {
        apiDir: "components/api/",
        docDir: "mock/",
        mockDir: "mock/",
        mergeDir: "mock/",
        ajaxModule: "common",
        dataProperty: "data",
        messageProperty: "message",
        successDescription: "请求成功的回调函数",
        errorDescription: "请求失败的回调函数",
    }).dest(".");
};

