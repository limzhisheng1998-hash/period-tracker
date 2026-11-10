// Mochi, the original kitty mascot, drawn as SVG. Her face changes with the cycle phase.

const INK = '#5B3A45';
const FACE = '#FFFDF9';
const PINK = '#FFB8CC';
const PINK_DARK = '#FF8FB1';
const YELLOW = '#FFE27A';

const LOOKS = {
  period: { eyes: 'sleepy', mouth: 'smile', extra: 'bottle' },
  follicular: { eyes: 'happy', mouth: 'open', extra: 'sparkles' },
  fertile: { eyes: 'heart', mouth: 'smile', extra: 'heart' },
  luteal: { eyes: 'dot', mouth: 'smile', extra: 'none' },
  pms: { eyes: 'pout', mouth: 'frown', extra: 'choco' },
  late: { eyes: 'worried', mouth: 'o', extra: 'question' },
  none: { eyes: 'happy', mouth: 'open', extra: 'sparkles' },
};

const heartPath = (cx, cy, s) =>
  `M${cx} ${cy + s * 0.9} C${cx - s * 1.6} ${cy - s * 0.1} ${cx - s * 0.7} ${cy - s * 1.3} ${cx} ${cy - s * 0.4} C${cx + s * 0.7} ${cy - s * 1.3} ${cx + s * 1.6} ${cy - s * 0.1} ${cx} ${cy + s * 0.9}Z`;

function eye(kind, x) {
  const y = 104;
  const dot = `<ellipse cx="${x}" cy="${y}" rx="7.5" ry="9.5" fill="${INK}"/><circle cx="${x + 2.5}" cy="${y - 3.5}" r="2.8" fill="#fff"/>`;
  const inner = x < 100 ? 1 : -1; // which side faces the nose
  switch (kind) {
    case 'happy':
      return `<path d="M${x - 10} ${y + 3} Q${x} ${y - 10} ${x + 10} ${y + 3}" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`;
    case 'sleepy':
      return `<path d="M${x - 10} ${y - 2} Q${x} ${y + 8} ${x + 10} ${y - 2}" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`;
    case 'heart':
      return `<path d="${heartPath(x, y, 9)}" fill="${PINK_DARK}" stroke="${INK}" stroke-width="3"/>`;
    case 'worried':
      return `${dot}<path d="M${x - 10 * inner} ${y - 16} L${x + 8 * inner} ${y - 21}" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`;
    case 'pout':
      return `${dot}<path d="M${x - 10 * inner} ${y - 21} L${x + 8 * inner} ${y - 16}" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`;
    default:
      return dot;
  }
}

