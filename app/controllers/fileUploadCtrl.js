/* jshint  -W065 */
/* jshint  -W083 */
/* jshint  -W117 */
/* jshint  -W062 */
/* jshint  -W089 */
/* jshint  -W073 */

var fileUploadCtrl = function ($scope, $http, $timeout, $upload, $location, configService, usernameService, data, $anchorScroll) {
    
    'use strict';

    $scope.apikey = 'AIzaSyCK4uFum6_DUKD65-RuaMgVe6hnT_E9G1s';
    $scope.tags = [];
	$scope.currentFields = '';
    $scope.username = usernameService.username();
    $scope.maxFileSize = 5000000; //in bytes

    //convert bytes
    $scope.bytesToSize = function (bytes) {
        if(bytes === 0) { return '0 Byte';}
        var k = 1000;
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(1) + ' ' + sizes[i];
    };

    //for max file size text
    $scope.getMaxFileSize = $scope.bytesToSize($scope.maxFileSize);

	
	if (usernameService.username() === undefined || usernameService.username() === 'empty') {
		$location.path('/login');
	}
	usernameService.isActive().then(function(d) {
		if (d.data.active === false) {
			usernameService.setUsername('empty', 'empty', 'empty');
			$location.path('/login');
		}
	});
	
    $scope.fileReaderSupported = window.FileReader != null;
    $scope.changeAngularVersion = function() {
        window.location.hash = $scope.angularVersion;
        window.location.reload(true);
    };
    $scope.hasUploader = function(index) {
        return $scope.upload[index] != null;
    };
    $scope.abort = function(index) {
        $scope.upload[index].abort();
        $scope.upload[index] = null;
    };
    $scope.angularVersion = window.location.hash.length > 1 ? window.location.hash.substring(1) : '1.2.0';

    //resize image
    $scope.resizeImage = function(uploadId, maxWidthImage, maxHeightImage, maxWidthThumb, maxHeightThumb, maxWidthMedium, maxHeightMedium, resizeQuality){
        $http({url : configService.API_END_POINT+'upload/'+uploadId+'/resize',
            method: 'POST',
            data : {
                'maxWidthImage': maxWidthImage,
                'maxHeightImage': maxHeightImage,
                'maxWidthThumb': maxWidthThumb,
                'maxHeightThumb': maxHeightThumb,
                'maxWidthMedium': maxWidthMedium,
                'maxHeightMedium': maxHeightMedium,
                'resizeQuality': resizeQuality
            }
            }).
            success(function(data) {
                console.log(data);
            }).
            error(function(data) {
                console.log(data);
            });
    };

    $scope.onFileSelect = function($files) {
        $scope.selectedFiles = [];

        //selected files length
        $scope.selectedFilesLengthCheck = function(){
            return $scope.selectedFiles.length;
        };

        if ($scope.upload && $scope.upload.length > 0) {
            for (var i = 0; i < $scope.upload.length; i++) {
                if ($scope.upload[i] != null) {
                    $scope.upload[i].abort();
                }
            }
        }

        $scope.upload = [];
        $scope.uploadResult = [];
        $scope.selectedFiles = $files;
        $scope.dataUrls = [];
               
        for ( var x = 0; x < $files.length; x++) {
            var $file = $files[x];

            $scope.checkFileType = function () {
                if (
                    $files[0].type === 'image/jpeg' ||
                    $files[0].type === 'image/png'  ||
                    $files[0].type === 'image/jpg'  ||
                    $files[0].type === 'image/gif'){
                    return true;
                } else {
                    $scope.submittedError = true;
                    return false;
                }
            };
            
            $scope.checkFileSize = function(){
                if (Math.round($files[0].size) > $scope.maxFileSize){
                    $scope.submittedError = true;
                    return true;
                } else{
                    return false;
                }
            };

            if (window.FileReader && $file.type.indexOf('image') > -1 && $scope.checkFileSize() === false) {

                if ($scope.checkFileType() === true){
                    $scope.loading = true;
                }

                var fileReader = new FileReader();
                fileReader.readAsDataURL($files[x]);
                var loadFile = function(fileReader, index) {
                    fileReader.onload = function(e) {
                        
                        $scope.uploadFileName = $files[0].name;
                        
                        $timeout(function() {
                            $scope.dataUrls[index] = e.target.result;
                            $scope.xyz = e.target.result;
                        });

                        $scope.previewProgress = parseInt(100.0 * e.loaded / e.total);
                        
                        if (e.loaded === e.total){
                            $scope.loading = false;
                        }
                        
                    };
                }(fileReader, x);
            }
        }
       
    };

    // check to make sure the form is completely valid before post
    $scope.processForm = function(isValid){
        if (
            $scope.currentFields === 'image' &&
            isValid &&
            $scope.tags.length >= 1 &&
            $scope.selectedFiles.length === 1 &&
            $scope.checkFileType() === true &&
            $scope.checkFileSize() === false ||
            $scope.currentFields === 'video' &&
            isValid &&
            $scope.tags.length >= 1 &&
            $scope.checkYoutubeTotalResults !== 0
            ) {
            //do post
            var index = 0;
            $scope.progressBar = 0;
            $scope.uploadId = 0;

            if ($scope.description === undefined){
                $scope.description = '';
            }
			
			console.log(usernameService.token());
            //console.log('selected '+$scope.currentFields);
            //console.log($scope.selectedFiles[index].type);

            if ($scope.currentFields === 'image'){
                //post image
                $scope.upload[index] = $upload.upload({
                    url : configService.API_END_POINT+'upload/add',
                    method: 'POST',
                    data : {
                        usertoken : usernameService.token(),
                        title : $scope.title,
                        description : $scope.description,
                        tags : $scope.tagsToCSV(),
                        type: 'image'
                    },
                    file: $scope.selectedFiles[index],
                    fileFormDataName: 'image_file'
                }).progress(function(evt) {
                    $scope.progressBar = parseInt(100.0 * evt.loaded / evt.total);
                }).success(function(data, status, headers, config) {
                    $scope.resizeImage(data, 760, 760, 120, 90, 460, 345, 75);
                    $location.path('/userName/uploads/' + data);// todo: get userName
                    //console.log(data);
                }).error(function(data, status, headers, config) {
                    //to do echo these errors on frontend
                    //console.log(data.error[0].field_name + ' - ' + data.error[0].message);
                }).xhr(function(xhr){
                    xhr.upload.addEventListener('abort', function(){
                        console.log('aborted complete');
                    }, false);
                });
            } else if ($scope.currentFields === 'video'){
                //post video
                console.log('youtube id = '+$scope.getURLParam('v'));
                console.log('title = '+$scope.title);
                console.log('desc = '+$scope.description);
                console.log('tags ='+$scope.tagsToCSV());


                $http({
                    url : configService.API_END_POINT+'upload/add',
                    method: 'POST',
                    data : {
                        usertoken : usernameService.token(),
                        title : $scope.title,
                        description : $scope.description,
                        tags : $scope.tagsToCSV(),
                        type: 'video',
                        file: $scope.getURLParam('v')
                    }
                }).
                success(function(data) {
                    $location.path('/'+$scope.isUserLogged+'/uploads/' + data);// todo: get userName
                }).
                error(function(data) {
                    console.log(data);
                });
                
            }

        } else{
        //show errors after form submit
            $scope.submittedError = true;
            $anchorScroll('top');

            //alert('Noooooooo!');

            //to do: display backend validation errors

        }

    };
        
    // TODO: create a tag service to handle stuff like this and inject it into this controller
    $scope.tagsToCSV = function() {

        var tags = $scope.tags;

        //console.log(tags.length);

        if(tags === undefined){
            tags = '';
        }
        var tagsCSV = '';
        for (var i = 0; i < tags.length; i++) {
            tagsCSV += tags[i].text;
            if (i < tags.length-1) {
                tagsCSV += ',';
            }
        }
        return tagsCSV;
    };

    //check tag character length
    $scope.tagLength = function(){
        return $scope.tagsToCSV().length;
    };

    $scope.drawFields = function (type) {
        //clear fields and setpristine
        $scope.title = '';
        $scope.description = '';
        $scope.tags = '';
        $scope.youtube = '';
        $scope.selectedFiles = '';
        $scope.uploadFileName = '';
        $scope.youtubeThumb = '';
        $scope.selectedFilesLengthCheck = undefined;
        $scope.uploadForm.$setPristine();
        
        if (type === 'image'){
            $scope.currentFields = 'image';
            $scope.youtubeError = false;
        }
        if (type === 'video'){
            $scope.currentFields = 'video';
        }
       
    };

    $scope.getYoutubeData = function(youtube){
        
        //strip the url
        $scope.getURLParam = function ( name ){
            var url = youtube;
            var needle = '?v=';
            var isValidYoutubeUrl = function (contains) {
                return url.indexOf(contains) > -1;
            };

            if (url !== undefined && isValidYoutubeUrl(needle) === true) {
                if (url.indexOf(needle) >= 0){
                    var query_string = url.split('?');
                    var params = query_string[1].split('&');
                    var i = 0;
                    while (i < params.length) {
                        var param_item = params[i].split('=');
                        if (param_item[0] === name) {
                            return param_item[1];
                        }
                        i++;
                    }
                    return '';

                } else {
                    $scope.youtubeError = true;
                }
            } else{
                $scope.youtube = '';
            }
        };

        var youtubeId = $scope.getURLParam('v');
        //get youtube data
        $http({method: 'GET', url: 'https://www.googleapis.com/youtube/v3/videos?id='+youtubeId+'&key='+$scope.apikey+'&part=snippet,contentDetails,statistics,status'}).
        success(function(data) {
 
            $scope.checkYoutubeTotalResults = JSON.parse(JSON.stringify(data.pageInfo.totalResults));

            if ($scope.checkYoutubeTotalResults !== 0 ){
                $scope.title = JSON.parse(JSON.stringify(data.items[0].snippet.title));
                $scope.description = JSON.parse(JSON.stringify(data.items[0].snippet.description));
                $scope.youtubeThumb = JSON.parse(JSON.stringify(data.items[0].snippet.thumbnails.high.url));
                $scope.youtubeError = false;
                $scope.youtubecategoryId = JSON.parse(JSON.stringify(data.items[0].snippet.categoryId));

                //map youtube category
                $scope.returnYoutubeCategory = function (ytId) {
                    $http.jsonp('https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode='+$scope.countryCode+'&key='+$scope.apikey+'&callback=JSON_CALLBACK')
                    .success(function(data){
                        function objectFindByKey(array, key, value) {
                            for (var i = 0; i < array.length; i++) {
                                if (array[i][key] === value) {
                                    return array[i].snippet.title;
                                }
                            }
                            return null;
                        }
                        $scope.youtubeCategory =  objectFindByKey(data.items, 'id', ytId);
                        //use youtube category as a tag
                        $scope.tags = [{text: $scope.youtubeCategory}];
                    });
                };

                $scope.returnYoutubeCategory($scope.youtubecategoryId);

            } else {
                //clear if fail
                $scope.title = '';
                $scope.description = '';
                $scope.youtubeThumb = '';
                $scope.youtubeError = true;
                $scope.tags = '';
            }
        }).
        error(function(data) {
            //do something with error
            alert('oops!');

        });
    };

    //autocomplete
    $scope.loadItems = function($query) {
        return data.search($query);
    };


};

fileUploadCtrl.$inject = ['$scope', '$http', '$timeout', '$upload', '$location', 'configService', 'usernameService', 'data', '$anchorScroll'];
 