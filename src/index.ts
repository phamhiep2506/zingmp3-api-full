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

const getHash256 = (a: string) => {
  return crypto.createHash("sha256").update(a).digest("hex");
};

const getHmac512 = (str: string, key: string) => {
  let hmac = crypto.createHmac("sha512", key);
  return hmac.update(Buffer.from(str, "utf8")).digest("hex");
};

const hashParam = (path: string, id: string) => {
  return getHmac512(
    path + getHash256(`ctime=${CTIME}id=${id}version=${VERSION}`),
    SECRET_KEY
  );
};

const hashParamNoId = (path: string) => {
  return getHmac512(
    path + getHash256(`ctime=${CTIME}version=${VERSION}`),
    SECRET_KEY
  );
};

export const setZingCookie = async () => {
  try {
    let res = await axios.get(`${URL}`);
    return res.headers["set-cookie"][1];
  } catch (err) {
    console.error(err);
  }
};

export const getSong = async (id: string): Promise<any> => {
  let cookie = await setZingCookie();

  try {
    let res = await axios.get(`${URL}${PATH_SONG}`, {
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
  } catch (err) {
    console.error(err);
  }
};

export const getPlaylists = async (id: string): Promise<any> => {
  let cookie = await setZingCookie();

  try {
    let res = await axios.get(`${URL}${PATH_PLAYLIST}`, {
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
  } catch (err) {
    console.error(err);
  }
};

export const getTop100 = async (): Promise<any> => {
  let cookie = await setZingCookie();
  try {
    let res = await axios.get(`${URL}${PATH_TOP}`, {
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
  } catch (err) {
    console.error(err);
  }
};

export const getChartHome = async (): Promise<any> => {
  let cookie = await setZingCookie();
  try {
    let res = await axios.get(`${URL}${PATH_CHARTHOME}`, {
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
  } catch (err) {
    console.error(err);
  }
};

export const getInfo = async (id: string): Promise<any> => {
  let cookie = await setZingCookie();

  try {
    let res = await axios.get(`${URL}${PATH_INFO}`, {
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
  } catch (err) {
    console.error(err);
  }
};

export const getLyric = async (id: string): Promise<any> => {
  let cookie = await setZingCookie();

  try {
    let res = await axios.get(`${URL}${PATH_LYRIC}`, {
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
  } catch (err) {
    console.error(err);
  }
};

export const getSearch = async (name: string): Promise<any> => {
  let cookie = await setZingCookie();
  try {
    let res = await axios.get(`${URL}${PATH_SEARCH}`, {
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
  } catch (err) {
    console.error(err);
  }
};

export default {
  getSong,
  getPlaylists,
  getTop100,
  getChartHome,
  getInfo,
  getLyric,
  getSearch,
};
