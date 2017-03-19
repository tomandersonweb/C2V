(function () {

    var module = angular.module("app");

    module.factory("citiesService", ["$http", "$q", function ($http, $q) {

        return {
            getCities: getCities,
            addCity: addCity,
            editCity: editCity,
            countVisitedCities: countVisitedCities
        };

        function getCities() {
            return $http.get(config.baseUri + 'cities')
                .then(function (response) {
                    return response.data;
                })
                .catch(function (response) {
                    return $q.reject("Response status: " + response.status + " (" + response.statusText + ")<br /> " + response.data.message);
                });
        }

        function addCity(city) {
            return $http.post(config.baseUri + 'cities/', city)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (response) {
                    return $q.reject("Response status: " + response.status + " (" + response.statusText + ")<br /> " + response.data.message);
                });
        }

        function editCity(name, city) {
            return $http.put(config.baseUri + 'cities/' + name, city)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (response) {
                    return $q.reject("Response status: " + response.status + " (" + response.statusText + ")<br /> " + response.data.message);
                });
        }

        function countVisitedCities() {
            return $http.get(config.baseUri + 'cities/visited')
                .then(function (response) {
                    return response.data;
                })
                .catch(function (response) {
                    return $q.reject("Response status: " + response.status + " (" + response.statusText + ")<br /> " + response.data.message);
                });
        }

    }]);

}());