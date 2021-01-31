import {  LightSwitch } from "./interfaces/Interfaces";
import { login } from "tplink-cloud-api";
import axios from 'axios';

var propertiesReader = require('properties-reader');
var properties = propertiesReader('application.properties');

const baseUrl = "https://api.nomics.com/v1/currencies/ticker?key=5a0965044993533a92ccbddb14d9a94f&ids=DOGE&interval=1d,30d&convert=EUR&per-page=100&page=1"

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const main = async () => {
    const tplink = await login(properties._properties.username, properties._properties.password);
    let deviceList = await tplink.getDeviceList();

    let device: LightSwitch;
    device = await tplink.getHS100(deviceList[0].deviceId)

    var price = 0;

    while (true) {
        axios.get(baseUrl)
            .then(response=> {
                const stockPrice: number = parseFloat(response.data[0].price);
                console.log("Dogecoin Price:")
                console.log(stockPrice);
                if (stockPrice > price) {
                    console.log("turning on")
                    device.powerOn();
                } else if (stockPrice < price) {
                    console.log("turning off")
                    device.powerOff();
                }
                price = stockPrice;
            })
            .catch(error => {
                console.log(error);
            });
        await delay(10000)
    }
}

main();