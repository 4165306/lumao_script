import { BrowserContext, Page } from "@playwright/test"
import { ChainType, TokenTypes } from "../../types/tokenType"
import { OkxWallet } from "../../wallet/okxWallet"
import { getGasToken, isGas } from "../../helper/tokenHelper"
import { PlaywrightHelper } from "../../helper/playwrightHelper"

const chainMapping: Record<ChainType, string> = {
    Ethereum: "Ethereum",
    Arbitrum: "Arbitrum One",
    Base: "Base",
    Optimism: "Optimism",
    Polygon: "Polygon zkEVM",
    BSC: "BSC",
    Avalanche: "Avalanche",
    Zksync: "zkSync Era",
    Linea: "Linea",
    Scroll: "Scroll"
}

export class Pancake {
    private readonly context: BrowserContext
    private static instance: Pancake

    private constructor(ctx: BrowserContext) {
        this.context = ctx
    }

    public static getInstance(ctx: BrowserContext) {
        if (!Pancake.instance) {
            Pancake.instance = new Pancake(ctx)
        }
        return Pancake.instance
    }

    public async run(chain: string, fromToken: TokenTypes, toToken: TokenTypes) {
        const p = await this.context.newPage()
        await p.goto("https://pancakeswap.finance/swap")
        this.context.on('page', () => {
            OkxWallet.getInstance(this.context).confirm()
        })
        const idx = await PlaywrightHelper.waitLocators(p, [
            p.locator('#swap-page').getByRole('button', { name: 'Connect Wallet' }),
            p.locator('div[title^="0x"]')
        ])
        console.log("判断idx", idx)
        if (idx === 0) {
            p.locator('#swap-page').getByRole('button', { name: 'Connect Wallet' }).click()
            await p.waitForTimeout(1500)
            p.getByText('Metamask', { exact: true }).click()
        }
        // 判断连接成功的标识
        await p.locator('div[title^="0x"]').waitFor()
        // 切换网络
        await this.selectNetwork(chain, p)
        const currentFromToken = await p.locator('#pair').nth(0).innerText()
        if (currentFromToken.toUpperCase() !== fromToken.toUpperCase()) {
            // 选币
            await p.locator('#pair').nth(0).click()
            await this.selectToken(fromToken,p)
        }
        const balanceNode = await p.locator('div[data-dd-action-name="Token balance"]').first().innerText()
        const balances = balanceNode.match(/\b\d+(\.\d+)?\b/) as RegExpMatchArray
        const balance = parseFloat(balances[0])
        if (isGas(fromToken)) {
            if (balance < 0.003) {
                console.log("gas余额不足，不执行")
                return
            }
            await p.locator('#swap-currency-input > div._1a5xov70._1qhetbf6._1qhetbf16._1qhetbf46._1qhetbf6i._1qhetbf2sn._1qhetbf1rc > label > div._1a5xov70._1qhetbf1ii._1qhetbf1di._1qhetbf1g6._1qhetbf6._1qhetbf1c._1qhetbf46._1qhetbf34n._1qhetbf1k6._1qhetbf2b6 > input').fill(
                (balance * 0.8).toFixed(5)
            )
        } else {
            await p.locator('div[data-dd-action-name="Token balance"]').first().click()
        }
        // 选择目标币
        const currentToToken = await p.locator('#pair').nth(1).innerText()
        if (currentToToken.toUpperCase() !== toToken.toUpperCase()) {
            // 选币
            await p.locator('#pair').nth(1).click()
            this.selectToken(toToken,p)
        }
        await p.locator("#swap-button").click()
        await p.locator('#confirm-swap-or-send').click()
        await Promise.race([
            p.getByText('View on zkExplorer').waitFor({timeout: 60000}),
            p.getByText('Transaction receipt').click()
        ])
        console.log("success")
    }

    private async selectNetwork(chain: string, p: Page) {
        await p.locator('#__next > div.sc-jQXlCi.ddheVu._1a5xov70._1qhetbf15c._1qhetbf16k > div.sc-fcdPlE.gCfBQK > nav > div.sc-eDnVMP.sc-gKHVLF.crHFAV.cDDWNX > div:nth-child(5) > div > div.sc-eDnVMP.sc-gKHVLF.sc-fHKCsJ.gkVgsf.UlmxL.bPFNQT').hover()
        await p.waitForTimeout(1000)
        await p.getByRole("button", {name: chain}).click({ force: true })
    }

    private async selectToken(token: TokenTypes, p: Page) {
        // 选币
        await p.getByPlaceholder('Search name or paste address').fill(token)
        await p.waitForTimeout(3000)
        await p.locator('//*[@id="portal-root"]/div/div/div[2]/div[2]/div[2]/div/div/div[1]').click()
        await p.waitForTimeout(3000)
        try {
            await p.locator('//*[@id="portal-root"]/div/div/div[2]/div[1]/button').click({timeout: 3000})
        }catch(e) {

        }
    }
}