async function loadSection(id, file) {
  const res = await fetch(`sections/${file}`);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

async function init() {
  await loadSection("header", "header.html");
  await loadSection("hero", "hero.html");

  initHeroSlider();

  await loadSection("story", "story.html");
  await loadSection("menu", "menu.html");
  await loadSection("video", "video.html");
  await loadSection("newsletter", "newsletter.html");
  await loadSection("footer", "footer.html");
}

function initHeroSlider() {
  const slides = document.querySelectorAll(".hero__slide");
  const dots = document.querySelectorAll(".hero__dot");

  let current = 0;

  function goToSlide(index) {
    slides[current].classList.remove("hero__slide--active");
    dots[current].classList.remove("hero__dot--active");

    current = index;

    slides[current].classList.add("hero__slide--active");
    dots[current].classList.add("hero__dot--active");
  }

  setInterval(() => {
    goToSlide((current + 1) % slides.length);
  }, 5000);

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index);
    });
  });
}

init();
