/// <reference path="public.js" />
/// <reference path="json.js" />
/// <reference path="idangerous.swiper-1.9.1.min.js" />
/// <reference path="jquery-1.5.1.min.js" />

//var battleJson = { "data": [{ "hisid": 1, "list": [{ "battleid": 1, "iskill": 1, "killname": "小徐", "mapid": 1}]}], "ebattleid": 1, "ewarid": 1013, "hisid": 1, "mapid": 1, "ubattleid": 1, "uwarid": 1001 }
var battleJson;
var wartype = 1;
var battleData = { "detail": "", "last": false, "hisindex": 0, "mapindex": 0, "battleindex": 0 };
var isSubmit = false;
var battlewarid = 0;
var FirstKillData = null;
//{
//    "data": [
//      { "battleid": 1, "status": 3, "winnum": 30,"total":50 },
//      { "battleid": 2, "status": 2, "winnum": 30 },
//      { "battleid": 3, "status": 1, "winnum": 30 },
//      { "battleid": 4, "status": 0, "winnum": 30 },
//      { "battleid": 5, "status": 0, "winnum": 30 },
//      { "battleid": 6, "status": 0, "winnum": 30 }
//    ], "resert": 1
//};

var showBattle = function () {
    var div = document.createElement("div");
    div.id = "battleDialog";
    $(div).html("<div id='battle'><div id='battleClose'></div><div id='FirstKillBtn'></div><img id='title'src='res/battle/title.png'/><div id='battleSwiper' class='swiper-container battleSwiper'><div id='battleWrapper' class='map'></div></div></div>");
    document.body.appendChild(div);

    var scale = height / 480;
    var scaleX = width / 854;
    var tempLeft = -(854 * scale - width) / 2;
    var bwidth = width / scale;
    $("#battle").css({ "width": bwidth, "height": 480, "zoom": scale, "background": "url(res/battle/mapbg/1.png) no-repeat" });
    $("#title").css({ "left": (bwidth - 272) / 2, "position": "absolute" });

    if (pad) {

    } else {
        $("#FirstKillBtn,#battleClose").css({ "zoom": (1 / scale) });
    }

    var battleindex;
    var hisindex;
    var mapindex;
    //获取历史序列
    for (var j = 0; j < localBattleJson.data.length; j++) {
        //获取地图序列
        if (localBattleJson.data[j].hisid == battleJson.hisid) {
            hisindex = j;
            for (var i = 0; i < localBattleJson.data[j].hislist.length; i++) {
                if (battleJson.mapid == localBattleJson.data[j].hislist[i].mapid) {
                    mapindex = i;
                    for (var m = 0; m < localBattleJson.data[j].hislist[i].battlelist.length; m++) {
                        if (localBattleJson.data[j].hislist[i].battlelist[m].battleid == battleJson.ubattleid) {
                            battleindex = m;
                            break;
                        }
                    }
                    break;
                }
            }
            break;
        }
    }


    battleData.hisindex = hisindex;
    battleData.mapindex = mapindex;
    battleData.battleindex = battleindex;

    //showBattleHouse();
    $("#battleSwiper").css({ "width": width / scaleX, "height": height / scale });
    $("#battleWrapper").css({ "left": tempLeft });
    LoadMap(hisindex, mapindex);
    //$(".map").css({ "left": tempLeft })

    //    battleSwiper = new Swiper('.battleSwiper', {
    //        mode: "horizontal",
    //        followFinger: 1,
    //        speed: 500,
    //        swiperNo: true,
    //        momentumBounce: true,
    //        initialSlide: battleJson.mapid - 1
    //    });    

    //绑定关闭事件
    $("#battleClose").bind("touchend", function () {
        if (!cancel()) {
            $("#battleDialog").remove();;
        }
        $(this).css({ "-webkit-transform": "scale(1)" });
        isSubmit = false;
        wartype = 1;
    }).bind("touchmove", function () {
        move();
    }).bind("touchstart", function () {
        begin();
        window.GameMainClass.playEffectSound("close");
        $(this).css({ "-webkit-transform": "scale(0.8)" });
    })

    //绑定奖励按钮
    $("#FirstKillBtn").bind("touchend", function () {
        if (cancel())
            return;
        $(this).css({ "-webkit-transform": "scale(1)" });
        LoadFirstSkill();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    }).bind("touchstart", function () {
        begin();
        window.GameMainClass.playEffectSound("icon");
        $(this).css({ "-webkit-transform": "scale(0.8)" });
    })

    battlewarid = battleJson.uwarid;
}

