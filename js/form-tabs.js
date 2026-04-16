document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.form-tab');
  const panels = document.querySelectorAll('.form-panel');

  if (tabs.length === 0) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const type = tab.dataset.type;

      // Update tabs state
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update panels state
      panels.forEach(p => {
        p.classList.remove('active');
        if (p.id === `${type}-panel`) {
          p.classList.add('active');
        }
      });
    });
  });
});
