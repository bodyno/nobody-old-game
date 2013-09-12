/// <reference path="refine.js" />
/// <reference path="hero.js" />

var HeroEquipData = { "flag": false, "nowclick": "", "heroSid": "","canChange":true };

var showHeroEquipDialog = function () {
    $("#dialog").html("<div id='heroEquip'><div id='title'><div id='titleLeft'></div><div id='titleCenter'><div id='titleContext'></div></div><div id='titleRight'></div></div><div id='waikuan'><div id='shangjiao'class='jiao shangjiao'></div><div id='xiajiao'class='jiao xiajiao'></div><div id='zuojiao'class='jiao zuojiao'></div><div id='youjiao'class='jiao youjiao'></div><div class='shangwaibian'></div><div class='xiawaibian'></div><div class='zuowaibian'></div><div class='youwaibian'></div></div><div id='close'></div><div id='rope'></div><div id='equipDialog'><div id='equipNowHero'><div id='LvUpLight'></div></div><div id='equipDialog_Hero'><div class='swiper-container equip_hero_Swiper'><div class='swiper-wrapper'></div></div></div><div id='equipDialog_Detail'><div id='equipDialog_Hp'class='equipDialog_font'></div><div id='equipDialog_Atk'class='equipDialog_font'></div><div id='equipDialog_Def'class='equipDialog_font'></div><div id='equipDialog_Def2'class='equipDialog_font'></div><div id='equipDialog_Hit'class='equipDialog_font'></div><div id='equipDialog_Miss'class='equipDialog_font'></div><div id='equipDialog_Baoji'class='equipDialog_font'></div><div id='equipDialog_Renxing'class='equipDialog_font'></div></div><div id='wareOffAll'class='LvUpBtn'style='display: block;left: 29px;bottom: 10px;width: 173px;'><div class='btn'><div class='btn1'></div><div class='btn2'>一键卸下装备</div><div class='btn3'></div></div></div><div id='equipDialog_Main'><div id='equipDialog_equip0'class='equipDialog_equip'><div class='LvUpEat_font2'></div><div class='equipDialog_equipBg'></div><div class='equipDialog_equipImg'></div></div><div id='equipDialog_equip1'class='equipDialog_equip'><div class='LvUpEat_font2'></div><div class='equipDialog_equipBg'></div><div class='equipDialog_equipImg'></div></div><div id='equipDialog_equip2'class='equipDialog_equip'><div class='LvUpEat_font2'></div><div class='equipDialog_equipBg'></div><div class='equipDialog_equipImg'></div></div><div id='equipDialog_equip3'class='equipDialog_equip'><div class='LvUpEat_font2'></div><div class='equipDialog_equipBg'></div><div class='equipDialog_equipImg'></div></div><div id='equipDialog_man'><div class='heroequip_heroDetail'style='top:-120px;'></div><div class='heroEquipshidi'></div><div class='shangdi'></div><div class='man'style='-webkit-transform: scale(1) scaleX(1);margin-top: -91px;margin-left: -62px;'></div><div class='equip_man_job'style='top: -122px;left: -8px;'></div></div><div id='heroequip_lv'></div><div id='heroequip_star'></div><div id='heroequip_shuai'></div></div></div><div id='goEquipBtn'class='LvUpBtn'style='display:block;'><div class='btn'><div class='btn1'></div><div class='btn2'>铁匠铺</div><div class='btn3'></div></div></div><div id='heroequip_something'style='font-size: 16px;top: 86px;'><img src='res/public/care.png'style='vertical-align:middle;float:left;top:-6px;position: relative;margin-right: 7px;'/><div style='float:left;'>黄数值为武将属性，绿数值为装备、宝石属性。</div></div><div id='hero_equip'class='hero_icon hero_icon_select'></div><div id='heroequip_hr'class='equip_hr'></div></div>");
    $("#mask").show();

    $("#heroEquip").css({ "top": (height - 460) / 2 - 10 });
    if (pad)
        $("#heroEquip").css({ "top": ((height - 470 * sp) / 2) / sp });
    HeroEquipData.flag = true;
    HeroEquipData.canChange = true;

    setTitle(24);

    //第一个选择武将
    var div = document.createElement("div");
    div.className = "swiper-slide equip-hero-slide";
    $(div).attr("index", i);
    $(div).html("<div class='equip_hero_select'></div><div id='equip_selectHero'><div id='equip_selectHero_content'></div></div>");
    $("#equipDialog_Hero .equip_hero_Swiper .swiper-wrapper").append(div);

    //选择英雄事件
    $("#equip_selectHero").bind("touchend", function () {
        if (cancel())
            return;
        $("#equip_selectHero").css("background-position-y", "0");
        $(".equip_heroDetailSelect").removeClass("equip_heroDetailSelect");
        $(this).addClass("equip_heroDetailSelect");
        $(".equip_hero_select").hide();
        $(this).siblings(".equip_hero_select").show();

        $("#LvUpLight").show();
        $("#equipNowHero").removeAttr("index");
        var tempDiv = $("#equipDialog_man");
        tempDiv.children(".heroequip_heroDetail").text("");
        tempDiv.children("div").css("background-image", "");
        $("#equipDialog_man").removeAttr("sid");

        HeroEquipData.canChange = true;
        //重置数据
        for (var i = 0; i < 4; i++) {
            var tempDiv = $("#equipDialog_equip" + i);
            if (tempDiv.attr("sid")) {
                tempDiv.removeAttr("sid");
                tempDiv.removeAttr("type");
                tempDiv.children(".equipDialog_equipBg").css("background-image", "");
                tempDiv.children(".equipDialog_equipImg").css("background-image", "");
                tempDiv.children(".equipData").text("");
                tempDiv.children(".LvUpEat_font2").show();
                tempDiv.children(".equipLv").remove();
                $("#heroequip_lv").html("");
                $("#heroequip_star").css("height", 0);
                $("#heroequip_shuai").hide();
            }
        }
        
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })

    $("#equipNowHero").bind("touchend", function () {
        if (cancel())
            return;
        if (!HeroEquipData.canChange) {
            return;
        }
        else {
            showEquipHeroSelectDialog();
        }
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })


    //选择装备事件
    $(".equipDialog_equip").bind("touchend", function () {
        if (cancel())
            return;
        if (!$("#equipDialog_man").attr("sid"))
            return;
        HeroEquipData.nowclick = $(this).index();
        if ($(this).attr("sid")) {
            window.GameMainClass.sendRequestJson(176, '{"equip":"true","itemsid":' + $(this).attr("sid") + '}', "showGoodDetail");
            return;
        }
        showEquipGoodSelect();
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })

    //一键卸下
    $("#wareOffAll").bind("touchend", function () {
        if (!cancel()) {
            window.GameMainClass.sendRequestJson(196, "{\"gsid\":" + heroJson.data[$("#equipNowHero").attr("index")].g.split(",")[10] + "}", "wareOffAll");
        }
        $(this).css({ "-webkit-transform": "scale(1)" });
    }).bind("touchmove", function () {
        move();
    }).bind("touchstart", function () {
        begin();
        window.GameMainClass.playEffectSound("close");
        $(this).css({ "-webkit-transform": "scale(0.8)" });
    })

    //铁匠铺事件
    $("#goEquipBtn").bind("touchend", function () {
        if (!cancel()) {
            $("#heroEquip").remove();
            $("#mask").hide();
            HeroEquipData = { "flag": false, "nowclick": "", "heroSid": "", "canChange": true };
            showRefineBase();
        }
        $(this).css({ "-webkit-transform": "scale(1)" });
    }).bind("touchmove", function () {
        move();
    }).bind("touchstart", function () {
        begin();
        window.GameMainClass.playEffectSound("close");
        $(this).css({ "-webkit-transform": "scale(0.8)" });
    })

    //绑定关闭事件
    $("#close").bind("touchend", function () {
        if (!cancel()) {
            $("#heroEquip").remove();
            $("#mask").hide();
            HeroEquipData = { "flag": false, "nowclick": "", "heroSid": "","canChange":true };
        }
        $(this).css({ "-webkit-transform": "scale(1)" });
    }).bind("touchmove", function () {
        move();
    }).bind("touchstart", function () {
        begin();
        window.GameMainClass.playEffectSound("close");
        $(this).css({ "-webkit-transform": "scale(0.8)" });
    })
    $(".equip_hero_select:first").show().siblings("#equip_selectHero").css("background-position-y", "0");

    if (equipJson.data) {
        //左边英雄列表
        for (var i = 0; i < equipJson.data.length; i++) {
            var div = document.createElement("div");
            div.className = "swiper-slide equip-hero-slide";
            var tempHeroDetail = getHeroDetailByGsid(equipJson.data[i].gsid).split(",");
            var j = 0;
            for (; j < heroJson.data.length; j++) {
                if (heroJson.data[j].g.split(",")[10] == equipJson.data[i].gsid) {
                    $(div).html("<div class='equip_hero_select'></div><div class='equip_heroDetail' style='color:" + getColor(tempHeroDetail[8]) + "'>" + tempHeroDetail[3] + "</div>");
                    $(div).attr("index", j);
                    $("#equipDialog_Hero .equip_hero_Swiper .swiper-wrapper").append(div);
                    break;
                }
            }
        }

        var heroEquipSwiper = new Swiper('.equip_hero_Swiper', {
            mode: 'vertical',
            slidesPerSlide: 6
        });

        //英雄点击事件
        $(".equip_heroDetail").bind("touchend", function () {
            if (cancel())
                return;
            $("#equip_selectHero").css("background-position-y", "40px");
            $(".equip_heroDetailSelect").removeClass("equip_heroDetailSelect");
            $(this).addClass("equip_heroDetailSelect");
            $(".equip_hero_select").hide();
            $(this).siblings(".equip_hero_select").show();
            HeroEquipData.canChange = false;
            showHeroEquip_Detail($(this).parent().attr("index"));
        }).bind("touchstart", function () {
            begin();
        }).bind("touchmove", function () {
            move();
        })
    }

}

