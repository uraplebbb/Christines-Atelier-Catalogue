// ---- Shared navigation ----
const nav = document.getElementById('siteNav');
const navLinks = document.getElementById('navLinks');
const menuToggle = document.getElementById('menuToggle');
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('.navlink').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === currentPage);
});

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
}

if (nav) {
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// ---- Home / Latest Section ----
const latestGrid = document.getElementById('latestGrid');
const PRODUCTS = [
    { name:"The Ms Christie", meta:"Cotton / wrapped", image:"images/Ms. Christie/THE MS CHRISTIE 135K.jpeg" },
    { name:"The Angelica", meta:"Straw / wide brim", image:"images/The Angelica/The Angelica 200k(2).jpg" },
    { name:"The Star Burst", meta:"Silk / boater", image:"images/The Star Burst/THE Star Burst 85K.jpeg" },
];

if (latestGrid) {
    PRODUCTS.forEach(product => {
        const div = document.createElement('div');
        div.className = 'latest-item';
        div.innerHTML = `
            <div class="frame"><img src="${product.image}" alt="${product.name}"></div>
            <div class="latest-overlay">
                <span class="lname">${product.name}</span>
                <span class="lmeta">${product.meta}</span>
            </div>
        `;
        div.addEventListener('click', () => window.location.href = 'collection.html');
        latestGrid.appendChild(div);
    });
}

// ---- Newsletter ----
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', event => event.preventDefault());
}

// ---- Contact links ----
const WHATSAPP_NUMBER = '2348000000000';
const CONTACT_EMAIL = 'hello@christinesatelier.com';
const BESPOKE_EMAIL = 'bespoke@christinesatelier.com';

function buildWhatsApp(message) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function buildGmail(subject, body = '', recipient = CONTACT_EMAIL) {
    const params = new URLSearchParams({ view: 'cm', fs: '1', to: recipient, su: subject, body });
    return `https://mail.google.com/mail/?${params.toString()}`;
}

const generalEmail = document.getElementById('generalEmail');
if (generalEmail) {
    generalEmail.href = buildGmail('General enquiry - Christine\'s Atelier');
}

const bespokeEmail = document.getElementById('bespokeEmail');
if (bespokeEmail) {
    bespokeEmail.href = buildGmail('Bespoke enquiry - Christine\'s Atelier', '', BESPOKE_EMAIL);
}

const contactWhatsapp = document.getElementById('contactWhatsapp');
if (contactWhatsapp) {
    contactWhatsapp.href = buildWhatsApp("Hi Christine's Atelier, I'd like to make an enquiry.");
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', event => {
        event.preventDefault();
        const name = document.getElementById('contactName').value.trim();
        const sender = document.getElementById('contactSender').value.trim();
        const message = document.getElementById('contactMessage').value.trim();
        const body = `Name: ${name}\nEmail: ${sender}\n\n${message}`;
        window.open(buildGmail('Website enquiry - Christine\'s Atelier', body), '_blank', 'noopener');
    });
}

