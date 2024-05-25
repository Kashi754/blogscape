import { blacklist, stripLow, trim } from 'validator';

const blacklistString = ';@$%^&*()[]{}|/\\'.replace(
  /[.*+?^${}();|[\]\\]/g,
  '\\$&'
);

const blacklistStringWithEscape = ';@$%^&*()[]{}|/'.replace(
  /[.*+?^${}();|[\]]/g,
  '\\$&'
);

export function sanitizeInput(input, blacklistEscape = true) {
  const strippedLow = stripLow(input, true);
  const blacklisted = blacklistEscape
    ? blacklist(strippedLow, blacklistString)
    : blacklist(strippedLow, blacklistStringWithEscape);
  const escaped = blacklisted;
  const trimmed = trim(escaped);

  return trimmed;
}
