const matchMedia = window.matchMedia('(max-width:430px)');

//loading animation
document.addEventListener('DOMContentLoaded', function() {
    const loading = document.getElementById('loading');
    const content = document.getElementById('content');
    const progressBar = document.getElementById('progress');
    const progressText = document.getElementById('progress-text');

    let progress = 0;

    function updateProgress() {
        if (progress < 100) {
            progress += Math.random() * 30;
            if (progress > 100) progress = 100;

            progressBar.style.width = `${progress}%`;
            progressText.textContent = `${Math.round(progress)}%`;

            if (progress < 100) {
                setTimeout(updateProgress, 200);
            } else {
                setTimeout(() => {
                    loading.style.display = 'none';
                    content.classList.add('show');
                }, 500);
            }
        }
    }

    updateProgress();
});


//ロゴとindexナビの移動
const logo = document.querySelector('.ck-top-header__logo');
const index = document.querySelector('.index__wrapper');

window.addEventListener('scroll', () => {
  if (matchMedia.matches) {
    //SP動作
    if (window.scrollY > 50) {
      logo.classList.add('scrolled');
    } else {
      logo.classList.remove('scrolled');
    }
  } else {
    //PC動作
    if (window.scrollY > 100) {
      logo.classList.add('scrolled');
      index.classList.add('scrolled');
    } else {
      logo.classList.remove('scrolled');
      index.classList.remove('scrolled');
    }
  }
});


//========== Hamburger Menu ===========
const spMenuBtn = document.querySelector('.btn-trigger');
const spMenu = document.querySelector('#sp-menu');
const spMenuLinks = document.querySelectorAll('.sp-menu__list a');

spMenuBtn.addEventListener('click', () => {
  spMenuBtn.classList.toggle('active');
  spMenu.classList.toggle('active');
});

spMenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    spMenuBtn.classList.remove('active');
    spMenu.classList.remove('active');
  });
});


//========== indexナビ セクションごとの切り替え =========
const options = { root: null, rootMargin: '0px', threshold: 0.2 };

const sections = document.querySelectorAll("main section");

const updateLinkState = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // 全部リセット
      document
        .querySelectorAll(".ck-top-header__nav-link-text")
        .forEach((el) => el.classList.remove("selected"));

      // 対応するリンクだけselected
      const link = document.querySelector(
        `.ck-top-header__nav-link-text[href="#${entry.target.id}"]`
      );
      if (link) link.classList.add("selected");
    }
  });
};

const observer = new IntersectionObserver(updateLinkState, options);

sections.forEach((section) => observer.observe(section));


// ========== グローバルメニューのスムーススクロール ==========

const links = document.querySelectorAll('a[href^="#"]');
links.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const href = link.getAttribute('href');
    const targetSection = document.querySelector(href);
    const sectionTop = targetSection.getBoundingClientRect().top;
    const currentPos = window.scrollY;
    const gap = document.querySelector('.ck-top-header').offsetHeight;
    const adjust = 1;
    const target = sectionTop + currentPos - gap - adjust;
    window.scrollTo({
      top: target, //目的の位置のY座標を指定
        behavior: 'smooth', //スクロールの動きを指定
    });
  });
});


//========= Culture&Community 横スクロール ==========
document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".ck-top-culture__wrapper");
  const cards = document.querySelectorAll(".ck-top-culture__content-slider-card");
  if (!wrapper || cards.length === 0) return;

  window.addEventListener("scroll", () => {
    const rect = wrapper.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top <= 0 && rect.bottom >= windowHeight) {
      // sticky区間でのスクロール進捗 (0〜1)
      const progress = Math.min(
        Math.max((0 - rect.top) / (rect.height - windowHeight), 0),
        1
      );

      // 進捗を「ステップ」に変換
      const step = Math.floor(progress * (cards.length + 1)); 
      // +1 して「テキスト表示時間」を確保

      cards.forEach((card, i) => {
        if (i < step) {
          card.classList.add("active");
        } else {
          card.classList.remove("active");
        }
      });
    } else if (rect.top > 0) {
      // stickyに入る前
      cards.forEach(card => card.classList.remove("active"));
    } else if (rect.bottom < windowHeight) {
      // stickyを抜けた後
      cards.forEach(card => card.classList.add("active"));
    }
  });
});


// ========= Galleryセクションでロゴ・indexナビ反転 =========
const gallery = document.querySelector('#ck-top-gallery');
const logoUse = document.querySelector('.ck-top-header__logo use');

window.addEventListener('scroll', () => {
  const rect = gallery.getBoundingClientRect();
  const vh = window.innerHeight;

  //ロゴ
  if (matchMedia.matches) {
    //SP動作
    if (rect.top < vh * 0.1 && rect.bottom > vh * 0.1) {
      logoUse.setAttribute('xlink:href', '#logo_white');
    } else {
      logoUse.setAttribute('xlink:href', '#logo_black');
    }
  } else {
    //PC動作
    if (rect.top < vh * 0.25 && rect.bottom > vh * 0.25) {
      logoUse.setAttribute('xlink:href', '#logo_white');
    } else {
      logoUse.setAttribute('xlink:href', '#logo_black');
    }
  }

  //indexナビ
  if (rect.top < vh * 0.65 && rect.bottom > vh * 0.65) {
    index.classList.add('white');
  } else {
    index.classList.remove('white');
  }

});


// ========== SP版ヘッドライン文字色切り替え ==========
const heroImg = document.querySelector('.ck-top-hero__img');
const headline = document.querySelector('.ck-top-hero__headline');

window.addEventListener('scroll', () => {
  const rect = heroImg.getBoundingClientRect();
  const vh = window.innerHeight;

  if (matchMedia.matches) {
    //SP動作
    if (rect.bottom > vh * 0.7) {
      headline.classList.remove('black');
    } else {
      headline.classList.add('black');
    }
  }
});

