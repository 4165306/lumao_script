"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdsBrowser = void 0;
const axios_1 = require("axios");
class AdsBrowser {
    static async openBrowser(browserId) {
        const r = await axios_1.default.get('http://127.0.0.1:50325/api/v1/browser/start?serial_number=' + browserId);
        return {
            http: r.data.data.ws.selenium,
            ws: ''
        };
    }
}
exports.AdsBrowser = AdsBrowser;
