"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChromePlugin = void 0;
class ChromePlugin {
    static async disablePlugin(plugins, ctx) {
        const p = await ctx.newPage();
        await p.goto('chrome://extensions');
        for (let i = 0; i < plugins.length; i++) {
            const n = p.locator(`#${plugins[i]}`).locator('#enableToggle');
            const attr = await n.getAttribute('aria-pressed');
            if (attr === 'true') {
                await n.click();
            }
        }
    }
}
exports.ChromePlugin = ChromePlugin;
