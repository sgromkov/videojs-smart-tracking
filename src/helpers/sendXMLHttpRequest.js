/**
 * Create XMLHttpRequest and send json data to server.
 *
 * @function sendXMLHttpRequest
 * @param {string} url
 *        Page url
 * @param {Object} data
 *        Event params
 */
const sendXMLHttpRequest = function(url, data) {
  const xhr = new XMLHttpRequest();

  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.withCredentials = true;
  xhr.send(JSON.stringify(data));
};

export default sendXMLHttpRequest;