var showHeroEquip_Detail = function (index) {
    $("#LvUpLight").hide();
    
    //重置数据
    for (var i = 0; i < 4; i++) {
        var tempDiv = $("#equipDialog_equip" + i);
        if (tempDiv.attr("sid")) {
            tempDiv.removeAttr("sid");
            tempDiv.removeAttr("type");
            tempDiv.children(".equipDialog_equipBg").css("background-image", "");
            tempDiv.children(".equipDialog_equipImg").css("background-image", "");
            tempDiv.children(".LvUpEat_font2").show();
            tempDiv.children(".equipLv").remove();
            $("#heroequip_lv").html("");
            $("#heroequip_star").css("height", 0);
            $("#heroequip_shuai").hide();
        }
    }


    HeroEquipData.flag = true;
    var detail = heroJson.data[index].g.split(",");
    var localDetail = getLocalHeroDetail(detail[0]);
    HeroEquipData.heroSid = detail[10];
    $("#equipNowHero").attr("index", index);
    $("#equipDialog_man").attr("sid", detail[10]);


    var heroDiv = $("#equipDialog_man");
    heroDiv.attr("sid", detail[10]);
    heroDiv.attr("job", localDetail.job);
    heroDiv.children(".man").css("background-image", "url(res/man/" + detail[15] + ".png)");
    heroDiv.children(".heroequip_heroDetail").css("color", getColor(detail[8])).text(detail[3]);

    //lv detail[1]
    $("#heroequip_lv").html(getLv(detail[1]));
    $("#heroequip_star").css("height", Number(detail[8]) * 30);
    $("#heroequip_shuai").css("background-position", -(localDetail.gclass - 1) * 41).show();

    heroDiv.children(".shangdi").css("background-image", "url(res/man/q" + detail[8] + ".png)");
    heroDiv.children(".equip_man_job").css({"background-position": getJobSamll(detail[7], detail[16]),"background-image":"url(res/public/job.png)"});
    if (IsSuperHero(parseInt(detail[2]))) {
        heroDiv.children(".heroEquipshidi").css("background-image", "url(res/man/sdbg2.png)");
    }
    else {
        heroDiv.children(".heroEquipshidi").css("background-image", "url(res/man/sdbg1.png)");
    }

    //加载此武将已有装备

    for (var i = 0; i < bagJson.data.length; i++) {
        var tempSplit = bagJson.data[i].p.split(",");
        if (tempSplit[1] == HeroEquipData.heroSid) {
            switch (tempSplit[3]) {
                //武器
                case "1":
                    var tempDiv = $("#equipDialog_equip0");
                    tempDiv.children(".equipDialog_equipImg").css("background-image", "url(res/goods/" + tempSplit[2] + ".png)");
                    tempDiv.children(".equipDialog_equipBg").css("background-image", "url(res/head/" + tempSplit[7] + ".png)");
                    tempDiv.attr("sid", tempSplit[0]);
                    tempDiv.attr("type", tempSplit[3]);
                    tempDiv.attr("value", tempSplit[9]);
                    tempDiv.children(".LvUpEat_font2").hide();
                    if (tempSplit[4] != 0) {
                        tempDiv.append("<div class='equipLv' style='position: absolute;right: 8px;bottom: 8px;'>" + getRefineLv(tempSplit[4]) + "</div>");
                    }
                    break;
                case "2":
                    var tempDiv = $("#equipDialog_equip1");
                    tempDiv.children(".equipDialog_equipImg").css("background-image", "url(res/goods/" + tempSplit[2] + ".png)");
                    tempDiv.children(".equipDialog_equipBg").css("background-image", "url(res/head/" + tempSplit[7] + ".png)");
                    tempDiv.attr("sid", tempSplit[0]);
                    tempDiv.attr("type", tempSplit[3]);
                    tempDiv.attr("value", tempSplit[9]);
                    tempDiv.children(".LvUpEat_font2").hide();
                    if (tempSplit[4] != 0) {
                        tempDiv.append("<div class='equipLv' style='position: absolute;right: 8px;bottom: 8px;'>" + getRefineLv(tempSplit[4]) + "</div>");
                    }
                    break;
                case "3":
                    var tempDiv = $("#equipDialog_equip2");
                    tempDiv.children(".equipDialog_equipImg").css("background-image", "url(res/goods/" + tempSplit[2] + ".png)");
                    tempDiv.children(".equipDialog_equipBg").css("background-image", "url(res/head/" + tempSplit[7] + ".png)");
                    tempDiv.attr("sid", tempSplit[0]);
                    tempDiv.attr("type", tempSplit[3]);
                    tempDiv.attr("value", tempSplit[9]);
                    tempDiv.children(".LvUpEat_font2").hide();
                    if (tempSplit[4] != 0) {
                        tempDiv.append("<div class='equipLv' style='position: absolute;right: 8px;bottom: 8px;'>" + getRefineLv(tempSplit[4]) + "</div>");
                    }
                    break;
                case "4":
                    var tempDiv = $("#equipDialog_equip3");
                    tempDiv.children(".equipDialog_equipImg").css("background-image", "url(res/goods/" + tempSplit[2] + ".png)");
                    tempDiv.children(".equipDialog_equipBg").css("background-image", "url(res/head/" + tempSplit[7] + ".png)");
                    tempDiv.attr("sid", tempSplit[0]);
                    tempDiv.attr("type", tempSplit[3]);
                    tempDiv.attr("value", tempSplit[9]);
                    tempDiv.children(".LvUpEat_font2").hide();
                    if (tempSplit[4] != 0) {
                        tempDiv.append("<div class='equipLv' style='position: absolute;right: 8px;bottom: 8px;'>" + getRefineLv(tempSplit[4]) + "</div>");
                    }
                    break;
                case "5":
                    var tempDiv = $("#equipDialog_equip3");
                    tempDiv.children(".equipDialog_equipImg").css("background-image", "url(res/goods/" + tempSplit[2] + ".png)");
                    tempDiv.children(".equipDialog_equipBg").css("background-image", "url(res/head/" + tempSplit[7] + ".png)");
                    tempDiv.attr("sid", tempSplit[0]);
                    tempDiv.attr("type", tempSplit[3]);
                    tempDiv.attr("value", tempSplit[9]);
                    tempDiv.children(".LvUpEat_font2").hide();
                    if (tempSplit[4] != 0) {
                        tempDiv.append("<div class='equipLv' style='position: absolute;right: 8px;bottom: 8px;'>" + getRefineLv(tempSplit[4]) + "</div>");
                    }
                    break;
            }
        }
    }

    //加载左边列表详情
    showHeroEquipLeftDetail(detail);
}

