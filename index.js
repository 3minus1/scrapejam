var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var metaScraper = require('html-metadata');
var app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/api/gaana',function(req,res){
	var url = req.query.url;
	if(!(url.includes("http") || url.includes("https")))
		url = "https://"+url;
	request(url,function(error,response,html){
		
		if(!error && response.statusCode == 200){
			var $ = cheerio.load(html);
			var title = $('._t1').find('h1').html();
			var artist = "";
			$('.s_artist.desktop').children().eq(0).children('a').each(function(){
				artist = artist + $(this).html() + " & ";
			});
			if(artist[artist.length-1]==" ")
			{
				artist = artist.substring(0,artist.length-3);
			}
			var thumbnail = $('._d_t_img').find('img').attr('src');
			var duration = $('.songdetails_col1').children().eq(2).children('span').eq(1).html();
			var bodyData = {
				title: title,
				artist: artist,
				thumbnail: thumbnail,
				duration: duration
			};
			console.log("Title: "+title);
			console.log("Artist: "+artist);
			console.log("Thumbnail: "+thumbnail);
			console.log("Duration: "+duration);
			res.send(bodyData);
		}
		else
			console.log(response.statusCode);
	});
});

app.get('/api/saavn',function(req,res){
	var url = req.query.url;
	if(!(url.includes("http") || url.includes("https")))
		url = "https://"+url;
	
	metaScraper(url,function(error,metadata){
		//console.log(metadata);
		console.log(metadata.openGraph.title);
		console.log(metadata.openGraph.image.url);
		console.log(metadata.openGraph.duration);
		var bodyData = {
			title: metadata.openGraph.title,
			thumbnail: metadata.openGraph['image']['url'],
			duration: metadata.openGraph.duration,
			description: metadata.general.description
		}; 
		res.send(bodyData);
	});
});



app.get('/api/yt',function(req,res){
	var url = req.query.url;
	if(!(url.includes("http") || url.includes("https")))
		url = "https://"+url;
	
	metaScraper(url,function(error,metadata){
		
		var bodyData = {
			title: metadata.openGraph.title,
			description: metadata.openGraph.description,
			thumbnail: metadata.openGraph.image.url,
			duration: metadata.schemaOrg.items[0].properties.duration[0]
		}; 
		console.log(bodyData);
		res.send(bodyData);
	});
});



app.get('/',function(req,res){

	res.send("ScrapeJam is up and running! :D");

	
});



app.listen(3000,function(){
	console.log("Server up and running on port 3000!");
});