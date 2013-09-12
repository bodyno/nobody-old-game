/// <reference path="json.js" />

//累充数据

var CumulationRechargeJson = {"data":""};

function loaded() {
    myScroll = new iScroll('wrapper', { 'hScrollbar': false, 'vScrollbar': false });
}

var LoadCumulationFirst = function () {
    if (CumulationRechargeJson.data == "") {
        window.GameMainClass.sendRequestJson(1124, "", "setCumulationJson");
    }
    else {
        LoadCumulationRecharge();
    }
}

var setCumulationJson = function (json) {
    CumulationRechargeJson.data = JSON.parse(json);
    LoadCumulationRecharge();
}

//加载累充界面
var LoadCumulationRecharge = function () {

    $("#mask").show();

    var str2 = new Array();
    $("#dialog").css({ "top": (height - 312) / 2, "left": (width - 472) / 2 + "px", "width": 472, "height": 316,"position":"absolute", "background-image": "url(res/leichong/RechargeN_Bg.png)" });
    str2.push("<div class='close' id='c_close' style='left:411px;top:9px;'></div>");
    var divTemp = document.createElement("div");
    divTemp.innerHTML = str2.join("");
    document.getElementById("dialog").appendChild(divTemp);


    var str = new Array();
    str.push("<div id='c_wrapper' style='top:68px;left:50px;width:84px;height:204px;'><div id='c_scroller'><ul id='thelist'><li>");
    var top = 0;
    for (var i = 0; i < CumulationRechargeJson.data.datalist.length; i++) {
        str.push("<div id='listitem" + i + "' ontouchmove='move()' ontouchstart='begin()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ShowC_R_Reward(" + i + ");' class='C_R_Mnume' style='top:" + top + "px;'><div class='C_R_MuneFont' id='font" + i + "'>" + CumulationRechargeJson.data.datalist[i].nop + "元礼包</div></div>");
        top += 42;
    }
    str.push("</li></ul></div></div>");
    str.push("<div id='rewardBox'></div>");
    str.push("<div class='DefaultFont_14 RedFont' style='top:289px;left:140px;'>" + CumulationRechargeJson.data.totalNum + "</div>");
    var divnode = document.createElement("div");
    divnode.innerHTML = str.join("");
    document.getElementById("dialog").appendChild(divnode);
    $("#c_scroller").css("height", CumulationRechargeJson.data.datalist.length * 42);

    myScroll = new iScroll('c_wrapper', { 'hScrollbar': false, 'vScrollbar': false });
    //window.addEventListener('DOMContentLoaded', loaded, false);
    ShowC_R_Reward(0);

    

    //绑定关闭事件
    $("#c_close").bind("click", function () {
        $("#mask").hide();
        $("#dialog").html("").attr("style","");
    })
}

