var routeApp=angular.module('routeApp');
routeApp.controller('HomeController', function($scope){
	$scope.data="Homie";
});
routeApp.controller('SecondPageController', function($scope, $http){
	$scope.url="test.json";
	$scope.image=null;
	$scope.imageList=null;
	$scope.description=null;
	$scope.preferenceData={};
	var index=0;
	
	$http.get($scope.url)
	.success(function(data){
		console.log(JSON.stringify(data));
		$scope.imageList=data;
		iterate();
	}).
	error(function(data){
		console.log("Error" + JSON.stringify(data));
	});
	function iterate(){
		/*for(var i=0;i<data.length;i++){
			if(data[i].category=="drinks"){
				console.log(data[i].picture);	
			}
		}*/
		$scope.image=$scope.imageList[index].picture;
		$scope.description=$scope.imageList[index].description;
		console.log("Picture " + $scope.image+ "  "+ $scope.description);
	}	
	$scope.saveLike=function(){
		console.log("in save like");
		$scope.preferenceData.type="Like";
		$scope.preferenceData.url=$scope.image;
		$scope.preferenceData.description=$scope.description;
		console.log("I am saving like for "+$scope.preferenceData.description);
		$scope.createPreference();
		loadNewImage(index);
	};
	function loadNewImage(index){
		if(index==$scope.imageList.length-1)
		{
			console.log("THis is the last one");
		
		}
		else{
			$scope.imageList.splice(index,1);
			iterate();
		}
			
		
	}
	$scope.saveDislike=function(){
		console.log("in save dislike");
		$scope.preferenceData.type="Dislike";
		$scope.preferenceData.url=$scope.image;
		$scope.preferenceData.description=$scope.description;
		console.log("I am saving dislike for "+$scope.preferenceData.description);
		$scope.createPreference();
		loadNewImage(index);
	}

	$scope.createPreference=function(){
		console.log("Creating...");

		$http.post('/second', $scope.preferenceData)
		.success(function(data){
			$scope.preferenceData={};//clear values
			console.log(JSON.stringify(data));
		})
		.error(function(data){
			console.log('Error '+JSON.stringify(data));
		});
	};
});
routeApp.controller('GalleryController', function($scope, $http){
	$scope.preferences=null;
	$http.get('/gallery')
	.success(function(data){
		$scope.preferences=data;
		console.log("images "+$scope.preferences.length);
		//console.log(JSON.stringify(data));
	})
	.error(function(data){
		console.log("Error"+JSON.stringify(data));
	});
	$scope.deletePreference=function(id){
		$http.delete('gallery/'+id)
		.success(function(data){
			$scope.preferences=data;
			console.log(JSON.stringify(data));
		})
		.error(function(data){
			console.log("Error "+data);
		});
	};
});

routeApp.controller('MainController', function($scope){
	$scope.data="Main";
});