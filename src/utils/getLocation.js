getLocation (cb) {
				// console.log('��λ��ʼ��')
				var city;
				wx.getLocation().then(res => {
				    // console.log('��γ��',res);
				    var lat = res.latitude;
				    var lon = res.longitude;
				    // alert(lat + '\/n' + lon)
				    api.AmapRegeo(lat, lon).then( response => {
					    if(response.data.infocode == '10000') {
					        city = response.data.regeocode.addressComponent.city;
					        city = city.substring(0, city.length - 1);
					        // console.log('�������У�' , city);
					        //��ȡʡ�ͳ��б��룻
					        var code = cityObj.localCodeInfo(city);
					        // console.log('��ǰ���б��룺', code);
					       
					        api.setCrmCode(code).then(res=>{
					          	var areaDict = res.data.areaDict;
						        for (var key in areaDict) {
							        if(key == code) {
										// console.log('��ѯcrm:' + key);
										var option = {};
										option["city"] = city;
										option["provinceCode"] = areaDict[key].crmProvCode;
										option["cityCode"] = areaDict[key].crmCityCode;

										//�Ƿ�ͨɨ�빺;
										var params = {};
										params["provinceCode"] = areaDict[key].crmProvCode;
										params["cityCode"] = areaDict[key].crmCityCode;
										params["openId"] = this.$store.state.currentCity.openId;
										// console.log('���б���: ' , params)
										api.isCityOpen(params).then( response => {
											// console.log(response);
											if(response.data.errcode == 1) {
											  	this.$store.state.currentCity.isCityOpen = response.data.isOpen;
											  	// if(city != this.$store.state.currentCity.city.city){
											  	// 	this.$router.push({name: 'refresh'});
											  	// }
											  	this.$store.state.currentCity.city = option;
											  	//����loading;
											  	this.$store.state.currentCity.showLoading = false;
											  	// console.log('���ó��е����� ��',this.$store.state.currentCity.city, option);
											  	// console.log('�Ƿ�ͨɨ�빺:' + response.data.isOpen)
											  	typeof cb == 'function' && cb( city ); 

											} else {
											  // console.log(response.data.errmsg);
											}
										}).catch( err => {
											// console.log('������Ϣ��', err);
										})
							        }
						        }
					        })
					    }
					})
				}).catch(errmsg => {
					// console.log('��λʧ��')
					this.$message({
						message: errmsg,
						tpye: 'warning'
					});
					typeof cb == 'function' && cb( '' ); 
				});
}