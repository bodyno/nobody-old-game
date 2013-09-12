/// <reference path="public.js" />
/// <reference path="json.js" />
/// <reference path="jquery-1.5.1.min.js" />

var setMineJson = function (json) {
    MineJson.data = JSON.parse(json).json;
    MineJson.page = getMinePage();
    LoadMine();
}

var getMinePage = function () {
    if (userJson.lv >= 15 && userJson.lv <= 25) {
        return 5;
    } else if (userJson.lv >= 26 && userJson.lv <= 39) {
        return 4;
    } else if (userJson.lv >= 40 && userJson.lv <= 49) {
        return 3;
    } else if (userJson.lv >= 50 && userJson.lv <= 59) {
        return 2;
    } else if (userJson.lv >= 60 && userJson.lv <= 69) {
        return 2;
    } else if (userJson.lv >= 70 && userJson.lv <= 100) {
        return 2;
    }
}

//加载矿区资源
var LoadMine = function () {
    var scale = height / 480;
    var bwidth = width / scale;

    var oScale = 480 / height;

    //pad适配
    $("#dialog").css({ "zoom": 1, top: 0 });

    var str = new Array();
    str.push("<div id='MineBg'>");
    str.push("<div class='MuneItem' id='BackCity' ontouchmove='move();$(this).css(\"-webkit-transform\",\"scale(1)\");' ontouchstart='begin();$(this).css(\"-webkit-transform\",\"scale(0.8)\")' ontouchend='$(this).css(\"-webkit-transform\",\"scale(1)\");if (!cancel()) {resetDialog();window.GameMainClass.playEffectSound(\"close\");$(\"#dialog\").html(\"\");window.GameMainClass.sendRequestJson(1156,\"\",\"\");}' style='width:60px;height:60px;top:4px;right:4px;zoom:" + oScale + ";'></div>");
    str.push("<div id='MinePageTitle'>" + MineJson.data.lvmin + "-" + MineJson.data.lvmax + "级 矿区<font id='MinePage'>1</font></div>");
    str.push("<div id='MineBox'></div></div>");
    $("#dialog").append(str.join(""));

    $("#MineBg").css({ "width": bwidth, "zoom": scale });
    $("#MinePageTitle").css("left", (bwidth - 272) / 2);

    if (pad) {
        $("#BackCity").css({ "zoom": 1 });
    }

    CheckMinePage("");
}

