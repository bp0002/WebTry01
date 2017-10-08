function addOnLoadEvent(func){
	var oldOnlaod = window.onload;
	// 还没有绑定事件
	if (typeof window.onload != "function") {
		window.onload = func();  
	}else{
		window.onload = function(){
			oldOnlaod;
			func();
		};
	};
};