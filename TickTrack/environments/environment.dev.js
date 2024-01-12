const commonEnvironment = require("./environment.common");

const env = {
    production: false,
}

module.exports = {
    environmentDev: Object.assign(commonEnvironment, env)
};