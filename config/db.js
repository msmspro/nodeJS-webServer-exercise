const user = "***";
const password = "***";
const port = "13664";
const host = "ds013664.mlab.com";
const dbName = "node-web-server-db";

module.exports = {
  url : `mongodb://${user}:${password}@${host}:${port}/${dbName}`
};