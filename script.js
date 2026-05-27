/* ============================================================
   Language switcher — persisted across pages
============================================================ */
(function () {
  const KEY = 'cosmo-di-lang';
  const saved = localStorage.getItem(KEY) || 'en';

  function applyLang(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    localStorage.setItem(KEY, lang);
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyLang(saved);
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => applyLang(btn.dataset.lang));
    });
  });
})();

/* ============================================================
   Track switcher (Aesthetician / Doctor) — Block 2
============================================================ */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const switcher = document.querySelector('.track-switcher');
    if (!switcher) return;

    const buttons = switcher.querySelectorAll('button');
    const contents = document.querySelectorAll('.track-content');

    function setTrack(track) {
      buttons.forEach(b => b.classList.toggle('active', b.dataset.track === track));
      contents.forEach(c => c.classList.toggle('active', c.dataset.track === track));
    }

    buttons.forEach(btn => {
      btn.addEventListener('click', () => setTrack(btn.dataset.track));
    });

    setTrack('A');
  });
})();

/* ============================================================
   Site-wide search
   Searches across the onboarding pages by keyword.
============================================================ */
(function () {
  // Searchable index: { url, labelEn, labelRu, contentEn, contentRu }
  const INDEX = [
    {
      url: '01-welcome.html',
      labelEn: '01 · About the clinic',
      labelRu: '01 · О клинике',
      contentEn: 'welcome cosmo di premium aesthetic clinic dubai values team owner doctor cosmetologist therapist nurse administrator who to go to medical questions hr',
      contentRu: 'добро пожаловать ценности команда владелица врач косметолог эстетист медсестра администратор кому по каким вопросам hr медицинские'
    },
    {
      url: '02-role.html',
      labelEn: '02 · Role and scope',
      labelRu: '02 · Роль и границы',
      contentEn: 'role scope responsibility aesthetician beauty therapist doctor injection non-injection morpheus hydrafacial protocols boundaries',
      contentRu: 'роль scope границы ответственность эстетист косметолог врач инъекции неинъекционные морфеус гидрафейшл протоколы'
    },
    {
      url: '03-appearance.html',
      labelEn: '03 · Appearance standards',
      labelRu: '03 · Стандарты внешнего вида',
      contentEn: 'uniform shoes hair nails make-up makeup perfume jewellery piercings skin condition smoking dress code appearance',
      contentRu: 'форма обувь волосы ногти макияж парфюм украшения пирсинг кожа курение внешний вид дресс-код'
    },
    {
      url: '04-communication.html',
      labelEn: '04 · How we talk to clients',
      labelRu: '04 · Как мы говорим с клиентом',
      contentEn: 'communication tone recommendation logic price expensive objection difficult situations photos personal social media boundaries',
      contentRu: 'коммуникация общение тон рекомендация дорого возражение цена сложные ситуации фото личные соцсети границы'
    },
    {
      url: '05-visit.html',
      labelEn: '05 · Visit standards',
      labelRu: '05 · Стандарт визита',
      contentEn: 'visit workflow before client opening procedure closing aftercare booking card photo telegram patients track step by step',
      contentRu: 'визит workflow перед клиентом встреча процедура закрытие aftercare запись карта фото телеграм пошагово'
    },
    {
      url: '06-kpi.html',
      labelEn: '06 · Performance metrics',
      labelRu: '06 · Показатели работы',
      contentEn: 'kpi metrics minimum average ticket booking rate product conversion onboarding training period bonus',
      contentRu: 'kpi показатели минимальные средний чек запись на следующий визит конверсия продукт онбординг тренинг бонус'
    },
    {
      url: '07-selling.html',
      labelEn: '07 · Selling without pressure',
      labelRu: '07 · Как продавать без впаривания',
      contentEn: 'sell selling recommend home care upsell matrix four principles no pressure procedure product',
      contentRu: 'продажа рекомендация домашний уход апсейл матрица четыре принципа без давления процедура продукт'
    },
    {
      url: '08-altegio.html',
      labelEn: '08 · Working in Alteg.io',
      labelRu: '08 · Работа в Alteg.io',
      contentEn: 'altegio crm schedule calendar client card files upload prices catalogue services offers visit history',
      contentRu: 'alteg.io altegio crm расписание календарь карта клиента файлы загрузить цены каталог услуги офферы история визитов'
    },
    {
      url: '09-protocols.html',
      labelEn: '09 · Treatment protocols',
      labelRu: '09 · Протоколы процедур',
      contentEn: 'protocols notion hub treatment library new protocol approval diana',
      contentRu: 'протоколы notion hub процедуры библиотека новый протокол согласование диана'
    },
    {
      url: '10-safety.html',
      labelEn: '10 · Safety and incidents',
      labelRu: '10 · Безопасность и инциденты',
      contentEn: 'safety sterility sanitation incident reaction complication first aid emergency hands hygiene gloves',
      contentRu: 'безопасность стерильность санитария инцидент реакция осложнение первая помощь аптечка экстренный руки гигиена перчатки'
    },
    {
      url: '11-policies.html',
      labelEn: '11 · Policies and discipline',
      labelRu: '11 · Политики и дисциплина',
      contentEn: 'attendance leave sick policy tardiness late fine discipline alcohol holidays mohre labour law check-in',
      contentRu: 'аттенданс отпуск больничный политика опоздание штраф дисциплина алкоголь праздники mohre трудовой закон чек-ин'
    },
    {
      url: '12-training.html',
      labelEn: '12 · Training tracker',
      labelRu: '12 · Трекер обучения',
      contentEn: 'training tracker four stages shadowing supervised independent diana checklist google sheet bonus system',
      contentRu: 'обучение трекер четыре этапа наблюдение под наблюдением самостоятельно диана чек-лист google sheet бонус'
    },
    {
      url: 'resources.html',
      labelEn: 'Resources',
      labelRu: 'Ресурсы',
      contentEn: 'resources links policies attendance check-in app notion altegio tracker',
      contentRu: 'ресурсы ссылки политики аттенданс чек-ин приложение notion altegio трекер'
    }
  ];

  document.addEventListener('DOMContentLoaded', function () {
    const trigger = document.querySelector('.site-search-trigger');
    const overlay = document.querySelector('.site-search-overlay');
    if (!trigger || !overlay) return;

    const input = overlay.querySelector('.site-search-input');
    const close = overlay.querySelector('.site-search-close');
    const results = overlay.querySelector('.site-search-results');
    const hint = overlay.querySelector('.site-search-hint');

    function openSearch() {
      overlay.classList.add('open');
      setTimeout(() => input.focus(), 50);
    }

    function closeSearch() {
      overlay.classList.remove('open');
      input.value = '';
      results.innerHTML = '';
      if (hint) hint.style.display = 'block';
    }

    function performSearch(query) {
      const q = query.trim().toLowerCase();
      results.innerHTML = '';

      if (q.length < 2) {
        if (hint) hint.style.display = 'block';
        return;
      }

      if (hint) hint.style.display = 'none';

      const lang = document.documentElement.lang || 'en';
      const matches = INDEX.filter(item => {
        const label = lang === 'ru' ? item.labelRu : item.labelEn;
        const content = lang === 'ru' ? item.contentRu : item.contentEn;
        return label.toLowerCase().includes(q) || content.toLowerCase().includes(q);
      });

      if (matches.length === 0) {
        results.innerHTML = '<div class="site-search-empty">No matches</div>';
        return;
      }

      matches.forEach(item => {
        const label = lang === 'ru' ? item.labelRu : item.labelEn;
        const content = lang === 'ru' ? item.contentRu : item.contentEn;

        // Build snippet around the match
        let snippet = content;
        const idx = content.toLowerCase().indexOf(q);
        if (idx !== -1) {
          const start = Math.max(0, idx - 30);
          const end = Math.min(content.length, idx + q.length + 60);
          snippet = (start > 0 ? '… ' : '') + content.slice(start, end) + (end < content.length ? ' …' : '');
          // Highlight match
          const re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
          snippet = snippet.replace(re, '<mark>$1</mark>');
        }

        const a = document.createElement('a');
        a.href = item.url;
        a.className = 'site-search-result';
        a.innerHTML = `
          <span class="site-search-result-label">${label}</span>
          <span class="site-search-result-snippet">${snippet}</span>
        `;
        results.appendChild(a);
      });
    }

    trigger.addEventListener('click', openSearch);
    close.addEventListener('click', closeSearch);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeSearch();
    });
    input.addEventListener('input', (e) => performSearch(e.target.value));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('open')) closeSearch();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
      }
    });
  });
})();
