const fs = require("node:fs");
const {
  getPlaceholders,
  replaceWithPlaceholders,
} = require("./utils/placeholders.js");

const { buildEach } = require("./utils/replace-items.js");

const templatePath = process.argv[2];
const directoryPath = process.argv[3];

const itemNames = fs
  .readdirSync(directoryPath, {
    recursive: false,
    withFileTypes: true,
  })
  .filter((dirent) => dirent.isDirectory())
  .map(({ name }) => name);

itemNames.forEach((itemName) => {
  const itemPath = `${directoryPath}/${itemName}`;

  // Copy the template to the item folder
  const newFilePath = `${itemPath}/index.html`;
  console.info(`᧐ Building "${newFilePath}"`);

  fs.cpSync(templatePath, newFilePath);

  const content = fs.readFileSync(newFilePath, "utf8");

  // Replace every placeholders
  const placeholders = getPlaceholders(itemPath, itemName);
  const replacedWithPlaceholders = replaceWithPlaceholders(
    content,
    placeholders
  );

  if (replacedWithPlaceholders.includes("for-each-speakers")) {
    // build each speakers
    const contentWithSpeakers = buildEach(
      replacedWithPlaceholders,
      `for-each-speakers`,
      "speakers",
      placeholders["speakers"]
    );

    // Rewrite the html
    fs.writeFileSync(newFilePath, contentWithSpeakers);
  } else {
    // Rewrite the html
    fs.writeFileSync(newFilePath, replacedWithPlaceholders);
  }
});
