require('dotenv').config();

var _ = require('lodash');
var Q = require('q');
var SteamApi = require('steam-api');

module.exports = function(appId, steamId) {
    var deferred = Q.defer();
    var userStats = new SteamApi.UserStats(process.env.STEAM_KEY, steamId);
    userStats.GetPlayerAchievements(appId)
        .fail(function(err) {
            deferred.reject(new Error(err));
        })
        .done(function(achs) {
            if(achs === undefined)return ;

            deferred.resolve(
                parseFloat((_.filter(achs, ach => ach.achieved === 1).length/achs.length * 100).toFixed(2), 10)
            );
        })
    return deferred.promise;
};