//穿上装备
var heroEquipWare = function (json) {
    var tempJson = JSON.parse(json);
    //var tempJson = { "Client": [{ "itemsid": 212, "lastitemsid": 0, "gsid": 260 }], "info": "ok", "resert": 1 };
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info,2);
    } else {
        //改json
        //{ "data": [{ "def": 211, "gsid": 131 }, { "atk": 207, "gsid": 155, "hp": 210, "jew": 213 }], "resert": 1 };

        //判断是否存在这个武将的的装备json
        var flag = false;
        var i = 0;

        for (; i < equipJson.data.length; i++) {
            if (equipJson.data[i].gsid == tempJson.Client[0].gsid) {
                flag = true;
                break;
            }
        }

        if (!flag) {
            var tempObject = { "gsid": tempJson.Client[0].gsid };
            equipJson.data.push(tempObject);
        }

        switch (HeroEquipData.nowclick) {
            case 0:
                equipJson.data[i].atk = tempJson.Client[0].itemsid;
                break;
            case 1:
                equipJson.data[i].hp = tempJson.Client[0].itemsid;
                break;
            case 2:
                equipJson.data[i].def = tempJson.Client[0].itemsid;
                break;
            case 3:
                equipJson.data[i].jew = tempJson.Client[0].itemsid;
                break;
        }
        if (!flag) {
            showHeroEquipDialog();

            for (var j = 0; j < heroJson.data.length; j++) {
                if (heroJson.data[j].g.split(",")[10] == tempJson.Client[0].gsid) {
                    showHeroEquip_Detail(j);

                    //var tempDiv = $(".equip-hero-slide");
                    //for (var x = 0; x < tempDiv.length; x++) {
                    //    if (heroJson.data[tempDiv.eq(x).attr("index")].g.split(",")[10] == tempJson.Client[0].gsid) {
                    //        $("#equip_selectHero").css("background-position-y", "40px");
                    //        $(".equip_heroDetailSelect").removeClass("equip_heroDetailSelect");
                    //        $(this).children(".equip_heroDetail").addClass("equip_heroDetailSelect");
                    //        $(".equip_hero_select").hide();
                    //        $(this).children(".equip_heroDetail").siblings(".equip_hero_select").show();
                    //    }
                    //}
                    
                    break;
                }
            }
        }
        

    }
}

