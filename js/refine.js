/// <reference path="json.js" />
/// <reference path="jquery-1.5.1.min.js" />
/// <reference path="hero.js" />

//var equipJson = { "data": [{ "atk": 7955, "def": 7961, "gsid": 20245, "hp": 7914 }, { "atk": 7957, "gsid": 20249, "hp": 7937 }], "resert": 1 };
var equipJson = null;

//var equipJson = {"data":[{"atk":7622,"gsid":18724}],"resert":1};

var equipData = { "bagIndex": 0, "localIndex": 0, "nowclick": "", "canUp": false };

var holeData = { "hole": false, "nowclick": -1, "sid": -1, "sIndex": -1, "oldSid": "" };

var holeDiv;

var setEquitJson = function (json) {
    var tempJson = JSON.parse(json);
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info,2);
    } else {
        equipJson = tempJson;
    }
}

//加载始初画面
var showRefineBase = function () {
    $("#dialog").html("<div id='refine'><div id='title'><div id='titleLeft'></div><div id='titleCenter'><div id='titleContext'></div></div><div id='titleRight'></div></div><div id='waikuan'><div id='shangjiao'class='jiao shangjiao'></div><div id='xiajiao'class='jiao xiajiao'></div><div id='zuojiao'class='jiao zuojiao'></div><div id='youjiao'class='jiao youjiao'></div><div class='shangwaibian'></div><div class='xiawaibian'></div><div class='zuowaibian'></div><div class='youwaibian'></div></div><div id='close'></div><div id='rope'></div><div id='equip'></div><div id='equip_refine'class='hero_icon hero_icon_select'></div><div id='equip_adv'class='hero_icon'></div><div id='equip_hole'class='hero_icon'></div><div id='equip_make'class='hero_icon'></div><div id='equip_refineOne'class='LvUpBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>强化</div><div class='btn3'></div></div></div><div id='equip_refineTen'class='LvUpBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>强化十次</div><div class='btn3'></div></div></div><div id='equip_makebtn'class='LvUpBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>合成</div><div class='btn3'></div></div></div><div id='equip_advbtn'class='LvUpBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>进阶</div><div class='btn3'></div></div></div><div id='heroequip_something'style='font-size: 16px;top: 72px;'><img src='res/public/care.png'style='vertical-align:middle;float:left;top:4px;position: relative;margin-right: 7px;'/><div style='float:left;'></div></div></div>");
    showRefine();

    var tempIcon = $(".hero_icon");
    //绑定icon事件
    tempIcon.bind("touchend", function () {
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("menu");
        tempIcon.removeClass("hero_icon_select");
        $(this).addClass("hero_icon_select");
        switch ($(this).attr("id")) {
            case "equip_adv":
                holeData.hole = false;
                equipUp();
                break;
            case "equip_refine":
                holeData.hole = false;
                showRefine();
                break;
            case "equip_make":
                holeData.hole = false;
                showGem();
                break;
            case "equip_hole":
                showHole();
                break;
        }
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })


    //关闭事件
    $("#close").bind("touchend", function () {
        if (!cancel()) {
            $("#dialog").html("");
            $("#mask").hide();
            equipData = { "bagIndex": 0, "localIndex": 0, "nowclick": "", "canUp": false };
            holeData = { "hole": false, "nowclick": -1, "sid": -1, "sIndex": -1, "oldSid": "" };
        }
        $(this).css({ "-webkit-transform": "scale(1)" });
    }).bind("touchmove", function () {
        move();
    }).bind("touchstart", function () {
        begin();
        window.GameMainClass.playEffectSound("close");
        $(this).css({ "-webkit-transform": "scale(0.8)" });
    })

}

//装备强化
var showRefine = function () {
    $("#equip").html("<div id='equip_Hero'><div class='swiper-container equip_hero_Swiper'><div class='swiper-wrapper'></div></div></div><div id='equip_Main'><div id='equip_detail_select'></div><div class='equip_Detail'><div class='equip_Head'><div class='equip_bg'></div><div class='equip_img'></div></div><div class='equip_hero_detail_name'></div><div class='equip_hero_detail_refine'></div><div class='equip_hero_detail_value'></div></div><div class='equip_Detail'><div class='equip_Head'><div class='equip_bg'></div><div class='equip_img'></div></div><div class='equip_hero_detail_name'></div><div class='equip_hero_detail_refine'></div><div class='equip_hero_detail_value'></div></div><div class='equip_Detail'><div class='equip_Head'><div class='equip_bg'></div><div class='equip_img'></div></div><div class='equip_hero_detail_name'></div><div class='equip_hero_detail_refine'></div><div class='equip_hero_detail_value'></div></div><div class='equip_Detail'><div class='equip_Head'><div class='equip_bg'></div><div class='equip_img'></div></div><div class='equip_hero_detail_name'></div><div class='equip_hero_detail_refine'></div><div class='equip_hero_detail_value'></div></div></div><div id='equip_LvUp'><div id='equip_big_name'></div><div id='equip_LvUp_Head'><div class='equip_LvUp_bg'></div><div class='equip_LvUp_img'></div></div><div id='equip_LvUp_Detail'></div><div id='equip_LvUp_Result'></div><div id='equip_LvUp_Use'></div></div><div id='equip_hr1'class='equip_hr'></div><div id='equip_hr2'class='equip_hr'></div>");
    setTitle(13)
    $("#mask").show();

    $("#refine").css({ "top": (height - 460) / 2 - 10 });
    if (pad)
        $("#refine").css({ "top": ((height - 470 * sp) / 2) / sp });

    $(".LvUpBtn").hide();
    $("#equip_refineTen,#equip_refineOne").show();

    $("#heroequip_something").css("top", "72px").find("img").css("top", "4px").siblings("div").html("VIP5开启10次强化功能。<br/>强化等级越高装备属性越高。");
    
    if (!equipJson.data||equipJson.data.length==0) {
        showTextMess("对不起,你还没有任何武将有装备!",2);
        $("#equip_detail_select").css("display", "none");
        return;
    }
    
    equipLoadHero();
    

    //英雄点击事件
    $("#equip_Hero .equip_hero_Swiper .swiper-wrapper .equip_heroDetail").bind("touchend", function () {
        if (cancel())
            return;
        $(".equip_heroDetailSelect").removeClass("equip_heroDetailSelect");
        $(this).addClass("equip_heroDetailSelect");
        $(".equip_hero_select").hide();
        $(this).siblings(".equip_hero_select").show();
        $("#equip_detail_select").css("top", "0");
        showHeroEquip($(this).parent().index());
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })

    var refineSwiper = new Swiper('.equip_hero_Swiper', {
        mode: 'vertical',
        slidesPerSlide: 6
    });

    //加载已装备的物品
    $(".equip_hero_select:first").show().siblings(".equip_heroDetail").addClass("equip_heroDetailSelect");
    showHeroEquip(0);

    //绑定装备点击事件
    $(".equip_Detail").bind("touchend", function () {
        $(".equip_DetailSelect").removeClass("equip_DetailSelect");
        $(this).addClass("equip_DetailSelect");
        equipData.nowclick = $(this).index();
        $("#equip_detail_select").css("top", ($(this).attr("nowclick") - 1) * 81);
        equipData.bagIndex = $(this).attr("sid");
        equipData.localIndex = $(this).attr("index");
        if ($("#equip_BtnLvUp").length == 0) {
            loadHeroEquipDetail();
        }
        else {
            loadHeroEquipUpDetail();
        }
    })

    //强化1次事件
    $("#equip_refineOne").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        var nowEquip = bagJson.data[equipData.bagIndex].p.split(",");
        window.GameMainClass.sendRequestJson(121, "{\"id\":" + nowEquip[0] + ",\"num\":1}", "refineOk");
    }).bindAnimate();

    //强化10次事件
    $("#equip_refineTen").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        var nowEquip = bagJson.data[equipData.bagIndex].p.split(",");
        window.GameMainClass.sendRequestJson(121, "{\"id\":" + nowEquip[0] + ",\"num\":10}", "refineOk");
    }).bindAnimate();
}

//加载右边强化信息
var loadHeroEquipDetail = function () {
    var nowEquip = bagJson.data[equipData.bagIndex].p.split(",");
    var nowEquipDetail = GoodsJson.data[equipData.localIndex];
    $("#equip_big_name").css("color", getColor(String(nowEquipDetail.Q))).text(nowEquipDetail.Name);
    $("#equip_LvUp_Head .equip_LvUp_bg").css("background-image", "url(res/head/" + nowEquip[7] + ".png)");
    $("#equip_LvUp_Head .equip_LvUp_img").css("background-image", "url(res/goods/" + nowEquipDetail.ImgID + ".png)");

    //临时攻击文字 或防御文字
    var tempContent;
    switch (Number(nowEquip[3])) {
        case 1:
            tempContent = "攻击";
            break;
        case 2:
            tempContent = "生命";
            break;
        case 3:
            tempContent = "防御";
            break;
        case 4:
            tempContent = "闪避";
            break;
        case 5:
            tempContent = "暴击";
            break;
    }

    $("#equip_LvUp_Detail").html("强化等级:<font style='color:#F2E234;'>" + nowEquip[4] + "</font><br/>" + tempContent + ":<font style='color:#F2E234;'>" + (Number(nowEquip[6]) + Number(nowEquip[9])) + "</font>");
    //加成
    var jiacheng = refineJson.data[(nowEquipDetail.RefQ - 1)];
    switch (nowEquipDetail.Type) {
        case 1:
            //武器
            jiacheng = parseInt(nowEquip[6]) + parseInt(refineJson.data[(nowEquipDetail.RefQ - 1)].atk);
            break;
        case 2:
            //头盔
            jiacheng = parseInt(nowEquip[6]) + parseInt(refineJson.data[(nowEquipDetail.RefQ - 1)].hp);
            break;
        case 3:
            //衣服
            jiacheng = parseInt(nowEquip[6]) + parseInt(refineJson.data[(nowEquipDetail.RefQ - 1)].def);
            break;
        case 4:
            //戒指
            jiacheng = parseInt(nowEquip[6]) + parseInt(refineJson.data[(nowEquipDetail.RefQ - 1)].hit);
            break;
        case 5:
            //项链
            jiacheng = parseInt(nowEquip[6]) + parseInt(refineJson.data[(nowEquipDetail.RefQ - 1)].baoji);
            break;
    }

    $("#equip_LvUp_Result").html("" + (parseInt(nowEquip[4]) + 1) + "<br/>" + (jiacheng+Number(nowEquip[9])) + "");

    //消耗
    $("#equip_LvUp_Use").html("花费银币:<font style='color:#26E50E;'>" + (refineJson.data[(nowEquipDetail.RefQ - 1)].cutcoin + refineJson.data[(nowEquipDetail.RefQ - 1)].upcoin * nowEquip[4]) + "</font>");
}