var CheckMinePage= function (json) {
    if (json != "") {
        var BackJson = eval("(" + json + ")");
        MineJson.data = BackJson.json;
    }
    $("#MinePage").html(MineJson.data.pageindex);
    var str = new Array();
    var tempLeft = -(854 * height / 480 - width) / 2;
    var top = 87, left = 126 + tempLeft;
    var color = "#fff";
    for (var i = 0; i < MineJson.data.MineList.length; i++) {
        if (MineJson.data.MineList[i].uid == userJson.uid)
            color = "Yellow";
        else
            color = "#fff";

        if (MineJson.data.pageindex != 1) {
            if (MineJson.data.MineList[i].uid > 0) {
                str.push("<div ontouchmove='$(this).css({ \"-webkit-transform\": \"scale(1)\" });move()' ontouchstart='$(this).css({ \"-webkit-transform\": \"scale(1.2)\" });begin()' ontouchend='$(this).css({ \"-webkit-transform\": \"scale(1)\" });if (Math.abs(lastPosX - beforePosX) < 5) GetMineData(" + i + ");' class='MineBulid' style='top:" + top + "px;left:" + left + "px;background-position:-" + ((MineJson.data.pageindex == 5 ? 4 : MineJson.data.pageindex) * 200) + "px -120px;'>");
                str.push("<div class='DefaultFont_14' style='color:" + color + ";top:0px;width:133px;left:41px;text-align:center;font-weight:200;background:url(res/mine/NameBg.png) no-repeat;height:39px;background-position:center;line-height:39px;'>" + MineJson.data.MineList[i].nick + "</div></div>"); //占领者名称
            }
            else
                str.push("<div ontouchmove='$(this).css({ \"-webkit-transform\": \"scale(1)\" });move()' ontouchstart='$(this).css({ \"-webkit-transform\": \"scale(1.2)\" });begin()' ontouchend='$(this).css({ \"-webkit-transform\": \"scale(1)\" });if (Math.abs(lastPosX - beforePosX) < 5) GetMineData(" + i + ");' class='MineBulid' style='top:" + top + "px;left:" + left + "px;background-position:-" + ((MineJson.data.pageindex == 5 ? 4 : MineJson.data.pageindex) * 200) + "px 0;'></div>");
        }
        else {
            if (i != 4) {
                if (MineJson.data.MineList[i].uid > 0) {
                    str.push("<div ontouchmove='$(this).css({ \"-webkit-transform\": \"scale(1)\" });move()' ontouchstart='$(this).css({ \"-webkit-transform\": \"scale(1.2)\" });begin()' ontouchend='$(this).css({ \"-webkit-transform\": \"scale(1)\" });if (Math.abs(lastPosX - beforePosX) < 5) GetMineData(" + i + ");' class='MineBulid' style='top:" + top + "px;left:" + left + "px;background-position:-" + (MineJson.data.pageindex * 200) + "px -120px;'>");
                    str.push("<div class='DefaultFont_14' style='color:" + color + ";top:0px;width:133px;left:41px;text-align:center;font-weight:200;background:url(res/mine/NameBg.png) no-repeat;background-position:center;height:39px;line-height:39px;'>" + MineJson.data.MineList[i].nick + "</div></div>"); //占领者名称
                }
                else
                    str.push("<div ontouchmove='$(this).css({ \"-webkit-transform\": \"scale(1)\" });move()' ontouchstart='$(this).css({ \"-webkit-transform\": \"scale(1.2)\" });begin()' ontouchend='$(this).css({ \"-webkit-transform\": \"scale(1)\" });if (Math.abs(lastPosX - beforePosX) < 5) GetMineData(" + i + ");' class='MineBulid' style='top:" + top + "px;left:" + left + "px;background-position:-" + (MineJson.data.pageindex * 200) + "px 0;'></div>");
            }
            else {
                if (MineJson.data.MineList[i].uid > 0) {
                    str.push("<div ontouchmove='$(this).css({ \"-webkit-transform\": \"scale(1)\" });move()' ontouchstart='$(this).css({ \"-webkit-transform\": \"scale(1.2)\" });begin()' ontouchend='$(this).css({ \"-webkit-transform\": \"scale(1)\" });if (Math.abs(lastPosX - beforePosX) < 5) GetMineData(" + i + ");' class='MineBulid' style='top:" + top + "px;left:" + left + "px;background-position:0 -120px;'>");
                    str.push("<div class='DefaultFont_14' style='color:" + color + ";top:0px;width:133px;left:41px;text-align:center;font-weight:200;background:url(res/mine/NameBg.png) no-repeat;background-position:center;height:39px;line-height:39px;'>" + MineJson.data.MineList[i].nick + "</div></div>"); //占领者名称
                }
                else
                    str.push("<div ontouchmove='$(this).css({ \"-webkit-transform\": \"scale(1)\" });move()' ontouchstart='$(this).css({ \"-webkit-transform\": \"scale(1.2)\" });begin()' ontouchend='$(this).css({ \"-webkit-transform\": \"scale(1)\" });if (Math.abs(lastPosX - beforePosX) < 5) GetMineData(" + i + ");' class='MineBulid' style='top:" + top + "px;left:" + left + "px;'></div>");
            }
        }

        if ((i + 1) % 3 == 0) {
            top += 121;
            left = 126 + tempLeft;
        }
        else
            left += 201;
    }
    var oScale = 480 / height;
    str.push("<div class='CampaignNameLeft' id='mineLeft' style='bottom:10px;left:10px;' ontouchmove='move();$(this).css(\"-webkit-transform\",\"scale(1)\");' ontouchstart='begin();$(this).css(\"-webkit-transform\",\"scale(0.8)\");' ontouchend='$(this).css(\"-webkit-transform\",\"scale(1)\");if (!cancel()) {CheckPage(" + (MineJson.data.pageindex - 1) + ");}'></div>");

    str.push("<div class='CampaignNameRight' id='mineRight' style='bottom:10px;right:10px;' ontouchmove='move();$(this).css(\"-webkit-transform\",\"scale(1)\");' ontouchstart='begin();$(this).css(\"-webkit-transform\",\"scale(0.8)\");' ontouchend='$(this).css(\"-webkit-transform\",\"scale(1)\");if (!cancel()) {CheckPage(" + (MineJson.data.pageindex + 1) + ");}'></div>");
    $("#MineBox").html(str.join(""));
}

