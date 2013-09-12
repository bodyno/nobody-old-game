/// <reference path="public.js" />
/// <reference path="json.js" />
/// <reference path="jquery-1.5.1.min.js" />

var BossOfWoldJson =
{
    "data": { "CompleteState": "0", "HpDiscount": 0, "RankList": [{ "discount": 0.850, "name": "欧欧叉叉" }, { "discount": 0.060, "name": "夺命书生" }], "SelfDis": "0.06", "SelfZK": "11万", "bossLv": 30, "giftinfo": "1.红宝石箱x3<br>2.红宝石箱x2<br>3.红宝石箱x2<br>4.紫宝石箱x5<br>5.紫宝石箱x4<br>6.紫宝石箱x3<br>7.紫宝石箱x2<br>8.紫宝石箱x2", "isLit": 1, "isResert": 1, "lastkillnick": "大咪咪", "leftkilltime": 1696 }
};

var coolingtime = 0;
var iscooling = false;
var boostimeend = false;

var setBossJson = function (json) {
    BossOfWoldJson.data = JSON.parse(json);
    LoadBossOfWorld();
}

var LoadBoss = function () {
    window.GameMainClass.sendRequestJson(1127, "", "setBossJson");
    //LoadBossOfWorld();
}

//加载世界boss界面
var LoadBossOfWorld = function () {

    $("#dialog").html("<div id='boss'><div id='title'><div id='titleLeft'></div><div id='titleCenter'><div id='titleContext'></div></div><div id='titleRight'></div></div><div id='waikuan'><div id='shangjiao'class='jiao shangjiao'></div><div id='xiajiao'class='jiao xiajiao'></div><div id='zuojiao'class='jiao zuojiao'></div><div id='youjiao'class='jiao youjiao'></div><div class='shangwaibian'></div><div class='xiawaibian'></div><div class='zuowaibian'></div><div class='youwaibian'></div></div><div id='close'></div><div id='rope'></div><div id='teamChange'></div><div id='KillButton' style='width:92px;' class='bossBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>挑战</div><div class='btn3'></div></div></div></div>");
    $("#boss").css({ "top": (height - 480) / 2 });
    if (pad)
        $("#boss").css({ "top": ((height - 470 * sp) / 2) / sp });

    setTitle(25);
    $("#titleCenter").css("width", "142px").children("#titleContext").css("width", "142px");
    

    $("#mask").show();

    $("#BossOfWorldDia").remove();
    var str = new Array();
    //击杀排名
    var top = 40;
    str.push("<div style='position:absolute;z-index:1;width:202px;height:324px;background:url(res/boss/left.png) no-repeat;top:5px;left:12px;'></div>");
    str.push("<div style='position:absolute;z-index:1;width:202px;height:324px;background:url(res/boss/right.png) no-repeat;top:5px;right:12px;'></div>");
    str.push("<div id='RankList'>");
    for (var i = 0; i < BossOfWoldJson.data.RankList.length; i++) {
        str.push("<div class='DefaultFont RedFont' style='color:orange;top:" + top + "px;left:20px;font-size:15px;'>" + (i + 1) + "." + BossOfWoldJson.data.RankList[i].name + "</div>");
        str.push("<div class='DefaultFont RedFont' style='color:#4DD147;top:" + top + "px;left:152px;font-size:15px;'>" + BossOfWoldJson.data.RankList[i].discount + "%</div>");
        top += 21;
    }
    str.push("</div>");
    //我的战况
    str.push("<div class='DefaultFont RedFont' style='color:#FC9C12;top:285px;left:23px;font-size:15px;'>"+userJson.nick+"</div>");
    str.push("<div class='DefaultFont RedFont' style='color:#4DD147;top:285px;left:152px;font-size:15px;'>第" + BossOfWoldJson.data.SelfZK + "名</div>");
    str.push("<div class='DefaultFont RedFont' style='color:#FC9C12;top:307px;left:23px;font-size:15px;'>击杀总血量</div>");
    str.push("<div class='DefaultFont RedFont' style='color:#4DD147;top:307px;left:152px;font-size:15px;'>" + BossOfWoldJson.data.SelfDis + "%</div>");

    str.push("<div id='Experience' style='background:url(res/boss/hp.png) no-repeat;height:16px;width:" + BossOfWoldJson.data.HpDiscount / 100 * 192 + "px;top:17px;left:262px;'></div>");
    str.push("<div id='HpNum' class='DefaultFont_14' style='width:192px;height:16px;top:16px;left:262px;font-size:14px;color:white;text-align:center;line-height:16px;'>" + BossOfWoldJson.data.HpDiscount + "%</div>");
    if (BossOfWoldJson.data.HpDiscount > 0)
        str.push("<div class='ButtonBig' style='width:241px;height:312px;background:url(res/boss/boss.png) no-repeat;left:237px;top:10px;'></div>");
    else {
        str.push("<div class='ButtonBig' style='width:241px;height:312px;background:url(res/boss/boss2.png) no-repeat;left:237px;top:10px;'><div id='bossKillText'><font style='color:yellow;'>" + BossOfWoldJson.data.lastkillnick + "</font> 击杀</div></div>");
    }
    
    if (BossOfWoldJson.data.isLit == 0){
        str.push("<div class='DefaultFont_14 RedFont' id='CoolingTime' style='font-size:18px;color:white;height:21px;width:208px;color:orange;text-shadow: -1px -1px 0 #000,1px -1px #000,1px 1px #000,-1px 1px #000;top:295px;left:251px;text-align:center;line-height:21px;'>");
        str.push("世界BOSS还没开打</div>");
    }
    else {
        if (coolingtime < 1) {
            str.push("<div class='DefaultFont_14 RedFont' id='CoolingTime' style='font-size:18px;color:white;height:21px;width:208px;color:orange;text-shadow: -1px -1px 0 #000,1px -1px #000,1px 1px #000,-1px 1px #000;top:295px;left:251px;text-align:center;line-height:21px;'>");
            str.push("可以挑战</div>");
        }
        else {
            str.push("<div class='DefaultFont_14 RedFont' id='CoolingTime' style='font-size:18px;color:white;height:21px;width:208px;color:orange;text-shadow: -1px -1px 0 #000,1px -1px #000,1px 1px #000,-1px 1px #000;top:295px;left:251px;text-align:center;line-height:21px;'>可以挑战</div>");
        }
        str.push("<div class='DefaultFont_14 RedFont' style='text-shadow: -1px -1px 0 #000,1px -1px #000,1px 1px #000,-1px 1px #000;font-size:17px;font-weight:bold;color:orange;left:280px;top:43px;font-weight:200;'>挑战倒计时:<font id='bossendtime'>" + expireTime(BossOfWoldJson.data.leftkilltime) + "</font></div>");
    }

    str.push("<div id='bossSomething'>世界BOSS的奖励分三种:<br/><font style='color:#26E50E;'>萌币</font>(击杀掉BOSS)<br/><font style='color:#26E50E;'>万能将魂、银币</font><br/><font style='color:#F2E234;'>最后一击有额外萌币奖励</font><br/><br/>奖励发放说明：世界BOSS结束后，按照玩家对<font style='color:#26E50E;'>九子鬼母</font>的总伤害进行排名。</div>");

    switch (BossOfWoldJson.data.CompleteState) {
        case 0:
            str.push("<div id='bossBtn2' style='background-position:-60px;'></div>");
            //不可领
            break;
        case 1:
            str.push("<div id='bossBtn2' ></div>");
            //可领取
            break;
        case 2:
            str.push("<div id='bossBtn2' style='background-position:-60px;'><div id='arenaRewardOk'></div></div>");
            //已领取
            break;
    }

    str.push("<div id='bossBtn1'></div>");
    
    var divnode = document.createElement("div");
    divnode.id = 'BossOfWorldDia';
    divnode.innerHTML = str.join("");
    $("#teamChange").append(divnode);

    
    if (coolingtime > 0 && iscooling == false)
        CoolingtimeOfBoss();
    if (BossOfWoldJson.data.isLit)
        BossTime();

    $("#bossBtn1").bind("touchend", function () {
        $(this).css("-webkit-transform", "scale(1)");
        if (cancel())
            return;
        bossRewardDialog();
    }).bindAnimate();

    $("#bossBtn2").bind("touchend", function () {
        if (BossOfWoldJson.data.CompleteState == 1) {
            window.GameMainClass.sendRequestJson(1129, "", "showBossRewardBack");
        }
    })

    
    //绑定关闭事件
    $("#close").bind("touchend", function () {
        if (!cancel()) {
            bossClose();
        }
        $(this).css({ "-webkit-transform": "scale(1)" });
    }).bind("touchmove", function () {
        move();
    }).bind("touchstart", function () {
        begin();
        window.GameMainClass.playEffectSound("close");
        $(this).css({ "-webkit-transform": "scale(0.8)" });
    })

    if (BossOfWoldJson.data.isLit==0) {
        $("#KillButton").children().attr("class", "abtn");
    }

    $("#KillButton").bind("touchend", function () {
        if (BossOfWoldJson.data.isLit == 0) {
            showTextMess("世界BOSS还没开打", 2);
            return;
        }
        if (iscooling) {
            showTextMess("世界BOSS冷却中", 2);
            return;
        }
        window.GameMainClass.sendRequestJson(1128, "", "canBOSSFight");
    })
}

