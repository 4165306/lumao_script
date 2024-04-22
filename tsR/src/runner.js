"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Runner = void 0;
const uniSwap_1 = require("./web3/dex/uniSwap");
const okxDex_1 = require("./web3/dex/okxDex");
const pancake_1 = require("./web3/dex/pancake");
const syncswap_1 = require("./web3/dex/syncswap");
const orca_1 = require("./web3/dex/orca");
const bungee_1 = require("./web3/bridge/bungee");
const okxWallet_1 = require("./wallet/okxWallet");
const ChromePlugin_1 = require("./browser/ChromePlugin");
const adsBrowser_1 = require("./browser/adsBrowser");
const bitBrowser_1 = require("./browser/bitBrowser");
const test_1 = require("@playwright/test");
class Runner {
    // public static async  main(browserId: string) {
    //     const {http} = await BitBrowser.openBrowser(browserId)
    //     const context = await BrowserContextManager.getContext('http://' + http)
    //     const metamask = Metamask.getInstance(context)
    //     await metamask.unlock("qaz123123")
    // }
    static async main(browserIds, procedure, password, browserType) {
        // let browserInstance = null 
        // if (browserType === 1) {
        //     browserInstance = AdsBrowser
        // } else {
        //     browserInstance = BitBrowser
        // }
        let http = '';
        for (let i = 0; i < browserIds.length; i++) {
            // const r = await axios.post("http://127.0.0.1:54345/browser/open", {
            //     id: browserIds[i],
            // })
            // @ts-ignore
            if (browserType === 1) {
                const info = await adsBrowser_1.AdsBrowser.openBrowser(browserIds[i]);
                http = info.http;
            }
            else {
                const info = await bitBrowser_1.BitBrowser.openBrowser(browserIds[i]);
                http = info.ws;
            }
            // const r = await axios.get('http://127.0.0.1:50325/api/v1/browser/start?serial_number=' + browserIds[i])
            // const http = r.data.data.ws.selenium
            console.log('http', http);
            const c = await test_1.chromium.connectOverCDP(`${http}`);
            const ctx = c.contexts()[0];
            // 禁用插件
            await ChromePlugin_1.ChromePlugin.disablePlugin(['nkbihfbeogaeaoehlefnkodbefgpgknn', 'phkbamefinggmakgklpkljjmgibohnba'], ctx);
            await okxWallet_1.OkxWallet.getInstance(ctx).unlock(password);
            const actions = {
                uniswap: uniSwap_1.UniSwap.getInstance(ctx),
                okxDex: okxDex_1.OkxDex.getInstance(ctx),
                pancake: pancake_1.Pancake.getInstance(ctx),
                syncswap: syncswap_1.Syncswap.getInstance(ctx),
                orca: orca_1.Orca.getInstance(ctx),
                bungee: bungee_1.Bungee.getInstance(ctx)
            };
            for (let j = 0; j < procedure.length; j++) {
                console.log('开始', procedure[j].name);
                // @ts-ignore
                const instance = actions[procedure[j].name];
                if (procedure[j].network) {
                    // dex
                    await instance.run(procedure[j].network, procedure[j].fromToken, procedure[j].toToken);
                }
                if (procedure[j].fromNetwork) {
                    // bridge
                    await instance.run(procedure[j].fromNetwork, procedure[j].toNetwork, procedure[j].fromToken, procedure[j].toToken);
                }
                console.log('完成', procedure[j].name);
            }
            ctx.close();
            c.close();
        }
    }
}
exports.Runner = Runner;
