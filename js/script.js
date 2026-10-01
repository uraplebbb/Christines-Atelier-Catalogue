// ===================== SHARED NAVIGATION =====================
const nav = document.getElementById('siteNav');
const navLinks = document.getElementById('navLinks');
const menuToggle = document.getElementById('menuToggle');
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('.navlink').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === currentPage);
});

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });
  navLinks.addEventListener('click', event => {
    if (event.target.closest('.navlink')) {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open menu');
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open menu');
      menuToggle.focus();
    }
  });
}

if (nav) {
  const updateNavigation = () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
  };
  updateNavigation();
  window.addEventListener('scroll', updateNavigation, { passive: true });
}

// ===================== HOME — COLLECTION CAROUSEL =====================
const CAROUSEL_ITEMS = [
  { no: "01", name: "The Iffy",       meta: "Cotton / wrapped",       image: "images/The Iffy/The Iffy.jpg" },
  { no: "02", name: "The Angelica",   meta: "Straw / wide brim",      image: "images/The Angelica/The Angelica 200k(2).jpg" },
  { no: "03", name: "The Cordelia",   meta: "Silk / boater",          image: "images/The Cordelia/The Cordelia 155k(1).jpg" },
  { no: "04", name: "The Goodness",   meta: "Wool / silk / wire",     image: "images/The Goodness/The Goodness 200k(2).jpg" },
];

const carouselTrack = document.getElementById('carouselTrack');
const carouselIndex = document.getElementById('carouselIndex');
const carouselTotal = document.getElementById('carouselTotal');
const carouselPrev  = document.getElementById('carouselPrev');
const carouselNext  = document.getElementById('carouselNext');

if (carouselTrack) {
  // Build slides
  CAROUSEL_ITEMS.forEach((item, i) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide' + (i === 0 ? ' is-active' : '');
    slide.dataset.index = i;
    slide.innerHTML = `<img src="${item.image}" alt="${item.name}" loading="lazy">`;
    carouselTrack.appendChild(slide);
  });

  let activeSlide = 0;
  const slides = carouselTrack.querySelectorAll('.carousel-slide');

  if (carouselTotal) carouselTotal.textContent = String(CAROUSEL_ITEMS.length).padStart(2, '0');

  function showSlide(i) {
    // wrap around
    activeSlide = (i + slides.length) % slides.length;
    slides.forEach((s, idx) => s.classList.toggle('is-active', idx === activeSlide));
    if (carouselIndex) carouselIndex.textContent = String(activeSlide + 1).padStart(2, '0');
  }

  if (carouselPrev) carouselPrev.addEventListener('click', () => showSlide(activeSlide - 1));
  if (carouselNext) carouselNext.addEventListener('click', () => showSlide(activeSlide + 1));

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  showSlide(activeSlide - 1);
    if (e.key === 'ArrowRight') showSlide(activeSlide + 1);
  });

  // Swipe support
  let touchStartX = 0;
  carouselTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  carouselTrack.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(dx) > 40) {
      showSlide(activeSlide + (dx < 0 ? 1 : -1));
    }
  }, { passive: true });
}

// ===================== NEWSLETTER =====================
const newsletterForm = document.getElementById('restoredNewsletterForm') || document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', event => {
    event.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value.trim();
    const status = document.getElementById('newsletterStatus');
    if (status) status.textContent = 'Opening an email to complete your subscription.';
    window.open(buildGmail('Newsletter subscription - Christine\'s Atelier', `Please add ${email} to the Christine's Atelier newsletter.`), '_blank', 'noopener');
  });
}


// ===================== CONTACT LINKS =====================
const WHATSAPP_NUMBER = '2348000000000';
const CONTACT_EMAIL   = 'hello@christinesatelier.com';
const BESPOKE_EMAIL   = 'bespoke@christinesatelier.com';

