/* Sales Partner Land Rover — demo data.
   Real (landrover.ro, November 2026): brands, models, "De la" prices incl. VAT, taglines, all images and the 3 home videos
   (hot-linked from media.cdn-jaguarlandrover.com). Fictional: dealer, location, people, stock, VINs, used cars.
   Production: GET /api/catalog + GET /api/stock from Sales Partner. */
window.SP = window.SP || {};
const JLR = 'https://media.cdn-jaguarlandrover.com/';
SP.img = (id, size) => JLR + 'api/v2/images/' + id + '/' + (size || 'w/1600/h/900') + '.jpg';

SP.DEALER = {
  name: 'Sales Partner Land Rover', short: 'Sales Partner',
  address: 'Bd. Iuliu Maniu 300, Sector 6, București', city: 'București',
  phone: '021 555 07 00', phoneService: '021 555 07 10', email: 'vanzari@sp-landrover.demo', emailService: 'service@sp-landrover.demo',
  legal: { company: 'Demo Auto Premium S.R.L.', reg: 'J40/0000/2026', cui: 'RO00000000' },
  importer: 'Importer Company',
  hours: [['Luni – Vineri', 'Monday – Friday', '09:00 – 19:00'], ['Sâmbătă', 'Saturday', '10:00 – 14:00'], ['Duminică', 'Sunday', null]],
  hoursService: [['Luni – Vineri', 'Monday – Friday', '08:00 – 18:00'], ['Sâmbătă', 'Saturday', '09:00 – 13:00'], ['Duminică', 'Sunday', null]],
  lat: 44.4322, lng: 25.9958,
  configurator: 'https://buildyour.landrover.com/lr/ro_ro/',
  logo: 'https://cdn-jaguarlandrover.com/system/land-rover-new-footer.png'
};

/* House of Brands: Range Rover · Defender · Discovery */
SP.BRANDS = [
  { id: 'rr', name: 'Range Rover', word: 'RANGE ROVER', video: JLR + 'video/hob/hob_range_rover.mp4', poster: SP.img(97721, 'w/1242/h/966'), tall: SP.img(97721, 'w/640/h/1080'),
    t: ['Modernism rafinat, lux fără egal.', 'Refined modernism, peerless luxury.'] },
  { id: 'defender', name: 'Defender', word: 'DEFENDER', video: JLR + 'video/hob/hob_defender.mp4', poster: SP.img(97722, 'w/1242/h/966'), tall: SP.img(97722, 'w/640/h/1080'),
    t: ['Capabil de lucruri mărețe.', 'Capable of great things.'] },
  { id: 'discovery', name: 'Discovery', word: 'DISCOVERY', video: JLR + 'video/hob/hob_discovery.mp4', poster: SP.img(97724, 'w/1242/h/966'), tall: SP.img(97724, 'w/640/h/1080'),
    t: ['Explorați fără încetare.', 'Explore relentlessly.'] }
];

