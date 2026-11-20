/* ==========================================================================
   TOASTER ROASTER — Roast bank
   Every roast is a template. {name} is replaced with the target's name.
   intensity: 1 = Mild, 2 = Medium, 3 = Savage, 4 = Nuclear
   category:  general | looks | brains | gaming | work | style | food
   Keep it playful: clever burns, never hateful. No slurs, no protected
   characteristics, no real cruelty — just toast.
   ========================================================================== */

const ROASTS = [
  /* ---------------- GENERAL ---------------- */
  { text: "{name} is so boring, watching paint dry asked for a refund.", category: "general", intensity: 2 },
  { text: "{name} has the personality of a Terms & Conditions page — everyone skips it.", category: "general", intensity: 2 },
  { text: "If {name} were a Wi-Fi signal, they'd be the one bar in the basement.", category: "general", intensity: 2 },
  { text: "{name} is proof that even autocorrect gives up sometimes.", category: "general", intensity: 3 },
  { text: "Somewhere out there, a village is missing its idiot. It's {name}.", category: "general", intensity: 3 },
  { text: "{name} is like a software update — nobody asked for them, everyone ignores them, and they show up at the worst time.", category: "general", intensity: 2 },
  { text: "I'd roast {name} harder, but I'm afraid the smoke alarm would go off.", category: "general", intensity: 1 },
  { text: "{name} is the reason the instructions say 'do not eat the silica gel packet'.", category: "general", intensity: 3 },
  { text: "If brains were dynamite, {name} couldn't blow their own nose.", category: "general", intensity: 3 },
  { text: "{name} is so slow, they got lapped by a calendar.", category: "general", intensity: 2 },
  { text: "Talking to {name} is like reading the same page of a book that never ends — and the book is a phone manual.", category: "general", intensity: 2 },
  { text: "{name} is the human version of a loading spinner.", category: "general", intensity: 1 },
  { text: "If {name} had a dollar for every good idea they've had, they'd still be broke.", category: "general", intensity: 2 },
  { text: "{name} is so extra, even their shadow needs a break from them.", category: "general", intensity: 2 },
  { text: "Some people bring joy wherever they go. {name} brings joy whenever they leave.", category: "general", intensity: 3 },
  { text: "{name} is like a cloud — when they disappear, it's a beautiful day.", category: "general", intensity: 2 },
  { text: "I'd explain it to {name}, but I don't have any crayons or the time.", category: "general", intensity: 3 },
  { text: "{name} is the only person who can make a group chat go silent just by typing.", category: "general", intensity: 2 },
  { text: "If {name} were a spice, they'd be flour.", category: "general", intensity: 1 },
  { text: "{name} has the charisma of a wet sock and the timing of a buffering video.", category: "general", intensity: 3 },
  { text: "NASA called — they want their space back, because {name} is taking up all of it with that ego.", category: "general", intensity: 2 },
  { text: "{name} is so dramatic, their life needs a laugh track and a commercial break.", category: "general", intensity: 2 },
  { text: "If {name} was a browser tab, they'd be the one playing music nobody can find.", category: "general", intensity: 2 },
  { text: "Even the toaster pops up faster than {name} gets a joke.", category: "general", intensity: 1 },
  { text: "{name} is living proof that confidence and competence are not the same thing.", category: "general", intensity: 3 },
  { text: "I'd call {name} a tool, but tools are actually useful.", category: "general", intensity: 4 },
  { text: "{name} is so forgettable, their own reflection double-takes.", category: "general", intensity: 3 },
  { text: "If common sense were a currency, {name} would be in serious debt.", category: "general", intensity: 2 },

  /* ---------------- LOOKS ---------------- */
  { text: "{name} has a face that only a mother could love — and even she squints.", category: "looks", intensity: 3 },
  { text: "{name} is so ugly, when they were born the doctor slapped their mother.", category: "looks", intensity: 4 },
  { text: "{name}'s hairline is receding faster than their chances.", category: "looks", intensity: 3 },
  { text: "If {name} looked any more average, they'd be the default avatar.", category: "looks", intensity: 1 },
  { text: "{name} is the reason the camera invented the front-facing blur.", category: "looks", intensity: 2 },
  { text: "Mirrors don't lie, but they do flinch when {name} walks by.", category: "looks", intensity: 3 },
  { text: "{name}'s outfit looks like they got dressed in the dark — during a power cut — in a charity shop.", category: "looks", intensity: 3 },
  { text: "{name} has a face for radio and a voice for silent films.", category: "looks", intensity: 3 },
  { text: "If {name} were a selfie, they'd be the one you delete before posting.", category: "looks", intensity: 2 },
  { text: "{name} is so pale, they make the moon look tanned.", category: "looks", intensity: 2 },
  { text: "When {name} smiles, autocorrect changes it to a typo.", category: "looks", intensity: 2 },
  { text: "{name}'s fashion sense is what happens when you let a GPS choose your clothes.", category: "looks", intensity: 2 },
  { text: "If looks could kill, {name} would be a water pistol.", category: "looks", intensity: 1 },
  { text: "{name} walked into a bar and the bartender said 'sorry, we don't serve your face here'.", category: "looks", intensity: 4 },

  /* ---------------- BRAINS ---------------- */
  { text: "{name} is so dumb, they thought a quarterback was a refund.", category: "brains", intensity: 2 },
  { text: "{name}'s brain has two settings: buffering and 'have you tried turning it off and on again'.", category: "brains", intensity: 2 },
  { text: "If {name} had two brains, they'd still be half-witted.", category: "brains", intensity: 3 },
  { text: "{name} is so dumb, they tried to climb a glass wall to see what's on the other side.", category: "brains", intensity: 3 },
  { text: "Studying is hard for {name} — the book keeps closing itself out of respect.", category: "brains", intensity: 2 },
  { text: "{name} has the IQ of a room-temperature soup.", category: "brains", intensity: 3 },
  { text: "If {name} were any slower at thinking, they'd be going backwards.", category: "brains", intensity: 2 },
  { text: "{name} thought 'oxymoron' was a cleaning product.", category: "brains", intensity: 2 },
  { text: "Some people are born smart. {name} was born... eventually.", category: "brains", intensity: 3 },
  { text: "{name} is the only person who can fail a BuzzFeed quiz.", category: "brains", intensity: 2 },
  { text: "If {name}'s brain were a search engine, it would return 'no results found' for everything.", category: "brains", intensity: 3 },
  { text: "{name} is proof that evolution can take a day off.", category: "brains", intensity: 4 },
  { text: "I'd say {name} is two sandwiches short of a picnic, but that implies there was ever a picnic.", category: "brains", intensity: 2 },
  { text: "{name} has one brain cell and it's on a coffee break.", category: "brains", intensity: 3 },

  /* ---------------- GAMING ---------------- */
  { text: "{name} is so bad at games, the tutorial beat them.", category: "gaming", intensity: 2 },
  { text: "{name}'s K/D ratio is so low, the game files a missing persons report.", category: "gaming", intensity: 3 },
  { text: "If {name} were a boss fight, they'd be the one you beat while AFK.", category: "gaming", intensity: 2 },
  { text: "{name} camps so hard, even the tent asked them to leave.", category: "gaming", intensity: 2 },
  { text: "{name} is the reason 'git gud' was invented — and it still didn't work.", category: "gaming", intensity: 3 },
  { text: "Watching {name} play is like watching a loading screen — nothing happens, but you can't look away.", category: "gaming", intensity: 2 },
  { text: "{name}'s aim is so bad, they miss in turn-based games.", category: "gaming", intensity: 3 },
  { text: "If {name} had a dollar for every time they died in-game, they could afford a better GPU. Still wouldn't help.", category: "gaming", intensity: 2 },
  { text: "{name} is so bad, the NPCs feel sorry for them.", category: "gaming", intensity: 2 },
  { text: "{name} rage-quits so often, the quit button has a restraining order.", category: "gaming", intensity: 2 },
  { text: "Even the bots teabag {name} out of pity.", category: "gaming", intensity: 4 },
  { text: "{name}'s gaming chair has more skill than they do.", category: "gaming", intensity: 3 },
  { text: "If lag were a person, it would still be faster than {name}'s reaction time.", category: "gaming", intensity: 3 },
  { text: "{name} plays support because even the game knows they can't carry.", category: "gaming", intensity: 2 },

  /* ---------------- WORK ---------------- */
  { text: "{name} is so lazy at work, their chair filed a complaint about being overworked.", category: "work", intensity: 2 },
  { text: "If {name} worked any slower, they'd be going back in time.", category: "work", intensity: 2 },
  { text: "{name}'s idea of multitasking is opening a second tab and forgetting both.", category: "work", intensity: 2 },
  { text: "The only thing {name} has ever shipped is excuses.", category: "work", intensity: 3 },
  { text: "{name} treats deadlines like suggestions from someone they don't respect.", category: "work", intensity: 2 },
  { text: "If procrastination were a sport, {name} would still be training for the qualifiers.", category: "work", intensity: 2 },
  { text: "{name}'s inbox is the only thing in their life that's truly zero — zero replies.", category: "work", intensity: 2 },
  { text: "Meetings with {name} are where productivity goes to die.", category: "work", intensity: 3 },
  { text: "{name} has been 'almost done' with that task since last quarter.", category: "work", intensity: 2 },
  { text: "If {name} put half the energy they spend avoiding work into actual work, they'd be unstoppable. They won't.", category: "work", intensity: 3 },
  { text: "{name}'s LinkedIn headline should just say 'professional meeting attendee'.", category: "work", intensity: 2 },
  { text: "The printer jams less often than {name} delivers on time.", category: "work", intensity: 2 },

  /* ---------------- STYLE ---------------- */
  { text: "{name}'s style is what happens when you dress by horoscope.", category: "style", intensity: 2 },
  { text: "If {name}'s wardrobe were a playlist, it would be on shuffle — permanently.", category: "style", intensity: 2 },
  { text: "{name} wears so much black, even their shadow files for overtime.", category: "style", intensity: 1 },
  { text: "That outfit looks like {name} lost a bet with a washing machine.", category: "style", intensity: 3 },
  { text: "{name} has the fashion sense of a screensaver.", category: "style", intensity: 2 },
  { text: "If socks with sandals were a crime, {name} would be serving life.", category: "style", intensity: 2 },
  { text: "{name} dresses like the 'before' picture in a makeover show — permanently.", category: "style", intensity: 3 },
  { text: "Even the mannequins refuse to wear what {name} wears.", category: "style", intensity: 3 },
  { text: "{name}'s idea of dressing up is a clean hoodie.", category: "style", intensity: 1 },
  { text: "If {name} were a fashion trend, they'd be last season. Every season.", category: "style", intensity: 2 },

  /* ---------------- FOOD ---------------- */
  { text: "{name} eats so much, their fridge has a lock and a restraining order.", category: "food", intensity: 2 },
  { text: "If {name} were a pizza, they'd be the plain cheese one nobody picks first.", category: "food", intensity: 1 },
  { text: "{name}'s cooking is so bad, the smoke alarm cheers when they order takeout.", category: "food", intensity: 3 },
  { text: "Some people are foodies. {name} is just food-adjacent.", category: "food", intensity: 2 },
  { text: "{name} could burn water — and has, twice.", category: "food", intensity: 2 },
  { text: "If {name} made toast, even the toaster would file a complaint.", category: "food", intensity: 2 },
  { text: "{name} is on a seafood diet — they see food and eat it.", category: "food", intensity: 1 },
  { text: "The only thing {name} has ever successfully baked is a mess.", category: "food", intensity: 2 },
  { text: "{name}'s idea of meal prep is deciding which delivery app to open.", category: "food", intensity: 1 },
  { text: "If calories were compliments, {name} would be the most flattered person alive.", category: "food", intensity: 2 }
];

