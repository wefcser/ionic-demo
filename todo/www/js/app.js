// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
  .factory('Tasks', function($http) {
    var base = "http://localhost:3000";
    return {
      all: function() {
        return $http.get(base + "/task");
      },
      save: function(task) {
        return $http.post(base + "/task/save", {title: task.title,check: task.check});
      },
      update: function(task) {
        return $http.post(base + "/task/update", {title: task.title,check: task.check});
      }
    }
  })

  .controller('TodoCtrl', function(  $scope, $ionicModal, Tasks) {
    Tasks.all()
      .success(function(tasks){
          $scope.tasks = tasks;
        console.log(  $scope.tasks);
      })
      .error(function(){
          $scope.tasks = [];
      })

    // Called when the form is submitted
      $scope.createTask = function(task) {
      //拒绝空任务
      task.title=task.title.trim();
      if(task.title.length != 0) {
        //拒绝重复任务
        repeat=false;
        for(i=0;i<$scope.tasks.length;i++){
          if($scope.tasks[i].title==task.title){
            repeat=true;break;
          }
        }
          if(!repeat) {
            task.check = false;
            //本地客户端增加
            $scope.tasks.push({
              title: task.title,
              check: task.check
            });
            //上传数据库
            Tasks.save(task)
              .success(function (task) {
                console.log(task);
              })
              .error(function () {
                console.log("request error");
              });
          }
      }
    };

    // Called when the form is checked
      $scope.checkTask = function(task) {
        //本地客户端修改
        // for(i=0;i<$scope.tasks.length;i++){
        //   if($scope.tasks[i].title==task.title){
        //     if($scope.tasks[i].check==true)$scope.tasks[i].check=false;
        //     else $scope.tasks[i].check=true;
        //     task.check=$scope.tasks[i].check;
        //     break;
        //   }
        // }
        //改为了使用ng-model实现的双向对应
        //上传数据库
      Tasks.update(task)
        .success(function (task) {
          console.log(task);
        })
        .error(function () {
          console.log("request error");
        });
    };

  })
