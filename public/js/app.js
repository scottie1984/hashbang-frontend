var app = angular.module("app", [ "ngRoute", "ui.bootstrap", "ngTagsInput", "angularFileUpload", "ui.gravatar", "ngCookies", "wu.masonry", "truncate", "ngAnimate", "angulartics", "angulartics.google.analytics" ]).config([ "$routeProvider", "$locationProvider", "$analyticsProvider", "gravatarServiceProvider", function(a, b, c) {
    a.when("/", {
        templateUrl: "app/views/homepageView.html"
    }).when("/random", {
        templateUrl: "app/views/homepageRandom.html"
    }).when("/recent", {
        templateUrl: "app/views/homepageRecent.html"
    }).when("/rate/:type/:tag/:id/:prevId", {
        templateUrl: "app/views/ratingView.html",
        controller: "ratingCtrl"
    }).when("/rate/:type/:tag", {
        templateUrl: "app/views/ratingView.html",
        controller: "ratingCtrl"
    }).when("/rate/:type/:tag/end/:prevId/:prevId", {
        templateUrl: "app/views/ratingEndView.html",
        controller: "endCtrl"
    }).when("/tagsearch", {
        templateUrl: "app/views/tagSearchView.html",
        controller: "tagSearchCtrl"
    }).when("/login", {
        templateUrl: "app/views/loginView.html",
        controller: "loginCtrl"
    }).when("/logout", {
        templateUrl: "app/views/uploadView.html",
        controller: "logoutCtrl"
    }).when("/signup", {
        templateUrl: "app/views/signupView.html",
        controller: "signupCtrl"
    }).when("/forgot/:token", {
        templateUrl: "app/views/forgotPassword.html",
        controller: "forgotPasswordCtrl"
    }).when("/forgot", {
        templateUrl: "app/views/forgotView.html",
        controller: "forgotCtrl"
    }).when("/upload", {
        templateUrl: "app/views/uploadView.html",
        controller: "fileUploadCtrl"
    }).when("/top/:type/:tag", {
        templateUrl: "app/views/topView.html",
        controller: "topCtrl"
    }).when("/:userName/uploads/:uploadId", {
        templateUrl: "app/views/userUploadsView.html",
        controller: "displayUploadCtrl"
    }).when("/:userName", {
        templateUrl: "app/views/userView.html",
        controller: "userCtrl"
    }).when("/:userName/edit", {
        templateUrl: "app/views/userEditView.html",
        controller: "userEditCtrl"
    }).when("/user/:token", {
        templateUrl: "app/views/activateView.html",
        controller: "activateCtrl"
    }).when("/croptest", {
        templateUrl: "app/views/testView.html",
        controller: "cropCtrl"
    }).when("/404", {
        templateUrl: "app/views/404View.html",
        controller: "errorCtrl"
    }).otherwise({
        redirectTo: "/404"
    }), b.html5Mode(!1).hashPrefix("!"), c.defaults = {
        size: 80,
        "default": "mm"
    }, c.secure = !0;
} ]), ModalDemoCtrl = function(a, b, c, d) {
    a.items = a.selectedFiles[0];
    var e = new FileReader();
    e.readAsDataURL(a.items);
    !function(a) {
        a.onload = function(a) {
            d.itemsimage = a.target.result;
        };
    }(e);
    a.open = function(d) {
        var e = b.open({
            templateUrl: "myModalContent.html",
            controller: ModalInstanceCtrl,
            size: d,
            resolve: {
                items: function() {
                    return a.items;
                }
            }
        });
        e.result.then(function(b) {
            a.selected = b;
        }, function() {
            c.info("Modal dismissed at: " + new Date());
        });
    };
};

ModalDemoCtrl.$inject = [ "$scope", "$modal", "$log", "$rootScope" ];

var ModalInstanceCtrl = function(a, b) {
    a.cancel = function() {
        b.dismiss("cancel");
    };
};

ModalInstanceCtrl.$inject = [ "$scope", "$modalInstance" ];

