module.exports = app => {
    const Response = require('../util/response.js');
    const Tools = require('../util/tools.js');
    const WechatAPI = require('wechat-api');
    const fs = require('fs');
    const CryptoJS = require('crypto-js');
    const xml2js = require('xml2js');
    const uuid = require('uuid');
    const setting =  require('../conf/setting.js')
    const appId = setting.wechatInfo.appId;
    const secret = setting.wechatInfo.secret;
    var api = new WechatAPI(appId, secret, function (callback) {
        fs.readFile('./access_token.txt', 'utf8', function (err, txt) {
            if (err) {return callback(err);}
            callback(null, txt);
        });
    }, function (token, callback) {
        fs.writeFile('./access_token.txt', JSON.stringify(token), callback);
    });
    api.registerTicketHandle(getTicketToken, saveTicketToken);

    function getOAuthToken(code){
        return new Promise((resolve, reject)=> {
            var https = require('https');
            var options = {
                hostname: 'api.weixin.qq.com',
                path:`/sns/oauth2/access_token?appid=${appId}&secret=${secret}&code=${code}&grant_type=authorization_code`,
                method: 'GET'
            };
            var req = https.request(options,function(res){
                res.setEncoding('utf8');
                res.on('data',function(chunk){
                    resolve(chunk);
                });
            });
            req.on('error', function(e){
                resolve(e)
            });
            req.end();
        })
    }

    function getOAuthUser(token,openid,lang){
        return new Promise((resolve, reject)=> {
            var https = require('https');
            var options = {
                hostname: 'api.weixin.qq.com',
                path:`/sns/userinfo?access_token=${token}&openid=${openid}&lang=${lang}`,
                method: 'GET'
            };
            var req = https.request(options,function(res){
                res.setEncoding('utf8');
                res.on('data',function(chunk){
                    resolve(chunk);
                });
            });
            req.on('error', function(e){
                resolve(e)
            });
            req.end();
        })
    }

    function getOpenid(appId,appSecret,code){
        return new Promise((resolve, reject)=> {
            var https = require('https');
            var options = {
                hostname: 'api.weixin.qq.com',
                path:`/sns/oauth2/access_token?appid=${appId}&secret=${appSecret}&code=${code}&grant_type=authorization_code`,
                method: 'GET'
            };
            var req = https.request(options,function(res){
                res.setEncoding('utf8');
                res.on('data',function(chunk){
                    resolve(JSON.parse(chunk).openid);
                });
            });
            req.on('error', function(e){
                resolve(e)
            });
            req.end();
        })
    }

    function getPrePayId(appId,orderId,totalFee,name,ipAddress,url,openid,attach){
        return new Promise((resolve, reject)=> {
            var https = require('https');
            var nonce_str = randomString(16);
            var tempStr = `appid=${appId}&attach=${attach}&body=${name}&device_info=WEB&fee_type=CNY&mch_id=${setting.wechatInfo.mch_id}&nonce_str=${nonce_str}&notify_url=${url}&openid=${openid}&out_trade_no=${orderId}&sign_type=MD5&spbill_create_ip=${ipAddress}&total_fee=${totalFee}&trade_type=JSAPI`
            tempStr = tempStr + `&key=${setting.wechatInfo.payPassWord}`;
            var sign =  CryptoJS.MD5(tempStr).toString().toUpperCase();
            var postData={
                appid:appId,
                attach:attach,
                mch_id:setting.wechatInfo.mch_id,
                device_info:'WEB',
                nonce_str:nonce_str,
                sign:sign,
                sign_type:'MD5',
                body:name,
                out_trade_no:orderId,
                fee_type:'CNY',
                total_fee:totalFee,
                spbill_create_ip:ipAddress,
                notify_url:url,
                trade_type:'JSAPI',
                openid:openid
            };

            //转xml
            var builder = new xml2js.Builder();  // JSON->xml
            var xml =  builder.buildObject(postData);

            var contentStr = xml;
            var contentLen = Buffer.byteLength(xml, 'utf8');
            var options = {
                hostname: 'api.mch.weixin.qq.com',
                path:`/pay/unifiedorder`,
                method: 'POST',
                headers: {
                    "Content-Type": 'application/xml',
                    "Content-Length": contentLen
                }
            };
            var _req = https.request(options,function(res){
                res.setEncoding('utf8');
                res.on('data',function(chunk){
                    //xml转json
                    var parser = new xml2js.Parser();
                    parser.parseString(chunk,function (err, result) {
                        resolve(formatXmlResult(result.xml));
                    });
                })
            });
            _req.write(contentStr);
            _req.on('error', function(e){
                resolve(e)
            });
            _req.end();
        })
    }

    function formatXmlResult(data){
        let result = data;
        for(let i in result){
            result[i] = result[i][0];
        }
        return result
    }

    function getToken() {
        return new Promise((resolve, reject)=> {
            api.getLatestToken(function (e, token) {
                if (!e) {
                    resolve(token.accessToken);
                } else {
                    resolve(e)
                }
            })
        })
    }

    function getTicket() {
        return new Promise((resolve, reject)=> {
            api.getTicket(function (e, ticket) {
                if (!e) {
                    resolve(ticket.ticket);
                } else {
                    resolve(e)
                }
            })
        })
    }

    function getUser(id) {
        return new Promise((resolve, reject)=> {
            api.getUser({openid: id, lang: 'zh_CN'}, function(e,userinfo){
                if (!e) {
                    resolve(userinfo);
                } else {
                    resolve(e)
                }
            });
        })
    }

    function getTicketToken(type,callback) {
        fs.readFile('./ticket_token.txt', 'utf8', function (e, txt) {
            if (e) {return callback(e);}
            callback(null, txt);
        });
    }
    function saveTicketToken(type, _ticketToken, callback) {
        fs.writeFile('./ticket_token.txt', JSON.stringify(_ticketToken), callback);
    }

    function getLocalToken(){
        return new Promise((resolve, reject)=> {
            fs.readFile('./access_token.txt', 'utf8', function (e, txt) {
                if(!e) {
                    resolve(txt)
                }else{
                    resolve(e);
                }
            });
        })
    }

    function getLocalTicket(){
        return new Promise((resolve, reject)=> {
            fs.readFile('./ticket_token.txt', 'utf8', function (e, txt) {
                if(!e) {
                    resolve(txt)
                }else{
                    resolve(e);
                }
            });
        })
    }

    function randomString (len) {
        len = len || 32;
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var maxPos = chars.length;
        var str = '';
        for (i = 0; i < len; i++) {
            str += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return str;
    };

    function filterEmoji(str){
        var strArr = str.split("");
        var result = "";
        var totalLen = 0;

        for(var i = 0; i < strArr.length; i ++) {
            // 超出长度,退出程序
            if(totalLen >= 16) break;
            var val = strArr[i];
            // 英文,增加长度1
            if(/[a-zA-Z]/.test(val)) {
                totalLen = 1 + (+totalLen);
                result += val;
            }
            // 中文,增加长度2
            else if(/[\u4e00-\u9fa5]/.test(val)) {
                totalLen = 2 + (+totalLen);
                result += val;
            }
            // 遇到代理字符,将其转换为 "", 不增加长度
            else if(/[\ud800-\udfff]/.test(val)) {
                // 代理对长度为2,
                if(/[\ud800-\udfff]/.test(strArr[i + 1])) {
                    // 跳过下一个
                    i ++;
                }
                // 将代理对替换为 ""
                result += "";
            }
        };
        return result
    }

    return class weChatApi extends app.Service {

        * getAppId(){
            try {
                return  Response.success({data:appId});
            } catch(e) {
                return Response.fail(1,e)
            }
        }

        * getToken (){
            try {
                var localToken = yield getLocalToken();
                var token = '';
                localToken =  JSON.parse(localToken);
                if(new Date(localToken.expireTime) < new Date()){
                    token = yield getToken();
                }else{
                    token = localToken.accessToken
                }
                return  Response.success({data:token});
            } catch(e) {
                return Response.fail(1, e)
            }
        }

        * getTicket (){
            try {
                var localTicket = yield getLocalTicket();
                var ticket ='';
                localTicket = JSON.parse(localTicket);
                if(new Date(localTicket.expireTime) < new Date()){
                    ticket = yield getTicket();
                }else{
                    ticket = localTicket.ticket
                }
                return  Response.success({data:ticket});
            } catch(e) {
                return Response.fail(1, e)
            }
        }

        * getSdkInfo (url){
            try {
                var ticket = yield this.service.weChatApi.getTicket();
                var _appId = appId;
                var timestamp = parseInt((new Date()).getTime().toString().slice(0,10));
                var nonceStr = randomString(16);
                var signature = CryptoJS.SHA1(`jsapi_ticket=${ticket.data}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`).toString();
                var config = {
                    appId:_appId,
                    timestamp:timestamp,
                    nonceStr:nonceStr,
                    signature:signature,
                    jsApiList:[
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'onMenuShareQZone',
                        'startRecord',
                        'stopRecord',
                        'onVoiceRecordEnd',
                        'playVoice',
                        'pauseVoice',
                        'stopVoice',
                        'onVoicePlayEnd',
                        'uploadVoice',
                        'downloadVoice',
                        'chooseImage',
                        'previewImage',
                        'uploadImage',
                        'downloadImage',
                        'translateVoice',
                        'getNetworkType',
                        'openLocation',
                        'getLocation',
                        'hideOptionMenu',
                        'showOptionMenu',
                        'hideMenuItems',
                        'showMenuItems',
                        'hideAllNonBaseMenuItem',
                        'showAllNonBaseMenuItem',
                        'closeWindow',
                        'scanQRCode',
                        'chooseWXPay',
                        'openProductSpecificView',
                        'addCard',
                        'chooseCard',
                        'openCard'
                    ]
                };
                return  Response.success({data:config});
            } catch(e) {
                return Response.fail(1, e)
            }
        }

        * getUserInfo(openid){
            try {
                const userinfo = yield app.mysql.select(`${setting.PREFIX}userinfo`, {
                    where: { 
                        openid: openid,
                        delFlg: 0
                    },
                    columns: ['id','openid','nickname','sex','city','province','country','headimgurl','subscribe'] // 要查询的表字段
                })
                const extendInfo = yield app.mysql.select(`${setting.PREFIX}userinfo_extend`,{
                    where:{
                        openid:openid,
                        delFlg:0
                    },
                    columns: ['id','name','tel'], // 要查询的表字段
                })
                const userinfoByWechat = yield getUser(openid);

                if(userinfo.length == 0){
                    if(userinfoByWechat!=null){
                        yield app.mysql.insert(`${setting.PREFIX}userinfo`,{
                            id:uuid(),
                            openid:userinfoByWechat.openid,
                            nickname:filterEmoji(userinfoByWechat.nickname),
                            sex:userinfoByWechat.sex,
                            city:userinfoByWechat.city,
                            province:userinfoByWechat.province,
                            country:userinfoByWechat.country,
                            headimgurl:userinfoByWechat.headimgurl,
                            subscribe:userinfoByWechat.subscribe,
                            delFlg:0,
                            createTime:this.app.mysql.literals.now,
                            updateTime:this.app.mysql.literals.now
                        });
                        const extendId = uuid()
                        yield app.mysql.insert(`${setting.PREFIX}userinfo_extend`,{
                            id:extendId,
                            openid:userinfoByWechat.openid,
                            delFlg:0,
                            createTime:this.app.mysql.literals.now,
                            updateTime:this.app.mysql.literals.now
                        });
                        return  Response.success({
                            data:{
                                id:userinfoByWechat.id,
                                openid:userinfoByWechat.openid,
                                nickname:userinfoByWechat.nickname,
                                sex:userinfoByWechat.sex,
                                city:userinfoByWechat.city,
                                province:userinfoByWechat.province,
                                country:userinfoByWechat.country,
                                headimgurl:userinfoByWechat.headimgurl,
                                subscribe:userinfoByWechat.subscribe,
                                moreInfo:{
                                    userinfoExtend:{
                                        id:extendId,
                                        name:null,
                                        tel:null
                                    }
                                }
                            }
                        })
                    }else{
                        return Response.fail(111)
                    }
                }else{
                    if(userinfo[0].headimgurl!=userinfoByWechat.headimgurl){
                        yield app.mysql.update(`${setting.PREFIX}userinfo`,{
                            id:userinfo[0].id,
                            headimgurl:userinfoByWechat.headimgurl
                        })
                        userinfo[0].headimgurl = userinfoByWechat.headimgurl
                    }
                    userinfo[0].moreInfo = {
                        userinfoExtend:{
                            id:extendInfo[0].id,
                            name:extendInfo[0].name,
                            tel:extendInfo[0].tel
                        }
                    }
                    return  Response.success({data:userinfo[0]});
                }
            } catch(e) {
                return Response.fail(1,e)
            }
        }

        * getOpenid(code){
            try {
                var openid = yield getOpenid(appId,secret,code);
                if(openid == undefined){
                    return Response.fail(110)
                }
                return  Response.success({data:openid});
            } catch(e) {
                return Response.fail(-1,e)
            }
        }

        * getUserInfoByOAuth(code){
            try{
                var id = uuid();
                var OAuthUser = yield getOAuthToken(code);
                OAuthUser = JSON.parse(OAuthUser);
                if(!OAuthUser.errcode){
                    var userinfo = yield app.mysql.select(`${setting.PREFIX}userinfo`, {
                        where: { 
                            openid: openid,
                            delFlg: 0
                        }
                    })

                    if(userinfo.length == 0){
                        userinfo = yield getOAuthUser(OAuthUser.access_token,OAuthUser.openid,'zh_CN');
                        if(userinfo!=null){
                            userinfo = JSON.parse(userinfo);
                            userinfo = {
                                id:id,
                                openid:userinfo.openid,
                                nickname:filterEmoji(userinfo.nickname),
                                sex:userinfo.sex,
                                city:userinfo.city,
                                province:userinfo.province,
                                country:userinfo.country,
                                headimgurl:userinfo.headimgurl,
                                subscribe:userinfo.subscribe,
                                delFlg:0,
                                createTime:this.app.mysql.literals.now,
                                updateTime:this.app.mysql.literals.now
                            };
                            const upDateUser = yield app.mysql.insert(`${setting.PREFIX}userinfo`,userinfo);
                            return  Response.success({
                                data:{
                                    id:userinfo.id,
                                    openid:userinfo.openid,
                                    nickname:userinfo.nickname,
                                    sex:userinfo.sex,
                                    city:userinfo.city,
                                    province:userinfo.province,
                                    country:userinfo.country,
                                    headimgurl:userinfo.headimgurl,
                                    subscribe:userinfo.subscribe
                                }
                            });
                        }else{
                            return Response.fail(112)
                        }
                    }else{
                        return  Response.success({data:userinfo[0]});
                    }
                }else{
                    return Response.fail(119, {errorcode:OAuthUser.errcode, errmsg:OAuthUser.errmsg})
                }
            }catch(e){
                return Response.fail(1, e)
            }
        }

        * getPrePayId(data){
            try{
                let orderId = data.orderId;
                let attach = 'total pay';
                let name = data.productName
                let ipAddress = setting.wechatInfo.ipAddress;
                let url = setting.wechatInfo.payCallbackUrl;
                let openid =data.openid;

                const payInfo = yield app.mysql.select(Tools.getTableName('order'),{
                    where:{
                        id:data.orderId,
                        delFlg:0
                    },
                    columns: ['payTotal','orderId']
                });
                if(payInfo.length==0){
                    return Response.fail(113)
                }
                const prePayId = yield getPrePayId(appId,payInfo[0].orderId,payInfo[0].payTotal,name,ipAddress,url,openid,attach);
                if(prePayId.result_code == 'FAIL'){
                    return Response.fail(114)
                }
                const timestamp = parseInt((new Date()).getTime().toString().slice(0,10));
                const nonceStr  = randomString(16);
                const packageStr  = `prepay_id=${prePayId.prepay_id}`;
                const signType  = 'MD5';
                let paySign= `appId=${appId}&nonceStr=${nonceStr}&package=${packageStr}&signType=${signType}&timeStamp=${timestamp}&key=${setting.wechatInfo.payPassWord}`;
                paySign =  CryptoJS.MD5(paySign).toString().toUpperCase();

                return  Response.success({data:{
                    timestamp: timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
                    package: `prepay_id=${prePayId.prepay_id}`, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                    signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: paySign // 支付签名
                }});
            }catch(e){
                return Response.fail(1, e)
            }
        }

        * getPayNotify(data){
            try{
                const id = uuid();
                const notifyInfo = formatXmlResult(data.xml);
                console.log('notifyInfo:' + JSON.stringify(notifyInfo))
                delete notifyInfo['return_code'];
                delete notifyInfo['sub_mch_id'];
                delete notifyInfo['coupon_count'];
                delete notifyInfo['coupon_type'];
                delete notifyInfo['coupon_id'];
                notifyInfo =  Object.assign({
                    id:id,
                    delFlg: 0,
                    createTime:this.app.mysql.literals.now,
                    updateTime:this.app.mysql.literals.now
                }, notifyInfo);
                const result = yield app.mysql.query(`select * from ${setting.PREFIX}wechat_pay_notify where transaction_id ='${notifyInfo.transaction_id}'`);
                if(result.length==0){
                    const conn = yield app.mysql.beginTransaction();
                    try{
                        //更新微信支付信息
                        const notifyInfoInsert = yield conn.insert(`${setting.PREFIX}wechat_pay_notify`,notifyInfo);
                        //更新订单状态
                        const updataOrder = yield conn.query(`update ${setting.PREFIX}order set status = 2 where orderId='${notifyInfo.out_trade_no}'`)
                        yield conn.commit();
                    }catch(e){
                        console.log('notifyInfo err:' + JSON.stringify(e))
                        yield conn.rollback(); // 一定记得捕获异常后回滚事务！！
                        return `<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[FAIL]]></return_msg></xml>`;
                    }
                }
                return  `<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>`;
            }catch(e){
                console.log('notifyInfo err:' + JSON.stringify(e))
                return `<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[FAIL]]></return_msg></xml>`;
            }
        }
    }
};
