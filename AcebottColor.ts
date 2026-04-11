let BH1745NUC_DEFAULT_ADDRESS = 56
let BH1745NUC_REG_SYSTEM = 64
let BH1745NUC_REG_MODE_CONTROL1 = 65
let BH1745NUC_REG_MODE_CONTROL2 = 66
let BH1745NUC_REG_MODE_CONTROL3 = 68
let BH1745NUC_REG_RED_DATA_LSB = 80
let BH1745NUC_REG_RED_DATA_MSB = 81
let BH1745NUC_REG_GREEN_DATA_LSB = 82
let BH1745NUC_REG_GREEN_DATA_MSB = 83
let BH1745NUC_REG_BLUE_DATA_LSB = 84
let BH1745NUC_REG_BLUE_DATA_MSB = 85
let BH1745NUC_REG_CLEAR_DATA_LSB = 86
let BH1745NUC_REG_CLEAR_DATA_MSB = 87
let BH1745NUC_RGBC_MEASURE_TIME_160 = 0
let BH1745NUC_RGBC_MEASURE_TIME_320 = 1
let BH1745NUC_RGBC_MEASURE_TIME_640 = 2
let BH1745NUC_RGBC_MEASURE_TIME_1280 = 3
let BH1745NUC_RGBC_MEASURE_TIME_2560 = 4
let BH1745NUC_RGBC_MEASURE_TIME_5120 = 5
let BH1745NUC_VALID_NO_UPDATE = 0
let BH1745NUC_VALID_UPDATE = 128
let BH1745NUC_RGBC_DS = 0
let BH1745NUC_RGBC_EN = 16
let BH1745NUC_ADC_GAIN_1 = 0
let BH1745NUC_ADC_GAIN_2 = 1
let BH1745NUC_ADC_GAIN_16 = 2
let BH1745NUC_DEFAULT_RESERVED = 2

// 不要使用 export，直接定义 class
class SugarColor {
    red: number
    green: number
    blue: number
    hue: number
    lm: number
    hexColor: number

    constructor() {
        this.red = 0
        this.green = 0
        this.blue = 0
        this.lm = 0
        this.hue = 0
        this.time_config()
        this.gain_config()
        this.write_default()
        serial.writeString("init")
    }

    time_config(): void {
        let buf = pins.createBuffer(2);
        buf[0] = BH1745NUC_REG_MODE_CONTROL1
        buf[1] = BH1745NUC_RGBC_MEASURE_TIME_160
        pins.i2cWriteBuffer(BH1745NUC_DEFAULT_ADDRESS, buf)
    }

    gain_config(): void {
        let GAIN_CONFIG = BH1745NUC_VALID_UPDATE | BH1745NUC_RGBC_EN | BH1745NUC_ADC_GAIN_1
        let buf2 = pins.createBuffer(2);
        buf2[0] = BH1745NUC_REG_MODE_CONTROL2
        buf2[1] = GAIN_CONFIG
        pins.i2cWriteBuffer(BH1745NUC_DEFAULT_ADDRESS, buf2)
    }

    write_default(): void {
        let buf3 = pins.createBuffer(2);
        buf3[0] = BH1745NUC_REG_MODE_CONTROL3
        buf3[1] = BH1745NUC_DEFAULT_RESERVED
        pins.i2cWriteBuffer(BH1745NUC_DEFAULT_ADDRESS, buf3)
    }

    update(): void {
        pins.i2cWriteNumber(BH1745NUC_DEFAULT_ADDRESS, 0x50, 1)
        let data = pins.i2cReadBuffer(BH1745NUC_DEFAULT_ADDRESS, 8)
        this.red = data[1] * 256 + data[0]
        this.green = data[3] * 256 + data[2]
        this.blue = data[5] * 256 + data[4]
        this.lm = data[7] * 256 + data[6]

        this.green -= 75

        let maxVal = this.red
        if (this.green > maxVal) {
            maxVal = this.green
        }
        if (this.blue > maxVal) {
            maxVal = this.blue
        }
        maxVal = maxVal + 50

        this.red = Math.round(this.red / maxVal * 255)
        this.green = Math.round(this.green / maxVal * 255)
        this.blue = Math.round((this.blue - 40) / maxVal * 255)

        if (this.red < 0) {
            this.red = 0
        }
        if (this.red > 255) {
            this.red = 255
        }
        if (this.green < 0) {
            this.green = 0
        }
        if (this.green > 255) {
            this.green = 255
        }
        if (this.blue < 0) {
            this.blue = 0
        }
        if (this.blue > 255) {
            this.blue = 255
        }
        this.hexColor = (this.red << 16) + (this.green << 8) + this.blue
    }

    getHex(): number {
        return this.hexColor
    }

    getValue(index: number): number {
        switch (index) {
            case (0):
                return this.red
            case (1):
                return this.green
            case (2):
                return this.blue
            case (3):
                return this.hue
            default:
                return this.hue
        }
        return this.red
    }

    // 新增：颜色识别方法
    detectColor(): string {
        this.update()

        let redRaw = this.red
        let greenRaw = this.green
        let blueRaw = this.blue

        let colorName = ""

        // 颜色识别对比
        if (redRaw > 240 && blueRaw < 120 && greenRaw < 160)  {
            colorName = "red"//colorName = "Rojo"
        } else if (redRaw < 100 && blueRaw < 200 && greenRaw > 100)  {
            colorName = "green"//colorName = "Verde"
        } else if (redRaw < 100 && blueRaw > 240 && greenRaw < 210)  {
            colorName = "blue"//colorName = "Azul"
        } else if (redRaw > 140 && greenRaw > 140 && blueRaw < 140) {
            colorName = "yellow"//colorName = "Amarillo"
        } else if (redRaw > 180 && blueRaw > 180 && greenRaw < 180) {
            colorName = "purple"//colorName = "Púrpura"
        } else if (greenRaw > 200 && blueRaw > 180 && redRaw < 180) {
            colorName = "cyan"//colorName = "Cyan"
        } else if (redRaw > 250 && greenRaw > 250 && blueRaw > 250) {
            colorName = "White"//colorName = "Blanco"
        } else if (redRaw < 50 && greenRaw < 50 && blueRaw < 50) {
            colorName = "Black"//colorName = "Negro"
        } else {
            colorName = "unknown"//colorName = "Desconocido"
        }

        // 打印格式：Rojo(R-240, G-15, B-20)
        serial.writeString(colorName)
        serial.writeString("(R-")
        serial.writeNumber(redRaw)
        serial.writeString(", G-")
        serial.writeNumber(greenRaw)
        serial.writeString(", B-")
        serial.writeNumber(blueRaw)
        serial.writeLine(")")
        return colorName
    }
}