//获取对应的包裹数据
var getEquipDetailByGsid = function (gsid) {
    for (var i = 0; i < bagJson.data.length; i++) {
        if(bagJson.data[i].p.split(",")[0]==gsid){
            return bagJson.data[i].p;
        }
    }
}

//获取对应的本地json数据
var getLocalEquipDetailByGid = function (gid) {
    for (var i = 0; i < GoodsJson.data.length; i++) {
        if (GoodsJson.data[i].ItemID == gid) {
            return GoodsJson.data[i];
        }
    }
}

//强化成功
var refineOk = function (json) {
    var tempJson = JSON.parse(json);
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info,2);
    } else {
        window.GameMainClass.playEffectSound("lvup");
        //动画
        $("#equip_LvUp_Head").append("<div id='equiplvupAnimate'></div>");
        var tempFlag = 0;
        var equipLvUpAnimateTime = setInterval(function () {
            tempFlag++;
            $("#equiplvupAnimate").css("background-position-x", -tempFlag * 180);
            if (tempFlag == 12) {
                clearInterval(equipLvUpAnimateTime);
                $("#equiplvupAnimate").remove();
            }
        },160)


        var tempSplite=tempJson.p.split(",");
        for (var i = 0; i < bagJson.data.length; i++) {
            if (bagJson.data[i].p.split(",")[0] == tempSplite[0]) {
                bagJson.data[i].p = tempJson.p;
                break;
            }
        }

        //重新显示界面
        loadHeroEquipDetail();

        updateUserJson("200", 0 - tempJson.coin);

        showTextMess(tempJson.info, 1);

        var nowEquip = bagJson.data[equipData.bagIndex].p.split(",");
        $(".equip_Detail").eq(equipData.nowclick).find(".equip_hero_Detail").html("" + GoodsJson.data[equipData.localIndex].Name + "<br/><p>强化等级:" + nowEquip[4] + "</p>");
        nowEquipDiv = $(".equip_DetailSelect");
        nowEquipDiv.find(".equip_hero_detail_refine").html("强化: <font style='color:#F2E234'>" + nowEquip[4] + "</font>");
        nowEquipDiv.find(".equip_hero_detail_value>font").text(Number(nowEquip[9]) + Number(nowEquip[6]));

        var nowEquipDetail;
        for (var m = 0; m < GoodsJson.data.length; m++) {
            if (GoodsJson.data[m].ItemID == nowEquip[2]) {
                nowEquipDetail = GoodsJson.data[m];
                break;
            }
        }
        
        $("#equip_LvUp_Use").html("花费银币:<font style='color:#26E50E;'>" + (refineJson.data[(nowEquipDetail.RefQ - 1)].cutcoin + refineJson.data[(nowEquipDetail.RefQ - 1)].upcoin * nowEquip[4]) + "</font>");
    }
}

//装备进阶界面加载
var equipUp = function () {
    $("#equip").html("<div id='equip_Hero'><div class='swiper-container equip_hero_Swiper'><div class='swiper-wrapper'></div></div></div><div id='equip_Main'><div id='equip_detail_select'></div><div class='equip_Detail'><div class='equip_Head'><div class='equip_bg'></div><div class='equip_img'></div></div><div class='equip_hero_detail_name'></div><div class='equip_hero_detail_refine'></div><div class='equip_hero_detail_value'></div></div><div class='equip_Detail'><div class='equip_Head'><div class='equip_bg'></div><div class='equip_img'></div></div><div class='equip_hero_detail_name'></div><div class='equip_hero_detail_refine'></div><div class='equip_hero_detail_value'></div></div><div class='equip_Detail'><div class='equip_Head'><div class='equip_bg'></div><div class='equip_img'></div></div><div class='equip_hero_detail_name'></div><div class='equip_hero_detail_refine'></div><div class='equip_hero_detail_value'></div></div><div class='equip_Detail'><div class='equip_Head'><div class='equip_bg'></div><div class='equip_img'></div></div><div class='equip_hero_detail_name'></div><div class='equip_hero_detail_refine'></div><div class='equip_hero_detail_value'></div></div></div><div id='equip_refine_adv'><div id='equip_big_name'style='top:18px;'></div><div id='equip_adv_Head'><div class='equip_LvUp_bg'></div><div class='equip_LvUp_img'></div></div><div id='equip_adv_Detail'>装备等级1<br/>强化等级15<br/>攻击100<br/></div><div id='equip_adv_need'>消耗材料:</div><div id='equip_adv_Result'>20<br/>10<br/>200<br/></div><div id='equip_LvUp_Need'><div id='equip_LvUp_Need1'class='equip_LvUp_NeedItem'><div class='equip_LvUp_NeedImg'></div><div id='equip_LvUp_Need1_Num'class='equip_LvUp_Num'>0/1</div></div><div id='equip_LvUp_Need2'class='equip_LvUp_NeedItem'><div class='equip_LvUp_NeedImg'></div><div id='equip_LvUp_Need2_Num'class='equip_LvUp_Num'>0/1</div></div><div id='equip_LvUp_Need3'class='equip_LvUp_NeedItem'><div class='equip_LvUp_NeedImg'></div><div id='equip_LvUp_Need3_Num'class='equip_LvUp_Num'>0/1</div></div></div><div id='equip_hr1'class='equip_hr'></div><div id='equip_hr2'class='equip_hr'></div></div>");
    
    setTitle(12);

    if (!equipJson.data || equipJson.data.length == 0) {
        showTextMess("对不起,你还没有任何武将有装备!",2);
        $("#equip_detail_select").css("display", "none");
        $("#equip_adv_Result,#equip_adv_Detail,#equip_adv_Head,#equip_LvUp_Need").css("display", "none");
        $("#equip_adv_need").text("");
        return;
    }
    equipLoadHero();
    $(".equip_hero_select:first").show().siblings(".equip_heroDetail").addClass("equip_heroDetailSelect");
    $(".LvUpBtn").hide();

    $("#equip_advbtn").show();

    $("#heroequip_something").css("top", "86px").find("img").css("top", "-6px").siblings("div").html("进阶到高级装备时，强化等级会下降。");

    //加载已装备的物品
    showLvUpHeroEquip(0);

    //进阶点击事件
    $("#equip_advbtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        EquipUpBtn();
    }).bindAnimate();

    var refineSwiper = new Swiper('.equip_hero_Swiper', {
        mode: 'vertical',
        slidesPerSlide: 6
    });

    //绑定物品点击详细信息
    $("#equip_LvUp_Need1,#equip_LvUp_Need2,#equip_LvUp_Need3").bind("touchend", function () {
        if (cancel())
            return;
        shopGoodDetail($(this).attr("itemid"));
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })

    //英雄点击事件
    $("#equip_Hero .equip_hero_Swiper .swiper-wrapper .equip_heroDetail").bind("touchend", function () {
        if (cancel())
            return;
        $(".equip_heroDetailSelect").removeClass("equip_heroDetailSelect");
        $(this).addClass("equip_heroDetailSelect");
        $(".equip_hero_select").hide();
        $(this).siblings(".equip_hero_select").show();
        $("#equip_detail_select").css("top", "0");
        showLvUpHeroEquip($(this).parent().index());
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })

    //绑定装备点击事件
    $(".equip_Detail").bind("touchend", function () {
        if (cancel())
            return;
        $(".equip_DetailSelect").removeClass("equip_DetailSelect");
        $(this).addClass("equip_DetailSelect");
        equipData.nowclick = $(this).index();
        $("#equip_detail_select").css("top", ($(this).attr("nowclick") - 1) * 81);
        equipData.bagIndex = $(this).attr("sid");
        equipData.localIndex = $(this).attr("index");
        loadHeroEquipUpDetail();
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })
}