var canBOSSFight = function (json) {
    var tempJson = JSON.parse(json);
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info);
    }
    else {
        window.GameMainClass.startBattle(1128, json, "bossFightResert");
    }
}

var bossClose = function () {
    $("#dialog").html("");
    $("#mask").hide();
    window.GameMainClass.sendRequestJson(1156, "", "");
}

//boss剩余时间
var BossTime = function () {
    if (boostimeend)
        return;
    boostimeend = true;
    $("body").everyTime("1s", "bossendtime", function () {
        if (BossOfWoldJson.data.leftkilltime > 0) {
            BossOfWoldJson.data.leftkilltime--;
            
            $("#bossendtime").html(expireTime(BossOfWoldJson.data.leftkilltime));
        }
        else {
            $("body").stopTime("bossendtime");
            $("#bossendtime").html("");
            boostimeend = false;
        }
    });
}

//生成数字对应的图片格式(带"LV")
var getLvNum = function (val, top, left) {
    var str = new Array();
    var temp = String(val);
    if (left)
        left += 17;
    else
        left = 17;
    //截取字符串
    for (var i = 0; i < temp.length; i++) {
        str.push("<div class='HeroLVSmall' style='background-position:-" + (Number(temp[i]) * 9) + "px 0px;");
        if (top != null)
            str.push("top:" + top + "px;");
        str.push("left:" + left + "px;'></div>");
        left += 8;
    }
    return str.join("");
}

