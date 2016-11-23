seevee.controller("accomplishmentController", ['$scope', '$location', '$http',
  function($scope, $location, $http) {

    // Accomplishment Model, Hold all the info from the modal
    $scope.formData = {};
    $scope.accomplishments = {};
    $scope.modalState = '';
    $scope.mainType = 'work';

    // Initial get for all the accomplishments
    $http.get("api/accomplishment").then(function(response){
      $scope.accomplishments = response.data;
    });

    // Function that is called when we want the modal to show
    $scope.showModal = function(type, state) {
      $scope.modalState = state;
      if(type === 'work') {
        $(".work-modal").fadeIn();
      } else if (type === 'ed') {
        $(".ed-modal").fadeIn();
      } else if (type === 'project') {
        $(".project-modal").fadeIn();
      } else if (type === 'honor') {
        $(".honor-modal").fadeIn();
      }
    };

    // Function to call when we want to remove the modal
    $scope.hideModal = function(type) {
      if(type === 'work') {
        $(".work-modal").fadeOut();
      } else if (type === 'ed') {
        $(".ed-modal").fadeOut();
      } else if (type === 'project') {
        $(".project-modal").fadeOut();
      } else if (type === 'honor') {
        $(".honor-modal").fadeOut();
      }
      $scope.formData = {};
    };

    // Function that is called when we're going to add or update an accomplishment
    $scope.save = function(type) {
      if($scope.modalState == 'new') {
        $scope.formData.type = type;
        $http.post("api/accomplishment", $scope.formData).then(function(res) {
          $scope.updateAccomplishments();
          $scope.hideModal(type);
          $scope.formData = {};
        });
      } else if ($scope.modalState == 'edit') {
        $http.put("api/accomplishment/" + $scope.formData._id, $scope.formData).then(function(res) {
          $scope.updateAccomplishments();
          $scope.hideModal($scope.formData.type);
          $scope.formData = {};
        });
      }
    };

    // Takes in the accomplishment and deletes it
    $scope.delete = function(accomplishment) {
      var accId = accomplishment._id;
      $http.delete("api/accomplishment/" + accId).then(function(res) {
        $scope.updateAccomplishments();
      });
    };

    // Helps set up client for editing
    $scope.edit = function(accomplishment) {
      $scope.formData = accomplishment;
      $scope.formData.date = accomplishment.dateStart + ' - ' + accomplishment.dateEnd;
      $scope.showModal(accomplishment.type, 'edit');
    };

    // Updates the list of accomplishments, usually after a CRUD is done
    $scope.updateAccomplishments = function() {
      $http.get("api/accomplishment").then(function(response){
        $scope.accomplishments = response.data;
      });
    };

    $scope.newSave = function() {
      $scope.formData.type = $scope.mainType;
      $http.post("api/accomplishment", $scope.formData).then(function(res) {
        $scope.updateAccomplishments();
        $scope.newHide();
        $scope.formData = {};
      });
    };

    $scope.newAdd = function() {
      $(".main-modal").fadeIn();
    };

    $scope.newHide = function() {
      $(".main-modal").fadeOut();
    };

    $scope.setTab = function(type) {
      $scope.mainType = type;
      if(type=='work') {
        $scope.workClass = 'selected';
        $scope.projectClass = 'unselected';
        $scope.edClass = 'unselected';
        $scope.honorClass = 'unselected';
      } else if (type == 'project') {
        $scope.workClass = 'unselected';
        $scope.projectClass = 'selected';
        $scope.edClass = 'unselected';
        $scope.honorClass = 'unselected';
      } else if (type == 'ed') {
        $scope.workClass = 'unselected';
        $scope.projectClass = 'unselected';
        $scope.edClass = 'selected';
        $scope.honorClass = 'unselected';
      } else if (type == 'honor') {
        $scope.workClass = 'unselected';
        $scope.projectClass = 'unselected';
        $scope.edClass = 'unselected';
        $scope.honorClass = 'selected';
      }
    };

    //Classes for tabs
    $scope.setTab('work');

  }
]);