/* Roasts aimed at the user themselves ("Roast me" mode). */
const SELF_ROASTS = [
  { text: "You asked for this. Your search history alone could power a horror movie.", category: "general", intensity: 2 },
  { text: "You're the reason the group chat has a mute button.", category: "general", intensity: 2 },
  { text: "Your life has less direction than a broken compass in a maze.", category: "general", intensity: 3 },
  { text: "You have the focus of a goldfish with a smartphone.", category: "brains", intensity: 2 },
  { text: "Your alarm clock snoozes you. Even it gave up.", category: "general", intensity: 2 },
  { text: "You're so indecisive, even your reflection can't decide what to do.", category: "general", intensity: 2 },
  { text: "Your playlist has more skips than your gym membership has visits.", category: "general", intensity: 2 },
  { text: "You're the human equivalent of a software update nobody asked for.", category: "general", intensity: 3 },
  { text: "Your plants are fake because even they knew better than to trust you.", category: "general", intensity: 2 },
  { text: "You're so extra, your own shadow asked for personal space.", category: "general", intensity: 2 },
  { text: "Your idea of a balanced diet is a burger in each hand.", category: "food", intensity: 1 },
  { text: "You're the reason 'reply all' should require a licence.", category: "work", intensity: 2 }
];

const INTENSITY = {
  1: { label: "Mild", emoji: "🌱", desc: "Gentle teasing, safe for grandma." },
  2: { label: "Medium", emoji: "🔥", desc: "Properly toasted. A little crispy." },
  3: { label: "Savage", emoji: "🥵", desc: "Extra crispy. Feelings may be harmed." },
  4: { label: "Nuclear", emoji: "☢️", desc: "Total meltdown. No survivors." }
};

