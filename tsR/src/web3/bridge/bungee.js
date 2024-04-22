"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bungee = void 0;
const okxWallet_1 = require("../../wallet/okxWallet");
class Bungee {
    context;
    static instance;
    constructor(ctx) {
        this.context = ctx;
    }
    static getInstance(ctx) {
        if (!Bungee.instance) {
            Bungee.instance = new Bungee(ctx);
        }
        return Bungee.instance;
    }
    async run(fromChain, toChain, fromToken, toToken) {
        this.context.on('page', () => {
            okxWallet_1.OkxWallet.getInstance(this.context).confirm();
        });
        const p = await this.context.newPage();
        await p.goto('http://www.bungee.exchange');
        // 连接钱包
        const walletConnected = p.getByRole('button', { name: '0x' });
        const connectWallet = p.getByRole('button', { name: 'Connect Wallet' }).first();
        let _id = await Promise.race([
            walletConnected.waitFor().then(() => 1),
            connectWallet.waitFor().then(() => 2)
        ]);
        if (_id === 2) {
            await connectWallet.click();
            await p.getByText('Okx Wallet').click();
        }
        // 选择来源
        await p.locator('//*[@id="__next"]/div/div/div/main/div[2]/div[2]/div/div[2]/div[1]/div[1]/div/button').click();
        await p.getByText(fromChain).click();
        // 选目标链
        await p.locator('//*[@id="__next"]/div/div/div/main/div[2]/div[2]/div/div[3]/div[1]/div[1]/div/button').click();
        await p.getByText(toChain).click();
        // 选来源币
        await p.locator('//*[@id="__next"]/div/div/div/main/div[2]/div[2]/div/div[2]/div[2]/span/button').click();
        this.selectToken(fromToken, p);
        // 选择目标币
        await p.locator('//*[@id="__next"]/div/div/div/main/div[2]/div[2]/div/div[3]/div[2]/div/span/button').click();
        this.selectToken(toToken, p);
        // await 交易
        await p.getByRole('button', { name: "Review Route" }).click();
        _id = await Promise.race([
            p.getByRole('button', { name: 'Switch Network' }).click().then(() => 1),
            p.getByRole('button', { name: 'Approve Transaction' }).click().then(() => 2),
            p.getByRole('button', { name: 'Bridge' }).click().then(() => 3)
        ]);
        if (_id === 1) {
            _id = await Promise.race([
                p.getByRole('button', { name: 'Approve Transaction' }).click().then(() => 2),
                p.getByRole('button', { name: 'Bridge' }).click().then(() => 3)
            ]);
            if (_id === 2) {
                await p.getByRole('button', { name: 'Bridge' }).click();
            }
        }
        // await 结果
        await p.getByText('Bridge Completed Successfully').waitFor({ timeout: 60 * 10 * 1000 });
        console.log('success');
    }
    async selectToken(token, p) {
        await p.getByPlaceholder('Search by name or paste address').fill(token);
        await p.locator('//*[@id="__next"]/div/div/div/main/div[2]/div[2]/div/div[3]/div[2]/div/div[2]/div/div/div[2]/button[1]').click();
    }
}
exports.Bungee = Bungee;
