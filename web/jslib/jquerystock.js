var obj;
var sid="000001";
$(document).ready(function () {
    //调用servlet
    getInfo();
    //刷新页面函数
    setInterval(getInfo,1000);

    //隐藏弹出框，鼠标划上链接时显示弹窗
    var stockNode = $("#stock").css("border","1px solid black").width("150px")
        .css("position","absolute").css("z-index","99").css("background-color","blue")
        .css("color","yellow");;
    stockNode.hide();
    var as = $("a");

    as.mouseover(function (event) {
        var aNode = $(this);
        var divNode = aNode.parent();
        sid = divNode.attr("id");
        //更新股票详细信息
        updatadiv();
        //显示股票详细信息（由div框的布局来决定）
        // var offset = aNode.offset();
        // stockNode.css("left",offset.left+"px").css("top",offset.top+aNode.height+"px");
        var myEvent = event||window.event;
        stockNode.css("left",myEvent.clientX+5+"px").css("top",myEvent.clientY+5+"px");
        stockNode.show();
    });

    as.mouseout(function () {
        stockNode.hide();
    });
});

function getInfo() {
    $.get("GetStocksInfo",null,function (data) {
        //获取返回JSON转换成两只股票的对象
        obj = eval(data);
        //用中括号 获取两只股票的当前指数信息
        var szzs = obj["300001"];
        var pfyh = obj["000001"];

        var span3 = $("#300001").children("span");
        span3.html(szzs.now);
        if(szzs.now>szzs.yes){
            span3.css("color","red");
        } else {
            span3.css("color","green");
        }

        var span1 = $("#000001").children("span");
        span1.html(pfyh.now);
        if(pfyh.now>pfyh.yes){
            span1.css("color","red");
        } else {
            span1.css("color","green");
        }
        //更新股票详细信息
        updatadiv();
    });
}

function updatadiv() {
    var stockobj = obj[sid];
    for(var proname in stockobj){
        if(proname != "name"){
            $("#"+proname).children("span").html(stockobj[proname]);
        }
    }
}