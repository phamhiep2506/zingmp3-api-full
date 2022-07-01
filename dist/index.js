"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZingMp3 = void 0;
const axios_1 = __importDefault(require("axios"));
const crypto_1 = __importDefault(require("crypto"));
class ZingMp3Api {
    constructor(VERSION, URL, SECRET_KEY, API_KEY, CTIME) {
        this.VERSION = VERSION;
        this.URL = URL;
        this.SECRET_KEY = SECRET_KEY;
        this.API_KEY = API_KEY;
        this.CTIME = CTIME;
    }
    getHash256(str) {
        return crypto_1.default.createHash("sha256")
            .update(str)
            .digest("hex");
    }
    getHmac512(str, key) {
        let hmac = crypto_1.default.createHmac("sha512", key);
        return hmac.update(Buffer.from(str, "utf8"))
            .digest("hex");
    }
    hashParamNoId(path) {
        return this.getHmac512(path + this.getHash256(`ctime=${this.CTIME}version=${this.VERSION}`), this.SECRET_KEY);
    }
    hashParam(path, id) {
        return this.getHmac512(path + this.getHash256(`ctime=${this.CTIME}id=${id}version=${this.VERSION}`), this.SECRET_KEY);
    }
    hashParamHome(path) {
        return this.getHmac512(path + this.getHash256(`count=30ctime=${this.CTIME}page=1version=${this.VERSION}`), this.SECRET_KEY);
    }
    hashCategoryMV(path, id, type) {
        return this.getHmac512(path + this.getHash256(`ctime=${this.CTIME}id=${id}type=${type}version=${this.VERSION}`), this.SECRET_KEY);
    }
    hashListMV(path, id, type, page, count) {
        return this.getHmac512(path +
            this.getHash256(`count=${count}ctime=${this.CTIME}id=${id}page=${page}type=${type}version=${this.VERSION}`), this.SECRET_KEY);
    }
    getCookie() {
        return new Promise((resolve, rejects) => {
            axios_1.default.get(`${this.URL}`)
                .then((res) => {
                // TODO: Skip Error Object is possibly 'undefined'
                if (res.headers["set-cookie"]) {
                    res.headers["set-cookie"].map((element, index) => {
                        if (index == 1) {
                            resolve(element); // return cookie
                        }
                    });
                }
            })
                .catch((err) => {
                rejects(err); // return error value if any
            });
        });
    }
    requestZingMp3(path, qs) {
        return new Promise((resolve, rejects) => {
            // Config axios request default URL "https://zingmp3.vn"
            const client = axios_1.default.create({
                baseURL: `${this.URL}`,
            });
            client.interceptors.response.use((res) => res.data); // setting axios response data
            this.getCookie()
                .then((cookie) => {
                // request
                client.get(path, {
                    headers: {
                        Cookie: `${cookie}`,
                    },
                    params: Object.assign(Object.assign({}, qs), { ctime: this.CTIME, version: this.VERSION, apiKey: this.API_KEY })
                })
                    .then((res) => {
                    resolve(res);
                })
                    .catch((err) => {
                    rejects(err);
                });
            })
                .catch((err) => {
                console.log(err);
            });
        });
    }
    // getSong
    getSong(songId) {
        return new Promise((resolve, rejects) => {
            this.requestZingMp3("/api/v2/song/get/streaming", {
                id: songId,
                sig: this.hashParam("/api/v2/song/get/streaming", songId)
            })
                .then((res) => {
                resolve(res);
            })
                .catch((err) => {
                rejects(err);
            });
        });
    }
    // getDetailPlaylist
    getDetailPlaylist(playlistId) {
        return new Promise((resolve, rejects) => {
            this.requestZingMp3("/api/v2/page/get/playlist", {
                id: playlistId,
                sig: this.hashParam("/api/v2/page/get/playlist", playlistId)
            })
                .then((res) => {
                resolve(res);
            })
                .catch((err) => {
                rejects(err);
            });
        });
    }
    // getHome
    getHome() {
        return new Promise((resolve, rejects) => {
            this.requestZingMp3("/api/v2/page/get/home", {
                page: 1,
                segmentId: "-1",
                count: "30",
                sig: this.hashParamHome("/api/v2/page/get/home")
            })
                .then((res) => {
                resolve(res);
            })
                .catch((err) => {
                rejects(err);
            });
        });
    }
    // getTop100
    getTop100() {
        return new Promise((resolve, rejects) => {
            this.requestZingMp3("/api/v2/page/get/top-100", {
                sig: this.hashParamNoId("/api/v2/page/get/top-100")
            })
                .then((res) => {
                resolve(res);
            })
                .catch((err) => {
                rejects(err);
            });
        });
    }
    // getChartHome
    getChartHome() {
        return new Promise((resolve, rejects) => {
            this.requestZingMp3("/api/v2/page/get/chart-home", {
                sig: this.hashParamNoId("/api/v2/page/get/chart-home")
            })
                .then((res) => {
                resolve(res);
            })
                .catch((err) => {
                rejects(err);
            });
        });
    }
    // getNewReleaseChart
    getNewReleaseChart() {
        return new Promise((resolve, rejects) => {
            this.requestZingMp3("/api/v2/page/get/newrelease-chart", {
                sig: this.hashParamNoId("/api/v2/page/get/newrelease-chart")
            })
                .then((res) => {
                resolve(res);
            })
                .catch((err) => {
                rejects(err);
            });
        });
    }
    // getInfoSong
    getInfoSong(songId) {
        return new Promise((resolve, rejects) => {
            this.requestZingMp3("/api/v2/song/get/info", {
                id: songId,
                sig: this.hashParam("/api/v2/song/get/info", songId)
            })
                .then((res) => {
                resolve(res);
            })
                .catch((err) => {
                rejects(err);
            });
        });
    }
    getListArtistSong(artistId, page, count) {
        return new Promise((resolve, rejects) => {
            this.requestZingMp3("/api/v2/song/get/list", {
                id: artistId,
                type: "artist",
                page: page,
                count: count,
                sort: "new",
                sectionId: "aSong",
                sig: this.hashListMV("/api/v2/song/get/list", artistId, "artist", page, count)
            })
                .then((res) => {
                resolve(res);
            })
                .catch((err) => {
                rejects(err);
            });
        });
    }
    // getArtist
    getArtist(name) {
        return new Promise((resolve, rejects) => {
            this.requestZingMp3("/api/v2/page/get/artist", {
                alias: name,
                sig: this.hashParamNoId("/api/v2/page/get/artist")
            })
                .then((res) => {
                resolve(res);
            })
                .catch((err) => {
                rejects(err);
            });
        });
    }
    // getLyric
    getLyric(songId) {
        return new Promise((resolve, rejects) => {
            this.requestZingMp3("/api/v2/lyric/get/lyric", {
                id: songId,
                sig: this.hashParam("/api/v2/lyric/get/lyric", songId)
            })
                .then((res) => {
                resolve(res);
            })
                .catch((err) => {
                rejects(err);
            });
        });
    }
    // search
    search(name) {
        return new Promise((resolve, rejects) => {
            this.requestZingMp3("/api/v2/search/multi", {
                q: name,
                sig: this.hashParamNoId("/api/v2/search/multi")
            })
                .then((res) => {
                resolve(res);
            })
                .catch((err) => {
                rejects(err);
            });
        });
    }
    // getListMV
    getListMV(id, page, count) {
        return new Promise((resolve, rejects) => {
            this.requestZingMp3("/api/v2/video/get/list", {
                id: id,
                type: "genre",
                page: page,
                count: count,
                sort: "listen",
                sig: this.hashListMV("/api/v2/video/get/list", id, "genre", page, count),
            })
                .then((res) => {
                resolve(res);
            })
                .catch((err) => {
                rejects(err);
            });
        });
    }
    // getCategoryMV
    getCategoryMV(id) {
        return new Promise((resolve, rejects) => {
            this.requestZingMp3("/api/v2/genre/get/info", {
                id: id,
                type: "video",
                sig: this.hashCategoryMV("/api/v2/genre/get/info", id, "video"),
            })
                .then((res) => {
                resolve(res);
            })
                .catch((err) => {
                rejects(err);
            });
        });
    }
    // getVideo
    getVideo(videoId) {
        return new Promise((resolve, rejects) => {
            this.requestZingMp3("/api/v2/page/get/video", {
                id: videoId,
                sig: this.hashParam("/api/v2/page/get/video", videoId),
            })
                .then((res) => {
                resolve(res);
            })
                .catch((err) => {
                rejects(err);
            });
        });
    }
} // END
// instance default
exports.ZingMp3 = new ZingMp3Api("1.6.34", // VERSION
"https://zingmp3.vn", // URL
"2aa2d1c561e809b267f3638c4a307aab", // SECRET_KEY
"88265e23d4284f25963e6eedac8fbfa3", // API_KEY
String(Math.floor(Date.now() / 1000)) // CTIME
);
//# sourceMappingURL=index.js.map