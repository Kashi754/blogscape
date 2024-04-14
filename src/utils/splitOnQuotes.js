export function splitOnQuotes(str) {
  const result = str.match(/\\?.|^$/g).reduce(
    (p, c) => {
      if (c === '"') {
        p.quote ^= 1;
      } else if (!p.quote && c === ' ') {
        p.a.push('');
      } else {
        p.a[p.a.length - 1] += c.replace(/\\(.)/, '$1');
      }
      return p;
    },
    { a: [''] }
  ).a;

  return result;
}
