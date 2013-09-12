/// <reference path="public.js" />

//var friendJson = { "data": [{ "glv": 25, "head": 1001, "lv": 20, "nick": "季瑞", "time": "06/25 16:36登录过", "uid": 10148106 }, { "glv": 40, "head": 1003, "lv": 21, "nick": "杜莺", "time": "06/26 15:56登录过", "uid": 10145544 }, { "glv": 40, "head": 1003, "lv": 21, "nick": "杜莺", "time": "06/26 15:56登录过", "uid": 10145544 }, { "glv": 40, "head": 1003, "lv": 21, "nick": "杜莺", "time": "06/26 15:56登录过", "uid": 10145544 }, { "glv": 40, "head": 1003, "lv": 21, "nick": "杜莺", "time": "06/26 15:56登录过", "uid": 10145544 }, { "glv": 40, "head": 1003, "lv": 21, "nick": "杜莺", "time": "06/26 15:56登录过", "uid": 10145544 }, { "glv": 40, "head": 1003, "lv": 21, "nick": "杜莺", "time": "06/26 15:56登录过", "uid": 10145544 }, { "glv": 40, "head": 1003, "lv": 21, "nick": "杜莺", "time": "06/26 15:56登录过", "uid": 10145544 }, { "glv": 40, "head": 1003, "lv": 21, "nick": "杜莺", "time": "06/26 15:56登录过", "uid": 10145544 }, { "glv": 40, "head": 1003, "lv": 21, "nick": "杜莺", "time": "06/26 15:56登录过", "uid": 10145544 }, { "glv": 40, "head": 1003, "lv": 21, "nick": "杜莺", "time": "06/26 15:56登录过", "uid": 10145544 }, { "glv": 40, "head": 1003, "lv": 21, "nick": "杜莺", "time": "06/26 15:56登录过", "uid": 10145544 }, { "glv": 40, "head": 1003, "lv": 21, "nick": "杜莺", "time": "06/26 15:56登录过", "uid": 10145544 }, { "glv": 40, "head": 1003, "lv": 21, "nick": "杜莺", "time": "06/26 15:56登录过", "uid": 10145544 }, { "glv": 40, "head": 1003, "lv": 21, "nick": "杜莺", "time": "06/26 15:56登录过", "uid": 10145544 }] };

//var friendAcceptJson = { "data": [{ "glv": 25, "head": 1001, "lv": 20, "nick": "季瑞", "time": "06/25 16:36登录过", "uid": 10148106 }, { "glv": 40, "head": 1003, "lv": 21, "nick": "杜莺", "time": "06/26 15:56登录过", "uid": 10145544 }, { "glv": 40, "head": 1003, "lv": 21, "nick": "杜莺", "time": "06/26 15:56登录过", "uid": 10145544 }, { "glv": 40, "head": 1003, "lv": 21, "nick": "杜莺", "time": "06/26 15:56登录过", "uid": 10145544 }, { "glv": 40, "head": 1003, "lv": 21, "nick": "杜莺", "time": "06/26 15:56登录过", "uid": 10145544 }, { "glv": 40, "head": 1003, "lv": 21, "nick": "杜莺", "time": "06/26 15:56登录过", "uid": 10145544 }, { "glv": 40, "head": 1003, "lv": 21, "nick": "杜莺", "time": "06/26 15:56登录过", "uid": 10145544 }, { "glv": 40, "head": 1003, "lv": 21, "nick": "杜莺", "time": "06/26 15:56登录过", "uid": 10145544 }, { "glv": 40, "head": 1003, "lv": 21, "nick": "杜莺", "time": "06/26 15:56登录过", "uid": 10145544 }, { "glv": 40, "head": 1003, "lv": 21, "nick": "杜莺", "time": "06/26 15:56登录过", "uid": 10145544 }, { "glv": 40, "head": 1003, "lv": 21, "nick": "杜莺", "time": "06/26 15:56登录过", "uid": 10145544 }, { "glv": 40, "head": 1003, "lv": 21, "nick": "杜莺", "time": "06/26 15:56登录过", "uid": 10145544 }, { "glv": 40, "head": 1003, "lv": 21, "nick": "杜莺", "time": "06/26 15:56登录过", "uid": 10145544 }, { "glv": 40, "head": 1003, "lv": 21, "nick": "杜莺", "time": "06/26 15:56登录过", "uid": 10145544 }, { "glv": 40, "head": 1003, "lv": 21, "nick": "杜莺", "time": "06/26 15:56登录过", "uid": 10145544 }] };

