/// <reference path="json.js" />
/// <reference path="jquery-1.5.1.min.js" />
//加载主城
var main = function () {
    battleAnimate();
    audio = document.getElementById("audio");
    height = document.body.scrollHeight;
    if (height == 601) height = 600;
    width = document.body.scrollWidth;
    var scale = height / 480;
    if (width > 1500) {
        pad = true;
        padScale = scale;
        sp = scale * 0.8;
    }
    var mainwrapper = (parseFloat(scale.toFixed(1))) * 854 > width ? (parseFloat(scale.toFixed(1))) * 854 : width;
    $("#main").css({ "width": mainwrapper, "height": height, "background-size": mainwrapper + "px " + height + "px" });
    $("#wrapper").css({ "width": width, "height": height });
    $("#scroller").css({ "width": mainwrapper, "height": height });
    $("#icon").css({ "width": width, "height": height });
    $("#mask").css({ "width": width, "height": height }).hide();
    $("#building").css({ "left": (mainwrapper - (854 * scale)) / 2, "zoom": scale });

    $("#team").css({ "left": (mainwrapper - 540) / 2 });

    //针对pad的适配
    if (pad) {
        $("#team").css({  "left": (mainwrapper - (740 * padScale)) / 2, "zoom": padScale });
        $("#dialog").css({ "position": "relative", "zoom": padScale * 0.8 });
        $("#userData").css({ "zoom": padScale });
        $("#icon").css({ "zoom": padScale, "width": width / padScale, "height": height / padScale });

    }

    $("#chatdiv1,#chatdiv2").css("width", width - 500);

    $("#messtitle").css("left", (width - 536) / 2);

    //showReward(129);
    //缩放队伍
    //if (width <= 854)
    //    $("#team").css({ "zoom": "0.8", "left": (mainwrapper - 420) / 2 });
    //else {
    //    $("#iconB").css("zoom", "1.1");
    //    $("#team").css({ "left": (mainwrapper - 625) / 2 });
    //}
        

    var myScroll = new iScroll('wrapper', {
        'bounce': false, 'vScrollbar': false, 'vScroll': false, 'hScrollbar': false, "lockDirection": false
    });
    myScroll.scrollTo(-(mainwrapper - width) / 2);

    IconHover();

    //加载各图标事件
    $("#b_battle").bind("touchend", function () {
        if (!cancel()) {
            loadBattle();
            //showBattle();
        }
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })

    $("#b_bag").bind("touchend", function () {
        if (!cancel()) {
            showBag();
        }
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })

    //建筑点击事件

    $("#b_arena,#b_bag,#b_battle,#b_equip,#b_faction").bind("touchend", function () {
        if (!cancel()) {
            window.GameMainClass.playEffectSound("icon");
        }
        $(this).css("-webkit-transform", "scale(1)");
    }).bind("touchstart", function () {
        begin();
        $(this).css("-webkit-transform", "scale(0.8)");
    }).bind("touchmove", function () {
        move();
    })

    //加载队伍点击事件
    $(".heroDiv").bind("touchstart", function () {
        begin();
        $(this).siblings(".hero").eq($(this).index() - 5).css("-webkit-transform", "scale(0.8)");
    }).bind("touchmove", function () {
        move();
        $(this).siblings(".hero").eq($(this).index() - 5).css("-webkit-transform", "scale(1)");
    }).bind("touchend", function () {
        $(this).siblings(".hero").eq($(this).index() - 5).css("-webkit-transform", "scale(1)");
        if (cancel())
            return;

        window.GameMainClass.playEffectSound("icon");
        changeHero = false;
        if ($("#hero").length == 1)
            return;
        if (event.srcElement.id == "heroDivLead")
            showLeadChange();
        else
            showTeamChange();
    });

    //所有武将
    $("#Hero").bind("touchend", function () {
        if (!cancel()) {
            loadHeroBase();
        }
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })

    //签到
    $("#Sign").bind("touchend", function () {
        if (cancel())
            return;
        loadQianDao();
    })

    //升级
    $("#School").bind("touchend", function () {
        if (!cancel()) {
            loadLvUpFirst();
        }
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })

    //装备强化
    $("#b_equip").bind("touchend", function () {
        if (!cancel()) {
            if (userJson.lv < 8) {
                showTextMess("主公8级开启", 2);
                return;
            }
            showRefineBase();
        }
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })

    //武将装备
    $("#Equip").bind("touchend", function () {
        if (!cancel()) {
            if (userJson.lv < 8) {
                showTextMess("主公8级开启", 2);
                return;
            }
            showHeroEquipDialog();
        }
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })
    
    //任务
    $("#Task").bind("touchend", function () {
        if (!cancel()) {
            showTask();
        }
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })

    //矿区
    $("#Rank").bind("touchend", function () {
        if (!cancel()) {
            //window.GameMainClass.sendRequestJson(1141, '{"pageindex":1,"ulevel":' + userJson.lv + '}', "setMineJson");
            LoadMine();
        }
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })

    //消息
    $("#Message").bind("touchend", function () {
        if (!cancel()) {
            loadMessage();
        }
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })

    //活动
    $("#Active").bind("touchend", function () {
        if (!cancel()) {
            loadActivity();
        }
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })

    //竞技场
    $("#b_arena").bind("touchend", function () {
        if (cancel())
            return;
        if (userJson.lv < 10) {
            showTextMess("主公10级开启",2);
            return;
        }
        loadArena();
    })

    //聊天
    $("#ChatIcon").bind("touchend", function () {
        if (cancel())
            return;
        ShowChat("");
    })
     
    //累充
    $("#SurperHero").bind("touchend", function () {
        if (cancel())
            return;
        LoadCumulationFirst();
    })

    //商城
    $("#Shop").bind("touchend", function () {
        if (cancel())
            return;
        shopBase();
    })
    
    //布阵
    $("#Formation").bind("touchend", function () {
        if (cancel())
            return;
        loadLineup();
    })

    //帮派
    $("#b_faction").bind("touchend", function () {
        if (cancel())
            return;
        showTextMess("暂未开放,敬请期待", 2);
    })
    
    //好友
    $("#Friend").bind("touchend", function () {
        if (cancel())
            return;
        loadFriendBase();
    })
    
    //设置
    $("#Set").bind("touchend", function () {
        if (!cancel()) {
            loadSystemBase();
        }
    })
    
    //奖励
    $("#Reward").bind("touchend", function () {
        if (!cancel()) {
            showRewardDialog();
        }
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })

    //英雄志
    $("#Zhi").bind("touchend", function () {
        if (cancel())
            return;
        if (userJson.lv < 12) {
            showTextMess("主公12级开启", 2);
            return;
        }
        if (yxzData)
        { if (document.getElementById("yxzDialog") != null) justshowYxz(); else showYxz(); }
        else
        { window.GameMainClass.sendRequestJson(164, "", "showYxz"); }
    })

    //开关
    $("#Switch").bind("touchend", function () {
        if (cancel())
            return;
        if ($("#iconR").is(":animated"))
            return;
        if ($(this).attr("can") == "t") {
            $("#iconR").animate({ "height": "show" }, 500,"linear");

            $("#iconB").animate({ "width": "show" }, 500, "linear");
            $("#ChatBar").animate({ "bottom": "8" }, 500, "linear");
            $("#chatdivsmall").css("display", "none");
            $(this).css({ "-webkit-animation": "switchAnimate 0.5s 0 linear" });

            $(this).attr("can", "f");
        }
        else {
            $("#iconR").animate({ "height": "hide" }, 500, "linear");

            $("#iconB").animate({ "width": "hide" }, 500, "linear");
            $("#ChatBar").animate({ "bottom": "-50" }, 500, "linear");
            $("#chatdivsmall").css("display", "block");

            $(this).css({ "-webkit-animation": "switchAnimate2 0.5s 0 linear"});
            $(this).attr("can", "t");
        }
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })

    //队伍详情
    $("#flag").bind("touchend", function () {
        if (cancel())
            return;
        $(this).css({ "-webkit-transform": "scale(1)" });
        window.GameMainClass.playEffectSound("icon");
        showTeamInfoDetail();
    }).bindAnimate();

    //矿区
    $("#Mine").bind("touchend", function () {
        if (cancel())
            return;
        if (userJson.lv < 15) {
            showTextMess("矿区15级开启", 2);
            return;
        }
        window.GameMainClass.sendRequestJson(1141, '{"pageindex":1,"ulevel":' + userJson.lv + '}', "setMineJson");
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })


    //showRewardDialog();
    //showBattle();
    //showMap(1, 1);
    //showTake();
    ////friendEnd();
    //showGetItemAnimate2();
    //loadLvUpFirst();
    //showLvUpChooseDialog();
    //$("#Zhi").trigger("touchend");
    //showYxzHeroInfo(0);
    //shopBugHero(true);
    //loadLineup();
    //showRefineBase();
    //NewGuideClass.tempindex = 46;
    //NewGuideClass.NewBegin(); 
    //showMessage();
    //showNotice();
    //showFindHeroAnimate();
    //shopBase();
    //shopGoldDetail();
    //friendEnd();
    //showTake();
    //showMessage();
    //showReward(5596);
    //loadFriendBase();
    //$("#friendFind").trigger("touchend");
    //findFriendOk();
    //LoadMine();
    //showYxz();
    //showYxzHeroInfo(0)
    //shopBugStrength();
    //loadChat();
    //AcceptChat();
    //AcceptChat();
    //ShowChat("");
    //AcceptChat();
    //AcceptChat();
    //AcceptChat();
    //AcceptChat();
    //showFall();
    //showFallBase();
    //showLvUpStill();
    //rechargeSuccessBack();
    //loadVip();
    //showVipLv();
    //showRewardDialog(2);
    //showArena();
    //loadArenaReward();
    //showHeroDetailNormal(5700);
    //bossRewardDialog();
    //showRewardDialog();
    //loadRecharge();
    //showNotice();
    //QianDao();
    //showBag();
    //loadFallDetail();
    //$("#fallicon2").trigger("touchend");
    //loadBackCity();
    //ReceiverMess("强化成功1!");
    //ReceiverMess("强化成功2!");
    //ReceiverMess("强化成功3!");
    //ReceiverMess("强化成功1!");
    //ReceiverMess("强化成功2!");
    //ReceiverMess("强化成功3!");
    //ReceiverMess("强化成功1!");
    //ReceiverMess("强化成功2!");
    //ReceiverMess("强化成功3!");
    //loadHeroBase();
    //showPiece();
    //timeZeroRestart();
    //showActivity();
    //LoadMine();
    //ShowMineData();
    //showRefineBase();
    //$("#equip_make").trigger("touchend");
    //showBag();
    //shopChooseNum(200, "220", "碧水头盔", "gold");
    //showTask();
    //showRefineBase();
    //showActivity();
    //loadLvUpFirst();
    //showLvUpChooseDialog();
    //showTextMess("大家好,我来了", 1)
    //showTextMess("大家好123", 1)
    //showTextMess("大家好123", 2)
    //showTextMess("大家好123", 1)
    //pieceOkClick();
    //showBag();
    //loadFallDetail();
    //friendEnd();
    //showUnder();
    //LoadBossOfWorld();
    //showLineup();
    //showBag();
    //shopBase();
    //loadShop();
    //showRewardDialog();
    //showArena();
    //loadRecharge();
    //showHeroDetailBack();
    //showTeamInfoDetail();
    //loadSystemBase();
    //loadGonglue();
    //$(".equip_heroDetail").eq(5).trigger("touchend");
    //showFAQ();
    //$("#btnGonglue").trigger("touchend");
    //showHeroEquipDialog();
    //$(".equip_heroDetail").eq(0).trigger("touchend");
    //showRefineBase();
    //loadLvUpFirst();
    //$("#LvUpHero .LvUp_Hero").css("background-image","url(res/man/1000.png)")
    //$(".equip_heroDetail").eq(0).trigger("touchend")
    //showNotice();
    //pieceOkDetail();
    /************************************加载各种数据******************************************/
    //主公基本信息
    window.GameMainClass.sendRequestJson(105, '{"vercode":' + window.GameMainClass.getVersionCode() + '}', "setUserJson");

    //运营活动开放
    window.GameMainClass.sendRequestJson(204, '', "nowActivity.setJson");

    //武将
    window.GameMainClass.sendRequestJson(1004, '', "setHeroJson");

    //设置包裹数据
    window.GameMainClass.sendRequestJson(101, '', "setBagJson");

    //设置武将装备json
    window.GameMainClass.sendRequestJson(120, '', "setEquitJson");

    //设置任务json
    window.GameMainClass.sendRequestJson(129, "", "setTaskJson");

    window.GameMainClass.sendRequestJson(194, "", "getRemainTimes");

    window.GameMainClass.CollectUserStep(6);

    //商城图片事件
    window.GameMainClass.sendRequestJson(212, "", "setShopEventJson");

    window.GameMainClass.cityPageFinish();

}

//添加图标响应事件
var IconHover = function () {
    $("#icon>div>div").bind("touchend", function () {
        $(this).css({ "background-position-x": "0", "-webkit-transform": "scale(1)" });
    }).bind("touchmove", function () {
        $(this).css({ "background-position-x": "0", "-webkit-transform": "scale(1)" });
    }).bind("touchstart", function () {
        window.GameMainClass.playEffectSound("icon");
        $(this).css({ "background-position-x": "-60px", "-webkit-transform": "scale(1.2)" });
    })
}
$(function () {
    main();
    musicstatus = window.GameMainClass.getMusicState();

})
var getuid = function (uid) {
    if (uid == undefined)
        showTextMess("系统异常--uid",2);
    else
        uid = uid;
};

var getServerList = function () {

}

var popTime;
var musicstatus = 1;