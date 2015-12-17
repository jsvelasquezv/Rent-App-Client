var patrimonyService = angular.module("patrimonyService",[]);

patrimonyService.service('Patrimony',function ($http) {
    // Returns all the moves for the logged user
    this.getPatrimonies = function () {
        return $http.get('http://localhost:3000/api/patrimonies')
    }

    //Create a new move for the user logged
    this.createPatrimony = function (name, value, kind, acquisition_date, user_id) {
        return $http.post('http://localhost:3000/api/patrimonies',{
            name             : name,
            value            : value,
            kind             : kind,
            acquisition_date : acquisition_date,
            user_id          : user_id
        })
    }
});