const commonEnvironment = require("./environment.common");
const {app} = require('electron')

function initEnv() {
    if (app.isPackaged) process.env.NODE_ENV = "prod";
    else process.env.NODE_ENV = "dev";
    console.log("Environment is ", process.env.NODE_ENV);
    switch (process.env.NODE_ENV) {
        case "prod":
            const {environmentProd} = require("./environment.prod");
            return Object.assign(commonEnvironment, environmentProd);
        case "dev":
            const {environmentDev} = require("./environment.dev");
            return Object.assign(commonEnvironment, environmentDev);
        case "int":
            const {environmentInt} = require("./environment.int");
            return Object.assign(commonEnvironment, environmentInt);
        default:
            const {defaultEnv} = require("./environment.prod");
            return Object.assign(commonEnvironment, defaultEnv);
    }
}

const environment = initEnv();

module.exports = {
    environment
}