function mouth(kind) {
  switch (kind) {
    case 'open':
      return `<path d="M90 128 Q100 144 110 128 Z" fill="${PINK_DARK}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
    case 'frown':
      return `<path d="M91 136 Q100 128 109 136" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`;
    case 'o':
      return `<ellipse cx="100" cy="134" rx="5" ry="6" fill="${PINK_DARK}" stroke="${INK}" stroke-width="3.5"/>`;
    default:
      return `<path d="M88 128 Q94 136 100 128 Q106 136 112 128" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
}

function star(cx, cy, r) {
  return `<path d="M${cx} ${cy - r} Q${cx + r * 0.2} ${cy - r * 0.2} ${cx + r} ${cy} Q${cx + r * 0.2} ${cy + r * 0.2} ${cx} ${cy + r} Q${cx - r * 0.2} ${cy + r * 0.2} ${cx - r} ${cy} Q${cx - r * 0.2} ${cy - r * 0.2} ${cx} ${cy - r}Z" fill="${YELLOW}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`;
}

function extra(kind) {
  switch (kind) {
    case 'bottle':
      return `<g transform="rotate(-12 168 160)"><rect x="150" y="138" width="38" height="44" rx="14" fill="${PINK_DARK}" stroke="${INK}" stroke-width="4"/><rect x="162" y="128" width="14" height="12" rx="3" fill="${YELLOW}" stroke="${INK}" stroke-width="3.5"/><path d="${heartPath(169, 160, 6)}" fill="#fff"/></g>`;
    case 'sparkles':
      return star(22, 50, 12) + star(180, 74, 9) + star(30, 160, 7);
    case 'heart':
      return `<path d="${heartPath(26, 46, 13)}" fill="${PINK_DARK}" stroke="${INK}" stroke-width="3.5"/><path d="${heartPath(182, 150, 8)}" fill="${PINK}" stroke="${INK}" stroke-width="3"/>`;
    case 'choco':
      return `<g transform="rotate(10 170 160)"><rect x="150" y="136" width="36" height="46" rx="5" fill="#8B5A4A" stroke="${INK}" stroke-width="4"/><path d="M150 151 H186 M150 166 H186 M168 136 V182" stroke="#6E4336" stroke-width="3"/><path d="M150 160 L186 160 L186 182 L150 182 Z" fill="${YELLOW}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/></g>`;
    case 'question':
      return `<g><path d="M14 22 h36 a10 10 0 0 1 10 10 v20 a10 10 0 0 1 -10 10 h-20 l-10 10 v-10 h-6 a10 10 0 0 1 -10 -10 v-20 a10 10 0 0 1 10 -10z" fill="#fff" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/><text x="32" y="54" text-anchor="middle" font-size="28" font-weight="800" fill="${PINK_DARK}" font-family="ui-rounded, system-ui, sans-serif">?</text></g>`;
    default:
      return '';
  }
}

function flower(cx, cy) {
  let petals = '';
  for (let i = 0; i < 5; i++) {
    const a = (i * 72 - 90) * (Math.PI / 180);
    petals += `<circle cx="${(cx + Math.cos(a) * 9).toFixed(1)}" cy="${(cy + Math.sin(a) * 9).toFixed(1)}" r="7.5" fill="${YELLOW}" stroke="${INK}" stroke-width="3"/>`;
  }
  return `${petals}<circle cx="${cx}" cy="${cy}" r="6" fill="#FFB347" stroke="${INK}" stroke-width="3"/>`;
}

export function kitty(look = 'none', size = 120, label = 'Mochi the kitty') {
  const l = LOOKS[look] || LOOKS.none;
  return `<svg class="kitty" viewBox="0 0 200 190" width="${size}" height="${Math.round(size * 0.95)}" role="img" aria-label="${label}">
  <g stroke="${INK}" stroke-width="5" stroke-linejoin="round">
    <path d="M38 82 L34 22 Q36 14 44 18 L90 48 Z" fill="${FACE}"/>
    <path d="M162 82 L166 22 Q164 14 156 18 L110 48 Z" fill="${FACE}"/>
  </g>
  <path d="M48 62 L46 32 L74 50 Z" fill="${PINK}"/>
  <path d="M152 62 L154 32 L126 50 Z" fill="${PINK}"/>
  <ellipse cx="100" cy="110" rx="84" ry="66" fill="${FACE}" stroke="${INK}" stroke-width="5"/>
  <ellipse cx="52" cy="128" rx="14" ry="9" fill="${PINK}" opacity=".85"/>
  <ellipse cx="148" cy="128" rx="14" ry="9" fill="${PINK}" opacity=".85"/>
  <g stroke="${INK}" stroke-width="4" stroke-linecap="round">
    <path d="M10 112 L34 116"/><path d="M12 130 L34 126"/>
    <path d="M190 112 L166 116"/><path d="M188 130 L166 126"/>
  </g>
  ${eye(l.eyes, 70)}${eye(l.eyes, 130)}
  <path d="M93 116 Q100 111 107 116 Q104 122 100 123 Q96 122 93 116Z" fill="${PINK_DARK}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  ${mouth(l.mouth)}
  ${flower(100, 44)}
  ${extra(l.extra)}
</svg>`;
}
