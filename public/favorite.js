function isFavorited(talkName) {
  const favorites = localStorage.getItem("backcon-favorites");

  if (favorites === null) return false;

  return favorites.split(",").some((name) => name === talkName);
}

function setFavoritedHtml(button) {
  button.innerHTML = "<b>★<span> Favorited</span></b>";
}

function setAddToFavoriteHtml(button) {
  button.innerHTML = "<i>✩<span> Add to favorite</span></i>";
}

function addToFavorite(talkName, button) {
  const favorites = localStorage.getItem("backcon-favorites");

  const updatedFavorites =
    favorites === null ? [talkName] : [...favorites.split(","), talkName];

  localStorage.setItem("backcon-favorites", updatedFavorites.join(","));

  try {
    amplitude.track("Add To Favorite", { talkName });
  } catch {}

  setFavoritedHtml(button);
}

function removeFromFavorite(talkName, button) {
  const favorites = localStorage.getItem("backcon-favorites");

  favoriteWithoutTalk = favorites
    .split(",")
    .filter((favorite) => favorite !== talkName);
  localStorage.setItem("backcon-favorites", favoriteWithoutTalk.join(","));

  try {
    amplitude.track("Remove From Favorite", { talkName });
  } catch {}

  setAddToFavoriteHtml(button);
}

(function init() {
  console.info("init favorite script");

  const talkElements = document.querySelectorAll(".talks");

  talkElements.forEach((talkElement) => {
    const addToFavoriteButton = talkElement.querySelector(".add-to-favorite");

    const talkName = addToFavoriteButton.dataset.talkName;

    if (isFavorited(talkName)) {
      talkElement.classList.add("favorited");
      setFavoritedHtml(addToFavoriteButton);
    } else {
      setAddToFavoriteHtml(addToFavoriteButton);
    }

    addToFavoriteButton.addEventListener("click", () => {
      if (!isFavorited(talkName)) addToFavorite(talkName, addToFavoriteButton);
      else removeFromFavorite(talkName, addToFavoriteButton);
    });
  });

  const favoritedTalksCount = Array.from(talkElements).filter((element) =>
    element.classList.contains("favorited")
  ).length;

  document.body.classList.add(`talks-favorited-${favoritedTalksCount}`);
})();