//加载累充右边界面
var ShowC_R_Reward= function (index) {
    if ($("#listitem" + index).attr("class") == "C_R_MnumeClick")
        return;
    $("#showData").remove();
    //if (showgoodstime1 != null) {
    //    clearTimeout(showgoodstime1);
    //    clearTimeout(showgoodstime2);
    //}
    $(".C_R_MnumeClick").attr("class", "C_R_Mnume");
    $("#listitem" + index).attr("class", "C_R_MnumeClick");
    $(".C_R_MuneFontClick").attr("class", "C_R_MuneFont");
    $("#font" + index).attr("class", "C_R_MuneFontClick");

    var str = new Array();
    var top = 63, left = 142;
    var rewarelist = CumulationRechargeJson.data.datalist[index].reward.split(",");
    var rewardnumlist = CumulationRechargeJson.data.datalist[index].rewardNum.split(",");
    var len = 0;
    for (var i = 0; i < rewardnumlist.length; i++) {
        if (Number(rewardnumlist[i]) != 0) {
            str.push("<div class='RewardBox' id='rwbox" + len + "' style='top:" + top + "px;left:" + left + "px;background:url(res/leichong/RechargeItemBg.png) no-repeat;width:132px;height:48px;'>");
            switch (Number(rewarelist[i])) {
                case 200:
                    str.push("<div class='Skill' style='top:4px;left:4px;background:url(res/leichong/200.png) no-repeat;'></div>");
                    str.push("<div class='DefaultFont_14 RedFont' style='top:6px;left:47px;line-height:18px;'>银币<br />×" + rewardnumlist[i] + "</div>");
                    break;
                case 300:
                    str.push("<div class='Skill' style='top:4px;left:4px;background:url(res/leichong/300.png) no-repeat;'></div>");
                    str.push("<div class='DefaultFont_14 RedFont' style='top:6px;left:47px;line-height:18px;'>军功<br />×" + rewardnumlist[i] + "</div>");
                    break;
                case 600:
                    str.push("<div class='Skill' style='top:4px;left:4px;background:url(res/leichong/600.png) no-repeat;'></div>");
                    str.push("<div class='DefaultFont_14 RedFont' style='top:6px;left:47px;line-height:18px;'>萌币<br />×" + rewardnumlist[i] + "</div>");
                    break;
                default:
                    for (var m = 0; m < GoodsJson.data.length; m++) {
                        if (GoodsJson.data[m].ItemID == Number(rewarelist[i])) {
                            str.push("<div class='Skill' ontouchmove='move()' ontouchstart='begin()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ShowGoodsInfo(" + len + "," + m + ");' style='top:4px;left:4px;background:url(res/Goods/" + GoodsJson.data[m].ImgID + ".png) no-repeat;background-size:40px 40px;'></div>");
                            str.push("<div class='DefaultFont_14 RedFont' style='top:6px;left:47px;line-height:18px;'>" + GoodsJson.data[m].Name + "<br />×" + rewardnumlist[i] + "</div>");
                            break;
                        }
                    }
                    break;
            }
            str.push("</div>");
            left += 142;
            if ((len + 1) % 2 == 0) {
                left = 142;
                top += 54;
            }
            len++;
        }
    }

    str.push("<div class='DefaultFont_14 RedFont' style='top:225px;left:142px;width:277px;line-height:18px;'>" + CumulationRechargeJson.data.datalist[index].detail + "</div>");
    if (CumulationRechargeJson.data.datalist[index].nop <= CumulationRechargeJson.data.totalNum) {
        if (CumulationRechargeJson.data.datalist[index].isReceive)
            str.push("<div class='ButtonOther' style='width:66px;height:42px;background:url(res/leichong/Share_Label.png) no-repeat;top:260px;left:230px;'></div>");
        else
            str.push("<div class='ButtonOther' id='ShareRwbtn" + index + "' ontouchmove='move()' ontouchstart='begin()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) C_R_Reward(" + index + ");' style='width:60px;height:38px;background:url(res/leichong/Share_But1.png) no-repeat;top:267px;left:240px;'></div>");
    }
    else {
        str.push("<div class='ButtonOther' style='width:60px;height:38px;background:url(res/leichong/Share_But2.png) no-repeat;top:267px;left:240px;'></div>");
    }
    $("#rewardBox").html(str.join(""));
}