var LoadMap = function (hisindex, pageindex) {
    if (pageindex < 0 || pageindex > localBattleJson.data[hisindex].hislist.length - 1)
        return;
    wartype = 1;
    battleData.mapindex = pageindex;

    var str = new Array();
    str.push("<div class='map_qg' style='background:url(res/battle/mapqg/" + (((pageindex + 1) % 4) == 0 ? 4 : ((pageindex + 1) % 4)) + ".png) no-repeat;'></div>");

    var len = localBattleJson.data[hisindex].hislist[pageindex].battlelist.length;
    for (var x = 0; x < len; x++) {
        str.push("<div class='mapicon' id='mi" + localBattleJson.data[hisindex].hislist[pageindex].battlelist[x].battleid + "' mapIndex=" + pageindex + " warIndex=" + x + " ");
        str.push("style='background-image:url(res/battle/mapicon/" + localBattleJson.data[hisindex].hislist[pageindex].battlelist[x].battleid + (localBattleJson.data[hisindex].hislist[pageindex].battlelist[x].battleid <= battleJson.ubattleid ? "a" : "b") + ".png);left:" + localBattleJson.data[hisindex].hislist[pageindex].battlelist[x].pos_x + "px;top:" + localBattleJson.data[hisindex].hislist[pageindex].battlelist[x].pox_y + "px;");
        //两个大房子
        if (localBattleJson.data[hisindex].hislist[pageindex].battlelist[x].battleid == 17 || localBattleJson.data[hisindex].hislist[pageindex].battlelist[x].battleid == 19) {
            str.push("width:250px;height:205px;");
        }
        str.push("'><div class='firstkill' id='firstkill" + localBattleJson.data[hisindex].hislist[pageindex].battlelist[x].battleid + "' ");
        if (localBattleJson.data[hisindex].hislist[pageindex].battlelist[x].battleid == 17 || localBattleJson.data[hisindex].hislist[pageindex].battlelist[x].battleid == 19) {
            str.push("style='left:50px;'")
        }
        str.push(">目前无人能敌</div></div>");
        
    }
    var scale = height / 480;
    var tempLeft = -(854 * scale - width) / 2;
    var bwidth = width / scale;
    //上一页    
    str.push("<div id='pagePrevBtn' style='position:absolute;bottom:10px;left:" + ((tempLeft < 0 ? 0 - tempLeft : tempLeft) + 10) + "px;' ontouchstart='begin();window.GameMainClass.playEffectSound(\"icon\");$(this).css({ \"-webkit-transform\": \"scale(0.8)\" });' ontouchmove='move();'");
    str.push(" ontouchend=' if (!cancel()) {LoadMap(" + hisindex + "," + (pageindex - 1) + ");}$(this).css({ \"-webkit-transform\": \"scale(1)\" });'></div>");
    //下一页
    str.push("<div id='pageNextBtn' style='position:absolute;bottom:10px;left:" + (bwidth + (tempLeft < 0 ? 0 - tempLeft : tempLeft) - 60) + "px;' ontouchstart='begin();window.GameMainClass.playEffectSound(\"icon\");$(this).css({ \"-webkit-transform\": \"scale(0.8)\" });' ontouchmove='move();'");
    str.push(" ontouchend=' if (!cancel()) {LoadMap(" + hisindex + "," + (pageindex + 1) + ");}$(this).css({ \"-webkit-transform\": \"scale(1)\" });'></div>");

    $("#battleWrapper").html(str.join(""));

    for (var j = 0; j < battleJson.data.length; j++) {
        if (battleJson.data[j].hisid == battleJson.hisid) {
            for (var m = 0; m < battleJson.data[j].list.length; m++) {
                if (battleJson.data[j].mapid > pageindex + 1)
                    break;

                if (battleJson.data[j].mapid < pageindex + 1)
                    continue;

                $("#firstkill" + battleJson.data[j].list[m].battleid).html("<font style='color:#ffff00;'>" + battleJson.data[j].list[m].killname + "</font> 首杀");
                if (battleJson.data[j].list[m].iskill) {
                    var div = document.createElement("div");
                    div.className = "passLabel";
                    $("#mi" + battleJson.data[j].list[m].battleid).append(div);
                }
            }
            break;
        }
    }

    $(".mapicon").bind("touchend", function () {
        $(this).css("-webkit-transform", "scale(1)")
        if (localBattleJson.data[battleData.hisindex].hislist[$(this).attr("mapIndex")].battlelist[$(this).attr("warindex")].battleid > battleJson.ubattleid)
            return;

        if (!cancel()) {
            if ($(this).attr("mapIndex")) {
                window.GameMainClass.playEffectSound("icon");
                showMap($(this).attr("mapIndex"), $(this).attr("warIndex"));
            }
        }
    }).bind("touchstart", function () {
        $(this).css("-webkit-transform", "scale(0.8)");
        begin();
    }).bind("touchmove", function () {
        $(this).css("-webkit-transform", "scale(1)");
        move();
    })
}

var justShowBattle = function () {
    $("#battleDialog").css("display", "block");
}

