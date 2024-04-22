"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaywrightHelper = void 0;
class PlaywrightHelper {
    static async waitLocators(p, locators) {
        const promises = locators.map((locator) => locator.waitFor());
        const index = await Promise.race(promises.map((p, i) => p.then(() => i)));
        return index;
    }
}
exports.PlaywrightHelper = PlaywrightHelper;
