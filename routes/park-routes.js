var models = require('../models');



/*routes*/
module.exports = function(app){

	/*display all by state*/

	app.get('/parks', function(request, response){
		console.log(request.query.state)
		models.Park.findAll({
			where: {
				state: request.query.state
			},
		}).then(function(park_data){
			response.render('index', {park_data});

		})
		
	});


}