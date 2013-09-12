/// <reference path="public.js" />
/// <reference path="jquery-1.5.1.min.js" />

var underJson //= { "lastdef": 10, "highdef": 25,"inwarlv":1, "forceid": 0, "inspnum": 1, "defleft": 0, "gold": 5, "coin": 5, "resert": 1, "data": [{ "nick": "小明", "n": 10 }, { "nick": "小明", "n": 10 }, { "nick": "小明", "n": 10 }, { "nick": "小明", "n": 10 }, { "nick": "小明", "n": 10 }, { "nick": "小明", "n": 10 }, { "nick": "小明", "n": 10 }, { "nick": "小明", "n": 10 }, { "nick": "小明", "n": 10 }, { "nick": "小明", "n": 10 }] };

var underSelect;

var loadUnder = function () {
    if (underJson == null) {
        window.GameMainClass.sendRequestJson(186, "", "setUnderJson");
    }
    else {
        showUnder();
    }
}

var setUnderJson = function (json) {
    underJson = JSON.parse(json);
    showUnder();
}

var showUnder = function () {

    $("#mask").show();
    $("#dialog").html("<div id='under'><div id='title'><div id='titleLeft'></div><div id='titleCenter'><div id='titleContext'style='background-image:url(res/public/title/41.png)'></div></div><div id='titleRight'></div></div><div id='waikuan'><div id='shangjiao'class='jiao shangjiao'></div><div id='xiajiao'class='jiao xiajiao'></div><div id='zuojiao'class='jiao zuojiao'></div><div id='youjiao'class='jiao youjiao'></div><div class='shangwaibian'></div><div class='xiawaibian'></div><div class='zuowaibian'></div><div class='youwaibian'></div></div><div id='close'></div><div id='rope'></div><div id='underCity'><div id='underSelect'>黄巾势力(1-10级)</div><div id='underSelectBtn'></div><div id='underUpAtk'>攻击提升:<font style='color:#26E50E;'>15%</font></div><div id='underUpHp'>生命提升:<font style='color:#26E50E;'>15%</font></div><div id='underDrug'><div id='underDrugTime'></div></div><div id='underTime'>可防守次数:<font id='underNowTime'style='color:#26E50E;'></font>次</div><div id='underDetail'><font style='color:#F2E234;'>兵临城下说明:</font><br/>每10波为一个势力,每5波获得一个各势力<font style='color:#26E50E;'>辎重</font>,在仓库可开启.可选择已通过的势力为始初对手.<br/><br/>防守波数越多,在战斗结束后可获得的银币越多,每次防守失败后,<font style='color:#26E50E;'>系统自动结算发送到消息里.</font><br/><br/>鼓舞效果每天重置,共可鼓舞<font style='color:#26E50E;'>10</font>次.</div><div id='underUserData'></div><div id='underMyData'></div></div><div id='underBtn'class='bossBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>防守城池</div><div class='btn3'></div></div></div></div>");

    if (!pad)
        $("#under").css("top", (height - 480) / 2);

    //玩家数据
    var tempDiv = $("#underUserData");
    for (var i = 0; i < underJson.data.length; i++) {
        tempDiv.append("<font class='underNick'>" + (i + 1) + "." + underJson.data[i].nick + "</font><font class='underN'>第" + underJson.data[i].n + "波</font><br/>");
    }

    underSelect = 1;

    $("#underMyData").html("<font class='underNick'>" + userJson.nick + "</font><font class='underN' style='right:10px;'>最近 第" + underJson.lastdef + "波</font><br/><font class='underNick'>最高防守数</font><font class='underN'>第" + underJson.highdef + "波</font>")


    $("#underNowTime").text(underJson.defleft);

    $("#underUpHp>font").text(underJson.inspnum > 5 ? 5 + (underJson.inspnum - 5) * 2 + "%" : underJson.inspnum + "%");
    $("#underUpAtk>font").text(underJson.inspnum > 5 ? 5 + (underJson.inspnum - 5) * 2 + "%" : underJson.inspnum + "%");

    if (underJson.inspnum != 0) {
        $("#underDrugTime").show().css("background-position-y", -(underJson.inspnum-1) * 25);
    }

    $("#underDrug").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        DrugClick();
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move()
    })

    $("#close").bind("touchend", function () {
        if (!cancel()) {
            $("#dialog").html("");
            $("#mask").hide();
        }
        $(this).css({ "-webkit-transform": "scale(1)" });
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    }).bind("touchstart", function () {
        begin();
        window.GameMainClass.playEffectSound("close");
        $(this).css({ "-webkit-transform": "scale(0.8)" });
    })

    //选择波数
    $("#underSelectBtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        showUnderSelect();

    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move()
    })

    //开打
    $("#underBtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        if (underJson.defleft == 0) {
            showTextMess("防守次数不足", 2);
            return;
        }
        var tempSend;
        if (underSelect == 1) {
            tempSend = 1;
        }
        else {
            tempSend = underSelect * 10+1;
        }
        //次数
        window.GameMainClass.sendRequestJson(188, '{"isbegin":1,"warlv":' + tempSend + '}', "canUnder");
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move()
    })

    if (underJson.inwarlv > 0 && underJson.inwarlv % 10 == 0) {
        underJson.defleft++;
        $("#underNowTime").text(underJson.defleft);

        var maskDiv = document.createElement("div");
        maskDiv.id = "tempMask";
        $(maskDiv).css({ "width": width, "height": height, "top": "0" });
        document.body.appendChild(maskDiv);

        $("#temp").html("<div id='mess3'><div id='q_title'style='left:70px;'><div id='q_titleLeft'></div><div id='q_titleCenter'><div id='q_titleContext'style='background-image:url(res/public/title/15.png);'></div></div><div id='q_titleRight'></div></div><div id='t_waikuan'><div class='q_jiao q_shangjiao'></div><div class='q_jiao q_xiajiao'></div><div class='q_jiao q_zuojiao'></div><div class='q_jiao q_youjiao'></div><div class='q_shangwaibian'></div><div class='q_xiawaibian'></div><div class='q_zuowaibian'></div><div class='q_youwaibian'></div></div><div id='dialogclose'></div><div id='rope'></div><div id='tempDialog3'><div style='color:white;font-size:20px;text-align:center;top:42px;position:absolute;'>系统检测到您上次防守到第" + underJson.inwarlv + "波异常退出,是否继续打斗</div></div><div id='shopOkBtn'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>继续</div><div class='btn3'></div></div></div><div id='shopCancelBtn'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>取消</div><div class='btn3'></div></div></div></div>");
        $("#mess3").css({ "left": (width - 476) / 2, "top": (height - 280) / 2 });
        if (pad) $("#mess3").css({ "zoom": sp, "left": (width - 476 * sp) / 2 / sp, "top": (height - 279 * sp) / 2 / sp });

        //关闭
        $("#shopCancelBtn,#dialogclose").bind("touchend", function () {
            if (cancel())
                return;
            $("#temp").html("");
            $("#tempMask").remove();
            window.GameMainClass.sendRequestJson(189, "", "underReward");
            underJson.inwarlv = 0;
        }).bind("touchstart", function () {
            begin();
        }).bind("touchmove", function () {
            move();
        })

        //继续开打
        $("#shopOkBtn").bind("touchend", function () {
            if (cancel())
                return;
            if (underJson.defleft == 0) {
                showTextMess("防守次数不足", 1);
                return;
            }
            window.GameMainClass.sendRequestJson(188, '{"isbegin":1,"isgoon":1,"warlv":' + (underJson.inwarlv+1) + '}', "canUnder");
            underJson.inwarlv = 0;
            $("#temp").html("");
            $("#tempMask").remove();
        }).bind("touchstart", function () {
            begin();
        }).bind("touchmove", function () {
            move();
        })

    }
    if (underJson.inwarlv > 0 && underJson.inwarlv % 10 != 0) {
        var maskDiv = document.createElement("div");
        maskDiv.id = "tempMask";
        $(maskDiv).css({ "width": width, "height": height, "top": "0" });
        document.body.appendChild(maskDiv);

        $("#temp").html("<div id='mess3'><div id='q_title'style='left:70px;'><div id='q_titleLeft'></div><div id='q_titleCenter'><div id='q_titleContext'style='background-image:url(res/public/title/15.png);'></div></div><div id='q_titleRight'></div></div><div id='t_waikuan'><div class='q_jiao q_shangjiao'></div><div class='q_jiao q_xiajiao'></div><div class='q_jiao q_zuojiao'></div><div class='q_jiao q_youjiao'></div><div class='q_shangwaibian'></div><div class='q_xiawaibian'></div><div class='q_zuowaibian'></div><div class='q_youwaibian'></div></div><div id='rope'></div><div id='tempDialog3'><div style='color:white;font-size:20px;text-align:center;top:42px;position:absolute;'>服务器发现您上次防守城池出现异常，请点击确定结算上一次的奖励</div></div><div id='shopOkBtn'style='left:200px;'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>确定</div><div class='btn3'></div></div></div></div>");
        $("#mess3").css({ "left": (width - 476) / 2, "top": (height - 280) / 2 });
        if (pad) $("#mess3").css({ "zoom": sp, "left": (width - 476 * sp) / 2 / sp, "top": (height - 279 * sp) / 2 / sp });

        //领奖
        $("#shopOkBtn").bind("touchend", function () {
            if (cancel())
                return;
            window.GameMainClass.sendRequestJson(189, "", "underReward");
            underJson.inwarlv = 0;
            $("#temp").html("");
            $("#tempMask").remove();
        }).bind("touchstart", function () {
            begin();
        }).bind("touchmove", function () {
            move();
        })
    }

}