//卸下装备
var heroEquipOff = function (json) {
    var tempJson = JSON.parse(json);
    //var tempJson = { "Client": [{ "itemsid": 212 }], "gsid": 260, "info": "OK", "resert": 1 };
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info,2);
    }
    else {
        var flag = false;
        //改武将装备json
        for (var i = 0; i < 4; i++) {
            if ($("#equipDialog_equip" + i).attr("sid")) {
                //不需要删除json
                flag = true;
                break;
            }
        }


        for (var i = 0; i < equipJson.data.length; i++) {
            if (equipJson.data[i].gsid == tempJson.gsid) {
                if (flag) {
                    switch (HeroEquipData.nowclick) {
                        case 0:
                            equipJson.data[i].atk = undefined;
                            break;
                        case 1:
                            equipJson.data[i].hp = undefined;
                            break;
                        case 2:
                            equipJson.data[i].def = undefined;
                            break;
                        case 3:
                            equipJson.data[i].jew = undefined;
                            break;
                    }

                }
                else {
                    equipJson.data.splice(i, 1);
                    showHeroEquipDialog();
                }
            }
        }



    }
}

//左边详情
var showHeroEquipLeftDetail = function (detail) {
    var hp = 0, atk = 0, def = 0, hit = 0, miss = 0, baoji = 0, renxing = 0;

    var tempSplit;

    for (var i = 0; i < 4; i++) {
        var tempDiv = $("#equipDialog_equip" + i);
        if (!tempDiv.attr("type"))
            continue;

        var tempRefVal = 0;

        //宝石的加成---强化加成
        var tempEquipId = tempDiv.attr("sid");
        for (var x = 0; x < bagJson.data.length; x++) {
            tempSplit= bagJson.data[x].p.split(",");
            if (tempSplit[8] == tempEquipId) {
                switch (tempSplit[3] ) {
                    case "6":
                    case "1":
                        atk += Number(tempSplit[9]);
                        break;
                    case "7":
                    case "2":
                        hp += Number(tempSplit[9]);
                        break;
                    case "8":
                    case "3":
                        def += Number(tempSplit[9]);
                        break;
                    case "9":
                        hit += Number(tempSplit[9]);
                        break;
                    case "10":
                    case "5":
                        baoji += Number(tempSplit[9]);
                        break;
                    case "11":
                    case "4":
                        miss += Number(tempSplit[9]);
                        break;
                    case "12":
                        renxing += Number(tempSplit[9]);
                        break;
                }
                break;
            }
            
            if (tempSplit[0] == tempEquipId) {
                tempRefVal = Number(tempSplit[6]);
            }
        }
        switch (tempDiv.attr("type")) {
            case "6":
            case "1":
                atk += Number(tempDiv.attr("value")) + tempRefVal;
                break;
            case "7":
            case "2":
                hp += Number(tempDiv.attr("value")) + tempRefVal;
                break;
            case "8":
            case "3":
                def += Number(tempDiv.attr("value")) + tempRefVal;
                break;
            case "9":
                hit += Number(tempDiv.attr("value")) + tempRefVal;
                break;
            case "10":
            case "5":
                baoji += Number(tempDiv.attr("value")) + tempRefVal;
                break;
            case "11":
            case "4":                
                miss += Number(tempDiv.attr("value")) + tempRefVal;
                break;
            case "12":
                renxing += Number(tempDiv.attr("value")) + tempRefVal;
                break;
        }

    }


    //本地json
    var tempDetail = getLocalHeroDetail(detail[0]);
    
    $("#equipDialog_Hp").html("生命:<font class='equipDetail_font'>" + detail[4] + "</font><font class='equipDetail_font2'>+" + hp + "<font>");
    $("#equipDialog_Atk").html("攻击:<font class='equipDetail_font'>" + detail[5] + "</font><font class='equipDetail_font2'>+" + atk + "<font>");
    $("#equipDialog_Def").html("物防:<font class='equipDetail_font'>" + tempDetail.wukang/100 + "%</font><font class='equipDetail_font2'>+" + def/100  + "%<font>");
    $("#equipDialog_Def2").html("法防:<font class='equipDetail_font'>" + tempDetail.fakang/100 + "%</font><font class='equipDetail_font2'>+" + def/100  + "%<font>");
    $("#equipDialog_Hit").html("命中:<font class='equipDetail_font'>" + tempDetail.hit/100 + "%</font><font class='equipDetail_font2'>+" + hit/100 + "%<font>");
    $("#equipDialog_Miss").html("闪避:<font class='equipDetail_font'>"+tempDetail.miss/100+"%</font><font class='equipDetail_font2'>+" + miss/100 + "%<font>");
    $("#equipDialog_Baoji").html("暴击:<font class='equipDetail_font'>"+tempDetail.baoji/100+"%</font><font class='equipDetail_font2'>+" + baoji/100 + "%<font>");
    $("#equipDialog_Renxing").html("韧性:<font class='equipDetail_font'>"+tempDetail.renxing/100+"%</font><font class='equipDetail_font2'>+" + renxing/100 + "%<font>");
}

