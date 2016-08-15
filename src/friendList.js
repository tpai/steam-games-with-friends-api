require('dotenv').config();

var _ = require('lodash');
var Q = require('q');
var SteamApi = require('steam-api');

module.exports = function(steamId) {
    var deferred = Q.defer();
    var user = new SteamApi.User(process.env.STEAM_KEY, steamId);
    user.GetFriendList()
        .fail(function(err) {
            deferred.reject(new Error(err));
        })
        .done(function(result) {
            deferred.resolve(_.map(result, function(res) {
                return {
                    steamId: res.steamId,
                    personaName: res.personaName,
                    profileUrl: res.profileUrl,
                    avatarFull: res.avatarFull
                }
            }));
        })
    return deferred.promise;
};