//加载装备进阶的具体信息
var loadHeroEquipUpDetail = function () {
    equipData.canUp = true;
    var nowLocalDetail = GoodsJson.data[equipData.localIndex];
    var nowDetail = bagJson.data[equipData.bagIndex].p.split(",");
    var nextLocalDetail;
    var tempUpIndex;
    //找出进化后的装备具体
    for (var i = 0; i < itemAdvJson.data.length; i++) {
        if (itemAdvJson.data[i].itemid == nowLocalDetail.ItemID) {
            tempUpIndex = i;
            break;
        }
    }

    if (nowLocalDetail.Q == 5) {
        showTextMess("此装备已不能进阶", 1);
        $("#equip_detail_select").css("display", "none");
        $("#equip_adv_Result,#equip_adv_Detail,#equip_adv_Head,#equip_LvUp_Need").css("display", "none");
        $("#equip_adv_need").text("");
        $("#equip_big_name").css("color", "#26E50E").text("不可进阶");
        return;
    }
    else {
        $("#equip_detail_select").css("display", "block");
        $("#equip_adv_Result,#equip_adv_Detail,#equip_adv_Head,#equip_LvUp_Need").css("display", "block");
    }

    for (var j = 0; j < GoodsJson.data.length; j++) {
        if (GoodsJson.data[j].ItemID == itemAdvJson.data[tempUpIndex].nextid) {
            nextLocalDetail = GoodsJson.data[j];
            break;
        }
    }

    $("#equip_big_name").css("color", getColor(String(nextLocalDetail.Q))).text(nextLocalDetail.Name);

    //加载此装备的图片
    $("#equip_adv_Head .equip_LvUp_bg").css("background-image", "url(res/head/" + nextLocalDetail.Q + ".png)");
    $("#equip_adv_Head .equip_LvUp_img").css("background-image", "url(res/goods/" + nextLocalDetail.ImgID + ".png)");
    

    //重次计算进阶的强化等级

    var tempMoney;
    var nextMoney;
    var tempUpcoin;
    var nextUpcoin;
    for (var i = 0; i < refineJson.data.length; i++) {
        if (refineJson.data[i].refq == nowLocalDetail.RefQ) {
            tempMoney = refineJson.data[i].cutcoin;
            tempUpcoin = refineJson.data[i].upcoin;
            nextMoney = refineJson.data[i + 1].cutcoin;
            nextUpcoin = refineJson.data[i + 1].upcoin;
            refineItemIndex = i;
            break;
        }
    }

    var tempAllMoney = 0;
    for (var i = 0; i < Number(nowDetail[4]) ; i++) {
        tempAllMoney += tempMoney + tempUpcoin * i;
    }
    var nextAllMoney = 0;
    var refineLv=0;
    if (tempAllMoney ==0) {
        refineLv = 0;
    }
    else {
        while (true) {
            tempAllMoney -= nextMoney + nextUpcoin * refineLv;
            if (tempAllMoney >= 0) {
                refineLv += 1;
            }
            else {
                break;
            }
        }
    }
    
    switch (nowLocalDetail.Type) {
        case 1:
            //武器
            var ResultVal = nextLocalDetail.ATK + refineLv * refineJson.data[refineItemIndex + 1].atk;
            $("#equip_adv_Detail").html("强化等级: <font style='color:#F2E234;'>" + nowDetail[4] + "</font><br>攻击: <font style='color:#F2E234;'>" + (Number(nowDetail[9]) + Number(nowDetail[6])) + "</font><br>");
            $("#equip_adv_Result").html(refineLv + "<br/>" + ResultVal);
            break;
        case 2:
            //头盔
            var ResultVal = nextLocalDetail.HP + refineLv * refineJson.data[refineItemIndex + 1].hp;
            $("#equip_adv_Detail").html("强化等级: <font style='color:#F2E234;'>" + nowDetail[4] + "</font><br>生命: <font style='color:#F2E234;'>" + (Number(nowDetail[9]) + Number(nowDetail[6])) + "</font><br>");
            $("#equip_adv_Result").html(refineLv + "<br/>" + ResultVal);
            break;
        case 3:
            //衣服
            var ResultVal = nextLocalDetail.DEF + refineLv * refineJson.data[refineItemIndex + 1].def;
            $("#equip_adv_Detail").html("强化等级: <font style='color:#F2E234;'>" + nowDetail[4] + "</font><br>防御: <font style='color:#F2E234;'>" + (Number(nowDetail[9]) + Number(nowDetail[6])) + "</font><br>");
            $("#equip_adv_Result").html(refineLv + "<br/>" + ResultVal);
            break;
        case 4:
            //戒指
            var ResultVal = nextLocalDetail.hit + refineLv * refineJson.data[refineItemIndex + 1].hit;
            $("#equip_adv_Detail").html("强化等级: <font style='color:#F2E234;'>" + nowDetail[4] + "</font><br>闪避: <font style='color:#F2E234;'>" + (Number(nowDetail[9]) + Number(nowDetail[6])) + "</font><br>");
            $("#equip_adv_Result").html(refineLv + "<br/>" + ResultVal);
            break;
        case 5:
            //项链
            var ResultVal = nextLocalDetail.baoji + refineLv * refineJson.data[refineItemIndex + 1].baoji;
            $("#equip_adv_Detail").html("强化等级: <font style='color:#F2E234;'>" + nowDetail[4] + "</font><br>暴击: <font style='color:#F2E234;'>" + (Number(nowDetail[9]) + Number(nowDetail[6])) + "</font><br>");
            $("#equip_adv_Result").html(refineLv + "<br/>" + ResultVal);
            break;
    }
    
    
    //加载进阶需要的材料
    var tempMaterial = itemAdvJson.data[tempUpIndex].material.split(",");
    var itemNum = itemAdvJson.data[tempUpIndex].num.split(",");//需要的物品
    for (var i = 0; i < 3; i++) {
        var tempDetail = getLocalEquipDetailByGid(tempMaterial[i]);
        //找出仓库中有是否有此物品

        var tempFlag2 = false;
        var tempSplit;
        var tempReturn;
        for (var j = 0; j < bagJson.data.length; j++) {
            tempReturn = bagJson.data[j].p.split(",");
            if (tempReturn[2] == tempMaterial[i]) {
                tempSplit = tempReturn;
                tempFlag2 = true;
            }
        }
        
        if (tempFlag2) {
            if (Number(tempSplit[5]) >= Number(itemNum[i])) {
                $("#equip_LvUp_Need" + (i + 1) + "_Num").css("color", "#26E50E").text("" + tempSplit[5] + "/" + itemNum[i] + "");
            }
            else {
                $("#equip_LvUp_Need" + (i + 1) + "_Num").css("color", "red").text("" + tempSplit[5] + "/" + itemNum[i] + "");
                equipData.canUp = false;
            }
        }
        else {
            $("#equip_LvUp_Need" + (i + 1) + "_Num").css("color", "red").text("0/" + itemNum[i] + "");
            equipData.canUp = false;
        }

        for (var x = 0; x < GoodsJson.data.length; x++) {
            if (GoodsJson.data[x].ItemID == tempMaterial[i]) {
                $("#equip_LvUp_Need" + (i + 1)).attr("itemid", GoodsJson.data[x].ItemID);

                $("#equip_LvUp_Need" + (i + 1) + " .equip_LvUp_NeedImg").css("background-image", "url(res/goods/" + GoodsJson.data[x].ImgID + ".png)");
                break;
            }
        }
    }
}

//进阶按钮事件
var EquipUpBtn = function () {
    if (equipData.canUp) {
        var nowEquip = bagJson.data[equipData.bagIndex].p.split(",");
        window.GameMainClass.sendRequestJson(124, "{\"id\":" + nowEquip[0] + ",\"num\":1}", "EquipUpBack");
    }
    else {
        showTextMess("对不起,材料不足", 2);
    }
}

//进阶成功返回
var EquipUpBack = function (json) {
    var tempJson = JSON.parse(json);
    //var tempJson = { "cutIDs": "43,44,45", "cutNums": "9,180,180", "info": "装备进化成功", "p": "26,131,1009,1,0,1,200,1", "resert": 1 };
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
    } else {

        window.GameMainClass.playEffectSound("adv");

        showTextMess(tempJson.info, 1);
        $("#equip_adv_Head").append("<div id='equip_animate'></div>");

        var tempFlag = 0;
        var equipTime = setInterval(function () {
            tempFlag++;
            $("#equip_animate").css("background-position-x", -tempFlag * 180);
            if (tempFlag == 8) {
                clearInterval(equipTime);
                $("#equip_animate").remove();
            }
        }, 160)
        

        var cutIDsTemp=tempJson.cutIDs.split(",");
        var cutNumsTemp = tempJson.cutNums.split(",");

        //更换新的
        for (var i = 0; i < bagJson.data.length; i++) {
            if (bagJson.data[i].p.split(",")[0] == tempJson.p.split(",")[0]) {
                bagJson.data[i].p = tempJson.p;
                equipData.bagIndex = i;
                for (var x = 0; x < GoodsJson.data.length; x++) {
                    var tempId = tempJson.p.split(",")[2]
                    if (GoodsJson.data[x].ItemID == tempId) {
                        equipData.localIndex = x;
                        break;
                    }
                }
                break;
            }
        }

        for (var i = 0; i < 3; i++) {
            //改变使用掉的
            for (var j = 0; j < bagJson.data.length; j++) {
                var tempSplit=bagJson.data[j].p.split(",");
                if (tempSplit[0] == cutIDsTemp[i]) {
                    if (Number(tempSplit[5]) - Number(cutNumsTemp[i]) == 0) {
                        //删除
                        bagJson.data.splice(j, 1);
                        break;
                    }else{
                        //改变数量
                        tempSplit[5] = Number(tempSplit[5]) - Number(cutNumsTemp[i]);
                        bagJson.data[j].p = tempSplit.join(",");
                        break;
                    }
                }
            }
        }
        var nowEquip = tempJson.p.split(",");
        var tempNextGood = GoodsJson.data[equipData.localIndex];

        var tempDiv = $(".equip_DetailSelect")
        tempDiv.find(".equip_hero_detail_name").text(tempNextGood.Name);
        tempDiv.find(".equip_hero_detail_value .font").text(Number(nowEquip[6]) + Number(nowEquip[9]));
        tempDiv.find(".equip_hero_detail_refine .font").text(nowEquip[4]);
        tempDiv.attr("sid", equipData.bagIndex);
        tempDiv.attr("index", equipData.localIndex);
        tempDiv.find(".equip_bg").css("background-image", "url(res/head/" + nowEquip[7] + ",png)");
        tempDiv.find(".equip_img").css("background-image", "url(res/goods/" + tempNextGood.ImgID + ".png)");

        $(".equip_Detail").eq(equipData.nowclick).find(".equip_hero_Detail").html("" + GoodsJson.data[equipData.localIndex].Name + "<br/><p>强化等级:" + nowEquip[4] + "</p>");
        nowEquipDiv = $(".equip_DetailSelect");
        var tempStr;
        if (nowEquip[4] == "0")
            tempStr = "未强化";
        else
            tempStr = nowEquip[4];
        nowEquipDiv.find(".equip_hero_detail_refine").html("强化: <font style='color:#F2E234'>" + tempStr + "</font>");
        nowEquipDiv.find(".equip_hero_detail_value>font").text(Number(nowEquip[9]) + Number(nowEquip[6]));

        loadHeroEquipUpDetail();
    }
}

