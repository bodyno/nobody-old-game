/// <reference path="refine.js" />
/// <reference path="jquery-1.5.1.min.js" />
/// <reference path="json.js" />
/// <reference path="heroEquip.js" />

var filterJson = { "data": [] };

var filterFlag;

var BagClick;

var showBag = function () {
    $("#dialog").html("<div id='bag'><div id='title'><div id='titleLeft'></div><div id='titleCenter'><div id='titleContext'></div></div><div id='titleRight'></div></div><div id='waikuan'><div id='shangjiao'class='jiao shangjiao'></div><div id='xiajiao'class='jiao xiajiao'></div><div id='zuojiao'class='jiao zuojiao'></div><div id='youjiao'class='jiao youjiao'></div><div class='shangwaibian'></div><div class='xiawaibian'></div><div class='zuowaibian'></div><div class='youwaibian'></div></div><div id='close'></div><div id='rope'></div><div id='bagDialog'></div><div id='heroPageData'>页数0/0<br/>仓库数:0/0</div><div id='pagePrevBtn'></div><div id='pageNextBtn'></div><div id='bag_all'class='hero_icon hero_icon_select'></div><div id='bag_sell'class='hero_icon'></div><div id='chooseBtn'class='bossBtn'style='width:91px;'><div class='btn'><div class='btn1'></div><div class='btn2'>筛选</div><div class='btn3'></div></div></div><div id='bagSellBtn'class='bossBtn'style='width:91px;'><div class='btn'><div class='btn1'></div><div class='btn2'>出售</div><div class='btn3'></div></div></div><div id='goFall'class='bossBtn'style='width:134px;right:150px;'><div class='btn'><div class='btn1'></div><div class='btn2'>兑换中心</div><div class='btn3'></div></div></div></div>");
    $("#mask").show();
    $("#bag").css({ "top": (height - 460) / 2 - 10 });
    if (pad)
        $("#bag").css({ "top": ((height - 470 * sp) / 2) / sp });

    $("#chooseBtn").bind("touchend", function () {
        window.GameMainClass.playEffectSound("icon");
        $(this).css({ "-webkit-transform": "scale(1)" });
        bagChooseType();
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })

    setTitle(19);

    //绑定切换事件
    $("#bag_all").bind("touchend", function () {
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("menu");
        $(this).addClass("hero_icon_select");
        $("#bag_sell").removeClass("hero_icon_select");
        $("#bagSellBtn").hide();
        $("#chooseBtn").show();
        showItem();
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })

    $("#bag_sell").bind("touchend", function () {
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("menu");
        $(this).addClass("hero_icon_select");
        $("#bag_all").removeClass("hero_icon_select");
        $("#bagSellBtn").show();
        $("#chooseBtn").hide();
        showBagSellItem();
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })

    //出售
    $("#bagSellBtn").bind("touchend", function () {
        $(this).css("-webkit-transform", "scale(1)");
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");

        if (EatHero.length == 0) {
            showTextMess("您没有选择任何物品!", 2);
            return;
        }
        
        var maskDiv = document.createElement("div");
        maskDiv.id = "tempMask";
        $(maskDiv).css({ "width": width, "height": height, "top": "0","z-index":99 });
        document.body.appendChild(maskDiv);

        $("#temp").html("<div id='mess2'><div id='m_title'><div id='m_titleLeft'></div><div id='m_titleCenter'><div id='m_titleContext'></div></div><div id='m_titleRight'></div></div><div id='m_waikuan'><div class='m_jiao m_shangjiao'></div><div class='m_jiao m_xiajiao'></div><div class='m_jiao m_zuojiao'></div><div class='m_jiao m_youjiao'></div><div class='m_shangwaibian'></div><div class='m_xiawaibian'></div><div class='m_zuowaibian'></div><div class='m_youwaibian'></div></div><div id='dialogclose'></div><div id='tempDialog2'><div id='friendFont'style='color:#26E50E;'>您确定要出售吗?</div></div><div id='friendDelete'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>确定</div><div class='btn3'></div></div></div><div id='friendCancel'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>取消</div><div class='btn3'></div></div></div></div>");
        $("#mess2").css({ "left": (width - 476) / 2, "top": (height - 279) / 2 });

        if (pad) $("#mess2").css({ "zoom": sp, "left": (width - 476 * sp) / 2 / sp, "top": (height - 279 * sp) / 2 / sp });

        var tempSend = $(this).attr("sid");

        //绑定确定
        $("#friendDelete").bind("touchend", function () {
            window.GameMainClass.playEffectSound("icon");
            window.GameMainClass.sendRequestJson(198, '{"itemstr":"' + EatHero.join(",") + '"}', "sellItemBack");
        })

        //绑定关闭
        $("#dialogclose,#friendCancel").bind("touchend", function () {
            window.GameMainClass.playEffectSound("close");
            $("#tempMask").remove();
            $("#temp").html("");
        })

    }).bindAnimate();

    $("#bagSellBtn").hide();

    //绑定关闭事件
    $("#close").bind("touchend", function () {
        if (!cancel()) {
            $("#dialog").html("");
            $("#mask").hide();
            window.GameMainClass.playEffectSound("close");
        }
        $(this).css({ "-webkit-transform": "scale(1)" });
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    }).bind("touchstart", function () {
        begin();
        $(this).css({ "-webkit-transform": "scale(0.8)" });
    })


    //兑换中心
    $("#goFall").bind("touchend", function () {
        $(this).css("-webkit-transform", "scale(1)");
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        loadFall();
    }).bindAnimate();

    if (bagJson.data.length == 0) {
        showTextMess("没有物品!", 2);
        $("#heroPageData").html("页数:<font id='pageNow' style='color:#26E50E;'>0</font><font style='color:#26E50E;'>/0</font><br/>背包数:<font style='color:#26E50E'>0/" + userJson.pnum + "</font>");
        $("#pagePrevBtn,#pageNextBtn").unbind("touchstart").unbind("touchmove").unbind("touchend");
        return;
    }
    
    filterFlag = "all";
    showItem();
}

