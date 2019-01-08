/**
 * Helper to generate random strings
 * @param {number} len [The length of the string]
 * @param {charSet} string [The pool of characters to use]
 */
exports.generateRandomString = (len = 50,
  charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') => {
  let randomString = '';

  for (let i = 0; i < len; i++) {
    const randomPosition = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPosition, randomPosition + 1);
  }

  return randomString;
};

exports.getExpiryTimestamp = ttl => Date.now() + ttl;

exports.isItemExpired = expiryDate => expiryDate > Date.now();
