const fs = require("node:fs");

// Copy the template file
const templatePath = "src/templates/homepage.html";
const newFilePath = "public/index.html";
fs.cpSync(templatePath, newFilePath);

const onlyFeatured = process.argv[2] === "only-featured";

const { buildEach } = require("./utils/replace-each.js");

const homepage = fs.readFileSync(newFilePath, "utf8");

function build(content, itemType, featured) {
  const itemNames = fs
    .readdirSync(`public/${itemType}/`, {
      recursive: false,
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory())
    .map(({ name }) => name);

  return buildEach(
    content,
    `for-each-${itemType}`,
    itemType,
    itemNames,
    featured
  );
}

const homePageWithTalks = build(homepage, "talks", onlyFeatured);
const builtContent = build(homePageWithTalks, "speakers");

console.info(`᧐ Building "${newFilePath}"`);

// Rewrite the html
fs.writeFileSync(newFilePath, builtContent);