//显示具体的物品
var showItem = function () {
    $("#bagDialog").html("<div class='swiper-container bagSwiper'><div class='swiper-wrapper'><div class='swiper-slide bag-slide'><div id='bagPage0'class='bagPage'></div></div></div></div>");

    tempUseIndex.length = 0;
    switch (filterFlag) {
        case "equip":
            filterJson.data.length = 0;
            var temp;
            for (var i = 0; i < bagJson.data.length; i++) {
                temp = bagJson.data[i].p.split(",")
                if (Number(temp[3]) <= 5 && temp[1]=="0") {
                    filterJson.data.push(bagJson.data[i]);
                    tempUseIndex.push(i);
                }
            }
            break;
        case "use":
            filterJson.data.length = 0;
            for (var i = 0; i < bagJson.data.length; i++) {
                temp = bagJson.data[i].p.split(",")
                if (Number(temp[3]) >= 80 && Number(temp[3]) <= 100) {
                    filterJson.data.push(bagJson.data[i]);
                    tempUseIndex.push(i);
                }
            }
            break;
        case "all":
            filterJson.data.length = 0;
            var temp;
            for (var i = 0; i < bagJson.data.length; i++) {
                temp = bagJson.data[i].p.split(",")
                if (temp[8] == "0" && temp[1] == "0") {
                    filterJson.data.push(bagJson.data[i]);
                    tempUseIndex.push(i);
                }
            }
            break;
        case "hole":
            filterJson.data.length = 0;
            var temp;
            for (var i = 0; i < bagJson.data.length; i++) {
                temp = bagJson.data[i].p.split(",")
                if (Number(temp[3]) <= 12 && Number(temp[3]) >= 6) {
                    if (temp[8] != "0")
                        continue;
                    filterJson.data.push(bagJson.data[i]);
                    tempUseIndex.push(i);
                }
            }
            break;
        case "material":
            filterJson.data.length = 0;
            var temp;
            for (var i = 0; i < bagJson.data.length; i++) {
                temp = bagJson.data[i].p.split(",")
                if (Number(temp[3]) == 30 || Number(temp[3]) == 13 || Number(temp[3]) == 14) {
                    filterJson.data.push(bagJson.data[i]);
                    tempUseIndex.push(i);
                }
            }
            break;
    }

    if (filterJson.data.length == 0) {

        showTextMess("没有此类型物品!", 2);
        $("#pagePrevBtn,#pageNextBtn").unbind("touchstart").unbind("touchmove").unbind("touchend");
        $("#heroPageData").html("页数:<font id='pageNow' style='color:#26E50E;'>0</font><font style='color:#26E50E;'>/0</font><br/>背包数:<font style='color:#26E50E'>0/" + userJson.pnum + "</font>");
        return;
    }

    
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
        showBagPage();
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
        showBagPage();
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })


    usePage = 0;

    useLength = filterJson.data.length;

    usePageAll = Math.ceil(useLength / 8) - 1;

    $("#heroPageData").html("页数:<font id='pageNow' style='color:#26E50E;'>1</font><font style='color:#26E50E;'>/" + Math.ceil(useLength / 8) + "</font><br/>背包数:<font style='color:#26E50E'>" + useLength + "/" + userJson.pnum + "</font>");

    showBagPage();
}

var showBagPage = function () {
    $("#bagPage0").html("");
    $("#pageNow").text(usePage + 1);

    var tempLastIndex = useLength > (usePage + 1) * 8 ? (usePage + 1) * 8 : useLength;

    var arr = new Array();

    for (var i = usePage * 8; i < tempLastIndex; i++) {

        var detail = filterJson.data[i].p.split(",");

        var div = document.createElement("div");
        div.className = "bagItem";
        div.setAttribute("index", tempUseIndex[i]);

        if (Number(detail[3]) <= 5) {
            if (detail[10] != 0) {
                div.innerHTML = "<div class='bagHeadBg'ontouchstart='begin()'ontouchmove='move()'ontouchend='showGoodDetailSend(this)'><div class='bagHeadColor'></div><div class='bagHead'></div></div><div class='goodDetail'ontouchstart='begin()'ontouchmove='move()'ontouchend='showGoodDetailSend(this)'style='background-position-y:0px;'><div class='bag_has_hole'></div><div class='goodDetail_name'></div><div class='goodDetail_value'></div></div>";
            }
            else {
                div.innerHTML = "<div class='bagHeadBg'ontouchstart='begin()'ontouchmove='move()'ontouchend='showGoodDetailSend(this)'><div class='bagHeadColor'></div><div class='bagHead'></div></div><div class='goodDetail'style='background-position-y:0px;'ontouchstart='begin()'ontouchmove='move()'ontouchend='showGoodDetailSend(this)'><div class='goodDetail_name'></div><div class='goodDetail_value'></div></div>";
            }
        }
        else
            div.innerHTML = "<div class='bagHeadBg'ontouchstart='begin()'ontouchmove='move()'ontouchend='showGoodDetailSend(this)'><div class='bagHeadColor'></div><div class='bagHead'></div></div><div class='goodDetail'ontouchstart='begin()'ontouchmove='move()'ontouchend='showGoodDetailSend(this)'><div class='goodDetail_name'></div><div class='goodDetail_value'></div></div>";


        //此物品的详细信息

        var localDetail;
        var j = 0;
        for (; j < GoodsJson.data.length; j++) {
            if (GoodsJson.data[j].ItemID == detail[2]) {
                localDetail = GoodsJson.data[j];
                break;
            }
        }


        if (localDetail.isChongdie != 0)
            $(div).find(".bagHeadBg").append("<div class='bagNum'>x" + detail[5] + "</div>");

        $(div).find(".bagHeadColor").css("background-image", "url(res/head/" + localDetail.Q + ".png)");
        $(div).find(".bagHead").css("background-image", "url(res/goods/" + localDetail.ImgID + ".png)");

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
            default:
                $(div).find(".goodDetail_value").text(localDetail.detail);
                break;

        }
        $("#bagPage0").append(div);

    }
}

