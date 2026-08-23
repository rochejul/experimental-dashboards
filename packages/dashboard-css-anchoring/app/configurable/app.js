function setup() {}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', async () => {
    setup();
  });
} else {
  setup();
}
