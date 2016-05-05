var api = {
    "get": function (req, res, next) {
        req.azureMobile.user.getIdentity().then((data) => {
            res.status(200).type('application/json').json(data);
        }).catch((error) => {
            res.status(500).send(JSON.stringify(error));
        });
    }
};

api.access = 'authenticated';

module.exports = api;