/* models: side = menu thumbnail, hero = page hero, gal = gallery (all official landrover.ro media) */
const M = (id, brand, name, from, tag, side, hero, gal, key, fuels, seats) => ({ id, brand, name, from, tag, side, hero, gal, key, fuels, seats });
SP.MODELS = [
  M('range-rover', 'rr', 'Range Rover', 147560, ['Lux și rafinament fără egal.', 'Peerless luxury and refinement.'], SP.img(122065, 'w/680/h/383'), SP.img(124712, 'w/1920'), [126326, 126327].map(i => SP.img(i)).concat([SP.img(124722, 'w/1600')]),
    [['Motorizări', 'Powertrains', 'MHEV, PHEV'], ['Ampatament', 'Wheelbase', 'Standard / lung'], ['Locuri', 'Seats', '4 – 7']], ['MHEV', 'PHEV'], '4–7'),
  M('range-rover-sport', 'rr', 'Range Rover Sport', 95227, ['Prezență dinamică, acum și electric.', 'Dynamic presence, now also electric.'], SP.img(121792, 'w/680/h/383'), SP.img(125385, 'w/1600'), [118025, 118031, 118044].map(i => SP.img(i)),
    [['Motorizări', 'Powertrains', 'MHEV, PHEV, SV'], ['Tracțiune', 'Drive', 'AWD'], ['Locuri', 'Seats', '5']], ['MHEV', 'PHEV'], '5'),
  M('range-rover-velar', 'rr', 'Range Rover Velar', 73689, ['Design reductiv, tehnologie avansată.', 'Reductive design, advanced technology.'], SP.img(94305, 'w/680/h/383'), SP.img(124110, 'w/1600'), [SP.img(124112)],
    [['Motorizări', 'Powertrains', 'MHEV, PHEV'], ['Tracțiune', 'Drive', 'AWD'], ['Locuri', 'Seats', '5']], ['MHEV', 'PHEV'], '5'),
  M('range-rover-evoque', 'rr', 'Range Rover Evoque', 55479, ['SUV de lux compact, pentru oraș.', 'The compact luxury SUV for the city.'], SP.img(121794, 'w/680/h/383'), SP.img(119852, 'w/1920'), [119854, 119855].map(i => SP.img(i)),
    [['Motorizări', 'Powertrains', 'MHEV, PHEV'], ['Tracțiune', 'Drive', 'AWD'], ['Locuri', 'Seats', '5']], ['MHEV', 'PHEV'], '5'),
  M('defender-octa', 'defender', 'Defender OCTA', 193600, ['Capabil de lucruri mărețe.', 'Capable of great things.'], SP.img(124506, 'w/1600/h/900'), SP.img(122684, 'w/1600'), [122444, 122016, 124056].map(i => SP.img(i)),
    [['Putere', 'Power', '635 CP'], ['Motor', 'Engine', 'V8 Twin Turbo MHEV'], ['Locuri', 'Seats', '5']], ['MHEV'], '5'),
  M('defender-130', 'defender', 'Defender 130', 95046, ['Spațiu pentru aventură, până la 8 locuri.', 'Room for adventure, up to 8 seats.'], SP.img(124507, 'w/1600/h/900'), SP.img(122693, 'w/1600'), [124060, 116148].map(i => SP.img(i)),
    [['Motorizări', 'Powertrains', 'MHEV'], ['Tracțiune', 'Drive', '4x4'], ['Locuri', 'Seats', '5 – 8']], ['MHEV'], '5–8'),
  M('defender-110', 'defender', 'Defender 110', 74718, ['Pregătiți bagajele pentru orice.', 'Pack for anything.'], SP.img(124508, 'w/1600/h/900'), SP.img(122680, 'w/1600'), [114247, 114253].map(i => SP.img(i)),
    [['Motorizări', 'Powertrains', 'MHEV, PHEV'], ['Tracțiune', 'Drive', '4x4'], ['Locuri', 'Seats', '5 – 7']], ['MHEV', 'PHEV'], '5–7'),
  M('defender-90', 'defender', 'Defender 90', 71088, ['Capabil de lucruri mari, în format compact.', 'Big capability in a compact size.'], SP.img(124509, 'w/1600/h/900'), SP.img(122673, 'w/1920'), [115442, 116821, 115452].map(i => SP.img(i)),
    [['Motorizări', 'Powertrains', 'MHEV'], ['Tracțiune', 'Drive', '4x4'], ['Locuri', 'Seats', '5 – 6']], ['MHEV'], '5–6'),
  M('discovery', 'discovery', 'Discovery', 78227, ['Cel mai versatil SUV Land Rover de până acum.', 'The most versatile Land Rover SUV yet.'], SP.img(115515, 'w/680/h/383'), SP.img(114033, 'w/1920'), [121988, 121989, 121991].map(i => SP.img(i)),
    [['Motorizări', 'Powertrains', 'MHEV'], ['Tracțiune', 'Drive', 'AWD'], ['Locuri', 'Seats', '7']], ['MHEV'], '7'),
  M('discovery-sport', 'discovery', 'Discovery Sport', null, ['SUV-ul compact pentru familie.', 'The compact family SUV.'], SP.img(111607, 'w/680/h/383'), SP.img(114622, 'w/1920'), [114624, 114630, 115602].map(i => SP.img(i)),
    [['Motorizări', 'Powertrains', 'MHEV, PHEV'], ['Tracțiune', 'Drive', 'AWD'], ['Locuri', 'Seats', '5 + 2']], ['MHEV', 'PHEV'], '5+2')
];
SP.model = id => SP.MODELS.find(m => m.id === id);
SP.brand = id => SP.BRANDS.find(b => b.id === id);

