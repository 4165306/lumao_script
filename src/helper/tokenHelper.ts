import { Locator } from "@playwright/test";
import { ChainType, GasTokens } from "../types/tokenType";

const config: Record<ChainType, GasTokens> = {
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
}
export function getGasToken(chain: ChainType) {
    return config[chain]
}

export function isGas(token: string): boolean {
    const upperTokens = token.toUpperCase()
    const r =  
        upperTokens === 'ETH' || upperTokens === "MATIC" || upperTokens === "BNB" || upperTokens === "APT" ||
        upperTokens === 'STRK' || upperTokens === 'FTM' || upperTokens === 'AVAX'
        return r
}

export async function getBalance(selector: Locator) {
    const balanceText = ((await selector.innerText()) as string).replace(/\r|\n/g, "")
    const text = balanceText.match(/\b\d+(\.\d+)?\b/) as RegExpMatchArray
    console.log(balanceText)
    return parseFloat(text[0])
}