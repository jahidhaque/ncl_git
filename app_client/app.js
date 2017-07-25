/*
|----------------------------------------------------------------
| setting up main app.
|----------------------------------------------------------------
*/
(function(){

	angular
		.module('nclhalal', ['ngResource', 'ngRoute'])
		.config(['$routeProvider', '$locationProvider', config]);

	function config($routeProvider, $locationProvider){
		$routeProvider
			.when('/', {
				templateUrl: "home/home.view.html",
				controller: "homeCtrl",
				controllerAs: 'hmvm'
			})
			.when('/grocery', {
				templateUrl: 'grocery/grocery.view.html',
				controller: 'groceryCtrl',
				controllerAs: 'vm'
			})
			.when('/meatandfish', {
				templateUrl: '/meatandfish/meatandfish.view.html',
				controller: 'meatfishCtrl',
				controllerAs: 'vm'
			})
			.when('/riceandflour', {
				templateUrl: '/riceandflour/riceandflour.view.html',
				controller: 'riceandflourCtrl',
				controllerAs: 'vm'
			})
			.when('/kitchenandhome', {
				templateUrl: '/kitchenandhome/kitchenandhome.view.html',
				controller: 'kitchenandhomeCtrl',
				controllerAs: 'vm'
			})
			.when('/readyfood', {
				templateUrl: '/readyfood/readyfood.view.html',
				controller: 'readyfoodCtrl',
				controllerAs: 'vm'
			})
			.when('/vegetableandfruits', {
				templateUrl: '/vegetableandfruits/vegetableandfruits.view.html',
				controller: 'vegetableandfruitsCtrl',
				controllerAs: 'vm'
			})
			.when('/herbs', {
				templateUrl: '/herbs/herbs.view.html',
				controller: 'herbsCtrl',
				controllerAs: 'vm'
			})
			.when('/aboutus', {
				templateUrl: '/aboutus/aboutus.view.html',
				controller: 'aboutusCtrl',
				controllerAs: 'aboutvm'
			})
			.when('/login', {
				templateUrl: '/login/login.view.html',
				controller: 'loginCtrl',
				controllerAs: 'vm'
			})
			.when('/register', {
				templateUrl: '/register/register.view.html',
				controller: 'registerCtrl',
				controllerAs: 'vm'
			})
			.when('/profile', {
				templateUrl: '/profile/profile.view.html',
				controller: 'profileCtrl',
				controllerAs: 'vm'
			})
			.when('/bye', {
				templateUrl: 'bye/bye.view.html',
				controller: 'byeCtrl',
				controllerAs: 'vm'
			})
			.when('/settings', {
				templateUrl: 'settings/settings.view.html',
				controller: "systemCtrl",
				controllerAs: "sysvm"
			})
			.when('/singleproduct/:productname', {
				templateUrl: "products/singleproduct.view.html",
				controller: "singleProductCtrl",
				controllerAs: "sngprovm"
			})
			

		// html5 mode for # tag.
		$locationProvider.html5Mode({
			enabled: true
		});
	}

})();