//是否可以打
var canUnder = function (json) {
    var tempJson = JSON.parse(json);
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
    }
    else {
        underJson.defleft--;
        $("#underNowTime").text(underJson.defleft);
        window.GameMainClass.startBattle(188, json, "underFightBack");
    }
}

//鼓舞
var DrugClick = function () {

    var maskDiv = document.createElement("div");
    maskDiv.id = "tempMask";
    $(maskDiv).css({ "width": width, "height": height, "top": "0", "z-index": 10 });
    $("body").append(maskDiv);


    $("#temp").html("<div id='mess3'><div id='q_title'style='left:70px;'><div id='q_titleLeft'></div><div id='q_titleCenter'><div id='q_titleContext'style='background-image:url(res/public/title/42.png);'></div></div><div id='q_titleRight'></div></div><div id='t_waikuan'><div class='q_jiao q_shangjiao'></div><div class='q_jiao q_xiajiao'></div><div class='q_jiao q_zuojiao'></div><div class='q_jiao q_youjiao'></div><div class='q_shangwaibian'></div><div class='q_xiawaibian'></div><div class='q_zuowaibian'></div><div class='q_youwaibian'></div></div><div id='dialogclose'></div><div id='rope'></div><div id='tempDialog3'><div id='drugTitle'>今日还可鼓舞<font style='color:#26E50E;'>7</font>次军团士气</div><div id='drugBg'><div id='coinDrug'>银币鼓舞几率成功<font id='coinDrugNum'>450000</font></div><div id='goldDrug'>萌币鼓舞必定成功<font id='goldDrugNum'>10</font></div><div id='drugCoinCheck'flag='true'></div><div id='drugGoldCheck'></div></div></div><div id='underCancel'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>取消</div><div class='btn3'></div></div></div><div id='underDrugBtn'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>鼓舞</div><div class='btn3'></div></div></div></div>");
    $("#mess3").css({ "left": (width - 476) / 2, "top": (height - 279) / 2 });
    if (pad) $("#mess3").css({ "zoom": sp, "left": (width - 476 * sp) / 2 / sp, "top": (height - 279 * sp) / 2 / sp });

    $("#coinDrugNum").text(underJson.coin);
    $("#goldDrugNum").text(underJson.gold);

    $("#drugTitle>font").text(10 - underJson.inspnum);

    $("#drugCoinCheck,#drugGoldCheck").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        if ($(this).attr("flag"))
            return;
        $("#drugCoinCheck").removeAttr("flag").css("background-position-x", "0");
        $("#drugGoldCheck").removeAttr("flag").css("background-position-x", "0");
        $(this).css("background-position-x", "-37px").attr("flag", "true");
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move()
    })

    //取消
    $("#underCancel,#dialogclose").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        $("#temp").html("");
        $("#tempMask").remove();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    }).bind("touchstart", function () {
        begin();
        window.GameMainClass.playEffectSound("close");
        $(this).css({ "-webkit-transform": "scale(0.8)" });
    })

    if (underJson.inspnum == 10) {
        $("#underDrugBtn").children().attr("class", "abtn");
    }

    $("#underDrugBtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        var tempFlag;
        if ($("#drugCoinCheck").attr("flag")) {
            tempFlag = 200;
        }
        else {
            tempFlag = 600;
        }
        window.GameMainClass.sendRequestJson(187, '{"usualid":'+tempFlag+'}', "drugBack");
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move()
    })
    

    
    
}

