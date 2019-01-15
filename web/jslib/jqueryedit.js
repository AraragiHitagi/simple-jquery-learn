$(document).ready(function () {
    var tds = $("td");
    tds.click(tdclick);
});

function tdclick() {
    //变为可编辑表格
    var td = $(this);
    var text = td.text();
    td.html("");
    var input = $("<input>");
    input.attr("value", text);
    //给输入框响应键盘事件
    input.keyup(function (event) {
        var myEvent = event || window.event;
        var kcode = myEvent.keyCode;
        if (kcode == 13) {
            var inputnode = $(this);
            var inputtext = inputnode.val();
            //获取该输入框对应的td节点
            var tdNode = inputnode.parent();
            //变为表格
            tdNode.html(inputtext);
            tdNode.click(tdclick);
        }
    });
    //变为输入框
    td.append(input);
    //编辑文字全部被选中
    var inputdom = input.get(0);
    inputdom.select();
    //清除td上的点击事件，避免再次点击清空输入框
    td.unbind("click");
}