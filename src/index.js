'use strict';
//require('dotenv').config();
require('dotenv').config({path: __dirname + '/.env'})
const path = require('path');
const http = require('http');
const {logger} = require("./logger");
const oas3Tools = require('oas3-tools');
const {modifyOpenApiSpecToVendorSync} = require('./helpers/yamlizer')

const serverPort = process.env.SERVER_PORT || 8088;
const serverHost = process.env.SERVER_HOST || 'http://localhost';
const vendorName = process.env.RESELLER_NAME || 'Unknown'
const resellerProtocol = process.env.RESELLER_PROTOCOL || 'http'
const resellerDomainName = process.env.RESELLER_DOMAIN_NAME || 'Unknown'
const resellerDomainPort = process.env.RESELLER_DOMAIN_PORT || '80'
const specPath = path.join(__dirname, 'api/openapi.yaml')
let adjustedSpecPath = path.join(__dirname, 'api/adjustedopenapi.yaml')

adjustedSpecPath = modifyOpenApiSpecToVendorSync({
    inputYamlPath: specPath,
    outputYamlPath: adjustedSpecPath,
    vendorName: vendorName,
    serverProtocol: resellerProtocol,
    serverDomainName: resellerDomainName,
    serverPort: resellerDomainPort
})


// swaggerRouter configuration
const options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};
const expressAppConfig = oas3Tools.expressAppConfig(adjustedSpecPath, options);
const app = expressAppConfig.getApp();

const serverStartMessage = (serverHost, serverPort) => {
    const url = `${serverHost}:${serverPort}`
    logger.info(`Your API entry point is ${url}/v1`);
    logger.info(`Swagger-ui is available on ${url}/docs`, serverPort);
}


http.createServer(app).listen(serverPort, function () {
    serverStartMessage(serverHost, serverPort)
});