//设置bagJson
var setBagJson = function (json) {
    if (json == "null") {
        bagJson = { "data": [] };
    }
    else {
        bagJson = JSON.parse(json);
    }
}

//显示荣誉购买物品
var showHonor = function () {
    var index = 0;
    var nowPage = 0;
    for (var i = 0; i < honorGoodJson.data.length; i++) {

        if (index == 8) {
            nowPage++;
            var divPage = document.createElement("div");
            divPage.className = "swiper-slide bag-slide";
            var tempDivPage = "<div id='bagPage" + nowPage + "' class='bagPage'></div>";
            divPage.innerHTML = tempDivPage;
            $(".swiper-wrapper").append(divPage);
            index = 0;
        }

        var div = document.createElement("div");
        div.className = "bagItem";
        div.innerHTML = "<div class='bagHeadBg'><div class='bagHeadColor'></div><div class='bagHead'></div></div><div class='goodDetail'><div class='goodDetail_name'></div><div class='goodDetail_value'></div><div class='bag_bug'>购买</div><div class='bag_honor'></div></div>";


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

        div.setAttribute("id", detail);

        $(div).find(".bagHeadColor").css("background-image", "url(res/head/" + localDetail.Q + ".png)");
        $(div).find(".bagHead").css("background-image", "url(res/goods/" + localDetail.ImgID + ".png)");
        $(div).find(".bag_honor").text("荣誉点:" + honorGoodJson.data[i].honor);

        $(div).find(".goodDetail_name").text(localDetail.Name);
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
        $("#bagDialog #bagPage" + nowPage).append(div);
        index++;
    }

    //购买事件
    $(".bag_bug").bind("touchend", function () {
        //{"itemid":物品id,"num":购买数量}
        window.GameMainClass.sendRequestJson(138, "{\"itemid\":" + $(this).parent().parent().attr("id") + ",\"num\":1}", "honorBugBack");
    })
}

var honorBugBack = function (json) {
    showTextMess("购买未做", 1);
}

var bagChooseType = function () {
    var maskDiv = document.createElement("div");
    maskDiv.id = "tempMask";
    $(maskDiv).css({ "width": width, "height": height, "top": "0" });
    document.body.appendChild(maskDiv);

    //$("body").append("<div id='b_choose'style='left:" + (width - 330) / 2 + "px;top:" + (height - 284) / 2 + "px;'><div id='bigClick'><div id='b_c_all'class='b_c_check'ontouchmove='move()'ontouchstart='begin()'ontouchend='bagChooseClick(this)'></div></div><div id='b_c_equip'class='b_c_check'ontouchmove='move()'ontouchstart='begin()'ontouchend='bagChooseClick(this)'></div><div id='b_c_hole'class='b_c_check'ontouchmove='move()'ontouchstart='begin()'ontouchend='bagChooseClick(this)'></div><div id='b_c_meta'class='b_c_check'ontouchmove='move()'ontouchstart='begin()'ontouchend='bagChooseClick(this)'></div><div id='b_c_use'class='b_c_check'ontouchmove='move()'ontouchstart='begin()'ontouchend='bagChooseClick(this)'></div><div id='chooseClose'class='bossBtn'style='bottom: -28px;left: 120px;'><div class='btn'><div class='btn1'></div><div class='btn2'>关闭</div><div class='btn3'></div></div></div></div>")
    $("body").append("<div id='b_choose'style='left:" + (width - 330) / 2 + "px;top:" + (height - 284) / 2 + "px;'><div id='b_c_all'ontouchmove='move()'ontouchstart='begin()'ontouchend='bagChooseClick(this)'><div id=''class='b_c_check'></div></div><div id='b_c_equip'ontouchmove='move()'ontouchstart='begin()'ontouchend='bagChooseClick(this)'><div id=''class='b_c_check'></div></div><div id='b_c_hole'ontouchmove='move()'ontouchstart='begin()'ontouchend='bagChooseClick(this)'><div id=''class='b_c_check'></div></div><div id='b_c_meta'ontouchmove='move()'ontouchstart='begin()'ontouchend='bagChooseClick(this)'><div id=''class='b_c_check'></div></div><div id='b_c_use'ontouchmove='move()'ontouchstart='begin()'ontouchend='bagChooseClick(this)'><div id=''class='b_c_check'></div></div><div id='chooseClose'class='bossBtn'style='bottom: -28px;left: 120px;'><div class='btn'><div class='btn1'></div><div class='btn2'>关闭</div><div class='btn3'></div></div></div></div>");

    if (pad) $("#b_choose").css({ "zoom": sp, "left": (width - 330 * sp) / 2 / sp, "top": (height - 284 * sp) / 2 / sp });

    switch (filterFlag) {
        case "all":
            $("#b_c_all").children().css("background-position-x", "-37px");
            break;
        case "equip":
            $("#b_c_equip").children().css("background-position-x", "-37px");
            break;
        case "use":
            $("#b_c_use").children().css("background-position-x", "-37px");
            break;
        case "hole":
            $("#b_c_hole").children().css("background-position-x", "-37px");
            break;
        case "material":
            $("#b_c_meta").children().css("background-position-x", "-37px");
            break;
    }


    $("#chooseClose").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("close");
        $("#tempMask,#b_choose").remove();
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })
}

