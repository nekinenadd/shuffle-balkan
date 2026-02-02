const root = document.documentElement;
const toggle = document.getElementById("themeToggle");

/* LOAD SAVED THEME */
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
}

/* TOGGLE THEME */
toggle.addEventListener("click", () => {
  const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", nextTheme);
  localStorage.setItem("theme", nextTheme);
});

/* SIZE SELECTOR */
document.querySelectorAll(".size-selector").forEach(group => {
  group.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      group.querySelectorAll("button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
});


document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.modal').forEach(modal => {
    const sizeButtons = modal.querySelectorAll('.size-selector button');
    const orderBtn = modal.querySelector('.order-btn');

    if (!orderBtn) return;

    let selectedSize = null;

    sizeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        sizeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        selectedSize = btn.dataset.size;

        orderBtn.classList.add('enabled');
        orderBtn.disabled = false;
      });
    });

    orderBtn.addEventListener('click', () => {
      if (!selectedSize) return;

      const productName =
        modal.querySelector('h3')?.innerText || 'Product';
      const price =
        modal.querySelector('.price')?.innerText || '';

      const subject = encodeURIComponent(`Order: ${productName}`);
      const body = encodeURIComponent(
        `Hello,\n\nI would like to order:\n\n` +
        `Product: ${productName}\n` +
        `Size: ${selectedSize}\n` +
        `Price: ${price}\n\n` +
        `Thank you`
      );

      window.location.href =
        `mailto:your@email.com?subject=${subject}&body=${body}`;
    });
  });
});



/* SLOGAN FADE IN */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once
      }
    });
  },
  {
    threshold: 0.2
  }
);

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});



/* TOUCH PARALLAX FOR SHOE (MOBILE) */
const shoe = document.querySelector(".hero-shoe-img");

if (shoe && window.innerWidth <= 768) {
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    shoe.style.transform = `translateY(${scrollY * 0.12}px)`;
  });
}




