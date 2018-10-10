const Response = require('../../util/response.js');
const Tools = require('../../util/tools.js');
const WechatAPI = require('wechat-api');
const fs = require('fs');
const CryptoJS = require('crypto-js');
const xml2js = require('xml2js');
const uuid = require('uuid');
const setting =  require('../../conf/setting.js')
const WXPay = require('weixin-pay');
const appId = setting.wechatInfo.appId;
const secret = setting.wechatInfo.secret;
const getTicketToken = function (type,callback) {
    fs.readFile('./ticket_token.txt', 'utf8', function (e, txt) {
        if (e) {return callback(e);}
        callback(null, txt);
    });
}

const wxpay = WXPay({
    appid: setting.wechatInfo.appId,
    mch_id: setting.wechatInfo.mch_id,
    partner_key: setting.wechatInfo.payPassWord, //微信商户平台API密钥
    //pfx: fs.readFileSync('./apiclient_cert.p12'), //微信商户平台证书
})

const refund = function(data){
    return new Promise((resolve, reject)=> {
        wxpay.refund(params, function(err, result){
            resolve(err,result)
        })
    })
}

const saveTicketToken =  function (type, _ticketToken, callback) {
    fs.writeFile('./ticket_token.txt', JSON.stringify(_ticketToken), callback);
}

const api = new WechatAPI(appId, secret, function (callback) {
    fs.readFile('./access_token.txt', 'utf8', function (err, txt) {
        if (err) {return callback(err);}
        callback(null, txt);
    })
}, function (token, callback) {
    fs.writeFile('./access_token.txt', JSON.stringify(token), callback)
})
api.registerTicketHandle(getTicketToken, saveTicketToken)

const getLocalToken = function (){
    return new Promise((resolve, reject)=> {
        fs.readFile('./access_token.txt', 'utf8', function (e, txt) {
            if(!e) {
                resolve(txt)
            }else{
                resolve(e)
            }
        });
    })
}

const getToken =  function () {
    return new Promise((resolve, reject)=> {
        api.getLatestToken(function (e, token) {
            if (!e) {
                resolve(token.accessToken)
            } else {
                resolve(e)
            }
        })
    })
}

const getLocalTicket = function (){
    return new Promise((resolve, reject)=> {
        fs.readFile('./ticket_token.txt', 'utf8', function (e, txt) {
            if(!e) {
                resolve(txt)
            }else{
                resolve(e);
            }
        })
    })
}

const getTicket = function () {
    return new Promise((resolve, reject)=> {
        api.getTicket(function (e, ticket) {
            if (!e) {
                resolve(ticket.ticket)
            } else {
                resolve(e)
            }
        })
    })
}

const getOpenid = function (appId,appSecret,code){
    return new Promise((resolve, reject)=> {
        var https = require('https');
        var options = {
            hostname: 'api.weixin.qq.com',
            path:`/sns/oauth2/access_token?appid=${appId}&secret=${appSecret}&code=${code}&grant_type=authorization_code`,
            method: 'GET'
        }
        var req = https.request(options,function(res){
            res.setEncoding('utf8')
            res.on('data',function(chunk){
                resolve(JSON.parse(chunk).openid);
            })
        })
        req.on('error', function(e){
            resolve(e)
        })
        req.end()
    })
}

