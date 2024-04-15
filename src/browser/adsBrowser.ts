import axios from "axios";

interface BrowserInfo {
    http: string
    ws: string
}

export class AdsBrowser {

    public static async openBrowser(browserId: string): Promise<BrowserInfo> {
        const r = await axios.get('http://127.0.0.1:50325/api/v1/browser/start?serial_number=' + browserId)
        return {
            http: r.data.data.ws.selenium,
            ws: ''
        }
    }
}