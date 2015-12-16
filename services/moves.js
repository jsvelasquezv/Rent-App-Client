var moveService = angular.module("moveService",[]);

moveService.service('Move',function ($http) {
    // Returns all the moves for the logged user
    this.getMoves = function () {
        return $http.get('http://localhost:3000/api/moves')
    }

    //Create a new move for the user logged
    this.createMove = function (name, value, kind, acquisition_date, user_id) {
        return $http.post('http://localhost:3000/api/moves',{
            name             : name,
            value            : value,
            kind             : kind,
            acquisition_date : acquisition_date,
            user_id          : user_id
        })
    }
});