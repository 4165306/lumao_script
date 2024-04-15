import type {BrowserContext, Page} from "@playwright/test";
import {OkxWallet} from "../../wallet/okxWallet";
import { getGasToken } from "../../helper/tokenHelper";
import { ChainType, TokenTypes } from "../../types/tokenType";

export class UniSwap {

    private readonly context: BrowserContext
    private static instance: UniSwap

    private constructor(ctx: BrowserContext) {
        this.context = ctx
    }

    public static getInstance(ctx: BrowserContext) {
        if (!UniSwap.instance) {
            UniSwap.instance = new UniSwap(ctx)
        }
        return UniSwap.instance
    }

    public async run(
        chain: ChainType,
        fromToken: TokenTypes,
        toToken: TokenTypes
    ) {
        const p = await this.context.newPage()
        const okxWallet = OkxWallet.getInstance(this.context)
        let canNextStep = false
        this.context.on('page', async () => {
            await okxWallet.confirm()
            canNextStep = true
        })
        await p.goto("https://app.uniswap.org/swap")
        try {
            await p.getByTestId("navbar-connect-wallet").click({timeout: 6000})
            await p.getByText("Okx Wallet").click()
            while(!canNextStep) {
                await p.waitForTimeout(2000)
            }
        }catch(e) {
            console.log("未找到连接钱包按钮")
            await p.waitForSelector('button[data-testid=web3-status-connected]', {timeout: 10000})
        }
        canNextStep = false
        // 等待连接成功
        await p.getByTestId("web3-status-connected").waitFor({timeout: 30000})
        console.log("连接成功, 正在选择网络")
        // 选择网络
        await this.selectNetwork(chain, p)
        // 选择代币
        // from
        await p.locator('#swap-currency-input').locator('.open-currency-select-button').click()
        await this.selectToken(fromToken, p)
        await p.waitForTimeout(3000)
        // to
        await p.locator('#swap-currency-output').locator('.open-currency-select-button').click()
        await this.selectToken(toToken, p)
        await p.waitForTimeout(3000)
        this.context.on('page', async () => {
            await okxWallet.confirm()
        })
        if (fromToken === getGasToken(chain)) {
            const balance = await this.getBalance(p)
            if (balance < 0.003) {
                console.log("金额小于0.003, 不执行交互")
                return 
            }
            await p.locator("#swap-currency-input").locator("input").fill((balance * 0.8).toFixed(5))
        } else {
            await p.getByText("总余额").click()
        }
        // 检测交换|批准并交换按钮
        await p.waitForSelector('#swap-button')
        await p.locator('#swap-button').click()
        // 等待交换结果信息
        await p.locator('#confirm-swap-or-send').click()
        console.log("持续监测是否交换成功")
        await p.getByTestId("pending-modal-content-title").waitFor({
            timeout: 60000
        })
        console.log("执行结束")
        return
    }

    private async selectNetwork(network: ChainType, p: Page) {
        await p.getByRole('button', { name: 'chain-selector' }).click()
        await p.getByTestId(`${network}-selector`).click()
        await p.waitForTimeout(1000)
    }


    private async selectToken(tokenName: string, p: Page) {
        await p.locator('#token-search-input').fill(tokenName)
        await p.waitForTimeout(3000)
        await p.getByTestId('currency-list-wrapper').locator('.jqxqw').first().click()
    }

    private async getBalance(p: Page) {
        const balanceNode = await p.locator("#swap-currency-input").getByTestId('balance-text').innerText()
        const balance = balanceNode.match(/\b\d+(\.\d+)?\b/)
        if (balance && balance[0]) {
            return parseFloat(balance[0])
        }
        return 0
    }
}