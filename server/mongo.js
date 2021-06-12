const MongoClient = require('mongodb').MongoClient;
const url = process.env.mongoUrl;
const dbName = process.env.dbName;

module.exports.db = null;
module.exports.connect = function (callback) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (
    err,
    client
  ) {
    console.info('mongo connected');
    console.info(url, dbName);
    if (!err) {
      console.info('Connected successfully to server');
    }
    module.exports.db = client.db(dbName);
    callback(module.exports.db);
  });
};