var friendJson;
var friendAcceptJson

var loadFriendBase = function () {
    $("#dialog").html("<div id='hero'><div id='title'><div id='titleLeft'></div><div id='titleCenter'><div id='titleContext'></div></div><div id='titleRight'></div></div><div id='waikuan'><div id='shangjiao'class='jiao shangjiao'></div><div id='xiajiao'class='jiao xiajiao'></div><div id='zuojiao'class='jiao zuojiao'></div><div id='youjiao'class='jiao youjiao'></div><div class='shangwaibian'></div><div class='xiawaibian'></div><div class='zuowaibian'></div><div class='youwaibian'></div></div><div id='close'></div><div id='rope'></div><div id='teamChange'></div><div id='friendHeroNum'>友情点数:<font id='friendNowNum'style='color:#26E50E;'></font></div><div id='heroPageData'></div><div id='pagePrevBtn'></div><div id='pageNextBtn'></div><div id='friendAll'class='hero_icon hero_icon_select'></div><div id='friendManage'class='hero_icon'></div><div id='friendAcceptIcon'class='hero_icon'></div><div id='friendFind'class='LvUpBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>查找好友</div><div class='btn3'></div></div></div></div>");
    $("#mask").show();

    $("#hero").css({ "top": (height - 460) / 2 - 10 });
    if (pad)
        $("#hero").css({ "top": ((height - 470 * sp) / 2) / sp });
    loadFriend();

    //绑定列表图标
    var heroIcon = $(".hero_icon");
    heroIcon.bind("touchend", function () {
        window.GameMainClass.playEffectSound("menu");
        heroIcon.removeClass("hero_icon_select");
        $(this).addClass("hero_icon_select");
        switch ($(this).attr("id")) {
            case "friendAll":
                loadFriend();
                break;
            case "friendManage":
                showFriendManage();
                break;
            case "friendAcceptIcon":
                if (friendAcceptJson == null) {
                    window.GameMainClass.sendRequestJson(167, "", "SetFriendAccept");
                    return;
                }
                if(friendAcceptJson.resert==0){
                    window.GameMainClass.sendRequestJson(167, "", "SetFriendAccept");
                    return;
                }
                showfriendAccept();
                break;
        }
    })

    $("#friendNowNum").text(userJson.fspoint);

    //好友查找
    $("#friendFind").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        var maskDiv = document.createElement("div");
        maskDiv.id = "tempMask";
        $(maskDiv).css({ "width": width, "height": height, "top": "0","z-index":4 });
        document.body.appendChild(maskDiv);

        $("#temp").html("<div id='mess'><div id='t_title'><div id='t_titleLeft'></div><div id='t_titleCenter'><div id='t_titleContext'></div></div><div id='t_titleRight'></div></div><div id='t_waikuan'><div class='t_jiao t_shangjiao'></div><div class='t_jiao t_xiajiao'></div><div class='t_jiao t_zuojiao'></div><div class='t_jiao t_youjiao'></div><div class='t_shangwaibian'></div><div class='t_xiawaibian'></div><div class='t_zuowaibian'></div><div class='t_youwaibian'></div></div><div id='dialogclose'></div><div id='rope'></div><div id='tempDialog'><div id='friendFindText'>输入好友的用户ID号(<font style='color:#26E50E;'>你的ID:<font id='friend_myuid'>" + userJson.uid + "</font></font>)</div><input id='friendInput'/><div id='friendFindBtn'style='width:91px;'class='bossBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>查找</div><div class='btn3'></div></div></div><div id='friendMessage'>该玩家不存在或您所要查找的用户ID输入有误.</div><div id='friendFindDetail'></div></div><div id='friendBack'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>返回</div><div class='btn3'></div></div></div></div>");
        $("#mess").css({ "left": (width - 476) / 2, "top": (height - 352) / 2, "z-index": 5 });

        if (pad) $("#mess").css({ "zoom": sp, "left": (width - 476 * sp) / 2 / sp, "top": (height - 352 * sp) / 2 / sp });

        $("#t_titleContext").css("background-image", "url(res/public/title/29.png)");

        $("#friendFindBtn").bind("touchend", function () {
            $(this).css({ "-webkit-transform": "scale(1)" });
            if (cancel())
                return;
            window.GameMainClass.playEffectSound("icon");
            if ($("#friendInput").val().trim() == "") {
                showTextMess("请输入好友ID!", 2);
                return;
            }
            if (isNaN($("#friendInput").val().trim())) {
                showTextMess("请输入正确的好友ID!", 2);
                return;
            }
            window.GameMainClass.sendRequestJson(161, "{\"friendid\":" + $("#friendInput").val().trim() + "}", "findFriendOk");
        }).bindAnimate();

        //关闭事件
        $("#dialogclose,#friendBack").bind("touchend", function () {
            if (cancel())
                return;
            window.GameMainClass.playEffectSound("close");
            $("#tempMask").remove();
            $("#temp").html("");
        }).bindAnimate();
    }).bindAnimate();

    //绑定关闭事件
    $("#close").bind("touchend ", function () {
        if (!cancel()) {
            $("#dialog").html("");
            $("#mask").hide();
            window.GameMainClass.playEffectSound("close");
        }
        $(this).css({ "-webkit-transform": "scale(1)" });
    }).bind("touchmove", function () {
        move();
    }).bind("touchstart", function () {
        begin();
        $(this).css({ "-webkit-transform": "scale(0.8)" });
    })
}