// ---- COLLECTION LOGIC ----
// These are the placeholder images. Will replace the URLs later.
const HATS = [
    { no: "01", name: "The Abi KD",      meta: "Wool / silk / wire",         category: "structured",   images: ["images/The Abi KD/THE ABI-KD 155K .jpeg", "images/The Abi KD/The Abi Kd 150k.jpg", "images/The Abi KD/The ABI KD 155k.jpg"] },
    { no: "02", name: "The Angelica",    meta: "Straw / wide brim",          category: "wide-brim",    images: ["images/The Angelica/The Angelica 200k(2).jpg", "images/The Angelica/The Angelica 200k(1).jpg", "images/The Angelica/The Angelica 200k(3).jpg"] },
    { no: "03", name: "The Star Burst",  meta: "Silk / boater",              category: "avant-garde",  images: ["images/The Star Burst/THE Star Burst 85K.jpeg", "images/The Star Burst/The Star Burst 85k.jpg", "images/The Star Burst/The Start burst 85k(1).jpg"] },
    { no: "04", name: "The Bello",       meta: "Wool felt / cloche",         category: "structured",   images: ["images/The Bello/The Fidat 120k.jpg", "images/The Bello/The Fidat 120k(1).jpg", "images/The Bello/The Fidat 120k(2).jpg"] },
    { no: "05", name: "The Cordelia",    meta: "Sinamay / sculpted",         category: "fascinator",   images: ["images/The Cordelia/THE Cordelia 155K.jpeg", "images/The Cordelia/The Cordelia 155k.jpg", "images/The Cordelia/The Cordelia 155k(1).jpg"] },
    { no: "06", name: "The Ms Christie", meta: "Cotton / wrapped",           category: "structured",   images: ["images/Ms. Christie/THE MS CHRISTIE 135K.jpeg", "images/Ms. Christie/Ms. Christie 135k.jpg", "images/Ms. Christie/Ms. Christie 135k(1).jpg"] },
    { no: "07", name: "The Azure Pine",  meta: "Felt / folded brim",         category: "avant-garde",  images: ["images/The Azure Pine/THE AZURE PINE 155K.jpeg", "images/The Azure Pine/The Azure pine 135k.jpg", "images/The Azure Pine/The Azure pine 135k_.jpg"] },
    { no: "08", name: "The Goodness",    meta: "Straw / hand-blocked",       category: "wide-brim",    images: ["images/The Goodness/The Goodness 200k.jpg", "images/The Goodness/The Goodness 200k(1).jpg", "images/The Goodness/The Goodness 200k(2).jpg"] },
    { no: "09", name: "The Iffy",        meta: "Silk / veil",                category: "fascinator",   images: ["images/The Iffy/THE IFFY 90K.jpeg", "images/The Iffy/The iffy(1).jpg", "images/The Iffy/The iffy(2).jpg"] },
    { no: "10", name: "The Bode",        meta: "Wool / soft crown",          category: "unisex",       images: ["images/The Bode/The Bode 50k.jpg", "images/The Bode/The Bode 50k(1).jpg", "images/The Bode/The Bode 50k_.jpg"] },
    { no: "11", name: "The Ariella",     meta: "Jute / wide brim",           category: "wide-brim",    images: ["images/The Ariella/The Ariella 85k.jpg", "images/The Ariella/The Ariella 85k(1).jpg", "images/The Ariella/The Ariella 85k(2).jpg"] },
    { no: "12", name: "The Folasade",    meta: "Felt / ribbon",              category: "structured",   images: ["images/The Folasade/The Folashade 135k.jpg", "images/The Folasade/The Folashade 135k(1).jpg", "images/The Folasade/The Folashade (120k).jpg"] },
];

// ---- COLLECTION: Filter + Load More ----
const lookbookGrid = document.getElementById('lookbookGrid');
const loadMoreWrap = document.getElementById('loadMoreWrap');
const loadMoreBtn = document.getElementById('loadMoreBtn');

let activeCategory = 'all';
let visibleCount = 8; // how many items to show initially
const ITEMS_PER_LOAD = 8; // how many to add per "Load more" click

function getFilteredHats() {
  return activeCategory === 'all'
    ? HATS
    : HATS.filter(hat => hat.category === activeCategory);
}

function renderLookbook(reset = false) {
  if (!lookbookGrid) return;

  if (reset) {
    lookbookGrid.innerHTML = '';
  }

  const filtered = getFilteredHats();
  const toShow = filtered.slice(0, visibleCount);

  // Only re-render if we're resetting, or append the new items
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
    // Append only the newly revealed items
    const previouslyShown = visibleCount - ITEMS_PER_LOAD;
    const newItems = filtered.slice(previouslyShown, visibleCount);
    newItems.forEach(hat => createCard(hat, lookbookGrid));
  }

  // Show or hide the "Load more" button
  if (loadMoreWrap) {
    if (visibleCount >= filtered.length) {
      loadMoreWrap.style.display = 'none';
    } else {
      loadMoreWrap.style.display = 'flex';
    }
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

// Filter button listeners
const filterPills = document.querySelectorAll('.filter-pill');
filterPills.forEach(pill => {
  pill.addEventListener('click', () => {
    filterPills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    activeCategory = pill.dataset.filter;
    visibleCount = ITEMS_PER_LOAD; // reset pagination
    renderLookbook(true); // reset and re-render
  });
});

// Load more button
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    visibleCount += ITEMS_PER_LOAD;
    renderLookbook(false); // append new items
  });
}

