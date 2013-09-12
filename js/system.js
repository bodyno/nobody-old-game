/// <reference path="jquery-1.5.1.min.js" />
/// <reference path="json.js" />
/// <reference path="json.js" />
/*********************系统页****************************/

var loadSystemBase = function () {
    var str = new Array();
    str.push("<div id='heroEquip'><div id='title'><div id='titleLeft'></div><div id='titleCenter'><div id='titleContext'></div></div><div id='titleRight'></div>");
    str.push("</div><div id='waikuan'><div id='shangjiao'class='jiao shangjiao'></div><div id='xiajiao'class='jiao xiajiao'></div><div id='zuojiao'class='jiao zuojiao'>");
    str.push("</div><div id='youjiao'class='jiao youjiao'></div><div class='shangwaibian'></div><div class='xiawaibian'></div><div class='zuowaibian'></div>");
    str.push("<div class='youwaibian'></div></div><div id='close'></div><div id='rope'></div><div id='equipDialog'>");
    str.push("</div><div id='systemIcon' class='hero_icon hero_icon_select' style='background-image:url(res/system/icon.png);'></div></div>");

    $("#dialog").html(str.join(""));
    $("#mask").show();
    $("#heroEquip").css({ "top": (height - 460) / 2 - 10 });
    if (pad)
        $("#heroEquip").css({ "top": ((height - 470 * sp) / 2) / sp });

    //图标点击事件
    //$("#systemIcon").bind("touchend", function () {
    //    $("#bookIcon").removeClass("hero_icon_select");
    //    $(this).addClass("hero_icon_select");
    //    SystemClass.LoadSystem();
    //    $("#heroPageData,#pagePrevBtn,#pageNextBtn").hide();
    //})

    //图鉴
    //$("#bookIcon").bind("touchend", function () {
    //    $("#systemIcon").removeClass("hero_icon_select");
    //    $(this).addClass("hero_icon_select");
    //    $("#heroPageData,#pagePrevBtn,#pageNextBtn").show();
    //    loadBook();
    //})

    setTitle(43);

    SystemClass.LoadSystem();
    $("#heroPageData,#pagePrevBtn,#pageNextBtn").hide();

    //绑定关闭事件
    $("#close").bind("touchend", function () {
        if (!cancel()) {
            $("#heroEquip").remove();
            $("#mask").hide();
        }
        $(this).css({ "-webkit-transform": "scale(1)" });
    }).bind("touchmove", function () {
        move();
    }).bind("touchstart", function () {
        begin();
        window.GameMainClass.playEffectSound("close");
        $(this).css({ "-webkit-transform": "scale(0.8)" });
    });
}

