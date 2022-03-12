game.import('extension', function(lib, game, ui, get, ai, _status) {

	//武将搜索代码摘抄至扩展ol
	var kzol_create_characterDialog = ui.create.characterDialog;
	ui.create.characterDialog = function() {
		var dialog = kzol_create_characterDialog.apply(this, arguments);
		if (lib.config.mode == 'stone') return dialog;
		var content_container = dialog.childNodes[0];
		var content = content_container.childNodes[0];
		var switch_con = content.childNodes[0];
		var buttons = content.childNodes[1];
		var div = ui.create.div('');
		div.style.height = '35px';
		div.style.width = 'calc(100%)';
		div.style.top = '-2px';
		div.style.left = '0px';
		div.style['white-space'] = 'nowrap';
		div.style['text-align'] = 'center';
		div.style['line-height'] = '26px';
		div.style['font-size'] = '24px';
		div.style['font-family'] = 'xinwei';
		div.innerHTML = '搜索：' +
			'<input type="text" style="width:150px;"></input>' +
			'←' +
			'<select size="1" style="width:75px;height:21px;">' +
			'<option value="name">名称翻译</option>' +
			'<option value="name1">名称</option>' +
			'<option value="skill">技能翻译</option>' +
			'<option value="skill1">技能</option>' +
			'<option value="skill2">技能叙述</option>' +
			'</select>';
		var input = div.querySelector('input');
		input.onkeydown = function(e) {
			e.stopPropagation();
			if (e.keyCode == 13) {
				var value = this.value;
				var choice = div.querySelector('select').options[div.querySelector('select')
					.selectedIndex].value;
				if (value) {
					if (game.say1) game.say1('搜索完成');
					//if(dialog.currentcaptnode2) dialog.currentcaptnode2.classList.remove('thundertext');
					//if(dialog.currentcaptnode) dialog.currentcaptnode.classList.remove('thundertext');
					for (var i = 0; i < buttons.childNodes.length; i++) {
						buttons.childNodes[i].classList.add('nodisplay');
						var name = buttons.childNodes[i].link;
						var skills;
						if (lib.character[name] != undefined) {
							skills = lib.character[name][3];
						};
						if (choice == 'name1') {
							if (name.indexOf(value) != -1) {
								buttons.childNodes[i].classList.remove('nodisplay');
							};
						} else if (choice == 'skill') {
							if (skills != undefined && skills.length > 0) {
								for (var j = 0; j < skills.length; j++) {
									var skill = skills[j];
									if (get.translation(skill).indexOf(value) != -1) {
										buttons.childNodes[i].classList.remove('nodisplay');
									};
								};
							};
						} else if (choice == 'skill1') {
							if (skills != undefined && skills.length > 0) {
								for (var j = 0; j < skills.length; j++) {
									var skill = skills[j];
									if (skill.indexOf(value) != -1) {
										buttons.childNodes[i].classList.remove('nodisplay');
									};
								};
							};
						} else if (choice == 'skill2') {
							if (skills != undefined && skills.length > 0) {
								for (var j = 0; j < skills.length; j++) {
									var skill = skills[j];
									if (lib.translate[skill + '_info'] != undefined && lib.translate[
											skill + '_info'].indexOf(value) != -1) {
										buttons.childNodes[i].classList.remove('nodisplay');
									};
								};
							};
						} else {
							if (get.translation(name).indexOf(value) != -1) {
								buttons.childNodes[i].classList.remove('nodisplay');
							};
						};
					};
				} else {
					if (game.say1) game.say1('请先输入需要搜索武将的名字');
				};
			};
		};
		input.onmousedown = function(e) {
			e.stopPropagation();
		};
		if (lib.config['extension_武将卡牌搜索器_enable'] == true) {
			if (lib.config['extension_扩展ol_zyxj_search1'] != false) {
				if (window.诗笺_manual != undefined) {
					div.style.height = '58px';
					div.innerHTML += '<br><button>武将卡牌搜索器</button>';
					var button = div.querySelector('button');
					button.onclick = function() {
						window.诗笺_manual.show();
					};
				};
			};
		};
		switch_con.insertBefore(div, switch_con.firstChild);
		/*
		for(var i=0;i<buttons.childNodes.length;i++){
			var name=buttons.childNodes[i].link;
			if(name!=undefined&&name.indexOf('kzsg_')!=-1){
				buttons.childNodes[i].style.display='none';
			};
		};
		*/
		return dialog;
	}



	var app = {
		name: '手杀ui',
		each: function(obj, fn, node) {
			if (!obj) return node;
			if (typeof obj.length === 'number') {
				for (var i = 0; i < obj.length; i++) {
					if (fn.call(node, obj[i], i) === false) {
						break;
					}
				}
				return node;
			}
			for (var i in obj) {
				if (fn.call(node, obj[i], i) === false) {
					break;
				}
			}
			return node;
		},
		isFunction: function(fn) {
			return typeof fn === 'function';
		},
		event: {
			listens: {},
			on: function(name, listen, remove) {
				if (!this.listens[name]) {
					this.listens[name] = [];
				}
				this.listens[name].push({
					listen: listen,
					remove: remove,
				});
				return this;
			},
			off: function(name, listen) {
				return app.each(this.listens[name], function(item, index) {
					if (listen === item || listen === item.listen) {
						this.listens[name].splice(index, 1);
					}
				}, this);
			},
			emit: function(name) {
				var args = Array.from(arguments).slice(1);
				return app.each(this.listens[name], function(item) {
					item.listen.apply(null, args);
					item.remove && this.off(name, item);
				}, this);
			},
			once: function(name, listen) {
				return this.on(name, listen, true);
			},
		},
		create: {},
		listens: {},
		plugins: [],
		pluginsMap: {},
		path: {
			ext: function(path, ext) {
				ext = ext || app.name;
				return lib.assetURL + 'extension/' + ext + '/' + path;
			},
		},
		on: function(event, listen) {
			if (!app.listens[event]) {
				app.listens[event] = [];
			}
			app.listens[event].add(listen);
		},
		once: function(event, listen) {
			if (!app.listens[event]) {
				app.listens[event] = [];
			}
			app.listens[event].push({
				listen: listen,
				remove: true,
			});
		},
		off: function(event, listen) {
			var listens = app.listens[event] || [];
			var filters = listen ? listens.filter(function(item) {
				return item === listen || item.listen === listen;
			}) : listens.slice(0);
			filters.forEach(function(item) {
				listens.remove(item);
			});
		},
		emit: function(event) {
			var args = Array.from(arguments).slice(1);
			var listens = app.listens[event] || [];
			listens.forEach(function(item) {
				if (typeof item === 'function') {
					item.apply(null, args);
				} else if (typeof item.listen === 'function') {
					item.listen.apply(null, args);
					item.remove && listens.remove(item);
				}
			});
		},
		import: function(fn) {
			var obj = fn(lib, game, ui, get, ai, _status, app);
			if (obj) {
				if (obj.name) app.pluginsMap[obj.name] = obj;
				if (obj.precontent && (!obj.filter || obj.filter())) obj.precontent();
			}
			app.plugins.push(obj);
		},
		importPlugin: function(data, setText) {
			if (!window.JSZip) {
				var args = arguments;
				lib.init.js(lib.assetURL + 'game', 'jszip', function() {
					app.importPlugin.apply(app, args);
				});
				return;
			}
			setText = typeof setText === 'function' ? setText : function() {};
			var zip = new JSZip(data);
			var dirList = [],
				fileList = [];
			for (var i in zip.files) {
				if (/\/$/.test(i)) {
					dirList.push('extension/' + app.name + '/' + i);
				} else if (!/^extension\.(js|css)$/.test(i)) {
					fileList.push({
						id: i,
						path: 'extension/' + app.name + '/' + i.split('/').reverse().slice(1)
							.reverse().join('/'),
						name: i.split('/').pop(),
						target: zip.files[i],
					});
				}
			}

			var total = dirList.length + fileList.length;
			var finish = 0;
			var isNode = lib.node && lib.node.fs;

			var writeFile = function() {
				var file = fileList.shift();
				if (file) {
					setText('正在导入(' + (++finish) + '/' + total + ')...')
					game.writeFile(isNode ? file.target.asNodeBuffer() : file.target
						.asArrayBuffer(), file.path, file.name, writeFile);
				} else {
					alert('导入完成');
					setText('导入插件');
				}
			};
			var ensureDir = function() {
				if (dirList.length) {
					setText('正在导入(' + (++finish) + '/' + total + ')...')
					game.ensureDirectory(dirList.shift(), ensureDir);
				} else {
					writeFile();
				}
			};
			ensureDir();
		},
		loadPlugins: function(callback) {
			game.getFileList('extension/' + app.name, function(floders) {
				var total = floders.length;
				var current = 0;
				if (total === current) {
					callback();
					return;
				}
				var loaded = function() {
					if (++current === total) {
						callback();
					}
				};
				floders.forEach(function(dir) {
					// if (lib.config.extension_手杀ui_yangshi == "on") {
						game.readFile('extension/' + app.name + '/' + dir + '/main.js',
							function(data) {
								var binarry = new Uint8Array(data);
								var blob = new Blob([binarry]);
								var reader = new FileReader();
								reader.readAsText(blob);
								reader.onload = function() {
									eval(reader.result);
									loaded();
								};
							},
							function(e) {
								console.info(e);
								loaded();
							});
					/*} else {
						game.readFile('extension/' + app.name + '/' + dir + '/main2.js',
							function(data) {
								var binarry = new Uint8Array(data);
								var blob = new Blob([binarry]);
								var reader = new FileReader();
								reader.readAsText(blob);
								reader.onload = function() {
									eval(reader.result);
									loaded();
								};
							},
							function(e) {
								console.info(e);
								loaded();
							});
					}*/
				});
			});
		},
		reWriteFunction: function(target, name, replace, str) {
			if (name && typeof name === 'object') {
				return app.each(name, function(item, index) {
					app.reWriteFunction(target, index, item[0], item[1]);
				}, target);
			}

			var plugins = app.pluginsMap;
			if ((typeof replace === 'string' || replace instanceof RegExp) &&
				(typeof str === 'string' || str instanceof RegExp)) {
				var funcStr = target[name].toString().replace(replace, str);
				eval('target.' + name + ' = ' + funcStr);
			} else {
				var func = target[name];
				target[name] = function() {
					var result, cancel;
					var args = Array.from(arguments);
					var args2 = Array.from(arguments);
					if (typeof replace === 'function') cancel = replace.apply(this, [args].concat(
						args));
					if (typeof func === 'function' && !cancel) result = func.apply(this, args);
					if (typeof str === 'function') str.apply(this, [result].concat(args2));
					return cancel || result;
				};
			}
			return target[name];
		},
		reWriteFunctionX: function(target, name, replace, str) {
			if (name && typeof name === 'object') {
				return app.each(name, function(item, index) {
					app.reWriteFunction(target, index, item);
				}, target);
			}

			if (Array.isArray(replace)) {
				var item1 = replace[0];
				var item2 = replace[1];
				var item3 = replace[2];
				if (item3 === 'append') {
					item2 = item1 + item2;
				} else if (item3 === 'insert') {
					item2 = item2 + item1;
				}
				if (typeof item1 === 'string') {
					item1 = RegExp(item1);
				}
				if (item1 instanceof RegExp && typeof item2 === 'string') {
					var funcStr = target[name].toString().replace(item1, item2);
					eval('target.' + name + ' = ' + funcStr);
				} else {
					var func = target[name];
					target[name] = function() {
						var arg1 = Array.from(arguments);
						var arg2 = Array.from(arguments);
						var result;
						if (app.isFunction(item1)) result = item1.apply(this, [arg1].concat(arg1));
						if (app.isFunction(func) && !result) result = func.apply(this, arg1);
						if (app.isFunction(item2)) item2.apply(this, [result].concat(arg2));
						return result;
					};
				}
			} else {
				console.info(arguments);
			}
			return target[name];
		},
		waitAllFunction: function(fnList, callback) {
			var list = fnList.slice(0);
			var runNext = function() {
				var item = list.shift();
				if (typeof item === 'function') {
					item(runNext);
				} else if (list.length === 0) {
					callback();
				} else {
					runNext();
				}
			};
			runNext();
		},
		element: {
			runNext: {
				setTip: function(tip) {
					console.info(tip);
				},
			},
		},
		get: {
			playerSkills: function(node, arg1, arg2) {
				var skills = node.getSkills(arg1, arg2).slice(0);
				skills.addArray(Object.keys(node.forbiddenSkills));
				skills.addArray(Object.keys(node.disabledSkills).filter(function(k) {
					return !node.hiddenSkills.contains(k) &&
						node.disabledSkills[k].length &&
						node.disabledSkills[k][0] === k + '_awake';
				}));
				return skills;
			},
			skillInfo: function(skill, node) {
				var obj = {};
				obj.id = skill;
				if (lib.translate[skill + '_ab']) {
					obj.name = lib.translate[skill + '_ab'];
					obj.nameSimple = lib.translate[skill + '_ab'];
				} else if (lib.translate[skill]) {
					obj.name = lib.translate[skill];
					obj.nameSimple = lib.translate[skill].slice(0, 2);
				}
				obj.info = lib.skill[skill];
				if (node) {
					if (node.forbiddenSkills[skill]) obj.forbidden = true;
					if (node.disabledSkills[skill]) obj.disabled = true;
					if (obj.info.temp || !node.skills.contains(skill)) obj.temp = true;
					if (obj.info.frequent || obj.info.subfrequent) obj.frequent = true;
					if (obj.info.clickable && node.isIn() && node.isUnderControl(true)) obj.clickable =
						true;
					if (obj.info.nobracket) obj.nobracket = true;
				}
				obj.translation = get.skillInfoTranslation(skill);
				obj.translationSource = lib.translate[skill + '_info'];
				obj.translationAppend = lib.translate[skill + '_append'];
				if (obj.info && obj.info.enable) {
					obj.type = 'enable';
				} else {
					obj.type = 'trigger';
				}
				return obj;
			},
		},
		listen: function(node, func) {
			node.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', func);
			return function() {
				node.removeEventLisnter(lib.config.touchscreen ? 'touchend' : 'click', func);
			};
		},
		mockTouch: function(node) {
			var event = new Event(lib.config.touchscreen ? 'touchend' : 'click');
			node.dispatchEvent(event);
			return node;
		},
		nextTick: function(func, time) {
			var funcs;
			if (Array.isArray(func)) funcs = func;
			else funcs = [func];
			var next = function() {
				var item = funcs.shift();
				if (item) {
					setTimeout(function() {
						item();
						next();
					}, time || 0);
				}
			};
			next();
		},
	};

	return {
		name: app.name,
		content: function(config, pack) {
			//狗托播报
			if (config.GTBB) {
				var txcsanm = {}
				var gddf = function() {

					var player = "玩家";
					var my = lib.config.connect_nickname;
					var suiji = ["氪金抽66", "卡宝真可爱", "蒸蒸日上", "√卡视我如父", "麒麟弓免疫枸杞", "坏可宣（老坏批）", "六千大败而归",
						"开局酒古锭", "遇事不决刷个乐", "见面两刀喜相逢", "改名出66", "时代的六万五", "韩旭", "司马长衫", "ogx",
						"狗卡不如无名杀", "王八万", "一拳兀突骨", "开局送神将", "丈八二桃", "装甲车车", "等我喝口酒", "Samuri", "马",
						"Log-Frunki", "aoe银钱豹", "没有丈八就托管", "无中yyds", "给咸鱼鸽鸽打call", "小零二哟～", "长歌最帅了",
						"大猫有侠者之风", "布灵布灵", "我爱～摸鱼～", "小寻寻真棒", "呲牙哥超爱笑", "是俺杀哒", "阿七阿七",
						"祖安·灰晖是龙王", "吃颗桃桃好遗计", "好可宣✓良民", "藏海表锅好", "金乎？木乎？水乎！！", "无法也无天", "西风不识相",
						"神秘喵酱", "星城在干嘛？", "子鱼今天摸鱼了吗？", "阳光苞里有阳光", "诗笺的小裙裙", "轮回中的消逝", "乱踢jb的云野",
						"小一是不是...是不是...", "美羊羊爱瑟瑟", "化梦的星辰", "杰哥带你登郎", "世中君子人", "叹年华未央", "短咕咕",
						"洛天依？！", "黄老板是好人～", "来点瑟瑟文和", "鲨鱼配辣椒", "萝卜～好萝卜", "废城君", "E佬细节鬼才",
						"感到棘手要怀念谁？", "半价小薯片", "JK欧拉欧拉欧拉", "新年快乐","周子鱼yu","遗计两个桃","诗笺","废城","狗卡你妈没了","我最擅长精测和白嫖","白金之星","不吃萝卜吃桃桃","长衫","吾名潘凤","黄金之心","海贼王","米线","暴走p","绝望の滋味","萝卜吃米洛","badcen","卡慕sama","大橙子","天使的回忆","死妈苏洋全家被泥头车撞死","红叔","黑猫大少爷","我的回合，抽卡！","让我康康！","粽子羊","我们的游戏正在蒸蒸日上","老萌Loun","对勾对勾w","逍遥散人","狗","一介品神","琅琊少年诸葛氪","一只快乐盖子","我是嘉然小姐的狗","姐姐砍我","古神","JOJO","派蒙","派魔","空","荧","钟离","凯尔希","浊心斯卡蒂","白笙","神奇陆夫人","您","废物","品神三花火攻未中","将军走此小道","华雄上也行","麦乐鸡块侠","麦乐鸡块贼","大碗拿铁","大碗咖啡","猫","chara","只有红猹可以吗","Frisk","中二摇滚羊","百里守约","杀批","原批","粥批","996","你热爱的就是你的手牌","看满离","万能导入发我，不小心删了","吃白饭的","木美人","山山峰峰","萤火虫の怨","李特斯","闫东炜","来世还做方块人","凋零斯拉","血舞crazy","心竹","花小烙","王境泽","真香真香","农批","铸时匠","哈利·波特","伏地魔","杨杨和夏季","叔叔的马什么时候死啊","蒙古上单","初音未来","你就是初音未来吧","啤酒烧烤","屁股肉","黑白女皇","戏の子","『』小醉°","逆态度","周杰伦赛高！","我永远喜欢森蚺！","断发表降心","无名杀真的太棒了","豹子头","孙悟空","孙悟空的师傅","三足金乌","陆压","段佳泽","喷水龙王","米忽悠真会坑钱","鹰角的利刃","月圆小魔女","卡夫卡","大番茄","老番茄","是のの不是的的","被玩坏了","番茄炒鸡蛋","你是什么垃圾","散人牌相声","千秋","君莫笑","干将","莫邪","千机伞","逐烟霞","可可爱爱大宝","盛情难却","三国杀劣强第一！","EDG牛逼！","卢本伟牛逼","EK鲁比","生日快乐是个呆瓜","红蓝酱","洋葱","你作业写完了吗","望影の方舟six","Igallta","重生","NOYM","早晚杀了rr","不是人","全场唯一预言家","过年了给冲儿来刀狠的","狗托","七七","小丑僵尸","舞王僵尸","温柔叙","黑皇帝","cty'max","不记仇的钟会","品神今天走小道了吗","嘉然今晚吃什么","关注嘉然顿顿解馋","对话，余华","第七天","活着","大伊万","法棍","天山童姥","吉利服","黑椒墨鱼","苏酥_SUSU_","一生一世二百五","包子入侵",
						"北川真木","野蛮qwq","超级大煎饼","幸运的一一","晋元帝","衫脚福闻","铭骑","鬼刃","利姆露","对立","光","姜米條","村头鱼","海贼王路飞","卡普","莫娜","元","竹林七贤","污妖王","千面千面","春の纪光","策划的马","元芳你怎么看？","正义人","123456789","小猫小狗","迪奥娜","大败而归","吃个桃桃好凉凉","春蚕","贾大爷","悍跳预言家","比利比利","你/我是什么垃圾？","键盘手","那个男人","孙家天下孙家兵","成就54320","张角：杀我","我玩了9年不比你强？","你们的武将怎么都那么阴间啊","狗卡的阴兵","我是拖","献祭十年寿命求中神郭"
					].randomGet();
					var name = [suiji, my].randomGet();
					var v = ["通过", "使用", "开启"].randomGet();
					var story = ["周年", "五一", "踏青", "牛年", "开黑", "冬至", "春分", "鼠年", "盛典", "魏魂", "群魂", "蜀魂",
						"吴魂", "猪年", "圣诞", "国庆", "狗年", "金秋", "奇珍", "元旦", "小雪", "冬日", "招募", "梦之回廊",
						"虎年", "新春", "七夕", "大雪", "端午", "武将", "中秋", "庆典"
					].randomGet();
					var box = ["盒子", "宝盒", "礼包", "福袋", "礼盒", "庆典", "盛典"].randomGet();
					var a = "获得了";
					//皮肤
					var pifu = ["界钟会×1", "王朗×1", "马钧×1", "司马昭×1", "司马师×1", "王平×1", "诸葛瞻×1", "张星彩×1",
						"董允×1", "关索×1", "骆统×1", "周处*1", "界步练师*1", "界朱然*1", "贺齐*1", "苏飞*1", "公孙康×1",
						"杨彪×1", "刘璋×1", "张仲景×1", "司马徽×1", "曹婴×1", "徐荣×1", "史诗宝珠*66", "史诗宝珠*33",
						"麒麟生角·魏延*1", "史诗宝珠*10", "刘焉×1", "孙寒华×1", "戏志才×1", "界曹真×1", "曹婴×1", "王粲×1",
						"界于禁×1", "郝昭×1", "界黄忠×1", "鲍三娘×1", "周群×1", "赵襄×1", "马云禄×1", "孙皓×1", "留赞×1",
						"吴景×1", "界徐盛×1", "许攸×1", "杜预×1", "界李儒×1", "张让×1", "麹义×1", "司马徽×1", "界左慈×1",
						"鲍三娘×1", "界徐盛×1", "南华老仙×1", "韩旭の大饼*100", "神郭嘉×1", "吴景×1", "周处×1", "杜预×1",
						"司马师×1", "羊微瑜×1", "神曹操×1"
					].randomGet();
					//武将
					var wujiang = ["谋定天下·陆逊*1（动+静）", "龙困于渊·刘协（动+静）*1", "星花柔矛·张星彩*1（动+静）",
						"呼啸生风·许褚*1（动+静）", "牛年立冬·司马懿*1（动+静）", "鹰视狼顾·司马懿*1（动+静）", "洛水神韵·甄姬*1（动+静）",
						"登锋陷阵·张辽*1（动+静）", "十胜十败·郭嘉*1（动+静）", "猪年端午·曹丕*1（动+静）", "背水一战·张郃*1（动+静）",
						"神兵天降·邓艾*1（动+静）", "独来固志·王基*1（动+静）", "猪年圣诞·刘备*1（动+静）", "哮风从龙·关羽*1（动+静）",
						"西凉雄狮·马超*1（动+静）", "鏖战赤壁·黄盖*1（动+静）", "星流霆击·孙尚香*1（动+静）", "猪年圣诞·陆逊*1（动+静）",
						"鼠年七夕·貂蝉*1（动+静）", "迅雷风烈·张角*1（动+静）", "一往无前·袁绍*1（动+静）", "盛气凌人·许攸*1（动+静）",
						"玄冥天通·神曹操*1（动+静）", "魂牵梦绕·灵雎*1（动+静）", "肝胆相照·⭐甘宁*1（动+静）", "超脱于世·庞德公*1（动+静）",
						"雄踞益州·刘焉*1（动+静）", "鼠年春节·兀突骨*1（动+静）", "牛年端午·孙鲁班*1（动+静）", "灵魂歌王·留赞*1（动+静）",
						"花容月貌·孙茹*1（动+静）", "猪年春节·孙鲁育*1（动+静）", "长沙桓王·孙笨*1（动+静）", "如花似朵·小乔*1（动+静）",
						"嫣然一笑·鲍三娘*1", "锐不可当·张翼*1（动+静）", "鼠年中秋·关索*1（动+静）", "花海舞枪·马云禄*1（动+静）",
						"木牛流马·黄月英*1（动+静）", "锋芒毕露·曹婴*1（动+静）", "长坂败备·曹纯*1（动+静）", "龙袭星落·王朗*1（动+静）",
						"举棋若定·戏志才*1（动+静）", "泰山捧日·程昱*1（动+静）", "冬日·王元姬（动态+静态）*1",
						"牛年七夕·步练师动态包*1（动+静）", "神甘宁×1", "巾帼花舞·马云禄*1（动+静）", "银币*66666", "将魂*66666",
						"琪花瑶草·徐氏*1（动+静）", "肝胆相照·星甘宁*1（动+静）", "星流霆击·孙尚香（动+静）*1", "锋芒毕露·曹婴*1（动+静）",
						"长衫の天牢令*100"
					].randomGet();
					//更改对应播报颜色
					var gold = ['<font color="#56e4fa">' + pifu + '</font>', '<font color="#f3c20f">' +
						wujiang + '</font>'
					].randomGet();
					var d = [",大家快恭喜TA吧！", ",祝你天天开心，万事如意"]
						.randomGet();

					txcsanm.div2.innerHTML =
						'<marquee direction="left" behavior="scroll" scrollamount=10" loop="1" width="100%" height="50" align="absmiddle" >' +
						'<font  face="FZLBJW">' + player + '<font color="#efe8dc">' + '<b>' + name +
						'</b>' + '</font>' + v + '<font color="#22c622">' + '<b>' + story + box +
						'</b>' + '</font>' + a + '<b>' + gold + '</b>' + d + '</font>' + '</marquee>';



				};
				var id = setInterval(function() {
					if (!txcsanm.div.parentNode && ui.window) {
						ui.window.appendChild(txcsanm.div);
						clearInterval(id);
						gddf();
						setInterval(gddf, 60000);
					}
				}, 5000);
				txcsanm.div = ui.create.div('');
				txcsanm.div2 = ui.create.div('', txcsanm.div);
				txcsanm.div.style.cssText = "pointer-events:none;width:100%;height:25px;font-size:23px;z-index:6;";
				txcsanm.div2.style.cssText = "pointer-events:none;background:rgba(0,0,0,0.5);width:100%;height:27px;";
			}

			//阶段提示
			if (config.JDTS) {
				//---------------------------------//
				//等待响应 
				lib.skill._jd_ddxyA = {
					trigger: {
						player: ['chooseToRespondBegin'],
					},
					direct: true,
					filter: function(event, player) {
						return player == game.me && _status.auto == false;
					},
					content: function() {
						if (lib.config.extension_手杀ui_JDTSYangshi == "1") {
							game.as_showImage('extension/手杀ui/lbtn/images/ddxy.jpg', [3, 58, 7, 6],
								true)
						} else {
							game.as_showImage('extension/手杀ui/lbtn/images/ddxy.png', [3, 65, 12, 6],
								true)
						}
					},
				};

				//成为杀的目标开始
				lib.skill._jd_ddxyB = {
					trigger: {
						target: 'shaBegin',
					},
					filter: function(event, player) {
						return game.me == event.target;
					},
					charlotte: true,
					forced: true,
					content: function() {
						if (lib.config.extension_手杀ui_JDTSYangshi == "1") {
							game.as_showImage('extension/手杀ui/lbtn/images/ddxy.jpg', [3, 58, 7, 6],
								true)
						} else {
							game.as_showImage('extension/手杀ui/lbtn/images/ddxy.png', [3, 65, 12, 6],
								true)
						}
					},
				};
				lib.skill._jd_ddxyC = {
					trigger: {
						player: ['useCardToBegin', 'phaseJudge']
					},
					filter: function(event, player) {
						if (event.card.storage && event.card.storage.nowuxie) return false;
						var card = event.card;
						if (event.name == 'phaseJudge' && card.viewAs) card = {
							name: card.viewAs
						};
						var info = get.info(card);
						if (info.wuxieable === false) return false;
						if (event.name != 'phaseJudge') {
							if (event.getParent().nowuxie) return false;
							if (!event.target) {
								if (info.wuxieable) return true;
								return false;
							}
							if (event.player.hasSkillTag('playernowuxie', false, event.card))
							return false;
							if (get.type(event.card) != 'trick' && !info.wuxieable) return false;
						}
						return player == game.me && _status.auto == false;
					},
					charlotte: true,
					forced: true,
					content: function() {
						if (lib.config.extension_手杀ui_JDTSYangshi == "1") {
							game.as_showImage('extension/手杀ui/lbtn/images/ddxy.jpg', [3, 58, 7, 6],
								true)
						} else {
							game.as_showImage('extension/手杀ui/lbtn/images/ddxy.png', [3, 65, 12, 6],
								true)
						}
					},
				};

				//使用或打出闪后
				lib.skill._jd_shiyongshanD = {
					forced: true,
					charlotte: true,
					trigger: {
						player: ["useCard", "respondAfter"],
					},
					filter: function(event, player) {
						return player == game.me && event.card.name == 'shan';
					},
					content: function() {
						game.as_removeImage();
						if (_status.as_showImage_phase) {
							if (lib.config.extension_手杀ui_JDTSYangshi == "1") {
								game.as_showImage('extension/手杀ui/lbtn/images/' + _status
									.as_showImage_phase + '.jpg', [3, 58, 7, 6], true);
							} else {
								game.as_showImage('extension/手杀ui/lbtn/images/' + _status
									.as_showImage_phase + '.png', [3, 65, 12, 6], true);
							}
						}
					},
				};

				//等待响应及游戏结束 
				lib.skill._jd_ddxyE = {
					trigger: {
						player: ['chooseToRespondEnd', 'useCardToEnd', 'phaseJudgeEnd', 'respondSha',
							'shanBegin'
						],
					},
					filter: function(event, player) {
						return player == game.me && _status.auto == false;
					},
					direct: true,
					content: function() {
						game.as_removeImage();
						if (_status.as_showImage_phase) {
							if (lib.config.extension_手杀ui_JDTSYangshi == "1") {
								game.as_showImage('extension/手杀ui/lbtn/images/' + _status
									.as_showImage_phase + '.jpg', [3, 58, 7, 6], true);
							} else {
								game.as_showImage('extension/手杀ui/lbtn/images/' + _status
									.as_showImage_phase + '.png', [3, 65, 12, 6], true);
							}
						}
					},
				};

				//玩家死亡消失 
				lib.skill._jd_wjsw = {
					trigger: {
						global: 'dieAfter'
					},

					filter: function(event, player) {
						return player == game.me && _status.auto == false;
					},
					forced: true,
					charlotte: true,
					content: function() {
						game.as_removeImage();
					},
				};

				//游戏结束消失
				lib.onover.push(function(bool) {
					game.as_removeImage();
				});

				//对方正在思考
				lib.skill._jd_dfsk = {
					trigger: {
						global: ['phaseBegin', 'phaseEnd', 'phaseJudgeBegin', 'phaseDrawBegin',
							'phaseUseBegin', 'phaseDiscardBegin'
						],
					},
					charlotte: true,
					forced: true,
					filter: function(event, player) {
						//剩余人数两人时
						if (game.players.length == 2 && _status.currentPhase != game.me)
					return true;
					},
					content: function() {
						if (lib.config.extension_手杀ui_JDTSYangshi == "1") {
							game.as_showImage('extension/手杀ui/lbtn/images/dfsk.jpg', [3, 58, 7, 6],
								true)
						} else {
							game.as_showImage('extension/手杀ui/lbtn/images/dfsk.png', [3, 65, 12, 6],
								true)
						}
					},
				};
				//回合开始
				lib.skill._jd_hhks = {
					trigger: {
						player: ['phaseBefore', 'phaseBegin'],
					},
					filter: function(event, player) {
						return player == game.me && _status.currentPhase == player && _status
							.auto == false;
					},
					charlotte: true,
					forced: true,
					content: function() {
						if (event.triggername == 'phaseBefore') {
							if (lib.config.extension_手杀ui_JDTSYangshi == "1") {
								game.as_showImage('extension/手杀ui/lbtn/images/hhks.jpg', [3, 58, 7,
									6
								], true)
							} else {
								game.as_showImage('extension/手杀ui/lbtn/images/hhks.png', [3, 65, 12,
									6
								], true)
							}
							_status.as_showImage_phase = 'hhks';
						} else if (_status.as_showImage_phase && _status.as_showImage_phase ==
							'hhks') {
							game.as_removeImage();
							delete _status.as_showImage_phase;
						}
					},
				};

				//判定阶段
				lib.skill._jd_pdjd = {
					trigger: {
						player: ['phaseJudgeBegin', 'phaseJudgeEnd'],
					},
					filter: function(event, player) {
						return player == game.me && _status.currentPhase == player && _status
							.auto == false;
					},
					charlotte: true,
					forced: true,
					content: function() {
						if (event.triggername == 'phaseJudgeBegin') {
							if (lib.config.extension_手杀ui_JDTSYangshi == "1") {
								game.as_showImage('extension/手杀ui/lbtn/images/pdjd.jpg', [3, 58, 7,
									6
								], true)
							} else {
								game.as_showImage('extension/手杀ui/lbtn/images/pdjd.png', [3, 65, 12,
									6
								], true)
							}
							_status.as_showImage_phase = 'pdjd';
						} else if (_status.as_showImage_phase && _status.as_showImage_phase ==
							'pdjd') {
							game.as_removeImage();
							delete _status.as_showImage_phase;
						}
					},
				};

				//摸牌阶段
				lib.skill._jd_mpjd = {
					trigger: {
						player: ['phaseDrawBegin', 'phaseDrawEnd'],
					},
					filter: function(event, player) {
						return player == game.me && _status.currentPhase == player && _status
							.auto == false;
					},
					charlotte: true,
					forced: true,
					content: function() {
						if (event.triggername == 'phaseDrawBegin') {
							if (lib.config.extension_手杀ui_JDTSYangshi == "1") {
								game.as_showImage('extension/手杀ui/lbtn/images/mpjd.jpg', [3, 58, 7,
									6
								], true)
							} else {
								game.as_showImage('extension/手杀ui/lbtn/images/mpjd.png', [3, 65, 12,
									6
								], true)
							}
							_status.as_showImage_phase = 'mpjd';
						} else if (_status.as_showImage_phase && _status.as_showImage_phase ==
							'mpjd') {
							game.as_removeImage();
							delete _status.as_showImage_phase;
						}
					},
				};

				//出牌阶段
				lib.skill._jd_cpjd = {
					trigger: {
						player: ['phaseUseBegin', 'phaseUseEnd'],
					},
					filter: function(event, player) {
						return player == game.me && _status.currentPhase == player && _status
							.auto == false;
					},
					charlotte: true,
					forced: true,
					content: function() {
						if (event.triggername == 'phaseUseBegin') {
							if (lib.config.extension_手杀ui_JDTSYangshi == "1") {
								game.as_showImage('extension/手杀ui/lbtn/images/cpjd.jpg', [3, 58, 7,
									6
								], true)
							} else {
								game.as_showImage('extension/手杀ui/lbtn/images/cpjd.png', [3, 65, 12,
									6
								], true)
							}
							_status.as_showImage_phase = 'cpjd';
						} else if (_status.as_showImage_phase && _status.as_showImage_phase ==
							'cpjd') {
							game.as_removeImage();
							delete _status.as_showImage_phase;
						}
					},
				};

				//弃牌阶段
				lib.skill._jd_qpjd = {
					trigger: {
						player: ['phaseDiscardBegin', 'phaseDiscardEnd'],
					},
					filter: function(event, player) {
						return player == game.me && _status.currentPhase == player && _status
							.auto == false;
					},
					charlotte: true,
					forced: true,
					content: function() {
						if (event.triggername == 'phaseDiscardBegin') {
							if (lib.config.extension_手杀ui_JDTSYangshi == "1") {
								game.as_showImage('extension/手杀ui/lbtn/images/qpjd.jpg', [3, 58, 7,
									6
								], true)
							} else {
								game.as_showImage('extension/手杀ui/lbtn/images/qpjd.png', [3, 65, 12,
									6
								], true)
							}
							_status.as_showImage_phase = 'qpjd';
						} else if (_status.as_showImage_phase && _status.as_showImage_phase ==
							'qpjd') {
							game.as_removeImage();
							delete _status.as_showImage_phase;
						}
					},
				};

				//回合结束
				lib.skill._jd_hhjs = {
					trigger: {
						player: ['phaseEnd', 'phaseAfter']
					},
					filter: function(event, player) {
						return player == game.me && _status.currentPhase == player && _status
							.auto == false;
					},
					charlotte: true,
					forced: true,
					content: function() {
						if (event.triggername == 'phaseEnd') {
							if (lib.config.extension_手杀ui_JDTSYangshi == "1") {
								game.as_showImage('extension/手杀ui/lbtn/images/hhjs.jpg', [3, 58, 7,
									6
								], true)
							} else {
								game.as_showImage('extension/手杀ui/lbtn/images/hhjs.png', [3, 65, 12,
									6
								], true)
							}
							_status.as_showImage_phase = 'hhjs';
						} else if (_status.as_showImage_phase && _status.as_showImage_phase ==
							'hhjs') {
							game.as_removeImage();
							delete _status.as_showImage_phase;
						}
					},
				};
				//---------------------------------//

			}

			//进度条
			if (get.mode() != 'connect' && config.jindutiao == true) {

				lib.onover.push(function(bool) {
					if (document.getElementById("jindutiao")) {
						document.getElementById("jindutiao").remove()
					}

				});

				lib.skill._jindutiao = {
					trigger: {
						player: ['phaseBegin', 'useCardAfter']
					},
					filter: function(event, player) {
						return player == game.me && _status.currentPhase == player && _status
							.auto == false;
					},
					forced: true,

					content: function() {

						if (window.timer) {
							clearInterval(window.timer);
						}

						if (document.getElementById("jindutiao")) {
							document.getElementById("jindutiao").remove()
						}

						//-------样式1-------//
						if (lib.config.extension_手杀ui_jindutiaoYangshi == "1") {
							//手杀进度条样式
							var boxContent = document.createElement('div')
							boxContent.setAttribute('id', 'jindutiao')
							boxContent.style.cssText =
								"background-color: rgba(0,0,0,0.5);width: 590px;height:10px;border-radius: 1000px;box-shadow:0px 0px 5px #ccc inset,0px 0px 2px #FFFFD5;overflow: hidden;border:1px solid #41351D;position: fixed;bottom: calc(23% + 18px);left: calc(50% - 295px);"
							var boxTime = document.createElement('div')
							boxTime.data = 600
							boxTime.style.cssText =
								"background-image: linear-gradient(#ffff13, #cf1023, #c3761e);width: 600px;height:10px;"
							boxContent.appendChild(boxTime)
						}
						//-------样式2-----//
						if (lib.config.extension_手杀ui_jindutiaoYangshi == "2") {

							//十周年PC端进度条样式
							var boxContent = document.createElement('div')
							boxContent.setAttribute('id', 'jindutiao')
							boxContent.style.cssText =
								"width: 400px;height:24px;position: fixed;bottom: calc(23% + 18px);display: block;margin: 0 32% !important;"

							var boxTime = document.createElement('div')
							boxTime.data = 300
							boxTime.style.cssText =
								"width:280px;height:2px;margin:14px 0 0 85px;background-color: #E2E20A;border-right:10px solid #FFF;position: absolute;top: 4px;"
							boxContent.appendChild(boxTime)

							var imgBg = document.createElement('img')
							imgBg.src = lib.assetURL + 'extension/手杀ui/lbtn/images/jindutiao.png'
							imgBg.style.cssText =
								"width: 400px;height:40px;position: absolute;top: 0;"
							boxContent.appendChild(imgBg)

						}

						//-------样式3-----//
						if (lib.config.extension_手杀ui_jindutiaoYangshi == "3") {

							//十周年客户端进度条样式
							var boxContent = document.createElement('div')
							boxContent.setAttribute('id', 'jindutiao')
							/*进度条区域框框*/
							boxContent.style.cssText =
								"width: 500px;height:20px;position: fixed;bottom: calc(23% + 22px);box-shadow:none;display: block;margin: 0 0 !important;border-radius: 4px;left: calc(50% - 250px);"

							var boxTime = document.createElement('div')
							boxTime.data = 300
							boxTime.style.cssText =
								/*进度条内容*/
								"width:482px;height:18px;background-color: #F4C336;border-top:1px solid #FFF;border-bottom:1px solid #FFF;border-left:1px solid #FFF;position: absolute;top: 1px;margin-right:5px;margin-left:4px;margin-top:2px;border-radius: 4px;"
							boxContent.appendChild(boxTime)

							var imgBg = document.createElement('img')
							imgBg.src = lib.assetURL + 'extension/手杀ui/lbtn/images/jindutiao2.png'
							imgBg.style.cssText =
								"width: 500px;height:25px;position: absolute;top: 0;opacity: 0.9;"
							boxContent.appendChild(imgBg)

						}

						document.body.appendChild(boxContent)
						window.timer = setInterval(() => {
							boxTime.data--
							boxTime.style.width = boxTime.data + 'px'
							if (boxTime.data == 0) {
								clearInterval(window.timer);
								boxContent.remove()
								//点击托管ui.click.auto();
							}
						}, 100); //进度条时间

					},
					group: ['_jindutiao_jieshu', '_jindutiao_jieshuB'],
					subSkill: {
						jieshu: {
							trigger: {
								player: 'phaseEnd'

							},
							forced: true,
							content: function() {
								if (window.timer) {
									clearInterval(window.timer);
								}

								if (document.getElementById("jindutiao")) {
									document.getElementById("jindutiao").remove()
								}
							},
						},
						jieshuB: {
							trigger: {
								player: 'useCardBegin'

							},
							filter: function(event, player) {
								return event.card && get.type(event.card, 'trick') == 'trick';
							},
							forced: true,
							content: function() {
								if (window.timer) {
									clearInterval(window.timer);
								}

								if (document.getElementById("jindutiao")) {
									document.getElementById("jindutiao").remove()
								}
							},
						},

					},

				}
			}
			lib.skill._wuxie = {
				trigger: {
					player: ['useCardToBegin', 'phaseJudge']
				},
				priority: 5,
				popup: false,
				forced: true,
				filter: function(event, player) {
					if (event.card.storage && event.card.storage.nowuxie) return false;
					var card = event.card;
					if (event.name == 'phaseJudge' && card.viewAs) card = {
						name: card.viewAs
					};
					var info = get.info(card);
					if (info.wuxieable === false) return false;
					if (event.name != 'phaseJudge') {
						if (event.getParent().nowuxie) return false;
						if (!event.target) {
							if (info.wuxieable) return true;
							return false;
						}
						if (event.player.hasSkillTag('playernowuxie', false, event.card))
						return false;
						if (get.type(event.card) != 'trick' && !info.wuxieable) return false;
					}
					return true;
				},
				forceLoad: true,
				content: function() {
					'step 0'
					delete event.wuxieresult;
					delete event.wuxieresult2;
					if (trigger.multitarget) {
						event.targets = trigger.targets;
					}
					event.target = trigger.target;
					if (event.triggername == 'phaseJudge') {
						event.target = trigger.player;
					}
					event.sourcex = event.targets || event.target;
					if (!event.targets && trigger.targets && trigger.targets.length == 1) {
						event.sourcex2 = trigger.player;
					}
					event.source = trigger.player;
					if (event.state == undefined) event.state = true;
					event.card = trigger.card;
					event._global_waiting = true;
					event.tempnowuxie = (trigger.targets && trigger.targets.length > 1 && !trigger
						.multitarget);
					event.filterCard = function(card, player) {
						if (get.name(card) != 'wuxie') return false;
						return lib.filter.cardEnabled(card, player, 'forceEnable');
					};
					event.send = function(player, state, isJudge, card, source, target, targets, id,
						id2, tempnowuxie, skillState) {
						if (skillState) {
							player.applySkills(skillState);
						}
						state = state ? 1 : -1;
						var str = '';
						if (isJudge) {
							str += get.translation(source) + '的';
						}
						if (isJudge) {
							str += get.translation(card, 'viewAs');
						} else {
							str += get.translation(card);
						}
						if ((targets || target) && !isJudge) {
							str += '对' + get.translation(targets || target);
						}
						str += '将' + (state > 0 ? '生效' : '失效') + '，是否无懈？';

						if (player.isUnderControl(true) && !_status.auto && !ui.tempnowuxie &&
							tempnowuxie) {
							var translation = get.translation(card.name);
							if (translation.length >= 4) {
								translation = lib.translate[card.name + '_ab'] || translation
									.slice(0, 2);
							}
							ui.tempnowuxie = ui.create.control('不无懈' + translation, ui.click
								.tempnowuxie, 'stayleft');
							ui.tempnowuxie._origin = id2;
						}
						var next = player.chooseToUse({
							filterCard: function(card, player) {
								if (get.name(card) != 'wuxie') return false;
								return lib.filter.cardEnabled(card, player,
									'forceEnable');
							},
							prompt: str,
							type: 'wuxie',
							state: state,
							_global_waiting: true,
							ai1: function() {
								if (isJudge) {
									var name = card.viewAs || card.name;
									var info = lib.card[name];
									if (info && info.ai && info.ai.wuxie) {
										var aiii = info.ai.wuxie(source, card,
											source, _status.event.player, state);
										if (typeof aiii == 'number') return aiii;
									}
									if (Math.abs(get.attitude(_status.event.player,
											source)) < 3) return 0;
									if (source.hasSkillTag('nowuxie_judge') ||
										source.hasSkillTag('guanxing') && (source !=
											player || !source.hasSkill(
												'guanxing_fail'))) return 0;
									if (name != 'lebu' && name != 'bingliang') {
										if (source != _status.event.player) {
											return 0;
										}
									}
									var card2;
									if (name != card.name) {
										card2 = {
											name: name
										};
									} else {
										card2 = card;
									}
									var eff = get.effect(source, card2, source,
										source);
									if (eff >= 0) return 0;
									return state * get.attitude(_status.event
										.player, source);
								} else if (target) {
									var triggerevent = _status.event.getTrigger();
									if (triggerevent && triggerevent.parent &&
										triggerevent.parent.postAi &&
										triggerevent.player.isUnknown(_status.event
											.player)) {
										return 0;
									}
									var info = get.info(card);
									if (info.ai && info.ai.wuxie) {
										var aiii = info.ai.wuxie(target, card,
											source, _status.event.player, state);
										if (typeof aiii == 'number') return aiii;
									}
									if (info.multitarget && targets) {
										var eff = 0;
										for (var i = 0; i < targets.length; i++) {
											eff += get.effect(targets[i], card,
												source, _status.event.player)
										}
										return -eff * state;
									}
									if (Math.abs(get.attitude(_status.event.player,
											target)) < 3) return 0;
									return -get.effect(target, card, source, _status
										.event.player) * state;
								} else {
									var triggerevent = _status.event.getTrigger();
									if (triggerevent && triggerevent.parent &&
										triggerevent.parent.postAi &&
										triggerevent.player.isUnknown(_status.event
											.player)) {
										return 0;
									}
									var info = get.info(card);
									if (info.ai && info.ai.wuxie) {
										var aiii = info.ai.wuxie(target, card,
											source, _status.event.player, state);
										if (typeof aiii == 'number') return aiii;
									}
									if (Math.abs(get.attitude(_status.event.player,
											source)) < 3) return 0;
									return -get.attitude(_status.event.player,
										source) * state;
								}
							},
							source: target,
							source2: targets,
							id: id,
							id2: id2
						});
						if (event.stateplayer && event.statecard) next.set('respondTo', [event
							.stateplayer, event.statecard
						]);
						else if (!isJudge) {
							next.set('respondTo', [source, card]);
						}
						if (game.online) {
							_status.event._resultid = id;
							game.resume();
						} else {
							next.nouse = true;
						}
					};
					event.settle = function() {
						if (!event.state) {
							if (event.triggername == 'phaseJudge') {
								trigger.untrigger();
								trigger.cancelled = true;
							} else {
								trigger.cancel();
								if (event.guowuxie == true) {
									if (trigger.target.identity != 'ye' && trigger.target
										.identity != 'unknown') {
										trigger.getParent().excluded.addArray(game.filterPlayer(
											function(current) {
												return current.identity == trigger
													.target.identity;
											}));
									}
								}
							}
						}
						event.finish();
					};
					'step 1'
					var list = game.filterPlayer(function(current) {
						if (event.nowuxie) return false;
						if (event.directHit && event.directHit.contains(current))
						return false;
						if (event.triggername == 'phaseJudge') {
							if (game.checkMod(trigger.card, player, current, 'unchanged',
									'wuxieJudgeEnabled', current) == false) return false;
							if (game.checkMod(trigger.card, player, current, 'unchanged',
									'wuxieJudgeRespondable', player) == false) return false;
							if (event.stateplayer && event.statecard && (game.checkMod(event
										.statecard, event.stateplayer, player, current,
										'unchanged', 'wuxieRespondable', event.stateplayer
										) == false)) return false;
						} else {
							if (!event.statecard && trigger.getParent().directHit.contains(
									current)) return false;
							if (game.checkMod(trigger.card, player, trigger.target, current,
									'unchanged', 'wuxieEnabled', current) == false)
							return false;
							if (game.checkMod(trigger.card, player, trigger.target, current,
									'unchanged', 'wuxieRespondable', player) == false)
								return false;
							if (event.stateplayer && event.statecard && (game.checkMod(event
									.statecard, event.stateplayer, trigger.player,
									current, 'unchanged', 'wuxieRespondable', event
									.stateplayer) == false)) return false;
						}
						return current.hasWuxie();
					});
					event.list = list;
					event.id = get.id();
					list.sort(function(a, b) {
						return get.distance(event.source, a, 'absolute') - get.distance(
							event.source, b, 'absolute');
					});
					'step 2'
					if (event.list.length == 0) {
						event.settle();
					} else if (_status.connectMode && (event.list[0].isOnline() || event.list[0] ==
							game.me)) {
						event.goto(4);
					} else {
						event.current = event.list.shift();
						event.send(event.current, event.state, event.triggername == 'phaseJudge',
							event.card, event.source, event.target, event.targets, event.id,
							trigger.parent.id, event.tempnowuxie);
					}
					'step 3'
					if (result.bool) {
						event.wuxieresult = event.current;
						event.wuxieresult2 = result;
						event.goto(8);
					} else {
						event.goto(2);
					}
					'step 4'
					var id = event.id;
					var sendback = function(result, player) {
						if (result && result.id == id && !event.wuxieresult && result.bool) {
							event.wuxieresult = player;
							event.wuxieresult2 = result;
							game.broadcast('cancel', id);
							if (_status.event.id == id && _status.event.name == 'chooseToUse' &&
								_status.paused) {
								return (function() {
									event.resultOL = _status.event.resultOL;
									ui.click.cancel();
									if (ui.confirm) ui.confirm.close();
								});
							}
						} else {
							if (_status.event.id == id && _status.event.name == 'chooseToUse' &&
								_status.paused) {
								return (function() {
									event.resultOL = _status.event.resultOL;
								});
							}
						}
					};

					var withme = false;
					var withol = false;
					var list = event.list;
					for (var i = 0; i < list.length; i++) {
						if (list[i].isOnline()) {
							withol = true;
							list[i].wait(sendback);
							list[i].send(event.send, list[i], event.state, event.triggername ==
								'phaseJudge',
								event.card, event.source, event.target, event.targets, event.id,
								trigger.parent.id, event.tempnowuxie, get.skillState(list[i]));
							list.splice(i--, 1);
						} else if (list[i] == game.me) {
							withme = true;
							event.send(list[i], event.state, event.triggername == 'phaseJudge',
								event.card, event.source, event.target, event.targets, event.id,
								trigger.parent.id, event.tempnowuxie);
							list.splice(i--, 1);
						}
					}
					if (!withme) {
						event.goto(6);
					}
					if (_status.connectMode) {
						if (withme || withol) {
							for (var i = 0; i < game.players.length; i++) {
								game.players[i].showTimer();
							}
						}
					}
					event.withol = withol;
					'step 5'
					if (result && result.bool && !event.wuxieresult) {
						game.broadcast('cancel', event.id);
						event.wuxieresult = game.me;
						event.wuxieresult2 = result;
					}
					'step 6'
					if (event.withol && !event.resultOL) {
						game.pause();
					}
					'step 7'
					for (var i = 0; i < game.players.length; i++) {
						game.players[i].hideTimer();
					}
					'step 8'
					if (event.wuxieresult && event.wuxieresult2 && event.wuxieresult2.skill) {
						var info = get.info(event.wuxieresult2.skill);
						if (info && info.precontent && !game.online) {
							var next = game.createEvent('pre_' + event.wuxieresult2);
							next.setContent(info.precontent);
							next.set('result', event.wuxieresult2);
							next.set('player', event.wuxieresult);
						}
					}
					'step 9'
					if (event.wuxieresult) {
						var next = event.wuxieresult.useResult(event.wuxieresult2);
						if (event.stateplayer && event.statecard) next.respondTo = [event
							.stateplayer, event.statecard
						];
						else if (event.triggername != 'phaseJudge') {
							next.respondTo = [trigger.player, trigger.card];
						}
					}
					'step 10'
					if (event.wuxieresult) {
						if (result.wuxied) {
							event.nowuxie = result.nowuxie;
							event.directHit = result.directHit;
							event.stateplayer = event.wuxieresult;
							if (event.wuxieresult2 && event.wuxieresult2.used) {
								event.statecard = event.wuxieresult2.used;
							} else {
								event.statecard = true;
							}
							event.state = !event.state;
							event.goto(1);
						} else event.settle();
					} else if (event.list.length) {
						event.goto(2);
					} else {
						event.settle();
					}
					delete event.resultOL;
					delete event.wuxieresult;
					delete event.wuxieresult2;
				}
			}
			return function(next) {
				app.waitAllFunction([
					function(_next) {
						lib.init.css(lib.assetURL + 'extension/' + app.name, 'extension',
							_next);
					},
					function(_next) {
						app.loadPlugins(function() {
							var plugins = app.plugins.slice(0);
							var runNext = function() {
								var item = plugins.shift();
								if (!item) return _next();
								if (item.filter && !item.filter()) return runNext();
								if (item.content) return item.content(runNext);
								runNext();
							};
							Object.assign(runNext, app.element.runNext);
							runNext();
						});
					},
				], next);
			};
		},
		precontent: function() {
			//阶段提示框架（俺杀）
			//自定义播放图片
			game.as_removeText = function() {
				if (_status.as_showText) {
					_status.as_showText.remove();
					delete _status.as_showText;
				}
				if (_status.as_showImage) {
					_status.as_showImage.show();
				}
			}
			game.as_showText = function(str, pos, time, font, size, color) {
				if (!str) return false;
				if (!pos || !Array.isArray(pos)) {
					pos = [0, 0, 100, 100];
				}
				if (!time || (isNaN(time) && time !== true)) time = 3;
				if (!font) font = 'shousha';
				if (!size) size = 16;
				if (!color) color = '#ffffff';
				if (_status.as_showText) {
					_status.as_showText.remove();
					delete _status.as_showText;
				}

				var div = ui.create.div('', str, ui.window);
				div.style.cssText = 'z-index:-3; pointer-events:none; font-family:' + font +
					'; font-size:' + size + 'px; color:' + color + '; line-height:' + size * 1.2 +
					'px; text-align:center; left:' + (pos[0] + pos[2] / 2) + '%; top:' + pos[1] +
					'%; width:0%; height:' + pos[3] +
					'%; position:absolute; transition-property:all; transition-duration:1s';
				_status.as_showText = div;

				if (_status.as_showImage) {
					_status.as_showImage.hide();
				}

				setTimeout(function() {
					div.style.left = pos[0] + '%';
					div.style.width = pos[2] + '%';
				}, 1);

				if (time === true) return true;
				setTimeout(function() {
					if (_status.as_showText) {
						_status.as_showText.remove();
						delete _status.as_showText;
					}
					if (_status.as_showImage) {
						_status.as_showImage.show();
					}
				}, time * 1000);

				return true;
			}
			game.as_removeImage = function() {
				if (_status.as_showImage) {
					_status.as_showImage.remove();
					delete _status.as_showImage;
				}
			}
			game.as_showImage = function(url, pos, time) {
				if (!url) return false;
				if (!pos || !Array.isArray(pos)) {
					pos = [0, 0, 100, 100];
				}
				if (!time || (isNaN(time) && time !== true)) time = 3;
				if (_status.as_showImage) {
					_status.as_showImage.remove();
					delete _status.as_showImage;
				}

				var div = ui.create.div('', '', ui.window);
				div.style.cssText = 'z-index:-1; pointer-events:none; left:' + (pos[0] + pos[2] / 2) +
					'%; top:' + pos[1] + '%; width:0%; height:' + pos[3] +
					'%; position:absolute; background-size:100% 100%; background-position:center center; background-image:url(' +
					lib.assetURL + url + '); transition-property:all; transition-duration:1s';
				_status.as_showImage = div;

				if (_status.as_showText) {
					_status.as_showImage.hide();
				}

				setTimeout(function() {
					div.style.left = pos[0] + '%';
					div.style.width = pos[2] + '%';
				}, 1);

				if (time === true) return true;
				setTimeout(function() {
					if (_status.as_showImage) {
						_status.as_showImage.remove();
						delete _status.as_showImage;
					}
				}, time * 1000);

				return true;
			};

			//-----华丽分割线-----// 

			// if (get.mode() == 'boss') return
			lib.init.onload = function() {
				ui.updated();
				game.documentZoom = game.deviceZoom;
				if (game.documentZoom != 1) {
					ui.updatez();
				}
				ui.background = ui.create.div('.background');
				ui.background.style.backgroundSize = "cover";
				ui.background.style.backgroundPosition = '50% 50%';
				if (lib.config.image_background && lib.config.image_background != 'default' && lib
					.config.image_background.indexOf('custom_') != 0) {
					ui.background.setBackgroundImage('image/background/' + lib.config.image_background +
						'.jpg');
					if (lib.config.image_background_blur) {
						ui.background.style.filter = 'blur(8px)';
						ui.background.style.webkitFilter = 'blur(8px)';
						ui.background.style.transform = 'scale(1.05)';
					}
				}
				document.documentElement.style.backgroundImage = '';
				document.documentElement.style.backgroundSize = '';
				document.documentElement.style.backgroundPosition = '';
				document.body.insertBefore(ui.background, document.body.firstChild);
				document.body.onresize = ui.updatexr;
				if (lib.config.touchscreen) {
					document.body.addEventListener('touchstart', function(e) {
						this.startX = e.touches[0].clientX / game.documentZoom;
						this.startY = e.touches[0].clientY / game.documentZoom;
						_status.dragged = false;
					});
					document.body.addEventListener('touchmove', function(e) {
						if (_status.dragged) return;
						if (Math.abs(e.touches[0].clientX / game.documentZoom - this.startX) >
							10 ||
							Math.abs(e.touches[0].clientY / game.documentZoom - this.startY) >
							10) {
							_status.dragged = true;
						}
					});
				}

				if (lib.config.image_background.indexOf('custom_') == 0) {
					ui.background.style.backgroundImage = "none";
					game.getDB('image', lib.config.image_background, function(fileToLoad) {
						if (!fileToLoad) return;
						var fileReader = new FileReader();
						fileReader.onload = function(fileLoadedEvent) {
							var data = fileLoadedEvent.target.result;
							ui.background.style.backgroundImage = 'url(' + data + ')';
							if (lib.config.image_background_blur) {
								ui.background.style.filter = 'blur(8px)';
								ui.background.style.webkitFilter = 'blur(8px)';
								ui.background.style.transform = 'scale(1.05)';
							}
						};
						fileReader.readAsDataURL(fileToLoad, "UTF-8");
					});
				}
				if (lib.config.card_style == 'custom') {
					game.getDB('image', 'card_style', function(fileToLoad) {
						if (!fileToLoad) return;
						var fileReader = new FileReader();
						fileReader.onload = function(fileLoadedEvent) {
							if (ui.css.card_stylesheet) {
								ui.css.card_stylesheet.remove();
							}
							ui.css.card_stylesheet = lib.init.sheet(
								'.card:not(*:empty){background-image:url(' +
								fileLoadedEvent.target.result + ')}');
						};
						fileReader.readAsDataURL(fileToLoad, "UTF-8");
					});
				}
				if (lib.config.cardback_style == 'custom') {
					game.getDB('image', 'cardback_style', function(fileToLoad) {
						if (!fileToLoad) return;
						var fileReader = new FileReader();
						fileReader.onload = function(fileLoadedEvent) {
							if (ui.css.cardback_stylesheet) {
								ui.css.cardback_stylesheet.remove();
							}
							ui.css.cardback_stylesheet = lib.init.sheet(
								'.card:empty,.card.infohidden{background-image:url(' +
								fileLoadedEvent.target.result + ')}');
						};
						fileReader.readAsDataURL(fileToLoad, "UTF-8");
					});
					game.getDB('image', 'cardback_style2', function(fileToLoad) {
						if (!fileToLoad) return;
						var fileReader = new FileReader();
						fileReader.onload = function(fileLoadedEvent) {
							if (ui.css.cardback_stylesheet2) {
								ui.css.cardback_stylesheet2.remove();
							}
							ui.css.cardback_stylesheet2 = lib.init.sheet(
								'.card.infohidden:not(.infoflip){background-image:url(' +
								fileLoadedEvent.target.result + ')}');
						};
						fileReader.readAsDataURL(fileToLoad, "UTF-8");
					});
				}
				if (lib.config.hp_style == 'custom') {
					game.getDB('image', 'hp_style1', function(fileToLoad) {
						if (!fileToLoad) return;
						var fileReader = new FileReader();
						fileReader.onload = function(fileLoadedEvent) {
							if (ui.css.hp_stylesheet1) {
								ui.css.hp_stylesheet1.remove();
							}
							ui.css.hp_stylesheet1 = lib.init.sheet(
								'.hp:not(.text):not(.actcount)[data-condition="high"]>div:not(.lost){background-image:url(' +
								fileLoadedEvent.target.result + ')}');
						};
						fileReader.readAsDataURL(fileToLoad, "UTF-8");
					});
					game.getDB('image', 'hp_style2', function(fileToLoad) {
						if (!fileToLoad) return;
						var fileReader = new FileReader();
						fileReader.onload = function(fileLoadedEvent) {
							if (ui.css.hp_stylesheet2) {
								ui.css.hp_stylesheet2.remove();
							}
							ui.css.hp_stylesheet2 = lib.init.sheet(
								'.hp:not(.text):not(.actcount)[data-condition="mid"]>div:not(.lost){background-image:url(' +
								fileLoadedEvent.target.result + ')}');
						};
						fileReader.readAsDataURL(fileToLoad, "UTF-8");
					});
					game.getDB('image', 'hp_style3', function(fileToLoad) {
						if (!fileToLoad) return;
						var fileReader = new FileReader();
						fileReader.onload = function(fileLoadedEvent) {
							if (ui.css.hp_stylesheet3) {
								ui.css.hp_stylesheet3.remove();
							}
							ui.css.hp_stylesheet3 = lib.init.sheet(
								'.hp:not(.text):not(.actcount)[data-condition="low"]>div:not(.lost){background-image:url(' +
								fileLoadedEvent.target.result + ')}');
						};
						fileReader.readAsDataURL(fileToLoad, "UTF-8");
					});
					game.getDB('image', 'hp_style4', function(fileToLoad) {
						if (!fileToLoad) return;
						var fileReader = new FileReader();
						fileReader.onload = function(fileLoadedEvent) {
							if (ui.css.hp_stylesheet4) {
								ui.css.hp_stylesheet4.remove();
							}
							ui.css.hp_stylesheet4 = lib.init.sheet(
								'.hp:not(.text):not(.actcount)>.lost{background-image:url(' +
								fileLoadedEvent.target.result + ')}');
						};
						fileReader.readAsDataURL(fileToLoad, "UTF-8");
					});
				}
				if (lib.config.player_style == 'custom') {
					ui.css.player_stylesheet = lib.init.sheet(
						'#window .player{background-image:none;background-size:100% 100%;}');
					game.getDB('image', 'player_style', function(fileToLoad) {
						if (!fileToLoad) return;
						var fileReader = new FileReader();
						fileReader.onload = function(fileLoadedEvent) {
							if (ui.css.player_stylesheet) {
								ui.css.player_stylesheet.remove();
							}
							ui.css.player_stylesheet = lib.init.sheet(
								'#window .player{background-image:url("' +
								fileLoadedEvent.target.result +
								'");background-size:100% 100%;}');
						};
						fileReader.readAsDataURL(fileToLoad, "UTF-8");
					});
				}
				if (lib.config.border_style == 'custom') {
					game.getDB('image', 'border_style', function(fileToLoad) {
						if (!fileToLoad) return;
						var fileReader = new FileReader();
						fileReader.onload = function(fileLoadedEvent) {
							if (ui.css.border_stylesheet) {
								ui.css.border_stylesheet.remove();
							}
							ui.css.border_stylesheet = lib.init.sheet();
							ui.css.border_stylesheet.sheet.insertRule(
								'#window .player>.framebg{display:block;background-image:url("' +
								fileLoadedEvent.target.result + '")}', 0);
							ui.css.border_stylesheet.sheet.insertRule(
								'.player>.count{z-index: 3 !important;border-radius: 2px !important;text-align: center !important;}',
								0);
						};
						fileReader.readAsDataURL(fileToLoad, "UTF-8");
					});
				}
				if (lib.config.control_style == 'custom') {
					game.getDB('image', 'control_style', function(fileToLoad) {
						if (!fileToLoad) return;
						var fileReader = new FileReader();
						fileReader.onload = function(fileLoadedEvent) {
							if (ui.css.control_stylesheet) {
								ui.css.control_stylesheet.remove();
							}
							ui.css.control_stylesheet = lib.init.sheet(
								'#window .control,.menubutton:not(.active):not(.highlight):not(.red):not(.blue),#window #system>div>div{background-image:url("' +
								fileLoadedEvent.target.result + '")}');
						};
						fileReader.readAsDataURL(fileToLoad, "UTF-8");
					});
				}
				if (lib.config.menu_style == 'custom') {
					game.getDB('image', 'menu_style', function(fileToLoad) {
						if (!fileToLoad) return;
						var fileReader = new FileReader();
						fileReader.onload = function(fileLoadedEvent) {
							if (ui.css.menu_stylesheet) {
								ui.css.menu_stylesheet.remove();
							}
							ui.css.menu_stylesheet = lib.init.sheet(
								'html #window>.dialog.popped,html .menu,html .menubg{background-image:url("' +
								fileLoadedEvent.target.result +
								'");background-size:cover}');
						};
						fileReader.readAsDataURL(fileToLoad, "UTF-8");
					});
				}

				var proceed2 = function() {
					var mode = lib.imported.mode;
					var card = lib.imported.card;
					var character = lib.imported.character;
					var play = lib.imported.play;
					delete window.game;
					var i, j, k;
					for (i in mode[lib.config.mode].element) {
						if (!lib.element[i]) lib.element[i] = [];
						for (j in mode[lib.config.mode].element[i]) {
							if (j == 'init') {
								if (!lib.element[i].inits) lib.element[i].inits = [];
								lib.element[i].inits.push(mode[lib.config.mode].element[i][j]);
							} else {
								lib.element[i][j] = mode[lib.config.mode].element[i][j];
							}
						}
					}
					for (i in mode[lib.config.mode].ai) {
						if (typeof mode[lib.config.mode].ai[i] == 'object') {
							if (ai[i] == undefined) ai[i] = {};
							for (j in mode[lib.config.mode].ai[i]) {
								ai[i][j] = mode[lib.config.mode].ai[i][j];
							}
						} else {
							ai[i] = mode[lib.config.mode].ai[i];
						}
					}
					for (i in mode[lib.config.mode].ui) {
						if (typeof mode[lib.config.mode].ui[i] == 'object') {
							if (ui[i] == undefined) ui[i] = {};
							for (j in mode[lib.config.mode].ui[i]) {
								ui[i][j] = mode[lib.config.mode].ui[i][j];
							}
						} else {
							ui[i] = mode[lib.config.mode].ui[i];
						}
					}
					for (i in mode[lib.config.mode].game) {
						game[i] = mode[lib.config.mode].game[i];
					}
					for (i in mode[lib.config.mode].get) {
						get[i] = mode[lib.config.mode].get[i];
					}
					lib.init.start = mode[lib.config.mode].start;
					lib.init.startBefore = mode[lib.config.mode].startBefore;
					if (game.onwash) {
						lib.onwash.push(game.onwash);
						delete game.onwash;
					}
					if (game.onover) {
						lib.onover.push(game.onover);
						delete game.onover;
					}
					lib.config.banned = lib.config[lib.config.mode + '_banned'] || [];
					lib.config.bannedcards = lib.config[lib.config.mode + '_bannedcards'] || [];

					lib.rank = window.noname_character_rank;
					delete window.noname_character_rank;
					for (i in mode[lib.config.mode]) {
						if (i == 'element') continue;
						if (i == 'game') continue;
						if (i == 'ai') continue;
						if (i == 'ui') continue;
						if (i == 'get') continue;
						if (i == 'config') continue;
						if (i == 'onreinit') continue;
						if (i == 'start') continue;
						if (i == 'startBefore') continue;
						if (lib[i] == undefined) lib[i] = (Array.isArray(mode[lib.config.mode][
							i
						])) ? [] : {};
						for (j in mode[lib.config.mode][i]) {
							lib[i][j] = mode[lib.config.mode][i][j];
						}
					}
					if (typeof mode[lib.config.mode].init == 'function') {
						mode[lib.config.mode].init();
					}

					var connectCharacterPack = [];
					var connectCardPack = [];
					for (i in character) {
						if (character[i].character) {
							lib.characterPack[i] = character[i].character
						}
						for (j in character[i]) {
							if (j == 'mode' || j == 'forbid') continue;
							if (j == 'connect') {
								connectCharacterPack.push(i);
								continue;
							}
							if (j == 'character' && !lib.config.characters.contains(i) && lib.config
								.mode != 'connect') {
								if (lib.config.mode == 'chess' && get.config('chess_mode') ==
									'leader') {
									for (k in character[i][j]) {
										lib.hiddenCharacters.push(k);
									}
								} else if (lib.config.mode != 'boss' || i != 'boss') {
									continue;
								}
							}
							if (Array.isArray(lib[j]) && Array.isArray(character[i][j])) {
								lib[j].addArray(character[i][j]);
								continue;
							}
							for (k in character[i][j]) {
								if (j == 'character') {
									if (!character[i][j][k][4]) {
										character[i][j][k][4] = [];
									}
									if (character[i][j][k][4].contains('boss') ||
										character[i][j][k][4].contains('hiddenboss')) {
										lib.config.forbidai.add(k);
									}
									if (lib.config.forbidai_user && lib.config.forbidai_user
										.contains(k)) {
										lib.config.forbidai.add(k);
									}
									for (var l = 0; l < character[i][j][k][3].length; l++) {
										lib.skilllist.add(character[i][j][k][3][l]);
									}
								}
								if (j == 'skill' && k[0] == '_' && (!lib.config.characters.contains(
										i) || (lib.config.mode == 'connect' && !character[i]
										.connect))) {
									continue;
								}
								if (j == 'translate' && k == i) {
									lib[j][k + '_character_config'] = character[i][j][k];
								} else {
									if (lib[j][k] == undefined) {
										if (j == 'skill' && lib.config.mode == 'connect' && !
											character[i].connect) {
											lib[j][k] = {
												nopop: character[i][j][k].nopop,
												derivation: character[i][j][k].derivation
											};
										} else {
											lib[j][k] = character[i][j][k];
										}
										if (j == 'card' && lib[j][k].derivation) {
											if (!lib.cardPack.mode_derivation) {
												lib.cardPack.mode_derivation = [k];
											} else {
												lib.cardPack.mode_derivation.push(k);
											}
										}
									} else if (Array.isArray(lib[j][k]) && Array.isArray(character[
											i][j][k])) {
										lib[j][k].addArray(character[i][j][k]);
									} else {
										console.log('dublicate ' + j + ' in character ' + i +
											':\n' + k + '\n' + ': ' + lib[j][k] + '\n' +
											character[i][j][k]);
									}
								}
							}
						}
					}
					var connect_avatar_list = [];
					for (var i in lib.character) {
						connect_avatar_list.push(i);
					}
					connect_avatar_list.sort(lib.sort.capt);
					for (var i = 0; i < connect_avatar_list.length; i++) {
						var ia = connect_avatar_list[i];
						lib.mode.connect.config.connect_avatar.item[ia] = lib.translate[ia];
					}
					if (lib.config.mode != 'connect') {
						var pilecfg = lib.config.customcardpile[get.config('cardpilename') ||
							'当前牌堆'];
						if (pilecfg) {
							lib.config.bannedpile = get.copy(pilecfg[0] || {});
							lib.config.addedpile = get.copy(pilecfg[1] || {});
						} else {
							lib.config.bannedpile = {};
							lib.config.addedpile = {};
						}
					} else {
						lib.cardPackList = {};
					}
					for (i in card) {
						lib.cardPack[i] = [];
						if (card[i].card) {
							for (var j in card[i].card) {
								if (!card[i].card[j].hidden && card[i].translate[j + '_info']) {
									lib.cardPack[i].push(j);
								}
							}
						}
						for (j in card[i]) {
							if (j == 'mode' || j == 'forbid') continue;
							if (j == 'connect') {
								connectCardPack.push(i);
								continue;
							}
							if (j == 'list') {
								if (lib.config.mode == 'connect') {
									lib.cardPackList[i] = card[i][j];
								} else {
									if (lib.config.cards.contains(i)) {
										var pile;
										if (typeof card[i][j] == 'function') {
											pile = card[i][j]();
										} else {
											pile = card[i][j];
										}
										lib.cardPile[i] = pile.slice(0);
										if (lib.config.bannedpile[i]) {
											for (var k = 0; k < lib.config.bannedpile[i]
												.length; k++) {
												pile[lib.config.bannedpile[i][k]] = null;
											}
										}
										for (var k = 0; k < pile.length; k++) {
											if (!pile[k]) {
												pile.splice(k--, 1);
											}
										}
										if (lib.config.addedpile[i]) {
											for (var k = 0; k < lib.config.addedpile[i]
												.length; k++) {
												pile.push(lib.config.addedpile[i][k]);
											}
										}
										lib.card.list = lib.card.list.concat(pile);
									}
								}
							} else {
								for (k in card[i][j]) {
									if (j == 'skill' && k[0] == '_' && (!lib.config.cards.contains(
											i) || (lib.config.mode == 'connect' && !card[i]
											.connect))) {
										continue;
									}
									if (j == 'translate' && k == i) {
										lib[j][k + '_card_config'] = card[i][j][k];
									} else {
										if (lib[j][k] == undefined) {
											if (j == 'skill' && lib.config.mode == 'connect' && !
												card[i].connect) {
												lib[j][k] = {
													nopop: card[i][j][k].nopop,
													derivation: card[i][j][k].derivation
												};
											} else {
												lib[j][k] = card[i][j][k];
											}
										} else console.log('dublicate ' + j + ' in card ' + i +
											':\n' + k + '\n' + lib[j][k] + '\n' + card[i][j][k]);
										if (j == 'card' && lib[j][k].derivation) {
											if (!lib.cardPack.mode_derivation) {
												lib.cardPack.mode_derivation = [k];
											} else {
												lib.cardPack.mode_derivation.push(k);
											}
										}
									}
								}
							}
						}
					}
					if (lib.cardPack.mode_derivation) {
						for (var i = 0; i < lib.cardPack.mode_derivation.length; i++) {
							if (typeof lib.card[lib.cardPack.mode_derivation[i]].derivation ==
								'string' && !lib.character[lib.card[lib.cardPack.mode_derivation[i]]
									.derivation]) {
								lib.cardPack.mode_derivation.splice(i--, 1);
							} else if (typeof lib.card[lib.cardPack.mode_derivation[i]]
								.derivationpack == 'string' && !lib.config.cards.contains(lib.card[
									lib.cardPack.mode_derivation[i]].derivationpack)) {
								lib.cardPack.mode_derivation.splice(i--, 1);
							}
						}
						if (lib.cardPack.mode_derivation.length == 0) {
							delete lib.cardPack.mode_derivation;
						}
					}
					if (lib.config.mode != 'connect') {
						for (i in play) {
							if (lib.config.hiddenPlayPack.contains(i)) continue;
							if (play[i].forbid && play[i].forbid.contains(lib.config.mode))
								continue;
							if (play[i].mode && play[i].mode.contains(lib.config.mode) == false)
								continue;
							for (j in play[i].element) {
								if (!lib.element[j]) lib.element[j] = [];
								for (k in play[i].element[j]) {
									if (k == 'init') {
										if (!lib.element[j].inits) lib.element[j].inits = [];
										lib.element[j].inits.push(play[i].element[j][k]);
									} else {
										lib.element[j][k] = play[i].element[j][k];
									}
								}
							}
							for (j in play[i].ui) {
								if (typeof play[i].ui[j] == 'object') {
									if (ui[j] == undefined) ui[j] = {};
									for (k in play[i].ui[j]) {
										ui[j][k] = play[i].ui[j][k];
									}
								} else {
									ui[j] = play[i].ui[j];
								}
							}
							for (j in play[i].game) {
								game[j] = play[i].game[j];
							}
							for (j in play[i].get) {
								get[j] = play[i].get[j];
							}
							for (j in play[i]) {
								if (j == 'mode' || j == 'forbid' || j == 'init' || j == 'element' ||
									j == 'game' || j == 'get' || j == 'ui' || j == 'arenaReady')
									continue;
								for (k in play[i][j]) {
									if (j == 'translate' && k == i) {
										// lib[j][k+'_play_config']=play[i][j][k];
									} else {
										if (lib[j][k] != undefined) {
											console.log('dublicate ' + j + ' in play ' + i + ':\n' +
												k + '\n' + ': ' + lib[j][k] + '\n' + play[i][j][
													k
												]);
										}
										lib[j][k] = play[i][j][k];
									}
								}
							}
							if (typeof play[i].init == 'function') play[i].init();
							if (typeof play[i].arenaReady == 'function') lib.arenaReady.push(play[i]
								.arenaReady);
						}
					}

					lib.connectCharacterPack = [];
					lib.connectCardPack = [];
					for (var i = 0; i < lib.config.all.characters.length; i++) {
						var packname = lib.config.all.characters[i];
						if (connectCharacterPack.contains(packname)) {
							lib.connectCharacterPack.push(packname)
						}
					}
					for (var i = 0; i < lib.config.all.cards.length; i++) {
						var packname = lib.config.all.cards[i];
						if (connectCardPack.contains(packname)) {
							lib.connectCardPack.push(packname)
						}
					}
					if (lib.config.mode != 'connect') {
						for (i = 0; i < lib.card.list.length; i++) {
							if (lib.card.list[i][2] == 'huosha') {
								lib.card.list[i] = lib.card.list[i].slice(0);
								lib.card.list[i][2] = 'sha';
								lib.card.list[i][3] = 'fire';
							} else if (lib.card.list[i][2] == 'leisha') {
								lib.card.list[i] = lib.card.list[i].slice(0);
								lib.card.list[i][2] = 'sha';
								lib.card.list[i][3] = 'thunder';
							}
							if (!lib.card[lib.card.list[i][2]]) {
								lib.card.list.splice(i, 1);
								i--;
							} else if (lib.card[lib.card.list[i][2]].mode &&
								lib.card[lib.card.list[i][2]].mode.contains(lib.config.mode) ==
								false) {
								lib.card.list.splice(i, 1);
								i--;
							}
						}
					}

					if (lib.config.mode == 'connect') {
						_status.connectMode = true;
					}
					if (window.isNonameServer) {
						lib.cheat.i();
					} else if (lib.config.dev && (!_status.connectMode || lib.config.debug)) {
						lib.cheat.i();
					}
					lib.config.sort_card = get.sortCard(lib.config.sort);
					delete lib.imported.character;
					delete lib.imported.card;
					delete lib.imported.mode;
					delete lib.imported.play;
					for (var i in lib.init) {
						if (i.indexOf('setMode_') == 0) {
							delete lib.init[i];
						}
					}

					var loadExtensionCallback = function() {
						delete lib.extensions;

						if (lib.init.startBefore) {
							lib.init.startBefore();
							delete lib.init.startBefore;
						}
						ui.create.arena();
						game.createEvent('game', false).setContent(lib.init.start);
						if (lib.mode[lib.config.mode] && lib.mode[lib.config.mode]
							.fromextension) {
							var startstr = mode[lib.config.mode].start.toString();
							if (startstr.indexOf('onfree') == -1) {
								setTimeout(lib.init.onfree, 500);
							}
						}
						delete lib.init.start;
						game.loop();
						app.emit('createArenaAfter');
					};
					if (!_status.connectMode) {
						var loadNextExtension = function() {
							var obj = lib.extensions.shift();
							if (obj) {
								try {
									_status.extension = obj[0];
									_status.evaluatingExtension = obj[3];
									if (obj[4]) {
										if (obj[4].character) {
											for (var j in obj[4].character.character) {
												game.addCharacterPack(get.copy(obj[4]
													.character));
												break;
											}
										}
										if (obj[4].card) {
											for (var j in obj[4].card.card) {
												game.addCardPack(get.copy(obj[4].card));
												break;
											}
										}
										if (obj[4].skill) {
											for (var j in obj[4].skill.skill) {
												game.addSkill(j, obj[4].skill.skill[j],
													obj[4].skill.translate[j], obj[4].skill
													.translate[j + '_info']);
											}
										}
									}
									var func = obj[1](obj[2], obj[4]);
									if (typeof func === 'function') {
										func(loadNextExtension);
									} else {
										loadNextExtension();
									}
								} catch (e) {
									console.log(e);
									loadNextExtension();
								}
							} else {
								delete _status.extension;
								delete _status.evaluatingExtension;
								loadExtensionCallback();
							}
						};
						loadNextExtension();
					} else {
						loadExtensionCallback();
					}
				}
				var proceed = function() {
					if (!lib.db) {
						try {
							lib.storage = JSON.parse(localStorage.getItem(lib.configprefix + lib
								.config.mode));
							if (typeof lib.storage != 'object') throw ('err');
							if (lib.storage == null) throw ('err');
						} catch (err) {
							lib.storage = {};
							localStorage.setItem(lib.configprefix + lib.config.mode, "{}");
						}
						proceed2();
					} else {
						game.getDB('data', lib.config.mode, function(obj) {
							lib.storage = obj || {};
							proceed2();
						});
					}
				};
				if (!lib.imported.mode || !lib.imported.mode[lib.config.mode]) {
					window.inSplash = true;
					clearTimeout(window.resetGameTimeout);
					delete window.resetGameTimeout;
					var clickedNode = false;
					var clickNode = function() {
						if (clickedNode) return;
						this.classList.add('clicked');
						clickedNode = true;
						lib.config.mode = this.link;
						game.saveConfig('mode', this.link);
						if (game.layout != 'mobile' && lib.layoutfixed.indexOf(lib.config.mode) !==
							-1) {
							game.layout = 'mobile';
							ui.css.layout.href = lib.assetURL + 'layout/' + game.layout +
								'/layout.css';
						} else if (game.layout == 'mobile' && lib.config.layout != 'mobile' && lib
							.layoutfixed.indexOf(lib.config.mode) === -1) {
							game.layout = lib.config.layout;
							if (game.layout == 'default') {
								ui.css.layout.href = '';
							} else {
								ui.css.layout.href = lib.assetURL + 'layout/' + game.layout +
									'/layout.css';
							}
						}
						splash.delete(1000);
						delete window.inSplash;
						window.resetGameTimeout = setTimeout(lib.init.reset, 5000);

						this.listenTransition(function() {
							lib.init.js(lib.assetURL + 'mode', lib.config.mode, proceed);
						}, 500);
					}
					var downNode = function() {
						this.classList.add('glow');
					}
					var upNode = function() {
						this.classList.remove('glow');
					}
					var splash = ui.create.div('#splash', document.body);
					if (lib.config.touchscreen) {
						splash.classList.add('touch');
						lib.setScroll(splash);
					}
					if (lib.config.player_border != 'wide') {
						splash.classList.add('slim');
					}
					splash.dataset.radius_size = lib.config.radius_size;
					for (var i = 0; i < lib.config.all.mode.length; i++) {
						var node = ui.create.div('.hidden', splash, clickNode);
						node.link = lib.config.all.mode[i];
						ui.create.div(node, '.splashtext', get.verticalStr(get.translation(lib.config
							.all.mode[i])));
						if (lib.config.all.stockmode.indexOf(lib.config.all.mode[i]) != -1) {
							ui.create.div(node, '.avatar').setBackgroundImage('image/splash/' + lib
								.config.all.mode[i] + '.jpg');
						} else {
							var avatarnode = ui.create.div(node, '.avatar');
							var avatarbg = lib.mode[lib.config.all.mode[i]].splash;
							if (avatarbg.indexOf('ext:') == 0) {
								avatarnode.setBackgroundImage(avatarbg.replace(/ext:/, 'extension/'));
							} else {
								avatarnode.setBackgroundDB(avatarbg);
							}
						}
						if (!lib.config.touchscreen) {
							node.addEventListener('mousedown', downNode);
							node.addEventListener('mouseup', upNode);
							node.addEventListener('mouseleave', upNode);
						}
						setTimeout((function(node) {
							return function() {
								node.show();
							}
						}(node)), i * 100);
					}
					if (lib.config.mousewheel) {
						splash.onmousewheel = ui.click.mousewheel;
					}
				} else {
					proceed();
				}
				localStorage.removeItem(lib.configprefix + 'directstart');
				delete lib.init.init;
			};

			if (lib.config.dev) {
				window.app = app;
			}
		},
		config: {
			jindutiao: {
				init: false,
				intro: "自己回合内显示进度条",
				name: "进度条"
			},
			jindutiaoYangshi: {
				name: "进度条样式",
				init: "1",
				intro: "切换进度条样式，切换后重启生效",
				item: {
					"1": "手杀进度条",
					"2": "十周年PC端进度条",
					"3": "十周年客户端进度条",
				},
			},
			JDTS: {
				init: false,
				intro: "自己回合内显示对应阶段图片提示",
				name: "阶段提示"
			},
			JDTSYangshi: {
				name: "阶段提示样式",
				init: "1",
				intro: "切换阶段提示样式",
				item: {
					"1": "手杀阶段提示",
					"2": "十周年阶段提示",
				},
			},
			GTBB: {
				init: false,
				intro: "开启后，顶部会出现滚动播报栏。",
				name: "狗托播报"
			},
			yangShi: {
				name: '界面布局',
				init: 'on',
				intro: '切换手杀UI界面样式，切换后重启生效',
				item: {
					on: '手杀样式',
					off: '十周年样式',
				},
			},
			import: {
				name: '',
				clear: true,
			},
		},
		editable: false,
	};
});
