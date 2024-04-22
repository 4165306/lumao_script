"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = require("./httpService/Server");
const runner_1 = require("./src/runner");
const server = new Server_1.HttpServer('./dist');
server.router('GET', '/', async (query) => {
    return query;
});
server.router('POST', '/__server/runScript', async (body) => {
    console.log('body', body);
    const browserIds = body.browserIds;
    const procedure = body.procedure;
    const password = body.password;
    const browserType = body.browserType;
    const handleResult = runner_1.Runner.main(browserIds, procedure, password, browserType);
    return { browserIds, procedure, handleResult };
});
server.start(8080);
