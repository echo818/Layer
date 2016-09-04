;(function($){
	var Layer = function(config){
		this.opts = !!config ? $.extend({},defaults,config) : false;
		this.objs = {
			body: $('body'),
			mask: $('<div class="mask">'),
			layer: $('<div class="layer">'),
			title: $('<div class="title">'),
			main: $('<div class="main">'),
			tabs: $('<div class="tabs">'),
			panel: $('<div class="panel">'),
			btns: $('<div class="btns">'),
		};
		this.arr = {
			btns: ['ensure','cancel'],
		};
		this.init();
	};

	Layer.prototype = {
		init: function(){
			var _this = this,
				opts = this.opts,
				objs = this.objs,
				arr = this.arr;
			if(!opts){
				objs.title.html('对话框').appendTo(objs.layer);
				objs.main.html('提示信息').appendTo(objs.layer);
				objs.btns.html('<button class="cancel">关闭</button>').on('click',function(){
					_this.close(mask);
				}).appendTo(objs.layer);
			}else{
				(!!opts.title && typeof opts.title == 'string') ? objs.title.html(opts.title).appendTo(objs.layer) : objs.title.html('对话框').appendTo(objs.layer);
				if(!!opts.button && $.isArray(opts.button)){
					for (var i = 0, len = opts.button.length; i < len; i++) {
						var btn = $('<button>'),botton = opts.button[i];
						if(typeof botton == 'string'){
							btn.html(botton);
						}else if(!!botton && typeof botton == 'object'){
							!!botton.text ? btn.html(botton.text) : btn.html('按钮');
							(!!botton.type && $.inArray(botton.type,arr.btns > -1)) && btn.addClass(botton.type);
							if(!!botton.callback && $.isFunction(botton.callback)){
								btn.on('click',{botton:botton},function(e){
									e.data.botton.callback();
									(!!e.data.botton.isClose && typeof e.data.botton.isClose == 'boolean') && _this.close(mask);
								});
							}
						}else{
							btn.html('按钮');
						}
						btn.appendTo(objs.btns);
					}
					objs.btns.appendTo(objs.layer);
				}

				var content = opts.content;
				if(!!content){
					if(typeof content == 'object' && !$.isArray(content)){
						var forms = content.form;
						if(!!forms){
							var form = $('<form>');
							if(typeof forms == 'object' && !$.isArray(forms)){
								var  item = $('<div class="item">');
								(!!forms.label && typeof forms.label == 'string') && $('<label>').html(forms.label).appendTo(item);
								(!!forms.type && typeof forms.type == 'string') && $('<input>').attr('placeholder',forms.placeholder).appendTo(item);
								form.append(item);
							}else if($.isArray(forms)){
								for (var i = 0, len = forms.length; i < len; i++) {
									var  item = $('<div class="item">'), fom = forms[i];
									(!!fom.label && typeof fom.label == 'string') && $('<label>').html(fom.label).appendTo(item);
									(!!fom.type && typeof fom.type == 'string') && $('<input>').attr('placeholder',fom.placeholder).appendTo(item);
									form.append(item);
								}
							}

							objs.main.append(form);
							objs.layer.append(objs.main);
						}
					}
				}else if($.isArray(content)){
					
				}
			}
			$.isNumeric(opts.width) ? objs.layer.css('width',opts.width) : objs.layer.css('width',300);
			$.isNumeric(opts.height) ? objs.layer.css('height',opts.height) : objs.layer.css('height',160);
			var mask = objs.mask.append(objs.layer);
			objs.body.append(objs.mask);
		},
		close: function(mask){
			mask.remove();
		}
	};

	var defaults = {
		width: 'auto',
		height: 'auto',
		title: null,
		content: null,
		button: null,
		maskOpacity: null,
		style: null,
		delay: null,
		isClose: false
	};

	$.layer = function(config){
		return new Layer(config);
	};
})(jQuery)