//鼓舞是否成功
var drugBack = function (json) {
    var tempJson = JSON.parse(json);
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info,2);
    }
    else {
        showTextMess(tempJson.info, 1);

        updateUserJson(tempJson.Client[0].usualid, 0 - tempJson.num);

        if (tempJson.isInspOK) {
            underJson.inspnum++;

            underJson.gold = tempJson.gold;
            underJson.coin = tempJson.coin;
            $("#coinDrugNum").text(underJson.coin);
            $("#goldDrugNum").text(underJson.gold);

            $("#drugTitle>font").text(10 - underJson.inspnum);

            $("#underDrugTime").show().css("background-position-y", -(underJson.inspnum - 1) * 25);
            $("#underUpHp>font").text(underJson.inspnum > 5 ? 5 + (underJson.inspnum - 5) * 2 + "%" : underJson.inspnum + "%");
            $("#underUpAtk>font").text(underJson.inspnum > 5 ? 5 + (underJson.inspnum - 5) * 2 + "%" : underJson.inspnum + "%");

            if (underJson.inspnum == 10) {
                $("#underDrugBtn").children().attr("class", "abtn");
            }
        }        

    }
}

var showUnderSelect = function () {
    var maskDiv = document.createElement("div");
    maskDiv.id = "tempMask";
    $(maskDiv).css({ "width": width, "height": height, "top": "0", "z-index": 10 });
    $("body").append(maskDiv);


    $("#temp").html("<div id='underSelectBg'><table id='selectTable'></table><div id='underSelectClose'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>关闭</div><div class='btn3'></div></div></div></div>");

    var str = [];
    for (var i = 0; i < 5; i++) {
        str.push("<tr><td style='width:200px;'><div class='underSelectCheck' id='underCheck" + (i * 2) + "'></div></td><td><div class='underSelectCheck' id='underCheck" + (i * 2+1) + "'></div></td></tr>")
    }
    str.push("<tr><td><div class='underSelectCheck' id='underCheck10'></div></td></tr>")

    $("#selectTable").append(str);

    var lockIndex = Math.ceil(underJson.highdef / 10);


    for (var i = 11; i >= lockIndex; i--) {

        $("#underCheck" + i).attr("class", "underLock");
    }

    //默认选中
    $("#underCheck" + underSelect).css("background-position-x", -37);

    //绑定事件
    for (var i = 0; i < lockIndex; i++) {
        $("#underCheck" + i).bind("touchend", function () {
            if (cancel())
                return;
            underSelect = Number($(this).attr("id").replace("underCheck", ""));
            $("#underSelect").text(localUnderContent.data[underSelect].name);

            



            $("#tempMask").remove();
            $("#temp").html("");
        }).bind("touchstart", function () {
            $(this).css({ "-webkit-transform": "scale(0.8)" });
            begin();
        }).bind("touchmove", function () {
            $(this).css({ "-webkit-transform": "scale(1)" });
            move()
        })
    }


    $("#underSelectBg").css({ "left": (width - 430) / 2, "top": (height - 285) / 2 });

    $("#drugTitle>font").text(10 - underJson.inspnum);

    $("#underSelectClose").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("close");
        $("#tempMask").remove();
        $("#temp").html("");
    }).bindAnimate();

}

