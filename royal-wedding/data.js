/*
  ============================================================
  INVITATION DETAILS - edit only this file for a new couple.
  Keep the quotes "..." and commas exactly as they are.
  ============================================================
*/
window.INVITE = {
  // Shown in the browser tab and on the WhatsApp link preview
  pageTitle: "Aarav & Meera - Wedding Invitation",

  blessingLine: "॥ श्री गणेशाय नमः ॥",

  occasion: "wedding",            // used in the RSVP message and calendar entry
  heroLine: "The wedding of",     // small line above the names
  joinWord: "weds",               // word between the two families

  groom: { first: "Aarav", full: "Aarav Mehta", parents: "Mr. Rajesh & Mrs. Sunita Mehta" },
  bride: { first: "Meera", full: "Meera Shah", parents: "Mr. Anil & Mrs. Kavita Shah" },

  // Used for the countdown and the date reveal (24-hour time, India time)
  weddingDate: "2027-02-14T19:30:00+05:30",
  dateReveal: { day: "14", month: "February", year: "2027", weekday: "Sunday" },

  city: "Udaipur, Rajasthan",
  hashtag: "#AaravWedsMeera",

  inviteText:
    "Together with their families, request the honour of your presence as they begin their forever, surrounded by love, laughter and the blessings of those dearest to them.",

  story: {
    title: "Our Story",
    image: "assets/img/varmala.webp",
    text: [
      "It began with a borrowed umbrella on a rainy Mumbai evening, and a promise to return it the next day.",
      "Three years, countless chai dates and one very nervous proposal by Lake Pichola later, the umbrella is still with Meera, and Aarav is still keeping his promise."
    ]
  },

  // id must be one of: haldi, mehendi, sangeet, wedding (it picks the icon).
  // Add  icon: "sangeet"  to use a different picture than the id.
  events: [
    { id: "haldi",   name: "Haldi",   date: "Friday, 12 February 2027",   time: "10:00 AM", venue: "Garden Courtyard, The Lake Palace", dress: "Shades of yellow", map: "https://maps.google.com/?q=Taj+Lake+Palace+Udaipur" },
    { id: "mehendi", name: "Mehendi", date: "Friday, 12 February 2027",   time: "4:00 PM",  venue: "Zenana Mahal Lawns", dress: "Greens and florals", map: "https://maps.google.com/?q=Taj+Lake+Palace+Udaipur" },
    { id: "sangeet", name: "Sangeet", date: "Saturday, 13 February 2027", time: "7:30 PM",  venue: "Darbar Hall", dress: "Indo-western glam", map: "https://maps.google.com/?q=Taj+Lake+Palace+Udaipur" },
    { id: "wedding", name: "Wedding", date: "Sunday, 14 February 2027",   time: "7:30 PM",  venue: "Lakeside Mandap, The Lake Palace", dress: "Royal traditional", map: "https://maps.google.com/?q=Taj+Lake+Palace+Udaipur" }
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
    by: "31 January 2027",
    whatsapp: "919999999999",       // country code + number, no + or spaces
    contactName: "Rohan Mehta"
  },

  // Guest who opens the link without a personal name
  defaultGuest: "Family & Friends"
};
