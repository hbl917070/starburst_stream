

var bac_暫存;
var int_編輯size = 300;
var int_儲存size = 900;
var int_儲存素材size = 512;
var int_儲存素材size_w = 0;
var int_儲存素材size_h = 0;


var bool_app = false;

//alert(9);

///
///
///
document.onload = function () {


    /*$.ajax({
        type: "get",
        url: "http://140.115.197.16/?school=ksu&app=星爆氣流斬合成器",
        data: {},
        success: function (result, status) {
        }
    });*/


    //註冊x3d鏡頭轉動的事件
    //document.getElementById('x3d01').addEventListener('viewpointChanged', viewFunc, false);



    //選取圖片
    var input = document.getElementById("file_input");

    if (typeof FileReader === 'undefined') {
        alert("抱歉，你的瀏覽器不支持 FileReader");
        input.setAttribute('disabled', 'disabled');
    } else {
        input.addEventListener('change', readFile, false);
    }



    function readFile() {
        var file = this.files[0];
        /*if (!/image\/\w+/.test(file.type)) {
            alert("文件必須為圖片！");
            return false;
        }*/
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            var src = this.result;
            fun_開啟圖片後初始化size(src);
        }
    }



    bac_暫存 = document.getElementById("bac01");

    fun_啟動程式初始化size();
    fun_增加圖層();
};



//
//新增圖層後呼叫
//
function fun_調整圖片大小(obj_img) {
    obj_img.width = document.getElementById("x3d01").clientWidth;
    obj_img.height = document.getElementById("x3d01").clientHeight;
}




///
///
///
function fun_啟動程式初始化size() {

    var size_max = int_編輯size;

    var nWidth = document.getElementById("m_top").offsetWidth
    var nHeight = document.getElementById("m_top").offsetHeight



    //避免圖片太大
    if (nWidth > size_max || nHeight > size_max) {
        var w01 = nWidth / size_max;
        var h01 = nHeight / size_max;

        if (w01 > h01) {
            nWidth = nWidth / w01;
            nHeight = nHeight / w01;
        } else {
            nWidth = nWidth / h01;
            nHeight = nHeight / h01;
        }
    }

    bac_暫存.width = nWidth * 2;
    bac_暫存.height = nHeight * 2;

    int_儲存素材size_w = nWidth * 1.5;
    int_儲存素材size_h = nHeight * 1.5;


    //修改成絕對size
    document.getElementById("bac").width = nWidth;
    document.getElementById("bac").height = nHeight;
    /*for (var i = 0; i < int_nub; i++) {
        document.getElementById("x3d" + i).style.width = nWidth + "px";
        document.getElementById("x3d" + i).style.height = nHeight + "px";
    }*/
    document.getElementById("x3d01").style.width = nWidth + "px";
    document.getElementById("x3d01").style.height = nHeight + "px";


    //計算縮放比例
    var x01 = (document.getElementById("m_top").offsetWidth * 0.98) / nWidth;
    var y01 = (document.getElementById("m_top").offsetHeight * 0.98) / nHeight;
    var scale = x01;
    if (x01 > y01) {
        scale = y01;
    }

    //計算左邊與上面的距離，讓圖片維持在正中間
    var left = (document.getElementById("m_top").offsetWidth - nWidth * scale) / 2;
    var top = (document.getElementById("m_top").offsetHeight - nHeight * scale) / 2;


    var sty = "transform:scale(" + scale + ");" +
                "left:" + left + "px;" +
                "top:" + top + "px";

    document.getElementById("top_box").setAttribute("style", sty);

}






///
///
///
function fun_計算暫存(image) {
    var size_max = int_儲存size;

    nWidth = image.naturalWidth;
    nHeight = image.naturalHeight;

    //避免圖片太大
    if (nWidth > size_max || nHeight > size_max) {
        var w01 = nWidth / size_max;
        var h01 = nHeight / size_max;

        if (w01 > h01) {
            nWidth = nWidth / w01;
            nHeight = nHeight / w01;
        } else {
            nWidth = nWidth / h01;
            nHeight = nHeight / h01;
        }
    }

    //修改成絕對size
    bac_暫存.width = nWidth;
    bac_暫存.height = nHeight;

    //繪製背景canvas
    var c = bac_暫存;
    var ctx = c.getContext("2d");
    ctx.drawImage(image, 0, 0, nWidth, nHeight);
}




