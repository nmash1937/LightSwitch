export interface LightSwitch {
    powerOn: () => {},
    powerOff: () => {},
    toggle: () => {}
    [propName: string]: any;
}

export interface Properties {
    get: (prop: string) => {};
}

export interface StockResponse {
    data: {
        price: DoubleRange
    },
    [propName: string]: any;
}