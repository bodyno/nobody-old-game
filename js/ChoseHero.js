
var select = 2;

var pad = false;

var popId = 0;

window.onload = function () {
    height = document.body.scrollHeight;
    if (height == 601) height = 600;
    width = document.body.scrollWidth;
    var scale = height / 480;

    if (width > 1500) {
        pad = true;
        padScale = scale;
        sp = scale * 0.8;
    }

    var mainwrapper = (parseFloat(scale.toFixed(1))) * 854 > width ? (parseFloat(scale.toFixed(1))) * 854 : width;
    //$("#main").css({ "width": mainwrapper, "height": height, "background-size": mainwrapper + "px " + height + "px" });
    $("#main").css({ "width": width, "height": height, "background-size": width + "px " + height + "px" });

    $("#cartoon,#cartoonDiv2").css({ "width": width, "height": height });

    $("#cartoonMain,#cartoonContain2").css({ "left": (width - 854) / 2, "top": (height - 480) / 2, "webkit-transform": "scale(" + scale + ")" });

    $("#manSelect").css({ "left": (width - 800) / 2, "top": (height - 480) / 2 });
    
    if (pad) if (pad) $("#manSelect").css({ "zoom": sp, "left": (width - 800 * sp) / 2 / sp, "top": (height - 480 * sp) / 2 / sp });

    if (width <= 854) {
        $("#manSelect").css({ "-webkit-transform": "scale(0.8)" });
        $("#light").css({ "-webkit-transform": "scale(1.2)" })
    }

    //cartoon();
    $("#cartoon").hide();
    $("#main").show();

    $("#title").css({ "left": (width - 340) / 2 });

    if (pad) $("#title").css({ "zoom": sp, "left": (width - 340 * sp) / 2 / sp});

    $("#selectName").css({ "left": (width - 430) / 2 });

    if (pad) {
        $("#selectName").css({ "zoom": sp, "left": (width - 430 * sp) / 2 / sp });
        $("#cancelBtn").css({ "zoom": sp });
    }

    //下一步
    $("#chooseBtn").bind("touchend", function () {
        $(this).css({ "background-position-y": "0px" });
        if (cancel())
            return;
        $("#cartoon").hide();
        $("#main").show();
        window.GameMainClass.CollectUserStep(5);
    }).bind("touchstart", function () {
        $(this).css({ "background-position-y": "-59px" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "background-position-y": "0px" });
        move()
    })

    $("#man0").bind("touchend", function () {
        var tempImg1 = $(this).css("background-image");
        var tempImg2 = $("#man1").css("background-image");
        var tempImg3 = $("#man2").css("background-image");
        $(this).css("background-image", tempImg3);
        $("#man1").css("background-image", tempImg1);
        $("#man2").css("background-image", tempImg2);
        select--;
        if (select <= 0)
            select = 3;
        switch (select) {
            case 1:
                $("#detail").css("background-position-y", "0px");
                $("#skillName").text("火焰斩:对横排目标使用普通法术攻击");
                window.GameMainClass.palyActorSound("zhao");
                break;
            case 2:
                $("#detail").css("background-position-y", "-37px");
                $("#skillName").text("精准射:对单体使用强力物理攻击");
                window.GameMainClass.palyActorSound("sun");
                break;
            case 3:
                $("#detail").css("background-position-y", "-74px");
                $("#skillName").text("地裂石突:对竖排目标使用法术攻击");
                window.GameMainClass.palyActorSound("jia");
                break;
        }
    })

    //返回
    $("#cancelBtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.changePage("realLogin.htm");
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move()
    })


    $("#man2").bind("touchend", function () {
        var tempImg1 = $("#man0").css("background-image");
        var tempImg2 = $("#man1").css("background-image");
        var tempImg3 = $(this).css("background-image");
        $("#man0").css("background-image", tempImg2);
        $("#man1").css("background-image", tempImg3);
        $(this).css("background-image", tempImg1);
        select++;
        if (select > 3)
            select = 1;
        switch (select) {
            case 1:
                $("#detail").css("background-position-y", "0px");
                $("#skillName").text("火焰斩:对横排目标使用普通法术攻击");
                window.GameMainClass.palyActorSound("zhao");
                break;
            case 2:
                $("#detail").css("background-position-y", "-37px");
                $("#skillName").text("精准射:对单体使用强力物理攻击");
                window.GameMainClass.palyActorSound("sun");
                break;
            case 3:
                $("#detail").css("background-position-y", "-74px");
                $("#skillName").text("地裂石突:对竖排目标使用法术攻击");
                window.GameMainClass.palyActorSound("jia");
                break;
        }
    })

    //随机按钮事件
    $("#boult").bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        //event.stoppropagation();
    }).bind("touchend touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        window.GameMainClass.sendRequestJson(1101, "", "getRandName");
        //event.stoppropagation();
    })

    //按钮事件
    $("#startGame").bind("touchstart", function () {
        $(this).css({ "background-position-y": "-59px" });
    }).bind("touchend touchmove", function () {

        if ($("#nameBg").val().trim() == "") {
            showTextMess("请输入主公大名",2);
            return;
        }
        if ($("#nameBg").val().trim().length > 6) {
            showTextMess("主公,你的姓名太长了", 2);
            return;
        }
        $(this).css({ "background-position-y": "0px" });
        start();
    })

    //开始穿越
    $("#goBtn2").bind("touchend", function () {
        $(this).css({ "background-position-y": "0px" });
        if (cancel())
            return;
        window.GameMainClass.changePage("city.htm");
    }).bind("touchstart", function () {
        $(this).css({ "background-position-y": "-59px" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "background-position-y": "0px" });
        move()
    })
}