const getUserInfo = function (id) {
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

const getOAuthInfo = function (code){
    return new Promise((resolve, reject)=> {
        var https = require('https')
        var options = {
            hostname: 'api.weixin.qq.com',
            path:`/sns/oauth2/access_token?appid=${appId}&secret=${secret}&code=${code}&grant_type=authorization_code`,
            method: 'GET'
        }
        var req = https.request(options,function(res){
            res.setEncoding('utf8')
            res.on('data',function(chunk){
                resolve(chunk);
            })
        })
        req.on('error', function(e){
            resolve(e)
        })
        req.end()
    })
}

const getOAuthUser = function getOAuthUser(token,openid,lang){
    return new Promise((resolve, reject)=> {
        var https = require('https')
        var options = {
            hostname: 'api.weixin.qq.com',
            path:`/sns/userinfo?access_token=${token}&openid=${openid}&lang=${lang}`,
            method: 'GET'
        }
        var req = https.request(options,function(res){
            res.setEncoding('utf8')
            res.on('data',function(chunk){
                resolve(chunk)
            })
        })
        req.on('error', function(e){
            resolve(e)
        })
        req.end()
    })
}

const getPrePayId = function (appId,orderId,totalFee,name,ipAddress,url,openid,attach){
    return new Promise((resolve, reject)=> {
        var https = require('https')
        var nonce_str = Tools.randomString(16)
        var tempStr = `appid=${appId}&attach=${attach}&body=${name}&device_info=WEB&fee_type=CNY&mch_id=${setting.wechatInfo.mch_id}&nonce_str=${nonce_str}&notify_url=${url}&openid=${openid}&out_trade_no=${orderId}&sign_type=MD5&spbill_create_ip=${ipAddress}&total_fee=${totalFee}&trade_type=JSAPI`
        tempStr = tempStr + `&key=${setting.wechatInfo.payPassWord}`
        var sign =  CryptoJS.MD5(tempStr).toString().toUpperCase()
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
        }

        //转xml
        var builder = new xml2js.Builder()  // JSON->xml
        var xml =  builder.buildObject(postData)

        var contentStr = xml
        var contentLen = Buffer.byteLength(xml, 'utf8')
        var options = {
            hostname: 'api.mch.weixin.qq.com',
            path:`/pay/unifiedorder`,
            method: 'POST',
            headers: {
                "Content-Type": 'application/xml',
                "Content-Length": contentLen
            }
        }
        var _req = https.request(options,function(res){
            res.setEncoding('utf8')
            res.on('data',function(chunk){
                //xml转json
                var parser = new xml2js.Parser()
                parser.parseString(chunk,function (err, result) {
                    resolve(formatXmlResult(result.xml))
                })
            })
        })
        _req.write(contentStr)
        _req.on('error', function(e){
            resolve(e)
        })
        _req.end()
    })
}

const formatXmlResult = function(data){
    let result = data
    for(let i in result){
        result[i] = result[i][0]
    }
    return result
}