var loadFriend = function () {
    if (friendJson == null) {
        //发送
        window.GameMainClass.sendRequestJson(144, "", "setFriendJson");
        return;
    }
    if (friendJson.resert == 0)
    {
        window.GameMainClass.sendRequestJson(144, "", "setFriendJson");
        return;
    }
    showFriend();
}

var setFriendJson = function (json) {
    friendJson = JSON.parse(json);
    showFriend();
}

//加载好友界面
var showFriend = function () {
    $("#teamChange").html("<div class='swiper-container heroSwiper'><div class='swiper-wrapper'><div class='swiper-slide hero-slide'><div id='heroChangePage0'class='heroChangePage'></div></div></div></div>");

    setTitle(26);

    if (friendJson.data.length==0) {
        showTextMess("你还没有任何好友!", 2);
        $("#pagePrevBtn,#pageNextBtn").unbind("touchstart").unbind("touchmove").unbind("touchend");
        $("#heroPageData").html("页数:<font id='pageNow' style='color:#26E50E;'>0</font><font style='color:#26E50E;'>/0</font><br/>好友数:<font style='color:#26E50E'>" + 0 + "/" + userJson.fnum + "</font>");
        return;
    }

    showAllFriend();


}

//加载好友列表
var showAllFriend = function () {

    usePage = 0;

    useLength = friendJson.data.length;

    usePageAll = Math.ceil(useLength / 8) - 1;

    $("#heroPageData").html("页数:<font id='pageNow' style='color:#26E50E;'>1</font><font style='color:#26E50E;'>/" + Math.ceil(useLength / 8) + "</font><br/>好友数:<font style='color:#26E50E'>" + useLength + "/" + userJson.fnum + "</font>");

    $("#heroWrapper").append("<div class='swiper-slide hero-slide' id='heroside0'><div id='heroChangePage0' class='heroChangePage'></div></div>");


    showFriendPage();

    $("#pagePrevBtn").unbind("touchstart").unbind("touchmove").unbind("touchend");
    $("#pageNextBtn").unbind("touchstart").unbind("touchmove").unbind("touchend");
    $("#pagePrevBtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        //上一页
        if (usePage == 0 && usePageAll > -1) {
            usePage = usePageAll;
        }
        else {
            usePage--;
        }
        showFriendPage();
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })

    $("#pageNextBtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        //下一页
        if (usePage == usePageAll) {
            usePage = 0;
        }
        else {
            usePage++;
        }
        showFriendPage();
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })
}

