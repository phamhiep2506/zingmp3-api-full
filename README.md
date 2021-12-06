# Zing Mp3 API

### Music Player Use ZingMp3 Api
[https://github.com/phamhiep2506/music-player](https://github.com/phamhiep2506/music-player)

### Demo
[https://music-player-pink.vercel.app](https://music-player-pink.vercel.app)

## Install
```bash
npm i zingmp3-api-full
```

```
const {
  getSong,
  getPlaylists,
  getTop100,
  getChartHome,
  getInfo,
  getLyric,
  getSearch
} = require("zingmp3-api-full");
```

## Usage

### Get Song
```javascript
getSong("ZU7C8FDU").then((data) => {
  console.log(data)
})
```

### Get Playlist
```javascript
getPlaylists("ZWZB969E").then((data) => {
  console.log(data)
})
```

### getTop100
```javascript
getTop100().then((data) => {
  console.log(data)
})
```

### getChartHome
```javascript
getChartHome().then((data) => {
  console.log(data)
})
```

### Get Song Info
```javascript
getInfo("ZU7C8FDU").then((data) => {
  console.log(data)
})
```

### Get lyric song
```javascript
getLyric("ZU7C8FDU").then((data) => {
  console.log(data)
})
```

### Search Song
```javascript
getSearch("son tung").then((data) => {
  console.log(data)
})
```