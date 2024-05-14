const fs = require("node:fs");
const talks = require("./talks.json");

talks.forEach((talk) => {
  const talkFolderPath = `../../public/talks/${talk.title}`;

  if (!fs.existsSync(talkFolderPath)) {
    // create a folder in public/talks
    fs.mkdirSync(talkFolderPath);
  }

  if (!fs.existsSync(`${talkFolderPath}/index.json`)) {
    const indexFile = {
      title: `TO UPDATE: ${talk.title}`,
      category: talk.category,
      location: talk.location || "",
      time: talk.time || "2024-06-18T11:00:00Z",
      speakers: talk.speakers,
      featured: false,
    };

    // write index.json file
    fs.writeFileSync(`${talkFolderPath}/index.json`, JSON.stringify(indexFile));
  }

  if (!fs.existsSync(`${talkFolderPath}/description.md`)) {
    // write description.markdown file
    fs.writeFileSync(
      `${talkFolderPath}/description.md`,
      "Description to **update**",
    );
  }
});
