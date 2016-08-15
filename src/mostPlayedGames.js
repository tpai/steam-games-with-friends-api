require('dotenv').config();

var _ = require('lodash');
var Q = require('q');
var SteamApi = require('steam-api');

module.exports = function(steamId) {
    var games = [];
    var qs = [];

    var deferred = Q.defer();
    var player = new SteamApi.Player(process.env.STEAM_KEY, steamId);
    var userStats = new SteamApi.UserStats(process.env.STEAM_KEY, steamId);
    player.GetOwnedGames('', true, false, [])
        .fail(function(err) {
            deferred.reject(new Error(err));
        })
        .done(function(result){
            if(result === undefined)return ;

            for(var i=0;i<result.length;i++) {
                var game = result[i];
                if(game.playtimeForever > 0) {
                    games.push({
                        appId: game.appId,
                        icon: game.icon,
                        name: game.name,
                        playTime: parseFloat((game.playtimeForever/60).toFixed(2), 10)
                    });
                    qs.push(require('./achsPercentage')(game.appId, steamId));
                }
            }
            Q.allSettled(qs).then(function(results) {
                _.map(results, function(val, key) {
                    _.assign(games[key], { achsPercentage: val.value || null });
                });
                deferred.resolve(_.reverse(_.sortBy(games, ['playTime'])));
            })
        })
    return deferred.promise;
};