var SystemClass = {
    //加载系统页面
    LoadSystem: function () {
        var str = new Array();
        str.push("<div class='SystemItem' style='background-position:0px 0px;'><div class='title'>攻略<br/><font style='color:#fff;'>众将听令游戏手册</font></div><div class='LvUpBtn'id='btnGonglue'style='display:block;right:3px;bottom:17px;'><div class='btn'><div class='btn1'></div><div class='btn2'>查看</div><div class='btn3'></div></div></div></div></div>");
        str.push("<div class='SystemItem'style='background-position:-330px 0px;'><div class='title'>账号信息<br/><font style='color:#fff;'>ID:" + userJson.uid + "</font></div><div class='LvUpBtn'id='btnGuanli'style='display:block;right:3px;bottom:17px;'><div class='btn abtn'><div class='btn1'></div><div class='btn2'>管理</div><div class='btn3'></div></div></div></div></div>");
        str.push("<div class='SystemItem' style='background-position:0px -78px;'><div class='title'>客服FAQ<br/><font style='color:#fff;'>汇总游戏中的问题</font></div><div class='LvUpBtn'id='btnKefu'style='display:block;right:3px;bottom:17px;'><div class='btn'><div class='btn1'></div><div class='btn2'>进入</div><div class='btn3'></div></div></div></div></div>");
        str.push("<div class='SystemItem OpenItem'><div class='title'>音乐&音效<br /><font style='color:#fff;'>开关音乐和音效</font></div><div class='" + (musicstatus ? "close" : "checkbox") + "' id='musicchange' ontouchmove='move();' ontouchstart='begin();$(this).css({ \"-webkit-transform\": \"scale(0.8)\" });' ontouchend='if (!cancel()) {$(this).css({ \"-webkit-transform\": \"scale(1)\" });SystemClass.UpdateMusicStatus();}'></div></div>");
        str.push("<div class='SystemItem' style='background-position:-0px -156px;'><div class='title'>图鉴<br/><font style='color:#fff;'>百万将士等你调遣</font></div><div class='LvUpBtn'id='btnTujian'style='display:block;right:3px;bottom:17px;'><div class='btn'><div class='btn1'></div><div class='btn2'>查看</div><div class='btn3'></div></div></div></div></div>");
        
        
        str.push("<div class='SystemItem' style='background-position:-330px -156px;'><div class='title'>CDKEY<br /><font style='color:#fff;'>游戏礼包兑换</font></div><div class='LvUpBtn'style='display:block;right:3px;bottom:17px;' ontouchmove='move();$(this).css({ \"-webkit-transform\": \"scale(1)\" });' ontouchstart='begin();$(this).css({ \"-webkit-transform\": \"scale(0.8)\" });' ontouchend='if (!cancel()) {window.GameMainClass.playEffectSound(\"icon\");$(this).css({ \"-webkit-transform\": \"scale(1)\" });SystemClass.InputCdKey();}'><div class='btn'><div class='btn1'></div><div class='btn2'>兑换</div><div class='btn3'></div></div></div></div>");
        str.push("<div class='SystemItem' style='background-position:0px -234px;'><div class='title'>返回登录<br/><font style='color:#fff;'>返回到登录界面</font></div><div class='LvUpBtn'id='btnBackLogin'style='display:block;right:3px;bottom:17px;'><div class='btn'><div class='btn1'></div><div class='btn2'>返回</div><div class='btn3'></div></div></div></div></div>");
        str.push("<div class='SystemItem' style='background-position:-330px -234px;'><div class='title'>游戏公告<br/><font style='color:#fff;'>最新活动、版本内容</font></div><div class='LvUpBtn'id='btnNotice'style='display:block;right:3px;bottom:17px;'><div class='btn'><div class='btn1'></div><div class='btn2'>查看</div><div class='btn3'></div></div></div></div></div>");

        

        $("#equipDialog").html(str.join(""));


        $("#btnTujian").bind("touchend", function () {
            $(this).css("-webkit-transform", "scale(1)");
            if (cancel())
                return;
            window.GameMainClass.playEffectSound("icon");
            loadBook();
        }).bind("touchstart", function () {
            begin();
            $(this).css("-webkit-transform", "scale(0.8)");
        }).bind("touchmove", function () {
            $(this).css("-webkit-transform", "scale(0.8)");
            move();
        })

        //攻略
        $("#btnGonglue").bind("touchend", function () {
            $(this).css("-webkit-transform", "scale(1)");
            if (cancel())
                return;
            window.GameMainClass.playEffectSound("icon");
            loadGonglue();
        }).bind("touchstart", function () {
            begin();
            $(this).css("-webkit-transform", "scale(0.8)");
        }).bind("touchmove", function () {
            $(this).css("-webkit-transform", "scale(0.8)");
            move();
        })

        //返回登录
        $("#btnBackLogin").bind("touchend", function () {
            $(this).css("-webkit-transform", "scale(1)");
            if (cancel())
                return;
            window.GameMainClass.playEffectSound("icon");
            loadBackCity();
        }).bind("touchstart", function () {
            begin();
            $(this).css("-webkit-transform", "scale(0.8)");
        }).bind("touchmove", function () {
            $(this).css("-webkit-transform", "scale(0.8)");
            move();
        })
        

        //公告
        $("#btnNotice").bind("touchend", function () {
            $(this).css("-webkit-transform", "scale(1)");
            if (cancel())
                return;
            window.GameMainClass.playEffectSound("icon");
            loadNotice();
        }).bind("touchstart", function () {
            begin();
            $(this).css("-webkit-transform", "scale(0.8)");
        }).bind("touchmove", function () {
            $(this).css("-webkit-transform", "scale(0.8)");
            move();
        })
        
        //FAQ
        $("#btnKefu").bind("touchend", function () {
            $(this).css("-webkit-transform", "scale(1)");
            if (cancel())
                return;
            window.GameMainClass.playEffectSound("icon");
            showFAQ();
        }).bind("touchstart", function () {
            begin();
            $(this).css("-webkit-transform", "scale(0.8)");
        }).bind("touchmove", function () {
            $(this).css("-webkit-transform", "scale(0.8)");
            move();
        })
        
    },

    UpdateMusicStatus: function () {
        if (musicstatus) {
            musicstatus = 0;
            $("#musicchange").attr("class", "checkbox");
            window.GameMainClass.setMusicState(0);
        }
        else {
            musicstatus = 1;
            $("#musicchange").attr("class", "close");
            window.GameMainClass.setMusicState(1);
        }
    },

    InputCdKey: function () {
        window.GameMainClass.onChating(1);
        var maskDiv = document.createElement("div");
        maskDiv.id = "tempMask2";
        $(maskDiv).css({ "width": width, "height": height, "top": "0" });
        document.body.appendChild(maskDiv);

        $("#temp").html("<div id='mess3'><div id='q_title'style='left:70px;'><div id='q_titleLeft'></div><div id='q_titleCenter'><div id='q_titleContext'style='background-image:url(res/public/title/44.png);'></div></div><div id='q_titleRight'></div></div><div id='t_waikuan'><div class='q_jiao q_shangjiao'></div><div class='q_jiao q_xiajiao'></div><div class='q_jiao q_zuojiao'></div><div class='q_jiao q_youjiao'></div><div class='q_shangwaibian'></div><div class='q_xiawaibian'></div><div class='q_zuowaibian'></div><div class='q_youwaibian'></div></div><div id='dialogclose'></div><div id='rope'></div><div id='tempDialog3'><div id='lottery_content3'style='margin-top:13px;'>请输入您的礼包CDKEY，点确定领取</div></div><div id='shopOkBtn'class='ShopBtn'ontouchmove='move();$(this).css({ \"-webkit-transform\": \"scale(1)\" });'ontouchstart='begin();$(this).css({ \"-webkit-transform\": \"scale(0.8)\" });'ontouchend='if (!cancel()) {$(this).css({ \"-webkit-transform\": \"scale(1)\" });SystemClass.CdKeySubmit();}'style='left:190px;width:91px;'><div class='btn'><div class='btn1'></div><div class='btn2'>确定</div><div class='btn3'></div></div></div><div id='CDKeyText'><input type='text'id='CdKeyInput'maxlength='16'/></div>");
        $("#mess3").css({ "left": (width - 476) / 2, "top": (height - 279) / 2 });
        if (pad) $("#mess3").css({ "zoom": sp, "left": (width - 476 * sp) / 2 / sp, "top": (height - 279 * sp) / 2 / sp });

        //绑定事件
        $("#dialogclose").bind("touchend", function () {
            $(this).css({ "-webkit-transform": "scale(1)" });
            if (cancel())
                return;
            window.GameMainClass.onChating(0);
            $("#temp").html("");
            $("#tempMask2").remove();
        }).bind("touchstart", function () {
            $(this).css({ "-webkit-transform": "scale(0.8)" });
            begin();
        }).bind("touchmove", function () {
            $(this).css({ "-webkit-transform": "scale(1)" });
            move();
        })
    },

    CdKeySubmit: function () {
        var cdkey = $("#CdKeyInput").val();
        if (cdkey == "") {
            showTextMess("请输入cdkey", 0);
            return;
        }

        window.GameMainClass.sendRequestJson(195, '{"cdkey":"' + cdkey + '"}', "SystemClass.CdKeyResult");
    },

    CdKeyResult: function (json) {
        var BackJson = JSON.parse(json);
        if (BackJson.resert) {
            //加物品
            if (BackJson.data.length > 0) {
                iGetReward(BackJson);
            }
        }
        showTextMess(BackJson.info, BackJson.resert);
    }
};

