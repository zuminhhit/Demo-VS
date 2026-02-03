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
  initStorySlider();

  await loadSection("menu", "menu.html");
  await document
    .querySelector(".menu__action-btn")
    .addEventListener("click", (e) => {
      e.preventDefault();
    });
  await toggleMenuModal();

  await loadSection("video", "video.html");
  await loadSection("newsletter", "newsletter.html");

  await loadSection("footer", "footer.html");
  initFooterYear();
}

function initHeroSlider() {
  const heroSlider = document.querySelector(".hero__slider");
  const slides = document.querySelectorAll(".hero__slide");
  const dots = document.querySelectorAll(".hero__dot");

  if (!slides.length) return;

  let current = 0;
  let timer = null;

  function goToSlide(index) {
    slides[current].classList.remove("hero__slide--active");
    dots[current].classList.remove("hero__dot--active");

    current = index;

    slides[current].classList.add("hero__slide--active");
    dots[current].classList.add("hero__dot--active");
  }

  function start() {
    if (timer) return;
    timer = setInterval(() => {
      goToSlide((current + 1) % slides.length);
    }, 3000);
  }

  function stop() {
    clearInterval(timer);
    timer = null;
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => goToSlide(index));
  });

  heroSlider.addEventListener("mouseenter", stop);
  heroSlider.addEventListener("mouseleave", start);

  start();
}

function initFooterYear() {
  const yearEl = document.getElementById("footer-year");
  if (!yearEl) return;

  yearEl.textContent = new Date().getFullYear();
}

function initStorySlider() {
  const storyContainer = document.querySelector(".story__container");
  const track = document.querySelector(".story__track");
  const dots = document.querySelectorAll(".story__dot");

  if (!storyContainer || !dots.length) return;
  let currentIndex = 0;
  let timer = null;
  const slideCount = dots.length;

  function goToSlide(index) {
    currentIndex = index;
    track.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach((d) => d.classList.remove("story__dot--active"));
    dots[index].classList.add("story__dot--active");
  }

  function start() {
    if (timer) return;
    timer = setInterval(() => {
      goToSlide((currentIndex + 1) % slideCount);
    }, 3000);
  }

  function stop() {
    clearInterval(timer);
    timer = null;
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => goToSlide(index));
  });

  storyContainer.addEventListener("mouseenter", stop);
  storyContainer.addEventListener("mouseleave", start);

  start();
}

function toggleMenuModal() {
  const preview = document.querySelector(".menu__preview");
  const GAP = 12;

  function positionPreview(item) {
    const itemRect = item.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    preview.style.opacity = "0";
    preview.style.display = "block";

    const previewRect = preview.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let left = itemRect.right + GAP;
    if (left + previewRect.width > vw) {
      left = itemRect.left - previewRect.width - GAP;
    }
    left = Math.max(GAP, Math.min(left, vw - previewRect.width - GAP));

    // ---- Y ----
    let top = itemRect.top + itemRect.height / 2 - previewRect.height / 2;
    top = Math.max(GAP, Math.min(top, vh - previewRect.height - GAP));

    // 👉 convert viewport → document coords
    preview.style.left = `${left + scrollX}px`;
    preview.style.top = `${top + scrollY}px`;

    preview.classList.add("is-show");
    preview.style.opacity = "";
  }

  document.querySelectorAll(".menu__item").forEach((item) => {
    item.addEventListener("mouseenter", () => {
      preview.innerHTML = `
      ${item.querySelector(".menu__item__title")?.outerHTML || ""}
      ${item.querySelector(".menu__item__desc")?.outerHTML || ""}
      ${item.querySelector(".menu__item__price")?.outerHTML || ""}
    `;
      positionPreview(item);
    });

    item.addEventListener("mouseleave", (e) => {
      if (preview.contains(e.relatedTarget)) return;
      preview.classList.remove("is-show");
    });
  });

  preview.addEventListener("mouseleave", (e) => {
    if (e.relatedTarget?.closest(".menu__item")) return;
    preview.classList.remove("is-show");
  });
}

init();
