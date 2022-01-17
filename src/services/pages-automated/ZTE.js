const Exception = require('../../helper/exception');
const PuppeteerService = require('../puppeteer')

const { ZTE_USERNAME = '', ZTE_PASSWORD = '', ZTE_GATEWAY_SERVER_ADDRESS = 'localhost' } = process.env;

class ZTEPage {
    static async loginPage() {
        await PuppeteerService.goToPage(`http://${ZTE_GATEWAY_SERVER_ADDRESS}`);
        await PuppeteerService.writeText("#Frm_Username", ZTE_USERNAME);
        await PuppeteerService.writeText("#Frm_Password", ZTE_PASSWORD);
        await PuppeteerService.click("#LoginId");
    }

    static async changeChannel() {
        await this.loginPage();

        // Navigate to the channel page
        await PuppeteerService.page.waitForTimeout(2000);
        await PuppeteerService.click("#localnet");
        await PuppeteerService.click("#wlanConfig");
        await PuppeteerService.click("#WlanBasicAdConfBar");
        await PuppeteerService.page.waitForTimeout(2000);

        let hasError = null;
        await PuppeteerService.page.evaluate(() => {
            debugger
            const selectElement = document.querySelector("#UI_Channel\\:0")
            const currentValue = document.querySelector("#Channel\\:0").value;
            const options = selectElement.children;
            const alternatesValues = ['5', '6']
            for (const option of options) {
                if (alternatesValues.includes(option.value)) {
                    if (option.value != currentValue) {
                        selectElement.value = option.value;
                        selectElement.dispatchEvent(new Event('change', { bubbles: true, cancelable: false }));
                        return true;
                    }
                }
            }
            hasError = { message: "Invalid channel value", statusCode: 400 };
        })

        if (hasError) {
            throw new Exception(hasError.message, hasError.statusCode);
        }

        // Click to Apply!
        await PuppeteerService.click("#Btn_apply_WlanBasicAdConf\\:0")

        await PuppeteerService.page.waitForTimeout(2000);
        await PuppeteerService.browser.close()

        return {
            message: 'Successfully changed channel!',
            statusCode: 200
        };
    }
}

module.exports = ZTEPage;