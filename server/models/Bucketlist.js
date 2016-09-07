var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var BucketlistSchema = new Schema({
	bucketListItemTitle: {type: String, require: true, minlength:5},
	bucketListItemDescription: {type: String, require: true, minlength:10},
	bucketListItemStatus: {type: String, require: true, minlength:1}
},{timestamps: true});
mongoose.model("Bucketlist",BucketlistSchema);