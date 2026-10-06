/* =========================
   MALLOW — INTERACTIONS
========================= */


/* =========================
   START EXPLORING
========================= */

function startExploring() {
  const styleSection = document.getElementById("style");

  if (styleSection) {
    styleSection.scrollIntoView({
      behavior: "smooth"
    });
  }
}


/* =========================
   SCROLL TO SECTION
========================= */

function scrollToSection(id) {
  const section = document.getElementById(id);

  if (section) {
    section.scrollIntoView({
      behavior: "smooth"
    });
  }
}


/* =========================
   MESSAGE SYSTEM
========================= */

function showMessage(message) {

  // Remove an existing message
  const existing = document.querySelector(".mallow-toast");

  if (existing) {
    existing.remove();
  }

  const toast = document.createElement("div");

  toast.className = "mallow-toast";

  toast.innerHTML = `
    <div class="toast-icon">✿</div>

    <div class="toast-content">
      <strong>Mallow</strong>
      <span>${message}</span>
    </div>

    <button class="toast-close" aria-label="Close">
      ×
    </button>
  `;

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  const closeButton = toast.querySelector(".toast-close");

  closeButton.addEventListener("click", () => {
    closeToast(toast);
  });

  setTimeout(() => {
    closeToast(toast);
  }, 3500);
}


/* =========================
   CLOSE TOAST
========================= */

function closeToast(toast) {

  if (!toast) return;

  toast.classList.remove("show");

  setTimeout(() => {
    toast.remove();
  }, 300);
}


/* =========================
   NAVIGATION
========================= */

document.querySelectorAll(".nav-links a").forEach(link => {

  link.addEventListener("click", event => {

    const href = link.getAttribute("href");

    if (!href || !href.startsWith("#")) {
      return;
    }

    const target = document.querySelector(href);

    if (!target) {
      return;
    }

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth"
    });

  });

});


/* =========================
   PROFILE BUTTON
========================= */

const profileButton = document.querySelector(".profile-button");

if (profileButton) {

  profileButton.addEventListener("click", () => {

    showMessage(
      "Your personal Mallow profile is coming soon!"
    );

  });

}


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections = document.querySelectorAll(
  "section[id]"
);

const navLinks = document.querySelectorAll(
  ".nav-links a"
);

const observer = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) {
        return;
      }

      const id = entry.target.id;

      navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }

      });

    });

  },
  {
    threshold: 0.35
  }
);

sections.forEach(section => {
  observer.observe(section);
});


/* =========================
   FEATURE CARD ANIMATION
========================= */

const cards = document.querySelectorAll(
  ".feature-card"
);

cards.forEach((card, index) => {

  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";

  card.style.transition =
    `opacity 0.6s ease ${index * 0.08}s,
     transform 0.6s ease ${index * 0.08}s`;

});


const cardObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) {
        return;
      }

      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";

      cardObserver.unobserve(entry.target);

    });

  },
  {
    threshold: 0.15
  }
);

cards.forEach(card => {
  cardObserver.observe(card);
});


/* =========================
   HERO ENTRANCE
========================= */

window.addEventListener("load", () => {

  const heroContent =
    document.querySelector(".hero-content");

  const heroCard =
    document.querySelector(".hero-card");

  if (heroContent) {
    heroContent.style.opacity = "0";
    heroContent.style.transform = "translateY(18px)";

    setTimeout(() => {

      heroContent.style.transition =
        "opacity 0.8s ease, transform 0.8s ease";

      heroContent.style.opacity = "1";
      heroContent.style.transform = "translateY(0)";

    }, 100);
  }

  if (heroCard) {

    heroCard.style.opacity = "0";
    heroCard.style.transform =
      "rotate(2deg) translateY(25px)";

    setTimeout(() => {

      heroCard.style.transition =
        "opacity 0.9s ease, transform 0.9s ease";

      heroCard.style.opacity = "1";
      heroCard.style.transform =
        "rotate(2deg) translateY(0)";

    }, 250);

  }

});
