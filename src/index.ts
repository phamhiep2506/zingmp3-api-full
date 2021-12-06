const axios = require("axios");
const crypto = require("crypto");

const VERSION = "1.4.11";
const URL = "https://zingmp3.vn";
const PATH_SONG = "/api/v2/song/get/streaming";
const PATH_PLAYLIST = "/api/v2/page/get/playlist";
const PATH_TOP = "/api/v2/page/get/top-100";
const PATH_INFO = "/api/v2/song/get/info";
const PATH_CHARTHOME = "/api/v2/page/get/chart-home";
const PATH_LYRIC = "/api/v2/lyric/get/lyric"
const PATH_SEARCH = "/api/v2/search/multi"
const SECRET_KEY = "2aa2d1c561e809b267f3638c4a307aab";
const API_KEY = "88265e23d4284f25963e6eedac8fbfa3";
const CTIME = String(Math.floor(Date.now() / 1000));

const getHash256 = (a:string) => {
  return crypto.createHash("sha256").update(a).digest("hex");
};

const getHmac512 = (str:string, key:string) => {
  let hmac = crypto.createHmac("sha512", key);
  return hmac.update(Buffer.from(str, "utf8")).digest("hex");
};

export const setZingCookie = (callback: any) => {
  axios.get(`${URL}`).then((res: any) => {
    callback(res.headers["set-cookie"][1]);
  });
}

export const getSong = (id:string, callback:any) => {
  const signature:string = getHmac512(
    PATH_SONG +
    getHash256(`ctime=${CTIME}id=${id}version=${VERSION}`),
    SECRET_KEY
  );
  setZingCookie((cookie:string) => {
    axios.get(`${URL}${PATH_SONG}`, {
      headers: {
        Cookie: `${cookie}`,
      },
      params: {
        "id": id,
        "ctime": CTIME,
        "version": VERSION,
        "sig": signature,
        "apiKey": API_KEY
      }
    })
    .then((res: any) => {
      callback(res.data)
    })
  })
}

export const getPlaylists = (id:string, callback:any) => {
  const signature:string = getHmac512(
    PATH_PLAYLIST +
    getHash256(`ctime=${CTIME}id=${id}version=${VERSION}`),
    SECRET_KEY
  );
  setZingCookie((cookie:string) => {
    axios.get(`${URL}${PATH_PLAYLIST}`, {
      headers: {
        Cookie: `${cookie}`,
      },
      params: {
        "id": id,
        "ctime": CTIME,
        "version": VERSION,
        "sig": signature,
        "apiKey": API_KEY
      }
    })
    .then((res: any) => {
      callback(res.data)
    })
  })
}

export const getTop100 = (callback:any) => {
  const signature:string = getHmac512(
    PATH_TOP +
    getHash256(`ctime=${CTIME}version=${VERSION}`),
    SECRET_KEY
  );
  setZingCookie((cookie:string) => {
    axios.get(`${URL}${PATH_TOP}`, {
      headers: {
        Cookie: `${cookie}`,
      },
      params: {
        "ctime": CTIME,
        "version": VERSION,
        "sig": signature,
        "apiKey": API_KEY
      }
    })
    .then((res: any) => {
      callback(res.data)
    })
  })
}

export const getChartHome = (callback:any) => {
  const signature:string = getHmac512(
    PATH_CHARTHOME +
    getHash256(`ctime=${CTIME}version=${VERSION}`),
    SECRET_KEY
  );
  setZingCookie((cookie:string) => {
    axios.get(`${URL}${PATH_CHARTHOME}`, {
      headers: {
        Cookie: `${cookie}`,
      },
      params: {
        "ctime": CTIME,
        "version": VERSION,
        "sig": signature,
        "apiKey": API_KEY
      }
    })
    .then((res: any) => {
      callback(res.data)
    })
  })
}

export const getInfo = (id:string, callback:any) => {
  const signature:string = getHmac512(
    PATH_INFO +
    getHash256(`ctime=${CTIME}id=${id}version=${VERSION}`),
    SECRET_KEY
  );
  setZingCookie((cookie:string) => {
    axios.get(`${URL}${PATH_INFO}`, {
      headers: {
        Cookie: `${cookie}`,
      },
      params: {
        "id": id,
        "ctime": CTIME,
        "version": VERSION,
        "sig": signature,
        "apiKey": API_KEY
      }
    })
    .then((res: any) => {
      callback(res.data)
    })
  })
}

export const getLyric = (id:string, callback:any) => {
  const signature:string = getHmac512(
    PATH_LYRIC +
    getHash256(`ctime=${CTIME}id=${id}version=${VERSION}`),
    SECRET_KEY
  );
  setZingCookie((cookie:string) => {
    axios.get(`${URL}${PATH_LYRIC}`, {
      headers: {
        Cookie: `${cookie}`,
      },
      params: {
        "id": id,
        "ctime": CTIME,
        "version": VERSION,
        "sig": signature,
        "apiKey": API_KEY
      }
    })
    .then((res: any) => {
      callback(res.data)
    })
  })
}

export const getSearch = (name:string, callback:any) => {
  const signature:string = getHmac512(
    PATH_SEARCH +
    getHash256(`ctime=${CTIME}version=${VERSION}`),
    SECRET_KEY
  );
  setZingCookie((cookie:string) => {
    axios.get(`${URL}${PATH_SEARCH}`, {
      headers: {
        Cookie: `${cookie}`,
      },
      params: {
        "q": name,
        "ctime": CTIME,
        "version": VERSION,
        "sig": signature,
        "apiKey": API_KEY
      }
    })
    .then((res: any) => {
      callback(res.data)
    })
  })
}

export default {
  getSong,
  getPlaylists,
  getTop100,
  getChartHome,
  getInfo,
  getLyric,
  getSearch
}