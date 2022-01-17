const puppeteer = require('puppeteer')

class PuppeteerService {

    constructor() {
        this.page = null;
        this.browser = null;
    }

    async initBrowser() {
        this.browser = await puppeteer.launch({
            headless: false,
            args: ['--start-maximized'],
            defaultViewport: {
                width: 1920,
                height: 1080
            }
        })
    }

    async getBrowser() {
        if (!this.browser || !this.browser.isConnected) {
            return await this.initBrowser()
        }
    }

    async goToPage(url) {
        await this.getBrowser();
        const pages = await this.browser.pages()
        this.page = pages[0]
        await this.page.goto(url);
    }

    async writeText(selector, text) {
        await this.page.waitForSelector(selector, { visible: true, timeout: 3000, })
        await this.page.type(selector, text)
    }

    async click(selector) {
        await this.page.waitForSelector(selector, { visible: true, timeout: 3000, })
        await this.page.click(selector)
    }
}

module.exports = new PuppeteerService()