var showEquipHeroSelectDialog = function () {
    $("#temp").html("<div id='hero'style='z-index:4;position:absolute;left:" + (width - 800) / 2 + "px;top:" + ((height - 480) / 2) + "px'><div id='title'><div id='titleLeft'></div><div id='titleCenter'><div id='titleContext'style='background-image:url(res/public/title/10.png);'></div></div><div id='titleRight'></div></div><div id='waikuan'><div id='shangjiao'class='jiao shangjiao'></div><div id='xiajiao'class='jiao xiajiao'></div><div id='zuojiao'class='jiao zuojiao'></div><div id='youjiao'class='jiao youjiao'></div><div class='shangwaibian'></div><div class='xiawaibian'></div><div class='zuowaibian'></div><div class='youwaibian'></div></div><div id='tempClose'></div><div id='rope'></div><div id='teamChange'><div id='heroSwiper'class='swiper-container heroSwiper'><div class='swiper-wrapper'id='heroWrapper'></div></div></div><div id='heroPageData'></div><div id='pagePrevBtn'></div><div id='pageNextBtn'></div><div id='select_icon'class='hero_icon hero_icon_select'></div></div>");
    $("#mask").show();

    if (pad) $("#hero").css({"zoom": sp, "left": (width - 800 * sp) / 2 / sp, "top": ((height - 470 * sp) / 2 / sp)});

    var tempHasHero;
    tempMemoryJson.data.length = 0;
    tempUseIndex.length = 0;
    for (var x = 0; x < heroJson.data.length; x++) {
        //已有装备武将不显示
        if (typeof equipJson.data!="undefined") {
            tempHasHero = false;
            var NowHeroData = heroJson.data[x].g.split(",");
            for (var j = 0; j < equipJson.data.length; j++) {
                if (equipJson.data[j].gsid == NowHeroData[10]) {
                    tempHasHero = true;
                    break;
                }
            }
            if (tempHasHero)
                continue;
        }
        tempMemoryJson.data.push(heroJson.data[x]);
        tempUseIndex.push(x);
    }

    //翻页
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
        showHeroEquipPage();
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
        showHeroEquipPage();
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })


    //绑定关闭事件
    $("#tempClose").bind("touchend", function () {
        if (!cancel()) {
            showHeroEquipDialog();
            $("#temp").html("");
        }
        $(this).css({ "-webkit-transform": "scale(1)" });
    }).bind("touchmove", function () {
        move();
    }).bind("touchstart", function () {
        begin();
        window.GameMainClass.playEffectSound("close");
        $(this).css({ "-webkit-transform": "scale(0.8)" });
    })


    usePage = 0;

    useLength = tempMemoryJson.data.length;

    usePageAll = Math.ceil(useLength / 8) - 1;

    $("#heroPageData").html("页数:<font id='pageNow' style='color:#26E50E;'>1</font><font style='color:#26E50E;'>/" + Math.ceil(useLength / 8) + "</font><br/>武将数:<font style='color:#26E50E'>" + useLength + "/" + userJson.gnum + "</font>");

    $("#heroWrapper").append("<div class='swiper-slide hero-slide' id='heroside0'><div id='heroChangePage0' class='heroChangePage'></div></div>");

    showHeroEquipPage();
}

//英雄装备选择页面
var showHeroEquipPage = function () {

    $("#heroChangePage0").html("");
    $("#pageNow").text(usePage + 1);

    var tempLastIndex  = useLength > (usePage + 1) * 8 ? (usePage + 1) * 8 : useLength;

    var arr = new Array();

    for (var i = usePage * 8; i < tempLastIndex; i++) {

        var NowHeroData = tempMemoryJson.data[i].g.split(",");

        var tempHeroDetail = getLocalHeroDetail(NowHeroData[0]);


        var heroDiv = document.createElement("div");
        heroDiv.className = "heroChange";
        heroDiv.setAttribute("index", tempUseIndex[i]);
        heroDiv.setAttribute("gsid", NowHeroData[10]);

        arr.length = 0;

        if (IsSuperHero(Number(NowHeroData[2]))) {
            arr.push("<div class='noHeroHeadBg'><img class='heroHeadColor' style='z-index:2;left:3px' src='res/head/s" + NowHeroData[8] + ".png' ></img><img style='z-index:1;left:3px' class='heroHead' src='res/head/" + NowHeroData[15] + ".png'></img></div><div class='heroChangeDetail' ontouchstart='begin()' ontouchmove='move()' ontouchend='heroEquipChooseHero(this)'><div class='heroLv'>" + getLv(NowHeroData[1]) + "</div>");
            arr.push("<div class='jobSamll' style='background-position:" + getJobSamll(NowHeroData[7], NowHeroData[16]) + "'></div>");
        }
        else {
            arr.push("<div class='noHeroHeadBg' ><img class='heroHeadColor' style='z-index:2;left:3px' src='res/head/" + NowHeroData[8] + ".png' ></img><img style='z-index:1;left:3px' class='heroHead' src='res/head/" + NowHeroData[15] + ".png'></img></div><div class='heroChangeDetail' ontouchstart='begin()' ontouchmove='move()' ontouchend='heroEquipChooseHero(this)'><div class='heroLv'>" + getLv(NowHeroData[1]) + "</div>");
            arr.push("<div class='jobSamll' style='background-position:" + getJobSamll(NowHeroData[7], NowHeroData[16]) + "'></div>");
        }
        arr.push("<table class='heroTable'><tr><td style='color:" + getColor(NowHeroData[8]) + "'>" + NowHeroData[3] + "</td></tr><tr><td style='width:95px;'>" + NowHeroData[4] + "</td><td style='width:85px;'>" + NowHeroData[5] + "</td><td style='width:54px;'>" + NowHeroData[1] + "/" + NowHeroData[14] + " </td></tr></table></div>")
        heroDiv.innerHTML = arr.join("");
        $("#heroChangePage0").append(heroDiv);

        //"战"字
        for (var m = 0; m < 5; m++) {
            if (NowHeroData[10] == teamJson.data[m].g) {
                $(heroDiv).children(".heroChangeDetail").append("<div class='heroZhan'></div>");
                break;
            }
        }


    }
}