///
///
///
function fun_開啟圖片後初始化size(src) {


    var image = new Image();
    image.src = src;


    //圖片加載完成時
    image.onload = function () {

        fun_計算暫存(this);
        fun_初始化素材size(this);
        var size_max = int_編輯size;

        var nWidth = image.naturalWidth;
        var nHeight = image.naturalHeight;


        //避免圖片太大
        if (nWidth > size_max || nHeight > size_max) {
            var w01 = nWidth / size_max;
            var h01 = nHeight / size_max;

            if (w01 > h01) {
                nWidth = nWidth / w01;
                nHeight = nHeight / w01;
            } else {
                nWidth = nWidth / h01;
                nHeight = nHeight / h01;
            }
        }

        //修改成絕對size
        document.getElementById("bac").width = nWidth;
        document.getElementById("bac").height = nHeight;
        /*for (var i = 0; i < int_nub; i++) {
            document.getElementById("x3d" + i).style.width = nWidth + "px";
            document.getElementById("x3d" + i).style.height = nHeight + "px";
        }*/
        document.getElementById("x3d01").style.width = nWidth + "px";
        document.getElementById("x3d01").style.height = nHeight + "px";

        //
        for (var i = document.getElementsByClassName("imgs").length - 1; i >= 0 ; i--) {
            fun_刪除圖層(document.getElementsByClassName("imgs")[i].id.replace("img_", ""));
        }

        fun_增加圖層();



        //繪製背景canvas
        var c = document.getElementById("bac");
        var ctx = c.getContext("2d");
        ctx.drawImage(image, 0, 0, nWidth, nHeight);

        //計算縮放比例
        var x01 = (document.getElementById("m_top").offsetWidth * 0.98) / nWidth;
        var y01 = (document.getElementById("m_top").offsetHeight * 0.98) / nHeight;
        var scale = x01;
        if (x01 > y01) {
            scale = y01;
        }

        //計算左邊與上面的距離，讓圖片維持在正中間
        var left = (document.getElementById("m_top").offsetWidth - nWidth * scale) / 2;
        var top = (document.getElementById("m_top").offsetHeight - nHeight * scale) / 2;


        var sty = "transform:scale(" + scale + ");" +
                    "left:" + left + "px;" +
                    "top:" + top + "px";

        document.getElementById("top_box").setAttribute("style", sty);


        image = null;

    };



}



///
///
///
function fun_初始化素材size(image) {

    var size_max = int_儲存素材size;

    nWidth = image.naturalWidth;
    nHeight = image.naturalHeight;

    //避免圖片太大
    if (nWidth > size_max || nHeight > size_max) {
        var w01 = nWidth / size_max;
        var h01 = nHeight / size_max;

        if (w01 > h01) {
            nWidth = nWidth / w01;
            nHeight = nHeight / w01;
        } else {
            nWidth = nWidth / h01;
            nHeight = nHeight / h01;
        }
    }

    //修改成絕對size
    int_儲存素材size_w = nWidth;
    int_儲存素材size_h = nHeight;
}



var ar_x3d = new Array();
var ctx;

var nWidth;
var nHeight;
var img_type;
var imgData;

var int_sum = 0;//判斷是否完成

