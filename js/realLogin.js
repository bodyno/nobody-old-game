/// <reference path="jquery-1.5.1.min.js" />
var serverList = null;// { "serverlist": [{ "port": 7010, "sid": 2, "type": 0, "sname": "删档封测二区", "ip": "58.221.42.238" }, { "port": 7010, "sid": 1, "type": 1, "sname": "删档封测一区", "ip": "192.168.1.5" }], "lastserver": {} }

var getServerList = function (json) {
    serverList = JSON.parse(json);
    height = document.body.scrollHeight;
    if (height == 601) height = 600;
    width = document.body.clientWidth;
    var scale = height / 480;
    if (serverList.lastserver.sname) {
        sid = serverList.lastserver.sid;
        var temp;
        for (var i = 0; i < serverList.serverlist.length; i++) {
            if (serverList.serverlist[i].sid == sid) {
                temp = serverList.serverlist[i];
                break;
            }
        }
        $("#choseServer").css({ "left": (width - 340) / 2, "-webkit-transform": "scale(" + scale + ")" }).html(temp.sname + "<div class='serverstate' style='background-position-y:" + getState(temp.type) + "'></div>");
    }
    else {
        serverList.lastserver = serverList.serverlist[0];
        sid = serverList.serverlist[0].sid;
        $("#choseServer").css({ "left": (width - 340) / 2, "-webkit-transform": "scale(" + scale + ")" }).html(serverList.serverlist[0].sname + "<div class='serverstate' style='background-position-y:" + getState(serverList.serverlist[0].type) + "'></div>");
    }
}

var sid = 0;

var pad = false;

var popId = 0;

window.onload = function () {
    height = document.body.scrollHeight;
    if (height == 601) height = 600;
    width = document.body.clientWidth;
    var scale = height / 480;

    if (width > 1500) {
        pad = true;
        padScale = scale;
        sp = scale * 0.8;
    }

    $("#main").css({ "width": width, "height": height, "background-size": width + "px " + height + "px" });

    $("#logo").css({ "-webkit-transform": "scale(" + scale + ")", "left": (width - 441) / 2 });
    
    if (serverList != null) {
        if (serverList.lastserver.sname) {
            sid = serverList.lastserver.sid;
            var temp;
            for (var i = 0; i < serverList.serverlist.length; i++) {
                if (serverList.serverlist[i].sid == sid) {
                    temp = serverList.serverlist[i];
                    break;
                }
            }
            $("#choseServer").css({ "left": (width - 340) / 2, "-webkit-transform": "scale(" + scale + ")" }).html(temp.sname + "<div class='serverstate' style='background-position-y:" + getState(temp.type) + "'></div>");
        }
        else {
            sid = serverList.serverlist[0].sid;
            $("#choseServer").css({ "left": (width - 340) / 2, "-webkit-transform": "scale(" + scale + ")" }).html(serverList.serverlist[0].sname + "<div class='serverstate' style='background-position-y:" + getState(serverList.serverlist[0].type) + "'></div>");
        }
    } else {
        $("#choseServer").css({ "left": (width - 340) / 2, "-webkit-transform": "scale(" + scale + ")" }).html("正在获取服务器列表<div class='serverstate' style='height:0px;'></div>");
    }


    $("#stargame").css({ "left": ((width - 187) / 2), "-webkit-transform": "scale(" + scale + ")" });

    $("#server").css({ "left": (width - 292) / 2, "top": (height - 302) / 2, "-webkit-transform": "scale(" + scale + ")" });
    //版本号
    //showLoginNotice();
    $("#version").text(window.GameMainClass.getVersionName());

    logoAnimate();

    setTimeout(function () {
        window.GameMainClass.loginLoadFinish();
    }, 200)
}

var btnLogin = $("#stargame");
btnLogin.bind("touchend", function () {
    $(this).css({ "background-position-y": "0px" });
    if (cancel()) {
        return;
    }
    window.GameMainClass.pressLogin(sid);
}).bind("touchstart", function () {
    begin();
    $(this).css({ "background-position-y": "-59px" });
    window.GameMainClass.playEffectSound("button");
}).bind("touchmove", function () {
    $(this).css({ "background-position-y": "0px" });
    move();
});

$("#choseServer").bind("touchend", function () {
    window.GameMainClass.playEffectSound("icon");
    if (cancel())
        return;
    showServerList();
}).bind("touchstart", function () {
    begin();
}).bind("touchmove", function () {
    move();
});

