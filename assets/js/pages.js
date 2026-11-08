/* Sales Partner Land Rover demo — pages. BYD-style dealer structure, landrover.ro look; no configurator: brand → model → request */
(function () {
  const SP = window.SP, D = SP.DEALER, T = SP.T, X = SP.X, I = SP.I, esc = SP.esc, $ = SP.$, $$ = SP.$$;
  const phead = (h, p, crumb) => '<section class="phead"><div class="wrap"><div class="crumbs"><a href="index.html">' + T('Acasă', 'Home') + '</a>' + (crumb || '') + ' / ' + h + '</div><h1>' + h + '</h1>' + (p ? '<p>' + p + '</p>' : '') + '</div></section>';
  const ttl = (h, p) => '<div class="sec__ttl"><h2>' + h + '</h2>' + (p ? '<p>' + p + '</p>' : '') + '</div>';
  const TIPS = { oferta: ['Solicitați oferta', 'Request an offer'], 'test-drive': ['Test drive', 'Test drive'], info: ['Țineți-mă la curent', 'Keep me informed'], programare: ['Programare în showroom', 'Showroom appointment'] };
  const ownerOK = m => m && SP.model(m) ? SP.model(m) : null;
  const chips = (name, opts, type, checked) => '<div class="chips2">' + opts.map((o, i) => '<label><input type="' + (type || 'radio') + '" name="' + name + '" value="' + esc(Array.isArray(o) ? o[0] : o) + '"' + ((checked === undefined ? i === 0 : checked === i) ? ' checked' : '') + '><span>' + X(o) + '</span></label>').join('') + '</div>';
  const stockGrid = list => list.length ? '<div class="grid3">' + list.map(SP.vcard).join('') + '</div>' : '';
  const requestSteps = () => '<ol class="inline-steps"><li><b>' + T('Alegeți gama', 'Choose the brand') + '</b><p class="small mute">Range Rover, Defender ' + T('sau', 'or') + ' Discovery.</p></li><li><b>' + T('Alegeți modelul', 'Choose the model') + '</b><p class="small mute">' + T('Doar modelul — nu versiunea sau echiparea.', 'Just the model — not the version or trim.') + '</p></li><li><b>' + T('Spuneți-ne preferințele', 'Tell us your preferences') + '</b><p class="small mute">' + T('Motorizare, termen, finanțare, trade-in.', 'Powertrain, timing, finance, trade-in.') + '</p></li><li><b>' + T('Primiți oferta', 'Get your offer') + '</b><p class="small mute">' + T('Un consilier configurează mașina împreună cu dumneavoastră.', 'An advisor specifies the car together with you.') + '</p></li></ol>';

  SP.pages = {};

  /* ---------------- HOME ---------------- */
  SP.pages.home = () => ({
    title: 'Land Rover',
    html: '<h1 class="sr">' + D.name + '</h1><section class="hob" aria-label="Range Rover, Defender, Discovery">' + SP.BRANDS.map(b => '<a class="hob__t" href="modele.html?b=' + b.id + '"><video muted loop playsinline autoplay preload="metadata" poster="' + b.poster + '" aria-hidden="true"><source src="' + b.video + '" type="video/mp4"></video><b>' + b.word + '</b><span class="btn btn--white btn--sm">' + T('Explorați', 'Explore') + '</span></a>').join('') + '</section>' +
      '<section class="sec sec--alt"><div class="wrap" style="width:min(1980px,100% - 32px)">' + ttl(T('Alegeți modelul', 'Choose your model'), T('Selectați gama și modelul, apoi solicitați oferta — consilierul nostru se ocupă de configurare.', 'Select the brand and model, then request an offer — our advisor takes care of the specification.')) + '<div id="home-ch"></div></div></section>' +
      '<section class="wb" style="background-image:url(\'' + SP.OFFERS[0].img + '\')"><div class="wrap wb__in"><p class="eyebrow" style="color:#fff">' + T('Ofertă', 'Offer') + '</p><h2>' + X(SP.OFFERS[0].t) + '</h2><p>' + X(SP.OFFERS[0].d) + '</p><a class="btn btn--white" href="' + SP.OFFERS[0].href + '">' + X(SP.OFFERS[0].cta) + '</a> <a class="btn btn--ghost" href="oferte.html">' + T('Toate ofertele', 'All offers') + '</a></div></section>' +
      '<section class="sec"><div class="wrap">' + ttl(T('Stoc autovehicule noi', 'New vehicle stock'), SP.STOCK.length + T(' vehicule disponibile imediat sau în tranzit la ', ' vehicles available now or in transit at ') + D.name) + stockGrid(SP.STOCK.filter(v => v.status === 'stoc').slice(0, 6)) + '<p style="text-align:center;margin-top:26px"><a class="btn btn--accent" href="stoc.html">' + T('Vedeți tot stocul', 'See all stock') + '</a></p></div></section>' +
      '<section class="sec sec--alt"><div class="wrap"><div class="two"><div><p class="eyebrow">Land Rover Approved</p><h2 style="letter-spacing:.08em">' + T('Vehicule rulate certificate', 'Certified pre-owned vehicles') + '</h2><p class="mute">' + T('Fiecare vehicul Approved trece printr-o inspecție în 165 de puncte, are garanție de 12 luni și asistență rutieră.', 'Every Approved vehicle passes a 165-point inspection and comes with a 12-month warranty and roadside assistance.') + '</p><ul class="ticks"><li>' + I('check') + T('Inspecție tehnică în 165 de puncte', '165-point technical inspection') + '</li><li>' + I('check') + T('Garanție Land Rover Approved 12 luni', '12-month Land Rover Approved warranty') + '</li><li>' + I('check') + T('Istoric verificat și kilometraj certificat', 'Checked history and certified mileage') + '</li></ul><a class="btn btn--accent" href="approved.html">' + T('Vedeți vehiculele Approved', 'See Approved vehicles') + ' (' + SP.USED.length + ')</a></div><div>' + SP.vcard(SP.USED[0]) + '</div></div></div></section>' +
      '<section class="sec"><div class="wrap">' + ttl(T('Ofertele actuale', 'Current offers')) + '<div class="grid3">' + SP.OFFERS.slice(1).map(o => '<a class="lcard" href="' + o.href + '"><div class="lcard__img"><img src="' + o.img + '" alt="" loading="lazy"></div><div class="lcard__b"><small>' + (o.brand === 'all' ? 'Service' : SP.brand(o.brand).name) + '</small><h3>' + X(o.t) + '</h3><p>' + X(o.d) + '</p><div class="lcard__f"><span class="lk">' + X(o.cta) + '</span>' + I('arrow') + '</div></div></a>').join('') + '</div></div></section>' +
      '<section class="sec sec--alt"><div class="wrap"><div class="two"><div><p class="eyebrow">' + T('Dealerul dumneavoastră', 'Your dealer') + '</p><h2 style="letter-spacing:.08em">' + D.name + '</h2><p>' + I('pin') + ' ' + D.address + '</p><p>' + T('Vânzări', 'Sales') + ': <a href="tel:' + D.phone.replace(/\s/g, '') + '">' + D.phone + '</a> · Service: <a href="tel:' + D.phoneService.replace(/\s/g, '') + '">' + D.phoneService + '</a></p><div class="two" style="gap:20px"><div><h4 class="eyebrow">' + T('Showroom', 'Showroom') + '</h4>' + SP.hours(D.hours) + '</div><div><h4 class="eyebrow">Service</h4>' + SP.hours(D.hoursService) + '</div></div><p style="margin-top:18px"><a class="btn btn--accent" href="locatie.html">' + T('Detalii dealer', 'Dealer details') + '</a> <a class="btn btn--line" href="service.html">' + T('Programare service', 'Book a service') + '</a></p></div><iframe class="map" title="Map" loading="lazy" src="' + SP.maps(D.address) + '"></iframe></div></div></section>' +
      '<section class="sec"><div class="wrap">' + ttl(T('Cum solicitați un Land Rover', 'How to request a Land Rover'), T('Fără configurator complicat — ne spuneți modelul, noi revenim cu oferta.', 'No complicated configurator — tell us the model and we come back with an offer.')) + requestSteps() + '<p style="text-align:center;margin-top:24px"><a class="btn btn--accent" href="solicita.html?tip=oferta">' + T('Solicitați oferta', 'Request an offer') + '</a> <a class="btn btn--line" href="solicita.html?tip=test-drive">Test drive</a></p></div></section>' +
      '<section class="sec sec--alt"><div class="wrap">' + ttl(T('Noutăți', 'News')) + '<div class="grid3">' + SP.NEWS.map(newsCard).join('') + '</div></div></section>',
    bind() { SP.chooser($('#home-ch')); $$('.hob video').forEach(v => { v.play && v.play().catch(() => {}); }); }
  });
  const newsCard = n => '<a class="lcard" href="stire.html?id=' + n.id + '"><div class="lcard__img"><img src="' + n.img + '" alt="" loading="lazy"></div><div class="lcard__b"><span class="news-d">' + new Date(n.date).toLocaleDateString(SP.lang === 'en' ? 'en-GB' : 'ro-RO', { day: 'numeric', month: 'long', year: 'numeric' }) + '</span><h3>' + X(n.t) + '</h3><p>' + X(n.d) + '</p></div></a>';

  /* ---------------- MODELS ---------------- */
  SP.pages.models = () => {
    const b = SP.brand(SP.param('b')) ? SP.param('b') : null;
    return {
      title: T('Modele', 'Models'),
      html: phead(T('Gama Land Rover', 'The Land Rover range'), T('Range Rover, Defender și Discovery — alegeți modelul și solicitați oferta.', 'Range Rover, Defender and Discovery — choose the model and request an offer.')) +
        '<section class="sec sec--alt" style="padding-top:28px"><div class="wrap" style="width:min(1980px,100% - 32px)"><div id="ch"></div></div></section>' +
        SP.BRANDS.filter(x => !b || x.id === b).map(x => '<section class="sec" id="' + x.id + '"><div class="wrap">' + ttl(x.word, X(x.t)) + '<div class="grid3">' + SP.MODELS.filter(m => m.brand === x.id).map(SP.modelCard).join('') + '</div></div></section>').join('') +
        (b ? '<p style="text-align:center;margin:-10px 0 40px"><a class="btn btn--line" href="modele.html">' + T('Toată gama', 'Full range') + '</a></p>' : ''),
      bind() { SP.chooser($('#ch'), { brand: b || 'rr' }); }
    };
  };

  /* ---------------- MODEL ---------------- */
  SP.pages.model = () => {
    const m = ownerOK(SP.param('m')) || SP.MODELS[0], b = SP.brand(m.brand), st = SP.STOCK.filter(v => v.m === m.id), ap = SP.USED.filter(v => v.m === m.id);
    return {
      title: m.name,
      html: '<section class="mhero" style="background-image:url(\'' + m.hero + '\')"><div class="mhero__in"><small>' + b.word + '</small><h1>' + m.name + '</h1><p>' + X(m.tag) + '</p><p style="font-size:1rem">' + SP.from(m) + '</p><a class="btn btn--white" href="solicita.html?tip=oferta&m=' + m.id + '">' + T('Solicitați oferta', 'Request an offer') + '</a> <a class="btn btn--ghost" href="solicita.html?tip=test-drive&m=' + m.id + '">Test drive</a></div></section>' +
        '<nav class="subnav" aria-label="' + m.name + '"><div class="wrap"><b>' + m.name.toUpperCase() + '</b><a href="#prezentare">' + T('Prezentare', 'Overview') + '</a><a href="#galerie">' + T('Galerie', 'Gallery') + '</a><a href="#stoc">' + T('Stoc', 'Stock') + ' (' + st.length + ')</a><a href="#solicitare">' + T('Solicitare', 'Request') + '</a><a class="btn btn--accent btn--sm" href="solicita.html?tip=oferta&m=' + m.id + '">' + T('Solicitați oferta', 'Request an offer') + '</a></div></nav>' +
        '<section class="sec" id="prezentare"><div class="wrap"><div class="kv"><div><span>' + T('Preț', 'Price') + '</span><b>' + SP.fromTxt(m) + '</b></div>' + m.key.map(k => '<div><span>' + (SP.lang === 'en' ? k[1] : k[0]) + '</span><b>' + k[2] + '</b></div>').join('') + '</div>' +
        '<div class="two" style="margin-top:36px"><div><h2 style="letter-spacing:.08em">' + m.name + '</h2><p class="mute">' + X(m.tag) + ' ' + T('Versiunea, motorizarea, culorile și pachetele le stabiliți împreună cu consilierul ' + D.name + ' — fără să parcurgeți un configurator complex.', 'You choose version, powertrain, colours and packs together with a ' + D.name + ' advisor — no complex configurator needed.') + '</p><p><a class="lk" href="' + D.configurator + '" ' + SP.ext + '>' + I('ext') + T('Preferați să configurați singur? Configurator oficial Land Rover', 'Prefer to build it yourself? Official Land Rover configurator') + '</a></p></div><div class="card"><h3 style="letter-spacing:.08em;margin-top:0">' + T('Ce urmează', 'What happens next') + '</h3><ul class="ticks"><li>' + I('check') + T('Vă sunăm în aceeași zi lucrătoare', 'We call you the same working day') + '</li><li>' + I('check') + T('Stabilim versiunea și echiparea potrivită', 'We agree the right version and equipment') + '</li><li>' + I('check') + T('Primiți oferta scrisă, cu finanțare și trade-in', 'You receive a written offer, with finance and trade-in') + '</li></ul><a class="btn btn--accent btn--block" href="solicita.html?tip=oferta&m=' + m.id + '">' + T('Solicitați oferta', 'Request an offer') + '</a></div></div></div></section>' +
        '<section class="sec sec--alt" id="galerie"><div class="wrap">' + ttl(T('Galerie', 'Gallery')) + '<div class="mgal"><img src="' + m.gal[0] + '" alt="' + m.name + '" loading="lazy"><div>' + m.gal.slice(1, 3).concat(m.gal.length < 3 ? [m.side] : []).map(g => '<img src="' + g + '" alt="' + m.name + '" loading="lazy">').join('') + '</div></div></div></section>' +
        '<section class="sec" id="stoc"><div class="wrap">' + ttl(m.name + T(' în stoc', ' in stock'), st.length ? st.length + T(' vehicule noi disponibile', ' new vehicles available') : T('Momentan nu avem acest model în stoc — îl comandăm pentru dumneavoastră.', 'This model is not in stock right now — we order it for you.')) + stockGrid(st.concat(ap)) +
        (st.length ? '' : '<p style="text-align:center"><a class="btn btn--accent" href="solicita.html?tip=info&m=' + m.id + '">' + T('Țineți-mă la curent', 'Keep me informed') + '</a></p>') + '</div></section>' +
        '<section class="sec sec--alt" id="solicitare"><div class="wrap">' + ttl(T('Solicitare în 4 pași', 'Request in 4 steps')) + requestSteps() + '<p style="text-align:center;margin-top:24px"><a class="btn btn--accent" href="solicita.html?tip=oferta&m=' + m.id + '">' + T('Solicitați oferta', 'Request an offer') + '</a> <a class="btn btn--line" href="solicita.html?tip=programare&m=' + m.id + '">' + T('Solicitați o programare', 'Book an appointment') + '</a></p></div></section>' +
        '<section class="sec"><div class="wrap">' + ttl(T('Alte modele ', 'Other ') + b.name) + '<div class="grid3">' + SP.MODELS.filter(x => x.brand === m.brand && x.id !== m.id).map(SP.modelCard).join('') + '</div></div></section>'
    };
  };

  /* ---------------- REQUEST FLOW (replaces the configurator) ---------------- */
  SP.pages.request = () => {
    let tip = TIPS[SP.param('tip')] ? SP.param('tip') : 'oferta', m = ownerOK(SP.param('m')), b = m ? m.brand : null;
    return {
      title: X(TIPS[tip]),
      html: phead(T('Solicitare', 'Request'), T('Alegeți gama și modelul. Fără configurator: consilierul nostru stabilește versiunea și echiparea împreună cu dumneavoastră.', 'Choose the brand and model. No configurator: our advisor agrees the version and equipment with you.')) +
        '<section class="sec sec--alt"><div class="wrap"><div class="rq"><form id="rq" novalidate>' +
        '<div class="rq__step"><h3><i>1</i>' + T('Tipul solicitării', 'Request type') + '</h3><div class="chips2" id="s-tip">' + Object.keys(TIPS).map(k => '<label><input type="radio" name="tip" value="' + k + '"' + (k === tip ? ' checked' : '') + '><span>' + X(TIPS[k]) + '</span></label>').join('') + '</div></div>' +
        '<div class="rq__step"><h3><i>2</i>' + T('Gama', 'Brand') + '</h3><div class="bpick" id="s-brand"></div></div>' +
        '<div class="rq__step" id="st-model"><h3><i>3</i>' + T('Modelul', 'Model') + '</h3><div class="mpick" id="s-model"></div></div>' +
        '<div class="rq__step" id="st-pref"><h3><i>4</i>' + T('Preferințe', 'Preferences') + '</h3><div class="form">' +
        '<div class="fld full"><span>' + T('Motorizare', 'Powertrain') + '</span><div id="s-fuel"></div></div>' +
        '<div class="fld full"><span>' + T('Când doriți mașina?', 'When do you want the car?') + '</span>' + chips('cand', [['Cât mai curând', 'As soon as possible'], ['1 – 3 luni', '1 – 3 months'], ['3 – 6 luni', '3 – 6 months'], ['Doar mă informez', 'Just researching']]) + '</div>' +
        '<div class="fld full"><span>' + T('Finanțare', 'Finance') + '</span>' + chips('finantare', [['Integral', 'Cash'], ['Leasing', 'Leasing'], ['Credit auto', 'Car loan'], ['Nu știu încă', 'Not sure yet']], 'radio', 3) + '</div>' +
        '<div class="fld full" id="td-when" hidden><span>' + T('Data și intervalul preferat', 'Preferred date and time') + '</span><div class="form"><input class="inp" type="date" name="data" aria-label="Data"><select class="inp" name="interval" aria-label="Interval"><option>09:00 – 12:00</option><option>12:00 – 15:00</option><option>15:00 – 19:00</option><option>' + T('Sâmbătă 10:00 – 14:00', 'Saturday 10:00 – 14:00') + '</option></select></div></div>' +
        '<label class="check full" id="tradein"><input type="checkbox" name="tradein" value="da" data-ti> <span>' + T('Am o mașină de dat la schimb (trade-in)', 'I have a car to trade in') + '</span></label>' +
        '<div class="form full" id="ti" hidden><div class="fld"><label for="ti-car">' + T('Marca și modelul', 'Make and model') + '</label><input class="inp" id="ti-car" name="ti_masina"></div><div class="fld"><label for="ti-y">' + T('An / km', 'Year / km') + '</label><input class="inp" id="ti-y" name="ti_an_km" placeholder="2020 / 85.000"></div></div></div></div>' +
        '<div class="rq__step" id="st-contact"><h3><i>5</i>' + T('Datele de contact', 'Contact details') + '</h3><div class="form">' + SP.contactFields({ msg: 1, msgLabel: T('Mesaj (opțional)', 'Message (optional)') }) + '<button class="btn btn--accent btn--block full" type="submit">' + T('Trimiteți solicitarea', 'Send request') + I('arrow') + '</button></div></div></form><aside class="rq__sum" id="sum"></aside></div></div></section>',
      bind() {
        const f = $('#rq');
        const draw = () => {
          $('#s-brand').innerHTML = SP.BRANDS.map(x => '<button type="button" data-b="' + x.id + '" aria-pressed="' + (x.id === b) + '" style="background-image:url(\'' + x.poster + '\')"><b>' + x.word + '</b></button>').join('');
          $('#s-model').innerHTML = b ? SP.MODELS.filter(x => x.brand === b).map(x => '<button type="button" data-m="' + x.id + '" aria-pressed="' + (!!m && x.id === m.id) + '"><img src="' + x.side + '" alt="" loading="lazy"><span><b>' + x.name + '</b><small>' + SP.fromTxt(x) + '</small></span></button>').join('') : '<p class="mute small" style="margin:0">' + T('Alegeți întâi gama.', 'Choose the brand first.') + '</p>';
          $('#s-fuel').innerHTML = m ? chips('motorizare', m.fuels.concat([['Nu știu încă', 'Not sure yet']])) : '<p class="mute small" style="margin:0">—</p>';
          ['#st-model'].forEach(s => $(s).classList.toggle('is-off', !b));
          ['#st-pref', '#st-contact'].forEach(s => $(s).classList.toggle('is-off', !m));
          $('#td-when').hidden = !(tip === 'test-drive' || tip === 'programare');
          $('#sum').innerHTML = (m ? '<img src="' + m.side + '" alt="' + m.name + '">' : '') + '<div><p class="eyebrow" style="margin:0">' + X(TIPS[tip]) + '</p><h3 style="letter-spacing:.06em;margin:.3em 0">' + (m ? m.name : T('Alegeți modelul', 'Choose a model')) + '</h3>' + (m ? '<p style="margin:0">' + SP.from(m) + '</p>' : '') +
            '<dl><dt>' + T('Gama', 'Brand') + '</dt><dd>' + (b ? SP.brand(b).name : '—') + '</dd><dt>Dealer</dt><dd>' + D.name + '</dd><dt>' + T('Răspuns', 'Response') + '</dt><dd>' + T('în aceeași zi lucrătoare', 'same working day') + '</dd></dl>' +
            (m ? '<p style="margin:16px 0 0"><a class="lk" href="model.html?m=' + m.id + '">' + I('right') + T('Prezentare model', 'Model overview') + '</a><br><a class="lk" href="stoc.html?m=' + m.id + '">' + I('car') + T('Stoc', 'Stock') + ' (' + SP.inStock(m.id) + ')</a></p>' : '') +
            '<p class="small mute" style="margin:14px 0 0">' + T('Doriți să configurați detaliat? ', 'Want to build it in detail? ') + '<a href="' + D.configurator + '" ' + SP.ext + '>' + T('Configurator oficial', 'Official configurator') + ' ↗</a></p></div>';
        };
        f.addEventListener('click', e => {
          const bb = e.target.closest('[data-b]'); if (bb) { b = bb.dataset.b; m = null; draw(); $('#st-model').scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
          const mm = e.target.closest('[data-m]'); if (mm) { m = SP.model(mm.dataset.m); draw(); }
        });
        f.addEventListener('change', e => {
          if (e.target.name === 'tip') { tip = e.target.value; draw(); }
          if (e.target.matches('[data-ti]')) $('#ti').hidden = !e.target.checked;
        });
        const d = new Date(); d.setDate(d.getDate() + 1); f.querySelector('[name=data]').min = d.toISOString().slice(0, 10);
        if (location.hash === '#tradein') { const c = f.querySelector('[data-ti]'); c.checked = true; $('#ti').hidden = false; }
        f.addEventListener('submit', e => {
          e.preventDefault();
          if (!m) { SP.toast(T('Alegeți modelul', 'Choose a model')); return; }
          if (!SP.validate(f)) return;
          const data = Object.assign(SP.formData(f), { brand: SP.brand(b).name, model: m.name, model_id: m.id, sursa: 'website / ' + tip });
          if ($('#td-when').hidden) { delete data.data; delete data.interval; }
          const l = SP.lead(tip, data);
          $('.rq').innerHTML = '<div class="card" style="grid-column:1/-1">' + SP.done(T('Mulțumim! Solicitarea a fost trimisă.', 'Thank you! Your request has been sent.'), esc(m.name) + ' — ' + X(TIPS[tip]) + '. ' + T('Un consilier ' + D.name + ' vă contactează în aceeași zi lucrătoare.', 'A ' + D.name + ' advisor will contact you the same working day.'), l.ref) +
            '<p style="text-align:center"><a class="btn btn--accent" href="stoc.html?m=' + m.id + '">' + T('Vedeți stocul', 'See stock') + '</a> <a class="btn btn--line" href="model.html?m=' + m.id + '">' + m.name + '</a></p></div>';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        draw();
      }
    };
  };

  /* ---------------- STOCK (new) ---------------- */
  const stockPage = (used) => () => {
    const base = used ? SP.USED : SP.STOCK, pm = SP.param('m'), pb = SP.param('brand');
    const fuels = [...new Set(base.map(v => v.fuel))];
    return {
      title: used ? 'Land Rover Approved' : T('Stoc autovehicule noi', 'New vehicle stock'),
      html: phead(used ? 'Land Rover Approved' : T('Stoc autovehicule noi', 'New vehicle stock'), used ? T('Vehicule rulate certificate: inspecție în 165 de puncte, garanție 12 luni, asistență rutieră.', 'Certified pre-owned: 165-point inspection, 12-month warranty, roadside assistance.') : T('Vehicule noi în stoc, în tranzit și demo la ' + D.name + '.', 'New vehicles in stock, in transit and demo at ' + D.name + '.')) +
        (used ? '<section class="sec" style="padding-bottom:0"><div class="wrap"><div class="usps" style="margin-top:0">' + [['shield', ['Inspecție 165 de puncte', '165-point inspection'], ['Efectuată de tehnicieni Land Rover', 'Carried out by Land Rover technicians']], ['doc', ['Garanție 12 luni', '12-month warranty'], ['Kilometraj nelimitat', 'Unlimited mileage']], ['phone', ['Asistență rutieră', 'Roadside assistance'], ['12 luni, în toată Europa', '12 months, across Europe']], ['swap', ['Trade-in', 'Trade-in'], ['Evaluăm mașina dumneavoastră', 'We value your car']]].map(u => '<div class="usp">' + I(u[0]) + '<div><b>' + X(u[1]) + '</b><span>' + X(u[2]) + '</span></div></div>').join('') + '</div></div></section>' : '') +
        '<section class="sec"><div class="wrap"><div class="stock"><aside class="filters" id="flt" aria-label="Filters"><h3>' + T('Filtre', 'Filters') + ' <button class="btn btn--sm btn--line fbtn" type="button" data-fclose>' + I('x') + '</button></h3>' +
        '<div class="fld"><span>' + T('Gama', 'Brand') + '</span><div class="pills">' + SP.BRANDS.map(x => '<label><input type="checkbox" name="brand" value="' + x.id + '"' + (pb === x.id || (pm && SP.model(pm) && SP.model(pm).brand === x.id) ? ' checked' : '') + '><span>' + x.name + '</span></label>').join('') + '</div></div>' +
        '<div class="fld"><label for="f-m">' + T('Model', 'Model') + '</label><select class="inp" id="f-m" name="m"><option value="">' + T('Toate modelele', 'All models') + '</option>' + SP.MODELS.filter(x => base.some(v => v.m === x.id)).map(x => '<option value="' + x.id + '"' + (pm === x.id ? ' selected' : '') + '>' + x.name + '</option>').join('') + '</select></div>' +
        '<div class="fld"><span>' + T('Combustibil', 'Fuel') + '</span><div class="pills">' + fuels.map(x => '<label><input type="checkbox" name="fuel" value="' + x + '"><span>' + x + '</span></label>').join('') + '</div></div>' +
        (used ? '' : '<div class="fld"><span>' + T('Disponibilitate', 'Availability') + '</span><div class="pills">' + ['stoc', 'tranzit', 'demo'].map(x => '<label><input type="checkbox" name="status" value="' + x + '"><span>' + X(SP.STATUS[x]) + '</span></label>').join('') + '</div></div>') +
        '<div class="fld"><label for="f-p">' + T('Preț maxim', 'Max price') + '</label><select class="inp" id="f-p" name="pmax"><option value="">' + T('Oricare', 'Any') + '</option>' + [60000, 80000, 100000, 150000, 250000].map(p => '<option value="' + p + '">' + SP.eur(p) + '</option>').join('') + '</select></div>' +
        '<button class="btn btn--line btn--sm" type="button" data-reset>' + T('Resetați filtrele', 'Reset filters') + '</button></aside>' +
        '<div><div class="toolbar"><b id="cnt"></b><div class="toolbar__r" style="display:flex;gap:8px"><button class="btn btn--line btn--sm fbtn" type="button" data-fopen>' + I('filter') + T('Filtre', 'Filters') + '</button><select class="inp" id="sort" aria-label="Sort"><option value="pa">' + T('Preț crescător', 'Price low to high') + '</option><option value="pd">' + T('Preț descrescător', 'Price high to low') + '</option><option value="m">Model</option>' + (used ? '<option value="km">' + T('Kilometraj', 'Mileage') + '</option>' : '') + '</select></div></div><div id="res"></div></div></div></div></section>' +
        '<section class="sec sec--alt"><div class="wrap" style="text-align:center"><h2 style="letter-spacing:.08em">' + T('Nu găsiți modelul dorit?', 'Can’t find the model you want?') + '</h2><p class="mute">' + T('Îl comandăm din fabrică, exact cum îl doriți.', 'We order it from the factory, exactly as you want it.') + '</p><a class="btn btn--accent" href="solicita.html?tip=oferta">' + T('Solicitați oferta', 'Request an offer') + '</a></div></section>',
      bind() {
        const fl = $('#flt'), vals = n => $$('[name=' + n + ']:checked', fl).map(i => i.value);
        const run = () => {
          const br = vals('brand'), fu = vals('fuel'), stt = vals('status'), mm = $('#f-m').value, pmax = +$('#f-p').value || 1e9, so = $('#sort').value;
          let L = base.filter(v => (!br.length || br.includes(SP.model(v.m).brand)) && (!fu.length || fu.includes(v.fuel)) && (!stt.length || stt.includes(v.status)) && (!mm || v.m === mm) && v.price <= pmax);
          L.sort(so === 'pa' ? (a, b) => a.price - b.price : so === 'pd' ? (a, b) => b.price - a.price : so === 'km' ? (a, b) => a.km - b.km : (a, b) => SP.MODELS.indexOf(SP.model(a.m)) - SP.MODELS.indexOf(SP.model(b.m)));
          $('#cnt').textContent = L.length + T(' vehicule', ' vehicles');
          $('#res').innerHTML = L.length ? stockGrid(L) : '<div class="empty"><p>' + T('Niciun vehicul pentru aceste filtre.', 'No vehicles match these filters.') + '</p><a class="btn btn--accent" href="solicita.html?tip=info' + (mm ? '&m=' + mm : '') + '">' + T('Țineți-mă la curent', 'Keep me informed') + '</a></div>';
        };
        fl.addEventListener('change', run); $('#sort').addEventListener('change', run);
        $('[data-reset]').onclick = () => { $$('input', fl).forEach(i => i.checked = false); $$('select', fl).forEach(s => s.value = ''); run(); };
        $('[data-fopen]').onclick = () => fl.classList.add('is-open'); $('[data-fclose]').onclick = () => { fl.classList.remove('is-open'); };
        run();
      }
    };
  };
  SP.pages.stock = stockPage(false);
  SP.pages.approved = stockPage(true);

  /* ---------------- VEHICLE ---------------- */
  SP.pages.vehicle = () => {
    const v = SP.car(SP.param('id'));
    if (!v) return SP.pages.notfound();
    const m = SP.model(v.m), imgs = [m.side].concat(m.gal), save = v.list - v.price;
    const facts = [[T('An', 'Year'), v.year], ['Km', SP.km(v.km)], [T('Combustibil', 'Fuel'), v.fuel], [T('Culoare', 'Colour'), v.color]];
    return {
      title: SP.title(v),
      html: '<section class="sec" style="padding-top:26px"><div class="wrap"><div class="crumbs"><a href="index.html">' + T('Acasă', 'Home') + '</a> / <a href="' + (v.used ? 'approved.html' : 'stoc.html') + '">' + (v.used ? 'Approved' : T('Stoc', 'Stock')) + '</a> / ' + esc(SP.title(v)) + '</div>' +
        '<div class="vd"><div><div class="vd__m"><h2>' + esc(m.name) + '</h2><p>' + esc(v.ver) + '</p></div><div class="gal"><img id="gimg" src="' + imgs[0] + '" alt="' + esc(SP.title(v)) + '"><span class="badge2">' + (v.used ? 'Land Rover Approved' : X(SP.STATUS[v.status])) + '</span></div><div class="thumbs">' + imgs.map((g, i) => '<button type="button" data-g="' + i + '" aria-current="' + (i === 0) + '"><img src="' + g + '" alt="" loading="lazy"></button>').join('') + '</div>' +
        '<div class="keyfacts">' + facts.map(f => '<div><span>' + f[0] + '</span><b>' + esc(f[1]) + '</b></div>').join('') + '</div>' +
        '<div class="panel"><h3 style="letter-spacing:.08em;margin-top:0">' + T('Despre acest vehicul', 'About this vehicle') + '</h3><table class="hours"><tr><td>Model</td><td>' + esc(m.name) + '</td></tr><tr><td>' + T('Versiune', 'Version') + '</td><td>' + esc(v.ver) + '</td></tr><tr><td>' + T('Motorizare', 'Powertrain') + '</td><td>' + esc(v.eng) + '</td></tr><tr><td>' + T('Culoare exterior', 'Exterior colour') + '</td><td>' + esc(v.color) + '</td></tr><tr><td>' + T('Disponibilitate', 'Availability') + '</td><td>' + (v.used ? 'Land Rover Approved' : X(SP.STATUS[v.status])) + '</td></tr><tr><td>' + T('Cod stoc', 'Stock ID') + '</td><td>' + v.id + '</td></tr></table>' +
        '<p class="small mute" style="margin-bottom:0">' + T('Fotografiile sunt imagini oficiale de prezentare ale modelului. Echiparea exactă se confirmă de consilier.', 'Photos are official model images. Exact equipment is confirmed by the advisor.') + '</p></div>' +
        (v.used ? '<div class="panel"><h3 style="letter-spacing:.08em;margin-top:0">Land Rover Approved</h3><ul class="ticks" style="margin:0"><li>' + I('check') + T('Inspecție în 165 de puncte', '165-point inspection') + '</li><li>' + I('check') + T('Garanție 12 luni, kilometraj nelimitat', '12-month warranty, unlimited mileage') + '</li><li>' + I('check') + T('Asistență rutieră 12 luni', '12-month roadside assistance') + '</li></ul></div>' : '') +
        '</div><aside class="buy"><p class="eyebrow" style="margin:0">' + SP.brand(m.brand).name + '</p><h1>' + esc(m.name) + '</h1><p style="margin:0">' + esc(v.ver + ' · ' + v.eng) + '</p><div>' + (save > 0 ? '<s class="mute">' + SP.eur(v.list) + '</s> <span class="small">' + T('economisiți ', 'save ') + SP.eur(save) + '</span>' : '') + '<div class="price">' + SP.eur(v.price) + '</div><span class="small mute">' + T('TVA inclus', 'VAT included') + '</span></div>' +
        '<div class="buy__pm"><span>' + T('Rată orientativă*', 'Indicative monthly*') + '</span><b>' + SP.eur(SP.rate(v.price)) + T('/lună', '/month') + '</b></div>' +
        '<button class="btn btn--accent btn--block" type="button" data-enq>' + T('Solicitați acest vehicul', 'Enquire about this vehicle') + '</button><div class="buy__g"><button class="btn btn--line" type="button" data-td>Test drive</button><a class="btn btn--line" href="tel:' + D.phone.replace(/\s/g, '') + '">' + I('phone') + T('Sunați', 'Call') + '</a></div>' +
        '<div class="buy__x"><a href="model.html?m=' + m.id + '">' + I('info') + T('Despre model', 'About the model') + '</a><a href="solicita.html?tip=oferta&m=' + m.id + '#tradein">' + I('swap') + 'Trade-in</a><button type="button" onclick="window.print()">' + I('print') + T('Printați', 'Print') + '</button></div>' +
        '<p class="small mute" style="margin:0">* ' + T('Avans 20%, 48 de luni, DAE ' + SP.APR + '%, orientativ.', '20% down, 48 months, ' + SP.APR + '% APR, indicative.') + '</p></aside></div></div></section>' +
        '<section class="sec sec--alt"><div class="wrap">' + ttl(T('Vehicule similare', 'Similar vehicles')) + stockGrid(SP.ALL.filter(x => x.id !== v.id && SP.model(x.m).brand === m.brand).slice(0, 3)) + '</div></section>',
      bind() {
        $$('[data-g]').forEach(b => b.onclick = () => { $('#gimg').src = imgs[+b.dataset.g]; $$('[data-g]').forEach(x => x.setAttribute('aria-current', x === b)); });
        $('[data-enq]').onclick = () => SP.carEnquiry(v, 'vehicle'); $('[data-td]').onclick = () => SP.carEnquiry(v, 'test-drive');
      }
    };
  };

  /* ---------------- OFFERS ---------------- */
  SP.pages.offers = () => ({
    title: T('Oferte', 'Offers'),
    html: phead(T('Ofertele actuale', 'Current offers'), T('Oferte ' + D.name + ' și finanțare prin ' + D.importer + ' Financial Services.', D.name + ' offers and finance through ' + D.importer + ' Financial Services.')) +
      '<section class="sec"><div class="wrap"><div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,420px),1fr))">' + SP.OFFERS.map(o => '<a class="lcard" href="' + o.href + '"><div class="lcard__img"><img src="' + o.img + '" alt="" loading="lazy"></div><div class="lcard__b"><small>' + (o.brand === 'all' ? 'Service' : SP.brand(o.brand).name) + '</small><h3>' + X(o.t) + '</h3><p>' + X(o.d) + '</p><div class="lcard__f"><span class="lk">' + X(o.cta) + '</span>' + I('arrow') + '</div></div></a>').join('') + '</div></div></section>' +
      '<section class="sec sec--alt" id="finantare"><div class="wrap"><div class="calc card"><div><h2 style="letter-spacing:.08em;margin-top:0">' + T('Calculator rată orientativă', 'Indicative payment calculator') + '</h2><div class="form"><div class="fld full"><label for="c-m">Model</label><select class="inp" id="c-m">' + SP.MODELS.filter(m => m.from).map(m => '<option value="' + m.from + '">' + m.name + ' — ' + SP.eur(m.from) + '</option>').join('') + '</select></div><div class="fld"><label for="c-d">' + T('Avans', 'Deposit') + ' <b id="c-dv">20%</b></label><input id="c-d" type="range" min="0" max="50" step="5" value="20"></div><div class="fld"><label for="c-n">' + T('Perioadă', 'Term') + '</label><select class="inp" id="c-n"><option>36</option><option selected>48</option><option>60</option></select></div></div></div><div class="calc__out"><table><tr><td>' + T('Avans', 'Deposit') + '</td><td id="c-a"></td></tr><tr><td>' + T('Finanțat', 'Financed') + '</td><td id="c-f"></td></tr><tr><td>DAE</td><td>' + SP.APR + '%</td></tr></table><p style="font-size:2rem;margin:16px 0 4px" id="c-r"></p><p class="small mute">' + T('Rată lunară orientativă. Oferta finală se emite de finanțator, sub rezerva aprobării.', 'Indicative monthly payment. The final offer is issued by the lender, subject to approval.') + '</p><a class="btn btn--accent" href="solicita.html?tip=oferta">' + T('Solicitați oferta de finanțare', 'Request a finance offer') + '</a></div></div></div></section>',
    bind() {
      const run = () => { const p = +$('#c-m').value, d = +$('#c-d').value / 100, n = +$('#c-n').value; $('#c-dv').textContent = Math.round(d * 100) + '%'; $('#c-a').textContent = SP.eur(p * d); $('#c-f').textContent = SP.eur(p * (1 - d)); $('#c-r').innerHTML = SP.eur(SP.rate(p, { dep: d, n })) + '<small class="mute" style="font-size:.9rem">' + T('/lună', '/month') + '</small>'; };
      ['#c-m', '#c-d', '#c-n'].forEach(s => $(s).addEventListener('input', run)); run();
    }
  });

  /* ---------------- SERVICE ---------------- */
  SP.pages.service = () => {
    const pm = SP.param('m');
    return {
      title: T('Programare service', 'Book a service'),
      html: phead(T('Programare service', 'Book a service'), T('Service autorizat Land Rover, tehnicieni certificați, piese originale. ', 'Authorised Land Rover service, certified technicians, genuine parts. ') + D.phoneService) +
        '<section class="sec sec--alt"><div class="wrap"><div class="two"><form class="card" id="svc" novalidate><div class="form">' +
        '<div class="fld"><label for="s-m">Model</label><select class="inp" id="s-m" name="model" required><option value="">—</option>' + SP.MODELS.map(m => '<option' + (pm === m.id ? ' selected' : '') + '>' + m.name + '</option>').join('') + '<option>' + T('Alt model Land Rover', 'Other Land Rover model') + '</option></select></div>' +
        '<div class="fld"><label for="s-r">' + T('Nr. înmatriculare', 'Registration') + '</label><input class="inp" id="s-r" name="nr" placeholder="B 123 ABC" required></div>' +
        '<div class="fld"><label for="s-k">' + T('Kilometraj', 'Mileage') + '</label><input class="inp" id="s-k" name="km" inputmode="numeric"></div><div class="fld"><label for="s-v">VIN (' + T('opțional', 'optional') + ')</label><input class="inp" id="s-v" name="vin" maxlength="17"></div>' +
        '<div class="fld full"><span>' + T('Lucrări', 'Work') + '</span>' + chips('lucrari', [['Revizie periodică', 'Scheduled service'], ['Diagnoză', 'Diagnosis'], ['Anvelope / roți de iarnă', 'Tyres / winter wheels'], ['Garanție / rechemare', 'Warranty / recall'], ['Montaj accesorii', 'Accessory fitting'], ['Verificare de iarnă', 'Winter check']], 'checkbox', 0) + '</div>' +
        '<div class="fld"><label for="s-d">' + T('Data', 'Date') + '</label><input class="inp" id="s-d" type="date" name="data" required></div><div class="fld"><span>' + T('Ora', 'Time') + '</span><input type="hidden" name="ora" id="s-o" required><p class="small mute" id="s-hint" style="margin:6px 0 0">' + T('Alegeți data', 'Choose a date') + '</p></div><div class="slots full" id="slots"></div>' +
        '<label class="check full"><input type="checkbox" name="masina_schimb" value="da"> <span>' + T('Am nevoie de mașină la schimb', 'I need a courtesy car') + '</span></label>' +
        SP.contactFields({ msg: 1, msgLabel: T('Detalii', 'Details') }) + '<button class="btn btn--accent btn--block full" type="submit">' + T('Trimiteți programarea', 'Send booking') + '</button></div></form>' +
        '<div><div class="card"><h3 style="letter-spacing:.08em;margin-top:0">Service ' + D.name + '</h3><p>' + I('pin') + ' ' + D.address + '<br>' + I('phone') + ' <a href="tel:' + D.phoneService.replace(/\s/g, '') + '">' + D.phoneService + '</a><br>' + I('mail') + ' <a href="mailto:' + D.emailService + '">' + D.emailService + '</a></p>' + SP.hours(D.hoursService) + '</div><div class="card" style="margin-top:14px"><ul class="ticks" style="margin:0"><li>' + I('check') + T('Tehnicieni certificați Land Rover', 'Land Rover certified technicians') + '</li><li>' + I('check') + T('Piese și accesorii originale', 'Genuine parts and accessories') + '</li><li>' + I('check') + T('Actualizări software și verificare rechemări', 'Software updates and recall checks') + '</li><li>' + I('check') + T('Mașină la schimb, la cerere', 'Courtesy car on request') + '</li></ul></div></div></div></div></section>',
      bind() {
        const f = $('#svc'), di = $('#s-d'), d0 = new Date(); d0.setDate(d0.getDate() + 1); di.min = d0.toISOString().slice(0, 10);
        di.addEventListener('change', () => {
          const d = new Date(di.value + 'T12:00'), wd = d.getDay(); $('#s-o').value = '';
          if (!di.value) return;
          if (wd === 0) { $('#slots').innerHTML = ''; $('#s-hint').textContent = T('Duminica service-ul este închis.', 'The workshop is closed on Sunday.'); return; }
          const hrs = wd === 6 ? ['09:00', '10:00', '11:00', '12:00'] : ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
          const busy = hrs.filter((h, i) => (d.getDate() + i) % 4 === 0);
          $('#s-hint').textContent = T('Alegeți ora', 'Choose a time');
          $('#slots').innerHTML = hrs.map(h => '<button type="button" data-slot="' + h + '"' + (busy.includes(h) ? ' disabled' : '') + ' aria-pressed="false">' + h + '</button>').join('');
        });
        $('#slots').addEventListener('click', e => { const b = e.target.closest('[data-slot]'); if (!b) return; $$('[data-slot]').forEach(x => x.setAttribute('aria-pressed', x === b)); $('#s-o').value = b.dataset.slot; });
        f.addEventListener('submit', e => {
          e.preventDefault(); if (!SP.validate(f)) return; if (!$('#s-o').value) { SP.toast(T('Alegeți ora', 'Choose a time')); return; }
          const l = SP.lead('service', SP.formData(f));
          f.outerHTML = '<div class="card">' + SP.done(T('Programare trimisă', 'Booking sent'), T('Vă confirmăm programarea telefonic pentru ', 'We will confirm your booking by phone for ') + esc(l.data.data) + ', ' + esc(l.data.ora) + '.', l.ref) + '</div>';
        });
      }
    };
  };

  /* ---------------- OWNERS ---------------- */
  SP.pages.owners = () => {
    const S = [['garantie', 'shield', ['Revizii și garanție', 'Servicing and warranty'], ['Respectați planul de revizii Land Rover la service autorizat pentru a păstra garanția producătorului. Vă reamintim automat când se apropie revizia.', 'Follow the Land Rover service plan at an authorised workshop to keep the manufacturer warranty. We remind you automatically when a service is due.'], ['Programați revizia', 'Book a service'], 'service.html'],
      ['asistenta', 'phone', ['Asistență rutieră', 'Roadside assistance'], ['Asistență Land Rover 24/7 în România și Europa, pe toată durata garanției.', '24/7 Land Rover assistance in Romania and Europe for the warranty period.'], [D.phoneService, D.phoneService], 'tel:' + D.phoneService.replace(/\s/g, '')],
      ['rechemari', 'info', ['Rechemări', 'Recalls'], ['Verificați dacă vehiculul dumneavoastră are o campanie de rechemare deschisă.', 'Check whether your vehicle has an open recall campaign.'], null, null],
      ['accesorii', 'sparkle', ['Accesorii originale', 'Genuine accessories'], ['Roți, sisteme de transport, protecție și accesorii de stil — montate în service-ul nostru.', 'Wheels, carrying systems, protection and style accessories — fitted in our workshop.'], ['Solicitați montaj', 'Request fitting'], 'service.html'],
      ['piese', 'wrench', ['Piese originale', 'Genuine parts'], ['Piese originale Land Rover, comandate și montate cu garanție.', 'Genuine Land Rover parts, ordered and fitted with warranty.'], ['Contact piese', 'Parts contact'], 'contact.html?dep=piese'],
      ['remote', 'gear', ['Land Rover Remote și software', 'Land Rover Remote and software'], ['Aplicația Land Rover Remote și actualizările software over-the-air; vă ajutăm la activare la livrare.', 'The Land Rover Remote app and over-the-air software updates; we help you activate them at handover.'], null, null],
      ['incarcare', 'fuel', ['Încărcare PHEV', 'PHEV charging'], ['Sfaturi pentru încărcarea acasă și în rețelele publice pentru modelele PHEV.', 'Advice on charging PHEV models at home and on public networks.'], ['Întrebați un consilier', 'Ask an advisor'], 'contact.html']];
    return {
      title: T('Proprietari', 'Owners'),
      html: phead(T('Proprietari', 'Owners'), T('Tot ce aveți nevoie după livrare.', 'Everything you need after handover.')) + '<section class="sec"><div class="wrap"><div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,360px),1fr))">' +
        S.map(s => '<div class="panel" id="' + s[0] + '" style="margin:0"><h3 style="display:flex;gap:10px;align-items:center;letter-spacing:.08em;margin-top:0">' + I(s[1]) + X(s[2]) + '</h3><p class="mute">' + X(s[3]) + '</p>' + (s[0] === 'rechemari' ? '<form class="form" id="recall" novalidate><input class="inp" name="vin" maxlength="17" placeholder="VIN (17)" aria-label="VIN" required><button class="btn btn--accent btn--sm" type="submit">' + T('Verificați', 'Check') + '</button></form>' : s[4] ? '<a class="lk" href="' + s[5] + '">' + I('arrow') + X(s[4]) + '</a>' : '') + '</div>').join('') + '</div></div></section>',
      bind() { $('#recall').addEventListener('submit', e => { e.preventDefault(); const v = e.target.vin.value.trim(); if (v.length !== 17) { e.target.vin.setAttribute('aria-invalid', true); SP.toast(T('VIN-ul are 17 caractere', 'VIN has 17 characters')); return; } SP.toast(T('Demo: nicio rechemare deschisă pentru ', 'Demo: no open recall for ') + esc(v.toUpperCase())); }); }
    };
  };

  /* ---------------- FLEET ---------------- */
  SP.pages.fleet = () => ({
    title: T('Flote și companii', 'Fleet and business'),
    html: phead(T('Flote și companii', 'Fleet and business'), T('Ofertă dedicată pentru companii, leasing operațional și condiții de flotă.', 'Dedicated offers for companies, operating lease and fleet terms.')) +
      '<section class="sec"><div class="wrap"><div class="usps" style="margin-top:0">' + [['people', ['Consilier dedicat', 'Dedicated advisor'], ['Un singur contact pentru toată flota', 'One contact for the whole fleet']], ['pound', ['Leasing operațional', 'Operating lease'], ['Rată fixă cu service inclus', 'Fixed rental, service included']], ['wrench', ['Service prioritar', 'Priority service'], ['Mașină la schimb pentru flote', 'Courtesy cars for fleets']], ['doc', ['Defender Commercial', 'Defender Commercial'], ['Variante utilitare N1', 'N1 commercial versions']]].map(u => '<div class="usp">' + I(u[0]) + '<div><b>' + X(u[1]) + '</b><span>' + X(u[2]) + '</span></div></div>').join('') + '</div></div></section>' +
      '<section class="sec sec--alt"><div class="wrap"><div class="two"><form class="card" id="fl" novalidate><h2 style="letter-spacing:.08em;margin-top:0">' + T('Solicitare ofertă flotă', 'Fleet offer request') + '</h2><div class="form"><div class="fld"><label for="fl-c">' + T('Companie', 'Company') + '</label><input class="inp" id="fl-c" name="companie" required></div><div class="fld"><label for="fl-u">CUI</label><input class="inp" id="fl-u" name="cui"></div><div class="fld"><label for="fl-n">' + T('Număr vehicule', 'Number of vehicles') + '</label><select class="inp" id="fl-n" name="nr_vehicule"><option>1 – 2</option><option>3 – 5</option><option>6 – 10</option><option>10+</option></select></div><div class="fld"><label for="fl-f">' + T('Finanțare', 'Finance') + '</label><select class="inp" id="fl-f" name="finantare"><option>Leasing financiar</option><option>Leasing operațional</option><option>' + T('Integral', 'Cash') + '</option></select></div><div class="fld full"><span>' + T('Modele de interes', 'Models of interest') + '</span>' + chips('modele', SP.MODELS.map(m => m.name), 'checkbox', -1) + '</div>' + SP.contactFields({ msg: 1 }) + '<button class="btn btn--accent btn--block full" type="submit">' + T('Trimiteți', 'Send') + '</button></div></form>' +
      '<div><img src="' + SP.model('defender-130').gal[0] + '" alt="Defender 130" style="width:100%;aspect-ratio:4/3;object-fit:cover"><p class="mute small">' + T('Contact flote: ', 'Fleet contact: ') + SP.TEAM[0][0] + ', <a href="mailto:' + D.email + '">' + D.email + '</a></p></div></div></div></section>',
    bind() { SP.bindForm($('#fl'), 'fleet'); }
  });

  /* ---------------- LOCATION ---------------- */
  SP.pages.location = () => ({
    title: 'Dealer',
    html: phead(D.name, T('Dealer autorizat Land Rover — vânzări, Approved și service într-o singură locație.', 'Authorised Land Rover dealer — sales, Approved and service in one location.')) +
      '<section class="sec"><div class="wrap"><div class="two"><div><h2 style="letter-spacing:.08em;margin-top:0">' + T('Vizitați-ne', 'Visit us') + '</h2><p>' + I('pin') + ' ' + D.address + '</p><div class="two" style="gap:20px"><div class="card"><h3 class="eyebrow" style="margin-top:0">' + T('Vânzări', 'Sales') + '</h3><p><a href="tel:' + D.phone.replace(/\s/g, '') + '">' + D.phone + '</a><br><a href="mailto:' + D.email + '">' + D.email + '</a></p>' + SP.hours(D.hours) + '</div><div class="card"><h3 class="eyebrow" style="margin-top:0">Service</h3><p><a href="tel:' + D.phoneService.replace(/\s/g, '') + '">' + D.phoneService + '</a><br><a href="mailto:' + D.emailService + '">' + D.emailService + '</a></p>' + SP.hours(D.hoursService) + '</div></div>' +
      '<p style="margin-top:18px"><a class="btn btn--accent" href="https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(D.address) + '" ' + SP.ext + '>' + T('Indicații rutiere', 'Directions') + '</a> <a class="btn btn--line" href="solicita.html?tip=programare">' + T('Programare showroom', 'Showroom appointment') + '</a></p></div><iframe class="map" title="Map" loading="lazy" src="' + SP.maps(D.address) + '"></iframe></div></div></section>' +
      '<section class="sec sec--alt" id="echipa"><div class="wrap">' + ttl(T('Echipa', 'The team')) + '<div class="team">' + SP.TEAM.map(p => '<div class="person"><div class="avatar">' + p[0].split(' ').map(s => s[0]).join('') + '</div><b>' + p[0] + '</b><p class="small mute" style="margin:.3em 0 0">' + X(p[1]) + '</p></div>').join('') + '</div></div></section>'
  });

  /* ---------------- NEWS ---------------- */
  SP.pages.news = () => ({ title: T('Noutăți', 'News'), html: phead(T('Noutăți', 'News')) + '<section class="sec"><div class="wrap"><div class="grid3">' + SP.NEWS.map(newsCard).join('') + '</div></div></section>' });
  SP.pages.article = () => {
    const n = SP.NEWS.find(x => x.id === SP.param('id')) || SP.NEWS[0];
    const mid = { 'rr-electric': 'range-rover', 'defender-octa': 'defender-octa', 'discovery-35': 'discovery' }[n.id];
    return {
      title: X(n.t),
      html: phead(X(n.t), new Date(n.date).toLocaleDateString(SP.lang === 'en' ? 'en-GB' : 'ro-RO', { day: 'numeric', month: 'long', year: 'numeric' }), ' / <a href="stiri.html">' + T('Noutăți', 'News') + '</a>') +
        '<section class="sec"><div class="wrap prose" style="margin-inline:auto"><img src="' + n.img + '" alt="" style="width:100%;aspect-ratio:16/9;object-fit:cover"><p style="font-size:1.15rem">' + X(n.d) + '</p><p>' + T('Pentru detalii, disponibilitate și o prezentare personalizată, contactați echipa ' + D.name + ' sau trimiteți o solicitare online — vă răspundem în aceeași zi lucrătoare.', 'For details, availability and a personal presentation, contact the ' + D.name + ' team or send a request online — we reply the same working day.') + '</p>' +
        '<p><a class="btn btn--accent" href="solicita.html?tip=info&m=' + mid + '">' + T('Țineți-mă la curent', 'Keep me informed') + '</a> <a class="btn btn--line" href="model.html?m=' + mid + '">' + SP.model(mid).name + '</a></p></div></section>'
    };
  };

  /* ---------------- CONTACT ---------------- */
  SP.pages.contact = () => {
    const dep = SP.param('dep');
    const DEPS = [['vanzari', ['Vânzări autovehicule noi', 'New vehicle sales']], ['approved', ['Land Rover Approved', 'Land Rover Approved']], ['service', ['Service', 'Service']], ['piese', ['Piese și accesorii', 'Parts and accessories']], ['flote', ['Flote', 'Fleet']], ['altele', ['Altele', 'Other']]];
    return {
      title: 'Contact',
      html: phead('Contact', D.name + ' · ' + D.address) + '<section class="sec sec--alt"><div class="wrap"><div class="two"><form class="card" id="ct" novalidate><div class="form"><div class="fld full"><label for="c-dep">' + T('Departament', 'Department') + '</label><select class="inp" id="c-dep" name="departament">' + DEPS.map(d => '<option value="' + d[0] + '"' + (dep === d[0] ? ' selected' : '') + '>' + X(d[1]) + '</option>').join('') + '</select></div>' + SP.contactFields({ msg: 1 }) + '<button class="btn btn--accent btn--block full" type="submit">' + T('Trimiteți mesajul', 'Send message') + '</button></div></form>' +
        '<div class="card"><b class="word">LAND ROVER</b><p>' + D.name + '<br>' + D.address + '</p><p>' + T('Vânzări', 'Sales') + ': <a href="tel:' + D.phone.replace(/\s/g, '') + '">' + D.phone + '</a><br>Service: <a href="tel:' + D.phoneService.replace(/\s/g, '') + '">' + D.phoneService + '</a><br><a href="mailto:' + D.email + '">' + D.email + '</a></p>' + SP.hours(D.hours) + '<p class="small mute" style="margin-bottom:0">' + D.legal.company + ' · ' + D.legal.reg + ' · ' + D.legal.cui + '<br>' + T('Importator Land Rover: ', 'Land Rover importer: ') + D.importer + '</p></div></div></div></section>',
      bind() { SP.bindForm($('#ct'), 'contact'); }
    };
  };

  /* ---------------- LEGAL / SITEMAP / 404 ---------------- */
  SP.pages.legal = () => {
    const docs = { cookies: [T('Politica cookies', 'Cookie policy'), T('Folosim cookie-uri esențiale pentru funcționarea site-ului și, doar cu acordul dumneavoastră, cookie-uri de analiză. Puteți schimba alegerea oricând ștergând datele site-ului din browser.', 'We use essential cookies to run the site and, only with your consent, analytics cookies. You can change your choice at any time by clearing the site data in your browser.')],
      confidentialitate: [T('Politica de confidențialitate', 'Privacy policy'), T('Operatorul datelor este ' + D.legal.company + ' (' + D.name + '). Datele trimise prin formulare sunt folosite doar pentru a răspunde solicitării și, cu acord separat, pentru comunicări de marketing. Pot fi transmise importatorului ' + D.importer + ' pentru oferte și garanție. Aveți dreptul de acces, rectificare, ștergere și opoziție: ' + D.email + '.', 'The data controller is ' + D.legal.company + ' (' + D.name + '). Data sent through forms is used only to answer the request and, with separate consent, for marketing. It may be shared with the importer ' + D.importer + ' for offers and warranty. You have the right of access, rectification, erasure and objection: ' + D.email + '.')],
      termeni: [T('Termeni și condiții', 'Terms and conditions'), T('Informațiile de pe site au caracter informativ. Prețurile „De la” sunt prețuri de listă recomandate de importator, TVA inclus; oferta finală se emite în scris de dealer. Imaginile pot prezenta echipamente opționale.', 'Information on this site is for guidance only. "From" prices are the importer’s recommended list prices, VAT included; the final offer is issued in writing by the dealer. Images may show optional equipment.')] };
    const d = docs[SP.param('doc')] || docs.termeni;
    return { title: d[0], html: phead(d[0]) + '<section class="sec"><div class="wrap prose"><p>' + d[1] + '</p><p class="small mute">' + T('Document demonstrativ.', 'Demo document.') + '</p></div></section>' };
  };
  SP.pages.sitemap = () => {
    const L = [[T('Acasă', 'Home'), 'index.html'], [T('Modele', 'Models'), 'modele.html'], [T('Solicitați oferta', 'Request an offer'), 'solicita.html?tip=oferta'], ['Test drive', 'solicita.html?tip=test-drive'], [T('Stoc nou', 'New stock'), 'stoc.html'], ['Land Rover Approved', 'approved.html'], [T('Oferte', 'Offers'), 'oferte.html'], ['Service', 'service.html'], [T('Proprietari', 'Owners'), 'proprietari.html'], [T('Flote', 'Fleet'), 'fleet.html'], ['Dealer', 'locatie.html'], [T('Noutăți', 'News'), 'stiri.html'], ['Contact', 'contact.html'], [T('Termeni', 'Terms'), 'legal.html?doc=termeni']];
    const ul = a => '<ul>' + a.map(x => '<li><a href="' + x[1] + '">' + x[0] + '</a></li>').join('') + '</ul>';
    return { title: T('Harta site-ului', 'Sitemap'), html: phead(T('Harta site-ului', 'Sitemap')) + '<section class="sec"><div class="wrap"><div class="grid3"><div><h3>' + T('Pagini', 'Pages') + '</h3>' + ul(L) + '</div><div><h3>' + T('Modele', 'Models') + '</h3>' + ul(SP.MODELS.map(m => [m.name, 'model.html?m=' + m.id])) + '</div><div><h3>' + T('Vehicule', 'Vehicles') + '</h3>' + ul(SP.ALL.map(v => [v.id + ' · ' + SP.title(v), SP.carUrl(v)])) + '</div></div></div></section>' };
  };
  SP.pages.notfound = () => ({ title: '404', html: '<section class="sec"><div class="wrap" style="text-align:center;padding:60px 0"><p class="eyebrow">404</p><h1 style="letter-spacing:.1em">' + T('Pagina nu a fost găsită', 'Page not found') + '</h1><p class="mute">' + T('Vehiculul sau pagina nu mai este disponibilă.', 'The vehicle or page is no longer available.') + '</p><a class="btn btn--accent" href="index.html">' + T('Înapoi acasă', 'Back home') + '</a> <a class="btn btn--line" href="stoc.html">' + T('Stoc', 'Stock') + '</a></div></section>' });
})();
