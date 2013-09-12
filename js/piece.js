/// <reference path="hero.js" />
/// <reference path="jquery-1.5.1.min.js" />
/// <reference path="json.js" />
//var pieceJson = { "data": [{ "s": "5010,10" }], "resert": 1, "wn": 93 };
var pieceJson=null;

var setPieceJson = function (json) {
    pieceJson = JSON.parse(json);
    showPiece();
}

//显示碎片
var showPiece = function () {
    $("#teamChange").html("<div class='swiper-container pieceSwiper'><div class='swiper-wrapper'><div id='pieceSlide0'class='swiper-slide piece-slide'></div></div></div><div id='pieceFirst'><div id='pieceCheck'></div>优先使用万能将魂</div><div id='pieceHeroNum'>万能将魂数:<font id='pieceNowNum'style='color:#26E50E;'></font></div>");
    
    $("#pieceNowNum").text(userJson.wn);

    setTitle(3);

    $(".LvUpBtn").hide();

    if (pieceJson.data.length == 0) {
        showTextMess("您还没有任何将魂数据!", 2);
        $("#heroPageData").html("页数:<font id='pageNow' style='color:#26E50E;'>0</font><font style='color:#26E50E;'>/0</font><br/>将魂数:<font style='color:#26E50E'>0</font>");
        return;
    }

    //加载碎片
    loadPiece();

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
        showPiecePage();
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
        showPiecePage();
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })

    $("#pieceFirst").bind("touchend", function () {
        if (cancel())
            return;
        if ($(this).attr("can"))
            $(this).removeAttr("can").children().css("background-position-x", "0px");
        else
            $(this).attr("can", true).children().css("background-position-x", "-37px");
        loadPiece();
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })
}

//合成碎片成功
var pieceOk = function (json) {
    var tempJson = JSON.parse(json);
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info,2);
    } else {
        showTextMess("合成碎片成功!", 1);
        userJson.wn = tempJson.wn;
        //银币减少
        updateUserJson("200", 0 - tempJson.coin);

        //gsid
        window.GameMainClass.sendRequestJson(113, "{\"gsid\":" + tempJson.gsid + "}", "peiceGetHero");

        //改本地json
        if (tempJson.num == 0) {
            for (var i = 0; i < pieceJson.data.length; i++) {
                if (tempJson.Client[0].gid == pieceJson.data[i].s.split(",")[0]) {
                    pieceJson.data.splice(i, 1);
                    break;
                }
            }
        } else {
            for (var i = 0; i < pieceJson.data.length; i++) {
                if (tempJson.Client[0].gid == pieceJson.data[i].s.split(",")[0]) {
                    var tempPieceData = pieceJson.data[i].s.split(",");
                    tempPieceData[1] = tempJson.num;
                    pieceJson.data[i].s = tempPieceData.join(",");
                    break;
                }
            }
        }
        //删除碎片
        showPiece();
    }
}

//将英雄推入json
var peiceGetHero = function (json) {
    heroJson.data.push(JSON.parse(json).data[0]);
}

//加载碎片
var loadPiece = function () {

    usePage = 0;

    useLength = pieceJson.data.length;

    usePageAll = Math.ceil(useLength / 8) - 1;

    $("#heroPageData").html("页数:<font id='pageNow' style='color:#26E50E;'>1</font><font style='color:#26E50E;'>/" + Math.ceil(useLength / 8) + "</font><br/>武将数:<font style='color:#26E50E'>" + useLength + "/" + userJson.gnum + "</font>");

    showPiecePage();
}