function buildWhatsApp(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function buildGmail(subject, body = '', recipient = CONTACT_EMAIL) {
  const params = new URLSearchParams({ view: 'cm', fs: '1', to: recipient, su: subject, body });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

const generalEmail = document.getElementById('generalEmail');
if (generalEmail) {
  generalEmail.href = buildGmail("General enquiry - Christine's Atelier");
}

const bespokeEmail = document.getElementById('bespokeEmail');
if (bespokeEmail) {
  bespokeEmail.href = buildGmail("Bespoke enquiry - Christine's Atelier", '', BESPOKE_EMAIL);
}

const contactWhatsapp = document.getElementById('contactWhatsapp');
if (contactWhatsapp) {
  contactWhatsapp.href = buildWhatsApp("Hi Christine's Atelier, I'd like to make an enquiry.");
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    const name    = document.getElementById('contactName').value.trim();
    const sender  = document.getElementById('contactSender').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    const body    = `Name: ${name}\nEmail: ${sender}\n\n${message}`;
    window.open(buildGmail("Website enquiry - Christine's Atelier", body), '_blank', 'noopener');
  });
}


// ===================== COLLECTION LOGIC =====================
const HATS = [
  { no: "01", name: "The Abi KD",      meta: "Wool / silk / wire",    category: "structured",  images: ["images/The Abi KD/THE ABI-KD 155K .jpeg", "images/The Abi KD/The Abi Kd 150k.jpg", "images/The Abi KD/The ABI KD 155k.jpg"] },
  { no: "02", name: "The Angelica",    meta: "Straw / wide brim",     category: "wide-brim",   images: ["images/The Angelica/The Angelica 200k(2).jpg", "images/The Angelica/The Angelica 200k(1).jpg", "images/The Angelica/The Angelica 200k(3).jpg"] },
  { no: "03", name: "The Star Burst",  meta: "Silk / boater",         category: "avant-garde", images: ["images/The Star Burst/THE Star Burst 85K.jpeg", "images/The Star Burst/The Star Burst 85k.jpg", "images/The Star Burst/The Start burst 85k(1).jpg"] },
  { no: "04", name: "The Bello",       meta: "Wool felt / cloche",    category: "structured",  images: ["images/The Bello/The Fidat 120k.jpg", "images/The Bello/The Fidat 120k(1).jpg", "images/The Bello/The Fidat 120k(2).jpg"] },
  { no: "05", name: "The Cordelia",    meta: "Sinamay / sculpted",    category: "fascinator",  images: ["images/The Cordelia/THE Cordelia 155K.jpeg", "images/The Cordelia/The Cordelia 155k.jpg", "images/The Cordelia/The Cordelia 155k(1).jpg"] },
  { no: "06", name: "The Ms Christie", meta: "Cotton / wrapped",      category: "structured",  images: ["images/Ms. Christie/IMG_3639.JPG", "images/Ms. Christie/IMG_3641.JPG", "images/Ms. Christie/IMG_3643.JPG"] },
  { no: "07", name: "The Azure Pine",  meta: "Felt / folded brim",    category: "avant-garde", images: ["images/The Azure Pine/THE AZURE PINE 155K.jpeg", "images/The Azure Pine/The Azure pine 135k.jpg", "images/The Azure Pine/The Azure pine 135k_.jpg"] },
  { no: "08", name: "The Goodness",    meta: "Straw / hand-blocked",  category: "wide-brim",   images: ["images/The Goodness/The Goodness 200k.jpg", "images/The Goodness/The Goodness 200k(1).jpg", "images/The Goodness/The Goodness 200k(2).jpg"] },
  { no: "09", name: "The Iffy",        meta: "Silk / veil",           category: "fascinator",  images: ["images/The Iffy/THE IFFY 90K.jpeg", "images/The Iffy/The iffy(1).jpg", "images/The Iffy/The iffy(2).jpg"] },
  { no: "10", name: "The Bode",        meta: "Wool / soft crown",     category: "unisex",      images: ["images/The Bode/The Bode 50k.jpg", "images/The Bode/The Bode 50k(1).jpg", "images/The Bode/The Bode 50k_.jpg"] },
  { no: "11", name: "The Ariella",     meta: "Jute / wide brim",      category: "wide-brim",   images: ["images/The Ariella/The Ariella 85k.jpg", "images/The Ariella/The Ariella 85k(1).jpg", "images/The Ariella/The Ariella 85k(2).jpg"] },
  { no: "12", name: "The Folasade",    meta: "Felt / ribbon",         category: "structured",  images: ["images/The Folasade/The Folashade 135k.jpg", "images/The Folasade/The Folashade 135k(1).jpg", "images/The Folasade/The Folashade (120k).jpg"] },
];