//服务器列表
var showServerList = function () {
    $("#server").show();
    $("#mask2").show();

    if (serverList.lastserver.sname) {
        $("#serverLast").attr("sid", serverList.lastserver.sid).html("<div class='serverName'>" + serverList.lastserver.sname + "</div><div class='serverState' style='background-position-y:" + getState(serverList.lastserver.type) + "'></div>").unbind("touchend").unbind("touchstart").unbind("touchmove").bind("touchend", function () {
            window.GameMainClass.playEffectSound("icon");
            if (cancel())
                return;
            sid = Number($(this).attr("sid"));
            var temp;
            for (var i = 0; i < serverList.serverlist.length; i++) {
                if (serverList.serverlist[i].sid == sid) {
                    temp = serverList.serverlist[i];
                    break;
                }
            }
            $("#choseServer").html(temp.sname + "<div class='serverstate' style='background-position-y:" + getState(temp.type) + "'></div>");
            $("#server").hide();
            $("#mask2").hide();
        }).bind("touchmove", function () {
            move();
        }).bind("touchstart", function () {
            begin();
        });
    }
    else {
        $("#serverLast .serverState").hide();
    }

    var str = [];
    for (var i = 0; i < serverList.serverlist.length; i++) {
        str.push("<div class='swiper-slide server-slide'><div class='serverItem' ontouchstart='begin()' ontouchmove='move()' ontouchend='chooseServerList(this)' sid=" + serverList.serverlist[i].sid + "><div class='serverName'>" + serverList.serverlist[i].sname + "</div><div class='serverState' style='background-position-y:" + getState(serverList.serverlist[i].type) + "'></div></div></div>")
    }

    $("#serverList").children().html("");
    $("#serverList").children().html(str.join(""));

    var serverSwiper = new Swiper('#serverList', {
        mode: 'vertical',
        slidesPerSlide: 4
    });
}

var chooseServerList = function (ev) {
    if (cancel())
        return;
    window.GameMainClass.playEffectSound("icon");
    sid = Number($(ev).attr("sid"));
    var temp;
    for (var i = 0; i < serverList.serverlist.length; i++) {
        if (serverList.serverlist[i].sid == sid) {
            temp = serverList.serverlist[i];
            break;
        }
    }
    $("#choseServer").html(temp.sname + "<div class='serverstate' style='background-position-y:" + getState(temp.type) + "'></div>");
    $("#server").hide();
    $("#mask2").hide();
}

//取号
var fetch = function (skyid, type) {

    //var fetchJson = "{ \"skyid\": \"100010000\", \"utype\": 104, \"ver\": 52 }";
    var fetchJson = '{ "skyid": "' + skyid + '", "utype": '+type+', "ver": 52 }';
    window.GameMainClass.sendRequestJson(104, fetchJson, "fetchResult");
}

//取号-->成功105登录
var fetchResult = function (json) {
    var data = JSON.parse(json);
    if (data.resert == 2) {
        showTextMess(data.info, 2);
        return;
    }
    if (data.resert == 0) {
        //跳转 注册
        window.GameMainClass.changePage("choseHero.htm");
    }
    else {
        //设置uid
        window.GameMainClass.setUid(data.uid);

        window.GameMainClass.changePage("city.htm");
    }
}

var logoAnimate = function () {
    var flag = true;
    $("#logo").css("position", "absolute").css("top", "-110px");
    var logoLocation = -110;

    var position = 5;

    if (pad) {
        var time = setInterval(function () {
            if (flag)
                logoLocation += position;
            else
                logoLocation -= position;
            if (logoLocation >= 160) {
                flag = false;
                position = 1;
            }
            if (logoLocation < 120) {
                flag = true;
            }
            $("#logo").css("top", logoLocation + "px");
        }, 33)
    } else {
        var time = setInterval(function () {
            if (flag)
                logoLocation += position;
            else
                logoLocation -= position;
            if (logoLocation >= 30) {
                flag = false;
                position = 0.5;
            }
            if (logoLocation < 20) {
                flag = true;
            }
            $("#logo").css("top", logoLocation + "px");
        }, 33)
    }
    
}

var getState = function (type) {
    switch (type) {
        case 0:
            return "0px";
        case 1:
            return "-24px";
        case 2:
            return "-48px";
    }
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
    return Math.abs(lastPosX - beforePosX) > 3
}

//显示公告
var loginShowNotice = function (json) {
    noticeJson = JSON.parse(json);
    showLoginNotice();
}

