var express = require("express");
var app = express();
var Bing = require('node-bing-api')({ accKey: process.env.API_KEY });


app.set('port',(process.env.PORT || 5000));
/*
app.get('/',function(req,res){
  Bing.web("Pizza", {
    top: 10,  // Number of results (max 50)
    skip: 3,   // Skip first 3 results
  }, function(error, res, body){

    // body has more useful information, but for this example we are just
    // printing the first two results
    console.log(body.d.results[0]);
    console.log(body.d.results[1]);
  });
});
*/
app.get('/api/imagesearch/:query', function(req,res){
  var query = req.params.query;
  var size = req.params.offset || 10;
  var retString = "";
  Bing.images(query, {
         top: size
       },
       function(err, results, body) {
         if (err) throw err;
         //res.send(body);
         res.send(body.d.results.map(function(r){

           return {
             "url": r.SourceUrl,
             "snippet": r.Title,
             "thumbnail": r.MediaUrl,
             "context": r.SourceUrl
           };

         }));

         //body.d.results.map(function(r){ return r.Title; });
       }
  );
  function makeList(img) {
     // Construct object from the json result
     return {
       "url": img.url,
       "snippet": img.title,
       "thumbnail": img.thumbnail.url,
       "context": img.sourceUrl
     };
   }
});



var server = app.listen(app.get('port'),function(){
  console.log(server.address().address);
  console.log(server.address().port);
});
