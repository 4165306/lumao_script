"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBalance = exports.isGas = exports.getGasToken = void 0;
const config = {
    'Ethereum': "ETH",
    "Arbitrum": "ETH",
    "Avalanche": "AVAX",
    "BSC": "BNB",
    "Base": "ETH",
    "Optimism": "ETH",
    "Polygon": "MATIC",
    "Zksync": "ETH",
    "Linea": "ETH",
    "Scroll": "ETH"
};
function getGasToken(chain) {
    return config[chain];
}
exports.getGasToken = getGasToken;
function isGas(token) {
    const upperTokens = token.toUpperCase();
    const r = upperTokens === 'ETH' || upperTokens === "MATIC" || upperTokens === "BNB" || upperTokens === "APT" ||
        upperTokens === 'STRK' || upperTokens === 'FTM' || upperTokens === 'AVAX' || upperTokens === 'ETHEREUM';
    return r;
}
exports.isGas = isGas;
async function getBalance(selector) {
    const balanceText = (await selector.innerText()).replace(/\r|\n/g, "");
    const text = balanceText.match(/\b\d+(\.\d+)?\b/);
    console.log(balanceText);
    return parseFloat(text[0]);
}
exports.getBalance = getBalance;