var GetMineData = function (index) {
    window.GameMainClass.playEffectSound("icon");
    window.GameMainClass.sendRequestJson(1150, '{"mineid":' + MineJson.data.MineList[index].id + ',"index":' + index + '}', "ShowMineData");
}

var ShowMineData= function (json) {
    //var BackJson = { 'Client': [{ 'index': 2 }], 'maxcoin': 3200, 'leftseconds': 3, 'totalcoin': 2000, 'ulevel': 31 };
    var BackJson = JSON.parse(json);
    //用于倒计时
    tempBackJson = BackJson;

    var maskDiv = document.createElement("div");
    maskDiv.id = "tempMask2";
    $(maskDiv).css({ "width": width, "height": height, "top": "0", "z-index": "150" });
    document.body.appendChild(maskDiv);

    $("#temp").html("<div id='mess3'style='z-index:170;width:500px;height:339px;left:" + (width - 500) / 2 + "px;top:" + (height - 339) / 2 + "px;'><div id='q_title'style='left:70px;'><div id='q_titleLeft'></div><div id='q_titleCenter'><div id='q_titleContext'style='background-image:url(res/public/title/50.png);'></div></div><div id='q_titleRight'></div></div><div id='t_waikuan'><div class='q_jiao q_shangjiao'></div><div class='q_jiao q_xiajiao'></div><div class='q_jiao q_zuojiao'></div><div class='q_jiao q_youjiao'></div><div class='q_shangwaibian'style='width:275px;'></div><div class='q_xiawaibian'style='width:275px;'></div><div class='q_zuowaibian'style='height:184px;'></div><div class='q_youwaibian'style='height:183px;'></div></div><div id='dialogclose'></div><div id='rope'></div><div id='tempDialog3'style='width:430px;height:200px;'></div></div>");

    if (pad) $("#mess3").css({ "zoom": sp, "left": (width - 500 * sp) / 2 / sp, "top": (height - 339 * sp) / 2 / sp });

    //窗口内容
    var str = [];

    str.push("<div id='MineBulidBg'></div>");

    if (MineJson.data.pageindex == 1 && BackJson.Client[0].index==4) {
        if (MineJson.data.MineList[BackJson.Client[0].index].uid != 0)
            str.push("<div class='MineBulid' style='background-position:0px -120px;'></div>");
        else
            str.push("<div class='MineBulid' style='background-position:0px 0px;'></div>");
    }
    else {
        if (MineJson.data.MineList[BackJson.Client[0].index].uid != 0)
            str.push("<div class='MineBulid' style='background-position:-" + ((MineJson.data.pageindex == 5 ? 4 : MineJson.data.pageindex) * 200) + "px -120px;'></div>");
        else
            str.push("<div class='MineBulid' style='background-position:-" + ((MineJson.data.pageindex == 5 ? 4 : MineJson.data.pageindex) * 200) + "px 0px;'></div>");
    }

    str.push("<div class='DefaultFont_14' style='top:17px;left:205px;color:white;font-size:16px;font-weight:normal;'>产量：<font style='color:#26E50E'>" + BackJson.maxcoin + "</font></div>");
    str.push("<div class='DefaultFont_14' style='top:49px;left:205px;color:white;font-size:16px;font-weight:normal;'>矿主：<font style='color:#26E50E'>" + (MineJson.data.MineList[BackJson.Client[0].index].uid < 1 ? "无" : ("Lv." + BackJson.ulevel + "  " + MineJson.data.MineList[BackJson.Client[0].index].nick)) + "</font></div>");
    str.push("<div class='DefaultFont_14' style='top:78px;left:205px;color:white;font-size:16px;font-weight:normal;'>累计银币：<font style='color:#26E50E' id='nowcoin'>" + (MineJson.data.MineList[BackJson.Client[0].index].uid < 1 ? "0" : BackJson.totalcoin) + "</font></div>");
    str.push("<div class='DefaultFont_14' style='top:107px;left:205px;color:white;font-size:16px;font-weight:normal;'>剩余时间：<font style='color:#26E50E' id='minetime'>" + (MineJson.data.MineList[BackJson.Client[0].index].uid < 1 ? "00:00:00" : expireTime(BackJson.leftseconds)) + "</font></div>");
    //说明
    str.push("<div class='DefaultFont_14' style='top:146px;left:15px;color:rgb(204, 204, 204);width:416px;font-weight:100;font-size:18px;'>");
    str.push("注：放弃可获得当前累积银币,并占领更高级的矿脉.");
    str.push("</div>");

    //$("#mess3").append("<div id=''class='LvUpBtn'style='display: block;right:190px;bottom:23px;'><div class='btn'><div class='btn1'></div><div class='btn2'>开采</div><div class='btn3'></div></div></div>")

    if (MineJson.data.MineList[BackJson.Client[0].index].uid < 1) {
        if (MineJson.data.selfmineid > 0)
            $("#mess3").append("<div id='MineBtn'class='LvUpBtn'style='display: block;right:200px;bottom:23px;'><div class='btn abtn'><div class='btn1'></div><div class='btn2'>开采</div><div class='btn3'></div></div></div>")
        else
            $("#mess3").append("<div id='MineBtn'class='LvUpBtn'style='display: block;right:200px;bottom:23px;' ontouchmove='$(this).css({ \"-webkit-transform\": \"scale(1)\" });move()' ontouchstart='$(this).css({ \"-webkit-transform\": \"scale(0.8)\" });begin()' ontouchend='window.GameMainClass.playEffectSound(\"icon\");$(this).css({ \"-webkit-transform\": \"scale(1)\" });if (!cancel()) MineKaiCai(" + BackJson.Client[0].index + ");'><div class='btn'><div class='btn1'></div><div class='btn2'>开采</div><div class='btn3'></div></div></div>")
    }
    else {
        if (userJson.uid == MineJson.data.MineList[BackJson.Client[0].index].uid)
            if (BackJson.leftseconds > 0) {
                $("#mess3").append("<div id='MineBtn'class='LvUpBtn'style='display: block;right:200px;bottom:23px;'ontouchmove='$(this).css({ \"-webkit-transform\": \"scale(1)\" });move()' ontouchstart='$(this).css({ \"-webkit-transform\": \"scale(0.8)\" });begin()' ontouchend='window.GameMainClass.playEffectSound(\"icon\");$(this).css({ \"-webkit-transform\": \"scale(1)\" });if (!cancel()) MineFQ(" + BackJson.Client[0].index + ");'><div class='btn'><div class='btn1'></div><div class='btn2'>放弃</div><div class='btn3'></div></div></div>")
            }
            else
                $("#mess3").append("<div id='MineBtn'class='LvUpBtn'style='display: block;right:200px;bottom:23px;'ontouchmove='$(this).css({ \"-webkit-transform\": \"scale(1)\" });move()' ontouchstart='$(this).css({ \"-webkit-transform\": \"scale(0.8)\" });begin()' ontouchend='window.GameMainClass.playEffectSound(\"icon\");$(this).css({ \"-webkit-transform\": \"scale(1)\" });if (!cancel()) MineSH(" + BackJson.Client[0].index + ");'><div class='btn'><div class='btn1'></div><div class='btn2'>收获</div><div class='btn3'></div></div></div>")
        else {
            if (MineJson.data.selfmineid > 0) {
                str.push("<div id='MineFightContext'>抢占他人矿脉,需消耗4点体力.</div>")
                $("#mess3").append("<div id='MineBtn'class='LvUpBtn'style='display: block;right:200px;bottom:23px;'><div class='btn abtn'><div class='btn1'></div><div class='btn2'>抢夺</div><div class='btn3'></div></div></div>")
            }
            else {
                str.push("<div id='MineFightContext'>抢占他人矿脉,需消耗4点体力.</div>")
                $("#mess3").append("<div id='MineBtn'class='LvUpBtn'style='display: block;right:200px;bottom:23px;'ontouchmove='$(this).css({ \"-webkit-transform\": \"scale(1)\" });move()' ontouchstart='$(this).css({ \"-webkit-transform\": \"scale(0.8)\" });begin()' ontouchend='window.GameMainClass.playEffectSound(\"icon\");$(this).css({ \"-webkit-transform\": \"scale(1)\" });if (!cancel()) MineZD(" + BackJson.Client[0].index + ");'><div class='btn'><div class='btn1'></div><div class='btn2'>抢夺</div><div class='btn3'></div></div></div>")
            }
        }
    }
    str.push("</div>");

    $("#tempDialog3").html(str.join(""));

    //关闭
    $("#dialogclose").bind("touchend", function () {
        window.GameMainClass.playEffectSound("close");
        $("#temp").html("");
        $("#tempMask2").remove();
    }).bindAnimate();

    if (BackJson.leftseconds > 0 && MineJson.data.MineList[BackJson.Client[0].index].uid > 1)
        LoadMineTime(BackJson.maxcoin);
}

