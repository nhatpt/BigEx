app.service("loadSong", function($http) {
    this.loadList = function() { 
         return $http.get("/cxf/music/manager/system/api/getsong");
    }
});

