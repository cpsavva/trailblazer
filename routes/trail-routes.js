var models = require('../models');
var unirest = require('unirest');
var axios = require('axios');



/*routes*/
module.exports = function(app) {
    app.get("/api/:latitude/:longitude", function(req, res) {
        var latitude = req.params.latitude;
        var longitude = req.params.longitude;
        axios.get("https://trailapi-trailapi.p.mashape.com/?lat=" + latitude + "&limit=25&lon=" + longitude + "&q[activities_activity_type_name_eq]=hiking&radius=50",{
            
            headers: {
                "X-Mashape-Key": "1EUZc9Yh0Dmsh3NULqLjzLCBf7rsp1iedcgjsnE14nUri24ZVA",
                "Accept": "text/plain"
            }
        }).then(function(result){
            console.log(result.data.places);
            var places = result.data.places
            for(i=0; i< places.length; i++){
                models.Trail.create{
                    
                }
            }

            res.end();
        });
        res.redirect('/trails')
        // unirest.get("https://trailapi-trailapi.p.mashape.com/?lat=" + latitude + "&limit=25&lon=" + longitude + "&q[activities_activity_type_name_eq]=hiking&radius=50")
        //     .header("X-Mashape-Key", "1EUZc9Yh0Dmsh3NULqLjzLCBf7rsp1iedcgjsnE14nUri24ZVA")
        //     .header("Accept", "text/plain")
        //     .end(function(result) {
        //         var trailList = result.body.places;                 
        //         var trails=[]; 
        //         trailList.forEach(function(arrayItem){
        //         	var trail={
        //         		trail_name:arrayItem.activities[0].name,
        //         		description:arrayItem.activities[0].description,
        //         		distance:arrayItem.activities[0].length,
        //         		url:arrayItem.activities[0].url
        //         	}
        //         	trails.push(trail);
        //         })       
               	
        //         res.render("trails", { results: trails });
        //     });

    });
}
