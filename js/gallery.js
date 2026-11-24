'use strict';

(() => {
  const ALL = 'All';
  const PROPOSAL_LABEL = 'PT 시안';
  const LANDING_CATEGORY = 'Landing Page';

  const filterList = document.querySelector('[data-filter-list]');
  const grid = document.querySelector('[data-grid]');
  const viewer = document.querySelector('[data-viewer]');
  const viewerTitle = viewer.querySelector('[data-viewer-title]');
  const viewerTags = viewer.querySelector('[data-viewer-tags]');
  const viewerMeta = viewer.querySelector('[data-viewer-meta]');
  const viewerBody = viewer.querySelector('[data-viewer-body]');
  const viewerClose = viewer.querySelector('[data-viewer-close]');

  // 작업 목록은 js/works.js 에 있다
  const works = typeof WORKS !== 'undefined' ? WORKS : [];

  // 크게 보기 창의 현재 상태
  const state = { work: null };

  /* ---------- 공통 ---------- */

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function workName(work) {
    return work.title ? `${work.brand} · ${work.title}` : work.brand;
  }

  // "카테고리 · 연도" (연도가 비어 있으면 카테고리만)
  function workInfo(work) {
    return [work.category, work.year].filter(Boolean).join(' · ');
  }

  function isLanding(work) {
    return work.category === LANDING_CATEGORY;
  }

  // 이미지가 없거나 불러오지 못하면 회색 상자로 대신 채운다
  function placeholder(label, shape) {
    const box = el('div', `placeholder placeholder--${shape}`);
    box.appendChild(el('span', 'placeholder__label', label));
    return box;
  }

  function image(src, alt, label, shape) {
    if (!src) return placeholder(label, shape);
    const img = document.createElement('img');
    img.alt = alt;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.addEventListener('error', () => img.replaceWith(placeholder(label, shape)), { once: true });
    img.src = src;
    return img;
  }

  function proposalBadge() {
    return el('span', 'badge', PROPOSAL_LABEL);
  }

  /* ---------- 상단 숫자 줄 ---------- */

  // 경력 연수: 시작 연월부터 꽉 채운 햇수 (6년 10개월 → 6+)
  function careerYears() {
    if (typeof CAREER_START === 'undefined') return null;
    const [year, month] = CAREER_START.split('-').map(Number);
    const now = new Date();
    const months = (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month);
    return Math.floor(months / 12);
  }

  function renderStats() {
    const container = document.querySelector('[data-stats]');
    if (!container) return;

    const brands = new Set(works.map((work) => work.brand)).size;
    const ads = works
      .filter((work) => work.category === 'Display Ads')
      .reduce((sum, work) => sum + work.images.length, 0);
    const landings = works.filter(isLanding).length;
    const years = careerYears();

    const items = [
      years != null && { value: years, unit: '+', label: 'Years of Experience' },
      { value: brands, label: 'Brands' },
      { value: ads, label: 'Display Ads' },
      { value: landings, label: 'Landing Pages' },
    ].filter(Boolean);

    items.forEach(({ value, unit, label }) => {
      const item = el('li', 'stat');
      const number = el('span', 'stat__value', String(value));
      if (unit) number.appendChild(el('span', 'stat__unit', unit));
      item.append(number, el('span', 'stat__label', label));
      container.appendChild(item);
    });
  }

  /* ---------- 필터 ---------- */

  // 필터 순서: works.js의 CATEGORY_ORDER 순서대로, 거기 없는 카테고리는 뒤에 나온 순서대로
  function categories() {
    const order = typeof CATEGORY_ORDER !== 'undefined' ? CATEGORY_ORDER : [];
    const used = [];
    works.forEach((work) => {
      if (!used.includes(work.category)) used.push(work.category);
    });
    const listed = order.filter((category) => used.includes(category));
    const rest = used.filter((category) => !order.includes(category));
    return [ALL, ...listed, ...rest];
  }

  function renderFilter() {
    categories().forEach((category, i) => {
      const button = el('button', 'filter__button', category);
      button.type = 'button';
      button.dataset.category = category;
      button.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
      filterList.appendChild(button);
    });

    filterList.addEventListener('click', (event) => {
      const button = event.target.closest('[data-category]');
      if (!button) return;
      applyFilter(button.dataset.category);
    });
  }

  let currentFilter = ALL;
  let filterTimer = null;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // CSS 변수에 적힌 시간(예: "180ms")을 숫자로 읽는다
  function cssMs(name) {
    return parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name)) || 0;
  }

  function applyFilter(category) {
    if (category === currentFilter) return;
    currentFilter = category;

    filterList.querySelectorAll('[data-category]').forEach((button) => {
      button.setAttribute('aria-pressed', button.dataset.category === category ? 'true' : 'false');
    });

    // 빠르게 연달아 누르면 앞의 전환은 취소하고 마지막 것만 보여준다
    clearTimeout(filterTimer);
    grid.classList.remove('is-entering');

    if (reduceMotion.matches) {
      showCards(category);
      grid.classList.remove('is-leaving');
      return;
    }

    // 1) 나가기
    grid.classList.add('is-leaving');
    filterTimer = setTimeout(() => {
      // 2) 칸 바꾸고 들어오기
      const count = showCards(category);
      grid.classList.remove('is-leaving');
      void grid.offsetWidth; // 애니메이션을 처음부터 다시 시작시키기 위한 줄
      grid.classList.add('is-entering');

      const duration = cssMs('--filter-in') + cssMs('--filter-stagger') * count;
      filterTimer = setTimeout(() => grid.classList.remove('is-entering'), duration + 50);
    }, cssMs('--filter-out'));
  }

  // 카테고리에 맞는 칸만 보이게 하고, 보이는 칸에 떠오르는 순서를 매긴다
  function showCards(category) {
    let order = 0;
    grid.querySelectorAll('[data-card]').forEach((card) => {
      const visible = category === ALL || card.dataset.category === category;
      card.hidden = !visible;
      if (visible) card.style.setProperty('--order', Math.min(order++, 11));
    });
    return Math.min(order, 12);
  }

  /* ---------- 썸네일 격자 ---------- */

  function renderGrid() {
    works.forEach((work, i) => {
      const item = el('li', 'grid__item');
      item.dataset.card = '';
      item.dataset.category = work.category;

      const card = el('button', 'card');
      card.type = 'button';
      card.dataset.index = i;

      const thumb = el('div', 'card__thumb');
      const src = work.thumbnail || (work.images && work.images[0]);
      thumb.appendChild(image(src, workName(work), `${work.brand}\n${work.category}`, 'fill'));
      if (work.type === '제안') thumb.appendChild(proposalBadge());

      const caption = el('div', 'card__caption');
      caption.appendChild(el('span', 'card__name', workName(work)));
      caption.appendChild(el('span', 'card__info', workInfo(work)));

      card.append(thumb, caption);
      item.appendChild(card);
      grid.appendChild(item);
    });

    grid.addEventListener('click', (event) => {
      const card = event.target.closest('.card');
      if (!card) return;
      openViewer(works[Number(card.dataset.index)]);
    });
  }

  /* ---------- 크게 보기 창 ---------- */

  function openViewer(work) {
    state.work = work;

    viewerTitle.textContent = workName(work);

    viewerTags.replaceChildren();
    viewerTags.appendChild(el('span', 'viewer__tag', workInfo(work)));
    if (work.type === '제안') viewerTags.appendChild(proposalBadge());

    viewerMeta.replaceChildren();
    if (work.role) addMeta('역할', work.role);
    if (work.summary) addMeta('설명', work.summary);
    viewerMeta.hidden = !viewerMeta.children.length;

    renderViewerBody();
    document.documentElement.classList.add('is-locked');
    viewer.showModal();
    viewer.scrollTop = 0;
  }

  function addMeta(term, description) {
    const row = el('div', 'viewer__meta-row');
    row.append(el('dt', null, term), el('dd', null, description));
    viewerMeta.appendChild(row);
  }

  function renderViewerBody() {
    const { work } = state;
    viewerBody.replaceChildren();
    if (isLanding(work)) renderLanding(work);
    else renderImageGrid(work);
  }

  // 랜딩페이지: 긴 이미지를 세로로 이어서 보여준다
  function renderLanding(work) {
    const wrap = el('div', 'viewer__landing');
    work.images.forEach((src, i) => {
      wrap.appendChild(image(src, `${workName(work)} ${i + 1}`, `${work.brand} 랜딩페이지`, 'tall'));
    });
    viewerBody.appendChild(wrap);
  }

  // 배너·소셜 미디어 등: 여러 장을 격자로 보여준다 (한 장씩 크게 보는 화면은 없음)
  function renderImageGrid(work) {
    const list = el('ul', 'viewer__grid');
    work.images.forEach((src, i) => {
      const item = el('li', 'viewer__grid-item');
      item.appendChild(image(src, `${workName(work)} ${i + 1}`, `${work.brand}\n${i + 1}`, 'fill'));
      list.appendChild(item);
    });
    viewerBody.appendChild(list);
  }

  viewerClose.addEventListener('click', () => viewer.close());

  // 작업 이미지·글자가 아닌 빈 곳을 누르면 닫기
  viewer.addEventListener('click', (event) => {
    if (event.target.closest('.viewer__grid-item, .viewer__landing, .viewer__head, .viewer__meta')) return;
    viewer.close();
  });

  viewer.addEventListener('close', () => {
    document.documentElement.classList.remove('is-locked');
    state.work = null;
  });

  renderStats();
  renderFilter();
  renderGrid();
})();
