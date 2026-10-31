/*
  ============================================================
  INVITATION DETAILS - edit only this file for a new couple.
  Keep the quotes "..." and commas exactly as they are.
  ============================================================
*/
window.INVITE = {
  // Shown in the browser tab and on the WhatsApp link preview
  pageTitle: "Aarav & Meera - Engagement Invitation",

  blessingLine: "॥ श्री गणेशाय नमः ॥",

  occasion: "engagement",            // used in the RSVP message and calendar entry
  heroLine: "The engagement of",     // small line above the names
  joinWord: "&",                     // word between the two families

  groom: { first: "Aarav", full: "Aarav Mehta", parents: "Mr. Rajesh & Mrs. Sunita Mehta" },
  bride: { first: "Meera", full: "Meera Shah", parents: "Mr. Anil & Mrs. Kavita Shah" },

  // Used for the countdown and the date reveal (24-hour time, India time)
  weddingDate: "2026-12-20T18:00:00+05:30",
  dateReveal: { day: "20", month: "December", year: "2026", weekday: "Sunday" },

  city: "Udaipur, Rajasthan",
  hashtag: "#AaravMeeraGetEngaged",

  inviteText:
    "Together with their families, joyfully invite you to celebrate their engagement, as two hearts exchange rings and two families become one.",

  story: {
    title: "How It Began",
    image: "assets/img/couple.webp",
    text: [
      "It began with a borrowed umbrella on a rainy Mumbai evening, and a promise to return it the next day.",
      "One very nervous proposal by Lake Pichola later, Meera said yes. Now our families gather to bless the rings, and the umbrella is still with Meera."
    ]
  },

  // id is a short name for the event (used in guest links).
  // icon picks the picture: haldi, mehendi, sangeet or wedding
  events: [
    { id: "mehendi", icon: "mehendi", name: "Mehendi",       date: "Saturday, 19 December 2026", time: "4:00 PM", venue: "Zenana Mahal Lawns", dress: "Greens and florals", map: "https://maps.google.com/?q=Taj+Lake+Palace+Udaipur" },
    { id: "ring",    icon: "haldi",   name: "Ring Ceremony", date: "Sunday, 20 December 2026",   time: "6:00 PM", venue: "Gol Dhana & Ring Ceremony, Darbar Hall", dress: "Royal traditional", map: "https://maps.google.com/?q=Taj+Lake+Palace+Udaipur" },
    { id: "party",   icon: "sangeet", name: "Dinner & Dance", date: "Sunday, 20 December 2026",  time: "8:30 PM", venue: "Lakeside Terrace, The Lake Palace", dress: "Indo-western glam", map: "https://maps.google.com/?q=Taj+Lake+Palace+Udaipur" }
  ],

  venue: {
    name: "The Lake Palace",
    address: "Lake Pichola, Udaipur, Rajasthan 313001",
    map: "https://maps.google.com/?q=Taj+Lake+Palace+Udaipur"
  },

  blessingsFrom: [
    { title: "Grandparents", names: ["Late Shri Mohanlal & Smt. Kamla Mehta", "Shri Ramesh & Smt. Usha Shah"] },
    { title: "Parents", names: ["Mr. Rajesh & Mrs. Sunita Mehta", "Mr. Anil & Mrs. Kavita Shah"] },
    { title: "With love from", names: ["The Mehta & Shah families"] }
  ],

  rsvp: {
    by: "10 December 2026",
    whatsapp: "919999999999",       // country code + number, no + or spaces
    contactName: "Rohan Mehta"
  },

  // Guest who opens the link without a personal name
  defaultGuest: "Family & Friends"
};
