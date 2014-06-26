app.service('configService', [function() {

    var API_END_POINT = 'http://hashbangit.herokuapp.com/';

    return{
        API_END_POINT: API_END_POINT
    };
   
}]);