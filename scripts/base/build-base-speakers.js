const fs = require("node:fs");
const talks = require("./talks.json");

const speakers = talks.reduce((acc, talk) => {
  return [...acc, ...talk.speakers];
}, []);

speakers.forEach((speaker) => {
  const speakerFolderPath = `../../public/speakers/${speaker}`;

  if (!fs.existsSync(speakerFolderPath)) {
    // create a folder in public/speakers
    fs.mkdirSync(speakerFolderPath);
  }

  if (!fs.existsSync(`${speakerFolderPath}/index.json`)) {
    const indexFile = {
      displayName: `To Replace: ${speaker} displayName`,
      email: `To Replace: ${speaker} email`,
      description: `To Replace: ${speaker} description`,
      division: `To Replace: ${speaker} division`,
      department: `To Replace: ${speaker} department`,
      location: `To Replace: ${speaker} location`,
      country: `To Replace: ${speaker} country`,
    };

    // write index.json file
    fs.writeFileSync(
      `${speakerFolderPath}/index.json`,
      JSON.stringify(indexFile)
    );
  }

  if (!fs.existsSync(`${speakerFolderPath}/description.md`)) {
    // write description.markdown file
    fs.writeFileSync(
      `${speakerFolderPath}/description.md`,
      `Description ${speaker} to **update**`
    );
  }

  if (!fs.existsSync(`${speakerFolderPath}/avatar.jpg`)) {
    // copy blank avatar
    fs.copyFileSync("./blank-avatar.jpg", `${speakerFolderPath}/avatar.jpg`);
  }
});