var CheckPage = function (pageindex) {
    if (pageindex == 0) {
        pageindex = MineJson.page;
    }
    if (pageindex == MineJson.page+1) {
        pageindex = 1;
    }
    window.GameMainClass.playEffectSound("icon");
    window.GameMainClass.sendRequestJson(1141, '{"pageindex":' + pageindex + ',"ulevel":' + userJson.lv + '}', "CheckMinePage");
}

var tempBackJson = {};
//var tempBackJson2 = {};

//矿时间(未知)
var LoadMineTime= function (money) {
    $("body").stopTime("minetime");
    $("body").everyTime("1s", "minetime", function () {
        if (tempBackJson.leftseconds > 0) {
            tempBackJson.leftseconds--;
            $("#minetime").html(expireTime(tempBackJson.leftseconds));
            if ((14400 - tempBackJson.leftseconds) % 600 == 0) {
                $("#nowcoin").html(Math.round((14400 - tempBackJson.leftseconds) / 600 * (money / 24)));
            }
        }
        else {
            $("body").stopTime("minetime");
            $("#minetime").html("00:00:00");
            $("#nowcoin").html(money);
            if (userJson.uid == MineJson.data.MineList[tempBackJson.Client[0].index].uid) {
                $("#MineBtn").find(".btn2").text("收获");
            }
        }
    });
}

