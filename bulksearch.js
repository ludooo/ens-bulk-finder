const ENS = require('ethereum-ens');
const Web3 = require('web3');
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));

const INFURA_APIKEY = ''; // Put your Infura API Key (https://infura.io)
const provider = new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${INFURA_APIKEY}`);
const ens = new ENS(provider);

// Read txt file
let addresses = fs.readFileSync(argv['file']).toString();
if (argv['file'].indexOf('.json') !== -1) {
	addresses = JSON.parse(addresses);
} else {
	addresses = addresses.split("\n");
}

addresses.forEach((address, index) => addresses[index] = address.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Za-z0-9]/gi, '').toLowerCase());
addresses = addresses.filter(address => !!address && address.length > 2).reduce((a,b) => {if(a.indexOf(b)<0)a.push(b);return a;},[]);

// Reset output file
if (!argv['index']) {
	fs.writeFile(argv['out'] || 'results.txt', "", function(err) {
		if(err) {
			return console.log(err);
		}
	});
}

let isAddressAvailable = (name, callback) => {
	ens.owner(`${name}.eth`).then(addr => callback(addr == '0x0000000000000000000000000000000000000000'));
}

let results = [];

let bulkSearch = (index, callback) => {
	const address = addresses[index];
	if (!address) {
		return callback();
	}
	isAddressAvailable(address, isAvailable => {
		console.log(`${index+1}/${addresses.length} :: ${address}.eth`)
		results.push({
			address: address,
			available: isAvailable
		});
		if (isAvailable) {
			fs.appendFile(argv['out'] || 'results.txt', address + "\n", function(err) {
				if(err) {
					return console.log(err);
				}
			});
		}
		bulkSearch(++index, callback);
	});
};
bulkSearch(argv['index'] || 0, () => {
	console.log('Search is done!');
});
