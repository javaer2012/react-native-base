setCrmCode (params) {
    	return new Promise((resolve,reject) => {
    		getToken( token => {
    			// console.log('���б��������' , params)
    			axios.post(`${url}/getCrmAreaDict`, qs.stringify(params), {
    				headers: {
    	            	'Content-Type': 'application/x-www-form-urlencoded',
    	            	'Authorization': 'Bearer ' + token
    	        	}
    			}).then(res => {
    				resolve(res); //�����resolve��������then�����ᱻ����
    			});
    		});
    	});
	},