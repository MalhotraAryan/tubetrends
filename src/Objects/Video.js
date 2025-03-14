class Video {
    constructor(data) {

        this.VideoID = data.VideoID;
        this.ChannelID = data.ChannelID;
        this.Region = data.Region;
        this.ChannelTitle = data.ChannelTitle;
        this.TrendingDate = new Date(data.TrendingDate);
        this.Title = data.Title;
        this.PublishedDate = new Date(data.PublishedDate);
        this.CatgID = data.CatgID;
        this.Tags = data.Tags.split('|');
        this.ViewCount = data.ViewCount;
        this.Likes = data.Likes;
        this.Dislikes = data.Dislikes;
        this.CommentCount = data.CommentCount;
        this.CommentDisabled = data.CommentDisabled;
        this.ThumbLink = data.ThumbLink;
        this.RatingsDisabled = data.RatingsDisabled;
        this.Description = data.Description;

    }
    //Getters
    getRegion() {
        return "US";
    }
    getVideoID() {
        return this.VideoID;
    }
    getChannelID() {
        return this.ChannelID;
    }
    getChannelTitle() {
        return this.ChannelTitle;
    }
    getTrendingDate() {
        return this.TrendingDate;
    }
    getTitle() {
        return this.Title;
    }
    getPublishedDate() {
        return this.PublishedDate;
    }
    getCatgID() {
        return this.CatgID;
    }
    getTags() {
        return this.Tags;
    }
    getViewCount() {
        return this.ViewCount;
    }
    getLikes() {
        return this.Likes;
    }
    getDislikes() {
        return this.Dislikes;
    }
    getCommentCount() {
        return this.CommentCount;
    }
    getCommentDisabled() {
        return this.CommentDisabled;
    }
    getThumbLink() {
        return this.ThumbLink;
    }
    getRatingsDisabled() {
        return this.RatingsDisabled;
    }
    getDescription() {
        return this.Description;
    }


}
export default Video;