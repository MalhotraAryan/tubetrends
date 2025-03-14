
class Query {
    constructor(data) {

        this.Region = data.Region;
        this.ChannelTitle = data.ChannelTitle;
        this.TrendingDate = new Date(data.TrendingDate);
        this.Title = data.Title;
        this.Tags = data.Tags.split('|');
        this.QueryTime = data.QueryTime;
        this.QueryID = data.QueryID;

    }

}
export default Query;