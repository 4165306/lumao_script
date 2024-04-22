"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pancake = void 0;
const okxWallet_1 = require("../../wallet/okxWallet");
const tokenHelper_1 = require("../../helper/tokenHelper");
const playwrightHelper_1 = require("../../helper/playwrightHelper");
const chainMapping = {
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
};
class Pancake {
    context;
    static instance;
    constructor(ctx) {
        this.context = ctx;
    }
    static getInstance(ctx) {
        if (!Pancake.instance) {
            Pancake.instance = new Pancake(ctx);
        }
        return Pancake.instance;
    }
    async run(chain, fromToken, toToken) {
        const p = await this.context.newPage();
        await p.goto("https://pancakeswap.finance/swap");
        this.context.on('page', () => {
            okxWallet_1.OkxWallet.getInstance(this.context).confirm();
        });
        const idx = await playwrightHelper_1.PlaywrightHelper.waitLocators(p, [
            p.locator('#swap-page').getByRole('button', { name: 'Connect Wallet' }),
            p.locator('div[title^="0x"]')
        ]);
        console.log("判断idx", idx);
        if (idx === 0) {
            p.locator('#swap-page').getByRole('button', { name: 'Connect Wallet' }).click(),
                p.getByText('Metamask', { exact: true });
        }
        // 判断连接成功的标识
        await p.locator('div[title^="0x"]').waitFor();
        // 切换网络
        await this.selectNetwork(chain, p);
        const currentFromToken = await p.locator('#pair').nth(0).innerText();
        if (currentFromToken.toUpperCase() !== fromToken.toUpperCase()) {
            // 选币
            await p.locator('#pair').nth(0).click();
            this.selectToken(fromToken, p);
        }
        const balanceNode = await p.locator('div[data-dd-action-name="Token balance"]').first().innerText();
        const balances = balanceNode.match(/\b\d+(\.\d+)?\b/);
        const balance = parseFloat(balances[0]);
        if ((0, tokenHelper_1.getGasToken)(chain) === fromToken) {
            if (balance < 0.003) {
                console.log("gas余额不足，不执行");
                return;
            }
            await p.locator('#swap-currency-input > div._1a5xov70._1qhetbf6._1qhetbf16._1qhetbf46._1qhetbf6i._1qhetbf2sn._1qhetbf1rc > label > div._1a5xov70._1qhetbf1ii._1qhetbf1di._1qhetbf1g6._1qhetbf6._1qhetbf1c._1qhetbf46._1qhetbf34n._1qhetbf1k6._1qhetbf2b6 > input').fill((balance * 0.8).toFixed(5));
        }
        else {
            await p.locator('div[data-dd-action-name="Token balance"]').first().click();
        }
        // 选择目标币
        const currentToToken = await p.locator('#pair').nth(1).innerText();
        if (currentToToken.toUpperCase() !== toToken.toUpperCase()) {
            // 选币
            await p.locator('#pair').nth(1).click();
            this.selectToken(toToken, p);
        }
        await p.locator("#swap-button").click();
        await p.locator('#confirm-swap-or-send').click();
        await Promise.race([
            p.getByText('View on zkExplorer').waitFor({ timeout: 60000 }),
            p.getByText('Transaction receipt').click()
        ]);
        console.log("success");
    }
    async selectNetwork(chain, p) {
        await p.locator('#__next > div.sc-jQXlCi.ddheVu._1a5xov70._1qhetbf15c._1qhetbf16k > div.sc-fcdPlE.gCfBQK > nav > div.sc-eDnVMP.sc-gKHVLF.crHFAV.cDDWNX > div:nth-child(5) > div > div.sc-eDnVMP.sc-gKHVLF.sc-fHKCsJ.gkVgsf.UlmxL.bPFNQT').hover();
        await p.waitForTimeout(1000);
        await p.getByRole("button", { name: chainMapping[chain] }).click({ force: true });
    }
    async selectToken(token, p) {
        // 选币
        await p.locator('#token-search-input').fill(token);
        await p.waitForTimeout(3000);
        await p.locator("#portal-root > div > div > div.sc-hLclGa.sc-fEyylQ.sc-lirSmk.kkKarq.cBDyZR.LbaFz > div.sc-eDnVMP.sc-gKHVLF.sc-fnOeiS.sc-cuGlHX.gkVgsf.UlmxL.jaVbxd.dWxNOu > div.sc-eDnVMP.cTpFRg > div > div > div:nth-child(1)").click();
        await p.locator('#portal-root > div > div > div.sc-hLclGa.sc-fEyylQ.sc-lirSmk.kkKarq.cBDyZR.LbaFz > div.sc-eDnVMP.sc-gKHVLF.sc-ksJisA.gkVgsf.UlmxL.gdfwyx > button').click();
    }
}
exports.Pancake = Pancake;
