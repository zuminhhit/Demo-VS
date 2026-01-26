function loadSection(id, file) {
  fetch(`sections/${file}`)
    .then(res => res.text())
    .then(html => {
      document.querySelector(`#${id}`).innerHTML = html;
    });
}

loadSection("header", "header.html");
loadSection("hero", "hero.html");
loadSection("story", "story.html");
loadSection("menu", "menu.html");
loadSection("video", "video.html");
loadSection("newsletter", "newsletter.html");
loadSection("footer", "footer.html");

