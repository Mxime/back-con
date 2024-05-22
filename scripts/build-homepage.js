const fs = require("node:fs");

// Copy the template file
const templatePath = "src/templates/homepage.html";
const newFilePath = "public/index.html";
fs.cpSync(templatePath, newFilePath);

const onlyFeatured = process.argv[2] === "only-featured";

const { buildItems } = require("./utils/replace-items.js");

const homepage = fs.readFileSync(newFilePath, "utf8");

function sortByDate(a, b) {
  return new Date(a.time) - new Date(b.time);
}

const homePageWithTalks = buildItems(
  homepage,
  "talks",
  onlyFeatured,
  sortByDate
);

const builtContent = buildItems(homePageWithTalks, "speakers");

console.info(`᧐ Building "${newFilePath}"`);

// Rewrite the html
fs.writeFileSync(newFilePath, builtContent);
