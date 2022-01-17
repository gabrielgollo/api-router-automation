const ZTEPage = require('../services/pages-automated/ZTE');

class routerZTEController {
    static async changeChannel(req, res) {
        try {
            // Get the channel from the request
            const response = await ZTEPage.changeChannel();

            res.status(200).json({
                message: response.message
            })

        } catch (error) {
            res.status(error?.status || 500).json({
                message: error?.message
            })
        }
    }
}

module.exports = routerZTEController