var noticeJson
var noticeJson = {
    "data": [{
        "content": "亲爱的玩家朋友:<br\/>&nbsp;&nbsp;&nbsp;&nbsp;如果您在游戏里发现BUG或是遇到任何问题请您进入官方游戏讨论中心提交给客服。<br\/>官方游戏讨论中心：玩家QQ群49597049<br\/>",
        "title": "8-8小量测试111",
        "name": "8-8小量测试"
    },
    {
        "content": "亲爱的各位玩家：<br\/>&nbsp;&nbsp;&nbsp;&nbsp;《众将听令》首次删档技术测试于今日11：00正式开启,抢先体验，惊喜多多，关注微信得独享大礼包，更有“萌币天天送”等你来拿。<br\/>更多《众将听令》资讯与活动请您通过以下方式关注：<br\/>官方网站：zjtl.joy88.com<br\/>微信公众平台：zhongjiangtingling<br\/>玩家QQ群：49597049<br\/>",
        "title": "游戏客服",
        "name": "游戏客服"
    },
    {
        "content": "亲爱的各位玩家：<br\/>&nbsp;&nbsp;&nbsp;&nbsp;《众将听令》首次删档技术测试于今日11：00正式开启,抢先体验，惊喜多多，关注微信得独享大礼包，更有“萌币天天送”等你来拿。<br\/>更多《众将听令》资讯与活动请您通过以下方式关注：<br\/>官方网站：zjtl.joy88.com<br\/>微信公众平台：zhongjiangtingling<br\/>玩家QQ群：49597049<br\/>",
        "title": "游戏客服",
        "name": "游戏客服"
    },
    {
        "content": "亲爱的各位玩家：<br\/>&nbsp;&nbsp;&nbsp;&nbsp;《众将听令》首次删档技术测试于今日11：00正式开启,抢先体验，惊喜多多，关注微信得独享大礼包，更有“萌币天天送”等你来拿。<br\/>更多《众将听令》资讯与活动请您通过以下方式关注：<br\/>官方网站：zjtl.joy88.com<br\/>微信公众平台：zhongjiangtingling<br\/>玩家QQ群：49597049<br\/>",
        "title": "游戏客服",
        "name": "游戏客服"
    }]
};

var tempScroll;

//登录公告
var showLoginNotice = function () {
    $("#mask2").show();
    var scale = height / 480;
    var bwidth = width / scale;
    var bheight = height / scale;
    $("#notice").css({ "left": (bwidth - 700) / 2, "top": (bheight - 460) / 2, "zoom": scale,"display":"block" });
    
    var str = [];

    str.push("<div id='wrapper'><div id='notice_scroller'><ul><li>");
    
    str.push("<div id='noticeList'>");

    for (var i = 0; i < noticeJson.data.length; i++) {
        str.push("<div class='noticeListItem'><font style='text-decoration:underline;color:#0CE703;font-weight:bold;' find='a" + i + "'>" + noticeJson.data[i].title + "</font></div>");
    }

    str.push("</div>");
    str.push("<hr class='noticeHr' />");
    //内容
    str.push("<div id='noticeDetailContain'>")
    for (var i = 0; i < noticeJson.data.length; i++) {
        str.push("<a id='a"+i+"' class='noticeDetailItem'><div class='noticeName'>" + noticeJson.data[i].name + "</div><div class='noticeContent'>" + noticeJson.data[i].content + "</div></a>");
        str.push("<hr class='noticeHr' />");
    }
    str.splice(str.length-1, 1);
    str.push("</div>");
    str.push("</li></ul></div></div>");

    $("#noticeContain").html(str.join(""));
    $("#notice_scroller").height($("#wrapper li").height() + 20);

    myScroll = new iScroll('wrapper');

    $(".noticeListItem").bind("touchend", function () {
        if (cancel())
            return;
        tempScroll=$("#" + $(this).children().attr("find")).get(0).offsetTop;
        myScroll.scrollTo(0, tempScroll, 200, true);
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })

    $("#noticeClose").bind("touchend", function () {
        if (!cancel()) {
            window.GameMainClass.playEffectSound("close");
            $("#notice").hide();
            $("#mask2").hide();
        }
        $(this).css({ "-webkit-transform": "scale(1)" });
    }).bind("touchmove", function () {
        move();
        $(this).css({ "-webkit-transform": "scale(1)" });
    }).bind("touchstart", function () {
        begin();
        $(this).css({ "-webkit-transform": "scale(0.8)" });
    })

    $("#noticeTop").bind("touchend", function () {
        if (!cancel()) {
            window.GameMainClass.playEffectSound("icon");
            myScroll.scrollToElement(("#noticeList"), 100);
        }
        $(this).css({ "background-position-x": "0", "-webkit-transform": "scale(1)" });
    }).bind("touchmove", function () {
        move();
        $(this).css({ "background-position-x": "0", "-webkit-transform": "scale(1)" });
    }).bind("touchstart", function () {
        begin();
        $(this).css({ "background-position-x": "60px", "-webkit-transform": "scale(0.8)" });
    })
    
}

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