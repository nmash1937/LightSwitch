var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { login } = require("tplink-cloud-api");
const axios = require('axios');
const baseUrl = "https://api.nomics.com/v1/currencies/ticker?key=5a0965044993533a92ccbddb14d9a94f&ids=DOGE&interval=1d,30d&convert=EUR&per-page=100&page=1";
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
var main = () => __awaiter(this, void 0, void 0, function* () {
    const tplink = yield login("nmash1937@me.com", "nesnYv-7vapco-zywkej");
    let deviceList = yield tplink.getDeviceList();
    let device;
    device = yield tplink.getHS100(deviceList[0].deviceId);
    var price = 0;
    while (true) {
        console.log("trying");
        axios.get(baseUrl)
            .then(response => {
            console.log("response");
            console.log(response.data[0].price);
            if (parseFloat(response.data[0].price) >= price) {
                device.powerOn();
            }
            else {
                device.powerOff();
            }
            price = response.data[0].price;
        })
            .catch(error => {
            console.log(error);
        });
        yield delay(10000);
    }
});
main();
//# sourceMappingURL=app.js.map