/*
  ============================================================
  SAMPLE INVITATION - HariKrishna AI Studios (all names, dates and places are made up)
  Edit only this file. Keep the quotes "..." and commas exactly as they are.
  ============================================================
*/
window.INVITE = {
  pageTitle: "Aarav & Meera - Wedding Invitation (Sample)",

  shlokas: ["॥ श्री गणेशाय नमः ॥"],

  bride: { first: "Meera", full: "Meera", parents: "D/O Kavita & Rajeshbhai Shah" },
  groom: { first: "Aarav", full: "Aarav", parents: "S/O Neha & Vikrambhai Mehta (USA)" },

  inviteText: [
    "With joy in our hearts & blessings from our elders",
    "we invite you to celebrate",
    "the beautiful union of two souls"
  ],

  dateRange: "12 – 14 Feb 2027",
  cityLine: "Ahmedabad",

  // Countdown + scratch reveal point to this moment (India time)
  mainMoment: "2027-02-14T19:30:00+05:30",
  dateReveal: { day: "14", month: "FEB", year: "2027", line: "Hast Melap · 07:30 PM" },

  /* Events. id must stay one of: mehendi, survani, mandva, lagna (it picks the prop,
     the colours and the little ritual). start/end are used for "Add to calendar". */
  events: [
    {
      id: "mehendi", gu: "મહેંદી", name: "Mehendi",
      day: "12th", month: "FEB", year: "2027", weekday: "Friday",
      lines: ["04:00 PM Onwards"],
      venue: "Kesar Baug Lawns",
      address: "S.G. Highway, Ahmedabad",
      attire: "Shades of green",
      map: "https://maps.google.com/?q=Ahmedabad",
      start: "2027-02-12T16:00:00+05:30", end: "2027-02-12T20:00:00+05:30"
    },
    {
      id: "survani", gu: "સંગીત સંધ્યા", name: "Sangeet Sandhya",
      day: "13th", month: "FEB", year: "2027", weekday: "Saturday",
      lines: ["07:00 PM - Dandiya & Garba", "Followed By Dinner"],
      venue: "The Royal Courtyard",
      address: "Sindhu Bhavan Road, Ahmedabad",
      attire: "Chaniya Choli & Kediyu",
      map: "https://maps.google.com/?q=Ahmedabad",
      start: "2027-02-13T19:00:00+05:30", end: "2027-02-13T23:30:00+05:30"
    },
    {
      id: "mandva", gu: "પીઠી અને માંડવો", name: "Pithi & Mandap",
      day: "14th", month: "FEB", year: "2027", weekday: "Sunday",
      lines: ["09:00 AM Pithi", "11:00 AM Mandap Muhurat"],
      venue: "At Residence",
      address: "Shah Niwas, Satellite, Ahmedabad",
      attire: "Yellow & Traditional",
      map: "https://maps.google.com/?q=Ahmedabad",
      start: "2027-02-14T09:00:00+05:30", end: "2027-02-14T13:00:00+05:30"
    },
    {
      id: "lagna", gu: "લગ્ન", name: "Wedding",
      day: "14th", month: "FEB", year: "2027", weekday: "Sunday",
      lines: ["Jaan Aagman - 05:30 PM", "Hast Melap - 07:30 PM"],
      venue: "Rajmahal Palace Grounds",
      address: "Gandhinagar Highway, Ahmedabad",
      attire: "Traditional",
      map: "https://maps.google.com/?q=Ahmedabad",
      start: "2027-02-14T17:30:00+05:30", end: "2027-02-14T22:30:00+05:30"
    }
  ],

  family: [
    { title: "Invitees", names: ["Rajesh Shah", "Kavita Shah", "Dhruv Shah"] },
    { title: "With Blessings", names: ["Mahendrabhai Shah", "Sarlaben Shah"] },
    { title: "With Best Wishes", names: ["Shah & Mehta Parivar", "Friends & Well-wishers"] }
  ],
  familyGroup: "",
  showLogo: false,
  blessingsNote: "Your presence is our blessing",

  photosTitle: "Our Moments",
  photos: ["p1", "p2", "p3", "p4", "p5"],   // files in assets/photos (.webp)

  // RSVP on WhatsApp. Leave whatsapp empty "" to hide the RSVP section.
  rsvp: { whatsapp: "919408877393", by: "31 Jan 2027" },

  music: "music-instrumental.mp3",
  musicOptions: { instrumental: "music-instrumental.mp3" },

  defaultGuest: "Family & Friends",

  // Language the invite opens in: "en" or "gu". Guests can switch with the EN | ગુજ button.
  defaultLang: "en",

  ritualPos: {
    mehendi: { x: 50, y: 74, w: 50 },
    survani: { x: 50, y: 75, w: 46, h: 26 },
    mandva:  { x: 50, y: 71, w: 44, h: 24, glow: false },
    lagna:   { x: 21, y: 85, w: 24 }
  },

  credit: { name: "HariKrishna AI Studios", phone: "919408877393", show: "94088 77393" },

  /* ============ ગુજરાતી (Gujarati) ============ */
  gu: {
    pageTitle: "આરવ અને મીરા - લગ્ન આમંત્રણ (નમૂનો)",
    bride: { first: "મીરા", full: "મીરા", parents: "કવિતાબેન તથા રાજેશભાઈ શાહની સુપુત્રી" },
    groom: { first: "આરવ", full: "આરવ", parents: "નેહાબેન તથા વિક્રમભાઈ મહેતા (USA)ના સુપુત્ર" },
    inviteText: ["હૃદયના ઉમંગ અને વડીલોના આશીર્વાદ સાથે", "બે આત્માઓના શુભ મિલનના", "આ પાવન પ્રસંગે આપને ભાવભર્યું નિમંત્રણ"],
    dateRange: "૧૨ – ૧૪ ફેબ્રુઆરી ૨૦૨૭",
    cityLine: "અમદાવાદ",
    dateReveal: { day: "૧૪", month: "ફેબ્રુ.", year: "૨૦૨૭", line: "હસ્તમેળાપ · સાંજે ૭:૩૦" },
    events: [
      { id: "mehendi", name: "મહેંદી", day: "૧૨", month: "ફેબ્રુ.", year: "૨૦૨૭", weekday: "શુક્રવાર",
        lines: ["સાંજે ૪:૦૦ કલાકથી"], venue: "કેસર બાગ લૉન્સ", address: "એસ.જી. હાઈવે, અમદાવાદ", attire: "લીલા રંગના પોશાક" },
      { id: "survani", name: "સંગીત સંધ્યા", day: "૧૩", month: "ફેબ્રુ.", year: "૨૦૨૭", weekday: "શનિવાર",
        lines: ["સાંજે ૭:૦૦ – દાંડિયા અને ગરબા", "ત્યારબાદ ભોજન"], venue: "ધ રોયલ કોર્ટયાર્ડ",
        address: "સિંધુ ભવન રોડ, અમદાવાદ", attire: "ચણિયા ચોળી અને કેડિયું" },
      { id: "mandva", name: "પીઠી અને માંડવો", day: "૧૪", month: "ફેબ્રુ.", year: "૨૦૨૭", weekday: "રવિવાર",
        lines: ["સવારે ૯:૦૦ – પીઠી", "સવારે ૧૧:૦૦ – મંડપ મુહૂર્ત"], venue: "નિવાસસ્થાને",
        address: "શાહ નિવાસ, સેટેલાઇટ, અમદાવાદ", attire: "પીળા અને પરંપરાગત" },
      { id: "lagna", name: "લગ્ન", day: "૧૪", month: "ફેબ્રુ.", year: "૨૦૨૭", weekday: "રવિવાર",
        lines: ["જાન આગમન – સાંજે ૫:૩૦", "હસ્તમેળાપ – સાંજે ૭:૩૦"], venue: "રાજમહેલ પેલેસ ગ્રાઉન્ડ્સ",
        address: "ગાંધીનગર હાઈવે, અમદાવાદ", attire: "પરંપરાગત" }
    ],
    family: [
      { title: "નિમંત્રક", names: ["રાજેશ શાહ", "કવિતા શાહ", "ધ્રુવ શાહ"] },
      { title: "શુભ આશીર્વાદ", names: ["મહેન્દ્રભાઈ શાહ", "સરલાબેન શાહ"] },
      { title: "શુભેચ્છક", names: ["શાહ અને મહેતા પરિવાર", "મિત્રો અને શુભેચ્છકો"] }
    ],
    familyGroup: "",
    blessingsNote: "આપની હાજરી એ જ અમારા આશીર્વાદ",
    photosTitle: "અમારી યાદગાર પળો",
    defaultGuest: "સ્વજનો",
    rsvp: { by: "૩૧ જાન્યુઆરી ૨૦૨૭" },
    credit: { name: "HariKrishna AI Studios" }
  },
  /* ============ हिंदी (Hindi) ============ */
  hi: {
    pageTitle: "आरव और मीरा - विवाह निमंत्रण (नमूना)",
    bride: { first: "मीरा", full: "मीरा", parents: "कविता एवं राजेशभाई शाह की सुपुत्री" },
    groom: { first: "आरव", full: "आरव", parents: "नेहा एवं विक्रमभाई मेहता (USA) के सुपुत्र" },
    inviteText: ["हृदय के उल्लास और बड़ों के आशीर्वाद के साथ", "दो आत्माओं के शुभ मिलन के", "इस पावन अवसर पर आपको सादर आमंत्रण"],
    dateRange: "१२ – १४ फ़रवरी २०२७",
    cityLine: "अहमदाबाद",
    dateReveal: { day: "१४", month: "फ़र.", year: "२०२७", line: "हस्तमिलाप · शाम ७:३०" },
    events: [
      { id: "mehendi", name: "मेहंदी", day: "१२", month: "फ़र.", year: "२०२७", weekday: "शुक्रवार",
        lines: ["शाम ४:०० बजे से"], venue: "केसर बाग लॉन्स", address: "एस.जी. हाईवे, अहमदाबाद", attire: "हरे रंग के परिधान" },
      { id: "survani", name: "संगीत संध्या", day: "१३", month: "फ़र.", year: "२०२७", weekday: "शनिवार",
        lines: ["शाम ७:०० – डांडिया और गरबा", "उसके बाद भोजन"], venue: "द रॉयल कोर्टयार्ड",
        address: "सिंधु भवन रोड, अहमदाबाद", attire: "चनिया चोली और केडियू" },
      { id: "mandva", name: "पीठी और मंडप", day: "१४", month: "फ़र.", year: "२०२७", weekday: "रविवार",
        lines: ["सुबह ९:०० – पीठी", "सुबह ११:०० – मंडप मुहूर्त"], venue: "निवास स्थान पर",
        address: "शाह निवास, सैटेलाइट, अहमदाबाद", attire: "पीले और पारंपरिक" },
      { id: "lagna", name: "विवाह", day: "१४", month: "फ़र.", year: "२०२७", weekday: "रविवार",
        lines: ["बारात आगमन – शाम ५:३०", "हस्तमिलाप – शाम ७:३०"], venue: "राजमहल पैलेस ग्राउंड्स",
        address: "गांधीनगर हाईवे, अहमदाबाद", attire: "पारंपरिक" }
    ],
    family: [
      { title: "निमंत्रक", names: ["राजेश शाह", "कविता शाह", "ध्रुव शाह"] },
      { title: "शुभ आशीर्वाद", names: ["महेंद्रभाई शाह", "सरलाबेन शाह"] },
      { title: "शुभेच्छु", names: ["शाह एवं मेहता परिवार", "मित्र एवं शुभचिंतक"] }
    ],
    familyGroup: "",
    blessingsNote: "आपकी उपस्थिति ही हमारा आशीर्वाद है",
    photosTitle: "हमारे यादगार पल",
    defaultGuest: "स्वजन",
    credit: { name: "HariKrishna AI Studios" }
  }
};
