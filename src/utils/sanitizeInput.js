import { blacklist, escape, stripLow, trim } from 'validator';

const blacklistString = '!;@#$%^&*()[]{}|/\\'.replace(
  /[.*+?^${}();|[\]\\]/g,
  '\\$&'
);

export function sanitizeInput(input) {
  const strippedLow = stripLow(input, true);
  const blacklisted = blacklist(strippedLow, blacklistString);
  const escaped = escape(blacklisted);
  const trimmed = trim(escaped);

  return trimmed;
}
