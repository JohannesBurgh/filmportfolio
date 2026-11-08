const dialog = document.querySelector('dialog');
const screen = document.querySelector('#spelare');
const closeButton = document.querySelector('#stang');
let opener;
document.querySelectorAll('[data-film]').forEach(link => {
  link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !dialog.showModal) return;
    event.preventDefault();
    opener = link;
    const frame = document.createElement('iframe');
    frame.title = link.dataset.title;
    frame.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.src = 'https://www.youtube-nocookie.com/embed/' + link.dataset.film + '?autoplay=1&playsinline=1&rel=0&hl=sv';
    document.querySelector('#filmtitel').textContent = link.dataset.title;
    document.querySelector('#direkt').href = link.href;
    screen.replaceChildren(frame);
    dialog.showModal();
    document.body.classList.add('watching');
  });
});
closeButton.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const box = dialog.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  screen.replaceChildren();
  document.body.classList.remove('watching');
  opener?.focus({preventScroll:true});
});
