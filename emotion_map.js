module.exports = function(RED) {
	const axiosBase = require('axios');
	function Emodiversity(config) {
		RED.nodes.createNode(this,config);
		var node = this;
		var token = config.token;
		var year = config.year;
		var month = config.month;
		// console.log("Access Token: " + token);
		const axios = axiosBase.create({
			baseURL: `https://lab.lifull.com`,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'token': `${token}`
			}
		});

		node.on('input', async function(msg) {
			// const mes = msg.payload;
			try {
				if (year) {
				  if (month) {
				    const res = await axios.post(`/lifewill/api/v1/emotion-map`, encodeURI("year=`${year}`&month=`${month}`"));
				  }
				} else {
				  const res = await axios.post(`/lifewill/api/v1/emotion-map`);
				}
		                msg.payload = res.data;
            			node.send(msg);
			} catch (error) {
				console.log(error);
			}
        	});
    	}
	RED.nodes.registerType('emotion_map', Emodiversity);
}
