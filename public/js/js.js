$(document).ready(function() {
        $('select').material_select();
        $('.modal').modal({
        	opacity: .0, // Opacity of modal background
        });

        $('#submitBtn').click(function(){
        	$('#parallax1').toggle();
        });
});