//加载宝石界面
var showGem = function () {
    var GemDialog = "<div id='equip_gem_list_left'><div id='equip_gem_list'><div class='swiper-container gemSwiper'><div class='swiper-wrapper'><div id='gemPage0'class='swiper-slide gem-slide'><div class='equip_gem_item'></div><div class='equip_gem_item'></div><div class='equip_gem_item'></div><div class='equip_gem_item'></div><div class='equip_gem_item'></div><div class='equip_gem_item'></div><div class='equip_gem_item'></div><div class='equip_gem_item'></div><div class='equip_gem_item'></div><div class='equip_gem_item'></div><div class='equip_gem_item'></div><div class='equip_gem_item'></div><div class='equip_gem_item'></div><div class='equip_gem_item'></div><div class='equip_gem_item'></div><div class='equip_gem_item'></div></div></div></div></div></div><div id='equip_gem_list_right'><div id='equip_gem_list_main'><div id='equip_gem_small0'class='equip_gem_small'></div><div id='equip_gem_small1'class='equip_gem_small'></div><div id='equip_gem_big'></div><div id='equip_gem_small2'class='equip_gem_small'></div><div id='equip_gem_small3'class='equip_gem_small'></div></div><div id='equip_gem_list_useValue'></div><div id='equip_gem_list_castValue'></div><div id='equip_hr3'class='equip_hr'></div><div id='ac_left' style='left:319px;top:137px;'></div><div id='ac_right' style='left:686px;top:137px;'></div></div>";
    $("#equip").html(GemDialog);
    setTitle(14);
    $(".LvUpBtn").hide();
    $("#equip_makebtn").show();
    $("#heroequip_something").css("top", "86px").find("img").css("top", "-6px").siblings("div").html("每4个宝石合成1个高级宝石，目前最高5级。");
    var index = 0;
    var nowPage = 0;
    var tempFlag = 0;
    var hasItem=new Array();
    for (var i = 0; i < bagJson.data.length; i++) {
        var tempSplit=bagJson.data[i].p.split(",");
        if (tempSplit[3] >= 6 && tempSplit[3] <= 12) {
            if (tempSplit[8] != "0")
                continue;
            var tempDiv = $("#gemPage" + nowPage + ">.equip_gem_item").eq(tempFlag);
            tempDiv.html("<div class='bagHead' style='background-image:url(res/goods/" + tempSplit[2] + ".png);'></div><div class='equip_gem_item_num'>" + tempSplit[5] + "</div>")
            tempDiv.attr("index", tempSplit[2]);
            tempDiv.attr("num", tempSplit[5]);
            tempDiv.attr("page", nowPage);
            tempDiv.attr("sid", tempSplit[0]);
            index++;
            tempFlag++;
        }
        if (tempFlag == 16) {
            nowPage++;
            tempFlag = 0;
            $(".swiper-wrapper").append("<div id='gemPage"+nowPage+"' class='swiper-slide gem-slide'><div class='equip_gem_item'></div><div class='equip_gem_item'></div><div class='equip_gem_item'></div><div class='equip_gem_item'></div><div class='equip_gem_item'></div><div class='equip_gem_item'></div><div class='equip_gem_item'></div><div class='equip_gem_item'></div><div class='equip_gem_item'></div><div class='equip_gem_item'></div><div class='equip_gem_item'></div><div class='equip_gem_item'></div><div class='equip_gem_item'></div><div class='equip_gem_item'></div><div class='equip_gem_item'></div><div class='equip_gem_item'></div></div>");
        }
    }
    if (tempFlag == 0&&nowPage!=0) {
        $("#gemPage" + nowPage).remove();
    }

    //绑定宝石点击事件
    $("#equip_gem_list .equip_gem_item").bind("touchend", function () {
        if (cancel())
            return;
        if ($(this).children("div").length != 0) {
            if (Number($(this).attr("num")) >= 4) {
                var tempIndex = $(this).attr("index");
                var tempFlag = false;
                for (var x = 0; x < itemAdvJson.data.length; x++) {
                    if (tempIndex == itemAdvJson.data[x].itemid) {
                        tempFlag = true;
                        for (var y = 0; y < GoodsJson.data.length; y++) {
                            if (GoodsJson.data[y].ItemID == itemAdvJson.data[x].nextid) {
                                //被合成的物品
                                $("#equip_gem_big").css("background-image", "url(res/goods/" + GoodsJson.data[y].ImgID + ".png)");
                                switch (GoodsJson.data[y].Type) {
                                    case 6://攻击
                                        $("#equip_gem_list_useValue").html("攻击:<font style='color:#F2E234;'>" + GoodsJson.data[y].ATK + "</font>").siblings("#equip_gem_list_castValue").html("花费银币:<font style='color:#F2E234'>" + itemAdvJson.data[x].cutcoin + "</font>");
                                        break;
                                    case 7:
                                        $("#equip_gem_list_useValue").html("生命:<font style='color:#F2E234;'>" + GoodsJson.data[y].HP + "</font>").siblings("#equip_gem_list_castValue").html("花费银币:<font style='color:#F2E234'>" + itemAdvJson.data[x].cutcoin + "</font>");
                                        break;
                                    case 8:
                                        $("#equip_gem_list_useValue").html("防御:<font style='color:#F2E234;'>" + GoodsJson.data[y].DEF + "</font>").siblings("#equip_gem_list_castValue").html("花费银币:<font style='color:#F2E234'>" + itemAdvJson.data[x].cutcoin + "</font>");
                                        break;
                                    case 9:
                                        $("#equip_gem_list_useValue").html("命中:<font style='color:#F2E234;'>" + GoodsJson.data[y].hit + "</font>").siblings("#equip_gem_list_castValue").html("花费银币:<font style='color:#F2E234'>" + itemAdvJson.data[x].cutcoin + "</font>");
                                        break;
                                    case 10:
                                        $("#equip_gem_list_useValue").html("暴击:<font style='color:#F2E234;'>" + GoodsJson.data[y].baoji + "</font>").siblings("#equip_gem_list_castValue").html("花费银币:<font style='color:#F2E234'>" + itemAdvJson.data[x].cutcoin + "</font>");
                                        break;
                                    case 11:
                                        $("#equip_gem_list_useValue").html("闪避:<font style='color:#F2E234;'>" + GoodsJson.data[y].miss + "</font>").siblings("#equip_gem_list_castValue").html("花费银币:<font style='color:#F2E234'>" + itemAdvJson.data[x].cutcoin + "</font>");
                                        break;
                                    case 12:
                                        $("#equip_gem_list_useValue").html("韧性:<font style='color:#F2E234;'>" + GoodsJson.data[y].renxing + "</font>").siblings("#equip_gem_list_castValue").html("花费银币:<font style='color:#F2E234'>" + itemAdvJson.data[x].cutcoin + "</font>");
                                        break;
                                }
                                break;
                            }
                        }
                        break;
                    }
                }
                if (!tempFlag) {
                    showTextMess("宝石已达最高状态", 2);
                    return;
                }
                $("#equip_gem_small0").attr("index", $(this).attr("index"));
                $("#equip_gem_small0").attr("page", $(this).attr("page"));
                //点击后的值
                var tempDiv = $(this).children(".equip_gem_item_num");
                tempDiv.text((Number(tempDiv.text()) - 4));
                if (Number(tempDiv.text()) <= 0) {
                    $(this).children().hide();
                } else {
                    $(this).children().show();
                }

                for (var i = 0; i < 4; i++) {
                    $("#equip_gem_small" + i).css("background-image", $(this).children(".bagHead").css("background-image"));
                }

                if ($("#equip_gem_list_main").attr("index")) {
                    var tempDiv = $("#gemPage" + $("#equip_gem_list_main").attr("page") + " .equip_gem_item").eq($("#equip_gem_list_main").attr("index")).children(".equip_gem_item_num");
                    tempDiv.text(Number(tempDiv.text()) + 4)
                    if (Number(tempDiv.text()) <= 0) {
                        $(this).children().hide();
                    } else {
                        $(this).children().show();
                    }
                }

                $("#equip_gem_list_main").attr("index", $(this).index());
                $("#equip_gem_list_main").attr("page", $(this).attr("page"));
            } else {
                showTextMess("宝石不足",2);
            }
        }
        
    }).bind("touchmove", function () {
        move();
    }).bind("touchstart", function () {
        begin();
    })

    //绑定合成界面事件 宝石返回
    $("#equip_gem_list_main .equip_gem_small").bind("touchend", function () {
        if (cancel())
            return;
        if ($("#equip_gem_list_main").attr("index")) {
            var tempIndex = $("#equip_gem_list_main").attr("index");

            //宝石数加回来
            var tempDiv = $("#gemPage" + $("#equip_gem_list_main").attr("page") + " .equip_gem_item").eq(tempIndex);
            var tempNum = parseInt(tempDiv.attr("num"));
            
            tempDiv.attr("num", tempNum);
            tempDiv.find(".equip_gem_item_num").text(tempNum).parent().children().show();

            $("#equip_gem_list_main .equip_gem_small").css("background-image", "");
            $("#equip_gem_list_main").removeAttr("index");
            $("#equip_gem_big").css("background-image", "");
            $("#equip_gem_list_useValue").html("");
            $("#equip_gem_list_castValue").html("");
        }
    }).bind("touchmove", function () {
        move();
    }).bind("touchstart", function () {
        begin();
    })

    //绑定合成按钮
    $("#equip_makebtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        if ($("#equip_gem_small0").attr("index") != null) {
            window.GameMainClass.sendRequestJson(127, "{\"id\":" + $("#equip_gem_small0").attr("index") + "}", "gemOK");
        }
        else {
            showTextMess("请选择合成宝石", 2);
        }
    }).bindAnimate();

    var mySwiper = new Swiper('.gemSwiper', {
        mode: 'horizontal'
    });
}

