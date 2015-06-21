var app = angular.module("contacts", []);

app.controller("contactsCtrl", function($scope) {
  $scope.headers = ["Name", "Email", "Phone"];
  $scope.contactList = [
    {firstName: "Trey", lastName: "Huffine", email: "trey.huffine@gmail.com", phone: "8655489478", gravatar: "empty", editing: false},
  ];
  $scope.currentContact = {};
  $scope.firstName = "";
  $scope.lastName = "";
  $scope.email = "";
  $scope.phone = "";
  $scope.searchText = "";
  $scope.predicate = "firstName";
  $scope.reverse = true;

  $scope.submit = function() {
    $scope.setContact();
    $scope.contactList.push($scope.currentContact);
    console.log($scope.contactList);
    $scope.clearForm();
  };
  $scope.setContact = function() {
    $scope.currentContact.firstName = $scope.firstName;
    $scope.currentContact.lastName = $scope.lastName;
    $scope.currentContact.email = $scope.email;
    $scope.currentContact.phone = $scope.phone;
    $scope.currentContact.gravatar = CryptoJS.MD5($scope.email.trim()).toString(CryptoJS.enc.Hex);
    $scope.currentContact.editing = false;
    console.log(CryptoJS.MD5($scope.email).toString(CryptoJS.enc.Hex));
  };
  $scope.clearForm = function() {
    $scope.currentContact = {};
    $scope.firstName = "";
    $scope.lastName = "";
    $scope.email = "";
    $scope.phone = "";
  };
  $scope.order = function(predicate) {
    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
    $scope.predicate = predicate;
  };
  $scope.submitChange = function(contact) {
    contact.editing = false;
    $scope.changeAvatar(contact);
  };
  $scope.changeAvatar = function(contact) {
    contact.gravatar = CryptoJS.MD5(contact.email.trim()).toString(CryptoJS.enc.Hex);
  };
  $scope.removeItem = function(item) {
    var shouldDelete = confirm("Delete contact?");
    if (shouldDelete) {
      var index = $scope.contactList.indexOf(item);
      $scope.contactList.splice(index, 1);
    }
  };
});
