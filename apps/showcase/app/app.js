function initShowcase() {
  const stageFrame = document.getElementById('stage-frame');
  const tabButtons = document.querySelectorAll('.toolbar-tab-btn');
  const btnDesktop = document.getElementById('btn-responsive-desktop');
  const btnTablet = document.getElementById('btn-responsive-tablet');
  const btnMobile = document.getElementById('btn-responsive-mobile');
  const btnReload = document.getElementById('btn-reload');
  const btnOpenDirect = document.getElementById('btn-open-direct');

  const basePath = window.location.pathname.endsWith('/')
    ? window.location.pathname
    : window.location.pathname.substring(
        0,
        window.location.pathname.lastIndexOf('/') + 1,
      );

  const demoUrls = {
    static: `${basePath}demos/css-anchoring/static.html`,
    dynamic: `${basePath}demos/css-anchoring/dynamic.html`,
  };

  let currentView = 'static';

  function setView(viewName) {
    if (!demoUrls[viewName]) return;
    currentView = viewName;
    stageFrame.src = demoUrls[viewName];

    tabButtons.forEach((btn) => {
      if (btn.dataset.view === viewName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      setView(view);
    });
  });

  // Responsive switchers
  function setResponsiveMode(mode) {
    stageFrame.classList.remove(
      'responsive-desktop',
      'responsive-tablet',
      'responsive-mobile',
    );
    stageFrame.classList.add(`responsive-${mode}`);
  }

  btnDesktop?.addEventListener('click', () => setResponsiveMode('desktop'));
  btnTablet?.addEventListener('click', () => setResponsiveMode('tablet'));
  btnMobile?.addEventListener('click', () => setResponsiveMode('mobile'));

  // Action buttons
  btnReload?.addEventListener('click', () => {
    try {
      stageFrame.contentWindow?.location.reload();
    } catch {
      const currentSrc = stageFrame.getAttribute('src');
      stageFrame.setAttribute('src', currentSrc);
    }
  });

  btnOpenDirect?.addEventListener('click', () => {
    const targetUrl = demoUrls[currentView] || stageFrame.src;
    window.open(targetUrl, '_blank');
  });
}

document.addEventListener('DOMContentLoaded', initShowcase);
