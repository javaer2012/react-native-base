
提交订单：
可用商品Id: 201807191523324900507633
上行参数：
activeId: "524eaa42bfec4d00b77f50d56fd82fe5"
capitalInfoJson: "{"prodId":"87f667ff3f274fd1918885c966169c0d"}"
goodsInfoJson: "{"goodsFirstAmount":0,"totalStageAmount":0,"monthRate":0.005,"periods":24,"teleFirstAmount":0,"poundgeRate":0,"goodsSkuId":"201809071024544610527721","goodsId":"201807191523324900507633"}"
insureJson: "[]"
mealInfoJson: "{"mealId":"201808301508165440336042"}"
openId: "otp3cjjLq6cQ7oPHIINRef8cFruA"
paymentId: "201806210950040190225842"
sourceType: 2
userInfoJson: "{"userId":"201808241044425400117198","phoneNo":"18316579205","userName":"邓夏宁","idCardNo":"440883199305105071","creditScore":"700","maxAvailAmount":935}"

json串：
{ "openId": "otp3cjjLq6cQ7oPHIINRef8cFruA", "provinceCode": "844", "cityCode": "84401", "orderType": "1", "userInfoJson": "{\"userId\":\"201808241044425400117198\",\"phoneNo\":\"18316579205\",\"userName\":\"邓夏宁\",\"idCardNo\":\"440883199305105071\",\"creditScore\":\"700\",\"maxAvailAmount\":935}", "goodsInfoJson": "{\"goodsFirstAmount\":0,\"totalStageAmount\":0,\"monthRate\":0.005,\"periods\":24,\"teleFirstAmount\":0,\"poundgeRate\":0,\"goodsSkuId\":\"201809071024544610527721\",\"goodsId\":\"201807191523324900507633\"}", "mealInfoJson": "{\"mealId\":\"201808301508165440336042\"}", "capitalInfoJson": "{\"prodId\":\"87f667ff3f274fd1918885c966169c0d\"}", "insureJson": "[]", "activeId": "524eaa42bfec4d00b77f50d56fd82fe5", "paymentId": "201806210950040190225842", "sourceType": 2 }


下行参数：
{ "errcode": 1, "firstPay": 0.0, "orderId": "a089fc9c40584df6b841ad70652acc34", "orderSn": "201809271057298628137973", "errmsg": "订单提交成功！" }



可用用户：
用户Id：201808241044425400117198 手机号码：18316579205
用户Id：201808271514404906372819 手机号码：18520521259


可以查看分期的订单：
orderId = a3f2e9a7546a41498a4483b99da23eaf
orderId = a3f2e9a7546a41498a4483b99da23eaf
orderId = 5291ce36a09a444498f345108c0ce2ca


支付过程：
订单支付：
其中，
orderId为订单的Id（分期和全部还清分别为分期详情的Id和分期的Id），
phoneNo和validCode根据是否为0元而是否可空）
{ "userId": "201808241044425400117198", "openId": "otp3cjjLq6cQ7oPHIINRef8cFruA", "amount": 0, "orderId": "a089fc9c40584df6b841ad70652acc34", "provCode": "844", "cityCode": "84401", "activeId": "524eaa42bfec4d00b77f50d56fd82fe5", "payType": 1, "phoneNo": "18316579205", "validCode": "", "sourceType": 2 }

全部还清支付：
orderId为分期的Id，
{ "userId": "201808241044425400117198", "openId": "otp3cjjLq6cQ7oPHIINRef8cFruA", "amount": 9016, "orderId": "201809271057298738141383", "provCode": "844", "cityCode": "84401", "activeId": "524eaa42bfec4d00b77f50d56fd82fe5", "payType": 3, "phoneNo": "18316579205", "validCode": "111111", "sourceType": 2 }

///////////////////////////////////////////------------------------>

// 1.提交订单
var options = {};
options["openId"] = this.$store.state.currentCity.openId;
options["provinceCode"] = this.$store.state.currentCity.city.provinceCode;
options["cityCode"] = this.$store.state.currentCity.city.cityCode;
options["orderType"] = this.goodsBaseInfo.category;

