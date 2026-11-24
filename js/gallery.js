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
  const viewerNav = viewer.querySelector('[data-viewer-nav]');
  const viewerInner = viewer.querySelector('.viewer__inner');

  // 작업 목록은 js/works.js 에 있다
  const works = typeof WORKS !== 'undefined' ? WORKS : [];

  // 크게 보기 창의 현재 상태
  const state = { work: null, index: -1 };

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
    // 랜딩페이지를 뺀 모든 작업물 장수 (광고·소셜 미디어 등, 앞으로 생길 카테고리 포함)
    const creatives = works
      .filter((work) => !isLanding(work))
      .reduce((sum, work) => sum + work.images.length, 0);
    const landings = works.filter(isLanding).length;
    const years = careerYears();

    const items = [
      years != null && { value: years, unit: '+', label: 'Years of Experience' },
      { value: brands, label: ['Brand', 'Brands'] },
      { value: creatives, label: ['Creative', 'Creatives'] },
      { value: landings, label: ['Landing Page', 'Landing Pages'] },
    ].filter((item) => item && item.value > 0); // 0인 칸은 숨긴다

    const counters = [];
    items.forEach(({ value, unit, label }) => {
      const item = el('li', 'stat');
      const number = el('span', 'stat__value');
      const digits = document.createTextNode(String(value));
      number.appendChild(digits);
      if (unit) number.appendChild(el('span', 'stat__unit', unit));
      // 1이면 단수(Brand), 2 이상이면 복수(Brands)
      const text = Array.isArray(label) ? label[value === 1 ? 0 : 1] : label;
      item.append(number, el('span', 'stat__label', text));
      container.appendChild(item);
      counters.push({ node: digits, value });
    });

    countUp(counters);
  }

  /* 처음 열 때 숫자가 0부터 올라가는 효과 (짧고 조용하게) */
  const COUNT = { delay: 300, duration: 1200, stagger: 120 };

  function countUp(counters) {
    if (reduceMotion.matches) return; // '동작 줄이기' 사용자는 처음부터 최종 숫자
    const easeOut = (t) => 1 - Math.pow(1 - t, 3); // 처음엔 빠르게, 끝에서 천천히
    counters.forEach(({ node, value }, i) => {
      node.textContent = '0';
      const start = performance.now() + COUNT.delay + i * COUNT.stagger;
      const step = (now) => {
        const t = Math.min(Math.max((now - start) / COUNT.duration, 0), 1);
        node.textContent = String(Math.round(easeOut(t) * value));
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
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
      // 썸네일 크롭 기준: crop 항목이 있으면 그대로, 없으면 랜딩은 위쪽·나머지는 가운데
      thumb.dataset.crop = work.crop || (isLanding(work) ? 'top' : 'center');
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
      openViewer(Number(card.dataset.index));
    });
  }

  /* ---------- 크게 보기 창 ---------- */

  // 지금 필터에서 보이는 작업들의 순서 (작업 창의 이전·다음 이동 기준)
  function visibleOrder() {
    return [...grid.querySelectorAll('[data-card]')]
      .filter((item) => !item.hidden)
      .map((item) => Number(item.querySelector('.card').dataset.index));
  }

  let historyPushed = false; // 창을 열 때 브라우저 기록을 한 칸 쌓았는지

  function openViewer(index) {
    renderViewer(index);
    document.documentElement.classList.add('is-locked');
    viewer.showModal();
    viewer.scrollTop = 0;
    // 휴대폰 뒤로 가기로 창만 닫히도록 기록을 한 칸 쌓는다
    if (!historyPushed) {
      history.pushState({ viewer: true }, '');
      historyPushed = true;
    }
  }

  // 창은 그대로 두고 다른 작업으로 바꾸기
  function goToWork(step) {
    const order = visibleOrder();
    const pos = order.indexOf(state.index);
    const next = order[pos + step];
    if (next == null) return;
    stopPeek();
    renderViewer(next);
    viewer.scrollTop = 0;
    // 바뀔 때 살짝 떠오르는 움직임 다시 재생
    viewerInner.style.animation = 'none';
    void viewerInner.offsetWidth;
    viewerInner.style.animation = '';
  }

  // 닫기 (쌓아둔 기록 정리는 아래 'close' 이벤트에서 한 번에 한다)
  function requestClose() {
    viewer.close();
  }

  function renderViewer(index) {
    const work = works[index];
    state.work = work;
    state.index = index;

    viewerTitle.textContent = workName(work);

    viewerTags.replaceChildren();
    viewerTags.appendChild(el('span', 'viewer__tag', workInfo(work)));
    if (work.type === '제안') viewerTags.appendChild(proposalBadge());

    viewerMeta.replaceChildren();
    // 작업 설명 (비워둔 항목은 나오지 않는다)
    if (work.objective) addMeta('Objective', work.objective);
    if (work.hook) addMeta('Hook', work.hook);
    if (work.design) addMeta('Design', work.design);
    viewerMeta.hidden = !viewerMeta.children.length;

    renderViewerBody();
    renderWorkNav();
  }

  // 창 맨 아래: 이전·다음 작업 이동 (브랜드 이름 표시)
  function renderWorkNav() {
    const order = visibleOrder();
    const pos = order.indexOf(state.index);
    viewerNav.replaceChildren();
    [[-1, 'prev', '←'], [1, 'next', '→']].forEach(([step, dir, arrow]) => {
      const target = order[pos + step];
      const button = el('button', `viewer__worknav-button viewer__worknav-button--${dir}`);
      button.type = 'button';
      if (target == null) {
        button.disabled = true;
        button.append(el('span', 'viewer__worknav-label', dir === 'prev' ? 'Prev' : 'Next'));
      } else {
        const name = workName(works[target]);
        button.setAttribute('aria-label', `${dir === 'prev' ? '이전' : '다음'} 작업: ${name}`);
        const label = el('span', 'viewer__worknav-label', dir === 'prev' ? `${arrow} Prev` : `Next ${arrow}`);
        button.append(label, el('span', 'viewer__worknav-name', name));
        button.addEventListener('click', () => goToWork(step));
      }
      viewerNav.appendChild(button);
    });
    viewerNav.appendChild(el('span', 'viewer__worknav-count', `${pos + 1} / ${order.length}`));
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
    else if (work.layout === 'panorama') renderPanorama(work);
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

  // 이어지는 캐러셀: 이미지를 틈 없이 가로로 붙여 옆으로 넘겨 본다
  function renderPanorama(work) {
    const strip = el('div', 'viewer__panorama');
    const track = el('div', 'viewer__panorama-track');
    work.images.forEach((src, i) => {
      track.appendChild(image(src, `${workName(work)} ${i + 1}`, `${work.brand}\n${i + 1}`, 'panel'));
    });
    strip.appendChild(track);
    enableSideScroll(strip);

    // 좌우 화살표: 그림 양옆 바깥, 세로 가운데. 끝에 닿으면 흐려진다. 누르면 한 화면의 80%만큼 넘어간다
    const arrow = (dir, label, text) => {
      const button = el('button', `viewer__panorama-arrow viewer__panorama-arrow--${dir}`, text);
      button.type = 'button';
      button.setAttribute('aria-label', label);
      button.addEventListener('click', () => {
        stopPeek();
        wrap.classList.add('is-touched');
        const step = strip.clientWidth * 0.8 * (dir === 'next' ? 1 : -1);
        strip.scrollBy({ left: step, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
      });
      return button;
    };
    const prev = arrow('prev', '이전으로 넘기기', '←');
    const next = arrow('next', '다음으로 넘기기', '→');

    // 얇은 진행 막대: 지금 전체 중 어디를 보고 있는지 (기본 가로 스크롤바 대신)
    const progress = el('div', 'viewer__panorama-progress');
    const bar = el('span', 'viewer__panorama-bar');
    progress.appendChild(bar);

    const frame = el('div', 'viewer__panorama-frame');
    frame.append(strip, prev, next);
    const wrap = el('div', 'viewer__panorama-wrap');
    wrap.append(frame, progress);
    viewerBody.appendChild(wrap);

    const update = () => {
      const max = strip.scrollWidth - strip.clientWidth;
      prev.disabled = strip.scrollLeft <= 1;
      next.disabled = strip.scrollLeft >= max - 1;
      bar.style.width = `${(strip.clientWidth / strip.scrollWidth) * 100}%`;
      bar.style.left = `${(strip.scrollLeft / strip.scrollWidth) * 100}%`;
    };
    strip.addEventListener('scroll', () => {
      update();
      if (!peek.running && strip.scrollLeft > 24) wrap.classList.add('is-touched'); // 직접 넘기면 화살표 흔들림 멈춤
    });
    track.querySelectorAll('img').forEach((img) => img.addEventListener('load', update));
    new ResizeObserver(update).observe(strip); // 창 크기가 바뀌면 다시 계산
    update();

    // 창이 열리고 잠시 뒤, 띠가 오른쪽으로 살짝 밀렸다 돌아온다 (옆으로 이어진다는 힌트)
    if (!reduceMotion.matches) {
      peek.timer = setTimeout(() => peekStrip(strip), PEEK.delay);
      ['pointerdown', 'wheel', 'touchstart'].forEach((type) =>
        strip.addEventListener(type, stopPeek, { passive: true }));
    }
  }

  /* 살짝 밀었다 돌아오는 힌트 움직임 */
  const PEEK = { delay: 700, distance: 140, duration: 1100 };
  const peek = { timer: null, frame: null, running: false };

  function peekStrip(strip) {
    if (strip.scrollLeft !== 0) return;
    const start = performance.now();
    peek.running = true;
    const step = (now) => {
      const t = Math.min((now - start) / PEEK.duration, 1);
      // 0 → 1 → 0 으로 부드럽게 (사인 곡선)
      strip.scrollLeft = Math.sin(t * Math.PI) * PEEK.distance;
      if (t < 1) peek.frame = requestAnimationFrame(step);
      else stopPeek();
    };
    peek.frame = requestAnimationFrame(step);
  }

  function stopPeek() {
    clearTimeout(peek.timer);
    cancelAnimationFrame(peek.frame);
    peek.timer = null;
    peek.frame = null;
    peek.running = false;
  }

  // 마우스 휠(위아래)로도 옆으로 넘어가게, 마우스로 끌어서도 넘길 수 있게
  function enableSideScroll(strip) {
    strip.addEventListener('wheel', (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return; // 트랙패드 가로 스크롤은 그대로
      const max = strip.scrollWidth - strip.clientWidth;
      const atStart = strip.scrollLeft <= 0 && event.deltaY < 0;
      const atEnd = strip.scrollLeft >= max - 1 && event.deltaY > 0;
      if (atStart || atEnd) return; // 양 끝에서는 창 스크롤로 넘긴다
      event.preventDefault();
      strip.scrollLeft += event.deltaY;
    }, { passive: false });

    let dragX = null;
    strip.addEventListener('pointerdown', (event) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      dragX = { x: event.clientX, left: strip.scrollLeft };
      strip.classList.add('is-dragging');
      strip.setPointerCapture(event.pointerId);
    });
    strip.addEventListener('pointermove', (event) => {
      if (!dragX) return;
      strip.scrollLeft = dragX.left - (event.clientX - dragX.x);
    });
    const endDrag = () => {
      dragX = null;
      strip.classList.remove('is-dragging');
    };
    strip.addEventListener('pointerup', endDrag);
    strip.addEventListener('pointercancel', endDrag);
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

  viewerClose.addEventListener('click', () => requestClose());

  // 브라우저·휴대폰 뒤로 가기: 창이 열려 있으면 창만 닫는다
  window.addEventListener('popstate', () => {
    if (!viewer.open) return;
    historyPushed = false;
    viewer.close();
  });

  // 키보드 좌우 화살표로 이전·다음 작업
  document.addEventListener('keydown', (event) => {
    if (!viewer.open) return;
    if (event.key === 'ArrowLeft') goToWork(-1);
    if (event.key === 'ArrowRight') goToWork(1);
  });

  // 휴대폰에서 좌우로 밀어 이전·다음 작업 (가로로 넘기는 캐러셀 위에서는 캐러셀이 우선)
  let touch = null;
  viewer.addEventListener('touchstart', (event) => {
    if (event.target.closest('.viewer__panorama')) { touch = null; return; }
    const t = event.touches[0];
    touch = { x: t.clientX, y: t.clientY };
  }, { passive: true });
  viewer.addEventListener('touchend', (event) => {
    if (!touch) return;
    const t = event.changedTouches[0];
    const dx = t.clientX - touch.x;
    const dy = t.clientY - touch.y;
    touch = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) goToWork(dx < 0 ? 1 : -1);
  }, { passive: true });

  // 작업 이미지·글자가 아닌 빈 곳을 누르면 닫기
  viewer.addEventListener('click', (event) => {
    // 누른 버튼이 화면을 다시 그리며 사라진 경우(이전·다음 이동)는 빈 곳 클릭이 아니다
    if (!event.target.isConnected) return;
    if (event.target.closest('.viewer__grid-item, .viewer__landing, .viewer__panorama-wrap, .viewer__head, .viewer__meta, .viewer__worknav')) return;
    requestClose();
  });

  viewer.addEventListener('close', () => {
    // 버튼·Esc·빈 곳으로 닫았으면, 열 때 쌓은 기록 한 칸을 되돌린다 (뒤로 가기로 닫았으면 이미 되돌아간 상태)
    if (historyPushed) {
      historyPushed = false;
      history.back();
    }
    document.documentElement.classList.remove('is-locked');
    state.work = null;
    stopPeek();
  });

  /* ---------- 작업 이미지 보호 (가벼운 억제용) ----------
     우클릭 메뉴(이미지 저장), 끌어서 저장, 개발자 도구·소스 보기·페이지 저장 단축키를 막는다.
     공개 레포라 원본 파일 자체를 숨기지는 못한다. 쉽게 저장하는 길만 막는 장치다. */
  document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
  });

  document.addEventListener('dragstart', (event) => {
    if (event.target.closest('img')) event.preventDefault();
  });

  document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    const mod = event.ctrlKey || event.metaKey;
    const blocked =
      event.key === 'F12' ||
      (mod && event.shiftKey && ['i', 'j', 'c'].includes(key)) || // 개발자 도구 (Windows)
      (event.metaKey && event.altKey && ['i', 'j', 'c', 'u'].includes(key)) || // 개발자 도구·소스 (Mac)
      (mod && ['u', 's'].includes(key)); // 소스 보기, 페이지 저장
    if (blocked) event.preventDefault();
  });

  // 푸터 연도: 올해 연도로 자동 표시 (스크립트가 안 돌면 HTML에 적힌 2026이 그대로 보인다)
  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  renderStats();
  renderFilter();
  renderGrid();
})();
