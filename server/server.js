const express = require("express");
const mongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");

const dbConfig = require("../config/db");
const routes = require("../routes/routes");
const logger = require("../logger/logger");

const app = express();
const port = 3000;

module.exports = {

    start : () => {
        mongoClient.connect.option = {useNewUrlParser : true};
        mongoClient.connect(dbConfig.url, (err, database) => {
            if (err){
                logger.log(err);
                throw err;
            }
            app.set("view engine", "hbs");
            app.use(bodyParser.urlencoded({extended:true}));
            routes.initRouter(app, database.db("node-web-server-db"));
            app.listen(port, () => {
                console.log(`Server is working on port: ${port}`);
            });
        });
    }
};