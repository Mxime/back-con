const fs = require("node:fs");
const path = require("node:path");
const showdown = require("showdown");

function getPlaceholders(itemPath) {
  // TODO: Remove relative path
  const configuration = require(`../${itemPath}/index.json`);
  const converter = new showdown.Converter();

  const placeholders = fs
    .readdirSync(itemPath)
    .filter((elm) => elm.match(/.*\.(md?)/gi))
    .reduce((acc, fileName) => {
      const markdown = fs.readFileSync(`${itemPath}/${fileName}`, "utf8");

      const html = converter.makeHtml(markdown);

      return { ...acc, [path.parse(fileName).name]: html };
    }, configuration);

  return { ...placeholders, "item-path": itemPath };
}

function replaceWithPlaceholders(content, placeholders) {
  return Object.keys(placeholders).reduce((acc, placeholder) => {
    return acc.replace(`{{ ${placeholder} }}`, placeholders[placeholder]);
  }, content);
}

module.exports = { getPlaceholders, replaceWithPlaceholders };
