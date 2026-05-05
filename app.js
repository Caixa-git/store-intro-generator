/* ============================================================
   가게 소개 생성기 — App Logic
   Features: 4-tone copy generation, CTA guide, clipboard
   ============================================================ */

'use strict';

/* ======================== DATA ======================== */

const TONES = [
  { id: 'professional', label: '전문적인', icon: '🏛️', class: 'tone-professional' },
  { id: 'friendly',     label: '친근한',   icon: '😊', class: 'tone-friendly' },
  { id: 'concise',      label: '간결한',   icon: '⚡', class: 'tone-concise' },
  { id: 'warm',         label: '따뜻한',   icon: '💛', class: 'tone-warm' },
];

/* CTA recommendations per tone */
const CTA_GUIDE_DATA = {
  professional: {
    label: '전문적인',
    toneId: 'professional',
    ctas: [
      '지금 바로 방문하세요',
      '전문적인 상담을 원하시면 연락주세요',
      '믿을 수 있는 파트너, 지금 만나보세요',
    ],
    placements: ['스토어 헤더', '브랜드 소개 페이지', '상품 상세 하단'],
    description: '신뢰감을 주는 CTA. 첫인상을 결정짓는 위치에 적합합니다.',
  },
  friendly: {
    label: '친근한',
    toneId: 'friendly',
    ctas: [
      '우리 가게 놀러오세요!',
      '궁금한 점은 편하게 물어봐 주세요 💬',
      '함께 시작해볼까요? 😊',
    ],
    placements: ['SNS 프로필', '인트로 배너', '커뮤니티 소개글'],
    description: '고객과 가까워지는 CTA. 편안한 분위기에서 효과적입니다.',
  },
  concise: {
    label: '간결한',
    toneId: 'concise',
    ctas: [
      '지금 구매하기',
      '최저가 확인하기',
      '3초 만에 둘러보기',
    ],
    placements: ['상품 카드', '배너 액션 버튼', '퀵 링크'],
    description: '행동을 바로 유도하는 CTA. 모바일 환경에서 특히 효과적입니다.',
  },
  warm: {
    label: '따뜻한',
    toneId: 'warm',
    ctas: [
      '따뜻한 마음으로 기다릴게요',
      '언제나 환영합니다 💝',
      '고객님의 이야기를 들려주세요',
    ],
    placements: ['스토리 소개', '고객 후기 페이지', '브랜드 스토리'],
    description: '정을 강조하는 CTA. 브랜드 스토리와 함께 사용하면 효과가 배가됩니다.',
  },
};

/* ==================== COPY TEMPLATES ==================== */

/**
 * Generate 4-tone store introductions from user input.
 * Each tone produces a structurally different copy.
 */
