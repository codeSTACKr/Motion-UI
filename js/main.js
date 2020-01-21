// Hero Section

let lastScrollPos = window.scrollY;
let titleSection = document.querySelector(".title-section");
let titleSectionBottom = titleSection.scrollHeight;
let articleSection = document.querySelector(".article-section");
let articleSectionTop = articleSection.getBoundingClientRect().top;

let scale = 1;
let x = -1;

document.addEventListener("scroll", function(e) {
  let currentScrollPos = window.scrollY;
  if (
    currentScrollPos > titleSectionBottom &&
    currentScrollPos < articleSectionTop - titleSectionBottom
  ) {
    let text = document.querySelector(".hero-section svg text");
    if (currentScrollPos > lastScrollPos) {
      if (scale <= 64) {
        scale = scale * 2;
      }
    } else {
      if (scale >= 2) {
        scale = scale / 2;
      }
    }

    text.style.transform = `scale(${scale})`;
  }
  if (
    currentScrollPos > titleSectionBottom * 1.6 &&
    currentScrollPos < articleSectionTop
  ) {
    let title = document.querySelector(".hero-section .hero-title");
    if (currentScrollPos > lastScrollPos) {
      if (x >= -150) {
        x = x * 1.5;
      }
    } else {
      if (x <= -1.5) {
        x = x / 1.5;
      }
    }

    title.style.transform = `translateX(${x}%)`;
    title.style.opacity = 1;
  } else {
    let title = document.querySelector(".hero-section .hero-title");
    title.style.opacity = 0;
  }
  lastScrollPos = currentScrollPos;
});

// Main header / Title Section

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("mouseover", () => {
    anime({
      targets: link,
      keyframes: [
        { translateY: "-2px" },
        { translateY: "4px" },
        { translateY: "0px" },
        { translateY: "2px" },
        { translateY: "-4px" },
        { translateY: "0px" }
      ],
      duration: 400,
      easing: "easeInOutExpo"
    });
  });
});

anime
  .timeline()
  .add({
    targets: ".main-header",
    opacity: [0, 1],
    translateY: ["-5rem", 0],
    easing: "spring(1, 80, 10, 0)",
    duration: 300
  })
  .add(
    {
      targets: [".nav-link", ".brand"],
      opacity: [0, 1],
      translateY: ["-2rem", 0],
      easing: "spring(1, 80, 10, 0)",
      duration: 500
    },
    "-=800"
  )
  .add(
    {
      targets: ".title-header .line",
      opacity: [0.5, 1],
      scaleX: [0, 1],
      easing: "easeInOutExpo",
      duration: 700
    },
    "-=1400"
  )
  .add(
    {
      targets: ".title-header .line",
      duration: 600,
      easing: "easeOutExpo",
      translateY: (el, i) => -0.625 + 0.625 * 2 * i + "em"
    },
    "-=700"
  )
  .add(
    {
      targets: ".title-header .letters-left",
      opacity: [0, 1],
      translateX: ["0.65em", "0.15em"],
      easing: "easeOutExpo",
      duration: 600
    },
    "-=300"
  )
  .add(
    {
      targets: ".title-header .letters-right",
      opacity: [0, 1],
      translateX: ["-0.65em", "-0.15em"],
      easing: "easeOutExpo",
      duration: 600
    },
    "-=600"
  );

// Articles Section

let observer;
const articles = Array.from(document.querySelectorAll(".article"));
let options = {
  threshold: 0.5
};
let current = -1;

observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0.5) {
      const newcurrent = articles.indexOf(entry.target);
      if (newcurrent > current) {
        anime({
          targets: entry.target,
          opacity: [0, 1],
          translateY: ["20rem", 0],
          easing: "spring(1, 80, 10, 0)",
          duration: 800
        });
      }
      current = newcurrent;
      observer.unobserve(entry.target);
    }
  });
}, options);

// start observing
document.querySelectorAll(".article").forEach(article => {
  observer.observe(article);
});
