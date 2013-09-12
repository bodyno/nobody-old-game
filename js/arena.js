/// <reference path="json.js" />
/// <reference path="team.js" />
/// <reference path="json.js" />
/// <reference path="jquery-1.5.1.min.js" />

//var arenaJson = { "Client": [{ "channelid": 1000, "amount": 100 }], "canrecv": 2, "data": [{ "glv": 1, "head": 5152, "lv": 30, "nick": "管妍", "q": 2, "rank": 305, "uid": 10174585 }, { "glv": 3, "head": 8000, "lv": 17, "nick": "郁乐", "q": 1, "rank": 309, "uid": 10137801 }, { "glv": 15, "head": 1761, "lv": 15, "nick": "阮琬", "q": 2, "rank": 314, "uid": 10148317 }, { "glv": 1, "head": 5252, "lv": 25, "nick": "许栋伊", "q": 2, "rank": 318, "uid": 10138530 }], "fame": 50080, "gold": 5, "honor": 620, "leftbuy": 0, "leftnum": 12, "leftsecs": 0, "nLeftRefresh": 3, "nowrank": 322, "rate": "100%", "record": "1胜0负", "rwstr": "银币+5k,声望+20,荣誉+20" };
//var rankJson = { "data": [{ "head": 1003, "lv": 21, "nick": "杜莺", "q": 3, "rank": 1, "rate": "44", "uid": 10145544 }, { "head": 1003, "lv": 21, "nick": "杜莺", "q": 3, "rank": 1, "rate": "44", "uid": 10145544 }, { "head": 1003, "lv": 21, "nick": "杜莺", "q": 3, "rank": 1, "rate": "44", "uid": 10145544 }, { "head": 1003, "lv": 21, "nick": "杜莺", "q": 3, "rank": 1, "rate": "44", "uid": 10145544 }, { "head": 1003, "lv": 21, "nick": "杜莺", "q": 3, "rank": 1, "rate": "44", "uid": 10145544 }, { "head": 1003, "lv": 21, "nick": "杜莺", "q": 3, "rank": 1, "rate": "44", "uid": 10145544 }, { "head": 1003, "lv": 21, "nick": "杜莺", "q": 3, "rank": 1, "rate": "44", "uid": 10145544 }, { "head": 1003, "lv": 21, "nick": "杜莺", "q": 3, "rank": 1, "rate": "44", "uid": 10145544 }, { "head": 1003, "lv": 21, "nick": "杜莺", "q": 3, "rank": 1, "rate": "44", "uid": 10145544 }, { "head": 1003, "lv": 21, "nick": "杜莺", "q": 3, "rank": 1, "rate": "44", "uid": 10145544 }, { "head": 1003, "lv": 21, "nick": "杜莺", "q": 3, "rank": 1, "rate": "44", "uid": 10145544 }, { "head": 1003, "lv": 21, "nick": "杜莺", "q": 3, "rank": 1, "rate": "44", "uid": 10145544 }, { "head": 1001, "lv": 31, "nick": "小徐", "q": 2, "rank": 2, "rate": "20", "uid": 10161428 }] };
//var honorGoodJson={"data":[{"honor":200,"itemid":2001,"num":1},{"honor":201,"itemid":2012,"num":1},{"honor":202,"itemid":2023,"num":1},{"honor":203,"itemid":2034,"num":1},{"honor":204,"itemid":2045,"num":1},{"honor":205,"itemid":2056,"num":1},{"honor":206,"itemid":2067,"num":1}]};

var arenaJson;
var rankJson;
var honorGoodJson;

var arenaTime;

