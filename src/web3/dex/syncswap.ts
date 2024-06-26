import { BrowserContext, Locator, Page } from "@playwright/test"
import { ChainType, TokenTypes } from "../../types/tokenType"
import { OkxWallet } from "../../wallet/okxWallet"
import { getGasToken, isGas } from "../../helper/tokenHelper"
import { PlaywrightHelper } from "../../helper/playwrightHelper"

const chainMapping: Record<ChainType, string> = {
    Zksync: 'zkSync',
    Linea: 'Linea',
    Ethereum: "",
    Arbitrum: "",
    Base: "",
    Optimism: "",
    Polygon: "",
    BSC: "",
    Avalanche: "",
    Scroll: ""
}

export class Syncswap {
    private readonly context: BrowserContext
    private static instance: Syncswap

    private constructor(ctx: BrowserContext) {
        this.context = ctx
    }

    public static getInstance(ctx: BrowserContext) {
        if (!Syncswap.instance) {
            Syncswap.instance = new Syncswap(ctx)
        }
        return Syncswap.instance
    }

    public async run(chain: ChainType, fromToken: string, toToken: string) {
        if (fromToken.toUpperCase() === 'ETH'.toUpperCase()) {
            fromToken = 'Ethereum'
        }
        if (toToken.toUpperCase() === 'ETH'.toUpperCase()) {
            toToken = 'Ethereum'
        }
        const p = await this.context.newPage()
        await p.goto('https://syncswap.xyz')
        while(true) {
            this.context.on("page", async () => {
                await OkxWallet.getInstance(this.context).confirm()
            })
            // 尝试连接钱包
            await p.getByRole('button', {name: "Connect"}).click({timeout: 1000}).catch(() => {})
            // await 尝试确认钱包
            await p.getByText('OKX Wallet').click({timeout: 1000}).catch(() => {})
            // 稍等2秒
            await p.waitForTimeout(2000)
            // 尝试切换网络
            await p.getByRole('button', {name: "Switch"}).click({timeout: 1000}).catch(() => {})
            // 尝试确认切换网络
            await p.getByRole('button', {name: 'Switch Network'}).click().catch(() => {})
            // 尝试切换链
            const currentChainImage = await p.locator('#navi-tool > div.relative > div > button > div > div:nth-child(1) > div > img').getAttribute('src')
            if (currentChainImage?.toUpperCase().indexOf(chain.toUpperCase()) === -1) {
                // 没选对链，执行选链
                await p.locator('//*[@id="navi-tool"]/div[1]/div/button').click({timeout: 1000}).catch(() => {})
                await p.getByRole('button', {name: chain}).click({timeout: 1000}).catch(() => {})
            }
            let _t = await p.getByRole('button', {name: '0x'}).count().catch(() => 0)
            console.log('连接成功', _t)
            if (_t > 0) {
                break
            }
        }
        this.context.on("page", async () => {
            await OkxWallet.getInstance(this.context).confirm()
        })
        // 选择第一个币
        const currentFromToken = await p.locator('#swap-input > div.row > div > div > div.row.align > p').innerText()
        if (currentFromToken.toUpperCase().indexOf(fromToken.toUpperCase()) === -1) {
            await p.locator(".swap-input-btn").first().click()
            console.log('fromToken', fromToken, fromToken.toUpperCase())
            await this.selectToken(fromToken, p) 
        }
        const currentToToken = await p.locator('#swap-box > div:nth-child(1) > div > div.col.gap-10 > div.col.align > div:nth-child(3) > div.row > div > div > div.row.align > p').innerText()
        if (currentToToken.toUpperCase().indexOf(toToken.toUpperCase()) === -1) {
            await p.locator('#swap-box > div:nth-child(1) > div > div.col.gap-10 > div.col.align > div:nth-child(3) > div.row > div > div').click()
            await this.selectToken(toToken, p)
        }
        await p.waitForTimeout(1000)
        const balanceData = await p.locator('#swap-input > div.col.gap-12 > div:nth-child(1) > div.row.gap-8.align.fade-in-mid > div > p').innerText()
        const balance = balanceData.match(/\b\d+(\.\d+)?\b/) as RegExpMatchArray
        if (isGas(fromToken)) {
            console.log(balance[0])
            if (parseFloat(balance[0]) < 0.003) {
                console.log("gas费用太低")
                return 
            }
            // 输入gas的80% 
            await p.locator("#swap-input > div.row > input").fill((parseFloat(balance[0]) * 0.8).toFixed(5))
        } else {
            await p.getByRole('button', {name: '100%'}).click()
            // await p.locator('#swap-input > div.col.gap-12 > div:nth-child(1) > div.row.gap-8.align.fade-in-mid > div').click()
        }
        await p.waitForTimeout(1000)
        const swapButtons: Locator[] = [
            p.getByRole('button', { name: 'Unlock to allow SyncSwap to' }),
            p.getByRole("button", {name: "Swap"})
        ]
        console.log("开始等待Button")
        const idx = await PlaywrightHelper.waitLocators(p, swapButtons)
        console.log("等待Button结果", idx)
        if (idx === 0) {
            await p.getByRole('button', { name: 'Unlock to allow SyncSwap to' }).click()
            await p.getByRole("button", {name: "Swap"}).waitFor({
                timeout: 60000
            })
        }
        await p.getByRole("button", {name: "Swap"}).click()
        await Promise.race([
            p.getByText("Swap Completed").waitFor({timeout: 60000}),
            p.getByText("Swap Completed").click()
        ])
        console.log("success")
    }

    public async selectNetwork(chain: ChainType, p: Page) {
        p.locator('#navi-tool').getByRole('button').first().click()
        p.getByText(chainMapping[chain]).click()
        p.getByText("Switch").first().click()
        p.getByText("Switch network").click()
        // 等待切换成功
        await p.getByRole('button', { name: 'ETH' }).waitFor()
        
    }

    public async selectToken(token: string, p: Page) {
        
        await p.getByPlaceholder("Search name or paste address").fill(token)
        await p.waitForTimeout(3000)
        await p.locator(".token-selector-currencies > div:first-child").click()
        await p.waitForTimeout(1000)
        await p.locator("body").click({timeout: 3000}).catch(() => {})
        await p.locator('//*[@id="toolbox"]/div/div[1]/div[2]').click({timeout: 3000}).catch(() => {})
    }

    public async getFromTokenBalance(p: Page) {
        const balanceData = await p.locator('#swap-input > div.col.gap-12 > div:nth-child(1) > div.row.gap-8.align.fade-in-mid > div > p').innerText()
        const balance = balanceData.match(/\b\d+(\.\d+)?\b/) as RegExpMatchArray
        return parseFloat(balance[0])
    }
}