function generateCopies(input) {
  const { storeName, category, desc, targetCustomer } = input;
  const target = targetCustomer.trim() || '고객';

  const copies = {};

  // --- Professional ---
  copies.professional = {
    toneId: 'professional',
    text: `${storeName}은(는) ${category} 전문 스토어입니다.\n` +
      `${desc || `${storeName}은(는) 엄선된 제품과 전문적인 서비스로 고객님께 최상의 경험을 제공합니다.`}\n\n` +
      `저희는 ${target}을(를) 주요 고객으로 삼고, ` +
      `고객 한 분 한 분의 니즈에 맞춘 맞춤형 쇼핑 경험을 제공합니다.\n` +
      `신뢰할 수 있는 제품과 투명한 정보로 오랜 관계를 만들어가고 싶습니다.\n\n` +
      `${storeName} — 전문성과 신뢰로 선택받는 스토어입니다.`,
    cta: CTA_GUIDE_DATA.professional.ctas[0],
    ctaDesc: CTA_GUIDE_DATA.professional.description,
    placements: CTA_GUIDE_DATA.professional.placements,
  };

  // --- Friendly ---
  copies.friendly = {
    toneId: 'friendly',
    text: `안녕하세요! ${storeName}입니다 🐾\n\n` +
      `저희는 ${category}을(를) 판매하는 스토어예요.\n` +
      `${desc || `${storeName}은(는) 좋은 제품을 합리적인 가격에 제공하기 위해 노력하고 있습니다.`}\n\n` +
      `주로 ${target} 분들이 많이 찾아주시는데요,\n` +
      `고객님의 목소리에 귀 기울이며 함께 성장하는 스토어가 되고 싶습니다.\n` +
      `제품에 대해 궁금한 점이 있으시면 언제든지 톡톡으로 물어봐 주세요!\n\n` +
      `💬 ${storeName}이(가) 도와드릴게요!`,
    cta: CTA_GUIDE_DATA.friendly.ctas[0],
    ctaDesc: CTA_GUIDE_DATA.friendly.description,
    placements: CTA_GUIDE_DATA.friendly.placements,
  };

  // --- Concise ---
  copies.concise = {
    toneId: 'concise',
    text: `${storeName} — ${category} 전문 스토어\n\n` +
      `${desc || `좋은 제품, 합리적인 가격.`}\n\n` +
      `🎯 타겟: ${target}\n` +
      `📍 합리적인 소비를 원하는 분들을 위한 스마트한 선택\n\n` +
      `✔ 엄선된 제품만 판매\n` +
      `✔ 빠르고 정확한 CS\n` +
      `✔ 투명한 가격 정책\n\n` +
      `${storeName}에서 스마트하게 쇼핑하세요.`,
    cta: CTA_GUIDE_DATA.concise.ctas[0],
    ctaDesc: CTA_GUIDE_DATA.concise.description,
    placements: CTA_GUIDE_DATA.concise.placements,
  };

  // --- Warm ---
  copies.warm = {
    toneId: 'warm',
    text: `마음으로 전하는 쇼핑, ${storeName}입니다 💝\n\n` +
      `${category}을(를) 사랑하는 분들을 위해,\n` +
      `${desc || `${storeName}은(는) 정성을 담아 제품을 준비합니다.`}\n\n` +
      `저희는 ${target} 분들이\n` +
      `더 편하고 행복하게 쇼핑할 수 있도록\n` +
      `매일 조금씩 발전하고 있습니다.\n\n` +
      `작은 가게지만 큰 마음으로\n` +
      `고객님 한 분 한 분을 소중히 모시겠습니다.\n\n` +
      `💝 ${storeName}이(가) 진심으로 환영합니다`,
    cta: CTA_GUIDE_DATA.warm.ctas[0],
    ctaDesc: CTA_GUIDE_DATA.warm.description,
    placements: CTA_GUIDE_DATA.warm.placements,
  };

  return copies;
}


/* ==================== UI CONTROLLER ==================== */

