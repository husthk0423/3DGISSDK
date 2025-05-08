Example={
	init : function(url) {
	this.initCopy();
	this.initRun();
	this.renderData(url);
},
	initCopy : function() {
				
		var that = this;
		var clipboard = new ClipboardJS(document.getElementById("copy-button"),{
			text: function(trigger) {
				var iframeContent = that.getCode();
				if (!iframeContent) {
					iframeContent = $("#myresource").val();
				}
        		return iframeContent;
    		}
		});
    	clipboard.on('success', function(e) {
	        alert("复制成功!");
	        e.clearSelection();
	    });
	    clipboard.on('error', function(e) {
	        alert("复制失败!");
	    });
	},
	
	initRun : function() {
		var that = this;
		$("#run-button").click(function() {
			var iframeContent = that.getCode();
			$("#exampleCon").find("iframe").remove();
			//新建iframe
			var previewFrame = $("#exampleCon").append('<iframe id="exampleFrame" frameborder="0" width="100%" height="100%"></iframe>').find("iframe")[0];
			var preview = previewFrame.contentDocument || previewFrame.contentWindow.document;
			if(that.myBrowser()!="IE"){
				
				preview.open();
				preview.write(iframeContent);//写入内容
				preview.close()
			}
			else{//IE浏览器
				var iframeJqueryContent=iframeContent.substr(0,iframeContent.indexOf("$"));
				var iframeLoadContent=iframeContent.substr(iframeContent.indexOf("$"));
				preview.open();
				preview.write(iframeJqueryContent);//写入内容
                preview.write(iframeLoadContent);//写入内容
                preview.close();
			}
			
			return false;
		});
	},
	
	renderData : function(url){
		var that = this;
		$("#exampleFrame").attr("src", url);
		var result = $.ajax({ 
			async:false, 
			url : url,
			success : function(result){ 
			$("#myresource").val(result);
			that.setEditorAreaValue();
			} 
			}); 
		
		
	},
	
	setEditorAreaValue : function() {
		if (!this.editor) {
			this.editor = CodeMirror.fromTextArea(document
					.getElementById("myresource"), {
				lineWrapping : true, // 是否显示scroll
				lineNumbers : true, // 是否显示number
				styleActiveLine : true,
				matchBrackets : true,
				mode : "htmlmixed",
				viewportMargin : Infinity
			});
		} else {
			this.editor.setValue($("#myresource").val());
		}
	},
	
	getCode : function() {
		if (this.editor) {
			return this.editor.getValue();
		}
		return $("#myresource").val();
	},
	
		/**判断浏览器*/
	myBrowser:function(){
			var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
			var isOpera = userAgent.indexOf("Opera") > -1;
			if (isOpera) {
				return "Opera"
			}; //判断是否Opera浏览器
			if (userAgent.indexOf("Firefox") > -1) {
				return "FF";
			} //判断是否Firefox浏览器
			if (userAgent.indexOf("Chrome") > -1){
			  return "Chrome";
			 }
			if (userAgent.indexOf("Safari") > -1) {
				return "Safari";
			} //判断是否Safari浏览器
			if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
				return "IE";
			}; //判断是否IE浏览器
	},
	
	codeOpened : true,
	
	codeDivCloseBtnClick:function(obj){
		this.codeOpened = !this.codeOpened;
		if (!this.codeOpened) {
			$(obj).removeClass();
			$(obj).addClass("code_open");
			$("#codeAreaDiv").hide()
			$("#exampleCon").css("width","100%")
		} else {
			$(obj).removeClass();
			$(obj).addClass("code_close");
			$("#codeAreaDiv").show()
			$("#exampleCon").css("width","64.5%")
		}
	}
	
	
	
	
	
}