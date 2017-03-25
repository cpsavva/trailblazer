//=====================Map=====================
    var map;
    var latitude;
    var longitude;
    var latlng;
    function initMap() {
      console.log('in initMap', document.getElementById('map'));
      map = new google.maps.Map(document.getElementById('map'), {
        // center: {lat:latitude, lng: longitude},
        // center: {lat: -34.397, lng: 150.644},
        //Need to find someway to grab latitude and longtitude
        zoom:18
        });
      infoWindow = new google.maps.InfoWindow();

      
    };
    
    function makeMarker (lat, lng){
      var marker = new google.maps.Marker({
        position: {lat:lat, lng:lng},
        map: map,
        title: 'Hello World!'
      });
      marker.setMap(map);
      

      // return marker;    
    }
    $(document).ready(function(){
      $('.parallax').parallax();
      $('.modal').modal({
        ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.        
          google.maps.event.trigger(map, 'resize');
        },
      });
      $('select').material_select();
      $(".dropdown-button").dropdown();
      $( "#submitBtn" ).click(function() {
     		console.log($('#stateSelection').val())
        $("#parkDisplay").show();;
      });
      $(".parkSubmitBtn").click(function(){
        $("#parallax2").show();
      });

      $(".modalBtn").click(function(){
        console.log("I Clicked The Modal");
        console.log($(this).parent('#parkContainer'));
        latitude = $(this).parent().parent().find('.latitude').text();
        longitude = $(this).parent().parent().find('.longitude').text();
        makeMarker(parseFloat(latitude),parseFloat(longitude));
        map.setCenter({lat: parseFloat(latitude), lng: parseFloat(longitude)}); 
        var weather = $(this).parent().parent().find('.weatherInfo').text();
        $("#weatherDisplay").html(weather);    

        var lat=parseFloat(latitude);
        var lng = parseFloat(longitude);
       $.ajax({
           url: "https://api.wunderground.com/api/7d4c2ccc48b6acd9/conditions/q/" + lat + "," + lng + ".json",
           method: 'GET',
           datatype: "json"
       }).done(function(wonder) {
           console.log(wonder.current_observation.temp_f);
           var degrees = Math.floor(wonder.current_observation.temp_f);
           degrees = degrees + "\xb0" + "F"
           $(".weather-widget").html(degrees);
       });

      });
    });     

function goBack() {
    window.history.back();
}