const latestGrid = document.getElementById('latestGrid');
if (latestGrid) {
  HATS.slice(0, 6).forEach(hat => {
    const item = document.createElement('a');
    item.className = 'latest-item';
    item.href = `item.html?no=${hat.no}`;
    item.innerHTML = `
      <div class="frame"><img src="${hat.images[0]}" alt="${hat.name}" loading="lazy"></div>
      <div class="latest-overlay"><span class="lname">${hat.name}</span><span class="lmeta">${hat.meta}</span></div>
    `;
    latestGrid.appendChild(item);
  });
}

const lookbookGrid   = document.getElementById('lookbookGrid');
const loadMoreWrap   = document.getElementById('loadMoreWrap');
const loadMoreBtn    = document.getElementById('loadMoreBtn');

let activeCategory = 'all';
let visibleCount   = 8;
const ITEMS_PER_LOAD = 8;

function getFilteredHats() {
  return activeCategory === 'all'
    ? HATS
    : HATS.filter(hat => hat.category === activeCategory);
}

function renderLookbook(reset = false) {
  if (!lookbookGrid) return;

  if (reset) lookbookGrid.innerHTML = '';

  const filtered = getFilteredHats();
  const toShow = filtered.slice(0, visibleCount);

  if (reset) {
    if (toShow.length === 0) {
      lookbookGrid.innerHTML = `
        <p style="grid-column: 1/-1; padding: 60px 0; color: var(--ink-45); font-size: 13px; letter-spacing: .1em; text-transform: uppercase; text-align: center;">
          No pieces in this category yet.
        </p>`;
      if (loadMoreWrap) loadMoreWrap.style.display = 'none';
      return;
    }
    toShow.forEach(hat => createCard(hat, lookbookGrid));
  } else {
    const previouslyShown = visibleCount - ITEMS_PER_LOAD;
    const newItems = filtered.slice(previouslyShown, visibleCount);
    newItems.forEach(hat => createCard(hat, lookbookGrid));
  }

  if (loadMoreWrap) {
    loadMoreWrap.style.display = (visibleCount >= filtered.length) ? 'none' : 'flex';
  }
}

function createCard(hat, container) {
  const div = document.createElement('div');
  div.className = `lookbook-item ${hat.lbClass || ''}`;
  div.innerHTML = `
    <img src="${hat.images[0]}" alt="${hat.name}" loading="lazy">
    <div class="collection-info">
      <span>${hat.name}</span>
      <small>${hat.meta}</small>
    </div>
  `;
  div.addEventListener('click', () => goToItem(hat.no));
  container.appendChild(div);
}

const filterPills = document.querySelectorAll('.filter-pill');
filterPills.forEach(pill => {
  pill.addEventListener('click', () => {
    filterPills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    activeCategory = pill.dataset.filter;
    visibleCount   = ITEMS_PER_LOAD;
    renderLookbook(true);
  });
});

if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    visibleCount += ITEMS_PER_LOAD;
    renderLookbook(false);
  });
}

renderLookbook(true);

function goToItem(no) {
  window.location.href = `item.html?no=${no}`;
}


// ===================== ITEM DETAIL LOGIC =====================
const itemNoEl    = document.querySelector('.item-no');
const itemTitleEl = document.querySelector('.item-info h1');

if (itemNoEl) {
  const urlParams = new URLSearchParams(window.location.search);
  const hatNo     = urlParams.get('no');
  const currentHat = HATS.find(hat => hat.no === hatNo);

  if (currentHat) {
    itemNoEl.textContent    = `No. ${currentHat.no}`;
    itemTitleEl.textContent = currentHat.name;
    document.title          = `No. ${currentHat.no} - ${currentHat.name} | Christine's Atelier`;

    const enquireBtn = document.getElementById('enquireBtn');
    if (enquireBtn) {
      enquireBtn.href = buildWhatsApp(`Hi Christine's Atelier, I'd like to enquire about ${currentHat.name}.`);
    }

    const slides = document.querySelectorAll('.carousel-slide');
    const thumbnails = document.querySelectorAll('.carousel-thumbnail');
    let activeSlide = 0;

    slides.forEach((slide, index) => {
      slide.src = currentHat.images[index];
      slide.alt = `${currentHat.name}${index === 0 ? '' : ` detail ${index}`}`;
      if (thumbnails[index]) thumbnails[index].querySelector('img').src = currentHat.images[index];
    });

    const showSlide = index => {
      activeSlide = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle('is-active', i === activeSlide));
      thumbnails.forEach((thumbnail, i) => {
        thumbnail.classList.toggle('is-active', i === activeSlide);
        thumbnail.setAttribute('aria-pressed', i === activeSlide ? 'true' : 'false');
      });
    };

    thumbnails.forEach((thumbnail, index) => thumbnail.addEventListener('click', () => showSlide(index)));
  }
}