//世界boss战斗回调
var BossOfWorldResert = function () {
    if (BossOfWoldJson.data.isLit == true) {
        coolingtime = 30;
        CoolingtimeOfBoss();
    }
    $("#KillButton").children().attr("class", "abtn");
    $("#KillButton").attr("ontouchend", "");
};

//世界boss冷却时间
var CoolingtimeOfBoss = function () {
    if (iscooling == true)
        return;
    iscooling = true;
    //调用世界boss jquery-every-time控件
    $("body").everyTime("1s", "coolingtime", function () {
        if (coolingtime > 0) {
            coolingtime--;
            $("#CoolingTime").html("冷却时间:"+expireTime(coolingtime));
        }
        else {
            $("body").stopTime("coolingtime");
            $("#CoolingTime").html("可以挑战");
            iscooling = false;
            $("#KillButton").children().attr("class", "btn");
            //document.getElementById("KillButton").ontouchend = function () { if (Math.abs(lastPosX - beforePosX) < 5) window.GameMainClass.startWorldBoss(); }
        }
    });
}

//世界boss数据更新
var SetBossOfWorldData = function (json) {
    if (BossOfWoldJson.data.isResert == 1) {
        BossOfWoldJson.data = JSON.parse(json);
        if (document.getElementById("BossOfWorldDia") != null) {
            LoadBossOfWorld();
        }
    }
};

//世界boss数据更新(所有)
var SetBossOfWorldDataAll = function (json) {
    if (BossOfWoldJson.data.isResert == 1) {
        var BackJson = JSON.parse(json);
        BossOfWoldJson.data.HpDiscount = BackJson.HpDiscount;
        BossOfWoldJson.data.RankList = BackJson.RankList;
        if (document.getElementById("BossOfWorldDia") != null) {
            var str = new Array();
            var top = 40;
            for (var i = 0; i < BossOfWoldJson.data.RankList.length; i++) {
                str.push("<div class='DefaultFont RedFont' style='color:#E9A041;top:" + top + "px;left:20px;font-size:15px;'>" + (i + 1) + "." + BossOfWoldJson.data.RankList[i].name + "</div>");
                str.push("<div class='DefaultFont RedFont' style='color:#4DD147;top:" + top + "px;left:152px;font-size:15px;'>" + BossOfWoldJson.data.RankList[i].discount + "%</div>");
                top += 21;
            }

            $("#RankList").html(str.join(""));
            $("#Experience").css({ "width": (BossOfWoldJson.data.HpDiscount / 100 * 192) + "px" });
            $("#HpNum").html(BossOfWoldJson.data.HpDiscount + "%");
        }
    }
};

