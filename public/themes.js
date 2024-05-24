function udpateThemeSwitchButton(theme) {
  const themeSwitchButton = document.getElementById("theme-switch");
  if (theme === "light-theme") themeSwitchButton.innerHTML = "🌙";
  else themeSwitchButton.innerHTML = "☀️";
}

(function initThemes() {
  const userTheme = localStorage.getItem("backcon-theme");

  if (userTheme) document.documentElement.classList.add(userTheme);
  udpateThemeSwitchButton(userTheme || "light-theme");

  document.querySelector("#theme-switch").addEventListener("click", () => {
    const isDarkTheme = document.documentElement.classList.toggle("dark-theme");

    if (isDarkTheme) localStorage.setItem("backcon-theme", "dark-theme");
    else localStorage.removeItem("backcon-theme");

    udpateThemeSwitchButton(isDarkTheme ? "dark-theme" : "light-theme");
  });
})();