//宝石合成成功
var gemOK = function (json) {
    var tempJson = JSON.parse(json);
    //var tempJson = {"Client":[{"id":2001}],"coin":100,"cutstr":"8061","info":"宝石合成成功","resert":1,"ware":[{"p":"8068,0,2002,6,0,1,0,2,0,50,0"}]}
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info,2);
    }
    else {
        window.GameMainClass.playEffectSound("lvup");

        $("#equip_gem_big").append("<div id='equip_animate' style='left:-46px;top:-48px;'></div>");
        var tempFlag = 0;
        var holeTime = setInterval(function () {
            tempFlag++;
            $("#equip_animate").css("background-position-x", -tempFlag * 180);
            if (tempFlag == 8) {
                clearInterval(holeTime);
                $("#equip_animate").remove();
            }
        },160)


        if (tempJson.real != "") {
            //去掉消耗的宝石
            for (var j = 0; j < bagJson.data.length; j++) {
                var tempSplit = bagJson.data[j].p.split(",")
                if (tempSplit[0] == tempJson.cutstr) {
                    if (tempSplit[5] == 4) {
                        bagJson.data.splice(j, 1);
                    } else {
                        tempSplit[5] = Number(tempSplit[5]) - 4;
                        bagJson.data[j].p = tempSplit.join(",");
                    }
                    break;
                }
            }

            showTextMess("合成宝石成功!", 1);

            updateUserJson("200", 0 - tempJson.coin);

            if (tempJson.ware[0].p.split(",")[5] == 1) {
                bagJson.data.push(tempJson.ware[0]);
            } else {
                var tempId=tempJson.ware[0].p.split(",")[0];
                for (var i = 0; i < bagJson.data.length; i++) {
                    if (bagJson.data[i].p.split(",")[0] == tempId) {
                        bagJson.data[i] = tempJson.ware[0];
                        break;
                    }
                }
            }

            setTimeout(function () {
                showGem();
            },1500)
        }
    }
}

//加载宝石镶嵌
var showHole = function () {
    $("#equip").html("<div id='equip_Hero'><div class='swiper-container equip_hero_Swiper'><div class='swiper-wrapper'></div></div></div><div id='equip_Main'><div id='equip_detail_select'></div><div class='equip_Detail'><div class='equip_Head'><div class='equip_bg'></div><div class='equip_img'></div></div><div class='equip_hero_detail_name'></div><div class='equip_hero_detail_refine'></div><div class='equip_hero_detail_value'></div></div><div class='equip_Detail'><div class='equip_Head'><div class='equip_bg'></div><div class='equip_img'></div></div><div class='equip_hero_detail_name'></div><div class='equip_hero_detail_refine'></div><div class='equip_hero_detail_value'></div></div><div class='equip_Detail'><div class='equip_Head'><div class='equip_bg'></div><div class='equip_img'></div></div><div class='equip_hero_detail_name'></div><div class='equip_hero_detail_refine'></div><div class='equip_hero_detail_value'></div></div><div class='equip_Detail'><div class='equip_Head'><div class='equip_bg'></div><div class='equip_img'></div></div><div class='equip_hero_detail_name'></div><div class='equip_hero_detail_refine'></div><div class='equip_hero_detail_value'></div></div></div><div id='equip_Hole_Main'><div id='equip_hole0'class='equip_hole'><div class='equip_hole_img'></div><div class='equip_hole_text'></div><div class='LvUpEat_font'></div></div><div id='equip_hole1'class='equip_hole'><div class='equip_hole_img'></div><div class='equip_hole_text'></div><div class='LvUpEat_font'></div></div><div id='equip_hole2'class='equip_hole'><div class='equip_hole_img'></div><div class='equip_hole_text'></div><div class='LvUpEat_font'></div></div><div id='equip_hole3'class='equip_hole'><div class='equip_hole_img'></div><div class='equip_hole_text'></div><div class='LvUpEat_font'></div></div><div id='equip_hole_Big'><div class='equip_hole_bg'></div><div class='equip_hole_img'></div></div><div id='equip_hr1'class='equip_hr'></div><div id='equip_hr2'class='equip_hr'></div></div>");
    
    holeData.hole = true;
    setTitle(11);

    if (!equipJson.data || equipJson.data.length == 0) {
        showTextMess("对不起,你还没有任何武将有装备!",2);
        $("#equip_detail_select").css("display","none");
        return;
    }
    equipLoadHero();
    $(".LvUpBtn").hide();

    $("#heroequip_something").css("top", "86px").find("img").css("top", "-6px").siblings("div").html("每件装备只能镶嵌1个同类宝石。");

    //英雄点击事件
    $("#equip_Hero .equip_hero_Swiper .swiper-wrapper .equip_heroDetail").bind("touchend", function () {
        if (cancel())
            return;
        $(".equip_heroDetailSelect").removeClass("equip_heroDetailSelect");
        $(this).addClass("equip_heroDetailSelect");
        $(".equip_hero_select").hide();
        $(this).siblings(".equip_hero_select").show();
        $("#equip_detail_select").css("top", "0");
        showHeroEquip($(this).parent().index());
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })

    var refineSwiper = new Swiper('.equip_hero_Swiper', {
        mode: 'vertical',
        slidesPerSlide: 6
    });

    //加载已装备的物品
    $(".equip_hero_select:first").show().siblings(".equip_heroDetail").addClass("equip_heroDetailSelect");
    showHeroEquip(0);

    //绑定装备点击事件
    $(".equip_Detail").bind("touchend", function () {
        $(".equip_DetailSelect").removeClass("equip_DetailSelect");
        $(this).addClass("equip_DetailSelect");
        equipData.nowclick = $(this).index();
        $("#equip_detail_select").css("top", ($(this).attr("nowclick") - 1) * 81);


        for (var i = 0; i < bagJson.data.length; i++) {
            if (bagJson.data[i].p.split(",")[0] == $(this).attr("itemsid")) {
                equipData.bagIndex = i;
                $(this).attr("sid", i);
                break;
            }
        }

        equipData.localIndex = $(this).attr("index");
        loadEquipHole();
    })

    //绑定选择宝石事件
    $(".equip_hole").bind("touchend", function () {
        if ($(this).attr("can")) {
            holeData.hole = true;
            holeData.nowclick = $(this).index();
            holeData.oldSid = $(this).attr("sid");
            showHoleSelect();
        }
    })
}

//加载装备孔数
var loadEquipHole = function () {
    var tempDiv;
    for (var i = 0; i < 4; i++) {
        tempDiv = $("#equip_hole" + i);
        tempDiv.css({ "background-image": "url(res/refine/lock.png)" });
        tempDiv.removeAttr("can");
        tempDiv.removeAttr("type");
        tempDiv.removeAttr("sid");
        tempDiv.children(".equip_hole_img").css("background-image", "");
        tempDiv.children(".equip_hole_text").html("");
        tempDiv.children(".LvUpEat_font").hide();
    }
    var detail = bagJson.data[equipData.bagIndex].p.split(",");
    var localDetail = GoodsJson.data[equipData.localIndex];

    $("#equip_hole_Big .equip_hole_img").css("background-image", "url(res/goods/" + localDetail.ImgID + ".png)").siblings(".equip_hole_bg").css("background-image", "url(res/head/" + localDetail.Q + ".png)");
    $("#equip_hole_Big").attr("sid", detail[0]);

    //背景图片
    for (var i = 0; i < localDetail.HoleNum; i++) {
        tempDiv = $("#equip_hole" + i);
        tempDiv.css({ "background-image": "" }).attr("can", true);
        tempDiv.children(".LvUpEat_font").show();
    }

    //已有物品
    var index = 0;
    for (var i = 0; i < bagJson.data.length; i++) {
        var tempSplit = bagJson.data[i].p.split(",");
        if (tempSplit[8] == detail[0]) {
            tempDiv = $("#equip_hole" + index);
            tempDiv.find(".equip_hole_img").css("background-image", "url(res/goods/" + tempSplit[2] + ".png)");
            tempDiv.find(".equip_hole_text").html(getTypeContent(tempSplit[3]) + ":<font style='color:#F2E234;'>" + tempSplit[9] + "</font>");
            tempDiv.attr("type", tempSplit[3]);
            tempDiv.attr("sid", tempSplit[0]);
            index++;
            tempDiv.children(".LvUpEat_font").hide();
        }
    }

    
}

