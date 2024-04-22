"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const syncswap_1 = require("./src/web3/dex/syncswap");
(async () => {
    const bc = await test_1.chromium.connectOverCDP("http://192.168.2.132:57471");
    const ctx = bc.contexts()[0];
    syncswap_1.Syncswap.getInstance(ctx).run('Linea', 'USDC', 'ETH');
})();