var showEquipGoodSelect = function () {
    $("#temp").html("<div id='bag' style='z-index:5;position:absolute;left:" + (width - 800) / 2 + "px;top:" + (height - 480) / 2 + "px'><div id='title'><div id='titleLeft'></div><div id='titleCenter'><div id='titleContext'style='background-image:url(res/public/title/21.png);'></div></div><div id='titleRight'></div></div><div id='waikuan'><div id='shangjiao'class='jiao shangjiao'></div><div id='xiajiao'class='jiao xiajiao'></div><div id='zuojiao'class='jiao zuojiao'></div><div id='youjiao'class='jiao youjiao'></div><div class='shangwaibian'></div><div class='xiawaibian'></div><div class='zuowaibian'></div><div class='youwaibian'></div></div><div id='tempClose'></div><div id='rope'></div><div id='bagDialog'><div class='swiper-container bagSwiper'><div class='swiper-wrapper'><div class='swiper-slide bag-slide'><div id='bagPage0'class='bagPage'></div></div></div></div></div><div id='heroPageData' style='bottom:34px;left:103px;'></div><div id='pagePrevBtn'></div><div id='pageNextBtn'></div><div id='select_icon'class='hero_icon hero_icon_select'></div></div>");

    if (pad) $("#bag").css({ "zoom": sp, "left": (width - 800 * sp) / 2 / sp, "top": (height - 480 * sp) / 2 / sp });

    tempMemoryJson.data.length = 0;
    tempUseIndex.length = 0;
    for (var x = 0; x < bagJson.data.length; x++) {
        var detail = bagJson.data[x].p.split(",");

        var localDetail;
        var j = 0
        for (; j < GoodsJson.data.length; j++) {
            if (GoodsJson.data[j].ItemID == detail[2]) {
                localDetail = GoodsJson.data[j];
                break;
            }
        }

        //装备
        if (localDetail.Type > 5) {
            continue;
        }

        var tempSid = $("#equipDialog_man").attr("sid");
        if (detail[1] != tempSid && detail[1] != 0) {
            continue;
        }
        for (var y = 0; y < GoodsJson.data.length; y++) {
            if(GoodsJson.data[y].ItemID==detail[3])
                alert(GoodsJson.data[y].Name)
        }

        var tempNeed;
        switch (Number($("#equipDialog_man").attr("job"))) {
            case 1:
            case 2:
                tempNeed = 1;
                break;
            case 3:
                tempNeed = 2;
                break;
            case 4:
                tempNeed = 3;
                break;
            case 5:
            case 6:
                tempNeed = 4;
                break;
            default:
                tempNeed = 0;
                break;
        }

        if (detail[3] == 1 && tempNeed != localDetail.JobNeed) {
            continue;
        }

        switch (HeroEquipData.nowclick) {
            case 0:
                if (detail[3] != "1")
                    continue;
                break;
            case 1:
                if (detail[3] != "2")
                    continue;
                break;
            case 2:
                if (detail[3] != "3")
                    continue;
                break;
            case 3:
                if (detail[3] != "4" && detail[3] != "5")
                    continue;
                break;
        }

        tempMemoryJson.data.push(bagJson.data[x]);
        tempUseIndex.push(x);

    }

    //绑定关闭事件
    $("#tempClose").bind("touchend", function () {
        if (!cancel()) {
            $("#temp").html("");
        }
        $(this).css({ "-webkit-transform": "scale(1)" });
    }).bind("touchmove", function () {
        move();
    }).bind("touchstart", function () {
        begin();
        window.GameMainClass.playEffectSound("close");
        $(this).css({ "-webkit-transform": "scale(0.8)" });
    })

    if (tempMemoryJson.data.length == 0) {
        showTextMess("没有可穿戴的装备", 2);
        $("#heroPageData").html("页数:<font id='pageNow' style='color:#26E50E;'>0</font><font style='color:#26E50E;'>/0</font></font>");
        $("#pagePrevBtn,#pageNextBtn").unbind("touchstart").unbind("touchmove").unbind("touchend");
        return;
    }

    usePage = 0;

    useLength = tempMemoryJson.data.length;

    usePageAll = Math.ceil(useLength / 8) - 1;

    $("#heroPageData").html("页数:<font id='pageNow' style='color:#26E50E;'>1</font><font style='color:#26E50E;'>/" + Math.ceil(useLength / 8) + "</font><br/>");

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
        showEquipGoodPage();

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
        showEquipGoodPage();
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })

    showEquipGoodPage();

    $(".goodDetail_use").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        //卸下
        if ($(this).parent().find(".goodDetail_use").css("display") == "block") {

            var tempNumFlag = 0;
            for (var i = 0; i < bagJson.data.length; i++) {
                var tempJust = bagJson.data[i].p.split(",")
                if (tempJust[8] == "0" && tempJust[1] == "0") {
                    tempNumFlag++;
                }
            }
            if (tempNumFlag + 1 >= userJson.pnum) {
                showTextMess("仓库位不足", 1);
                return;
            }

            window.GameMainClass.sendRequestJson(122, "{\"itemsid\":" + $(this).parent().attr("sid") + "}", "heroEquipOff");
            //将此装备的serialID取消
            var tempSplit = bagJson.data[$(this).parent().attr("bagIndex")].p.split(",");
            tempSplit[1] = 0;
            bagJson.data[$(this).parent().attr("bagIndex")].p = tempSplit.join(",");
            $("#temp").html("");
            for (var i = 0; i < 4; i++) {
                var tempDiv = $("#equipDialog_equip" + i);
                if (tempDiv.attr("sid") == $(this).parent().attr("sid")) {
                    tempDiv.removeAttr("sid");
                    tempDiv.removeAttr("type");
                    tempDiv.children(".equipDialog_equipBg").css("background-image", "");
                    tempDiv.children(".equipDialog_equipImg").css("background-image", "");
                    tempDiv.children(".equipLv").remove();

                    tempDiv.children(".LvUpEat_font2").show();
                    var tempUseJson = heroJson.data[$("#equipNowHero").attr("index")].g.split(",");
                    showHeroEquipLeftDetail(tempUseJson);
                    break;
                }
            }
            return;
        }
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })

    //绑定选择物品事件
    $(".goodDetail").bind("touchend", function () {
        if (cancel())
            return;
        //卸下
        if ($(this).parent().find(".goodDetail_use").css("display") == "block") {
            var tempNumFlag = 0;
            for (var i = 0; i < bagJson.data.length; i++) {
                var tempJust = bagJson.data[i].p.split(",")
                if (tempJust[8] == "0" && tempJust[1] == "0") {
                    tempNumFlag++;
                }
            }
            if (tempNumFlag + 1 >= userJson.pnum) {
                showTextMess("仓库位不足", 1);
                return;
            }
            window.GameMainClass.sendRequestJson(122, "{\"itemsid\":" + $(this).parent().attr("sid") + "}", "heroEquipOff");
            //将此装备的serialID取消
            var tempSplit = bagJson.data[$(this).parent().attr("bagIndex")].p.split(",");
            tempSplit[1] = 0;
            bagJson.data[$(this).parent().attr("bagIndex")].p = tempSplit.join(",");
            $("#temp").html("");
            for (var i = 0; i < 4; i++) {
                var tempDiv = $("#equipDialog_equip" + i);
                if (tempDiv.attr("sid") == $(this).parent().attr("sid")) {
                    tempDiv.removeAttr("sid");
                    tempDiv.removeAttr("type");
                    tempDiv.children(".equipDialog_equipBg").css("background-image", "");
                    tempDiv.children(".equipDialog_equipImg").css("background-image", "");
                    tempDiv.children(".equipLv").remove();

                    tempDiv.children(".LvUpEat_font2").show();
                    var tempUseJson = heroJson.data[$("#equipNowHero").attr("index")].g.split(",");
                    showHeroEquipLeftDetail(tempUseJson);
                    break;
                }
            }
            return;
        }

        //判断是否存在此类型 有则替换 没有则穿上
        if ($(this).parent().attr("lv") > Number(heroJson.data[$("#equipNowHero").attr("index")].g.split(",")[1])) {
            showTextMess("武将等级不能小于装备等级!", 2);
            return;
        }
        var tempType = GoodsJson.data[$(this).parent().attr("localIndex")].Type;
        var nowType = $("#equipDialog_equip" + HeroEquipData.nowclick).attr("type");
        if (nowType != tempType) {
            for (var i = 0; i < 4; i++) {
                var tempDiv = $("#equipDialog_equip" + i);
                if (tempDiv.attr("type")) {
                    if (tempDiv.attr("type") == tempType) {
                        showTextMess("已装备此类型", 2);
                        return;
                    }
                }
            }
        }

        //加载装备界面
        var tempEquipDetail = GoodsJson.data[$(this).parent().attr("localindex")];
        var tempEquip = bagJson.data[$(this).parent().attr("bagIndex")].p.split(",");

        //计算是否为替换
        var lastitemsid = 0;

        switch (tempEquipDetail.Type) {
            case 1:
                var tempDiv = $("#equipDialog_equip0");

                if (tempDiv.attr("sid")) {
                    lastitemsid = tempDiv.attr("sid");
                }

                tempDiv.attr("type", tempEquipDetail.Type);
                tempDiv.attr("sid", tempEquip[0]);
                tempDiv.attr("value", tempEquip[9]);
                tempDiv.children(".equipDialog_equipImg").css("background-image", "url(res/goods/" + tempEquipDetail.ImgID + ".png)");
                tempDiv.children(".equipDialog_equipBg").css("background-image", "url(res/head/" + tempEquipDetail.Q + ".png)");

                tempDiv.children(".LvUpEat_font2").hide();
                var tempUseJson = heroJson.data[$("#equipNowHero").attr("index")].g.split(",");
                showHeroEquipLeftDetail(tempUseJson);
                tempDiv.children(".equipLv").remove();
                if (tempEquip[4] != 0) {
                    tempDiv.append("<div class='equipLv' style='position: absolute;right: 8px;bottom: 8px;'>" + getRefineLv(tempEquip[4]) + "</div>");
                }
                break;
            case 2:
                var tempDiv = $("#equipDialog_equip1");

                if (tempDiv.attr("sid")) {
                    lastitemsid = tempDiv.attr("sid");
                }

                tempDiv.attr("type", tempEquipDetail.Type);
                tempDiv.attr("sid", tempEquip[0]);
                tempDiv.attr("value", tempEquip[9]);
                tempDiv.children(".equipDialog_equipImg").css("background-image", "url(res/goods/" + tempEquipDetail.ImgID + ".png)");
                tempDiv.children(".equipDialog_equipBg").css("background-image", "url(res/head/" + tempEquipDetail.Q + ".png)");
                tempDiv.children(".equipLv").remove();
                if (tempEquip[4] != 0) {
                    tempDiv.append("<div class='equipLv' style='position: absolute;right: 8px;bottom: 8px;'>" + getRefineLv(tempEquip[4]) + "</div>");
                }
                tempDiv.children(".LvUpEat_font2").hide();
                var tempUseJson = heroJson.data[$("#equipNowHero").attr("index")].g.split(",");
                showHeroEquipLeftDetail(tempUseJson);
                break;
            case 3:
                var tempDiv = $("#equipDialog_equip2");

                if (tempDiv.attr("sid")) {
                    lastitemsid = tempDiv.attr("sid");
                }

                tempDiv.attr("type", tempEquipDetail.Type);
                tempDiv.attr("sid", tempEquip[0]);
                tempDiv.attr("value", tempEquip[9]);
                tempDiv.children(".equipDialog_equipImg").css("background-image", "url(res/goods/" + tempEquipDetail.ImgID + ".png)");
                tempDiv.children(".equipDialog_equipBg").css("background-image", "url(res/head/" + tempEquipDetail.Q + ".png)");
                tempDiv.children(".equipLv").remove();
                if (tempEquip[4] != 0) {
                    tempDiv.append("<div class='equipLv' style='position: absolute;right: 8px;bottom: 8px;'>" + getRefineLv(tempEquip[4]) + "</div>");
                }
                tempDiv.children(".LvUpEat_font2").hide();
                var tempUseJson = heroJson.data[$("#equipNowHero").attr("index")].g.split(",");
                showHeroEquipLeftDetail(tempUseJson);
                break;
            case 4:
                var tempDiv = $("#equipDialog_equip3");

                if (tempDiv.attr("sid")) {
                    lastitemsid = tempDiv.attr("sid");
                }

                tempDiv.attr("type", tempEquipDetail.Type);
                tempDiv.attr("sid", tempEquip[0]);
                tempDiv.attr("value", tempEquip[9]);
                tempDiv.children(".equipDialog_equipImg").css("background-image", "url(res/goods/" + tempEquipDetail.ImgID + ".png)");
                tempDiv.children(".equipDialog_equipBg").css("background-image", "url(res/head/" + tempEquipDetail.Q + ".png)");
                tempDiv.children(".equipLv").remove();
                if (tempEquip[4] != 0) {
                    tempDiv.append("<div class='equipLv' style='position: absolute;right: 8px;bottom: 8px;'>" + getRefineLv(tempEquip[4]) + "</div>");
                }
                tempDiv.children(".LvUpEat_font2").hide();
                var tempUseJson = heroJson.data[$("#equipNowHero").attr("index")].g.split(",");
                showHeroEquipLeftDetail(tempUseJson);
                break;
            case 5:
                var tempDiv = $("#equipDialog_equip3");

                if (tempDiv.attr("sid")) {
                    lastitemsid = tempDiv.attr("sid");
                }

                tempDiv.attr("type", tempEquipDetail.Type);
                tempDiv.attr("sid", tempEquip[0]);
                tempDiv.attr("value", tempEquip[9]);
                tempDiv.children(".equipDialog_equipImg").css("background-image", "url(res/goods/" + tempEquipDetail.ImgID + ".png)");
                tempDiv.children(".equipDialog_equipBg").css("background-image", "url(res/head/" + tempEquipDetail.Q + ".png)");
                tempDiv.children(".equipLv").remove();
                if (tempEquip[4] != 0) {
                    tempDiv.append("<div class='equipLv' style='position: absolute;right: 8px;bottom: 8px;'>" + getRefineLv(tempEquip[4]) + "</div>");
                }


                tempDiv.children(".LvUpEat_font2").hide();
                var tempUseJson = heroJson.data[$("#equipNowHero").attr("index")].g.split(",");
                showHeroEquipLeftDetail(tempUseJson);
                break;
        }

        var sendJson = "{\"itemsid\":" + $(this).parent().attr("sid") + ",\"lastitemsid\":" + lastitemsid + ",\"gsid\":" + $("#equipDialog_man").attr("sid") + "}";
        window.GameMainClass.sendRequestJson(123, sendJson, "heroEquipWare");

        //将装备的json改变
        var tempSplit = bagJson.data[$(this).parent().attr("bagIndex")].p.split(",");
        tempSplit[1] = HeroEquipData.heroSid;
        bagJson.data[$(this).parent().attr("bagIndex")].p = tempSplit.join(",");

        if (lastitemsid != 0) {
            for (var x = 0; x < bagJson.data.length; x++) {
                var tempSplit2 = bagJson.data[x].p.split(",");
                if (tempSplit2[0] == lastitemsid) {
                    tempSplit2[1] = 0;
                    bagJson.data[x].p = tempSplit2.join(",");
                    break;
                }
            }
        }
        $("#temp").html("");
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })

}

