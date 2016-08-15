# Steam Games With Friends

One table contains your steam games with friends include play time and achievement percentage.

## Instructions

```
# install nodemon
npm i -g nodemon

# install dependencies
npm i

# start develop
npm run dev

# run api server
npm start
```

## API

**GET /getSteamId/:vanityUrl**

```
{
    steamId: (string)
}
```

**GET /mostPlayedGames/:steamId**

```
{
    appId: (int),
    icon: (string),
    name: (string),
    playTime: (float),
    achsPercentage: (float)
}
```

**GET /friendList/:steamId**

```
{
    steamId: (string),
    personaName: (string),
    profileUrl: (string),
    avatarFull: (string)
}
```
