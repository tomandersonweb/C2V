(function () {

    var module = angular.module("app");

    module.component("citiesComponent", {
        templateUrl: "/app/components/cities.template.html",
        controllerAs: "model",
        controller: ["citiesService", controller]
    });

    function controller(citiesService) {

        var model = this;
        model.cities = [];

        model.$onInit = function () {
            model.setup();
        };

        model.setup = function () {
            model.newCity = {};
            model.newCity.attractions = [];
            model.showAddCity = false;
            model.listCities();
            model.countVisitedCities();
        };

        model.listCities = function () {
            citiesService.getCities()
                .then(function (response) {
                    model.cities = response;
                })
                .catch(function (error) {
                    //ngToast.danger(error);
                });
        };

        model.addCity = function (newCity) {
            citiesService.addCity(newCity)
                .then(function (response) {
                    model.setup();
                })
                .catch(function (error) {
                    //ngToast.danger(error);
                });
        };

        model.countVisitedCities = function () {
            citiesService.countVisitedCities()
                .then(function (response) {
                    model.visitedCount = response;
                })
                .catch(function (error) {
                    //ngToast.danger(error);
                });
        };

        model.setVisitedStatus = function (city) {
            city.visited = !city.visited;
            citiesService.editCity(city.city, city)
                .then(function (response) {
                    model.setup();
                })
                .catch(function (error) {
                    //ngToast.danger(error);
                });
        };

    }

}());
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