//竞技场
var showArena = function () {
    $("#dialog").html("<div id='arena'><div id='title'><div id='titleLeft'></div><div id='titleCenter'><div id='titleContext'style='background-image:url(res/public/title/22.png)'></div></div><div id='titleRight'></div></div><div id='waikuan'><div id='shangjiao'class='jiao shangjiao'></div><div id='xiajiao'class='jiao xiajiao'></div><div id='zuojiao'class='jiao zuojiao'></div><div id='youjiao'class='jiao youjiao'></div><div class='shangwaibian'></div><div class='xiawaibian'></div><div class='zuowaibian'></div><div class='youwaibian'></div></div><div id='close'></div><div id='rope'></div><div id='arenaDialog'><div id='a_user'><div id='a_user_head'><div id='a_user_me_lv'>" + getLv(userJson.lv) + "</div><div id='a_user_img'></div><div id='a_user_bg'></div></div><div id='a_user_time'>挑战时间CD:<div id='a_user_timeContent'>00:00:05</div></div><div id='a_user_name'></div><div id='a_user_lv'>等级:<font class='arena_font'></font></div><div id='a_user_pos'>官职:<font class='arena_font'></font></div></div><div id='a_rank'><div id='a_user_rate'>胜率:<font class='arena_font'></font></div><div id='a_user_fame'>声望:<font class='arena_font'></font></div><div id='a_user_hono'>荣誉:<font class='arena_font'></font></div><div id='a_user_record'>战绩:<font class='arena_font'></font></div><div id='a_rank_rank'>排行名次:第<font class='arena_font'style='color:#26E50E;'></font>名</div><div id='a_rank_coin'>奖励:<font class='arena_font'></font></div><div id='a_rank_num'>今日挑战剩余次数:<font class='arena_font'></font></div></div><div id='bugArena'></div><div id='a_icon'><div id='a_user_reward'></div><div id='a_shop'></div><div id='a_user_rank'></div><div id='a_rule'></div></div><div id='a_enemy'><div class='swiper-container arena_Swiper'><div class='swiper-wrapper'><div id='a_enemy_list'></div></div></div></div></div><div id='arenaFresh'>刷新次数:<font style='color:#26E50E;'></font></div><div id='arenaBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>刷新对手</div><div class='btn3'></div></div></div><div id='heroequip_something' style='font-size: 16px;top: 72px;'><img src='res/public/care.png' style='vertical-align:middle;float:left;top:4px;position: relative;margin-right: 7px;' /><div style='float:left;'>VIP7开启挑战无CD时间功能。<br/>每天可领取奖励1次，以21点半统计排名为准。</div></div></div>");
    $("#mask").show();

    $("#arena").css("top", (height - 480) / 2);
    if (pad)
        $("#arena").css({ "top": ((height - 470 * sp) / 2) / sp });

    var div = $("#a_user");

    //加载自己的头像
    for (var i = 0; i < heroJson.data.length; i++) {
        var tempSplit = heroJson.data[i].g.split(",");
        if (tempSplit[10] == teamJson.data[2].g) {
            div.find("#a_user_img").css("background-image", "url(res/head/" + tempSplit[15] + ".png)");
            div.find("#a_user_bg").css("background-image", "url(res/head/" + tempSplit[8] + ".png)");
            break;
        }
    }

    //挑战剩余时间
    if (arenaJson.leftnum <= 0) {
        $("#a_user_time").css("color", "red").html("不可挑战!<div id='a_user_timeContent'></div>");
    } else{
        if (userJson.vip > 6) {
            $("#a_user_time").css("color", "#26E50E").html("可以挑战!<div id='a_user_timeContent'></div>");
        }
        else {
            clearInterval(arenaTime);
            if (arenaJson.leftsecs > 0) {
                arenaTime = setInterval(function () {
                    if (arenaJson.leftsecs <= 0) {
                        $("#a_user_time").css("color", "#26E50E").html("可以挑战!<div id='a_user_timeContent'></div>");
                        clearInterval(arenaTime);
                    } else {
                        arenaJson.leftsecs--;
                        $("#a_user_timeContent").text(expireTime(arenaJson.leftsecs));
                    }
                }, 1000)
            }
            else {
                $("#a_user_time").css("color", "#26E50E").html("可以挑战!<div id='a_user_timeContent'></div>");
            }
        }
    }
    


    div.find("#a_user_name").text(userJson.nick);
    div.find("#a_user_lv .arena_font").text(userJson.lv);
    div.find("#a_user_pos .arena_font").text(localPosReward.data[userJson.position - 1].name);

    div = $("#a_rank");
    //排名
    div.find("#a_user_record .arena_font").text(arenaJson.record);
    div.find("#a_user_rate .arena_font").text(arenaJson.rate);
    div.find("#a_user_fame .arena_font").text(userJson.fame);
    div.find("#a_user_hono .arena_font").text(arenaJson.honor);
    div.find("#a_rank_num .arena_font").text(arenaJson.leftnum);
    div.find("#a_rank_rank .arena_font").text(arenaJson.nowrank);
    div.find("#a_rank_coin .arena_font").html(arenaJson.rwstr.replace(/,/g, "<br/>")).css("color", "yellow");
    loadArenaEnemy();

    $("#arenaFresh>font").text(arenaJson.nLeftRefresh + "次");

    if (arenaJson.nLeftRefresh <= 0) {
        $("#arenaBtn").children().attr("class", "abtn");
    }

    $("#bugArena").bind("touchend", function () {
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        var maskDiv = document.createElement("div");
        maskDiv.id = "tempMask";
        $(maskDiv).css({ "width": width, "height": height, "top": "0" });
        document.body.appendChild(maskDiv);
        
        if (arenaJson.leftbuy == 0) {
            $("#temp").html("<div id='mess3'><div id='q_title'style='left:70px;'><div id='q_titleLeft'></div><div id='q_titleCenter'><div id='q_titleContext'style='background-image:url(res/public/title/31.png);'></div></div><div id='q_titleRight'></div></div><div id='t_waikuan'><div class='q_jiao q_shangjiao'></div><div class='q_jiao q_xiajiao'></div><div class='q_jiao q_zuojiao'></div><div class='q_jiao q_youjiao'></div><div class='q_shangwaibian'></div><div class='q_xiawaibian'></div><div class='q_zuowaibian'></div><div class='q_youwaibian'></div></div><div id='dialogclose'></div><div id='rope'></div><div id='tempDialog3'><div id='lottery_content3'>今日还可购买<font style='color:#26E50E;'>" + arenaJson.leftbuy + "</font>次比武场挑战数<br/>可以购买次数不足,提升VIP等级可购买更多次</div></div><div id='shopOkBtn'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>充值</div><div class='btn3'></div></div></div><div id='shopCancelBtn'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>取消</div><div class='btn3'></div></div></div></div>");
        }
        else {
            $("#temp").html("<div id='mess3'><div id='q_title'><div id='q_titleLeft'style='left:70px;'></div><div id='q_titleCenter'><div id='q_titleContext'style='background-image:url(res/public/title/31.png);'></div></div><div id='q_titleRight'></div></div><div id='t_waikuan'><div class='q_jiao q_shangjiao'></div><div class='q_jiao q_xiajiao'></div><div class='q_jiao q_zuojiao'></div><div class='q_jiao q_youjiao'></div><div class='q_shangwaibian'></div><div class='q_xiawaibian'></div><div class='q_zuowaibian'></div><div class='q_youwaibian'></div></div><div id='dialogclose'></div><div id='rope'></div><div id='tempDialog3'><div id='lottery_content3'>今日还可购买<font style='color:#26E50E;'>" + arenaJson.leftbuy + "</font>次比武场挑战数<br/>是否花费<font style='color:#26E50E;'>" + arenaJson.gold + "</font>萌币,增加一次比武挑战数?</div></div><div id='shopOkBtn'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>购买</div><div class='btn3'></div></div></div><div id='shopCancelBtn'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>取消</div><div class='btn3'></div></div></div></div>");
        }
        
        $("#mess3").css({ "left": (width - 476) / 2, "top": (height - 280) / 2 });
        if (pad) $("#mess3").css({ "zoom": sp, "left": (width - 476 * sp) / 2 / sp, "top": (height - 280 * sp) / 2 / sp });

        //绑定事件
        $("#shopCancelBtn,#dialogclose").bind("touchend", function () {
            $(this).css({ "-webkit-transform": "scale(1)" });
            if (cancel())
                return;
            window.GameMainClass.playEffectSound("close");
            $("#temp").html("");
            $("#tempMask").remove();
        }).bind("touchstart", function () {
            $(this).css({ "-webkit-transform": "scale(0.8)" });
            begin();
        }).bind("touchmove", function () {
            $(this).css({ "-webkit-transform": "scale(1)" });
            move();
        })

        //绑定购买事件
        $("#shopOkBtn").bind("touchend", function () {
            $(this).css({ "-webkit-transform": "scale(1)" });
            if (cancel())
                return;
            window.GameMainClass.playEffectSound("icon");
            //判断萌币是否足够
            if (arenaJson.leftbuy == 0) {
                loadRecharge();
                //showTextMess("充值暂未开启", 2);
                return;
            }
            if (userJson.gold < arenaJson.gold) {
                showTextMess("萌币不足", 2);
                return;
            }
            window.GameMainClass.sendRequestJson(153, "", "bugArenaTime");
        }).bind("touchstart", function () {
            $(this).css({ "-webkit-transform": "scale(0.8)" });
            begin();
        }).bind("touchmove", function () {
            $(this).css({ "-webkit-transform": "scale(1)" });
            move();
        })
    })

    //挑战竞技场事件
    $(".arena_bg").bind("touchend", function () {
        if (cancel())
            return;
        $(this).css("-webkit-transform", "scale(0.8)");
    }).bind("touchstart", function () {
        begin();
        $(this).css("-webkit-transform", "scale(1)");
        showArenaHome($(this).parent().index())
    }).bind("touchmove", function () {
        move();
    })

    //显示战榜
    $("#a_user_rank").bind("touchend", function () {
        $(this).css({ "background-position-x": "0", "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        loadRank();
    }).bind("touchstart", function () {
        $(this).css({ "background-position-x": "-60px", "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "background-position-x": "0", "-webkit-transform": "scale(1)" });
        move();
    })

    //显示领奖信息
    $("#a_rule").bind("touchend", function () {
        $(this).css({ "background-position-x": "0", "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        loadArenaReward();
    }).bind("touchstart", function () {
        $(this).css({ "background-position-x": "-60px", "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "background-position-x": "0", "-webkit-transform": "scale(1)" });
        move();
    })

    //领奖按钮是否可用

    switch (arenaJson.canrecv) {
        case 0:
            $("#a_user_reward").removeAttr("can").css("background-position", "-60px");
            break;
        case 1:
            $("#a_user_reward").attr("can", true);
            break;
        case 2:
            $("#a_user_reward").removeAttr("can").css("background-position", "-60px").append("<div id='arenaRewardOk'></div>");
            break;
    }

    //领奖
    $("#a_user_reward").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        if ($(this).attr("can")) {
            window.GameMainClass.sendRequestJson(135, "", "arenaReward");
        }
    }).bindAnimate();

    //关闭事件
    $("#close").bind("touchend", function () {
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
    
    $("#a_shop").bind("touchend", function () {
        $(this).css({ "background-position-x": "0", "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        if (honorGoodJson == null) {
            window.GameMainClass.sendRequestJson(137, "", "setHonorJson");
        } else {
            showHonorShop();
        }
    }).bind("touchstart", function () {
        begin();
        $(this).css({ "background-position-x": "-60px", "-webkit-transform": "scale(0.8)" });
    }).bind("touchmove", function () {
        move();
        $(this).css({ "background-position-x": "0", "-webkit-transform": "scale(1)" });
    })

    $("#arenaBtn").bind("touchend", function () {
        $(this).css({ "background-position-x": "0", "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        if (arenaJson.nLeftRefresh <= 0)
            showTextMess("没有可刷新的次数", 2);
        window.GameMainClass.sendRequestJson(152, "", "arenaFresh");
    }).bind("touchstart", function () {
        begin();
        $(this).css({ "background-position-x": "-60px", "-webkit-transform": "scale(0.8)" });
    }).bind("touchmove", function () {
        move();
        $(this).css({ "background-position-x": "0", "-webkit-transform": "scale(1)" });
    })
}

var arenaFresh = function (json) {
    var tempJson = JSON.parse(json);
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
    }
    else {
        arenaJson.data = tempJson.data;
        loadArenaEnemy();
        arenaJson.nLeftRefresh--;

        if (arenaJson.nLeftRefresh <= 0) {
            $("#arenaBtn").children().attr("class", "abtn");
        }

        $("#arenaFresh>font").text(arenaJson.nLeftRefresh + "次");

        showTextMess("刷新对手成功", 1);
    }
}

var loadArenaEnemy = function () {
    //对手列表
    div = $("#a_enemy .swiper-wrapper");
    div.html("");
    for (var i = 0; i < arenaJson.data.length; i++) {
        var divnode = document.createElement("div");
        divnode.className = "swiper-slide arena-slide";
        divnode.innerHTML = "<div class='a_enemy_item' rank='" + arenaJson.data[i].rank + "' uid='" + arenaJson.data[i].uid + "'><div class='a_enemy_bg1'></div><div class='a_enemy_bg2'></div><div class='a_enemy_rank'>" + arenaJson.data[i].rank + "</div><div class='a_enemy_head'><div class='heroLv'>" + getLv(arenaJson.data[i].glv) + "</div><div class='a_enemy_img'></div><div class='a_enemy_bg'></div></div><div class='a_enemy_data'><font style='color:#26E50E;'>" + arenaJson.data[i].nick + "</font><br/>等级:<font style='color:yellow;'>" + arenaJson.data[i].lv + "</font></div><div id='a_enemy_btn'class='shopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>挑战</div><div class='btn3'></div></div></div></div>";

        //头像 资质
        $(divnode).find(".a_enemy_img").css("background-image", "url(res/head/" + arenaJson.data[i].head + ".png)");
        $(divnode).find(".a_enemy_bg").css("background-image", "url(res/head/" + arenaJson.data[i].q + ".png)");

        div.append(divnode);
    }

    $(".shopBtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        //先服务器判断
        if (arenaJson.leftsecs > 0) {
            showTextMess("挑战冷却时间未到", 2);
            return;
        }
        if (arenaJson.leftnum <= 0) {
            showTextMess("没有可挑战的次数", 2);
            return;
        }
        window.GameMainClass.sendRequestJson(134, '{"uid":' + $(this).parent().attr("uid") + ',"rank":' + $(this).parent().attr("rank") + '}', "canArenaBack");
    }).bind("touchstart", function () {
        begin();
        $(this).css({ "-webkit-transform": "scale(0.8)" });
    }).bind("touchmove", function () {
        move();
        $(this).css({ "-webkit-transform": "scale(1)" });
    })

    var arenaSwiper = new Swiper('.arena_Swiper', {
        mode: 'vertical',
        slidesPerSlide: 4
    });
}

//判断是否需要重新刷新界面
var canArenaBack = function (json) {
    var tempJson = JSON.parse(json);
    //var tempJson = { "Client": [{ "uid": 10154969, "rank": 28 }], "info": "DM10已经抢占了这个排名，是否与TA一战?", "outuid": 10163884, "resert": 2 };
    if (tempJson.resert == 0) {
        showTextMess(tempJson.info, 2);
        return;
    }
    if (tempJson.resert == 2) {
        //是否继续挑战
        var maskDiv = document.createElement("div");
        maskDiv.id = "tempMask";
        $(maskDiv).css({ "width": width, "height": height, "top": "0" });
        document.body.appendChild(maskDiv);

        $("#temp").html("<div id='mess2'><div id='m_title'><div id='m_titleLeft'></div><div id='m_titleCenter'><div id='m_titleContext'></div></div><div id='m_titleRight'></div></div><div id='m_waikuan'><div class='m_jiao m_shangjiao'></div><div class='m_jiao m_xiajiao'></div><div class='m_jiao m_zuojiao'></div><div class='m_jiao m_youjiao'></div><div class='m_shangwaibian'></div><div class='m_xiawaibian'></div><div class='m_zuowaibian'></div><div class='m_youwaibian'></div></div><div id='dialogclose'></div><div id='tempDialog2'><div id='friendFont'style='color:#26E50E;'>" + tempJson.info + "</div></div><div id='friendDelete'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>挑战</div><div class='btn3'></div></div></div><div id='friendCancel'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>取消</div><div class='btn3'></div></div></div></div>");
        $("#mess2").css({ "left": (width - 476) / 2, "top": (height - 279) / 2 });
        if (pad) {
            $("#mess2").css({ "zoom": sp, "left": (width - 476 * sp) / 2 / sp, "top": (height - 279 * sp) / 2 / sp });
        }

        var tempSend = '{"uid":' + tempJson.outuid + ',"rank":' + tempJson.Client[0].rank + '}';

        //绑定确定
        $("#friendDelete").bind("touchend", function () {
            window.GameMainClass.sendRequestJson(134, tempSend, "canArenaBack");
        })

        //绑定关闭
        $("#dialogclose,#friendCancel").bind("touchend", function () {
            $("#tempMask").remove();
            $("#temp").html("");
        })
        return;
    }
    window.GameMainClass.startBattle(134, json, "arenaFightBack");
    $("#tempMask").remove();
    $("#temp").html("");
}

var setHonorJson = function (json) {
    honorGoodJson = JSON.parse(json);
    showHonorShop();
}

var loadArena = function () {
    if (arenaJson == null) {
        window.GameMainClass.sendRequestJson(132, "", "setArenaJson");
    }
    else {
        showArena();
    }
}

var setArenaJson = function (json) {
    arenaJson = JSON.parse(json);
    
    remainJson.arena = arenaJson.leftnum;
    $("#b_arena").html("").append("<div class='iconLight'>" + remainJson.arena + "</div>");

    if (arenaJson.Client) {

    }
    else {
        showArena();
    }
}

var arenaReward = function (json) {
    var tempJson = JSON.parse(json);
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
    }
    else {
        $("#a_user_reward").removeAttr("can").css("background-position", "-60px").append("<div id='arenaRewardOk'></div>");
        iGetReward(tempJson);
        $("#a_user_hono>font").text(arenaJson.honor);
        $("#a_user_fame>font").text(userJson.fame);
        showGetItemAnimate2(tempJson);

        arenaJson.canrecv = 2;
    }
}

var loadRank = function () {
    if (rankJson == null) {
        window.GameMainClass.sendRequestJson(136, "", "setRankJson");
    }
    else {
        showRank();
    }
}

//显示战神榜
var showRank = function () {
    var maskDiv = document.createElement("div");
    maskDiv.id = "tempMask";
    $(maskDiv).css({ "width": width, "height": height, "top": "0" });
    document.body.appendChild(maskDiv);

    var div = document.createElement("div");
    div.id = "rankDialog";
    div.innerHTML = "<div id='rankTitle'></div><div id='ac_left'></div><div id='ac_right'style='left:500px;'></div><div id='rankClose'></div><div class='swiper-container rank_Swiper'style='position:absolute;left:60px;top:65px;'><div class='swiper-wrapper'></div></div>";

    document.body.appendChild(div);
    $(div).css({ "left": (width - 580) / 2, "top": (height - 460) / 2 });

    if (pad) $(div).css({ "zoom": sp, "left": (width - 580 * sp) / 2 / sp, "top": (height - 460 * sp) / 2 / sp });


    var tempDiv = $("#rankDialog .swiper-wrapper");
    var divNode;
    var tempPage = 0;
    var tempIndex = 0;
    divNode = document.createElement("div");
    divNode.className = 'swiper-slide rank-slide';
    divNode.id = 'rank_slide0';
    tempDiv.append(divNode);
    //加载列表
    for (var i = 0; i < rankJson.data.length; i++) {
        if (tempIndex == 4) {
            tempPage++;
            divNode = document.createElement("div");
            divNode.className = 'swiper-slide rank-slide';
            divNode.id = 'rank_slide' + tempPage;
            tempDiv.append(divNode);
            tempIndex = 0;
        }
        $("#rank_slide" + tempPage).append("<div class='rank_item'><div class='a_enemy_bg1'></div><div class='a_enemy_bg2'style='left:155px;'></div><div class='a_enemy_rank'>" + rankJson.data[i].rank + "</div><div class='a_enemy_head'style='left:70px;'><div class='a_enemy_img'style='background-image:url(res/head/" + rankJson.data[i].head + ".png)'></div><div class='a_enemy_bg'style='background-image:url(res/head/" + rankJson.data[i].q + ".png)'></div></div><div class='a_enemy_data'style='left:173px;'><font style='color:#26E50E;'>" + rankJson.data[i].nick + "</font><br/>等级:<font style='color:yellow;'>" + rankJson.data[i].lv + "</font></div><div class='rank_rate'>胜率:" + rankJson.data[i].rate + "</div></div>");
        tempIndex++;
    }

    //加载滚动条
    var rankSwiper = new Swiper('.rank_Swiper', {
        mode: 'horizontal'
    });


    //绑定关闭事件
    $("#rankClose").bind("touchend", function () {
        if (!cancel()) {
            $("#rankDialog").remove();
            $("#tempMask").remove();
            window.GameMainClass.playEffectSound("close");
        }
        $(this).css({ "-webkit-transform": "scale(1)" });
    }).bind("touchmove", function () {
        move();
        $(this).css({ "-webkit-transform": "scale(1)" });
    }).bind("touchstart", function () {
        begin();
        $(this).css({ "-webkit-transform": "scale(0.8)" });
    })
}

//显示奖励表
var loadArenaReward = function () {
    var maskDiv = document.createElement("div");
    maskDiv.id = "tempMask";
    $(maskDiv).css({ "width": width, "height": height, "top": "0" });
    document.body.appendChild(maskDiv);

    var div = document.createElement("div");
    div.id = "rankDialog";
    div.innerHTML = "<div id='rankTitle'style='background-image:url(res/arena/title1.png);'></div><div id='rankClose'></div><div id='rankSlide'></div><div id='rankList1'><font style='color:red;'>排名</font></div><div id='rankList2'><font style='color:red;'>比武场奖励</font></div>";

    document.body.appendChild(div);
    $(div).css({ "left": (width - 580) / 2, "top": (height - 460) / 2 });

    if (pad) $(div).css({ "zoom": sp, "left": (width - 580 * sp) / 2 / sp, "top": (height - 460 * sp) / 2 / sp });

    for (var i = 0; i < localArenaReward.data.length; i++) {
        $("#rankList1").append("<br/>" + localArenaReward.data[i].rank);
        $("#rankList2").append("<br/>" + localArenaReward.data[i].reward);
    }

    //绑定关闭事件
    $("#rankClose").bind("touchend", function () {
        if (!cancel()) {
            $("#rankDialog").remove();
            $("#tempMask").remove();
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

var setRankJson = function (json) {
    rankJson = JSON.parse(json);
    showRank();
}

//挑战结果 
var arenaFightBack = function (json) {
    //var tempJson = { "Client": [{ "uid": 10154533, "rank": 4 }], "alist": [{ "color": 1, "hp": 208, "job": 3, "name": "西凉死士", "pid": "8007", "pos": 1, "sid": 3, "team": 1 }, { "color": 2, "hp": 984, "job": 2, "name": "程远志", "pid": "5002", "pos": 2, "sid": 0, "team": 0 }, { "color": 2, "hp": 743, "job": 1, "name": "刘勋", "pid": "5202", "pos": 8, "sid": 1, "team": 0 }, { "color": 1, "hp": 292, "job": 6, "name": "西凉草医", "pid": "8010", "pos": 3, "sid": 2, "team": 0 }], "boshu": 1, "data": { "battlename": "比武场", "countLv": 3, "getGlory": 10, "getRenown": 10, "gloryed": 100, "glorying": 110, "iswin": 1, "mth": "ArenaFight", "ranked": 1, "ranking": 1, "renowned": 200, "renowning": 210 }, "info": "", "mapimg": 101, "resert": 1, "round": [{ "action": [{ "a": 0, "ac": 102, "e": 50, "t": 1 }, { "a": 3, "ac": 102, "e": 25, "h": 101, "t": 2 }] }, { "action": [{ "a": 3, "ac": 104, "e": 75, "t": 1 }, { "a": 0, "ac": 104, "e": 75, "h": 229, "t": 2 }] }, { "action": [{ "a": 2, "ac": 110, "e": 50, "t": 1 }, { "a": 0, "ac": 110, "h": -178, "t": 2 }] }, { "action": [{ "a": 1, "ac": 100, "e": 50, "t": 1 }, { "a": 3, "ac": 100, "c": 2, "t": 2 }] }, { "action": [{ "a": 0, "ac": 102, "e": 100, "t": 1 }, { "a": 3, "ac": 102, "e": 100, "h": 101, "t": 2 }] }, { "action": [{ "a": 3, "ac": 1200, "t": 1 }, { "a": 0, "ac": 1200, "c": 2, "t": 2 }] }, { "action": [{ "a": 2, "ac": 110, "e": 100, "t": 1 }, { "a": 0, "ac": 110, "h": -178, "t": 2 }] }, { "action": [{ "a": 1, "ac": 100, "e": 100, "t": 1 }, { "a": 3, "ac": 100, "d": 1, "e": 25, "h": 231, "t": 2 }] }] };
    tempJson = JSON.parse(json);
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
    }
    else {
        //挑战的结果
        if (tempJson.iswin) {
            showTextMess("挑战成功!您现在排名为" + tempJson.ranking, 1);
        }
        else {
            showTextMess("挑战失败!", 1);
        }

        arenaJson.nowrank = tempJson.ranking;
        arenaJson.record = tempJson.record;
        arenaJson.rate = tempJson.rate;
        userJson.fame += tempJson.getRenown;
        arenaJson.honor += tempJson.getGlory;

        div = $("#a_rank");
        //排名
        div.find("#a_user_record .arena_font").text(arenaJson.record);
        div.find("#a_rank_rank .arena_font").text(arenaJson.nowrank);
        div.find("#a_user_rate .arena_font").text(arenaJson.rate);
        div.find("#a_user_fame .arena_font").text(userJson.fame);
        div.find("#a_user_hono .arena_font").text(arenaJson.honor);

        arenaJson.leftnum--;

        changeRemain("arena", -1);

        div.find("#a_rank_num .arena_font").text(arenaJson.leftnum);

        if (arenaJson.leftnum <= 0) {
            $("#a_user_time").css("color", "red").html("不可挑战!<div id='a_user_timeContent'></div>");
        }
        else {
            if (userJson.vip > 6) {
                //$("#a_user_time").css("color", "#26E50E").html("可以挑战!<div id='a_user_timeContent'></div>");
            } else {
                arenaJson.leftsecs = 60;
                $("#a_user_time").css("color", "red").html("挑战时间CD:<div id='a_user_timeContent'>" + expireTime(arenaJson.leftsecs) + "</div>");
                if (arenaJson.leftsecs > 0) {
                    arenaTime = setInterval(function () {
                        if (arenaJson.leftsecs <= 0) {
                            $("#a_user_time").css("color", "#26E50E").html("可以挑战!<div id='a_user_timeContent'></div>");
                            clearInterval(arenaTime);
                        } else {
                            arenaJson.leftsecs--;
                            $("#a_user_timeContent").text(expireTime(arenaJson.leftsecs));
                        }
                    }, 1000)
                }
            }
        }

        
    }
}

//胜利刷新列表
var winToFreshList = function (json) {
    if (arenaJson != null) {
        arenaJson.data = JSON.parse(json).data;
        loadArenaEnemy();
    }
}

//荣誉商店
var showHonorShop = function () {
    $("#dialog").html("<div id='shop'><div id='title'><div id='titleLeft'></div><div id='titleCenter'><div id='titleContext'style='margin-top:11px;background-image:url(res/public/title/37.png)'></div></div><div id='titleRight'></div></div><div id='waikuan'><div id='shangjiao'class='jiao shangjiao'></div><div id='xiajiao'class='jiao xiajiao'></div><div id='zuojiao'class='jiao zuojiao'></div><div id='youjiao'class='jiao youjiao'></div><div class='shangwaibian'></div><div class='xiawaibian'></div><div class='zuowaibian'></div><div class='youwaibian'></div></div><div id='close'></div><div id='rope'></div><div id='heroPageData'style='bottom:32px;left:104px;'></div><div id='pagePrevBtn'></div><div id='pageNextBtn'></div><div id='shopDialog'><div class='swiper-container shopSwiper'><div class='swiper-wrapper'><div class='swiper-slide bag-slide'><div id='bagPage0'class='shopPage'></div></div></div></div><div id='pieceHeroNum'>荣誉点数:<font id='pieceNowNum'style='color:#26E50E;'></font></div></div><div id='shop_server'class='hero_icon hero_icon_select'style='background-image:url(res/public/icon/honor.png)'></div><div id='shopserver_something'style='display:block;'><font style='color:red;'>提示:</font>排行越高,每天可获得的荣誉越多.</div></div>");
    
    $("#shop").css({ "top": (height - 460) / 2 - 10 });
    if(pad)
        $("#shop").css({ "top": ((height - 470 * sp) / 2) / sp });

    $("#pieceNowNum").text(arenaJson.honor);

    $("#shopserver_something").hide();
    $("#shop_something").show();
    
    usePage = 0;

    useLength = honorGoodJson.data.length;

    usePageAll = Math.ceil(useLength / 8) - 1;

    $("#heroPageData").html("页数:<font id='pageNow' style='color:#26E50E;'>1</font><font style='color:#26E50E;'>/" + (usePageAll + 1) + "</font></font>");

    showHonorPage();


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
        showHonorPage();
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
        showHonorPage();
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })

    //关闭
    $("#close").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (!cancel()) {
            window.GameMainClass.playEffectSound("close");
            showArena();
        }
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    }).bind("touchstart", function () {
        begin();
        $(this).css({ "-webkit-transform": "scale(0.8)" });
    })
}

//荣誉店页面
var showHonorPage = function () {

    $("#bagPage0").html("");
    $("#pageNow").text(usePage + 1);

    var tempLastIndex = useLength > (usePage + 1) * 8 ? (usePage + 1) * 8 : useLength;

    var arr = new Array();

    for (var i = usePage * 8; i < tempLastIndex; i++) {

        var div = document.createElement("div");
        div.className = "bagItem";
        div.innerHTML = "<div class='bagHeadBg'><div class='bagHeadColor'></div><div class='bagHead'></div></div><div class='goodDetail'style='background-image:url(res/shop/slideBg.png);background-position-y:-156px;'><div class='goodDetail_name'></div><div class='goodDetail_value'></div><div class='goodDetail_cast'></div><div class='goodDetail_coin'></div></div>";


        var detail = honorGoodJson.data[i].itemid;

        //此物品的详细信息

        var localDetail;
        var j = 0
        for (; j < GoodsJson.data.length; j++) {
            if (GoodsJson.data[j].ItemID == detail) {
                localDetail = GoodsJson.data[j];
                break;
            }
        }

        div.setAttribute("itemId", detail);
        div.setAttribute("gold", honorGoodJson.data[i].honor);
        div.setAttribute("nick", localDetail.Name);

        $(div).find(".bagHeadColor").css("background-image", "url(res/head/" + localDetail.Q + ".png)");
        $(div).find(".bagHead").css("background-image", "url(res/goods/" + localDetail.ImgID + ".png)");

        $(div).find(".goodDetail_coin").html("<font style='color:#F2E234;'>" + honorGoodJson.data[i].honor + "</font>");

        $(div).find(".goodDetail_name").text(localDetail.Name).css("color", getColor(String(localDetail.Q)));
        switch (localDetail.Type) {
            case 6:
            case 1:
                $(div).find(".goodDetail_value").html("攻击:<font style='color:#F2E234;'>" + localDetail.ATK + "</font>");
                break;
            case 7:
            case 2:
                $(div).find(".goodDetail_value").html("生命:<font style='color:#F2E234;'>" + localDetail.HP + "</font>");
                break;
            case 8:
            case 3:
                $(div).find(".goodDetail_value").html("防御:<font style='color:#F2E234;'>" + localDetail.DEF + "</font>");
                break;
            case 9:
                $(div).find(".goodDetail_value").html("命中:<font style='color:#F2E234;'>" + localDetail.hit + "</font>");
                break;
            case 10:
            case 5:
                $(div).find(".goodDetail_value").html("暴击:<font style='color:#F2E234;'>" + localDetail.baoji + "</font>");
                break;
            case 4:
            case 11:
                $(div).find(".goodDetail_value").html("闪避:<font style='color:#F2E234;'>" + localDetail.miss + "</font>");
                break;
            case 12:
                $(div).find(".goodDetail_value").html("韧性:<font style='color:#F2E234;'>" + localDetail.renxing + "</font>");
                break;
            case 13:
            case 14:
            case 30:
                $(div).find(".goodDetail_value").html(localDetail.detail);
                break;

        }
        $("#bagPage0").append(div);
    }

    //绑定购买事件
    $(".goodDetail").bind("touchend", function () {
        if (cancel())
            return;
        shopChooseNum($(this).parent().attr("itemid"), $(this).parent().attr("gold"), $(this).parent().attr("nick"), "honor");
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })
}

var honorBugResert = function (json) {
    var tempJson = JSON.parse(json);
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
    }
    else {
        showTextMess(tempJson.info, 1);
        //{"data":[{"p":"957,0,2001,6,0,1,0,0,0"}],"honor":消耗荣誉数,"info":"ok","resert":1}

        //添加买进的物品
        AddItem(tempJson.data);

        arenaJson.honor -= tempJson.honor;

        $("#pieceNowNum").text(arenaJson.honor);

        $("#tempMask").remove();
        $("#temp").html("");
    }
}

var bugArenaTime = function (json) {
    var tempJson = JSON.parse(json);
    //var tempJson = { "cutgold": 2,"nextgold":10, "info": "buy OK", "resert": 1 };
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
    }
    else {
        showTextMess(tempJson.info, 1);
        $("#temp").html("");
        $("#tempMask").remove();
        updateUserJson("600", 0 - tempJson.cutgold);
        arenaJson.gold = tempJson.nextgold;
        if (arenaJson.leftnum == 0) {
            if (userJson.vip > 6) {
                $("#a_user_time").css("color", "#26E50E").html("可以挑战!<div id='a_user_timeContent'></div>");
            }
            else {
                clearInterval(arenaTime);
                if (arenaJson.leftsecs > 0) {
                    arenaTime = setInterval(function () {
                        if (arenaJson.leftsecs <= 0) {
                            $("#a_user_time").css("color", "#26E50E").html("可以挑战!<div id='a_user_timeContent'></div>");
                            clearInterval(arenaTime);
                        } else {
                            arenaJson.leftsecs--;
                            $("#a_user_timeContent").text(expireTime(arenaJson.leftsecs));
                        }
                    }, 1000)
                }
                else {
                    $("#a_user_time").css("color", "#26E50E").html("可以挑战!<div id='a_user_timeContent'></div>");
                }
            }
        }

        arenaJson.leftnum++;
        arenaJson.leftbuy--;

        changeRemain("arena", 1);

        $("#a_rank_num>.arena_font").text(arenaJson.leftnum);
        
    }
}

//排名被打下来了
var arenaRankDownByEnemy = function (json) {
    var tempJson = JSON.parse(json);
    showTextMess(tempJson.info,1);
    if (arenaJson != null) {
        arenaJson.nowrank = tempJson.rank;
    }
    if ($("#arena").length == 1) {
        $("#a_rank_rank>font").text(tempJson.rank);
        window.GameMainClass.sendRequestJson(132, '', "setArenaJson");
    }
    else {
        window.GameMainClass.sendRequestJson(132, '{"just":"just"}', "setArenaJson");
    }
}

//9.30比武场刷新
var arenaFreshByServer = function (json) {
    var tempJson = JSON.parse(json);
    showTextMess(tempJson.info, 1);

    arenaJson = null;

    window.GameMainClass.sendRequestJson(132, '', "setArenaJsonByServer");
}

var setArenaJsonByServer = function (json) {
    arenaJson = JSON.parse(json);
    remainJson.arena = arenaJson.leftnum;
    $("#b_arena").html("").append("<div class='iconLight'>" + remainJson.arena + "</div>");
}