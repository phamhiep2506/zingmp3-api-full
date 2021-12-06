# Zing Mp3 API

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
  getInfo
} = require("zingmp3-api-full");
```

## Usage

### Get Song
```javascript
getSong("ZU7C8FDU", (data) => {
  console.log(data)
})
```

### Get Playlist
```javascript
getPlaylists("ZWZB969E", (data) => {
  console.log(data)
})
```

### getTop100
```javascript
getTop100((data) => {
  console.log(data)
})
```
### getChartHome
```javascript
getChartHome((data) => {
  console.log(data)
})
```

### Get Song Info
```javascript
getInfo("ZU7C8FDU", (data) => {
  console.log(data)
})
```