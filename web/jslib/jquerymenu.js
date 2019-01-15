//装载时注册方法，并给所有主菜单注册点击，无需其它操作
$(document).ready(function () {
    //var uls=$("ul"); //防止ul区域中点击收回
    var as = $("ul>a");
    as.click(function () {
        //var ulNode = $(this); //当前主菜单的结点
        var aNode = $(this);
        //此时lis是a的兄弟节点
        //var lis = ulNode.children("li");
        var lis = aNode.nextAll("li");
        lis.toggle("show");
    });

    $("li>a").click(function () {
        //子菜单点击在id = content的装载页面
        $("#content").load($(this).attr("id"));
    });
});