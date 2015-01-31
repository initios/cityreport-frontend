angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('MapCtrl', function($scope){

})

.controller('NewIssueCtrl', function($scope, IssueTypesService){

    var promise = IssueTypesService.list();

    promise.then(function(response){

        $scope.issueTypes = response.data;

        console.log($scope.issueTypes);

    }, function(response) {

        alert('error al cargar los tipos');

    });

})

.controller('IssuesCtrl', function($scope){


});