// ===================== JOURNAL LOGIC =====================
const journalData = [
  { cat: "Process", title: "The Making of a Hat", excerpt: "From sketch to final form — a look inside the atelier, and the hours of hand-blocking behind every piece.", author: "Christine's Atelier", readTime: "4 min read", date: "12.02.2026", seed: "hat-journal-1", slug: "making-a-hat", body: ["A hat begins with proportion: the balance between crown, brim and the person who will wear it. A sketch sets the direction, but the material gives the design its character.", "The form is blocked by hand, shaped in stages and left to settle before it is trimmed. Small adjustments to angle and scale are what make a finished piece feel considered rather than simply made."] },
  { cat: "Material", title: "On Felt, Straw and Silk", excerpt: "The materials that shape our collections, and the way they interact with light and movement.", author: "Christine's Atelier", readTime: "5 min read", date: "08.02.2026", seed: "hat-journal-2", slug: "felt-straw-silk", body: ["Felt, straw and silk each hold a different relationship to light. Felt keeps a clean line; straw brings openness and texture; silk softens a shape with movement.", "Choosing a material is part of designing for the person who will wear the piece. Weight, season and finish all matter, so each material is handled and tested before it becomes part of a collection."] },
  { cat: "Editorial", title: "Collection 01 — Lagos", excerpt: "A photographic study of our latest collection, shot on location in the city.", author: "Christine's Atelier", readTime: "3 min read", date: "01.02.2026", seed: "hat-journal-3", slug: "collection-01-lagos", body: ["Collection 01 looks at sculptural form through the rhythm of Lagos. The pieces are photographed in the city they were made in, among the movement, colour and changing light that shape the work.", "Each look brings a different silhouette into focus, from soft curves to more defined brims. Together, they form a catalogue of headwear made to be noticed and lived in."] },
  { cat: "Culture", title: "The Return of the Headpiece", excerpt: "Why sculptural headwear is finding new life in contemporary wardrobes.", author: "Christine's Atelier", readTime: "6 min read", date: "22.01.2026", seed: "hat-journal-4", slug: "return-of-the-headpiece", body: ["A headpiece can change the feeling of an outfit without asking the wearer to become someone else. It frames the face, shifts proportion and gives everyday dressing a clear point of view.", "Today, sculptural headwear moves easily between occasion and personal style. The most compelling pieces are not costumes; they are familiar forms made individual through shape, material and attitude."] },
  { cat: "Atelier", title: "Inside the Studio", excerpt: "A quiet morning at the workbench, and the rituals that shape how each piece gets made.", author: "Christine's Atelier", readTime: "3 min read", date: "15.01.2026", seed: "hat-journal-5", slug: "inside-the-studio", body: ["The studio begins with a clear work surface, a pattern close at hand and the material selected for the day. Some parts of the process are measured; others depend on the eye and the feel of the shape as it develops.", "Blocking, trimming and finishing take patience. The final details are small, but they are what allow a handmade piece to sit comfortably and hold its character over time."] },
];

