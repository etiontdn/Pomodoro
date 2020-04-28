document.querySelector(".config-container").style.height = "0";
document.querySelector(".config-container").style.display = "none";
document.querySelector(".options-button").addEventListener("click", () => {
  let configPage = document.querySelector(".config-container")
  if (configPage.style.display == "none") {
    configPage.style.display = "flex";
    setTimeout(function () {
      configPage.style.height = "100vh";
    }, 10);
    document.querySelector(".options-button").style.backgroundImage = "url(images/return.svg)";
  }
  else {
    configPage.style.height = "0";
    setTimeout(function () {
      configPage.style.display = "none";
    }, 200);
    document.querySelector(".options-button").style.backgroundImage = "url(images/menu.svg)";
  }
});
