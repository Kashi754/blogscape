import { blacklist, escape, stripLow, trim } from 'validator';

const blacklistString = ';@$%^&*()[]{}|/\\'.replace(
  /[.*+?^${}();|[\]\\]/g,
  '\\$&'
);

const blacklistStringWithEscape = ';@$%^&*()[]{}|/'.replace(
  /[.*+?^${}();|[\]]/g,
  '\\$&'
);

export function sanitizeInput(input, escapeQuotes = true) {
  const strippedLow = stripLow(input, true);
  const blacklisted = escapeQuotes
    ? blacklist(strippedLow, blacklistString)
    : blacklist(strippedLow, blacklistStringWithEscape);
  //const escaped = escapeQuotes ? escape(blacklisted) : blacklisted;
  const escaped = blacklisted;
  const trimmed = trim(escaped);

  return trimmed;
}