//领取累充奖领(推送C_R_RewardResert)
var C_R_Reward= function (index) {
    window.GameMainClass.sendRequestJson(1125, '{"objNum":' + CumulationRechargeJson.data.datalist[index].nop + '}', "C_R_RewardResert");
}
//显示物品详情(累充的)
var ShowGoodsInfo= function (pos, GoodsIndex) {
    $("#showData").remove();
    if (showgoodstime1 != null) {
        clearTimeout(showgoodstime1);
        clearTimeout(showgoodstime2);
    }
    var top = $("#rwbox" + pos).offset().top;
    var left = $("#rwbox" + pos).offset().left;

    if (pos % 2 == 0) {
        left += 100;
    }
    else
        left -= 170;

    if (pos > 3)
        top -= 50;

    var str = new Array();

    var h = GoodsJson[GoodsIndex].detail.length / 9 + (GoodsJson[GoodsIndex].detail.length % 9 == 0 ? 0 : 1);

    h = (h + 5) * 17;
    var namecolor = "#ffffff";
    switch (GoodsJson[GoodsIndex].NColor) {
        case 1:
            namecolor = "#00CCFF"
            break;
        case 2:
            namecolor = "#FF00FF";
            break;
        case 3:
            namecolor = "#FF0000";
            break;
        case 4:
            namecolor = "#FFFF00";
            break;
    }

    var type = "", job = "", val = 0, type2 = "";

    switch (GoodsJson[GoodsIndex].Njob) {
        case 1:
            job = '战士';
            break;
        case 2:
            job = '射手';
            break;
        case 3:
            job = '谋士';
            break;
        default:
            job = '';
            break;
    }

    switch (GoodsJson[GoodsIndex].iType) {
        case 2:
            type = '头盔';
            type2 = "生命";
            val = GoodsJson[GoodsIndex].hpBonus;
            job = '全职业';
            break;
        case 3:
            type = '盔甲';
            type2 = "防御";
            val = GoodsJson[GoodsIndex].defBonus;
            job = '全职业';
            break;
        case 1:
            type = '武器';
            type2 = "攻击";
            val = GoodsJson[GoodsIndex].atkBonus;
            break;
        case 4:
            type = '宝物';
            type2 = "生命";
            val = GoodsJson[GoodsIndex].hpBonus; //WarhoushJson.data[0].GoodsList[itemindex].hpBonus;
            job = '全职业';
            break;
        case 5:
            type = '技能书';
            break;
        case 6:
            type = '材料';
            break;
        case 7:
            type = '兑换品';
            break;
        case 8:
            type = '武魂';
            break;
        case 9:
            type = '碎片';
            break;
        case 10:
            type = '经验书';
            break;
        case 11:
            type = '美酒';
            break;
        case 20:
            type = '钱袋';
            break;
        case 21:
            type = '军功薄';
            break;
        case 22:
            type = '行动包';
            break;
        case 23:
            type = '礼包';
            break;
        case 24:
            type = '武将包';
            break;
        case 25:
            type = "武魂包";
            break;
        case 26:
            type = "宝物箱";
            break;
        case 27:
            type = "宝石箱";
            break;
        case 28:
            type = "福袋";
            break;
        case 29:
            type = "装备箱";
            break;

    }
    str.push("<div id='showData' style='top:" + top + "px;left:" + left + "px;z-index:35;'>");
    str.push("<div id='HeroDataMessageClose' style='left:115px;'><a href='javascript:void(0);' ontouchmove='move()' ontouchstart='begin()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5){ $(\"#showData\").remove();clearTimeout(showgoodstime1);clearTimeout(showgoodstime2);}'></a></div>");
    str.push("<div id='showDataUp'></div>");
    str.push("<div id='showDataCenter' >");
    str.push("<table width='93%'>");
    str.push("<tr><td style='color:" + namecolor + ";'>" + GoodsJson[GoodsIndex].IName + "</td></tr>");
    str.push("<tr><td>类型:<font style='color:#E4BA5D'>" + type + "</font></td></tr>");
    if (GoodsJson[GoodsIndex].NLv > 0)
        str.push("<tr><td>等级:<font style='color:#E4BA5D'>武将" + GoodsJson[GoodsIndex].NLv + "级</font></td></tr>");
    if (type2 != 0)
        str.push("<tr><td>" + type2 + ":<font style='color:#E4BA5D'>" + val + "</font></td></tr>");

    str.push("<tr><td>描述:</td></tr>");
    str.push("<tr><td style='color:#E4BA5D'>" + GoodsJson[GoodsIndex].detail + "</td></tr></table>");
    str.push("</div>");
    str.push("<div id='showDataDown' ></div>");
    str.push("</div>");

    var divnode = document.createElement("div");
    divnode.innerHTML = str.join("");
    document.getElementById("dialogMain").appendChild(divnode);

    var satime = 1;
    showgoodstime1 = setInterval(function () {
        satime++;
        if (satime == 25) {
            clearTimeout(showgoodstime1);
            var i = 100;
            showgoodstime2 = setInterval(function () {
                i--;
                document.getElementById("showData").style.filter = "Alpha(Opacity=" + i + ")"; //for IE	
                document.getElementById("showData").style.opacity = i / 100; //for FF

                if (i == 0) {
                    clearTimeout(showgoodstime2);
                    $("#showData").remove();
                }

            }, 20);

        }
    }, 100);
}

