app.service("loadSong", function($http) {
    this.loadList = function() { 
       return $http.get("http://localhost:8181/cxf/music/manager/system/api");
        //  return $http.get("/cxf/music/manager/system/api");
        // return $http.get("http://localhost:8181/cxf/mms/api");
    }
});