const ejs = require("ejs");

function render(path, templateData) {
  ejs.renderFile(path, templateData);
}
