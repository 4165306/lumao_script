import { chromium } from "@playwright/test"
import axios from "axios"
import { UniSwap } from "./web3/dex/uniSwap"
import { OkxDex } from "./web3/dex/okxDex"
import { Pancake } from "./web3/dex/pancake"
import { Syncswap } from "./web3/dex/syncswap"
import { Orca } from "./web3/dex/orca"
import { Bungee } from "./web3/bridge/bungee"
import { OkxWallet } from "./wallet/okxWallet"
import { ChromePlugin } from "./browser/ChromePlugin"

export class Runner {

    // public static async  main(browserId: string) {
    //     const {http} = await BitBrowser.openBrowser(browserId)
    //     const context = await BrowserContextManager.getContext('http://' + http)
    //     const metamask = Metamask.getInstance(context)
    //     await metamask.unlock("qaz123123")
    // }
    public static async main(browserIds: string[], procedure: Record<string, any>, password: string) {
        for (let i = 0; i < browserIds.length; i ++) {
            // const r = await axios.post("http://127.0.0.1:54345/browser/open", {
            //     id: browserIds[i],
            // })
            const r = await axios.get('http://127.0.0.1:50325/api/v1/browser/start?serial_number=' + browserIds[i])
            const http = r.data.data.ws.selenium
            const c = await chromium.connectOverCDP(`http://${http}`)
            const ctx = c.contexts()[0]
            // 禁用插件
            ChromePlugin.disablePlugin(['nkbihfbeogaeaoehlefnkodbefgpgknn', 'phkbamefinggmakgklpkljjmgibohnba'], ctx)
            await OkxWallet.getInstance(ctx).unlock(password)
            const actions = {
                uniswap: UniSwap.getInstance(ctx),
                okxDex: OkxDex.getInstance(ctx),
                pancake: Pancake.getInstance(ctx),
                syncswap: Syncswap.getInstance(ctx),
                orca: Orca.getInstance(ctx),
                bungee: Bungee.getInstance(ctx)
            }
            for (let j = 0; j < procedure.length; j ++ ) {
                console.log('开始', procedure[j].name)
                // @ts-ignore
                const instance = actions[procedure[j].name]
                if (procedure[j].network) {
                    // dex
                    await instance.run(procedure[j].network, procedure[j].fromToken, procedure[j].toToken)
                }
                if (procedure[j].fromNetwork) {
                    // bridge
                    await instance.run(procedure[j].fromNetwork, procedure[j].toNetwork, procedure[j].fromToken, procedure[j].toToken)
                }
                console.log('完成', procedure[j].name)
            }
            ctx.close()
            c.close()
        }
    }

    
}