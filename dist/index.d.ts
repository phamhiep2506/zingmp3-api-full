declare class ZingMp3Api {
    VERSION: string;
    URL: string;
    SECRET_KEY: string;
    API_KEY: string;
    CTIME: string;
    constructor(VERSION: string, URL: string, SECRET_KEY: string, API_KEY: string, CTIME: string);
    private getHash256;
    private getHmac512;
    private hashParamNoId;
    private hashParam;
    private hashParamHome;
    private hashCategoryMV;
    private hashListMV;
    private getCookie;
    private requestZingMp3;
    getSong(songId: string): Promise<any>;
    getDetailPlaylist(playlistId: string): Promise<any>;
    getHome(): Promise<any>;
    getTop100(): Promise<any>;
    getChartHome(): Promise<any>;
    getNewReleaseChart(): Promise<any>;
    getInfoSong(songId: string): Promise<any>;
    getListArtistSong(artistId: string, page: string, count: string): Promise<any>;
    getArtist(name: string): Promise<any>;
    getLyric(songId: string): Promise<any>;
    search(name: string): Promise<any>;
    getListMV(id: string, page: string, count: string): Promise<any>;
    getCategoryMV(id: string): Promise<any>;
    getVideo(videoId: string): Promise<any>;
}
export declare const ZingMp3: ZingMp3Api;
export {};
//# sourceMappingURL=index.d.ts.map