var loadBook = function () {
    var str = new Array();
    str.push("<div id='heroEquip'><div id='title'><div id='titleLeft'></div><div id='titleCenter'><div id='titleContext' style='background-image:url(res/public/title/45.png)'></div></div><div id='titleRight'></div>");
    str.push("</div><div id='waikuan'><div id='shangjiao'class='jiao shangjiao'></div><div id='xiajiao'class='jiao xiajiao'></div><div id='zuojiao'class='jiao zuojiao'>");
    str.push("</div><div id='youjiao'class='jiao youjiao'></div><div class='shangwaibian'></div><div class='xiawaibian'></div><div class='zuowaibian'></div>");
    str.push("<div class='youwaibian'></div></div><div id='close' style='width:53px;height:53px;background-image:url(res/activity/return.png);'></div><div id='rope'></div><div id='equipDialog'><div id='bookList'></div>");
    str.push("</div><div id='heroPageData'></div><div id='pagePrevBtn'></div><div id='pageNextBtn'></div><div id='bookIcon' class='hero_icon hero_icon_select' style='background-image:url(res/public/icon/book.png);'></div></div>");

    $("#dialog").html(str.join(""));
    $("#heroEquip").css({ "top": (height - 460) / 2 - 10 });
    if (pad)
        $("#heroEquip").css({ "top": ((height - 470 * sp) / 2) / sp });

    showBookList();

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
        showBookPage();
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
        showBookPage();
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })
    //绑定关闭事件
    $("#close").bind("touchend", function () {
        if (!cancel()) {
            $("#heroEquip").remove();
            $("#mask").hide();
            loadSystemBase();
        }
        $(this).css({ "-webkit-transform": "scale(1)" });
    }).bind("touchmove", function () {
        move();
    }).bind("touchstart", function () {
        begin();
        window.GameMainClass.playEffectSound("close");
        $(this).css({ "-webkit-transform": "scale(0.8)" });
    });
}

