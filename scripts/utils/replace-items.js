const fs = require("node:fs");

function buildEach(
  content,
  directive,
  itemType,
  itemNames,
  onlyFeatured,
  sortingFunction
) {
  console.info(`build ${directive}`);

  // find for-each start
  const forEachStart = new RegExp(`<(.*) ${directive}>`).exec(content);

  // find for-each end
  const tagName = forEachStart[1];
  const endTag = `</${tagName}>`;
  const regex = new RegExp(endTag, "g");
  const forEachEnd = content
    .matchAll(regex)
    .find((match) => match.index > forEachStart.index);

  // copy article content
  const forEachContent = content.slice(
    forEachStart.index,
    forEachEnd.index + endTag.length
  );

  // replace placeholders
  const {
    getPlaceholders,
    replaceWithPlaceholders,
  } = require("./placeholders.js");

  const items = itemNames.map((itemName) =>
    getPlaceholders(`public/${itemType}/${itemName}`, itemName)
  );

  const sortedItems = sortingFunction ? items.sort(sortingFunction) : items;

  const everyItems = sortedItems.reduce((acc, item) => {
    if (onlyFeatured && !item.featured) return acc;

    // if there's another foreach with itemType.something
    // we should recursively build it
    const matchSubItemType = forEachContent.match(
      new RegExp(`for-each-${itemType}\\.(.*)>`)
    );

    const subItemType = matchSubItemType && matchSubItemType[1];

    const contentToReplace = subItemType
      ? buildEach(
          forEachContent,
          `for-each-${itemType}.${subItemType}`,
          subItemType,
          item[subItemType]
        )
      : forEachContent;

    const prefixedPlaceholders = Object.keys(item).reduce(
      (acc, key) => ({ ...acc, [`${itemType}.${key}`]: item[key] }),
      {}
    );

    const replacedItems = replaceWithPlaceholders(
      contentToReplace,
      prefixedPlaceholders
    );

    return (
      acc + "\n" + replacedItems.replace(directive, `id="${item["item-name"]}"`)
    );
  }, "");

  return content.replace(forEachContent, everyItems);
}

function buildItems(content, itemType, featured, sortingFunction) {
  if (!content.includes(`for-each-${itemType}`)) return;

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
    featured,
    sortingFunction
  );
}

module.exports = { buildItems, buildEach };
