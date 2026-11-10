// All the friendly text: tips per cycle phase, symptoms, moods, forecasts.

export const PHASES = {
  period: {
    name: 'Period',
    emoji: '🩸',
    about: 'Your body is shedding the lining of the womb. Energy is often lower, and resting is productive too.',
    watch: ['Cramps in the tummy or lower back', 'Tiredness and low energy', 'Bloating', 'Headaches', 'Mood dips'],
    eat: [
      'Iron-rich food (spinach, red meat, eggs, tofu, beans) to replace iron lost in blood',
      'Vitamin C (oranges, strawberries, guava) to help your body absorb iron',
      'Warm soups and ginger tea to ease cramps',
      'A little dark chocolate (70%+). Its magnesium can help with cramps 🍫',
      'Plenty of warm water',
    ],
    avoid: ['Very salty food (more bloating)', 'Lots of coffee (can make cramps worse)', 'Very sugary snacks (energy crashes)', 'Alcohol', 'Iced drinks if they make your cramps worse'],
    care: ['Heat pad or hot water bottle on your tummy', 'Gentle stretching or a slow walk', 'Early night 💤', 'Change pads/tampons regularly'],
    partner: ['Bring a warm drink or a hot water bottle', 'Snacks & chocolate 🍫', 'Offer to do a chore today', 'Extra patience and cuddles 🫂'],
    forecasts: ['🌧️ Cosy-day weather: slow down and stay warm.', '☁️ Low energy expected. Resting is productive too.', '🌦️ Scattered cramp showers possible. Keep the heat pad close.', '🫖 Perfect tea weather. Be gentle with yourself.'],
    mascot: ['I brought you a hot water bottle 🧸', 'Rest up, you are doing great 💗', 'Warm tea time? ☕', "It's okay to take it easy today."],
    mood: 'period',
  },
  follicular: {
    name: 'After your period',
    emoji: '🌱',
    about: 'Hormones are rising again after your period. Many people feel more energetic, positive and social now.',
    watch: ['Energy and mood often get better', 'Skin may look clearer', 'Good focus and motivation'],
    eat: ['Lean protein (chicken, fish, eggs, tofu)', 'Fresh vegetables and salads', 'Yoghurt, kimchi or other fermented food', 'Whole grains like oats and brown rice'],
    avoid: ['Skipping meals on busy days'],
    care: ['A good time to try a new workout 🏃‍♀️', 'Plan social activities or start new projects'],
    partner: ['Plan a fun date or outing 🎡', 'Try something new together'],
    forecasts: ['☀️ Sunny with rising energy!', '🌤️ Bright and breezy. Great day to start something new.', '🌈 Good vibes forecast.'],
    mascot: ["Let's go do something fun! ✨", 'You are glowing today 🌟', 'New week, new energy!'],
    mood: 'follicular',
  },
  fertile: {
    name: 'Fertile window',
    emoji: '🌼',
    about: 'Your body releases an egg around ovulation day. These are the days when pregnancy is most likely.',
    watch: ['Clear, stretchy discharge (like raw egg white)', 'A mild twinge on one side of the lower tummy', 'Higher sex drive', 'Slightly higher body temperature'],
    eat: ['Fibre-rich vegetables & fruit', 'Healthy fats: avocado, nuts, salmon', 'Plenty of water'],
    avoid: ['Too much processed food'],
    care: ['Trying for a baby? These are your best days.', 'Not trying? Use protection. This is the highest-chance time.', 'Predicted dates are estimates. Do not use this app as birth control.'],
    partner: ['Compliments go a long way today 💕', 'Plan a nice date night'],
    forecasts: ['☀️ Peak sunshine: energy and confidence are high!', '🌻 Bright and warm all day.', '💖 Heart-warming forecast.'],
    mascot: ['Feeling cute today? 💕', 'You are shining! 🌼'],
    mood: 'fertile',
  },
  luteal: {
    name: 'Before your period',
    emoji: '🍂',
    about: 'After ovulation, a hormone called progesterone rises. Energy slowly winds down and cravings may start.',
    watch: ['More hunger or cravings', 'Slightly lower energy', 'Tender breasts', 'Feeling a bit more sensitive'],
    eat: ['Complex carbs (sweet potato, oats, brown rice) keep mood steady', 'Magnesium: nuts, seeds, bananas, dark chocolate', 'Calcium: milk, yoghurt, tofu (may reduce PMS)'],
    avoid: ['Too much caffeine', 'Very salty snacks'],
    care: ['Gentle exercise like yoga or walking', 'Keep a steady sleep routine'],
    partner: ['Be extra kind and patient', 'Keep healthy snacks around'],
    forecasts: ['⛅ Partly cloudy. Pace yourself.', '🍂 Cosy autumn mood.', '🌥️ Mild, with a chance of cravings.'],
    mascot: ['Snack break? 🍪', 'Slow and steady 🐾', "You've got this!"],
    mood: 'luteal',
  },
  pms: {
    name: 'Period coming soon',
    emoji: '🌙',
    about: 'Your period is expected in the next few days. Hormones are dropping, which can cause PMS (feeling unwell or moody before a period).',
    watch: ['Mood swings, feeling irritable or teary', 'Bloating', 'Tender breasts', 'Pimples', 'Food cravings', 'Headache', 'Trouble sleeping', 'Tiredness'],
    eat: [
      'Bananas, nuts & seeds (magnesium + vitamin B6 help mood)',
      'Small amounts of dark chocolate 🍫',
      'Water-rich food (cucumber, watermelon) to reduce bloating',
      'Ginger or chamomile tea',
      'Iron-rich meals to prepare for your period',
    ],
    avoid: ['Salty food & instant noodles (bloating)', 'Lots of coffee or bubble tea (cramps, jitters)', 'Alcohol (worse mood and sleep)', 'Too much sugar (mood crashes)'],
    care: ['Pack your period kit in your bag 🎒', 'Wear comfy clothes', 'Get enough sleep', 'Light exercise can ease PMS'],
    partner: ['Extra patience: mood swings are hormones, not you', 'Stock up on favourite snacks', 'Hugs and a listening ear', 'Maybe skip big plans and arguments 😉'],
    forecasts: ['🌩️ Mood thunderstorms possible. Be kind to yourself.', '🌧️ Light drizzle of emotions expected.', '🌙 Early night recommended.', '🍫 Chocolate showers expected.'],
    mascot: ['Your period is coming soon. Pack your kit! 🎒', "Feeling grumpy? That's okay 🐾", 'Here, have some chocolate 🍫'],
    mood: 'pms',
  },
  late: {
    name: 'Period is late',
    emoji: '⏰',
    about: "Your period hasn't arrived on the predicted date. Cycles often shift by a few days, so try not to panic.",
    watch: [
      'Common causes: stress, travel, illness, poor sleep, or big changes in weight, food or exercise',
      'If you have had sex, pregnancy is possible. A home pregnancy test is reliable from the day your period was due.',
      'Starting or stopping birth control can change your cycle',
    ],
    eat: ['Regular, balanced meals', 'Stay hydrated'],
    avoid: ['Worrying too much. Stress itself can delay periods 🫂'],
    care: ['Take a pregnancy test if there is any chance', 'See a doctor if you miss 3 periods in a row, or have strong pain, heavy bleeding or feel unwell', 'Forgot to log your period? Add it in the Calendar.'],
    partner: ['Be calm and supportive', 'Help keep stress low'],
    forecasts: ['🌫️ Foggy: the forecast is unclear. Your period may arrive any day.', '⏳ Waiting weather. Stay relaxed.'],
    mascot: ["Hmm, your period is a little late. Let's keep an eye on it 🔍", "Don't worry too much. Cycles shift sometimes 💗"],
    mood: 'late',
  },
};

