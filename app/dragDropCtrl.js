angular.module('app')
    .controller('dragDropCtrl', function ($scope, $timeout) {
        $scope.centerAnchor = true;

        $scope.toggleCenterAnchor = function () {
            $scope.centerAnchor = !$scope.centerAnchor;
        };

        var onDraggableEvent = function (evt, data) {
            console.log("128", "onDraggableEvent", evt, data);
        };

        $scope.$on('draggable:start', onDraggableEvent);
        // $scope.$on('draggable:move', onDraggableEvent);
        $scope.$on('draggable:end', onDraggableEvent);

        $scope.droppedObjects = [];

        $scope.onDropComplete = function (data, evt) {
            console.log("127", "$scope", "onDropComplete", data, evt);
            var index = $scope.droppedObjects.indexOf(data);
            if (index == -1) {
                $scope.droppedObjects.push(data);
            }
        };

        $scope.onDragSuccess = function (data, evt) {
            console.log("133", "$scope", "onDragSuccess1", "", evt);
            var index = $scope.droppedObjects.indexOf(data);
            if (index > -1) {
                $scope.droppedObjects.splice(index, 1);
            }
        };
    
        /**
         * Start Droplet code
         *
         * @property interface
         * @type {Object}
         */
        $scope.interface = {};

        /**
         * @property uploadCount
         * @type {Number}
         */
        $scope.uploadCount = 0;

        /**
         * @property success
         * @type {Boolean}
         */
        $scope.success = false;

        /**
         * @property error
         * @type {Boolean}
         */
        $scope.error = false;

        // Listen for when the interface has been configured.
        $scope.$on('$dropletReady', function whenDropletReady() {

            $scope.interface.allowedExtensions(['png', 'jpg', 'bmp', 'gif', 'svg', 'torrent']);
            $scope.interface.setRequestUrl('upload.html');
            $scope.interface.defineHTTPSuccess([/2.{2}/]);
            $scope.interface.useArray(false);

        });

        // Listen for when the files have been successfully uploaded.
        $scope.$on('$dropletSuccess', function onDropletSuccess(event, response, files) {

            $scope.uploadCount = files.length;
            $scope.success = true;
            console.log(response, files);

            $timeout(function timeout() {
                $scope.success = false;
            }, 5000);

        });

        // Listen for when the files have failed to upload.
        $scope.$on('$dropletError', function onDropletError(event, response) {

            $scope.error = true;
            console.log(response);

            $timeout(function timeout() {
                $scope.error = false;
            }, 5000);

        });
    });