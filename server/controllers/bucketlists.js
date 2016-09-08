var mongoose = require("mongoose");
var User = mongoose.model("User");
var Bucketlist = mongoose.model("Bucketlist")
module.exports = (function(){
	return{
		create: function(req,res){
			var newBucketlistItem = new Bucketlist({bucketListItemTitle: req.body.bucketListItemTitle, bucketListItemDescription: req.body.bucketListItemDescription, bucketListItemStatus: req.body.bucketListItemStatus});
			newBucketlistItem.save(function(err,data){
				if(err){
					console.log("--------------------------errsaved\n",err)
				}else{
					console.log("--------------------------saved\n",data);
					for(userId in req.body.bucketlistItemOwner){
						User.findOne({_id: req.body.bucketlistItemOwner[userId]},function(err,data){
							if(err){
								res.json(err);
							}else{
								data.bucketList.push(newBucketlistItem);
								data.save(function(err,data){
									if(err){
										res.json(err);
									}else{
										User.findOne({_id: req.body.activeUserId}).populate("bucketList").exec(function(err,data){
											if(err){
												res.json(err);
											}else{
												console.log("--------------------------reload active user\n",data);
												res.json(data);
											}
										});
									}
								});
							}
						});
					}
				}
				
			});
		},
		changeStatus: function(req,res){
			// console.log("--------------------------haha\n",req.body);
			Bucketlist.findOne({_id: req.body.bucketListItemId},function(err,data){
				if (err){
					res.json(err);
				}else{
					if(data.bucketListItemStatus == "pending"){
						data.bucketListItemStatus = "done";
					}else{
						data.bucketListItemStatus = "pending";
					}
					data.save();
					console.log(data);
					User.findOne({_id: req.body.activeUserId}).populate("bucketList").exec(function(err,data){
						if(err){
							res.json(err);
						}else{
							console.log("--------------------------reload active user\n",data);
							res.json(data);
						}
					});
				}
			});
		
		}
	}
})();