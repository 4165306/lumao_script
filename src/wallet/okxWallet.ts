import type {BrowserContext} from "@playwright/test";
import {BitBrowser} from "../browser/bitBrowser";

export class OkxWallet {
    private readonly context: BrowserContext
    private static instance: OkxWallet

    private constructor(ctx: BrowserContext) {
        this.context = ctx
    }

    public static getInstance(ctx: BrowserContext) {
        if (!OkxWallet.instance) {
            OkxWallet.instance = new OkxWallet(ctx)
        }
        return OkxWallet.instance
    }

    async unlock(password: string) {
        await BitBrowser.keepOnePage(this.context)
        const p = await this.context.newPage()
        await p.goto("chrome-extension://mcohilncbfahbmgdjkbpemcciiolgcge/popup.html#unlock")
        const _id = await Promise.race([
            p.locator(".okui-input-input").fill(password).then(() => 1),
            await p.locator('#home-page-root-element-id').waitFor().then(() => 2)
        ])
        if (_id === 1) {
            await p.getByText("解锁").click()
        }
        await p.locator('#home-page-root-element-id').waitFor()
        await p.waitForTimeout(3000)
        await p.close()
    }

    async confirm() {
        const pages = this.context.pages()
        console.log("正在检测okx钱包")
        for (let i = 0; i < pages.length; i ++ ) {
            console.log(pages[i].url())
            if (pages[i].url().indexOf("mcohilncbfahbmgdjkbpemcciiolgcge") !== -1) {
                try {
                    await pages[i].locator(".btn-fill-highlight").click()
                }catch (e) {
                    console.log(e)
                    return
                }
                return
            }
        }
    }
}