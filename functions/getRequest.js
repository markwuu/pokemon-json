const https = require("https");

async function getRequest(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", (_) => resolve(data));
      })
      .on("error", (e) => reject(e));
  });
}

module.exports = getRequest;