const UI = {
  els: {},

  init() {
    this.els = {
      form:           document.getElementById('intro-form'),
      storeName:      document.getElementById('store-name'),
      storeCategory:  document.getElementById('store-category'),
      storeDesc:      document.getElementById('store-desc'),
      targetCustomer: document.getElementById('target-customer'),
      generateBtn:    document.getElementById('generate-btn'),
      resetBtn:       document.getElementById('reset-btn'),
      formSection:    document.getElementById('form-section'),
      resultsSection: document.getElementById('results-section'),
      loadingSection: document.getElementById('loading-section'),
      resultsGrid:    document.getElementById('results-grid'),
      ctaGuideGrid:   document.getElementById('cta-guide-grid'),
      resultsSummary: document.getElementById('results-summary'),
      regenerateBtn:  document.getElementById('regenerate-btn'),
      copyAllBtn:     document.getElementById('copy-all-btn'),
      quickTags:      document.getElementById('quick-tags'),
      toast:          document.getElementById('toast'),
    };

    this.bindEvents();
  },

  bindEvents() {
    const e = this.els;

    // Form submit
    e.form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      this.generate();
    });

    // Reset
    e.resetBtn.addEventListener('click', () => {
      e.form.reset();
      e.resultsSection.classList.add('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Regenerate
    e.regenerateBtn.addEventListener('click', () => this.generate());

    // Copy all
    e.copyAllBtn.addEventListener('click', () => this.copyAllResults());

    // Quick tags for target customer
    e.quickTags.addEventListener('click', (ev) => {
      const tag = ev.target.closest('.quick-tag');
      if (!tag) return;
      document.querySelectorAll('.quick-tag').forEach(t => t.classList.remove('active'));
      tag.classList.add('active');
      e.targetCustomer.value = tag.dataset.tag;
    });
  },

  generate() {
    const e = this.els;
    const input = {
      storeName: e.storeName.value.trim(),
      category: e.storeCategory.value,
      desc: e.storeDesc.value.trim(),
      targetCustomer: e.targetCustomer.value.trim(),
    };

    // Validation
    if (!input.storeName) {
      this.showToast('상호명을 입력해 주세요.');
      e.storeName.focus();
      return;
    }

    // Show loading
    e.formSection.classList.add('hidden');
    e.resultsSection.classList.add('hidden');
    e.loadingSection.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Simulate processing delay
    setTimeout(() => {
      const copies = generateCopies(input);
      this.renderResults(copies, input);
      e.loadingSection.classList.add('hidden');
      e.resultsSection.classList.remove('hidden');
      window.scrollTo({ top: e.resultsSection.offsetTop - 20, behavior: 'smooth' });
    }, 800);
  },

  renderResults(copies, input) {
    const grid = this.els.resultsGrid;
    grid.innerHTML = '';

    TONES.forEach((tone, idx) => {
      const copy = copies[tone.id];
      if (!copy) return;

      const card = document.createElement('div');
      card.className = `copy-card ${tone.class}`;
      card.style.animationDelay = `${idx * 0.1}s`;

      card.innerHTML = `
        <div class="copy-card-header">
          <span class="copy-card-tone">${tone.icon} ${tone.label}</span>
          <div class="copy-card-actions">
            <button class="copy-btn" data-copy="${this.escapeHtml(copy.text)}">📋 복사</button>
          </div>
        </div>
        <div class="copy-card-body">
          <div class="copy-card-text">${this.escapeHtml(copy.text)}</div>
          <div class="copy-card-cta">
            <div class="cta-label">📢 추천 CTA</div>
            <div class="cta-text">${this.escapeHtml(copy.cta)}</div>
            <div class="cta-description">${this.escapeHtml(copy.ctaDesc)}</div>
            <div class="cta-description" style="margin-top:4px;">
              추천 위치: ${copy.placements.join(' · ')}
            </div>
          </div>
        </div>
      `;

      // Individual copy button
      card.querySelector('.copy-btn').addEventListener('click', (ev) => {
        const text = ev.currentTarget.dataset.copy;
        this.copyToClipboard(text);
      });

      grid.appendChild(card);
    });

    // CTA Guide Panel
    this.renderCtaGuide();

    // Summary
    this.els.resultsSummary.textContent =
      `"${input.storeName}"에 최적화된 4가지 톤의 소개 문구입니다.` +
      (input.targetCustomer ? ` 타겟 "${input.targetCustomer}"(이)가 반영되었습니다.` : '');
  },

  renderCtaGuide() {
    const grid = this.els.ctaGuideGrid;
    grid.innerHTML = '';

    TONES.forEach((tone) => {
      const data = CTA_GUIDE_DATA[tone.id];
      if (!data) return;

      const card = document.createElement('div');
      card.className = 'cta-guide-card';

      card.innerHTML = `
        <div class="cta-guide-tone ${tone.id}">${tone.icon} ${tone.label}</div>
        <ul class="cta-guide-items">
          ${data.ctas.map(c => `<li class="cta-guide-item">${this.escapeHtml(c)}</li>`).join('')}
        </ul>
        <div class="cta-guide-placement">📍 ${data.placements.join(' · ')}</div>
      `;

      grid.appendChild(card);
    });
  },

  copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        this.showToast('📋 클립보드에 복사되었습니다.');
      }).catch(() => {
        this.fallbackCopy(text);
      });
    } else {
      this.fallbackCopy(text);
    }
  },

  fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    this.showToast('📋 클립보드에 복사되었습니다.');
  },

  copyAllResults() {
    const texts = [];
    document.querySelectorAll('.copy-card-text').forEach(el => {
      texts.push(el.textContent.trim());
      texts.push('---');
    });
    this.copyToClipboard(texts.join('\n\n'));
  },

  showToast(msg) {
    const toast = this.els.toast;
    toast.textContent = msg;
    toast.classList.remove('hidden');
    toast.classList.add('visible');

    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      toast.classList.remove('visible');
      toast.classList.add('hidden');
    }, 2500);
  },

  escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },
};


/* ==================== INIT ==================== */

document.addEventListener('DOMContentLoaded', () => {
  UI.init();
});
