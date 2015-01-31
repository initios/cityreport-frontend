angular.module('starter.services', [])

.factory('$AuthInterceptor', function(){

    return {
        request: function(config) {
            config.headers = config.headers || {}

            config.headers.Authorization = 'Token ' + 'b1a19aea797b2fd3df052ecb578d50c00ab99471'

            return config;
        }
    } 

})

.service('HttpService', function($http){

    var config = {

      'apiPath': 'http://cityreport.herokuapp.com/api-rest/',
      'issuesTypes': 'types/',
      'issues': 'issues/'

    }

    return {
        getConfig: function(param) {
            return config[param];
        },

        get: function(url) {
            return $http.get(url)
        }
    } 

})

.service('IssueTypesService', function(HttpService){

  return{

      list: function(){
          
          var promise = HttpService.get(HttpService.getConfig('apiPath') + HttpService.getConfig('issuesTypes'));

          return promise;
      }

  }

})

.service('IssueService', function(HttpService){

  return{

      list: function(){
          
          var promise = HttpService.get(HttpService.getConfig('apiPath') + HttpService.getConfig('issues'));

          return promise;
      }

  }

});

