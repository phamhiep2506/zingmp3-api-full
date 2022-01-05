const axios = require("axios");
const crypto = require("crypto");

const VERSION = "1.4.11";
const URL = "https://zingmp3.vn";
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

const hashParam = (path: string, id: void) => {
  if(id == undefined) {
    return getHmac512(
      path + getHash256(`ctime=${CTIME}version=${VERSION}`),
      SECRET_KEY
    );
  } else {
    return getHmac512(
      path + getHash256(`ctime=${CTIME}id=${id}version=${VERSION}`),
      SECRET_KEY
    );
  }
};

const getCookie = async () => {
  try {
    let res = await axios.get(`${URL}`);
    return res.headers["set-cookie"][1];
  } catch (err) {
    console.error(err);
  }
};

const client = axios.create({
  baseURL: `${URL}`,
});

client.interceptors.response.use((res: any) => res.data); // setting axiosresponse data

const requestZingMp3 = async (path: string, qs: object) => {
  let cookie = await getCookie();

  try {
    let res = await client.get(path, {
      headers: {
        Cookie: `${cookie}`,
      },
      params: {
        ...qs,
        ctime: CTIME,
        version: VERSION,
        apiKey: API_KEY,
      },
    });
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const getSong = async (songId: void) => {
  return await requestZingMp3("/api/v2/song/get/streaming", {
    id: songId,
    sig: hashParam("/api/v2/song/get/streaming", songId),
  });
};

export const getDetailPlaylist = async (playlistId: void) => {
  return await requestZingMp3("/api/v2/page/get/playlist", {
    id: playlistId,
    sig: hashParam("/api/v2/page/get/playlist", playlistId),
  })
}

export const getTop100 = async () => {
  return await requestZingMp3("/api/v2/page/get/top-100", {
    sig: hashParam("/api/v2/page/get/top-100"),
  });
};

export const getChartHome = async () => {
  return await requestZingMp3("/api/v2/page/get/chart-home", {
    sig: hashParam("/api/v2/page/get/chart-home"),
  })
}

export const getInfoSong = async (songId: void) => {
  return await requestZingMp3("/api/v2/song/get/info", {
    id: songId,
    sig: hashParam("/api/v2/song/get/info", songId),
  })
}

export const getLyric = async (songId: void) => {
  return await requestZingMp3("/api/v2/lyric/get/lyric", {
    id: songId,
    sig: hashParam("/api/v2/lyric/get/lyric", songId),
  })
}

export const search = async (name: void) => {
  return await requestZingMp3("/api/v2/search/multi", {
    q: name,
    sig: hashParam("/api/v2/search/multi"),
  })
}

export default {
  getSong,
  getDetailPlaylist,
  getTop100,
  getChartHome,
  getInfoSong,
  getLyric,
  search
};
