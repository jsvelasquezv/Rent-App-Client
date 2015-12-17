var moveService = angular.module("moveService",[]);

moveService.service('Move',function ($http) {
    // Returns all the moves for the logged user
    this.getMoves = function () {
        return $http.get('http://localhost:3000/api/moves')
    }

    //Create a new move for the user logged
    this.createMove = function (name, description, amount, user_id) {
        return $http.post('http://localhost:3000/api/moves',{
            name        : name,
            description : description,
            amount      : amount,
            user_id     : user_id
        })
    }
});