var userInfoJson = {};
userInfoJson["userId"] = this.userInfo.userId;
userInfoJson["phoneNo"] = this.userInfo.phoneNo;
userInfoJson["userName"] = this.userInfo.userName;
userInfoJson["idCardNo"] = this.userInfo.idCardNo;
userInfoJson["creditScore"] = this.userInfo.userScore;
userInfoJson["maxAvailAmount"] = this.userInfo.maxAvailAmount;
userInfoJson = JSON.stringify(userInfoJson);
userInfoJson = userInfoJson.toString();
options["userInfoJson"] = userInfoJson;

//商品信息；
var goodsInfoJson = {};
goodsInfoJson["goodsFirstAmount"] = this.realDownPayment;
goodsInfoJson["totalStageAmount"] = this.sum;
goodsInfoJson["monthRate"] = this.capitalSelected.monthFee;
goodsInfoJson["periods"] = this.capitalSelected.periods;
goodsInfoJson["teleFirstAmount"] = this.initPayment;
goodsInfoJson["poundgeRate"] = this.capitalSelected.poundgeRate;
goodsInfoJson["goodsSkuId"] = this.goodsSkuId;
goodsInfoJson["goodsId"] = this.goodsId;
//goodsInfoJson["goodsConfigType"] = thi
goodsInfoJson = JSON.stringify(goodsInfoJson);
goodsInfoJson = goodsInfoJson.toString();
options["goodsInfoJson"] = goodsInfoJson;


var mealInfoJson = {};
mealInfoJson['mealId'] = this.mealId;
mealInfoJson = JSON.stringify(mealInfoJson);
mealInfoJson = mealInfoJson.toString();
options["mealInfoJson"] = mealInfoJson;


var capitalInfoJson = {};
capitalInfoJson["prodId"] = this.capitalSelected.prodId;
capitalInfoJson = JSON.stringify(capitalInfoJson);
capitalInfoJson = capitalInfoJson.toString();
options["capitalInfoJson"] = capitalInfoJson;


var insureJson = [];
insureJson = JSON.stringify(insureJson);
insureJson = insureJson.toString();
options["insureJson"] = insureJson;


options["activeId"] = this.goodsBaseInfo.activeId;
options["paymentId"] = this.paymentInfo.paymentId;


//提交订单；
commitOrder (options) {
	options["sourceType"] = 2;
	return new Promise((resolve,reject) => {
		getToken( token => {
			axios.post(`${url}/order/commitOrder`, JSON.stringify(options), {
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



2.提交个人信息
var token = res.data.auth.token;
var userInfoJson = {};
var subItemList1 = {
	"subItemId":"2bfb9048eaa74e3e844b4ba25fd5e71f",
	"subItemCode":"driver_licence_front",
	"subItemName":"驾驶证正面",
	"subItemOrderNo":"1",
	"subItemValue":"/order/20180925/201809251354149465325654.jpg"
};
var subItemList2 = {
	"subItemId":"ec0e58b24ec94e3687a8b5acb9c4f6b7",
	"subItemCode":"driver_licence_follower",
	"subItemName":"驾驶证附页",
	"subItemOrderNo":"2",
	"subItemValue":"/order/20180925/201809251354173875340965.jpg"
}
var subItemList = [];
subItemList.push(subItemList1);
subItemList.push(subItemList2);
userInfoJson['subItemList'] = subItemList;
userInfoJson['itemId'] = 'dbd4a5983a184bbbaef1935e7d46e245';
userInfoJson['itemCode'] = 'drivingLicence';
var options = {
	"openId":"oVa7_0Fb1HE3BRTtoLBmk5GDGux8",
	"provinceCode":"844",
	"cityCode":"84401",
	"userId":"201808241044425400117198",
	"userInfoJson":JSON.stringify(userInfoJson).toString(),

};
axios({
	method:"post",
	url: 'https://mobile2.lychee-info.cn/cps-rest/mine/submitUserInfo',
	data: JSON.stringify(options),
	dataType:'json',
	headers: {
	    'Content-Type': 'application/json;charset=UTF-8',
	    "Authorization": "Bearer " + token
	}
}).then(res2 => {
	console.log(res2);
});