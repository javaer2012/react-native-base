import axios from 'axios';
import qs from 'qs';
import moment from 'moment';
import {AsyncStorage} from 'react-native';
import config from '../config';
axios.defaults.timeout =  6000;

axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

const url = 'https://mobile2.lychee-info.cn/cps-rest';
const appUrl = 'https://mobile2.lychee-info.cn/app'

export const HTTP_IMG = 'https://mobile2.lychee-info.cn/cps-rest/showImg?fileName='

var sourceType = { sourceType: 3};
	
// 高德地图web服务 key
var amapKey= 'aadbcaa5c0767bc0e2c2dc8df80087c2';

const getToken = async (cb)=> {
   try{
       const lycheeToken = await AsyncStorage.getItem('token');
       const exp = await AsyncStorage.getItem('exp');
       //console.log("TOKEN",lycheeToken)
       if (lycheeToken) {
           //是否过期；
           // 获取时间戳 :
           var expireDate = moment(exp, 'YYYY-MM-DD HH:mm:ss').valueOf();
           var timeStamp = Date.now();
           if (timeStamp > expireDate) {
               //刷新token;
               var params = {
                   authAppId: config.authAppId,
                   authAppSecret: config.authAppSecret,
               };
               const authRsp = await axios.post(url + '/auth/', JSON.stringify(params), {
                   headers: {
                       'Content-Type': 'application/json;charset=UTF-8'
                   }
               })

               if (authRsp.data.errcode) {
               	//console.log(authRsp);
               		const auth = authRsp.data.auth,
						token = [['token',auth.token],['exp',auth.expireDate]]
                   const rsp = await AsyncStorage.multiSet(token);
               		console.log("save")
                   typeof cb == "function" & cb(authRsp.data.auth.token);
               }
           }  else {
               typeof cb == "function" & cb(lycheeToken);
           }
       }
       else {
           //刷新token;
           var params = {
               authAppId: config.authAppId,
               authAppSecret: config.authAppSecret,
           };
           const authRsp = await axios.post(url + '/auth/', JSON.stringify(params), {
               headers: {
                   'Content-Type': 'application/json;charset=UTF-8'
               }
           })
           if (authRsp.data.errcode) {
               console.log(authRsp);
               const auth = authRsp.data.auth,
                   token = [['token',auth.token],['exp',auth.expireDate]]
               const rsp = await AsyncStorage.multiSet(token);
               console.log("save")

               typeof cb == "function" & cb(authRsp.data.auth.token);
           }


       }
   }catch (err){
   	console.log(err)
   }
}

