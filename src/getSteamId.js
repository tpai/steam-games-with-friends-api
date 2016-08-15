require('dotenv').config();

var Q = require('q');
var SteamApi = require('steam-api');

module.exports = function(vanityUrl) {
    var deferred = Q.defer();
    var user = new SteamApi.User(process.env.STEAM_KEY);
    user.ResolveVanityUrl(vanityUrl)
        .fail(function(err) {
            deferred.reject(new Error(err));
        })
        .done(function(steamId) {
            deferred.resolve({
                steamId
            });
        })
    return deferred.promise;
};
