import { HttpServer } from "./httpService/Server";
import { Runner } from "./src/runner";

const server = new HttpServer('./dist')
server.router('GET', '/', async (query: Record<string, any>) => {
    return query
})
server.router('POST', '/__server/runScript', async (body: Record<string, any>) => {
    console.log('body', body)
    const browserIds = body.browserIds
    const procedure = body.procedure
    const password = body.password
    const browserType = body.browserType
    const handleResult = Runner.main(browserIds, procedure, password, browserType)
    return {browserIds, procedure, handleResult}
})

server.start(8080);
