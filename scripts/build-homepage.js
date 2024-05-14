const fs = require("node:fs");

// Copy the template file
const templatePath = "src/templates/homepage.html";
const newFilePath = "public/index.html";
fs.cpSync(templatePath, newFilePath);

const itemType = process.argv[2];
const onlyFeatured = process.argv[3] === "only-featured";

const { buildEach } = require("./utils/replace-each.js");

const content = fs.readFileSync(newFilePath, "utf8");

const itemNames = fs
  .readdirSync(`public/${itemType}/`, {
    recursive: false,
    withFileTypes: true,
  })
  .filter((dirent) => dirent.isDirectory())
  .map(({ name }) => name);

const builtContent = buildEach(
  content,
  `for-each-${itemType}`,
  itemType,
  itemNames,
  onlyFeatured
);

console.info(`᧐ Building "${newFilePath}"`);

// Rewrite the html
fs.writeFileSync(newFilePath, builtContent);
