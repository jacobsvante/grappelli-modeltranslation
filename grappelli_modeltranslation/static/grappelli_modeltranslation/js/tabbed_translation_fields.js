(function ($) {
    $(function() {
        $.modeltranslation = (function() {
            var mt = {
                languages: []
            };

            mt.options = {
                fieldTypes: 'input[type=text], input[type=file], textarea',
                className: $('#grp-content-container').find('.mt').length ? '.mt' : '.modeltranslation'
            };

            mt.init = function(opts) {
                var self = this,
                    tabs;
                self.options = $.extend(this.options, opts);

                if ($('body').hasClass('grp-change-form')) {
                    var group,
                        fields = self._getTranslatedFields();

                    // Discover languages
                    $.each(fields, function (name, languages) {
                        $.each(languages, function (lang, el) {
                            if ($.inArray(lang, mt.languages) < 0) {
                                mt.languages.push(lang);
                            }
                        });
                    });

                    tabs = self._createInlineTabs();

                    // self._createMainSwitch(tabs, fields);

                    // Adding new inlines, rebinding events
                    $('.grp-add-handler').bind('click' + mt.options.className, function(){
                        group = $(self).parents('.group');
                        window.setTimeout(function(){
                            self._createInlineTabs(group.find('.grp-items > .grp-module:last').prev());
                        }, 200);
                    });
                }
                else if ($('body').hasClass('grp-change-list')) {
                    tabs = this._createChangelistTabs();
                }
            };

            // Inserts a select box to select language globally
            mt._createMainSwitch = function(tabs, fields) {
                var self = this,
                    grouped_translations = fields,
                    select = $('<select>');

                $.each(mt.languages, function (i, language) {
                    select.append($('<option value="' + i + '">' + language + '</option>'));
                });
                select.change(function (e) {
                    $.each(tabs, function (i, tab) {
                        tab.tabs('select', parseInt(select.val(), 10));
                    });
                });
                $('#grp-content h1').append('&nbsp;').append(select);
            };

            // Create change list tabbing
            mt._createChangelistTabs = function() {
                var translations = this._getTranslatedFields(),
                    tabs = [],
                    container = $('<div class="mt-switcher-container ui-tabs ui-widget ui-widget-content ui-corner-all"></div>').css('margin-bottom', 6);

                tabs = $('<ul class="mt-switcher ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"></ul>').appendTo(container);

                $.each(this.options.languages, function(i, lang) {
                    $('<li class="required ui-state-default ui-corner-top"><a></a></li>')
                        .css({float: 'left'}).appendTo(tabs)
                        .find('a').bind('click' + mt.options.className, function(){
                            var l = $(this).attr('href').replace('#', '');
                            $('.translated-field:not(.translation-'+ l +')').hide();
                            $('.translation-'+ l).show();
                            $(this).parent().addClass('ui-tabs-selected').siblings().removeClass('ui-tabs-selected');
                        }).attr('href', '#'+lang).text(lang);
                });

                // Insert toolbar only if there is translated fields
                if (tabs.find('li').length) {
                    // Tweak table header
                    $('.changelist-results').find('thead th').each(function(i, t){
                        var th = $(t),
                            label = $.trim(th.find('a').text());
                        if (/\[\w{2}\]/.test(label)) {
                            var match = label.match(/\[(\w{2})\]/);
                            if (match.length > 1) {
                                th.addClass('translated-field translation-'+ match[1])
                                    .find('a').text(label.replace(/\ \[.+\]/, ''));
                            }
                        }
                    });

                    // Tweak rows
                    var fields = $(mt.options.className)
                        .filter(this.options.fieldTypes).each(function(i, f){
                            var field = $(f);
                            $(f).parent().addClass('translated-field translation-'+ $(f).attr('id').slice(-2));
                        });

                    // hide innactive translations
                    $('.translated-field:not(.translation-'+ this.options.languages[0] +')').hide();

                    tabs.find('li:first').addClass('ui-tabs-selected');
                    return container.insertBefore('#changelist-form');
                }
            };

            mt._createTabularInlineTabs = function($parent) {
                var self = this,
                    container,
                    tabs_container,
                    tabs_list,
                    default_lang,
                    translations = self._getTranslatedFields($parent),
                    tabs = [];

                if ($parent) {
                    container = $($parent).find('.group.tabular');
                }
                else {
                    container = $('.group.tabular');
                }
                if (container.length) {
                    tabs_container = $('<div class="mt-switcher-container"></div>');
                    tabs_list = $('<ul class="mt-switcher"></ul>').appendTo(tabs_container);
                    // can't use real tabs, so we fake them
                    var tabs_shim = $('<div style="display:none;" />').appendTo(tabs_container);

                    tabs_container.insertAfter(container.find('> .tools'));
                    //tabs_container.appendTo(container.find('.thead'));

                    $.each(mt.languages, function (i, lang) {
                        if (i === 0) {
                            default_lang = lang;
                        }
                        var id = 'tab_'+ container.attr('id').replace('set-group', lang);
                        $('<li><a href="#' + id + '">' + lang + '</a></li>')
                            .appendTo(tabs_list)
                            .find('a').bind('click', function() {
                                var id = $(this).attr('href').replace('#', '');
                                $.each(mt.languages, function (i, lang) {
                                    var el = $('.'+ id.slice(0, -2) + lang);
                                    if (id.slice(-2) != lang) {
                                        el.hide();
                                    }
                                    else {
                                        el.show();
                                    }
                                });
                                return false;
                            });
                        $('<div id="'+ id +'" />').appendTo(tabs_shim);
                    });

                    container.find('.thead .th').each(function(i, th){
                        th = $(th);
                        var classes = th.attr('class').split(' ');
                        // Remove language and brackets from field label, they are
                        // displayed in the tab already.
                        if (th.html()) {
                            th.html(th.html().replace(/\ \[.+\]/, ''));
                        }
                        $.each(classes, function(x, classname){
                            if ($.inArray(classname.slice(-2), mt.languages) > -1 && classname.slice(-3, -2) == '-') {
                                var c = "tab_"+ container.attr('id').replace('set-group', classname.slice(-2));
                                th.addClass(c);
                                if (classname.slice(-2) != default_lang) {
                                    th.hide();
                                }
                            }
                        });

                    });

                    tabs_container.tabs();
                    tabs.push(tabs_container);
                    $.each(translations, function (name, languages) {
                        $.each(languages, function(lang, el){
                            var p = $(el).parent();
                            var classname = container.attr('id').replace('set-group', lang);
                            if (p.hasClass('td')) {
                                p.addClass('tab_'+classname);
                            }
                            if (lang != default_lang) {
                                p.hide();
                            }
                        });

                    });
                    return tabs;
                }
            };

            // Create change form tabbing
            mt._createInlineTabs = function($parent) {
                var tabs = [],
                    translations = this._getTranslatedFields($parent);
                $.each(translations, function (name, languages) {
                    var tabs_container = $('<div class="mt-switcher-container"></div>'),
                      tabs_list = $('<ul class="mt-switcher"></ul>'),
                      insertion_point;
                    tabs_container.append(tabs_list);
                    $.each(languages, function (lang, el) {
                        if (!$(el).parent().hasClass('.grp-td')) {
                            var container = $(el).closest('.grp-row'),
                                label = $('label', container),
                                field_label = container.find('label'),
                                id = 'tab_' + [name, lang].join('_'),
                                panel,
                                tab;
                            // Remove language and brackets from field label, they are
                            // displayed in the tab already.
                            if (field_label.html()) {
                                field_label.html(field_label.html().replace(/\ \[.+\]/, ''));
                            }
                            if (!insertion_point) {
                                insertion_point = {
                                    'insert': container.prev().length ? 'after' : container.next().length ? 'prepend' : 'append',
                                    'el': container.prev().length ? container.prev() : container.parent()
                                };
                            }
                            container.find('script').remove();
                            panel = $('<div id="' + id + '"></div>').append(container);
                            tab = $('<li' + (label.hasClass('required') ? ' class="required"' : '') + '><a href="#' + id + '">' + lang + '</a></li>');
                            tabs_list.append(tab);
                            tabs_container.append(panel);
                        }
                    });
                    insertion_point.el[insertion_point.insert](tabs_container);
                    tabs_container.tabs();
                    tabs.push(tabs_container);
                });
                this._createTabularInlineTabs($parent);
                return tabs;
            };

            mt._getTranslatedFields = function($parent) {
                /** Returns a grouped set of all text based model translation fields.
                 * The returned datastructure will look something like this:
                 * {
                 *   'title': {
                 *     'en': HTMLInputElement,
                 *     'fr': HTMLInputElement
                 *   },
                 *   'body': {
                 *     'en': HTMLTextAreaElement,
                 *     'fr': HTMLTextAreaElement
                 *   }
                 * }
                 */
                var fields,
                    out = {},
                    langs = [];
                if ($parent) {
                    fields = $($parent).find(mt.options.className).filter(this.options.fieldTypes);
                }
                else {
                    fields = $(mt.options.className).filter(this.options.fieldTypes);
                }
                //onAfterAdded

                fields.each(function (i, el) {
                    var name = $(el).attr('name').split('_'),
                        lang = [];
                    lang[0] = name.pop();
                    if (name[name.length - 1].length == 2) {
                        lang.unshift(name.pop());
                        lang = [lang.join('-')];
                    }
                    name = name.join('_');
                    langs.push(lang);
                    if (!/__prefix__/.test(name)) {
                        if (!out[name]) {
                            out[name] = {};
                        }
                        out[name][lang] = el;
                    }
                });
                this.options.languages = $.unique(langs.sort());
                return out;
            };

            return mt;
        }());

        $.modeltranslation.init();
    });
}(window.grp.jQuery));