export const PHASE_ORDER = ['period', 'follicular', 'fertile', 'luteal', 'pms', 'late'];

export const FLOWS = [
  { id: 'light', label: 'Light', emoji: '💧' },
  { id: 'medium', label: 'Medium', emoji: '💧💧' },
  { id: 'heavy', label: 'Heavy', emoji: '💧💧💧' },
];

export const MOODS = [
  { id: 'happy', label: 'Happy', emoji: '😊' },
  { id: 'calm', label: 'Calm', emoji: '😌' },
  { id: 'energetic', label: 'Energetic', emoji: '⚡' },
  { id: 'sensitive', label: 'Sensitive', emoji: '🥺' },
  { id: 'sad', label: 'Sad', emoji: '😢' },
  { id: 'irritable', label: 'Irritable', emoji: '😤' },
  { id: 'anxious', label: 'Anxious', emoji: '😰' },
  { id: 'swings', label: 'Mood swings', emoji: '🎢' },
];

export const SYMPTOMS = [
  { id: 'cramps', label: 'Cramps', emoji: '😣' },
  { id: 'headache', label: 'Headache', emoji: '🤕' },
  { id: 'bloating', label: 'Bloating', emoji: '🎈' },
  { id: 'backache', label: 'Back pain', emoji: '💢' },
  { id: 'tender', label: 'Tender breasts', emoji: '💗' },
  { id: 'acne', label: 'Pimples', emoji: '🔴' },
  { id: 'tired', label: 'Tired', emoji: '😴' },
  { id: 'cravings', label: 'Cravings', emoji: '🍫' },
  { id: 'nausea', label: 'Nausea', emoji: '🤢' },
  { id: 'insomnia', label: 'Poor sleep', emoji: '🌙' },
  { id: 'spotting', label: 'Spotting', emoji: '🔸' },
  { id: 'discharge', label: 'Discharge', emoji: '💦' },
];

export const DOCTOR_SIGNS = [
  'No period for 3 months or more (and not pregnant)',
  'Cycles often shorter than 21 days or longer than 35 days',
  'Periods lasting more than 7 days',
  'Soaking through a pad or tampon every 1–2 hours',
  'Cramps so painful they stop your daily life',
  'Bleeding between periods or after sex',
];

export const DEFAULT_KIT = ['Pads / tampons / period cup', 'Painkillers', 'Heat pad / hot water bottle', 'Comfy underwear', 'Favourite snacks 🍫', 'Ginger or herbal tea'];