//所有好友页面
var showFriendPage = function () {

    $("#heroChangePage0").html("");
    $("#pageNow").text(usePage + 1);

    var tempLastIndex = useLength > (usePage + 1) * 8 ? (usePage + 1) * 8 : useLength;

    var arr = new Array();

    for (var i = usePage * 8; i < tempLastIndex; i++) {

        var heroDiv = document.createElement("div");
        heroDiv.className = "heroChange";

        var NowHeroData = friendJson.data[i];

        var arr = [];
        arr.push("<div class='heroHeadBg' style='left:5px;top:3px;'><div class='heroHeadColor' style='background-image:url(res/head/" + NowHeroData.q + ".png);'></div><div class='heroHead' style='background-image:url(res/head/" + NowHeroData.head + ".png)'></div></div><div class='heroChangeDetail' style='background-image:url(res/public/fBg.png);background-position-y:0px'></div>");

        var arr2 = new Array();
        arr2.push("<div class='posSamll' style='background-position-x:");
        arr2.push(getPosSamll(NowHeroData.pos) + "px'></div>");
        arr2.push("<div class='friendLv'><font style='color:#F2E234;'>" + NowHeroData.lv + "</font></div><font class='heroListName' style='color:#F2E234;'>");
        arr2.push(NowHeroData.nick);
        var tempColor = "lightgray";
        if (NowHeroData.time == "当前在线")
            tempColor = "#26E50E";
        arr2.push("</font><div class='friendTime' style='color:" + tempColor + ";'>" + NowHeroData.time + "</div>");
        arr2.push("<div class='heroLv'>");
        arr2.push(getLv(NowHeroData.glv));
        arr2.push("</div></div>");

        heroDiv.innerHTML = arr.join("");
        $("#heroChangePage0").append(heroDiv);

        //加载武将具体信息
        $(heroDiv).children(".heroChangeDetail").html(arr2.join(""));

    }
}

//加载好友管理界面
var showFriendManage = function () {
    setTitle(26);
    $("#teamChange").html("<div class='swiper-container heroSwiper'><div class='swiper-wrapper'><div class='swiper-slide hero-slide'><div id='heroChangePage0' class='heroChangePage'></div></div></div></div>");

    if (friendJson.data.length==0) {
        showTextMess("您还没有任何好友!", 2);
        $("#pagePrevBtn,#pageNextBtn").unbind("touchstart").unbind("touchmove").unbind("touchend");
        $("#heroPageData").html("页数:<font id='pageNow' style='color:#26E50E;'>0</font><font style='color:#26E50E;'>/0</font><br/>好友数:<font style='color:#26E50E'>" + 0 + "/" + userJson.fnum + "</font>");
        return;
    }

    usePage = 0;

    useLength = friendJson.data.length;

    usePageAll = Math.ceil(useLength / 8) - 1;

    $("#heroPageData").html("页数:<font id='pageNow' style='color:#26E50E;'>1</font><font style='color:#26E50E;'>/" + Math.ceil(useLength / 8) + "</font><br/>好友数:<font style='color:#26E50E'>" + useLength + "/" + userJson.fnum + "</font>");

    showFriendManagePage();

    $("#pagePrevBtn").unbind("touchstart").unbind("touchmove").unbind("touchend");
    $("#pageNextBtn").unbind("touchstart").unbind("touchmove").unbind("touchend");
    $("#pagePrevBtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        //上一页
        if (usePage == 0 && usePageAll > -1) {
            usePage = usePageAll;
        }
        else {
            usePage--;
        }
        showFriendManagePage();
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })

    $("#pageNextBtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        //下一页
        if (usePage == usePageAll) {
            usePage = 0;
        }
        else {
            usePage++;
        }
        showFriendManagePage();
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })
}

