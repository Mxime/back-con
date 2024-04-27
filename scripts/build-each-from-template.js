const fs = require("node:fs");

// Copy the template file
const templatePath = "src/templates/homepage.html";
const newFilePath = "public/index.html";
fs.cpSync(templatePath, newFilePath);

const itemType = process.argv[2];

const homepageHtml = fs.readFileSync(newFilePath, "utf8");
const directive = `for-each-${itemType}`;

// find for-each start
const forEachStart = new RegExp(`<(.*) ${directive}>`).exec(homepageHtml);

// find for-each end
const tagName = forEachStart[1];
const endTag = `</${tagName}>`;
const forEachEnd = new RegExp(endTag).exec(homepageHtml);

// copy article content
const forEachContent = homepageHtml.slice(
  forEachStart.index,
  forEachEnd.index + endTag.length
);

// replace placeholders
const { getPlaceholders, replaceWithPlaceholders } = require("./utils.js");

const items = fs
  .readdirSync(`public/${itemType}/`, {
    recursive: false,
    withFileTypes: true,
  })
  .filter((dirent) => dirent.isDirectory())
  .map(({ name }) => name);

const everyTalks = items.reduce((acc, item) => {
  const placeholders = getPlaceholders(`public/${itemType}/${item}`);
  const replacedTalk = replaceWithPlaceholders(forEachContent, placeholders);
  return acc + "\n" + replacedTalk.replace(directive, `id="${item}"`);
}, "");

const replacedContent = homepageHtml.replace(forEachContent, everyTalks);
console.info(`᧐ Building "${newFilePath}"`);

// Rewrite the html
fs.writeFileSync(newFilePath, replacedContent);
