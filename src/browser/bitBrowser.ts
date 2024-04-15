import { BrowserContext } from '@playwright/test';
import axios from "axios";

interface BrowserInfo {
    http: string
    ws: string
}

const host = 'http://127.0.0.1:54345'

export class BitBrowser {
    public static async openBrowser(id: string): Promise<BrowserInfo> {
        const r = await axios.post(host + '/browser/open', {id})
        const { http, ws } = r.data.data
        console.log(r.data)
        return {
            http,
            ws
        }
    }

    public static async getBrowserList() {

    }

    public static async keepOnePage(context: BrowserContext) {
        const pages = context.pages()
        for (let i = 1; i < pages.length; i ++ ) {
            await pages[i].close()
        }
    }
}