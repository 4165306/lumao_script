import { Locator, Page } from "@playwright/test";

export class PlaywrightHelper {

    public static async waitLocators(p: Page, locators: Locator[]): Promise<Number> {
        const promises = locators.map((locator: Locator) => locator.waitFor());
        const index: Number = await Promise.race(promises.map((p, i) => p.then(() => i)));
        return index;
    }
}