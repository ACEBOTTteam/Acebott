// AcebottBMP280.ts
// BMP280 数字压力传感器类

enum BMP280_I2C_ADDRESS {
    ADDR_0x76 = 0x76,
    ADDR_0x77 = 0x77
}

class AcebottBMP280 {
    private i2cAddr: number = BMP280_I2C_ADDRESS.ADDR_0x76
    private dig_T1: number = 0
    private dig_T2: number = 0
    private dig_T3: number = 0
    private dig_P1: number = 0
    private dig_P2: number = 0
    private dig_P3: number = 0
    private dig_P4: number = 0
    private dig_P5: number = 0
    private dig_P6: number = 0
    private dig_P7: number = 0
    private dig_P8: number = 0
    private dig_P9: number = 0
    private temperature: number = 0
    private pressure: number = 0
    private initialized: boolean = false

    constructor(addr?: BMP280_I2C_ADDRESS) {
        if (addr !== undefined) {
            this.i2cAddr = addr
        }
        this.init()  // 自动初始化并开始工作
        serial.writeString("BMP280 init")
    }

    private setreg(reg: number, dat: number): void {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = dat
        pins.i2cWriteBuffer(this.i2cAddr, buf)
    }

    private getreg(reg: number): number {
        pins.i2cWriteNumber(this.i2cAddr, reg, NumberFormat.UInt8BE)
        return pins.i2cReadNumber(this.i2cAddr, NumberFormat.UInt8BE)
    }

    private getUInt16LE(reg: number): number {
        pins.i2cWriteNumber(this.i2cAddr, reg, NumberFormat.UInt8BE)
        return pins.i2cReadNumber(this.i2cAddr, NumberFormat.UInt16LE)
    }

    private getInt16LE(reg: number): number {
        pins.i2cWriteNumber(this.i2cAddr, reg, NumberFormat.UInt8BE)
        return pins.i2cReadNumber(this.i2cAddr, NumberFormat.Int16LE)
    }

    private init(): void {
        // 读取校准数据
        this.dig_T1 = this.getUInt16LE(0x88)
        this.dig_T2 = this.getInt16LE(0x8A)
        this.dig_T3 = this.getInt16LE(0x8C)
        this.dig_P1 = this.getUInt16LE(0x8E)
        this.dig_P2 = this.getInt16LE(0x90)
        this.dig_P3 = this.getInt16LE(0x92)
        this.dig_P4 = this.getInt16LE(0x94)
        this.dig_P5 = this.getInt16LE(0x96)
        this.dig_P6 = this.getInt16LE(0x98)
        this.dig_P7 = this.getInt16LE(0x9A)
        this.dig_P8 = this.getInt16LE(0x9C)
        this.dig_P9 = this.getInt16LE(0x9E)

        // 自动配置传感器为正常模式
        this.setreg(0xF4, 0x2F)  // 正常模式，温度 oversampling x1，压力 oversampling x1
        this.setreg(0xF5, 0x0C)  // 设置滤波器和待机时间

        this.initialized = true
    }

    private update(): void {
        if (!this.initialized) {
            return
        }

        // 读取温度 ADC 值
        let adc_T = (this.getreg(0xFA) << 12) + (this.getreg(0xFB) << 4) + (this.getreg(0xFC) >> 4)

        // 计算温度
        let var1 = (((adc_T >> 3) - (this.dig_T1 << 1)) * this.dig_T2) >> 11
        let var2 = (((((adc_T >> 4) - this.dig_T1) * ((adc_T >> 4) - this.dig_T1)) >> 12) * this.dig_T3) >> 14
        let t_fine = var1 + var2
        this.temperature = Math.idiv(((t_fine * 5 + 128) >> 8), 100)

        // 读取压力 ADC 值
        let adc_P = (this.getreg(0xF7) << 12) + (this.getreg(0xF8) << 4) + (this.getreg(0xF9) >> 4)

        // 计算压力
        var1 = (t_fine >> 1) - 64000
        var2 = (((var1 >> 2) * (var1 >> 2)) >> 11) * this.dig_P6
        var2 = var2 + ((var1 * this.dig_P5) << 1)
        var2 = (var2 >> 2) + (this.dig_P4 << 16)
        var1 = (((this.dig_P3 * ((var1 >> 2) * (var1 >> 2)) >> 13) >> 3) + (((this.dig_P2) * var1) >> 1)) >> 18
        var1 = ((32768 + var1) * this.dig_P1) >> 15

        if (var1 != 0) {
            let p = ((1048576 - adc_P) - (var2 >> 12)) * 3125
            p = Math.idiv(p, var1) * 2
            var1 = (this.dig_P9 * (((p >> 3) * (p >> 3)) >> 13)) >> 12
            var2 = (((p >> 2)) * this.dig_P8) >> 13
            this.pressure = p + ((var1 + var2 + this.dig_P7) >> 4)
        }
    }

    // 公共方法 - 直接获取温度（整数，单位°C）
    getTemperature(): number {
        this.update()
        return this.temperature
    }

    // 公共方法 - 直接获取压力（单位 Pa）
    getPressure(): number {
        this.update()
        return this.pressure
    }

    // 获取带两位小数的温度
    getTemperatureFloat(): number {
        this.update()
        return Math.round(this.temperature * 100) / 100
    }

    // 获取压力值（单位：hPa，即百帕，保留两位小数）
    getPressureHpa(): number {
        this.update()
        return Math.round(this.pressure / 100 * 100) / 100
    }

    // 设置 I2C 地址（会自动重新初始化）
    setAddress(addr: BMP280_I2C_ADDRESS): void {
        this.i2cAddr = addr
        this.init()  // 重新初始化
    }

}