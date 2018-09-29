
// 提交订单：
// 可用商品Id: 201807191523324900507633
// 上行参数：
// activeId: "524eaa42bfec4d00b77f50d56fd82fe5"
// capitalInfoJson: "{"prodId":"87f667ff3f274fd1918885c966169c0d"}"
// goodsInfoJson: "{"goodsFirstAmount":0,"totalStageAmount":0,"monthRate":0.005,"periods":24,"teleFirstAmount":0,"poundgeRate":0,"goodsSkuId":"201809071024544610527721","goodsId":"201807191523324900507633"}"
// insureJson: "[]"
// mealInfoJson: "{"mealId":"201808301508165440336042"}"
// openId: "otp3cjjLq6cQ7oPHIINRef8cFruA"
// paymentId: "201806210950040190225842"
// sourceType: 2
// userInfoJson: "{"userId":"201808241044425400117198","phoneNo":"18316579205","userName":"邓夏宁","idCardNo":"440883199305105071","creditScore":"700","maxAvailAmount":935}"

// json串：
// { "openId": "otp3cjjLq6cQ7oPHIINRef8cFruA", "provinceCode": "844", "cityCode": "84401", "orderType": "1", "userInfoJson": "{\"userId\":\"201808241044425400117198\",\"phoneNo\":\"18316579205\",\"userName\":\"邓夏宁\",\"idCardNo\":\"440883199305105071\",\"creditScore\":\"700\",\"maxAvailAmount\":935}", "goodsInfoJson": "{\"goodsFirstAmount\":0,\"totalStageAmount\":0,\"monthRate\":0.005,\"periods\":24,\"teleFirstAmount\":0,\"poundgeRate\":0,\"goodsSkuId\":\"201809071024544610527721\",\"goodsId\":\"201807191523324900507633\"}", "mealInfoJson": "{\"mealId\":\"201808301508165440336042\"}", "capitalInfoJson": "{\"prodId\":\"87f667ff3f274fd1918885c966169c0d\"}", "insureJson": "[]", "activeId": "524eaa42bfec4d00b77f50d56fd82fe5", "paymentId": "201806210950040190225842", "sourceType": 2 }


// 下行参数：
// { "errcode": 1, "firstPay": 0.0, "orderId": "a089fc9c40584df6b841ad70652acc34", "orderSn": "201809271057298628137973", "errmsg": "订单提交成功！" }



// 可用用户：
// 用户Id：201808241044425400117198 手机号码：18316579205
// 用户Id：201808271514404906372819 手机号码：18520521259


// 可以查看分期的订单：
// orderId = a3f2e9a7546a41498a4483b99da23eaf
// orderId = a3f2e9a7546a41498a4483b99da23eaf
// orderId = 5291ce36a09a444498f345108c0ce2ca


// 支付过程：
// 订单支付：
// 其中，
// orderId为订单的Id（分期和全部还清分别为分期详情的Id和分期的Id），
// phoneNo和validCode根据是否为0元而是否可空）
// { "userId": "201808241044425400117198", "openId": "otp3cjjLq6cQ7oPHIINRef8cFruA", "amount": 0, "orderId": "a089fc9c40584df6b841ad70652acc34", "provCode": "844", "cityCode": "84401", "activeId": "524eaa42bfec4d00b77f50d56fd82fe5", "payType": 1, "phoneNo": "18316579205", "validCode": "", "sourceType": 2 }

// 全部还清支付：
// orderId为分期的Id，
// { "userId": "201808241044425400117198", "openId": "otp3cjjLq6cQ7oPHIINRef8cFruA", "amount": 9016, "orderId": "201809271057298738141383", "provCode": "844", "cityCode": "84401", "activeId": "524eaa42bfec4d00b77f50d56fd82fe5", "payType": 3, "phoneNo": "18316579205", "validCode": "111111", "sourceType": 2 }