var showBookList = function () {
    
    tempUseIndex.length = 0;
    for (var i = 0; i < localHeroJson.data.length; i++) {
        if (localHeroJson.data[i].phase == 2)
            continue;
        tempUseIndex.push(i);
    }
    
    usePage = 0;

    useLength = tempUseIndex.length;

    usePageAll = Math.ceil(useLength / 28) - 1;

    $("#heroPageData").html("页数:<font id='pageNow' style='color:#26E50E;'>1</font><font style='color:#26E50E;'>/" + Math.ceil(useLength / 28) + "</font><br/>总数:<font style='color:#26E50E;'>" + useLength + "</font></font>");

    showBookPage();
}

var showBookPage = function () {
    $("#bookList").html("");
    $("#pageNow").text(usePage + 1);
    
    var tempLastIndex = useLength > (usePage + 1) * 28 ? (usePage + 1) * 28 : useLength;

    var arr = new Array();

    for (var i = usePage * 28; i < tempLastIndex; i++) {

        var tempDetail = localHeroJson.data[tempUseIndex[i]];

        var heroDiv = document.createElement("div");
        heroDiv.className = "bookHead";
        heroDiv.setAttribute("gid", tempDetail.gid);



        arr.length = 0;
        arr.push("<div class='noHeroHeadBg' style='background-image:url(res/adv/small.png)' ontouchstart='begin()'ontouchmove='move()'ontouchend='showBookDetail(this)'><img class='heroHeadColor'style='z-index:2;'src='res/head/" + tempDetail.q + ".png'></img><img style='z-index:1;'class='heroHead'src='res/head/" + tempDetail.ImgID + ".png'></img></div>");
        heroDiv.innerHTML = arr.join("");
        $("#bookList").append(heroDiv);

    }
}

var showBookDetail = function (ev) {
    showHeroDetailNormal($(ev).parent().attr("gid"));
}

