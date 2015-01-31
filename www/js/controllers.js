angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('MapCtrl', function($scope, IssueService){

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

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(value.lat, value.lon),
                map: map,
                title: value.description
            });

        });

    }, function(response){

        alert('error al cargar la lista de incidencias');

    });

    

    

    $scope.map = map;
    
})

.controller('NewIssueCtrl', function($scope, IssueTypesService){

    var promise = IssueTypesService.list();

    promise.then(function(response){

        $scope.issueTypes = response.data;

    }, function(response) {

        alert('error al cargar los tipos');
        
    });
})

.controller('IssuesCtrl', function($scope){


});