//宝石镶嵌
var gemSetBack = function (json) {
    var tempJson = JSON.parse(json);
    //var tempJson = { "Client": [{ "gemsid": 8043, "lastgemsid": 8027, "equipsid": 7955 }], "setstr": "8044,20245,2046,11,0,1,0,2,7955,0,0" ,  "replacestr": "8044,20245,2046,11,0,1,0,2,7955,0,0", "info": "镶嵌成功", "resert": 1 }
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info,2);
    }
    else {

        showTextMess(tempJson.info, 1);

        window.GameMainClass.playEffectSound("gem");

        //改变宝石堆减一
        for (var i = 0; i < bagJson.data.length; i++) {
            var tempSplit=bagJson.data[i].p.split(",");
            if (tempSplit[0] == tempJson.Client[0].gemsid) {
                if (tempSplit[5] == 1) {
                    bagJson.data.splice(i, 1);
                } else {
                    tempSplit[5] = Number(tempSplit[5]) - 1;
                    bagJson.data[i].p = tempSplit.join(",");
                }
                break;
            }
        }

        

        //增加一个新宝石
        bagJson.data.push({ "p": tempJson.setstr });

        //改变装备的宝石数
        for (var i = 0; i < bagJson.data.length; i++) {
            var tempSplit = bagJson.data[i].p.split(",");
            if (tempSplit[0] == tempJson.Client[0].equipsid) {
                tempSplit[10] = 1;
                bagJson.data[i].p = tempSplit.join(",");
                break;
            }
        }

        //上一个宝石堆删除
        if (tempJson.Client[0].lastgemsid) {
            for (var i = 0; i < bagJson.data.length; i++) {
                var tempSplit = bagJson.data[i].p.split(",");
                if (tempSplit[0] == tempJson.Client[0].lastgemsid) {
                    bagJson.data.splice(i, 1);
                    break;
                }
            }
        }

        //现在的宝石堆
        if (tempJson.replacestr) {
            var tempId = tempJson.replacestr.split(",")[0];
            if (tempJson.replacestr.split(",")[5] == 1) {
                bagJson.data.push({ "p": tempJson.replacestr });
            } else {
                for (var i = 0; i < bagJson.data.length; i++) {
                    if (bagJson.data[i].p.split(",")[0] == tempId) {
                        bagJson.data[i].p = tempJson.replacestr;
                        break;
                    }
                }
            }
        }

        var tempDetail = tempJson.setstr.split(",");

        //加载
        var holeDiv = $("#equip_hole" + holeData.nowclick);
        holeDiv.attr("type", tempDetail[3]);
        holeDiv.attr("sid", tempDetail[0]);
        holeDiv.attr("can", false);
        holeDiv.children(".equip_hole_img").css("background-image", "url(res/goods/" + GoodsJson.data[holeData.sIndex].ImgID + ".png)");
        holeDiv.children(".equip_hole_text").html(getTypeContent(tempDetail[3]) + ":<font style='color:#F2E234;'>" + tempDetail[9] + "</font>");
        holeDiv.children(".LvUpEat_font").hide();

        
        //新物品索引
        var tempUseId = Number($("#equip_hole_Big").attr("sid"));
        for (var i = 0; i < bagJson.data.length; i++) {
            if (bagJson.data[i].p.split(",")[0] == tempUseId) {
                equipData.bagIndex = i;
                break;
            }
        }

    }
}

//宝石卸下事件
var gemDownBack = function (json) {
    var tempJson = JSON.parse(json);
    //var tempJson ={"Client":[{"gemsid":8046,"equipsid":7955}],"info":"移除宝石成功","p":"8045,0,2002,6,0,2,0,2,0,0,0","resert":1}
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info,2);
    }
    else {
        showTextMess(tempJson.info, 1);

        $("#temp").html("");

        //删除宝石
        for (var i = 0; i < bagJson.data.length; i++) {
            var tempSplit = bagJson.data[i].p.split(",");
            if (tempSplit[0] == tempJson.Client[0].gemsid) {
                bagJson.data.splice(i, 1);
                //移除图片
                var tempDiv;
                for (var j = 0; j < 4; j++) {
                    tempDiv=$("#equip_hole" + j);
                    if (tempDiv.attr("sid") == tempJson.Client[0].gemsid) {
                        tempDiv.find(".equip_hole_img").css("background-image", "");
                        tempDiv.find(".equip_hole_text").html("");
                        tempDiv.find(".LvUpEat_font").show();
                        tempDiv.removeAttr("sid");
                        tempDiv.removeAttr("type");
                        tempDiv.removeAttr("sid");
                        break;
                    }
                }
                $("#dialogTemp").remove();
                break;
            }
        }

        var tempFlag = false;

        for (var i = 0; i < bagJson.data.length; i++) {
            var tempSplit = bagJson.data[i].p.split(",");
            if (tempSplit[8] == tempJson.Client[0].equipsid) {
                tempFlag = true;
                break;
            }
        }

        if (!tempFlag) {
            //改变装备的宝石数
            for (var i = 0; i < bagJson.data.length; i++) {
                var tempSplit = bagJson.data[i].p.split(",");
                if (tempSplit[0] == tempJson.Client[0].equipsid) {
                    tempSplit[10] = 0;
                    bagJson.data[i].p = tempSplit.join(",");
                    break;
                }
            }
        }

        //改变影响的宝石堆
        var tempId=tempJson.p.split(",")[0];
        tempFlag=false;
        for (var i = 0; i < bagJson.data.length; i++) {
            var tempSplit = bagJson.data[i].p.split(",");
            if (tempSplit[0] == tempId) {
                tempFlag = true;
                bagJson.data[i].p = tempJson.p;
                break;
            }
        }
        if (!tempFlag) {
            bagJson.data.push({ "p": tempJson.p });
        }

        //新物品索引
        var tempUseId = Number($("#equip_hole_Big").attr("sid"));
        for (var i = 0; i < bagJson.data.length; i++) {
            if (bagJson.data[i].p.split(",")[0] == tempUseId) {
                equipData.bagIndex = i;
                break;
            }
        }

    }
}

//左边英雄列表
var equipLoadHero = function () {
    for (var i = 0; i < equipJson.data.length; i++) {
        var div = document.createElement("div");
        div.className = "swiper-slide equip-hero-slide";
        var tempHeroDetail = getHeroDetailByGsid(equipJson.data[i].gsid).split(",");
        $(div).html("<div class='equip_hero_select'></div><div class='equip_heroDetail' style='color:" + getColor(tempHeroDetail[8]) + "'>" + tempHeroDetail[3] + "</div>");
        $("#equip_Hero .equip_hero_Swiper .swiper-wrapper").append(div);
    }
}

