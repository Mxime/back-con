const fs = require("node:fs");
const { getPlaceholders, replaceWithPlaceholders } = require("./utils.js");

const templatePath = process.argv[2];
const directoryPath = process.argv[3];

const items = fs
  .readdirSync(directoryPath, {
    recursive: false,
    withFileTypes: true,
  })
  .filter((dirent) => dirent.isDirectory())
  .map(({ name }) => name);

items.forEach((item) => {
  const itemPath = `${directoryPath}/${item}`;

  // Copy the template to the item folder
  const newFilePath = `${itemPath}/index.html`;
  console.info(`᧐ Building "${newFilePath}"`);

  fs.cpSync(templatePath, newFilePath);

  const content = fs.readFileSync(newFilePath, "utf8");

  // Replace every placeholders
  const placeholders = getPlaceholders(itemPath);
  const replacedWithPlaceholders = replaceWithPlaceholders(
    content,
    placeholders,
  );

  // Rewrite the html
  fs.writeFileSync(newFilePath, replacedWithPlaceholders);
});
