"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metamask = void 0;
const bitBrowser_1 = require("../browser/bitBrowser");
class Metamask {
    context;
    homePath = 'chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html';
    static instance;
    constructor(ctx) {
        this.context = ctx;
    }
    static getInstance(ctx) {
        if (!Metamask.instance) {
            Metamask.instance = new Metamask(ctx);
        }
        return Metamask.instance;
    }
    async unlock(password) {
        await bitBrowser_1.BitBrowser.keepOnePage(this.context);
        const unlockPath = this.homePath;
        const page = await this.context.newPage();
        await page.goto(unlockPath);
        await page.getByTestId('unlock-submit').waitFor();
        await page.getByTestId('unlock-password').fill(password);
        await page.getByTestId('unlock-submit').click();
        await page.getByTestId('home__asset-tab').waitFor();
        console.log("解锁完毕");
    }
}
exports.Metamask = Metamask;
