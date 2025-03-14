class UnionVideo {
    constructor(data) {

        this.VideoID = data.VideoID;
        this.ViewCount = data.ViewCount;
        this.TrendingDate = data.TrendingDate;
        this.ChannelTitle = data.ChannelTitle;

    }
    //Getters
    getVideoID() {
        return this.VideoID;
    }
    getViewCount() {
        return this.ViewCount;
    }
    getTrendingDate() {
        return this.TrendingDate;
    }
    getChannelTitle() {
        return this.Description;
    }


}

export default UnionVideo;