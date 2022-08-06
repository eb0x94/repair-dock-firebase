export class Device {
    constructor(id, type, deviceDetails) {
        this.id = id;
        this.type = type;
        this.deviceDetails = {
            brand: deviceDetails.brand,
            model: deviceDetails.model,
        };
    }
}
