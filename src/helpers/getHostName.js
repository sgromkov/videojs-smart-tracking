/**
 * Will return hostname from URL.
 *
 * @function getHostName
 * @param {string} url
 *        Media url
 * @return {string}
 *          Hostname
 */
const getHostName = function(url) {
  const match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);

  return (match !== null &&
    match.length > 2 &&
    typeof match[2] === 'string' &&
    match[2].length > 0) ? match[2] : null;
};

export default getHostName;
