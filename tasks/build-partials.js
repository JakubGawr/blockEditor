const gulp = require("gulp");
const transform = require("gulp-transform");
const flatten = require("gulp-flatten");
const fs = require("fs");
const beautify = require("gulp-jsbeautifier");
const merge = require("merge-stream");
const path = require("path");
const concat = require("gulp-concat");
const sass = require("node-sass");
const htmlPartial = require("gulp-html-partial");
const inject = require("gulp-inject");
const fileinclude = require("gulp-file-include");
const localScreenshots = require("gulp-local-screenshots");

const getJsonPath = (folder) => path.join("blocks", folder, "/_config.json");

const getHtmlPath = (folder) => path.join("blocks", folder, "/index.html");

const getScssPath = (folder) => path.join("blocks", folder, "/styles.scss");

function getFolders(dir) {
  return fs.readdirSync(dir).filter(function (file) {
    return fs.statSync(path.join(dir, file)).isDirectory();
  });
}

const compileScss = (scssContent) =>
  sass
    .renderSync({
      data: scssContent,
    })
    .css.toString("utf8");

const transformHtmlContent = (folder) => (htmlContent) => {
  const scssContent = fs.readFileSync(getScssPath(folder), "utf8");
  return JSON.stringify({
    name: folder,
    html: htmlContent,
    css: scssContent.length > 0 ? compileScss(scssContent) : "",
  });
};
const transformAsArray = (content, file) => {
  return "[" + content + "]";
};
const buildPartials = () => {
  const folders = getFolders("blocks");
  const result = folders.map(function (folder) {
    return gulp
      .src(path.join("blocks", folder, "/*.html"))
      .pipe(flatten())
      .pipe(transform("utf8", transformHtmlContent(folder)));
  });
  return merge(result)
    .pipe(concat("partials.json", { newLine: "," }))
    .pipe(transform("utf8", transformAsArray))
    .pipe(beautify())
    .pipe(gulp.dest("src/blocks-content/"));
};

exports.buildPartials = gulp.parallel(buildPartials);