var LoadFirstSkill = function (json) {
    if (!json) {
        window.GameMainClass.sendRequestJson(159, '{"hisid":' + battleJson.hisid + '}', "LoadFirstSkill");
        return;
    }
    FirstKillData = JSON.parse(json);
    var maskDiv = document.createElement("div");
    maskDiv.id = "tempMask";
    $(maskDiv).css({ "width": width, "height": height, "top": "0", "z-index": 5 });
    $("#battleDialog").append(maskDiv);

    var mapDialog = "<div id='title'style='left:98px;'><div id='titleLeft'></div><div id='titleCenter'><div id='titleContext'style='background:url(res/battle/fkreward.png) no-repeat;'></div></div><div id='titleRight'></div></div><div id='waikuan'><div id='shangjiao'class='jiao shangjiao'></div><div id='xiajiao'class='jiao xiajiao'></div><div id='zuojiao'class='jiao zuojiao'></div><div id='youjiao'class='jiao youjiao'></div><div class='shangwaibian'style='width:306px;'></div><div class='xiawaibian'style='width:306px;'></div><div class='zuowaibian'></div><div class='youwaibian'></div></div><div id='close'style='left:463px;'></div><div id='rope'></div><div id='mapDialog'style='width:428px;left:48px;'><div class='swiper-container'id='FirstKillSwiper'><div class='swiper-wrapper'id='FirstKill_wrapper'></div></div></div>";

    var div = document.createElement("div");
    div.id = "FirstKillDia";
    $(div).css({ "left": (width - 530) / 2, "top": (height - 480) / 2 });
    if (pad) $(div).css({ "zoom": sp, "left": (width - 530 * sp) / 2 / sp, "top": ((height - 480 * sp) / 2 / sp) });
    //, "zoom": 480 / height
    div.innerHTML = mapDialog;
    $("#battleDialog").append(div);
    $("#FirstKillSwiper").css({ "width": 382, "height": 328, "left": 0, "top": 5 });

    div = document.createElement("div");
    div.id = "fkDetail";
    div.innerHTML = "每周1晚8点重置精英首杀，通关名额内击杀精英最后的BOSS关才能获得奖励，次杀奖励减半。";
    $("#FirstKillDia").append(div);


    var len = 0, page = 0;
    var hisindex = -1, warindex = 0;
    div = document.createElement("div");
    var ss = "";
    div.className = "swiper-slide battle-slide";
    div.id = "bs" + page;
    $("#FirstKill_wrapper").append(div);
    var index = 0;
    for (var i = 0; i < localBattleJson.data.length; i++) {
        if (localBattleJson.data[i].hisid == battleJson.hisid) {
            for (var j = 0; j < localBattleJson.data[i].hislist.length; j++) {
                for (var k = 0; k < localBattleJson.data[i].hislist[j].battlelist.length; k++) {
                    if (localBattleJson.data[i].hislist[j].battlelist[k].eliteboss == null)
                        break;
                    if (hisindex == -1) {
                        for (var i1 = 0; i1 < battleJson.data.length; i1++) {
                            if (battleJson.data[i1].hisid == battleJson.hisid) {
                                hisindex = i1;
                                break;
                            }
                        }
                    }
                    div = document.createElement("div");
                    div.className = 'FirstkillItem';
                    div.id = "fsi" + j + "_" + k;
                    $("#bs" + page).append(div);

                    for (var hindex = 0; hindex < enemyjson.data.length; hindex++) {
                        if (enemyjson.data[hindex].npcid == localBattleJson.data[i].hislist[j].battlelist[k].eliteboss) {
                            div = document.createElement("div");
                            ss = "<div class='heroHeadBg' style='position: absolute;top:-2px;left:-2px;'><div class='heroHeadColor' style='background:url(res/head/" + enemyjson.data[hindex].q + ".png) no-repeat;'></div><div class='heroHead' style='background:url(res/head/" + enemyjson.data[hindex].imgid + ".png) no-repeat;'></div></div>";
                            ss += "<font style='color:#00ff00;font-size:16px;'>" + localBattleJson.data[i].hislist[j].battlelist[k].battlename + "</font>";
                            ss += "&nbsp;&nbsp;&nbsp;通关名额: " + FirstKillData.data[index].winnum + " / " + FirstKillData.data[index].total + "<br><font style='color:#ffff00;'>首杀奖励</font>&nbsp;&nbsp;&nbsp;&nbsp;" + (FirstKillData.data[index].rank > 0 ? ("我第 " + FirstKillData.data[index].rank + " 个通关") : "") + "<br>" + localBattleJson.data[i].hislist[j].battlelist[k].elitereward;

                            switch (FirstKillData.data[index].status) {
                                case 0: //未通关
                                    ss += "<div class='StateLabel' id='sl" + j + "_" + k + "'></div>";
                                    break;
                                case 1: //未领取
                                    ss += "<div id='rbtn" + j + "_" + k + "' ontouchmove='move();' ontouchstart='begin();window.GameMainClass.playEffectSound(\"icon\");$(this).css({ \"-webkit-transform\": \"scale(0.8)\" });' ontouchend='if (!cancel()) {$(this).css({ \"-webkit-transform\": \"scale(1)\" });GetRewardSubmit(" + index + "," + j + "," + k + ");}' class='LvUpBtn' style='display:block;left:280px;top:16px;'><div class='btn'><div class='btn1'></div><div class='btn2'>领取</div><div class='btn3'></div></div></div>";
                                    break;
                                case 2: //已领取
                                    ss += "<div class='StateLabel' id='sl" + j + "_" + k + "' style='background:url(res/message/btn.png) no-repeat;'></div>";
                                    break;
                                case 3: //已领完
                                    ss += "<div class='StateLabel' id='sl" + j + "_" + k + "' style='background:url(res/battle/over.png) no-repeat;'></div>";
                                    break;
                            }

                            div.innerHTML = ss;
                            $("#fsi" + j + "_" + k).append(div);
                            break;
                        }
                    }
                    len++;
                    if (len == 4) {
                        len = 0;
                        page += 1;
                        if (j == (localBattleJson.data[i].hislist.length - 1))
                            break;
                        div = document.createElement("div");
                        div.className = "swiper-slide battle-slide";
                        div.id = "bs" + page;
                        $("#FirstKill_wrapper").append(div);
                    }
                    index++;
                }
            }
            break;
        }
    }

    var battleSwiper2 = new Swiper('#FirstKillSwiper', {
        mode: "vertical",
        followFinger: 1,
        speed: 500
    });

    //绑定关闭事件
    $("#battleDialog #close").bind("touchend", function () {
        if (!cancel()) {
            $("#FirstKillDia").remove();
            $("#tempMask").remove();
        }
        $(this).css({ "-webkit-transform": "scale(1)" });
    }).bind("touchmove", function () {
        move();
    }).bind("touchstart", function () {
        begin();
        window.GameMainClass.playEffectSound("close");
        $(this).css({ "-webkit-transform": "scale(0.8)" });
    })
}

var GetRewardSubmit = function (index, j, k) {
    window.GameMainClass.sendRequestJson(160, '{"battleid":' + FirstKillData.data[index].battleid + ',"j":' + j + ',"k":' + k + '}', "GetRewardResult");
}