var loadGonglue = function () {
    $("#dialog").html("<div id='message'><div id='title'><div id='titleLeft'></div><div id='titleCenter'><div id='titleContext'style='background-image:url(res/public/title/51.png)'></div></div><div id='titleRight'></div></div><div id='waikuan'><div id='shangjiao'class='jiao shangjiao'></div><div id='xiajiao'class='jiao xiajiao'></div><div id='zuojiao'class='jiao zuojiao'></div><div id='youjiao'class='jiao youjiao'></div><div class='shangwaibian'></div><div class='xiawaibian'></div><div class='zuowaibian'></div><div class='youwaibian'></div></div><div id='close'style='width:53px;height:53px;background-image:url(res/activity/return.png);'></div><div id='rope'></div><div id='messageDialog'><div id='n_left'><div id='n_title'></div><div id='n_content'><div id='notice_wrapper' style='width:472px;height:273px;'><div id='notice_scroller'><ul><li><div id='n_content2'></div></li></ul></div></div></div></div><div id='n_right'><div id='equip_Hero'><div class='swiper-container equip_hero_Swiper'><div class='swiper-wrapper'></div></div></div></div></div><div id='noticebtn'style='background-image:url(res/public/icon/gonglue.png)'class='hero_icon hero_icon_select'></div><div id='notice_hr'class='equip_hr'></div></div>");
    $("#message").css("top", (height - 480) / 2);
    if (pad)
        $("#message").css({ "top": ((height - 470 * sp) / 2) / sp });
    $("#mask").show();

    //关闭事件
    $("#close").bind("touchend", function () {
        if (!cancel()) {
            $("#dialog").html("");
            $("#mask").hide();
            loadSystemBase();
        }
        $(this).css({ "-webkit-transform": "scale(1)" });
    }).bind("touchmove", function () {
        move();
    }).bind("touchstart", function () {
        begin();
        window.GameMainClass.playEffectSound("close");
        $(this).css({ "-webkit-transform": "scale(0.8)" });
    })

    if (!easyWayJson.data) {
        return;
    }

    noticeScroll = new iScroll('notice_wrapper', { 'hScrollbar': false, 'vScrollbar': false });

    gongLueList();
    $(".equip_hero_select:first").show().siblings(".equip_heroDetail").addClass("equip_heroDetailSelect").css("color", "#F2E234");

    var noticeSwiper = new Swiper('.equip_hero_Swiper', {
        mode: 'vertical',
        slidesPerSlide: 6
    });

    $(".equip_heroDetail").bind("touchend", function () {
        if (cancel())
            return;
        $(".equip_heroDetailSelect").removeClass("equip_heroDetailSelect").css("color", "white");
        $(this).addClass("equip_heroDetailSelect").css("color", "#F2E234");
        $(".equip_hero_select").hide();
        $(this).siblings(".equip_hero_select").show();
        $("#equip_detail_select").css("top", "0");
        gongLueDetail($(this).parent().index());
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })
}

//加载左边公告
var gongLueList = function () {
    for (var i = 0; i < easyWayJson.data.length; i++) {
        var div = document.createElement("div");
        div.className = "swiper-slide equip-hero-slide";
        $(div).html("<div class='equip_hero_select'></div><div class='equip_heroDetail'>" + easyWayJson.data[i].name + "</div>");
        $("#equip_Hero .equip_hero_Swiper .swiper-wrapper").append(div);
    }
    gongLueDetail(0);
}

//加载公告具体信息
var gongLueDetail = function (index) {
    $("#n_title").text(easyWayJson.data[index].title);
    $("#n_content2").html(easyWayJson.data[index].content);


    setTimeout(function () {
        $("#notice_scroller").height($("#n_content2").height() + 25);
        noticeScroll.refresh();
        noticeScroll.scrollTo(0, 0, 0)
    },100)
}