/* stock — 15 new (fictional units of real models) */
const S = (id, m, ver, eng, fuel, color, price, list, status) => ({ id, m, ver, eng, fuel, color, price, list, status, year: 2026, km: 0, used: false });
SP.STOCK = [
  S('LR-26101', 'range-rover', 'SE', 'D350 MHEV, AWD automat', 'Diesel MHEV', 'Santorini Black', 152900, 158400, 'stoc'),
  S('LR-26102', 'range-rover', 'Autobiography LWB', 'P550e PHEV, AWD automat', 'Plug-in hybrid', 'Batumi Gold', 214500, 221300, 'tranzit'),
  S('LR-26103', 'range-rover-sport', 'Dynamic SE', 'D300 MHEV, AWD automat', 'Diesel MHEV', 'Varesine Blue', 99800, 104200, 'stoc'),
  S('LR-26104', 'range-rover-sport', 'Autobiography', 'P550e PHEV, AWD automat', 'Plug-in hybrid', 'Charente Grey', 138600, 138600, 'stoc'),
  S('LR-26105', 'range-rover-velar', 'Dynamic SE', 'P400e PHEV, AWD automat', 'Plug-in hybrid', 'Zadar Grey', 82400, 86900, 'stoc'),
  S('LR-26106', 'range-rover-evoque', 'S', 'D200 MHEV, AWD automat', 'Diesel MHEV', 'Fuji White', 57900, 60100, 'stoc'),
  S('LR-26107', 'range-rover-evoque', 'Dynamic SE', 'P300e PHEV, AWD automat', 'Plug-in hybrid', 'Tribeca Blue', 66300, 66300, 'demo'),
  S('LR-26108', 'defender-octa', 'Edition One', 'V8 Twin Turbo MHEV 635 CP', 'Benzină MHEV', 'Petra Copper', 214000, 214000, 'tranzit'),
  S('LR-26109', 'defender-130', 'X-Dynamic SE', 'D350 MHEV, 4x4 automat', 'Diesel MHEV', 'Gondwana Stone', 104900, 108700, 'stoc'),
  S('LR-26110', 'defender-110', 'X-Dynamic SE', 'D300 MHEV, 4x4 automat', 'Diesel MHEV', 'Pangea Green', 89700, 93400, 'stoc'),
  S('LR-26111', 'defender-110', 'Sedona Edition', 'P400e PHEV, 4x4 automat', 'Plug-in hybrid', 'Sedona Red', 98200, 98200, 'stoc'),
  S('LR-26112', 'defender-90', 'S', 'D250 MHEV, 4x4 automat', 'Diesel MHEV', 'Fuji White', 74300, 76100, 'stoc'),
  S('LR-26113', 'discovery', 'Dynamic SE', 'D300 MHEV, AWD automat, 7 locuri', 'Diesel MHEV', 'Carpathian Grey', 84900, 88600, 'stoc'),
  S('LR-26114', 'discovery-sport', 'S', 'D200 MHEV, AWD automat', 'Diesel MHEV', 'Eiger Grey', 54900, 56800, 'stoc'),
  S('LR-26115', 'discovery-sport', 'Dynamic SE', 'P300e PHEV, AWD automat', 'Plug-in hybrid', 'Santorini Black', 61200, 61200, 'demo')
];
/* Land Rover Approved used — 6 fictional units */
const U = (id, m, ver, eng, fuel, color, price, year, km) => ({ id, m, ver, eng, fuel, color, price, list: price, year, km, used: true, status: 'approved' });
SP.USED = [
  U('LRA-2401', 'range-rover', 'HSE', 'D350 MHEV, AWD automat', 'Diesel MHEV', 'Carpathian Grey', 118900, 2023, 31500),
  U('LRA-2402', 'range-rover-sport', 'Dynamic HSE', 'P440e PHEV, AWD automat', 'Plug-in hybrid', 'Santorini Black', 86400, 2023, 27800),
  U('LRA-2403', 'range-rover-velar', 'R-Dynamic SE', 'D300 MHEV, AWD automat', 'Diesel MHEV', 'Fuji White', 54900, 2022, 46200),
  U('LRA-2404', 'defender-110', 'X-Dynamic HSE', 'D250 MHEV, 4x4 automat', 'Diesel MHEV', 'Pangea Green', 69800, 2022, 52300),
  U('LRA-2405', 'discovery', 'R-Dynamic HSE', 'D300 MHEV, AWD automat', 'Diesel MHEV', 'Eiger Grey', 59900, 2022, 61400),
  U('LRA-2406', 'range-rover-evoque', 'R-Dynamic SE', 'P300e PHEV, AWD automat', 'Plug-in hybrid', 'Seoul Pearl Silver', 42500, 2023, 24100)
];
SP.ALL = SP.STOCK.concat(SP.USED);
SP.car = id => SP.ALL.find(v => v.id === id);

