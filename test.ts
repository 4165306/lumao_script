import {chromium} from "@playwright/test";
import { getBalance } from "./src/helper/tokenHelper";
import { ChromePlugin } from "./src/browser/ChromePlugin";
(async () => {
    const bc = await chromium.connectOverCDP("http://192.168.2.132:57471");
    const ctx = bc.contexts()[0]
})()