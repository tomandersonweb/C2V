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