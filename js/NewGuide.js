/// <reference path="jquery-1.5.1.min.js" />

var eyeTime;
var tempArrow=0;
var NewGuideJson = [
   { "left": 85, "top": 261, "Function": "NewGuideClass.LoadNewGuide();", "LeftType": 3, "detial": "主公您终于醒了，都像猪一样的睡了五天了。", "arrowtype": 0 },
   { "left": 85, "top": 261, "Function": "NewGuideClass.LoadNewGuide();", "LeftType": 3, "detial": "别东张西望了，这里是我们的主城。", "arrowtype": 0 },
   { "left": 85, "top": 261, "Function": "NewGuideClass.LoadNewGuide();", "LeftType": 3, "detial": "让臣妾带您四处走走，了解了解情况。", "arrowtype": 0 },
   { "left": 579, "top": 416, "building": "b_battle", "Function": "loadBattle();window.GameMainClass.nowNewGayState(128);", "LeftType": 3, "detial": "进入战天下，先去扫荡几个黄巾小兵。", "arrowtype": 4 },
   { "left": 65, "top": 100, "building": "mi1", "Function": "showMap(0,0);NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "看前面就是黄巾营寨，点击营寨。", "arrowtype": 4 },
   { "left": 335, "top": 237, "building": "map", "Function": "nowwarid=900; fighttype = 0;loadTake();window.GameMainClass.nowNewGayState(169);", "LeftType": 1, "detial": "黄巾前哨，我们先消灭他们，点击战斗！", "arrowtype": 4 },
   { "left": 330, "top": 225, "building": "map", "Function": "NewGuideClass.Fighting();window.GameMainClass.nowNewGayState(150);NewGuideClass.isWaiting = true;", "LeftType": 1, "detial": "哇，好多战友我们选个强力的吧。", "arrowtype": 1 },
   { "left": 250, "top": 205, "building": "map", "Function": "NewGuideClass.AddFriend();window.GameMainClass.nowNewGayState(162);NewGuideClass.isWaiting=true;", "LeftType": 0, "detial": "哦也，真的好强力，我们加他为好友吧。", "arrowtype": 1 },
 /*8*/  { "left": 250, "top": 205, "building": "iconB", "Function": "loadLvUpFirst();NewGuideClass.LoadNewGuide();", "LeftType": 0, "detial": "累死了，主公我们提升一下将士的能力吧，点击校场。", "arrowtype": 4 },
   { "left": 120, "top": 90, "building": "LvUp", "Function": "showLvUpChooseDialog();NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "先选择一位主公最看好的武将。", "arrowtype": 4 },
   /*10 升级选择*/ { "left": 120, "top": 90, "building": "advChoose", "Function": "$(\"#heroSwiper\").find(\".heroChangeDetail\").eq(0).trigger(\"touchend\");NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "嗯，最强力的家伙就在那边哦！", "arrowtype": 1 },
   { "left": 400, "top": 205, "building": "LvUp", "Function": "LvUpEat = true; showLvUpChooseDialog();NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "选择陪练的武将吧。", "arrowtype": 1 },
   { "left": 330, "top": 225, "building": "advChoose", "Function": "$(\"#heroChangePage0\").find(\".heroChange\").eq(0).children(\".heroChangeDetail\").trigger(\"touchend\");NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "哇，就让那个美女来陪练！", "arrowtype": 1 },
   { "left": 330, "top": 225, "building": "LvUp", "Function": "$(\"#LvUpEatOk\").trigger(\"touchend\");window.GameMainClass.nowNewGayState(112);", "LeftType": 1, "detial": "好选中她了，点击确定", "arrowtype": 4 },
   { "left": 185, "top": 261, "building": "LvUp", "Function": "$(\"#LvUpBtn\").trigger(\"touchend\");window.GameMainClass.nowNewGayState(111);NewGuideClass.tempindex++;NewGuideClass.isWaiting = true;", "LeftType": 3, "detial": "搬好凳子看他们练武吧，嘻嘻。", "arrowtype": 4 },
 /*15打开校场*/  { "left": 250, "top": 205, "building": "iconB", "Function": "loadLvUpFirst();NewGuideClass.LoadNewGuide();", "LeftType": 0, "detial": "只是练武不管用的，还需要改变体质哦！", "arrowtype": 4 },
   { "left": 230, "top": 80, "building": "LvUp", "Function": "$(\"#hero_icon_adv\").trigger(\"touchend\");NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "我们来给这最强力的家伙转个生吧。", "arrowtype": 1 },
   { "left": 410, "top": 120, "building": "LvUp", "Function": "showAdvChooseDialog();NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "对了，主公最看好的武将", "arrowtype": 1 },
   { "left": 360, "top": 120, "building": "LvUp", "Function": "NewGuideClass.ChoseAdvHero();window.GameMainClass.nowNewGayState(118);", "LeftType": 1, "detial": "就是那边那家伙，走转个生去。", "arrowtype": 1 },
  { "left": 210, "top": 250, "building": "LvUp", "Function": "NewGuideClass.AdvSubmit();window.GameMainClass.nowNewGayState(119);NewGuideClass.isWaiting = true;", "LeftType": 1, "detial": "带好墨镜，小心转生的光辉亮瞎眼睛哦。", "arrowtype": 4 },
  /*20 进阶结束*/  { "left": 330, "top": 225, "building": "LvUp", "Function": "NewGuideClass.CloseUpDia();NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "这下那家伙更加强力了，我们走吧！", "arrowtype": 2 },
   { "left": 330, "top": 225, "building": "iconR", "Function": "shopBase();NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "去右边的房子看看，点击商城", "arrowtype": 4 },
   { "left": 330, "top": 225, "building": "shop", "Function": "shopGoldDetail();NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "好喜欢三顾茅庐的感脚，点击萌币寻将。", "arrowtype": 1 },
   { "left": 235, "top": 261, "building": "shop", "Function": "NewGuideClass.FindHeroByGold();;window.GameMainClass.nowNewGayState(143);NewGuideClass.isWaiting = true;", "LeftType": 3, "detial": "主公目前资金不足，我们先寻一位贤士吧。", "arrowtype": 1 },
   { "left": 350, "top": 195, "building": "shop", "Function": "NewGuideClass.ExitShop();NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "哇！寻到一位体质不错的武将，恭喜主公！点击关闭。", "arrowtype": 1 },
   /*25选择队员*/{ "left": 395, "top": 180, "building": "team", "Function": "showTeamChange();NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "让新加入的武将出战吧，点击出战队员。", "arrowtype": 1 },
   { "left": 330, "top": 225, "building": "hero", "Function": "NewGuideClass.ChoseBzHero();NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "对，就是这个家伙，点击选择。", "arrowtype": 1 },
   { "left": 235, "top": 261, "building": "hero", "Function": "$(\"#HeroChangeBtn\").trigger(\"touchend\");window.GameMainClass.nowNewGayState(108);NewGuideClass.isWaiting = true;", "LeftType": 3, "detial": "亲，你已成为勇士，别紧张，都有第一次！", "arrowtype": 4 },
   { "left": 395, "top": 81, "building": "iconB", "Function": "loadLineup();window.GameMainClass.nowNewGayState(146);", "LeftType": 1, "detial": "现在需要排兵布阵，点击布阵", "arrowtype": 4 },
   { "left": 160, "top": 100, "building": "iconB", "Function": "NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "点击要更换阵位的武将头像不放，拖动到可以移动的阵位上就更换成功了。", "arrowtype": 0 },
   /*30*/{ "left": 85, "top": 261, "building": "iconB", "Function": "NewGuideClass.isEnd=true;NewGuideClass.LoadNewGuide();", "LeftType": 3, "detial": "臣妾累了先回宫去了，主公自己先摸索着怎么一统天下吧。", "arrowtype": 0 },
/**********************************************8级以后的***************************************************************************/
   /* 31*/{ "left": 395, "top": 81, "building": "iconR", "Function": "shopBase();NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "哇！一会儿功夫，发展得不错了呢！去商城看看。", "arrowtype": 2 },
   { "left": 395, "top": 81, "building": "shop", "Function": "shopJson=null;loadCoinShop();window.GameMainClass.nowNewGayState(141);NewGuideClass.isWaiting = true;", "LeftType": 1, "detial": "那边银币商城不错，点击银币商城。", "arrowtype": 3 },
   { "left": 395, "top": 81, "building": "shop", "Function": "$(\"#shopDialog\").find(\".goodDetail\").eq(4).trigger(\"touchend\");NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "不错的头盔，为将士们买点吧。", "arrowtype": 3 },
   { "left": 395, "top": 81, "building": "shop", "Function": "NewGuideClass.BuySubmit();window.GameMainClass.nowNewGayState(142);NewGuideClass.isWaiting = true;", "LeftType": 1, "detial": "嘻嘻，主公在这边付钱呢。", "arrowtype": 3 },
   { "left": 350, "top": 195, "building": "shop", "Function": "NewGuideClass.ExitShop();NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "离开商城，回去把买来的装备送给将士。", "arrowtype": 2 },
   /*36 */{ "left": 395, "top": 81, "building": "iconB", "Function": "showHeroEquipDialog();NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "看将士们都在那边，点击装备。", "arrowtype": 4 },
   { "left": 395, "top": 81, "building": "heroEquip", "Function": "showEquipHeroSelectDialog();NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "看看我们从谁开始，选择武将", "arrowtype": 3 },
   { "left": 395, "top": 81, "building": "heroEquip", "Function": "NewGuideClass.ChoseEqHero();NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "好，就先那家伙吧！", "arrowtype": 3 },
   { "left": 395, "top": 81, "building": "heroEquip", "Function": " HeroEquipData.nowclick = 1;showEquipGoodSelect();NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "先看看头盔好了。", "arrowtype": 3 },
   { "left": 395, "top": 81, "building": "heroEquip", "Function": "NewGuideClass.ChoseEq();window.GameMainClass.nowNewGayState(123);NewGuideClass.isWaiting = true;", "LeftType": 1, "detial": "看来这个使用起来将士们会更强力，更帅。", "arrowtype": 3 },
   /*41*/{ "left": 350, "top": 195, "building": "heroEquip", "Function": "NewGuideClass.ExitEq();NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "只有装备是不够的，去找老铁匠强化一下。", "arrowtype": 2 },
   /*42*/{ "left": 350, "top": 195, "building": "b_equip", "Function": "showRefineBase();NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "对了，铁匠铺就在前面了，快点！", "arrowtype": 4 },
   { "left": 350, "top": 195, "building": "refine", "Function": "$(\"#equip_refineOne\").trigger(\"touchend\");window.GameMainClass.nowNewGayState(121);NewGuideClass.tempindex++;NewGuideClass.isWaiting = true;", "LeftType": 1, "detial": "主公给钱吧，让老铁匠强化吧，点击强化。", "arrowtype": 4 },
   /*44重新打开装备*/ { "left": 350, "top": 195, "building": "iconB", "Function": "showRefineBase();NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "是的，这个就是铁匠铺就在前面了，进去吧。", "arrowtype": 4 },

   { "left": 350, "top": 195, "building": "refine", "Function": "$(\"#equip_adv\").trigger(\"touchend\");NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "让装备更给力更帅气，点击进阶。", "arrowtype": 1 },
   /*进阶成功 46*/{ "left": 350, "top": 195, "building": "refine", "Function": "$(\"#equip_advbtn\").trigger(\"touchend\");window.GameMainClass.nowNewGayState(124);NewGuideClass.tempindex++;NewGuideClass.isWaiting = true;", "LeftType": 1, "detial": "主公给钱吧，让老铁医开始进阶吧，确定进阶", "arrowtype": 4 },

   /*47重新打开装备*/ { "left": 350, "top": 195, "building": "iconB", "Function": "showRefineBase();NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "是的，这个就是铁匠铺就在前面了，进去吧。", "arrowtype": 4 },

   { "left": 350, "top": 195, "building": "refine", "Function": "$(\"#equip_make\").trigger(\"touchend\");NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "听说主公前几日出战获得不少宝石，我们合成看看。", "arrowtype": 1 },
   { "left": 350, "top": 195, "building": "refine", "Function": "$(\".equip_gem_item\").eq(0).trigger(\"touchend\");NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "哦，原来都是宝石碎片，就合成它们吧。", "arrowtype": 1 },
   { "left": 350, "top": 195, "building": "refine", "Function": "$(\"#equip_makebtn\").trigger(\"touchend\");NewGuideClass.tempindex++;window.GameMainClass.nowNewGayState(127);NewGuideClass.isWaiting = true;", "LeftType": 1, "detial": "真期待合成后的24克拉的大宝石，点击合成。", "arrowtype": 4 },


   /*51重新打开装备*/ { "left": 350, "top": 195, "building": "iconB", "Function": "showRefineBase();NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "是的，这个就是铁匠铺就在前面了，进去吧。", "arrowtype": 4 },

   { "left": 350, "top": 195, "building": "refine", "Function": "$(\"#equip_hole\").trigger(\"touchend\");NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "对了，宝石可以镶嵌在装备上让装备更强力哦。", "arrowtype": 1 },
   /* 53*/{ "left": 350, "top": 195, "building": "refine", "Function": "$(\"#equip_hole0\").trigger(\"touchend\");NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "嗯，就镶嵌在这个位置上吧。", "arrowtype": 1 },
   /* 54*/{ "left": 350, "top": 195, "building": "refine", "Function": "$(\".goodDetail\").eq(0).trigger(\"touchend\");window.GameMainClass.nowNewGayState(125);NewGuideClass.isWaiting = true;", "LeftType": 1, "detial": "哇，就选择这个大宝石吧，一定很好看！", "arrowtype": 1 },
   
   /*进阶成功 55*/{ "left": 350, "top": 195, "building": "refine", "Function": "$(\"#close\").trigger(\"touchend\");NewGuideClass.isEnd=true;NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "主公玩了一天，好累了，我们回宫吧！", "arrowtype": 2 },


   /*退出*/

   /*比武场 56*/{ "left": 350, "top": 195, "building": "b_arena", "Function": "$(\"#b_arena\").trigger(\"touchend\");NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "主公最近那边建了个比武场，我们也去看看吧。点击比武场。", "arrowtype": 2 },
   { "left": 350, "top": 195, "building": "arena", "Function": "$(\".a_enemy_item\").eq(0).children(\".shopBtn\").trigger(\"touchend\");NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "哇，原来这里面是打架的，主公我们也试试吧。点击挑战。", "arrowtype": 2 },
   { "left": 350, "top": 195, "building": "arena", "Function": "$(\"#close\").trigger(\"touchend\");NewGuideClass.isEnd=true;NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "累不累啊，我们战胜了吗？点击关闭。", "arrowtype": 2 },

   /*英雄志 59*/
   { "left": 350, "top": 195, "building": "iconT", "Function": "$(\"#Zhi\").trigger(\"touchend\");window.GameMainClass.nowNewGayState(164);NewGuideClass.isWaiting = true;", "LeftType": 1, "detial": "听说最近来了不少英雄，打败他们可以获得装备纸图。点击英雄志。", "arrowtype": 2 },
   { "left": 350, "top": 195, "building": "yb0", "Function": "$(\"#yb0\").trigger(\"touchend\");NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "哦，那是于吉小白脸吧，现在都成英雄了。点击于吉。", "arrowtype": 2 },
   { "left": 350, "top": 195, "building": "yxzHeroInfo", "Function": "$(\"#tzBtn\").trigger(\"touchend\");NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "哇，看来传闻不假，好多好东西吔。点击挑战。", "arrowtype": 4 },
   /*英雄志好友 62*/{ "left": 350, "top": 195, "building": "yxzHeroInfo", "Function": "$(\"#bagPage0\").find(\".heroChangeDetail\").eq(0).trigger(\"touchend\");   $(\"#bag\").trigger(\"touchend\");NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "选一个给力的战友是不容错过的。点击好友。", "arrowtype": 1 },
   { "left": 350, "top": 195, "building": "yxzHeroInfo", "Function": "$(\"#shopOkBtn\").trigger(\"touchend\");NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "来吧，加我为好友吧，天天送友情点哦。", "arrowtype": 4 },
   { "left": 350, "top": 195, "building": "iconT", "Function": "window.GameMainClass.CollectUserStep(7);$(\"#yxzClose\").trigger(\"touchend\");NewGuideClass.isEnd=true;NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "主公你慢慢玩吧，臣妾先回宫歇息去了。", "arrowtype": 2 },


   /*VIP界面 65*/
   { "left": 350, "top": 195, "building": "iconT", "Function": "window.GameMainClass.sendRequestJson(171, \"\", \"setVipJson\");;window.GameMainClass.nowNewGayState(171);NewGuideClass.isWaiting = true;", "LeftType": 1, "detial": "哇，主公您有VIP1了，看看有什么权限。点击主公信息。", "arrowtype": 1 },
   { "left": 350, "top": 195, "building": "arena", "Function": "$(\"#vipRewardBtn\").trigger(\"touchend\");window.GameMainClass.nowNewGayState(172);NewGuideClass.isWaiting = true;", "LeftType": 1, "detial": "哈哈，主公也是CEO，这里每天可以领取官职俸禄。点击领取。", "arrowtype": 3 },
   { "left": 350, "top": 195, "building": "arena", "Function": "$(\"#vipIcon\").trigger(\"touchend\");NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "右边还可以升官发财，看来声望不够，我们先看看VIP吧。点击VIP。", "arrowtype": 1 },
   { "left": 350, "top": 195, "building": "arena", "Function": "$(\"#close\").trigger(\"touchend\");NewGuideClass.isEnd=true;NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "这里就是提升特权的地方了，主公也去存钱吧。点击回到主城。", "arrowtype": 2 }
];

var NewGuideClass = {
       tempindex: 0,
       isWaiting: false,
       isEnd: false,
       NewGuideIndex: 0,
       isLoading : false,
       LoadNewGuide: function () {
           

           if (NewGuideClass.isLoading)
               return;
           NewGuideClass.isLoading = true;

           setTimeout(function () {
               $("#NewGuidBox").remove();
               $("#Arrow").remove();
               $("#newSelect").remove();
               if (NewGuideClass.isWaiting) {
                   NewGuideClass.isWaiting = false;
                   NewGuideClass.UpdateNewGuideIndex();
               }

               if (NewGuideClass.FightingBack) {
                   NewGuideClass.FightingBack = false;
                   NewGuideClass.FightingEnd();
               }

               if (NewGuideClass.isEnd) {
                   $("#newguidSomething").remove();
                   NewGuideClass.isLoading = false;
                   NewGuideClass.isEnd = false;
                   NewGuideClass.End();
                   window.GameMainClass.sendRequestJson(185, '{"step":' + NewGuideClass.tempindex + '}', "");
                   return;
               }
               var str = new Array();
               var left = NewGuideJson[NewGuideClass.tempindex].left;

               var padding = "", padding2 = "";
               var useLeft = 0, useTop = 0;
               var val = 0;
               tempArrow = NewGuideJson[NewGuideClass.tempindex].arrowtype;
               switch (NewGuideJson[NewGuideClass.tempindex].arrowtype) {
                   case 1: //左上方
                       val = 315;
                       padding = "top:-10px;right:45px;";
                       useLeft = 100;
                       useTop = 100;
                       padding2 = "top:-30px;right:165px;";
                       break;
                   case 2: //右上方
                       val = 45;
                       padding = "top:-10px;left:40px;";
                       padding2 = "top:-20px;left:75px;";
                       useLeft = 50;
                       useTop = 100;
                       break;
                   case 3: //左下方
                       val = 225;
                       padding = "top:30px;right:45px;";
                       padding2 = "top:50px;right:155px;";
                       useLeft = 120;
                       useTop = 38;
                       break;
                   case 4: //右下方
                       val = 135;
                       useLeft = 50;
                       useTop = 50;
                       padding = "top:30px;left:40px;";
                       padding2 = "top:50px;left:75px;";
                       break;
               }
               str.push("<div id='NewGuidBox'");
               if (NewGuideJson[NewGuideClass.tempindex].arrowtype == 0)
                   str.push(" ontouchmove='move()' ontouchstart='begin()' ontouchend='if (!cancel()) {NewGuideClass.UnbindSelect2();" + NewGuideJson[NewGuideClass.tempindex].Function + "}'");
               str.push("><font>" + NewGuideJson[NewGuideClass.tempindex].detial + "</font><div id='eye'></div></div>");

               //箭关坐标

               if (NewGuideClass.tempindex == 29) {
                   $("body").append("<div id='newguidSomething' style='left:" + (width - 232) / 2 + "px;top:" + ((height - 99) / 2 - 80) + "px;'></div>");
                   if (pad) {
                       $("#newguidSomething").css({ "zoom": sp, "left": (width - 232 * sp) / 2 / sp, "top": (height - 99 * sp) / 2 / sp-80 });
                   }
               }

               if (NewGuideJson[NewGuideClass.tempindex].arrowtype > 0) {
                   var tempDiv = $("#" + NewGuideJson[NewGuideClass.tempindex].building).get(0);
                   
                   var tempLeft = tempDiv.offsetLeft;
                   var tempTop = tempDiv.offsetTop;

                   //修正值
                   switch (NewGuideClass.tempindex) {
                       //征战
                       case 3:
                           tempLeft = (width - 74) / 2 - 30;
                           tempTop = (height - 87) / 2 - 40;
                           if (pad) {
                               tempLeft = (width - 74 * padScale) / 2 / padScale - 30;
                               tempTop = (height - 87 * padScale) / 2 / padScale - 40;
                           }
                           break;
                       case 4:
                           tempLeft += tempDiv.offsetWidth / 2 - 80;
                           tempTop = (height - 87) / 2 + 60;
                           if (pad) {
                               tempLeft += tempDiv.offsetWidth / 2 / padScale - 80;
                               tempTop = (height - 87 * padScale) / 2 / padScale + 60;
                           }
                           break;
                       case 5:
                           tempLeft += 650;
                           tempTop += 365;
                           break;
                           //选择助战好友
                       case 6:
                           tempLeft += 280;
                           tempTop += 100;
                           break;
                           //添加好友
                       case 7:
                           tempLeft += 323;
                           tempTop += 360;
                           break;
                       case 15:
                       case 8:
                           tempLeft = width - 356;
                           tempTop = height - 109;
                           if (pad) {
                               tempLeft = width / padScale - 356;
                               tempTop = height / padScale - 109;
                           }
                           break;
                       case 9:
                           if (pad) {
                               tempLeft += 227 * sp;
                               tempTop += 185 * sp;
                               tempLeft /= padScale;
                               tempTop /= padScale;
                           } else {
                               tempLeft += 227;
                               tempTop += 185;
                           }
                           break;
                       case 10:
                           tempLeft += 280;
                           tempTop += 100;
                           break;
                       case 11:
                           tempLeft += 121;
                           tempTop += 112;
                           break;
                       case 12:
                           tempLeft += 385;
                           tempTop += 88;
                           break;
                       case 13:
                           tempLeft += 630;
                           tempTop += 370;
                           break;
                       case 14:
                           tempLeft += 630;
                           tempTop += 370;
                           break;
                       case 16:
                           tempLeft += 40;
                           tempTop += 185;
                           break;
                       case 17:
                           tempLeft += 188;
                           tempTop += 241;
                           break;
                       case 18:
                           tempLeft += 268;
                           tempTop += 100;
                           break;
                       case 19:
                           tempLeft += 630;
                           tempTop += 365;
                           break;
                       case 20:
                           tempLeft += 685;
                           tempTop += 21;
                           break;
                       case 21:
                           tempLeft = width - 105;
                           tempTop = height - 238;
                           if (pad) {
                               tempLeft = width / padScale - 105;
                               tempTop = height / padScale - 238;
                           }
                           break;
                       case 22:
                           tempLeft += 684;
                           tempTop += 225;
                           break;
                       case 23:
                           tempLeft += 300;
                           tempTop += 355;
                           break;
                       case 24:
                           tempLeft += 626;
                           tempTop += 39;
                           break;
                       case 25:
                           tempLeft = (width - 74) / 2 + 80;
                           tempTop = (height - 87) / 2 + 140;

                           if (pad) {
                               tempLeft = (width - 74 * padScale) / 2 / padScale + 80;
                               tempTop = (height - 87 * padScale) / 2 / padScale + 140;
                           }
                           break;
                       case 26:
                           tempLeft += 590;
                           tempTop += 181;
                           break;
                       case 27:
                           tempLeft += 610;
                           tempTop += 365;
                           break;
                       case 28:
                           tempLeft = width - 287;
                           tempTop = height - 105;
                           if (pad) {
                               tempLeft = width / padScale - 287;
                               tempTop = height / padScale - 105;
                           }
                           break;
                       case 29:
                           tempLeft += 746;
                           tempTop += 32;
                           break;
                       case 31:
                           tempLeft = width - 108;
                           tempTop = height - 180;
                           if (pad) {
                               tempLeft = width / padScale - 108;
                               tempTop = height / padScale - 180;
                           }
                           break;
                       case 32:
                           tempLeft += 60;
                           tempTop += 200;
                           break;
                       case 33:
                           tempLeft += 262;
                           tempTop += 190;
                           break;
                       case 34:
                           tempLeft += 396;
                           tempTop += 290;
                           break;
                       case 35:
                           tempLeft += 685;
                           tempTop += 21;
                           break;
                       case 36:
                           tempLeft = width - 224;
                           tempTop = height - 104;
                           if (pad) {
                               tempLeft = width / padScale - 224;
                               tempTop = height / padScale - 104;
                           }
                           break;
                       case 37:
                           tempLeft += 400;
                           tempTop += 180;
                           break;
                       case 38:
                           tempLeft += 300;
                           tempTop += 45;
                           break;
                       case 39:
                           tempLeft += 555;
                           tempTop += 110;
                           break;
                       case 40:
                           tempLeft += 307;
                           tempTop += 30;
                           break;
                       case 41:
                           tempLeft += 685;
                           tempTop += 21;
                           break;
                       case 44:
                       case 47:
                       case 51:
                       case 42:
                           tempLeft = (width - 74) / 2 + 130;
                           tempTop = (height - 87) / 2 - 50;
                           if (pad) {
                               tempLeft = (width - 74 * padScale) / 2 / padScale + 130;
                               tempTop = (height - 87 * padScale) / 2 / padScale - 50;
                           }
                           break;
                       case 43:
                           tempLeft += 625;
                           tempTop += 365;
                           break;
                       case 45:
                           tempLeft += 43;
                           tempTop += 187;
                           break;
                       case 46:
                           tempLeft += 630;
                           tempTop += 365;
                           break;
                       case 48:
                           tempLeft += 42;
                           tempTop += 333;
                           break;
                       case 49:
                           tempLeft += 430;
                           tempTop += 102;
                           break;
                       case 50:
                           tempLeft += 630;
                           tempTop += 365;
                           break;
                       case 52:
                           tempLeft += 40;
                           tempTop += 259;
                           break;
                       case 53:
                           tempLeft += 132;
                           tempTop += 140;
                           break;
                       case 54:
                           tempLeft += 287;
                           tempTop += 100;
                           break;
                       case 55:
                           tempLeft += 685;
                           tempTop += 21;
                           break;
                           /*比武场*/
                       case 56:
                           tempLeft = (width - 74) / 2 - 200;
                           tempTop = (height - 87) / 2 - 5;
                           if (pad) {
                               tempLeft = (width - 74 * padScale) / 2 / padScale - 200;
                               tempTop = (height - 87 * padScale) / 2 / padScale - 5;
                           }
                           break;
                       case 57:
                           tempLeft += 640;
                           tempTop += 90;
                           break;
                       case 58:
                           tempLeft += 685;
                           tempTop += 21;
                           break;

                           /*英雄志*/
                       case 59:
                           tempLeft = width - 103;
                           tempTop = 18;
                           if (pad) {
                               tempLeft = width / padScale - 103;
                               tempTop = 18;
                           }
                           break;
                       case 60:
                           tempLeft = (width - 74) / 2 - 360;
                           tempTop = (height - 87) / 2 + 100;
                           if (pad) {
                               tempLeft = (width - 74 * padScale) / 2 / padScale - 360;
                               tempTop = (height - 87 * padScale) / 2 / padScale + 100;
                           }
                           break;
                       case 61:
                           tempLeft += 350;
                           tempTop += 280;
                           break;
                       case 62:
                           tempLeft += 160;
                           tempTop += 60;
                           break;
                       case 63:
                           tempLeft += 140;
                           tempTop += 260;
                           break;
                       case 64:
                           tempLeft = width - 103;
                           tempTop = 18;
                           if (pad) {
                               tempLeft = width / padScale - 103;
                               tempTop = 18;
                           }
                           break;

                           //VIP引导
                       case 65:
                           tempLeft = 100;
                           tempTop = 24;
                           break;
                       case 66:
                           tempLeft += 385;
                           tempTop += 290;
                           break;
                       case 67:
                           tempLeft += 40;
                           tempTop += 185;
                           break;
                       case 68:
                           tempLeft += 685;
                           tempTop += 21;
                           break;
                       default:
                           break;
                   }

                   if (pad) {
                       if (NewGuideClass.NeedPad(NewGuideClass.tempindex)) {
                           tempLeft -= tempDiv.offsetLeft-18;
                           tempTop -= tempDiv.offsetTop;
                           if (height == 1129) {
                               tempTop += 25;
                               tempLeft += 25;
                           }

                           tempLeft *= sp;
                           tempTop *= sp;

                           tempLeft += tempDiv.offsetLeft;
                           tempTop += tempDiv.offsetTop;

                           tempLeft /= padScale;
                           tempTop /= padScale;
                       }
                   }

                   str.push("<div id='Arrow' style='position:absolute;-webkit-transform:rotate(" + val + "deg);top:" + tempTop + "px;left:" + tempLeft + "px;'></div>");
                   str.push("<div ontouchmove='move()' ontouchstart='begin()' ontouchend='if (!cancel()){NewGuideClass.UnbindSelect();" + NewGuideJson[NewGuideClass.tempindex].Function + "}' id='newSelect' style='left:" + (tempLeft + 80 - useLeft) + "px;top:" + (tempTop + 80 - useTop) + "px;' ></div>");
               }

               
               var divnode = document.createElement("div");
               divnode.innerHTML = str.join("");
               document.getElementById("NewGuidDiv").appendChild(divnode);
               if (pad) {
                   $("#NewGuidBox,#newSelect,#Arrow").css({ "zoom": padScale });
               }
               if (NewGuideClass.tempindex < 4) {
                   $("#NewGuidBox").css("bottom", "200px");
               }
               if (NewGuideClass.tempindex == 4 || NewGuideClass.tempindex == 60 || NewGuideClass.tempindex == 23 || NewGuideClass.tempindex == 48 || NewGuideClass.tempindex == 32 || NewGuideClass.tempindex == 52) {
                   $("#NewGuidBox").css("top", 0);
               }
               if (NewGuideClass.tempindex == 46 || NewGuideClass.tempindex == 16 || NewGuideClass.tempindex == 17 || NewGuideClass.tempindex == 52 || NewGuideClass.tempindex == 45 || NewGuideClass.tempindex == 32 || NewGuideClass.tempindex == 33) {
                   $("#NewGuidBox").css({ "left": width - 500, "bottom": 200 });
                   if (pad) {
                       $("#NewGuidBox").css({ "left": width - 700*padScale, "bottom": 200 });
                   }
               }
               NewGuideClass.tempindex++;
               NewGuideClass.isLoading = false;
           },500)
       },

       NewBegin: function () {
           $("#NewGuidDiv").css({ "display": "block", "width": width, "height": height });

           $("#NewGuidBox").show();
           tempTime = 0;
           eyeTime = setInterval(function () {
               if (tempTime % 2 == 0) {
                   $("#eye").css("background-position-x", 0);
                   if (tempArrow == 2 || tempArrow == 3) {
                       $("#Arrow").animate({ "left": "-=10", "top": "+=10" }, "slow", "linear");
                   } else {
                       $("#Arrow").animate({ "left": "+=10", "top": "+=10" }, "slow", "linear");
                   }
               }
               else {
                   $("#eye").css("background-position-x", -59);
                   if (tempArrow == 2 || tempArrow == 3) {
                       $("#Arrow").animate({ "left": "+=10", "top": "-=10" }, "slow", "linear");
                   }
                   else {
                       $("#Arrow").animate({ "left": "-=10", "top": "-=10" }, "slow", "linear");
                   }
               }
               tempTime++;
           }, 600)
           NewGuideClass.LoadNewGuide();
       },

       End: function () {
           $("#NewGuidDiv").append("<div id='NewGuidBox'><font></font><div id='eye'></div></div>");
           $("#NewGuidDiv").css({ "display": "none" });
           clearInterval(eyeTime);
       },

       //开始战斗
       Fighting: function () {
           window.GameMainClass.sendRequestJson(150, '{ "warid": ' + nowwarid + ',"warlv":1,"friendid":' + takeFriendJson.data[0].uid + ' }', "canBattle");
           $("#tempMask").remove();
           $("#temp").html("");
           $("#bag").remove();
       },

       //选择升级的武将
       ChoseUpHero: function () {
           var temp = $("#heroSwiper").find(".heroChangeDetail").eq(0);
           LvUpChooseClick(temp);
       },

       //选择吞噬的材料
       ChoseEatHero: function () {
           var temp = $("#heroWrapper").find(".heroChangeDetail").eq(0);
           LvUpEatChooseClick(temp);
       },

       //确定需要吞噬的材料
       EatHeroSubmit: function () {
           var sendJson = new Array();
           var tempJson = new Array();
           sendJson.push(EatHero.join(","));
           tempJson.push(EatHero2.join(","));
           LvUpData.s = sendJson.join("");
           LvUpData.c = tempJson.join("");
           var sendJson = "{\"gsid\":" + heroJson.data[LvUpData.index].g.split(",")[10] + ",\"g\":\"" + LvUpData.s + "\"}";
           window.GameMainClass.sendRequestJson(112, sendJson, "loadUpLvHeroDetail");

           LvUpEat = false;
           $("#temp").html("");
       },

       //确定升级
       UpSubmit: function () {
           var sendJson = "{\"gsid\":" + heroJson.data[LvUpData.index].g.split(",")[10] + ",\"g\":\"" + LvUpData.s + "\"}";
           window.GameMainClass.sendRequestJson(111, sendJson, "UpLvEatBack");
       },

       //切换到转生界面
       CheckToAdv: function () {
           LvUpData = { "index": 0, "gsid": 0, "s": "", "c": "" };
           EatHero.length = 0;
           EatHero2.length = 0;
           LvUpEat = false;
           teamLockAll = false;
           showAdv();
       },

       //选择转生的武将
       ChoseAdvHero: function () {
           var temp = $("#heroSwiper").find(".heroChangeDetail").eq(0);
           advHeroChooseClick(temp);
       },

       //转生提交
       AdvSubmit: function () {
           var sendJson = new Array();
           sendJson.push("{\"gsid\":" + $("#advManNow").attr("gsid") + "");
           if ($("#advItem0").attr("gsid")) {
               sendJson.push(",\"eatgsid1\":" + $("#advItem0").attr("gsid") + "");
           }
           if ($("#advItem1").attr("gsid")) {
               sendJson.push(",\"eatgsid2\":" + $("#advItem1").attr("gsid") + "");
           }
           sendJson.push("}");
           window.GameMainClass.sendRequestJson(119, sendJson.join(""), "advHeroOk");
       },

       //关闭升级窗口
       CloseUpDia: function () {
           $("#dialog").html("");
           $("#mask").hide();
           LvUpData = { "index": 0, "gsid": 0, "s": "", "c": "" };
           LvUpEat = false;
           EatHero.length = 0;
           EatHero2.length = 0;
       },

       //开始萌币寻将
       FindHeroByGold: function () {
           window.GameMainClass.sendRequestJson(143, "{\"usualID\":600,\"num\":1}", "showLotteryResult");
       },

       //退出商城
       ExitShop: function () {
           $("#tempMask,#find").remove();
           $("#shopAnimate").remove();
           $("#temp").html("");
           $("#tempMask").remove();
           $("#dialog").html("");
           $("#mask").hide();
       },

       //选择要上阵的武将
       ChoseBzHero: function () {
           var temp = $("#heroSwiper").find(".heroChangeDetail").eq(heroJson.data.length - 1);
           heroChooseClick(temp);
       },

       //布阵确定
       BzSubmit: function () {
           window.GameMainClass.sendRequestJson(108, '{"team":"' + teamMemory.join(",") + '"}', "changeTeamBack");
       },

       //选择需要购买的装备
       ChoseEq: function () {
           var temp = $("#shopDialog").find(".goodDetail").eq(4);
           shopChooseNum($(temp).parent().attr("itemid"), $(temp).parent().attr("gold"), $(temp).parent().attr("nick"), "coin");
       },

       //确定购买
       BuySubmit: function () {
           var temp = $("#shopDialog").find(".goodDetail").eq(4);
           window.GameMainClass.sendRequestJson(142, "{\"itemid\":" + $(temp).parent().attr("itemid") + ",\"num\":1}", "shopBugResert");
       },

       //选择需要装备的武将
       ChoseEqHero: function () {
           var temp = $("#heroWrapper").find(".heroChangeDetail").eq(0);
           heroEquipChooseHero(temp);
       },

       //选择装备
       ChoseEq: function () {
           var temp = $("#bag").find(".goodDetail").eq(0);
           $(temp).trigger("touchend");
       },

       //关闭装备
       ExitEq: function () {
           $("#heroEquip").remove();
           $("#mask").hide();
           HeroEquipData = { "flag": false, "nowclick": "", "heroSid": "", "canChange": true };
       },

       //添加好友
       AddFriend: function () {
           window.GameMainClass.sendRequestJson(162, "{\"friendid\":" + takeFriendJson.data[0].uid + "}", "findFriendOk");
           $("#mess").remove();
           $("#tempMask2").remove();
           $("#map").remove();
           $("#tempMask").remove();
           $("#battleDialog").remove();
           isSubmit = false;
       },

       //更新新手指引进程
       UpdateNewGuideIndex: function () {
           window.GameMainClass.sendRequestJson(185, '{"step":' + NewGuideClass.tempindex + '}', "");
       },
       UnbindSelect: function () {
           $("#newSelect").attr("ontouchend", "");

       },
       UnbindSelect2: function () {
           $("#NewGuidBox").attr("ontouchend", "");

       },
       
       //是否需要适配
       NeedPad: function (a) {
           if (a==5) {
               return true;
           }
           if (a == 6) {
               return true;
           }
           if (a == 7) {
               return true;
           }
           if (a == 10) {
               return true;
           }
           if(a>=11&&a<=14){
               return true;
           }
           if (a >= 16 && a <= 20) {
               return true;
           }
           if(a>=22&&a<=24){
               return true;
           }
           if(a>=26&&a<=27){
               return true;
           }
           if(a>=32&&a<=35){
               return true;
           }
           if(a>=37&&a<=41){
               return true;
           }
           if(a==43){
               return true;
           }
           if(a==45){
               return true;
           }
           if(a==46){
               return true;
           }
           if(a==48){
               return true;
           }
           if(a==49){
               return true;
           }
           if(a==50){
               return true;
           }
           if(a>=52&&a<=55){
               return true;
           }
           if(a>=57&&a<=58){
               return true;
           }
           if(a>=61&&a<=63){
               return true;
           }
           if(a>=66&&a<=68){
               return true;
           }
       }
   }