var users = require("./../controllers/users.js");
var bucketlists = require("./../controllers/bucketlists.js");
module.exports = function(app){
	app.get("/users",function(req,res){
		users.index(req,res);
	});
	app.get("/users/:id",function(req,res){
		console.log("---------------------\n",req.params);
		users.specificUser(req,res);
	});
	app.post("/users",function(req,res){
		users.create(req,res);
	});
	app.get("/users/activeUser/:id",function(req,res){
		users.userList(req,res);
	});
	app.post("/bucketlist",function(req,res){
		bucketlists.create(req,res);
	});
	app.post("/bucketlist/:id/changestatus",function(req,res){
		bucketlists.changeStatus(req,res);
	});
}