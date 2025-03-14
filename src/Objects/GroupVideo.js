class GroupVideo {
    constructor(data) {

        this.ChannelTitle = data.ChannelTitle;
        this.AvgLikes = data.AvgLikes;

    }
    //Getters
    getChannelTitle() {
        return this.ChannelTitle;
    }
    getAvgLikes() {
        return this.AvgLikes;
    }

}

export default GroupVideo;