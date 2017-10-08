function getHTTPObject(){
	if (typeof XMLHttpRequest == "undefined") {
		XMLHttpRequest = function(){
			try{
				return new ActiveXObject("Msxml2.XMLHTTP.6.0");
			}catch(e){
				//TODO handle the exception
			};
			try{
				return new ActiveXObject("Msxml2.XMLHTTP.3.0");
			}catch(e){
				//TODO handle the exception
			};
			try{
				return new ActiveXObject("Msxml2.XMLHTTP");
			}catch(e){
				//TODO handle the exception
			};
			return false;
		};
	};
	return new XMLHttpRequest();
};
