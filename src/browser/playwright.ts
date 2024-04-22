import { chromium } from '@playwright/test';
import type {BrowserContext} from '@playwright/test'
class ContextManager {
    private contexts: { [url: string]: BrowserContext } = {};

    public async getContext(url: string): Promise<BrowserContext> {
        if (!this.contexts[url]) {
            const browser = await chromium.connectOverCDP(url);
            this.contexts[url] = browser.contexts()[0]
        }
        return this.contexts[url];
    }

    public async closeContext(url: string): Promise<void> {
        if (this.contexts[url]) {
            await this.contexts[url].close();
            delete this.contexts[url];
        }
    }

    public async KeepOnePage(ctx: BrowserContext) {
        const pages = ctx.pages()
        let i = 0
        try {
            while(pages.length > 2) {
                console.log(pages[i].url())
                await pages[i].close()
                ++i
            }
        }catch(e) {

        }
        
    }
}

const BrowserContextManager = new ContextManager();
export { BrowserContextManager };
