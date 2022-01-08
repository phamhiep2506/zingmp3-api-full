const {
  getSong,
  getDetailPlaylist,
  getHome,
  getTop100,
  getChartHome,
  getNewReleaseChart,
  getInfoSong,
  getArtist,
  getLyric,
  search,
  getListMV,
  getCategoryMV
} = require("./dist/index")

getNewReleaseChart().then((data) => {
  console.log(data)
})
