/**
 * Created by kongjian on 2017/6/26.
 */
Custom.GVMapGridUtil =function() {
    //继承DataSource
    Custom.GXYZUtil.apply(this);

    //纹理
    this.textures = {};

    /**
     * 加载样式文件和纹理数据
     */
    this.loadStyle = function(styleType){
        var def1 = new Deferred();
        var def2 = new Deferred();


        if(!styleType){
            styleType = 'label';
        }

        //请求样式文件
        Custom.getJSON({url:this.host + '/mapserver/styleInfo/'+this.servername+'/'+this.styleId+'/'+styleType+'/style.js',dataType:'text'})
            .then(function(result) {
                this.styleFun = new Function("drawer","level", result);
                def1.resolve();
            }.bind(this));

        //请求图标纹理
        Custom.getJSON({url:this.host+ '/mapserver/styleInfo/'+this.servername+'/'+this.styleId+'/label/texture.js',dataType:'text'}).then(function(result){
            var textures = JSON.parse(result);
            var totalCount = 0;
            for(var i in textures){
                totalCount++;
            }

            if(totalCount == 0){
                def2.resolve();
                return;
            }

            var count = 0;
            for(var key in textures){
                var img = new Image();
                img.name = key;
                img.onload = function(data) {
                    count++;
                    var name = data.target.name;
                    this.textures[name] =data.target;
                    if(count == totalCount){
                        def2.resolve();
                    }
                }.bind(this);
                img.src = textures[key];
            }
        }.bind(this));

        return [def1,def2];
    }
}