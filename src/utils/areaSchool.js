import { AsyncStorage } from 'react-native'
const cityObj = [{ "id": "00", "province": "安徽省", "initial": "A" },
{ "id": "01", "province": "澳门特别行政区", "initial": "A" },

{ "id": "02", "province": "北京", "initial": "B" },

{ "id": "03", "province": "重庆", "initial": "C" },

{ "id": "04", "province": "福建", "initial": "F" },

{ "id": "05", "province": "甘肃省","initial": "G" },
{ "id": "06", "province": "广东省", "initial": "G" },
{ "id": "07", "province": "广西壮族自治区", "initial": "G" },
{ "id": "08", "province": "贵州省", "initial": "G" },

{ "id": "09", "province": "海南省", "initial": "H" },
{ "id": "10", "province": "河北省", "initial": "H" },
{ "id": "11", "province": "河南省", "initial": "H" },
{ "id": "12", "province": "黑龙江省", "initial": "H" },
{ "id": "13", "province": "湖北省", "initial": "H" },
{ "id": "14", "province": "湖南省", "initial": "H" },

{ "id": "15", "province": "吉林省", "initial": "J" },
{ "id": "16", "province": "江苏省", "initial": "J" },
{ "id": "17", "province": "江西省", "initial": "J" },

{ "id": "18", "province": "辽宁省", "initial": "L" },

{ "id": "19", "province": "内蒙古自治区",  "initial": "N" },
{ "id": "20", "province": "宁夏回族自治区", "initial": "N" },

{ "id": "21", "province": "青海省", "initial": "Q" },

{ "id": "22", "province": "山东省","initial": "S" },
{ "id": "23", "province": "山西省", "initial": "S" },
{ "id": "24", "province": "陕西省", "initial": "S" },
{ "id": "25", "province": "上海", "initial": "S" },
{ "id": "26", "province": "四川省", "initial": "S" },

{ "id": "27", "province": "台湾省", "initial": "T" },
{ "id": "28", "province": "天津", "initial": "T"},

{ "id": "29", "province": "西藏自治区","initial": "X"},
{ "id": "30", "province": "香港特别行政区", "initial": "X"},
{ "id": "31", "province": "新疆维吾尔自治区", "initial": "X"},

{ "id": "32", "province": "云南省", "initial": "Y"},

{ "id": "33", "province": "浙江省", "initial": "Z"}
]