const journalPost = document.getElementById('journalPost');
if (journalPost) {
  const postId = new URLSearchParams(window.location.search).get('id');
  const post = journalData.find(item => item.slug === postId) || journalData[0];
  const postImage = document.getElementById('journalPostImage');
  const shareToast = document.createElement('div');
  shareToast.className = 'journal-share-toast';
  shareToast.setAttribute('role', 'status');
  shareToast.setAttribute('aria-live', 'polite');
  shareToast.hidden = true;
  document.body.appendChild(shareToast);
  let shareToastTimeout;
  let shareToastHideTimeout;

  const showShareToast = message => {
    window.clearTimeout(shareToastTimeout);
    window.clearTimeout(shareToastHideTimeout);
    shareToast.textContent = message;
    shareToast.hidden = false;
    requestAnimationFrame(() => shareToast.classList.add('is-visible'));
    shareToastTimeout = window.setTimeout(() => {
      shareToast.classList.remove('is-visible');
      shareToastHideTimeout = window.setTimeout(() => { shareToast.hidden = true; }, 220);
    }, 2800);
  };

  document.title = `${post.title} | Christine's Atelier Journal`;
  document.getElementById('journalPostDate').textContent = post.date;
  document.getElementById('journalPostAuthor').textContent = post.author;
  document.getElementById('journalPostReadTime').textContent = post.readTime;
  document.getElementById('journalPostCategory').textContent = post.cat;
  document.getElementById('journalPostTitle').textContent = post.title;
  document.getElementById('journalPostExcerpt').textContent = post.excerpt;
  postImage.src = `https://picsum.photos/seed/${post.seed}/600/450`;
  postImage.alt = post.title;
  document.getElementById('journalPostBody').innerHTML = post.body.map(paragraph => `<p>${paragraph}</p>`).join('');

  document.getElementById('journalPrint').addEventListener('click', () => window.print());
  const shareButton = document.getElementById('journalShare');
  const shareMenu = document.getElementById('journalShareMenu');
  const articleUrl = window.location.href;
  shareButton.addEventListener('click', () => {
    const isOpen = shareButton.getAttribute('aria-expanded') === 'true';
    shareButton.setAttribute('aria-expanded', String(!isOpen));
    shareMenu.hidden = isOpen;
  });
  document.getElementById('journalShareEmail').href = `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(articleUrl)}`;
  document.getElementById('journalShareWhatsApp').href = `https://wa.me/?text=${encodeURIComponent(`${post.title} ${articleUrl}`)}`;
  document.getElementById('journalShareCopy').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      showShareToast('Your link has been copied.');
      shareMenu.hidden = true;
      shareButton.setAttribute('aria-expanded', 'false');
    } catch (error) {
      showShareToast('Your browser could not copy the link. Email or WhatsApp are still available.');
    }
  });
}

const journalGrid = document.getElementById('journalGrid');

function renderJournal(filter = 'all') {
  if (!journalGrid) return;
  journalGrid.innerHTML = '';

  const filtered = filter === 'all'
    ? journalData
    : journalData.filter(item => item.cat.toLowerCase() === filter);

  if (filtered.length === 0) {
    journalGrid.innerHTML = `<div class="journal-empty">No entries in this category yet.</div>`;
    return;
  }

  filtered.forEach(item => {
    const article = document.createElement('a');
    article.className = 'j-article';
    article.href = `journal-post.html?id=${encodeURIComponent(item.slug)}`;
    article.innerHTML = `
      <div class="j-article-meta">
        <span class="j-date">${item.date}</span>
        <span class="j-tag">${item.cat}</span>
      </div>
      <div class="j-frame">
        <img src="https://picsum.photos/seed/${item.seed}/600/450" alt="${item.title}" loading="lazy">
      </div>
      <h3>${item.title}</h3>
      <p>${item.excerpt}</p>
      <div class="j-bottom">
        <span class="j-author">${item.author} · ${item.readTime}</span>
        <span class="j-read">Read more →</span>
      </div>
    `;
    journalGrid.appendChild(article);
  });
}

const jcatPills = document.querySelectorAll('.jcat-pill');
if (jcatPills.length > 0) {
  jcatPills.forEach(pill => {
    pill.addEventListener('click', () => {
      jcatPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      renderJournal(pill.dataset.filter);
    });
  });
}

renderJournal('all');

