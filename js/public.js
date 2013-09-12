/// <reference path="hero.js" />
/// <reference path="jquery-1.5.1.min.js" />
//记录触摸开始的位置
var beforePosX = 0;

//记录触摸结束的位置
var lastPosX = 0;

//滚动消息
var messArry = []; 
var showtime = 0;

var isIn = false;
var popTime;
var top;
var popId = 0;

//pad
var pad = false;

var popTime2;

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
    if (pad) {
        if (Math.abs(lastPosX - beforePosX) > 20) {
            return true;
        } else {
            return false;
        }
    } else {
        if (Math.abs(lastPosX - beforePosX) > 5) {
            return true;
        } else {
            return false;
        }
    }
}

//音效
var music = function (type) {
    switch (type) {
            //icon声音
        case 1:
            sound = "<audio src='res/music/icon.mp3' autoplay></audio>"
            break;
            //关闭声音
        case 2:
            sound = "<audio src='res/music/close.mp3' autoplay></audio>"
            break;
            //列表项声音
        case 3:
            sound = "<audio src='res/music/slide.mp3' autoplay></audio>"
            break;
            //按钮声
        case 4:
            sound = "<audio src='res/music/button.mp3' autoplay></audio>"
            break;
            //强化声音
        case 5:
            sound = "<audio src='res/music/lvup.mp3' autoplay></audio>"
            break;
            //菜单声音
        case 6:
            sound = "<audio src='res/music/menu.mp3' autoplay></audio>"
            break;
    }
    audio.innerHTML = "";
    audio.innerHTML = sound;
}

//获取职业
var getType = function (type) {
    switch (type) {
        case 1:
            return "战士";
            break;
        case 2:
            return "法师";
            break;
        case 3:
            return "道士";
            break;
    }
}

//弹出提示窗口
var showDialog = function (context) {
    $("#warnDialog").remove();
    $("#dialogMask").remove();
    var data = "<div id='DialogOpen'><div class='jiao shangjiao'></div><div class='jiao xiajiao'></div><div class='jiao zuojiao'></div><div class='jiao youjiao'></div><div id='bagbian1'class='shangwaibian'></div><div id='bagbian2'class='xiawaibian'></div><div id='bagbian3'class='zuowaibian'></div><div id='bagbian4'class='youwaibian'></div></div><div id='showDialogClose'></div><div id='mainDialog'></div><div id='dialogButton'>" + context + "</div>";
    var div = document.createElement("div");
    $(div).css({"left":(width-430)/2,"top":(height-310)/2})
    div.id="warnDialog";
    div.innerHTML = data;
    document.body.appendChild(div);

    var div2 = document.createElement("div");
    div2.id = "dialogMask";
    div2.innerHTML = "<div id='dialogMaskSmall'></div>";
    document.body.appendChild(div2);
    //遮照样式
    $(div2).children("#dialogMaskSmall").css({ "width": width, "height": height });

    //绑定关闭事件
    $("#showDialogClose").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        $(this).parent().remove();
        $("#dialogMask").remove();
        window.GameMainClass.playEffectSound("close");
    }).bindAnimate();

    //绑定确定按钮
    $("#dialogButton").bind("touchstart", function () {
        window.GameMainClass.playEffectSound("button");
        $(this).css({ "-webkit-transform": "scale(0.8)" });
    }).bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
    })
}

//获取颜色
var getColor = function (type) {
    switch (String(type)) {
        case "1":
            return "#FFFFFF";
            break;
        case "2":
            return "#00FF00";
            break;
        case "3":
            return "#00CCFF";
            break;
        case "4":
            return "#FF00FF";
            break;
        case "5":
            return "#FF0000";
            break;
        case "6":
            return "#FFFF00";
            break;
    }
}

//获取职业图标
var getJobSamll = function (type,gclass) {
    return -(Number(type) - 1) * 30 + "px " + (-(Number(gclass) - 1) * 28) + "px";
}

//获取官职图标
var getPosSamll = function (type) {
    return -(Number(type) - 1) * 36;
}

//根据gid获取武将信息
var getHeroDetailByGid = function (gid) {
    for (var i = 0; i < heroJson.data.length; i++) {
        if (heroJson.data[i].g.split(",")[0] == gid) {
            return heroJson.data[i].g;
        }
    }
}

//根据gsid获取武将信息
var getHeroDetailByGsid = function (gsid) {
    for (var i = 0; i < heroJson.data.length; i++) {
        if (heroJson.data[i].g.split(",")[10] == gsid) {
            return heroJson.data[i].g;
        }
    }
}

//根据gsid获取本地武将信息
var getLocalHeroDetail = function (gid) {
    var temp=localHeroJson.data.length;
    for (var i = 0; i < temp; i++) {
        if (localHeroJson.data[i].gid == gid) {
            return localHeroJson.data[i];
        }
    }
}

//判断英雄是否在队形上
var isHeroInTeam = function (gsid) {
    for (var i = 0; i < 5; i++) {
        if (teamJson.data[i].g == gsid) {
            return true;
        }
    }
    return false;
}

//根据gid判断现有的武将数目
var getHeroNumByGid = function (gid) {
    var tempFlag = 0;
    for (var i = 0; i < heroJson.data.length; i++) {
        if (heroJson.data[i].g.split(",")[0] == gid) {
            tempFlag++;
        }
    }
    return tempFlag;
}

//根据gid判断是否存在该武将
var IsHeroInByGid = function (gid) {
    var tempFlag = false;
    for (var i = 0; i < heroJson.data.length; i++) {
        if (heroJson.data[i].g.split(",") == gid) {
            tempFlag = true;
            break;
        }
    }
    return tempFlag;
}

//判断是否为将军
var IsSuperHero = function (type) {
    if ((type >= 4 && type <= 7) || (type >= 9 && type <= 12) || type == 102 || (type >= 112 && type <= 117) || (type >= 122 && type <=125 ))
        return true;
    return false;
}

//设置用户json
var setUserJson = function (json) {
    userJson = JSON.parse(json);

    var div = $("#userData");
    var StrengWidth = parseInt((userJson.strength / userJson.smax) * 122) > userJson.smax ? 122 : parseInt((userJson.strength / userJson.smax) * 122);
    div.children("#u_strength").css("width", StrengWidth).children("#u_strength_content").text(userJson.strength + "/" + userJson.smax + "");

    //银币 大于1万 万显示
    if (userJson.coin >= 1000000)
        div.children("#u_coin").text(parseInt(userJson.coin/10000)+"万");
    else
        div.children("#u_coin").text(userJson.coin);
    var tempExpWidth = (userJson.exp / lvUpJson.data[userJson.lv - 1].exp) * 96;
    div.children("#u_exp").css("width", parseInt(tempExpWidth)).children("#u_exp_content").text(parseInt(userJson.exp / lvUpJson.data[userJson.lv - 1].exp * 100) + "%");;

    div.children("#u_gold").text(userJson.gold);
    div.children("#u_nick").text(userJson.nick);
    div.children("#u_lv").html(getCityLv(userJson.lv));
    div.children("#u_viplv").css("background-position-y", -15 * userJson.vip);

    vipTime = setInterval(function () {
        if (userJson.stime != 0) {
            userJson.stime--;
            $("#vip_time>font").text(expireTime(userJson.stime));
        }

        if (userJson.stime == 0) {
            if (userJson.strength < userJson.smax) {
                userJson.strength++;
                var StrengWidth = parseInt((userJson.strength / userJson.smax) * 122) > 122 ? userJson.smax : parseInt((userJson.strength / userJson.smax) * 122);
                $("#u_strength").css("width", StrengWidth).children("#u_strength_content").text(userJson.strength + "/" + userJson.smax + "");
                $("#vip_strength>font").html(userJson.strength + "/" + userJson.smax);
                userJson.stime = 300;
            }
        }

    }, 1000)

    div.bind("touchend", function () {
        window.GameMainClass.playEffectSound("icon");
        loadVip();
    })

    div.children("#u_addClick").bind("touchend", function () {
        event.stopPropagation();
        window.GameMainClass.playEffectSound("icon");
        shopBugStrength();
    })
    div.children("#u_position").css("background-position-x", -(userJson.position - 1) * 36);

    window.GameMainClass.setBattleSpeed(userJson.vip,userJson.lv);
}