//战斗结果
var underFightBack = function (json) {

    window.GameMainClass.sendRequestJson(189, "", "underReward");

}

var underReward = function (json) {
    var tempJson = JSON.parse(json);
    //var tempJson = { "info": "获得银币2000 辎重2个", "resert": 1, "ucoin": 490013, "canRefTop": 是否刷新列表, "highdef": 最高波数, "lastdef": 上次波数 };

    showTextMess(tempJson.info,1);

    underJson.lastdef = tempJson.lastdef;
    underJson.highdef = tempJson.highdef;

    $("#underMyData").html("<font class='underNick'>" + userJson.nick + "</font><font class='underN' style='right:10px;'>最近 第" + underJson.lastdef + "波</font><br/><font class='underNick'>最高防守数</font><font class='underN'>第" + underJson.highdef + "波</font>")

    userJson.coin = tempJson.ucoin;

    if (tempJson.canRefTop) {
        //刷新列表
        window.GameMainClass.sendRequestJson(190, "", "refreshUnderList");
    }
}

//刷新对手列表
var refreshUnderList = function (json) {
    var tempJson = JSON.parse(json);

    underJson.data = tempJson.data;


    var tempDiv = $("#underUserData");
    tempDiv.html("");
    for (var i = 0; i < underJson.data.length; i++) {
        tempDiv.append("<font class='underNick'>" + (i + 1) + "." + underJson.data[i].nick + "</font><font class='underN'>第" + underJson.data[i].n + "波</font><br/>")
    }
}

//整军出来
var ControlArmy = function (times) {
    
}