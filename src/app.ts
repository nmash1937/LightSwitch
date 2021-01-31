const { login } = require("tplink-cloud-api");
const axios = require('axios');

const baseUrl = "https://api.nomics.com/v1/currencies/ticker?key=5a0965044993533a92ccbddb14d9a94f&ids=DOGE&interval=1d,30d&convert=EUR&per-page=100&page=1"

interface LightSwitch {
    deviceType: string,
    deviceId: string,
    [propName: string]: any;
}

interface ResponseObject {
    Ticker:  {

    },
    [propName: string]: any;
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var main = async () => {
    const tplink = await login("nmash1937@me.com", "nesnYv-7vapco-zywkej");
    let deviceList: LightSwitch[] = await tplink.getDeviceList();

    let device;
    device = await tplink.getHS100(deviceList[0].deviceId)

    var price = 0;

    while (true) {
        console.log("trying")
        axios.get(baseUrl)
            .then(response => {
                console.log("response")
                console.log(response.data[0].price);
<<<<<<< HEAD
                if (parseFloat(response.data[0].price) > price) {
                    device.powerOn();
                } else if (parseFloat(response.data[0].price) < price){
=======
                if (parseFloat(response.data[0].price) >= price) {
                    device.powerOn();
                } else {
>>>>>>> 2b5fc5d6bc3ac9ab62245945058d03ef913ae30e
                    device.powerOff();
                }
                price = response.data[0].price;
            })
            .catch(error => {
                console.log(error);
            });
        await delay(10000)
    }
}

main();