//倒计时 时分秒
var expireTime = function (expires) {
    if (expires >= 0) {
        var second = expires;
    } else {
        var second = "0";
        return second;
    }
    
    var h = Math.floor(second / 3600);
    var m = Math.floor((second % 3600) / (60));
    var s = Math.floor(second % 60);
    if ((h + "").length == 1)
        h = "0" + h;
    if ((m + "").length == 1)
        m = "0" + m;
    if ((s + "").length == 1)
        s = "0" + s;
    return h + ":" + m + ":" + s;
}

//改变用户数据(金钱,经验,萌币)
function updateGold(type, val) {
    if (type == 200) {
        if (val <= userJson.coin) {
            userJson.coin -= val;
            $("#u_coin").text("银币" + userJson.coin);
        }
    }
    else if (type == 600) {
        if (val <= userJson.gold) {
            userJson.gold -= val;
            $("#u_gold").text("萌币" + userJson.gold);
        }
    }
    else if (type == 500) {
        if (val <= userJson.strength) {
            userJson.strength -= val;
            var StrengWidth = parseInt((userJson.strength / userJson.smax) * 122) > userJson.smax ? 122 : parseInt((userJson.strength / userJson.smax) * 122);
            div.children("#u_strength").css("width", StrengWidth).children("#u_strength_content").text(userJson.strength + "/" + userJson.smax + "");
        }
    }
    else if (type == 4) {
        if (val <= UserJson.MilitaryMerit) {
            UserJson.MilitaryMerit -= val;
            $("#jungong").html(UserJson.MilitaryMerit);
        }
    }
    else {
        UserJson.UExp -= val;
        $("#UserExp").html(UserJson.UExp + "/" + UserJson.EUExp);
        $("#UserLVBG").css({ 'width': (UserJson.UExp / UserJson.EUExp * 91) });
    }
}