var bagChooseClick = function (ev) {
    $("#b_choose").find(".b_c_checkHover").removeClass("b_c_checkHover");
    $(ev).children().addClass("b_c_checkHover");
    switch ($(ev).attr("id")) {
        case "b_c_all":
            $("#bag_all").css("background-image", "url(res/public/icon/bag_all.png)");
            filterFlag = "all";
            showItem();
            break;
        case "b_c_use":
            $("#bag_all").css("background-image", "url(res/public/icon/bag_use.png)");
            filterFlag = 'use';
            showItem();
            break;
        case "b_c_equip":
            $("#bag_all").css("background-image", "url(res/public/icon/equip.png)");
            filterFlag = "equip";
            showItem();
            break;
        case "b_c_hole":
            $("#bag_all").css("background-image", "url(res/public/icon/bag_hole.png)");
            filterFlag = "hole";
            showItem();
            break;
        case "b_c_meta":
            $("#bag_all").css("background-image", "url(res/public/icon/bag_material.png)");
            filterFlag = "material";
            showItem();
            break;
    }

    $("#tempMask,#b_choose").remove();
}


var showGoodDetailSend = function (ev) {
    if (cancel())
        return;

    var tempSplit = bagJson.data[$(ev).parent().attr("index")].p.split(",");
    if (Number(tempSplit[3]) > 5)
        showNormalGoodDetail(tempSplit[0]);
    else
        window.GameMainClass.sendRequestJson(176, '{"itemsid":' + tempSplit[0] + '}', "showGoodDetail");
}

var showNormalGoodDetail = function (itemsid) {

    var maskDiv = document.createElement("div");
    maskDiv.id = "tempMask";
    $(maskDiv).css({ "width": width, "height": height, "top": "0","z-index":"21" });
    document.body.appendChild(maskDiv);

    var tempNowDetail;

    for (var i = 0; i < bagJson.data.length; i++) {
        var tempSplit = bagJson.data[i].p.split(",")
        if (tempSplit[0] == itemsid) {
            tempNowDetail = tempSplit;
            break;
        }
    }

    var tempDetail;
    //tempDetail = 1024;
    //tempNowDetail = "1619,1120,1012,1,0,1,0,2,0,30".split(",");
    for (var i = 0; i < GoodsJson.data.length; i++) {
        if (GoodsJson.data[i].ItemID == tempNowDetail[2]) {
            tempDetail = GoodsJson.data[i];
            break;
        }
    }



    var arr = [];

    arr.push("<div id='b_bg'><div id='b_bg_s'></div><div id='b_bg_m'>");
    arr.push("<div class='bagHeadBg'style='background-image:url(res/adv/small.png);position:absolute;left:10px;top:10px'><div class='bagHeadColor' style='background-image:url(res/head/" + tempDetail.Q + ".png)'></div><div class='bagHead' style='background-image:url(res/goods/" + tempDetail.ImgID + ".png)'></div></div>")

    arr.push("<div id='b_detail1' style='color:" + getColor(String(tempDetail.Q)) + "'>" + tempDetail.Name + "</div>");

    var temp1000;
    if (tempDetail.price == 0) {
        temp1000 = "不可出售";
    }
    else {
        temp1000 = "出售: 银币" + tempDetail.price;
    }

    arr.push("<div id='b_detail2'>类型: <font style='color:#F2E234;'>" + getGoodType(Number(tempNowDetail[3])) + "</font> <br/>" + temp1000 + "<font style='color:#F2E234;'></font></div>")
    arr.push("<div class='b_slide'></div>");
    arr.push("<div id='b_detail5'>" + tempDetail.detail + "</div></div><div id='b_bg_x'></div>");

    if (tempDetail.Type >= 80 && tempDetail.Type <= 100)
        arr.push("<div id='b_sell' sname='" + tempDetail.Name + "' num='" + tempNowDetail[5] + "' sid='" + tempNowDetail[0] + "' class='bossBtn' style='right: 140px;width: 100px;bottom: -23px;'><div class='btn'><div class='btn1'></div><div class='btn2'>开启</div><div class='btn3'></div></div></div>");
    else
        arr.push("<div id='b_sell' sname='" + tempDetail.Name + "' num='" + tempNowDetail[5] + "' sid='" + tempNowDetail[0] + "' class='bossBtn' style='right: 140px;width: 100px;bottom: -23px;'><div class='btn'><div class='btn1'></div><div class='btn2'>出售</div><div class='btn3'></div></div></div>");
    arr.push("<div id='b_close' class='bossBtn' style='right: 29px;width: 100px;bottom: -23px;'><div class='btn'><div class='btn1'></div><div class='btn2'>关闭</div><div class='btn3'></div></div></div></div>");


    $("body").append(arr.join(""));

    $("#b_close").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("close");
        $("#b_bg").remove();
        $("#tempMask").remove();

    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })

    $("#b_sell").bind("touchend", function () {
        window.GameMainClass.playEffectSound("icon");
        if (tempDetail.Type >= 80 && tempDetail.Type <= 100) {
            //开启
            window.GameMainClass.sendRequestJson(103, '{"itemsid":' + $(this).attr("sid") + '}', "vipBagOpen");
            return;
        }

        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        $("#b_bg").remove();
        $("#tempMask").remove();


        if (cancel())
            return;
        var maskDiv = document.createElement("div");
        maskDiv.id = "tempMask";
        $(maskDiv).css({ "width": width, "height": height, "top": "0" });
        document.body.appendChild(maskDiv);

        $("#temp").html("<div id='mess2'><div id='m_title'><div id='m_titleLeft'></div><div id='m_titleCenter'><div id='m_titleContext'></div></div><div id='m_titleRight'></div></div><div id='m_waikuan'><div class='m_jiao m_shangjiao'></div><div class='m_jiao m_xiajiao'></div><div class='m_jiao m_zuojiao'></div><div class='m_jiao m_youjiao'></div><div class='m_shangwaibian'></div><div class='m_xiawaibian'></div><div class='m_zuowaibian'></div><div class='m_youwaibian'></div></div><div id='dialogclose'></div><div id='tempDialog2'><div id='friendFont'style='color:#26E50E;'>您确定要出售" + $(this).attr("sname") + " " + $(this).attr("num") + "个吗?</div></div><div id='friendDelete'class='ShopBtn' style='width:91px;'><div class='btn'><div class='btn1'></div><div class='btn2'>确定</div><div class='btn3'></div></div></div><div id='friendCancel'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>取消</div><div class='btn3'></div></div></div></div>");

        $("#mess2").css({ "left": (width - 476) / 2, "top": (height - 279) / 2 });

        var tempSend = $(this).attr("sid");

        //绑定确定
        $("#friendDelete").bind("touchend", function () {
            $(this).css({ "-webkit-transform": "scale(1)" });
            if (cancel())
                return;
            window.GameMainClass.playEffectSound("icon");
            window.GameMainClass.sendRequestJson(175, "{\"itemsid\":" + tempSend + "}", "goodSellBack");
        }).bindAnimate();

        //绑定关闭
        $("#dialogclose,#friendCancel").bind("touchend", function () {
            $(this).css({ "-webkit-transform": "scale(1)" });
            if (cancel())
                return;
            window.GameMainClass.playEffectSound("close");
            $("#tempMask").remove();
            $("#temp").html("");
        }).bindAnimate();


    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })

    var tempDiv = $("#b_bg");
    tempDiv.css({ "left": 0, "top": (height - tempDiv.get(0).offsetHeight) / 2 });

    if (pad) tempDiv.css({ "zoom": padScale*0.8, "top": (height - tempDiv.get(0).offsetHeight) / 2 / padScale });

}