var GetRewardResult = function (json) {
    var BackJson = JSON.parse(json);
    if (BackJson.resert == 1) {
        //改变领取状态
        for (var i = 0; i < FirstKillData.data.length; i++) {
            if (FirstKillData.data[i].battleid == BackJson.Client[0].battleid) {
                FirstKillData.data[i].status = 2;
                $("#rbtn" + BackJson.Client[0].j + "_" + BackJson.Client[0].k).remove();

                var div = document.createElement("div");
                div.innerHTML = "<div class='StateLabel' style='background:url(res/message/btn.png) no-repeat;'></div>";
                $("#fsi" + BackJson.Client[0].j + "_" + BackJson.Client[0].k).append(div);
                break;
            }
        }
        //获得奖励
        var rlist = BackJson.rwIDs.split(",");
        for (var i = 0; i < rlist.length; i++) {
            updateUserJson(rlist[i], BackJson.rwNums.split(",")[i]);
        }
    }

    showTextMess(BackJson.info, BackJson.resert);
}

/*
//加载房子
var showBattleHouse = function () {
    var index;
    var hisindex;
    var mapindex;
    //获取历史序列
    for (var j = 0; j < localBattleJson.data.length; j++) {
        //获取地图序列
        if (localBattleJson.data[j].hisid == battleJson.hisid) {
            hisindex = j;
            for (var i = 0; i < localBattleJson.data[j].hislist.length; i++) {
                if (battleJson.mapid == localBattleJson.data[j].hislist[i].mapid) {
                    mapindex = i;
                    for (var m = 0; m < localBattleJson.data[j].hislist[i].battlelist.length; m++) {
                        if (localBattleJson.data[j].hislist[i].battlelist[m].battleid == battleJson.ubattleid) {
                            index = m;
                            break;
                        }
                    }
                    break;
                }
            }
            break;
        }
    }


    battleData.hisindex = hisindex;
    battleData.mapindex = mapindex;
    battleData.battleindex = index;

    //页数
    var page = localBattleJson.data[hisindex].hislist.length;
    var str = new Array();
    var templen = 0;
    for (var i = 0; i < page; i++) {
        str = new Array();
        var div = document.createElement("div");
        div.className = "swiper-slide battle-slide";
        str.push("<div page='" + i + "' class='map'><div class='map_qg' style='background:url(res/battle/mapqg/" + (i + 1) + ".png) no-repeat;'></div>");
        //是否为最后一个
        var len = localBattleJson.data[hisindex].hislist[i].battlelist.length;
        for (var x = 0; x < len; x++) {
            str.push("<div class='mapicon' id='mi" + i + "_" + x + "' mapIndex=" + i + " warIndex=" + x + " style='background-image:url(res/battle/mapicon/" + localBattleJson.data[hisindex].hislist[i].battlelist[x].battleid + (localBattleJson.data[hisindex].hislist[i].battlelist[x].battleid <= battleJson.ubattleid ? "a" : "b") + ".png);left:" + localBattleJson.data[hisindex].hislist[i].battlelist[x].pos_x + "px;top:" + localBattleJson.data[hisindex].hislist[i].battlelist[x].pox_y + "px;'");

            if (x == index && i == mapindex) {
                for (var y = 0; y < localBattleJson.data[hisindex].hislist[i].battlelist[x].ususal.length; y++) {
                    if (localBattleJson.data[hisindex].hislist[i].battlelist[x].ususal[y].warid == battleJson.uwarid) {
                        str.push(" last='true' ");
                        break;
                    }
                }
            }
            str.push("><div class='firstkill' id='firstkill" + i + "_" + templen + "'>目前无人能敌</div></div>");
            templen++;
        }
        str.push("</div>");
        div.innerHTML = str.join("");
        $("#battle .swiper-wrapper").append(div);
    }
    for (var j = 0; j < battleJson.data.length; j++) {
        if (battleJson.data[j].hisid == battleJson.hisid) {
            for (var m = 0; m < battleJson.data[j].list.length; m++) {
                $("#firstkill" + (battleJson.data[j].list[m].mapid - 1) + "_" + (battleJson.data[j].list[m].battleid - 1)).html("<font style='color:#ffff00;'>" + battleJson.data[j].list[m].killname + "</font> 首杀");
                if (battleJson.data[j].list[m].iskill) {
                    div = document.createElement("div");
                    div.className = "passLabel";
                    for (var n = 0; n < localBattleJson.data[hisindex].hislist.length; n++) {
                        if (localBattleJson.data[hisindex].hislist[n].mapid == battleJson.data[j].list[m].mapid) {
                            for (var k = 0; k < localBattleJson.data[hisindex].hislist[n].battlelist.length; k++) {
                                if (localBattleJson.data[hisindex].hislist[n].battlelist[k].battleid == battleJson.data[j].list[m].battleid) {
                                    $("#mi" + (battleJson.data[j].list[m].mapid - 1) + "_" + k).append(div);
                                    break;
                                }
                            }
                            break;
                        }
                    }
                }
            }
            break;
        }
    }
}*/

