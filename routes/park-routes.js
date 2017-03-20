var models = require('../models');



/*routes*/
module.exports = function(app){

	/*display all by state*/

	app.get('/:state', function(request, response){
		console.log(request.body)
		models.Park.findAll({
			where: {
				state: request.params.state
			},
		}).then(function(park_data){
			response.render('index', {park_data})
		})
	});



}