var showGoodDetail = function (json) {
    var tempJson = JSON.parse(json);
    //var tempJson = { "Client": [{ "itemsid": 2560 }], "coin": 40400, "gem": [{ "info": "攻击+50", "name": "1级红宝石" }], "info": "ok", "resert": 1 };
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
        return;
    }

    var maskDiv = document.createElement("div");
    maskDiv.id = "tempMask2";
    $(maskDiv).css({ "width": width, "height": height, "top": "0","z-index":"21" });
    document.body.appendChild(maskDiv);

    var tempNowDetail;

    for (var i = 0; i < bagJson.data.length; i++) {
        var tempSplit = bagJson.data[i].p.split(",")
        if (tempSplit[0] == tempJson.Client[0].itemsid)
        {
            tempNowDetail = tempSplit;
            break;
        }
    }

    var tempDetail;
    //tempDetail = 1024;
    //tempNowDetail = "1619,1120,1012,1,0,1,0,2,0,30".split(",");
    for (var i = 0; i < GoodsJson.data.length; i++) {
        if (GoodsJson.data[i].ItemID == tempNowDetail[2]) {
            tempDetail = GoodsJson.data[i];
            break;
        }
    }

    

    var arr = [];
    arr.push("<div id='b_bg'><div id='b_bg_s'></div><div id='b_bg_m'>");
    arr.push("<div class='bagHeadBg'style='background-image:url(res/adv/small.png);position:absolute;left:10px;top:10px'><div class='bagHeadColor' style='background-image:url(res/head/" + tempDetail.Q + ".png)'></div><div class='bagHead' style='background-image:url(res/goods/" + tempDetail.ImgID + ".png)'></div></div>")

    if (tempNowDetail[4]=="0")
        arr.push("<div id='b_detail1' style='color:" + getColor(String(tempDetail.Q)) + "'>" + tempDetail.Name + "</div>");
    else
        arr.push("<div id='b_detail1' style='color:" + getColor(String(tempDetail.Q)) + "'>" + tempDetail.Name + "+ " + tempNowDetail[4] + "</div>");
    arr.push("<div id='b_detail2'>类型: <font style='color:#F2E234;'>" + getGoodType(Number(tempNowDetail[3])) + "</font> <br/>出售: <font style='color:#F2E234;'>银币"+ tempJson.coin + "</font></div>")
    arr.push("<div class='b_slide'></div>");

    var tempJobDetail;
    switch (tempDetail.Type) {
        case 1:
            tempJobDetail = '攻击';
            break;
        case 2:
            tempJobDetail = '生命';
            break;
        case 3:
            tempJobDetail = '防御';
            break;
        case 4:
            tempJobDetail = '闪避';
            break;
        case 5:
            tempJobDetail = '暴击';
            break;
    }

    arr.push("<div id='b_detail3'>强化等级: <font style='color:#F2E234;'>" + tempNowDetail[4] + "</font><br/>" + tempJobDetail + ": <font style='color:#F2E234;'>" + tempNowDetail[9] + "</font>");

    if(tempNowDetail[6]!="0")
        arr.push(" + <font style='color:#26E50E;'>" + tempNowDetail[6] + "</font>")
    arr.push("<br/>职业限定: <font style='color:#F2E234;'>" + getJob(tempDetail.JobNeed) + "</font></div>");
    arr.push("<div class='b_slide'></div>");
    //找宝石

    var tempStr = "";
    for (var i = 0; i < 4; i++) {
        if (tempJson.gem[i]) {
            tempStr += tempJson.gem[i].name + " <font style='color:#F2E234;'>" + tempJson.gem[i].info + "</font><br/>";
        }
        else {
            if (i <= (tempDetail.HoleNum-1))
                tempStr += "未镶嵌<br/>"
            else
                tempStr +="<font style='color:gray;'>未开启</font><br/>"
        }
    }

    arr.push("<div id='b_detail4'>"+tempStr+"</div>");
    arr.push("<div class='b_slide'></div>");
    arr.push("<div id='b_detail5'>" + tempDetail.detail + "</div></div><div id='b_bg_x'></div>");

    if (tempJson.Client[0].just) {
        arr.push("<div id='b_close'class='bossBtn' style='right: 80px;width: 100px;bottom: -23px;'><div class='btn'><div class='btn1'></div><div class='btn2'>关闭</div><div class='btn3'></div></div></div></div>");
    }
    else {
        if (tempJson.Client[0].equip) {
            arr.push("<div id='b_sell' sname='" + tempDetail.Name + "' num='" + tempNowDetail[5] + "' sid='" + tempNowDetail[0] + "' class='bossBtn' style='right: 140px;width: 100px;bottom: -23px;'><div class='btn'><div class='btn1'></div><div class='btn2'>更换</div><div class='btn3'></div></div></div>");
            arr.push("<div id='b_close'class='bossBtn' style='right: 29px;width: 100px;bottom: -23px;'><div class='btn'><div class='btn1'></div><div class='btn2'>关闭</div><div class='btn3'></div></div></div></div>");
        } else {
            arr.push("<div id='b_sell' sname='" + tempDetail.Name + "' num='" + tempNowDetail[5] + "' sid='" + tempNowDetail[0] + "' class='bossBtn' style='right: 140px;width: 100px;bottom: -23px;'><div class='btn'><div class='btn1'></div><div class='btn2'>出售</div><div class='btn3'></div></div></div>");
            arr.push("<div id='b_close'class='bossBtn' style='right: 29px;width: 100px;bottom: -23px;'><div class='btn'><div class='btn1'></div><div class='btn2'>关闭</div><div class='btn3'></div></div></div></div>");
        }
    }


    $("body").append(arr.join(""));

    $("#b_close").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("close");
        $("#b_bg").remove();
        $("#tempMask2").remove();

    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })

    if (tempJson.Client[0].equip) {
        $("#b_sell").bind("touchend", function () {
            $(this).css({ "-webkit-transform": "scale(1)" });
            if (cancel())
                return;
            window.GameMainClass.playEffectSound("icon");
            $("#b_bg").remove();
            $("#tempMask2").remove();
            showEquipGoodSelect();

        }).bind("touchstart", function () {
            $(this).css({ "-webkit-transform": "scale(0.8)" });
            begin();
        }).bind("touchmove", function () {
            $(this).css({ "-webkit-transform": "scale(1)" });
            move();
        })
    } else {
        $("#b_sell").bind("touchend", function () {
            $(this).css({ "-webkit-transform": "scale(1)" });
            if (cancel())
                return;
            window.GameMainClass.playEffectSound("icon");
            $("#b_bg").remove();
            $("#tempMask2").remove();


            if (cancel())
                return;
            var maskDiv = document.createElement("div");
            maskDiv.id = "tempMask";
            $(maskDiv).css({ "width": width, "height": height, "top": "0" });
            document.body.appendChild(maskDiv);

            $("#temp").html("<div id='mess2'><div id='m_title'><div id='m_titleLeft'></div><div id='m_titleCenter'><div id='m_titleContext'></div></div><div id='m_titleRight'></div></div><div id='m_waikuan'><div class='m_jiao m_shangjiao'></div><div class='m_jiao m_xiajiao'></div><div class='m_jiao m_zuojiao'></div><div class='m_jiao m_youjiao'></div><div class='m_shangwaibian'></div><div class='m_xiawaibian'></div><div class='m_zuowaibian'></div><div class='m_youwaibian'></div></div><div id='dialogclose'></div><div id='tempDialog2'><div id='friendFont'style='color:#26E50E;'>您确定要出售" + $(this).attr("sname") + " " + $(this).attr("num") + "个吗?</div></div><div id='friendDelete'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>确定</div><div class='btn3'></div></div></div><div id='friendCancel'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>取消</div><div class='btn3'></div></div></div></div>");
            $("#mess2").css({ "left": (width - 476) / 2, "top": (height - 279) / 2 });

            var tempSend = $(this).attr("sid");

            //绑定确定
            $("#friendDelete").bind("touchend", function () {
                $(this).css({ "-webkit-transform": "scale(1)" });
                if (cancel())
                    return;
                window.GameMainClass.playEffectSound("icon");
                window.GameMainClass.sendRequestJson(175, "{\"itemsid\":" + tempSend + "}", "goodSellBack");
            }).bindAnimate();

            //绑定关闭
            $("#dialogclose,#friendCancel").bind("touchend", function () {
                $(this).css({ "-webkit-transform": "scale(1)" });
                if (cancel())
                    return;
                window.GameMainClass.playEffectSound("close");
                $("#tempMask").remove();
                $("#temp").html("");
            }).bindAnimate();

        }).bind("touchstart", function () {
            $(this).css({ "-webkit-transform": "scale(0.8)" });
            begin();
        }).bind("touchmove", function () {
            $(this).css({ "-webkit-transform": "scale(1)" });
            move();
        })
    }

    var tempDiv = $("#b_bg");
    tempDiv.css({ "left": 0, "top": (height - tempDiv.get(0).offsetHeight) / 2 });

    if (pad) tempDiv.css({ "zoom": sp, "top": (height - tempDiv.get(0).offsetHeight) / 2 / sp });

    //tempDiv.find("#b_detail2").html("类型: <font style='color:white;'>武器</font> <br/>出售: <font style='color:white;'>银币10002</font>")

    //tempDiv.find("#b_detail3").html("使用等级: <font style='color:white;'>40</font><br/>攻击: <font style='color:white;'>400</font> + 500<br/>职业限定: <font style='color:white;'>虎贲,战士</font>")

    //tempDiv.find("#b_detail4").html("1级红宝石 <font style='color:white;'>攻击+20</font><br/>2级绿宝石 <font style='color:white;'>防御+20</font><br/>未镶嵌<br/>未开启")

}

