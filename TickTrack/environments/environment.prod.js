const commonEnvironment = require("./environment.common");

const env = {
    production: true,
}

module.exports = {
    environmentProd: Object.assign(commonEnvironment, env)
};