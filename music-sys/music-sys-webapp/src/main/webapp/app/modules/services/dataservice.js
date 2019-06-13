app.service("myData", function() {
	var saveData = {};
	var savestatus = "";
	this.setData = function(data) {
		saveData = data;
	}
	this.getData = function() {
		return saveData;
	}

	this.setStatus = function(status) {
		savestatus = status;
	}
	this.getStatus = function() {
		return savestatus;
	}
});

