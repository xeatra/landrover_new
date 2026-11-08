/* Sales Partner Land Rover demo — core: language, helpers, LR header + model chooser mega menu, footer, cards, forms, lead inbox */
(function () {
  const SP = window.SP, D = SP.DEALER;
  const $ = (s, r) => (r || document).querySelector(s), $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  SP.$ = $; SP.$$ = $$;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  SP.esc = esc;
  SP.param = k => new URLSearchParams(location.search).get(k);
  const store = { get(k, d) { try { const v = localStorage.getItem('lr_' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem('lr_' + k, JSON.stringify(v)); } catch (e) { /* ignore */ } } };
  SP.store = store;
  SP.lang = (SP.param('lang') || store.get('lang', 'ro')) === 'en' ? 'en' : 'ro';
  if (SP.param('lang')) store.set('lang', SP.lang);
  document.documentElement.lang = SP.lang;
  const T = (ro, en) => SP.lang === 'en' ? en : ro, X = a => Array.isArray(a) ? (SP.lang === 'en' ? a[1] : a[0]) : a;
  SP.T = T; SP.X = X;
  SP.eur = n => n == null ? '—' : Math.round(n).toLocaleString('ro-RO') + ' €';
  SP.km = n => Math.round(n).toLocaleString('ro-RO') + ' km';
  SP.ext = 'target="_blank" rel="noopener"';
  SP.maps = q => 'https://maps.google.com/maps?q=' + encodeURIComponent(q) + '&z=15&output=embed';
  SP.from = m => m.from ? T('De la ', 'From ') + SP.eur(m.from) + ' <small>(' + T('TVA inclus', 'VAT incl.') + ')</small>' : T('Finanțare disponibilă', 'Finance available');
  SP.fromTxt = m => m.from ? T('De la ', 'From ') + SP.eur(m.from) : T('Finanțare disponibilă', 'Finance available');
  SP.inStock = id => SP.STOCK.filter(v => v.m === id).length;
  SP.title = v => SP.model(v.m).name + ' ' + v.ver;
  SP.carUrl = v => 'vehicul.html?id=' + v.id;
  SP.carImg = (v, i) => { const m = SP.model(v.m), a = [m.side].concat(m.gal); return a[(i || 0) % a.length]; };
  SP.STATUS = { stoc: ['În stoc', 'In stock'], tranzit: ['În tranzit', 'In transit'], demo: ['Vehicul demo', 'Demo vehicle'], approved: ['Approved', 'Approved'] };

  /* finance (indicative): 20% down, 48 months, 7.9% APR. Production: Importer Company Financial Services quote API */
  SP.APR = 7.9;
  SP.rate = (price, o) => { o = Object.assign({ dep: .2, n: 48 }, o || {}); const P = price * (1 - o.dep), r = Math.pow(1 + SP.APR / 100, 1 / 12) - 1; return P * r / (1 - Math.pow(1 + r, -o.n)); };

  const P = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>', left: '<path d="m15 18-6-6 6-6"/>', right: '<path d="m9 18 6-6-6-6"/>', menu: '<path d="M4 7h16M4 12h16M4 17h16"/>', x: '<path d="M18 6 6 18M6 6l12 12"/>', check: '<path d="M20 6 9 17l-5-5"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    ext: '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>', car: '<path d="M5 17h14M3 17v-4l2.2-5.2A2 2 0 0 1 7 6.5h10a2 2 0 0 1 1.8 1.3L21 13v4"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
    wheel: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.5"/><path d="M12 3v6.5M4.2 16.5l5.6-3.2M19.8 16.5l-5.6-3.2"/>',
    wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>', doc: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
    tag: '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/>', sparkle: '<path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4z"/>',
    swap: '<path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>', pound: '<path d="M4 10h12M4 14h9"/><path d="M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12a7.9 7.9 0 0 0 7.8 8 7.7 7.7 0 0 0 5.2-2"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>', search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>', filter: '<path d="M22 3H2l8 9.5V19l4 2v-8.5z"/>',
    cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>', send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>', info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    gauge: '<path d="M12 14l4-4"/><path d="M3.3 17a9 9 0 1 1 17.4 0"/>', fuel: '<path d="M3 22V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v17M3 22h12M15 10h2a2 2 0 0 1 2 2v5a1.5 1.5 0 0 0 3 0V8l-3-3M7 8h4"/>',
    gear: '<circle cx="6" cy="6" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="12" cy="18" r="2"/><path d="M6 8v8M12 8v8M18 8v4H6"/>',
    print: '<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>'
  };
  P.drive = '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2"/><path d="M3.5 10.5h6M14.5 10.5h6M12 14v7"/>';
  P.down = '<path d="m6 9 6 6 6-6"/>';
  P.bell = '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>';
  P.people = '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.5a5 5 0 0 1 6 5"/>';
  const I = (n, c) => '<svg class="ico' + (c ? ' ' + c : '') + '" viewBox="0 0 24 24" aria-hidden="true">' + (P[n] || '') + '</svg>';
  SP.I = I;

  /* ---------- model chooser: same interaction as the landrover.ro "Modele" menu ---------- */
  SP.chooser = function (el, st) {
    st = st || {};
    let b = st.brand || 'rr', m = st.model || SP.MODELS.find(x => x.brand === b).id;
    const draw = () => {
      const mod = SP.model(m), list = SP.MODELS.filter(x => x.brand === b), n = SP.inStock(m);
      el.innerHTML = '<div class="mch"><div class="mch__l"><div class="btabs" role="tablist">' +
        SP.BRANDS.map(x => '<button type="button" role="tab" data-bt="' + x.id + '" aria-selected="' + (x.id === b) + '"><b>' + x.word + '</b><small>' + SP.MODELS.filter(y => y.brand === x.id).length + ' ' + T('modele', 'models') + '</small></button>').join('') +
        '</div><div class="mch__g"><div class="mrows">' +
        list.map(x => '<button type="button" class="mrow" data-mr="' + x.id + '" aria-selected="' + (x.id === m) + '"><img src="' + x.side + '" alt="" loading="lazy"><span><b>' + x.name + '</b><small>' + SP.fromTxt(x) + (x.from ? ' (' + T('TVA inclus', 'VAT incl.') + ')' : '') + '</small></span></button>').join('') +
        '<a class="mextra" href="stoc.html?brand=' + b + '">' + I('car') + T('Stoc ', 'Stock ') + SP.brand(b).name + '</a><a class="mextra" href="approved.html">' + I('shield') + 'Land Rover Approved</a></div>' +
        '<div class="mdet"><h3>' + mod.name + '</h3><p>' + X(mod.tag) + '</p><hr><div class="pr"><b>' + SP.fromTxt(mod) + '</b>' + (mod.from ? '<small>' + T('Preț de listă recomandat, TVA inclus', 'Recommended list price, VAT included') + '</small>' : '<small>' + T('Prin Importer Company Financial Services', 'Through Importer Company Financial Services') + '</small>') + '</div>' +
        '<a class="btn btn--accent" href="solicita.html?tip=oferta&m=' + mod.id + '">' + I('doc') + T('Solicitați oferta', 'Request an offer') + '</a>' +
        '<a class="btn btn--line" href="stoc.html?m=' + mod.id + '">' + I('car') + T('Stoc autovehicule', 'Vehicle stock') + (n ? ' (' + n + ')' : '') + '</a>' +
        '<a class="lk" href="model.html?m=' + mod.id + '">' + I('right') + T('Prezentare', 'Overview') + '</a>' +
        '<a class="lk" href="solicita.html?tip=test-drive&m=' + mod.id + '">' + I('drive') + T('Formular test drive', 'Test drive form') + '</a>' +
        '<a class="lk" href="solicita.html?tip=info&m=' + mod.id + '">' + I('bell') + T('Țineți-mă la curent', 'Keep me informed') + '</a>' +
        '<a class="lk" href="solicita.html?tip=programare&m=' + mod.id + '">' + I('cal') + T('Solicitați o programare', 'Book an appointment') + '</a>' +
        '<a class="lk" href="' + D.configurator + '" ' + SP.ext + '>' + I('ext') + T('Configurator oficial', 'Official configurator') + '</a></div></div></div>' +
        '<div class="mch__img" role="img" aria-label="' + mod.name + '" style="background-image:url(\'' + mod.gal[0] + '\')"></div></div>';
    };
    el.addEventListener('click', e => {
      const t = e.target.closest('[data-bt]'); if (t) { b = t.dataset.bt; m = SP.MODELS.find(x => x.brand === b).id; draw(); return; }
      const r = e.target.closest('[data-mr]'); if (r) { m = r.dataset.mr; draw(); }
    });
    draw();
  };

  /* ---------- header ---------- */
  const MENUS = {
    owners: [[T('Service', 'Service'), [[T('Solicitați o programare', 'Book a service'), 'service.html'], [T('Revizii și garanție', 'Servicing and warranty'), 'proprietari.html#garantie'], [T('Asistență rutieră', 'Roadside assistance'), 'proprietari.html#asistenta'], [T('Rechemări', 'Recalls'), 'proprietari.html#rechemari']]],
      [T('Accesorii', 'Accessories'), [[T('Accesorii originale', 'Genuine accessories'), 'proprietari.html#accesorii'], [T('Roți și anvelope', 'Wheels and tyres'), 'proprietari.html#accesorii'], [T('Piese originale', 'Genuine parts'), 'proprietari.html#piese']]],
      [T('Tehnologie', 'Technology'), [[T('Aplicația Land Rover Remote', 'Land Rover Remote app'), 'proprietari.html#remote'], [T('Actualizări software', 'Software updates'), 'proprietari.html#remote'], [T('Încărcare PHEV', 'PHEV charging'), 'proprietari.html#incarcare']]]],
    explore: [[T('Gama', 'The range'), SP.BRANDS.map(x => [x.name, 'modele.html?b=' + x.id])],
      [T('Noutăți', 'News'), SP.NEWS.map(n => [X(n.t), 'stire.html?id=' + n.id])],
      [T('Dealer', 'Dealer'), [[T('Locația noastră', 'Our location'), 'locatie.html'], [T('Echipa', 'The team'), 'locatie.html#echipa'], ['Contact', 'contact.html']]]],
    buy: [[T('Autovehicule noi', 'New vehicles'), [[T('Solicitați oferta', 'Request an offer'), 'solicita.html?tip=oferta'], [T('Programați un test drive', 'Book a test drive'), 'solicita.html?tip=test-drive'], [T('Stoc autovehicule noi', 'New vehicle stock'), 'stoc.html'], [T('Configurator oficial ↗', 'Official configurator ↗'), D.configurator, 1]]],
      [T('Rulate', 'Used'), [['Land Rover Approved', 'approved.html'], [T('Evaluare mașina dvs.', 'Value your car'), 'solicita.html?tip=oferta#tradein']]],
      [T('Oferte și finanțare', 'Offers and finance'), [[T('Oferte actuale', 'Current offers'), 'oferte.html'], [T('Flote și companii', 'Fleet and business'), 'fleet.html']]]]
  };
  const megaList = k => '<div class="mlist">' + MENUS[k].map(c => '<div><h4>' + c[0] + '</h4>' + c[1].map(l => '<a href="' + l[1] + '"' + (l[2] ? ' ' + SP.ext : '') + '>' + l[0] + '</a>').join('') + '</div>').join('') + '</div>';
  SP.header = function (page) {
    const nav = [['models', T('Modele', 'Models')], ['owners', T('Proprietari', 'Owners')], ['explore', T('Explorează', 'Explore')], ['buy', T('Achiziție', 'Buying')]];
    const drawer = '<li><a href="modele.html">' + T('Modele', 'Models') + I('right') + '</a></li>' + SP.BRANDS.map(x => '<li><a href="modele.html?b=' + x.id + '">— ' + x.name + I('right') + '</a></li>').join('') +
      [[T('Stoc autovehicule noi', 'New vehicle stock'), 'stoc.html'], ['Land Rover Approved', 'approved.html'], [T('Solicitați oferta', 'Request an offer'), 'solicita.html?tip=oferta'], ['Test drive', 'solicita.html?tip=test-drive'], [T('Oferte', 'Offers'), 'oferte.html'], ['Service', 'service.html'], [T('Proprietari', 'Owners'), 'proprietari.html'], [T('Flote', 'Fleet'), 'fleet.html'], [T('Noutăți', 'News'), 'stiri.html'], ['Dealer', 'locatie.html'], ['Contact', 'contact.html']].map(n => '<li><a href="' + n[1] + '">' + n[0] + I('right') + '</a></li>').join('');
    return '<div class="obar"><a href="oferte.html">' + T('Descoperiți ofertele actuale', 'Discover current offers') + '</a></div>' +
      '<header class="hdr"><div class="wrap hdr__in" style="width:min(1980px,100% - 32px)"><button class="burger" type="button" aria-label="Menu" data-open-drawer>' + I('menu') + '</button>' +
      '<nav class="lnav" aria-label="Main">' + nav.map(n => '<button type="button" data-mega="' + n[0] + '" aria-expanded="false">' + n[1] + '</button>').join('') + '</nav>' +
      '<a class="lmark" href="index.html" aria-label="Land Rover — ' + D.name + '"><b>LAND ROVER</b><small>' + D.name + '</small></a>' +
      '<div class="racts"><a href="solicita.html?tip=test-drive">' + I('drive') + '<span>Test drive</span></a><a href="locatie.html">' + I('pin') + '<span>Dealer</span></a><a href="service.html">' + I('cal') + '<span>' + T('Programare', 'Booking') + '</span></a>' +
      '<span class="lang" role="group" aria-label="Language"><button type="button" data-lang="ro" aria-pressed="' + (SP.lang === 'ro') + '">RO</button><button type="button" data-lang="en" aria-pressed="' + (SP.lang === 'en') + '">EN</button></span></div></div>' +
      '<div class="mega" id="mega" hidden><button class="mega__x" type="button" aria-label="Close" data-mega-x>' + I('x') + '</button><div class="mega__in" id="mega-in"></div></div></header>' +
      '<div class="drawer" id="drawer" hidden><div class="drawer__p" role="dialog" aria-label="Menu"><button class="drawer__x" type="button" aria-label="Close" data-close-drawer>' + I('x') + '</button><b class="word">LAND ROVER</b><span class="lang" role="group" aria-label="Language" style="align-self:flex-start"><button type="button" data-lang="ro" aria-pressed="' + (SP.lang === 'ro') + '">RO</button><button type="button" data-lang="en" aria-pressed="' + (SP.lang === 'en') + '">EN</button></span><ul>' + drawer + '</ul>' +
      '<a class="btn btn--accent btn--block" href="tel:' + D.phone.replace(/\s/g, '') + '">' + I('phone') + D.phone + '</a></div></div>';
  };
  function openMega(k, btn) {
    const mg = $('#mega'), was = btn.getAttribute('aria-expanded') === 'true';
    $$('[data-mega]').forEach(b => b.setAttribute('aria-expanded', 'false'));
    if (was) { mg.hidden = true; return; }
    btn.setAttribute('aria-expanded', 'true'); mg.hidden = false;
    const inn = $('#mega-in'), fresh = inn.cloneNode(false); inn.replaceWith(fresh);
    if (k === 'models') SP.chooser(fresh); else fresh.innerHTML = megaList(k);
  }

  SP.hours = h => '<table class="hours">' + h.map((r, i) => { const d = new Date().getDay(), on = (i === 0 && d >= 1 && d <= 5) || (i === 1 && d === 6) || (i === 2 && d === 0); return '<tr' + (on ? ' class="is-today"' : '') + '><td>' + (SP.lang === 'en' ? r[1] : r[0]) + '</td><td>' + (r[2] || T('Închis', 'Closed')) + '</td></tr>'; }).join('') + '</table>';
  SP.footer = function () {
    const col = (h, l) => '<div><h4>' + h + '</h4><ul>' + l.map(x => '<li><a href="' + x[1] + '"' + (x[2] ? ' ' + SP.ext : '') + '>' + x[0] + '</a></li>').join('') + '</ul></div>';
    return '<footer class="ftr"><div class="wrap"><div class="ftr__g">' +
      '<div><b class="word">LAND ROVER</b><p style="margin-top:14px">' + D.name + '<br>' + D.address + '<br><a href="tel:' + D.phone.replace(/\s/g, '') + '">' + D.phone + '</a> · <a href="mailto:' + D.email + '">' + D.email + '</a></p>' + SP.hours(D.hours) + '</div>' +
      col(T('Modele', 'Models'), SP.MODELS.map(m => [m.name, 'model.html?m=' + m.id])) +
      col(T('Achiziție', 'Buying'), [[T('Solicitați oferta', 'Request an offer'), 'solicita.html?tip=oferta'], ['Test drive', 'solicita.html?tip=test-drive'], [T('Stoc autovehicule noi', 'New vehicle stock'), 'stoc.html'], ['Land Rover Approved', 'approved.html'], [T('Oferte', 'Offers'), 'oferte.html'], [T('Flote și companii', 'Fleet and business'), 'fleet.html'], [T('Configurator oficial ↗', 'Official configurator ↗'), D.configurator, 1]]) +
      col(T('Proprietari și dealer', 'Owners and dealer'), [['Service', 'service.html'], [T('Proprietari', 'Owners'), 'proprietari.html'], [T('Noutăți', 'News'), 'stiri.html'], [T('Locația noastră', 'Our location'), 'locatie.html'], ['Contact', 'contact.html'], [T('Harta site-ului', 'Sitemap'), 'sitemap.html']]) + '</div>' +
      '<div class="ftr__fca"><p>' + T('Prețurile „De la” sunt prețuri de listă recomandate de importator (landrover.ro), TVA inclus. Ratele lunare sunt orientative (avans 20%, 48 de luni, DAE ' + SP.APR + '%) și se confirmă de finanțator, sub rezerva aprobării. Importator: ' + D.importer + '.', '"From" prices are the importer’s recommended list prices (landrover.ro), VAT included. Monthly payments are indicative (20% down, 48 months, ' + SP.APR + '% APR) and are confirmed by the lender, subject to approval. Importer: ' + D.importer + '.') + '</p></div>' +
      '<div class="ftr__b"><span>© 2026 ' + D.legal.company + ' · ' + D.legal.reg + ' · ' + D.legal.cui + ' — ' + T('dealer autorizat Land Rover (demo), importator ', 'authorised Land Rover dealer (demo), importer ') + D.importer + '</span><span class="ftr__legal"><a href="legal.html?doc=cookies">' + T('Politica cookies', 'Cookie policy') + '</a><a href="legal.html?doc=confidentialitate">' + T('Confidențialitate', 'Privacy') + '</a><a href="legal.html?doc=termeni">' + T('Termeni și condiții', 'Terms') + '</a><a href="https://reclamatiisal.anpc.ro" ' + SP.ext + '>ANPC – SAL</a><a href="https://ec.europa.eu/consumers/odr" ' + SP.ext + '>SOL</a></span></div>' +
      '<div class="ftr__b"><span>' + T('Site demonstrativ realizat de Sales Partner. Modelele, prețurile „De la”, imaginile și videoclipurile sunt preluate de pe landrover.ro (noiembrie 2026); dealerul, persoanele și stocul sunt fictive.', 'Demo website by Sales Partner. Models, "from" prices, images and videos are taken from landrover.ro (November 2026); the dealer, people and stock are fictional.') + '</span></div></div></footer>';
  };

  /* ---------- cards ---------- */
  SP.modelCard = m => '<a class="lcard" href="model.html?m=' + m.id + '"><div class="lcard__img"><img src="' + m.side + '" alt="' + m.name + '" loading="lazy"></div><div class="lcard__b"><small>' + SP.brand(m.brand).name + '</small><h3>' + m.name + '</h3><p>' + X(m.tag) + '</p><div class="lcard__f"><span class="lprice" style="font-size:1rem">' + SP.from(m) + '</span>' + I('arrow') + '</div></div></a>';
  SP.vcard = function (v) {
    const m = SP.model(v.m), save = v.list - v.price;
    return '<article class="lcard"><a class="lcard__img rel" href="' + SP.carUrl(v) + '"><span class="badge2">' + (v.used ? 'Approved' : X(SP.STATUS[v.status])) + '</span><img src="' + SP.carImg(v) + '" alt="' + esc(SP.title(v)) + '" loading="lazy"></a>' +
      '<div class="lcard__b"><small>' + v.id + ' · ' + esc(v.color) + '</small><h3><a href="' + SP.carUrl(v) + '" style="text-decoration:none">' + esc(m.name) + '</a></h3><p>' + esc(v.ver + ' · ' + v.eng) + '</p>' +
      '<ul class="specs"><li>' + I('cal') + v.year + '</li><li>' + I('gauge') + SP.km(v.km) + '</li><li>' + I('fuel') + esc(v.fuel) + '</li></ul>' +
      '<div class="lcard__f"><div class="lprice">' + (save > 0 ? '<s>' + SP.eur(v.list) + '</s>' : '') + SP.eur(v.price) + '<small>' + T('TVA inclus · de la ', 'VAT incl. · from ') + SP.eur(SP.rate(v.price)) + T('/lună*', '/month*') + '</small></div><a class="btn btn--accent btn--sm" href="' + SP.carUrl(v) + '">' + T('Detalii', 'Details') + '</a></div></div></article>';
  };

  /* ---------- leads (production: POST /api/leads → Sales Partner CRM) ---------- */
  const LT = { oferta: 'Solicitare ofertă', 'test-drive': 'Test drive', info: 'Țineți-mă la curent', programare: 'Programare showroom', vehicle: 'Solicitare vehicul stoc', service: 'Programare service', fleet: 'Flote', contact: 'Contact', tradein: 'Evaluare trade-in' };
  SP.lead = function (type, data) {
    const l = { ref: 'LR-' + Date.now().toString(36).toUpperCase().slice(-6), type, label: LT[type] || type, at: new Date().toISOString(), data };
    store.set('leads', [l].concat(store.get('leads', [])).slice(0, 30));
    const n = $('[data-lead-n]'); if (n) n.textContent = store.get('leads', []).length; SP.renderLeads();
    return l;
  };
  SP.toast = msg => { const t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); t.innerHTML = I('check') + '<span>' + msg + '</span>'; document.body.appendChild(t); setTimeout(() => t.remove(), 3500); };
  SP.modal = function (html, wide) {
    const m = document.createElement('div'); m.className = 'modal';
    m.innerHTML = '<div class="modal__p' + (wide ? ' modal__p--wide' : '') + '" role="dialog" aria-modal="true"><button class="modal__x" type="button" aria-label="Close" data-x>' + I('x') + '</button>' + html + '</div>';
    const close = () => { m.remove(); document.removeEventListener('keydown', onk); }, onk = e => { if (e.key === 'Escape') close(); };
    m.addEventListener('click', e => { if (e.target === m || e.target.closest('[data-x]')) close(); }); document.addEventListener('keydown', onk);
    document.body.appendChild(m); return m;
  };
  SP.validate = function (form) {
    let ok = true;
    $$('[required]', form).forEach(el => { const bad = el.type === 'checkbox' ? !el.checked : !el.value.trim() || (el.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value)) || (el.type === 'tel' && el.value.replace(/\D/g, '').length < 10); el.setAttribute('aria-invalid', bad); if (bad && ok) { el.focus(); ok = false; } });
    return ok;
  };
  SP.formData = f => { const o = {}; new FormData(f).forEach((v, k) => { o[k] = o[k] ? o[k] + ', ' + v : v; }); return o; };
  SP.contactFields = o => {
    o = o || {};
    return '<div class="fld"><label for="f-name">' + T('Nume și prenume', 'Full name') + '</label><input class="inp" id="f-name" name="name" autocomplete="name" required></div>' +
      '<div class="fld"><label for="f-phone">' + T('Telefon', 'Phone') + '</label><input class="inp" id="f-phone" name="phone" type="tel" autocomplete="tel" required></div>' +
      '<div class="fld full"><label for="f-email">Email</label><input class="inp" id="f-email" name="email" type="email" autocomplete="email" required></div>' +
      (o.msg ? '<div class="fld full"><label for="f-msg">' + (o.msgLabel || T('Mesaj', 'Message')) + '</label><textarea class="inp" id="f-msg" name="message">' + esc(o.msgVal || '') + '</textarea></div>' : '') +
      '<label class="check full"><input type="checkbox" name="consent" required> <span>' + T('Sunt de acord cu prelucrarea datelor pentru a fi contactat de ' + D.name + '. ', 'I agree to my data being processed so ' + D.name + ' can contact me. ') + '<a href="legal.html?doc=confidentialitate">' + T('Confidențialitate', 'Privacy') + '</a></span></label>' +
      '<label class="check full"><input type="checkbox" name="marketing" value="da"> <span>' + T('Doresc să primesc noutăți și oferte Land Rover (opțional).', 'I would like to receive Land Rover news and offers (optional).') + '</span></label>';
  };
  SP.done = (title, text, ref) => '<div style="text-align:center;padding:10px 0"><div class="avatar" style="background:var(--ink);color:#fff;margin:0 auto 12px">' + I('check') + '</div><h3>' + title + '</h3><p class="mute">' + text + '</p>' + (ref ? '<p class="small mute">' + T('Referință ', 'Reference ') + ref + ' · ' + T('trimisă în Sales Partner (CRM dealer)', 'sent to Sales Partner (dealer CRM)') + '</p>' : '') + '</div>';
  SP.bindForm = (form, type, extra, done) => form.addEventListener('submit', e => {
    e.preventDefault(); if (!SP.validate(form)) return;
    const l = SP.lead(type, Object.assign(SP.formData(form), extra ? extra() : {}));
    form.outerHTML = '<div class="card">' + (done ? done(l) : SP.done(T('Mulțumim!', 'Thank you!'), T('Am primit solicitarea. Un consilier ' + D.name + ' vă contactează în cel mai scurt timp.', 'We have received your request. A ' + D.name + ' advisor will contact you shortly.'), l.ref)) + '</div>';
  });
  SP.carEnquiry = function (v, kind) {
    kind = kind || 'vehicle';
    const m = SP.modal('<h3>' + (kind === 'test-drive' ? 'Test drive' : T('Solicitați acest vehicul', 'Enquire about this vehicle')) + '</h3><p class="small"><b>' + esc(SP.title(v)) + '</b> · ' + v.id + ' · ' + SP.eur(v.price) + '</p><form class="form" novalidate>' + SP.contactFields({ msg: 1 }) + '<button class="btn btn--accent btn--block full" type="submit">' + T('Trimiteți', 'Send') + '</button></form>');
    SP.bindForm($('form', m), kind, () => ({ car: v.id, title: SP.title(v), model: v.m }));
  };

  SP.renderLeads = function () {
    const box = $('[data-leads]'); if (!box) return; const L = store.get('leads', []);
    box.innerHTML = L.length ? L.slice(0, 8).map(l => '<div class="lead"><b><span>' + l.label + '</span><span>' + l.ref + '</span></b><div>' + new Date(l.at).toLocaleString('ro-RO') + '</div><code>' + esc(JSON.stringify(Object.fromEntries(Object.entries(l.data || {}).filter(([k]) => k !== 'consent')))) + '</code></div>').join('') : '<p class="small" style="margin:0;color:#5D6B82">' + T('Nicio solicitare încă. Trimiteți un formular și apare aici, așa cum ar ajunge în Sales Partner.', 'No leads yet. Submit a form and it appears here as it would in Sales Partner.') + '</p>';
  };
  function demoPanel() {
    const w = document.createElement('div');
    w.innerHTML = '<div class="demo-badge"><button type="button" data-demo>DEMO <em>Leads <span data-lead-n>' + store.get('leads', []).length + '</span></em></button></div><div class="demo" id="demo" hidden><h4>' + T('Solicitări în Sales Partner', 'Leads in Sales Partner') + '</h4><div class="leadlist" data-leads></div><h4>' + T('Conectat la Sales Partner', 'Connected to Sales Partner') + '</h4><ul class="sp-flow"><li>' + T('Gama și prețurile „De la” din catalogul importatorului', 'Range and "from" prices from the importer catalogue') + '</li><li>' + T('Stoc nou și Approved din DMS', 'New and Approved stock from the DMS') + '</li><li>' + T('Solicitări pe model (fără configurator) → CRM, cu sursa și modelul', 'Model requests (no configurator) → CRM, with source and model') + '</li><li>' + T('Programări service în calendarul atelierului', 'Service bookings in the workshop calendar') + '</li></ul><p style="margin:12px 0 0"><button class="btn btn--line btn--sm" type="button" data-clear>' + T('Șterge datele demo', 'Clear demo data') + '</button></p></div>';
    document.body.appendChild(w);
    $('[data-demo]').onclick = () => { const d = $('#demo'); d.hidden = !d.hidden; if (!d.hidden) SP.renderLeads(); };
    $('[data-clear]').onclick = () => { store.set('leads', []); SP.renderLeads(); $('[data-lead-n]').textContent = 0; };
  }
  function cookies() {
    if (store.get('cookies', null)) return;
    const c = document.createElement('div'); c.className = 'cookies';
    c.innerHTML = '<p>' + T('Folosim cookie-uri esențiale și, cu acordul dumneavoastră, cookie-uri de analiză. ', 'We use essential cookies and, with your consent, analytics cookies. ') + '<a href="legal.html?doc=cookies">' + T('Politica cookies', 'Cookie policy') + '</a></p><button class="btn btn--line btn--sm" type="button" data-c="ess">' + T('Doar esențiale', 'Essential only') + '</button><button class="btn btn--accent btn--sm" type="button" data-c="all">' + T('Accept toate', 'Accept all') + '</button>';
    document.body.appendChild(c); $$('[data-c]', c).forEach(b => b.onclick = () => { store.set('cookies', b.dataset.c); c.remove(); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    const page = document.body.dataset.page;
    $('#site-header').innerHTML = SP.header(page);
    $('#site-footer').innerHTML = SP.footer();
    const r = (SP.pages[page] || SP.pages.notfound)();
    if (r.title) document.title = r.title + ' | ' + D.name;
    $('#main').innerHTML = r.html; r.bind && r.bind();
    demoPanel(); cookies();
    document.addEventListener('click', e => {
      const mb = e.target.closest('[data-mega]'); if (mb) openMega(mb.dataset.mega, mb);
      if (e.target.closest('[data-mega-x]')) { $('#mega').hidden = true; $$('[data-mega]').forEach(b => b.setAttribute('aria-expanded', 'false')); }
      if (e.target.closest('[data-open-drawer]')) $('#drawer').hidden = false;
      if (e.target.closest('[data-close-drawer]') || e.target.id === 'drawer') $('#drawer').hidden = true;
      const lb = e.target.closest('[data-lang]'); if (lb) { store.set('lang', lb.dataset.lang); const u = new URL(location.href); u.searchParams.delete('lang'); location.href = u.toString(); }
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('#mega').hidden) { $('#mega').hidden = true; $$('[data-mega]').forEach(b => b.setAttribute('aria-expanded', 'false')); } });
  });
})();
