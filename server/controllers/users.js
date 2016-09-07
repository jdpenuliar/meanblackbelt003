var mongoose = require("mongoose");
var User = mongoose.model("User");
module.exports = (function(){
	return{
		index: function(req,res){
			User.find({},function(err,data){
				if(err){
					res.json(err);
				}else{
					res.json(data);
				}
			});
		},
		create: function(req,res){
			// console.log("--------------------------\n",req.body);
			var newUser = new User({userName: req.body.userName});
			User.findOne({userName: req.body.userName},function(err,data){
				if(err){
					res.json(err);
				}else{
					if(!data){
						newUser.save(function(err,data){
							if(err){
								console.log("something went wrong",err.message);
							}else{
								console.log('successfully added a hahha!\n',data);
								User.findOne({_id: data._id}).populate("bucketList").exec(function(err,data){
									if(err){
										res.json(err);
									}else{
										res.json(data)
									}
								});
							}
						});
					}else if(data){
						User.findOne({_id: data._id}).populate("bucketList").exec(function(err,data){
							if(err){
								res.json(err);
							}else{
								res.json(data)
							}
						});
					}
				}
			});
		},
		userList: function(req,res){
			User.find({_id: {$ne: req.params.id}},function(err,data){
				if(err){
					res.json(err);
				}else{
					res.json(data);
				}
			});
		},
		specificUser: function(req,res){
			User.findOne({_id: req.params.id}).populate("bucketList").exec(function(err,data){
				if(err){
					res.json(err);
				}else{
					res.json(data)
				}
			});
		}
	}
})();