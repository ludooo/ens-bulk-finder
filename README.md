
# ENS Domain Bulk Search

#### Lightweight Node script to find availability of a big list of ENS domains (Ethereum Name Service). Do you want to find all available first names, company names, countries, cities or whatever that you want to re-sell on [https://opensea.io](https://opensea.io)? Will you find your gem?

## How to use it?

First, indicate your Infura API Key in `bulksearch.js` file. It's free and you can get one there: [https://infura.io](https://infura.io/).

```bash
npm install

node bulksearch.js --file domainlist.txt --out results.txt
```
Here, `domainlist.txt` contains a list of our domains without the `.eth` extension:

```Aaren
Aarika
Abagael
Abagail
Abbe
Abbey
Abbi
[...]
```

The script will output the available domains in `results.txt`. Sometimes, domains are marked as available but there aren't, so test them manually on [app.ens.domains](https://app.ens.domains) afterwards.

You can also input a JSON file `["Aarika", "Abagael", "Abagail", ...]` with a `.json` extension.

`--index` parameter can be used to start the script to a specific line in your input file, it can be useful for BIG file testing.

## Contributing
Pull requests are welcome.