//英雄装备点击选择页面
var showEquipGoodPage = function () {

    $("#bagPage0").html("");
    $("#pageNow").text(usePage + 1);

    var tempLastIndex = useLength > (usePage + 1) * 8 ? (usePage + 1) * 8 : useLength;

    var arr = new Array();

    for (var i = usePage * 8; i < tempLastIndex; i++) {

        var detail = tempMemoryJson.data[i].p.split(",");

        //此物品的详细信息
        var localDetail;
        var j = 0
        for (; j < GoodsJson.data.length; j++) {
            if (GoodsJson.data[j].ItemID == detail[2]) {
                localDetail = GoodsJson.data[j];
                break;
            }
        }

        var div = document.createElement("div");
        div.className = "bagItem";
        div.setAttribute("sid", detail[0])

        if (detail[10] != 0) {
            div.innerHTML = "<div class='bagHeadBg' ontouchstart='begin()' ontouchmove='move()' ontouchend='heroEquipDetailClick(this)');'><div class='bagHeadColor' style='background-image:url(res/head/" + localDetail.Q + ".png);'></div><div class='bagHead' style='background-image:url(res/goods/" + localDetail.ImgID + ".png);'></div></div><div class='goodDetail'style='background-position-y:0px;'><div class='bag_has_hole'></div><div class='goodDetail_name'></div><div class='goodDetail_value'></div></div><div id=''class='goodDetail_use'></div>";
        }
        else
            div.innerHTML = "<div class='bagHeadBg' ontouchstart='begin()' ontouchmove='move()' ontouchend='heroEquipDetailClick(this)');'><div class='bagHeadColor' style='background-image:url(res/head/" + localDetail.Q + ".png);'></div><div class='bagHead' style='background-image:url(res/goods/" + localDetail.ImgID + ".png);'></div></div><div class='goodDetail'style='background-position-y:0px;'><div class='goodDetail_name'></div><div class='goodDetail_value'></div></div><div id=''class='goodDetail_use'></div>";

        if (detail[1] != 0) {
            $(div).find(".goodDetail_use").css("display", "block");
        }

        div.setAttribute("sid", detail[0]);
        div.setAttribute("lv", Number(detail[4]));
        div.setAttribute("localIndex", j);
        div.setAttribute("bagIndex", tempUseIndex[i]);
        div.setAttribute("index", tempUseIndex[i]);

        if (detail[4] == "0")
            $(div).find(".goodDetail_name").text(localDetail.Name).css("color", getColor(String(localDetail.Q)));
        else
            $(div).find(".goodDetail_name").html(localDetail.Name + " + " + detail[4]).css("color", getColor(String(localDetail.Q)));;
        switch (localDetail.Type) {
            case 6:
            case 1:
                $(div).find(".goodDetail_value").text("攻击:" + localDetail.ATK);
                break;
            case 7:
            case 2:
                $(div).find(".goodDetail_value").text("生命:" + localDetail.HP);
                break;
            case 8:
            case 3:
                $(div).find(".goodDetail_value").text("防御:" + localDetail.DEF);
                break;
            case 9:
                $(div).find(".goodDetail_value").text("命中:" + localDetail.hit);
                break;
            case 10:
            case 5:
                $(div).find(".goodDetail_value").text("暴击:" + localDetail.baoji);
                break;
            case 11:
            case 4:
                $(div).find(".goodDetail_value").text("闪避:" + localDetail.miss);
                break;
            case 12:
                $(div).find(".goodDetail_value").text("韧性:" + localDetail.renxing);
                break;
            case 13:
            case 14:
            case 30:
                $(div).find(".goodDetail_value").text(localDetail.detail);
                break;
        }

        $("#bagPage0").append(div);

    }
}