//加载小地图
var showMap = function (mapindex, warindex) {
    battleData.mapindex = mapindex;
    battleData.battleindex = warindex;
    var maskDiv = document.createElement("div");
    maskDiv.id = "tempMask";
    $(maskDiv).css({ "width": width, "height": height, "top": "0", "z-index": 5 });
    $("#battle").append(maskDiv);

    var mapDialog = "<div id='title'><div id='titleLeft'></div><div id='titleCenter'><div id='titleContext'style='background:url(res/battle/titleeasy.png) no-repeat;'></div></div><div id='titleRight'></div></div><div id='waikuan'><div id='shangjiao'class='jiao shangjiao'></div><div id='xiajiao'class='jiao xiajiao'></div><div id='zuojiao'class='jiao zuojiao'></div><div id='youjiao'class='jiao youjiao'></div><div class='shangwaibian'></div><div class='xiawaibian'></div><div class='zuowaibian'></div><div class='youwaibian'></div></div><div id='close'></div><div id='rope'></div><div id='mapDialog'></div><div id='wartype_easy'></div><div id='wartype_hard'style='background-position: -64px 0;'></div><div id='map_btnClear'class='bossBtn'><div class='abtn'><div class='btn1'></div><div class='btn2'>扫荡</div><div class='btn3'></div></div></div><div id='map_btnFight' class='bossBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>战斗</div><div class='btn3'></div></div></div>";

    var div = document.createElement("div");
    div.id = "map";
    $(div).css({ "left": (width - 800) / 2, "top": (height - 480) / 2 });
    if (pad) $(div).css({ "zoom": sp, "left": (width - 800 * sp) / 2 / sp, "top": (height - 480 * sp) / 2 / sp });
    div.innerHTML = mapDialog;
    $("body").append(div);


    var src = $(event.srcElement);
    if (src.attr("last"))
        battleData.last = true;
    else
        battleData.last = false;

    var detail = localBattleJson.data[battleData.hisindex].hislist[mapindex].battlelist[warindex];
    battleData.detail = detail;

    showUsual();

    //绑定关闭事件
    $("#close").bind("touchend ", function () {
        if (!cancel()) {
            $("#map").remove();
            $("#tempMask").remove();
            wartype = 1;
        }
        $(this).css({ "-webkit-transform": "scale(1)" });
    }).bind("touchmove", function () {
        move();
    }).bind("touchstart", function () {
        begin();
        window.GameMainClass.playEffectSound("close");
        $(this).css({ "-webkit-transform": "scale(0.8)" });
    })

    $("#map_btnFight").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        nowwarid = battlewarid;
        fighttype = 0;
        loadTake();
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })

    //绑定精英本按钮
    $("#wartype_hard").bind("touchend", function () {
        //if (wartype == 2)
        //    return;
        window.GameMainClass.playEffectSound("menu");

        if (battleData.detail.battleid > battleJson.ebattleid) {
            if (battleData.detail.battleid == 1)
                showTextMess("请先通过普通关卡", 0);
            else
                showTextMess("请先通过上一个精英关卡", 0);
            return;
        }
        $("#wartype_hard").css({ "background-position": "0 0" });
        $("#wartype_easy").css({ "background-position": "-64px 0" });
        $("#titleContext").css({ "background": "url(res/battle/titlehard.png) no-repeat" });
        showElite();
        wartype = 2;
        $("#map_btnFight").unbind("touchend");
        $("#map_btnFight").bind("touchend", function () {
            $(this).css({ "-webkit-transform": "scale(1)" });
            nowwarid = battlewarid; fighttype = 0; loadTake();
        }); //window.GameMainClass.startBattle(150, '{ "warid":' + battleJson.ewarid + '}', "");
    })
    //绑定普通本按钮
    $("#wartype_easy").bind("touchend", function () {
        window.GameMainClass.playEffectSound("menu");
        if (wartype == 1)
            return;
        $("#wartype_hard").css({ "background-position": "-64px 0" });
        $("#wartype_easy").css({ "background-position": "0 0" });
        $("#titleContext").css({ "background": "url(res/battle/titleeasy.png) no-repeat" });
        showUsual();
        wartype = 1;
        $("#map_btnFight").unbind("touchend");
        $("#map_btnFight").bind("touchend", function () { nowwarid = battlewarid; fighttype = 0; loadTake(); }); //window.GameMainClass.startBattle(150, '{ "warid": ' + battleJson.uwarid + ' }', "");
    })

    $("#map_btnClear").bind("touchend", function () {
        showTextMess("暂未开放", 2);
        return;
    })

}

var setBattleJson = function (json) {
    battleJson = JSON.parse(json);
    showBattle();
    isSubmit = false;
}

var loadBattle = function () {
    if (isSubmit)
        return;
    if (battleJson == null) {
        window.GameMainClass.sendRequestJson(128, '', "setBattleJson");
    }
    else { showBattle(); }
    isSubmit = true;
}

//显示精英本
var showElite = function () {
    $("#mapDialog").html("");
    var tempDiv = document.createElement("div");
    $(tempDiv).html("<div id='wardetailbox'></div>")
    $("#mapDialog").append(tempDiv);

    tempDiv = document.createElement("div");
    tempDiv.id = "wardataBox";
    $("#wardetailbox").append(tempDiv);

    tempDiv = document.createElement("div");
    tempDiv.id = "wardropBox";
    $("#wardetailbox").append(tempDiv);

    var div = document.createElement("div");
    div.id = "warpointBox";
    $("#mapDialog").append(div);
    for (var i = 0; i < battleData.detail.elitenum; i++) {
        var tempDiv = document.createElement("div");
        $(tempDiv).html("<div id='wp" + i + "' class='warpoint' style='background:url(res/battle/battleicon/" + (battleData.detail.elite[i].warid <= battleJson.ewarid ? battleData.detail.elite[i].icona : (battleData.detail.elite[i].icon + "b")) + ".png) no-repeat;'>" + battleData.detail.elite[i].name + "</div>");
        $("#warpointBox").append(tempDiv);

        if (battleData.detail.elite[i].warid == battleJson.ewarid) {
            tempDiv = document.createElement("div");
            tempDiv.className = "warselect";
            $("#wp" + i).append(tempDiv);
            battlewarid = battleData.detail.elite[i].warid;
            $("#wardataBox").html("<table><tr><td>" + battleData.detail.elite[i].name + "</td></tr><tr><td>开启等级:<font style='color:#ffff00;'>" + battleData.detail.elite[i].lv + "</font></td></tr><tr><td>体力:<font style='color:#ffff00;'>" + battleData.detail.elite[i].strength + "</font></td></tr><tr><td>银币:<font style='color:#ffff00;'>" + battleData.detail.elite[i].getcoin + "</font></td></tr><tr><td>经验:<font style='color:#ffff00;'>" + battleData.detail.elite[i].getexp + "</font></td></tr></table>");
            $("#wardropBox").html("<table><tr><td>" + battleData.detail.elite[i].drop + "</td></tr></table>");
        }

        if (battleData.detail.elite[i].warid <= battleJson.ewarid) {
            $("#wp" + i).bind("touchend ", function () {
                if (cancel())
                    return;
                $(this).css({ "-webkit-transform": "scale(1)" });
                ShowWarData(this.id.replace("wp", ""))
            }).bind("touchstart", function () {
                $(this).css({ "-webkit-transform": "scale(0.8)" });
                begin();
            }).bind("touchmove", function () {
                $(this).css({ "-webkit-transform": "scale(1)" });
                move();
            });
        }

        if (i > 0 && battleData.detail.elite[i - 1].warid == battleJson.ewarid)
            break;
    }

    if (battleData.detail.battleid < battleJson.ebattleid) {
        var i = battleData.detail.elite.length - 1;
        tempDiv = document.createElement("div");
        tempDiv.className = "warselect";
        $("#wp" + i).append(tempDiv);

        $("#wardataBox").html("<table><tr><td>" + battleData.detail.elite[i].name + "</td></tr><tr><td>开启等级:<font style='color:#ffff00;'>" + battleData.detail.elite[i].lv + "</font></td></tr><tr><td>体力:<font style='color:#ffff00;'>" + battleData.detail.elite[i].strength + "</font></td></tr><tr><td>银币:<font style='color:#ffff00;'>" + battleData.detail.elite[i].getcoin + "</font></td></tr><tr><td>经验:<font style='color:#ffff00;'>" + battleData.detail.elite[i].getexp + "</font></td></tr></table>");
        $("#wardropBox").html("<table><tr><td>" + battleData.detail.elite[i].drop + "</td></tr></table>");
        battlewarid = battleData.detail.elite[i].warid;
    }
}

