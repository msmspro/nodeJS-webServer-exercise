const logger = require("../logger/logger");
const ObjectID = require('mongodb').ObjectID;

module.exports.initRouter = (app, db) => {
    app.use((req, resp, next) => {
        logger.logRequest(req);
        next();
    });

    app.get("/", (req, resp) => {
        resp.redirect("/records");
    });

    app.get("/records", (req, resp) => {
        db.collection("records").find({}).toArray((err, result) => {
            if (err){
                logger.log('An error has occurred on finding records. ' + err);
                resp.send({'error':'An error has occurred'});
            }else{
                resp.render("records.hbs", {records: result});
            }
        });
    });

    app.post("/records/create", (req, resp) => {
        const record = {name: req.body.newRecordName};
        db.collection("records").insert(record, (err, result) => {
            if (err){
                logger.log('An error has occurred on record insert. ' + err);
                resp.send({'error':'An error has occurred'});
            }else{
                resp.redirect("/records");
            }
        });
    });

    app.post('/records/delete/:id', (req, resp) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('records').remove(details, (err, result) => {
            if (err) {
                logger.log('An error has occurred on record insert. ' + err);
                resp.send({'error':'An error has occurred'});
            } else {
                resp.redirect("/records");
            }
        });
    });
};