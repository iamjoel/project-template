
    var $ztree = {
        //对象数据集
        objData: {},
        ////引用对象
        //scope: {},
        ////状态对象
        //bool: {},
        //配置对象
        setting: {},
        //初始化
        init: function (obj, callback) {
            setTimeout(function () {

                //初始化赋值
                $ztree.objData[obj.id] = obj;

                if (obj.setting != undefined) {
                    $ztree.setting = obj.setting;
                }

                //设置选择框是否显示与单选多选
                $ztree.setting.check.enable = obj.encheck || false ? true : false;
                if ($ztree.setting.check.enable) {
                    $ztree.setting.check.chkStyle = obj.chkStyle == "radio" ? "radio" : "checkbox";
                }
                //设置视图显示
                $ztree.setting.view.selectedMulti = obj.selectedMulti == undefined ? true : obj.selectedMulti || false ? true : false;
                $ztree.setting.view.showLine = obj.showLine == undefined ? true : obj.showLine || false ? true : false;
                $ztree.setting.view.showIcon = obj.showIcon == undefined ? true : obj.showIcon || false ? true : false;
                $ztree.setting.view.showTitle = obj.showTitle == undefined ? true : obj.showTitle || false ? true : false;

                if (obj.click != undefined) {
                    $ztree.setting.callback.onClick = obj.click;
                }
                if (obj.check != undefined) {
                    $ztree.setting.callback.onCheck = obj.check;
                }
                if (obj.dbClick != undefined) {
                    $ztree.setting.callback.onDblClick = obj.dbClick;
                }
                if (obj.mousedown != undefined) {
                    $ztree.setting.callback.onMouseDown = obj.mousedown;
                }
                if (obj.mouseup != undefined) {
                    $ztree.setting.callback.onMouseUp = obj.mouseup;
                }

                //这样写有问题，如果选中后再选别的话会显示未选中的样式
                ////这里是内置的方法(暂时先这么写吧)
                //$ztree.setting.callback.beforeCheck = function (treeId, treeNode) {
                //    if (treeNode.checked) {
                //        $('#' + treeNode.tId + ' a').removeClass("curSelectedNode");//如果已经选中则取消
                //    }
                //    else {
                //        $('#' + treeNode.tId + ' a').addClass("curSelectedNode");
                //    }
                //    return true;
                //};

                //真正初始化
                var treeObj = $("#" + obj.id);//得到对象
                var tree = $.fn.zTree.init(treeObj, $ztree.setting, obj.data);

                //循环找已选中节点
                if (obj.selected != undefined && obj.selected.length > 0) {
                    $.each(obj.selected || [], function (j, m) {
                        var node = tree.getNodeByParam("id", m);
                        if (node) {
                            tree.checkNode(node, true, true);
                        }
                    });
                }
                //展开所有节点
                if (obj.isExpandAll != undefined) {
                    tree.expandAll(obj.isExpandAll);
                }
                //循环找需要展开的节点
                if (obj.expand != undefined && obj.expand.length > 0) {
                    $.each(obj.expand || [], function (j, m) {
                        var node = tree.getNodeByParam("id", m);
                        if (node) {
                            tree.expandNode(node, true);
                        }
                    });
                }

                //回调
                callback ? callback() : null;
            }, 0);
        },


        //配置
        setting: {
            check: {
                //autoCheckTrigger: true,//设置自动关联勾选时是否触发 beforeCheck / onCheck 事件回调函数。[setting.check.enable = true 且 setting.check.chkStyle = "checkbox" 时生效]  默认值: false
                ////1、如果设置 setting.check.chkboxType = { "Y": "", "N": "" }，将不会有任何自动关联勾选的操作。
                ////2、如果开启触发，对于节点较多的树将会影响性能，因为所有被联动勾选的操作都会触发事件回调函数，请根据需要决定是否使用此功能。
                //chkboxType: { "Y": "s", "N": "ps" },//勾选 checkbox 对于父子节点的关联关系。[setting.check.enable = true 且 setting.check.chkStyle = "checkbox" 时生效]   默认值：{ "Y": "ps", "N": "ps" }
                chkStyle: "radio",//勾选框类型(checkbox 或 radio）[setting.check.enable = true 时生效]   默认值："checkbox"
                //nocheckInherit: true,//当父节点设置 nocheck = true 时，设置子节点是否自动继承 nocheck = true 。[setting.check.enable = true 时生效]  默认值: false
                ////1、只使用于初始化节点时，便于批量操作。 对于已存在的节点请利用 updateNode 方法单个节点设置。
                //chkDisabledInherit: true,//当父节点设置 chkDisabled = true 时，设置子节点是否自动继承 chkDisabled = true 。[setting.check.enable = true 时生效]   默认值: false
                ////1、只使用于初始化节点时，便于批量操作。 对于已存在的节点请利用 setChkDisabled 方法单个节点设置。
                //radioType: "all",//radio 的分组范围。[setting.check.enable = true 且 setting.check.chkStyle = "radio" 时生效]   默认值："level"
                ////radioType = "level" 时，在每一级节点范围内当做一个分组。 
                ////radioType = "all" 时，在整棵树范围内当做一个分组。
                enable: true//设置 zTree 的节点上是否显示 checkbox / radio   默认值: false
            },
            view: {
                //nameIsHTML: true,//设置 name 属性是否支持 HTML 脚本
                showIcon: false,//设置 zTree 是否显示节点的图标。  默认值: true
                showTitle: false,//设置 zTree 是否显示节点的 title 提示信息(即节点 DOM 的 title 属性)。   默认值：true
                showLine: true,//设置 zTree 是否显示节点之间的连线。   默认值：true
                selectedMulti: false//设置是否允许同时选中多个节点。   默认值: true
            },
            data: {
                //keep: {
                //    leaf: true,//zTree 的节点叶子节点属性锁，是否始终保持 isParent = false   默认值：false
                //    parent: true //zTree 的节点父节点属性锁，是否始终保持 isParent = true   默认值：false
                //},
                key: {
                    //children: "nodes",//zTree 节点数据中保存子节点数据的属性名称。   默认值："children"
                    name: "text",//zTree 节点数据保存节点名称的属性名称。   默认值："name"
                    title: "title",//zTree 节点数据保存节点提示信息的属性名称。[setting.view.showTitle = true 时生效]   如果设置为 "" ，则自动与 setting.data.key.name 保持一致，避免用户反复设置   默认值：""fullName
                    //url: "xUrl",//zTree 节点数据保存节点链接的目标 URL 的属性名称。   特殊用途：当后台数据只能生成 url 属性，又不想实现点击节点跳转的功能时，可以直接修改此属性为其他不存在的属性名称   默认值："url"
                    //checked: "isChecked"//zTree 节点数据中保存 check 状态的属性名称。   默认值："checked"   请勿与 zTree 节点数据的其他参数冲突，例如：checkedOld
                },
                simpleData: {
                    enable: true,//确定 zTree 初始化时的节点数据、异步加载时的节点数据、或 addNodes 方法中输入的 newNodes 数据是否采用简单数据模式 (Array) 不需要用户再把数据库中取出的 List 强行转换为复杂的 JSON 嵌套格式   默认值：false
                    idKey: "id",//节点数据中保存唯一标识的属性名称。[setting.data.simpleData.enable = true 时生效]   默认值："id"
                    pIdKey: "pid",//节点数据中保存其父节点唯一标识的属性名称。[setting.data.simpleData.enable = true 时生效]   默认值："pId"
                    rootPId: ""//用于修正根节点父节点数据，即 pIdKey 指定的属性值。[setting.data.simpleData.enable = true 时生效]   默认值：null
                }
            },
            callback: {
                //beforeAsync: null,//用于捕获异步加载之前的事件回调函数，zTree 根据返回值确定是否允许进行异步加载
                //beforeCheck: null,//用于捕获 勾选 或 取消勾选 之前的事件回调函数，并且根据返回值确定是否允许 勾选 或 取消勾选
                //beforeCollapse: null,//用于捕获父节点折叠之前的事件回调函数，并且根据返回值确定是否允许折叠操作
                //beforeDblClick: null,//用于捕获 zTree 上鼠标双击之前的事件回调函数，并且根据返回值确定触发 onDblClick 事件回调函数
                //beforeDrag: null,//用于捕获节点被拖拽之前的事件回调函数，并且根据返回值确定是否允许开启拖拽操作
                //beforeDragOpen: null,//用于捕获拖拽节点移动到折叠状态的父节点后，即将自动展开该父节点之前的事件回调函数，并且根据返回值确定是否允许自动展开操作
                //beforeDrop: null,//用于捕获节点拖拽操作结束之前的事件回调函数，并且根据返回值确定是否允许此拖拽操作
                //beforeEditName: null,//用于捕获节点编辑按钮的 click 事件，并且根据返回值确定是否允许进入名称编辑状态    此事件回调函数最主要是用于捕获编辑按钮的点击事件，然后触发自定义的编辑界面操作。
                //beforeExpand: null,//用于捕获父节点展开之前的事件回调函数，并且根据返回值确定是否允许展开操作
                //beforeMouseDown: null,//用于捕获 zTree 上鼠标按键按下之前的事件回调函数，并且根据返回值确定触发 onMouseDown 事件回调函数
                //beforeMouseUp: null,//用于捕获 zTree 上鼠标按键松开之前的事件回调函数，并且根据返回值确定触发 onMouseUp 事件回调函数
                //beforeRemove: null,//用于捕获节点被删除之前的事件回调函数，并且根据返回值确定是否允许删除操作
                //beforeRename: null,//用于捕获节点编辑名称结束（Input 失去焦点 或 按下 Enter 键）之后，更新节点名称数据之前的事件回调函数，并且根据返回值确定是否允许更改名称的操作
                //beforeRightClick: null,//用于捕获 zTree 上鼠标右键点击之前的事件回调函数，并且根据返回值确定触发 onRightClick 事件回调函数


                //onAsyncError: null,//用于捕获异步加载出现异常错误的事件回调函数   如果设置了 setting.callback.beforeAsync 方法，且返回 false，将无法触发 onAsyncSuccess / onAsyncError 事件回调函数。
                //onAsyncSuccess: null,//用于捕获异步加载正常结束的事件回调函数
                //onCheck: null,//用于捕获 checkbox / radio 被勾选 或 取消勾选的事件回调函数
                //onClick: null,//用于捕获节点被点击的事件回调函数
                //onCollapse: null,//用于捕获节点被折叠的事件回调函数
                //onDblClick: null,//用于捕获 zTree 上鼠标双击之后的事件回调函数
                //onDrag: null,//用于捕获节点被拖拽的事件回调函数
                //onDragMove: null,//用于捕获节点被拖拽过程中移动的事件回调函数
                //onDrop: null,//用于捕获节点拖拽操作结束的事件回调函数
                //onExpand: null,//用于捕获节点被展开的事件回调函数
                //onMouseDown: null,//用于捕获 zTree 上鼠标按键按下后的事件回调函数
                //onMouseUp: null,//用于捕获 zTree 上鼠标按键松开后的事件回调函数
                //onNodeCreated: null,//用于捕获节点生成 DOM 后的事件回调函数
                //onRemove: null,//用于捕获删除节点之后的事件回调函数。
                //onRename: null,//用于捕获节点编辑名称结束之后的事件回调函数。
                ////1、节点进入编辑名称状态，并且修改节点名称后触发此回调函数。如果用户设置了 beforeRename 回调函数，并返回 false，将无法触发 onRename 事件回调函数。
                ////2、如果通过直接修改 treeNode 的数据，并且利用 updateNode 方法更新，是不会触发此回调函数的。
                ////3、从 v3.5.13 开始，取消编辑状态也会触发此回调，根据 isCancel 参数判断
                //onRightClick: null,//用于捕获 zTree 上鼠标右键点击之后的事件回调函数   只要将 function 的引用赋给 onRightClick 属性，则右键点击 zTree 时，将屏蔽浏览器的右键菜单。
                //beforeClick: function (treeId, treeNode) {
                //    var zTree = $.fn.zTree.getZTreeObj("tree");
                //    if (treeNode.isParent) {
                //        zTree.expandNode(treeNode);
                //        return false;
                //    } else {
                //        demoIframe.attr("src", treeNode.file + ".html");
                //        return true;
                //    }
                //}//用于捕获单击节点之前的事件回调函数，并且根据返回值确定是否允许单击操作
            }
        },



        //多个树的情况下选择树的方式
        JqObj: function (treeName, control) {
            return $("#" + treeName + "_" + control);
        },
        //获取节点"id", m
        //例$ztree.getNode("tree","id","1")
        getNode: function (treeId, key, value) {
            var tree = $.fn.zTree.getZTreeObj(treeId);
            return tree.getNodeByParam(key, value);
        },
        //选择节点
        selectNode: function (treeId, node){
            var tree = $.fn.zTree.getZTreeObj(treeId);
            return tree.selectNode(node,false);
        },
        //获取树
        getTree: function (treeId) {
            return $.fn.zTree.getZTreeObj(treeId);
        },
        //获取选中的节点
        getSelectedNodes: function (treeId) {
            var tree = $.fn.zTree.getZTreeObj(treeId);
            return tree.getSelectedNodes();
        },
        //获取输入框被勾选 或 未勾选的节点集合
        getCheckedNodes: function (treeId, checked) {
            var tree = $.fn.zTree.getZTreeObj(treeId);
            return tree.getCheckedNodes(checked);
        },
        //隐藏节点
        hideNode: function (treeId, treeNode) {
            var tree = $.fn.zTree.getZTreeObj(treeId);
            return tree.hideNode(treeNode);
        },
        //隐藏节点（数组）
        hideNodes: function (treeId, treeNode) {
            var tree = $.fn.zTree.getZTreeObj(treeId);
            return tree.hideNodes(treeNode);
        },
        //显示节点
        showNode: function (treeId, treeNode) {
            var tree = $.fn.zTree.getZTreeObj(treeId);
            return tree.showNode(treeNode);
        },
        //显示节点（数组）
        showNodes: function (treeId, treeNode) {
            var tree = $.fn.zTree.getZTreeObj(treeId);
            return tree.showNodes(treeNode);
        },
        //更新节点
        updateNode: function (treeId, treeNode) {
            var tree = $.fn.zTree.getZTreeObj(treeId);
            return tree.updateNode(treeNode);
        },
        //刷新树(少用)
        refresh: function (treeId) {
            var tree = $.fn.zTree.getZTreeObj(treeId);
            return tree.refresh();
        },
        /* *
         * 修改选择的属性
         * */
        setAttribute: function (id, obj, callback) {
            //循环修改属性
            for (var name in obj || {}) {
                //执行修改属性
                $ztree.objData[id][name] = obj[name];
            }
            //var tree = $.fn.zTree.getZTreeObj(id);
            //tree.destroy();
            //数据集
            //$ztree.init($ztree.objData[id], callback);

            var tree = $.fn.zTree.getZTreeObj(id);
            tree.setting.view.showLine = obj[name];
            tree.refresh();

            //回调
            callback ? callback() : null;
        }
    }