const CATEGORIES = [
  { id: "all", label: "All roasts", emoji: "🎲" },
  { id: "general", label: "General", emoji: "💬" },
  { id: "looks", label: "Looks", emoji: "🪞" },
  { id: "brains", label: "Brains", emoji: "🧠" },
  { id: "gaming", label: "Gaming", emoji: "🎮" },
  { id: "work", label: "Work", emoji: "💼" },
  { id: "style", label: "Style", emoji: "👟" },
  { id: "food", label: "Food", emoji: "🍕" }
];

/* ---------------- Engine helpers ---------------- */

function fillTemplate(text, name) {
  return text.split("{name}").join(name);
}

/* Deterministic pick by seed string (used for the daily roast). */
function seededIndex(seed, length) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return hash % length;
}

function pickRoast({ name, category = "all", maxIntensity = 2, exclude = [] }) {
  let pool = ROASTS.filter(r => r.intensity <= maxIntensity);
  if (category !== "all") pool = pool.filter(r => r.category === category);
  pool = pool.filter(r => !exclude.includes(r.text));
  if (pool.length === 0) {
    pool = ROASTS.filter(r => r.intensity <= maxIntensity && !exclude.includes(r.text));
  }
  if (pool.length === 0) pool = ROASTS.slice();
  const roast = pool[Math.floor(Math.random() * pool.length)];
  return { ...roast, text: fillTemplate(roast.text, name) };
}

function pickSelfRoast(maxIntensity = 2, exclude = []) {
  let pool = SELF_ROASTS.filter(r => r.intensity <= maxIntensity && !exclude.includes(r.text));
  if (pool.length === 0) pool = SELF_ROASTS.slice();
  const roast = pool[Math.floor(Math.random() * pool.length)];
  return { ...roast };
}

function dailyRoast() {
  const today = new Date().toISOString().slice(0, 10);
  return SELF_ROASTS[seededIndex("toaster-" + today, SELF_ROASTS.length)];
}

if (typeof module !== "undefined") {
  module.exports = { ROASTS, SELF_ROASTS, INTENSITY, CATEGORIES, fillTemplate, seededIndex, pickRoast, pickSelfRoast, dailyRoast };
}
