const fs = require("node:fs");
const path = require("node:path");
const showdown = require("showdown");
const converter = new showdown.Converter();

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

  // TODO: Remove relative path
  const configuration = require(`../${itemPath}/index.json`);

  const placeholders = fs
    .readdirSync(itemPath)
    .filter((elm) => elm.match(/.*\.(md?)/gi))
    .reduce((acc, fileName) => {
      const markdown = fs.readFileSync(`${itemPath}/${fileName}`, "utf8");

      const html = converter.makeHtml(markdown);

      return { ...acc, [path.parse(fileName).name]: html };
    }, configuration);

  // Copy the template to the item folder
  const newFilePath = `${itemPath}/index.html`;
  console.info(`᧐ Building "${newFilePath}"`);

  fs.cpSync(templatePath, newFilePath);

  const html = fs.readFileSync(newFilePath, "utf8");

  // Replace every placeholders
  const replacedWithPlaceholders = Object.keys(placeholders).reduce(
    (acc, placeholder) => {
      return acc.replace(`{{ ${placeholder} }}`, placeholders[placeholder]);
    },
    html
  );

  // Rewrite the html
  fs.writeFileSync(newFilePath, replacedWithPlaceholders);
});