const storyTimeline = document.querySelector('.about-story-timeline');
if (storyTimeline) {
  const milestones = [
    { title: 'August 2006 — The Idea', columns: [["It started in a small back room in Lagos, with one block, one bundle of straw, and a stubborn idea that a hat could be more than an accessory — that it could be a decision, worn openly.", "The first piece took weeks. The second took days. By the third, I knew this was the thing I wanted to spend my life doing."], ["Every collection since has started from that same place: a single sketch, a quiet morning, and the question of what the women who wear our hats actually need.", "Twenty years on, the studio still works from that original intention — patient, deliberate, and quietly stubborn about doing things the long way."]] },
    { title: 'July 2010 — First studio', columns: [["In 2010, the work moved into its first dedicated studio. Having a place for blocks, materials and unfinished pieces made room for a more deliberate rhythm.", "The small space became a place to test shapes, learn from each commission and build a practice one piece at a time."], ["Working closely with clients shaped how the hats were made: how they should sit, how they should move, and how they could feel entirely their own.", "That first studio set the foundation for the considered, hands-on process that continues today."]] },
    { title: 'September 2016 — First editorial', columns: [["The first editorial brought the hats into a new setting. Styling and photography showed how each silhouette could shift the mood of a look.", "It was an opportunity to see the collection as a whole, and to share the craft with people meeting the work for the first time."], ["The images helped define a visual language for the brand: expressive shapes, thoughtful details and headwear that holds its own.", "That collaboration opened the door to more creative projects and new ways of telling the story behind each piece."]] },
    { title: 'February 2020 — Made to order', columns: [["Made-to-order work gave clients a more personal way to choose shape, colour and finishing details. Each commission starts with a conversation about the occasion and the person wearing it.", "The process keeps fit and comfort in view from the first sketch through the final fitting."], ["Rather than making more, the focus is on making with intention. Materials are selected for the design, then shaped and finished by hand.", "Every custom piece carries the shared decisions that brought it into being."]] },
    { title: 'September 2026 — First show', columns: [["Collection 01 brings the studio's ideas together in a single presentation: sculptural forms, tactile materials and pieces designed for real wardrobes.", "The first show marks a new chapter for Christine's Atelier and its growing community of headwear lovers."], ["Rooted in Lagos, the collection looks outward while staying close to the hands and processes that shaped it.", "It is a milestone, and an invitation to discover what comes next."]] },
  ];
  const milestoneButtons = [...storyTimeline.querySelectorAll('.about-story-year')];
  const storyTitle = document.querySelector('.about-story-title');
  const storyColumns = document.querySelector('.about-story-cols');
  let selectedMilestone = 0;
  let previewMilestone = 0;

  const renderMilestone = index => {
    const milestone = milestones[index];
    previewMilestone = index;
    const milestoneButton = milestoneButtons[index];
    const railRect = storyTimeline.getBoundingClientRect();
    const labelRect = milestoneButton.querySelector('.about-story-label').getBoundingClientRect();
    const labelCenter = labelRect.left - railRect.left + storyTimeline.scrollLeft + labelRect.width / 2;
    storyTimeline.style.setProperty('--story-position', `${labelCenter - 32}px`);
    storyTitle.textContent = milestone.title;
    storyColumns.innerHTML = milestone.columns.map(column => `<div class="about-story-col">${column.map(paragraph => `<p>${paragraph}</p>`).join('')}</div>`).join('');
    milestoneButtons.forEach((button, buttonIndex) => {
      button.classList.toggle('is-active', buttonIndex === selectedMilestone);
      button.classList.toggle('is-preview', buttonIndex === previewMilestone);
      button.setAttribute('aria-selected', buttonIndex === selectedMilestone ? 'true' : 'false');
    });
  };

  milestoneButtons.forEach((button, index) => {
    button.addEventListener('mouseenter', () => renderMilestone(index));
    button.addEventListener('focus', () => renderMilestone(index));
    button.addEventListener('click', () => {
      selectedMilestone = index;
      renderMilestone(index);
    });
    button.addEventListener('keydown', event => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      const nextIndex = (index + (event.key === 'ArrowRight' ? 1 : -1) + milestoneButtons.length) % milestoneButtons.length;
      milestoneButtons[nextIndex].focus();
    });
  });
  storyTimeline.addEventListener('mouseleave', () => renderMilestone(selectedMilestone));
  window.addEventListener('resize', () => renderMilestone(previewMilestone));
  renderMilestone(selectedMilestone);
}

// ===================== COVER — ENTER BUTTON =====================
const coverEnter = document.getElementById('coverEnter');

if (coverEnter) {
  coverEnter.addEventListener('click', () => {
    // Smooth-scroll down to the atelier section (the first section after the cover)
    const next = document.querySelector('.atelier-section');
    if (next) {
      next.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  // Optional: Enter key triggers it too
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.target.matches('input, textarea, button, a')) {
      coverEnter.click();
    }
  });
}