//世界boss活动点亮
var litActivity = function (json) {
    if (BossOfWoldJson.data.isResert == 1) {
        BossOfWoldJson.data.isLit = true;
        BossOfWoldJson.data.CompleteState = 0;
        BossOfWoldJson.data.HpDiscount = 100;
        BossOfWoldJson.data.SelfDis = 0;
        BossOfWoldJson.data.SelfZK = "0";
        BossOfWoldJson.data.RankList = [];
        BossOfWoldJson.data.lastkillnick = "";
        BossOfWoldJson.data.leftkilltime = 1800;
    }
    var backjson = JSON.parse(json);
    showTextMess(backjson.info, 1);

    //活动本点亮
    if (activityJson != null) {
        for (var i = 0; i < activityJson.data.length; i++) {
            if (activityJson.data[i].eid == 1) {
                activityJson.data[i].isopen = 1;
            }
        }
    }

    BossOfWoldJson.data.CompleteState = 2;
    if (document.getElementById("BossOfWorldDia") != null) {
        LoadBossOfWorld();
    }
};

var bossFightResert = function (json) {
    if (BossOfWoldJson.data.isLit) {
        if (userJson.vip > 8) {

        } else {
            coolingtime = 30;
            iscooling = false;
            $("#CoolingTime").text("冷却时间:" + expireTime(coolingtime));
            $("#KillButton").children().attr("class", "abtn");
            CoolingtimeOfBoss();
        }
    }
    
}

var bossRewardDialog = function () {
    var maskDiv = document.createElement("div");
    maskDiv.id = "tempMask";
    $(maskDiv).css({ "width": width, "height": height, "top": "0" });
    document.body.appendChild(maskDiv);

    var div = document.createElement("div");
    div.id = "rankDialog";
    div.innerHTML = "<div id='rankTitle'style='background-image:url(res/arena/title1.png);'></div><div id='rankClose'></div><div id='rankSlide'></div><div id='b_rankList1' style='font-size:16px;'><font style='color:red;'>排名</font></div><div id='b_rankList2' style='font-size:16px;text-align:left;'><font style='color:red;'>世界boss奖励(boss击杀后获得萌币)</font></div>";

    document.body.appendChild(div);
    $(div).css({ "left": (width - 580) / 2, "top": (height - 460) / 2 });

    if (pad) $(div).css({ "zoom": sp, "left": (width - 580 * sp) / 2 / sp, "top": (height - 460 * sp) / 2 / sp });


    for (var i = 0; i < localBossReward.data.length; i++) {
        $("#b_rankList1").append("<br/>" + localBossReward.data[i].rank);
        $("#b_rankList2").append("<br/>" + localBossReward.data[i].reward);
    }

    //绑定关闭事件
    $("#rankClose").bind("touchend", function () {
        if (!cancel()) {
            $("#rankDialog").remove();
            $("#tempMask").remove();
        }
        $(this).css({ "-webkit-transform": "scale(1)" });
    }).bind("touchmove", function () {
        move();
        $(this).css({ "-webkit-transform": "scale(1)" });
    }).bind("touchstart", function () {
        begin();
        window.GameMainClass.playEffectSound("close");
        $(this).css({ "-webkit-transform": "scale(0.8)" });
    })
}

var showBossRewardBack = function (json) {
    var tempJson = JSON.parse(json);
    //var tempJson = { "Client": [{ "warid": 1001, "warlv": 3, "uid": 10154969 }], "data": [[], { "id": 800, "num": 3, "str": "", "type": 1 }, { "id": 200, "num": 150000, "str": "", "type": 1 }], "info": "万能将魂+3 银币+150000", "resert": 1 };
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
    }
    else {

        iGetReward(tempJson);
        showGetItemAnimate2(tempJson);

        BossOfWoldJson.data.CompleteState = 2;

        $("#bossBtn2").css("background-position", "-60px").append("<div id='arenaRewardOk'></div>");


    }
}

//世界boss结束
var endActivity = function (json) {
    var tempJson = JSON.parse(json);
    showTextMess(tempJson.info,1);
    if (activityJson != null) {
        for (var i = 0; i < activityJson.data.length; i++) {
            if (activityJson.data[i].eid == 1) {
                activityJson.data[i].isopen = 0;
            }
        }
    }
    BossOfWoldJson.data.isLit = 0;
    BossOfWoldJson.data.CompleteState = 1;
    BossOfWoldJson.data.leftkilltime = 0;
    if(tempJson.nick)
        BossOfWoldJson.data.lastkillnick = tempJson.nick;
    boostimeend = true;
    $("body").stopTime("coolingtime");
    coolingtime = 0;
    iscooling = false;
    if (document.getElementById("BossOfWorldDia") != null) {
        LoadBossOfWorld();
        //$("#KillButton").children().attr("class", "abtn");
        //$("#bossBtn2").css("background-position-x", "0").html("");
        //$("#CoolingTime").text("世界BOSS还没开打");
    }
}
