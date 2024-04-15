import { BrowserContext } from "@playwright/test";

export class ChromePlugin {

    public static async disablePlugin(plugins: string[], ctx: BrowserContext) {
        const p = await ctx.newPage()
        await p.goto('chrome://extensions')
        for (let i = 0; i < plugins.length; i ++ ) {
            const n = p.locator(`#${plugins[i]}`).locator('#enableToggle')
            const attr = await n.getAttribute('aria-pressed')
            if (attr === 'true') {
                await n.click()
            }
        }
    }
}