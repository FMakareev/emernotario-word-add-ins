import fetch from 'unfetch';

const jaysonBrowserClient = require('jayson/lib/client/browser');


export interface IKeyKeeperApi {
    client: any,
    getbalance: any,
    signmessage: any,
    name_new: any,
    name_show: any,
}


let callServer = (url: any) => (request: any, callback: any) => {

    let options = {
        method: 'POST',
        // cors: 'cors',
        body: request, // request is a string
        headers: {
            'Content-Type': 'application/json',
        }
    };

    fetch(url, options)
        .then((res: any) => {
            console.log('res res res res: ', res);
            return res.json();
        })
        .then((result: any) => {
            console.log('result: ', result);
            callback(result);
        })
        .catch((error: any) => {
            console.log('error: ', error);
            callback({
                error: error
            });
        });
};

export class KeyKeeperApi implements IKeyKeeperApi {
    client = null;

    constructor(host: string = '/keykeeper') {
        this.client = jaysonBrowserClient(callServer(host));
    }


    getbalance = (account: string = '', minconf: number = 6, include_watchonly: boolean = false) => {
        return new Promise((resolve: any, reject: any) => {
            this.client.request('getbalance', [account, minconf, include_watchonly], (result) => {
                if (result.error) {
                    console.log('getbalance  error: ', result);
                    return reject(result);
                }
                console.log('getbalance  result: ', result);
                return resolve(result);
            });
        });
    };

    /**
     * @desc Sign a message with the private key of an address
     * */
    signmessage(address: string, message: string) {
        return new Promise((resolve: any, reject: any) => {
            this.client.request('signmessage', [address, message], (result) => {
                if (result.error) {
                    console.log('signmessage  error: ', result);
                    return reject(result);
                }
                console.log('signmessage  result: ', result);
                return resolve(result);
            });
        });
    }


    /**
     * @param name - Name to create.
     * @param value - Value to write.
     * @param days - How many days this name will be active (1 day~=175 blocks).
     * @param toaddress -  Address of recipient. Empty string = transaction to yourself.
     * @param valuetype - Interpretation of value string. Can be "hex", "base64" or filepath.
     * @desc Creates new key->value pair which expires after specified number of days.
     * Cost is square root of (1% of last PoW + 1% per year of last PoW).
     */
    name_new(name: string, value: string, days: number, toaddress?: string, valuetype?: string) {
        return new Promise((resolve: any, reject: any) => {
            this.client.request('name_new', [name, value, days, toaddress, valuetype], (result) => {
                if (result.error) {
                    console.log('name_new  error: ', result);
                    return reject(result);
                }
                console.log('name_new result: ', result);
                return resolve(result);
            });
        });
    }

    /**
     * @param name.
     * @desc Show values of a name.
     * */
    name_show(name: string) {
        return new Promise((resolve: any, reject: any) => {
            this.client.request('name_show', [name], (result) => {
                if (result.error) {
                    console.log('name_show  error: ', result);
                    return reject(result);
                }
                console.log('name_show  result: ', result);
                return resolve(result);
            });
        });
    }

}