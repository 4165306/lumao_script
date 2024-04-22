"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitBrowser = void 0;
const axios_1 = require("axios");
const host = 'http://127.0.0.1:54345';
class BitBrowser {
    static async openBrowser(id) {
        const r = await axios_1.default.post(host + '/browser/open', { id });
        const { http, ws } = r.data.data;
        console.log(r.data);
        return {
            http,
            ws
        };
    }
    static async getBrowserList() {
    }
    static async keepOnePage(context) {
        const pages = context.pages();
        for (let i = 1; i < pages.length; i++) {
            await pages[i].close();
        }
    }
}
exports.BitBrowser = BitBrowser;