export default {
	//获取token;
	getToken (params) {
		return new Promise((resolve,reject) => {
			getToken( token => {
				resolve(store.state.currentCity.token);
			});
		});
	},
	//获取用户信息；
	//获取省市编码；
	setCrmCode (params) {

		console.log("Call")
    	return new Promise((resolve,reject) => {
    		getToken( token => {
    			// console.log('城市编码参数：' , params)
				console.log("token",token)
    			axios.post(`${url}/getCrmAreaDict`, qs.stringify(params), {
    				headers: {
    	            	'Content-Type': 'application/x-www-form-urlencoded',
    	            	'Authorization': 'Bearer ' + token
    	        	}
    			}).then(res => {
    				resolve(res); //这里调resolve方法，则then方法会被调用
    			})
					.catch(err=>{
						reject(err)
					});
    		});
    	});
	},
	//是否开通扫码购
	isCityOpen (params) {
    	params["sourceType"] = 3;
    	return new Promise((resolve,reject) => {
    		getToken( token => {
    			axios.post(`${url}/index/isCityOpen`, qs.stringify({
						provinceCode: "610103",
						cityCode: "029"
					}), {
    				headers: {
    	            	'Content-Type': 'application/x-www-form-urlencoded',
    	            	'Authorization': 'Bearer ' + token
    	        	}
    			}).then(res => {
    				resolve(res); //这里调resolve方法，则then方法会被调用
    			});
    		});
    	});
	},
	//获取首页轮播图和导航列表；
	getBannerAndNav (params) {
		params["sourceType"] = 3;
		return new Promise((resolve,reject) => {
			getToken( token => {
				axios.post(`${url}/index/getBannerAndNav`, JSON.stringify(params), {
					headers: {
		            	'Content-Type': 'application/json;charset=UTF-8',
		            	'Authorization': 'Bearer ' + token
		        	}
				}).then(res => {
					resolve(res); //这里调resolve方法，则then方法会被调用
				});
			});
		})
	},
	//查询热销推荐商品列表；
	hotProducts (params) {
		params["sourceType"] = 3;
		return new Promise((resolve,reject) => {
			getToken( token => {
				axios.post(`${url}/index/getSaleRecommand`, qs.stringify(params), {
					headers: {
		            	'Content-Type': 'application/x-www-form-urlencoded',
		            	'Authorization': 'Bearer ' + token
		        	}
				}).then(res => {
					resolve(res); //这里调resolve方法，则then方法会被调用
				});
			});
		});
	},
	//关键词查询商品;
	queryGoodsByKeyWord (params) {
		params["sourceType"] = 3;
		return new Promise((resolve,reject) => {
			getToken( token => {
				axios.post(`${url}/goods/queryGoodsByKeyWord`, qs.stringify(params), {
					headers: {
		            	'Content-Type': 'application/x-www-form-urlencoded',
		            	'Authorization': 'Bearer ' + token
		        	}
				}).then(res => {
					resolve(res); //这里调resolve方法，则then方法会被调用
				});
			});
		});
	},
	//查询商品列表 ;
	queryGoodsList (params) {
		params["sourceType"] = 3;
		return new Promise((resolve,reject) => {
			getToken( token => {
				axios.post(`${url}/goods/queryGoodsList`, qs.stringify(params), {
					headers: {
		            	'Content-Type': 'application/x-www-form-urlencoded',
		            	'Authorization': 'Bearer ' + token
		        	}
				}).then(res => {
					resolve(res); //这里调resolve方法，则then方法会被调用
				});
			});
		});
	},
	//搜索条件显示；
	queryConditionList (params) {
		params["sourceType"] = 3;
		return new Promise((resolve,reject) => {
			getToken( token => {
				axios.post(`${url}/goods/queryConditionList`, qs.stringify(params), {
					headers: {
		            	'Content-Type': 'application/x-www-form-urlencoded',
		            	'Authorization': 'Bearer ' + token
		        	}
				}).then(res => {
					resolve(res); //这里调resolve方法，则then方法会被调用
				});
			});
		});
	},
	//搜索列表+热门搜索；
	getHotWord (params) {
		params["sourceType"] = 3;
		return new Promise((resolve,reject) => {
			getToken( token => {
				axios.post(`${url}/goods/getHotWord`, qs.stringify(params), {
					headers: {
		            	'Content-Type': 'application/x-www-form-urlencoded',
		            	'Authorization': 'Bearer ' + token
		        	}
				}).then(res => {
					resolve(res); //这里调resolve方法，则then方法会被调用
				});
			});
		});
	},
	//商品收藏；
	collectGoods (params) {
		params["sourceType"] = 3;
		return new Promise((resolve,reject) => {
			getToken( token => {
				axios.post(`${url}/goods/collectGoods`, qs.stringify(params), {
					headers: {
		            	'Content-Type': 'application/x-www-form-urlencoded',
		            	'Authorization': 'Bearer ' + token
		        	}
				}).then(res => {
					resolve(res); //这里调resolve方法，则then方法会被调用
				});
			});
		});
	},
	//商品详情;
	queryGoodsDetail (params) {
		params["sourceType"] = 3;
		return new Promise((resolve,reject) => {
			getToken( token => {
				axios.post(`${url}/goods/queryGoodsDetail`, qs.stringify(params), {
					headers: {
		            	'Content-Type': 'application/x-www-form-urlencoded',
		            	'Authorization': 'Bearer ' + token
		        	}
				}).then(res => {
					resolve(res); //这里调resolve方法，则then方法会被调用
				});
			});
		});
	},
	//提交订单；
	commitOrder (params) {
		params["sourceType"] = 3;
		return new Promise((resolve,reject) => {
			getToken( token => {
				// console.log(JSON.stringify(params))
				axios.post(`${url}/order/commitOrder`, JSON.stringify(params), {
					headers: {
		            	'Content-Type': 'application/json;charset=UTF-8',
		            	'Authorization': 'Bearer ' + token
		        	}
				}).then(res => {
					// console.log(res)
					resolve(res); //这里调resolve方法，则then方法会被调用
				});
			});
		});
	},
	//订单或者分期支付 ；
	payment (params) {
		params["sourceType"] = 3;
		return new Promise((resolve,reject) => {
			getToken( token => {
				// console.log(JSON.stringify(params))
				axios.post(`${url}/allinpay/payment`, JSON.stringify(params), {
					headers: {
		            	'Content-Type': 'application/json;charset=UTF-8',
		            	'Authorization': 'Bearer ' + token
		        	}
				}).then(res => {
					// console.log(res)
					resolve(res); //这里调resolve方法，则then方法会被调用
				});
			});
		});
	},
	//营业员受理订单查询；
	orderList (params) {
		params["sourceType"] = 3;
		return new Promise((resolve,reject) => {
			getToken( token => {
				axios.post(`${url}/staff/orderList`, JSON.stringify(params), {
					headers: {
		            	'Content-Type': 'application/json;charset=UTF-8',
		            	'Authorization': 'Bearer ' + token
		        	}
				}).then(res => {
					resolve(res); //这里调resolve方法，则then方法会被调用
				}, err => {
					// console.log(err)
				});
			});
		});
	},
	//我的订单查询；
	myOrderList (params) {
		params["sourceType"] = 3;
		return new Promise((resolve,reject) => {
			getToken( token => {
				axios.post(`${url}/mine/myOrderList`, JSON.stringify(params), {
					headers: {
		            	'Content-Type': 'application/json;charset=UTF-8',
		            	'Authorization': 'Bearer ' + token
		        	}
				}).then(res => {
					resolve(res); //这里调resolve方法，则then方法会被调用
				}, err => {
					// console.log(err)
				});
			});
		});
	},
	//我的订单详情查询；
	queryOrderDetail (params) {
		params["sourceType"] = 3;
		return new Promise((resolve,reject) => {
			getToken( token => {
				axios.post(`${url}/order/queryOrderDetail`, JSON.stringify(params), {
					headers: {
		            	'Content-Type': 'application/json;charset=UTF-8',
		            	'Authorization': 'Bearer ' + token
		        	}
				}).then(res => {
					resolve(res); //这里调resolve方法，则then方法会被调用
				}, err => {
					// console.log(err)
				});
			});
		});
	},
	//营业员订单详情查询；staffOrderDetail
	staffOrderDetail (params) {
		params["sourceType"] = 3;
		return new Promise((resolve,reject) => {
			getToken( token => {
				axios.post(`${url}/order/staffOrderDetail`, JSON.stringify(params), {
					headers: {
		            	'Content-Type': 'application/json;charset=UTF-8',
		            	'Authorization': 'Bearer ' + token
		        	}
				}).then(res => {
					resolve(res); //这里调resolve方法，则then方法会被调用
				}, err => {
					// console.log(err)
				});
			});
		});
	},
	//我的分期查询；
	myStageList (params) {
		params["sourceType"] = 3;
		return new Promise((resolve,reject) => {
			getToken( token => {
				axios.post(`${url}/mine/myStageList`, JSON.stringify(params), {
					headers: {
		            	'Content-Type': 'application/json;charset=UTF-8',
		            	'Authorization': 'Bearer ' + token
		        	}
				}).then(res => {
					resolve(res); //这里调resolve方法，则then方法会被调用
				}, err => {
					// console.log(err)
				});
			});
		});
	},
	/*发现模块接口*/
	findItemList (params) {
    	params["sourceType"] = 3;
    	return new Promise((resolve,reject) => {
    		getToken( token => {
    			axios.post(`${url}/find/findItemList`, JSON.stringify(params), {
    				headers: {
    	            	'Content-Type': 'application/json;charset=UTF-8',
    	            	'Authorization': 'Bearer ' + token
    	        	}
    			}).then(res => {
    				resolve(res); //这里调resolve方法，则then方法会被调用
    			});
    		});
    	});
	},
	findItemDetail(params) {
    	params["sourceType"] = 3;
    	return new Promise((resolve,reject) => {
    		getToken( token => {
    			axios.post(`${url}/find/findItemDetail`, JSON.stringify(params), {
    				headers: {
    	            	'Content-Type': 'application/json;charset=UTF-8',
    	            	'Authorization': 'Bearer ' + token
    	        	}
    			}).then(res => {
    				resolve(res); //这里调resolve方法，则then方法会被调用
    			});
    		});
    	});
	},

	//获取当前用户详细情况；
	getUserInfo (params) {
    	params["sourceType"] = 3;
    	return new Promise((resolve,reject) => {
    		getToken( token => {
    			// console.log('用户信息查询参数：' , params)

    			axios.post(`${url}/mine/index`, JSON.stringify(params), {
    				headers: {
    	            	'Content-Type': 'application/json;charset=UTF-8',
    	            	'Authorization': 'Bearer ' + token
    	        	}
    			}).then(res => {
    				resolve(res); //这里调resolve方法，则then方法会被调用
    			});
    		});
    	});
	},
	//绑定手机发送短信接口；
	sendMsg (params) {
    	params["sourceType"] = 3;
    	return new Promise((resolve,reject) => {
    		getToken( token => {
    			axios.post(`${url}/msg/sendMsg`, JSON.stringify(params), {
    				headers: {
    	            	'Content-Type': 'application/json;charset=UTF-8',
    	            	'Authorization': 'Bearer ' + token
    	        	}
    			}).then(res => {
    				resolve(res); //这里调resolve方法，则then方法会被调用
    			}).catch(err=>reject(err));
    		});
    	});
	},
	//绑定用户；
	bindUser (params) {
    	params["sourceType"] = 3;
    	return new Promise((resolve,reject) => {
    		getToken( token => {
    			axios.post(`${url}/user/bindUser`, JSON.stringify(params), {
    				headers: {
    	            	'Content-Type': 'application/json;charset=UTF-8',
    	            	'Authorization': 'Bearer ' + token
    	        	}
    			}).then(res => {
    				resolve(res); //这里调resolve方法，则then方法会被调用
    			});
    		});
    	});
	},
	//解除手机绑定；
	unbindUser (params) {
    	params["sourceType"] = 3;
    	return new Promise((resolve,reject) => {
    		getToken( token => {
    			axios.post(`${url}/user/unbindUser`, JSON.stringify(params), {
    				headers: {
    	            	'Content-Type': 'application/json;charset=UTF-8',
    	            	'Authorization': 'Bearer ' + token
    	        	}
    			}).then(res => {
    				resolve(res); //这里调resolve方法，则then方法会被调用
    			});
    		});
    	});
	},
	//绑定用户基本信息；
	applyCredit (params) {
    	params["sourceType"] = 3;
    	return new Promise((resolve,reject) => {
    		getToken( token => {
    			axios.post(`${url}/user/applyCredit`, JSON.stringify(params), {
    				headers: {
    	            	'Content-Type': 'application/json;charset=UTF-8',
    	            	'Authorization': 'Bearer ' + token
    	        	}
    			}).then(res => {
    				resolve(res); //这里调resolve方法，则then方法会被调用
    			});
    		});
    	});
	},
	//用户基本信息（学历，驾驶证一类）；
	userInfo (params) {
		params["sourceType"] = 3;
		return new Promise((resolve,reject) => {
			getToken( token => {
				axios.post(`${url}/mine/userInfo`, JSON.stringify(params), {
					headers: {
		            	'Content-Type': 'application/json;charset=UTF-8',
		            	'Authorization': 'Bearer ' + token
		        	}
				}).then(res => {
					resolve(res); //这里调resolve方法，则then方法会被调用
				});
			});
		});
	},
	//查询银行卡信息
	queryMyBank (params){
		params["sourceType"] = 3;
		return new Promise((resolve,reject) => {
			getToken( token => {
				axios.post(`${url}/pay/query`, JSON.stringify(params), {
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Authorization': 'Bearer ' + token
					}
				}).then(res => {
					resolve(res); //这里调resolve方法，则then方法会被调用
				});
			});
		});
	},

	//获取银行绑定验证码
	applyBindCardCode (params){
		params["sourceType"] = 3;
		return new Promise((resolve,reject) => {
			getToken( token => {
				axios.post(`${url}/allinpay/signMsg`, JSON.stringify(params), {
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Authorization': 'Bearer ' + token
					}
				}).then(res => {
					resolve(res); //这里调resolve方法，则then方法会被调用
				});
			});
		});
	},

	//申请绑定银行卡
	applyBindCard (params){
		params["sourceType"] = 3;
		return new Promise((resolve,reject) => {
			getToken( token => {
				axios.post(`${url}/allinpay/sign`, JSON.stringify(params), {
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Authorization': 'Bearer ' + token
					}
				}).then(res => {
					resolve(res); //这里调resolve方法，则then方法会被调用
				});
			});
		});
	},

	//解除绑定银行卡
	unbindBankCard (params){
		params["sourceType"] = 3;
		return new Promise((resolve,reject) => {
			getToken( token => {
				axios.post(`${url}/allinpay/unsign`, JSON.stringify(params), {
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Authorization': 'Bearer ' + token
					}
				}).then(res => {
					resolve(res); //这里调resolve方法，则then方法会被调用
				});
			});
		});
	},

	//负面记录；
	negativeList (params){
		params["sourceType"] = 3;
		return new Promise((resolve,reject) => {
			getToken( token => {
				axios.post(`${url}/mine/negativeList`, JSON.stringify(params), {
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Authorization': 'Bearer ' + token
					}
				}).then(res => {
					resolve(res); //这里调resolve方法，则then方法会被调用
				});
			});
		});
	},

	//负面记录；
	creditList (params){
		params["sourceType"] = 3;
		return new Promise((resolve,reject) => {
			getToken( token => {
				axios.post(`${url}/mine/creditList`, JSON.stringify(params), {
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Authorization': 'Bearer ' + token
					}
				}).then(res => {
					resolve(res); //这里调resolve方法，则then方法会被调用
				});
			});
		});
	},

	//我的收藏
	myCollect (params){
		params["sourceType"] = 3;
		return new Promise((resolve,reject) => {
			getToken( token => {
				axios.post(`${url}/mine/myCollect`, JSON.stringify(params), {
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Authorization': 'Bearer ' + token
					}
				}).then(res => {
					resolve(res); //这里调resolve方法，则then方法会被调用
				});
			});
		});
	},

	//信用历史；
	creditHistory (params){
		params["sourceType"] = 3;
		return new Promise((resolve,reject) => {
			getToken( token => {
				axios.post(`${url}/mine/creditHistory`, JSON.stringify(params), {
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Authorization': 'Bearer ' + token
					}
				}).then(res => {
					resolve(res); //这里调resolve方法，则then方法会被调用
				});
			});
		});
	},

	//调用微信api; 
	getjsApiTickle (params){
		params["sourceType"] = 3;
		return new Promise((resolve,reject) => {
			getToken( token => {
				axios.post(`${url}/wechat/jsapi/getSignPackage`, qs.stringify(params), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Authorization': 'Bearer ' + token
					}
				}).then(res => {
					resolve(res); //这里调resolve方法，则then方法会被调用
				});
			});
		});
	},
	// 坐标转换
	AmapConvert(lat, lon) {
	  return axios.get(`https://restapi.amap.com/v3/assistant/coordinate/convert?key=${amapKey}&locations=${lon},${lat}&output=json&coordsys=gps`);
	},
	// 逆编码
	AmapRegeo(lat, lon) {
	  return axios.get(`https://restapi.amap.com/v3/geocode/regeo?key=${amapKey}&location=${lon},${lat}&output=json`);
	},
	//授权接口；
	oAuth2 () {
		return new Promise((resolve,reject) => {
			getToken( token => {
				axios.post(`${url}/wechat/api/auth`, '', {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Authorization': 'Bearer ' + token
					}
				}).then(res => {
					resolve(res); //这里调resolve方法，则then方法会被调用
					window.location.href = res.data.oAuth2Url;
				});
			});
		});
	},
	//利用code获取用户信息；
	authBack (params) {
		params["sourceType"] = 3;
		return new Promise((resolve,reject) => {
			getToken( token => {
				axios.post(`${url}/wechat/api/authBack`, qs.stringify(params), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Authorization': 'Bearer ' + token
					}
				}).then(res => {
					resolve(res); //这里调resolve方法，则then方法会被调用
				});
			});
		});
	},

	appLogin(params){
        params['sourceType'] = 3
		return new Promise((resolve,reject)=>{
			getToken(token=>{
				axios.post(`${url}/app/login`,JSON.stringify(params),{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization': 'Bearer ' + token
                    }
                }).then(res=>resolve(res))
					.catch(err=>reject(err))
			})
		})
    },

	appCheckSMSCode(params){
		params['sourceType'] = 3
		return new Promise((resolve,reject)=>{
			getToken(token=>{
				axios.post(`${url}/app/checkVerifyCode`,JSON.stringify(params),{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization': 'Bearer ' + token
                    }
                }).then(res=>{
                    resolve(res)
                })
                    .catch(err=>reject(err))
			})
		})
	},

    appModifyPSW(params){
        params['sourceType'] = 3
        return new Promise((resolve,reject)=>{
            getToken(token=>{
                axios.post(`${url}/app/modifyPassword`,JSON.stringify(params),{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization': 'Bearer ' + token
                    }
                }).then(res=>{
                    resolve(res)
                })
                    .catch(err=>reject(err))
            })
        })
    },

	registerAndBind(params){
		params['sourceType'] = 3
		return new Promise((resolve,reject)=>{
			getToken(token=>{
				axios.post(`${url}/app/registerAndBind`,JSON.stringify(params),{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization': 'Bearer ' + token
                    }
                })
					.then(res=>{
						resolve(res)
					})
			})
		})
	},

	//用户登记，获取userId；
	registerUser (params) {
		params["sourceType"] = 3;
		return new Promise((resolve,reject) => {
			getToken( token => {
				axios.post(`${url}/user/registerUser`, JSON.stringify(params), {
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Authorization': 'Bearer ' + token
					}
				}).then(res => {
					resolve(res); //这里调resolve方法，则then方法会被调用
				});
			});
		});
	},

	//上传图片接口
	uploadImg (params){
		params["sourceType"] = 3;
		return new Promise((resolve,reject) => {
			getToken( token => {
				axios.post(`${url}/wechat/image/getImagePath`, qs.stringify(params), {
					headers :{
						'Content-Type': 'application/x-www-form-urlencoded',
						'Authorization': 'Bearer ' + token
					}
				}).then(res => {
					resolve(res);
				});
			});
		});
	},


	//营业员提交订单接口
	staffCommitOrder (params){
		params["sourceType"] = 3;
		return new Promise((resolve,reject) => {
			getToken( token => {
				axios.post(`${url}/order/staffCommitOrder`, JSON.stringify(params), {
					headers :{
						'Content-Type': 'application/json;charset=UTF-8',
						'Authorization': 'Bearer ' + token
					}
				}).then(res => {
					resolve(res);
				});
			});
		});
	},
	HTTP_IMG: 'https://mobile2.lychee-info.cn/cps-rest/showImg?fileName='

	//营业员提交订单接口
	// HTTP_IMG (params) {
	// 	params["sourceType"] = 3;
	// 	return new Promise((resolve, reject) => {
	// 		getToken(token => {
	// 			axios.get(`https://mobile2.lychee-info.cn/showImg?fileName=${params}`, {
	// 				headers: {
	// 					'Content-Type': 'application/json;charset=UTF-8',
	// 					'Authorization': 'Bearer ' + token
	// 				}
	// 			}).then(res => {
	// 				resolve(res);
	// 			});
	// 		});
	// 	});
	// }

}