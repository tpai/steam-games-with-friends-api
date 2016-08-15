var _ = require('lodash');
var Q = require('q');

module.exports = function(app) {
    app.use('/getSteamId/:vanityUrl', function(req, res) {
        Q.when(require('./src/getSteamId')(req.params.vanityUrl), function(result) {
            res.send(JSON.stringify(result));
        }, function(err) {
            res.send(JSON.stringify({}));
        });
    })
    app.use('/mostPlayedGames/:steamId', function(req, res) {
        var steamId = req.params.steamId;
        require('./src/mostPlayedGames')(steamId)
            .then(function(result) {
                res.send(JSON.stringify(result));
            });
    })
    app.use('/friendList/:steamId', function(req, res) {
        var steamId = req.params.steamId;
        require('./src/friendList')(steamId)
            .then(function(result) {
                res.send(JSON.stringify(result));
            });
    })
};