//好友管理页面
var showFriendManagePage = function () {

    $("#heroChangePage0").html("");
    $("#pageNow").text(usePage + 1);

    var tempLastIndex = useLength > (usePage + 1) * 8 ? (usePage + 1) * 8 : useLength;

    var arr = new Array();

    for (var i = usePage * 8; i < tempLastIndex; i++) {

        var NowHeroData = friendJson.data[i];

        var heroDiv = document.createElement("div");
        heroDiv.className = "heroChange";
        heroDiv.setAttribute("uid", NowHeroData.uid);

        var arr = new Array();
        arr.push("<div class='heroHeadBg' style='left:5px;top:3px;'><div class='heroHeadColor' style='background-image:url(res/head/" + NowHeroData.q + ".png);'></div><div class='heroHead' style='background-image:url(res/head/" + NowHeroData.head + ".png)'></div></div><div class='heroChangeDetail' style='background-image:url(res/public/fBg.png);background-position-y:0px'></div>");

        var arr2 = new Array();
        arr2.push("<div class='friendDelete' ontouchstart='begin()' ontouchmove='move()' ontouchend='FriendDeleteClick(this)'></div><div class='posSamll' style='background-position-x:");
        arr2.push(getPosSamll(NowHeroData.pos));
        arr2.push("px'></div><div class='friendLv'><font style='color:#F2E234;'>" + NowHeroData.lv + "</font></div><font class='heroListName' style='color:#F2E234;'>");
        arr2.push(NowHeroData.nick);
        var tempColor = "lightgray";
        if (NowHeroData.time == "当前在线")
            tempColor = "#26E50E";
        arr2.push("</font><div class='friendTime' style='color:" + tempColor + ";'>" + NowHeroData.time + "</div>");
        arr2.push("<div class='heroLv'>");
        arr2.push(getLv(NowHeroData.glv));
        arr2.push("</div></div>");

        heroDiv.innerHTML = arr.join("");
        $("#heroChangePage0").append(heroDiv);

        //加载武将具体信息
        $(heroDiv).children(".heroChangeDetail").html(arr2.join(""));

    }
}

var SetFriendAccept = function (json) {
    friendAcceptJson = JSON.parse(json);
    showfriendAccept();
}

//好友申请界面
var showfriendAccept = function () {
    $("#teamChange").html("<div class='swiper-container heroSwiper'><div class='swiper-wrapper'><div class='swiper-slide hero-slide'><div id='heroChangePage0'class='heroChangePage'></div></div></div></div>");

    setTitle(27);

    if (friendAcceptJson.data.length==0) {
        showTextMess("您还没有任何好友请求!", 2);
        $("#pagePrevBtn,#pageNextBtn").unbind("touchstart").unbind("touchmove").unbind("touchend");
        $("#heroPageData").html("页数:<font id='pageNow' style='color:#26E50E;'>0</font><font style='color:#26E50E;'>/0</font><br/>好友数:<font style='color:#26E50E'>0/" + userJson.fnum + "</font>");
        return;
    }


    usePage = 0;

    useLength = friendAcceptJson.data.length;

    usePageAll = Math.ceil(useLength / 8) - 1;

    $("#heroPageData").html("页数:<font id='pageNow' style='color:#26E50E;'>1</font><font style='color:#26E50E;'>/" + Math.ceil(useLength / 8) + "</font><br/>好友数:<font style='color:#26E50E'>" + useLength + "/" + userJson.fnum + "</font>");

    showFriendAcceptPage();

    $("#pagePrevBtn").unbind("touchstart").unbind("touchmove").unbind("touchend");
    $("#pageNextBtn").unbind("touchstart").unbind("touchmove").unbind("touchend");

    $("#pagePrevBtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        //上一页
        if (usePage == 0 && usePageAll >-1) {
            usePage = usePageAll;
        }
        else {
            usePage--;
        }
        showFriendAcceptPage();

    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })

    $("#pageNextBtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        //下一页
        if (usePage == usePageAll) {
            usePage = 0;
        }
        else {
            usePage++;
        }
        showFriendAcceptPage();
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })

    $(".friendAccept").bind("touchend", function () {
        window.GameMainClass.sendRequestJson(163, "{\"friendid\":" + $(this).parent().parent().attr("uid") + "}", "AcceptFriendBack");
    })

    $(".friendDelete").bind("touchend", function () {
        window.GameMainClass.sendRequestJson(168, "{\"friendid\":" + $(this).parent().parent().attr("uid") + "}", "DeleteFriendBack");
    })
}

