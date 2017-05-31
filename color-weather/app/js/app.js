var weatherApp = (function () {
    var cities = new Cities();
    var view = new View();
    var ctrl = new Controller(cities, view);
})();
