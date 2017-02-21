const mongoose = require('mongoose');


const poeSchema = new mongoose.Schema({
	type: {
		type: String,
		required: true
	},

	meta: {
		type: String,
		required: true
	},

	createdOn: {
		type: Date,
		"default": Date.now
	},

	ownerAccount: {
		type: String,
		required: true
	},

	ownerPK: {
		type: String,
		required: true
	},

	txHash: {
		type: String,
		required: true
	}, 

	blockNumber: {
		type: Number
	},

	link: {
		type: String
	},

	timestamp: {
		type: Date
	}
})


module.exports = mongoose.model('poe', poeSchema);