module.exports = app => {
    return class weChatApi extends app.Service {

        * getAppId(){
            try {
                return  Response.success({data:appId})
            } catch(e) {
                return Response.fail(1,e)
            }
        }

        * getToken (){
            try {
                var localToken = yield getLocalToken()
                var token = ''
                localToken =  JSON.parse(localToken)
                if(new Date(localToken.expireTime) < new Date()){
                    token = yield getToken()
                }else{
                    token = localToken.accessToken
                }
                return  Response.success({data:token})
            } catch(e) {
                return Response.fail(1, e)
            }
        }

        * getTicket (){
            try {
                var localTicket = yield getLocalTicket()
                var ticket =''
                localTicket = JSON.parse(localTicket)
                if(new Date(localTicket.expireTime) < new Date()){
                    ticket = yield getTicket()
                }else{
                    ticket = localTicket.ticket
                }
                return  Response.success({data:ticket})
            } catch(e) {
                return Response.fail(1, e)
            }
        }

        * getSdkInfo (url){
            try {
                const ticket = yield this.service.weChatApi.getTicket()
                const timestamp = parseInt((new Date()).getTime().toString().slice(0,10))
                const nonceStr = Tools.randomString(16)
                const signature = CryptoJS.SHA1(`jsapi_ticket=${ticket.data}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`).toString();
                const config = {
                    appId:appId,
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
                }
                return  Response.success({data:config})
            } catch(e) {
                return Response.fail(1, e)
            }
        }

        * snsapiBase(code){
            try {
                const openid = yield getOpenid(appId,secret,code)
                if(openid == undefined){
                    return Response.fail(110)
                }

                const userInfo  = yield this.service.weChatApi.getUserInfo(openid,'snsapi_base')

                if(userInfo.errorCode!=0){
                    return Response.fail(111)
                }

                return  Response.success({
                    data:userInfo.data
                })
            } catch(e) {
                return Response.fail(1,e)
            }
        }

        * snsapiUserInfo(code){
            try{
                const OAuthInfo = yield getOAuthInfo(code)
                if(OAuthInfo.errcode){
                    return Response.fail(OAuthInfo.errcode,OAuthInfo.errmsg)
                }
                const userInfo  = yield this.service.weChatApi.getUserInfo(openid,'snsapi_userinfo',{access_token:OAuthInfo.access_token,openid:OAuthInfo.openid})
                
                if(userInfo.errorCode!=0){
                    return Response.fail(111)
                }
                
                return  Response.success({
                    data:userInfo.data
                })
            }catch(e){
                return Response.fail(1, e)
            }
        }

        * getUserInfo(openid,type='snsapi_base',data=null){
            try{
                //获取用户信息
                var userInfoOnline = ''
                if(type=='snsapi_base'){
                    userInfoOnline = yield getUserInfo(openid)
                }
                if(type=='snsapi_userinfo'){
                    userInfoOnline = yield getOAuthUser(data.access_token,data.openid,'zh_CN');
                    userInfoOnline = JSON.parse(userInfoOnline)
                }

                var userInfoLocal = yield app.mysql.query(Tools.generatorQuery(`userinfo_extend`, 1, {openid:openid}, null, 1,'query'))
                if(userInfoLocal.length==0){
                    //插入微信用户信息
                    yield app.mysql.insert(`${setting.PREFIX}userinfo`,{
                        id:uuid(),
                        openid:userInfoOnline.openid,
                        nickname:Tools.filterEmoji(userInfoOnline.nickname),
                        sex:userInfoOnline.sex,
                        city:userInfoOnline.city,
                        province:userInfoOnline.province,
                        country:userInfoOnline.country,
                        headimgurl:userInfoOnline.headimgurl,
                        subscribe:userInfoOnline.subscribe||null,
                        delFlg:0,
                        createTime:this.app.mysql.literals.now,
                        updateTime:this.app.mysql.literals.now
                    })

                    //插入微信用户扩展信息
                    yield app.mysql.insert(`${setting.PREFIX}userinfo_extend`,{
                        id:uuid(),
                        openid:userInfoOnline.openid,
                        name:null,
                        tel:null,
                        type:null,
                        staffId:null,
                        isComplete:0,
                        delFlg:0,
                        createTime:this.app.mysql.literals.now,
                        updateTime:this.app.mysql.literals.now
                    })
                }else{
                    if(userInfoLocal[0].headimgurl!=userInfoOnline.headimgurl||userInfoLocal[0].nickname!=userInfoOnline.nickname){
                        yield app.mysql.update(`${setting.PREFIX}userinfo`,{
                            id:userInfoLocal[0].id,
                            nickname:userInfoOnline.nickname,
                            headimgurl:userInfoOnline.headimgurl,
                            updateTime:this.app.mysql.literals.now
                        })
                    }
                }

                //再次获取用户信息
                userInfoLocal = yield app.mysql.query(Tools.generatorQuery(`userinfo_extend`, 1, {openid:openid}, null, 1,'query'))
                return  Response.success({
                    data:Tools.resultFormat(userInfoLocal[0])
                })
            }catch(e){
                return Response.fail(1, e)
            }
        }

        * getPrePayId(data){
            try{
                let _orderId = data.orderId.split('-').join('')
                let orderId = data.orderId
                let attach = data.orderId
                let name = data.productName
                let ipAddress = setting.wechatInfo.ipAddress
                let url = setting.wechatInfo.payCallbackUrl
                let openid =data.openid

                const payInfo = yield app.mysql.select(`${setting.PREFIX}order`,{
                    where:{
                        id:orderId,
                        delFlg:0
                    },
                    columns: ['totalPrice']
                })
                if(payInfo.length==0){
                    return Response.fail(113)
                }
                var prePayId = yield getPrePayId(appId,_orderId,payInfo[0].totalPrice,name,ipAddress,url,openid,attach)
                if(prePayId.result_code == 'FAIL'){
                    //因为订单订单id重复
                    var newOrderId = uuid()
                    var _newOrderId = newOrderId.split('-').join('')
                    //更新所有关于订单类表的orderId
                    const conn = yield this.app.mysql.beginTransaction();
                    try{
                        yield conn.query(`update ${setting.PREFIX}receipt set orderId='${newOrderId}' where orderId='${orderId}'`)
                        yield conn.query(`update ${setting.PREFIX}work set orderId='${newOrderId}' where orderId='${orderId}'`)
                        yield conn.query(`update ${setting.PREFIX}single_service_usage set orderId='${newOrderId}' where orderId='${orderId}'`)
                        yield conn.commit();
                    }catch(e){
                        yield conn.rollback(); // 一定记得捕获异常后回滚事务！！
                        return Tools.logicResult(-1,e)
                    }
                    prePayId = yield getPrePayId(appId,_newOrderId,payInfo[0].totalPrice,name,ipAddress,url,openid,attach)
                    if(prePayId.result_code == 'FAIL'){
                        return Response.fail(114)
                    }
                }
                const timestamp = parseInt((new Date()).getTime().toString().slice(0,10))
                const nonceStr  = Tools.randomString(16)
                const packageStr  = `prepay_id=${prePayId.prepay_id}`
                const signType  = 'MD5'
                let paySign= `appId=${appId}&nonceStr=${nonceStr}&package=${packageStr}&signType=${signType}&timeStamp=${timestamp}&key=${setting.wechatInfo.payPassWord}`;
                paySign =  CryptoJS.MD5(paySign).toString().toUpperCase()

                return  Response.success({data:{
                    timestamp: timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
                    package: `prepay_id=${prePayId.prepay_id}`, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                    signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: paySign // 支付签名
                }})
            }catch(e){
                return Response.fail(1, e)
            }
        }

        * getPayNotify(data){
            try{
                const id = uuid()
                const notifyInfo = formatXmlResult(data.xml)
                console.log('notifyInfo:' + JSON.stringify(notifyInfo))
                delete notifyInfo['return_code']
                delete notifyInfo['sub_mch_id']
                delete notifyInfo['coupon_count']
                delete notifyInfo['coupon_type']
                delete notifyInfo['coupon_id']
                notifyInfo.id = id
                notifyInfo.delFlg = 0
                notifyInfo.createTime = this.app.mysql.literals.now
                notifyInfo.updateTime = this.app.mysql.literals.now
                //去掉-的uuid转换
                var out_trade_no = notifyInfo.out_trade_no
                if(out_trade_no.length!=36){
                    out_trade_no = `${out_trade_no.substr(0,8)}-${out_trade_no.substr(8,4)}-${out_trade_no.substr(12,4)}-${out_trade_no.substr(16,4)}-${out_trade_no.substr(20,12)}` 
                }
                notifyInfo.out_trade_no = out_trade_no

                const result = yield app.mysql.query(`select * from ${setting.PREFIX}wechat_pay_notify where transaction_id ='${notifyInfo.transaction_id}'`);
                if(result.length==0){
                    const conn = yield app.mysql.beginTransaction()
                    try{
                        //更新微信支付信息
                        yield conn.insert(`${setting.PREFIX}wechat_pay_notify`,notifyInfo)
                        //更新订单状态
                        yield conn.query(`update ${setting.PREFIX}order set status = 2 where id='${notifyInfo.out_trade_no}'`)
                        const orderInfo = yield conn.query(`select * from ${setting.PREFIX}order where id='${notifyInfo.out_trade_no}'`)
                        //更新工单支付状态
                        if(orderInfo[0].orderType==1){
                            yield conn.query(`update ${setting.PREFIX}work set serviceStatus = 2 where orderId='${notifyInfo.out_trade_no}'`)
                        }
                        //更新单项服务支付状态
                        if(orderInfo[0].orderType==2){
                            yield conn.query(`update ${setting.PREFIX}order_single_service set serviceStatus = 2 where orderId='${notifyInfo.out_trade_no}'`)
                        }
                        //生成开票信息

                        if(orderInfo[0].reciveId){
                            //生成发票管理信息
                            const reciveInfo = yield conn.query(`select receipt.id,receipt.openid,receipt.type,receipt.title,receipt.tel,receipt.postAddress,receipt.taxId,receipt.address,receipt.bank,receipt.bankAccount,userinfo.name from ${setting.PREFIX}my_receipt as receipt left join ${setting.PREFIX}userinfo_extend as userinfo  on  receipt.openid = userinfo.openid where receipt.id='${orderInfo[0].reciveId}'`)

                            yield conn.insert(`${setting.PREFIX}receipt`,{
                                id:uuid(),
                                openid:reciveInfo[0].openid,
                                name:reciveInfo[0].name,
                                orderId:orderInfo[0].id,
                                type:reciveInfo[0].type,
                                title:reciveInfo[0].title,
                                tel:reciveInfo[0].tel,
                                postAddress:reciveInfo[0].postAddress,
                                taxId:reciveInfo[0].taxId,
                                address:reciveInfo[0].address,
                                bank:reciveInfo[0].bank,
                                bankAccount:reciveInfo[0].bankAccount,
                                isCreate:0,//0:未开1已开
                                delFlg:0,
                                createTime:this.app.mysql.literals.now,
                                updateTime:this.app.mysql.literals.now
                            })
                        }

                        //更新优惠券
                        if(orderInfo[0].myCouponId){
                            conn.update(`${setting.PREFIX}my_coupon`,{
                                id: orderInfo[0].myCouponId,
                                usedTime:this.app.mysql.literals.now,
                                delFlg:1,
                                updateTime:this.app.mysql.literals.now
                            })
                        }

                        //发送短信
                        var tel = yield this.app.mysql.query(`select tel from ${setting.PREFIX}userinfo_extend where openid='${orderInfo[0].openid}'`)

                        var message = {
                            PhoneNumbers: `${tel[0].tel}`,
                            SignName: '柏嘉德健康',
                            TemplateCode: 'SMS_140721142',
                            TemplateParam: `{"code":"${orderInfo[0].serialNum}","tel":"4000-939-599"}`
                        }
                        const sms = yield this.service.sms.send(message);

                        if(sms.code != 0){
                            return Tools.logicResult(sms.code)    
                        }
                        
                        yield conn.commit()
                    }catch(e){
                        console.log('notifyInfo err:' + JSON.stringify(e))
                        yield conn.rollback() // 一定记得捕获异常后回滚事务！！
                        return `<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[FAIL]]></return_msg></xml>`;
                    }
                }
                return  `<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>`;
            }catch(e){
                console.log('notifyInfo err:' + JSON.stringify(e))
                return `<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[FAIL]]></return_msg></xml>`;
            }
        }

        * refund(data){
            try{
                //todo 退款的接口未调

                var data = {
                    appid: setting.wechatInfo.appId,
                    mch_id: setting.wechatInfo.mch_id,
                    op_user_id: setting.wechatInfo.shopName,
                    out_refund_no: uuid(),
                    total_fee: data.total_fee, //原支付金额
                    refund_fee: data.refund_fee, //退款金额
                    transaction_id: data.transaction_id
                }
                 
                const refundInfo = yield refund(data)

                return Response.success()
            }catch(e){
                return Response.fail(1, e)
            }
        }
    }
}
