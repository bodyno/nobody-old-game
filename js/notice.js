/// <reference path="public.js" />
/// <reference path="public.js" />
/// <reference path="json.js" />

//var noticeJson = {
//    "data": [{ "content": "众所周知，在中国大陆某机构或公司若前冠“中国”二字，是非常难注册，且和政府部门有着千丝万缕的联系。所以，当“中国动态调查委员会”这个组织出现的时候，非常有唬人的功用。", "name": "世界BOSS", "title": "世界BOSS" },
//        { "content": "众所周知，在中国大陆某机构或公司若前冠“中国”二字，是非常难注册，且和政府部门有着千丝万缕的联系。所以，当“中国动态调查委员会”这个组织出现的时候，非常有唬人的功用众所周知，在中国大陆某机构或公司若前冠“中国”二字，是非常难注册，且和政府部门有着千丝万缕的联系。所以，当“中国动态调查委员会”这个组织出现的时候，非常有唬人的功用众所周知，在中国大陆某机构或公司若前冠“中国”二字，是非常难注册，且和政府部门有着千丝万缕的联系。所以，当“中国动态调查委员会”这个组织出现的时候，非常有唬人的功用众所周知，在中国大陆某机构或公司若前冠“中国”二字，是非常难注册，且和政府部门有着千丝万缕的联系。所以，当“中国动态调查委员会”这个组织出现的时候，非常有唬人的功用中国”二字，是非常难注册，且和政府部门有着千丝万缕的联系。所以，当“中国动态调查委员会”这个组织出现的时候，非常有唬人的功用众所周知，在中国大陆某机构或公司若前冠“中国”二字，是非常难注册，且和政府部门有着千丝万缕的联系。所以，当“中国动态调查委员会”这个组织出现的时候，非常有唬人的功用众所周知，在中国大陆某机构或公司若前冠“中国”二字，是非常难注册，且和政府部门有着千丝万缕的联系。所以，当“中国动态调查委员会”这个组织出现的时候，非常有唬人的功用众所周知，在中国大陆某机构或公司若前冠“中国”二字，是非常难注册，且和政府部门有着千丝万缕的联系。所以，当“中国动态调查委员会”这个组织出现的时候，非常有唬人的功用", "name": "游戏客服", "title": "游戏客服" }, { "content": "汉帝灵殿", "name": "汉帝灵殿", "title": "汉帝灵殿" }, { "content": "十二生肖", "name": "十二生肖", "title": "十二生肖" }]
//};
var noticeJson;

//加载公告界面
var showNotice = function () {
    $("#mask").show();
    var scale = height / 480;
    var bwidth = width / scale;
    var bheight = height / scale;

    $("#dialog").html("<div id='notice'><div id='noticeTitle'></div><div id='noticeClose'></div><div id='noticeTop'></div><div id='noticeContain'></div></div>");

    $("#notice").css({ "left": (bwidth - 700) / 2, "top": (bheight - 460) / 2, "zoom": scale, "display": "block" });

    if (pad) $("#dialog").css({ "zoom": 1, "top": 0 });

    var str = [];

    str.push("<div id='notice_wrapper'><div id='notice_scroller'><ul><li>");

    str.push("<div id='noticeList'>");

    for (var i = 0; i < noticeJson.data.length; i++) {
        str.push("<div class='noticeListItem'><font style='text-decoration:underline;color:#0CE703;font-weight:bold;' find='a" + i + "'>" + noticeJson.data[i].title + "</font></div>");
    }

    str.push("</div>");
    str.push("<hr class='noticeHr' />");
    //内容
    str.push("<div id='noticeDetailContain'>")
    for (var i = 0; i < noticeJson.data.length; i++) {
        str.push("<a id='a" + i + "' class='noticeDetailItem'><div class='noticeName'>" + noticeJson.data[i].name + "</div><div class='noticeContent'>" + noticeJson.data[i].content + "</div></a>");
        str.push("<hr class='noticeHr' />");
    }
    str.splice(str.length - 1, 1);
    str.push("</div>");
    str.push("</li></ul></div></div>");

    $("#noticeContain").html(str.join(""));
    $("#notice_scroller").height($("#notice_wrapper li").height() + 20);

    myScroll = new iScroll('notice_wrapper');

    $(".noticeListItem").bind("touchend", function () {
        if (cancel())
            return;
        tempScroll = $("#" + $(this).children().attr("find")).get(0).offsetTop;
        myScroll.scrollTo(0, tempScroll, 200, true);
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })

    $("#noticeClose").bind("touchend", function () {
        if (!cancel()) {
            window.GameMainClass.playEffectSound("close");
            $("#dialog").html("");
            if (pad)
                $("#dialog").css({ "position": "relative", "zoom": padScale * 0.8 });
            $("#mask").hide();
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

var loadNotice = function () {
    if (noticeJson == null) {
        window.GameMainClass.sendRequestJson(1079, "", "setNoticeJson");
    }
    else {
        showNotice();
    }
}

var setNoticeJson = function (json) {
    noticeJson = JSON.parse(json);
    showNotice();
}