//随机姓名
var getRandName = function (name) {
    $("#nameBg").val(name);
}

//开始游戏按钮
var start = function () {
    //检查姓名-->注册
    window.GameMainClass.sendRequestJson(1094, "{\"nick\":\"" + $("#nameBg").val().trim() + "\"}", "checkNick");
}

//注册成功-->105登录信息
var registOk = function (json) {
    var data = JSON.parse(json);
    if (data.resert == 2) {
        showTextMess(data.info, 2);
        return;
    }
    if (data.resert == 1) {
        //设置uid
        window.GameMainClass.setUid(data.uid);
        //跳转主城
        window.GameMainClass.changePage("city.htm");
    } else {
        showTextMess(data.info,2);
    }
    
}

//检查用户名合法-->注册1003
var checkNick = function (json) {
    var data = JSON.parse(json);
    if (data.resert != 1) {
        showTextMess(data.info,2);
        return;
    }
    else {
        var data = '{ "pos": ' + select + ', "nick": "' + $("#nameBg").val().trim() + '", "skyid": "' + window.GameMainClass.getUserLoginId() + '", "utype": ' + window.GameMainClass.getUtype() + ', "phone": "' + window.GameMainClass.getPhoneInfo() + '" }';
        window.GameMainClass.sendRequestJson(1003, data, "registOk");
    }
}

//登录
var login = function (json) {
    var data = JSON.parse(json);
    if (data.resert == 1) {
        window.GameMainClass.setUid(data.uid);
        //跳转 动画2
        //$("#main").hide();
        //$("#cartoonDiv2").show();
        window.GameMainClass.changePage("city.htm");
        //cartoon2();
    } else {
        showTextMess(data.info,2);
    }
}

//动画
var cartoon = function () {
    var tempFlag = 0;

    var cartoonTime = setInterval(function () {
        tempFlag++;
        if (tempFlag == 3) {
            $("#cartoon" + tempFlag).slideDown("500");
        }
        else {
            $("#cartoon" + tempFlag).show("500");
        }
        if (tempFlag == 3) {
            clearInterval(cartoonTime);
            setTimeout(function () {
                $("#chooseBtn").show("500");
                setTimeout(function () {
                    $("#chooseBtn").trigger("touchend");
                }, 3000);
            }, 500)
        }
    }, 1000)
}

var cartoon2 = function () {

    $("#cartoon_1").css("background-image", "url(res/login/cartoon/4-" + select + ".png)");

    var tempFlag = 0;

    var cartoonTime = setInterval(function () {
        tempFlag++;
        if (tempFlag == 5) {
            $("#cartoon_" + tempFlag).slideDown("500");
        }
        else {
            $("#cartoon_" + tempFlag).show("500");
        }
        if (tempFlag == 5) {
            clearInterval(cartoonTime);
            setTimeout(function () {
                $("#goBtn2").show("500");
                setTimeout(function () {
                    $("#goBtn2").trigger("touchend");
                }, 3000);
            }, 500)
        }
    }, 1000)
}

var beforePosX = 0;

//记录触摸结束的位置
var lastPosX = 0;

//获取触摸开始位置
function begin() {
    beforePosX = event.touches[0].pageX;
    lastPosX = beforePosX;
}

//获取触摸结束位置
function move() {
    lastPosX = event.touches[0].pageX;
}

//计算是否取消触摸
function cancel() {
    return Math.abs(lastPosX - beforePosX) > 5
}

var popTime;

/*文字提示(两种颜色type=1表示绿色 其它红色) 并且慢慢向上移动(25帧)*/

var showTextMess = function (mess, type, flag) {

    if (!flag) {
        if (document.getElementById("popDiv") != null) {
            setTimeout(function () {
                showTextMess(mess, type, true);
            }, 800)
            return;
        }
    }



    var table = document.createElement("table");
    table.border = 0;
    table.id = "popDiv";
    table.cellPadding = 0;
    table.cellSpacing = 0;

    table.innerHTML = "<tr><td class='popDivLeft'></td><td class='popDivCenter' style='color:" + (type == 1 ? "#00FF00" : "red") + ";'>" + mess + "</td><td class='popDivRight'></td></tr>";

    document.body.appendChild(table);

    if (pad) {
        $(table).css({ "zoom": padScale, "left": (width - $(table).width() * padScale) / 2 / padScale, "top": (height - 50) / 2 / padScale });
    }
    else {
        $(table).css({ "left": (width - $(table).width()) / 2, "top": (height - 50) / 2 });
    }


    var offset = 0;

    (function (i, Ele) {
        window["popTime" + i] = setInterval(function () {
            offset++;
            Ele.css("top", Ele.offset().top - 2);
            if (offset > 50) {
                clearInterval(window["popTime" + (i)]);

                setTimeout(function () {
                    Ele.hide("1000").remove();
                }, 1000)
            }
        }, 33)
    })(popId++, $(table))



}

var getServerList = function () {

}