//显示普通本
var showUsual = function () {
    $("#mapDialog").html("");
    var tempDiv = document.createElement("div");
    $(tempDiv).html("<div id='wardetailbox'></div>")
    $("#mapDialog").append(tempDiv);

    tempDiv = document.createElement("div");
    tempDiv.id = "wardataBox";
    $("#wardetailbox").append(tempDiv);

    tempDiv = document.createElement("div");
    tempDiv.id = "wardropBox";
    $("#wardetailbox").append(tempDiv);

    var div = document.createElement("div");
    div.id = "warpointBox";
    $("#mapDialog").append(div);
    for (var i = 0; i < battleData.detail.usualnum; i++) {
        var tempDiv = document.createElement("div");
        $(tempDiv).html("<div id='wp" + i + "' class='warpoint' style='background:url(res/battle/battleicon/" + (battleData.detail.ususal[i].warid <= battleJson.uwarid ? battleData.detail.ususal[i].icona : (battleData.detail.ususal[i].icon + "b")) + ".png) no-repeat;'>" + battleData.detail.ususal[i].name + "</div>");
        $("#warpointBox").append(tempDiv);

        if (battleData.detail.ususal[i].warid == battleJson.uwarid) {
            tempDiv = document.createElement("div");
            tempDiv.className = "warselect";
            $("#wp" + i).append(tempDiv);
            battlewarid = battleData.detail.ususal[i].warid;
            $("#wardataBox").html("<table><tr><td>" + battleData.detail.ususal[i].name + "</td></tr><tr><td>开启等级:<font style='color:#ffff00;'>" + battleData.detail.ususal[i].lv + "</font></td></tr><tr><td>体力:<font style='color:#ffff00;'>" + battleData.detail.ususal[i].strength + "</font></td></tr><tr><td>银币:<font style='color:#ffff00;'>" + battleData.detail.ususal[i].getcoin + "</font></td></tr><tr><td>经验:<font style='color:#ffff00;'>" + battleData.detail.ususal[i].getexp + "</font></td></tr></table>");
            $("#wardropBox").html("<table><tr><td>" + battleData.detail.ususal[i].drop + "</td></tr></table>");
        }

        if (battleData.detail.ususal[i].warid <= battleJson.uwarid) {
            $("#wp" + i).bind("touchend ", function () {
                if (cancel())
                    return;
                $(this).css({ "-webkit-transform": "scale(1)" });
                ShowWarData(this.id.replace("wp", ""))
            }).bind("touchstart", function () {
                $(this).css({ "-webkit-transform": "scale(0.8)" });
                begin();
            }).bind("touchmove", function () {
                $(this).css({ "-webkit-transform": "scale(1)" });
                move();
            });
        }

        if (i > 0 && battleData.detail.ususal[i - 1].warid == battleJson.uwarid)
            break;
    }

    if (battleData.detail.battleid < battleJson.ubattleid) {
        var i = battleData.detail.ususal.length - 1;
        tempDiv = document.createElement("div");
        tempDiv.className = "warselect";
        $("#wp" + i).append(tempDiv);

        $("#wardataBox").html("<table><tr><td>" + battleData.detail.ususal[i].name + "</td></tr><tr><td>开启等级:<font style='color:#ffff00;'>" + battleData.detail.ususal[i].lv + "</font></td></tr><tr><td>体力:<font style='color:#ffff00;'>" + battleData.detail.ususal[i].strength + "</font></td></tr><tr><td>银币:<font style='color:#ffff00;'>" + battleData.detail.ususal[i].getcoin + "</font></td></tr><tr><td>经验:<font style='color:#ffff00;'>" + battleData.detail.ususal[i].getexp + "</font></td></tr></table>");
        $("#wardropBox").html("<table><tr><td>" + battleData.detail.ususal[i].drop + "</td></tr></table>");
        battlewarid = battleData.detail.ususal[i].warid;
    }
}

