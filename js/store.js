// Saving and loading. Everything stays in this phone's browser storage. Nothing is sent anywhere.
import { DEFAULT_KIT } from './content.js';
import { isValidKey } from './cycle.js';

const KEY = 'mochi-data-v1';

export function defaults() {
  return {
    version: 1,
    onboarded: false,
    name: '',
    periodDays: [],
    endedPeriods: [],
    logs: {},
    settings: { cycleLength: 28, periodLength: 5, lateAfter: 5, showFertility: true },
    kit: { items: DEFAULT_KIT.map((text, i) => ({ id: 'k' + i, text })), checked: {}, cycle: null },
    lastBackup: null,
    hideInstall: false,
  };
}

function merge(raw) {
  const d = defaults();
  if (!raw || typeof raw !== 'object') return d;
  return {
    ...d,
    ...raw,
    periodDays: Array.isArray(raw.periodDays) ? raw.periodDays.filter(isValidKey) : [],
    endedPeriods: Array.isArray(raw.endedPeriods) ? raw.endedPeriods.filter(isValidKey) : [],
    logs: raw.logs && typeof raw.logs === 'object' ? raw.logs : {},
    settings: { ...d.settings, ...(raw.settings || {}) },
    kit: { ...d.kit, ...(raw.kit || {}) },
  };
}

export function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? merge(JSON.parse(raw)) : defaults();
  } catch {
    return defaults();
  }
}

export function save(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function erase() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}

// Read a backup file. Returns the data, or null if the file isn't a Mochi backup.
export function parseBackup(text) {
  try {
    const obj = JSON.parse(text);
    if (!obj || obj.app !== 'mochi-period-tracker' || !obj.data || !Array.isArray(obj.data.periodDays)) return null;
    return merge(obj.data);
  } catch {
    return null;
  }
}

export function makeBackup(data) {
  return JSON.stringify({ app: 'mochi-period-tracker', exportedAt: new Date().toISOString(), data }, null, 1);
}
