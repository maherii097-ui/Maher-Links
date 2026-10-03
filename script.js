const $ = s => document.querySelector(s);
const ICONS = {
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none"/></svg>',
  snapchat: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5c-2.8 0-4.8 2.2-4.8 5.1 0 .8.1 1.6.2 2.3-.6.5-1.2.8-2 .9-.5.1-.8.4-.8.8 0 .6.8 1 1.7 1.3.4.1.7.2 1 .3-.3.7-.9 1.3-1.8 1.8-.7.4-1.7.6-2.6.7-.5.1-.8.4-.7.8.1.5.7.8 1.7 1 1.1.2 1.7.4 2 .9.2.3.3.8.4 1.2.1.3.3.5.7.5.2 0 .5-.1.8-.2.7-.2 1.3-.3 2-.2.9.1 1.5.8 2.2 1.1.7-.3 1.3-1 2.2-1.1.7-.1 1.3 0 2 .2.3.1.6.2.8.2.4 0 .6-.2.7-.5.1-.4.2-.9.4-1.2.3-.5.9-.7 2-.9 1-.2 1.6-.5 1.7-1 .1-.4-.2-.7-.7-.8-.9-.1-1.9-.3-2.6-.7-.9-.5-1.5-1.1-1.8-1.8.3-.1.6-.2 1-.3.9-.3 1.7-.7 1.7-1.3 0-.4-.3-.7-.8-.8-.8-.1-1.4-.4-2-.9.1-.7.2-1.5.2-2.3 0-2.9-2-5.1-4.8-5.1z"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3v11.2a3.7 3.7 0 1 1-3.7-3.7"/><path d="M14 3c.3 2.6 1.9 4.3 4.5 4.6"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8.2h2.4V4.6h-2.9C10.6 4.6 9.6 6.3 9.6 8.5v1.9H7.3V14h2.3v6.4H13V14h2.5l.5-3.6H13V8.9c0-.5.3-.7 1-.7z"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3.8 20.2l1.2-4.3A8.4 8.4 0 1 1 8.2 19z"/><path d="M9.2 8.6c-.3.6-.2 1.6.9 3.1 1.1 1.5 2.4 2.3 3.4 2.5.7.1 1.3-.4 1.5-1l-1.7-.9-.8.7c-.8-.4-1.6-1.2-2-2l.7-.8-.8-1.8z" fill="currentColor" stroke="none"/></svg>'
};
document.title = profile.name;
const w = profile.name.trim().split(/\s+/);
$('#nm').innerHTML = w.length > 1 ? w[0] + ' <em>' + w.slice(1).join(' ') + '</em>' : '<em>' + w[0] + '</em>';
$('#bio').textContent = profile.bio; $('#about-t').textContent = profile.about;
$('#logo').textContent = '';
$('#ini').textContent = 'Welcome';
$('#stats').innerHTML = profile.stats.length ? profile.stats.map(s => '<div><b>' + s[0] + '</b><span>' + s[1] + '</span></div>').join('') : '';
$('#fn').textContent = '© ' + new Date().getFullYear() + ' ' + profile.name + '. All rights reserved.';
if (profile.image) $('#ph').innerHTML = '<img src="' + profile.image + '" alt="' + profile.name + '">';
$('#stats').innerHTML = profile.stats.map(s => '<div><b>' + s[0] + '</b><span>' + s[1] + '</span></div>').join('');
$('#soc').innerHTML = socialLinks.map((s, i) => '<a class="card rv" style="--d:' + i * .08 + 's;--c:' + s.color + '" href="' + s.url + '" target="_blank" rel="noopener"><div class="ic">' + ICONS[s.icon] + '</div><div class="n">' + s.name + '</div><div class="u">' + s.username + '</div><span class="ar">→</span></a>').join('');
$('#fs').innerHTML = socialLinks.map(s => '<a href="' + s.url + '" target="_blank" rel="noopener" aria-label="' + s.name + '">' + ICONS[s.icon] + '</a>').join('');
/* intro */
const intro = $('#intro'), hide = () => intro.classList.add('out'); intro.onclick = hide; setTimeout(hide, 1700);
/* nav */
addEventListener('scroll', () => $('#nav').classList.toggle('s', scrollY > 30), { passive: true });
$('#bg').onclick = () => $('#menu').classList.toggle('o');
/* page transition */
document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
  const t = document.querySelector(a.getAttribute('href')); if (!t) return; e.preventDefault();
  $('#menu').classList.remove('o'); const p = $('#pt'); p.classList.remove('go'); void p.offsetWidth; p.classList.add('go');
  setTimeout(() => { document.documentElement.style.scrollBehavior = 'auto'; t.scrollIntoView(); document.documentElement.style.scrollBehavior = ''; }, 450);
}));
/* reveal */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll('.rv').forEach(el => io.observe(el));
/* cursor / parallax / magnetic (desktop only) */
if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
  let mx = 0, my = 0, rx = 0, ry = 0; const cd = $('#cd'), cr = $('#cr');
  addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY; cd.style.transform = `translate(${mx}px,${my}px)`;
    const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
    $('#pt2').style.transform = `translate3d(${x * -18}px,${y * -14}px,0)`; $('#fr').style.transform = `translate3d(${x * 12}px,${y * 8}px,0)`;
  });
  (function l() { rx += (mx - rx) * .15; ry += (my - ry) * .15; cr.style.transform = `translate(${rx}px,${ry}px)`; requestAnimationFrame(l); })();
  document.querySelectorAll('a,button').forEach(el => { el.addEventListener('mouseenter', () => cr.classList.add('h')); el.addEventListener('mouseleave', () => cr.classList.remove('h')); });
  document.querySelectorAll('.mag').forEach(b => { b.addEventListener('mousemove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .2}px,${(e.clientY - r.top - r.height / 2) * .3}px)`; }); b.addEventListener('mouseleave', () => b.style.transform = ''); });
}
/* particles */
if (!matchMedia('(prefers-reduced-motion:reduce)').matches) {
  const c = $('#fx'), x = c.getContext('2d'); let W, H; const rs = () => { W = c.width = innerWidth; H = c.height = innerHeight; }; rs(); addEventListener('resize', rs);
  const P = Array.from({ length: innerWidth < 700 ? 25 : 50 }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.4 + .3, v: Math.random() * .25 + .05, c: Math.random() > .7 ? '59,130,246' : '225,29,72' }));
  (function d() { x.clearRect(0, 0, W, H); P.forEach(p => { p.y -= p.v; if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; } x.fillStyle = `rgba(${p.c},.55)`; x.beginPath(); x.arc(p.x, p.y, p.r, 0, 6.3); x.fill(); }); requestAnimationFrame(d); })();
}