//开采
var MineKaiCai= function (index) {
    window.GameMainClass.sendRequestJson(1143, '{"mineid":' + MineJson.data.MineList[index].id + ',"ulevel":' + userJson.lv + ',"nick":"' + userJson.nick + '"}', "MineRefesh");
}

//放弃
var MineFQ= function (index) {
    window.GameMainClass.sendRequestJson(1145, '{"mineid":' + MineJson.data.MineList[index].id + ',"ulevel":' + userJson.lv + ',"nick":"' + userJson.nick + '"}', "MineRefesh");
    if (remainJson.mine == 1)
        changeRemain("mine", -1);
}

//争夺
var MineZD = function (index) {
    window.GameMainClass.sendRequestJson(1142, '{"mineid":' + MineJson.data.MineList[index].id + '}', "MineZDReal");
}

//正真争夺
var MineZDReal = function (json) {
    var tempJson = JSON.parse(json);
    //tempBackJson2 = json;
    if (tempJson.resert == 0) {
        showTextMess(tempJson.info, 2);
    } else {
        window.GameMainClass.startBattle(1142, json, "callMineResult");
    }
}

var callMineResult = function (json) {
    //var tempJson = JSON.parse(json);
    updateUserJson("500",-4);
}

//收获
var MineSH= function (index) {
    window.GameMainClass.sendRequestJson(1144, '{"mineid":' + MineJson.data.MineList[index].id + ',"ulevel":' + userJson.lv + ',"nick":"' + userJson.nick + '"}', "MineRefesh");
    if (remainJson.mine == 1)
        changeRemain("mine", -1);
}

//刷新当前页的矿区数据
var MineRefesh = function (json) {
    var BackJson = JSON.parse(json);
    if (BackJson.resert == 1) {
        if (BackJson.uid == userJson.uid) {
            if (BackJson.coin != null)
                updateUserJson("200", BackJson.coin);
            //if (BackJson.actpoint != null)
            //    updateUserJson("500", 0 - BackJson.actpoint);
        }
        if (document.getElementById("MineBg") != null) {
            if (BackJson.pageindex == MineJson.data.pageindex) {
                $("#temp").html("");
                $("#tempMask2").remove();
                $("body").stopTime("minetime");
                window.GameMainClass.sendRequestJson(1141, '{"pageindex":' + MineJson.data.pageindex + ',"ulevel":' + userJson.lv + '}', "CheckMinePage");
            }
        }
    }

    if (BackJson.uid == userJson.uid)
        showTextMess(BackJson.info, BackJson.resert);
}

//矿提示
var MineFinish = function (json) {
    var tempJson = JSON.parse(json);
    showTextMess(tempJson.info, 1);
    if(remainJson.mine==0)
        changeRemain("mine", 1);
}

//被打
var MineReplace = function (json) {
    var tempJson = JSON.parse(json);
    showTextMess(tempJson.info, 1);
    updateUserJson("200", tempJson.coin);
}

//服务器自动收矿
var MineGetFromServer = function (json) {
    changeRemain("mine", -1);
}

var resetDialog = function () {
    if (pad)
        $("#dialog").css({ "position": "relative", "zoom": padScale * 0.8 });
}