//出售
var goodSellBack = function (json) {
    var tempJson = JSON.parse(json);
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
    }
    else {
        showTextMess(tempJson.info, 1);
        updateUserJson("200", tempJson.coin);


        for (var i = 0; i < bagJson.data.length; i++) {
            var tempSplit = bagJson.data[i].p.split(",");
            if (tempSplit[0] == tempJson.Client[0].itemsid) {
                bagJson.data.splice(i, 1);
                break;
            }
        }
        if ($("#bag_sell").hasClass("hero_icon_select")) {
            showBagSellItem();
        } else {
            showItem();
        }
    }
    $("#tempMask").remove();
    $("#temp").html("");
}

//vip礼包开启
var vipBagOpen = function (json) {
    var tempJson = JSON.parse(json);
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
    }
    else {
        showTextMess(tempJson.info, 1);

        //使用掉某个物品
        useBagThing(tempJson.Client[0].itemsid);


        iGetReward(tempJson);

        $("#b_bg,#tempMask").remove();

        showItem();
    }
}

//显示物品本地数据 (不发送数据)
var showLocalNormalGoodDetail = function (itemid) {

    var maskDiv = document.createElement("div");
    maskDiv.id = "tempMask2";
    $(maskDiv).css({ "width": width, "height": height, "top": "0", "z-index": "21" });
    document.body.appendChild(maskDiv);

    var tempDetail;
    for (var i = 0; i < GoodsJson.data.length; i++) {
        if (GoodsJson.data[i].ItemID == itemid) {
            tempDetail = GoodsJson.data[i];
            break;
        }
    }



    var arr = [];

    arr.push("<div id='b_bg'><div id='b_bg_s'></div><div id='b_bg_m'>");
    arr.push("<div class='bagHeadBg'style='background-image:url(res/adv/small.png);position:absolute;left:10px;top:10px'><div class='bagHeadColor' style='background-image:url(res/head/" + tempDetail.Q + ".png)'></div><div class='bagHead' style='background-image:url(res/goods/" + tempDetail.ImgID + ".png)'></div></div>")

    arr.push("<div id='b_detail1' style='color:" + getColor(String(tempDetail.Q)) + "'>" + tempDetail.Name + "</div>");

    var temp1000;
    if (tempDetail.price == 0) {
        temp1000 = "不可出售";
    }
    else {
        temp1000 = "出售: 银币" + tempDetail.price;
    }

    arr.push("<div id='b_detail2'>类型: <font style='color:#F2E234;'>" + getGoodType(Number(tempDetail.Type)) + "</font> <br/>" + temp1000 + "<font style='color:#F2E234;'></font></div>")
    arr.push("<div class='b_slide'></div>");
    arr.push("<div id='b_detail5'>" + tempDetail.detail + "</div></div><div id='b_bg_x'></div>");

    arr.push("<div id='b_close' class='bossBtn' style='right: 80px;width: 100px;bottom: -23px;'><div class='btn'><div class='btn1'></div><div class='btn2'>关闭</div><div class='btn3'></div></div></div></div>");


    $("body").append(arr.join(""));

    $("#b_close").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("close");
        $("#b_bg").remove();
        $("#tempMask2").remove();

    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })

    var tempDiv = $("#b_bg");
    tempDiv.css({ "left": 0, "top": (height - tempDiv.get(0).offsetHeight) / 2 });

    if (pad) tempDiv.css({ "zoom": sp, "top": (height - tempDiv.get(0).offsetHeight) / 2 / sp });

}