var showFriendAcceptPage = function () {


    $("#heroChangePage0").html("");
    $("#pageNow").text(usePage + 1);

    var tempLastIndex = useLength > (usePage + 1) * 8 ? (usePage + 1) * 8 : useLength;

    var arr = new Array();

    for (var i = usePage * 8; i < tempLastIndex; i++) {

        var NowHeroData = friendAcceptJson.data[i];
        var heroDiv = document.createElement("div");
        heroDiv.className = "heroChange";
        heroDiv.setAttribute("uid", NowHeroData.uid);

        var arr = new Array();
        arr.push("<div class='heroHeadBg' style='left:5px;top:3px;'><div class='heroHeadColor' style='background-image:url(res/head/" + NowHeroData.q + ".png);'></div><div class='heroHead' style='background-image:url(res/head/" + NowHeroData.head + ".png);'></div></div><div class='heroChangeDetail' style='background-image:url(res/public/fBg.png);background-position-y:0px'></div>");

        var arr2 = new Array();
        arr2.push("<div class='friendAccept'></div><div class='friendDelete'></div><div class='posSamll' style='background-position-x:");
        arr2.push(getPosSamll(NowHeroData.pos));
        arr2.push("px'></div><div class='friendLv'><font style='color:#F2E234;'>" + NowHeroData.lv + "</font></div><font class='heroListName' style='color:#F2E234;'>");
        arr2.push(NowHeroData.nick);
        var tempColor = "lightgray";
        if (NowHeroData.time == "当前在线")
            tempColor = "#26E50E";
        arr2.push("</font><div class='friendTime' style='color:" + tempColor + ";'>" + NowHeroData.time + "</div>");
        arr2.push("<div class='heroLv'>");
        arr2.push(getLv(NowHeroData.glv));
        arr2.push("</div></div>");

        heroDiv.innerHTML = arr.join("");
        $("#heroChangePage0").append(heroDiv);

        //加载武将具体信息
        $(heroDiv).children(".heroChangeDetail").html(arr2.join(""));

    }

}

var DeleteFriendBack = function (json) {
    var tempJson = JSON.parse(json);
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
    } else {
        showTextMess("删除好友请求成功!", 1);

        for (var i = 0; i < friendAcceptJson.data.length; i++) {
            if (friendAcceptJson.data[i].uid == tempJson.Client[0].friendid) {
                friendAcceptJson.data.splice(i, 1);
                break;
            }
        }

        showfriendAccept();
    }
}

//删除好友成功返回
var friendDeleteBack = function (json) {
    var tempJson = JSON.parse(json);
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
    }
    else {
        showTextMess("删除好友成功!", 1);

        //删除
        for (var i = 0; i < friendJson.data.length; i++) {
            if (friendJson.data[i].uid == tempJson.Client[0].friendid) {
                friendJson.data.splice(i, 1);
                break;
            }
        }

        $("#tempMask").remove();
        $("#temp").html("");

        showFriendManage();
    }
}

//添加好友成功
var findFriendOk = function (json) {
    var tempJson = JSON.parse(json);
    //var tempJson = { "Client": [{ "friendid": 10131239 }],"time":"当前在线","q":5, "gid": 1002, "glv": 1, "isOL": 0, "lv": 1, "nick": "仲", "resert": 1 };
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
        $("#friendMessage").css("display", "block");
        $("#friendFindDetail").html("");
    } else {
        showTextMess(tempJson.info, 1);
        $("#friendMessage").css("display", "none");
        $("#friendFindDetail").html("");
        var NowHeroData = tempJson;

        var heroDiv = document.createElement("div");
        heroDiv.className = "heroChange";

        var arr = new Array();
        arr.push("<div class='heroHeadBg' style='top:3px;left:5px;'><div class='heroHeadColor'></div><div class='heroHead'></div></div><div class='heroChangeDetail' style='background-image:url(res/public/fBg.png);'></div>");

        var arr2 = new Array();
        arr2.push("<div class='friendAccept' style='left:280px;'></div><div class='posSamll' style='background-position-x:");
        arr2.push(getPosSamll(NowHeroData.pos));
        arr2.push("px'></div><div class='friendLv' style='left:289px;'><font style='color:#F2E234;'>" + NowHeroData.lv + "</font></div><font class='heroListName' style='color:#F2E234;'>");
        arr2.push(NowHeroData.nick);
        var tempColor = "lightgray";
        if (NowHeroData.time == "当前在线")
            tempColor = "#26E50E";
        arr2.push("</font><div class='friendTime' style='color:" + tempColor + ";'>" + NowHeroData.time + "</div>");
        arr2.push("<div class='heroLv'>");
        arr2.push(getLv(NowHeroData.glv));
        arr2.push("</div></div>");

        heroDiv.innerHTML = arr.join("");
        $("#friendFindDetail").append(heroDiv).css("background-image:url(res/public/slideBg.png)");

        //加载武将具体信息
        $(heroDiv).children(".heroChangeDetail").html(arr2.join(""));
        $(heroDiv).find(".heroHeadColor").css({ "background-image": "url(res/head/" + NowHeroData.q + ".png)" });
        $(heroDiv).find(".heroHead").css({ "background-image": "url(res/head/" + NowHeroData.gid + ".png)" });

        //绑定添加好友事件
        $("#friendFindDetail .friendAccept").bind("touchend", function () {
            window.GameMainClass.sendRequestJson(162, "{\"friendid\":" + tempJson.Client[0].friendid + "}", "friendFindResert");
        })
    }
}

