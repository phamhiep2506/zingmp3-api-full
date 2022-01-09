"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideo = exports.getCategoryMV = exports.getListMV = exports.search = exports.getLyric = exports.getArtist = exports.getInfoSong = exports.getNewReleaseChart = exports.getChartHome = exports.getTop100 = exports.getHome = exports.getDetailPlaylist = exports.getSong = void 0;
const axios = require("axios");
const crypto = require("crypto");
const VERSION = "1.5.4";
const URL = "https://zingmp3.vn";
const SECRET_KEY = "2aa2d1c561e809b267f3638c4a307aab";
const API_KEY = "88265e23d4284f25963e6eedac8fbfa3";
const CTIME = String(Math.floor(Date.now() / 1000));
const getHash256 = (a) => {
    return crypto.createHash("sha256").update(a).digest("hex");
};
const getHmac512 = (str, key) => {
    let hmac = crypto.createHmac("sha512", key);
    return hmac.update(Buffer.from(str, "utf8")).digest("hex");
};
const hashParam = (path, id) => {
    if (id == undefined) {
        return getHmac512(path + getHash256(`ctime=${CTIME}version=${VERSION}`), SECRET_KEY);
    }
    else {
        return getHmac512(path + getHash256(`ctime=${CTIME}id=${id}version=${VERSION}`), SECRET_KEY);
    }
};
const hashParamHome = (path, page) => {
    return getHmac512(path + getHash256(`ctime=${CTIME}page=${page}version=${VERSION}`), SECRET_KEY);
};
const hashParamMV = (path, id, type, page, count) => {
    if (count == undefined && page == undefined) {
        return getHmac512(path + getHash256(`ctime=${CTIME}id=${id}type=${type}version=${VERSION}`), SECRET_KEY);
    }
    else {
        return getHmac512(path +
            getHash256(`count=${count}ctime=${CTIME}id=${id}page=${page}type=${type}version=${VERSION}`), SECRET_KEY);
    }
};
const getCookie = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let res = yield axios.get(`${URL}`);
        return res.headers["set-cookie"][1];
    }
    catch (err) {
        console.error(err);
    }
});
const client = axios.create({
    baseURL: `${URL}`,
});
client.interceptors.response.use((res) => res.data); // setting axiosresponse data
const requestZingMp3 = (path, qs) => __awaiter(void 0, void 0, void 0, function* () {
    let cookie = yield getCookie();
    try {
        let res = yield client.get(path, {
            headers: {
                Cookie: `${cookie}`,
            },
            params: Object.assign(Object.assign({}, qs), { ctime: CTIME, version: VERSION, apiKey: API_KEY }),
        });
        return res;
    }
    catch (err) {
        console.error(err);
    }
});
const getSong = (songId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield requestZingMp3("/api/v2/song/get/streaming", {
        id: songId,
        sig: hashParam("/api/v2/song/get/streaming", songId),
    });
});
exports.getSong = getSong;
const getDetailPlaylist = (playlistId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield requestZingMp3("/api/v2/page/get/playlist", {
        id: playlistId,
        sig: hashParam("/api/v2/page/get/playlist", playlistId),
    });
});
exports.getDetailPlaylist = getDetailPlaylist;
const getHome = (page) => __awaiter(void 0, void 0, void 0, function* () {
    return yield requestZingMp3("/api/v2/page/get/home", {
        page: page,
        segmentId: "-1",
        sig: hashParamHome("/api/v2/page/get/home", page),
    });
});
exports.getHome = getHome;
const getTop100 = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield requestZingMp3("/api/v2/page/get/top-100", {
        sig: hashParam("/api/v2/page/get/top-100"),
    });
});
exports.getTop100 = getTop100;
const getChartHome = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield requestZingMp3("/api/v2/page/get/chart-home", {
        sig: hashParam("/api/v2/page/get/chart-home"),
    });
});
exports.getChartHome = getChartHome;
const getNewReleaseChart = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield requestZingMp3("/api/v2/page/get/newrelease-chart", {
        sig: hashParam("/api/v2/page/get/newrelease-chart"),
    });
});
exports.getNewReleaseChart = getNewReleaseChart;
const getInfoSong = (songId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield requestZingMp3("/api/v2/song/get/info", {
        id: songId,
        sig: hashParam("/api/v2/song/get/info", songId),
    });
});
exports.getInfoSong = getInfoSong;
const getArtist = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield requestZingMp3("/api/v2/page/get/artist", {
        alias: name,
        sig: hashParam("/api/v2/page/get/artist"),
    });
});
exports.getArtist = getArtist;
const getLyric = (songId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield requestZingMp3("/api/v2/lyric/get/lyric", {
        id: songId,
        sig: hashParam("/api/v2/lyric/get/lyric", songId),
    });
});
exports.getLyric = getLyric;
const search = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield requestZingMp3("/api/v2/search/multi", {
        q: name,
        sig: hashParam("/api/v2/search/multi"),
    });
});
exports.search = search;
const getListMV = (id, page, count) => __awaiter(void 0, void 0, void 0, function* () {
    return yield requestZingMp3("/api/v2/video/get/list", {
        id: id,
        type: "genre",
        page: page,
        count: count,
        sort: "listen",
        sig: hashParamMV("/api/v2/video/get/list", id, "genre", page, count),
    });
});
exports.getListMV = getListMV;
const getCategoryMV = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield requestZingMp3("/api/v2/genre/get/info", {
        id: id,
        type: "video",
        sig: hashParamMV("/api/v2/genre/get/info", id, "video"),
    });
});
exports.getCategoryMV = getCategoryMV;
const getVideo = (videoId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield requestZingMp3("/api/v2/page/get/video", {
        id: videoId,
        sig: hashParam("/api/v2/page/get/video", videoId),
    });
});
exports.getVideo = getVideo;
exports.default = {
    getSong: exports.getSong,
    getDetailPlaylist: exports.getDetailPlaylist,
    getHome: exports.getHome,
    getTop100: exports.getTop100,
    getChartHome: exports.getChartHome,
    getNewReleaseChart: exports.getNewReleaseChart,
    getInfoSong: exports.getInfoSong,
    getArtist: exports.getArtist,
    getLyric: exports.getLyric,
    search: exports.search,
    getListMV: exports.getListMV,
    getCategoryMV: exports.getCategoryMV,
    getVideo: exports.getVideo
};
//# sourceMappingURL=index.js.map