/*文字提示(两种颜色type=1表示绿色 其它红色) 并且慢慢向上移动(25帧)*/
var showTextMess = function (mess, type,flag) {

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

    table.innerHTML = "<tr><td class='popDivLeft'></td><td class='popDivCenter' style='color:" + (type==1 ? "#00FF00" : "red") + ";'>" + mess + "</td><td class='popDivRight'></td></tr>";

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

//升级弹出窗口
var showLvUpDialog = function () {
    
    var maskDiv = document.createElement("div");
    maskDiv.id = "tempMask";
    $(maskDiv).css({ "width": width, "height": height, "top": "0" });
    document.body.appendChild(maskDiv);


    var divnode = document.createElement("div");
    divnode.id = "lv_Main";
    $(divnode).html("<div id='lv_contain'><div id='lv_reward_key'></div><div id='lv_reward_value'></div></div><div id='lv_btn'></div>");
    $(divnode).css({ "left": (width - 600) / 2, "top": (height - 350) / 2 });


    var detail = lvUpJson.data[userJson.lv - 1]

    var strKey = "武携带数:<br/>包裹上限:<br/>领导力:<br/>好友上限:<br/>增加体力:<br/>";
    var strValue = new Array();
    strValue.push(detail.gnum + "<br/>");
    strValue.push(detail.pnum + "<br/>");
    strValue.push(detail.leader + "<br/>");
    strValue.push(detail.fnum + "<br/>");
    strValue.push(detail.snum + "<br/>");

    $(divnode).find("#lv_reward_key").html(strKey);
    $(divnode).find("#lv_reward_value").html(strValue.join(""));

    //改变json
    userJson.gnum += detail.gnum;
    userJson.pnum += detail.pnum;
    userJson.leader += detail.leader;
    userJson.fnum += detail.fnum;
    userJson.strength += detail.snum;
    userJson.lv++;
    userJson.exp -= detail.exp;

    //暂时只显示了几个

    $("#u_strength").text("行动力" + userJson.strength);
    $("#u_exp").text("经验" + userJson.exp);
    $("#u_lv").html(getCityLv(userJson.lv));
    //经验


    document.body.appendChild(divnode);

    //领取按钮
    $("#lv_btn").bind("touchend", function () {
        window.GameMainClass.playEffectSound("icon");
        //关闭窗口
        $("#lv_Main").remove();
        $("#tempMask").remove();

    })

}

//改变用户数据(100-经验,200-银币,500体力,600萌币,700友情,800万能武魂)
var updateUserJson = function (type, value) {
    type = parseInt(type);
    switch (type) {
        //经验
        case 100:
            userJson.exp += Number(value);
            var tempExpWidth = (userJson.exp / lvUpJson.data[userJson.lv - 1].exp) * 96;
            $("#u_exp").css("width", parseInt(tempExpWidth)).children("#u_exp_content").text(parseInt(userJson.exp / lvUpJson.data[userJson.lv - 1].exp * 100) + "%");;
            //IsUserLvUp();
            break;
        case 105:
            if (arenaJson!=null)
                arenaJson.honor += parseInt(value);
            break;
        //银币 
        case 200:
            userJson.coin += Number(value);
            //银币 大于1万 万显示
            if (userJson.coin >= 1000000)
                $("#u_coin").text(parseInt(userJson.coin / 10000) + "万");
            else
                $("#u_coin").text(userJson.coin);
            break;
        case 300:

            break;
        case 400:
            userJson.fame += Number(value);
            break;
        //500体力
        case 500:
            var tempStrength = userJson.strength + Number(value);
            if (userJson.strength >= userJson.smax && tempStrength < userJson.smax)
                userJson.stime = 300;
            userJson.strength = tempStrength;
            var StrengWidth = parseInt((userJson.strength / userJson.smax) * 122) > userJson.smax ? 122 : parseInt((userJson.strength / userJson.smax) * 122);
            $("#u_strength").css("width", StrengWidth).children("#u_strength_content").text(userJson.strength + "/" + userJson.smax + "");
            break;
        case 600:
            userJson.gold += Number(value);
            if (value < 0)
                window.GameMainClass.onPurchase("600", 1, -value);
            $("#u_gold").html(userJson.gold);
            break;
        case 700:
            userJson.fspoint += Number(value);
            break;
        case 800:
            userJson.wn += Number(value);
            break;
    }
}

//升级改变
var LvUpChange = function () {
    $("#u_lv").html(getCityLv(userJson.lv));
    $("#flagData1").text(teamJson.usedleader + "/" + userJson.leader);

    CjRewardData.resert = 0;

    window.GameMainClass.setBattleSpeed(userJson.vip, userJson.lv);

    window.GameMainClass.UpdateLevel(userJson.uid, userJson.lv);
}

//判断是否升级
var IsUserLvUp = function () {
    if (userJson.exp >= lvUpJson.data[userJson.lv-1].exp) {
        showLvUpDialog();
    }
}

//lv
var getLv = function (lv) {
    lv = Number(lv);
    var str;
    if (lv >= 10) {
        str = "<div class='heroLvNum'></div><div class='heroLv_num' style='background-position:" + -(parseInt(lv / 10) * 13) + "px'></div>";
        str += "<div class='heroLv_num' style='background-position:" + -(lv % 10 * 13) + "px'></div>";
    } else {
        str = "<div class='heroLvNum'></div><div class='heroLv_num' style='background-position:" + -(lv * 13) + "px'></div>";
    }
    return str;
}

//主城lv
var getCityLv = function (lv) {
    var str;
    if (lv >= 10) {
        str = "<div class='cityLvNum'></div><div class='cityLv_num' style='background-position:" + -(parseInt(lv / 10) * 10) + "px'></div>";
        str += "<div class='cityLv_num' style='background-position:" + -(lv % 10 * 10) + "px'></div>";
    } else {
        str = "<div class='cityLvNum'></div><div class='cityLv_num' style='background-position:" + -(lv * 10) + "px'></div>";
    }
    return str;
}

//强化等级
var getRefineLv = function (lv) {
    lv = Number(lv);
    var str;
    if (lv >= 10) {
        str = "<div class='refineLvNum'></div><div class='refineLv_num' style='background-position:" + -(parseInt(lv / 10) * 9) + "px'></div>";
        str += "<div class='refineLv_num' style='background-position:" + -(lv % 10 * 9) + "px'></div>";
    } else {
        str = "<div class='refineLvNum'></div><div class='refineLv_num' style='background-position:" + -(lv * 9) + "px'></div>";
    }
    return str;
}

//设置标题
var setTitle = function (title) {
    $("#titleContext").css("background-image", "url(res/public/title/"+title+".png)");
}

//查找是否存在此套装
var hasSuit = function (type) {
    switch (type) {
        case 1:
            var flag = 0;
            for (var i = 0; i < bagJson.data.length; i++) {
                if (bagJson.data[i].p.split(",")[2] == "9000" || bagJson.data[i].p.split(",")[2] == "9001" || bagJson.data[i].p.split(",")[2] == "9002" || bagJson.data[i].p.split(",")[2] == "9003" || bagJson.data[i].p.split(",")[2] == "9004") {
                    flag++;
                }
            }
            if (flag == 5)
                return true;
            else
                return false;
            break;
        case 2:
            var flag = 0;
            for (var i = 0; i < bagJson.data.length; i++) {
                if (bagJson.data[i].p.split(",")[2] == "9005" || bagJson.data[i].p.split(",")[2] == "9006" || bagJson.data[i].p.split(",")[2] == "9007" || bagJson.data[i].p.split(",")[2] == "9008" || bagJson.data[i].p.split(",")[2] == "9009") {
                    flag++;
                }
            }
            if (flag == 5)
                return true;
            else
                return false;
            break;
        case 3:
            var flag = 0;
            for (var i = 0; i < bagJson.data.length; i++) {
                if (bagJson.data[i].p.split(",")[2] == "9010" || bagJson.data[i].p.split(",")[2] == "9011" || bagJson.data[i].p.split(",")[2] == "9012" || bagJson.data[i].p.split(",")[2] == "9013" || bagJson.data[i].p.split(",")[2] == "9014") {
                    flag++;
                }
            }
            if (flag == 5)
                return true;
            else
                return false;
            break;
        case 4:
            var flag = 0;
            for (var i = 0; i < bagJson.data.length; i++) {
                if (bagJson.data[i].p.split(",")[2] == "9015" || bagJson.data[i].p.split(",")[2] == "9016" || bagJson.data[i].p.split(",")[2] == "9017" || bagJson.data[i].p.split(",")[2] == "9018" || bagJson.data[i].p.split(",")[2] == "9019") {
                    flag++;
                }
            }
            if (flag == 5)
                return true;
            else
                return false;
            break;
        case 5:
            var flag = 0;
            for (var i = 0; i < bagJson.data.length; i++) {
                if (bagJson.data[i].p.split(",")[2] == "9020" || bagJson.data[i].p.split(",")[2] == "9021" || bagJson.data[i].p.split(",")[2] == "9022" || bagJson.data[i].p.split(",")[2] == "9023" || bagJson.data[i].p.split(",")[2] == "9024") {
                    flag++;
                }
            }
            if (flag == 5)
                return true;
            else
                return false;
            break;
    }
}

//查找类型对应的文字类型
var getTypeContent = function (type) {
    switch (type) {
        case "6":
        case "1":
            return "攻击";
        case "7":
        case "2":
            return "生命";
        case "8":
        case "3":
            return "防御";
        case "9":
            return "命中";
        case "10":
        case "5":
            return "暴击";
        case "11":
        case "4":
            return "闪避";
        case "12":
            return "韧性";
    }
}

//征战图标转
var battleAnimate = function () {
    var no = $("#no");
    var temp = 0;
    var time = setInterval(function () {
        temp++;
        no.css("background-position-x", -temp*163);
        if (temp == 9)
            temp = 0;
    }, 150)
}

//将物品添加到物品json里
var AddItem = function (json) {
    var temp;
    var hassame = false;
    for (var i = 0; i < json.length; i++) {
        hassame = false;
        temp = json[i].p.split(",")[0];
        if (Number(json[i].p.split(",")[3]) >= 6) {
            for (var j = 0; j < bagJson.data.length; j++) {
                if (bagJson.data[j].p.split(",")[0] == temp) {
                    bagJson.data[j] = json[i];
                    hassame = true;
                    break;
                }
            }
        }
        if (!hassame) {
            bagJson.data.push(json[i]);
        }
            
    }
}

//将单个物品添加到物品json里
var AddOneItem = function (json) {
    var temp = json.p.split(",")[2];
    var tempType = Number(json.p.split(",")[3]);
    var tempFlag = false;

    if (tempType >= 6) {
        for (var j = 0; j < bagJson.data.length; j++) {
            if (bagJson.data[j].p.split(",")[2] == temp) {
                bagJson.data[j].p = json.p;
                tempFlag = true;
                break;
            }
        }
    }
    if (!tempFlag) {
        bagJson.data.push(json);
    }
    
}

//显示获得的物品(动画)
var showGetItemAnimate = function (tempJson) {
    //var tempJson = { "Client": [{ "msgid": 2 }], "data": [{ "p": "814,0,2001,6,0,1,0,0,0" }], "info": "ok", "resert": 1, "reward": { "item": "800,200,200", "num": "12,100,33" } };

    if ($(".wardDiv").length != 0) {
        $(".wardDiv").remove();
    }

    var tempGood = tempJson.reward.item.split(",");
    var tempNum = tempJson.reward.num.split(",");
    

    for (var i = 0; i < tempGood.length; i++) {
        switch (tempGood[i]) {
            case "200":
                $("body").append("<div id='wardDiv" + i + "' class='wardDiv' style='position:absolute;top:" + ((height - 40) / 2 + 50 * i + 150) + "px'><div class='wardItem' style='background-image:url(res/ward/200.png);'></div>银币+" + tempNum[i] + "</div>");
                break;
            case "400":
                $("body").append("<div id='wardDiv" + i + "' class='wardDiv' style='position:absolute;top:" + ((height - 40) / 2 + 50 * i + 150) + "px'><div class='wardItem' style='background-image:url(res/ward/400.png);'></div>声望+" + tempNum[i] + "</div>");
                break;
            case "600":
                $("body").append("<div id='wardDiv" + i + "' class='wardDiv' style='position:absolute;top:" + ((height - 40) / 2 + 50 * i + 150) + "px'><div class='wardItem' style='background-image:url(res/ward/600.png);'></div>萌币+" + tempNum[i] + "</div>");
                break;
            case "800":
                $("body").append("<div id='wardDiv" + i + "' class='wardDiv' style='position:absolute;top:" + ((height - 40) / 2 + 50 * i + 150) + "px'><div class='wardItem' style='background-image:url(res/ward/800.png);'></div>万能将魂+" + tempNum[i] + "</div>");
                break;
                //荣
            case "105":
                $("body").append("<div id='wardDiv" + i + "' class='wardDiv' style='position:absolute;top:" + ((height - 40) / 2 + 50 * i + 150) + "px'><div class='wardItem' style='background-image:url(res/ward/105.png);'></div>荣誉+" + tempNum[i] + "</div>");
                break;
            default:
                $("body").append("<div id='wardDiv" + i + "' class='wardDiv' style='position:absolute;top:" + ((height - 40) / 2 + 50 * i + 150) + "px'><div class='wardItem' style='background-image:url(res/ward/other.png);'></div>物品+" + tempNum[i] + "</div>");
                break;
        }

        var tempDiv = $("#wardDiv" + i);
        tempDiv.css("left", (width - tempDiv.width()) / 2);
        if (pad) tempDiv.css({ "-webkit-transform": "scale("+sp+")" });


        $(tempDiv).animate({
            top: height / 2 - i * 30 - 100
        }, 2000 + i * 1000, function () {
            $(this).remove();
        })

    }
}

//显示获得的物品2(动画--根据类型)
var showGetItemAnimate2 = function (tempJson) {
    //var tempJson = { "data": [{ "id": 200, "num": 200000, "str": "", "type": 1 }, { "id": 400, "num": 360, "str": "", "type": 1 }, { "id": 9003, "num": 1, "str": "9003,1,0,仙灵,188,185,50,2,4,0,43511,0,1,0,1,9003,3,0", "type": 2 }, { "id": 105, "num": 360, "str": "", "type": 1 }], "info": "银币+200000 声望+360 荣誉+360 仙灵+1", "resert": 1 };
    if ($(".wardDiv").length != 0) {
        $(".wardDiv").remove();
    }

    var tempId=tempJson.data[0].id;
    var tempNum=0;
    var lastJson = { "data": [] };
    //重组数据
    for (var i = 0, j = tempJson.data.length; i < j; i++) {
        if (tempJson.data[i].type != 2) {
            if (tempNum >= 1) {
                lastJson.data.push({ "num": tempNum, "id": tempId, "type": tempJson.data[i - 1].type });
                if ((i + 1)<j) {
                    tempId = tempJson.data[i + 1].id;
                    tempNum = 0;
                }
            }
            lastJson.data.push(tempJson.data[i]);
            continue;
        }
        if (tempId == tempJson.data[i].id) {
            tempNum++;
        } else {
            if (tempNum == 0) {
                tempId = tempJson.data[i].id;
                tempNum = 1;
                if (i == (j - 1)) {
                    lastJson.data.push({ "num": tempNum, "id": tempId, "type": tempJson.data[i].type });;
                }
                continue;
            }
            tempId = tempJson.data[i].id;
            lastJson.data.push({ "num": tempNum, "id": tempId, "type": tempJson.data[i].type });
            tempNum = 1;
            if (i == (j - 1)) {
                continue;
            }
        }
        if (i == (j - 1)) {
            lastJson.data.push({ "num": tempNum, "id": tempId, "type": tempJson.data[i].type });
        }
    }
    //alert(JSON.stringify(lastJson));
    tempJson = lastJson;

    for (var i = 0; i < tempJson.data.length; i++) {
        switch (Number(tempJson.data[i].type)) {
            case 1:
                switch (String(tempJson.data[i].id)) {
                    case "200":
                        $("body").append("<div id='wardDiv" + i + "' class='wardDiv' style='position:absolute;top:" + ((height - 40) / 2 + 50 * i + 150) + "px'><div class='wardItem' style='background-image:url(res/ward/200.png);'></div>银币+" + tempJson.data[i].num + "</div>");
                        break;
                    case "400":
                        $("body").append("<div id='wardDiv" + i + "' class='wardDiv' style='position:absolute;top:" + ((height - 40) / 2 + 50 * i + 150) + "px'><div class='wardItem' style='background-image:url(res/ward/400.png);'></div>声望+" + tempJson.data[i].num + "</div>");
                        break;
                    case "600":
                        $("body").append("<div id='wardDiv" + i + "' class='wardDiv' style='position:absolute;top:" + ((height - 40) / 2 + 50 * i + 150) + "px'><div class='wardItem' style='background-image:url(res/ward/600.png);'></div>萌币+" + tempJson.data[i].num + "</div>");
                        break;
                    case "800":
                        $("body").append("<div id='wardDiv" + i + "' class='wardDiv' style='position:absolute;top:" + ((height - 40) / 2 + 50 * i + 150) + "px'><div class='wardItem' style='background-image:url(res/ward/800.png);'></div>万能将魂+" + tempJson.data[i].num + "</div>");
                        break;
                        //荣
                    case "105":
                        $("body").append("<div id='wardDiv" + i + "' class='wardDiv' style='position:absolute;top:" + ((height - 40) / 2 + 50 * i + 150) + "px'><div class='wardItem' style='background-image:url(res/ward/105.png);'></div>荣誉+" + tempJson.data[i].num + "</div>");
                        break;
                    default:
                        $("body").append("<div id='wardDiv" + i + "' class='wardDiv' style='position:absolute;top:" + ((height - 40) / 2 + 50 * i + 150) + "px'><div class='wardItem' style='background-image:url(res/ward/other.png);'></div>物品+" + tempJson.data[i].num + "</div>");
                        break;
                }
                break;
            case 2:
                var tempName;
                for (var m = 0; m < localHeroJson.data.length; m++) {
                    if (localHeroJson.data[m].gid == tempJson.data[i].id) {
                        tempName = localHeroJson.data[m].name;
                        break;
                    }
                }
                $("body").append("<div id='wardDiv" + i + "' class='wardDiv' style='position:absolute;top:" + ((height - 40) / 2 + 50 * i + 150) + "px'><div class='wardItem' style='background-image:url(res/ward/a1.png);'></div>" + tempName + "+" + tempJson.data[i].num + "</div>");
                break;
            case 3:
                var tempName;
                for (var m = 0; m < GoodsJson.data.length; m++) {
                    if (GoodsJson.data[m].ItemID == tempJson.data[i].id) {
                        tempName = GoodsJson.data[m].Name;
                        break;
                    }
                }
                $("body").append("<div id='wardDiv" + i + "' class='wardDiv' style='position:absolute;top:" + ((height - 40) / 2 + 50 * i + 150) + "px'><div class='wardItem' style='background-image:url(res/ward/other.png);'></div>" + tempName + "+" + tempJson.data[i].num + "</div>");
                break;
            case 4:
                var tempName;
                for (var m = 0; m < localPieceJson.data.length; m++) {
                    if (localPieceJson.data[m].gid == tempJson.data[i].id) {
                        tempName = localPieceJson.data[m].name;
                        break;
                    }
                }
                $("body").append("<div id='wardDiv" + i + "' class='wardDiv' style='position:absolute;top:" + ((height - 40) / 2 + 50 * i + 150) + "px'><div class='wardItem' style='background-image:url(res/ward/800.png);'></div>" + tempName + "将魂+" + tempJson.data[i].num + "</div>");
                break;
        }
        

        var tempDiv = $("#wardDiv" + i);
        tempDiv.css("left", (width - tempDiv.width()) / 2);
        if (pad) tempDiv.css({ "-webkit-transform": "scale(" + sp + ")" });

        $(tempDiv).animate({
            top: height / 2 - i * 30 - 100
        }, 2000 + i * 1000 , function () {
            $(this).remove();
        })

    }

}

//改变主城旗织显示
var showCityFlag = function (json) {
    tempJson = JSON.parse(json);
    teamJson.usedleader = tempJson.usedleader;
    $("#teamLead").text(tempJson.usedleader);
}

//寻将界面
var showFindHeroAnimate = function (tempJson, friend) {
    //tempJson = { "Client": [{ "usualID": 700, "num": 1 }], "cutnum": 100, "data": [{ "g": "8066,5,0,无当飞军,738,77,6,2,2,0,21120,0,1,0,25,8066,3,816", "type": 1 }], "info": "友情点-100", "resert": 1, "rwItem": "8066", "rwNum": "1", "rwType": "1" };
    $("#find").remove();
    $("#shopAnimate").remove();

    $("body").append("<div id='shopAnimate'></div><div id='find'style='left:" + (width - 574) / 2 + "px;top:" + (height - 447) / 2 + "px;'><div id='tempClose'></div><div id='shopOneContinue'class='bossBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>寻将一次</div><div class='btn3'></div></div></div><div id='shopTenContinue'class='bossBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>寻将十次</div><div class='btn3'></div></div></div></div>");
    var animateDiv = $("#shopAnimate");
    animateDiv.css({ "top": (height - 350) / 2, "left": (width - 350) / 2 });
    if (pad) $("#find").css({ "zoom": sp, "left": (width - 574 * sp) / 2 / sp, "top": (height - 447 * sp) / 2 / sp });

    var animateIndex = 0;

    var shopAnimate = setInterval(function () {
        animateDiv.css("background-position-x", -animateIndex * 350)
        animateIndex++;
        if (animateIndex == 13) {
            clearInterval(shopAnimate)
            animateDiv.remove();
        }
    }, 100)

    var tempDiv = $("#find");

    if (tempJson.data.length == 1) {
        if (tempJson.data[0].type == 1) {
            var tempDetail = tempJson.data[0].g.split(",");

            var tempCreateDiv = document.createElement("div");
            tempCreateDiv.className = "heroHeadBg";
            var tempNum = parseInt(Math.random() * 10);
            tempCreateDiv.setAttribute("style", "opacity:0;position:absolute;left:" + shopPos.data[tempNum].x + "px;top:" + shopPos.data[tempNum].y + "px;");
            tempCreateDiv.innerHTML = "<div class='heroHeadColor' style='background-image:url(res/head/" + tempDetail[8] + ".png)'></div><div class='heroHead' style='background-image:url(res/head/" + tempDetail[15] + ".png)'></div><div class='findName' style='color:" + getColor(Number(tempDetail[8])) + "'>" + tempDetail[3] + "</div>";

            $(tempCreateDiv).animate({ "opacity": "1" }, 3000, "linear");

            tempDiv.append(tempCreateDiv);
        }
        else {
            var tempDetail;
            for (var j = 0; j < localPieceJson.data.length; j++) {
                if (tempJson.data[0].g.split(",")[0] == localPieceJson.data[j].gid) {
                    tempDetail = localPieceJson.data[j];
                    break;
                }
            }

            var tempCreateDiv = document.createElement("div");
            tempCreateDiv.className = "heroHeadBg";
            var tempNum = parseInt(Math.random() * 10);
            tempCreateDiv.setAttribute("style", "opacity:0;position:absolute;left:" + shopPos.data[tempNum].x + "px;top:" + shopPos.data[tempNum].y + "px;");
            tempCreateDiv.innerHTML = "<div class='heroHeadColor' style='background-image:url(res/head/" + tempDetail.q + ".png)'></div><div class='heroHead' style='background-image:url(res/head/" + tempDetail.imgid + ".png)'></div><div class='advHead'></div><div class='findName' style='color:" + getColor(tempDetail.q) + "'>" + tempDetail.name + "武魂</div>";

            $(tempCreateDiv).animate({ "opacity": "1" }, 3000, "linear");

            tempDiv.append(tempCreateDiv);
        }

        
    }
    else {
        var i = 0;

        var shopTime = setInterval(function () {
            if (tempJson.data[i].type == 1) {
                var tempDetail = tempJson.data[i].g.split(",");

                var tempCreateDiv = document.createElement("div");
                tempCreateDiv.className = "heroHeadBg";
                tempCreateDiv.setAttribute("style", "opacity:0;position:absolute;left:" + shopPos.data[i].x + "px;top:" + shopPos.data[i].y + "px;");
                tempCreateDiv.innerHTML = "<div class='heroHeadColor' style='background-image:url(res/head/" + tempDetail[8] + ".png)'></div><div class='heroHead' style='background-image:url(res/head/" + tempDetail[15] + ".png)'></div><div class='findName' style='color:" + getColor(Number(tempDetail[8])) + "'>" + tempDetail[3] + "</div>";

                $(tempCreateDiv).animate({ "opacity": "1" }, 3000, "linear");

                tempDiv.append(tempCreateDiv);
            }
            else {
                var tempDetail;
                for (var j = 0; j < localPieceJson.data.length; j++) {
                    if (localPieceJson.data[j].gid == tempJson.data[i].g.split(",")[0]) {
                        tempDetail = localPieceJson.data[j];
                        break;
                    }
                }

                var tempCreateDiv = document.createElement("div");
                tempCreateDiv.className = "heroHeadBg";
                tempCreateDiv.setAttribute("style", "opacity:0;position:absolute;left:" + shopPos.data[i].x + "px;top:" + shopPos.data[i].y + "px;");
                tempCreateDiv.innerHTML = "<div class='heroHeadColor' style='background-image:url(res/head/" + tempDetail.q + ".png)'></div><div class='heroHead' style='background-image:url(res/head/" + tempDetail.imgid + ".png)'></div><div class='advHead'></div><div class='findName' style='color:"+getColor(tempDetail.q)+"'>" + tempDetail.name + "武魂</div>";

                $(tempCreateDiv).animate({ "opacity": "1" }, 3000, "linear");

                tempDiv.append(tempCreateDiv);
            }


            i++;
            if (i == 10)
                clearInterval(shopTime);
        }, 500)
    }

    $("#tempClose").bind("touchend", function () {
        $(this).css("-webkit-transform", "scale(1)");
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("close");
        $("#tempMask,#find").remove();
        $("#shopAnimate").remove();
        clearInterval(shopTime)
    }).bindAnimate();

    $("#shopOneContinue").bind("touchend", function () {
        $(this).css("-webkit-transform", "scale(1)");
        if (cancel())
            return;
        $("#shopAnimate").remove();
        clearInterval(shopTime);
        if (friend)
            if (userJson.fspoint < 100)
                showTextMess("友情点不足", 1);
            else
                window.GameMainClass.sendRequestJson(143, "{\"usualID\":700,\"num\":1}", "showLotteryResult");
        else {
            if (userJson.gold < 280)
                showTextMess("萌币不足", 1);
            else {
                window.GameMainClass.playEffectSound("icon");
                window.GameMainClass.sendRequestJson(143, "{\"usualID\":600,\"num\":1}", "showLotteryResult");
            }
        }
    }).bindAnimate();

    $("#shopTenContinue").bind("touchend", function () {
        $(this).css("-webkit-transform", "scale(1)");
        if (cancel())
            return;
        $("#shopAnimate").remove();
        clearInterval(shopTime);
        if (friend) {
            if (userJson.fspoint < 1000)
                showTextMess("友情不足", 1);
            else
                window.GameMainClass.sendRequestJson(143, "{\"usualID\":700,\"num\":10}", "showLotteryResult");
        }
        else {
            if (userJson.gold < 2500)
                showTextMess("萌币不足", 1);
            else {
                window.GameMainClass.playEffectSound("icon");
                window.GameMainClass.sendRequestJson(143, "{\"usualID\":600,\"num\":10}", "showLotteryResult");
            }
        }
    }).bindAnimate();


}

//获取奖励
var getReward = function (tempJson) {
    var tempId = tempJson.reward.item.split(",");
    var tempNum = tempJson.reward.num.split(",");

    showGetItemAnimate(tempJson);

    for (var i = 0; i < tempId.length; i++) {
        updateUserJson(tempId, tempNum);
    }

    for (var i = 0; i < tempJson.data.length; i++) {
        bagJson.data.push(tempJson.data[i]);
    }
}

jQuery.fn.slideLeftHide = function (speed, callback) { this.animate({ width: "hide", paddingLeft: "hide", paddingRight: "hide", marginLeft: "hide", marginRight: "hide" }, speed, callback); }
jQuery.fn.slideLeftShow = function (speed, callback) { this.animate({ width: "show", paddingLeft: "show", paddingRight: "show", marginLeft: "show", marginRight: "show" }, speed, callback); }

//绑定事件
jQuery.fn.bindAnimate = function () {
    this.bind("touchstart", function () {
        begin();
        $(this).css({ "-webkit-transform": "scale(0.8)" });
    }).bind("touchmove", function () {
        move();
        $(this).css({ "-webkit-transform": "scale(1)" });
    })
    return this;
}

var getJob = function (job) {
    switch (job) {
        case 0:
            return "无限定";
            break;
        case 1:
            return "虎贲,骁骑";
            break;
        case 2:
            return "刺客";
            break;
        case 3:
            return "劲射";
            break;
        case 4:
            return "谋士,方士";
            break;
    }
}

var getGoodType = function (type) {
    switch (type) {
        case 1:
            return "武器";
        case 2:
            return "头盔";
        case 3:
            return "衣服";
        case 4:
            return "戒指";
        case 5:
            return "项链";
        case 6:
            return "红宝石";
        case 7:
            return "绿宝石";
        case 8:
            return "黄宝石";
        case 9:
            return "蓝宝石";
        case 10:
            return "紫宝石";
        case 11:
            return "黑宝石";
        case 12:
            return "橙宝石";
        case 13:
            return "图纸";
        case 14:
            return "材料";
        case 30:
            return "转生物品";
        case 80:
            return "礼包";
        case 81:
            return "辎重";
        case 82:
            return "礼包";
    }
}

var vipChangeBack = function (json) {
    var tempJson = JSON.parse(json);
    //var tempJson = { "arena": "1", "hero": "1", "info": "恭喜主公升级到VIP8", "resert": "1", "s": "1" };
    //{"arena":增加了的竞技场可购买挑战次数,"hero":增加了的英雄志挑战次数,"info":"恭喜主公升级到VIP8","resert":1,"s":增加了的每日可购买体力的次数,
    //"f":增加了的好友上限,"g":增加了的武将位,"wh":增加了的仓库位}
    showTextMess(tempJson.info, 1);
    if (arenaJson != null) {
        arenaJson.leftbuy += tempJson.arena;
    }
    userJson.gnum += tempJson.hero;
    userJson.fnum += tempJson.f;
    userJson.pnum += tempJson.wh;
    userJson.sleft += tempJson.s;

    userJson.vip = tempJson.vip;
    $("#u_viplv").css("background-position-y", -15 * userJson.vip);
    if (yxzData != null) {
        yxzData.leftbuy += tempJson.hero;
    }

    activityJson = null;

    window.GameMainClass.setBattleSpeed(userJson.vip, userJson.lv);
}

//获取技能等级
var getSkillLv = function (q) {
    switch (Number(q)) {
        case 1:
            return 2;
        case 2:
            return 4;
        case 3:
            return 8;
        case 4:
            return 12;
    }
}

//顶部滚动消息
var ShowNewMess = function () {

    var tempFlag = true;

    $("#titletext").html(messArry[0]);
    if (pad) $("#messtitle").css({ "-webkit-transform": "scale(" + sp + ")" })
    $("#messtitle").css({ "left": 0, "display": "block" }).animate({ "left": (width - $("#messtitle").width()) / 2 }, "1000", "linear", function () {
        setTimeout(function () {
            $("#messtitle").animate({ "left": width }, "1000", "linear", function () {
                $("#titletext").css({ "top": 0 });
                $("#messtitle").css("display", "none");
                return;
            })
            messArry.splice(0, 1);
            if (messArry.length == 0) {
                console.log("删除")
                tempFlag = false;
            }
        }, 3000)
    })

    setTimeout(function () {
        if (tempFlag) {
            $("body").everyTime("5s", "titletexta", function () {

                $("#titletext").html(messArry[0]);
                if (pad) $("#messtitle").css({ "-webkit-transform": "scale(" + sp + ")" })
                $("#messtitle").css({ "left": 0, "display": "block" }).animate({ "left": (width - $("#messtitle").width()) / 2 }, "1000", "linear", function () {
                    setTimeout(function () {
                        $("#messtitle").animate({ "left": width }, "1000", "linear", function () {
                            $("#titletext").css({ "top": 0 });
                            $("#messtitle").css("display", "none");
                        })
                        messArry.splice(0, 1);
                        if (messArry.length == 0) {
                            $("body").stopTime("titletexta");
                        }
                    }, 3000)
                })

            });
        }
    },4200)
    
};

//滚动消息(顶上方)
function ReceiverMess(obj) {
    messArry.push(obj);
    if (messArry.length == 1) {
        ShowNewMess();
    }
}

//后台添加数据
var backGetReward = function (json) {
    var tempJson = JSON.parse(json);
    iGetReward(tempJson);
}

//新消息推来
var sendMessage = function (json) {
    var tempJson = JSON.parse(json);
    window.GameMainClass.sendRequestJson(1081, "", "setMessageJsonJust");
}

var getRemainTimes = function (json) {
    var tempJson=JSON.parse(json)
    remainJson = tempJson;

    showCityRemain();
    setTimeout(function () {
        if (tempJson.step <= 30 && userJson.lv < 8) {
            if (tempJson.step == 0)
                tempJson.step = -1;
            if (tempJson.step == 8)
                tempJson.step = 7;
            if (tempJson.step == 16)
                tempJson.step = 14;
            if (tempJson.step == 28)
                tempJson.step = 27;
            NewGuideClass.tempindex = tempJson.step + 1;
            NewGuideClass.NewBegin();
        }
        if (tempJson.step > 30 && tempJson.step <= 54 && userJson.lv == 8) {
            if (tempJson.step == 32)
                tempJson.step = 31;
            if (tempJson.step == 33)
                tempJson.step = 31;
            if (tempJson.step == 35)
                tempJson.step = 36;
            if (tempJson.step == 40)
                tempJson.step = 42;
            if (tempJson.step == 41)
                tempJson.step = 42;
            if (tempJson.step == 45)
                tempJson.step = 44;
            if (tempJson.step == 48)
                tempJson.step = 47;
            if (tempJson.step == 52)
                tempJson.step = 51;
            if (tempJson.step == 50)
                tempJson.step = 51;
            NewGuideClass.tempindex = tempJson.step;
            NewGuideClass.NewBegin();
        }
    },500)
}

var changeRemain = function (type,num) {
    switch (type) {
        case "task":
            if(remainJson.task==0){
                $("#Task").html("").append("<div style='background-image:url(res/public/light4.png);width:36px;height:36px;' class='iconLightSmall'></div>");
            }
            remainJson.task += num;
            if (remainJson.task == 0) {
                $("#Task").html("");
            }
            break;
        case "msg":
            if (remainJson.msg == 0) {
                $("#Message").html("").append("<div class='iconLightSmall'></div>");
            }
            remainJson.msg += num;
            if (remainJson.msg == 0) {
                $("#Message").html("");
            }
            break;
        case "arena":
            remainJson.arena += num;
            $("#b_arena").html("").append("<div class='iconLight'>" + remainJson.arena + "</div>");
            if (remainJson.arena == 0) {
                $("#b_arena").html("");
            }
            break;
        case "sign":
            if (remainJson.sign == 0) {
                $("#Sign").html("").append("<div class='iconLightSmall'></div>");
            }
            remainJson.sign += num;
            if (remainJson.sign == 0) {
                $("#Sign").html("");
            }
            break;
        case "mine":
            if (remainJson.mine == 0) {
                $("#Mine").html("").append("<div style='background-image:url(res/public/light4.png);width:36px;height:36px;' class='iconLightSmall'></div>");
            }
            remainJson.mine += num;
            if (remainJson.mine == 0) {
                $("#Mine").html("");
            }
            break;
    }
}

var showCityRemain = function () {
    if (remainJson.arena > 0) {
        $("#b_arena").html("").append("<div class='iconLight'>" + remainJson.arena + "</div>");
    }
    if (remainJson.msg > 0) {
        $("#Message").html("").append("<div class='iconLightSmall'></div>")
    }
    if (remainJson.sign > 0) {
        $("#Sign").html("").append("<div class='iconLightSmall'></div>")
    }
    if (remainJson.task > 0) {
        $("#Task").html("").append("<div style='background-image:url(res/public/light4.png);width:36px;height:36px;' class='iconLightSmall'></div>");
    }
    if (remainJson.mine > 0) {
        $("#Mine").html("").append("<div style='background-image:url(res/public/light4.png);width:36px;height:36px;' class='iconLightSmall'></div>");
    }
}

//经验加成倍数
var getExpDouble = function (type) {
    switch (type) {
        case 1:
            return 0.25;
        case 2:
            return 0.2;
        case 3:
            return 0.18;
        case 4:
            return 0.08;
    }
}

//达到等级时
var whenLvEnough = function (json) {
    var tempJson = JSON.parse(json);
    //var tempJson = { "lv": 5 };

    if (tempJson.lv == 5) {
        
        var maskDiv = document.createElement("div");
        maskDiv.id = "tempMask2";
        $(maskDiv).css({ "width": width, "height": height, "top": "0", "z-index": 20 });
        document.body.appendChild(maskDiv);

        $("body").append("<div id='newFunction'style='left:" + (width - 476) / 2 + "px;top:" + (height - 272) / 2 + "px;'><div class='newBuild'style='background-image:url(res/newguid/vip.png);left: 96px;'></div><div class='newBuild'style='background-image:url(res/newguid/ceo.png);left: 242px;'></div><div id='lineupBtn'class='LvUpBtn'style='display:block;left:200px;bottom:24px;width:91px;'><div class='btn'><div class='btn1'></div><div class='btn2'>确定</div><div class='btn3'></div></div></div></div>");

        if (pad)
            $("#newFunction").css({ "zoom": sp, "left": (width - 476 * sp) / 2 / sp, "top": (height - 272 * sp) / 2 / sp });

        $("#lineupBtn").bind("touchend", function () {
            $(this).css({ "-webkit-transform": "scale(1)" });
            if (cancel())
                return;
            window.GameMainClass.playEffectSound("icon");
            $("#tempMask").remove();
            $("#map").remove();
            $("#temp").html("");
            $("#mask").hide();
            $("#dialog").html("");
            $("#battleDialog").remove();
            $("#mess").remove();
            $("#tempMask2").remove();
            $("#tempMask2").remove();
            $("#newFunction").remove();
            isSubmit = false;

            setTimeout(function () {
                NewGuideClass.tempindex = 65;
                NewGuideClass.NewBegin();
            }, 500)

        }).bind("touchstart", function () {
            $(this).css({ "-webkit-transform": "scale(0.8)" });
            begin();
        }).bind("touchmove", function () {
            $(this).css({ "-webkit-transform": "scale(1)" });
            move()
        })
        return;
    }
    
    if (tempJson.lv == 8) {

        var maskDiv = document.createElement("div");
        maskDiv.id = "tempMask2";
        $(maskDiv).css({ "width": width, "height": height, "top": "0", "z-index": 20 });
        document.body.appendChild(maskDiv);

        $("body").append("<div id='newFunction'style='left:" + (width - 476) / 2 + "px;top:" + (height - 272) / 2 + "px;'><div class='newBuild'style='background-image:url(res/newguid/heroEquip.png);left: 242px;'></div><div class='newBuild'style='background-image:url(res/newguid/equip.png);left: 96px;'></div><div id='lineupBtn'class='LvUpBtn'style='display: block;left:200px;bottom:24px;width:91px;'><div class='btn'><div class='btn1'></div><div class='btn2'>确定</div><div class='btn3'></div></div></div></div>");
        if (pad)
            $("#newFunction").css({ "zoom": sp, "left": (width - 476 * sp) / 2 / sp, "top": (height - 272 * sp) / 2 / sp });

        $("#lineupBtn").bind("touchend", function () {
            $(this).css({ "-webkit-transform": "scale(1)" });
            if (cancel())
                return;
            window.GameMainClass.playEffectSound("icon");
            $("#tempMask").remove();
            $("#map").remove();
            $("#temp").html("");
            $("#mask").hide();
            $("#dialog").html("");
            $("#battleDialog").remove();
            isSubmit = false;
            $("#mess").remove();
            $("#tempMask2").remove();
            $("#tempMask2").remove();
            $("#newFunction").remove();

            setTimeout(function () {
                NewGuideClass.tempindex = 31;
                NewGuideClass.NewBegin();
            },500)
            
        }).bind("touchstart", function () {
            $(this).css({ "-webkit-transform": "scale(0.8)" });
            begin();
        }).bind("touchmove", function () {
            $(this).css({ "-webkit-transform": "scale(1)" });
            move()
        })
    }

    //比武场
    if (tempJson.lv == 10) {

        var maskDiv = document.createElement("div");
        maskDiv.id = "tempMask2";
        $(maskDiv).css({ "width": width, "height": height, "top": "0", "z-index": 20 });
        document.body.appendChild(maskDiv);

        $("body").append("<div id='newFunction' style='left:" + (width - 476) / 2 + "px;top:" + (height - 272) / 2 + "px;'><div class='newBuild' style='background-image:url(res/newguid/arena.png);left: 174px;'></div><div id='lineupBtn'class='LvUpBtn'style='display:block;left:200px;bottom:24px;width:91px;'><div class='btn'><div class='btn1'></div><div class='btn2'>确定</div><div class='btn3'></div></div></div></div>");

        if (pad)
            $("#newFunction").css({ "zoom": sp, "left": (width - 476 * sp) / 2 / sp, "top": (height - 272 * sp) / 2 / sp });

        $("#lineupBtn").bind("touchend", function () {
            $(this).css({ "-webkit-transform": "scale(1)" });
            if (cancel())
                return;
            window.GameMainClass.playEffectSound("icon");
            $("#tempMask").remove();
            $("#map").remove();
            $("#temp").html("");
            $("#mask").hide();
            $("#dialog").html("");
            $("#battleDialog").remove();
            $("#mess").remove();
            $("#tempMask2").remove();
            $("#tempMask2").remove();
            $("#newFunction").remove();
            isSubmit = false;
            remainJson.arena = 12;
            changeRemain("arena", 0);

            setTimeout(function () {
                NewGuideClass.tempindex = 56;
                NewGuideClass.NewBegin();
            },500)

        }).bind("touchstart", function () {
            $(this).css({ "-webkit-transform": "scale(0.8)" });
            begin();
        }).bind("touchmove", function () {
            $(this).css({ "-webkit-transform": "scale(1)" });
            move()
        })
        return;
    }

    //英雄志
    if (tempJson.lv == 12) {

        var maskDiv = document.createElement("div");
        maskDiv.id = "tempMask2";
        $(maskDiv).css({ "width": width, "height": height, "top": "0", "z-index": 20 });
        document.body.appendChild(maskDiv);

        $("body").append("<div id='newFunction'style='left:" + (width - 476) / 2 + "px;top:" + (height - 272) / 2 + "px;'><div class='newBuild'style='background-image:url(res/newguid/yxz.png);left: 174px;'></div><div id='lineupBtn'class='LvUpBtn'style='display:block;left:200px;bottom:24px;width:91px;'><div class='btn'><div class='btn1'></div><div class='btn2'>确定</div><div class='btn3'></div></div></div></div>");

        if (pad)
            $("#newFunction").css({ "zoom": sp, "left": (width - 476 * sp) / 2 / sp, "top": (height - 272 * sp) / 2 / sp });

        $("#lineupBtn").bind("touchend", function () {
            $(this).css({ "-webkit-transform": "scale(1)" });
            if (cancel())
                return;
            window.GameMainClass.playEffectSound("icon");
            $("#tempMask").remove();
            $("#map").remove();
            $("#temp").html("");
            $("#mask").hide();
            $("#dialog").html("");
            $("#battleDialog").remove();
            $("#mess").remove();
            $("#tempMask2").remove();
            $("#tempMask2").remove();
            $("#newFunction").remove();
            isSubmit = false;

            setTimeout(function () {
                NewGuideClass.tempindex = 59;
                NewGuideClass.NewBegin();
            },500)

        }).bind("touchstart", function () {
            $(this).css({ "-webkit-transform": "scale(0.8)" });
            begin();
        }).bind("touchmove", function () {
            $(this).css({ "-webkit-transform": "scale(1)" });
            move()
        })
        return;
    }
}

//用掉某个物品
var useBagThing = function (itemsid) {
    for (var i = 0; i < bagJson.data.length; i++) {
        var tempSplit = bagJson.data[i].p.split(",");
        if (tempSplit[0] == itemsid) {
            if (Number(tempSplit[3]) > 12) {
                //数量
                if (tempSplit[5] == 1) {
                    bagJson.data.splice(i, 1);
                    break;
                } else {
                    tempSplit[5] = Number(tempSplit[5]) - 1;
                    bagJson.data[i].p = tempSplit.join(",");
                    break;
                }
            }
            else {
                bagJson.data.splice(i, 1);
                break;
            }
        }
    }
}

//出售武将价格参数
var getSellBaseNum = function (q) {
    switch (Number(q)) {
        case 1:
            return 50;
        case 2:
            return 100;
        case 3:
            return 200;
        case 4:
            return 300;
    }
}

//0点所有东西重置
var timeZeroRestart = function (json) {
    var tempJson = JSON.parse(json);
    //var tempJson = {"info":"ddd"}

    var maskDiv = document.createElement("div");
    maskDiv.id = "tempMask2";
    $(maskDiv).css({ "width": width, "height": height, "top": "0", "z-index": "21" });
    document.body.appendChild(maskDiv);

    $("#temp").html("<div id='mess3'><div id='q_title'style='left:70px;'><div id='q_titleLeft'></div><div id='q_titleCenter'><div id='q_titleContext'style='background-image:url(res/public/title/54.png);'></div></div><div id='q_titleRight'></div></div><div id='t_waikuan'><div class='q_jiao q_shangjiao'></div><div class='q_jiao q_xiajiao'></div><div class='q_jiao q_zuojiao'></div><div class='q_jiao q_youjiao'></div><div class='q_shangwaibian'></div><div class='q_xiawaibian'></div><div class='q_zuowaibian'></div><div class='q_youwaibian'></div></div><div id='dialogclose'></div><div id='rope'></div><div id='tempDialog3'><div id='lottery_content3'>" + tempJson.info + "</div></div><div id='shopOkBtn'style='width:91px;left:190px;'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>确定</div><div class='btn3'></div></div></div></div>");
    $("#mess3").css({ "left": (width - 476) / 2, "top": (height - 279) / 2 });
    if (pad) $("#mess3").css({ "zoom": sp, "left": (width - 476 * sp) / 2 / sp, "top": (height - 279 * sp) / 2 / sp });

    //绑定事件
    $("#shopOkBtn,#dialogclose").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        $("#temp").html("");
        $("#tempMask2").remove();
        window.GameMainClass.playEffectSound("close");
    }).bindAnimate();

    var arenaJson = rankJson = honorGoodJson = activityJson = yxzData = vipJson = qianDaoJson = messageJson = underJson;

}