//英雄选择事件
var heroEquipChooseHero = function (ev) {
    if (cancel())
        return;
    showHeroEquip_Detail($(ev).parent().attr("index"));
    $(".equip_hero_select").css("display", "none").siblings(".equip_heroDetail").removeClass("equip_heroDetailSelect");
    $(".equip_hero_select:first").css("display", "block").siblings("#equip_selectHero").css("background-position-y", "0");
    $("#temp").html("");
}

var heroEquipDetailClick = function (ev) {
    if (cancel())
        return;
    window.GameMainClass.sendRequestJson(176, '{"itemsid":' + $(ev).parent().attr("sid") + ',"just":"1"}', 'showGoodDetail');
}

//全部卸下
var wareOffAll = function (json) {
    var tempJson = JSON.parse(json);
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
    } else {
        showTextMess("装备全部卸下成功!",1);
        //删除本地json
        for (var i = 0; i < equipJson.data.length; i++) {
            if (equipJson.data[i].gsid == tempJson.Client[0].gsid) {
                equipJson.data.splice(i, 1);
                break;
            }
        }

        //改本地背包json
        var tempSplit;
        for (var i = 0; i < bagJson.data.length; i++) {
            tempSplit=bagJson.data[i].p.split(",");
            if (tempSplit[1] == tempJson.Client[0].gsid) {
                tempSplit[1] = 0;
                bagJson.data[i].p = tempSplit.join(",");
            }
        }
        showHeroEquipDialog();

    }
}