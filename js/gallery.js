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
  const state = { work: null, mode: 'grid', index: 0 };

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
    const banners = works
      .filter((work) => work.category === 'Banner')
      .reduce((sum, work) => sum + work.images.length, 0);
    const landings = works.filter(isLanding).length;
    const years = careerYears();

    const items = [
      years != null && { value: years, unit: '+', label: 'Years of Experience' },
      { value: brands, label: 'Brands' },
      { value: banners, label: 'Banners' },
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

  function categories() {
    const list = [];
    works.forEach((work) => {
      if (!list.includes(work.category)) list.push(work.category);
    });
    return [ALL, ...list];
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
    state.mode = 'grid';
    state.index = 0;

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
    else if (state.mode === 'single') renderSingle(work);
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

  // 배너 등: 여러 장을 격자로 보여주고, 누르면 한 장씩 크게
  function renderImageGrid(work) {
    const list = el('ul', 'viewer__grid');
    work.images.forEach((src, i) => {
      const item = el('li');
      const button = el('button', 'viewer__grid-button');
      button.type = 'button';
      button.setAttribute('aria-label', `${i + 1}번째 이미지 크게 보기`);
      button.appendChild(image(src, `${workName(work)} ${i + 1}`, `${work.brand}\n${i + 1}`, 'fill'));
      button.addEventListener('click', () => showSingle(i));
      item.appendChild(button);
      list.appendChild(item);
    });
    viewerBody.appendChild(list);
  }

  function renderSingle(work) {
    const total = work.images.length;
    const i = state.index;

    const stage = el('div', 'viewer__single');
    stage.appendChild(image(work.images[i], `${workName(work)} ${i + 1}`, `${work.brand}\n${i + 1}`, 'square'));

    const nav = el('div', 'viewer__nav');
    const prev = navButton('← 이전', () => showSingle(i - 1));
    prev.disabled = i === 0;
    const back = navButton('목록', () => showGrid());
    const next = navButton('다음 →', () => showSingle(i + 1));
    next.disabled = i === total - 1;
    const counter = el('span', 'viewer__counter', `${i + 1} / ${total}`);

    nav.append(prev, back, counter, next);
    viewerBody.append(stage, nav);
  }

  function navButton(label, onClick) {
    const button = el('button', 'viewer__nav-button', label);
    button.type = 'button';
    button.addEventListener('click', onClick);
    return button;
  }

  function showSingle(index) {
    const total = state.work.images.length;
    if (index < 0 || index >= total) return;
    state.mode = 'single';
    state.index = index;
    renderViewerBody();
  }

  function showGrid() {
    state.mode = 'grid';
    renderViewerBody();
  }

  viewerClose.addEventListener('click', () => viewer.close());

  // 창 바깥(어두운 배경)을 누르면 닫기
  viewer.addEventListener('click', (event) => {
    if (event.target === viewer) viewer.close();
  });

  viewer.addEventListener('close', () => {
    document.documentElement.classList.remove('is-locked');
    state.work = null;
  });

  // 한 장씩 볼 때 키보드 좌우 화살표로 넘기기
  // (화면을 다시 그리면 포커스가 창 밖으로 빠질 수 있어 document에서 받는다)
  document.addEventListener('keydown', (event) => {
    if (!viewer.open || !state.work || state.mode !== 'single') return;
    if (event.key === 'ArrowLeft') showSingle(state.index - 1);
    if (event.key === 'ArrowRight') showSingle(state.index + 1);
  });

  renderStats();
  renderFilter();
  renderGrid();
})();