//显示出售的列表
var showBagSellItem = function () {
    $("#bagDialog").html("<div class='swiper-container bagSwiper'><div class='swiper-wrapper'><div class='swiper-slide bag-slide'><div id='bagPage0'class='bagPage'></div></div></div></div>");
    var tempSplit;
    tempUseIndex.length = 0;
    tempMemoryJson.data.length = 0;
    EatHero.length = 0;
    for (var i = 0; i < bagJson.data.length; i++) {
        tempSplit = bagJson.data[i].p.split(",");
        if (tempSplit[1] != 0)
            continue;
        if (Number(tempSplit[3]) > 30)
            continue;
        if (tempSplit[10] != 0)
            continue;
        tempMemoryJson.data.push(bagJson.data[i]);
        tempUseIndex.push(i);
    }


    if (tempMemoryJson.data.length == 0) {
        showTextMess("没有可出售的物品!", 2);
        $("#pagePrevBtn,#pageNextBtn").unbind("touchstart").unbind("touchmove").unbind("touchend");
        $("#heroPageData").html("页数:<font id='pageNow' style='color:#26E50E;'>0</font><font style='color:#26E50E;'>/0</font><br/>背包数:<font style='color:#26E50E'>0/" + userJson.pnum + "</font>");
        return;
    }


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
        showBagSellPage();
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
        showBagSellPage();
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })


    usePage = 0;

    useLength = tempMemoryJson.data.length;

    usePageAll = Math.ceil(useLength / 8) - 1;

    $("#heroPageData").html("页数:<font id='pageNow' style='color:#26E50E;'>1</font><font style='color:#26E50E;'>/" + Math.ceil(useLength / 8) + "</font><br/>背包数:<font style='color:#26E50E'>" + useLength + "/" + userJson.pnum + "</font>");

    showBagSellPage();
}