//获得物品统一接口
var iGetReward = function (tempJson) {
    //tempJson = { "data": [{ "id": 200, "num": 0, "str": "", "type": 1 }, { "id": 400, "num": 20, "str": "", "type": 1 }, { "id": 105, "num": 20, "str": "", "type": 1 }], "info": "银币+5000 声望+20 荣誉+20", "resert": 1 };
    //tempJson = { "data": [{ "id": 8100, "num": 1, "str": "9997,0,8100,81,0,5,0,2,0,0,0", "type": 3 }] };
    for (var i = 0; i < tempJson.data.length; i++) {
        switch (tempJson.data[i].type) {
            //数值
            case 1:
                updateUserJson(tempJson.data[i].id,tempJson.data[i].num);
                break;
            //武将
            case 2:
                heroJson.data.push({ "g": tempJson.data[i].str });
                break;
            //物品
            case 3:
                if (Number(tempJson.data[i].str.split(",")[3]) >= 6) {
                    var tempFlag = false;
                    var tempId = tempJson.data[i].str.split(",")[0];
                    for (var j = 0; j < bagJson.data.length; j++) {
                        var tempSplit = bagJson.data[j].p.split(",");
                        if (tempSplit[0] == tempId) {
                            bagJson.data[j].p = tempJson.data[i].str;
                            tempFlag = true;
                            break;
                        }
                    }
                    if (!tempFlag)
                        bagJson.data.push({ "p": tempJson.data[i].str });
                }else{
                    bagJson.data.push({ "p": tempJson.data[i].str });
                }
                break;
            //将魂
            case 4:
                if (pieceJson != null) {
                    var tempPieceId = tempJson.data[i].str.split(",")[0];
                    var tempFlag = false;
                    for (var j = 0; j < pieceJson.data.length; j++) {
                        if (pieceJson.data[j].s.split(",")[0] == tempPieceId) {
                            pieceJson.data[j].s = tempJson.data[i].str;
                            tempFlag = true;
                            break;
                        }
                    }
                    if (!tempFlag) {
                        pieceJson.data.push({ "s": tempJson.data[i].str });
                    }
                }
                break;
        }
    }
}