var ShowWarData = function (i) {
    $(".warselect").remove();
    var tempDiv = document.createElement("div");
    tempDiv.className = "warselect";
    $("#wp" + i).append(tempDiv);
    $(tempDiv).css({ "left": 107, "top": -77 }).animate({ "left": "50px", "top": "-7px" }, 300, "linear");
    window.GameMainClass.playEffectSound("bs");
    switch (wartype) {
        case 1:
            $("#wardataBox").html("<table><tr><td>" + battleData.detail.ususal[i].name + "</td></tr><tr><td>开启等级:<font style='color:#ffff00;'>" + battleData.detail.ususal[i].lv + "</font></td></tr><tr><td>体力:<font style='color:#ffff00;'>" + battleData.detail.ususal[i].strength + "</font></td></tr><tr><td>银币:<font style='color:#ffff00;'>" + battleData.detail.ususal[i].getcoin + "</font></td></tr><tr><td>经验:<font style='color:#ffff00;'>" + battleData.detail.ususal[i].getexp + "</font></td></tr></table>");
            $("#wardropBox").html("<table><tr><td>" + battleData.detail.ususal[i].drop + "</td></tr></table>");
            battlewarid = battleData.detail.ususal[i].warid;
            break;
        case 2:
            $("#wardataBox").html("<table><tr><td>" + battleData.detail.elite[i].name + "</td></tr><tr><td>开启等级:<font style='color:#ffff00;'>" + battleData.detail.elite[i].lv + "</font></td></tr><tr><td>体力:<font style='color:#ffff00;'>" + battleData.detail.elite[i].strength + "</font></td></tr><tr><td>银币:<font style='color:#ffff00;'>" + battleData.detail.elite[i].getcoin + "</font></td></tr><tr><td>经验:<font style='color:#ffff00;'>" + battleData.detail.elite[i].getexp + "</font></td></tr></table>");
            $("#wardropBox").html("<table><tr><td>" + battleData.detail.elite[i].drop + "</td></tr></table>");
            battlewarid = battleData.detail.elite[i].warid;
            break;
    }

}

