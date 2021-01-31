export interface LightSwitch {
    powerOn: () => {},
    powerOff: () => {},
    toggle: () => {}
    [propName: string]: any;
}