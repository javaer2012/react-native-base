setCrmCode (params) {
    	return new Promise((resolve,reject) => {
    		getToken( token => {
    			// console.log('城市编码参数：' , params)
    			axios.post(`${url}/getCrmAreaDict`, qs.stringify(params), {
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