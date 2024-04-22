"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserContextManager = void 0;
const test_1 = require("@playwright/test");
class ContextManager {
    contexts = {};
    async getContext(url) {
        if (!this.contexts[url]) {
            const browser = await test_1.chromium.connectOverCDP(url);
            this.contexts[url] = browser.contexts()[0];
        }
        return this.contexts[url];
    }
    async closeContext(url) {
        if (this.contexts[url]) {
            await this.contexts[url].close();
            delete this.contexts[url];
        }
    }
}
const BrowserContextManager = new ContextManager();
exports.BrowserContextManager = BrowserContextManager;