var showBagSellPage = function () {
    $("#bagPage0").html("");
    $("#pageNow").text(usePage + 1);

    var tempLastIndex = useLength > (usePage + 1) * 8 ? (usePage + 1) * 8 : useLength;

    var arr = new Array();

    for (var i = usePage * 8; i < tempLastIndex; i++) {

        var detail = tempMemoryJson.data[i].p.split(",");

        var div = document.createElement("div");
        div.className = "bagItem";
        div.setAttribute("index", tempUseIndex[i]);
        div.setAttribute("sid", detail[0]);

        if (Number(detail[3]) <= 5) {
            if (detail[10] != 0) {
                div.innerHTML = "<div class='bagHeadBg' ontouchstart='begin()' ontouchmove='move()' ontouchend='showGoodDetailSend(this)'><div class='bagHeadColor'></div><div class='bagHead'></div></div><div class='goodDetail' ontouchstart='begin()' ontouchmove='move()' ontouchend='sellBagItemClick(this)' style='background-position-y:0px;'><div class='bag_has_hole'></div><div class='goodDetail_name'></div><div class='goodDetail_value'></div><div class='check'></div></div>";
            }
            else {
                div.innerHTML = "<div class='bagHeadBg' ontouchstart='begin()' ontouchmove='move()' ontouchend='showGoodDetailSend(this)'><div class='bagHeadColor'></div><div class='bagHead'></div></div><div class='goodDetail' ontouchstart='begin()' ontouchmove='move()' ontouchend='sellBagItemClick(this)' style='background-position-y:0px;'><div class='goodDetail_name'></div><div class='goodDetail_value'></div><div class='check'></div></div>";
            }
        }
        else
            div.innerHTML = "<div class='bagHeadBg' ontouchstart='begin()' ontouchmove='move()' ontouchend='showGoodDetailSend(this)'><div class='bagHeadColor'></div><div class='bagHead'></div></div><div class='goodDetail' ontouchstart='begin()' ontouchmove='move()' ontouchend='sellBagItemClick(this)'><div class='goodDetail_name'></div><div class='goodDetail_value'></div><div class='check'></div></div>";


        //此物品的详细信息

        var localDetail;
        var j = 0;
        for (; j < GoodsJson.data.length; j++) {
            if (GoodsJson.data[j].ItemID == detail[2]) {
                localDetail = GoodsJson.data[j];
                break;
            }
        }


        if (localDetail.isChongdie != 0)
            $(div).find(".bagHeadBg").append("<div class='bagNum'>x" + detail[5] + "</div>");

        $(div).find(".bagHeadColor").css("background-image", "url(res/head/" + localDetail.Q + ".png)");
        $(div).find(".bagHead").css("background-image", "url(res/goods/" + localDetail.ImgID + ".png)");

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
            default:
                $(div).find(".goodDetail_value").text(localDetail.detail);
                break;

        }

        var tempFlag = false;
        //是否已经被选中
        for (var z = 0; z < EatHero.length; z++) {
            if (EatHero[z] == detail[0]) {
                tempFlag = true;
                break;
            }
        }

        if (tempFlag) {
            $(div).find(".check").addClass("checkHover");
        }

        $("#bagPage0").append(div);

    }
}

var sellBagItemClick = function (ev) {
    if (cancel())
        return;
    var tempCheck = $(ev).children(".check");
    if (tempCheck.hasClass("checkHover")) {
        tempCheck.removeClass("checkHover");
        for (var x = 0; x < EatHero.length; x++) {
            if (EatHero[x] == $(ev).parent().attr("sid")) {
                EatHero.splice(x, 1);
                break;
            }
        }
    } else {
        tempCheck.addClass("checkHover");
        EatHero.push($(ev).parent().attr("sid"));
    }
}

var sellItemBack = function (json) {
    var tempJson = JSON.parse(json);
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
        return;
    }
    showTextMess(tempJson.info, 1);
    var tempDelete = tempJson.Client[0].itemstr.split(",");
    var tempSplit;
    for (var x = 0; x < tempDelete.length; x++) {
        for (var i = 0; i < bagJson.data.length; i++) {
            tempSplit = bagJson.data[i].p.split(",");
            if (tempDelete[x] == tempSplit[0]) {
                bagJson.data.splice(i, 1);
                break;
            }
        }
    }

    showBagSellItem();

    updateUserJson("200", tempJson.coin);
  
    $("#tempMask").remove();
    $("#temp").html("");
}