//显示英雄的四个装备
var showHeroEquip = function (index) {

    var tempIndex = 1;
    $("#equip_Main .equip_Detail").hide();
    //武器
    if (equipJson.data[index].atk) {
        var nowEquip;
        var j = 0;
        for (; j < bagJson.data.length; j++) {
            if (bagJson.data[j].p.split(",")[0] == equipJson.data[index].atk) {
                nowEquip = bagJson.data[j].p.split(",");
                break;
            }
        }
        var nowEquipDetail;
        var i = 0;
        for (; i < GoodsJson.data.length; i++) {
            if (GoodsJson.data[i].ItemID == nowEquip[2]) {
                nowEquipDetail = GoodsJson.data[i];
                break;
            }
        }
        var nowEquipDiv = $("#equip_Main .equip_Detail").eq(0).show();
        nowEquipDiv.attr("sid", j);
        nowEquipDiv.attr("index", i);
        nowEquipDiv.attr("nowclick", tempIndex);
        nowEquipDiv.attr("itemsid", bagJson.data[j].p.split(",")[0]);
        tempIndex++;
        nowEquipDiv.find(".equip_bg").css("background-image", "url(res/head/" + nowEquip[7] + ".png)");
        nowEquipDiv.find(".equip_img").css("background-image", "url(res/goods/" + nowEquip[2] + ".png)");

        nowEquipDiv.find(".equip_hero_detail_name").text(nowEquipDetail.Name).css("color", getColor(String(nowEquipDetail.Q)))
        if (nowEquip[4] == "0")
            nowEquipDiv.find(".equip_hero_detail_refine").html("强化: <font style='color:#F2E234'>未强化</font>");
        else
            nowEquipDiv.find(".equip_hero_detail_refine").html("强化: <font style='color:#F2E234'>" + nowEquip[4] + "</font>");
        nowEquipDiv.find(".equip_hero_detail_value").html("攻击: <font style='color:#F2E234;'>" + (nowEquipDetail.ATK + Number(nowEquip[6])) + "</font>");

    }
    //头盔
    if (equipJson.data[index].hp) {
        var nowEquip;
        var j = 0;
        for (; j < bagJson.data.length; j++) {
            if (bagJson.data[j].p.split(",")[0] == equipJson.data[index].hp) {
                nowEquip = bagJson.data[j].p.split(",");
                break;
            }
        }
        var nowEquipDetail;
        var i = 0;
        for (; i < GoodsJson.data.length; i++) {
            if (GoodsJson.data[i].ItemID == nowEquip[2]) {
                nowEquipDetail = GoodsJson.data[i];
                break;
            }
        }
        var nowEquipDiv = $("#equip_Main .equip_Detail").eq(1).show();
        nowEquipDiv.attr("sid", j);
        nowEquipDiv.attr("index", i);
        nowEquipDiv.attr("itemsid", bagJson.data[j].p.split(",")[0]);
        nowEquipDiv.attr("nowclick", tempIndex);
        tempIndex++;
        nowEquipDiv.find(".equip_bg").css("background-image", "url(res/head/" + nowEquip[7] + ".png)");
        nowEquipDiv.find(".equip_img").css("background-image", "url(res/goods/" + nowEquip[2] + ".png)");
        nowEquipDiv.find(".equip_hero_detail_name").text(nowEquipDetail.Name).css("color", getColor(String(nowEquipDetail.Q)))
        if (nowEquip[4] == "0")
            nowEquipDiv.find(".equip_hero_detail_refine").html("强化: <font style='color:#F2E234'>未强化</font>");
        else
            nowEquipDiv.find(".equip_hero_detail_refine").html("强化: <font style='color:#F2E234'>" + nowEquip[4] + "</font>");
        nowEquipDiv.find(".equip_hero_detail_value").html("生命: <font style='color:#F2E234;'>" + (nowEquipDetail.HP + Number(nowEquip[6])) + "</font>");
    }
    //衣服
    if (equipJson.data[index].def) {
        var nowEquip;
        var j = 0;
        for (; j < bagJson.data.length; j++) {
            if (bagJson.data[j].p.split(",")[0] == equipJson.data[index].def) {
                nowEquip = bagJson.data[j].p.split(",");
                break;
            }
        }
        var nowEquipDetail;
        var i = 0
        for (; i < GoodsJson.data.length; i++) {
            if (GoodsJson.data[i].ItemID == nowEquip[2]) {
                nowEquipDetail = GoodsJson.data[i];
                break;
            }
        }
        var nowEquipDiv = $("#equip_Main .equip_Detail").eq(2).show();
        nowEquipDiv.attr("sid", j);
        nowEquipDiv.attr("index", i);
        nowEquipDiv.attr("nowclick", tempIndex);
        nowEquipDiv.attr("itemsid", bagJson.data[j].p.split(",")[0]);
        tempIndex++;
        nowEquipDiv.find(".equip_bg").css("background-image", "url(res/head/" + nowEquip[7] + ".png)");
        nowEquipDiv.find(".equip_img").css("background-image", "url(res/goods/" + nowEquip[2] + ".png)");
        nowEquipDiv.find(".equip_hero_detail_name").text(nowEquipDetail.Name).css("color", getColor(String(nowEquipDetail.Q)))
        if (nowEquip[4] == "0")
            nowEquipDiv.find(".equip_hero_detail_refine").html("强化: <font style='color:#F2E234'>未强化</font>");
        else
            nowEquipDiv.find(".equip_hero_detail_refine").html("强化: <font style='color:#F2E234'>" + nowEquip[4] + "</font>");
        nowEquipDiv.find(".equip_hero_detail_value").html("防御: <font style='color:#F2E234;'>" + (nowEquipDetail.DEF + Number(nowEquip[6])) + "</font>");
    }
    //首饿||项链
    if (equipJson.data[index].jew) {
        var nowEquip;
        var j = 0;
        for (; j < bagJson.data.length; j++) {
            if (bagJson.data[j].p.split(",")[0] == equipJson.data[index].jew) {
                nowEquip = bagJson.data[j].p.split(",");
                break;
            }
        }
        var nowEquipDetail;
        var i = 0
        for (; i < GoodsJson.data.length; i++) {
            if (GoodsJson.data[i].ItemID == nowEquip[2]) {
                nowEquipDetail = GoodsJson.data[i];
                break;
            }
        }
        var nowEquipDiv = $("#equip_Main .equip_Detail").eq(3).show();
        nowEquipDiv.attr("sid", j);
        nowEquipDiv.attr("index", i);
        nowEquipDiv.attr("nowclick", tempIndex);
        nowEquipDiv.attr("itemsid", bagJson.data[j].p.split(",")[0]);
        tempIndex++;
        nowEquipDiv.find(".equip_bg").css("background-image", "url(res/head/" + nowEquip[7] + ".png)");

        nowEquipDiv.find(".equip_img").css("background-image", "url(res/goods/" + nowEquip[2] + ".png)");
        nowEquipDiv.find(".equip_hero_detail_name").text(nowEquipDetail.Name).css("color", getColor(String(nowEquipDetail.Q)))
        if (nowEquip[4] == "0")
            nowEquipDiv.find(".equip_hero_detail_refine").html("强化: <font style='color:#F2E234'>未强化</font>");
        else
            nowEquipDiv.find(".equip_hero_detail_refine").html("强化: <font style='color:#F2E234'>" + nowEquip[4] + "</font>");

        var tempContent = nowEquip[3] == "4" ? "闪避" : "暴击";
        var tempValue = nowEquip[3] == "4" ? nowEquipDetail.miss : nowEquipDetail.baoji;
        nowEquipDiv.find(".equip_hero_detail_value").html("" + tempContent + ": <font style='color:#F2E234;'>" + (tempValue + Number(nowEquip[6])) + "</font>");
    }


    //默认加载第一个出来显示
    for (var i = 0; i < 4; i++) {
        var div = $(".equip_Detail").eq(i);
        if (div.css("display") != "none") {

            for (var j = 0; j < bagJson.data.length; j++) {
                if (bagJson.data[j].p.split(",")[0] == div.attr("itemsid")) {
                    equipData.bagIndex = j;
                    div.attr("sid", j);
                    break;
                }
            }

            equipData.localIndex = div.attr("index");
            equipData.nowclick = 0;
            $(".equip_DetailSelect").removeClass("equip_DetailSelect");
            div.addClass("equip_DetailSelect");
            break;
        }
    }

    if (holeData.hole) {
        loadEquipHole();
    } else {
        loadHeroEquipDetail();
    }
}

//显示装备进阶英雄的四个装备
var showLvUpHeroEquip = function (index) {

    var tempIndex = 1;
    $("#equip_Main .equip_Detail").hide();
    //武器
    if (equipJson.data[index].atk) {
        var nowEquip;
        var j = 0;
        for (; j < bagJson.data.length; j++) {
            if (bagJson.data[j].p.split(",")[0] == equipJson.data[index].atk) {
                nowEquip = bagJson.data[j].p.split(",");
                break;
            }
        }
        var nowEquipDetail;
        var i = 0;
        for (; i < GoodsJson.data.length; i++) {
            if (GoodsJson.data[i].ItemID == nowEquip[2]) {
                nowEquipDetail = GoodsJson.data[i];
                break;
            }
        }
        var nowEquipDiv = $("#equip_Main .equip_Detail").eq(0).show();
        nowEquipDiv.attr("sid", j);
        nowEquipDiv.attr("index", i);
        nowEquipDiv.attr("nowclick", tempIndex);
        tempIndex++;
        nowEquipDiv.find(".equip_bg").css("background-image", "url(res/head/" + nowEquip[7] + ".png)");
        nowEquipDiv.find(".equip_img").css("background-image", "url(res/goods/" + nowEquip[2] + ".png)");

        nowEquipDiv.find(".equip_hero_detail_name").text(nowEquipDetail.Name).css("color", getColor(String(nowEquipDetail.Q)))
        if (nowEquip[4] == "0")
            nowEquipDiv.find(".equip_hero_detail_refine").html("强化: <font style='color:#F2E234'>未强化</font>");
        else
            nowEquipDiv.find(".equip_hero_detail_refine").html("强化: <font style='color:#F2E234'>" + nowEquip[4] + "</font>");
        nowEquipDiv.find(".equip_hero_detail_value").html("攻击: <font style='color:#F2E234;'>" + (nowEquipDetail.ATK + Number(nowEquip[6])) + "</font>");

    }
    //头盔
    if (equipJson.data[index].hp) {
        var nowEquip;
        var j = 0;
        for (; j < bagJson.data.length; j++) {
            if (bagJson.data[j].p.split(",")[0] == equipJson.data[index].hp) {
                nowEquip = bagJson.data[j].p.split(",");
                break;
            }
        }
        var nowEquipDetail;
        var i = 0;
        for (; i < GoodsJson.data.length; i++) {
            if (GoodsJson.data[i].ItemID == nowEquip[2]) {
                nowEquipDetail = GoodsJson.data[i];
                break;
            }
        }
        var nowEquipDiv = $("#equip_Main .equip_Detail").eq(1).show();
        nowEquipDiv.attr("sid", j);
        nowEquipDiv.attr("index", i);
        nowEquipDiv.attr("nowclick", tempIndex);
        tempIndex++;
        nowEquipDiv.find(".equip_bg").css("background-image", "url(res/head/" + nowEquip[7] + ".png)");
        nowEquipDiv.find(".equip_img").css("background-image", "url(res/goods/" + nowEquip[2] + ".png)");
        nowEquipDiv.find(".equip_hero_detail_name").text(nowEquipDetail.Name).css("color", getColor(String(nowEquipDetail.Q)))
        if (nowEquip[4] == "0")
            nowEquipDiv.find(".equip_hero_detail_refine").html("强化: <font style='color:#F2E234'>未强化</font>");
        else
            nowEquipDiv.find(".equip_hero_detail_refine").html("强化: <font style='color:#F2E234'>" + nowEquip[4] + "</font>");
        nowEquipDiv.find(".equip_hero_detail_value").html("生命: <font style='color:#F2E234;'>" + (nowEquipDetail.HP + Number(nowEquip[6])) + "</font>");
    }
    //衣服
    if (equipJson.data[index].def) {
        var nowEquip;
        var j = 0;
        for (; j < bagJson.data.length; j++) {
            if (bagJson.data[j].p.split(",")[0] == equipJson.data[index].def) {
                nowEquip = bagJson.data[j].p.split(",");
                break;
            }
        }
        var nowEquipDetail;
        var i = 0
        for (; i < GoodsJson.data.length; i++) {
            if (GoodsJson.data[i].ItemID == nowEquip[2]) {
                nowEquipDetail = GoodsJson.data[i];
                break;
            }
        }
        var nowEquipDiv = $("#equip_Main .equip_Detail").eq(2).show();
        nowEquipDiv.attr("sid", j);
        nowEquipDiv.attr("index", i);
        nowEquipDiv.attr("nowclick", tempIndex);
        tempIndex++;
        nowEquipDiv.find(".equip_bg").css("background-image", "url(res/head/" + nowEquip[7] + ".png)");
        nowEquipDiv.find(".equip_img").css("background-image", "url(res/goods/" + nowEquip[2] + ".png)");
        nowEquipDiv.find(".equip_hero_detail_name").text(nowEquipDetail.Name).css("color", getColor(String(nowEquipDetail.Q)))
        if (nowEquip[4] == "0")
            nowEquipDiv.find(".equip_hero_detail_refine").html("强化: <font style='color:#F2E234'>未强化</font>");
        else
            nowEquipDiv.find(".equip_hero_detail_refine").html("强化: <font style='color:#F2E234'>" + nowEquip[4] + "</font>");
        nowEquipDiv.find(".equip_hero_detail_value").html("防御: <font style='color:#F2E234;'>" + (nowEquipDetail.DEF + Number(nowEquip[6])) + "</font>");
    }
    //首饿||项链
    if (equipJson.data[index].jew) {
        var nowEquip;
        var j = 0;
        for (; j < bagJson.data.length; j++) {
            if (bagJson.data[j].p.split(",")[0] == equipJson.data[index].jew) {
                nowEquip = bagJson.data[j].p.split(",");
                break;
            }
        }
        var nowEquipDetail;
        var i = 0
        for (; i < GoodsJson.data.length; i++) {
            if (GoodsJson.data[i].ItemID == nowEquip[2]) {
                nowEquipDetail = GoodsJson.data[i];
                break;
            }
        }
        var nowEquipDiv = $("#equip_Main .equip_Detail").eq(3).show();
        nowEquipDiv.attr("sid", j);
        nowEquipDiv.attr("index", i);
        nowEquipDiv.attr("nowclick", tempIndex);
        tempIndex++;
        nowEquipDiv.find(".equip_bg").css("background-image", "url(res/head/" + nowEquip[7] + ".png)");

        nowEquipDiv.find(".equip_img").css("background-image", "url(res/goods/" + nowEquip[2] + ".png)");
        nowEquipDiv.find(".equip_hero_detail_name").text(nowEquipDetail.Name).css("color", getColor(String(nowEquipDetail.Q)))
        if (nowEquip[4] == "0")
            nowEquipDiv.find(".equip_hero_detail_refine").html("强化: <font style='color:#F2E234'>未强化</font>");
        else
            nowEquipDiv.find(".equip_hero_detail_refine").html("强化: <font style='color:#F2E234'>" + nowEquip[4] + "</font>");

        var tempContent = nowEquip[3] == "4" ? "闪避" : "暴击";
        var tempValue = nowEquip[3] == "4" ? nowEquipDetail.miss : nowEquipDetail.baoji;
        nowEquipDiv.find(".equip_hero_detail_value").html("" + tempContent + ": <font style='color:#F2E234;'>" + (tempValue + Number(nowEquip[6])) + "</font>");
    }


    //默认加载第一个出来显示
    for (var i = 0; i < 4; i++) {
        var div = $(".equip_Detail").eq(i);
        if (div.css("display") != "none") {
            equipData.bagIndex = div.attr("sid");
            equipData.localIndex = div.attr("index");
            equipData.nowclick = 0;
            $(".equip_DetailSelect").removeClass("equip_DetailSelect");
            div.addClass("equip_DetailSelect");
            break;
        }
    }

    loadHeroEquipUpDetail();
}