///
///
///
function fun_save(img_type) {



    fun_儲存圖片_關閉();


    fun_儲存中_顯示();

    //設定檔名
    var d = new Date();
    var name = d.getFullYear() + "-" +
				("00" + (d.getMonth() + 1)).slice(-2) + "-" +
                ("00" + d.getDate()).slice(-2) + " " +
                ("00" + d.getHours()).slice(-2) + "-"
                + ("00" + d.getMinutes()).slice(-2) + "-"
                + ("00" + d.getSeconds()).slice(-2);
    if (img_type == "png_2") {
        name += ".png";
    } else {
        name += "." + img_type;
    }
    document.getElementById("a_download").setAttribute("download", name);



    var oCanvas = bac_暫存;
    ctx = oCanvas.getContext("2d");

    nWidth = oCanvas.offsetWidth;
    nHeight = oCanvas.offsetHeight;

    //複製
    var imgData = ctx.getImageData(0, 0, nWidth, nHeight);


    var ar_obj = document.getElementsByClassName("imgs");

    //如果是【不含原圖】，就清除底圖
    if (img_type == "png_2") {
        ctx.clearRect(0, 0, nWidth, nHeight);  //清空                 
    }


    for (var i = ar_obj.length - 1; i >= 0; i--) {
        ctx.drawImage(ar_obj[i], 0, 0, nWidth, nHeight);
    }


    //判斷儲存類型
    if (img_type == "jpg") {
        document.getElementById("a_download").href = bac_暫存.toDataURL('image/jpeg', 0.8);
    } else {
        document.getElementById("a_download").href = bac_暫存.toDataURL('image/png', 0.8);
    }


    fun_儲存中_隱藏();

    /*if (bool_app) {
        document.getElementById("a_download").click();
    } else {*/
    document.getElementById("saveed_img").src = document.getElementById("a_download").href;
    fun_儲存圖片ed_開啟();
    //}


    ctx.putImageData(imgData, 0, 0);   //貼上原本的圖片


    //----------------------------------------------------





    return;

    /*
    //依照圖層順序取得顯示中的素材陣列
    var ar0_x3d = document.getElementsByTagName("x3d");
    ar_x3d = new Array();
    for (var i = ar0_x3d.length - 1; i >= 0 ; i--) {
        if (ar0_x3d[i].style.display != "none") {
            ar_x3d.push(ar0_x3d[i]);
        }
    }

    if (ar_x3d.length == 0) {
        //alert("沒有開啟任何圖層，\n是要存檔什麼啦");

        //判斷儲存類型					
        if (img_type == "jpg") {
            document.getElementById("a_download").href = bac_暫存.toDataURL('image/jpeg', 0.8);
        } else {
            document.getElementById("a_download").href = bac_暫存.toDataURL('image/png', 0.8);
        }
        document.getElementById("a_download").click();
        fun_儲存中_隱藏();
        return;
    }







    fun_儲存中_顯示();
    try {
        //window.abc.fun_alert("開始下載");
    } catch (e) { }


    var oCanvas = bac_暫存;
    ctx = oCanvas.getContext("2d");

    nWidth = oCanvas.offsetWidth;
    nHeight = oCanvas.offsetHeight;

    //複製
    imgData = ctx.getImageData(0, 0, nWidth, nHeight);


    //如果是【不含原圖】，就清除底圖
    if (img_type == "png_2") {
        ctx.clearRect(0, 0, nWidth, nHeight);  //清空                 
    }

    //初始化參數
    int_sum = 0;
    j2 = 0;
    this.img_type = img_type;

    fun_save_1();//執行儲存
    */
}








/*
var j2 = 0;


///
///為了避免一次合成所有圖層導致當掉，所以分批進行
///
function fun_save_1() {

    if (j2 >= ar_x3d.length)
        return;
    setTimeout("fun_save_2(" + j2 + ");fun_save_1();", 150);
    j2++;
}


///
///為了避免一次合成所有圖層導致當掉，所以分批進行
///
function fun_save_2(j2) {




    ar_x3d[j2].style.width = int_儲存素材size_w + "px";
    ar_x3d[j2].style.height = int_儲存素材size_h + "px";


    //一秒後才執行
    setTimeout(function () {



        //先把base64轉成img物件，等到img物件載入完成後，在繪製到canvas裡面
        var imgUrl = ar_x3d[j2].runtime.getScreenshot();
        var img = new Image();
        img.src = imgUrl;

        //把素材縮小回編輯用的大小
        ar_x3d[j2].style.width = (document.getElementById("bac").offsetWidth) + "px";
        ar_x3d[j2].style.height = (document.getElementById("bac").offsetHeight) + "px";

        img.onload = function () {
            int_sum++;
            ctx.drawImage(this, 0, 0, nWidth, nHeight);

            //完成時下載
            if (int_sum == ar_x3d.length) {

                //判斷儲存類型
                if (img_type == "jpg") {
                    document.getElementById("a_download").href = bac_暫存.toDataURL('image/jpeg', 0.8);
                } else {
                    document.getElementById("a_download").href = bac_暫存.toDataURL('image/png', 0.8);
                }
                document.getElementById("a_download").click();

                //1秒後清理
                setTimeout(function () {

                    ctx.clearRect(0, 0, nWidth, nHeight);  //清空
                    ctx.putImageData(imgData, 0, 0);   //貼上原本的圖片
                    fun_儲存中_隱藏();

                    //x3dom.reload();//重繪x3d

                }, 300);

            }

            img = null;

        };


    }, 50);




}*/