"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orca = void 0;
const okxWallet_1 = require("../../wallet/okxWallet");
class Orca {
    context;
    static instance;
    constructor(ctx) {
        this.context = ctx;
    }
    static getInstance(ctx) {
        if (!Orca.instance) {
            Orca.instance = new Orca(ctx);
        }
        return Orca.instance;
    }
    async run(chain, fromToken, toToken) {
        const p = await this.context.newPage();
        await p.goto("https://jup.ag/swap");
        this.context.on('page', () => {
            okxWallet_1.OkxWallet.getInstance(this.context).confirm();
        });
        await p.waitForTimeout(3000);
        const id = await Promise.race([
            p.getByText('Connect Wallet').waitFor().then(() => 1).catch(() => 1),
            p.getByText('Wallet Connected').waitFor().then(() => 2).catch(() => 2)
        ]);
        console.log('id', id);
        if (id === 1) {
            p.getByRole("button", { name: "Connect Wallet" }).first().click();
            await p.getByText('OKX Wallet').click();
            await p.getByText("Wallet Connected").waitFor({ timeout: 60000 });
        }
        console.log('连接成功');
        // 选择来源币
        await p.locator(".group\\/select").first().click();
        await this.selectToken(fromToken, p);
        // 选择目标币
        await p.locator(".group\\/select").nth(1).click();
        await this.selectToken(toToken, p);
        if (fromToken.toUpperCase() === 'SOL') {
            const balance = await this.getBalance(p);
            if (balance < 0.003) {
                console.log('gas不足');
                return;
            }
            await p.locator('input[name=fromValue]').fill((balance * 0.8).toFixed(5));
        }
        else {
            await p.getByRole("button", { name: 'MAX' }).click();
        }
        await p.getByRole("button", { name: 'swap' }).click();
        await p.getByText("Transaction Confirmed").waitFor({
            timeout: 120000
        });
        console.log('success');
    }
    async selectToken(token, p) {
        await p.getByPlaceholder('Search by token or paste address').fill(token);
        await p.waitForTimeout(3000);
        await p.locator('//*[@id="__next"]/div[3]/div[1]/div/div/div[4]/div/div/div/li[1]/div[1]').click();
    }
    async getBalance(p) {
        const balanceNode = await p.locator('//*[@id="__next"]/div[2]/div[2]/div/div[3]/form/div[1]/div[1]/div/div[1]/div[2]/span[1]').innerText();
        const balance = balanceNode.match(/\b\d+(\.\d+)?\b/);
        return parseFloat(balance[0]);
    }
}
exports.Orca = Orca;