var showHoleSelect = function () {
    $("#temp").html("<div id='bag'style='z-index:5;position:absolute;left:" + (width - 800) / 2 + "px;top:" + (height - 480) / 2 + "px'><div id='title'><div id='titleLeft'></div><div id='titleCenter'><div id='titleContext'style='background-image:url(res/public/title/23.png)'></div></div><div id='titleRight'></div></div><div id='waikuan'><div id='shangjiao'class='jiao shangjiao'></div><div id='xiajiao'class='jiao xiajiao'></div><div id='zuojiao'class='jiao zuojiao'></div><div id='youjiao'class='jiao youjiao'></div><div class='shangwaibian'></div><div class='xiawaibian'></div><div class='zuowaibian'></div><div class='youwaibian'></div></div><div id='tempClose'></div><div id='rope'></div><div id='heroPageData'style='bottom:32px;left:104px;'></div><div id='pagePrevBtn'></div><div id='pageNextBtn'></div><div id='bagDialog'><div class='swiper-container bagSwiper'><div class='swiper-wrapper'><div class='swiper-slide bag-slide'><div id='bagPage0'class='bagPage'></div></div></div></div></div><div id='select_icon'class='hero_icon hero_icon_select'></div></div>")

    if (pad) $("#bag").css({ "zoom": sp, "left": (width - 800 * sp) / 2 / sp, "top": (height - 480 * sp) / 2 / sp });

    var tempNowEquipSid = $("#equip_hole_Big").attr("sid");

    tempMemoryJson.data.length = 0;
    tempUseIndex.length = 0;
    for (var x = 0; x < bagJson.data.length; x++) {

        var detail = bagJson.data[x].p.split(",");

        //此物品的详细信息

        var localDetail;
        var j = 0
        for (; j < GoodsJson.data.length; j++) {
            if (GoodsJson.data[j].ItemID == detail[2]) {
                localDetail = GoodsJson.data[j];
                break;
            }
        }

        if (localDetail.Type < 6 || localDetail.Type > 12) {
            continue;
        }

        if (detail[8] != tempNowEquipSid && detail[8] != 0) {
            continue;
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
        showTextMess("没有任何宝石可以镶嵌!", 2);
        $("#pagePrevBtn").unbind("touchstart").unbind("touchmove").unbind("touchend");
        $("#pageNextBtn").unbind("touchstart").unbind("touchmove").unbind("touchend");
        $("#heroPageData").html("页数:<font id='pageNow' style='color:#26E50E;'>0</font><font style='color:#26E50E;'>/0</font></font>");
        return;
    }


    usePage = 0;

    useLength = tempMemoryJson.data.length;

    usePageAll = Math.ceil(useLength / 8) - 1;

    $("#heroPageData").html("页数:<font id='pageNow' style='color:#26E50E;'>1</font><font style='color:#26E50E;'>/" + Math.ceil(useLength / 8) + "</font></font>");

    showHolePage();

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
        showHolePage();
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
        showHolePage();
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })

}

var showHolePage = function () {

    $("#bagPage0").html("");
    $("#pageNow").text(usePage + 1);

    var tempLastIndex = useLength > (usePage + 1) * 8 ? (usePage + 1) * 8 : useLength;

    var arr = new Array();

    for (var i = usePage * 8; i < tempLastIndex; i++) {


        var div = document.createElement("div");
        div.className = "bagItem";
        div.innerHTML = "<div class='bagHeadBg'><div class='bagHeadColor'></div><div class='bagHead'></div></div><div class='goodDetail'><div class='goodDetail_name'></div><div class='goodDetail_value'></div></div><div class='goodDetail_use'></div>";


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

        if (detail[8] != 0) {
            $(div).find(".goodDetail_use").css("display", "block");
        }

        div.setAttribute("sid", detail[0]);
        div.setAttribute("localIndex", j);
        div.setAttribute("bagIndex", tempUseIndex[i]);

        $(div).find(".bagHeadColor").css("background-image", "url(res/head/" + localDetail.Q + ".png)");
        $(div).find(".bagHead").css("background-image", "url(res/goods/" + localDetail.ImgID + ".png)");
        $(div).find(".bagHeadBg").append("<div class='bagNum'>x" + detail[5] + "</div>");

        $(div).find(".goodDetail_name").text(localDetail.Name).css("color", getColor(String(localDetail.Q)));;
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
            case 4:
            case 11:
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

    $(".goodDetail_use").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        if (holeData.hole) {
            //卸下操作
            if ($(this).css("display") == "block") {
                window.GameMainClass.sendRequestJson(126, "{\"gemsid\":" + $(this).parent().attr("sid") + ",\"equipsid\":" + $("#equip_hole_Big").attr("sid") + "}", "gemDownBack");
                return;
            }
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
        if (holeData.hole) {
            //卸下操作
            if ($(this).parent().find(".goodDetail_use").css("display") == "block") {
                window.GameMainClass.sendRequestJson(126, "{\"gemsid\":" + $(this).parent().attr("sid") + ",\"equipsid\":" + $("#equip_hole_Big").attr("sid") + "}", "gemDownBack");
                return;
            }

            //var tempType = GoodsJson.data[$(this).parent().attr("localIndex")].Type;
            ////判断是否有此类型存在
            //for (var i = 0; i < 4; i++) {
            //    var tempDiv2 = $("#equip_hole" + i);
            //    if (tempDiv2.attr("can")) {
            //        if (tempDiv2.attr("type") == tempType) {
            //            showTextMess("已经有此类型宝石", 2);
            //            return;
            //        }
            //    }
            //}


            holeData.sid = $(this).parent().attr("sid");
            holeData.sIndex = $(this).parent().attr("localIndex");
            $("#dialogTemp").remove();

            //计算是否为替换
            var lastgemsid = 0;
            if ($("#equip_hole" + holeData.nowclick).attr("sid")) {
                lastgemsid = $("#equip_hole" + holeData.nowclick).attr("sid");
            }

            window.GameMainClass.sendRequestJson(125, "{\"gemsid\":" + holeData.sid + ",\"lastgemsid\":" + lastgemsid + ",\"equipsid\":" + $("#equip_hole_Big").attr("sid") + "}", "gemSetBack");
            $("#temp").html("");
        }
    }).bind("touchmove", function () {
        move();
    }).bind("touchstart", function () {
        begin();
    })
}
