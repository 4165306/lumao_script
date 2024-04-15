import type {BrowserContext} from "@playwright/test";
import {BitBrowser} from "../browser/bitBrowser";

export class Metamask {
    private readonly context: BrowserContext
    private readonly homePath: string = 'chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html'
    private static instance: Metamask

    private constructor(ctx: BrowserContext) {
        this.context = ctx
    }

    public static getInstance(ctx: BrowserContext) {
        if (!Metamask.instance) {
            Metamask.instance = new Metamask(ctx)
        }
        return Metamask.instance
    }

    async unlock(password: string) {
        await BitBrowser.keepOnePage(this.context)
        const unlockPath = this.homePath
        const page = await this.context.newPage()
        await page.goto(unlockPath)
        await page.getByTestId('unlock-submit').waitFor()
        await page.getByTestId('unlock-password').fill(password)
        await page.getByTestId('unlock-submit').click()
        await page.getByTestId('home__asset-tab').waitFor()
        console.log("解锁完毕")
    }
}