var showPiecePage = function () {

    $("#pieceSlide0").html("");
    $("#pageNow").text(usePage + 1);

    var pieceFirstFlag = false;
    if ($("#pieceFirst").attr("can")) {
        pieceFirstFlag = true;
    }

    var tempLastIndex = useLength > (usePage + 1) * 8 ? (usePage + 1) * 8 : useLength;

    var arr = new Array();

    for (var i = usePage * 8; i < tempLastIndex; i++) {

        var pieceNowData = pieceJson.data[i].s.split(",");
        var pieceDiv = document.createElement("div");
        pieceDiv.className = "pieceList";
        pieceDiv.setAttribute("gid", pieceNowData[0]);

        var pieceNowDetail;
        for (var x = 0; x < localPieceJson.data.length; x++) {
            if (localPieceJson.data[x].gid == pieceNowData[0]) {
                pieceNowDetail = localPieceJson.data[x];
                break;
            }
        }

        var nowHeroDetail;
        for (var x = 0; x < localHeroJson.data.length; x++) {
            if (localHeroJson.data[x].gid == pieceNowDetail.gid) {
                nowHeroDetail = localHeroJson.data[x];
            }
        }

        var tempFlag = false;
        var CanUse = " style='background-image:url(res/refine/piece2.png);'";
        var wnNum = 0;
        if (Number(pieceNowData[1]) >= (pieceNowDetail.num / 2) && pieceNowDetail.num - Number(pieceNowData[1])<=userJson.wn) {
            tempFlag = true;

            CanUse = " style='background-image:url(res/refine/piece1.png);'";
            wnNum = pieceNowDetail.num - pieceNowData[1] > 0 ? pieceNowDetail.num - pieceNowData[1] : 0;
        }
        
        
        if (pieceFirstFlag) {
            wnNum = Math.floor(pieceNowDetail.num / 2) > userJson.wn ? Math.floor(pieceNowDetail.num / 2) : userJson.wn;
            if (Number(pieceNowData[1]) >= pieceNowDetail.num / 2) {
                if (userJson.wn >= pieceNowDetail.num / 2) {
                    wnNum = pieceNowDetail.num / 2;
                } else {
                    wnNum = userJson.wn;
                }
            } else {
                wnNum = 0;
            }
        }
        var pieceListOne = "<div class='pieceHead' ontouchstart='begin()' ontouchmove='move()' ontouchend='if(!cancel()){showHeroDetailNormal($(this).parent().attr(\"gid\"))}'><div class='pieceBg'></div><div class='pieceHeadHero' style='background-image:url(res/head/" + pieceNowDetail.imgid + ".png)'></div><div class='heroHeadColor' style='background-image:url(res/head/" + pieceNowDetail.q + ".png)'></div></div><div gname='" + pieceNowDetail.name+ "' class='pieceDetail' can=" + tempFlag + " ontouchstart='begin()' ontouchmove='move()' ontouchend='pieceOkClick(this)'><div class='jobSamll' style='background-position:" + getJobSamll(nowHeroDetail.job, nowHeroDetail.gclass) + "'></div><table class='pieceTable'><tr><td style='width:20px;color:" + getColor(String(pieceNowDetail.q)) + "'>" + pieceNowDetail.name + "</td><td style='width:50px;'>进度:<font class='pieceNum_Font'>" + pieceNowData[1] + "/" + pieceNowDetail.num + "</font></td></tr><tr><td colspan='2'>可使用万能将魂:<font class='pieceWn_Font'>" + wnNum + "</font></td></tr></table><div class='pieceComplete'" + CanUse + "></div></div>";

        $(pieceDiv).html(pieceListOne);

        $("#pieceSlide0").append(pieceDiv);
    }

}

var loadPieceFrist = function () {
    if (pieceJson == null) {
        window.GameMainClass.sendRequestJson(116, "", "setPieceJson");
    }
    else {
        showPiece();
    }
}

//合成点击
var pieceOkClick = function (ev) {
    if (cancel())
        return;
    if ($(ev).attr("can") == "true") {
        var tempWn = 0;
        if ($("#pieceFirst").attr("can")) {
            tempWn = 1;
        }
        window.GameMainClass.sendRequestJson(211, "{\"gid\":" + $(ev).parent().attr("gid") + ",\"wn\":" + tempWn + ",\"name\":\""+$(ev).attr("gname")+"\"}", "pieceOkDetail");
    }
    
}

var pieceOkDetail = function (json) {

    var tempJson = JSON.parse(json);
    //var tempJson = { "Client": [{"gname":"武魂", "gid": 5010, "wn": 0 }], "cutcoin": 10000, "cutpiece": 0, "info": "ok", "leftnum": -1, "resert": 1 };

    var maskDiv = document.createElement("div");
    maskDiv.id = "tempMask";
    $(maskDiv).css({ "width": width, "height": height, "top": "0" });
    document.body.appendChild(maskDiv);


    var tempName = tempJson.Client[0].name;
    $("#temp").html("<div id='mess2'><div id='m_title'><div id='m_titleLeft'></div><div id='m_titleCenter'><div id='m_titleContext'></div></div><div id='m_titleRight'></div></div><div id='m_waikuan'><div class='m_jiao m_shangjiao'></div><div class='m_jiao m_xiajiao'></div><div class='m_jiao m_zuojiao'></div><div class='m_jiao m_youjiao'></div><div class='m_shangwaibian'></div><div class='m_xiawaibian'></div><div class='m_zuowaibian'></div><div class='m_youwaibian'></div></div><div id='dialogclose'></div><div id='tempDialog2'><div id='friendFont'style='color:#26E50E;font-size:22px;padding-top:0px;margin-top:7px;'>您确定要合成" + tempName + "吗?<br/>消耗金币:" + tempJson.cutcoin + "<br/>消耗万能将魂:" + tempJson.cutpiece + "<br/>剩余合成次数:" + (tempJson.leftnum == -1 ? "无限制" : tempJson.leftnum) + "</div></div><div id='friendDelete'class='ShopBtn'style='width:91px;'><div class='btn'><div class='btn1'></div><div class='btn2'>确定</div><div class='btn3'></div></div></div><div id='friendCancel'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>取消</div><div class='btn3'></div></div></div></div>");
    $("#mess2").css({ "left": (width - 476) / 2, "top": (height - 279) / 2 });

    //绑定确定
    $("#friendDelete").bind("touchend", function () {
        $(this).css("-webkit-transform", "scale(1)");
        if (cancel()) {
            return;
        }
        var sendJson = "{\"gid\":" + tempJson.Client[0].gid + ",\"wn\":" + tempJson.Client[0].wn + "}";
        window.GameMainClass.sendRequestJson(117, sendJson, "pieceOk");
        $("#tempMask").remove();
        $("#temp").html("");
    }).bindAnimate();

    //绑定关闭
    $("#dialogclose,#friendCancel").bind("touchend", function () {
        $(this).css("-webkit-transform", "scale(1)");
        if (cancel()) {
            return;
        }
        $("#tempMask").remove();
        $("#temp").html("");
    }).bindAnimate();
}