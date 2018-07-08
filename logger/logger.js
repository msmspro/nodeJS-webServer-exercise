const fs = require("fs");
const logFile = "server.log";

getTime = () => {
    let now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    return `${hour}:${minutes}:${seconds}`
};

writeLog = data => {
    console.log(data);
    fs.appendFile(logFile, data + "\n", (err) => {
        if(err){
            console.log("Logger I/O Error");
            console.log(err);
        }
    });
};

module.exports = {

    log: message => {
        let data = `${getTime()} || ${message}`;
        writeLog(data);
    },

    logRequest: req => {
        let data = `${getTime()} ${req.method} ${req.url} || ${req.get("user-agent")}`;
        writeLog(data);
    }
};