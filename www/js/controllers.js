angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('MapCtrl', function($scope, $filter, IssueService){

    // Obtener la lista de incidencias

    var issuesPromise = IssueService.list();

    var myLatlng = new google.maps.LatLng(42.239524, -8.722400);

    var mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    navigator.geolocation.getCurrentPosition(function(pos) {
        
        map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
    });

    issuesPromise.then(function(response){

        $scope.issues = response.data

        angular.forEach($scope.issues, function(value, key){

            var created = new Date(value.created);

            var format_date = $filter('date')(created, "EEEE, dd MMM yyyy HH:mm:ss");

            contentString = '<div id="content">'+
              '<div class="IWsiteNotice">'+
              '</div>'+
              '<h4 id="firstHeading" class="firstHeading">'+ value.city + ' - '+ value.county +'</h4>'+
              '<i>Publicada el '+ format_date + '</i>'+
              '<div class="IWbodyContent">'+
              '<p>' + value.description + '</p>'+
              '</div>'+
              '</div>';

            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(value.lat, value.lon),
                map: map,
                title: value.description
            });

            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map, marker);
            });

        });

    }, function(response){

        alert('error al cargar la lista de incidencias');

    });


    $scope.map = map;
    
})

.controller('NewIssueCtrl', function($scope, IssueTypesService){

    // carga de la lista de los tipos

    var promise = IssueTypesService.list();

    promise.then(function(response){

        $scope.issueTypes = response.data;

    }, function(response) {

        alert('error al cargar los tipos');
        
    });

    $scope.send = function(){

    }
})

.controller('IssuesCtrl', function($scope, IssueService){

    var issuesPromise = IssueService.list();

    issuesPromise.then(function(response){

        $scope.issues = response.data

    }, function(response){

        alert('error al cargar la lista de incidencias');

    });

})

.controller('IssueDetailCtrl', function($scope, IssueService){

});