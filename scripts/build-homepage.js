const { buildEachInTemplate } = require("./utils/replace-items.js");

function sortByDate(a, b) {
  return new Date(a.time) - new Date(b.time);
}

buildEachInTemplate("src/templates/homepage.html", "public/index.html", [
  { itemType: "talks", onlyFeatured: true, sortingFunction: sortByDate },
  { itemType: "speakers" },
]);

buildEachInTemplate(
  "src/templates/my-favorites.html",
  "public/my-favorites.html",
  [{ itemType: "talks", sortingFunction: sortByDate }]
);
