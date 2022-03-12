'use strict';
decadeModule.import(function (lib, game, ui, get, ai, _status) {
    /*
    十周年UI动皮使用说明：
    - 首先打开动态皮肤的开关，直接替换原有武将皮肤显示；
    - 目前不支持动态皮肤的切换功能；
    - 动态皮肤参数表在线文档链接：https://docs.qq.com/sheet/DS2Vaa0ZGWkdMdnZa；可以在群在线文档提供你设置好的参数
    - 所有相关的文件请放到	十周年UI/assets/dynamic目录下；
    - 关于格式请参考下面示例：
        武将名:{
            皮肤名:{
                name: "xxx",	//	必★填	骨骼名称，一般是yyy.skel，注意xxx不带后缀名.skel；
                action: "xxx",	//	可删掉	播放动作，xxx 一般是 DaiJi，目前手杀的骨骼文件需要填；
                x: [10, 0.5],	//	可删掉	[10, 0.5]相当于 left: calc(10px + 50%)，不填默认为[0, 0.5]；
                y: [10, 0.5],	//	可删掉	[10, 0.5]相当于 bottom: calc(10px + 50%)，不填默认为[0, 0.5]；
                scale: 0.5,		//	可删掉	缩放大小，不填默认为1；
                angle: 0,		//	可删掉	旋转角度，不填默认为0；
                speed: 1,		//	可删掉	播放速度，不填默认为1；
                hideSlots: ['隐藏的部件'],	// 隐藏不需要的部件，想知道具体部件名称请使用SpineAltasSplit工具查看
                clipSlots: ['裁剪的部件'],	// 剪掉超出头的部件，仅针对露头动皮，其他勿用
                background: "xxx.jpg",	//	可删掉	背景图片，注意后面要写后缀名，如.jpg .png等
            }
        },
    - 为了方便得到动皮的显示位置信息，请在游戏选将后，用控制台或调试助手小齿轮执行以下代码(没用到的属性请删掉以免报错):
        game.me.stopDynamic();
        game.me.playDynamic({
            name: 'xxxxxxxxx',		// 勿删
            action: undefined,
            speed: 1,
            loop: true,				// 勿删
            x: [0, 0.5],
            y: [0, 0.5],
            scale: 0.5,
            angle: 0,
            hideSlots: ['隐藏的部件'],	// 隐藏不需要的部件，想知道具体部件名称请使用SpineAltasSplit工具查看
            clipSlots: ['裁剪的部件'],	// 剪掉超出头的部件，仅针对露头动皮，其他勿用
        });
        // 这里可以改成  }, true);  设置右将动皮
    */

    decadeUI.dynamicSkin = {
     xusheng: {
       百里疑城1: {
        name: 'skin_xusheng_BaiLiYiCheng1',
        x: [0, 0.42],
        y: [0, 0.5],
        scale: 0.43,
        background: 'skin_xusheng_BaiLiYiCheng_bg.png',
        skinName: "百里疑城"
      },
       百里疑城2: {
        name: 'skin_xusheng_BaiLiYiCheng2',
        x: [0, 0.4],
        y: [0, 0.6],
        scale: 0.6,
        background: 'skin_xusheng_BaiLiYiCheng_bg.png',
        skinName: "百里疑城"
      },
 },
     baosanniang: {
       漫花剑俏2: {
        name: 'skin_baosanniang_ManHuaJianQiao2',
        x: [0, 0.52],
        y: [0, 0.53],
        scale: 0.8,
        background: 'skin_baosanniang_ManHuaJianQiao_bg.png',
        skinName: "漫花剑俏"
      },
       原皮: {
        name: 'skin_baosanniang',
        x: [0, 0.25],
        y: [0, 0.35],
        scale: 0.45,
        background: 'skin_baosanniang_ManHuaJianQiao_bg.png',
        skinName: "原皮"
      },
       漫花剑俏1: {
        name: 'skin_baosanniang_ManHuaJianQiao1',
        x: [96, 0.2],
        y: [10, 0.3],
        scale: 0.38,
        angle:-15,
        background: 'skin_baosanniang_ManHuaJianQiao_bg.png',
        skinName: "漫花剑俏"
      },
      嫣然一笑: {
        name: 'skin_baosanniang_YanRanYiXiao',
        x: [-20, 0],
        y: [18, 0.338],
        scale: 0.3,
        angle: 9,
        action:"DaiJi",
        background: 'skin_baosanniang_YanRanYiXiao_bg.png',
        skinName: "嫣然一笑"
      },
      柳娇桃艳: {
        name: 'skin_baosanniang_LiuJiaoTaoYan',
        x: [0, 0.4],
        y: [0, 0.1],
        scale: 0.5,
        angle:-15,
        action: 'DaiJi',
        background: 'skin_baosanniang_LiuJiaoTaoYan_bg.png',
        skinName: "柳娇桃艳"
      },
      柳娇桃艳2: {
        name: 'luo_baosanniang_LiuJiaoTaoYan',
        x: [0, 0.4],
        y: [0, 0.1],
        scale: 0.5,
        angle:-15,
        action: 'DaiJi',
        background: 'skin_baosanniang_LiuJiaoTaoYan_bg.png',
        luoName: "柳娇桃艳"
      },
      嫣然一笑2: {
        name: 'luo_baosanniang_YanRanYiXiao',
        x: [-20, 0],
        y: [18, 0.338],
        scale: 0.3,
        angle: 9,
        action:"DaiJi",
        background: 'skin_baosanniang_YanRanYiXiao_bg.png',
        luoName: "嫣然一笑"
      },
      },
     beimihu: {
       逐鹿天下2: {
        name: 'skin_beimihu_ZhuLuTianXia2',
        x: [0, 0.5],
        y: [0, 0.51],
        scale: 0.78,
        background: 'skin_beimihu_ZhuLuTianXia_bg.png',
        skinName: "逐鹿天下"
     },
       缘法耀世2: {
        name: 'skin_beimihu_YuanFaYaoShi2',
        x: [0, 0.5],
        y: [0, 0.52],
        scale: 0.743,
        background: 'skin_beimihu_YuanFaYaoShi_bg.png',
        skinName: "缘法耀世"
      },
       逐鹿天下1: {
        name: 'skin_beimihu_ZhuLuTianXia1',
        x: [0, 0.05],
        y: [0, 0.1],
        scale: 0.65,
        background: 'skin_beimihu_ZhuLuTianXia_bg.png',
        skinName: "逐鹿天下"
     },
       缘法耀世1: {
        name: 'skin_beimihu_YuanFaYaoShi1',
        x: [0, 0.6],
        y: [5, 0.32],
        scale: 0.43,
        background: 'skin_beimihu_YuanFaYaoShi_bg.png',
        skinName: "缘法耀世"
      },
      鬼渊蝶引: {
        name: 'skin_beimihu_GuiYuanDieYin',
        x: [0, 0.45],
        y: [0, 0.16],
        scale: 0.5,
        //angle:-10,
        action: 'DaiJi',
        background: 'skin_beimihu_GuiYuanDieYin_bg.png',
        skinName: "鬼渊蝶引"
      },
      鬼渊蝶引2: {
        name: 'luo_beimihu_GuiYuanDieYin',
        x: [0, 0.45],
        y: [0, 0.16],
        scale: 0.5,
        //angle:-10,
        action: 'DaiJi',
        background: 'skin_beimihu_GuiYuanDieYin_bg.png',
        luoName: "鬼渊蝶引"
      },
      },
     bulianshi: {
       鸾凤和鸣2: {
        name: 'skin_bulianshi_LuanFengHeMing2',
        x: [0, 0.5],
        y: [0, 0.55],
        scale: 0.8,
        background: 'skin_bulianshi_LuanFengHeMing_bg.png',
        skinName: "鸾凤和鸣"
      },
       缘后雅志2: {
        name: 'skin_bulianshi_YuanHouYaZhi2',
        x: [0, 0.53],
        y: [0, 0.5],
        scale: 0.78,
        background: 'skin_bulianshi_YuanHouYaZhi_bg.png',
        skinName: "缘后雅志"
      },
       战场绝版2: {
        name: 'skin_bulianshi_ZhanChang2',
        x: [0, 0.5],
        y: [0, 0.55],
        scale: 0.7,
        background: 'skin_bulianshi_ZhanChang_bg.png',
        skinName: "战场绝版"
      },
     鸾凤和鸣1: {
        name: 'skin_bulianshi_LuanFengHeMing1',
        x: [0, 0.5],
        y: [5, 0.55],
        scale: 0.4,
        background: 'skin_bulianshi_LuanFengHeMing_bg.png',
        skinName: "鸾凤和鸣"
      },
       缘后雅志1: {
        name: 'skin_bulianshi_YuanHouYaZhi1',
        x: [0, 0.8],
        y: [5, 0.4],
        scale: 0.4,
        background: 'skin_bulianshi_YuanHouYaZhi_bg.png',
        skinName: "缘后雅志"
      },
       战场绝版1: {
        name: 'skin_bulianshi_ZhanChang1',
        x: [0, 0.4],
        y: [5, 0.33],
        scale: 0.44,
        background: 'skin_bulianshi_ZhanChang_bg.png',
        skinName: "战场绝版"
      },
      牛年七夕: {
        name: 'skin_bulianshi_NiuNianQiXi',
        x: [0, 0.45],
        y: [0, 0.33],
        scale: 0.5,
        action: 'DaiJi',
        background: 'skin_bulianshi_NiuNianQiXi_bg.png',
        skinName: "鼠年七夕"
      },
      牛年七夕2: {
        name: 'luo_bulianshi_NiuNianQiXi',
        x: [0, 0.45],
        y: [0, 0.33],
        scale: 0.5,
        action: 'DaiJi',
        background: 'skin_bulianshi_NiuNianQiXi_bg.png',
        luoName: "鼠年七夕"
      },
      },
      buzhi: {
        踏海拓疆2: {
        name: 'skin_buzhi_TaHaiTuoJiang2',
        x: [0, 0.46],
        y: [0, 0.55],
        scale: 0.7,
        background: 'skin_buzhi_TaHaiTuoJiang_bg.png',
        skinName: "踏海拓疆"
      },
       踏海拓疆1: {
        name: 'skin_buzhi_TaHaiTuoJiang1',
        x: [0, 0.08],
        y: [0, -0.1],
        scale: 0.75,
        background: 'skin_buzhi_TaHaiTuoJiang_bg.png',
        skinName: "踏海拓疆"
      },
      },
     caifuren: {
     柔情钰露2: {
        name: 'skin_caifuren_RouQingYuLu2',
        x: [0, 0.5],
        y: [0, 0.45],
        scale: 0.95,
        background: 'skin_caifuren_RouQingYuLu_bg.png',
        skinName: "柔情钰露"
      },
      名门妖媛2: {
        name: 'skin_caifuren_MingMenYaoYuan2',
        x: [0, 0.5],
        y: [0, 0.54],
        scale: 0.78,
        background: 'skin_caifuren_MingMenYaoYuan_bg.png',
        skinName: "名门妖媛"
      },
     柔情钰露1: {
        name: 'skin_caifuren_RouQingYuLu1',
        x: [0, 0.4],
        y: [0, 0.2],
        scale: 0.8,
        background: 'skin_caifuren_RouQingYuLu_bg.png',
        skinName: "柔情钰露"
      },
      名门妖媛1: {
        name: 'skin_caifuren_MingMenYaoYuan1',
        x: [0, 0.6],
        y: [0, 0.33],
        scale: 0.47,
        background: 'skin_caifuren_MingMenYaoYuan_bg.png',
        skinName: "名门妖媛"
      },
      },
     caiwenji: {
       离乡思浓2: {
        name: 'skin_caiwenji_LiXiangSiNong2',
        x: [0, 0.25],
        y: [0, 0.5],
        scale: 0.75,
        angle: -30,
        background: 'skin_caiwenji_LiXiangSiNong_bg.png',
        skinName: "离乡思浓"
      },
       红月悲歌2: {
        name: 'skin_caiwenji_HongYueBeiGe2',
        x: [0, 0.42],
        y: [0, 0.53],
        scale: 0.78,
        background: 'skin_caiwenji_HongYueBeiGe_bg.png',
        skinName: "红月悲歌"
      },
       离乡思浓1: {
        name: 'skin_caiwenji_LiXiangSiNong1',
        x: [0, 0.6],
        y: [0, 0.35],
        scale: 0.45,
        angle: -27,
        background: 'skin_caiwenji_LiXiangSiNong_bg.png',
        skinName: "离乡思浓"
      },
       红月悲歌1: {
        name: 'skin_caiwenji_HongYueBeiGe1',
        x: [0, 0.2],
        y: [0, 0.3],
        scale: 0.45,
        angle: 27,
        background: 'skin_caiwenji_HongYueBeiGe_bg.png',
        skinName: "红月悲歌"
      },
       泪捻琵琶: {
        name: 'skin_caiwenji_LeiNianPiPa',
        x: [0, 0.6],
        y: [0, 0.3],
        scale: 0.5,
        action: 'DaiJi',
        background: 'skin_caiwenji_LeiNianPiPa_bg.png',
        skinName: "泪捻琵琶"
      },
       才颜双绝2: {
        name: 'skin_caiwenji_CaiYanShuangJue2',
        x: [0, 0.5],
        y: [0, 0.51],
        scale: 0.75,
        background: 'skin_caiwenji_CaiYanShuangJue_bg.png',
        skinName: "才颜双绝"
      },
       婉娩流逸2: {
        name: 'skin_caiwenji_WanMianLiuYi2',
        x: [0, 0.5],
        y: [0, 0.524],
        scale: 0.75,
        background: 'skin_caiwenji_WanMianLiuYi_bg.png',
        skinName: "婉娩流逸"
      },
       花好月圆2: {
        name: 'skin_caiwenji_HuaHaoYueYuan2',
        x: [0, 0.45],
        y: [0, 0.5],
        scale: 0.75,
        background: 'skin_caiwenji_HuaHaoYueYuan_bg.png',
        skinName: "花好月圆"
      },
      战场绝版1: {
        name: 'skin_caiwenji_ZhanChang1',
        x: [0, 0.35],
        y: [0, 0.45],
        scale: 0.4,
        angle: 4,
        background: 'skin_caiwenji_ZhanChang_bg.png',
        skinName: "战场绝版"
      },
      才颜双绝1: {
        name: 'skin_caiwenji_CaiYanShuangJue1',
        x: [-30, 0.5],
        y: [0, 0.1],
        scale: 0.5,
        background: 'skin_caiwenji_CaiYanShuangJue_bg.png',
        skinName: "才颜双绝"
      },
      婉娩流逸1: {
        name: 'skin_caiwenji_WanMianLiuYi1',
        x: [0, 0.5],
        y: [0, 0.4],
        scale: 0.45,
        background: 'skin_caiwenji_WanMianLiuYi_bg.png',
        skinName: "婉娩流逸"
      },
      花好月圆1: {
        name: 'skin_caiwenji_HuaHaoYueYuan1',
        x: [0, 0.4],
        y: [0, 0.35],
        scale: 0.45,
        background: 'skin_caiwenji_HuaHaoYueYuan_bg.png',
        skinName: "花好月圆"
      },
      抚弦绘黛1: {
        name: 'skin_caiwenji_FuXianHuiDai1',
        x: [0, 0.88],
        y: [0, 0.35],
        scale: 0.45,
        background: 'skin_caiwenji_FuXianHuiDai_bg.png',
        skinName: "抚弦绘黛"
       },
       泪捻琵琶2: {
        name: 'luo_caiwenji_LeiNianPiPa',
        x: [0, 0.6],
        y: [0, 0.3],
        scale: 0.5,
        action: 'DaiJi',
        background: 'skin_caiwenji_LeiNianPiPa_bg.png',
        luoName: "泪捻琵琶"
      },
       },
     caiyong: {
       博学绘法2: {
        name: 'skin_caiyong_BoXueHuiFa2',
        x: [0, 0.5],
        y: [0, 0.45],
        scale: 0.85,
        background: 'skin_caiyong_BoXueHuiFa_bg.png',
        skinName: "博学绘法"
      },
       博学绘法1: {
        name: 'skin_caiyong_BoXueHuiFa1',
        x: [0, 0.4],
        y: [0, 0.25],
        scale: 0.45,
        angle: -15,
        background: 'skin_caiyong_BoXueHuiFa_bg.png',
        skinName: "博学绘法"
      },
      },
    caoang: {
        醉玉颓山2: {
        name: 'skin_caoang_ZuiYuTuiShan2',
        x: [0, 0.41],
        y: [0, 0.51],
        scale: 0.75,
        background: 'skin_caoang_ZuiYuTuiShan_bg.png',
        skinName: "醉玉颓山"
      },
       醉玉颓山1: {
        name: 'skin_caoang_ZuiYuTuiShan1',
        x: [0, 0.35],
        y: [0, 0.25],
        scale: 0.45,
        background: 'skin_caoang_ZuiYuTuiShan_bg.png',
        skinName: "醉玉颓山"
      },
      竭战鳞伤: {
        name: 'skin_caoang_JieZhanLinShang',
        x: [0, -0.11],
        y: [0, 0.37],
        scale: 0.4,
        background: 'skin_caoang_JieZhanLinShang_bg.png',
        action: 'DaiJi',
        skinName: "竭战鳞伤"
      },
      },
    caocao: {
       英杰汇聚2: {
        name: 'skin_caocao_YingJieHuiJu2',
        x: [0, 0.5],
        y: [0, 0.48],
        scale: 0.77,
        background: 'skin_caocao_YingJieHuiJu_bg.png',
        skinName: "英杰汇聚"
      },
       魏武东临2: {
        name: 'skin_caocao_WeiWuDonLin2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.78,
        background: 'skin_caocao_WeiWuDonLin_bg.png',
        skinName: "魏武东临"
      },
       英杰汇聚1: {
        name: 'skin_caocao_YingJieHuiJu1',
        x: [0, 0.5],
        y: [0, -0.15],
        scale: 0.7,
        background: 'skin_caocao_YingJieHuiJu_bg.png',
        skinName: "英杰汇聚"
      },
       魏武东临1: {
        name: 'skin_caocao_WeiWuDonLin1',
        x: [0, 0.4],
        y: [0, 0.4],
        scale: 0.42,
        angle: 5,
        background: 'skin_caocao_WeiWuDonLin_bg.png',
        skinName: "魏武东临"
      },
      },
      caochong: {
      资优神童2: {
        name: 'skin_caochong_ZhiYouShenTong2',
        x: [0, 0.4],
        y: [0, 0.5],
        scale: 0.95,
        background: 'skin_caochong_ZhiYouShenTong_bg.png',
        skinName: "资优神童"
      },
      资优神童1: {
        name: 'skin_caochong_ZhiYouShenTong1',
        x: [0, 0.24],
        y: [0, 0.4],
        scale: 0.33,
        background: 'skin_caochong_ZhiYouShenTong_bg.png',
        skinName: "资优神童"
      },
      五陵英少: {
        name: 'skin_caochong_WuLingYingShao',
        x: [0, 0.59],
        y: [0, 0.25],
        scale: 0.45,
        background: 'skin_caochong_WuLingYingShao_bg.png',
        action: 'DaiJi',
        skinName: "五陵英少"
      },
      猪年春节: {
        name: 'skin_caochong_ZhuNianChunJie',
        x: [0, 0.7],
        y: [0, 0.55],
        scale: 0.5,
        //angle:-10,
        action: 'DaiJi',
        background: 'skin_caochong_ZhuNianChunJie_bg.png',
        skinName: "猪年春节"
      },
      },
     caochun: {
       险棋激战2: {
        name: 'skin_caochun_XianQiJiZhan2',
        x: [0, 0.48],
        y: [0, 0.55],
        scale: 0.76,
        background: 'skin_caochun_XianQiJiZhan_bg.png',
        skinName: "险棋激战"
      },
       险棋激战1: {
        name: 'skin_caochun_XianQiJiZhan1',
        x: [0, 1.38],
        y: [0, 0.4],
        scale: 0.56,
        background: 'skin_caochun_XianQiJiZhan_bg.png',
        skinName: "险棋激战"
      },
      长坂败备: {
        name: 'skin_caochun_ChangBanBaiBei',
        x: [0, 0.89],
        y: [0, 0.12],
        scale: 0.53,
        background: 'skin_caochun_ChangBanBaiBei_bg.png',
        action: 'DaiJi',
        skinName: "长坂败备"
        },
     虎年新春: {
        name: 'skin_caochun_HuNianChunJie',
        x: [0, 0.55],
        y: [0, 0.45],
        scale: 0.4,
        background: 'skin_caochun_HuNianChunJie_bg.png',
        action: 'DaiJi',
        skinName: "虎年新春"
      },
      },
    caozhen:{
     虎年新春: {
        name: 'skin_caozhen_HuNianChunJie',
        x: [0, 0.4],
        y: [0, 0.18],
        scale: 0.5,
        background: 'skin_caozhen_HuNianChunJie_bg.png',
        action: 'DaiJi',
        skinName: "虎年新春"
      },
      },
     caohong: {
        众剑鞘厉2: {
        name: 'skin_caohong_ZhongJianQiaoLi2',
        x: [0, 0.4],
        y: [0, 0.5],
        scale: 0.76,
        background: 'skin_caohong_ZhongJianQiaoLi_bg.png',
        skinName: "众剑鞘厉"
       },
       众剑鞘厉1: {
        name: 'skin_caohong_ZhongJianQiaoLi1',
        x: [0, 0.28],
        y: [0, 0.35],
        scale: 0.45,
        background: 'skin_caohong_ZhongJianQiaoLi_bg.png',
        skinName: "众剑鞘厉"
       },
       },
      caojie:{
       战场绝版2: {
        name: 'skin_caojie_ZhanChang2',
        x: [0, 0.44],
        y: [0, 0.55],
        scale: 0.75,
        background: 'skin_caojie_ZhanChang_bg.png',
        skinName: "战场绝版"
      },
	   凤历迎春2:{
	 	name: 'skin_caojie_FengLiYingChun2',
		x: [0, 0.4],
		y: [0, 0.5],
		scale: 0.8,
		background: 'skin_caojie_FengLiYingChun_bg.png',
	   },
      凰梦汉回2: {
        name: 'skin_caojie_HuangMengHanHui2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.75,
        background: 'skin_caojie_HuangMengHanHui_bg.png',
        skinName: "凰梦汉回"
      },
	  凤历迎春1:{
		name: 'skin_caojie_FengLiYingChun1',
		x: [0, 0.8],
		y: [40, 0.6],
		scale: 0.48,
		angle: 50,
		background: 'skin_caojie_FengLiYingChun_bg.png',
	   },
      战场绝版1: {
        name: 'skin_caojie_ZhanChang1',
        x: [0, -0.25],
        y: [0, 0.25],
        scale: 0.55,
        angle: 10,
        background: 'skin_caojie_ZhanChang_bg.png',
        skinName: "战场绝版"
      },
      凰梦汉回1: {
        name: 'skin_caojie_HuangMengHanHui1',
        x: [0, 0.5],
        y: [0, 0.25],
        scale: 0.45,
        angle: 10,
        background: 'skin_caojie_HuangMengHanHui_bg.png',
        skinName: "凰梦汉回"
      },
       猪年大雪: {
        name: 'skin_caojie_ZhuNianDaXue',
        x: [0, 0.75],
        y: [0, 0.2],
        scale: 0.5,
        angle:10,
        action: 'DaiJi',
        background: 'skin_caojie_ZhuNianDaXue_bg.png',
        skinName: "猪年大雪"
      },
       猪年大雪2: {
        name: 'luo_caojie_ZhuNianDaXue',
        x: [0, 0.75],
        y: [0, 0.2],
        scale: 0.5,
        angle:10,
        action: 'DaiJi',
        background: 'skin_caojie_ZhuNianDaXue_bg.png',
        luoName: "猪年大雪"
      },
      },
     caopi: {
      魏王称帝2: {
        name: 'skin_caopi_WeiWangChengDi2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.78,
        background: 'skin_caopi_WeiWangChengDi_bg.png',
        skinName: "魏王称帝"
      },
      月夜情满2: {
        name: 'skin_caopi_YueYeQingMan2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.7,
        background: 'skin_caopi_YueYeQingMan_bg.png',
        skinName: "月夜情满"
      },
      魏王称帝1: {
        name: 'skin_caopi_WeiWangChengDi1',
        x: [0, 0.5],
        y: [0, 0],
        scale: 0.65,
        background: 'skin_caopi_WeiWangChengDi_bg.png',
        skinName: "魏王称帝"
      },
      月夜情满1: {
        name: 'skin_caopi_YueYeQingMan1',
        x: [0, 0.95],
        y: [0, 0.2],
        scale: 0.55,
        background: 'skin_caopi_YueYeQingMan_bg.png',
        skinName: "月夜情满"
      },
      牛年清明: {
        name: 'skin_caopi_NiuNianQingMing',
        x: [0, 0.6],
        y: [0, 0.1],
        scale: 0.65,
        //angle:10,
        action: 'DaiJi',
        background: 'skin_caopi_NiuNianQingMing_bg.png',
        skinName: "牛年清明"
      },
      猪年端午: {
        name: 'skin_caopi_ZhuNianDuanWu',
        x: [0, 0.4],
        y: [0, 0.2],
        scale: 0.65,
        //angle:10,
        action: 'DaiJi',
        background: 'skin_caopi_ZhuNianDuanWu_bg.png',
        skinName: "猪年端午"
      },
      },
      caoren: {
      坚石铁壁2: {
        name: 'skin_caoren_JianShiTieBi2',
        x: [0, 0.45],
        y: [0, 0.5],
        scale: 0.75,
        background: 'skin_caoren_JianShiTieBi_bg.png',
        skinName: "坚石铁壁"
      },
      坚石铁壁1: {
        name: 'skin_caoren_JianShiTieBi1',
        x: [0, 0.45],
        y: [0, 0.48],
        scale: 0.35,
        background: 'skin_caoren_JianShiTieBi_bg.png',
        skinName: "坚石铁壁"
      },
      },
    caorui: {
       战场绝版2: {
        name: 'skin_caorui_XinJunJiWei2',
        x: [0, 0.45],
        y: [0, 0.52],
        scale: 0.7,
        background: 'skin_caorui_XinJunJiWei_bg.png',
        skinName: "战场绝版"
      },
       月夜情满2: {
        name: 'skin_caorui_YueYeQingMan2',
        x: [0, 0.4],
        y: [0, 0.5],
        scale: 0.7,
        background: 'skin_caorui_YueYeQingMan_bg.png',
        skinName: "月夜情满"
      },
       情意相投2: {
        name: 'skin_caorui_QingYiXiangTou2',
        x: [0, 0.51],
        y: [0, 0.5],
        scale: 0.78,
        background: 'skin_caorui_QingYiXiangTou_bg.png',
        skinName: "情意相投"
      },
       玺握天下2: {
        name: 'skin_caorui_XiWoTianXia2',
        x: [0, 0.45],
        y: [0, 0.5],
        scale: 0.8,
        background: 'skin_caorui_XiWoTianXia_bg.png',
        skinName: "玺握天下"
      },
       战场绝版1: {
        name: 'skin_caorui_XinJunJiWei1',
        x: [0, 0.35],
        y: [0, 0.05],
        scale: 0.65,
        background: 'skin_caorui_XinJunJiWei_bg.png',
        skinName: "战场绝版"
      },
      月夜情满1: {
        name: 'skin_caorui_YueYeQingMan1',
        x: [0, -0.4],
        y: [0, 0.65],
        scale: 0.5,
        background: 'skin_caorui_YueYeQingMan_bg.png',
        skinName: "月夜情满"
      },
      情意相投1: {
        name: 'skin_caorui_QingYiXiangTou1',
        x: [0, 0.03],
        y: [0, 0.28],
        scale: 0.54,
        background: 'skin_caorui_QingYiXiangTou_bg.png',
        skinName: "情意相投"
      },
      玺握天下1: {
        name: 'skin_caorui_XiWoTianXia1',
        x: [0, 0.45],
        y: [0, 0.33],
        scale: 0.38,
        background: 'skin_caorui_XiWoTianXia_bg.png',
        skinName: "玺握天下"
      },
      },
      caoying: {
      巾帼花武2: {
        name: 'skin_caoying_JinGuoHuaWu2',
        x: [0, 0.45],
        y: [0, 0.5],
        scale: 0.8,
		background: 'skin_caoying_JinGuoHuaWu_bg.png',
        skinName: "巾帼花武"
      },
       魏缨凤鸣2: {
        name: 'skin_caoying_WeiYingFengMing2',
        x: [0, 0.4],
        y: [0, 0.53],
        scale: 0.68,
        background: 'skin_caoying_WeiYingFengMing_bg.png',
        skinName: "魏缨凤鸣"
      },
       巾帼花武1: {
        name: 'skin_caoying_JinGuoHuaWu1',
        x: [0, 0.15],
        y: [0,0.3],
        scale: 0.4,
        angle: 22,
		background: 'skin_caoying_JinGuoHuaWu_bg.png',
        skinName: "巾帼花武"
	},
      魏缨凤鸣1: {
        name: 'skin_caoying_WeiYingFengMing1',
        x: [0, 0.7],
        y: [0,0.03],
        scale: 0.65,
        background: 'skin_caoying_WeiYingFengMing_bg.png',
        skinName: "魏缨凤鸣"
      },
      原皮: {
        name: 'skin_caoying',
        x: [80, 1.6],
        y: [0, 0.15],
        scale: 0.6,
        background: 'skin_caoying_WeiYingFengMing_bg.png',
        skinName: "原皮"
      },
      锋芒毕露: {
        name: 'skin_caoying_FengMangBiLou',
        x: [0, 0.3],
        y: [0, -0.06],
        scale: 0.65,
        action: 'DaiJi',
        background: 'skin_caoying_FengMangBiLou_bg.png',
        loop: false,
        skinName: "锋芒毕露"
      },
      锋芒毕露2: {
        name: 'luo_caoying_FengMangBiLou',
        x: [0, 0.3],
        y: [0, -0.06],
        scale: 0.65,
        action: 'DaiJi',
        background: 'skin_caoying_FengMangBiLou_bg.png',
        loop: false,
        luoName: "锋芒毕露"
      },
      },
      caozhi: {
       七步绝章2: {
        name: 'skin_caozhi_QiBuJueZhang2',
        x: [0, 0.42],
        y: [0, 0.55],
        scale: 0.78,
        background: 'skin_caozhi_QiBuJueZhang_bg.png',
        skinName: "七步绝章"
      },
       七步绝章1: {
        name: 'skin_caozhi_QiBuJueZhang1',
        x: [0, 0.88],
        y: [0, 0.41],
        scale: 0.37,
        background: 'skin_caozhi_QiBuJueZhang_bg.png',
        skinName: "七步绝章"
      },
      鼠年端午: {
        name: 'skin_caozhi_ShuNianDuanWu',
        x: [0, 0.52],
        y: [0, 0.4],
        scale: 0.5,
        action: 'DaiJi',
        background: 'skin_caozhi_ShuNianDuanWu_bg.png',
        skinName: "鼠年端午"
      },
       虚拟天团2: {
        name: 'skin_caozhi_XuNiTianTuan2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.7,
        background: 'skin_caozhi_XuNiTianTuan_bg.png',
        skinName: "虚拟天团"
      },
       虚拟天团1: {
        name: 'skin_caozhi_XuNiTianTuan1',
        x: [0, 0.44],
        y: [0, 0.45],
        scale: 0.5,
        background: 'skin_caozhi_XuNiTianTuan_bg.png',
        skinName: "虚拟天团"
      },
      },
      caojinyu:{
	    惊鸿倩影2: {
        name: 'skin_caojinyu_JingHongQianYing2',
        x: [0, 0.32],
        y: [0, 0.45],
        scale: 0.85,
        background: 'skin_caojinyu_JingHongQianYing_bg.png',
        skinName: "惊鸿倩影"
       },
	   惊鸿倩影1: {
        name: 'skin_caojinyu_JingHongQianYing1',
        x: [0, 0.82],
        y: [0, 0.3],
        scale: 0.45,
         background: 'skin_caojinyu_JingHongQianYing_bg.png',
        skinName: "惊鸿倩影"
       },
	   原皮: {
        name: 'skin_caojinyu',
        x: [0, 2.25],
        y: [0, 0.05],
        scale: 0.6,
         background: 'skin_caojinyu_JingHongQianYing_bg.png',
        skinName: "原皮"
       },
	   曹金玉1: {
        name: 'skin_caojinyu_YXYH1',
        x: [0, 0.82],
        y: [0, 0.3],
        scale: 0.45,
         background: 'skin_caojinyu_YXYH_bg.png',
        skinName: "惊鸿倩影"
       },
	   曹金玉2: {
        name: 'skin_caojinyu_YXYH2',
        x: [0, 0.32],
        y: [0, 0.45],
        scale: 0.85,
        background: 'skin_caojinyu_YXYH_bg.png',
        skinName: "曹金玉"
       },
       },
      chengong: {
        一战而就2: {
        name: 'skin_chengong_YiZhanErJiu2',
        x: [0, 0.6],
        y: [0, 0.5],
        scale: 0.75,
        background: 'skin_chengong_YiZhanErJiu_bg.png',
        skinName: "一战而就"
       },
        一战而就1: {
        name: 'skin_chengong_YiZhanErJiu1',
        x: [0, 0.65],
        y: [5, 0.35],
        scale: 0.4,
        background: 'skin_chengong_YiZhanErJiu_bg.png',
        skinName: "一战而就"
       },
       },
    chengyu: {
       泰山捧日: {
        name: 'skin_chengyu_TaiShanPengRi',
        x: [0, 0.63],
        y: [5, -0.08],
        scale: 0.65,
        action: 'DaiJi',
        angle: -10,
        background: 'skin_chengyu_TaiShanPengRi_bg.png',
        skinName: "泰山捧日"
      },
      },
      chenlin: {
       重阳闲趣2: {
        name: 'skin_chenlin_ChongYangXianQu2',
        x: [0, 0.48],
        y: [0, 0.48],
        scale: 0.73,
        background: 'skin_chenlin_ChongYangXianQu_bg.png',
        skinName: "重阳闲趣"
      },
       重阳闲趣1: {
        name: 'skin_chenlin_ChongYangXianQu1',
        x: [0, -0.4],
        y: [0, 0.05],
        scale: 0.66,
        background: 'skin_chenlin_ChongYangXianQu_bg.png',
        skinName: "重阳闲趣"
      },
      },
     daqiao:{
       战场绝版2:{
        name: 'skin_daqiao_ZhanChang2',
        x: [0, 0.6],
        y: [0, 0.525],
        scale: 0.8,
        background: 'skin_daqiao_ZhanChang_bg.png',
        skinName: "战场绝版"
       },
        花好月圆2:{
        name: 'skin_daqiao_HuaHaoYueYuan2',
        x: [0, 0.53],
        y: [0, 0.56],
        scale: 0.75,
        background: 'skin_daqiao_HuaHaoYueYuan_bg.png',
        skinName: "花好月圆"
       },
       软语花香2: {
        name: 'skin_daqiao_RuanYuHuaXiang2',
        x: [0, 0.45],
        y: [0, 0.55],
        scale: 0.75,
        background: 'skin_daqiao_RuanYuHuaXiang_bg.png',
        skinName: "软语花香"
       },
       清萧清丽2:{
        name: 'skin_daqiao_QingXiaoQingLi2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.75,
        background: 'skin_daqiao_QingXiaoQingLi_bg.png',
        skinName: "清萧清丽"
       },
       战场绝版1:{
        name: 'skin_daqiao_ZhanChang1',
        x: [0, 0.4],
        y: [0, 0.35],
        scale: 0.48,
        background: 'skin_daqiao_ZhanChang_bg.png',
        skinName: "战场绝版"
       },
        花好月圆1:{
        name: 'skin_daqiao_HuaHaoYueYuan1',
        x: [5, 0.3],
        y: [2, 0.16],
        scale: 0.5,
        background: 'skin_daqiao_HuaHaoYueYuan_bg.png',
        skinName: "花好月圆"
       },
       软语花香1: {
        name: 'skin_daqiao_RuanYuHuaXiang1',
        x: [30, 1.1],
        y: [0, 0.15],
        scale: 0.65,
        background: 'skin_daqiao_RuanYuHuaXiang_bg.png',
        skinName: "软语花香"
       },
       清萧清丽1:{
        name: 'skin_daqiao_QingXiaoQingLi1',
        x: [16, 0.5],
        y: [15, 0.1],
        scale: 0.55,
        background: 'skin_daqiao_QingXiaoQingLi_bg.png',
        skinName: "清萧清丽"
       },
       绝世之姿:{
        name: 'skin_daqiao_JueShiZhiZi',
        x: [5, 0.5],
        y: [2, 0.25],
        scale: 0.5,
        angle:18,
        action: 'DaiJi',
        background: 'skin_daqiao_JueShiZhiZi_bg.png',
        skinName: "绝世之姿"
      },
      衣垂绿川:{
        name: 'skin_daqiao_YiChuiLvChuan',
        x: [60, 0.5],
        y: [0, 0.2],
        scale: 0.5,
        action: 'DaiJi',
        clipSlots: ['san'],
        hideSlots: ['qjhua1', 'qjhua2', 'qjhua3', 'qjhua4', 'qjhua5', 'guangxian', 'yun1', 'yun3', 'effect/guang2_00', 'effect/yan'],
        background: 'skin_daqiao_YiChuiLvChuan_bg.png',
        skinName: "衣垂绿川"
      },
      鼠年春分:{
        name: 'skin_daqiao_ShuNianChunFen',
        x: [-5, -0.9],
        y: [4.5, 0.26],
        scale: 0.55,
        action: 'DaiJi',
        background: 'skin_daqiao_ShuNianChunFen_bg.png',
        skinName: "鼠年春分"
      },
      猪年七夕:{
        name: 'skin_daqiao_ZhuNianQiXi',
        x: [0, 0],
        y: [19, 0],
        scale: 0.55,
        background: 'skin_daqiao_ZhuNianQiXi_bg.png',
        skinName: "猪年七夕"
       },
       绝世之姿2:{
        name: 'luo_daqiao_JueShiZhiZi',
        x: [5, 0.5],
        y: [2, 0.25],
        scale: 0.5,
        angle:18,
        action: 'DaiJi',
        background: 'skin_daqiao_JueShiZhiZi_bg.png',
        luoName: "绝世之姿"
      },
      鼠年春分2:{
        name: 'luo_daqiao_ShuNianChunFen',
        x: [-5, -0.9],
        y: [4.5, 0.26],
        scale: 0.55,
        action: 'DaiJi',
        background: 'skin_daqiao_ShuNianChunFen_bg.png',
        luoName: "鼠年春分"
      },
      衣垂绿川2:{
        name: 'luo_daqiao_YiChuiLvChuan',
        x: [60, 0.5],
        y: [0, 0.2],
        scale: 0.5,
        action: 'DaiJi',
        clipSlots: ['san'],
        hideSlots: ['qjhua1', 'qjhua2', 'qjhua3', 'qjhua4', 'qjhua5', 'guangxian', 'yun1', 'yun3', 'effect/guang2_00', 'effect/yan'],
        background: 'skin_daqiao_YiChuiLvChuan_bg.png',
        luoName: "衣垂绿川"
      },
      猪年七夕2:{
        name: 'luo_daqiao_ZhuNianQiXi',
        x: [0, 0],
        y: [19, 0],
        scale: 0.55,
        background: 'skin_daqiao_ZhuNianQiXi_bg.png',
        luoName: "猪年七夕"
       },
       },
      daxiaoqiao: {
        战场绝版2: {
        name: 'skin_daxiaoqiao_ZhanChang2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.72,
        background: 'skin_daxiaoqiao_ZhanChang_bg.png',
        skinName: "战场绝版"
       },
        战场绝版1: {
        name: 'skin_daxiaoqiao_ZhanChang1',
        x: [0, 0.5],
        y: [10, 0.3],
        scale: 0.5,
        background: 'skin_daxiaoqiao_ZhanChang_bg.png',
        skinName: "战场绝版"
       },
       },
      dengai: {
      五谷蕃盛2: {
        name: 'skin_dengai_WuGuFanSheng2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.75,
        background: 'skin_dengai_WuGuFanSheng_bg.png',
        skinName: "五谷蕃盛"
       },
      五谷蕃盛1: {
        name: 'skin_dengai_WuGuFanSheng1',
        x: [0, 0.35],
        y: [0, 0.2],
        scale: 0.55,
        background: 'skin_dengai_WuGuFanSheng_bg.png',
        skinName: "五谷蕃盛"
       },
      神兵天降: {
        name: 'skin_dengai_ShenBingTianJiang',
        x: [0, 0.73],
        y: [0, 0.28],
        scale: 0.65,
        //angle:10,
        action: 'DaiJi',
        background: 'skin_dengai_ShenBingTianJiang_bg.png',
        skinName: "神兵天降"
       },
       },
     dianwei: {
       武动乾坤2: {
        name: 'skin_dianwei_WuDongQianKun2',
        x: [0, 0.46],
        y: [0, 0.5],
        scale: 0.7,
        background: 'skin_dianwei_WuDongQianKun_bg.png',
        skinName: "武动乾坤"
      },
       怒目迫视2:{
		name: 'skin_dianwei_NuMuPoShi2',
		x: [0, 0.49],
		y: [0, 0.55],
		scale: 0.7,
		background: 'skin_dianwei_NuMuPoShi_bg.png',
 		skinName: "怒目迫视"
      },
	   怒目迫视1:{
		name: 'skin_dianwei_NuMuPoShi1',
		x: [0, 0.49],
		y: [0, 0.2],
		scale: 0.42,
		angle:-5,	
		background: 'skin_dianwei_NuMuPoShi_bg.png',
		skinName: "怒目迫视"
	  },
      武动乾坤1: {
        name: 'skin_dianwei_WuDongQianKun1',
        x: [0, 0.6],
        y: [5, 0.25],
        scale: 0.65,
        background: 'skin_dianwei_WuDongQianKun_bg.png',
        skinName: "武动乾坤"
      },
	  },
    diaochan: {
      文和乱武2: {
        name: 'skin_diaochan_WenHeLuanWu2',
        x: [0, 0.45],
        y: [0, 0.55],
        scale: 0.76,
        angle:-5,
        background: 'skin_diaochan_WenHeLuanWu_bg.png',
        skinName: "文和乱武"
      },
		战场绝版2: {
		name: 'skin_diaochan_ZhanChang2',
		x: [0, 0.5],
		y: [0, 0.5],
		scale: 0.8,
		background: 'skin_diaochan_ZhanChang_bg.png',
	  },
       花好月圆2: {
        name: 'skin_diaochan_HuaHaoYueYuan2',
        x: [0, 0.55],
        y: [0, 0.5],
        scale: 0.8,
        background: 'skin_diaochan_HuaHaoYueYuan_bg.png',
        skinName: "花好月圆"
      },
       玉婵仙子2: {
        name: 'skin_diaochan_YuChanXianZi2',
        x: [0, 0.43],
        y: [0, 0.5],
        scale: 0.76,
        background: 'skin_diaochan_YuChanXianZi_bg.png',
        skinName: "玉婵仙子"
      },
       新春鑫舞2: {
        name: 'skin_diaochan_XinChunXinWu2',
        x: [0, 0.44],
        y: [0, 0.5],
        scale: 0.85,
        background: 'skin_diaochan_XinChunXinWu_bg.png',
        skinName: "新春鑫舞"
      },
      文和乱武1: {
        name: 'skin_diaochan_WenHeLuanWu1',
        x: [0, 0.7],
        y: [0, 0.25],
        scale: 0.55,
        angle:-30,
        background: 'skin_diaochan_WenHeLuanWu_bg.png',
        skinName: "文和乱武"
      },
      花好月圆1: {
        name: 'skin_diaochan_HuaHaoYueYuan1',
        x: [0, 0.7],
        y: [0, 0.4],
        scale: 0.35,
        background: 'skin_diaochan_HuaHaoYueYuan_bg.png',
        skinName: "花好月圆"
      },
      玉婵仙子1: {
        name: 'skin_diaochan_YuChanXianZi1',
        x: [5, 0.5],
        y: [0, 0],
        scale: 0.6,
        background: 'skin_diaochan_YuChanXianZi_bg.png',
        skinName: "玉婵仙子"
      },
      新春鑫舞1: {
        name: 'skin_diaochan_XinChunXinWu1',
        x: [0, 0.1],
        y: [0, 0.2],
        scale: 0.5,
        background: 'skin_diaochan_XinChunXinWu_bg.png',
        skinName: "新春鑫舞"
       },
      绝世倾城: {
        name: 'skin_diaochan_JueShiQingCheng',
        x: [0, 0.55],
        y: [0, 0.35],
        scale: 0.4,
        action: 'DaiJi',
        background: 'skin_diaochan_JueShiQingCheng_bg.png',
        skinName: "绝世倾城"
      },
      鼠年七夕: {
        name: 'skin_diaochan_ShuNianQiXi',
        x: [0, 0.35],
        y: [0, 0.3],
        scale: 0.5,
        action: 'DaiJi',
        background: 'skin_diaochan_ShuNianQiXi_bg.png',
        skinName: "鼠年七夕"
      },
       驭魂千机: {
        name: 'skin_diaochan_YuHunQianJi',
        x: [0, 0.49],
        y: [0, 0.13],
        angle: 10,
        scale: 0.62,
        action: 'DaiJi',
        background: 'skin_diaochan_YuHunQianJi_bg.png',
        skinName: "驭魂千机"
       },
      绝世倾城1: {
        name: 'luo_diaochan_JueShiQingCheng',
        x: [0, 0.55],
        y: [0, 0.35],
        scale: 0.4,
        action: 'DaiJi',
        background: 'skin_diaochan_JueShiQingCheng_bg.png',
        luoName: "绝世倾城"
      },
      绝世倾城2: {
        name: 'luo_diaochan_JueShiQingCheng2',
        x: [0, 0.55],
        y: [0, 0.35],
        scale: 0.4,
        action: 'DaiJi',
        background: 'skin_diaochan_JueShiQingCheng_bg.png',
        luoName: "绝世倾城"
      },
      鼠年七夕2: {
        name: 'luo_diaochan_ShuNianQiXi',
        x: [0, 0.35],
        y: [0, 0.3],
        scale: 0.5,
        action: 'DaiJi',
        background: 'skin_diaochan_ShuNianQiXi_bg.png',
        luoName: "鼠年七夕"
      },
       驭魂千机2: {
        name: 'luo_diaochan_YuHunQianJi',
        x: [0, 0.49],
        y: [0, 0.13],
        angle: 10,
        scale: 0.62,
        action: 'DaiJi',
        background: 'skin_diaochan_YuHunQianJi_bg.png',
        luoName: "驭魂千机"
       },
       },
    dongbai: {
      娇俏伶俐2: {
        name: 'skin_dongbai_JiaoQiaoLingLi2',
        x: [0, 0.45],
        y: [0, 0.5],
        scale: 0.8,
        background: 'skin_dongbai_JiaoQiaoLingLi_bg.png',
        skinName: "娇俏伶俐"
        },
      娇俏伶俐1: {
        name: 'skin_dongbai_JiaoQiaoLingLi1',
        x: [30, 0.65],
        y: [5, 0.4],
        scale: 0.4,
        background: 'skin_dongbai_JiaoQiaoLingLi_bg.png',
        skinName: "娇俏伶俐"
        },
      猪年春节: {
        name: 'skin_dongbai_ZhuNianChunJie',
        x: [0, 0.73],
        y: [0, 0.33],
        scale: 0.65,
        //angle:10,
        action: 'DaiJi',
        background: 'skin_dongbai_ZhuNianChunJie_bg.png',
        skinName: "猪年春节"
      },
      猪年春节2: {
        name: 'luo_dongbai_ZhuNianChunJie',
        x: [0, 0.73],
        y: [0, 0.33],
        scale: 0.65,
        //angle:10,
        action: 'DaiJi',
        background: 'skin_dongbai_ZhuNianChunJie_bg.png',
        luoName: "猪年春节"
      },
        },
      dongzhuo: {
       文和乱武2: {
        name: 'skin_dongzhuo_WenHeLuanWu2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.8,
        background: 'skin_dongzhuo_WenHeLuanWu_bg.png',
        skinName: "文和乱武"
      },
       文和乱武1: {
        name: 'skin_dongzhuo_WenHeLuanWu1',
        x: [0, 0.2],
        y: [0, 0.27],
        scale: 0.52,
        background: 'skin_dongzhuo_WenHeLuanWu_bg.png',
        skinName: "文和乱武"
      },
      },
    fazheng: {
      戡律定科2: {
        name: 'skin_fazheng_KanLvDingKe2',
        x: [0, 0.46],
        y: [0, 0.54],
        scale: 0.7,
        background: 'skin_fazheng_KanLvDingKe_bg.png',
        skinName: "戡律定科"
      },
      恩怨如火2: {
        name: 'skin_fazheng_EnYuanRuHuo2',
        x: [0, 0.46],
        y: [0, 0.45],
        scale: 0.8,
        background: 'skin_fazheng_EnYuanRuHuo_bg.png',
        skinName: "恩怨如火"
      },
      戡律定科1: {
        name: 'skin_fazheng_KanLvDingKe1',
        x: [0, 0.15],
        y: [0, 0.4],
        scale: 0.35,
        background: 'skin_fazheng_KanLvDingKe_bg.png',
        skinName: "戡律定科"
      },
      恩怨如火1: {
        name: 'skin_fazheng_EnYuanRuHuo1',
        x: [0, 0.36],
        y: [0, 0.12],
        scale: 0.46,
        background: 'skin_fazheng_EnYuanRuHuo_bg.png',
        skinName: "恩怨如火"
       },
       },
     fanchou: {
       文和乱武1: {
        name: 'skin_fanchou_WenHeLuanWu1',
        x: [0, -0.05],
        y: [0, 0.31],
        scale: 0.56,
        background: 'skin_fanchou_WenHeLuanWu_bg.png',
        skinName: "文和乱武"
       },
       },
     fanyufeng: {
       斟酒入情2: {
        name: 'skin_fanyufeng_ZhenJiuRuQing2',
        x: [0, 0.45],
        y: [0, 0.55],
        scale: 0.7,
        background: 'skin_fanyufeng_ZhenJiuRuQing_bg.png',
        skinName: "斟酒入情"
      },
       斟酒入情1: {
        name: 'skin_fanyufeng_ZhenJiuRuQing1',
        x: [-55, 0.3],
        y: [5, 0.33],
        scale: 0.53,
        background: 'skin_fanyufeng_ZhenJiuRuQing_bg.png',
        skinName: "斟酒入情"
      },
      },
     fuhuanghou: {
       万福千灯2: {
        name: 'skin_fuhuanghou_WanFuQianDeng2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.8,
        background: 'skin_fuhuanghou_WanFuQianDeng_bg.png',
        skinName: "万福千灯"
      },
       战场绝版2: {
        name: 'skin_fuhuanghou_ZhanChang2',
        x: [0, 0.45],
        y: [0, 0.5],
        scale: 0.75,
        background: 'skin_fuhuanghou_ZhanChang_bg.png',
        skinName: "战场绝版"
      },
       万福千灯1: {
        name: 'skin_fuhuanghou_WanFuQianDeng1',
        x: [0, 0.9],
        y: [0, 0.35],
        scale: 0.58,
        background: 'skin_fuhuanghou_WanFuQianDeng_bg.png',
        skinName: "万福千灯"
       },
       战场绝版1: {
        name: 'skin_fuhuanghou_ZhanChang1',
        x: [0, 0.58],
        y: [0, 0.22],
        scale: 0.5,
        background: 'skin_fuhuanghou_ZhanChang_bg.png',
        skinName: "战场绝版"
      },
       长乐未央: {
        name: 'skin_fuhuanghou_ChangLeWeiYang1',
        x: [0, 0.3],
        y: [0, 0.26],
        scale: 0.5,
        background: 'skin_fuhuanghou_ChangLeWeiYang_bg.png',
        skinName: "长乐未央"
      },
      },
     ganning: {
        武动乾坤2: {
        name: 'skin_ganning_WuDongQianKun2',
        x: [0, 0.5],
        y: [0, 0.55],
        scale: 0.65,
        background: 'skin_ganning_WuDongQianKun_bg.png',
        skinName: "武动乾坤"
      },
      披星踏浪2: {
        name: 'skin_ganning_PiXingTaLang2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.75,
        background: 'skin_ganning_PiXingTaLang_bg.png',
        skinName: "披星踏浪"
      },
      武动乾坤1: {
        name: 'skin_ganning_WuDongQianKun1',
        x: [0, 0.36],
        y: [0, 0.25],
        scale: 0.5,
        angle: -15,
        background: 'skin_ganning_WuDongQianKun_bg.png',
        skinName: "武动乾坤"
      },
      披星踏浪1: {
        name: 'skin_ganning_PiXingTaLang1',
        x: [0, 0.45],
        y: [0, 0.26],
        scale: 0.5,
        angle: 8,
        background: 'skin_ganning_PiXingTaLang_bg.png',
        skinName: "披星踏浪"
       },
       手杀: {
        name: 'skin_xingganning_ShouSha',
        x: [0, 1.15],
        y: [0, 0.4],
        scale: 0.38,
        angle: -20,
        action: 'DaiJi',
        background: 'skin_xingganning_ShouSha_bg.png',
        skinName: "手杀"
      },
      肝胆相照: {
        name: 'skin_xingganning_GanDanXiangZhao',
        x: [0, 0.68],
        y: [0, -0.3],
        scale: 0.73,
        action: 'DaiJi',
        background: 'skin_xingganning_GanDanXiangZhao_bg.png',
        skinName: "肝胆相照"
       },
      星甘宁: {
        name: 'skin_xingganning_YXSG',
        x: [0, 1.05],
        y: [0, 0.36],
        scale: 0.38,
        angle: -20,
        action: 'DaiJi',
        background: 'skin_xingganning_YXSG_bg.png',
        skinName: "星甘宁"
      },
       },
    gongsunyuan: {
      逐鹿天下2: {
        name: 'skin_gongsunyuan_ZhuLuTianXia2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.75,
        background: 'skin_gongsunyuan_ZhuLuTianXia_bg.png',
        skinName: "逐鹿天下"
       },
      逐鹿天下1: {
        name: 'skin_gongsunyuan_ZhuLuTianXia1',
        x: [0, 0.11],
        y: [0, 0.35],
        scale: 0.42,
        background: 'skin_gongsunyuan_ZhuLuTianXia_bg.png',
        skinName: "逐鹿天下"
       },
       },
    guanyu: {
      飞龙在天2: {
        name: 'skin_guanyu_FeiLongZaiTian2',
        x: [0, 0.48],
        y: [0, 0.55],
        scale: 0.7,
        background: 'skin_guanyu_FeiLongZaiTian_bg.png',
        skinName: "飞龙在天"
      },
      武动乾坤2: {
        name: 'skin_guanyu_WuDongQianKun2',
        x: [0, 0.36],
        y: [0, 0.53],
        scale: 0.7,
        background: 'skin_guanyu_WuDongQianKun_bg.png',
        skinName: "武动乾坤"
      },
      武动乾坤1: {
        name: 'skin_guanyu_WuDongQianKun1',
        x: [0, 0.7],
        y: [0, 0.2],
        scale: 0.5,
        background: 'skin_guanyu_WuDongQianKun_bg.png',
        skinName: "武动乾坤"
      },
      飞龙在天1: {
        name: 'skin_guanyu_FeiLongZaiTian1',
        x: [0, 0.8],
        y: [0, 0.45],
        scale: 0.37,
        angle:-5,
        background: 'skin_guanyu_FeiLongZaiTian_bg.png',
        skinName: "飞龙在天"
      },
       啸风从龙: {
        name: 'skin_guanyu_XiaoFengCongLong',
        x: [0, 0.2],
        y: [0, 0.4],
        scale: 0.40,
        action: 'DaiJi',
        background: 'skin_guanyu_XiaoFengCongLong_bg.png',
        skinName: "啸风从龙"
      },
      }, 
     guansuo: {
       万花簇威2: {
        name: 'skin_guansuo_WanHuaCuWei2',
        x: [0, 0.48],
        y: [0, 0.54],
        scale: 0.7,
        background: 'skin_guansuo_WanHuaCuWei_bg.png',
        skinName: "万花簇威"
      },
       万花簇威1: {
        name: 'skin_guansuo_WanHuaCuWei1',
        x: [0, 0.33],
        y: [0, 0.2],
        scale: 0.47,
        background: 'skin_guansuo_WanHuaCuWei_bg.png',
        skinName: "万花簇威"
        },
      原皮: {
        name: 'skin_guansuo',
        x: [0, 1.65],
        y: [0, 0.3],
        scale: 0.39,
        background: 'skin_guansuo_WanHuaCuWei_bg.png',
        skinName: "原皮"
       },
      鼠年中秋: {
        name: 'skin_guansuo_ShuNianZhongQiu',
        x: [0, -0.1],
        y: [0, 0.1],
        scale: 0.55,
        //angle:-9,
        action: 'DaiJi',
        background: 'skin_guansuo_ShuNianZhongQiu_bg.png',
        skinName: "鼠年中秋"
       },
       },
      guanyinping: {
       巾帼花武2: {
        name: 'skin_guanyinping_JingGuoHuaWu2',
        x: [0, 0.53],
        y: [0, 0.53],
        scale: 0.74,
        background: 'skin_guanyinping_JingGuoHuaWu_bg.png',
        skinName: "巾帼花武"
      },
        战场绝版2: {
        name: 'skin_guanyinping_ZhanChang2',
        x: [0, 0.53],
        y: [0, 0.5],
        scale: 0.76,
        background: 'skin_guanyinping_ZhanChang_bg.png',
        skinName: "战场绝版"
      },
        战场绝版1: {
        name: 'skin_guanyinping_ZhanChang1',
        x: [0, -0.23],
        y: [0, 0.35],
        scale: 0.6,
        angle: 18,
        background: 'skin_guanyinping_ZhanChang_bg.png',
        skinName: "战场绝版"
      },
       鼠年中秋: {
        name: 'skin_guanyinping_ShuNianZhongQiu',
        x: [0, 1.3],
        y: [5, 0.48],
        scale: 0.6,
        angle: 20,
        action: 'DaiJi',
        background: 'skin_guanyinping_ShuNianZhongQiu_bg.png',
        skinName: "鼠年中秋"
      },
       鼠年中秋2: {
        name: 'luo_guanyinping_ShuNianZhongQiu',
        x: [0, 1.3],
        y: [5, 0.48],
        scale: 0.6,
        angle: 20,
        action: 'DaiJi',
        background: 'skin_guanyinping_ShuNianZhongQiu_bg.png',
        luoName: "鼠年中秋"
      },
      },
    guohuanghou: {
      心系君魂2: {
        name: 'skin_guohuanghou_XinXiJunHun2',
        x: [0, 0.44],
        y: [0, 0.5],
        scale: 0.75,
        background: 'skin_guohuanghou_XinXiJunHun_bg.png',
        skinName: "心系君魂"
      },
       情意相投2: {
        name: 'skin_guohuanghou_QingYiXiangTou2',
        x: [0, 0.42],
        y: [0, 0.5],
        scale: 0.77,
        background: 'skin_guohuanghou_QingYiXiangTou_bg.png',
        skinName: "情意相投"
      },
       情意相投1: {
        name: 'skin_guohuanghou_QingYiXiangTou1',
        x: [0, 0.7],
        y: [0, 0.6],
        scale: 0.57,
        background: 'skin_guohuanghou_QingYiXiangTou_bg.png',
        skinName: "情意相投"
      },
       心系君魂1: {
        name: 'skin_guohuanghou_XinXiJunHun1',
        x: [0, 0.4],
        y: [0, 0.3],
        scale: 0.45,
        background: 'skin_guohuanghou_XinXiJunHun_bg.png',
        skinName: "心系君魂"
      },
      },
      guojia: { 
       一世风华2: {
        name: 'skin_guojia_YiShiFengHua2',
        x: [0, 0.5],
        y: [5, 0.5],
        scale: 0.75,
        background: 'skin_guojia_YiShiFengHua_bg.png',
        skinName: "一世风华"
      },
       谋定天下2: {
        name: 'skin_guojia_MouDingTianXia2',
        x: [0, 0.45],
        y: [0, 0.55],
        scale: 0.7,
        background: 'skin_guojia_MouDingTianXia_bg.png',
        skinName: "谋定天下"
       },
        风雅清韵2: {
        name: 'skin_guojia_FengYaQingYun2',
        x: [0, 0.4],
        y: [5, 0.52],
        scale: 0.74,
        background: 'skin_guojia_FengYaQingYun_bg.png',
        skinName: "风雅清韵"
      },
       风雅清韵1: {
        name: 'skin_guojia_FengYaQingYun1',
        x: [0, 0.4],
        y: [0, 0.4],
        scale: 0.4,
        background: 'skin_guojia_FengYaQingYun_bg.png',
        skinName: "风雅清韵"
      },
       一世风华1: {
        name: 'skin_guojia_YiShiFengHua1',
        x: [0, 0.8],
        y: [5, 0.4],
        scale: 0.35,
        background: 'skin_guojia_YiShiFengHua_bg.png',
        skinName: "一世风华"
      },
       谋定天下1: {
        name: 'skin_guojia_MouDingTianXia1',
        x: [0, 0.45],
        y: [0, 0.35],
        scale: 0.45,
        background: 'skin_guojia_MouDingTianXia_bg.png',
        skinName: "谋定天下"
       }, 
      十胜十败: {
        name: 'skin_guojia_ShiShengShiBai',
        x: [0, 0.22],
        y: [0, 0.12],
        scale: 0.55,
        //angle:10,
        action: 'DaiJi',
        background: 'skin_guojia_ShiShengShiBai_bg.png',
        skinName: "十胜十败"
      },
       暗香疏影: {
        name: 'skin_guojia_AnXiangShuYing',
        x: [0, 0.9],
        y: [0, 0.4],
        scale: 0.4,
        //angle:10,
        action: 'DaiJi',
        background: 'skin_guojia_AnXiangShuYing_bg.png',
       },
       },
      guosi: {
       文和乱武2: {
        name: 'skin_guosi_WenHeLuanWu2',
        x: [0, 0.39],
        y: [0, 0.51],
        scale: 0.81,
        background: 'skin_guosi_WenHeLuanWubg.png',
        skinName: "文和乱武"
      },
       文和乱武1: {
        name: 'skin_guosi_WenHeLuanWu1',
        x: [0, 0.58],
        y: [0, 0.38],
        scale: 0.42,
        background: 'skin_guosi_WenHeLuanWu_bg.png',
        skinName: "文和乱武"
       },
       },
     guozhao: {
       雍容尊雅2: {
        name: 'skin_guozhao_YongRongZunYa2',
        x: [0, 0.5],
        y: [0, 0.55],
        scale: 0.74,
        background: 'skin_guozhao_YongRongZunYa_bg.png',
        skinName: "雍容尊雅"
       },
       雍容尊雅1: {
        name: 'skin_guozhao_YongRongZunYa1',
        x: [-80, 0.58],
        y: [8, 0.3],
        scale: 0.56,
        background: 'skin_guozhao_YongRongZunYa_bg.png',
        skinName: "雍容尊雅"
       },
       },
      haozhao: {
      万军之拒2: {
        name: 'skin_haozhao_WanJunZhiJu2',
        x: [0, 0.48],
        y: [0, 0.51],
        scale: 0.74,
        background: 'skin_haozhao_WanJunZhiJu_bg.png',
        skinName: "万军之拒"
       },
      万军之拒1: {
        name: 'skin_haozhao_WanJunZhiJu1',
        x: [0, 0.39],
        y: [0, 0.51],
        scale: 0.5,
        background: 'skin_haozhao_WanJunZhiJu_bg.png',
        skinName: "万军之拒"
       },
       手杀: {
        name: 'skin_haozhao_ShousSha',
        x: [0, 0.52],
        y: [0, 0.16],
        scale: 0.51,
        action:"DaiJi",
        angle: 0,
        background: 'skin_haozhao_ShousSha_bg.png',
        skinName: "手杀"
       },
       },
     huatuo: {
       仙山游医2: {
        name: 'skin_huatuo_XianShanYouYi2',
        x: [0, 0.49],
        y: [0, 0.5],
        scale: 0.8,
        background: 'skin_huatuo_XianShanYouYi_bg.png',
        skinName: "仙山游医"
      },
       仙山游医1: {
        name: 'skin_huatuo_XianShanYouYi1',
        x: [0, 0.39],
        y: [0, 0.24],
        scale: 0.48,
        background: 'skin_huatuo_XianShanYouYi_bg.png',
        skinName: "仙山游医"
       },
       },
     huaxiong: {
       斩将攫石2: {
        name: 'skin_huaxiong_ZhanJiangJueShi2',
        x: [0, 0.4],
        y: [0, 0.5],
        scale: 0.75,
        background: 'skin_huaxiong_ZhanJiangJueShi_bg.png',
        skinName: "斩将攫石"
      },
      斩将攫石1: {
        name: 'skin_huaxiong_ZhanJiangJueShi1',
        x: [0, 0.45],
        y: [0, 0.32],
        scale: 0.47,
        angle: 15,
        background: 'skin_huaxiong_ZhanJiangJueShi_bg.png',
        skinName: "斩将攫石"
      },
      },
     huaman: {
       花俏蛮娇2: {
        name: 'skin_huaman_HuaQiaoManJiao2',
        x: [0, 0.5],
        y: [0, 0.45],
        scale: 0.84,
        background: 'skin_huaman_HuaQiaoManJiao_bg.png',
        skinName: "花俏蛮娇"
      },
       花俏蛮娇1: {
        name: 'skin_huaman_HuaQiaoManJiao1',
        x: [0, 0.32],
        y: [0, 0.3],
        scale: 0.45,
        background: 'skin_huaman_HuaQiaoManJiao_bg.png',
        skinName: "花俏蛮娇"
       },
       原皮: {
        name: 'skin_huaman',
        x: [0, 1.8],
        y: [0, 0.2],
        scale: 0.45,
        angle:-15,
        background: 'skin_huaman_HuaQiaoManJiao_bg.png',
        skinName: "原皮"
      }
      },
      hetaihou: {
       鸩毒除患2: {
        name: 'skin_hetaihou_ZhenDuChuHuan2',
        x: [0, 0.5],
        y: [0, 0.58],
        scale: 0.75,
        background: 'skin_hetaihou_ZhenDuChuHuan_bg.png',
        skinName: "鸩毒除患"
        },
	耀紫迷幻1:{
	name: 'skin_hetaihou_YaoZiMiHuan1',
	x: [0, 0.5],
	y: [0, 0.5],
	scale: 0.8,
	background: 'skin_hetaihou_YaoZiMiHuan_bg.png',
	skinName: "耀紫迷幻"
        },
        鸩毒除患1: {
        name: 'skin_hetaihou_ZhenDuChuHuan1',
        x: [0, 0.35],
        y: [0, 0.4],
        scale: 0.4,
        background: 'skin_hetaihou_ZhenDuChuHuan_bg.png',
        skinName: "鸩毒除患"
        },
      蛇蝎为心:{
		name: 'skin_hetaihou_SheXieWeiXin',
		x: [-50, 0.5],
		y: [10, 0.1],
		scale: 0.46,
		angle: 27,
		action: 'DaiJi',
		clipSlots: ['wangzuo', 'bu2', 'bu3'],
		background: 'skin_hetaihou_SheXieWeiXin_bg.png',
        skinName: "蛇蝎为心"
      },
      蛇蝎为心1:{
		name: 'luo_hetaihou_SheXieWeiXin',
		x: [-50, 0.5],
		y: [10, 0.1],
		scale: 0.46,
		angle: 27,
		action: 'DaiJi',
		clipSlots: ['wangzuo', 'bu2', 'bu3'],
		background: 'skin_hetaihou_SheXieWeiXin_bg.png',
        luoName: "蛇蝎为心"
      },
        },
      huanggai: {
       武动乾坤2: {
        name: 'skin_huanggai_WuDongQianKun2',
        x: [0, 0.45],
        y: [0, 0.5],
        scale: 0.8,
        background: 'skin_huanggai_WuDongQianKun_bg.png',
        skinName: "武动乾坤"
      },
	    破天焚舰2:{
		name: 'skin_huanggai_PoTianFenJian2',
		x: [0, 0.4],
		y: [0, 0.55],
		scale: 0.75,
		background: 'skin_huanggai_PoTianFenJian_bg.png',
      },
        武动乾坤1: {
        name: 'skin_huanggai_WuDongQianKun1',
        x: [0, 0.55],
        y: [0, 0.45],
        scale: 0.48,
        angle: 10,
        background: 'skin_huanggai_WuDongQianKun_bg.png',
        skinName: "武动乾坤"
      },
	    破天焚舰1:{
		name: 'skin_huanggai_PoTianFenJian1',
		x: [0, 0.85],
		y: [0, 0.35],
		scale: 0.5,	
		background: 'skin_huanggai_PoTianFenJian_bg.png',
      },
       鏖战赤壁: {
        name: 'skin_huanggai_AoZhanChiBi',
        x: [0, 0.55],
        y: [0, 0.4],
        scale: 0.55,
        angle:-15,
        action: 'DaiJi',
        background: 'skin_huanggai_AoZhanChiBi_bg.png',
        skinName: "鏖战赤壁"
      },
      },
    huangyueying: {
      明智春馨2: {
       name: 'skin_huangyueying_MingZhiChunXin2',
       x: [0, 0.5],
       y: [0, 0.5],
       scale: 0.8,
       background: 'skin_huangyueying_MingZhiChunXin_bg.png',
        skinName: "明智春馨"
      },
       七窍玲珑2: {
        name: 'skin_huangyueying_QiQiaoLingLong2',
        x: [0, 0.4],
        y: [0, 0.53],
        scale: 0.75,
        background: 'skin_huangyueying_QiQiaoLingLong_bg.png',
        skinName: "七窍玲珑"
      },
       花好月圆2: {
        name: 'skin_huangyueying_HuaHaoYueYuan2',
        x: [0, 0.5],
        y: [0, 0.52],
        scale: 0.75,
        background: 'skin_huangyueying_HuaHaoYueYuan_bg.png',
        skinName: "花好月圆"
      },
       明智春馨1: {
       name: 'skin_huangyueying_MingZhiChunXin1',
       x: [0, 0.85],
       y: [0, 0.3],
       scale: 0.65,
       background: 'skin_huangyueying_MingZhiChunXin_bg.png',
        skinName: "明智春馨"
      },
       七窍玲珑1: {
        name: 'skin_huangyueying_QiQiaoLingLong1',
        x: [0, 0.4],
        y: [0, 0.33],
        scale: 0.42,
        background: 'skin_huangyueying_QiQiaoLingLong_bg.png',
        skinName: "七窍玲珑"
      },
       花好月圆1: {
        name: 'skin_huangyueying_HuaHaoYueYuan1',
        x: [0, 0.9],
        y: [0, 0.25],
        scale: 0.42,
        background: 'skin_huangyueying_HuaHaoYueYuan_bg.png',
        skinName: "花好月圆"
       },
      明良千古: {
        name: 'skin_huangyueying_MingLiangQianGu',
        x: [5, -0.35],
        y: [0, 0.2],
        scale: 0.45,
        action: 'DaiJi',
        background: 'skin_huangyueying_MingLiangQianGu_bg.png',
        skinName: "明良千古"
      },
      木牛流马: {
        name: 'skin_huangyueying_MuNiuLiuMa',
        action: 'DaiJi',
        x: [-20, 0.5],
        y: [0, 0.3],
        scale: 0.53,
        action: 'DaiJi',
        background: 'skin_huangyueying_MuNiuLiuMa_bg.png',
        skinName: "木牛流马"
      },
       鼠年春节: {
        name: 'skin_huangyueying_ShuNianChunJie',
        x: [0, 0.75],
        y: [0, 0.22],
        scale: 0.55,
        action: 'DaiJi',
        background: 'skin_huangyueying_ShuNianChunJie_bg.png',
        skinName: "鼠年春节"
      },
       持智思耀2: {
        name: 'skin_huangyueying_ChiZhiSiYao2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.78,
        background: 'skin_huangyueying_ChiZhiSiYao_bg.png',
        skinName: "持智思耀"
      },
       持智思耀1: {
        name: 'skin_huangyueying_ChiZhiSiYao1',
        x: [0, 1.05],
        y: [0, 0.5],
        scale: 0.45,
        background: 'skin_huangyueying_ChiZhiSiYao_bg.png',
        skinName: "持智思耀"
      },
      木牛流马2: {
        name: 'luo_huangyueying_MuNiuLiuMa',
        action: 'DaiJi',
        x: [-20, 0.5],
        y: [0, 0.3],
        scale: 0.53,
        action: 'DaiJi',
        background: 'skin_huangyueying_MuNiuLiuMa_bg.png',
        luoName: "木牛流马"
      },
       鼠年春节2: {
        name: 'luo_huangyueying_ShuNianChunJie',
        x: [0, 0.75],
        y: [0, 0.22],
        scale: 0.55,
        action: 'DaiJi',
        background: 'skin_huangyueying_ShuNianChunJie_bg.png',
        luoName: "鼠年春节"
      },
      },
     huangzhong: {
       武动乾坤2: {
        name: 'skin_huangzhong_WuDongQianKun2',
        x: [0, 0.46],
        y: [0, 0.54],
        scale: 0.7,
        background: 'skin_huangzhong_WuDongQianKun_bg.png',
        skinName: "武动乾坤"
      },
      没金饮羽2: {
        name: 'skin_huangzhong_MoJinYinYu2',
        x: [0, 0.47],
        y: [0, 0.53],
        scale: 0.7,
        background: 'skin_huangzhong_MoJinYinYu_bg.png',
        skinName: "没金饮羽"
      },
      武动乾坤1: {
        name: 'skin_huangzhong_WuDongQianKun1',
        x: [0, 1.15],
        y: [0, 0.3],
        scale: 0.55,
        background: 'skin_huangzhong_WuDongQianKun_bg.png',
        skinName: "武动乾坤"
      },
      没金饮羽1: {
        name: 'skin_huangzhong_MoJinYinYu1',
        x: [0, 0.7],
        y: [0, -0.1],
        scale: 0.6,
        background: 'skin_huangzhong_MoJinYinYu_bg.png',
        skinName: "没金饮羽"
       },
       },
      jianggan: {
      千帆征战2: {
        name: 'skin_jianggan_QianFanZhengZhan2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.75,
        background: 'skin_jianggan_QianFanZhengZhan_bg.png',
        skinName: "千帆征战"
       },
      千帆征战1: {
        name: 'skin_jianggan_QianFanZhengZhan1',
        x: [0, 0.05],
        y: [0, 0.4],
        scale: 0.58,
        background: 'skin_jianggan_QianFanZhengZhan_bg.png',
        skinName: "千帆征战"
       },
       },
      jiangwei: {
      烽火乱世2: {
        name: 'skin_jiangwei_FengHuoLuanShi2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.75,
        background: 'skin_jiangwei_FengHuoLuanShi_bg.png',
        skinName: "烽火乱世"
       },
      烽火乱世1: {
        name: 'skin_jiangwei_FengHuoLuanShi1',
        x: [0, 0.05],
        y: [0, 0.15],
        scale: 0.475,
        background: 'skin_jiangwei_FengHuoLuanShi_bg.png',
        skinName: "烽火乱世"
       },
      护战天水2: {
        name: 'skin_jiangwei_HuZhanTianShui2',
        x: [0, 0.5],
        y: [0, 0.55],
        scale: 0.7,
        background: 'skin_jiangwei_HuZhanTianShui_bg.png',
        skinName: "护战天水"
       },
      护战天水1: {
        name: 'skin_jiangwei_HuZhanTianShui1',
        x: [0, 0.5],
        y: [0, 0.2],
        scale: 0.5,
        background: 'skin_jiangwei_HuZhanTianShui_bg.png',
        skinName: "护战天水"
       },
       },
     jiaxu: {
       谋定天下2: {
        name: 'skin_jiaxu_MouDingTianXia2',
        x: [0, 0.45],
        y: [0, 0.52],
        scale: 0.74,
        background: 'skin_jiaxu_MouDingTianXia_bg.png',
        skinName: "谋定天下"
      },
       文和乱武2: {
        name: 'skin_jiaxu_WenHeLuanWu2',
        x: [0, 0.5],
        y: [0, 0.58],
        scale: 0.8,
        background: 'skin_jiaxu_WenHeLuanWu_bg.png',
        skinName: "文和乱武"
      },
      控魂驱魄2: {
        name: 'skin_jiaxu_KongHunQuPo2',
        x: [0, 0.52],
        y: [0, 0.5],
        scale: 0.67,
        background: 'skin_jiaxu_KongHunQuPo_bg.png',
        skinName: "控魂驱魄"
       },
      文和乱武1: {
        name: 'skin_jiaxu_WenHeLuanWu1',
        x: [0, 0.45],
        y: [0, 0.3],
        scale: 0.45,
        background: 'skin_jiaxu_WenHeLuanWu_bg.png',
        skinName: "文和乱武"
      },
      谋定天下1: {
        name: 'skin_jiaxu_MouDingTianXia1',
        x: [0, 0.45],
        y: [0, 0.57],
        scale: 0.54,
        background: 'skin_jiaxu_MouDingTianXia_bg.png',
        skinName: "谋定天下"
      },
      控魂驱魄1: {
        name: 'skin_jiaxu_KongHunQuPo1',
        x: [0, 0.3],
        y: [0, 0.1],
        scale: 0.7,
        background: 'skin_jiaxu_KongHunQuPo_bg.png',
        skinName: "控魂驱魄"
       },
       },
      kongrong: {
       重阳闲趣2: {
        name: 'skin_kongrong_ChongYangXianQu2',
        x: [0, 0.51],
        y: [5, 0.4],
        scale: 0.8,
        background: 'skin_kongrong_ChongYangXianQu_bg.png',
        skinName: "重阳闲趣"
      },
       重阳闲趣1: {
        name: 'skin_kongrong_ChongYangXianQu1',
        x: [0, 1.45],
        y: [0, 0.35],
        scale: 0.6,
        background: 'skin_kongrong_ChongYangXianQu_bg.png',
        skinName: "重阳闲趣"
       },
       },
        lijue: {
       文和乱武2: {
        name: 'skin_lijue_WenHeLuanWu2',
        x: [0, 0.46],
        y: [0, 0.5],
        scale: 0.78,
        background: 'skin_lijue_WenHeLuanWu_bg.png',
        skinName: "文和乱武"
       },
       文和乱武1: {
        name: 'skin_lijue_WenHeLuanWu1',
        x: [0, 0.3],
        y: [0, 0.31],
        scale: 0.55,
        background: 'skin_lijue_WenHeLuanWu_bg.png',
        skinName: "文和乱武"
       },
       },
        liru:{
		烈火焚城2:{
		name: 'skin_liru_LieHuoFenCheng2',
		x: [0, 0.45],
		y: [0, 0.53],
		scale: 0.7,
        background: 'skin_liru_LieHuoFenCheng_bg.png',
	   },
		烈火焚城1:{
		name: 'skin_liru_LieHuoFenCheng1',
		x: [0, 0.4],
		y: [0, 0.3],
		scale: 0.4,
        background: 'skin_liru_LieHuoFenCheng_bg.png',
	   },
       鸩杀少帝: {
        name: 'skin_liru_ZhenShaShaoDi',
        x: [0, 0.2],
        y: [0, 0.13],
        scale: 0.55,
        angle: 10,
        background: 'skin_liru_ZhenShaShaoDi_bg.png',
        action: 'DaiJi',
        skinName: "鸩杀少帝"
      },
      },
     lingju: {
       舞魅蛊心2: {
        name: 'skin_lingju_JinZhiYuYe2',
        x: [0, 0.55],
        y: [0, 0.5],
        scale: 0.75,
        angle:10,
        background: 'skin_lingju_JinZhiYuYe_bg.png',
        skinName: "舞魅蛊心"
       },
       魂牵梦萦: {
        name: 'skin_lingju_HunQianMengYing',
        x: [0, 1.2],
        y: [0, 0.1],
        scale: 0.6,
        background: 'skin_lingju_1bg.png',
        skinName: "魂牵梦萦"
      },
       魂牵梦萦2: {
        name: 'luo_lingju_HunQianMengYing',
        x: [0, 1.2],
        y: [0, 0.1],
        scale: 0.6,
        background: 'skin_lingju_1_bg.png',
        luoName: "魂牵梦萦"
      },
       },
      lingtong: {
       乘风破浪2: {
        name: 'skin_lingtong_ChengFengPoLang2',
        x: [0, 0.48],
        y: [0, 0.5],
        scale: 0.78,
        //angle: -12,
        background: 'skin_lingtong_ChengFengPoLang_bg.png',
        skinName: "乘风破浪"
       },
       乘风破浪1: {
        name: 'skin_lingtong_ChengFengPoLang1',
        x: [0, 1.88],
        y: [0, -0.12],
        scale: 1.0,
        angle: -12,
        background: 'skin_lingtong_ChengFengPoLang_bg.png',
        skinName: "乘风破浪"
       },
       },
     liubei: {
       英杰汇聚2: {
        name: 'skin_liubei_YingJieHuiJu2',
        x: [0, 0.44],
        y: [0, 0.48],
        scale: 0.77,
        background: 'skin_liubei_YingJieHuiJu_bg.png',
        skinName: "英杰汇聚"
      },
      六星耀帝2: {
        name: 'skin_liubei_LiuXingYaoDi2',
        x: [0, 0.42],
        y: [0, 0.53],
        scale: 0.8,
        background: 'skin_liubei_LiuXingYaoDi_bg.png',
        skinName: "六星耀帝"
      },
       英杰汇聚1: {
        name: 'skin_liubei_YingJieHuiJu1',
        x: [0, 1.35],
        y: [0, 0.58],
        scale: 0.55,
        background: 'skin_liubei_YingJieHuiJu_bg.png',
        skinName: "英杰汇聚"
      },
      六星耀帝1: {
        name: 'skin_liubei_LiuXingYaoDi1',
        x: [0, 0.48],
        y: [0, 0.25],
        scale: 0.475,
        background: 'skin_liubei_LiuXingYaoDi_bg.png',
        skinName: "六星耀帝"
      },
      明良千古: {
        name: 'skin_liubei_MingLiangQianGu',
        x: [15, 1.0],
        y: [-5, 0.15],
        scale: 0.45,
        angle: 5,
        action: 'DaiJi',
        background: 'skin_liubei_MingLiangQianGu_bg.png',
        skinName: "明良千古"
      },
      龙骧麟振: {
        name: 'skin_liubei_LongXiangLinZhen',
        x: [0, 0.4],
        y: [0, 0.25],
        scale: 0.5,
        //angle:-15,
        action: 'DaiJi',
        background: 'skin_liubei_LongXiangLinZhen_bg.png',
        skinName: "龙骧麟振"
      },
      猪年圣诞: {
        name: 'skin_liubei_ZhuNianShengDan',
        x: [0, 0.22],
        y: [0, 0.22],
        scale: 0.45,
        //angle:-15,
        action: 'DaiJi',
        background: 'skin_liubei_ZhuNianShengDan_bg.png',
        skinName: "猪年圣诞"
      },
      },
      ol_liushan: {
      虚拟天团2: {
        name: 'skin_liushan_XuNiTianTuan2',
        x: [0, 0.52],
        y: [0, 0.5],
        scale: 0.75,
        //angle: -10,
        background: 'skin_liushan_XuNiTianTuan_bg.png',
        skinName: "虚拟天团"
       },
      虚拟天团1: {
        name: 'skin_liushan_XuNiTianTuan1',
        x: [0, 1.12],
        y: [0, 0.5],
        scale: 0.38,
        //angle: -10,
        background: 'skin_liushan_XuNiTianTuan_bg.png',
        skinName: "虚拟天团"
       },
       猪年端午: {
        name: 'skin_liushan_ZhuNianDuanWu',
        x: [0, 0.4],
        y: [5, 0.35],
        scale: 0.54,
        background: 'skin_liushan_ZhuNianDuanWu_bg.png',
        action: 'DaiJi',
        skinName: "猪年端午"
       },
       },     
      liufeng: {
      立嗣陷危2: {
        name: 'skin_liufeng_LiSiXianWei2',
        x: [0, 0.58],
        y: [0, 0.6],
        scale: 0.85,
        background: 'skin_liufeng_LiSiXianWei_bg.png',
        skinName: "立嗣陷危"
       },
      立嗣陷危1: {
        name: 'skin_liufeng_LiSiXianWei1',
        x: [0, 0.75],
        y: [0, 0.6],
        scale: 0.378,
        angle: -10,
        background: 'skin_liufeng_LiSiXianWei_bg.png',
        skinName: "立嗣陷危"
       },
       },  
      liubiao: {
      柔情钰露2: {
        name: 'skin_liubiao_RouQingYuLu2',
        x: [0, 0.45],
        y: [0, 0.5],
        scale: 0.75,
        background: 'skin_liubiao_RouQingYuLu_bg.png',
        skinName: "柔情钰露"
       },
      柔情钰露1: {
        name: 'skin_liubiao_RouQingYuLu1',
        x: [0, 0.42],
        y: [0, 0.15],
        scale: 0.65,
        background: 'skin_liubiao_RouQingYuLu_bg.png',
        skinName: "柔情钰露"
       },
       },
    liubian: {
      福泽金蕊2: {
        name: 'skin_liubian_FuZeJinRui2',
        x: [0, 0.5],
        y: [0, 0.45],
        scale: 0.8,
        background: 'skin_liubian_FuZeJinRui_bg.png',
        skinName: "福泽金蕊"
      },
      少帝龙威2: {
        name: 'skin_liubian_ShaoDiLongWei2',
        x: [0, 0.45],
        y: [0, 0.53],
        scale: 0.75,
        background: 'skin_liubian_ShaoDiLongWei_bg.png',
        skinName: "少帝龙威"
      },
      福泽金蕊1: {
        name: 'skin_liubian_FuZeJinRui1',
        x: [0, 1.2],
        y: [0, 0.5],
        scale: 0.37,
        //angle: 5,
        background: 'skin_liubian_FuZeJinRui_bg.png',
        skinName: "福泽金蕊"
      },
      少帝龙威1: {
        name: 'skin_liubian_ShaoDiLongWei1',
        x: [0, 0.42],
        y: [5, 0.02],
        scale: 0.76,
        background: 'skin_liubian_ShaoDiLongWei_bg.png',
        skinName: "少帝龙威"
      },
      },
    liuxie: {
	   凤历迎春2:{
		name: 'skin_liuxie_FengLiYingChun2',
		x: [0, 0.5],
		y: [0, 0.48],
		scale: 0.76,
		background: 'skin_liuxie_FengLiYingChun_bg.png',
		skinName: "凤历迎春"
	  },
	  困龙欲出2:{
		name: 'skin_liuxie_KunLongYuChu2',
		x: [0, 0.46],
		y: [0, 0.46],
		scale: 0.75,
		background: 'skin_liuxie_KunLongYuChu_bg.png',
		skinName: "困龙欲出"
	  },
	   万福千灯2:{
		name: 'skin_liuxie_WanFuQianDeng2',
		x: [0, 0.51],
		y: [0, 0.55],
		scale: 0.74,
		background: 'skin_liuxie_WanFuQianDeng_bg.png',
		skinName: "万福千灯"
	  },
       汉末龙裔2: {
        name: 'skin_liuxie_HanMoLongYi2',
        x: [0, 0.48],
        y: [0, 0.5],
        scale: 0.76,
        background: 'skin_liuxie_HanMoLongYi_bg.png',
        skinName: "汉末龙裔"
      },
	   困龙欲出1:{
		name: 'skin_liuxie_KunLongYuChu1',
		x: [0, 0.4],
		y: [0, 0.2],
		scale: 0.65,
		background: 'skin_liuxie_KunLongYuChu_bg.png',
		skinName: "困龙欲出"
	  },
	   万福千灯1:{
		name: 'skin_liuxie_WanFuQianDeng1',
		x: [0, 1],
		y: [0, 0.3],
		scale: 0.56,
		angle: -5,
		background: 'skin_liuxie_WanFuQianDeng_bg.png',
		skinName: "万福千灯"
	  },
       汉末龙裔1: {
        name: 'skin_liuxie_HanMoLongYi1',
        x: [0, 0.6],
        y: [0, 0.5],
        scale: 0.45,
        background: 'skin_liuxie_HanMoLongYi_bg.png',
        skinName: "汉末龙裔"
      },
      龙困于渊: {
        name: 'skin_liuxie_LongKunYuYuan',
        x: [0, 0.28],
        y: [0, 0.35],
        scale: 0.5,
        action: 'DaiJi',
        background: 'skin_liuxie_LongKunYuYuan_bg.png',
        skinName: "龙困于渊"
      },
      },
    liuyan: {
      逐鹿天下2: {
         name: 'skin_liuyan_ZhuLuTianXia2',
         x: [10, 0.4],
         y: [5, 0.55],
         scale: 0.7,
         background: 'skin_liuyan_ZhuLuTianXia_bg.png',
         skinName: "逐鹿天下"
        },
        异心显露2: {
         name: 'skin_liuyan_YiXinXianLu2',
         x: [0, 0.45],
         y: [0, 0.5],
         scale: 0.72,
         background: 'skin_liuyan_YiXinXianLu_bg.png',
         skinName: "异心显露"
      },
      逐鹿天下1: {
         name: 'skin_liuyan_ZhuLuTianXia1',
         x: [10, 0.25],
         y: [5, 0.4],
         scale: 0.4,
         background: 'skin_liuyan_ZhuLuTianXia_bg.png',
         skinName: "逐鹿天下"
        },
        异心显露1: {
         name: 'skin_liuyan_YiXinXianLu1',
         x: [0, 0.43],
         y: [0, 0.3],
         scale: 0.55,
         background: 'skin_liuyan_YiXinXianLu_bg.png',
         skinName: "异心显露"
        },
       雄踞益州: {
        name: 'skin_liuyan_XiongJuYiZhou',
        x: [0, 0.55],
        y: [0, 0.1],
        action: 'DaiJi',
        speed: 1,
        scale: 0.55,
        background: 'skin_liuyan_XiongJuYiZhou_bg.png',
        skinName: "雄踞益州"
       },
       },
    liuyao: {
      雨凄悲流2: {
        name: 'skin_liuyao_YuQiBeiLiu2',
        x: [0, 0.45],
        y: [0, 0.485],
        scale: 0.76,
        background: 'skin_liuyao_YuQiBeiLiu_bg.png',
        skinName: "雨凄悲流"
       },
      雨凄悲流1: {
        name: 'skin_liuyao_YuQiBeiLiu1',
        x: [0, 0.4],
        y: [0, 0.36],
        scale: 0.46,
        background: 'skin_liuyao_YuQiBeiLiu_bg.png',
        skinName: "雨凄悲流"
       },
       },
      luzhi: {
      抒墨谏策2: {
        name: 'skin_luzhi_ShuMoJianCe2',
        x: [0, 0.4],
        y: [0, 0.55],
        scale: 0.7,
        background: 'skin_luzhi_ShuMoJianCe_bg.png',
        skinName: "抒墨谏策"
      },
      抒墨谏策1: {
        name: 'skin_luzhi_ShuMoJianCe1',
        x: [0, 0.28],
        y: [0, 0.24],
        scale: 0.5,
        angle: 10,
        background: 'skin_luzhi_ShuMoJianCe_bg.png',
        skinName: "抒墨谏策"
       },
       },
      lukang: {
        毁堰破晋2: {
        name: 'skin_lukang_HuiYanPoJin2',
        x: [10, 0.4],
        y: [5, 0.5],
        scale: 0.68,
        background: 'skin_lukang_HuiYanPoJin_bg.png',
        skinName: "毁堰破晋"
        },
        毁堰破晋1: {
        name: 'skin_lukang_HuiYanPoJin1',
        x: [10, 0.35],
        y: [5, 0.35],
        scale: 0.5,
        background: 'skin_lukang_HuiYanPoJin_bg.png',
        skinName: "毁堰破晋"
        },
        },
      lusu: {
       周济万民2: {
        name: 'skin_lusu_ZhouJiWanMin2',
        x: [0, 0.45],
        y: [0, 0.55],
        scale: 0.75,
        background: 'skin_lusu_ZhouJiWanMin_bg.png',
        skinName: "周济万民"
      },
       谋定天下2: {
        name: 'skin_lusu_MouDingTianXia2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.72,
        background: 'skin_lusu_MouDingTianXia_bg.png',
        skinName: "谋定天下"
      },
      缔造联盟2: {
        name: 'skin_lusu_DiZhaoLianMeng2',
        x: [0, 0.44],
        y: [0, 0.54],
        scale: 0.8,
        background: 'skin_lusu_DiZhaoLianMeng_bg.png',
        skinName: "缔造联盟"
       },
       周济万民1: {
        name: 'skin_lusu_ZhouJiWanMin1',
        x: [0, 0.65],
        y: [0, 0.05],
        scale: 0.6,
        angle: -10,
        background: 'skin_lusu_ZhouJiWanMin_bg.png',
        skinName: "周济万民"
      },
      谋定天下1: {
        name: 'skin_lusu_MouDingTianXia1',
        x: [0, 0.65],
        y: [0, 0.36],
        scale: 0.62,
        background: 'skin_lusu_MouDingTianXia_bg.png',
        skinName: "谋定天下"
      },
      缔造联盟1: {
        name: 'skin_lusu_DiZhaoLianMeng1',
        x: [0, 0.8],
        y: [0, 0.44],
        scale: 0.4,
        background: 'skin_lusu_DiZhaoLianMeng_bg.png',
        skinName: "缔造联盟"
       },
       联刘抗曹: {
        name: 'skin_lusu_LianLiuKangCao',
        x: [0, 0.6],
        y: [0, -0.05],
        scale: 0.58,
        angle: -10,
        action: 'DaiJi',
        background: 'skin_lusu_LianLiuKangCao_bg.png',
        skinName: "联刘抗曹"
       },
       },
     luji: {
       玉桂月满2: {
		name: 'skin_luji_YuGuiYueMan2',
		x: [0, 0.38],
		y: [0, 0.43],
		scale: 0.9,
		angle:-8,	
		background: 'skin_luji_YuGuiYueMan_bg.png',
      },	
       星熠心移2: {
        name: 'skin_luji_XinYiXinYi2',
        x: [0, 0.3],
        y: [0, 0.43],
        scale: 0.92,
        angle: -20,
        background: 'skin_luji_XinYiXinYi_bg.png',
        skinName: "星熠心移"
      },
		玉桂月满1:{
		name: 'skin_luji_YuGuiYueMan1',
		x: [0, 0.38],
		y: [0, 0.25],
		scale: 0.52,
		angle:-8,	
		background: 'skin_luji_YuGuiYueMan_bg.png',
       },	
       星熠心移1: {
        name: 'skin_luji_XinYiXinYi1',
        x: [0, 0.98],
        y: [0, 0.33],
        scale: 0.48,
        angle: -5,
        background: 'skin_luji_XinYiXinYi_bg.png',
        skinName: "星熠心移"
       },
       },
       luyusheng: {
      玉桂月满2: {
        name: 'skin_luyusheng_YuGuiYueMan2',
        x: [-25, 0.68],
        y: [16, 0.38],
        scale: 0.85,
        background: 'skin_luyusheng_YuGuiYueMan_bg.png',
        skinName: "玉桂月满"
      },
      玉桂月满1: {
        name: 'skin_luyusheng_YuGuiYueMan1',
        x: [-25, 0.5],
        y: [16, 0.3],
        scale: 0.5,
        background: 'skin_luyusheng_YuGuiYueMan_bg.png',
        skinName: "玉桂月满"
       }
       },
      luxun: {
      谋定天下2: {
        name: 'skin_luxun_MouDingTianXia2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.8,
        background: 'skin_luxun_MouDingTianXia_bg.png',
        skinName: "谋定天下"
       },
       清雨踏春2: {
        name: 'skin_luxun_QingYuTaChun2',
         x: [0, 0.55],
         y: [0, 0.58],
         scale: 0.75,
        background: 'skin_luxun_QingYuTaChun_bg.png',
        skinName: "清雨踏春"
       },
      谋定天下1: {
        name: 'skin_luxun_MouDingTianXia1',
        x: [0, 0.25],
        y: [0, 0.15],
        scale: 0.6,
        background: 'skin_luxun_MouDingTianXia_bg.png',
        skinName: "谋定天下"
       },
       清雨踏春1: {
        name: 'skin_luxun_QingYuTaChun1',
         x: [0, 1.4],
         y: [0, 0.5],
         scale: 0.5,
        background: 'skin_luxun_QingYuTaChun_bg.png',
        skinName: "清雨踏春"
       },
       猪年圣诞: {
        name: 'skin_luxun_ZhuNianShengDan',
        x: [0, 0.45],
        y: [0, 0.16],
        scale: 0.5,
        action: 'DaiJi',
        background: 'skin_luxun_ZhuNianShengDan_bg.png',
        skinName: "猪年圣诞"
      },
       },
     lvmeng: {
       清雨踏春2: {
        name: 'skin_lvmeng_QingYuTaChun2',
        x: [0, 0.5],
        y: [0, 0.42],
        scale: 0.95,
        angle: -5,
        background: 'skin_lvmeng_QingYuTaChun_bg.png',
        skinName: "清雨踏春"
      },
      清雨踏春1: {
        name: 'skin_lvmeng_QingYuTaChun1',
        x: [0, -0.55],
        y: [0, 0.25],
        scale: 0.58,
        angle: -5,
        background: 'skin_lvmeng_QingYuTaChun_bg.png',
        skinName: "清雨踏春"
       },
       },
     lvdai: {
      交趾震威2: {
        name: 'skin_lvdai_JiaoZhiZhenWei2',
        x: [0, 0.6],
        y: [0, 0.51],
        scale: 0.84,
        background: 'skin_lvdai_JiaoZhiZhenWei_bg.png',
        skinName: "交趾震威"
      },
      交趾震威1: {
        name: 'skin_lvdai_JiaoZhiZhenWei1',
        x: [0, 0.35],
        y: [0, 0.48],
        scale: 0.46,
        background: 'skin_lvdai_JiaoZhiZhenWei_bg.png',
        skinName: "交趾震威"
       },
       },
      lvkai: {
       逐鹿天下2: {
        name: 'skin_lvkai_ZhuLuTianXia2',
        x: [0, 0.5],
        y: [0, 0.55],
        scale: 0.72,
        background: 'skin_lvkai_ZhuLuTianXia_bg.png',
        skinName: "逐鹿天下"
       },
       逐鹿天下1: {
        name: 'skin_lvkai_ZhuLuTianXia1',
        x: [0, 0.55],
        y: [0, 0.3],
        scale: 0.5,
        background: 'skin_lvkai_ZhuLuTianXia_bg.png',
        skinName: "逐鹿天下"
       },
       },
     lvqian: {
       佩刀显威2: {
        name: 'skin_lvqian_PeiDaoXianWei2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.78,
        angle: 6,
        background: 'skin_lvqian_PeiDaoXianWei_bg.png',
        skinName: "佩刀显威"
        },
       佩刀显威1: {
        name: 'skin_lvqian_PeiDaoXianWei1',
        x: [0, 0.4],
        y: [0, 0.29],
        scale: 0.5,
        angle: 10,
        background: 'skin_lvqian_PeiDaoXianWei_bg.png',
        skinName: "佩刀显威"
        },
        },
      lvbu: {
       文和乱武2: {
        name: 'skin_lvbu_WenHeLuanWu2',
        x: [0, 0.43],
        y: [0, 0.6],
        scale: 0.8,
        angle: -10,
        background: 'skin_lvbu_WenHeLuanWu_bg.png',
        skinName: "文和乱武"
      },
       武动乾坤2: {
        name: 'skin_lvbu_WuDongQianKun2',
        x: [0, 0.4],
        y: [0, 0.55],
        scale: 0.7,
        background: 'skin_lvbu_WuDongQianKun_bg.png',
        skinName: "武动乾坤"
      },
       新春鑫舞2: {
        name: 'skin_lvbu_XinChunXingWu2',
        x: [0, 0.45],
        y: [0, 0.52],
        scale: 0.8,
        background: 'skin_lvbu_XinChunXingWu_bg.png',
        skinName: "新春鑫舞"
      },
      文和乱武1: {
        name: 'skin_lvbu_WenHeLuanWu1',
        x: [0, 0.95],
        y: [0, 0.25],
        scale: 0.48,
        angle: -10,
        background: 'skin_lvbu_WenHeLuanWu_bg.png',
        skinName: "文和乱武"
       },
       武动乾坤1: {
        name: 'skin_lvbu_WuDongQianKun1',
        x: [0, 0.5],
        y: [0, 0.55],
        scale: 0.45,
        angle:-20,
        background: 'skin_lvbu_WuDongQianKun_bg.png',
        skinName: "武动乾坤"
       },
       新春鑫舞1: {
        name: 'skin_lvbu_XinChunXingWu1',
        x: [0, 0.68],
        y: [0, 0.4],
        scale: 0.46,
        background: 'skin_lvbu_XinChunXingWu_bg.png',
        skinName: "新春鑫舞"
       },
       虓虎之勇: {
        name: 'skin_lvbu_XiaoHuZhiYong',
        x: [0, 0.47],
        y: [0, 0.33],
        scale: 0.5,
        //angle:-15,
        action: 'DaiJi',
        background: 'skin_lvbu_XiaoHuZhiYong_bg.png',
        skinName: "虓虎之勇"
      },
       鼠年七夕: {
        name: 'skin_lvbu_ShuNianQiXi',
        x: [0, 0.45],
        y: [0, 0.16],
        scale: 0.5,
        //angle:-15,
        action: 'DaiJi',
        background: 'skin_lvbu_ShuNianQiXi_bg.png',
        skinName: "鼠年七夕"
      },
      },
	  lvlingqi:{
       赤焱流金2:{
		name: 'skin_lvlingqi_ChiYanLiuJin2',
		x: [65, 0.01],
		y: [0 , 0.5],
		scale: 0.85,
		background: 'skin_lvlingqi_ChiYanLiuJin_bg.png',
		},
       赤焱流金1:{
		name: 'skin_lvlingqi_ChiYanLiuJin1',
		x: [65, 0.6],
		y: [0 , 0.3],
		scale: 0.45,
		background: 'skin_lvlingqi_ChiYanLiuJin_bg.png',
		},
		},
    lingcao: {
       破贼校尉: {
        name: 'skin_lingcao_PoZeiXiaoWei',
        x: [0, 0.35],
        y: [0, 0.35],
        scale: 0.52,
        angle: -30,
        action: 'DaiJi',
        background: 'skin_lingcao_PoZeiXiaoWei_bg.png',
        skinName: "破贼校尉"
      },
      },
     liuzan: {
       抗音而歌: {
        name: 'skin_liuzan_KanɡYinErGe',
        x: [0, 0.53],
        y: [0, 0.02],
        scale: 0.55,
        angle: -5,
        background: 'skin_liuzan_KanɡYinErGe_bg.png',
        action: 'DaiJi',
        skinName: "抗音而歌"
      },
       灵魂歌王: {
        name: 'skin_liuzan_LinɡHunGeWang',
        x: [0, -0.3],
        y: [0, 0.13],
        scale: 0.45,
        angle: 10,
        background: 'skin_liuzan_LinɡHunGeWang_bg.png',
        action: 'DaiJi',
        skinName: "灵魂歌王"
      }
      },
       madai: {
      一合而斩2: {
        name: 'skin_madai_YiHeErZhan2',
        x: [0, 0.45],
        y: [0, 0.48],
        scale: 0.86,
        angle: 0,
        background: 'skin_madai_YiHeErZhan_bg.png',
        skinName: "一合而斩"
      },
      一合而斩1: {
        name: 'skin_madai_YiHeErZhan1',
        x: [0, 0.65],
        y: [0, 0.02],
        scale: 0.55,
        angle: 0,
        background: 'skin_madai_YiHeErZhan_bg.png',
        skinName: "一合而斩"
       },
       },
      machao: {
       武动乾坤2: {
        name: 'skin_machao_WuDongQianKun2',
        x: [0, 0.5],
        y: [0, 0.52],
        scale: 0.75,
        background: 'skin_machao_WuDongQianKun_bg.png',
        skinName: "武动乾坤"
       },
        虚拟天团2: {
        name: 'skin_machao_XuNiTianTuan2',
        x: [0, 0.5],
        y: [0, 0.52],
        scale: 0.68,
        background: 'skin_machao_XuNiTianTuan_bg.png',
        skinName: "虚拟天团"
      },
       武动乾坤1: {
        name: 'skin_machao_WuDongQianKun1',
        x: [0, 0.35],
        y: [0, 0.25],
        scale: 0.52,
        background: 'skin_machao_WuDongQianKun_bg.png',
        skinName: "武动乾坤"
       },
      雷霆飞骑: {
        name: 'skin_machao_LeiTingFeiQi',
        x: [0, 0.95],
        y: [0, 0.23],
        scale: 0.43,
        angle:-5,
        action: 'DaiJi',
        background: 'skin_machao_LeiTingFeiQi_bg.png',
        skinName: "雷霆飞骑"
      },
      西凉雄狮: {
        name: 'skin_machao_XiLiangXiongShi',
        action: 'DaiJi',
        x: [0, 0.5],
        y: [0, 0.3],
        scale: 0.52,
        background: 'skin_machao_XiLiangXiongShi_bg.png',
        skinName: "西凉雄狮"
      },
      牛年春节: {
        name: 'skin_machao_NiuNianChunJie',
        x: [0, 1.1],
        y: [0, 0.35],
        scale: 0.55,
        //angle:-15,
        action: 'DaiJi',
        background: 'skin_machao_NiuNianChunJie_bg.png',
        skinName: "牛年春节"
      },
       壮志凌云: {
        name: 'skin_machao_ZhuangZhiLingYun',
        x: [55, 0.5],
        y: [0, 0.42],
        scale: 0.42,
        background: 'skin_machao_XuNiTianTuan_bg.png',
        skinName: "壮志凌云"
       },
       },
    mayunlu: {
        巾帼花武2: {
        name: 'skin_mayunlu_JinGuoHuaWu2',
        x: [0, 0.5],
        y: [0, 0.55],
        scale: 0.66,
        background: 'skin_mayunlu_JinGuoHuaWu_bg.png',
        skinName: "巾帼花武"
      },
      战场绝版2: {
        name: 'skin_mayunlu_ZhanChang2',
        x: [50, 0.05],
        y: [0, 0.55],
        scale: 0.7,
        background: 'skin_mayunlu_ZhanChang_bg.png',
        skinName: "战场绝版"
      },
      舐伤伴君2: {
        name: 'skin_mayunlu_ShiShangBanJun2',
        x: [0, 0.45],
        y: [0, 0.6],
        scale: 0.7,
        background: 'skin_mayunlu_ShiShangBanJun_bg.png',
        skinName: "舐伤伴君"
      },
      花好月圆2: {
        name: 'skin_mayunlu_HuaHaoYueYuan2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.78,
        background: 'skin_mayunlu_HuaHaoYueYuan_bg.png',
        skinName: "花好月圆"
      },
        烟绚繁星2: {
        name: 'skin_mayunlu_YanXuanFanXing2',
        x: [0, 0.42],
        y: [0, 0.52],
        scale: 0.7,
        background: 'skin_mayunlu_YanXuanFanXing_bg.png',
        skinName: "烟绚繁星"
      },
        巾帼花武1: {
        name: 'skin_mayunlu_JinGuoHuaWu1',
        x: [0, 0.05],
        y: [0, 0.25],
        scale: 0.55,
        background: 'skin_mayunlu_JinGuoHuaWu_bg.png',
        skinName: "巾帼花武"
      },
      战场绝版1: {
        name: 'skin_mayunlu_ZhanChang1',
        x: [0, 0.39],
        y: [0, 0.2],
        scale: 0.6,
        background: 'skin_mayunlu_ZhanChang_bg.png',
        skinName: "战场绝版"
      },
      舐伤伴君1: {
        name: 'skin_mayunlu_ShiShangBanJun1',
        x: [0, 0.45],
        y: [0, 0.35],
        scale: 0.5,
        background: 'skin_mayunlu_ShiShangBanJun_bg.png',
        skinName: "舐伤伴君"
      },
      花好月圆1: {
        name: 'skin_mayunlu_HuaHaoYueYuan1',
        x: [0, 0.5],
        y: [0, 0.15],
        scale: 0.5,
        background: 'skin_mayunlu_HuaHaoYueYuan_bg.png',
        skinName: "花好月圆"
       },
        烟绚繁星1: {
        name: 'skin_mayunlu_YanXuanFanXing1',
        x: [0, -0.1],
        y: [0, 0.5],
        scale: 0.48,
        background: 'skin_mayunlu_YanXuanFanXing_bg.png',
        skinName: "烟绚繁星"
      },
      花海舞枪: {
        name: 'skin_mayunlu_HuaHaiWuQiang',
        x: [0, 0.1],
        y: [1, 0],
        scale: 0.675,
        action: "DaiJi",
        background: 'skin_mayunlu_HuaHaiWuQiang_bg.png',
        skinName: "花海舞枪"
      },
      猪年大雪: {
        name: 'skin_mayunlu_ZhuNianDaXue',
        x: [-3, 0.15],
        y: [9, 0.2],
        scale: 0.6,
        background: 'skin_mayunlu_ZhuNianDaXue_bg.png',
        skinName: "猪年大雪"
      },
      牛年春节: {
        name: 'skin_mayunlu_NiuNianChunJie',
        x: [0, 0.5],
        y: [0, 0.25],
        scale: 0.55,
        //angle:-15,
        action: 'DaiJi',
        background: 'skin_mayunlu_NiuNianChunJie_bg.png',
        skinName: "牛年春节"
      },
      花海舞枪2: {
        name: 'luo_mayunlu_HuaHaiWuQiang',
        x: [0, 0.1],
        y: [1, 0],
        scale: 0.675,
        action: "DaiJi",
        background: 'skin_mayunlu_HuaHaiWuQiang_bg.png',
        luoName: "花海舞枪"
      },
      牛年春节2: {
        name: 'luo_mayunlu_NiuNianChunJie',
        x: [0, 0.5],
        y: [0, 0.25],
        scale: 0.55,
        //angle:-15,
        action: 'DaiJi',
        background: 'skin_mayunlu_NiuNianChunJie_bg.png',
        luoName: "牛年春节"
      },
      猪年大雪2: {
        name: 'luo_mayunlu_ZhuNianDaXue',
        x: [-3, 0.15],
        y: [9, 0.2],
        scale: 0.6,
        background: 'skin_mayunlu_ZhuNianDaXue_bg.png',
        luoName: "猪年大雪"
      },
      },
    miheng: {
       击鼓骂曹: {
        name: 'skin_miheng_JiGuMaCao',
        x: [0, 0.26],
        y: [5, 0.2],
        scale: 0.65,
        action: 'DaiJi',
        background: 'skin_miheng_JiGuMaCao_bg.png',
        skinName: "击鼓骂曹"
      },
      },
      sp_mifuren: {
      香消玉殒2: {
        name: 'skin_mifuren_XiangXiaoYuYun2',
        x: [0, 0.3],
        y: [0, 0.6],
        scale: 0.68,
        angle: -30,
        background: 'skin_mifuren_XiangXiaoYuYun_bg.png',
        skinName: "香消玉殒"
      },
      香消玉殒1: {
        name: 'skin_mifuren_XiangXiaoYuYun1',
        x: [0, 0.7],
        y: [0, 0.35],
        scale: 0.37,
        angle: -30,
        background: 'skin_mifuren_XiangXiaoYuYun_bg.png',
        skinName: "香消玉殒"
      },
      },
     panshu: {
      繁囿引芳2: {
        name: 'skin_panshu_FanYouYinFang2',
        x: [0, 0.5],
        y: [0, 0.53],
        scale: 0.8,
        background: 'skin_panshu_FanYouYinFang_bg.png',
        skinName: "繁囿引芳"
      },
       繁囿引芳1: {
        name: 'skin_panshu_FanYouYinFang1',
        x: [100, 0.5],
        y: [10, 0.3],
        scale: 0.52,
        background: 'skin_panshu_FanYouYinFang_bg.png',
        skinName: "繁囿引芳"
      },
      },
    pangdegong: {
       超脱于世: {
        name: 'skin_pangdegong_ChaoTuoYuShi',
        x: [0, 0.5],
        y: [5, 0],
        scale: 0.7,
        action: 'DaiJi',
        angle: 10,
        background: 'skin_pangdegong_ChaoTuoYuShi_bg.png',
        skinName: "超脱于世"
      },
      },
     ol_pangtong: {
       谋定天下2: {
        name: 'skin_pangtong_MouDingTianXia2',
        x: [0, 0.3],
        y: [0, 0.6],
        scale: 0.85,
        background: 'skin_pangtong_MouDingTianXia_bg.png',
        skinName: "谋定天下"
       },
       谋定天下1: {
        name: 'skin_pangtong_MouDingTianXia1',
        x: [0, 0.63],
        y: [0, 0.11],
        scale: 0.68,
        background: 'skin_pangtong_MouDingTianXia_bg.png',
        skinName: "谋定天下"
       },
       },
       puyuan: {
      百炼神器2: {
        name: 'skin_puyuan_BaiLianShenQi2',
        x: [0, 0.4],
        y: [0, 0.51],
        scale: 0.81,
        background: 'skin_puyuan_BaiLianShenQi_bg.png',
        skinName: "百炼神器"
      },
       百炼神器1: {
        name: 'skin_puyuan_BaiLianShenQi1',
        x: [0, 0.8],
        y: [0, 0.33],
        scale: 0.4,
        background: 'skin_puyuan_BaiLianShenQi_bg.png',
        skinName: "百炼神器"
       },
       },
      qinmi :{
        恬淡浩然2: {
		name: 'skin_qinmi_TianDanHaoRan2',
		x: [0, 0.46],
		y: [0, 0.56],
		scale: 0.7,
		background: 'skin_qinmi_TianDanHaoRan_bg.png',
		skinName: "恬淡浩然"
       },    
	    恬淡浩然1:{
		name: 'skin_qinmi_TianDanHaoRan1',
		x: [0, 0.3],
		y: [0, 0.36],
		scale: 0.48,
		background: 'skin_qinmi_TianDanHaoRan_bg.png',
		skinName: "恬淡浩然"
       },     
       冠绝天下:{
		name: 'skin_qinmi_GuanJueTianXia',
	    x: [0, 0.5],
		y: [0, 0.52],
		scale: 0.4,
		action: 'DaiJi',
	    angle:-5,
		background: 'skin_qinmi_GuanJueTianXia_bg.png',
       },
       },
      quancong: {
       宵靥谜君2: {
        name: 'skin_quancong_XiaoYanMiJun2',
        x: [0, 0.45],
        y: [0, 0.55],
        scale: 0.85,
        background: 'skin_quancong_XiaoYanMiJun_bg.png',
        skinName: "宵靥谜君"
       },
       宵靥谜君1: {
        name: 'skin_quancong_XiaoYanMiJun1',
        x: [0, 0.55],
        y: [0, 0.13],
        scale: 0.5,
        angle: -10,
        background: 'skin_quancong_XiaoYanMiJun_bg.png',
        skinName: "宵靥谜君"
        },
        },
     ruanyu: {
       墨卷浩瀚2: {
        name: 'skin_ruanyu_MoJuanHaoHan2',
        x: [0, 0.43],
        y: [0, 0.54],
        scale: 0.84,
        angle: -10,
        background: 'skin_ruanyu_MoJuanHaoHan_bg.png',
        skinName: "墨卷浩瀚"
      },
      墨卷浩瀚1: {
        name: 'skin_ruanyu_MoJuanHaoHan1',
        x: [0, 0.63],
        y: [0, 0.38],
        scale: 0.44,
        angle: -10,
        background: 'skin_ruanyu_MoJuanHaoHan_bg.png',
        skinName: "墨卷浩瀚"
       },
       },    
       shamoke: {
       狂喜胜战2: {
        name: 'skin_shamoke_KuangXiShengZhan2',
        x: [0, 0.55],
        y: [0, 0.5],
        scale: 0.8,
        angle: 0,
        background: 'skin_shamoke_KuangXiShengZhan_bg.png',
        skinName: "狂喜胜战"
       },
       狂喜胜战1: {
        name: 'skin_shamoke_KuangXiShengZhan1',
        x: [0, 0.26],
        y: [0, 0.15],
        scale: 0.55,
        angle: 0,
        background: 'skin_shamoke_KuangXiShengZhan_bg.png',
        skinName: "狂喜胜战"
       },
       },
     sp_sufei: {
        肝胆相照: {
        name: 'skin_sufei_GanDanXiangZhao',
        x: [0, 0.91],
        y: [0, 0],
        scale: 0.7,
        action: 'DaiJi',
        background: 'skin_sufei_GanDanXiangZhao_bg.png',
        skinName: "肝胆相照"
      },
      },
      shen_caocao: {
      一统江山2: {
        name: 'skin_shencaocao_YiTongJiangShan2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.8,
        background: 'skin_shencaocao_YiTongJiangShan_bg.png',
        skinName: "一统江山"		
        },
      一统江山1: {
        name: 'skin_shencaocao_YiTongJiangShan1',
        x: [0, 0.45],
        y: [0, 0.3],
        scale: 0.47,
        background: 'skin_shencaocao_YiTongJiangShan_bg.png',
        skinName: "一统江山"		
        },
       玄天通冥: {
        name: 'skin_shencaocao_XuanTianTongMing',
        x: [0, 0.6],
        y: [0, -0.2],
        scale: 0.75,
        action: 'DaiJi',
        background: 'skin_shencaocao_XuanTianTongMing_bg.png',
        skinName: "玄天通冥"		
       },
       },
     shen_ganning: {
       万人辟易: {
        name: 'skin_shenganning_WanRenPiYi',
        x: [0, 0.35],
        y: [0, 0.25],
        angle: 23,
        scale: 0.40,
        action: 'DaiJi',
        background: 'skin_shenganning_WanRenPiYi_bg.png',
      },
      新春大鬼: {
       name: 'skin_shenganning_XCDG',
        x: [0, 0.35],
        y: [0, 0.25],
        angle: 23,
        scale: 0.40,
        action: 'DaiJi',
        background: 'skin_shenganning_XCDG_bg.png',
      }
      },
      shen_guanyu: {
       链狱鬼神2: {
        name: 'skin_shenguanyu_LianYuGuiShen2',
        x: [0, 0.46],
        y: [0, 0.57],
        scale: 0.7,
        background: 'skin_shenguanyu_LianYuGuiShen_bg.png',
        skinName: "链狱鬼神"
      },
       链狱鬼神1: {
        name: 'skin_shenguanyu_LianYuGuiShen1',
        x: [0, 0.5],
        y: [0, 0.35],
        scale: 0.58,
        background: 'skin_shenguanyu_LianYuGuiShen_bg.png',
        skinName: "链狱鬼神"
        },
        },
      shen_liubei: {
       昭烈怒火2: {
        name: 'skin_shenliubei_ZhaoLieNuHuo2',
        x: [0, 0.5],
        y: [0, 0.62],
        scale: 0.66,
        background: 'skin_shenliubei_ZhaoLieNuHuo_bg.png',
        skinName: "昭烈怒火"
      },
       昭烈怒火1: {
        name: 'skin_shenliubei_ZhaoLieNuHuo1',
        x: [0, 0.4],
        y: [0, 0.28],
        scale: 0.75,
        angle: 5,
        background: 'skin_shenliubei_ZhaoLieNuHuo_bg.png',
        skinName: "昭烈怒火"
        },
        },
    shen_luxun: {
        连天烽火: {
        name: 'skin_shenluxun_LianTianFengHuo1',
        x: [0, 0.7],
        y: [5, 0.15],
        scale: 0.63,
        background: 'skin_shenluxun_LianTianFengHuo_bg.png',
        skinName: "连天烽火"
      },
      绽焰摧枯: {
        name: 'skin_shenluxun_ZhanYanCuiKu',
        x: [0, 0.53],
        y: [5, 0.45],
        scale: 0.6,
        action: 'DaiJi',
        background: 'skin_shenluxun_ZhanYanCuiKu_bg.png',
        skinName: "绽焰摧枯"
      },
      },
    shen_lvmeng: {
       兼资文武: {
        name: 'skin_shenlvmeng_JianZiWenWu',
        x: [0, 0.11],
        y: [0, 0.33],
        scale: 0.4,
        action: 'DaiJi',
        background: 'skin_shenlvmeng_JianZiWenWu_bg.png',
        skinName: "兼资文武"
       },
       },
    shen_simayi: {
       鉴往知来: {
        name: 'skin_shensimayi_JianWangZhiLai',
        x: [0, 0.53],
        y: [0, 0.02],
        scale: 0.62,
        action: 'DaiJi',
        background: 'skin_shensimayi_JianWangZhiLai_bg.png',
        skinName: "鉴往知来"
      },
      },
    shen_zhugeliang: {
       赤壁唤风2:{
		name: 'skin_shenzhugeliang_ChiBiHuanFeng2',
		x: [0, 0.45],
		y: [0, 0.44],
		scale: 0.95,
		background: 'skin_shenzhugeliang_ChiBiHuanFeng_bg.png',	
		},
       赤壁唤风1:{
		name: 'skin_shenzhugeliang_ChiBiHuanFeng1',
		x: [0, 0.55],
		y: [0, -0.06],
		scale: 0.75,
		angle:-15,
		background: 'skin_shenzhugeliang_ChiBiHuanFeng_bg.png',	
		},
      孟章诛邪: {
        name: 'skin_shenzhugeliang_MengZhangZhuXie',
        x: [0, 0.33],
        y: [0, -0.33],
        scale: 0.83,
        background: 'skin_shenzhugeliang_MengZhangZhuXie_bg.png',
        skinName: "孟章诛邪"
      },
      凤舞魔鸟: {
        name: 'skin_shenzhugeliang_FengWuMoNiao',
        x: [0, -0.4],
        y: [0, 0.15],
        scale: 0.55,
        //angle:-15,
        action: 'DaiJi',
        background: 'skin_shenzhugeliang_FengWuMoNiao_bg.png',
        skinName: "凤舞魔鸟"
       },
	   },
       shen_zhaoyun: {
        神龙佑主2: {
        name: 'skin_shenzhaoyun_ShenLongYouZhu2',
        x: [0, 0.36],
        y: [0, 0.55],
        scale: 0.84,
        background: 'skin_shenzhaoyun_ShenLongYouZhu_bg.png',
        skinName: "神龙佑主"
        }, 
        神龙佑主1: {
        name: 'skin_shenzhaoyun_ShenLongYouZhu1',
        x: [0, 0.8],
        y: [5, 0.15],
        scale: 0.76,
        background: 'skin_shenzhaoyun_ShenLongYouZhu_bg.png',
        skinName: "神龙佑主"
       }, 
       战龙在野: {
        name: 'skin_shenzhaoyun_ZhanLongZaiYe',
        x: [0, 0.7],
        y: [0, 0.3],
        scale: 0.77,
        background: 'skin_shenzhaoyun_ZhanLongZaiYe_bg.png',
        action: 'DaiJi',
        skinName: "战龙在野"
       },
       },
     shen_zhouyu: {
       红莲业火2: {
        name: 'skin_shenzhouyu_HongLianYeHuo2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.8,
        background: 'skin_shenzhouyu_HongLianYeHuo_bg.png',
        skinName: "红莲业火"
        },
       红莲业火1: {
        name: 'skin_shenzhouyu_HongLianYeHuo1',
        x: [0, 0.55],
        y: [0, 0.45],
        scale: 0.5,
        background: 'skin_shenzhouyu_HongLianYeHuo_bg.png',
        skinName: "红莲业火"
        },
      陵光引灵: {
        name: 'skin_shenzhouyu_LingGuangYinLing',
        x: [0, 0.4],
        y: [0, 0.15],
        scale: 0.55,
        action: 'DaiJi',
        background: 'skin_shenzhouyu_LingGuangYinLing_bg.png',
        skinName: "陵光引灵"
      },
      焰腾麒麟: {
        name: 'skin_shenzhouyu_YanTengQiLin',
        x: [0, -0.2],
        y: [0, 0.42],
        scale: 0.63,
        angle: -10,
        background: 'skin_shenzhouyu_YanTengQiLin_bg.png',
        action: 'DaiJi',
        skinName: "焰腾麒麟"
      },
      },
    shen_lvbu: {
      冠绝天下: {
        name: 'skin_shenlvbu_GuanJueTianXia',
        x: [0, 0.8],
        y: [0, 0.3],
        scale: 0.42,
        action: 'DaiJi',
        angle:5,
        background: 'skin_shenlvbu_GuanJueTianXia_bg.png',        skinName: "冠绝天下"
      },
      监兵噬魅: {
        name: 'skin_shenlvbu_JianBingShiMei',
        x: [0, 0.43],
        y: [0, -0.48],
        scale: 0.91,
        action: 'DaiJi',
        background: 'skin_shenlvbu_JianBingShiMei_bg.png',
        skinName: "监兵噬魅"
       },
       },
     simahui: {
       教诲不倦2: {
        name: 'skin_simahui_JiaoHuiBuJuan2',
        x: [0, 0.475],
        y: [0, 0.55],
        scale: 0.77,
        background: 'skin_simahui_JiaoHuiBuJuan_bg.png',
        skinName: "教诲不倦"
       },
       教诲不倦1: {
        name: 'skin_simahui_JiaoHuiBuJuan1',
        x: [0, 1.15],
        y: [0, 0.1],
        scale: 0.6,
        background: 'skin_simahui_JiaoHuiBuJuan_bg.png',
        skinName: "教诲不倦"
       },
       },
    simayi: {
      谋定天下2: {
        name: 'skin_simayi_MouDingTianXia2',
        x: [0, 0.4],
        y: [0, 0.5],
        scale: 0.75,
        //angle: -10,
        background: 'skin_simayi_MouDingTianXia_bg.png',
        skinName: "谋定天下1"
      },
      佳期若梦2:{
		name: 'skin_simayi_JiaQiRuoMeng2',
		x: [0, 0.5],
		y: [0, 0.5],
		scale: 0.8,
		background: 'skin_simayi_JiaQiRuoMeng_bg.png',
		skinName: "佳期若梦"	
	  },
       月下逐华2:{
		name: 'skin_simayi_YueXiaZhuHua2',
		x: [0, 0.47],
		y: [0, 0.52],
		scale: 0.76,
		background: 'skin_simayi_YueXiaZhuHua_bg.png',
		skinName: "月下逐华"
      },
       谋定天下1: {
        name: 'skin_simayi_MouDingTianXia1',
        x: [0, 0.45],
        y: [0, 0.3],
        scale: 0.45,
        angle: -10,
        background: 'skin_simayi_MouDingTianXia_bg.png',
        skinName: "谋定天下"
      },
       佳期若梦1:{
		name: 'skin_simayi_JiaQiRuoMeng1',
		x: [0, 0.25],
		y: [0, 0.35],
		scale: 0.39,
		background: 'skin_simayi_JiaQiRuoMeng_bg.png',
		skinName: "佳期若梦"
	   },
        月下逐华1:{
		name: 'skin_simayi_YueXiaZhuHua1',
		x: [0, 1.5],
		y: [0, 0.35],
		scale: 0.55,
		background: 'skin_simayi_YueXiaZhuHua_bg.png',
		skinName: "月下逐华"
       },
       鹰视狼顾: {
        name: 'skin_simayi_YingShiLangGu',
        x: [0, 0.45],
        y: [0, 0.15],
        scale: 0.55,
        action: 'DaiJi',
        background: 'skin_simayi_MouDingTianXia_bg.png',
        skinName: "鹰视狼顾"
       },
       牛年立冬: {
        name: 'skin_simayi_ShouSha',
        x: [0, 0.057],
        y: [0, -0.07],
        scale: 0.76,
        action: 'DaiJi',
        background: 'skin_simayi_ShouSha_bg.png',
        skinName: "牛年立冬"
       },
       },
     simashi: {
       牛年中秋: {
        name: 'skin_simashi_NiuNianZhongQiu',
        x: [0, -0.05],
        y: [0, 0.23],
        scale: 0.5,
        background: 'skin_simashi_NiuNianZhongQiu_bg.png',
        action: 'DaiJi',
        skinName: "牛年中秋"
       },
       },
     simazhao: {
       鼠年冬至: {
        name: 'skin_simazhao_ShuNianDongZhi',
        x: [0, 0.72],
        y: [0, -0.21],
        scale: 0.68,
         action: 'DaiJi',
        background: 'skin_simazhao_ShuNianDongZhi_bg.png',
        skinName: "鼠年冬至"
       },
       },
      sunce: {
       策马扬鞭2: {
        name: 'skin_sunce_CeMaBian2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.8,
        background: 'skin_sunce_CeMaYangBian_bg.png',
        skinName: "策马扬鞭"
       },
       策马扬鞭1: {
        name: 'skin_sunce_CeMaYangBian1',
        x: [0, 0.35],
        y: [0, 0.25],
        scale: 0.44,
        background: 'skin_sunce_CeMaYangBian_bg.png',
        skinName: "策马扬鞭"
       },
       长沙桓王: {
        name: 'skin_sunce_ChangShaHuanWang',
        x: [0, 0.4],
        y: [0, 0.2],
        scale: 0.55,
        angle:25,
        action: 'DaiJi',
        background: 'skin_sunce_ChangShaHuanWang_bg.png',
        skinName: "长沙桓王"
      },
      猪年七夕: {
        name: 'skin_sunce_ZhuNianQiXi',
        x: [0, 0.8],
        y: [0, 0.15],
        scale: 0.55,
        //angle:25,
        action: 'DaiJi',
        background: 'skin_sunce_ZhuNianQiXi_bg.png',
        skinName: "猪年七夕"
       },
       },
     sundeng: {
       鹊星夕情2: {
        name: 'skin_sundeng_QueXingXiQing2',
        x: [0, 0.53],
        y: [0, 0.52],
        scale: 0.7,
        background: 'skin_sundeng_QueXingXiQing_bg.png',  
        skinName: "鹊星夕情"
       },
       鹊星夕情1: {
        name: 'skin_sundeng_QueXingXiQing1',
        x: [0, 1.3],
        y: [0, -0.02],
        scale: 0.7,
        background: 'skin_sundeng_QueXingXiQing_bg.png',  
        skinName: "鹊星夕情"
       },
       },
     sunliang: {
       诡谲困玺2: {
        name: 'skin_sunliang_GuiJueKunXi2',
        x: [0, 0.36],
        y: [0, 0.5],
        scale: 0.8,
        background: 'skin_sunliang_GuiJueKunXi_bg.png',
        skinName: "诡谲困玺"
       },
       诡谲困玺1: {
        name: 'skin_sunliang_GuiJueKunXi1',
        x: [0, 1.0],
        y: [0, 0.25],
        scale: 0.45,
        background: 'skin_sunliang_GuiJueKunXi_bg.png',
        skinName: "诡谲困玺"
       },
       },
     sunhao: {
       翠流金阙2: {
        name: 'skin_sunhao_CuiLiuJinQue2',
        x: [0, 0.55],
        y: [0, 0.55],
        scale: 0.68,
        background: 'skin_sunhao_CuiLiuJinQue_bg.png',
        skinName: "翠流金阙"
      },
       翠流金阙1: {
        name: 'skin_sunhao_CuiLiuJinQue1',
        x: [0, 0.04],
        y: [0, 0.25],
        scale: 0.48,
        angle: 10,
        background: 'skin_sunhao_CuiLiuJinQue_bg.png',
        skinName: "翠流金阙"
      },
      },
     sunluban: {
       沅茝香兰2: {
        name: 'skin_sunluban_YuanChaiXiangLan2',
        x: [10, 0.42],
        y: [12, 0.45],
        scale: 0.75,
        background: 'skin_sunluban_YuanChaiXiangLan_bg.png',
        skinName: "沅茝香兰"
      },
       宵靥谜君2: {
        name: 'skin_sunluban_XiaoYeMiJun2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.8,
        background: 'skin_sunluban_XiaoYeMiJun_bg.png',
        skinName: "宵靥谜君"
      },
       倚虎弄权2: {
        name: 'skin_sunluban_YiHuNongQuan2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.75,
        background: 'skin_sunluban_YiHuNongQuan_bg.png',
        skinName: "倚虎弄权"
      },
       沅茝香兰1: {
        name: 'skin_sunluban_YuanChaiXiangLan1',
        x: [10, 0.55],
        y: [12, 0.1],
        scale: 0.55,
        background: 'skin_sunluban_YuanChaiXiangLan_bg.png',
        skinName: "沅茝香兰"
      },
       宵靥谜君1: {
        name: 'skin_sunluban_XiaoYeMiJun1',
        x: [ 0, 0.5 ],
        y: [-10, 0.55],
        scale: 0.5,
        background: 'skin_sunluban_XiaoYeMiJun_bg.png',
        skinName: "宵靥谜君"
      },
       倚虎弄权1: {
        name: 'skin_sunluban_YiHuNongQuan1',
        x: [0, 0.22],
        y: [0, 0.23],
        scale: 0.4,
        background: 'skin_sunluban_YiHuNongQuan_bg.png',
        skinName: "倚虎弄权"
        },
       牛年端午: {
        name: 'skin_sunluban_NiuNianDuanWu',
        x: [0, 0.6],
        y: [0, 0.26],
        scale: 0.4,
        action: 'DaiJi',
        background: 'skin_sunluban_NiuNianDuanWu_bg.png',
        skinName: "牛年端午"
       },
       牛年端午2: {
        name: 'luo_sunluban_NiuNianDuanWu',
        x: [0, 0.6],
        y: [0, 0.26],
        scale: 0.4,
        action: 'DaiJi',
        background: 'skin_sunluban_NiuNianDuanWu_bg.png',
        luoName: "牛年端午"
       },
       },
      sunluyu: {
       沅茞香兰2: {
        name: 'skin_sunluyu_YuanChaiXianglan2',
        x: [0, 0.5],
        y: [0, 0.51],
        scale: 0.8,
        background: 'skin_sunluyu_YuanChaiXianglan_bg.png',
        skinName: "沅茞香兰"
      },
       娇俏伶俐2: {
        name: 'skin_sunluyu_JiaoQiaoLingLi2',
        x: [-10, 0.58],
        y: [20, 0.38],
        scale: 0.8,
        background: 'skin_sunluyu_JiaoQiaoLingLi_bg.png',
        skinName: "娇俏伶俐"
      },
       沅茞香兰1: {
        name: 'skin_sunluyu_YuanChaiXianglan1',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.53,
        background: 'skin_sunluyu_YuanChaiXianglan_bg.png',
        skinName: "沅茞香兰"
       },
       娇俏伶俐1: {
        name: 'skin_sunluyu_JiaoQiaoLingLi1',
        x: [-10, 0.5],
        y: [20, 0.3],
        scale: 0.4,
        background: 'skin_sunluyu_JiaoQiaoLingLi_bg.png',
        skinName: "娇俏伶俐"
       },
       牛年端午: {
        name: 'skin_sunluyu_NiuNianDuanWu',
        x: [0, 0.15],
        y: [0, 0.25],
        scale: 0.45,
        //angle:-15,
        action: 'DaiJi',
        background: 'skin_sunluyu_NiuNianDuanWu_bg.png',
        skinName: "牛年端午"
      },
       猪年春节: {
        name: 'skin_sunluyu_ZhuNianChunJie',
        x: [0, 0.4],
        y: [0, 0.32],
        scale: 0.45,
        background: 'skin_sunluyu_ZhuNianChunJie_bg.png',
        skinName: "猪年春节"
       },
       牛年端午2: {
        name: 'luo_sunluyu_NiuNianDuanWu',
        x: [0, 0.15],
        y: [0, 0.25],
        scale: 0.45,
        //angle:-15,
        action: 'DaiJi',
        background: 'skin_sunluyu_NiuNianDuanWu_bg.png',
        luoName: "牛年端午"
      },
       猪年春节2: {
        name: 'luo_sunluyu_ZhuNianChunJie',
        x: [0, 0.4],
        y: [0, 0.32],
        scale: 0.45,
        background: 'skin_sunluyu_ZhuNianChunJie_bg.png',
        luoName: "猪年春节"
       },
       },
     sunquan: {
	    鸾凤和鸣2:{
		name: 'skin_sunquan_LuanFengHeMing2',
		x: [0, 0.45],
		y: [0, 0.5],
		scale: 0.8,
		background: 'skin_sunquan_LuanFengHeMing_bg.png',
		},
	   吴王光耀2:{
		name: 'skin_sunquan_WuWangGuangYao2',
		x: [0, 0.5],
		y: [0, 0.5],
		scale: 0.8,
		background: 'skin_sunquan_WuWangGuangYao_bg.png',
       },
		群英汇聚2:{
		name: 'skin_sunquan_YingJieHuiJu2',
		x: [0, 0.49],
		y: [0, 0.51],
		scale: 0.74,
		background: 'skin_sunquan_YingJieHuiJu_bg.png',
       },
	    鸾凤和鸣1:{
		name: 'skin_sunquan_LuanFengHeMing1',
		x: [0, 0.36],
		y: [0, 0.3],
		scale: 0.38,
		background: 'skin_sunquan_LuanFengHeMing_bg.png',
		skinName: "鸾凤和鸣"
		},
	   吴王光耀1:{
		name: 'skin_sunquan_WuWangGuangYao1',
		x: [0, 0.5],
		y: [0, 0.25],
		scale: 0.5,
		background: 'skin_sunquan_WuWangGuangYao_bg.png',
		skinName: "吴王光耀"
		},
		 群英汇聚1:{
		name: 'skin_sunquan_YingJieHuiJu1',
		x: [0, -0.52],
		y: [0, .4],
		scale: 0.55,
		background: 'skin_sunquan_YingJieHuiJu_bg.png',
		skinName: "群英汇聚"
        },
      吴王六剑: {
        name: 'skin_sunquan_WuWangLiuJian',
        x: [0, 0.53],
        y: [0, 0.3],
        scale: 0.4,
        action: 'DaiJi',
        background: 'skin_sunquan_WuWangLiuJian_bg.png',
        skinName: "吴王六剑"
      },
      牛年七夕: {
        name: 'skin_sunquan_NiuNianQiXi',
        x: [0, 0.5],
        y: [0, 0.2],
        scale: 0.5,
        action: 'DaiJi',
        background: 'skin_sunquan_NiuNianQiXi_bg.png',
        skinName: "牛年七夕"
      },
      猪年端午: {
        name: 'skin_sunquan_ZhuNianDuanWu',
        x: [0, 0.67],
        y: [0, 0.4],
        scale: 0.58,
        angle:15,
        action: 'DaiJi',
        background: 'skin_sunquan_ZhuNianDuanWu_bg.png',
        skinName: "猪年端午"
       },
       },
    sunru: {
       鱼游濠水: {
        name: 'skin_sunru_YuYouHaoShui',
        x: [0, 0.66],
        y: [0, 0.09],
        scale: 0.58,
        action: 'DaiJi',
        angle: -10,
        background: 'skin_sunru_YuYouHaoShui_bg.png',
        skinName: "鱼游濠水"
      },
       花容月貌: {
        name: 'skin_sunru_HuaRongYueMao',
        x: [0, 0.6],
        y: [0, 0.25],
        scale: 0.5,
        angle:15,
        action: 'DaiJi',
        background: 'skin_sunru_HuaRongYueMao_bg.png',
        skinName: "花容月貌"
      },
       烟水悠悠: {
        name: 'skin_sunru_YanShuiYouYou',
        x: [0, 0.4],
        y: [0, 0.15],
        scale: 0.5,
        action: 'DaiJi',
        background: 'skin_sunru_YanShuiYouYou_bg.png',
        skinName: "烟水悠悠"
       },
       花容月貌2: {
        name: 'luo_sunru_HuaRongYueMao',
        x: [0, 0.6],
        y: [0, 0.25],
        scale: 0.5,
        angle:15,
        action: 'DaiJi',
        background: 'skin_sunru_HuaRongYueMao_bg.png',
        luoName: "花容月貌"
      },
       烟水悠悠2: {
        name: 'luo_sunru_YanShuiYouYou',
        x: [0, 0.4],
        y: [0, 0.15],
        scale: 0.5,
        action: 'DaiJi',
        background: 'skin_sunru_YanShuiYouYou_bg.png',
        luoName: "烟水悠悠"
       },
       鱼游濠水2: {
        name: 'luo_sunru_YuYouHaoShui',
        x: [0, 0.66],
        y: [0, 0.09],
        scale: 0.58,
        action: 'DaiJi',
        angle: -10,
        background: 'skin_sunru_YuYouHaoShui_bg.png',
        luoName: "鱼游濠水"
      },
       },
    sunshangxiang: {
       箭扫荆棘2: {
        name: 'skin_sunshangxiang_JianSaoJingJi2',
        x: [0, 0.45],
        y: [0, 0.51],
        scale: 0.82,
        background: 'skin_sunshangxiang_JianSaoJingJi_bg.png',
        skinName: "箭扫荆棘"
      },
      魅影剑舞2: {
        name: 'skin_sunshangxiang_MeiYingJianWu2',
        x: [-5, 0.4],
        y: [10, 0.45],
        scale: 0.8,
        background: 'skin_sunshangxiang_MeiYingJianWu_bg.png',
        skinName: "魅影剑舞"
      },
      虚拟天团2: {
        name: 'skin_sunshangxiang_XuNiTianTuan2',
        x: [0, 0.7],
        y: [0, 0.45],
        scale: 0.92,
        background: 'skin_sunshangxiang_XuNiTianTuan_bg.png',
        skinName: "虚拟天团"
      },
      英俏佳颜2: {
        name: 'skin_sunshangxiang_YingQiaoJiaYan2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.8,
        angle:5,
        background: 'skin_sunshangxiang_YingQiaoJiaYan_bg.png',
        skinName: "英俏佳颜"
      },
      箭扫荆棘1: {
        name: 'skin_sunshangxiang_JianSaoJingJi1',
        x: [0, 0.35],
        y: [0, 0.31],
        scale: 0.52,
        background: 'skin_sunshangxiang_JianSaoJingJi_bg.png',
        skinName: "箭扫荆棘"
      },
      魅影剑舞1: {
        name: 'skin_sunshangxiang_MeiYingJianWu1',
        x: [-5, 0.5],
        y: [10, 0.2],
        scale: 0.42,
        background: 'skin_sunshangxiang_MeiYingJianWu_bg.png',
        skinName: "魅影剑舞"
      },
      虚拟天团1: {
        name: 'skin_sunshangxiang_XuNiTianTuan1',
        x: [0, 0.74],
        y: [0, 0.35],
        scale: 0.44,
        background: 'skin_sunshangxiang_XuNiTianTuan_bg.png',
        skinName: "虚拟天团"
      },
      英俏佳颜1: {
        name: 'skin_sunshangxiang_YingQiaoJiaYan1',
        x: [0, 0.15],
        y: [0, 0.25],
        scale: 0.5,
        angle:5,
        background: 'skin_sunshangxiang_YingQiaoJiaYan_bg.png',
        skinName: "英俏佳颜"
      },
      星流霆击: {
        name: 'skin_sunshangxiang_XingLiuTingJi',
        x: [0, -0.45],
        y: [0, 0.42],
        scale: 0.45,
        //angle:5,
        action: 'DaiJi',
        background: 'skin_sunshangxiang_XingLiuTingJi_bg.png',
        skinName: "星流霆击"
      },
      花曳心牵2: {
        name: 'skin_shuxiangxiang_HuaYeXinQian2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.8,
        background: 'skin_shuxiangxiang_HuaYeXinQian_bg.png',
        skinName: "花曳心牵"
      },
      花好月圆2: {
        name: 'skin_shuxiangxiang_HuaHaoYueYuan2',
        x: [0, 0.48],
        y: [0, 0.5],
        scale: 0.8,
        background: 'skin_shuxiangxiang_HuaHaoYueYuan_bg.png',
        skinName: "花好月圆"
      },
       花好月圆1: {
        name: 'skin_shuxiangxiang_HuaHaoYueYuan1',
        x: [0, 0.5],
        y: [0, 0.28],
        scale: 0.4,
        background: 'skin_shuxiangxiang_HuaHaoYueYuan_bg.png',
        skinName: "花好月圆"
        },
      明良千古: {
        name: 'skin_shuxiangxiang_MingLiangQianGu',
        x: [15, -0.2],
        y: [0, 0.2],
        scale: 0.4,
        angle:6.5,
        action: 'DaiJi',
        background: 'skin_shuxiangxiang_MingLiangQianGu_bg.png',
        skinName: "明良千古"
      },
       猪年圣诞: {
        name: 'skin_sunshangxiang_ZhuNianShengDan',
        x: [0, 0.4],
        y: [0, 0.22],
        scale: 0.5,
        //angle:5,
        action: 'DaiJi',
        background: 'skin_sunshangxiang_ZhuNianShengDan_bg.png',
        skinName: "猪年圣诞"
      },
      星流霆击2: {
        name: 'luo_sunshangxiang_XingLiuTingJi',
        x: [0, -0.45],
        y: [0, 0.42],
        scale: 0.45,
        //angle:5,
        action: 'DaiJi',
        background: 'skin_sunshangxiang_XingLiuTingJi_bg.png',
        luoName: "星流霆击"
      },
       猪年圣诞2: {
        name: 'luo_sunshangxiang_ZhuNianShengDan',
        x: [0, 0.4],
        y: [0, 0.22],
        scale: 0.5,
        //angle:5,
        action: 'DaiJi',
        background: 'skin_sunshangxiang_ZhuNianShengDan_bg.png',
        luoName: "猪年圣诞"
      },
      },
     taishici: {
       武动乾坤2: {
        name: 'skin_taishici_WuDongQianKun2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.85,
        background: 'skin_taishici_WuDongQianKun_bg.png',
        skinName: "武动乾坤"
        },
       武动乾坤1: {
        name: 'skin_taishici_WuDongQianKun1',
        x: [0, 0.05],
        y: [0, 0.3],
        scale: 0.55,
        angle: -30,
        background: 'skin_taishici_WuDongQianKun_bg.png',
        skinName: "武动乾坤"
        },
        },
      tangji:{
		福泽金蕊2:{
		name: 'skin_tangji_FuZeJinRui2',
		x: [0, 0.5],
		y: [0, 0.45],
		scale: 0.9,
		background: 'skin_tangji_FuZeJinRui_bg.png',
		},
		福泽金蕊1:{
		name: 'skin_tangji_FuZeJinRui1',
		x: [0, 0.05],
		y: [0, 0.58],
		scale: 0.4,
		background: 'skin_tangji_FuZeJinRui_bg.png',
		skinName: "福泽金蕊"
		},
		}, 
     wangji: {
       时之彦士2: {
        name: 'skin_wangji_ShiZhiYanShi2',
        x: [0, 0.45],
        y: [0, 0.46],
        scale: 0.85,
        background: 'skin_wangji_ShiZhiYanShi_bg.png',
        skinName: "时之彦士"
        }, 
       时之彦士1: {
        name: 'skin_wangji_ShiZhiYanShi1',
        x: [0, 0.5],
        y: [0, 0.45],
        scale: 0.35,
        background: 'skin_wangji_ShiZhiYanShi_bg.png',
        skinName: "时之彦士"
        }, 
       独秉固志: {
        name: 'skin_wangji_DuBingGuZhi',
        x: [0, 0.3],
        y: [0, 0.36],
        scale: 0.47,
        background: 'skin_wangji_DuBingGuZhi_bg.png',
        action: 'DaiJi',
        angle: -20,
        skinName: "独秉固志"
       },
       },
    wangcan:{
       手杀: {
        name: 'skin_wangcan_ShouSha',
        x: [0, 1.12],
        y: [0, -0.02],
        scale: 0.55,
        angle: -25,
        action:"DaiJi",
        background: 'skin_wangcan_ShouSha_bg.png',
        skinName: "手杀"
      },
      },
    wanglang: {
      龙袭星落: {
        name: 'skin_wanglang_LongXingLuo',
        x: [0, 0.07],
        y: [5, 0.29],
        scale: 0.5,
        background: 'skin_wanglang_LongXingLuo_bg.png',
        action: 'DaiJi',
        skinName: "龙袭星落"
      },
      },
      wangping:{
        镇北柱国2:{
        name: 'skin_wangping_ZhenBeiZhuGuo2',
        x: [0, 0.47],
        y: [0, 0.52],
        scale: 0.79,
        background: 'skin_wangping_ZhenBeiZhuGuo_bg.png',
        skinName: "镇北柱国"
      },
        镇北柱国1:{
        name: 'skin_wangping_ZhenBeiZhuGuo1',
        x: [0, 0.2],
        y: [0, 0.4],
        scale: 0.35,
        background: 'skin_wangping_ZhenBeiZhuGuo_bg.png',
        skinName: "镇北柱国"
        },
        },
      wangrong: {
       云裳花容2: {
        name: 'skin_wangrong_YunShangHuaRong2',
        x: [0, 0.45],
        y: [0, 0.53],
        scale: 0.8,
        //angle: -5,
        background: 'skin_wangrong_YunShangHuaRong_bg.png',
        skinName: "云裳花容"
       },
       云裳花容1: {
        name: 'skin_wangrong_YunShangHuaRong1',
        x: [0, 0.55],
        y: [0, 0.33],
        scale: 0.5,
        angle: -5,
        background: 'skin_wangrong_YunShangHuaRong_bg.png',
        skinName: "云裳花容"
       },
       },
      wangyun: {
       文和乱武2: {
        name: 'skin_wangyun_WenHeLuanWu2',
        x: [0, 0.45],
        y: [0, 0.53],
        scale: 0.83,
        background: 'skin_wangyun_WenHeLuanWu_bg.png',
        skinName: "文和乱武"
        },
       文和乱武1: {
        name: 'skin_wangyun_WenHeLuanWu1',
        x: [0, 0.3],
        y: [0, 0.35],
        scale: 0.45,
        background: 'skin_wangyun_WenHeLuanWu_bg.png',
        skinName: "文和乱武"
        },
        },
      wangshuang:{
	    攫力执猛2:{
	    name: 'skin_wangshuang_JueLiZhiMeng2',
		x: [0, 0.45],
		y: [0, 0.45],
		scale: 0.88,
		background: 'skin_wangshuang_JueLiZhiMeng_bg.png',
		},
	    攫力执猛1:{
	    name: 'skin_wangshuang_JueLiZhiMeng1',
		x: [0, 0.5],
		y: [0, 0.45],
		scale: 0.4,
		background: 'skin_wangshuang_JueLiZhiMeng_bg.png',
		},
		},
      wangyi: {
       战场绝版2: {
        name: 'skin_wangyi_ZhanChang2',
        x: [0, 0.4],
        y: [0, 0.5],
        scale: 0.82,
       // angle:-15,
        background: 'skin_wangyi_ZhanChang_bg.png',
        skinName: "战场绝版"
      },
       绝色异彩2: {
        name: 'skin_wangyi_JueSeYiCai2',
        x: [16, 0.34],
        y: [10, 0.48],
        scale: 0.752,
        background: 'skin_wangyi_JueSeYiCai_bg.png',
        skinName: "绝色异彩"
      },
       花好月圆2: {
        name: 'skin_wangyi_HuaHaoYueYuan2',
        x: [0, 0.5],
        y: [0, 0.55],
        scale: 0.68,
        background: 'skin_wangyi_HuaHaoYueYuan_bg.png',
        skinName: "花好月圆"
      },
       战场绝版1: {
        name: 'skin_wangyi_ZhanChang1',
        x: [0, -0.01],
        y: [0, 0.35],
        scale: 0.485,
        background: 'skin_wangyi_ZhanChang_bg.png',
        skinName: "战场绝版"
      },
       绝色异彩1: {
        name: 'skin_wangyi_JueSeYiCai1',
        x: [16, 0.5],
        y: [10, 0.3],
        scale: 0.42,
        background: 'skin_wangyi_JueSeYiCai_bg.png',
        skinName: "绝色异彩"
      },
      花好月圆1: {
        name: 'skin_wangyi_HuaHaoYueYuan1',
        x: [0, 0.27],
        y: [0, 0.2],
        scale: 0.45,
        background: 'skin_wangyi_HuaHaoYueYuan_bg.png',
        skinName: "花好月圆"
      },
      轻燕掠影: {
        name: 'skin_wangyi_QingYanLveYing',
        x: [0, 0.4],
        y: [0, 0.22],
        scale: 0.5,
        angle:-30,
        action: 'DaiJi',
        background: 'skin_wangyi_QingYanLveYing_bg.png',
        skinName: "轻燕掠影"
      },
      },
    wangyuanji: {
      鼠年冬至: {
        name: 'skin_wangyuanji_ShuNianDongZhi',
        action: 'DaiJi',
        x: [-24, 0.5],
        y: [8, 0.5],
        scale: 0.6,
        background: 'skin_wangyuanji_ShuNianDongZhi_bg.png',
        skinName: "鼠年冬至"
     },
      鼠年冬至2: {
        name: 'luo_wangyuanji_ShuNianDongZhi',
        action: 'DaiJi',
        x: [-24, 0.5],
        y: [8, 0.5],
        scale: 0.6,
        background: 'skin_wangyuanji_ShuNianDongZhi_bg.png',
        luoName: "鼠年冬至"
     },
     },
     weiyan: {
        麒麟生角: {
        name: 'skin_weiyan_QiLinShengJiao',
        x: [0, 0.59],
        y: [0, 0.45],
        scale: 0.42,
        background: 'skin_weiyan_QiLinShengJiao_bg.png',
        action: 'DaiJi',
        skinName: "麒麟生角"
       },
       },
      weiwenzhugezhi: {
        逐鹿天下2: {
        name: 'skin_weiwenzhugezhi_ZhuLuTianXia2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.8,
        background: 'skin_weiwenzhugezhi_ZhuLuTianXia_bg.png',
        skinName: "逐鹿天下"
       },
        逐鹿天下1: {
        name: 'skin_weiwenzhugezhi_ZhuLuTianXia1',
        x: [0, -0.05],
        y: [0, 0.2],
        scale: 0.5,
        background: 'skin_weiwenzhugezhi_ZhuLuTianXia_bg.png',
        skinName: "逐鹿天下"
       },
       },
      wenyang:{
        紫电清霜2:{
		name: 'skin_wenyang_ZhiDianQingShuang2',
		x: [0, 0.56],
		y: [0, 0.47],
		scale: 0.83,
		angle:10,
		background: 'skin_wenyang_ZhiDianQingShuang_bg.png',
		},
	    紫电清霜1:{
		name: 'skin_wenyang_ZhiDianQingShuang1',
		x: [0, 0.42],
		y: [0, 0.35],
		scale: 0.5,
		angle:10,
		background: 'skin_wenyang_ZhiDianQingShuang_bg.png',
		},
		},
       wuguotai: {
        雍容雅步2: {
        name: 'skin_wuguotai_YongRongYaBu2',
        x: [0, 0.42],
        y: [0, 0.55],
        scale: 0.68,
        background: 'skin_wuguotai_YongRongYaBu_bg.png',
        skinName: "雍容雅步"
        },
        雍容雅步1: {
        name: 'skin_wuguotai_YongRongYaBu1',
        x: [0, 0.42],
        y: [0, 0.35],
        scale: 0.4,
        background: 'skin_wuguotai_YongRongYaBu_bg.png',
        skinName: "雍容雅步"
        },
        }, 
    wutugu: {
       鼠年春节: {
        name: 'skin_wutugu_ShuNianChunJie',
        x: [0, 0.63],
        y: [0, 0.03],
        scale: 0.54,
        angle: -30,
        background: 'skin_wutugu_ShuNianChunJie_bg.png',
        action: 'DaiJi',
        skinName: "鼠年春节"
      },
      },
      wuxian: {
       锦运福绵2: {
        name: 'skin_wuxian_JinYunFuMian2',
        x: [0, 0.5],
        y: [0, 0.55],
        scale: 0.75,
        background: 'skin_wuxian_JinYunFuMian_bg.png',
        skinName: "锦运福绵"
      },
       温婉华贵2: {
        name: 'skin_wuxian_WenWanHuaGui2',
        x: [0, 0.4],
        y: [0, 0.5],
        scale: 0.78,
        background: 'skin_wuxian_WenWanHuaGui_bg.png',
        skinName: "温婉华贵"
      },
        锦运福绵1: {
        name: 'skin_wuxian_JinYunFuMian1',
        x: [0, 0.1],
        y: [0, 0.28],
        scale: 0.52,
        background: 'skin_wuxian_JinYunFuMian_bg.png',
        skinName: "锦运福绵"
      },
      温婉华贵1: {
        name: 'skin_wuxian_WenWanHuaGui1',
        x: [0, 0.8],
        y: [0, 0.15],
        scale: 0.45,
        background: 'skin_wuxian_WenWanHuaGui_bg.png',
        skinName: "温婉华贵"
       },
       金玉满堂1: {
        name: 'skin_wuxian_JinYuManTang1',
        x: [0, 0.54],
        y: [0, 0.3],
        scale: 0.52,
        background: 'skin_wuxian_JinYuManTang_bg.png',
        skinName: "金玉满堂"
        },
        },
     wuyi: {
      燎原流火2: {
        name: 'skin_wuyi_LiaoYuanLiuHuo2',
        x: [0, 0.42],
        y: [0, 0.5],
        scale: 0.75,
        angle: -5,
        background: 'skin_wuyi_LiaoYuanLiuHuo_bg.png',
        skinName: "燎原流火"
      },
      攻取雍凉2: {
        name: 'skin_wuyi_GongQuYongLiang2',
        x: [0, 0.39],
        y: [0, 0.55],
        scale: 0.75,
        angle: -5,
        background: 'skin_wuyi_GongQuYongLiang_bg.png',
        skinName: "攻取雍凉"
      },
       燎原流火1: {
        name: 'skin_wuyi_LiaoYuanLiuHuo1',
        x: [0, 0.05],
        y: [0, -0.2],
        scale: 0.8,
        background: 'skin_wuyi_LiaoYuanLiuHuo_bg.png',
        skinName: "燎原流火"
       },
        攻取雍凉1: {
        name: 'skin_wuyi_GongQuYongLiang1',
        x: [0, 0.88],
        y: [0, 0.12],
        scale: 0.55,
        angle: -5,
        background: 'skin_wuyi_GongQuYongLiang_bg.png',
        skinName: "攻取雍凉"
       },
       },
      xizhicai: {
        逸志俊才2: {
        name: 'skin_xizhicai_YiZhiJunCai2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.85,
        background: 'skin_xizhicai_YiZhiJunCai_bg.png',
        skinName: "逸志俊才"
      },
       扇留魂志2: {
        name: 'skin_xizhicai_ShanLiuHunZhi2',
        x: [0, 0.4],
        y: [0, 0.5],
        scale: 0.78,
        //angle: -10,
        background: 'skin_xizhicai_ShanLiuHunZhi_bg.png',
        skinName: "扇流魂志"
       },
        逸志俊才R: {
        name: 'skin_xizhicai_YiZhiJunCai_R',
        x: [0, -0.01],
        y: [0, 0.3],
        scale: 0.5,
        background: 'skin_xizhicai_YiZhiJunCai_bg.png',
        skinName: "逸志俊才"
      },
       扇留魂志1: {
        name: 'skin_xizhicai_ShanLiuHunZhi1',
        x: [0, 0.05],
        y: [0, 0.5],
        scale: 0.46,
        angle: -10,
        background: 'skin_xizhicai_ShanLiuHunZhi_bg.png',
        skinName: "扇流魂志"
       },
      举棋若定: {
        name: 'skin_xizhicai_JuQiRuoDing',
        x: [0, 0.50],
        y: [0, 0.3],
        scale: 0.5,
        angle: -28,
        action: 'DaiJi',
        background: 'skin_xizhicai_JuQiRuoDing_bg.png',
        skinName: "举棋若定"
      },
       },
     xiahoudun: {
       开疆烈血2: {
        name: 'skin_xiahoudun_KaiJiangLieXue2',
        x: [0, 0.45],
        y: [0, 0.5],
        scale: 0.8,
        background: 'skin_xiahoudun_KaiJiangLieXue_bg.png',
        skinName: "开疆烈血"
       },
       开疆烈血1: {
        name: 'skin_xiahoudun_KaiJiangLieXue1',
        x: [0, 1.15],
        y: [0, 0.35],
        scale: 0.5,
        background: 'skin_xiahoudun_KaiJiangLieXue_bg.png',
        skinName: "开疆烈血"
       },
       },
     xiahouba: {
       玄弓上阵2: {
        name: 'skin_xiahouba_XuanGongShangZhen2',
        x: [0, 0.55],
        y: [0, 0.55],
        scale: 0.7,
        angle: 5,
        background: 'skin_xiahouba_XuanGongShangZhen_bg.png',
        skinName: "玄弓上阵"
       },
       玄弓上阵1: {
        name: 'skin_xiahouba_XuanGongShangZhen1',
        x: [0, 0.56],
        y: [0, 0.35],
        scale: 0.56,
        angle: 5,
        background: 'skin_xiahouba_XuanGongShangZhen_bg.png',
        skinName: "玄弓上阵"
       },
       },
     xiahouyuan: {
       闪光速行2: {
        name: 'skin_xiahouyuan_ShanGuangSuXing2',
        x: [0, 0.56],
        y: [0, 0.55],
        scale: 0.7,
        angle: 10,
        background: 'skin_xiahouyuan_ShanGuangSuXing_bg.png',
        skinName: "闪光速行"
      },
        闪光速行1: {
        name: 'skin_xiahouyuan_ShanGuangSuXing1',
        x: [0, 0.9],
        y: [0, 0.3],
        scale: 0.5,
        angle: 15,
        background: 'skin_xiahouyuan_ShanGuangSuXing_bg.png',
        skinName: "闪光速行"
       },
       },
      xiahoushi: {
        战场绝版2: {
        name: 'skin_xiahoushi_ZhanChang2',
        x: [-8, 0.48],
        y: [-5, 0.5],
        scale: 0.8,
        angle: -10,
        background: 'skin_xiahoushi_ZhanChang_bg.png',
        skinName: "战场绝版"
      },
       端华夏莲2: {
        name: 'skin_xiahoushi_DuanHuaXiaLian2',
        x: [0, 0.5],
        y: [0, 0.53],
        scale: 0.75,
        background: 'skin_xiahoushi_DuanHuaXiaLian_bg.png',
        skinName: "端华夏莲"
      },
       夏花绚烂2: {
        name: 'skin_xiahoushi_XiaHuaXuanLan2',
        x: [0, 0.48],
        y: [0, 0.5],
        scale: 0.74,
        //angle:12,
        background: 'skin_xiahoushi_XiaHuaXuanLan_bg.png',
        skinName: "夏花绚烂"
      },
       星春侯福2: {
        name: 'skin_xiahoushi_XingChunHouFu2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.75,
        background: 'skin_xiahoushi_XingChunHouFu_bg.png',
        skinName: "星春侯福"
       },
        战场绝版1: {
        name: 'skin_xiahoushi_ZhanChang1',
        x: [-8, 0.5],
        y: [-5, 0.4],
        scale: 0.45,
        angle: -20,
        background: 'skin_xiahoushi_ZhanChang_bg.png',
        skinName: "战场绝版"
      },
       端华夏莲1: {
        name: 'skin_xiahoushi_DuanHuaXiaLian1',
        x: [0, 0.5],
        y: [0, 0.3],
        scale: 0.5,
        background: 'skin_xiahoushi_DuanHuaXiaLian_bg.png',
        skinName: "端华夏莲"
      },
       夏花绚烂1: {
        name: 'skin_xiahoushi_XiaHuaXuanLan1',
        x: [0, 0.38],
        y: [0, 0.35],
        scale: 0.44,
        angle:12,
        background: 'skin_xiahoushi_XiaHuaXuanLan_bg.png',
        skinName: "夏花绚烂"
      },
       星春侯福1: {
        name: 'skin_xiahoushi_XingChunHouFu1',
        x: [0, 1.2],
        y: [0, 0.35],
        scale: 0.46,
        angle:-5,
        background: 'skin_xiahoushi_XingChunHouFu_bg.png',
        skinName: "星春侯福"
       },
      猪年中秋: {
        name: 'skin_xiahoushi_ZhuNianZhongQiu',
        x: [0, 0.37],
        y: [0, 0.1],
        scale: 0.55,
        angle:-9,
        action: 'DaiJi',
        background: 'skin_xiahoushi_ZhuNianZhongQiu_bg.png',
        skinName: "猪年中秋"
       },
      猪年中秋2: {
        name: 'luo_xiahoushi_ZhuNianZhongQiu',
        x: [0, 0.37],
        y: [0, 0.1],
        scale: 0.55,
        angle:-9,
        action: 'DaiJi',
        background: 'skin_xiahoushi_ZhuNianZhongQiu_bg.png',
        luoName: "猪年中秋"
       },            
       },
      xiaoqiao: {
        花好月圆2: {
        name: 'skin_xiaoqiao_HuaHaoYueYuan2',
        x: [-40, 0.8],
        y: [5, 0.5],
        scale: 0.75,
        background: 'skin_xiaoqiao_HuaHaoYueYuan_bg.png',
        skinName: "花好月圆"
       },
        软语花香2: {
        name: 'skin_xiaoqiao_RuanYuHuaXiang2',
        x: [0, 0.36],
        y: [0, 0.5],
        scale: 0.78,
        background: 'skin_xiaoqiao_RuanYuHuaXiang_bg.png',
        skinName: "软语花香"
      },
        矫情之花2: {
        name: 'skin_xiaoqiao_JiaoQingZhiHua2',
        x: [0, 0.48],
        y: [0, 0.5],
        scale: 0.78,
        background: 'skin_xiaoqiao_JiaoQingZhiHua_bg.png',
        skinName: "矫情之花"
       },
        花好月圆1: {
        name: 'skin_xiaoqiao_HuaHaoYueYuan1',
        x: [-40, 0.5],
        y: [5, 0.1],
        scale: 0.5,
        background: 'skin_xiaoqiao_HuaHaoYueYuan_bg.png',
        skinName: "花好月圆"
       },
        软语花香1: {
        name: 'skin_xiaoqiao_RuanYuHuaXiang1',
        x: [0, 0.33],
        y: [0, 0.55],
        scale: 0.6,
        background: 'skin_xiaoqiao_RuanYuHuaXiang_bg.png',
        skinName: "软语花香"
      },
        矫情之花1: {
        name: 'skin_xiaoqiao_JiaoQingZhiHua1',
        x: [0, 0.6],
        y: [0, 0.4],
        scale: 0.5,
        background: 'skin_xiaoqiao_JiaoQingZhiHua_bg.png',
        skinName: "矫情之花"
       },
      如花似朵: {
        name: 'skin_xiaoqiao_RuoHuaShiDuo',
        x: [0, 0.5],
        y: [0, 0.2],
        scale: 0.5,
        //angle:5,
        action: 'DaiJi',
        background: 'skin_xiaoqiao_RuoHuaShiDuo_bg.png',
        skinName: "如花似朵"
      },
      采莲江南: {
        name: 'skin_xiaoqiao_CaiLianJiangNan',
        x: [0, 1.5],
        y: [0, 0.2],
        scale: 0.5,
        //angle:5,
        action: 'DaiJi',
        background: 'skin_xiaoqiao_CaiLianJiangNan_bg.png',
        skinName: "采莲江南"
      },
       猪年大雪: {
        name: 'skin_xiaoqiao_ZhuNianDaXue',
        x: [0, 0.45],
        y: [0, 0.35],
        scale: 0.5,
        //angle:15,
        action: 'DaiJi',
        background: 'skin_xiaoqiao_ZhuNianDaXue_bg.png',
        skinName: "猪年大雪"
      },
       鼠年春分: {
        name: 'skin_xiaoqiao_ShuNianChunFen',
        x: [0, -0.65],
        y: [0, 0.2],
        scale: 0.5,
        action: 'DaiJi',
        background: 'skin_xiaoqiao_ShuNianChunFen_bg.png',
        skinName: "鼠年春分"
       },
      采莲江南2: {
        name: 'luo_xiaoqiao_CaiLianJiangNan',
        x: [0, 1.5],
        y: [0, 0.2],
        scale: 0.5,
        //angle:5,
        action: 'DaiJi',
        background: 'skin_xiaoqiao_CaiLianJiangNan_bg.png',
        luoName: "采莲江南"
      },
      如花似朵2: {
        name: 'luo_xiaoqiao_RuoHuaShiDuo',
        x: [0, 0.5],
        y: [0, 0.2],
        scale: 0.5,
        //angle:5,
        action: 'DaiJi',
        background: 'skin_xiaoqiao_RuoHuaShiDuo_bg.png',
        luoName: "如花似朵"
      },
       鼠年春分2: {
        name: 'luo_xiaoqiao_ShuNianChunFen',
        x: [0, -0.65],
        y: [0, 0.2],
        scale: 0.5,
        action: 'DaiJi',
        background: 'skin_xiaoqiao_ShuNianChunFen_bg.png',
        luoName: "鼠年春分"
       },
       猪年大雪2: {
        name: 'luo_xiaoqiao_ZhuNianDaXue',
        x: [0, 0.45],
        y: [0, 0.35],
        scale: 0.5,
        //angle:15,
        action: 'DaiJi',
        background: 'skin_xiaoqiao_ZhuNianDaXue_bg.png',
        luoName: "猪年大雪"
      },
      },
      xinxianying: {
       英装素果2: {
        name: 'skin_xinxianying_YingZhuangSuGuo2',
        x: [38, 0.15],
        y: [0 , 0.65],
        scale: 0.6,
        background: 'skin_xinxianying_YingZhuangSuGuo_bg.png',
        skinName: "英装素果"
       }, 
       英装素果1: {
        name: 'skin_xinxianying_YingZhuangSuGuo1',
        x: [38, 0.53],
        y: [0 , 0.02],
        scale: 0.7,
        background: 'skin_xinxianying_YingZhuangSuGuo_bg.png',
        skinName: "英装素果"
       }, 
       鼠年春节: {
        name: 'skin_xinxianying_ShuNianChunJie',
        x: [0, 0.45],
        y: [0, 0.4],
        scale: 0.4,
        angle:-35,
        action: 'DaiJi',
        background: 'skin_xinxianying_ShuNianChunJie_bg.png',
        skinName: "鼠年春节"
       },
       鼠年春节1: {
        name: 'luo_xinxianying_ShuNianChunJie',
        x: [0, 0.45],
        y: [0, 0.4],
        scale: 0.4,
        angle:-35,
        action: 'DaiJi',
        background: 'skin_xinxianying_ShuNianChunJie_bg.png',
        luoName: "鼠年春节"
       },
       鼠年春节2: {
        name: 'luo_xinxianying_ShuNianChunJie2',
        x: [0, 0.45],
        y: [0, 0.4],
        scale: 0.4,
        angle:-35,
        action: 'DaiJi',
        background: 'skin_xinxianying_ShuNianChunJie_bg.png',
        luoName: "鼠年春节"
       },
       },
      xurong: {
       文和乱武2: {
        name: 'skin_xurong_WenHeLuanWu2',
        x: [0, 0.52],
        y: [0, 0.5],
        scale: 0.76,
        background: 'skin_xurong_WenHeLuanWu_bg.png',
       },
       文和乱武1: {
        name: 'skin_xurong_WenHeLuanWu1',
        x: [0, 0.2],
        y: [0, 0.25],
        scale: 0.66,
        background: 'skin_xurong_WenHeLuanWu_bg.png',
       },
      原皮: {
        name: 'skin_xurong',
        x: [0, 1.6],
        y: [0, 0.38],
        scale: 0.38,
        background: 'skin_xurong_WenHeLuanWu_bg.png',
      },
       烬灭神骇: {
        name: 'skin_xurong_JinMieShenHai',
        x: [0, 0.54],
        y: [0, 0.3],
        scale: 0.45,
        action: 'DaiJi',
        angle: -25,
        background: 'skin_xurong_JinMieShenHai_bg.png',
        skinName: "烬灭神骇"
       },
       },
       xuhuang: {
       挥器扫敌2: {
        name: 'skin_xuhuang_HuiQiSaoDi2',
        x: [0, 0.57],
        y: [0, 0.55],
        scale: 0.82,
        angle: 10,
        background: 'skin_xuhuang_HuiQiSaoDi_bg.png',
        skinName: "挥器扫敌"
      },
        挥器扫敌1: {
        name: 'skin_xuhuang_HuiQiSaoDi1',
        x: [0, 0.25],
        y: [0, 0.4],
        scale: 0.48,
        angle: 10,
        background: 'skin_xuhuang_HuiQiSaoDi_bg.png',
        skinName: "挥器扫敌"
       },
      吴刚: {
        name: 'skin_wugang_ChanGongFaGui',
        x: [0, 0.5],
        y: [0, 0.0],
        scale: 0.65,
        angle: 0,
        action: 'DaiJi',
        background: 'skin_wugang_ChanGongFaGui_bg.png',
        skinName: "吴刚"
      },
      },
      xushi: {
        拈花思君2: {
        name: 'skin_xushi_NianHuaSiJun2',
        x: [0, 0.5],
        y: [0, 0.53],
        scale: 0.75,
        background: 'skin_xushi_WeiFuShiDi_bg.png',
        skinName: "拈花思君"
      },
       为夫弑敌2: {
        name: 'skin_xushi_WeiFuShiDi2',
        x: [0, 0.4],
        y: [0, 0.53],
        scale: 0.74,
        background: 'skin_xushi_WeiFuShiDi_bg.png',
        skinName: "为夫弑敌"
       },
        拈花思君1: {
        name: 'skin_xushi_NianHuaSiJun1',
        x: [0, 0.5],
        y: [0, 0.3],
        scale: 0.5,
        background: 'skin_xushi_WeiFuShiDi_bg.png',
        skinName: "拈花思君"
      },
        冰心玉质1: {
        name: 'skin_xushi_BingxinYuZhi1',
        x: [0, 1.32],
        y: [0, 0.42],
        scale: 0.48,
        background: 'skin_xushi_BingxinYuZhi_bg.png',
        skinName: "冰心玉质"
      },
      战场绝版1: {
        name: 'skin_xushi_ZhanChang1',
        x: [0, 0.3],
        y: [0, 0.4],
        scale: 0.5,
        background: 'skin_xushi_ZhanChang_bg.png',
        skinName: "战场绝版"
      },
       为夫弑敌1: {
        name: 'skin_xushi_WeiFuShiDi1',
        x: [28, 0.5],
        y: [0, 0.3],
        scale: 0.43,
        background: 'skin_xushi_WeiFuShiDi_bg.png',
        skinName: "为夫弑敌"
       },
      冰心玉质2: {
        name: 'skin_xushi_BingxinYuZhi2',
        x: [0, 0.48],
        y: [0, 0.45],
        scale: 0.75,
        background: 'skin_xushi_BingxinYuZhi_bg.png',
        skinName: "冰心玉质"
      },
       为夫弑敌3: {
        name: 'skin_xushi_WeiFuShiDi3',
        x: [28, 0.5],
        y: [0, 0.3],
        scale: 0.43,
        background: 'skin_xushi_WeiFuShiDi_bg.png',
        skinName: "为夫弑敌"
       },
      琪花瑶草: {
        name: 'skin_xushi_QiHuaYaoCao',
        x: [0, 0.75],
        y: [0, 0.22],
        scale: 0.5,
        //angle:5,
        action: 'DaiJi',
        background: 'skin_xushi_QiHuaYaoCao_bg.png',
        skinName: "琪花瑶草"
       },
      琪花瑶草2: {
        name: 'luo_xushi_QiHuaYaoCao',
        x: [0, 0.75],
        y: [0, 0.22],
        scale: 0.5,
        //angle:5,
        action: 'DaiJi',
        background: 'skin_xushi_QiHuaYaoCao_bg.png',
        luoName: "琪花瑶草"
       },
       },
      xuzhu: {
       武动乾坤2: {
        name: 'skin_xuzhu_WuDongQianKun2',
        x: [0, 0.53],
        y: [0, 0.53],
        scale: 0.75,
        background: 'skin_xuzhu_WuDongQianKun_bg.png',
        skinName: "武动乾坤"
       },
       武动乾坤1: {
        name: 'skin_xuzhu_WuDongQianKun1',
        x: [0, 0.15],
        y: [0, 0.25],
        scale: 0.55,
        background: 'skin_xuzhu_WuDongQianKun_bg.png',
        skinName: "武动乾坤"
       },
       虎啸生风: {
        name: 'skin_xuzhu_HuXiaoShengFeng',
        x: [0, 0.42],
        y: [0, 0.35],
        scale: 0.5,
        action: 'DaiJi',
        background: 'skin_xuzhu_HuXiaoShengFeng_bg.png',
        skinName: "虎啸生风"
      },
      },
      xushao: {
       声名鹊起2: {
        name: 'skin_xushao_ShengMingQueQi2',
        x: [0, 0.55],
        y: [0, 0.51],
        scale: 0.7,
        angle: 5,
        background: 'skin_xushao_ShengMingQueQi_bg.png',
        skinName: "声名鹊起"
       },
       声名鹊起1: {
        name: 'skin_xushao_ShengMingQueQi1',
        x: [0, 0.45],
        y: [0, 0.01],
        scale: 0.6,
        angle: 5,
        background: 'skin_xushao_ShengMingQueQi_bg.png',
        skinName: "声名鹊起"
       },
       },
      xuyou: {
       鸿雪寒山2: {
        name: 'skin_xuyou_HongXueHanShan2',
        x: [0, 0.47],
        y: [0, 0.55],
        scale: 0.71,
        background: 'skin_xuyou_HongXueHanShan_bg.png',
        skinName: "鸿雪寒山"
      },
       鸿雪寒山1: {
        name: 'skin_xuyou_HongXueHanShan1',
        x: [0, 0.48],
        y: [0, 0.385],
        scale: 0.4,
        background: 'skin_xuyou_HongXueHanShan_bg.png',
        skinName: "鸿雪寒山"
      },
       逆转官渡1: {
        name: 'skin_xuyou_NiZhuanGuanDu1',
        x: [0, 0.55],
        y: [0, 0.25],
        scale: 0.75,
        background: 'skin_xuyou_NiZhuanGuanDu_bg.png',
        skinName: "逆转官渡"
      },
      盛气凌人: {
        name: 'skin_xuyou_ShengQiLingRen',
        x: [0, 0.47],
        y: [0, -0.18],
        scale: 0.75,
        action: 'DaiJi',
        background: 'skin_xuyou_ShengQiLingRen_bg.png',
        skinName: "盛气凌人"
      },
      },
     re_xunchen: {
      鸿雪寒山2: {
        name: 'skin_xunchen_HongXueHanShan2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.8,
        angle: 10,
        background: 'skin_xunchen_HongXueHanShan_bg.png',
        skinName: "鸿雪寒山"
       },
      鸿雪寒山1: {
        name: 'skin_xunchen_HongXueHanShan1',
        x: [0, 0.45],
        y: [0, 0.28],
        scale: 0.5,
        angle:6,
        background: 'skin_xunchen_HongXueHanShan_bg.png',
        skinName: "鸿雪寒山"
       },
       },
      xunyu: {
      谋定天下2: {
        name: 'skin_xunyu_MouDingTianXia2',
        x: [0, 0.45],
        y: [0, 0.53],
        scale: 0.75,
        background: 'skin_xunyu_MouDingTianXia_bg.png',
        skinName: "谋定天下"
      },
        谋定天下1: {
        name: 'skin_xunyu_MouDingTianXia1',
        x: [0, 0.58],
        y: [0, 0.15],
        scale: 0.48,
        background: 'skin_xunyu_MouDingTianXia_bg.png',
        skinName: "谋定天下"
       },
       },
      xunyou: {
       十二奇策2: {
        name: 'skin_xunyou_ShiErQiCe2',
        x: [0, 0.5],
        y: [0, 0.53],
        scale: 0.75,
        background: 'skin_xunyou_ShiErQiCe_bg.png',
        skinName: "十二奇策"
       },
       },
      xuezong: {
       渡海南征2: {
        name: 'skin_xuezong_DuHaiNanZheng2',
        x: [0, 0.42],
        y: [0, 0.5],
        scale: 0.75,
        background: 'skin_xuezong_DuHaiNanZheng_bg.png',
        skinName: "渡海南征"
        },
       渡海南征1: {
        name: 'skin_xuezong_DuHaiNanZheng1',
        x: [0, -0.25],
        y: [0, 0.2],
        scale: 0.55,
        angle: 2,
        background: 'skin_xuezong_DuHaiNanZheng_bg.png',
        skinName: "渡海南征"
        },
        },
      yangwan: {
       星光淑婉2: {
        name: 'skin_yangwan_XingGuangShuWan2',
        x: [5, 0.38],
        y: [0, 0.5],
        scale: 0.8,
        background: 'skin_yangwan_XingGuangShuWan_bg.png',
        skinName: "星光淑婉"
        },
       星光淑婉1: {
        name: 'skin_yangwan_XingGuangShuWan1',
        x: [5, 0.5],
        y: [0, 0.3],
        scale: 0.42,
        background: 'skin_yangwan_XingGuangShuWan_bg.png',
        skinName: "星光淑婉"
        },
        },
     yanghuiyu: {
       牛年中秋: {
        name: 'skin_yanghuiyu_NiuNianZhongQiu',
        x: [0, -0.17],
        y: [0, 0.45],
        scale: 0.5,
        angle: 25,
        background: 'skin_yanghuiyu_NiuNianZhongQiu_bg.png',
        action: 'DaiJi',
        skinName: "牛年中秋"
       },
       牛年中秋2: {
        name: 'luo_yanghuiyu_NiuNianZhongQiu',
        x: [0, -0.17],
        y: [0, 0.45],
        scale: 0.5,
        angle: 25,
        background: 'skin_yanghuiyu_NiuNianZhongQiu_bg.png',
        action: 'DaiJi',
        luoName: "牛年中秋"
       },
       },
      yangxiu: {
       字字珠玑2: {
        name: 'skin_yangxiu_ZiZiZhuJi2',
        x: [0, 0.4],
        y: [0, 0.53],
        scale: 0.75,
        background: 'skin_yangxiu_ZiZiZhuJi_bg.png',
        skinName: "字字珠玑"
       },
       字字珠玑1: {
        name: 'skin_yangxiu_ZiZiZhuJi1',
        x: [0, 0.5],
        y: [0, 0.35],
        scale: 0.42,
        background: 'skin_yangxiu_ZiZiZhuJi_bg.png',
        skinName: "字字珠玑"
       },
       鼠年端午: {
        name: 'skin_yangxiu_ShuNianDuanWu',
        x: [0, 0.5],
        y: [0, 0.4],
        scale: 0.4,
        action: 'DaiJi',
        background: 'skin_yangxiu_ShuNianDuanWu_bg.png',
        skinName: "鼠年端午"
      },
      },
      yujin: {
        威严毅重: {
        name: 'skin_yujin_WeiYanYiZhong',
        x: [0, 0.15],
        y: [0, 0.29],
        scale: 0.43,
        background: 'skin_yujin_WeiYanYiZhong_bg.png',
        action: 'DaiJi',
        skinName: "威严毅重"
      },
      },
      yuanshao: {
       箭击曹营2: {
        name: 'skin_yuanshao_JianJiCaoYing2',
        x: [0, 0.4],
        y: [0, 0.55],
        scale: 0.77,
        background: 'skin_yuanshao_JianJiCaoYing_bg.png',
        skinName: "箭击曹营"
       },
       箭击曹营1: {
        name: 'skin_yuanshao_JianJiCaoYing1',
        x: [0, 0.4],
        y: [0, 0.35],
        scale: 0.4,
        background: 'skin_yuanshao_JianJiCaoYing_bg.png',
        skinName: "箭击曹营"
       },
      一往无前: {
        name: 'skin_yuanshao_YiWangWuQian',
        x: [0, 0.3],
        y: [0, -0.05],
        scale: 0.65,
        action: "DaiJi",
        angle: -25,
        background: 'skin_yuanshao_YiWangWuQian_bg.png',
        skinName: "一往无前"
      },
      },
    zhangyì: {
       锐不可当: {
        name: 'skin_zhangyì_RuiBuKeDang',
        x: [0, 0.59],
        y: [0, 0.5],
        scale: 0.3,
        angle: 20,
        background: 'skin_zhangyì_RuiBuKeDang_bg.png',
        action: 'DaiJi',
        skinName: "锐不可当"
       },
       },
      zhangchangpu: {
      钟桂香蒲2: {
        name: 'skin_zhangchangpu_ZhongGuiXiangPu2',
        x: [-5, 0.5],
        y: [5, 0.55],
        scale: 0.7,
        background: 'skin_zhangchangpu_ZhongGuiXiangPu_bg.png',
        skinName: "钟桂香蒲"
      },
      战场绝版2: {
        name: 'skin_zhangchangpu_ZhanChang2',
        x: [0, 0.4],
        y: [0, 0.5],
        scale: 0.75,
        angle:-15,
        background: 'skin_zhangchangpu_ZhanChang_bg.png',
        skinName: "战场绝版"
      },
       钟桂香蒲1: {
        name: 'skin_zhangchangpu_ZhongGuiXiangPu1',
        x: [-5, 0.5],
        y: [5, 0.3],
        scale: 0.43,
        background: 'skin_zhangchangpu_ZhongGuiXiangPu_bg.png',
        skinName: "钟桂香蒲"
      },
      战场绝版1: {
        name: 'skin_zhangchangpu_ZhanChang1',
        x: [0, 0.38],
        y: [0, 0.36],
        scale: 0.56,
        angle:-15,
        background: 'skin_zhangchangpu_ZhanChang_bg.png',
        skinName: "战场绝版"
      },
      寄情山水1: {
        name: 'skin_zhangchangpu_JiQinShanShui1',
        x: [0, 0.5],
        y: [0, 0.2],
        scale: 0.52,
        angle:5,
        background: 'skin_zhangchangpu_JiQinShanShui_bg.png',
        skinName: "寄情山水"
       },
       },
      zhangchunhua: {
      战场绝版2: {
        name: 'skin_zhangchunhua_ZhanChang2',
        x: [0, 0.54],
        y: [0, 0.55],
        scale: 0.75,
        angle: 10,
        background: 'skin_zhangchunhua_ZhanChang_bg.png',
        skinName: "战场绝版"
      },
      月下逐华2: {
        name: 'skin_zhangchunhua_YueYeZhuHua2',
        x: [0, 0.44],
        y: [0, 0.55],
        scale: 0.78,
        background: 'skin_zhangchunhua_YueYeZhuHua_bg.png',
        skinName: "月下逐华"
      },
      绰约多姿2: {
        name: 'skin_zhangchunhua_ChuoYueDuoZi2',
        x: [0, 0.45],
        y: [0, 0.5],
        scale: 0.77,
        background: 'skin_zhangchunhua_ZhanChang_bg.png',
        skinName: "绰约多姿"
      },
       战场绝版1: {
        name: 'skin_zhangchunhua_ZhanChang1',
        x: [0, 0.44],
        y: [0, 0.35],
        scale: 0.485,
        angle: 10,
        background: 'skin_zhangchunhua_ZhanChang_bg.png',
        skinName: "战场绝版"
      },
       月下逐华1: {
        name: 'skin_zhangchunhua_YueYeZhuHua1',
        x: [0, -0.55],
        y: [0, 0.22],
        scale: 0.52,
        background: 'skin_zhangchunhua_YueYeZhuHua_bg.png',
        skinName: "月下逐华"
      },
       绰约多姿1: {
        name: 'skin_zhangchunhua_ChuoYueDuoZi1',
        x: [0, 0.4],
        y: [0, 0.25],
        scale: 0.4,
        background: 'skin_zhangchunhua_ZhanChang_bg.png',
        skinName: "绰约多姿"
       },
       手杀: {
        name: 'skin_zhangchunhua_ShouSha',
        x: [0, 0.02],
        y: [0, 0.37],
        scale: 0.36,
        //angle:5,
        action: 'DaiJi',
        background: 'skin_zhangchunhua_ShouSha_bg.png',
        skinName: "手杀"
      },
      宣穆夜袭: {
        name: 'skin_zhangchunhua_XuanMuYeXi',
        x: [0, 0.3],
        y: [0, 0.25],
        scale: 0.5,
        //angle:5,
        action: 'DaiJi',
        background: 'skin_zhangchunhua_XuanMuYeXi_bg.png',
        skinName: "宣穆夜袭"
      },
      牛年立冬: {
        name: 'skin_zhangchunhua_NiuNianLiDong',
        x: [0, 0.4],
        y: [0, 0.3],
        scale: 0.5,
        //angle:5,
        action: 'DaiJi',
        background: 'skin_zhangchunhua_NiuNianLiDong_bg.png',
        skinName: "牛年立冬"
       },
      牛年立冬2: {
        name: 'luo_zhangchunhua_NiuNianLiDong',
        x: [0, 0.4],
        y: [0, 0.3],
        scale: 0.5,
        //angle:5,
        action: 'DaiJi',
        background: 'skin_zhangchunhua_NiuNianLiDong_bg.png',
        luoName: "牛年立冬"
       },
      宣穆夜袭2: {
        name: 'luo_zhangchunhua_XuanMuYeXi',
        x: [0, 0.3],
        y: [0, 0.25],
        scale: 0.5,
        //angle:5,
        action: 'DaiJi',
        background: 'skin_zhangchunhua_XuanMuYeXi_bg.png',
        luoName: "宣穆夜袭"
      },
       },
    zhangfei: {
      武动乾坤2: {
        name: 'skin_zhangfei_WuDongQianKun2',
        x: [0, 0.5],
        y: [0, 0.55],
        scale: 0.7,
        background: 'skin_zhangfei_WuDongQianKun_bg.png',
        skinName: "武动乾坤"
      },
      险棋激战2: {
        name: 'skin_zhangfei_XianQiJiZhan2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.75,
        background: 'skin_zhangfei_XianQiJiZhan_bg.png',
        skinName: "险棋激战"
      },
      武动乾坤1: {
        name: 'skin_zhangfei_WuDongQianKun1',
        x: [0, -0.1],
        y: [0, 0.35],
        scale: 0.55,
        angle:-5,
        background: 'skin_zhangfei_WuDongQianKun_bg.png',
        skinName: "武动乾坤"
      },
      险棋激战1: {
        name: 'skin_zhangfei_XianQiJiZhan1',
        x: [0, -0.5],
        y: [0, 0.35],
        scale: 0.55,
        background: 'skin_zhangfei_XianQiJiZhan_bg.png',
        skinName: "险棋激战"
      },
      据水断桥: {
        name: 'skin_zhangfei_JuShuiDuanQiao',
        x: [0, 0],
        y: [0, 0.14],
        scale: 0.58,
        angle: 5,
        background: 'skin_zhangfei_JuShuiDuanQiao_bg.png',
        action: 'DaiJi',
        skinName: "据水断桥"
      },
      猪年中秋: {
        name: 'skin_zhangfei_ZhuNianZhongQiu',
        x: [0, 0.5],
        y: [0, 0.2],
        scale: 0.5,
        //angle:10,
        action: 'DaiJi',
        background: 'skin_zhangfei_ZhuNianZhongQiu_bg.png',
        skinName: "猪年中秋"
      },
      },
      zhanggong: {
       逐鹿天下2: {
        name: 'skin_zhanggong_ZhuLuTianXia2',
        x: [0, 0.5],
        y: [0, 0.52],
        scale: 0.75,
        background: 'skin_zhanggong_ZhuLuTianXia_bg.png',
        skinName: "逐鹿天下"
       },
       逐鹿天下1: {
        name: 'skin_zhanggong_ZhuLuTianXia1',
        x: [0, 0.88],
        y: [0, 0.25],
        scale: 0.52,
        background: 'skin_zhanggong_ZhuLuTianXia_bg.png',
        skinName: "逐鹿天下"
       },
       },
      zhangjiao: {
	    大贤良师2:{
	 	name: 'skin_zhangjiao_DaXianLiangShi2',
		x: [0, 0.48],
		y: [0, 0.5],
		scale: 0.77,
		background: 'skin_zhangjiao_DaXianLiangShi_bg.png',
       },
	    大贤良师1:{
	 	name: 'skin_zhangjiao_DaXianLiangShi1',
		x: [0, 0.3],
		y: [0, 0.35],
		scale: 0.535,
		background: 'skin_zhangjiao_DaXianLiangShi_bg.png',
       },
        迅雷风烈: {
        name: 'skin_zhangjiao_XunLeiFengLie',
        x: [0, 0.3],
        y: [0, 0.09],
        scale: 0.6,
        action: 'DaiJi',
        background: 'skin_zhangjiao_XunLeiFengLie_bg.png',
        skinName: "迅雷风烈"
       },
       },
      zhangji: {
      文和乱武2: {
        name: 'skin_zhangji_WenHeLuanWu2',
        x: [0, 0.39],
        y: [0, 0.51],
        scale: 0.72,
        angle: -10,
        background: 'skin_zhangji_WenHeLuanWu_bg.png',
        skinName: "文和乱武"
      },
       文和乱武1: {
        name: 'skin_zhangji_WenHeLuanWu1',
        x: [0, 0.71],
        y: [0, 0.12],
        scale: 0.6,
        angle: -10,
        background: 'skin_zhangji_WenHeLuanWu_bg.png',
        skinName: "文和乱武"
       },
       },
      zhanghe: {
       汉中溃蜀2: {
        name: 'skin_zhanghe_HanZhongKuiShu2',
        x: [0, 0.5],
        y: [0, 0.55],
        scale: 0.78,
        background: 'skin_zhanghe_HanZhongKuiShu_bg.png',
        skinName: "汉中溃蜀"
      },
       汉中溃蜀1: {
        name: 'skin_zhanghe_HanZhongKuiShu1',
        x: [0, 0.15],
        y: [0, 0.21],
        scale: 0.6,
        angle: 15,
        background: 'skin_zhanghe_HanZhongKuiShu_bg.png',
        skinName: "汉中溃蜀"
      },
     背水一战: {         
       name: 'skin_zhanghe_BeiShuiYiZhan',         
       x: [0, 0.52],         
       y: [0, 0.38],         
       scale: 0.45,         
       angle: 20,         
       background: 'skin_zhanghe_BeiShuiYiZhan_bg.png',
       action: 'DaiJi',         
       skinName: "背水一战"       
      },
      },
     zhangliao: {
       武动乾坤2: {
        name: 'skin_zhangliao_WuDongQianKun2',
        x: [0, 0.43],
        y: [5, 0.55],
        scale: 0.75,
        background: 'skin_zhangliao_WuDongQianKun_bg.png',
        skinName: "武动乾坤"
      },
       威震逍遥2: {
        name: 'skin_zhangliao_WeiZhenXiaoYao2',
        x: [0, 0.47],
        y: [0, 0.55],
        scale: 0.75,
        //angle:30,
        background: 'skin_zhangliao_WeiZhenXiaoYao_bg.png',
        skinName: "威震逍遥"
      },
       武动乾坤1: {
        name: 'skin_zhangliao_WuDongQianKun1',
        x: [0, 0.03],
        y: [5, 0.15],
        scale: 0.65,
        background: 'skin_zhangliao_WuDongQianKun_bg.png',
        skinName: "武动乾坤"
      },
       威震逍遥1: {
        name: 'skin_zhangliao_WeiZhenXiaoYao1',
        x: [0, 0.2],
        y: [0, 0.12],
        scale: 0.45,
        angle:30,
        background: 'skin_zhangliao_WeiZhenXiaoYao_bg.png',
        skinName: "威震逍遥"
       },
       },
      zhanglu: {
       逐鹿天下1: {
        name: 'skin_zhanglu_ZhuLuTianXia1',
        x: [0, -0.04],
        y: [0, 0.05],
        scale: 0.65,
        angle: -10,
        background: 'skin_zhanglu_ZhuLuTianXia_bg.png',
        skinName: "逐鹿天下"
       },
      逐鹿天下2: {
        name: 'skin_zhanglu_ZhuLuTianXia2',
        x: [0, 0.4],
        y: [0, 0.5],
        scale: 0.78,
        angle: -10,
        background: 'skin_zhanglu_ZhuLuTianXia_bg.png',
        skinName: "逐鹿天下"
      },
       登锋陷阵: {
        name: 'skin_zhangliao_DengFengXianZhen',
        x: [0, 0.63],
        y: [5, -0.15],
        scale: 0.7,
        action: 'DaiJi',
        background: 'skin_zhangliao_DengFengXianZhen_bg.png',
        skinName: "登锋陷阵"
       },
       },
     zhangqiying: {
      岁稔年丰2: {
        name: 'skin_zhangqiying_SuiRenNianFeng2',
        x: [5, 0.5],
        y: [15, 0.55],
        scale: 0.63,
        background: 'skin_zhangqiying_SuiRenNianFeng_bg.png',
        skinName: "岁稔年丰"
      },
      逐鹿天下2: {
        name: 'skin_zhangqiying_ZhuLuTianXia2',
        x: [0, 0.45],
        y: [0, 0.53],
        scale: 0.7,
        background: 'skin_zhangqiying_ZhuLuTianXia_bg.png',
        skinName: "逐鹿天下"
      },
       岁稔年丰1: {
        name: 'skin_zhangqiying_SuiRenNianFeng1',
        x: [5, 0.5],
        y: [15, 0.4],
        scale: 0.42,
        background: 'skin_zhangqiying_SuiRenNianFeng_bg.png',
        skinName: "岁稔年丰"
      },
       逐鹿天下1: {
        name: 'skin_zhangqiying_ZhuLuTianXia1',
        x: [0, 0.1],
        y: [0, 0.3],
        scale: 0.5,
        background: 'skin_zhangqiying_ZhuLuTianXia_bg.png',
        skinName: "逐鹿天下"
       },
       },
     zhangxingcai: {
       星春侯福2: {
        name: 'skin_zhangxingcai_XingChunHouFu2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.85,
        background: 'skin_zhangxingcai_XingChunHouFu_bg.png',
        skinName: "星春侯福"
       },
       凯旋星花2: {
        name: 'skin_zhangxingcai_KaiXuanXingHua2',
        x: [-15, 0.5],
        y: [15, 0.45],
        scale: 0.7,
        background: 'skin_zhangxingcai_KaiXuanXingHua_bg.png',
        skinName: "凯旋星花"
       },
       枪碎星河2: {
        name: 'skin_zhangxingcai_QiangSuiXingHe2',
        x: [0, 0.58],
        y: [0, 0.5],
        scale: 0.75,
        angle:15,
        background: 'skin_zhangxingcai_QiangSuiXingHe_bg.png',
        skinName: "枪碎星河"
       },
       父志耀星2: {
        name: 'skin_zhangxingcai_FuZhiYaoXing2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.78,
        angle: 8,
        background: 'skin_zhangxingcai_FuZhiYaoXing_bg.png',
        skinName: "父志耀星"
       },
      星花柔矛2: {
        name: 'skin_zhangxingcai_XingHuaRouMao2',
        x: [0, 0.4],
        y: [0, 0.55],
        scale: 0.74,
        angle:-5,
        background: 'skin_zhangxingcai_XingHuaRouMao_bg.png',
        skinName: "星花柔矛"
      },
      星春侯福1: {
        name: 'skin_zhangxingcai_XingChunHouFu1',
        x: [0, 0.2],
        y: [0, 0.6],
        scale: 0.5,
        background: 'skin_zhangxingcai_XingChunHouFu_bg.png',
        skinName: "星春侯福"
      },
      凯旋星花1: {
        name: 'skin_zhangxingcai_KaiXuanXingHua1',
        x: [-15, 0.5],
        y: [15, 0.2],
        scale: 0.55,
        background: 'skin_zhangxingcai_KaiXuanXingHua_bg.png',
        skinName: "凯旋星花"
      },
      枪碎星河1: {
        name: 'skin_zhangxingcai_QiangSuiXingHe1',
        x: [0, 0.3],
        y: [0, 0.1],
        scale: 0.55,
        angle:15,
        background: 'skin_zhangxingcai_QiangSuiXingHe_bg.png',
        skinName: "枪碎星河"
      },
      星花柔矛1: {
        name: 'skin_zhangxingcai_XingHuaRouMao1',
        x: [0, 0.95],
        y: [0, 0.25],
        scale: 0.5,
        angle:-5,
        background: 'skin_zhangxingcai_XingHuaRouMao_bg.png',
        skinName: "星花柔矛"
      },
       父志耀星1: {
        name: 'skin_zhangxingcai_FuZhiYaoXing1',
        x: [0, 0.05],
        y: [0, 0.2],
        scale: 0.6,
        angle:8,
        background: 'skin_zhangxingcai_FuZhiYaoXing_bg.png',
        skinName: "父志耀星"
       },
      猪年中秋: {
        name: 'skin_zhangxingcai_ZhuNianZhongQiu',
        x: [0, 0.55],
        y: [0, 0.35],
        scale: 0.5,
        //angle:10,
        action: 'DaiJi',
        background: 'skin_zhangxingcai_ZhuNianZhongQiu_bg.png',
        skinName: "猪年中秋"
       },
      猪年中秋2: {
        name: 'luo_zhangxingcai_ZhuNianZhongQiu',
        x: [0, 0.55],
        y: [0, 0.35],
        scale: 0.5,
        //angle:10,
        action: 'DaiJi',
        background: 'skin_zhangxingcai_ZhuNianZhongQiu_bg.png',
        luoName: "猪年中秋"
       },
       },
     zhangxiu: {
      逐鹿天下2: {
        name: 'skin_zhangxiu_ZhuLuTianXia2',
        x: [0, 0.52],
        y: [0, 0.5],
        scale: 0.78,
        background: 'skin_zhangxiu_ZhuLuTianXia_bg.png',
        skinName: "逐鹿天下"
      },
      龙骧虎视2: {
        name: 'skin_zhangxiu_LongXiangHuShi2',
        x: [0, 0.45],
        y: [0, 0.55],
        scale: 0.72,
        background: 'skin_zhangxiu_LongXiangHuShi_bg.png',
        skinName: "龙骧虎视"
       },
      逐鹿天下1: {
        name: 'skin_zhangxiu_ZhuLuTianXia1',
        x: [0, 0.82],
        y: [0, 0.38],
        scale: 0.475,
        background: 'skin_zhangxiu_ZhuLuTianXia_bg.png',
        skinName: "逐鹿天下"
      },
      龙骧虎视1: {
        name: 'skin_zhangxiu_LongXiangHuShi1',
        x: [0, 0.12],
        y: [0, 0.12],
        scale: 0.55,
        background: 'skin_zhangxiu_LongXiangHuShi_bg.png',
        skinName: "龙骧虎视"
       },
       },
    zhangzhang: {
      锦运绵长2: {
        name: 'skin_zhangzhang_JinYunMianChang2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.78,
        //angle: 5,
        background: 'skin_zhangzhang_JinYunMianChang_bg.png',
        skinName: "锦运绵长"
      },
       锦运绵长1: {
        name: 'skin_zhangzhang_JinYunMianChang1',
        x: [0, 0.5],
        y: [0, 0.2],
        scale: 0.45,
        angle: 5,
        background: 'skin_zhangzhang_JinYunMianChang_bg.png',
        skinName: "锦运绵长"
        },
        },
     zhaoxiang: {
      芳芷飒敌2: {
        name: 'skin_zhaoxiang_FangZhiSaDi2',
        x: [0, 0.45],
        y: [0, 0.48],
        scale: 0.85,
        background: 'skin_zhaoxiang_FangZhiSaDi_bg.png',
        skinName: "芳芷飒敌"
      },
       芳芷飒敌1: {
        name: 'skin_zhaoxiang_FangZhiSaDi1',
        x: [0, 0.22],
        y: [0, 0.45],
        scale: 0.34,
        background: 'skin_zhaoxiang_FangZhiSaDi_bg.png',
        skinName: "芳芷飒敌"
       },
       猪年春节: {
        name: 'skin_zhaoxiang_ZhuNianChunJie',
        x: [0, 0.55],
        y: [0, 0.35],
        scale: 0.5,
        //angle:10,
        action: 'DaiJi',
        background: 'skin_zhaoxiang_ZhuNianChunJie_bg.png',
        skinName: "猪年春节"
       },
       猪年春节2: {
        name: 'luo_zhaoxiang_ZhuNianChunJie',
        x: [0, 0.55],
        y: [0, 0.35],
        scale: 0.5,
        //angle:10,
        action: 'DaiJi',
        background: 'skin_zhaoxiang_ZhuNianChunJie_bg.png',
        luoName: "猪年春节"
       },
       },
    zhaoyun: {
      常山白龙2:{
		name: 'skin_zhaoyun_ChangShanBaiLong2',
		x: [0, 0.53],
		y: [0, 0.57],
		scale: 0.7,	
		angle:5,
		background: 'skin_zhaoyun_ChangShanBaiLong_bg.png',
	},
      常山白龙1:{
		name: 'skin_zhaoyun_ChangShanBaiLong1',
		x: [0, 0.2],
		y: [0, 0.35],
		scale: 0.38,
		angle:5,
		background: 'skin_zhaoyun_ChangShanBaiLong_bg.png',
       },
      单骑救主: {
        name: 'skin_zhaoyun_DanJiJiuZhu',
        x: [0, 0.53],
        y: [0, 0.53],
        scale: 0.49,
        angle: -10,
        action: 'DaiJi',
        background: 'skin_zhaoyun_DanJiJiuZhu_bg.png',
        skinName: "单骑救主"
       }, 
      烟绚繁星2: {
        name: 'skin_zhaoyun_YanXuanFanHua2',
        x: [0, 0.4],
        y: [0, 0.55],
        scale: 0.72,
        background: 'skin_zhaoyun_YanXuanFanHua_bg.png',
        skinName: "烟绚繁星"
      },
      武动乾坤2: {
        name: 'skin_zhaoyun_WuDongQianKun2',
        x: [0, 0.48],
        y: [0, 0.58],
        scale: 0.7,
        background: 'skin_zhaoyun_WuDongQianKun_bg.png',
        skinName: "武动乾坤"
      },
      战场游龙2: {
        name: 'skin_zhaoyun_ZhanChangYouLong2',
        x: [0, 0.53],
        y: [0, 0.56],
        scale: 0.75,
        //angle:-10,
        background: 'skin_zhaoyun_ZhanChangYouLong_bg.png',
        skinName: "战场游龙"
      },
        烟绚繁星1: {
        name: 'skin_zhaoyun_YanXuanFanHua1',
        x: [0, 0.4],
        y: [0, 0.12],
        scale: 0.53,
        background: 'skin_zhaoyun_YanXuanFanHua_bg.png',
        skinName: "烟绚繁星"
      },
       武动乾坤1: {
        name: 'skin_zhaoyun_WuDongQianKun1',
        x: [0, 0.55],
        y: [0, 0.25],
        scale: 0.6,
        background: 'skin_zhaoyun_WuDongQianKun_bg.png',
        skinName: "武动乾坤"
      },
       战场游龙1: {
        name: 'skin_zhaoyun_ZhanChangYouLong1',
        x: [0, 0.13],
        y: [0, 0.4],
        scale: 0.5,
        //angle:-10,
        background: 'skin_zhaoyun_ZhanChangYouLong_bg.png',
        skinName: "战场游龙"
       },
      截江救主: {
        name: 'skin_zhaoyun_JieJiangJiuZhu',
        x: [0, 0.65],
        y: [0, 0.4],
        scale: 0.5,
        angle:-10,
        action: 'DaiJi',
        background: 'skin_zhaoyun_JieJiangJiuZhu_bg.png',
        skinName: "截江救主"
      },
      牛年春节: {
        name: 'skin_zhaoyun_NiuNianChunJie',
        x: [0, 0.85],
        y: [0, 0.2],
        scale: 0.5,
        action: 'DaiJi',
        background: 'skin_zhaoyun_NiuNianChunJie_bg.png',
        skinName: "牛年春节"
       },
       },
    zhenji: {
      才颜双绝2: {
        name: 'skin_zhenji_CaiYanShuangJue2',
        x: [0, 0.46],
        y: [0, 0.6],
        scale: 0.72,
        background: 'skin_zhenji_CaiYanShuangJue_bg.png',
        skinName: "才颜双绝"
      },
       虚拟天团2: {
        name: 'skin_zhenji_XuNiTianTuan2',
        x: [0, 0.6],
        y: [0, 0.5],
        scale: 0.8,
        angle: -20,
        background: 'skin_zhenji_XuNiTianTuan_bg.png',
        skinName: "虚拟天团"
      },
       洛神御水2: {
        name: 'skin_zhenji_LuoShenYuShui2',
        x: [0, 0.4],
        y: [0, 0.52],
        scale: 0.75,
        angle:9,
        background: 'skin_zhenji_LuoShenYuShui_bg.png',
        skinName: "洛神御水"
      },
       月夜情满2: {
        name: 'skin_zhenji_YueYeQingMan2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.75,
        background: 'skin_zhenji_YueYeQingMan_bg.png',
        skinName: "月夜情满"
      },
       花好月圆2: {
        name: 'skin_zhenji_HuaHaoYueYuan2',
        x: [0, 0.22],
        y: [0, 0.4],
        scale: 0.75,
        background: 'skin_zhenji_HuaHaoYueYuan_bg.png',
        skinName: "花好月圆"
      },
      文昭皇后2: {
        name: 'skin_zhenji_WenZhaoHuangHou2',
        x: [0, 0.68],
        y: [0, 0.5],
        scale: 0.77,
        angle: 20,
        background: 'skin_zhenji_WenZhaoHuangHou_bg.png',
        skinName: "文昭皇后"
      },
        翩若惊鸿2: {
        name: 'skin_zhenji_PianRuoJingHong2',
        x: [0, 0.37],
        y: [0, 0.45],
        scale: 0.8,
        //angle: 20,
        background: 'skin_zhenji_PianRuoJingHong_bg.png',
        skinName: "翩若惊鸿"
      },
      才颜双绝1: {
        name: 'skin_zhenji_CaiYanShuangJue1',
        x: [20, 0.5],
        y: [0, 0.3],
        scale: 0.45,
        background: 'skin_zhenji_CaiYanShuangJue_bg.png',
        skinName: "才颜双绝"
      },
       虚拟天团1: {
        name: 'skin_zhenji_XuNiTianTuan1',
        x: [0, 0.8],
        y: [0, 0.25],
        scale: 0.45,
        angle: -20,
        background: 'skin_zhenji_XuNiTianTuan_bg.png',
        skinName: "虚拟天团"
      },
       洛神御水1: {
        name: 'skin_zhenji_LuoShenYuShui1',
        x: [0, -0.25],
        y: [0, 0.25],
        scale: 0.5,
        angle:9,
        background: 'skin_zhenji_LuoShenYuShui_bg.png',
        skinName: "洛神御水"
      },
       月夜情满1: {
        name: 'skin_zhenji_YueYeQingMan1',
        x: [0, 1.65],
        y: [0, 0.35],
        scale: 0.55,
        background: 'skin_zhenji_YueYeQingMan_bg.png',
        skinName: "月夜情满"
      },
       花好月圆1: {
        name: 'skin_zhenji_HuaHaoYueYuan1',
        x: [0, 0.21],
        y: [0, 0.2],
        scale: 0.42,
        background: 'skin_zhenji_HuaHaoYueYuan_bg.png',
        skinName: "花好月圆"
      },
       临水照花1: {
        name: 'skin_zhenji_LinShuiZhaoHua1',
        x: [0, 1.3],
        y: [0, 0.16],
        scale: 0.55,
        angle:-18,
        background: 'skin_zhenji_LinShuiZhaoHua_bg.png',
        skinName: "临水照花"
      },
       文昭皇后1: {
        name: 'skin_zhenji_WenZhaoHuangHou1',
        x: [0, 0.4],
        y: [0, 0.45],
        scale: 0.5,
        angle: 20,
        background: 'skin_zhenji_WenZhaoHuangHou_bg.png',
        skinName: "文昭皇后"
      },
        翩若惊鸿1: {
        name: 'skin_zhenji_PianRuoJingHong1',
        x: [0, 0.15],
        y: [0, 0.12],
        scale: 0.53,
        background: 'skin_zhenji_PianRuoJingHong_bg.png',
        skinName: "翩若惊鸿"
       },
       闺中博士: {
        name: 'skin_zhenji_GuiZhongBoShi',
        x: [-35, 1.05],
        y: [0, 0.35],
        scale: 0.35,
        angle: -5,
        action: 'DaiJi',
        background: 'skin_zhenji_GuiZhongBoShi_bg.png',
      },
       牛年清明: {
        name: 'skin_zhenji_NiuNianQingMing',
        x: [0, 0.5],
        y: [0, 0.3],
        scale: 0.55,
        angle:9,
        action: 'DaiJi',
        background: 'skin_zhenji_NiuNianQingMing_bg.png',
        skinName: "牛年清明"
      },
       洛水神韵: {
        name: 'skin_zhenji_LuoShuiShenYun',
        x: [0, 0.5],
        y: [0, 0.09],
        scale: 0.5,
        background: 'skin_zhenji_LuoShuiShenYun_bg.png',
        skinName: "洛水神韵"
       },
       洛水神韵2: {
        name: 'luo_zhenji_LuoShuiShenYun',
        x: [0, 0.5],
        y: [0, 0.09],
        scale: 0.5,
        background: 'skin_zhenji_LuoShuiShenYun_bg.png',
        luoName: "洛水神韵"
       },
       牛年清明2: {
        name: 'luo_zhenji_NiuNianQingMing',
        x: [0, 0.5],
        y: [0, 0.3],
        scale: 0.55,
        angle:9,
        action: 'DaiJi',
        background: 'skin_zhenji_NiuNianQingMing_bg.png',
        luoName: "牛年清明"
      },
       },
      zhonghui: {
      钟桂香蒲2: {
        name: 'skin_zhonghui_ZhongGuiXiangPu2',
        x: [0, 0.45],
        y: [0, 0.55],
        scale: 0.75,
        background: 'skin_zhonghui_ZhongGuiXiangPu_bg.png',
        skinName: "钟桂香蒲"
      },
       精炼策数2: {
         name: 'skin_zhonghui_JingLianCeShu2',
         x: [0, 0.5],
         y: [0, 0.55],
         scale: 0.71,
         background: 'skin_zhonghui_JingLianCeShu_bg.png',
         skinName: "精炼策数"
       },
      钟桂香蒲1: {
        name: 'skin_zhonghui_ZhongGuiXiangPu1',
        x: [0, 0.66],
        y: [0, 0.48],
        scale: 0.35,
        angle:-12,
        background: 'skin_zhonghui_ZhongGuiXiangPu_bg.png',
        skinName: "钟桂香蒲"
      },
       精炼策数1: {
         name: 'skin_zhonghui_JingLianCeShu1',
         x: [0, 0.28],
         y: [0, 0.24],
         scale: 0.38,
         background: 'skin_zhonghui_JingLianCeShu_bg.png',
         skinName: "精炼策数"
       },
       谋谟之勋: {
        name: 'skin_zhonghui_MouMoZhiXun',
        x: [0, 0.46],
        y: [0, 0.73],
        scale: 0.63,
        action: 'DaiJi',
        background: 'skin_zhonghui_MouMoZhiXun_bg.png',
        skinName: "谋谟之勋"
      },
      },
    zhongyao: {
      钟桂香蒲2: {
        name: 'skin_zhongyao_ZhongGuiXiangPu2',
        x: [0, 0.45],
        y: [0, 0.55],
        scale: 0.72,
        angle:-5,
        background: 'skin_zhongyao_ZhongGuiXiangPu_bg.png',
        skinName: "钟桂香蒲"
      },
      挥毫代诏2: {
        name: 'skin_zhongyao_HuiHaoDaiZhao2',
        x: [0, 0.5],
        y: [0, 0.52],
        scale: 0.79,
        background: 'skin_zhongyao_HuiHaoDaiZhao_bg.png',
        skinName: "挥毫代诏"
      },
      钟桂香蒲1: {
        name: 'skin_zhongyao_ZhongGuiXiangPu1',
        x: [0, 0.55],
        y: [0, 0.3],
        scale: 0.42,
        angle:-5,
        background: 'skin_zhongyao_ZhongGuiXiangPu_bg.png',
        skinName: "钟桂香蒲"
      },
      挥毫代诏1: {
        name: 'skin_zhongyao_HuiHaoDaiZhao1',
        x: [0, 0.05],
        y: [0, 0.25],
        scale: 0.5,
        background: 'skin_zhongyao_HuiHaoDaiZhao_bg.png',
        skinName: "挥毫代诏"
       },
       稳定关右: {
        name: 'skin_zhongyao_WenDingGuanYou',
        x: [0, 0.55],
        y: [0, 0.2],
        scale: 0.5,
        angle:-10,
        action: 'DaiJi',
        background: 'skin_zhongyao_WenDingGuanYou_bg.png',
        skinName: "稳定关右"
       },
       },
      zhoufang: {
       带军鄱阳1: {
        name: 'skin_zhoufang_DaiJunPoYang1',
        x: [0, 1.05],
        y: [0, 0.31],
        scale: 0.4,
        angle: -5,
        background: 'skin_zhoufang_DaiJunPoYang_bg.png',
        skinName: "带军鄱阳"
       },
       带军鄱阳2: {
        name: 'skin_zhoufang_DaiJunPoYang2',
        x: [0, 0.4],
        y: [0, 0.45],
        scale: 0.84,
        angle: -5,
        background: 'skin_zhoufang_DaiJunPoYang_bg.png',
        skinName: "带军鄱阳"
       },
       },
    zhoufei: {
       鹊星夕情2: {
        name: 'skin_zhoufei_QueXingXiQing2',
        x: [0, 0.45],
        y: [15, 0.5],
        scale: 0.68,
        background: 'skin_zhoufei_QueXingXiQing_bg.png',
        skinName: "鹊星夕情"
      },
       晴空暖鸢2: {
        name: 'skin_zhoufei_QingKongNuanYuan2',
        x: [0, 0.42],
        y: [0, 0.45],
        scale: 0.75,
        angle:-9,
        background: 'skin_zhoufei_QingKongNuanYuan_bg.png',
        skinName: "晴空暖鸢"
      },
        箜篌箜声2: {
        name: 'skin_zhoufei_KongHouKongSheng2',
        x: [0, 0.4],
        y: [0, 0.58],
        scale: 0.68,
        background: 'skin_zhoufei_KongHouKongSheng_bg.png',
        skinName: "箜篌箜声"
       },
      鹊星夕情1: {
        name: 'skin_zhoufei_QueXingXiQing1',
        x: [0, 0.45],
        y: [15, 0.26],
        scale: 0.6,
        background: 'skin_zhoufei_QueXingXiQing_bg.png',
        skinName: "鹊星夕情"
      },
      战场绝版1: {
        name: 'skin_zhoufei_ZhanChang1',
        x: [0, 0.4],
        y: [0, 0.29],
        scale: 0.56,
        //angle:-9,
        background: 'skin_zhoufei_ZhanChang_bg.png',
        skinName: "战场绝版"
      },
      晴空暖鸢1: {
        name: 'skin_zhoufei_QingKongNuanYuan1',
        x: [0, 0.75],
        y: [0, 0.25],
        scale: 0.5,
        angle:-9,
        background: 'skin_zhoufei_QingKongNuanYuan_bg.png',
        skinName: "晴空暖鸢"
      },
        箜篌箜声1: {
        name: 'skin_zhoufei_KongHouKongSheng1',
        x: [0, 0.85],
        y: [0, 0.25],
        scale: 0.5,
        background: 'skin_zhoufei_KongHouKongSheng_bg.png',
        skinName: "箜篌箜声"
       },
       笼中箜响: {
        name: 'skin_zhoufei_LongZhongKongXiang',
        x: [0, -0.2],
        y: [0, 0.4],
        scale: 0.5,
        //angle:-10,
        action: 'DaiJi',
        background: 'skin_zhoufei_LongZhongKongXiang_bg.png',
        skinName: "笼中箜响"
       },
       笼中箜响2: {
        name: 'luo_zhoufei_LongZhongKongXiang',
        x: [0, -0.2],
        y: [0, 0.4],
        scale: 0.5,
        //angle:-10,
        action: 'DaiJi',
        background: 'skin_zhoufei_LongZhongKongXiang_bg.png',
        luoName: "笼中箜响"
       },
       },
      zhouyi: {
       剑舞浏漓2: {
        name: 'skin_zhouyi_JianWuLiuLi2',
        x: [0, 0.38],
        y: [0, 0.46],
        scale: 0.77,
        angle:-20,
        background: 'skin_zhouyi_JianWuLiuLi_bg.png',
        skinName: "剑舞浏漓"
       },
       剑舞浏漓1: {
        name: 'skin_zhouyi_JianWuLiuLi1',
        x: [0, 0.5],
        y: [0, 0.1],
        scale: 0.55,
        angle:-20,
        background: 'skin_zhouyi_JianWuLiuLi_bg.png',
        skinName: "剑舞浏漓"
       },
       },
      zhouyu: {
       谋定天下2:{
		name: 'skin_zhouyu_MouDingTianXia2',
		x: [0, 0.45],
		y: [0, 0.53],
		scale: 0.72,
		background: 'skin_zhouyu_MouDingTianXia_bg.png',	
      },
       盖世之才2:{
		name: 'skin_zhouyu_GaiShiZhiCai2',
		x: [0, 0.5],
		y: [0, 0.5],
		scale: 0.75,
		background: 'skin_zhouyu_GaiShiZhiCai_bg.png',	
	   },
       谋定天下1:{
		name: 'skin_zhouyu_MouDingTianXia1',
		x: [0, 0.78],
		y: [0, 0.56],
		scale: 0.42,
		background: 'skin_zhouyu_MouDingTianXia_bg.png',	
      },
       盖世之才1:{
		name: 'skin_zhouyu_GaiShiZhiCai1',
		x: [0, 0.4],
		y: [0, 0.43],
		scale: 0.35,
		background: 'skin_zhouyu_GaiShiZhiCai_bg.png',	
	   },
       鼠年春节: {
        name: 'skin_zhouyu_ShuNianChunJie',
        x: [0, 0.75],
        y: [0, 0.2],
        scale: 0.5,
        action: 'DaiJi',
        background: 'skin_zhouyu_ShuNianChunJie_bg.png',
        skinName: "鼠年春节"
       },
	   },
    zhuran: {
       镇守江陵1: {
        name: 'skin_zhuran_ZhenShouJiangLing1',
        x: [0, 0.2],
        y: [0, 0.35],
        scale: 0.5,
        background: 'skin_zhuran_ZhenShouJiangLing_bg.png',
        skinName: "镇守江陵"
       },
       镇守江陵2: {
        name: 'skin_zhuran_ZhenShouJiangLing2',
        x: [0, 0.5],
        y: [0, 0.55],
        scale: 0.6,
        background: 'skin_zhuran_ZhenShouJiangLing_bg.png',
        skinName: "镇守江陵"
       },
      手杀: {
        name: 'skin_zhuran_ShouSha',
        x: [0, 1.05],
        y: [0, 0.45],
        scale: 0.4,
        action: 'DaiJi',
        background: 'skin_zhuran_ShouSha_bg.png',
        skinName: "手杀"
       },
       },
    zhugejin: {
      风雅神逸2: {
        name: 'skin_zhugejin_FengYaShenYi2',
        x: [0, 0.47],
        y: [0, 0.5],
        scale: 0.75,
        angle: -10,
        background: 'skin_zhugejin_FengYaShenYi_bg.png',
        skinName: "风雅神逸"
       },
      风雅神逸1: {
        name: 'skin_zhugejin_FengYaShenYi1',
        x: [0, 0.47],
        y: [0, 0.3],
        scale: 0.4,
        angle: -10,
        background: 'skin_zhugejin_FengYaShenYi_bg.png',
        skinName: "风雅神逸"
       },
       },
    zhugezhan: {
      明智春馨1: {
        name: 'skin_zhugezhan_MingZhiChunXin1',
        x: [0, -0.38],
        y: [0, 0.58],
        scale: 0.56,
        background: 'skin_zhugezhan_MingZhiChunXin_bg.png',
        skinName: "明智春馨"
      },
      明智春馨2: {
        name: 'skin_zhugezhan_MingZhiChunXin2',
        x: [0, 0.35],
        y: [0, 0.43],
        scale: 0.74,
        background: 'skin_zhugezhan_MingZhiChunXin_bg.png',
        skinName: "明智春馨"
      },
      },
    zhugeliang: {
       明智春馨1: {
        name: 'skin_zhugeliang_MingZhiChunXin1',
        x: [0, 1.58],
        y: [0, 0.5],
        scale: 0.52,
        background: 'skin_zhugeliang_MingZhiChunXin_bg.png',
        skinName: "明智春馨"
     },
      空城退敌1: {
        name: 'skin_zhugeliang_KongChengTuiDi1',
        x: [10, 0.14],
        y: [5, 0.32],
        scale: 0.45,
        background: 'skin_zhugeliang_KongChengTuiDi_bg.png',
        skinName: "空城退敌"
       },
      明智春馨2: {
        name: 'skin_zhugeliang_MingZhiChunXin2',
        x: [0, 0.38],
        y: [0, 0.48],
        scale: 0.8,
        angle: -5,
        background: 'skin_zhugeliang_MingZhiChunXin_bg.png',
        skinName: "明智春馨"
    },
      空城退敌2: {
        name: 'skin_zhugeliang_KongChengTuiDi2',
        x: [10, 0.35],
        y: [5, 0.48],
        scale: 0.75,
        background: 'skin_zhugeliang_KongChengTuiDi_bg.png',
        skinName: "空城退敌"
       },
      明良千古: {
        name: 'skin_zhugeliang_MingLiangQianGu',
        x: [0, -0.3],
        y: [0, 0.2],
        scale: 0.42,
        angle: -12,
        action: 'DaiJi',
        background: 'skin_zhugeliang_MingLiangQianGu_bg.png',
        skinName: "明良千古"
      },
      隆中陇亩1: {
        name: 'skin_zhugeliang_LongZhongLongMu1',
        x: [0, 0.45],
        y: [0, 0.25],
        scale: 0.55,
        background: 'skin_zhugeliang_LongZhongLongMu_bg.png',
        skinName: "隆中陇亩"
      },
      谋定天下1: {
        name: 'skin_zhugeliang_MouDingTianXia1',
        x: [0, 0.45],
        y: [0, 0.25],
        scale: 0.6,
        angle: -5,
        background: 'skin_zhugeliang_MouDingTianXia_bg.png',
        skinName: "谋定天下"
       },
      隆中陇亩2: {
        name: 'skin_zhugeliang_LongZhongLongMu2',
        x: [0, 0.45],
        y: [0, 0.55],
        scale: 0.72,
        background: 'skin_zhugeliang_LongZhongLongMu_bg.png',
        skinName: "隆中陇亩"
      },
      谋定天下2: {
        name: 'skin_zhugeliang_MouDingTianXia2',
        x: [0, 0.38],
        y: [0, 0.5],
        scale: 0.78,
        angle: -5,
        background: 'skin_zhugeliang_MouDingTianXia_bg.png',
        skinName: "谋定天下"
       },
       },
      zhugeguo: {
      兰荷艾莲1: {
        name: 'skin_zhugeguo_LanHeAiLian1',
        x: [-30, 0.5],
        y: [8, 0.3],
        scale: 0.5,
        background: 'skin_zhugeguo_LanHeAiLian_bg.png',
        skinName: "兰荷艾莲"
      },
      英装素果1: {
        name: 'skin_zhugeguo_YingZhuangSuGuo1',
        x: [0, 0.15],
        y: [0, 0.3],
        scale: 0.55,
        background: 'skin_zhugeguo_YingZhuangSuGuo_bg.png',
        skinName: "英装素果"
      },
      兰荷艾莲2: {
        name: 'skin_zhugeguo_LanHeAiLian2',
        x: [-30, 0.65],
        y: [8, 0.53],
        scale: 0.7,
        background: 'skin_zhugeguo_LanHeAiLian_bg.png',
        skinName: "兰荷艾莲"
      },
      英装素果2: {
        name: 'skin_zhugeguo_YingZhuangSuGuo2',
        x: [0, 0.45],
        y: [0, 0.57],
        scale: 0.6,
        background: 'skin_zhugeguo_YingZhuangSuGuo_bg.png',
        skinName: "英装素果"
      },
      仙池起舞:{
        name: 'skin_zhugeguo_XianChiQiWu',
        x: [0, -0.1],
        y: [0, 0.3],
        scale: 0.4,
        //angle:-9,
        action: 'DaiJi',
        background: 'skin_zhugeguo_XianChiQiWu_bg.png',
        skinName: "仙池起舞"
      },
      仙池起舞2:{
        name: 'luo_zhugeguo_XianChiQiWu',
        x: [0, -0.1],
        y: [0, 0.3],
        scale: 0.4,
        //angle:-9,
        action: 'DaiJi',
        background: 'skin_zhugeguo_XianChiQiWu_bg.png',
        luoName: "仙池起舞"
      },
      },
      zhurong: {
      飞刀烈火2: {
        name: 'skin_zhurong_FeiDaoLieHuo2',
        x: [0, 0.4],
        y: [0, 0.58],
        scale: 0.74,
        angle: -10,
        background: 'skin_zhurong_FeiDaoLieHuo_bg.png',
        skinName: "飞刀烈火"
       },
      巾帼花武1: {
        name: 'skin_zhurong_JinGuoHuaWu1',
        x: [0, 0.77],
        y: [0, 0.2],
        scale: 0.43,
        angle: 80,
        background: 'skin_zhurong_JinGuoHuaWu_bg.png',
        skinName: "巾帼花武"
      },
      飞刀烈火1: {
        name: 'skin_zhurong_FeiDaoLieHuo1',
        x: [0, 0.75],
        y: [0, 0.38],
        scale: 0.5,
        angle: -10,
        background: 'skin_zhurong_FeiDaoLieHuo_bg.png',
        skinName: "飞刀烈火"
       },
       },
      zuoci: {
       仙人之怒2: {
        name: 'skin_zuoci_XianRenZhiNu2',
        x: [0, 0.4],
        y: [0, 0.5],
        scale: 0.8,
        background: 'skin_zuoci_XianRenZhiNu_bg.png',
        skinName: "仙人之怒"
       },
       仙人之怒1: {
        name: 'skin_zuoci_XianRenZhiNu1',
        x: [0, 0.55],
        y: [0, 0.55],
        scale: 0.4,
        background: 'skin_zuoci_XianRenZhiNu_bg.png',
        skinName: "仙人之怒"
       },
      役使鬼神: {
        name: 'skin_zuoci_YiShiGuiShen',
        x: [0, 0.78],
        y: [5, -0.05],
        scale: 0.75,
        background: 'skin_zuoci_YiShiGuiShen_bg.png',
        action: 'DaiJi',
        angle: 10,
        skinName: "役使鬼神"
       },
       },
          };
             

    var skins = decadeUI.dynamicSkin;
    for (var name in skins) {
        for (var nameKey in skins[name]) {
            skins[name][nameKey].skinName = nameKey;
        }
    }

    var extend = {
    
       re_baosanniang: decadeUI.dynamicSkin.baosanniang,
       xin_baosanniang: decadeUI.dynamicSkin.baosanniang,
       re_daqiao: decadeUI.dynamicSkin.daqiao,
       sp_daqiao: decadeUI.dynamicSkin.daqiao,
       sp_diaochan: decadeUI.dynamicSkin.diaochan,
       re_diaochan: decadeUI.dynamicSkin.diaochan,
       shen_diaochan: decadeUI.dynamicSkin.diaochan,
       re_huangyueying: decadeUI.dynamicSkin.huangyueying,
       jsp_huangyueying: decadeUI.dynamicSkin.huangyueying,
       re_panshu: decadeUI.dynamicSkin.panshu,
       re_sunluban: decadeUI.dynamicSkin.sunluban,
       xin_sunluban: decadeUI.dynamicSkin.sunluban,
       re_sunluyu: decadeUI.dynamicSkin.sunluyu,
       re_sunshangxiang: decadeUI.dynamicSkin.sunshangxiang,
       sp_sunshangxiang: decadeUI.dynamicSkin.sunshangxiang,
       xf_sufei: decadeUI.dynamicSkin.sp_sufei,
       old_wangyi: decadeUI.dynamicSkin.wangyi,
		re_wangyi: decadeUI.dynamicSkin.wangyi,
		sp_caiwenji: decadeUI.dynamicSkin.caiwenji,
		re_caiwenji: decadeUI.dynamicSkin.caiwenji,
		tw_caohong: decadeUI.dynamicSkin.caohong,
		old_caochong: decadeUI.dynamicSkin.caochong,
		old_caochun: decadeUI.dynamicSkin.caochun,
		old_caoren: decadeUI.dynamicSkin.caoren,
		sp_caoren: decadeUI.dynamicSkin.caoren,
		jsp_caoren: decadeUI.dynamicSkin.caoren,
		old_caozhen: decadeUI.dynamicSkin.caozhen,
		xin_caozhen: decadeUI.dynamicSkin.caozhen,
		re_caozhen: decadeUI.dynamicSkin.caozhen,
		re_caifuren: decadeUI.dynamicSkin.caifuren,
		xin_caifuren: decadeUI.dynamicSkin.caifuren,
		re_dianwei: decadeUI.dynamicSkin.dianwei,
		re_dengai: decadeUI.dynamicSkin.dengai,
		ol_dengai: decadeUI.dynamicSkin.dengai,
		re_fazheng: decadeUI.dynamicSkin.fazheng,
		xin_fazheng: decadeUI.dynamicSkin.fazheng,
		ns_fanchou: decadeUI.dynamicSkin.fanchou,
		xin_fuhuanghou: decadeUI.dynamicSkin.fuhuanghou,
		old_fuhuanghou: decadeUI.dynamicSkin.fuhuanghou,
		re_fuhuanghou: decadeUI.dynamicSkin.fuhuanghou,
		re_ganning: decadeUI.dynamicSkin.ganning,
		sp_ganning: decadeUI.dynamicSkin.ganning,
		yj_ganning: decadeUI.dynamicSkin.ganning,
		re_gongsunyuan: decadeUI.dynamicSkin.gongsunyuan,
		ol_guansuo: decadeUI.dynamicSkin.guansuo,
		re_huangzhong: decadeUI.dynamicSkin.huangzhong,
		re_huaxiong: decadeUI.dynamicSkin.huaxiong,
		ol_huaxiong: decadeUI.dynamicSkin.huaxiong,
		old_huaxiong: decadeUI.dynamicSkin.huaxiong,
		re_huanggai: decadeUI.dynamicSkin.huanggai,
		old_quancong: decadeUI.dynamicSkin.quancong,
		re_quancong: decadeUI.dynamicSkin.quancong,
		re_lingtong: decadeUI.dynamicSkin.lingtong,
		old_lingtong: decadeUI.dynamicSkin.lingtong,
		xin_lingtong: decadeUI.dynamicSkin.lingtong,
		re_machao: decadeUI.dynamicSkin.machao,
		sp_machao: decadeUI.dynamicSkin.machao,
		old_machao: decadeUI.dynamicSkin.machao,
		ns_luyusheng: decadeUI.dynamicSkin.luyusheng,
		re_liuzan: decadeUI.dynamicSkin.liuzan,
		diy_liuzan: decadeUI.dynamicSkin.liuzan,
		old_liuzan: decadeUI.dynamicSkin.liuzan,
		re_liubiao: decadeUI.dynamicSkin.liubiao,
		xin_liubiao: decadeUI.dynamicSkin.liubiao,
		ns_lvmeng: decadeUI.dynamicSkin.lvmeng,
		re_lvmeng: decadeUI.dynamicSkin.lvmeng,
		diy_lukang: decadeUI.dynamicSkin.lukang,
		re_liru: decadeUI.dynamicSkin.liru,
		xin_liru: decadeUI.dynamicSkin.liru,
		sp_jiangwei: decadeUI.dynamicSkin.jiangwei,
		ol_jiangwei: decadeUI.dynamicSkin.jiangwei,
		re_jiangwei: decadeUI.dynamicSkin.jiangwei,
		re_guojia: decadeUI.dynamicSkin.guojia,
		shen_guojia: decadeUI.dynamicSkin.guojia,
		re_huatuo: decadeUI.dynamicSkin.huatuo,
		old_huatuo: decadeUI.dynamicSkin.huatuo,
		re_luxun: decadeUI.dynamicSkin.luxun,
		re_lvbu: decadeUI.dynamicSkin.lvbu,
		re_sunce: decadeUI.dynamicSkin.sunce,
		shen_sunce: decadeUI.dynamicSkin.sunce,
		re_sunben: decadeUI.dynamicSkin.sunce,
		jin_simazhao: decadeUI.dynamicSkin.simazhao,
		ns_simazhao: decadeUI.dynamicSkin.simazhao,
		sp_simazhao: decadeUI.dynamicSkin.simazhao,
		re_sunquan: decadeUI.dynamicSkin.sunquan,
		re_xuhuang: decadeUI.dynamicSkin.xuhuang,
		yj_xuhuang: decadeUI.dynamicSkin.xuhuang,
		re_xuzhu: decadeUI.dynamicSkin.xuzhu,
		re_xiahoudun: decadeUI.dynamicSkin.xiahoudun,
		sp_xiahoudun: decadeUI.dynamicSkin.xiahoudun,
		xin_xiahoudun: decadeUI.dynamicSkin.xiahoudun,
		ol_wuyi: decadeUI.dynamicSkin.wuyi,
		re_wuyi: decadeUI.dynamicSkin.wuyi,
		gz_kongrong: decadeUI.dynamicSkin.kongrong,
		sp_kongrong: decadeUI.dynamicSkin.kongrong,
		ol_xiaoqiao: decadeUI.dynamicSkin.xiaoqiao,
		re_xiaoqiao: decadeUI.dynamicSkin.xiaoqiao,
		ns_xiaoqiao: decadeUI.dynamicSkin.xiaoqiao,
		sp_xiahoushi: decadeUI.dynamicSkin.xiahoushi,
		tw_xiahouba: decadeUI.dynamicSkin.xiahouba,
                                re_xusheng: decadeUI.dynamicSkin.xusheng,
                                old_xusheng: decadeUI.dynamicSkin.xusheng,
                                xin_xusheng: decadeUI.dynamicSkin.xusheng,
                                re_xunyu: decadeUI.dynamicSkin.xunyu,
		shen_xunyu: decadeUI.dynamicSkin.xunyu,
		re_wangcan: decadeUI.dynamicSkin.wangcan,
		sp_wangcan: decadeUI.dynamicSkin.wangcan,
		ol_wangrong: decadeUI.dynamicSkin.wangrong,
		jin_wangyuanji: decadeUI.dynamicSkin.wangyuanji,
		sp_wangyuanji: decadeUI.dynamicSkin.wangyuanji,
		re_wangyun: decadeUI.dynamicSkin.wangyun,
		ns_wangyun: decadeUI.dynamicSkin.wangyun,
		old_wangyun: decadeUI.dynamicSkin.wangyun,
		db_wenyang: decadeUI.dynamicSkin.wenyang,
		diy_wenyang: decadeUI.dynamicSkin.wenyang,
		re_weiwenzhugezhi: decadeUI.dynamicSkin.weiwenzhugezhi,
		re_weiyan: decadeUI.dynamicSkin.weiyan,
		ol_weiyan: decadeUI.dynamicSkin.weiyan,
		re_wuguotai: decadeUI.dynamicSkin.wuguotai,
		re_yujin: decadeUI.dynamicSkin.yujin,
		ol_yujin: decadeUI.dynamicSkin.yujin,
		xin_yujin: decadeUI.dynamicSkin.yujin,
		yujin_yujin: decadeUI.dynamicSkin.yujin,
		ns_zhangji: decadeUI.dynamicSkin.zhangji,
		sp_zhangji: decadeUI.dynamicSkin.zhangji,
		sp_taishici: decadeUI.dynamicSkin.taishici,
		re_taishici: decadeUI.dynamicSkin.taishici,
		shen_taishici: decadeUI.dynamicSkin.taishici,
		re_xiahouyuan: decadeUI.dynamicSkin.xiahouyuan,
		ol_xiahouyuan: decadeUI.dynamicSkin.xiahouyuan,
		ns_xinxianying: decadeUI.dynamicSkin.xinxianying,
		ol_xinxianying: decadeUI.dynamicSkin.xinxianying,
       re_xinxianying: decadeUI.dynamicSkin.xinxianying,
       ol_zhangchangpu: decadeUI.dynamicSkin.zhangchangpu,
       re_zhangliao: decadeUI.dynamicSkin.zhangliao,
       yj_zhangliao: decadeUI.dynamicSkin.zhangliao,
       ol_zhangliao: decadeUI.dynamicSkin.zhangliao,
       sp_zhangliao: decadeUI.dynamicSkin.zhangliao,
       shen_zhangliao: decadeUI.dynamicSkin.zhangliao,
       re_zhaoyun: decadeUI.dynamicSkin.zhaoyun,
       sp_zhaoyun: decadeUI.dynamicSkin.zhaoyun,
       jsp_zhaoyun: decadeUI.dynamicSkin.zhaoyun,
       old_zhaoyun: decadeUI.dynamicSkin.zhaoyun,
       boss_zhaoyun: decadeUI.dynamicSkin.shen_zhaoyun,
       re_zhangzhang: decadeUI.dynamicSkin.zhangzhang,
       re_simayi: decadeUI.dynamicSkin.simayi,
       junk_simayi: decadeUI.dynamicSkin.simayi,
       jin_simayi: decadeUI.dynamicSkin.simayi,
       re_zhenji: decadeUI.dynamicSkin.zhenji,
       diy_zhenji: decadeUI.dynamicSkin.zhenji,
       shen_zhenji: decadeUI.dynamicSkin.zhenji,
       re_zhangchunhua: decadeUI.dynamicSkin.zhangchunhua,
       old_zhangchunhua: decadeUI.dynamicSkin.zhangchunhua,
       jin_zhangchunhua: decadeUI.dynamicSkin.zhangchunhua,
       re_zhangfei: decadeUI.dynamicSkin.zhangfei,
       old_zhangfei: decadeUI.dynamicSkin.zhangfei,
       sp_zhangfei: decadeUI.dynamicSkin.zhangfei,
       xin_zhangfei: decadeUI.dynamicSkin.zhangfei,
       re_zhangjiao: decadeUI.dynamicSkin.zhangjiao,
       sp_zhangjiao: decadeUI.dynamicSkin.zhangjiao,
       re_zhonghui: decadeUI.dynamicSkin.zhonghui,
       old_zhonghui: decadeUI.dynamicSkin.zhonghui,
       xin_zhonghui: decadeUI.dynamicSkin.zhonghui,
       xin_yuanshao: decadeUI.dynamicSkin.yuanshao,
       re_yuanshao: decadeUI.dynamicSkin.yuanshao,
       ol_yuanshao: decadeUI.dynamicSkin.yuanshao,
       re_caopi: decadeUI.dynamicSkin.caopi,
       shen_caopi: decadeUI.dynamicSkin.caopi,
       re_guanyu: decadeUI.dynamicSkin.guanyu,
       jsp_guanyu: decadeUI.dynamicSkin.guanyu,
       re_bulianshi: decadeUI.dynamicSkin.bulianshi,
       old_bulianshi: decadeUI.dynamicSkin.bulianshi,
       re_liubei: decadeUI.dynamicSkin.liubei,
       jsp_liubei: decadeUI.dynamicSkin.liubei,
       sp_liubei: decadeUI.dynamicSkin.liubei,
       diy_liuyan: decadeUI.dynamicSkin.liuyan,
       old_lingju: decadeUI.dynamicSkin.lingju,
       yl_luzhi: decadeUI.dynamicSkin.luzhi,
       re_jiaxu: decadeUI.dynamicSkin.jiaxu,
       sp_jiaxu: decadeUI.dynamicSkin.jiaxu,
       ns_jiaxu: decadeUI.dynamicSkin.jiaxu,
       ol_madai: decadeUI.dynamicSkin.madai,
       re_madai: decadeUI.dynamicSkin.madai,
       old_madai: decadeUI.dynamicSkin.madai,
       re_zhanghe: decadeUI.dynamicSkin.zhanghe,
       tw_zhaoxiang: decadeUI.dynamicSkin.zhaoxiang,
       ol_zhurong: decadeUI.dynamicSkin.zhurong,
       re_zhurong: decadeUI.dynamicSkin.zhurong,
       re_zhuran: decadeUI.dynamicSkin.zhuran,
       old_zhuran: decadeUI.dynamicSkin.zhuran,
       xin_zhuran: decadeUI.dynamicSkin.zhuran,
       re_zhouyu: decadeUI.dynamicSkin.zhouyu,
       re_zuoci: decadeUI.dynamicSkin.zuoci,
       sp_zhugeliang: decadeUI.dynamicSkin.zhugeliang,
       re_zhugeliang: decadeUI.dynamicSkin.zhugeliang,
       ns_zhugeliang: decadeUI.dynamicSkin.zhugeliang,
       re_sp_zhugeliang: decadeUI.dynamicSkin.zhugeliang,
       ol_sp_zhugeliang: decadeUI.dynamicSkin.zhugeliang,
       re_zhugeliang: decadeUI.dynamicSkin.zhugeliang,
       old_zhugezhan: decadeUI.dynamicSkin.zhugezhan,
       re_zhanggong: decadeUI.dynamicSkin.zhanggong,
       ol_dongzhuo: decadeUI.dynamicSkin.dongzhuo,
       re_dongzhuo: decadeUI.dynamicSkin.dongzhuo,
       old_zhangxingcai: decadeUI.dynamicSkin.zhangxingcai,
       ns_zhangxiu: decadeUI.dynamicSkin.zhangxiu,
       sp_zhangxiu: decadeUI.dynamicSkin.zhangxiu,
       re_liuzan: decadeUI.dynamicSkin.liuzan,
       re_caocao: decadeUI.dynamicSkin.caocao,
       jun_caocao: decadeUI.dynamicSkin.caocao,
       re_caozhi: decadeUI.dynamicSkin.caozhi,
       re_lvdai: decadeUI.dynamicSkin.lvdai,
       re_xuhuang: decadeUI.dynamicSkin.xuhuang,
       re_dongbai: decadeUI.dynamicSkin.dongbai,
       re_lusu: decadeUI.dynamicSkin.lusu,
       ol_lusu: decadeUI.dynamicSkin.lusu,
//扩展包
		lyz_bulianshi: decadeUI.dynamicSkin.bulianshi,
		lyz_caojie: decadeUI.dynamicSkin.caojie,
		lyz_caocao: decadeUI.dynamicSkin.caocao,
		lyz_ycaocao: decadeUI.dynamicSkin.caocao,
		lyz_caiwenji: decadeUI.dynamicSkin.caiwenji,
		lyz_caojinyu: decadeUI.dynamicSkin.caojinyu,
		lyz_shen_caojinyu: decadeUI.dynamicSkin.caojinyu,
		lyz_daqiao: decadeUI.dynamicSkin.daqiao,
		lyz_diaochan: decadeUI.dynamicSkin.diaochan,
		lyz_shen_diaochan: decadeUI.dynamicSkin.diaochan,
		lyz_guanyinping: decadeUI.dynamicSkin.guanyinping,
		lyz_guanyu: decadeUI.dynamicSkin.guanyu,
		lyz_guojia: decadeUI.dynamicSkin.guojia,
		lyz_huangyueying: decadeUI.dynamicSkin.huangyueying,
		lyz_huatuo: decadeUI.dynamicSkin.huatuo,
		lyz_jiaxu: decadeUI.dynamicSkin.jiaxu,
		lyz_lingjiu: decadeUI.dynamicSkin.lingjiu,
		lyz_liubei: decadeUI.dynamicSkin.liubei,
		lyz_luxun: decadeUI.dynamicSkin.luxun,
		lyz_lingju: decadeUI.dynamicSkin.lingju,
		lyz_lvlingqi: decadeUI.dynamicSkin.lvlingqi,
		lyz_machao: decadeUI.dynamicSkin.machao,
		lyz_mayunlu: decadeUI.dynamicSkin.mayunlu,
		lyz_shen_lvbu: decadeUI.dynamicSkin.shen_lvbu,
		lyz_shen_simayi: decadeUI.dynamicSkin.shen_simayi,
		lyz_shen_zhangliao: decadeUI.dynamicSkin.zhangliao,
		lyz_shen_zhouyu: decadeUI.dynamicSkin.shen_zhouyu,
       		lyz_simayi: decadeUI.dynamicSkin.simayi,
		lyz_sunce: decadeUI.dynamicSkin.sunce,
		lyz_sunshangxiang: decadeUI.dynamicSkin.sunshangxiang,
		lyz_ysunshangxiang: decadeUI.dynamicSkin.sunshangxiang,
		lyz_xiaoqiao: decadeUI.dynamicSkin.xiaoqiao,
		lyz_xinxianying: decadeUI.dynamicSkin.xinxianying,
		lyz_xusheng: decadeUI.dynamicSkin.xusheng,
		lyz_xunyu: decadeUI.dynamicSkin.xunyu,
		lyz_zhangchunhua: decadeUI.dynamicSkin.zhangchunhua,
		lyz_zhangfei: decadeUI.dynamicSkin.zhangfei,
		lyz_zhangjiao: decadeUI.dynamicSkin.zhangjiao,
		lyz_zhangliao: decadeUI.dynamicSkin.zhangliao,
		lyz_zhangxingcai: decadeUI.dynamicSkin.zhangxingcai,
		lyz_zhaoyun: decadeUI.dynamicSkin.zhaoyun,
		lyz_shen_zhaoyun: decadeUI.dynamicSkin.shen_zhaoyun,
		lyz_zhenji: decadeUI.dynamicSkin.zhenji,
		lyz_zhouyu: decadeUI.dynamicSkin.zhouyu,
       		lyz_zhugeliang: decadeUI.dynamicSkin.zhugeliang,
       		lyz_zuoci: decadeUI.dynamicSkin.zuoci,
       		lyz_yzuoci: decadeUI.dynamicSkin.zuoci,
       		yl_caoying: decadeUI.dynamicSkin.caoying,

        };
    decadeUI.get.extend(decadeUI.dynamicSkin, extend);
    
});
//
//