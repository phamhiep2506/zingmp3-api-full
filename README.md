# Zing Mp3 API

### Music Player Use ZingMp3 Api
[https://github.com/phamhiep2506/music-player](https://github.com/phamhiep2506/music-player)

### Demo
[https://music-player-pink.vercel.app](https://music-player-pink.vercel.app)

### ⚠️ Please create server use module **zingmp3-api-full** + **Node.js** + **Express.js**

### Based module [ZingMp3API](https://github.com/whoant/ZingMp3API). Thank whoant 😘

## Installation
```bash
npm i zingmp3-api-full
```

```bash
const {
  getSong,
  getDetailPlaylist,
  getTop100,
  getChartHome,
  getInfoSong,
  getLyric,
  search
} = require("zingmp3-api-full")
```

or

```bash
const ZingMp3 = require("zingmp3-api-full")
```

## Usage

### How to get song ID? you can read my [post](https://vovanhoangtuan.medium.com/t%C3%B4i-%C4%91%C3%A3-l%E1%BA%A5y-api-zingmp3-nh%C6%B0-th%E1%BA%BF-n%C3%A0o-55f5fa555eda).

Example:

> https://zingmp3.vn/api/v2/song/get/streaming?id=ZOACFBBU&ctime=1641375546&version=1.5.4&sig=f9ecb61628fad98d3d5d04fa40d3246af6817b2bab1a52674cf218770637497308060f943b0677318754cf2099564689ab1163c31bd2682aa94905804369dc23&apiKey=88265e23d4284f25963e6eedac8fbfa3

=> ID: ZOACFBBU

### Get Song
```javascript
getSong("ZOACFBBU").then((data) => {
  console.log(data)
})
```
or
```javascript
ZingMp3.getSong("ZOACFBBU").then((data) => {
  console.log(data)
})
```

### Get getDetailPlaylist
```javascript
getDetailPlaylist("ZWZB969E").then((data) => {
  console.log(data)
})
```
or
```javascript
ZingMp3.getDetailPlaylist("ZWZB969E").then((data) => {
  console.log(data)
})
```

### getTop100
```javascript
getTop100().then((data) => {
  console.log(data)
})
```
or
```javascript
ZingMp3.getTop100().then((data) => {
  console.log(data)
})
```

### getChartHome
```javascript
getChartHome().then((data) => {
  console.log(data)
})
```
or
```javascript
ZingMp3.getChartHome().then((data) => {
  console.log(data)
})
```

### Get Song Info
```javascript
getInfoSong("ZOACFBBU").then((data) => {
  console.log(data)
})
```
or
```javascript
ZingMp3.getInfoSong("ZOACFBBU").then((data) => {
  console.log(data)
})
```

### Get lyric song
```javascript
getLyric("ZOACFBBU").then((data) => {
  console.log(data)
})
```
or
```javascript
ZingMp3.getLyric("ZOACFBBU").then((data) => {
  console.log(data)
})
```

### Search Song
```javascript
search("son tung mtp").then((data) => {
  console.log(data)
})
```
or
```javascript
ZingMp3.search("son tung mtp").then((data) => {
  console.log(data)
})
```