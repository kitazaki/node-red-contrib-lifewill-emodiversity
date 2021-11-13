module.exports = function(RED) {
	const axiosBase = require('axios');
	function Emodiversity(config) {
		RED.nodes.createNode(this,config);
		var node = this;
		var token = config.token;
		// console.log("Access Token: " + token);
		const axios = axiosBase.create({
			baseURL: `https://lab.lifull.com`,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'token': `${token}`
			}
		});

		node.on('input', async function(msg) {
			const mes = msg.payload;
			try {
				const res = await axios.post(`/lifewill/api/v1/emotion-analyze`, encodeURI("text=`${mes}`"));
		                msg.payload = res.data;
            			node.send(msg);
			} catch (error) {
				console.log(error);
			}
        	});
    	}
	RED.nodes.registerType('emotion_analyze', Emodiversity);
}
