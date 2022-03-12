app.import(function(lib, game, ui, get, ai, _status, app) {
	var plugin = {
		name: 'character',
		filter: function() {
			return !['chess', 'tafang', 'stone', 'connect'].contains(get.mode());
		},
		content: function (next) {
			app.waitAllFunction([
				function(next) {
					next();
				},
				function(next) {
				/*-----------------分割线-----------------*/
				// 判断武将弹框的代码
				if (lib.config.extension_手杀ui_yangShi == 'on') {
				// 手杀样式武将弹框
					lib.init.css(lib.assetURL + 'extension/' + app.name + '/' + plugin.name, 'main1', next);
				} else{
				// 十周年样式武将弹框框
					lib.init.css(lib.assetURL + 'extension/' + app.name + '/' + plugin.name, 'main2', next);
				}
				/*-----------------分割线-----------------*/
				},
			], next);
		},
		precontent: function() {
			app.reWriteFunction(lib, {
				setIntro: [function (args, node) {
					if (get.itemtype(node) === 'player') {
						if (lib.config.touchscreen) {
							lib.setLongPress(node, plugin.click.playerIntro);
						} else {
							if (lib.config.right_info) {
								node.oncontextmenu = plugin.click.playerIntro;
							}
						}
						return node;
					}
				}],
			});
		},
		
		click: {
			identity: function(e) {
				e.stopPropagation();
				var player = this.parentNode;
				if (!game.getIdentityList) return;
				if (player.node.guessDialog) {
					player.node.guessDialog.classList.toggle('hidden');
				} else {
					var list = game.getIdentityList(player);
					if (!list) return;
					var guessDialog = ui.create.div('.guessDialog', player);
					var container = ui.create.div(guessDialog);
					lib.setScroll(guessDialog);
					player.node.guessDialog = guessDialog;
				}
			},
			playerIntro: function(e) {
				e.stopPropagation();

				if (plugin.playerDialog) {
					return plugin.playerDialog.show(this);
				}

				var container = ui.create.div('.popup-container.hidden', ui.window, function (e) {
					if (e.target === container) {
						container.hide();
						game.resume2();
					}
				});
				var dialog = ui.create.div('.character-dialog.popped', container);
				var leftPane = ui.create.div('.left', dialog);
				var rightPane = ui.create.div('.right', dialog);

				var createButton = function(name, parent) {
					if (!name) return;
					if (!lib.character[name]) return;
					var button = ui.create.button(name, 'character', parent, true);
				};

				container.show = function(player) {
					var name = player.name1 || player.name;
					var name2 = player.name2;
					if (player.classList.contains('unseen') && player !== game.me) {
						name = 'unknown';
					}
					if (player.classList.contains('unseen2') && player !== game.me) {
						name2 = 'unknown';
					}

					leftPane.innerHTML = '<div></div>';
					createButton(name, leftPane.firstChild);
					createButton(name2, leftPane.firstChild);
					if (name && name2) {
						dialog.classList.remove('single');
					} else {
						dialog.classList.add('single');
					}

					rightPane.innerHTML = '<div></div>';
					lib.setScroll(rightPane.firstChild);
					var eSkills = player.getCards('e');
					var oSkills = app.get.playerSkills(player, false, false);
					var judges = player.getCards('j');

					if (oSkills.length) {
						ui.create.div('.xcaption', '武将技能', rightPane.firstChild);
						oSkills.forEach(function(name) {
							var obj = app.get.skillInfo(name, player);
							if(obj.nameSimple){
							ui.create.div('.xskill', '<div data-color>【' + obj.nameSimple + '】</div>' +
								'<div>' + obj.translation + '</div>', rightPane.firstChild);
						}
						});
					}

					if (judges.length) {
						ui.create.div('.xcaption', '判定区域', rightPane.firstChild);
						judges.forEach(function(card) {
							ui.create.div('.xskill', '<div data-color>【' + get.translation(card.name) + '】</div><div>' + get.translation((card.viewAs || card.name) + '_info') + '</div>', rightPane.firstChild);
						});
					}

					if (eSkills.length) {
						ui.create.div('.xcaption', '装备区域', rightPane.firstChild);
						eSkills.forEach(function (item) {
							ui.create.div('.xskill', '<div data-color>【' + get.translation(item.name) + '】</div><div>' + get.translation(item.name + '_info') + '</div>', rightPane.firstChild);
						});
					}
					container.classList.remove('hidden');
					game.pause2();
				};
				plugin.characterDialog = container;
				container.show(this);
			},
		},
		
	};
	return plugin;
});
