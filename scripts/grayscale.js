function convertToGS(img) {
    if (!Modernizr.canvas) return;
    //创建img对象的color属性，并把图片的源文件赋给该属性
    img.color = img.src;
    //创建img对象的grayscale属性，并把用createGSCanvas函数创建的灰度图片赋给该属性
    img.grayscale = createGSCanvas(img);
    //分别在onmouseover和onmouseout事件发生时切换图片
    img.onmouseover = function() {
        this.src = img.color;
    }
    img.onmouseout = function() {
        this.src = img.grayscale;
    }
    //在调用convertToGS函数时默认为鼠标移出状态（图片为灰色）
    img.onmouseout();
}

function createGSCanvas(img) {
    var canvas = document.createElement("canvas");
    //画布的宽高与图片的宽高相同
    canvas.width = img.width;
    canvas.height = img.height;
    //2d绘图，图片左上角相对于画布左上角重合（即0,0）
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img,0,0);
    //getImageData函数用于像素操作
    var c = ctx.getImageData(0,0,img.width,img.height);
    //c.width就是img.width,c.height同理
    for (var i=0;i< c.height; i++) {
        for (var j=0;i< c.width; j++) {
            var x = (i*4)*c.width + (j*4);
            var r = c.data[x];
            var g = c.data[x+1];
            var b = c.data[x+2];
            //红绿蓝三色取平均值，得灰色
            c.data[x]=c.data[x+1]=c.data[x+2]=(r+g+a)/3;
        }
    }
    //把灰度数据再放回到画布的绘图环境中
    ctx.putImageData(c,0,0,0,0,c.width,c.height);
    //返回原始的图像数据作为新灰度图片的源
    return canvas.toDataURL();
}