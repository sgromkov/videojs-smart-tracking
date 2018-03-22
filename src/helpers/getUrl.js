/**
 * Will return correct server url for exact action.
 *
 * @function getHostName
 * @param {string} server
 *        Domain name
 * @param {string} site
 *        Site id
 * @param {string} action
 *        Action name
 * @param {string} version
 *        Log version
 * @return {string}
 *         Url
 */
const getUrl = function(server, site, action, version) {
  return server + '/' + site + '/' + action + '/v' + version;
};

export default getUrl;
