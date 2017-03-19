// var express = require('express');
// var app = express();
var axios = require('axios');
var db = require('../models');
// var port = process.env.PORT || 3000;
db.sequelize.sync({
    force: true
});

function parkFilter(parks) {
    return parks.filter(function(p, i, arr) {
        return p.latLong !== '';
    });
};



// var pFilt = (pArr)=> pArr.filter((p)=> p.latLong!=='');
var parkCodes = 'acad,npsa,arch,badl,bibe,bisc,blca,brca,cany,care,cave,chis,coga,crla,cuva,deva,dena,' +
    'drto,ever,gaar,glac,glba,grca,grte,grba,grsa,grsm,gumo,hale,havo,hosp,isro,jotr,katm,' +
    'kefj,kica,kova,lacl,lavo,maca,meve,mora,noca,olym,pefo,pinn,redw,romo,sagu,seki,shen,' +
    'thro,viis,voya,wica,wrst,yell,yose,zion'


function NPSaxios(req, res) {
    axios.get('https://developer.nps.gov/api/v0/parks?limit=70&parkCode=' + parkCodes, {
            headers: {
                'Authorization': 'FF6C5C39-6EA5-47E1-B07C-C70339D68963'
            }
        })
        .then(function(result) {

            var filter = parkFilter(result.data.data);
            // parkFilter(result.data.data);
            // res.json(result.data.data[0]);

            for (i = 0; i < filter.length; i++) {
                var latLong = filter[i].latLong.split(",");
                // console.log("latLong" + latLong);
                var latitude = latLong[0].split(":");
                latitude = latitude[1];
                var longitude = latLong[1].split(":");
                longitude = longitude[1];

                console.log(filter[i].fullName)
                console.log(filter[i].states)




                db.Park.create({
                    park_id: filter[i].parkCode,
                    park_name: filter[i].fullName,
                    description: filter[i].description,
                    latitude: latitude,
                    longitude: longitude,
                    state: filter[i].states,
                    directions_info: filter[i].directionsInfo,
                    url: filter[i].url,
                    directions_url: filter[i].directionsUrl,
                    weather_info: filter[i].weatherInfo
                })
            }

        });

};

module.exports = {NPSaxios}
// app.get('/nps', NPSaxios) /*app.get*/



// app.listen(port, function() {
//     console.log("App listening on PORT " + port);
// });