var api = {
    get: function (request, response, next) {
        var user = request.user;
        user.getIdentities({
        success: function(identities) {
            var accessToken = identities.microsoft.accessToken;
            var url = 'https://apis.live.net/v5.0/me/?method=GET&access_token=' + accessToken;
            var requestCallback = function (err, resp, body) {
                if (err || resp.statusCode !== 200) {
                    console.error('Error sending data to the provider: ', err);
                    response.send(statusCodes.INTERNAL_SERVER_ERROR, body);
                } else {
                    try {
                        var userData = JSON.parse(body);
                        response.send(200, userData);
                    } catch (ex) {
                        console.error('Error parsing response from the provider API: ', ex);
                        response.send(statusCodes.INTERNAL_SERVER_ERROR, ex);
                    }
                }
            }
            var req = require('request');
            var reqOptions = {
                uri: url,
                headers: { Accept: "application/json" }
            };
            req(reqOptions, requestCallback);
        }
    });

    }
};
// All methods must be authenticated.
api.access = 'authenticated';

module.exports = api;