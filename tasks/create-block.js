const gulp = require("gulp");
const uuid = require("uuid");
const fs = require("fs");
const { compose } = require("ramda");

const createConfigContent = (name, tag) => {
  return JSON.stringify({
    title: "Do not edit!",
    blockName: name,
    tag: tag,
    __id: uuid.v4(),
    jsPlugins: [],
    type: "default",
  });
};

const createFolder = (name) => {
  if (!fs.existsSync(name)) {
    fs.mkdirSync(`blocks/${name}`);
  }
  return name;
};

const createScssFile = (name) =>
  fs.writeFileSync(`./blocks/${name}/styles.scss`, "");

const createJsonConfigFile = (tag) => (name) => {
  fs.writeFileSync(
    `./blocks/${name}/_config.json`,
    createConfigContent(name, tag)
  );
  return name;
};

const createHtmlFile = (name) => {
  fs.writeFileSync(`./blocks/${name}/index.html`, "");
  return name;
};

const createBlock = (cb) => {
  const name = process.env.npm_config_name;
  const tag = process.env.npm_config_tag;
  if (name) {
    compose(
      createScssFile,
      createHtmlFile,
      createJsonConfigFile(tag),
      createFolder
    )(name);
  }
  cb();
};

exports.createBlock = gulp.parallel(createBlock);
