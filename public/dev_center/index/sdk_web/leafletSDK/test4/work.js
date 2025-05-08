var data = [];
onmessage = function (evt){
    
	importScripts('batchDraw.js');

    

    var info = evt.data
	//var data = evt.data;
    var fun = info.fun;
    
    //var data = info.data;
   // console.log(JSON.stringify(data));
    var bounds = info.bounds;
    var level = info.level;
    var bhv = info.bhv;
    if(fun == 'createData'){
        var sp = info.sp;
    	data = generateData(data);
        data = createDraw(data, bounds,level,sp);
    }
    if(bhv == 'zoom'){
        var sp = info.sp;
        data = createDraw(data, bounds,level,sp);
    }
    var drawData = boundFilter(data, bounds,level);
    postMessage({drawData:drawData});


}