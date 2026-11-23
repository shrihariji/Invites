/*
  ============================================================
  INVITATION DETAILS - edit only this file.
  Keep the quotes "..." and commas exactly as they are.
  All wording below is copied from the family's printed card.
  ============================================================
*/
window.INVITE = {
  pageTitle: "Radhika & Aaryan - Wedding Invitation",

  shlokas: ["॥ श्री उमिया माताय नमः ॥", "॥ श्री गणेशाय नमः ॥", "॥ श्री स्वामिनारायणाय नमः ॥"],

  bride: { first: "Radhika", full: "Dr. Radhika", parents: "D/O Amita & Rameshbhai Patel" },
  groom: { first: "Aaryan", full: "Dr. Aaryan", parents: "S/O Manisha & Rakeshbhai Mehta (USA)" },

  inviteText: [
    "With joy in our hearts & blessings from our elders",
    "we invite you to celebrate",
    "the beautiful union of two souls"
  ],

  dateRange: "30 Dec 2026 – 02 Jan 2027",
  cityLine: "Ahmedabad · Gandhinagar",

  // Countdown + scratch reveal point to this moment (India time)
  mainMoment: "2027-01-02T19:00:00+05:30",
  dateReveal: { day: "02", month: "JAN", year: "2027", line: "Hast Melap · 07:00 PM" },

  /* Events. id must stay one of: mehendi, survani, mandva, lagna (it picks the painting,
     the colours and the little ritual). start/end are used for "Add to calendar". */
  events: [
    {
      id: "mehendi", gu: "મહેંદી", name: "Mehandi",
      day: "30th", month: "DEC", year: "2026", weekday: "Wednesday",
      lines: ["04:00 PM Onwards"],
      venue: "Shreekunj Greens",
      address: "B/h Pravish Brillia Tower, Opp. Chharodi Lake, Off S.G. Highway, Ahmedabad",
      attire: "Indo-Western",
      map: "https://maps.app.goo.gl/8huJ2g4vYUCx3B7A8",
      start: "2026-12-30T16:00:00+05:30", end: "2026-12-30T20:00:00+05:30"
    },
    {
      id: "survani", gu: "સુરવાણી", name: "Cultural Survani",
      day: "31st", month: "DEC", year: "2026", weekday: "Thursday",
      lines: ["Meet and Greet - 06:00 PM", "Followed By Dinner", "Survani By Brijraj Gadhvi", "8:00 PM Onwards"],
      venue: "Praveg Adalaj",
      address: "Sarkhej - Gandhinagar Hwy, Behind Maharaja Hotel, Adalaj, Ahmedabad",
      attire: "Chaniya Choli & Kurta Pajama",
      map: "https://maps.app.goo.gl/5nwyhqwXJMpxzuuS6",
      start: "2026-12-31T18:00:00+05:30", end: "2026-12-31T23:30:00+05:30"
    },
    {
      id: "mandva", gu: "માંડવા", name: "Mandva",
      day: "01st", month: "JAN", year: "2027", weekday: "Friday",
      lines: ["Mandap Muhurat - 04:30 PM", "Mameru - 05:00 PM"],
      venue: "Sarthi-2 Common Plot",
      address: "Opp Amin's Hospital, Surdhara Circle to S.G. Road, Thaltej, Ahmedabad",
      attire: "Traditional",
      map: "https://maps.app.goo.gl/vmLNoPGcJRwp1xgN6?g_st=ic",
      start: "2027-01-01T16:30:00+05:30", end: "2027-01-01T19:30:00+05:30"
    },
    {
      id: "lagna", gu: "લગ્ન", name: "Wedding",
      day: "02nd", month: "JAN", year: "2027", weekday: "Saturday",
      lines: ["Jaan Aagman - 04:30 PM", "Hast Melap - 07:00 PM"],
      venue: "Mystic Falls",
      address: "Gift City, Gandhinagar",
      attire: "Traditional",
      map: "https://maps.app.goo.gl/xFecRNSC5PGF8o1p7",
      start: "2027-01-02T16:30:00+05:30", end: "2027-01-02T22:00:00+05:30"
    }
  ],

  /* Family list, laid out as on the card: each row is [left, right] (husband, wife) or a single centred name.
     "note" is the line under the group, e.g. (Saras Parivar - Amar Group). Write "Late." before a name, never "Lt." */
  family: [
    { title: "Invitees", rows: [["Laljibhai R. Patel", "Rukhiben L. Patel"], ["Ramesh L. Patel", "Amita R. Patel"], ["Harshit Patel"]] },
    { title: "Mameru", rows: [["Late. Jayantibhai Patel", "Gauriben Patel"], ["Late. Brijeshbhai Patel", "Minaxiben Patel"], ["Dhruv Patel", "Kashish Patel"]],
      note: "(Jakasaniya Parivar)" },
    { title: "With Best Wishes", rows: [["Chandulal Patel", "Madhuben Patel"], ["Late. Rasiklal Patel", "Sushilaben Patel"],
      ["Dharmeshkumar Patel", "Surekhaben Patel"], ["Dr. Priteshkumar Patel", "Dr. Ushaben Patel"]],
      note: "(Saras Parivar - Amar Group)" }
  ],
  familyGroup: "",
  showLogo: true,               // Saras Detergent logo, as on the card
  blessingsNote: "Blessings Only",

  photosTitle: "Our Moments",
  photos: ["m02", "m03", "m11", "m04", "m05", "m06", "m12", "m08", "m10"],   // files in assets/photos (.webp)

  // RSVP on WhatsApp. Leave whatsapp empty "" to hide the RSVP section.
  rsvp: { whatsapp: "", by: "" },

  /* Background music (files in assets/audio).
     The family chose "Dawn Strings" on 23 Nov 2026: the same singing over new music
     (nylon guitar, piano, santoor-like zither, flute, cello, violins, soft tabla).
     Write the file to play below, or "" for no music. */
  music: "music-vocal-dawn.mp3",
  /* A link can pick the track with ?music=<name>. "vocal" now plays the chosen song too,
     so guest links already sent with &music=vocal get it without a new link. */
  musicOptions: {
    vocal: "music-vocal-dawn.mp3",          // the chosen song (Dawn Strings)
    dawn: "music-vocal-dawn.mp3",           // same
    old: "music-vocal-v2.mp3",              // the first song, softer original music
    instrumental: "music-instrumental.mp3", // first instrumental, no singing
    soft: "music-vocal-soft.mp3",           // same singing: tanpura, tabla, piano, strings
    garden: "music-vocal-garden.mp3",       // same singing: piano, marimba, vibraphone, cello, strings
    flute: "music-flute-piano-v2.mp3",      // instrumental: the tune on flute and piano (brighter)
    flute1: "music-flute-piano.mp3"         // instrumental, first darker take
  },

  defaultGuest: "Family & Friends",

  // Language the invite opens in: "en" or "gu". Guests can switch with the EN | ગુજ button.
  defaultLang: "en",

  // Shown at the very end of the invite
  credit: { name: "Chaitanya", phone: "919408877393", show: "94088 77393" },

  /* ============ ગુજરાતી (Gujarati) - shown when the guest picks ગુજ ============
     Only what differs from English is listed. Ask the family to proofread this. */
  gu: {
    pageTitle: "રાધિકા અને આર્યન - લગ્ન આમંત્રણ",
    bride: { first: "રાધિકા", full: "ડૉ. રાધિકા", parents: "અમિતાબેન તથા રમેશભાઈ પટેલની સુપુત્રી" },
    groom: { first: "આર્યન", full: "ડૉ. આર્યન", parents: "મનીષાબેન તથા રાકેશભાઈ મહેતા (USA)ના સુપુત્ર" },
    inviteText: ["હૃદયના ઉમંગ અને વડીલોના આશીર્વાદ સાથે", "બે આત્માઓના શુભ મિલનના", "આ પાવન પ્રસંગે આપને ભાવભર્યું નિમંત્રણ"],
    dateRange: "૩૦ ડિસેમ્બર ૨૦૨૬ – ૨ જાન્યુઆરી ૨૦૨૭",
    cityLine: "અમદાવાદ · ગાંધીનગર",
    dateReveal: { day: "૦૨", month: "જાન્યુ.", year: "૨૦૨૭", line: "હસ્તમેળાપ · સાંજે ૭:૦૦" },
    events: [
      { id: "mehendi", name: "મહેંદી", day: "૩૦", month: "ડિસે.", year: "૨૦૨૬", weekday: "બુધવાર",
        lines: ["સાંજે ૪:૦૦ કલાકથી"], venue: "શ્રીકુંજ ગ્રીન્સ",
        address: "પ્રવિશ બ્રિલિયા ટાવરની પાછળ, છારોડી તળાવ સામે, એસ.જી. હાઈવે, અમદાવાદ", attire: "ઇન્ડો-વેસ્ટર્ન" },
      { id: "survani", name: "સાંસ્કૃતિક સુરવાણી", day: "૩૧", month: "ડિસે.", year: "૨૦૨૬", weekday: "ગુરુવાર",
        lines: ["સ્નેહમિલન – સાંજે ૬:૦૦", "ત્યારબાદ ભોજન", "સુરવાણી – શ્રી બ્રિજરાજ ગઢવી", "રાત્રે ૮:૦૦ કલાકથી"], venue: "પ્રવેગ અડાલજ",
        address: "સરખેજ - ગાંધીનગર હાઈવે, મહારાજા હોટલની પાછળ, અડાલજ, અમદાવાદ", attire: "ચણિયા ચોળી અને કુર્તા પાયજામા" },
      { id: "mandva", name: "માંડવા", day: "૦૧", month: "જાન્યુ.", year: "૨૦૨૭", weekday: "શુક્રવાર",
        lines: ["મંડપ મુહૂર્ત – સાંજે ૪:૩૦", "મામેરું – સાંજે ૫:૦૦"], venue: "સારથિ-૨ કોમન પ્લોટ",
        address: "અમીન હોસ્પિટલ સામે, સુરધારા સર્કલથી એસ.જી. રોડ, થલતેજ, અમદાવાદ", attire: "પરંપરાગત" },
      { id: "lagna", name: "લગ્ન", day: "૦૨", month: "જાન્યુ.", year: "૨૦૨૭", weekday: "શનિવાર",
        lines: ["જાન આગમન – સાંજે ૪:૩૦", "હસ્તમેળાપ – સાંજે ૭:૦૦"], venue: "મિસ્ટિક ફોલ્સ",
        address: "ગિફ્ટ સિટી, ગાંધીનગર", attire: "પરંપરાગત" }
    ],
    family: [
      { title: "નિમંત્રક", rows: [["લાલજીભાઈ આર. પટેલ", "રૂખીબેન એલ. પટેલ"], ["રમેશ એલ. પટેલ", "અમિતા આર. પટેલ"], ["હર્ષિત પટેલ"]] },
      { title: "મામેરું", rows: [["સ્વ. જયંતીભાઈ પટેલ", "ગૌરીબેન પટેલ"], ["સ્વ. બ્રિજેશભાઈ પટેલ", "મીનાક્ષીબેન પટેલ"], ["ધ્રુવ પટેલ", "કશિશ પટેલ"]],
        note: "(જાકાસણીયા પરિવાર)" },
      { title: "શુભેચ્છક", rows: [["ચંદુલાલ પટેલ", "મધુબેન પટેલ"], ["સ્વ. રસિકલાલ પટેલ", "સુશીલાબેન પટેલ"],
        ["ધર્મેશકુમાર પટેલ", "સુરેખાબેન પટેલ"], ["ડૉ. પ્રિતેશકુમાર પટેલ", "ડૉ. ઉષાબેન પટેલ"]],
        note: "(સારસ પરિવાર - અમર ગ્રુપ)" }
    ],
    familyGroup: "",
    blessingsNote: "ફક્ત આશીર્વાદ",
    photosTitle: "અમારી યાદગાર પળો",
    defaultGuest: "સ્વજનો",
    credit: { name: "ચૈતન્ય" }
  }
};
