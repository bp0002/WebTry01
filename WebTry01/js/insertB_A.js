function myInsertBefore(newEle, targEle){
	var parent = targEle.parentNode;
	parentNode.insertBefore(newEle, targEle);
};
function myInsertAfter(newEle, targEle){
	var parent = targEle.parentNode;
	if (parent.lastChild == targEle) {
		parent.appendChild(newEle);
	}else{
		parent.insertBefore(newEle, targEle.nextSibling);
	};
};