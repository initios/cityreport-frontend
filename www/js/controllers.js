angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, DashboardService) {

    $scope.data = {};

    var promise = DashboardService.cities();

    promise.then(function(response){

        $scope.data.topCities = response.data;

    }, function(response) {

        alert('error al cargar las ciudades');
        
    });

    var promiseCountys = DashboardService.counties();

    promise.then(function(response){

        $scope.data.topCountys = response.data;

    }, function(response) {

        alert('error al cargar las provincisas');
        
    });

})

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

            contentString = '<div id="content" style="height: 400px;">'+
              '<div class="IWsiteNotice">'+
              '</div>'+
              '<h4 id="firstHeading" class="firstHeading">'+ value.city + ' - '+ value.county +'</h4>'+
              '<i>Publicada el '+ format_date + '</i>'+
              '<div class="IWbodyContent">'+
              '<h4>'+ value.type_nested.name +'</h4>'+
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

.controller('NewIssueCtrl', function($scope, IssueTypesService, IssueService){

    $scope.data = {
        type_id: null,
        description: ''
    }

    $scope.error = {
        type: false,
        description: false
    }

    $scope.view = {
        sended: false
    }

    // obtengo las coordenadas actuales

    navigator.geolocation.getCurrentPosition(function(pos) {
        $scope.data.lat = pos.coords.latitude + '';
        $scope.data.lon = pos.coords.longitude + '';
    });

    // carga de la lista de los tipos

    var promise = IssueTypesService.list();

    promise.then(function(response){

        $scope.issueTypes = response.data;

    }, function(response) {

        alert('error al cargar los tipos');
        
    });

    $scope.send = function(){
        var valid = true

        $scope.error.type = false;
        $scope.error.description = false;

        if( $scope.data.type == undefined || $scope.data.type == '')
        {
            valid = false;
            $scope.error.type = true;
        }

        if( $scope.data.description == undefined || $scope.data.description == '')
        {
            valid = false;
            $scope.error.description = true;
        }        

        if(valid)
        {
            $scope.data.type = parseInt($scope.data.type);
            IssueService.save($scope.data);
            $scope.view.sended = true;
        }
    }

    $scope.reset = function()
    {
        $scope.data.type = '';
        $scope.data.description = '';
        $scope.view.sended = false;
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

.controller('IssueDetailCtrl', function($scope, $stateParams, IssueService){

    $scope.data = {};

    var issuesPromise = IssueService.load($stateParams.issueId);

    issuesPromise.then(function(response){

        $scope.data.issue = response.data

        console.log($scope.data.issue);

    }, function(response){

        alert('error al cargar la incidencia');

    });
});