//好友添加成功
var friendFindResert = function (json) {
    var tempJson = JSON.parse(json);
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
    }
    else {
        showTextMess("添加好友请求发送成功,等待对方接受!", 1);
        $("#tempMask").remove();
        $("#temp").html("");
    }
}

//接受好友成功
var AcceptFriendBack = function (json) {
    var tempJson = JSON.parse(json);
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
    }
    else {
        showTextMess(tempJson.info, 1);

        //删除接受的好友本地数据
        for (var i = 0; i < friendAcceptJson.data.length; i++) {
            if (friendAcceptJson.data[i].uid == tempJson.Client[0].friendid) {
                friendJson.data.push(friendAcceptJson.data[i]);
                friendAcceptJson.data.splice(i, 1);
                break;
            }
        }

        showfriendAccept();
    }
}

//有新的好友添加提示(在线)
var newFriend = function (json) {
    var tempJson = JSON.parse(json);
    showTextMess(tempJson.info, 1);

    if ($(".hero_icon_select").attr("id") == "friendAcceptIcon") {
        window.GameMainClass.sendRequestJson(167, "", "SetFriendAccept");
        return;
    }

    if(friendAcceptJson!=null)
        friendAcceptJson.resert = 0;
}

//有新的好友接受成功提示(在线)
var newFriendComing=function(json){
    var tempJson = JSON.parse(json);
    showTextMess(tempJson.info, 1);

    if ($(".hero_icon_select").attr("id") == "friendAll") {
        window.GameMainClass.sendRequestJson(144, "", "setFriendJson");
        return;
    }
    if(friendJson!=null)
        friendJson.resert = 0;
}

//删除好友点击事件
var FriendDeleteClick = function (ev) {
    if (cancel())
        return;
    var maskDiv = document.createElement("div");
    maskDiv.id = "tempMask";
    $(maskDiv).css({ "width": width, "height": height, "top": "0" });
    document.body.appendChild(maskDiv);

    $("#temp").html("<div id='mess2'><div id='m_title'><div id='m_titleLeft'></div><div id='m_titleCenter'><div id='m_titleContext'></div></div><div id='m_titleRight'></div></div><div id='m_waikuan'><div class='m_jiao m_shangjiao'></div><div class='m_jiao m_xiajiao'></div><div class='m_jiao m_zuojiao'></div><div class='m_jiao m_youjiao'></div><div class='m_shangwaibian'></div><div class='m_xiawaibian'></div><div class='m_zuowaibian'></div><div class='m_youwaibian'></div></div><div id='dialogclose'></div><div id='tempDialog2'><div id='friendFont'>您确定要删除好友吗?</div></div><div id='friendDelete'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>确定</div><div class='btn3'></div></div></div><div id='friendCancel'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>取消</div><div class='btn3'></div></div></div></div>");
    $("#mess2").css({ "left": (width - 476) / 2, "top": (height - 279) / 2 });

    var tempSend = $(ev).parent().parent().attr("uid");

    //绑定确定
    $("#friendDelete").bind("touchend", function () {
        window.GameMainClass.sendRequestJson(145, "{\"friendid\":" + tempSend + "}", "friendDeleteBack");
    })
    
    //绑定关闭
    $("#dialogclose,#friendCancel").bind("touchend", function () {
        $("#tempMask").remove();
        $("#temp").html("");
    })
}