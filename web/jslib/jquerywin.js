function showwin() {
    //alert("窗口！")
    var winNode = $("#win");
    //winNode.css("display","block");
    //winNode.show("slow");
    winNode.fadeIn("slow");
}

function hide() {
    var winNode = $("#win");
    //winNode.css("display","none");
    //winNode.hide("slow");
    winNode.fadeOut("slow");
}