//8级新手推物品特殊处理
var iGetRewardByNewGuid = function (json) {
    var tempJson = JSON.parse(json);
    for (var i = 0; i < tempJson.data.length; i++) {
        switch (tempJson.data[i].type) {
            //数值
            case 1:
                updateUserJson(tempJson.data[i].id, tempJson.data[i].num);
                break;
                //武将
            case 2:
                heroJson.data.push({ "g": tempJson.data[i].str });
                break;
                //物品
            case 3:
                if (Number(tempJson.data[i].str.split(",")[3]) >= 6) {
                    var tempFlag = false;
                    var tempId = tempJson.data[i].str.split(",")[0];
                    for (var j = 0; j < bagJson.data.length; j++) {
                        var tempSplit = bagJson.data[j].p.split(",");
                        if (tempSplit[0] == tempId) {
                            bagJson.data[j].p = tempJson.data[i].str;
                            tempFlag = true;
                            break;
                        }
                    }
                    if (!tempFlag) {
                        if (tempJson.data[i].str.split(",")[2]=="2001") {
                            bagJson.data.unshift({ "p": tempJson.data[i].str });
                        }else{
                            bagJson.data.push({ "p": tempJson.data[i].str });
                        }
                    }
                } else {
                    bagJson.data.push({ "p": tempJson.data[i].str });
                }
                break;
                //将魂
            case 4:
                if (pieceJson != null) {
                    var tempPieceId = tempJson.data[i].str.split(",")[0];
                    var tempFlag = false;
                    for (var j = 0; j < pieceJson.data.length; j++) {
                        if (pieceJson.data[j].s.split(",")[0] == tempPieceId) {
                            pieceJson.data[j].s = tempJson.data[i].str;
                            tempFlag = true;
                            break;
                        }
                    }
                    if (!tempFlag) {
                        pieceJson.data.push({ "s": tempJson.data[i].str });
                    }
                }
                break;
        }
    }
}

//pad适配
var forPad = function () {
    
}