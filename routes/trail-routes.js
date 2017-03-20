var models = require('../models');
var unirest = require('unirest');



/*routes*/
module.exports = function(app) {
    app.get("/api/:latitude/:longitude", function(req, res) {
        var latitude = req.params.latitude;
        var longitude = req.params.longitude;
        unirest.get("https://trailapi-trailapi.p.mashape.com/?lat=" + latitude + "&limit=25&lon=" + longitude + "&q[activities_activity_type_name_eq]=hiking&radius=50")
            .header("X-Mashape-Key", "1EUZc9Yh0Dmsh3NULqLjzLCBf7rsp1iedcgjsnE14nUri24ZVA")
            .header("Accept", "text/plain")
            .end(function(result) {
                var trail = result.body.places[0];               
                res.render("index",{results:trail});
            });

    });
}
