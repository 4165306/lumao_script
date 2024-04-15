import { BrowserContext, Page } from "@playwright/test"
import { OkxWallet } from "../../wallet/okxWallet"

export class OkxDex {

    private readonly context: BrowserContext
    private static instance: OkxDex

    private constructor(ctx: BrowserContext) {
        this.context = ctx
    }

    public static getInstance(ctx: BrowserContext) {
        if (!OkxDex.instance) {
            OkxDex.instance = new OkxDex(ctx)
        }
        return OkxDex.instance
    }

    public async run(chain: string, fromToken: string, toToken: string) {
        const p = await this.context.newPage()
        await p.goto("https://www.okx.com/zh-hans/web3/dex-swap")
        await p.waitForTimeout(2000)
        this.context.on('page', () => {
            OkxWallet.getInstance(this.context).confirm()
        })
        let _id = await Promise.race([
            p.locator('.address-drop-container').waitFor().then(() => 1).catch(() => 1),
            p.getByRole('button', {name: "连接钱包"}).waitFor().then(() => 2).catch(() => 2)
        ])
        if (_id === 2) {
            await p.getByRole('button', {name: "连接钱包"}).click()
            await p.locator('#scroll-box').getByRole('button', { name: '连接钱包' }).click()
            await p.locator('.address-drop-container').waitFor({timeout: 30000})
        }

        await p.locator('div[data-monitor="chain"]').getByText("从").click()
        console.log('选择链')
        // 选择chain
        await p.getByTestId('moreChains').click()
        await p.getByPlaceholder("搜索", { exact: true }).fill(chain)
        await p.locator('.index_supported-chains__Na8BT > div').nth(0).click()
        console.log('选择fromToken')
        // 选择来源币
        await this.selectToken(fromToken, p)
        console.log("选择目标币")
        // 选择目标币
        await p.locator('div[data-monitor="chain"]').getByText("到").click()
        await this.selectToken(toToken, p)
        const fromTokenUpperCase = fromToken.toUpperCase()
        if (fromTokenUpperCase === 'ETH' || fromTokenUpperCase === 'MATIC' || fromTokenUpperCase === 'BNB' || fromToken === 'AVAX') {
            console.log('gas币')
            const balance = await this.getBalance(p)
            if (balance < 0.003) {
                console.log('gas不足0.003')
                return 
            }
            await p.locator('//*[@id="dex_right_part"]/div[1]/div[2]/div[1]/div[1]/div[2]/div/div[2]/div[1]/input[2]').fill(
                (balance * 0.8).toFixed(5)
            )
        } else {
            console.log('all-in')
            await p.waitForTimeout(2000)
            await p.getByTestId('all-btn').click()
        }
        await p.waitForTimeout(2000)
        _id = await Promise.race([
            p.getByRole("button", {name: '授权'}).waitFor().then(() => 1),
            p.getByRole("button", {name: '兑换'}).waitFor().then(() => 2)
        ])
        if (_id === 1) {
            await p.getByRole("button", {name: '授权'}).click()
            await p.getByRole("button", {name: '兑换'}).waitFor({timeout: 60000 * 2})
        }
        await p.getByRole("button", {name: '兑换'}).click()
        await p.getByRole("button", {name: '确认'}).click()
        // 等待完成
        await p.waitForSelector('#scroll-box > div > div > div.text-center.styles_status__6aCMO > button', {timeout: 60 * 1000 * 2})
    }

    private async selectToken(token: string, p: Page) {
        await p.getByTestId('search').fill(token)
        await p.waitForTimeout(3000)
        await p.getByTestId('tokenItem-box').first().click()
    }

    private async getBalance(p: Page) {
        const balanceText = await p.locator('//*[@id="dex_right_part"]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div').innerText()
        return parseFloat(balanceText)
    }
}