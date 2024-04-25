const fs = require("node:fs");
const path = require("node:path");
const showdown = require("showdown");
const converter = new showdown.Converter();

const name = process.argv[2];

const templatePath = "src/templates/talk.html";
const talkPath = `public/talks/${name}`;

// read json keys
// TODO: Remove relative path
const talkConfiguration = require(`../${talkPath}/index.json`);

// TODO: Add descriptions
const placeholders = fs
  .readdirSync(talkPath)
  .filter((elm) => elm.match(/.*\.(md?)/gi))
  .reduce((acc, fileName) => {
    const markdown = fs.readFileSync(`${talkPath}/${fileName}`, "utf8");

    const html = converter.makeHtml(markdown);

    return { ...acc, [path.parse(fileName).name]: html };
  }, talkConfiguration);

// Copy the template to the talk folder
const talkPagePath = `${talkPath}/index.html`;

fs.cp(templatePath, talkPagePath, () => {
  fs.readFile(talkPagePath, "utf8", (_, html) => {
    // Replace every placeholders
    const replacedWithPlaceholders = Object.keys(placeholders).reduce(
      (acc, placeholder) => {
        return acc.replace(`{{ ${placeholder} }}`, placeholders[placeholder]);
      },
      html
    );

    // Rewrite the html
    fs.writeFile(talkPagePath, replacedWithPlaceholders, () => {});
  });
});
