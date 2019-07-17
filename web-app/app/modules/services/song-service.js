app.service("songService", function($http) {
    this.loadList = function() { 
        return $http.get("http://localhost:8181/cxf/music/manager/system/api/getsong");
    }

    this.deleteById = function(id){
        return $http.delete("../cxf/music/manager/system/api/getsong/" + id);
    }
    this.deleteAll = function(){
        return $http.delete("../cxf/music/manager/system/api/getsong/deleteAll");
    }

    this.playSong = function(id){
        return $http.get("../cxf/music/manager/system/api/getsong/getid/" + id);
    }
    
    this.getCountListSong = function(){
        return $http.get("http://localhost:8181/cxf/music/manager/system/api/getsong/count");
    }
    
    this.getListSongPagination = function(page, limit){
        return  $http.get("http://localhost:8181/cxf/music/manager/system/api/getsong/pagi/"+ limit +"/"+ page);
    }

    this.updateSong = function(id, data){
        return $http.put('../cxf/music/manager/system/api/getsong/' + id, data)
    }
    
    this.addSong = function(data){
        return $http.post("../cxf/music/manager/system/api/getsong/", data);
    }
});