//返回登录
var loadBackCity = function () {

    var maskDiv = document.createElement("div");
    maskDiv.id = "tempMask2";
    $(maskDiv).css({ "width": width, "height": height, "top": "0", "z-index": "21" });
    document.body.appendChild(maskDiv);

    $("#temp").html("<div id='mess3'><div id='q_title'style='left:70px;'><div id='q_titleLeft'></div><div id='q_titleCenter'><div id='q_titleContext'style='background-image:url(res/public/title/53.png);'></div></div><div id='q_titleRight'></div></div><div id='t_waikuan'><div class='q_jiao q_shangjiao'></div><div class='q_jiao q_xiajiao'></div><div class='q_jiao q_zuojiao'></div><div class='q_jiao q_youjiao'></div><div class='q_shangwaibian'></div><div class='q_xiawaibian'></div><div class='q_zuowaibian'></div><div class='q_youwaibian'></div></div><div id='dialogclose'></div><div id='rope'></div><div id='tempDialog3'><div id='lottery_content3'>主公,您确定要返回登录界面吗?</div></div><div id='shopOkBtn'style='width:91px;'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>确定</div><div class='btn3'></div></div></div><div id='shopCancelBtn'style='width:91px;left:262px;'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>取消</div><div class='btn3'></div></div></div></div>");
    $("#mess3").css({ "left": (width - 476) / 2, "top": (height - 279) / 2 });
    if (pad) $("#mess3").css({ "zoom": sp, "left": (width - 476 * sp) / 2 / sp, "top": (height - 279 * sp) / 2 / sp });

    //绑定事件
    $("#shopCancelBtn,#dialogclose").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        $("#temp").html("");
        $("#tempMask2").remove();
        window.GameMainClass.playEffectSound("close");
    }).bindAnimate();

    $("#shopOkBtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        //返回
        window.GameMainClass.returnToLogin();
    }).bindAnimate();
}

//FAQ
var showFAQ = function () {
    window.GameMainClass.onChating(1);
    var maskDiv = document.createElement("div");
    maskDiv.id = "tempMask2";
    $(maskDiv).css({ "width": width, "height": height, "top": "0", "z-index": "21" });
    document.body.appendChild(maskDiv);

    $("#temp").html("<div id='mess3'><div id='q_title'style='left:70px;'><div id='q_titleLeft'></div><div id='q_titleCenter'style='width:126px;'><div id='q_titleContext'style='width:126px;background-image:url(res/public/title/52.png);'></div></div><div id='q_titleRight'></div></div><div id='t_waikuan'><div class='q_jiao q_shangjiao'></div><div class='q_jiao q_xiajiao'></div><div class='q_jiao q_zuojiao'></div><div class='q_jiao q_youjiao'></div><div class='q_shangwaibian'></div><div class='q_xiawaibian'></div><div class='q_zuowaibian'></div><div class='q_youwaibian'></div></div><div id='dialogclose'></div><div id='rope'></div><div id='tempDialog3'><div id='submitName'>反馈人:<font id='submitNameDetail'style='color:#65E50E;'></font></div><div style='background-image:url(res/system/FAQ.png);width:380px;height:115px;position: absolute;left: 10px;top: 10px;'><textarea id='FAQinput'type='textarea'/></textarea></div></div><div id='shopOkBtn'style='width:91px;left:190px;'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>提交</div><div class='btn3'></div></div></div></div>");
    $("#mess3").css({ "left": (width - 476) / 2, "top": (height - 279) / 2 });
    if (pad) $("#mess3").css({ "zoom": sp, "left": (width - 476 * sp) / 2 / sp, "top": (height - 279 * sp) / 2 / sp });
    $("#submitNameDetail").text(userJson.nick);

    $("#shopOkBtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        if ($("#FAQinput").val().trim() == "") {
            showTextMess("输入的内容不能为空", 2);
            return;
        }
        if ($("#FAQinput").val().trim().length <= 10) {
            showTextMess("输入的内容最少10个字", 2);
            return;
        }
        if ($("#FAQinput").val().trim().length >= 200) {
            showTextMess("输入的内容最多200个字", 2);
            return;
        }
        window.GameMainClass.playEffectSound("icon");
        window.GameMainClass.sendRequestJson(205, '{"content":"' + $("#FAQinput").val().replace(/"/g, "'") + '"}', "FAQOK");

    }).bindAnimate();

    $("#dialogclose").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.onChating(0);
        $("#temp").html("");
        $("#tempMask2").remove();
        window.GameMainClass.playEffectSound("close");
    }).bindAnimate();

}

var FAQOK=function(json){
    var tempJson=JSON.parse(json);
    if(tempJson.resert!=1){
        showTextMess(tempJson.info,2);
    } else {
        window.GameMainClass.onChating(0);
        showTextMess(tempJson.info,1);
        $("#temp").html("");
        $("#tempMask2").remove();
    }
}