// AcebottADC7828.ts
// ADS7828 8-channel 12-bit I2C ADC wrapper

enum Adc7828I2cAddress {
    Address0x48 = 0x48,
    Address0x49 = 0x49,
    Address0x4A = 0x4A,
    Address0x4B = 0x4B
}

class AcebottADC7828 {
    private i2cAddr: number

    constructor(addr?: Adc7828I2cAddress) {
        this.i2cAddr = Adc7828I2cAddress.Address0x48
        if (addr !== undefined) {
            this.i2cAddr = addr
        }
    }

    setAddress(addr: Adc7828I2cAddress): void {
        this.i2cAddr = addr
    }

    readChannel(channel: number): number {
        if (channel < 0) channel = 0
        if (channel > 7) channel = 7

        pins.i2cWriteNumber(this.i2cAddr, this.commandForChannel(channel), NumberFormat.UInt8BE)
        let raw = pins.i2cReadNumber(this.i2cAddr, NumberFormat.UInt16BE)
        return (raw >> 4) & 0x0FFF
    }

    private commandForChannel(channel: number): number {
        let channelSelect = ((channel & 0x01) << 2) | ((channel & 0x06) >> 1)
        return 0x80 | (channelSelect << 4) | 0x0C
    }
}
