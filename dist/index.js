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
exports.getSearch = exports.getLyric = exports.getInfo = exports.getChartHome = exports.getTop100 = exports.getPlaylists = exports.getSong = exports.setZingCookie = void 0;
const axios = require("axios");
const crypto = require("crypto");
const VERSION = "1.4.11";
const URL = "https://zingmp3.vn";
const PATH_SONG = "/api/v2/song/get/streaming";
const PATH_PLAYLIST = "/api/v2/page/get/playlist";
const PATH_TOP = "/api/v2/page/get/top-100";
const PATH_INFO = "/api/v2/song/get/info";
const PATH_CHARTHOME = "/api/v2/page/get/chart-home";
const PATH_LYRIC = "/api/v2/lyric/get/lyric";
const PATH_SEARCH = "/api/v2/search/multi";
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
    return getHmac512(path + getHash256(`ctime=${CTIME}id=${id}version=${VERSION}`), SECRET_KEY);
};
const hashParamNoId = (path) => {
    return getHmac512(path + getHash256(`ctime=${CTIME}version=${VERSION}`), SECRET_KEY);
};
const setZingCookie = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let res = yield axios.get(`${URL}`);
        return res.headers["set-cookie"][1];
    }
    catch (err) {
        console.error(err);
    }
});
exports.setZingCookie = setZingCookie;
const getSong = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let cookie = yield (0, exports.setZingCookie)();
    try {
        let res = yield axios.get(`${URL}${PATH_SONG}`, {
            headers: {
                Cookie: `${cookie}`,
            },
            params: {
                id: id,
                ctime: CTIME,
                version: VERSION,
                sig: hashParam(PATH_SONG, id),
                apiKey: API_KEY,
            },
        });
        return res.data;
    }
    catch (err) {
        console.error(err);
    }
});
exports.getSong = getSong;
const getPlaylists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let cookie = yield (0, exports.setZingCookie)();
    try {
        let res = yield axios.get(`${URL}${PATH_PLAYLIST}`, {
            headers: {
                Cookie: `${cookie}`,
            },
            params: {
                id: id,
                ctime: CTIME,
                version: VERSION,
                sig: hashParam(PATH_PLAYLIST, id),
                apiKey: API_KEY,
            },
        });
        return res.data;
    }
    catch (err) {
        console.error(err);
    }
});
exports.getPlaylists = getPlaylists;
const getTop100 = () => __awaiter(void 0, void 0, void 0, function* () {
    let cookie = yield (0, exports.setZingCookie)();
    try {
        let res = yield axios.get(`${URL}${PATH_TOP}`, {
            headers: {
                Cookie: `${cookie}`,
            },
            params: {
                ctime: CTIME,
                version: VERSION,
                sig: hashParamNoId(PATH_TOP),
                apiKey: API_KEY,
            },
        });
        return res.data;
    }
    catch (err) {
        console.error(err);
    }
});
exports.getTop100 = getTop100;
const getChartHome = () => __awaiter(void 0, void 0, void 0, function* () {
    let cookie = yield (0, exports.setZingCookie)();
    try {
        let res = yield axios.get(`${URL}${PATH_CHARTHOME}`, {
            headers: {
                Cookie: `${cookie}`,
            },
            params: {
                ctime: CTIME,
                version: VERSION,
                sig: hashParamNoId(PATH_CHARTHOME),
                apiKey: API_KEY,
            },
        });
        return res.data;
    }
    catch (err) {
        console.error(err);
    }
});
exports.getChartHome = getChartHome;
const getInfo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let cookie = yield (0, exports.setZingCookie)();
    try {
        let res = yield axios.get(`${URL}${PATH_INFO}`, {
            headers: {
                Cookie: `${cookie}`,
            },
            params: {
                id: id,
                ctime: CTIME,
                version: VERSION,
                sig: hashParam(PATH_INFO, id),
                apiKey: API_KEY,
            },
        });
        return res.data;
    }
    catch (err) {
        console.error(err);
    }
});
exports.getInfo = getInfo;
const getLyric = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let cookie = yield (0, exports.setZingCookie)();
    try {
        let res = yield axios.get(`${URL}${PATH_LYRIC}`, {
            headers: {
                Cookie: `${cookie}`,
            },
            params: {
                id: id,
                ctime: CTIME,
                version: VERSION,
                sig: hashParam(PATH_LYRIC, id),
                apiKey: API_KEY,
            },
        });
        return res.data;
    }
    catch (err) {
        console.error(err);
    }
});
exports.getLyric = getLyric;
const getSearch = (name) => __awaiter(void 0, void 0, void 0, function* () {
    let cookie = yield (0, exports.setZingCookie)();
    try {
        let res = yield axios.get(`${URL}${PATH_SEARCH}`, {
            headers: {
                Cookie: `${cookie}`,
            },
            params: {
                q: name,
                ctime: CTIME,
                version: VERSION,
                sig: hashParamNoId(PATH_SEARCH),
                apiKey: API_KEY,
            },
        });
        return res.data;
    }
    catch (err) {
        console.error(err);
    }
});
exports.getSearch = getSearch;
exports.default = {
    getSong: exports.getSong,
    getPlaylists: exports.getPlaylists,
    getTop100: exports.getTop100,
    getChartHome: exports.getChartHome,
    getInfo: exports.getInfo,
    getLyric: exports.getLyric,
    getSearch: exports.getSearch,
};
//# sourceMappingURL=index.js.map