var activateCtrl = function(a, b, c, d, e) {
    a.getPageToken = function() {
        return b.path().split("/")[2] || "Unknown";
    }, console.log(a.getPageToken()), c({
        method: "POST",
        url: d.API_END_POINT + "/auth/activate/" + a.getPageToken(),
        data: {},
        transformRequest: function(a) {
            var b = [];
            for (var c in a) b.push(encodeURIComponent(c) + "=" + encodeURIComponent(a[c]));
            return b.join("&");
        },
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).success(function(b) {
        "Invalid token provided" === b.status ? (a.messageInvalid = !0, a.message = e.trustAsHtml('Sorry, the token you provided is expired or not valid. <a href="#!/signup">Please sign up</a>')) : (a.messageInvalid = !1, 
        a.message = e.trustAsHtml('Congratulations, <a href="#!/login">please login</a> to start uploading content'));
    });
};

activateCtrl.$inject = [ "$scope", "$location", "$http", "configService", "$sce" ];

var commentCtrl = function(a, b, c, d, e, f, g) {
    a.submitComment = function(b, c, h) {
        b ? d.save(a.comment, h, g.token()).success(function(b) {
            a.userTag = b[0].username, a.userComment = b[0].comment, a.gravatarHash = b[0].gravatar, 
            a.userCommentTime = "just now", console.log(a.userComment), e(function() {
                a.commentMessage = "";
            }, 3500), a.commentMessage = "Your comment is submitted", f.jQuery("ul.comment").prepend($('<li><div class="comment-avatar"><a href="#"><img src="http://www.gravatar.com/avatar/' + a.gravatarHash + '?size=60&default=mm" class="profileThumb"></a></div><div class="comment-body"><div class="fa fa-play fa-flip-horizontal comment-triangle"></div><p>' + a.userComment + '</p></div><p class="comment-info pull-right"><a href="#">' + a.userTag + "</a> " + a.userCommentTime + "</p></li>").fadeIn("slow")), 
            a.submittedError = !1, a.comment = "", a.commentForm.$setPristine();
        }).error(function(a) {
            console.log(a);
        }) : a.submittedError = !0;
    };
};

commentCtrl.$inject = [ "$scope", "$location", "$http", "commentService", "$timeout", "$window", "usernameService" ];

var cropCtrl = function(a, b, c) {
    a.selected = function(b) {
        var d;
        a.picWidth = b.w, a.picHeight = b.h, a.thumbSizeWidth = 150, a.thumbSizeHeight = 150, 
        a.picWidth > a.thumbSizeWidth && (d = a.thumbSizeWidth / a.picWidth, a.picHeight *= d, 
        a.picWidth *= d), a.picWidth < a.thumbSizeWidth && (d = a.thumbSizeWidth * a.picWidth, 
        a.picHeight *= d, a.picWidth *= d), a.picHeight > a.thumbSizeHeight && (d = a.thumbSizeHeight / a.picHeight, 
        a.picHeight *= d, a.picWidth *= d), a.picHeight < a.thumbSizeHeight && (d = a.thumbSizeHeight * a.picHeight, 
        a.picHeight *= d, a.picWidth *= d), a.cropped = !0;
        {
            var e = a.picWidth / b.w, f = a.picHeight / b.h;
            c.jQuery("#preview")[0];
        }
        c.jQuery("img#preview").css({
            width: Math.round(e * b.bx) + "px",
            height: Math.round(f * b.by) + "px",
            marginLeft: "-" + Math.round(e * b.x) + "px",
            marginTop: "-" + Math.round(f * b.y) + "px"
        }), a.getCoordinates = function() {
            alert(JSON.stringify(b));
        };
    };
};

cropCtrl.$inject = [ "$scope", "$location", "$window", "$timeout" ];

var displayUploadCtrl = function(a, b) {
    a.displayUpload = b.displayUpload, b.getDisplayUploadData();
};

displayUploadCtrl.$inject = [ "$scope", "displayUploadService" ];

var endCtrl = function(a, b, c, d) {
    d.getRatingData().then(function(b) {
        a.ratings = b.data;
    });
};

endCtrl.$inject = [ "$scope", "$location", "$http", "endService", "configService" ];

var errorCtrl = function() {};

errorCtrl.$inject = [ "$scope" ];

var fileUploadCtrl = function(a, b, c, d, e, f, g, h, i) {
    "use strict";
    a.apikey = "AIzaSyCK4uFum6_DUKD65-RuaMgVe6hnT_E9G1s", a.tags = [], a.currentFields = "", 
    a.username = g.username(), a.maxFileSize = 5e6, a.bytesToSize = function(a) {
        if (0 === a) return "0 Byte";
        var b = 1e3, c = [ "Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB" ], d = Math.floor(Math.log(a) / Math.log(b));
        return (a / Math.pow(b, d)).toPrecision(1) + " " + c[d];
    }, a.getMaxFileSize = a.bytesToSize(a.maxFileSize), (void 0 === g.username() || "empty" === g.username()) && e.path("/login"), 
    g.isActive().then(function(a) {
        a.data.active === !1 && (g.setUsername("empty", "empty", "empty"), e.path("/login"));
    }), a.fileReaderSupported = null != window.FileReader, a.changeAngularVersion = function() {
        window.location.hash = a.angularVersion, window.location.reload(!0);
    }, a.hasUploader = function(b) {
        return null != a.upload[b];
    }, a.abort = function(b) {
        a.upload[b].abort(), a.upload[b] = null;
    }, a.angularVersion = window.location.hash.length > 1 ? window.location.hash.substring(1) : "1.2.0", 
    a.resizeImage = function(a, c, d, e, g, h, i, j) {
        b({
            url: f.API_END_POINT + "upload/" + a + "/resize",
            method: "POST",
            data: {
                maxWidthImage: c,
                maxHeightImage: d,
                maxWidthThumb: e,
                maxHeightThumb: g,
                maxWidthMedium: h,
                maxHeightMedium: i,
                resizeQuality: j
            }
        }).success(function(a) {
            console.log(a);
        }).error(function(a) {
            console.log(a);
        });
    }, a.onFileSelect = function(b) {
        if (a.selectedFiles = [], a.selectedFilesLengthCheck = function() {
            return a.selectedFiles.length;
        }, a.upload && a.upload.length > 0) for (var d = 0; d < a.upload.length; d++) null != a.upload[d] && a.upload[d].abort();
        a.upload = [], a.uploadResult = [], a.selectedFiles = b, a.dataUrls = [];
        for (var e = 0; e < b.length; e++) {
            var f = b[e];
            if (a.checkFileType = function() {
                return "image/jpeg" === b[0].type || "image/png" === b[0].type || "image/jpg" === b[0].type || "image/gif" === b[0].type ? !0 : (a.submittedError = !0, 
                !1);
            }, a.checkFileSize = function() {
                return Math.round(b[0].size) > a.maxFileSize ? (a.submittedError = !0, !0) : !1;
            }, window.FileReader && f.type.indexOf("image") > -1 && a.checkFileSize() === !1) {
                a.checkFileType() === !0 && (a.loading = !0);
                var g = new FileReader();
                g.readAsDataURL(b[e]);
                {
                    (function(d, e) {
                        d.onload = function(d) {
                            a.uploadFileName = b[0].name, c(function() {
                                a.dataUrls[e] = d.target.result, a.xyz = d.target.result;
                            }), a.previewProgress = parseInt(100 * d.loaded / d.total), d.loaded === d.total && (a.loading = !1);
                        };
                    })(g, e);
                }
            }
        }
    }, a.processForm = function(c) {
        if ("image" === a.currentFields && c && a.tags.length >= 1 && 1 === a.selectedFiles.length && a.checkFileType() === !0 && a.checkFileSize() === !1 || "video" === a.currentFields && c && a.tags.length >= 1 && 0 !== a.checkYoutubeTotalResults) {
            var h = 0;
            a.progressBar = 0, a.uploadId = 0, void 0 === a.description && (a.description = ""), 
            console.log(g.token()), "image" === a.currentFields ? a.upload[h] = d.upload({
                url: f.API_END_POINT + "upload/add",
                method: "POST",
                data: {
                    usertoken: g.token(),
                    title: a.title,
                    description: a.description,
                    tags: a.tagsToCSV(),
                    type: "image"
                },
                file: a.selectedFiles[h],
                fileFormDataName: "image_file"
            }).progress(function(b) {
                a.progressBar = parseInt(100 * b.loaded / b.total);
            }).success(function(b) {
                a.resizeImage(b, 760, 760, 120, 90, 460, 345, 75), e.path("/userName/uploads/" + b);
            }).error(function() {}).xhr(function(a) {
                a.upload.addEventListener("abort", function() {
                    console.log("aborted complete");
                }, !1);
            }) : "video" === a.currentFields && (console.log("youtube id = " + a.getURLParam("v")), 
            console.log("title = " + a.title), console.log("desc = " + a.description), console.log("tags =" + a.tagsToCSV()), 
            b({
                url: f.API_END_POINT + "upload/add",
                method: "POST",
                data: {
                    usertoken: g.token(),
                    title: a.title,
                    description: a.description,
                    tags: a.tagsToCSV(),
                    type: "video",
                    file: a.getURLParam("v")
                }
            }).success(function(b) {
                e.path("/" + a.isUserLogged + "/uploads/" + b);
            }).error(function(a) {
                console.log(a);
            }));
        } else a.submittedError = !0, i("top");
    }, a.tagsToCSV = function() {
        var b = a.tags;
        void 0 === b && (b = "");
        for (var c = "", d = 0; d < b.length; d++) c += b[d].text, d < b.length - 1 && (c += ",");
        return c;
    }, a.tagLength = function() {
        return a.tagsToCSV().length;
    }, a.drawFields = function(b) {
        a.title = "", a.description = "", a.tags = "", a.youtube = "", a.selectedFiles = "", 
        a.uploadFileName = "", a.youtubeThumb = "", a.selectedFilesLengthCheck = void 0, 
        a.uploadForm.$setPristine(), "image" === b && (a.currentFields = "image", a.youtubeError = !1), 
        "video" === b && (a.currentFields = "video");
    }, a.getYoutubeData = function(c) {
        a.getURLParam = function(b) {
            var d = c, e = "?v=", f = function(a) {
                return d.indexOf(a) > -1;
            };
            if (void 0 !== d && f(e) === !0) {
                if (d.indexOf(e) >= 0) {
                    for (var g = d.split("?"), h = g[1].split("&"), i = 0; i < h.length; ) {
                        var j = h[i].split("=");
                        if (j[0] === b) return j[1];
                        i++;
                    }
                    return "";
                }
                a.youtubeError = !0;
            } else a.youtube = "";
        };
        var d = a.getURLParam("v");
        b({
            method: "GET",
            url: "https://www.googleapis.com/youtube/v3/videos?id=" + d + "&key=" + a.apikey + "&part=snippet,contentDetails,statistics,status"
        }).success(function(c) {
            a.checkYoutubeTotalResults = JSON.parse(JSON.stringify(c.pageInfo.totalResults)), 
            0 !== a.checkYoutubeTotalResults ? (a.title = JSON.parse(JSON.stringify(c.items[0].snippet.title)), 
            a.description = JSON.parse(JSON.stringify(c.items[0].snippet.description)), a.youtubeThumb = JSON.parse(JSON.stringify(c.items[0].snippet.thumbnails.high.url)), 
            a.youtubeError = !1, a.youtubecategoryId = JSON.parse(JSON.stringify(c.items[0].snippet.categoryId)), 
            a.returnYoutubeCategory = function(c) {
                b.jsonp("https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=" + a.countryCode + "&key=" + a.apikey + "&callback=JSON_CALLBACK").success(function(b) {
                    function d(a, b, c) {
                        for (var d = 0; d < a.length; d++) if (a[d][b] === c) return a[d].snippet.title;
                        return null;
                    }
                    a.youtubeCategory = d(b.items, "id", c), a.tags = [ {
                        text: a.youtubeCategory
                    } ];
                });
            }, a.returnYoutubeCategory(a.youtubecategoryId)) : (a.title = "", a.description = "", 
            a.youtubeThumb = "", a.youtubeError = !0, a.tags = "");
        }).error(function() {
            alert("oops!");
        });
    }, a.loadItems = function(a) {
        return h.search(a);
    };
};

fileUploadCtrl.$inject = [ "$scope", "$http", "$timeout", "$upload", "$location", "configService", "usernameService", "data", "$anchorScroll" ];

var forgotCtrl = function(a, b, c, d, e, f, g) {
    a.processForm = function(b) {
        b ? c({
            method: "POST",
            url: d.API_END_POINT + "auth/forgot-password",
            data: {
                email: a.email
            },
            transformRequest: function(a) {
                var b = [];
                for (var c in a) b.push(encodeURIComponent(c) + "=" + encodeURIComponent(a[c]));
                return b.join("&");
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).success(function(b) {
            a.forgotSuccessMessage = b.status;
        }) : (a.submittedError = !0, g("top"));
    };
};

forgotCtrl.$inject = [ "$scope", "$location", "$http", "configService", "usernameService", "$timeout", "$anchorScroll" ];

var forgotPasswordCtrl = function(a, b, c, d, e, f, g) {
    a.passwordStrength = function() {
        var b = {
            password: a.user.password
        };
        c({
            method: "POST",
            url: d.API_END_POINT + "auth/check/password",
            data: b
        }).success(function(b) {
            "strong" === b.status && (a.checkStrengthMessage = "strong", a.strengthColor = "success", 
            a.strengthValue = 100), "medium" === b.status && (a.checkStrengthMessage = "medium", 
            a.strengthColor = "warning", a.strengthValue = 60), "weak" === b.status && (a.checkStrengthMessage = "weak", 
            a.strengthColor = "danger", a.strengthValue = 30);
        });
    }, a.getPageToken = function() {
        return b.path().split("/")[2] || "Unknown";
    }, g.forgotToken = a.getPageToken(), a.processForm = function(b) {
        if (b) {
            console.log(a.user.password), console.log(a.user.passwordConfirm);
            var g = {
                password: a.user.password,
                confirmPassword: a.user.passwordConfirm
            };
            c({
                method: "POST",
                url: d.API_END_POINT + "auth/forgot-password/" + a.getPageToken(),
                data: g,
                transformRequest: function(a) {
                    var b = [];
                    for (var c in a) b.push(encodeURIComponent(c) + "=" + encodeURIComponent(a[c]));
                    return b.join("&");
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).success(function(b) {
                "successfully changed password" !== b.status ? (e(function() {
                    a.errorMessagePassword = "";
                }, 3500), a.errorMessagePassword = b.message) : a.resetPasswordMessage = "Success! Your password has been reset successfully.";
            }).error(function() {});
        } else a.submittedError = !0, f("top");
    };
};

forgotPasswordCtrl.$inject = [ "$scope", "$location", "$http", "configService", "$timeout", "$anchorScroll", "$cookies" ];

var loginCtrl = function(a, b, c, d, e, f, g, h) {
    a.processForm = function(i) {
        i ? c({
            method: "POST",
            url: d.API_END_POINT + "auth/login",
            data: {
                username: a.username,
                password: a.password
            },
            transformRequest: function(a) {
                var b = [];
                for (var c in a) b.push(encodeURIComponent(c) + "=" + encodeURIComponent(a[c]));
                return b.join("&");
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).success(function(c) {
            "Invalid username or password" === c.status ? (f(function() {
                a.errorMessage = "";
            }, 3500), a.errorMessage = c.status, g("top")) : (e.setUsername(c.username, c.id, c.token), 
            b.path("#!/upload" === a.oldHash ? "/upload" : "#!/login" === a.oldHash || "#!/logout" === a.oldHash || "#!/signup" === a.oldHash || "#!/forgot" === a.oldHash || a.oldHash === "#!/forgot/" + h.forgotToken ? "/" : a.oldHash.replace("#!/", "/")));
        }).error(function(b) {
            a.errorMessage = b.status;
        }) : (a.submittedError = !0, g("top"));
    };
};

loginCtrl.$inject = [ "$scope", "$location", "$http", "configService", "usernameService", "$timeout", "$anchorScroll", "$cookies" ];

var logoutCtrl = function(a, b, c, d, e) {
    console.log(e.token()), console.log(a.token), c({
        method: "POST",
        url: d.API_END_POINT + "auth/logout",
        data: {
            token: e.token()
        },
        transformRequest: function(a) {
            var b = [];
            for (var c in a) b.push(encodeURIComponent(c) + "=" + encodeURIComponent(a[c]));
            return b.join("&");
        },
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).success(function() {
        console.log("got here"), e.setUsername("empty", "empty", "empty"), b.path("/login");
    });
};

logoutCtrl.$inject = [ "$scope", "$location", "$http", "configService", "usernameService" ];

var mainCtrl = function(a, b, c, d, e, f, g, h, i) {
    a.emailRegx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
    a.getPage = function(a) {
        return b.path().split("/")[a];
    }, a.getPageTag = function() {
        return b.path().split("/")[3] || "Unknown";
    }, a.getPageType = function() {
        return b.path().split("/")[2] || "Unknown";
    }, a.$watch(function() {
        return e.currentTag;
    }), a.getCurrentTag = function() {
        return e.currentTag;
    }, a.searchQuery = function(c) {
        a.query = c, b.path("/tagsearch");
    }, a.searchClear = function(b) {
        0 === b.length && (a.topQuery = "", a.query = ""), a.listLength = function() {
            return document.getElementsByClassName("tag-list").length;
        };
    }, null !== window.localStorage.getItem("CountryCode") ? a.countryCode = window.localStorage.getItem("CountryCode") : c({
        method: "GET",
        url: "http://freegeoip.net/json/"
    }).success(function(b) {
        window.localStorage.setItem("CountryCode", b.country_code), a.countryCode = window.localStorage.getItem("CountryCode");
    }).error(function() {
        window.localStorage.setItem("CountryCode", "us");
    }), a.getUserDetails = function(b) {
        c({
            method: "POST",
            data: {
                userId: e.id
            },
            url: g.API_END_POINT + "auth/get/" + b
        }).success(function(b) {
            a.gravatarEmail = i(b.email);
        });
    }, a.$watch(function() {
        return e.username;
    }, function() {
        h.isActive().then(function(b) {
            b.data.active === !0 ? (a.isUserLogged = e.username, a.getUserDetails("email")) : (a.isUserLogged = null, 
            a.gravatarEmail = null);
        });
    }), a.roundFontSize = function(a, b, c) {
        var d = 120, e = 500, f = 0;
        if (b === c) f = e; else {
            var g = (e - d) / (c - b);
            f = d + (c - (c - (a - b))) * g;
        }
        return Math.round(f);
    }, a.roundTagColor = function(b, c, d) {
        var e, f = a.roundFontSize(b, c, d);
        return f > 100 && (e = "tag1"), f > 200 && (e = "tag2"), f > 300 && (e = "tag3"), 
        f > 400 && (e = "tag4"), e;
    }, a.roundTagSize = function(b, c, d) {
        var e, f = a.roundFontSize(b, c, d);
        return f > 100 && (e = "tagSize1"), f > 200 && (e = "tagSize2"), f > 300 && (e = "tagSize3"), 
        f > 400 && (e = "tagSize4"), e;
    }, a.imgSize = function(b, c, d) {
        var e, f = a.roundFontSize(b, c, d);
        return f > 100 && (e = "img-size-sm"), f > 200 && (e = "img-size-m"), f > 300 && (e = "img-size-m2"), 
        f > 400 && (e = "img-size-lg"), e;
    }, a.$on("$locationChangeStart", function(b, c, e) {
        a.oldUrl = e, a.oldHash = d.location.hash;
    });
};

mainCtrl.$inject = [ "$scope", "$location", "$http", "$window", "$cookies", "$log", "configService", "usernameService", "md5" ];

var ratingCtrl = function(a, b, c, d, e, f, g, h, i, j, k) {
    d.getRatingData().then(function(b) {
        a.ratings = b.data;
    });
    var l = a.getPageTag(), m = a.getPageType();
    a.getValue = function(a, d, f, g) {
        0 !== a && c({
            method: "POST",
            url: e.API_END_POINT + "rating/add",
            data: {
                userId: "1",
                againstTag: l,
                objectId: f,
                score: a
            },
            transformRequest: function(a) {
                var b = [];
                for (var c in a) b.push(encodeURIComponent(c) + "=" + encodeURIComponent(a[c]));
                return b.join("&");
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }), b.path(null == g ? "/rate/" + m + "/" + l + "/end/" + f + "/" + f : "/rate/" + m + "/" + l + "/" + g + "/" + f);
    }, k.currentTag = a.getPageTag();
};

ratingCtrl.$inject = [ "$scope", "$location", "$http", "ratingService", "configService", "commentService", "$timeout", "$window", "usernameService", "$q", "$cookies" ];

var signupCtrl = function(a, b, c, d, e, f) {
    a.passwordStrength = function() {
        var b = {
            password: a.user.password
        };
        c({
            method: "POST",
            url: d.API_END_POINT + "auth/check/password",
            data: b
        }).success(function(b) {
            "strong" === b.status && (a.checkStrengthMessage = "strong", a.strengthColor = "success", 
            a.strengthValue = 100), "medium" === b.status && (a.checkStrengthMessage = "medium", 
            a.strengthColor = "warning", a.strengthValue = 60), "weak" === b.status && (a.checkStrengthMessage = "weak", 
            a.strengthColor = "danger", a.strengthValue = 30);
        });
    }, a.processForm = function(b) {
        if (b) {
            console.log(a.username), console.log(a.email), console.log(a.user.password), console.log(a.user.passwordConfirm);
            var g = {
                username: a.username,
                email: a.email,
                password: a.user.password,
                confirmPassword: a.user.passwordConfirm
            };
            c({
                method: "POST",
                url: d.API_END_POINT + "auth/create",
                data: g,
                transformRequest: function(a) {
                    var b = [];
                    for (var c in a) b.push(encodeURIComponent(c) + "=" + encodeURIComponent(a[c]));
                    return b.join("&");
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).success(function(b) {
                console.log(b), "Password not strong enough" === b.status ? (e(function() {
                    a.errorMessagePassword = "";
                }, 3500), a.errorMessagePassword = b.message) : "ok" === b.status && (a.signupMessage = "Success! You have been sent an email with instructions on how to activate your account.");
            }).error(function() {});
        } else a.submittedError = !0, f("top");
    };
};

signupCtrl.$inject = [ "$scope", "$location", "$http", "configService", "$timeout", "$anchorScroll" ];

var startRandomTagCtrl = function(a, b) {
    b.getRandomTagData("tag").then(function(b) {
        a.randomTag = b.data.random_tag;
    });
};

startRandomTagCtrl.$inject = [ "$scope", "startService" ];

var tagCloudCtrl = function(a, b) {
    b.getTagCloudData("tag", "all", "all", "18").then(function(b) {
        a.tagCloud = b.data;
    });
};

tagCloudCtrl.$inject = [ "$scope", "tagCloudService" ];

var tagPopularCtrl = function(a, b) {
    b.getTagCloudData("tag", "popular", "all", "18").then(function(b) {
        a.tagCloud = b.data;
    });
};

tagPopularCtrl.$inject = [ "$scope", "tagCloudService", "$animate", "$timeout" ];

var tagRandomCtrl = function(a, b) {
    b.getTagCloudData("tag", "random", "all", "18").then(function(b) {
        a.tagCloud = b.data;
    });
};

tagRandomCtrl.$inject = [ "$scope", "tagCloudService" ];

var tagRecentCtrl = function(a, b) {
    b.getTagCloudData("tag", "recent", "all", "18").then(function(b) {
        a.tagCloud = b.data;
    });
};

tagRecentCtrl.$inject = [ "$scope", "tagCloudService" ];

var tagRandomCtrl = function(a, b) {
    b.getTagCloudData("tag", "random", "all", "18").then(function(b) {
        a.tagCloud = b.data;
    });
};

tagRandomCtrl.$inject = [ "$scope", "tagCloudService" ], app.filter("slice", function() {
    return function(a, b, c) {
        return (a || []).slice(b, c);
    };
});

var tagSearchCtrl = function(a, b) {
    a.radioModel = "all", "" === a.query || void 0 === a.query ? b.getTagSearchData("tag", "all", "all", "all").then(function(b) {
        a.tagCloud = b.data;
    }) : b.getTagSearchData("tag", "all", a.query, "all").then(function(b) {
        a.tagCloud = b.data;
    }), a.searchTags = function(c, d, e) {
        a.tagCloud = "", d ? (b.getTagSearchData("tag", c, a.query, e).then(function(b) {
            a.tagCloud = b.data;
        }), document.getElementById("top-search").value = "") : b.getTagSearchData("tag", c, "all", "all").then(function(b) {
            a.tagCloud = b.data;
        }), a.listLength = function() {
            return document.getElementsByClassName("tag-list").length;
        };
    };
};

tagSearchCtrl.$inject = [ "$scope", "tagSearchService" ];

var topCtrl = function(a, b, c) {
    a.top = b.top, b.gettopData(), a.reverseIndex = function(a, b) {
        return b - a + 1;
    }, c.currentTag = a.getPageTag();
};

topCtrl.$inject = [ "$scope", "topService", "$cookies" ];

var uploadsCtrl = function(a, b) {
    b.getUploadsData("image", "popular", "all", "12").then(function(b) {
        a.uploads = b.data;
    });
};

uploadsCtrl.$inject = [ "$scope", "uploadsService" ];

var uploadsVideosCtrl = function(a, b) {
    b.getUploadsData("video", "popular", "all", "12").then(function(b) {
        a.uploadsVideo = b.data;
    });
};

uploadsVideosCtrl.$inject = [ "$scope", "uploadsService" ];

var uploadsRandomCtrl = function(a, b) {
    b.getUploadsData("image", "random", "all", "12").then(function(b) {
        a.uploads = b.data;
    });
};

uploadsRandomCtrl.$inject = [ "$scope", "uploadsService" ];

var uploadsRandomVideosCtrl = function(a, b) {
    b.getUploadsData("video", "random", "all", "12").then(function(b) {
        a.uploadsVideo = b.data;
    });
};

uploadsRandomVideosCtrl.$inject = [ "$scope", "uploadsService" ];

var uploadsRecentCtrl = function(a, b) {
    b.getUploadsData("image", "recent", "all", "12").then(function(b) {
        a.uploads = b.data;
    });
};

uploadsRecentCtrl.$inject = [ "$scope", "uploadsService" ];

var uploadsRecentVideosCtrl = function(a, b) {
    b.getUploadsData("video", "recent", "all", "12").then(function(b) {
        a.uploadsVideo = b.data;
    });
};

uploadsRecentVideosCtrl.$inject = [ "$scope", "uploadsService" ];

var userCtrl = function(a, b, c) {
    (void 0 === c.username() || "empty" === c.username()) && b.path("/login");
};

userCtrl.$inject = [ "$scope", "$location", "usernameService" ];

var userEditCtrl = function(a, b, c) {
    (void 0 === c.username() || "empty" === c.username()) && b.path("/login");
};

userEditCtrl.$inject = [ "$scope", "$location", "usernameService" ];

var userPopularCtrl = function(a, b) {
    b.getTagCloudData("users", "popular", "6").then(function(b) {
        a.tagCloud = b.data;
    });
};

userPopularCtrl.$inject = [ "$scope", "userService" ];

var userRecentCtrl = function(a, b) {
    b.getTagCloudData("user", "recent", "all", "6").then(function(b) {
        a.tagCloud = b.data;
    });
};

userRecentCtrl.$inject = [ "$scope", "userCloudService" ];

var userRandomCtrl = function(a, b) {
    b.getTagCloudData("user", "random", "all", "6").then(function(b) {
        a.tagCloud = b.data;
    });
};

userRandomCtrl.$inject = [ "$scope", "userCloudService" ], app.service("data", [ "$http", "$q", "tagCloudService", function(a, b, c) {
    var d = {};
    this.search = function(a) {
        var e = c.getTagCloudData("tag", "all", a, "all").then(function(c) {
            for (var e = c.data[0].tagCloud, f = [], g = 0; g < e.length; g++) f.push(e[g].tag);
            d = f;
            var h, i = b.defer();
            return h = _.chain(d).filter(function(b) {
                return b.toLowerCase().indexOf(a.toLowerCase()) > -1;
            }).take(10).value(), i.resolve(h), i.promise;
        });
        return e;
    };
} ]), app.service("commentService", [ "$http", "$location", "configService", function(a, b, c) {
    return {
        save: function(b, d, e) {
            return console.log("token to ship" + e), a({
                method: "POST",
                url: c.API_END_POINT + "comment/add",
                data: {
                    comment: b,
                    userToken: e,
                    objectId: d
                },
                transformRequest: function(a) {
                    var b = [];
                    for (var c in a) b.push(encodeURIComponent(c) + "=" + encodeURIComponent(a[c]));
                    return b.join("&");
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
        }
    };
} ]), app.service("configService", [ function() {
    var a = "http://hashbangit.herokuapp.com/";
    return {
        API_END_POINT: a
    };
} ]), app.service("displayUploadService", [ "$http", "$location", "configService", function(a, b, c) {
    var d = [], e = function() {
        var e = b.path().split("/")[3] || "Unknown", f = c.API_END_POINT + "upload/" + e;
        a.get(f).then(function(a) {
            console.log(a.data), angular.copy(JSON.parse("[" + JSON.stringify(a.data) + "]"), d);
        }, function() {});
    };
    return {
        displayUpload: d,
        getDisplayUploadData: e
    };
} ]), app.service("endService", [ "$http", "$location", "configService", function(a, b, c) {
    var d = [];
    return {
        ratings: d,
        getRatingData: function(d, e, f) {
            d = b.path().split("/")[2] || "Unknown", e = b.path().split("/")[3] || "Unknown", 
            f = b.path().split("/")[5] || "Unknown";
            var g = c.API_END_POINT + "/tag/end/" + d + "/" + e + "/" + f, h = a({
                method: "GET",
                url: g
            }).success(function(a) {
                return a;
            });
            return h;
        }
    };
} ]), app.service("ratingService", [ "$http", "$location", "configService", function(a, b, c) {
    var d = [], e = [];
    return {
        ratings: d,
        getRatingData: function() {
            var d, f, g, h;
            "video" === b.path().split("/")[1] ? (h = b.path().split("/")[3] || "Unknown", d = b.path().split("/")[4] || "Unknown", 
            f = b.path().split("/")[5] || "Unknown", g = b.path().split("/")[6] || "Unknown") : (h = b.path().split("/")[2] || "Unknown", 
            d = b.path().split("/")[3] || "Unknown", f = b.path().split("/")[4] || "Unknown", 
            g = b.path().split("/")[5] || "Unknown");
            var i = c.API_END_POINT + "tag/", j = i + h + "/" + d;
            "Unknown" !== f && (j = j + "/" + f, -1 === e.indexOf(f) && e.push(f)), "Unknown" !== g && (j = j + "/" + g, 
            -1 === e.indexOf(g) && e.push(g));
            var k = a({
                method: "POST",
                url: j,
                data: {
                    ignoreIds: e
                },
                transformRequest: function(a) {
                    var b = [];
                    for (var c in a) b.push(encodeURIComponent(c) + "=" + encodeURIComponent(a[c]));
                    return b.join("&");
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).error(function() {
                b.path("/top/" + d);
            }).success(function(a) {
                return a;
            });
            return k;
        }
    };
} ]), app.service("startService", [ "$http", "$location", "configService", function(a, b, c) {
    var d = [];
    return {
        randomTag: d,
        getRandomTagData: function(b) {
            var d = c.API_END_POINT + "/tag/start/" + b, e = a({
                method: "GET",
                url: d
            }).success(function(a) {
                return a;
            });
            return e;
        }
    };
} ]), app.service("tagCloudService", [ "$http", "$location", "configService", function(a, b, c) {
    var d = [];
    return {
        tagCloud: d,
        getTagCloudData: function(b, d, e, f) {
            var g = c.API_END_POINT + "tag/" + b + "/" + d + "/" + e + "/" + f, h = a({
                method: "GET",
                url: g
            }).success(function(a) {
                return a;
            });
            return h;
        }
    };
} ]), app.service("tagSearchService", [ "$http", "$location", "configService", function(a, b, c) {
    var d = [];
    return {
        tagCloud: d,
        getTagSearchData: function(b, d, e, f) {
            var g = c.API_END_POINT + "tag/" + b + "/" + d + "/" + e + "/" + f, h = a({
                method: "GET",
                url: g
            }).success(function(a) {
                return a;
            });
            return h;
        }
    };
} ]), app.service("topService", [ "$http", "$location", "configService", function(a, b, c) {
    var d = [], e = function() {
        var e = b.path().split("/")[3] || "Unknown", f = c.API_END_POINT + "leaderboard/" + e + "/20";
        a.get(f).then(function(a) {
            angular.copy(a.data, d);
        }, function() {});
    };
    return {
        top: d,
        gettopData: e
    };
} ]), app.service("uploadsService", [ "$http", "$location", "configService", function(a, b, c) {
    var d = [];
    return {
        uploads: d,
        getUploadsData: function(b, d, e, f) {
            var g = c.API_END_POINT + "upload/" + b + "/" + d + "/" + e + "/" + f, h = a({
                method: "GET",
                url: g
            }).success(function(a) {
                return a;
            });
            return h;
        }
    };
} ]), app.service("userCloudService", [ "$http", "$location", "configService", function(a, b, c) {
    var d = [];
    return {
        tagCloud: d,
        getTagCloudData: function(b, d, e, f) {
            var g = c.API_END_POINT + "tag/" + b + "/" + d + "/" + e + "/" + f, h = a({
                method: "GET",
                url: g
            }).success(function(a) {
                return a;
            });
            return h;
        }
    };
} ]), app.service("userService", [ "$http", "$location", "configService", function(a, b, c) {
    var d = [];
    return {
        tagCloud: d,
        getTagCloudData: function(b, d, e) {
            var f = c.API_END_POINT + b + "/" + d + "/" + e, g = a({
                method: "GET",
                url: f
            }).success(function(a) {
                return a;
            });
            return g;
        }
    };
} ]), app.service("usernameService", [ "$cookies", "$http", "configService", function(a, b, c) {
    return {
        username: function() {
            return a.username;
        },
        id: function() {
            return a.id;
        },
        token: function() {
            return a.token;
        },
        isActive: function() {
            console.log(this.token());
            var a = b({
                method: "POST",
                url: c.API_END_POINT + "auth/active",
                data: {
                    token: this.token()
                },
                transformRequest: function(a) {
                    var b = [];
                    for (var c in a) b.push(encodeURIComponent(c) + "=" + encodeURIComponent(a[c]));
                    return b.join("&");
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).success(function(a) {
                return a.active;
            });
            return a;
        },
        setUsername: function(b, c, d) {
            a.username = b, a.id = c, a.token = d;
        }
    };
} ]), app.directive("ensureUnique", [ "$http", "configService", function(a, b) {
    return {
        require: "ngModel",
        link: function(c, d, e, f) {
            c.$watch(e.ngModel, function() {
                var c = {};
                c[e.ngModel] = d[0].value, a({
                    method: "POST",
                    url: b.API_END_POINT + "auth/check/" + e.ensureUnique,
                    data: c
                }).success(function(a) {
                    "already in use" === a.status ? f.$setValidity("unique", !1) : f.$setValidity("unique", !0);
                });
            });
        }
    };
} ]), app.directive("imgCropped", [ "$window", function(a) {
    var b = {};
    return {
        restrict: "E",
        replace: !0,
        scope: {
            src: "@",
            selected: "&"
        },
        link: function(c, d) {
            var e, f = function() {
                e && (e.next().remove(), e.remove(), e = void 0);
            };
            c.$watch("src", function(g) {
                f(), g && (d.after('<img style="max-width: 100%;"/>'), e = d.next(), e.attr("src", g), 
                a.jQuery(e).Jcrop({
                    trackDocument: !0,
                    onSelect: function(a) {
                        c.$apply(function() {
                            a.bx = b.x, a.by = b.y, c.selected({
                                cords: a
                            });
                        });
                    },
                    onChange: function(a) {
                        c.$apply(function() {
                            a.bx = b.x, a.by = b.y, c.selected({
                                cords: a
                            });
                        });
                    },
                    aspectRatio: 1,
                    minSize: [ 80, 80 ]
                }, function() {
                    var a = this.getBounds();
                    b.x = a[0], b.y = a[1];
                    this.animateTo([ 162, 72, 385, 295 ]);
                }));
            }), c.$on("$destroy", f);
        }
    };
} ]), app.directive("loading", [ "$http", "$location", function() {
    return {
        restrict: "E",
        replace: !0,
        template: '<p>Loading preview... <i class="fa fa-cog fa-spin" style="margin-top: 3em;"></i></p>',
        link: function(a, b) {
            a.$watch("loading", function(a) {
                a ? $(b).show() : $(b).hide();
            });
        }
    };
} ]), app.directive("match", [ function() {
    return {
        require: "ngModel",
        restrict: "A",
        scope: {
            match: "="
        },
        link: function(a, b, c, d) {
            a.$watch(function() {
                return d.$pristine && angular.isUndefined(d.$modelValue) || a.match === d.$modelValue;
            }, function(a) {
                d.$setValidity("match", a);
            });
        }
    };
} ]), app.directive("youtube", [ "$sce", function(a) {
    return {
        restrict: "EA",
        scope: {
            code: "@code"
        },
        replace: !0,
        template: '<div style="height:400px;"><iframe style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
        link: function(b) {
            b.$watch("code", function(c) {
                c && (b.url = a.trustAsResourceUrl("http://www.youtube.com/embed/" + c));
            });
        }
    };
} ]);