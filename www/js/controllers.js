angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('MapCtrl', function($scope){


})

.controller('NewIssueCtrl', function($scope){

    $scope.issuesTypes = {
        0: {id: 1, name: 'type 1'},
        1: {id: 2, name: 'type 2'},
        2: {id: 3, name: 'type 3'}
    }

})

.controller('IssuesCtrl', function($scope){


});