const areaObjs = [{ "id": "00", "province": "安徽省", "initial": "A", "short": "anhuisheng", "shorter": "ahs"},
{ "id": "01", "province": "澳门特别行政区", "initial": "A", "short": "aomentebiexingzhengqu", "shorter": "amtbxzq"},

{ "id": "02", "province": "北京", "initial": "B", "short": "beijing", "shorter": "bj"},

{ "id": "03", "province": "重庆", "initial": "C","short": "chongqing", "shorter": "cq"},

{ "id": "04", "province": "福建", "initial": "F", "short": "fujian", "shorter": "fj"},

{ "id": "05", "province": "甘肃省", "initial": "G", "short": "gansusheng", "shorter": "gss"},
{ "id": "06", "province": "广东省", "initial": "G", "short": "guangdongsheng", "shorter": "gds"},
{ "id": "07", "province": "广西壮族自治区", "initial": "G", "short": "guangxizhuangzuzizhiqu", "shorter": "gxzzzzq"},
{ "id": "08", "province": "贵州省", "initial": "G", "short": "guizhousheng", "shorter": "gzs"},

{ "id": "09", "province": "海南省", "initial": "H", "short": "hainansheng", "shorter": "hns"},
{ "id": "10", "province": "河北省", "initial": "H", "short": "hebeisheng", "shorter": "hbs"},
{ "id": "11", "province": "河南省", "initial": "H", "short": "henansheng", "shorter": "hns"},
{ "id": "12", "province": "黑龙江省", "initial": "H", "short": "heilongjiangsheng", "shorter": "hljs"},
{ "id": "13", "province": "湖北省", "initial": "H", "short": "hubeisheng", "shorter": "hbs"},
{ "id": "14", "province": "湖南省", "initial": "H", "short": "hunansheng", "shorter": "hns"},

{ "id": "15", "province": "吉林省", "initial": "J", "short": "jilinsheng", "shorter": "jls"},
{ "id": "16", "province": "江苏省", "initial": "J", "short": "jiangsusheng", "shorter": "jss"},
{ "id": "17", "province": "江西省", "initial": "J", "short": "jiangxisheng", "shorter": "jxs"},

{ "id": "18", "province": "辽宁省", "initial": "L", "short": "liaoningsheng", "shorter": "lns"},

{ "id": "19", "province": "内蒙古自治区", "initial": "N", "short": "namengguzizhiqu", "shorter": "nmgzzq"},
{ "id": "20", "province": "宁夏回族自治区", "initial": "N", "short": "ningxiahuizuzizhiqu", "shorter": "nxhzzzq"},

{ "id": "21", "province": "青海省", "initial": "Q", "short": "qinghaisheng", "shorter": "qhs"},

{ "id": "22", "province": "山东省", "initial": "S", "short": "shandongsheng", "shorter": "sds"},
{ "id": "23", "province": "山西省", "initial": "S", "short": "shanxisheng", "shorter": "sxs"},
{ "id": "24", "province": "陕西省", "initial": "S", "short": "shanxisheng", "shorter": "sxs"},
{ "id": "25", "province": "上海", "initial": "S", "short": "shanghai", "shorter": "sh"},
{ "id": "26", "province": "四川省", "initial": "S", "short": "sichuansheng", "shorter": "scs"},

{ "id": "27", "province": "台湾省", "initial": "T", "short": "taiwansheng", "shorter": "tws" },
{ "id": "28", "province": "天津", "initial": "T", "short": "tianjin", "shorter": "tj" },

{ "id": "29", "province": "西藏自治区", "initial": "X", "short": "xizangzizhiqu", "shorter": "xzzzq" },
{ "id": "30", "province": "香港特别行政区", "initial": "X", "short": "xianggangtebiexingzhengqu", "shorter": "xgtbxzq"},
{ "id": "31", "province": "新疆维吾尔自治区", "initial": "X", "short": "xinjiangweiwuerzizhiqu", "shorter": "xjwwezzq" },

{ "id": "32", "province": "云南省", "initial": "Y", "short": "yunnansheng", "shorter": "yns"},

{ "id": "33", "province": "浙江省", "initial": "Z", "short": "zhejiangsheng", "shorter": "zjs"}
]

//地区检索的首字母
var searchLetter = ["A", "B", "C",  "F", "G", "H", "J", "L", "N", "Q","S", "T", "X", "Y", "Z"]

// function searchLetter() {
//     return searchLetter;
// }

//对地区信息进行分组
function areaList() {
    let tempArr = [];

    searchLetter.map(
        initial => {
            let tempObj = {};
            let areaInfo = [];

            tempObj.initial = initial;
            tempObj.areaInfo = cityObj.filter(
                city => city.initial == initial
            );

            tempArr.push(tempObj);
        }
    );

    // console.log('地区信息：',JSON.stringify(tempArr));
    return tempArr;
}

function pushCity() {

}
//保存地区信息到缓存  //{"id":"03","province":"重庆"}
async function  setAreaInfo(area,cb){
    for (var i = 0; i < cityObj.length;i++){
        if(cityObj[i].province == area){
            try{
                var data={};
                data["id"]=cityObj[i].id;
                data["province"]=cityObj[i].province;
                wx.setStorageSync('areaInfo', data);
                await AsyncStorage.setItem('areaInfo')
                typeof cb ==="function" && cb();
                
            }catch(e){
                console.log(e);
            }
            break;
        }
    }
}

module.exports = {
    searchLetter: searchLetter,
    areaList: areaList,
    areaObjs: areaObjs,
    setAreaInfo: setAreaInfo,
    cityObj,
}
