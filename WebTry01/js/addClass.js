function addClass(elem, value){
	if (elem.className){
		elem.className = value;
	}else{
		var newClass = elem.className;
		newClass += " ";
		newClass += value;
		elem.className = newClass;
	};
};