// Initial render
renderLookbook(true);

// Function to create links to item.html
function goToItem(no) {
    window.location.href = `item.html?no=${no}`;
}

// ---- ITEM DETAIL LOGIC (Only runs on item.html) ----
const itemNoEl = document.querySelector('.item-no');
const itemTitleEl = document.querySelector('.item-info h1');

if (itemNoEl) {
    // Get the ?no= parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const hatNo = urlParams.get('no');
    
    const currentHat = HATS.find(hat => hat.no === hatNo);
    
    if (currentHat) {
        itemNoEl.textContent = `No. ${currentHat.no}`;
        itemTitleEl.textContent = currentHat.name;
        document.title = `No. ${currentHat.no} - ${currentHat.name} | Christine's Atelier`;
        const enquireBtn = document.getElementById('enquireBtn');
        if (enquireBtn) {
            enquireBtn.href = buildWhatsApp(`Hi Christine's Atelier, I'd like to enquire about ${currentHat.name}.`);
        }
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.carousel-dot');
        let activeSlide = 0;

        slides.forEach((slide, index) => {
            slide.src = currentHat.images[index];
            slide.alt = `${currentHat.name}${index === 0 ? '' : ` detail ${index}`}`;
        });

        const showSlide = index => {
            activeSlide = index;
            slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === activeSlide));
            dots.forEach((dot, dotIndex) => dot.setAttribute('aria-selected', dotIndex === activeSlide ? 'true' : 'false'));
        };

        dots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(index)));
        window.setInterval(() => showSlide((activeSlide + 1) % slides.length), 4500);
    }
}

// ===================== JOURNAL LOGIC =====================
const journalData = [
    {
        cat: "Process",
        title: "The Making of a Hat",
        excerpt: "From sketch to final form — a look inside the atelier, and the hours of hand-blocking behind every piece.",
        author: "Christine's Atelier",
        readTime: "4 min read",
        seed: "hat-journal-1"
    },
    {
        cat: "Material",
        title: "On Felt, Straw and Silk",
        excerpt: "The materials that shape our collections, and the way they interact with light and movement.",
        author: "Christine's Atelier",
        readTime: "5 min read",
        seed: "hat-journal-2"
    },
    {
        cat: "Editorial",
        title: "Collection 01 — London",
        excerpt: "A photographic study of our latest collection, shot on location in the city.",
        author: "Christine's Atelier",
        readTime: "3 min read",
        seed: "hat-journal-3"
    }
];

const journalList = document.getElementById('journalList');

function renderJournal(filter = 'all') {
    if (!journalList) return; 
    
    journalList.innerHTML = '';
    
    const filteredData = filter === 'all' ? journalData : journalData.filter(item => item.cat === filter);
    
    filteredData.forEach((item) => {
        const article = document.createElement('article');
        article.className = 'j-article';
        article.innerHTML = `
            <div class="frame">
                <img src="https://picsum.photos/seed/${item.seed}/600/450" alt="${item.title}">
            </div>
            <div>
                <div class="jtag">${item.cat}</div>
                <h3>${item.title}</h3>
                <p>${item.excerpt}</p>
                <div class="jmeta">Author: ${item.author} · ${item.readTime}</div>
                <br>
                <a href="#" class="read-more">Read more →</a>
            </div>
        `;
        journalList.appendChild(article);
    });
}

// Sidebar Filtering
const jcats = document.querySelectorAll('.jcat');
if (jcats.length > 0) {
    jcats.forEach(btn => {
        btn.addEventListener('click', () => {
            jcats.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderJournal(btn.textContent.toLowerCase());
        });
    });
}

// Initial Render
renderJournal();

// -- CONTACT FORM LOGIC (Already handled above) --