SP.OFFERS = [
  { id: 'defender-oferte', brand: 'defender', img: SP.img(122680, 'w/1600'), t: ['Ofertele actuale Defender', 'Current Defender offers'], d: ['Defender 110 și 90 din stoc, cu finanțare avantajoasă prin Importer Company Financial Services.', 'Defender 110 and 90 from stock with attractive financing.'], cta: ['Vedeți stocul Defender', 'See Defender stock'], href: 'stoc.html?brand=defender' },
  { id: 'rr-phev', brand: 'rr', img: SP.img(125385, 'w/1600'), t: ['Range Rover Sport PHEV', 'Range Rover Sport PHEV'], d: ['Autonomie electrică pentru drumurile zilnice. Test drive la Sales Partner Land Rover.', 'Electric range for everyday driving. Test drive at Sales Partner Land Rover.'], cta: ['Programați test drive', 'Book a test drive'], href: 'solicita.html?tip=test-drive&m=range-rover-sport' },
  { id: 'discovery-7', brand: 'discovery', img: SP.img(114033, 'w/1920'), t: ['Discovery, 7 locuri adevărate', 'Discovery, 7 real seats'], d: ['Ofertă personalizată pentru familie și aventură, cu trade-in.', 'A tailored offer for family and adventure, with trade-in.'], cta: ['Solicitați oferta', 'Request an offer'], href: 'solicita.html?tip=oferta&m=discovery' },
  { id: 'service', brand: 'all', img: SP.img(116821), t: ['Verificare de iarnă', 'Winter check'], d: ['Verificare gratuită în 30 de puncte și roți complete originale Land Rover.', 'Free 30-point check and genuine Land Rover complete wheels.'], cta: ['Solicitați o programare', 'Book an appointment'], href: 'service.html' }
];

SP.NEWS = [
  { id: 'rr-electric', date: '2026-10-20', img: SP.img(126865, 'w/1216'), t: ['Range Rover Electric: precomenzi deschise', 'Range Rover Electric: pre-orders open'], d: ['Primul Range Rover 100% electric poate fi rezervat la Sales Partner Land Rover.', 'The first fully electric Range Rover can be reserved at Sales Partner Land Rover.'] },
  { id: 'defender-octa', date: '2026-09-28', img: SP.img(122444), t: ['Defender OCTA în showroom', 'Defender OCTA in the showroom'], d: ['Cel mai capabil și luxos Defender, disponibil pentru prezentare la cerere.', 'The most capable and luxurious Defender, available for viewing on request.'] },
  { id: 'discovery-35', date: '2026-09-02', img: SP.img(109147), t: ['35 de ani de Discovery', '35 years of Discovery'], d: ['Istoria SUV-ului care a definit versatilitatea Land Rover.', 'The story of the SUV that defined Land Rover versatility.'] }
];

SP.TEAM = [
  ['Andrei Ionescu', ['Director vânzări', 'Sales director']], ['Ioana Marinescu', ['Consilier vânzări Range Rover', 'Range Rover sales advisor']], ['Radu Pop', ['Consilier vânzări Defender & Discovery', 'Defender & Discovery sales advisor']],
  ['Elena Dobre', ['Consilier Approved Used', 'Approved Used advisor']], ['Mihai Stan', ['Șef service', 'Head of service']], ['Cristina Vlad', ['Consilier service', 'Service advisor']]
];
