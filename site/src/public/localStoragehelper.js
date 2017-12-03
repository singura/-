const KEY = 'buyGoods';
export function getItem(){
	var jsongString = localStorage.getItem(KEY);
	// 如果localStorage中没有这个key对应的数据则返回一个空对象
	if(!jsongString){
		return {}
	}
	// 如果有值，则将这个字符串转换成对象返回
	return JSON.parse(jsongString);
}
export function setItem(gobj){
	var obj = getItem();
	if(obj[gobj.gid]){
		obj[gobj.gid] = obj[gobj.gid] + gobj.count;
	}else{
		obj[gobj.gid] = gobj.count;
	}
	// 将obj存储在localStorage中
	localStorage.setItem(KEY,JSON.stringify(obj));
}
export function setItemReplace(gobj) {
	var obj = getItem();
		obj[gobj.gid] = gobj.count;
	// 将obj存储在localStorage中
	localStorage.setItem(KEY, JSON.stringify(obj));
}
// 删除
export function deleteItem(id){
	var obj = getItem();
	console.log(obj);
	for(var key in obj){
		if(key == id){
			delete obj[key];
			// console.log(key);
			// console.log(id);
		}
	}
	// console.log(obj);
	localStorage.setItem(KEY, JSON.stringify(obj));
}