var FightResult = function (json) {
    var BackJson = JSON.parse(json);
    if (BackJson.resert == 1 && BackJson.iswin == 1) {
        //更改用户数据
        userJson.lv = BackJson.upUJson.lv;
        if (userJson.lv != BackJson.upUJson.lv)
            $("#u_lv").html(getCityLv(userJson.lv));
        userJson.exp = BackJson.upUJson.exp;
        var tempExpWidth = (userJson.exp / lvUpJson.data[userJson.lv - 1].exp) * 96;
        $("#u_exp").css("width", parseInt(tempExpWidth)).children("#u_exp_content").text(parseInt(userJson.exp / lvUpJson.data[userJson.lv - 1].exp * 100) + "%");
        

        userJson.gnum = BackJson.upUJson.gnum;
        userJson.pnum = BackJson.upUJson.pnum;
        userJson.fspoint = BackJson.upUJson.fspoint;
        userJson.leader = BackJson.upUJson.leader;
        if (userJson.strength >= userJson.smax && BackJson.upUJson.strength < userJson.smax) {
            userJson.stime = 300;
        }
        userJson.strength = BackJson.upUJson.strength;
        var StrengWidth = parseInt((userJson.strength / userJson.smax) * 122) > userJson.smax ? userJson.smax : parseInt((userJson.strength / userJson.smax) * 122);
        $("#u_strength").css("width", StrengWidth).children("#u_strength_content").text(userJson.strength + "/" + userJson.smax + "");

        if (BackJson.isLvUp == 1)
            LvUpChange();

        //加物品
        if (BackJson.ware)
            AddItem(BackJson.ware);
        if (BackJson.gen) {
            for (var i = 0; i < BackJson.gen.length; i++)
                heroJson.data.push(BackJson.gen[i]);
        }
        if (pieceJson != null) {
            if (BackJson.piece) {
                for (var i = 0; i < BackJson.piece.length; i++) {
                    var tempPieceId = BackJson.piece[i].s.split(",")[0];
                    var tempFlag = false;
                    for (var j = 0; j < pieceJson.data.length; j++) {
                        if (pieceJson.data[j].s.split(",")[0] == tempPieceId) {
                            pieceJson.data[j].s = BackJson.piece[i].s;
                            tempFlag = true;
                            break;
                        }
                    }
                    if (!tempFlag) {
                        pieceJson.data.push(BackJson.piece[i]);
                    }
                }
            }
        }
        //比对新旧战争基础数据
        //如果地图ID不一样

        if (BackJson.war) {
            if (BackJson.Client[0].warid < 3000)//普通战役
            {
                if (BackJson.war.ubattleid != battleJson.ubattleid) {
                    $("#tempMask").remove();
                    $("#map").remove();
                    battleJson = BackJson.war;
                    battleData.battleindex = parseInt(battleData.battleindex) + 1;
                    if (BackJson.war.mapid != battleJson.mapid) {
                        battleData.mapindex = parseInt(battleData.mapindex) + 1;
                        battleData.battleindex = 0;
                        //切换到下一页                        
                        LoadMap(battleData.hisindex, battleData.mapindex);
                    }
                    $("#mi" + BackJson.war.ubattleid).css({ "background-image": "url(res/battle/mapicon/" + BackJson.war.ubattleid + "a.png)", "left": localBattleJson.data[battleData.hisindex].hislist[battleData.mapindex].battlelist[battleData.battleindex].pos_x, "top": localBattleJson.data[battleData.hisindex].hislist[battleData.mapindex].battlelist[battleData.battleindex].pox_y });
                }
                else {
                    //点亮新的普通战役点
                    if (BackJson.war.uwarid > battleJson.uwarid) {
                        for (var i = 0; i < battleData.detail.ususal.length; i++) {
                            if (battleData.detail.ususal[i].warid == BackJson.war.uwarid) {
                                $("#wp" + i).css({ "background": "url(res/battle/battleicon/" + battleData.detail.ususal[i].icona + ".png) no-repeat" });
                                //射箭
                                $(".warselect").remove();
                                var tempDiv = document.createElement("div");
                                tempDiv.className = "warselect";
                                $(tempDiv).css({ "left": 107, "top": -77 }).animate({ "left": "50px", "top": "-7px" }, 300, "linear");
                                $("#wp" + i).append(tempDiv);
                                $("#wp" + i).bind("touchend ", function () {
                                    if (cancel())
                                        return;
                                    $(this).css({ "-webkit-transform": "scale(1)" });
                                    ShowWarData(i);
                                }).bind("touchstart", function () {
                                    $(this).css({ "-webkit-transform": "scale(0.8)" });
                                    begin();
                                }).bind("touchmove", function () {
                                    $(this).css({ "-webkit-transform": "scale(1)" });
                                    move();
                                });
                                battlewarid = BackJson.war.uwarid;
                                //如果是倒数第二个，则只点亮最后一个，没有新点出现，否则还要将下下一个点显示出来
                                if ((i + 1) < battleData.detail.ususal.length) {
                                    tempDiv = document.createElement("div");
                                    $(tempDiv).html("<div id='wp" + (i + 1) + "' class='warpoint' style='background:url(res/battle/battleicon/" + battleData.detail.ususal[i + 1].icon + "b.png) no-repeat;'>" + battleData.detail.ususal[i + 1].name + "</div>");
                                    $("#warpointBox").append(tempDiv);
                                }
                                battleJson = BackJson.war;
                                break;
                            }
                        }
                    }
                }
            }
            else { //精英战役 
                if (BackJson.iseboss) {
                    //判断是否为第一次通关
                    var isFirst = true;
                    for (var j = 0; j < battleJson.data.length; j++) {
                        if (battleJson.data[j].hisid == battleJson.hisid) {
                            for (var m = 0; m < battleJson.data[j].list.length; m++) {
                                if (battleJson.data[j].mapid > battleData.mapindex + 1)
                                    break;

                                if (battleJson.data[j].mapid < battleData.mapindex + 1)
                                    continue;

                                if (battleJson.data[j].battleid == battleData.detail.battleid) {
                                    if (battleJson.data[j].list[m].iskill) {
                                        isFirst = false;
                                    }
                                    break;
                                }
                            }
                            break;
                        }
                    }
                    //加上通关标识
                    if (isFirst) {
                        var div = document.createElement("div");
                        div.className = "passLabel";
                        $("#mi" + battleData.detail.battleid).append(div);
                    }
                    //判断是否为首杀
                    for (var j = 0; j < BackJson.war.data.length; j++) {
                        if (BackJson.war.data[j].hisid == battleJson.hisid) {
                            for (var m = 0; m < BackJson.war.data[j].list.length; m++) {
                                if (BackJson.war.data[j].mapid > battleData.mapindex + 1)
                                    break;
                                if (BackJson.war.data[j].mapid < battleData.mapindex + 1)
                                    continue;

                                $("#firstkill" + BackJson.war.data[j].list[m].battleid).html("<font style='color:#ffff00;'>" + BackJson.war.data[j].list[m].killname + "</font> 首杀");
                            }
                            break;
                        }
                    }
                }

                if (BackJson.war.ebattleid != battleJson.ebattleid) {
                    $("#tempMask").remove();
                    $("#map").remove();
                }
                else {
                    //点亮新的精英战役点
                    if (BackJson.war.ewarid > battleJson.ewarid) {
                        for (var i = 0; i < battleData.detail.elite.length; i++) {
                            if (battleData.detail.elite[i].warid == battleJson.ewarid) {
                                if ((i + 1) < battleData.detail.elite.length) {
                                    $("#wp" + (i + 1)).css({ "background": "url(res/battle/battleicon/" + battleData.detail.elite[i + 1].icona + ".png) no-repeat" });
                                    //射箭
                                    $(".warselect").remove();
                                    var tempDiv = document.createElement("div");
                                    tempDiv.className = "warselect";
                                    $("#wp" + (i + 1)).append(tempDiv);
                                    $("#wp" + (i + 1)).bind("touchend ", function () {
                                        if (cancel())
                                            return;
                                        $(this).css({ "-webkit-transform": "scale(1)" });
                                        ShowWarData(i + 1);
                                    }).bind("touchstart", function () {
                                        $(this).css({ "-webkit-transform": "scale(0.8)" });
                                        begin();
                                    }).bind("touchmove", function () {
                                        $(this).css({ "-webkit-transform": "scale(1)" });
                                        move();
                                    });
                                    battlewarid = BackJson.war.ewarid;
                                    //如果是倒数第二个，则只点亮最后一个，没有新点出现，否则还要将下下一个点显示出来
                                    if ((i + 2) < battleData.detail.elite.length) {
                                        tempDiv = document.createElement("div");
                                        $(tempDiv).html("<div id='wp" + (i + 2) + "' class='warpoint' style='background:url(res/battle/battleicon/" + battleData.detail.elite[i + 2].icon + "b.png) no-repeat;'>" + battleData.detail.elite[i + 2].name + "</div>");
                                        $("#warpointBox").append(tempDiv);
                                    }
                                }
                                break;
                            }
                        }
                    }
                }
                battleJson = BackJson.war;
            }
        }
    }

    userJson.coin = BackJson.coin;

    if (userJson.coin >= 1000000)
        $("#u_coin").text(parseInt(userJson.coin / 10000) + "万");
    else
        $("#u_coin").text(userJson.coin);


    friendEnd(BackJson.friend, BackJson.iswin);
}