//显示物品信息(小物品的点击的详细信息-->类型,等级,攻击,描述等)
var ShowGoodsData=function(pos, GoodsIndex) {
    $("#showData").remove();
    if (showgoodstime1 != null) {
        clearTimeout(showgoodstime1);
        clearTimeout(showgoodstime2);
    }
    var top = $("#lritem" + pos).offset().top;
    var left = $("#lritem" + pos).offset().left;
    var str = new Array();

    var h = GoodsJson[GoodsIndex].detail.length / 9 + (GoodsJson[GoodsIndex].detail.length % 9 == 0 ? 0 : 1);

    h = (h + 5) * 17;
    var namecolor = "#ffffff";
    switch (GoodsJson[GoodsIndex].NColor) {
        case 1:
            namecolor = "#00CCFF"
            break;
        case 2:
            namecolor = "#FF00FF";
            break;
        case 3:
            namecolor = "#FF0000";
            break;
        case 4:
            namecolor = "#FFFF00";
            break;
    }

    var type = "", job = "", val = 0, type2 = "";

    switch (GoodsJson[GoodsIndex].Njob) {
        case 1:
            job = '战士';
            break;
        case 2:
            job = '射手';
            break;
        case 3:
            job = '谋士';
            break;
        default:
            job = '';
            break;
    }

    switch (GoodsJson[GoodsIndex].iType) {
        case 2:
            type = '头盔';
            type2 = "防御";
            val = GoodsJson[GoodsIndex].hpBonus;
            job = '全职业';
            break;
        case 3:
            type = '盔甲';
            type2 = "防御";
            val = GoodsJson[GoodsIndex].defBonus;
            job = '全职业';
            break;
        case 1:
            type = '武器';
            type2 = "攻击";
            val = GoodsJson[GoodsIndex].atkBonus;
            break;
        case 4:
            type = '宝物';
            type2 = "生命";
            val = 0; //WarhoushJson.data[0].GoodsList[itemindex].hpBonus;
            job = '全职业';
            break;
        case 5:
            type = '技能书';
            break;
        case 6:
            type = '材料';
            break;
        case 7:
            type = '兑换品';
            break;
        case 8:
            type = '武魂';
            break;
        case 9:
            type = '碎片';
            break;
        case 10:
            type = '经验书';
            break;
        case 11:
            type = '美酒';
            break;
        case 20:
            type = '钱袋';
            break;
        case 21:
            type = '军功薄';
            break;
        case 22:
            type = '行动包';
            break;
        case 23:
            type = '礼包';
            break;
        case 24:
            type = '武将包';
            break;
        case 25:
            type = "武魂包";
            break;
        case 26:
            type = "宝物箱";
            break;
        case 27:
            type = "宝石箱";
            break;
        case 28:
            type = "福袋";
            break;
        case 29:
            type = "装备箱";
            break;
    }

    if (pos % 3 == 0)
        left += 30;
    else
        left -= 170;

    top -= 30;
    if (pos > 5)
        top = 10;

    str.push("<div id='showData' style='" + (pos <= 5 ? "top" : "bottom") + ":" + top + "px;left:" + left + "px;z-index:35;'>");
    str.push("<div id='HeroDataMessageClose' style='left:115px;'><a href='javascript:void(0);' ontouchmove='move()' ontouchstart='begin()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5){ $(\"#showData\").remove();clearTimeout(showgoodstime1);clearTimeout(showgoodstime2);}'></a></div>");
    str.push("<div id='showDataUp'></div>");
    str.push("<div id='showDataCenter' >");
    str.push("<table width='93%'>");
    str.push("<tr><td style='color:" + namecolor + ";'>" + GoodsJson[GoodsIndex].IName + "</td></tr>");
    str.push("<tr><td>类型：<font style='color:#E4BA5D'>" + type + "</font></td></tr>");
    if (GoodsJson[GoodsIndex].NLv > 0)
        str.push("<tr><td>等级：<font style='color:#E4BA5D'>武将" + GoodsJson[GoodsIndex].NLv + "级</font></td></tr>");
    if (type2 != 0)
        str.push("<tr><td>" + type2 + ":<font style='color:#E4BA5D'>" + val + "</font></td></tr>");

    str.push("<tr><td>描述：</td></tr>");
    str.push("<tr><td style='color:#E4BA5D'>" + GoodsJson[GoodsIndex].detail + "</td></tr></table>");
    str.push("</div>");
    str.push("<div id='showDataDown' ></div>");
    str.push("</div>");

    var divnode = document.createElement("div");
    divnode.innerHTML = str.join("");
    document.getElementById("dialogMain").appendChild(divnode);

    var satime = 1;
    showgoodstime1 = setInterval(function () {
        satime++;
        if (satime == 25) {
            clearTimeout(showgoodstime1);
            var i = 100;
            showgoodstime2 = setInterval(function () {
                i--;
                document.getElementById("showData").style.filter = "Alpha(Opacity=" + i + ")"; //for IE	
                document.getElementById("showData").style.opacity = i / 100; //for FF

                if (i == 0) {
                    clearTimeout(showgoodstime2);
                    $("#showData").remove();
                }

            }, 20);
        }
    }, 100);
}

//领取首充奖励
function C_R_RewardResert(json) {
    var BackJson = JSON.parse(json);
    if (BackJson.resert == 1) {

        //添加物品到背包
        if (BackJson.data) {
            for (var i = 0; i < BackJson.data.length; i++) {
                bagJson.data.push(BackJson.data[i]);
            }
        }


        //添加用户数据
        var tempItem = BackJson.reward.item.split(",");
        var tempNum = BackJson.reward.num.split(",");
        for (var i = 0; i < tempItem.length; i++) {
            updateUserJson(tempItem[i], tempNum[i]);
        }

        for (var i = 0; i < CumulationRechargeJson.data.datalist.length; i++) {
            if (CumulationRechargeJson.data.datalist[i].nop == BackJson.Client[0].objNum) {
                CumulationRechargeJson.data.datalist[i].isReceive = true;
                ShowC_R_Reward(i);
                $("#ShareRwbtn" + i).remove();
                var ss = "<div class='ButtonOther' style='width:66px;height:42px;background:url(res/leichong/Share_Label.png) no-repeat;top:267px;left:240px;'></div>";
                var divnode = document.createElement("div");
                divnode.innerHTML = ss;
                document.getElementById("rewardBox").appendChild(divnode);
                break;
            }
        }
        ShowRewardDialog(JSON.stringify(BackJson.rewardjson));
    }
    else
        showTextMess(BackJson.info, BackJson.resert);
}