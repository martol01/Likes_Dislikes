var routeApp=angular.module('routeApp',['ngRoute']);
routeApp.config(function($routeProvider){
	$routeProvider
	.when('/',{templateUrl:'home.html', controller:'HomeController'})
	.when('/second',{templateUrl:'secondPage.html', controller: 'SecondPageController'})
	.when('/gallery',{templateUrl:'gallery.html',controller:'GalleryController'})
});