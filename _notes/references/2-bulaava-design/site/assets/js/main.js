(function () {
  'use strict';

  var EVENT = {
    title: 'Hamza & Ayesha',
    groomFirst: 'Hamza',
    groomFirstUr: 'حمزہ',
    brideFirst: 'Ayesha',
    brideFirstUr: 'عائشہ',
    groomFull: 'Hamza Khan',
    groomFullUr: 'حمزہ خان',
    brideFull: 'Ayesha Amin',
    brideFullUr: 'عائشہ امین',
    hosts: 'Mr and Mrs A. R. Khan',
    hostsUr: 'جناب و بیگم اے آر خان',
    groomParents: 'Mr and Mrs A. R. Khan',
    groomParentsUr: 'جناب و بیگم اے آر خان',
    brideParents: 'Mr and Mrs M. Amin',
    brideParentsUr: 'جناب و بیگم ایم امین',
    hostedBy: 'The Khan Family',
    familyName: 'The Khan Family',
    familyNameUr: 'خاندانِ خان',
    signature: 'Hamza & Ayesha',
    signatureUr: 'حمزہ و عائشہ',
    iso: '2026-12-03T18:00:00+05:00',
    time: '6:00 pm',
    venue: 'Emerald Hall 8',
    venueUr: 'ایمرلڈ ہال ۸',
    address: 'Emerald Banquet Hall, Garden Avenue, Lahore, Pakistan',
    addressUr: 'ایمرلڈ بینکوئٹ ہال، گارڈن ایونیو، لاہور، پاکستان',
    area: 'Garden Town, Lahore',
    areaUr: 'گارڈن ٹاؤن، لاہور',
    mapLink: 'https://maps.google.com/?q=Emerald+Banquet+Hall+Garden+Avenue+Lahore',
    hijriOffset: null,
    contacts: [
      { name: 'Imran Khan', nameUr: 'عمران خان', initialsUr: 'ع خ', relation: { en: "Groom's brother", ur: 'دولہا کے بھائی' }, phone: '+92 300 000 0000' },
      { name: 'Sara Ahmed', nameUr: 'سارہ احمد', initialsUr: 'س ا', relation: { en: "Bride's sister", ur: 'دلہن کی بہن' }, phone: '+92 300 000 0001' }
    ]
  };

  var TEXT = {
    en: {
      invitedBy: 'You are invited by',
      scroll: 'Scroll',
      byGrace: 'By the grace of Allah',
      amp: '&',
      familiesEyebrow: 'With the love and blessings of their families',
      request: 'request the pleasure of your company at the Walima of their son',
      with: 'with',
      daughterOf: 'daughter of {parents}',
      saveTheDate: 'Save the date',
      functionName: 'Walima',
      theEvening: 'The evening',
      scheduleTitle: 'How the evening unfolds',
      theVenue: 'The venue',
      openInMaps: 'Open in Google Maps',
      addToCalendar: 'Add to calendar',
      theCountdown: 'The countdown',
      countdownTitle: 'Until we celebrate together',
      countdownDone: 'Today is the day',
      unitDays: 'Days',
      unitHours: 'Hours',
      unitMinutes: 'Minutes',
      unitSeconds: 'Seconds',
      goodToKnow: 'Good to know',
      notesTitle: 'A few gentle notes',
      notesIntro: 'So the evening is lovely for everyone.',
      getInTouch: 'Get in touch',
      questionsTitle: 'Any questions?',
      questionsIntro: 'Call whoever is easiest. Both are happy to help.',
      thankYou: 'Thank you',
      thanksBody: 'For celebrating with us, for your time and your prayers. Your presence is the greatest gift.',
      duaMeaning: 'May Allah bless you both, bless your marriage, and unite you in goodness.',
      withLove: 'With love',
      verseRef: 'Surah Ar-Rum · 30:21',
      skip: 'Skip',
      doorPrompt: 'Knock three times',
      at: 'at',
      call: 'Call',
      whatsapp: 'WhatsApp',
      language: 'Read in Urdu',
      textSize: function (s) { return 'Text size: ' + s + '. Change'; },
      sizes: { sm: 'small', md: 'medium', lg: 'large' },
      weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      monthsLong: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      hijriMonths: ['Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani', 'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Shaban', 'Ramadan', 'Shawwal', 'Dhul Qadah', 'Dhul Hijjah'],
      hijriEra: 'AH',
      hijriEstimated: 'Estimated: the moon decides the day'
    },
    ur: {
      invitedBy: 'منجانب',
      scroll: 'نیچے دیکھیے',
      byGrace: 'اللہ تعالیٰ کے فضل و کرم سے',
      amp: 'اور',
      familiesEyebrow: 'اپنے اہلِ خانہ کی محبتوں اور دعاؤں کے ہمراہ',
      request: 'اپنے فرزندِ ارجمند کی تقریبِ ولیمہ میں آپ کی شرکت کے خواہشمند ہیں',
      with: 'اور',
      daughterOf: 'دخترِ نیک اختر {parents}',
      saveTheDate: 'تاریخ یاد رکھیے',
      functionName: 'ولیمہ',
      theEvening: 'شام کا پروگرام',
      scheduleTitle: 'پروگرام کی تفصیل',
      theVenue: 'مقامِ تقریب',
      openInMaps: 'گوگل میپس میں کھولیں',
      addToCalendar: 'کیلنڈر میں شامل کریں',
      theCountdown: 'الٹی گنتی',
      countdownTitle: 'خوشیوں کی گھڑی میں باقی وقت',
      countdownDone: 'آج ہماری خوشیوں کا دن ہے',
      unitDays: 'دن',
      unitHours: 'گھنٹے',
      unitMinutes: 'منٹ',
      unitSeconds: 'سیکنڈ',
      goodToKnow: 'ضروری باتیں',
      notesTitle: 'چند گزارشات',
      notesIntro: 'تاکہ یہ شام سب کے لیے یادگار اور خوشگوار رہے۔',
      getInTouch: 'رابطہ',
      questionsTitle: 'کوئی بات پوچھنی ہو؟',
      questionsIntro: 'جس سے آپ کو آسانی ہو، اسی سے رابطہ کر لیجیے۔ دونوں آپ کی خدمت میں حاضر ہیں۔',
      thankYou: 'شکریہ',
      thanksBody: 'ہماری خوشیوں میں شریک ہونے اور اپنا قیمتی وقت اور دعائیں دینے کا بے حد شکریہ۔ آپ کی موجودگی ہمارے لیے سب سے بڑا تحفہ ہے۔',
      duaMeaning: 'اللہ تعالیٰ آپ دونوں کو برکت عطا فرمائے، آپ پر برکتیں نازل فرمائے اور آپ دونوں کو خیر کے ساتھ یکجا رکھے۔',
      withLove: 'محبتوں کے ساتھ',
      verseRef: 'سورۃ الروم · ۳۰:۲۱',
      skip: 'آگے بڑھیں',
      doorPrompt: 'تین بار دستک دیجیے',
      at: '',
      call: 'کال کریں',
      whatsapp: 'واٹس ایپ',
      language: 'Read in English',
      textSize: function (s) { return 'Text size: ' + s + '. Change'; },
      sizes: { sm: 'small', md: 'medium', lg: 'large' },
      weekdays: ['اتوار', 'پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'],
      monthsLong: ['جنوری', 'فروری', 'مارچ', 'اپریل', 'مئی', 'جون', 'جولائی', 'اگست', 'ستمبر', 'اکتوبر', 'نومبر', 'دسمبر'],
      hijriMonths: ['محرم', 'صفر', 'ربیع الاول', 'ربیع الثانی', 'جمادی الاول', 'جمادی الثانی', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذوالقعدہ', 'ذوالحجہ'],
      hijriEra: 'ھ',
      hijriEstimated: 'اندازاً: دن کا تعین چاند سے ہوتا ہے'
    }
  };

  var SCHEDULE = {
    en: [
      { time: '6:00 pm', label: 'Gates open' },
      { time: '6:30 pm', label: "Bride's side welcome" },
      { time: '7:00 pm', label: "The couple's entrance" },
      { time: '8:00 pm', label: 'Dinner is served' },
      { time: '10:00 pm', label: 'Evening closes' }
    ],
    ur: [
      { time: '6:00 pm', label: 'دروازے کھلیں گے' },
      { time: '6:30 pm', label: 'دلہن کے خاندان کا استقبال' },
      { time: '7:00 pm', label: 'نو دولہا کی آمد' },
      { time: '8:00 pm', label: 'عشائیہ پیش کیا جائے گا' },
      { time: '10:00 pm', label: 'محفل اختتام پذیر ہوگی' }
    ]
  };

  var NOTES = {
    en: [
      {
        icon: 'clock',
        title: 'Kindly be on time',
        text: 'The evening follows a schedule, and dinner is served promptly at 8:00 pm. Arriving a little early lets us welcome you properly.'
      },
      {
        icon: 'camera',
        title: 'Photos and videos',
        text: 'Our photographers will capture every moment for everyone. Please ask them for your own pictures, and kindly refrain from photographing or filming the bride and groom.'
      },
      {
        icon: 'bell',
        title: 'Phones on silent',
        text: "During the couple's entrance and the dua, a silent phone helps us all share the moment."
      }
    ],
    ur: [
      {
        icon: 'clock',
        title: 'براہِ کرم وقت پر تشریف لائیں',
        text: 'شام کا ایک مقررہ پروگرام ہے اور عشائیہ 8:00 بجے رات کو پیش کیا جائے گا۔ ذرا پہلے پہنچنے سے ہم آپ کا خیرمقدم بہتر انداز میں کر سکیں گے۔'
      },
      {
        icon: 'camera',
        title: 'تصاویر اور ویڈیوز',
        text: 'ہمارے فوٹوگرافر ہر لمحہ سب کے لیے محفوظ کریں گے۔ اپنی تصاویر کے لیے ان سے درخواست کریں اور دلہن و دولہا کی تصویر یا ویڈیو بنانے سے گریز کریں۔'
      },
      {
        icon: 'bell',
        title: 'موبائل خاموش رکھیں',
        text: 'نو دولہا کی آمد اور دعا کے دوران موبائل خاموش رکھنے سے ہم سب اس لمحے کو خوبصورتی سے بانٹ سکیں گے۔'
      }
    ]
  };

  var ICONS = {
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path><path d="M12 12l3 2"></path><path d="M12 7v5"></path></svg>',
    camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M8.297 4.289a.997 .997 0 0 1 .703 -.289h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v8m-1.187 2.828c-.249 .11 -.524 .172 -.813 .172h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h1c.298 0 .58 -.065 .834 -.181"></path><path d="M10.422 10.448a3 3 0 1 0 4.15 4.098"></path><path d="M3 3l18 18"></path></svg>',
    bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9.346 5.353c.21 -.129 .428 -.246 .654 -.353a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3m-1 3h-13a4 4 0 0 0 2 -3v-3a6.996 6.996 0 0 1 1.273 -3.707"></path><path d="M9 17v1a3 3 0 0 0 6 0v-1"></path><path d="M3 3l18 18"></path></svg>'
  };

  var ICON_PHONE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path></svg>';
  var ICON_WA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9"></path><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1"></path></svg>';

  var root = document.documentElement;
  var body = document.body;
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var isEmbed = root.classList.contains('es-embed');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var lang = 'en';
  var sizeIndex = 1;
  var SIZES = [
    { key: 'sm', value: 0.92 },
    { key: 'md', value: 1 },
    { key: 'lg', value: 1.1 }
  ];

  var shell = $('#esShell');
  var gate = $('#esGate');
  var skipBtn = $('#skipBtn');
  var langBtn = $('#langBtn');
  var sizeBtn = $('#sizeBtn');
  var aaLabel = $('.es__pill-aa', sizeBtn);
  var knockZone = $('#knockZone');
  var promptText = $('#doorPromptText');
  var dots = $$('#doorDots span');
  var doorLeft = $('#doorLeft');
  var doorRight = $('#doorRight');
  var ringLeft = $('#ringLeft');
  var ringRight = $('#ringRight');
  var plateLeft = $('#plateLeft');
  var plateRight = $('#plateRight');
  var loader = $('#esLoader');
  var loaderBar = $('#esLoaderBar');
  var hijriLine = $('#hijriLine');
  var calendarLink = $('#calendarLink');

  var DT = (function () {
    var m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(EVENT.iso);
    if (!m) return { year: 2026, month: 12, day: 3, hour: 18, minute: 0 };
    return {
      year: Number(m[1]),
      month: Number(m[2]),
      day: Number(m[3]),
      hour: Number(m[4]),
      minute: Number(m[5])
    };
  })();

  var WEEKDAY_INDEX = new Date(Date.UTC(DT.year, DT.month - 1, DT.day, 12)).getUTCDay();

  function pad2(n) {
    return String(n).padStart(2, '0');
  }

  function hijriDate() {
    var offset = EVENT.hijriOffset;
    if (offset === null || typeof offset === 'undefined') {
      try {
        offset = Intl.DateTimeFormat().resolvedOptions().timeZone === 'Asia/Karachi' ? -1 : 0;
      } catch (err) {
        offset = 0;
      }
    }
    try {
      var fmt = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        timeZone: 'UTC'
      });
      var parts = fmt.formatToParts(new Date(Date.UTC(DT.year, DT.month - 1, DT.day + offset, 12)));
      function val(type) {
        var part = parts.filter(function (p) { return p.type === type; })[0];
        return part ? Number(part.value) : 0;
      }
      var year = val('relatedYear') || val('year');
      var month = val('month');
      var day = val('day');
      if (!year || !month || !day) return null;
      return { year: year, month: month, day: day };
    } catch (err) {
      return null;
    }
  }

  function dateShort(l) {
    return DT.day + ' ' + TEXT[l].monthsLong[DT.month - 1];
  }

  function renderDate(l) {
    var monthEl = $('#dateMonth');
    var weekdayEl = $('#dateWeekday');
    var dayEl = $('#dateDay');
    var timeEl = $('#dateTime');
    var yearEl = $('#dateYear');
    if (monthEl) monthEl.textContent = TEXT[l].monthsLong[DT.month - 1];
    if (weekdayEl) weekdayEl.textContent = TEXT[l].weekdays[WEEKDAY_INDEX];
    if (dayEl) dayEl.textContent = DT.day;
    if (timeEl) timeEl.textContent = [TEXT[l].at, EVENT.time].filter(Boolean).join(' ');
    if (yearEl) yearEl.textContent = DT.year;

    $$('[data-field="dateShort"]').forEach(function (el) {
      el.textContent = dateShort(l);
    });

    if (hijriLine) {
      var h = hijriDate();
      hijriLine.textContent = '';
      if (h) {
        var approx = document.createElement('span');
        approx.className = 'es__hijri-approx';
        approx.title = TEXT[l].hijriEstimated;
        approx.setAttribute('aria-label', TEXT[l].hijriEstimated);
        approx.textContent = '≈';
        hijriLine.appendChild(approx);
        hijriLine.appendChild(document.createTextNode(' ' + h.day + ' ' + TEXT[l].hijriMonths[h.month - 1] + ' ' + h.year + ' ' + TEXT[l].hijriEra));
      }
    }
  }

  function renderSchedule(l) {
    var list = $('#scheduleList');
    if (!list) return;
    list.innerHTML = SCHEDULE[l].map(function (item, i) {
      var sep = i > 0 ? '<li class="es__schedule-sep" aria-hidden="true"><i></i></li>' : '';
      return sep + '<li class="es__schedule-item es__reveal" style="--es-d:' + ((3 + i) * 0.07).toFixed(2) + '">' +
        '<p class="es__schedule-time">' + item.time + '</p>' +
        '<p class="es__schedule-label">' + item.label + '</p></li>';
    }).join('');
    observeReveals(list);
  }

  function renderNotes(l) {
    var list = $('#notesList');
    if (!list) return;
    list.innerHTML = NOTES[l].map(function (item, i) {
      var sep = i > 0 ? '<li class="es__notes-sep" aria-hidden="true"></li>' : '';
      return sep + '<li class="es__notes-item es__reveal" style="--es-d:' + ((4 + i) * 0.07).toFixed(2) + '">' +
        '<span class="es__notes-icon">' + (ICONS[item.icon] || ICONS.clock) + '</span>' +
        '<h3 class="es__notes-heading">' + item.title + '</h3>' +
        '<p class="es__notes-body">' + item.text + '</p></li>';
    }).join('');
    observeReveals(list);
  }

  function renderContacts(l) {
    var grid = $('#contactsGrid');
    if (!grid) return;
    grid.innerHTML = EVENT.contacts.map(function (c, i) {
      var displayName = l === 'ur' && c.nameUr ? c.nameUr : c.name;
      var initials = l === 'ur' && c.initialsUr ? c.initialsUr : c.name.trim().split(/\s+/).slice(0, 2).map(function (w) { return w.charAt(0); }).join('');
      var digits = c.phone.replace(/\D/g, '');
      var tel = 'tel:' + (c.phone.trim().indexOf('+') === 0 ? '+' : '') + digits;
      var wa = 'https://wa.me/' + digits;
      return '<div class="es__contact es__reveal" style="--es-d:' + ((4 + i) * 0.07).toFixed(2) + '">' +
        '<span class="es__contact-avatar">' + initials + '</span>' +
        '<p class="es__contact-name">' + displayName + '</p>' +
        '<p class="es__contact-relation">' + c.relation[l] + '</p>' +
        '<p class="es__contact-phone" dir="ltr">' + c.phone + '</p>' +
        '<div class="es__contact-actions">' +
        '<a class="es__contact-action es__contact-action--solid" href="' + tel + '" aria-label="' + TEXT[l].call + ': ' + displayName + '">' + ICON_PHONE + '</a>' +
        '<a class="es__contact-action" href="' + wa + '" target="_blank" rel="noopener noreferrer" aria-label="' + TEXT[l].whatsapp + ': ' + displayName + '">' + ICON_WA + '</a>' +
        '</div></div>';
    }).join('');
    observeReveals(grid);
  }

  function applyLang(l) {
    lang = l;
    var isUr = l === 'ur';
    body.classList.toggle('es--ur', isUr);
    root.lang = l;
    root.dir = isUr ? 'rtl' : 'ltr';

    $$('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var value = TEXT[l][key];
      if (typeof value !== 'string') return;
      if (key === 'daughterOf') value = value.replace('{parents}', l === 'ur' ? EVENT.brideParentsUr : EVENT.brideParents);
      el.textContent = value;
    });

    function localized(key) {
      if (l === 'ur' && EVENT[key + 'Ur']) return EVENT[key + 'Ur'];
      if (key === 'functionName') return TEXT[l].functionName;
      return EVENT[key];
    }
    var fieldKeys = ['hosts', 'groomParents', 'groomFull', 'brideFull', 'groomFirst', 'brideFirst', 'venue', 'address', 'area', 'signature', 'familyName', 'functionName'];
    $$('[data-field]').forEach(function (el) {
      var key = el.getAttribute('data-field');
      if (key === 'dateShort') {
        el.textContent = dateShort(l);
      } else if (fieldKeys.indexOf(key) !== -1) {
        el.textContent = localized(key);
      }
    });

    renderDate(l);
    renderSchedule(l);
    renderNotes(l);
    renderContacts(l);
    updateControls();
    updateDoorPrompt();
    buildCalendar();
    reportBar();
  }

  function updateControls() {
    if (skipBtn) skipBtn.textContent = TEXT[lang].skip;
    if (langBtn) {
      langBtn.innerHTML = lang === 'ur' ? '<span>English</span>' : '<span class="es__pill-urdu" lang="ur">اردو</span>';
      langBtn.setAttribute('aria-label', TEXT[lang].language);
      langBtn.title = TEXT[lang].language;
    }
    if (sizeBtn) {
      var label = TEXT[lang].textSize(TEXT[lang].sizes[SIZES[sizeIndex].key]);
      sizeBtn.setAttribute('aria-label', label);
      sizeBtn.title = label;
    }
    if (aaLabel) aaLabel.className = 'es__pill-aa is-' + SIZES[sizeIndex].key;
  }

  function setSize(index) {
    sizeIndex = index;
    if (shell) shell.style.setProperty('--ts-user', SIZES[sizeIndex].value);
    updateControls();
  }

  function syncControls() {
    if (!gate) return;
    var doors = !gate.classList.contains('is-open') && !gate.classList.contains('is-gone');
    if (skipBtn) skipBtn.classList.toggle('es__pill--hidden', !doors);
    if (sizeBtn) sizeBtn.classList.toggle('es__pill--hidden', doors);
  }

  var knocks = 0;
  var opened = false;
  var opening = false;
  var shakeAnims = [];

  function updateDoorPrompt() {
    if (promptText) promptText.textContent = TEXT[lang].doorPrompt;
    dots.forEach(function (dot, i) {
      dot.classList.toggle('is-on', i < knocks);
    });
    if (knockZone) {
      var label = lang === 'ur'
        ? 'دروازے پر دستک، ' + 3 + ' میں سے ' + Math.min(knocks, 3)
        : 'Knock on the door, ' + Math.min(knocks, 3) + ' of 3';
      knockZone.setAttribute('aria-label', label);
    }
  }

  var audioCtx = null;

  function getAudio() {
    try {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      if (!audioCtx) audioCtx = new Ctx();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      return audioCtx;
    } catch (err) {
      return null;
    }
  }

  function tone(ctx, type, from, to, dur, vol, at) {
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(from, at);
    osc.frequency.exponentialRampToValueAtTime(to, at + dur * 0.6);
    gain.gain.setValueAtTime(vol, at);
    gain.gain.exponentialRampToValueAtTime(0.001, at + dur);
    osc.connect(gain).connect(ctx.destination);
    osc.start(at);
    osc.stop(at + dur + 0.02);
  }

  function playKnock() {
    var ctx = getAudio();
    if (!ctx) return;
    var now = ctx.currentTime;
    tone(ctx, 'sine', 170, 52, 0.26, 0.95, now);
    tone(ctx, 'triangle', 310, 120, 0.12, 0.35, now);
    try {
      var len = Math.floor(0.05 * ctx.sampleRate);
      var buffer = ctx.createBuffer(1, len, ctx.sampleRate);
      var data = buffer.getChannelData(0);
      for (var i = 0; i < len; i++) {
        data[i] = (2 * Math.random() - 1) * (1 - i / len);
      }
      var noise = ctx.createBufferSource();
      var filter = ctx.createBiquadFilter();
      var gain = ctx.createGain();
      noise.buffer = buffer;
      filter.type = 'bandpass';
      filter.frequency.value = 1100;
      filter.Q.value = 0.8;
      gain.gain.value = 0.55;
      noise.connect(filter).connect(gain).connect(ctx.destination);
      noise.start(now);
    } catch (err) { /* audio is optional */ }
    tone(ctx, 'sine', 2600, 2500, 0.2, 0.07, now + 0.012);
    tone(ctx, 'sine', 3900, 3800, 0.14, 0.04, now + 0.012);
  }

  function knockRing(el, dir) {
    if (!el || reduced.matches) return;
    el.animate([
      { transform: 'rotate(0deg)' },
      { transform: 'rotate(' + (17 * dir) + 'deg)' },
      { transform: 'rotate(' + (-11 * dir) + 'deg)' },
      { transform: 'rotate(6deg)' },
      { transform: 'rotate(-3deg)' },
      { transform: 'rotate(0deg)' }
    ], { duration: 1000, easing: 'ease-out' });
  }

  function shakeDoor(el, dir) {
    if (!el || reduced.matches) return null;
    var anim = el.animate([
      { transform: 'rotateY(0deg)' },
      { transform: 'rotateY(' + (-6.2 * dir) + 'deg)' },
      { transform: 'rotateY(' + (2.6 * dir) + 'deg)' },
      { transform: 'rotateY(' + (-1 * dir) + 'deg)' },
      { transform: 'rotateY(0deg)' }
    ], { duration: 520, easing: 'cubic-bezier(.2,.8,.3,1)' });
    shakeAnims.push(anim);
    return anim;
  }

  function spawnDust(x, y) {
    if (!knockZone) return;
    var dust = document.createElement('span');
    dust.className = 'es__knock-dust';
    dust.style.left = x + 'px';
    dust.style.top = y + 'px';
    knockZone.appendChild(dust);
    setTimeout(function () { dust.remove(); }, 2000);
  }

  function spawnFlash() {
    var stage = $('.es__door-stage');
    if (!stage) return;
    var flash = document.createElement('span');
    flash.className = 'es__door-flash';
    stage.appendChild(flash);
    setTimeout(function () { flash.remove(); }, 600);
  }

  function onKnock(ev) {
    if (opened || knocks >= 3) return;
    playKnock();
    var rect = knockZone.getBoundingClientRect();
    var x = ev.clientX ? ev.clientX - rect.left : rect.width / 2;
    var y = ev.clientY ? ev.clientY - rect.top : rect.height / 2;
    spawnDust(x, y);
    spawnFlash();
    knockRing(ringLeft, 1);
    knockRing(ringRight, -1);
    shakeDoor(doorLeft, 1);
    shakeDoor(doorRight, -1);
    knocks += 1;
    updateDoorPrompt();
    if (knocks >= 3) {
      opening = true;
      setTimeout(openGate, reduced.matches ? 0 : 300);
    }
  }

  function openGate() {
    if (opened || !gate) return;
    opened = true;
    opening = true;
    shakeAnims.forEach(function (a) { try { a.cancel(); } catch (err) { /* noop */ } });
    shakeAnims = [];
    gate.classList.add('is-open');
    body.classList.add('es--entered');
    root.classList.add('es--entered');
    syncControls();
    if (promptText) promptText.style.opacity = '0';
    var wait = reduced.matches ? 300 : 2000;
    setTimeout(function () {
      gate.classList.add('is-gone');
      body.classList.remove('es--locked');
      if (!reduced.matches) window.scrollTo(0, 0);
    }, wait);
    setTimeout(reportBar, 80);
  }

  function skipGate() {
    if (opened || !gate) return;
    knocks = 3;
    updateDoorPrompt();
    openGate();
  }

  function setupDoorSizing() {
    function sizePlate(half, plate, side) {
      if (!half || !plate) return;
      var rect = half.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      var n = Math.max(rect.width / 434, rect.height / 1800);
      var w = 506 * n;
      var h = 1800 * n;
      plate.style.width = w + 'px';
      plate.style.height = h + 'px';
      plate.style.left = (side === 'left' ? rect.width - w : 0) + 'px';
      plate.style.top = ((rect.height - h) / 2) + 'px';
    }
    function update() {
      sizePlate(doorLeft, plateLeft, 'left');
      sizePlate(doorRight, plateRight, 'right');
    }
    update();
    if (typeof ResizeObserver !== 'undefined') {
      var ro = new ResizeObserver(update);
      ro.observe(doorLeft);
      ro.observe(doorRight);
    } else {
      window.addEventListener('resize', update);
    }
  }

  var revealObserver = null;
  function observeReveals(ctx) {
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          revealObserver.unobserve(entry.target);
        });
      }, { root: null, rootMargin: '0px 0px -20% 0px', threshold: 0 });
    }
    $$('.es__reveal:not(.is-in)', ctx || document).forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  var phoneIframe = null;
  var phone = $('#esPhone');
  var phoneScreen = $('#esPhoneScreen');
  var statusbar = $('#esStatusbar');

  function ensurePhone() {
    if (phoneIframe || !phoneScreen) return;
    var url = new URL(window.location.href);
    url.searchParams.set('embed', '1');
    url.hash = '';
    phoneIframe = document.createElement('iframe');
    phoneIframe.src = url.toString();
    phoneIframe.title = 'Invitation';
    phoneIframe.setAttribute('allow', 'autoplay');
    phoneScreen.insertBefore(phoneIframe, phoneScreen.firstChild);
  }

  function scalePhone() {
    if (!phone) return;
    var s = Math.min(1, (window.innerHeight - 40) / 870, (window.innerWidth - 40) / 416);
    phone.style.transform = 'scale(' + s + ')';
  }

  function syncDesktop() {
    if (isEmbed) return;
    var desktop = window.matchMedia('(min-width: 1024px)').matches;
    root.classList.toggle('es-desktop', desktop);
    if (desktop) {
      ensurePhone();
      scalePhone();
      body.classList.remove('es--locked');
    } else if (!gate || (!gate.classList.contains('is-open') && !gate.classList.contains('is-gone'))) {
      body.classList.add('es--locked');
    }
  }

  var barState = null;
  function reportBar() {
    if (!isEmbed || window.parent === window) return;
    var y = 30;
    var lightIds = ['bismillah', 'scene', 'families', 'savedate', 'venue', 'schedule', 'countdown'];
    var light = false;
    for (var i = 0; i < lightIds.length; i++) {
      var el = document.getElementById(lightIds[i]);
      if (!el) continue;
      var r = el.getBoundingClientRect();
      if (r.top <= y && r.bottom >= y) { light = true; break; }
    }
    if (barState === light) return;
    barState = light;
    try {
      window.parent.postMessage({ type: 'bulaava-bar', light: light }, '*');
    } catch (err) { /* noop */ }
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      ticking = false;
      updateParallax();
      reportBar();
    });
  }

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  function sectionProgress(rect, mode) {
    var vh = window.innerHeight;
    if (mode === 'footer') {
      return clamp((vh - rect.top) / Math.max(rect.height, 1), 0, 1);
    }
    return clamp((vh - rect.top) / Math.max(vh + rect.height, 1), 0, 1);
  }

  function updateParallax() {
    if (reduced.matches) return;
    var vh = window.innerHeight;
    var hero = $('#esHero');
    var heroPhoto = $('#heroPhoto');
    var heroMiddle = $('#heroMiddle');
    if (hero && heroPhoto && heroMiddle) {
      var rect = hero.getBoundingClientRect();
      var p = clamp(-rect.top / Math.max(rect.height, 1), 0, 1);
      heroPhoto.style.transform = 'translate3d(0,' + (14 * p).toFixed(2) + '%,0)';
      heroMiddle.style.transform = 'translate3d(0,' + (-70 * Math.min(p / 0.8, 1)).toFixed(2) + 'px,0)';
      heroMiddle.style.opacity = String(1 - 0.85 * Math.min(p / 0.65, 1));
    }

    var scene = $('#scene');
    var sceneInner = $('#sceneInner');
    if (scene && sceneInner) {
      var sp = sectionProgress(scene.getBoundingClientRect());
      var sy = -5 + 10 * sp;
      sceneInner.style.transform = 'translate3d(0,' + sy.toFixed(2) + '%,0) scale(1.1)';
    }

    var medallion = $('#medallion');
    if (medallion) {
      var mp = sectionProgress(medallion.getBoundingClientRect());
      medallion.style.transform = 'rotate(' + (-18 + 36 * mp).toFixed(2) + 'deg)';
    }

    var venue = $('#venue');
    var venueMedia = $('#venueMedia');
    if (venue && venueMedia) {
      var vp = sectionProgress(venue.getBoundingClientRect());
      venueMedia.style.transform = 'translate3d(0,' + (22 - 44 * vp).toFixed(2) + 'px,0)';
    }

    var footer = $('#footer');
    var footerPhoto = $('.es__footer-photo-inner');
    if (footer && footerPhoto) {
      var fp = sectionProgress(footer.getBoundingClientRect(), 'footer');
      footerPhoto.style.transform = 'translate3d(0,' + (-7 + 11 * fp).toFixed(2) + '%,0)';
    }
  }

  var countdownUnitEls = {};
  var countdownDone = false;
  function setupCountdown() {
    $$('.es__countdown-unit').forEach(function (unit) {
      countdownUnitEls[unit.getAttribute('data-unit')] = {
        value: $('[data-value]', unit),
        ring: $('[data-ring]', unit)
      };
    });
    var target = new Date(DT.year, DT.month - 1, DT.day, DT.hour, DT.minute).getTime();
    function tick() {
      if (countdownDone) return;
      var diff = target - Date.now();
      var grid = $('#countdownGrid');
      if (diff <= 0) {
        countdownDone = true;
        if (grid) {
          grid.innerHTML = '<p class="es__countdown-done">' + TEXT[lang].countdownDone + '</p>';
        }
        return;
      }
      var days = Math.floor(diff / 86400000);
      var hours = Math.floor(diff / 3600000) % 24;
      var minutes = Math.floor(diff / 60000) % 60;
      var seconds = Math.floor(diff / 1000) % 60;
      var values = [days, hours, minutes, seconds];
      var fills = [1, hours / 24, minutes / 60, seconds / 60];
      ['days', 'hours', 'minutes', 'seconds'].forEach(function (key, i) {
        var unit = countdownUnitEls[key];
        if (!unit) return;
        if (unit.value) unit.value.textContent = pad2(values[i]);
        if (unit.ring) {
          unit.ring.style.strokeDashoffset = (276.46 * (1 - fills[i])).toFixed(2);
        }
      });
    }
    tick();
    window.setInterval(tick, 1000);
  }

  function calendarStamp() {
    var d = new Date(Date.UTC(DT.year, DT.month - 1, DT.day, DT.hour, DT.minute) - 18e6);
    return d.getUTCFullYear() + pad2(d.getUTCMonth() + 1) + pad2(d.getUTCDate()) + 'T' + pad2(d.getUTCHours()) + pad2(d.getUTCMinutes()) + '00Z';
  }

  function esc(v) {
    return String(v).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
  }

  function buildCalendar() {
    if (!calendarLink) return;
    var start = calendarStamp();
    var endDate = new Date(Date.UTC(DT.year, DT.month - 1, DT.day, DT.hour, DT.minute) - 18e6 + 180 * 60000);
    var end = endDate.getUTCFullYear() + pad2(endDate.getUTCMonth() + 1) + pad2(endDate.getUTCDate()) + 'T' + pad2(endDate.getUTCHours()) + pad2(endDate.getUTCMinutes()) + '00Z';
    var now = new Date();
    var stamp = now.getUTCFullYear() + pad2(now.getUTCMonth() + 1) + pad2(now.getUTCDate()) + 'T' + pad2(now.getUTCHours()) + pad2(now.getUTCMinutes()) + pad2(now.getUTCSeconds()) + 'Z';
    var schedule = SCHEDULE.en.map(function (s) { return s.time + '  ' + s.label; });
    var description = [
      TEXT.en.functionName + ' of ' + EVENT.title,
      'Hosted by ' + EVENT.hostedBy,
      '',
      'Programme:'
    ].concat(schedule, ['', 'Venue: ' + EVENT.venue + ', ' + EVENT.address]);
    var lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Bulaava//Invite//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:' + start + '-' + EVENT.title.replace(/\W+/g, '').toLowerCase() + '@bulaava.pk',
      'DTSTAMP:' + stamp,
      'DTSTART:' + start,
      'DTEND:' + end,
      'SUMMARY:' + esc(EVENT.functionName + ' · ' + EVENT.title),
      'LOCATION:' + esc(EVENT.venue + ', ' + EVENT.address),
      'DESCRIPTION:' + esc(description.join('\n')),
      'URL:' + EVENT.mapLink,
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'ACTION:DISPLAY',
      'DESCRIPTION:' + esc(EVENT.functionName + ' of ' + EVENT.title + ' is in two days'),
      'TRIGGER:-P2D',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ];
    var ics = lines.join('\r\n') + '\r\n';
    calendarLink.href = 'data:text/calendar;charset=utf-8,' + encodeURIComponent(ics);
    calendarLink.setAttribute('download', 'walima-invitation.ics');
  }

  function finishLoader() {
    if (!loader || loader.classList.contains('is-out')) return;
    if (loaderBar) {
      loaderBar.style.transform = 'scaleX(1)';
    }
    window.setTimeout(function () {
      loader.classList.add('is-out');
      window.setTimeout(function () {
        loader.hidden = true;
        if (!isEmbed && root.classList.contains('es-desktop')) {
          body.classList.remove('es--locked');
        }
      }, 700);
    }, 180);
  }

  function startLoader() {
    var progress = 0.06;
    if (loaderBar) loaderBar.style.transform = 'scaleX(' + progress + ')';
    var interval = window.setInterval(function () {
      progress = Math.min(0.9, progress + (0.9 - progress) * 0.06);
      if (loaderBar) loaderBar.style.transform = 'scaleX(' + progress + ')';
    }, 120);

    var images = $$('img').filter(function (img) {
      return !img.loading || img.loading === 'eager';
    });
    var imageReady = Promise.all(images.map(function (img) {
      if (img.complete) return Promise.resolve();
      return new Promise(function (resolve) {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
      });
    })).catch(function () {});

    var fonts = document.fonts && document.fonts.ready ? document.fonts.ready.catch(function () {}) : Promise.resolve();
    var minDelay = new Promise(function (resolve) { window.setTimeout(resolve, 1500); });

    Promise.all([minDelay, imageReady, fonts]).then(function () {
      window.clearInterval(interval);
      finishLoader();
    });

    window.setTimeout(function () {
      window.clearInterval(interval);
      finishLoader();
    }, 12000);
  }

  function bindEvents() {
    if (knockZone) knockZone.addEventListener('click', onKnock);
    if (skipBtn) skipBtn.addEventListener('click', skipGate);
    if (langBtn) {
      langBtn.addEventListener('click', function () {
        applyLang(lang === 'ur' ? 'en' : 'ur');
      });
    }
    if (sizeBtn) {
      sizeBtn.addEventListener('click', function () {
        setSize((sizeIndex + 1) % SIZES.length);
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () {
      updateParallax();
      scalePhone();
      syncDesktop();
      reportBar();
    });
    window.addEventListener('message', function (event) {
      if (!phoneIframe || event.source !== phoneIframe.contentWindow) return;
      if (event.data && event.data.type === 'bulaava-bar') {
        if (statusbar) statusbar.classList.toggle('is-light', Boolean(event.data.light));
      }
    });
    if (reduced.addEventListener) {
      reduced.addEventListener('change', function () {
        root.classList.toggle('es-reduced', reduced.matches);
        updateParallax();
      });
    }
  }

  function init() {
    root.classList.toggle('es-reduced', reduced.matches);
    try { history.scrollRestoration = 'manual'; } catch (err) { /* noop */ }
    if (!isEmbed) window.scrollTo(0, 0);

    applyLang('en');
    setSize(sizeIndex);
    setupDoorSizing();
    setupCountdown();
    syncControls();
    observeReveals(document);
    updateParallax();
    startLoader();
    syncDesktop();
    bindEvents();

    if (!isEmbed && !root.classList.contains('es-desktop')) {
      body.classList.add('es--locked');
    }

    updateDoorPrompt();
    reportBar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
