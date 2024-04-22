"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Raydium = void 0;
class Raydium {
    context;
    static instance;
    constructor(ctx) {
        this.context = ctx;
    }
    async run(chain, fromToken, toToken) {
        const p = await this.context.newPage();
        await p.goto("https://raydium.io/swap/");
        await p.getByRole('button', { name: 'Connect Wallet' }).first().click();
        await p.getByText('OKX Wallet').click();
        // 等待连接成功
        await p.getByText('Enter an amount').waitFor({ timeout: 30000 });
        // 选择来源代币
        await p.locator('.clickable-mask-offset-2').nth(0).click();
        // 判断是否为SOl
        if (fromToken.toUpperCase() === "SOL") {
            const balance = await this.getBalance(p);
            if (balance < 0.003) {
                console.log("代币不足");
                return;
            }
            // gas的80%
            await p.locator('input:not([readonly])').fill((balance * 0.8).toFixed(5));
        }
        else {
            // 点max
            await p.getByRole('button', { name: 'MAX' }).first().click();
        }
        // 等swap
    }
    async selectToken(token, p) {
        await p.getByLabel('input for searching coins').fill('SOL');
        await p.locator('.List > div').first().click();
    }
    async getBalance(p) {
        const balanceText = await p.locator('//*[@id="__next"]/div/div[1]/main/div/div[2]/div/div/div[1]/div[1]/div[2]').innerText();
        const balance = balanceText.match(/\b\d+(\.\d+)?\b/);
        return parseFloat(balance[0]);
    }
}
exports.Raydium = Raydium;
