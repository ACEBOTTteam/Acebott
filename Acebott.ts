enum SwitchStatus{
    //% block="ON"
    ON = 1,
    //% block="OFF"
    OFF = 0
}

enum AnalogReadPin{
    //% block="P0"
    P0 = 0,
    //% block="P1"
    P1 = 1,
    //% block="P2"
    P2 = 2
}

enum AnalogWritePin{
    //% block="P0"
    P0 = 0,
    //% block="P1"
    P1 = 1,
    //% block="P2"
    P2 = 2
}

enum UARTPin{
    //% block="P0"
    P0 = 0,
    //% block="P1"
    P1 = 1,
    //% block="P2"
    P2 = 2,
    //% block="P8"
    P8 = 8,
    //% block="P12"
    P12 = 12,
    //% block="P13(SCK)"
    P13 = 13,
    //% block="P14(MISO)"
    P14 = 14,
    //% block="P15(MOSI)"
    P15 = 15,
    //% block="P16"
    P16 = 16
}

enum DigitalWritePin{
    //% block="P0"
    P0 = 0,
    //% block="P1"
    P1 = 1,
    //% block="P2"
    P2 = 2,
    //% block="P5"
    P5 = 5,
    //% block="P8"
    P8 = 8,
    //% block="P9"
    P9 = 9,
    //% block="P11"
    P11 = 11,
    //% block="P12"
    P12 = 12,
    //% block="P13(SCK)"
    P13 = 13,
    //% block="P14(MISO)"
    P14 = 14,
    //% block="P15(MOSI)"
    P15 = 15,
    //% block="P16"
    P16 = 16
}

enum DigitalReadPin{
    //% block="P0"
    P0 = 0,
    //% block="P1"
    P1 = 1,
    //% block="P2"
    P2 = 2,
    //% block="P5"
    P5 = 5,
    //% block="P8"
    P8 = 8,
    //% block="P9"
    P9 = 9,
    //% block="P11"
    P11 = 11,
    //% block="P12"
    P12 = 12,
    //% block="P13(SCK)"
    P13 = 13,
    //% block="P14(MISO)"
    P14 = 14,
    //% block="P15(MOSI)"
    P15 = 15,
    //% block="P16"
    P16 = 16
}

enum ServoPin{
  //% block="P0"
  P0 = 0,
  //% block="P1"
  P1 = 1,
  //% block="P2"
  P2 = 2,
  //% block="P3"
  P3 = 3,
  //% block="P4"
  P4 = 4,
  //% block="P5"
  P5 = 5,
  //% block="P6"
  P6 = 6,
  //% block="P7"
  P7 = 7,
  //% block="P8"
  P8 = 8,
  //% block="P9"
  P9 = 9,
  //% block="P10"
  P10 = 10,
  //% block="P11"
  P11 = 11,
  //% block="P12"
  P12 = 12,
  //% block="P13(SCK)"
  P13 = 13,
  //% block="P14(MISO)"
  P14 = 14,
  //% block="P15(MOSI)"
  P15 = 15,
  //% block="P16"
  P16 = 16
}

enum DistanceUnit {
    //% block="cm"
    CM = 0,
    //% block="inch"
    INCH = 1
}

enum Servos {
    //% block="Servo1"
    Servo1 = 1,
    //% block="Servo2"
    Servo2 = 2
}

enum RGB_Index{
    //% block="RGB1"
    RGB1 = 1,
    //% block="RGB2"
    RGB2 = 2
}

enum Motors{
    //% block="M1"
    M1 = 0,
    //% block="M2"
    M2 = 1,
    //% block="M3"
    M3 = 2,
    //% block="M4"
    M4 = 3
}

enum DHT11Type {
    //% block="temperature(℃)"
    Temperature_C = 1,

    //% block="temperature(℉)"
    Temperature_F = 2,

    //% block="humidity(0~100)"
    Humidity = 3
}

const enum CharIndex {
  //% block="1"
  C1 = 0,
  //% block="2"
  C2 = 1,
  //% block="3"
  C3 = 2,
  //% block="4"
  C4 = 3,
  //% block="5"
  C5 = 4,
  //% block="6"
  C6 = 5,
  //% block="7"
  C7 = 6,
  //% block="8"
  C8 = 7
}

const enum IR_Button {
  //% block="any"
  Any = -1,
  //% block="▲"
  Up = 0x62,
  //% block=" "
  Unused_2 = -2,
  //% block="◀"
  Left = 0x22,
  //% block="OK"
  Ok = 0x02,
  //% block="▶"
  Right = 0xc2,
  //% block=" "
  Unused_3 = -3,
  //% block="▼"
  Down = 0xa8,
  //% block=" "
  Unused_4 = -4,
  //% block="1"
  Number_1 = 0x68,
  //% block="2"
  Number_2 = 0x98,
  //% block="3"
  Number_3 = 0xb0,
  //% block="4"
  Number_4 = 0x30,
  //% block="5"
  Number_5 = 0x18,
  //% block="6"
  Number_6 = 0x7a,
  //% block="7"
  Number_7 = 0x10,
  //% block="8"
  Number_8 = 0x38,
  //% block="9"
  Number_9 = 0x5a,
  //% block="*"
  Star = 0x42,
  //% block="0"
  Number_0 = 0x4a,
  //% block="#"
  Hash = 0x52,
}

const enum IR_ButtonAction {
  //% block="Pressed"
  Pressed = 0,
  //% block="Released"
  Released = 1,
}

const enum IrProtocol {
  //% block="Keyestudio"
  Keyestudio = 0,
  //% block="NEC"
  NEC = 1,
}

const enum Trace_Sensor_Index{
  //% block="R"
  R = 0,
  //% block="M"
  M = 1,
  //% block="L"
  L = 2

}

namespace background {

        export enum Thread {
            Priority = 0,
            UserCallback = 1,
        }

        export enum Mode {
            Repeat,
            Once,
        }

        class Executor {
            _newJobs: Job[] = undefined;
            _jobsToRemove: number[] = undefined;
            _pause: number = 100;
            _type: Thread;

            constructor(type: Thread) {
                this._type = type;
                this._newJobs = [];
                this._jobsToRemove = [];
                control.runInParallel(() => this.loop());
            }

            push(task: () => void, delay: number, mode: Mode): number {
                if (delay > 0 && delay < this._pause && mode === Mode.Repeat) {
                    this._pause = Math.floor(delay);
                }
                const job = new Job(task, delay, mode);
                this._newJobs.push(job);
                return job.id;
            }

            cancel(jobId: number) {
                this._jobsToRemove.push(jobId);
            }

            loop(): void {
                const _jobs: Job[] = [];

                let previous = control.millis();

                while (true) {
                    const now = control.millis();
                    const delta = now - previous;
                    previous = now;

                    // Add new jobs
                    this._newJobs.forEach(function (job: Job, index: number) {
                        _jobs.push(job);
                    });
                    this._newJobs = [];

                    // Cancel jobs
                    this._jobsToRemove.forEach(function (jobId: number, index: number) {
                        for (let i = _jobs.length - 1; i >= 0; i--) {
                            const job = _jobs[i];
                            if (job.id == jobId) {
                                _jobs.removeAt(i);
                                break;
                            }
                        }
                    });
                    this._jobsToRemove = []


                    // Execute all jobs
                    if (this._type === Thread.Priority) {
                        // newest first
                        for (let i = _jobs.length - 1; i >= 0; i--) {
                            if (_jobs[i].run(delta)) {
                                this._jobsToRemove.push(_jobs[i].id)
                            }
                        }
                    } else {
                        // Execute in order of schedule
                        for (let i = 0; i < _jobs.length; i++) {
                            if (_jobs[i].run(delta)) {
                                this._jobsToRemove.push(_jobs[i].id)
                            }
                        }
                    }

                    basic.pause(this._pause);
                }
            }
        }

        class Job {
            id: number;
            func: () => void;
            delay: number;
            remaining: number;
            mode: Mode;

            constructor(func: () => void, delay: number, mode: Mode) {
                this.id = randint(0, 2147483647)
                this.func = func;
                this.delay = delay;
                this.remaining = delay;
                this.mode = mode;
            }

            run(delta: number): boolean {
                if (delta <= 0) {
                    return false;
                }

                this.remaining -= delta;
                if (this.remaining > 0) {
                    return false;
                }

                switch (this.mode) {
                    case Mode.Once:
                        this.func();
                        basic.pause(0);
                        return true;
                    case Mode.Repeat:
                        this.func();
                        this.remaining = this.delay;
                        basic.pause(0);
                        return false;
                }
            }
        }

        const queues: Executor[] = [];

        export function schedule(
            func: () => void,
            type: Thread,
            mode: Mode,
            delay: number,
        ): number {
            if (!func || delay < 0) return 0;

            if (!queues[type]) {
                queues[type] = new Executor(type);
            }

            return queues[type].push(func, delay, mode);
        }

        export function remove(type: Thread, jobId: number): void {
            if (queues[type]) {
                queues[type].cancel(jobId);
            }
        }
    }

//% icon="icon_1.png"
namespace Acebott{
    const PCA9685_ADDRESS = 0x40
    const MODE1 = 0x00
    const MODE2 = 0x01
    const SUBADR1 = 0x02
    const SUBADR2 = 0x03
    const SUBADR3 = 0x04
    const PRESCALE = 0xFE
    const LED0_ON_L = 0x06

    function getPort(pin_num: number): number {
        return 100 + pin_num
    }

    function getAnalogPin(pin_num: number): AnalogPin {
        return getPort(pin_num)
    }

    function getDigitalPin(pin_num: number): DigitalPin {
        return getPort(pin_num)
    }

    function getUartPin(pin_num: number): SerialPin {
        return getPort(pin_num)
    }

    let initialized = false

    function i2cwrite(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function i2ccmd(addr: number, value: number) {
        let buf = pins.createBuffer(1)
        buf[0] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function i2cread(addr: number, reg: number) {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
        return val;
    }

    function initPCA9685(): void {
        i2cwrite(PCA9685_ADDRESS, MODE1, 0x00)
        setFreq(50);
        for (let idx = 0; idx < 16; idx++) {
            setPwm(idx, 0, 0);
        }
        initialized = true
    }

    function setFreq(freq: number): void {
        // Constrain the frequency
        let prescaleval = 25000000;
        prescaleval /= 4096;
        prescaleval /= freq;
        prescaleval -= 1;
        let prescale = prescaleval; //Math.Floor(prescaleval + 0.5);
        let oldmode = i2cread(PCA9685_ADDRESS, MODE1);
        let newmode = (oldmode & 0x7F) | 0x10; // sleep
        i2cwrite(PCA9685_ADDRESS, MODE1, newmode); // go to sleep
        i2cwrite(PCA9685_ADDRESS, PRESCALE, prescale); // set the prescaler
        i2cwrite(PCA9685_ADDRESS, MODE1, oldmode);
        control.waitMicros(5000);
        i2cwrite(PCA9685_ADDRESS, MODE1, oldmode | 0xa1);
    }

    function setPwm(channel: number, on: number, off: number): void {
        if (channel < 0 || channel > 15)
            return;
        let buf = pins.createBuffer(5);
        buf[0] = LED0_ON_L + 4 * channel;
        buf[1] = on & 0xff;
        buf[2] = (on >> 8) & 0xff;
        buf[3] = off & 0xff;
        buf[4] = (off >> 8) & 0xff;
        pins.i2cWriteBuffer(PCA9685_ADDRESS, buf);
    }

    // LED @start
    //% blockId=setLedBrightness block="LED at %pin| set brightness %v"
    //% weight=70
    //% v.min=0 v.max=100 v.defl=50
    //% subcategory="Display"
    //% group="LED"
    export function setLedBrightness(pin: AnalogWritePin, v: number): void {
        let port = getAnalogPin(pin)
        pins.analogWritePin(port, v*10.23)
    }

    //% blockId=setLed block="LED at %pin| set %status"
    //% weight=70
    //% subcategory="Display"
    //% group="LED"
    export function setLed(pin: DigitalWritePin, status: SwitchStatus): void {
        let port = getDigitalPin(pin)
        pins.digitalWritePin(port, status)
    }
    // LED @end

    //% blockId=ledMatrixShowHex block="LED Matrix show Hex number %hex_num"
    //% subcategory="Display"
    //% group="LED Matrix"
    export function ledMatrixShowHex(hex_num: number): void {
      for(let i=0; i<25; i+=5){
            for(let j=0;j<5;j++){
                if((hex_num>>(i+j))&1){
                    led.plot(j, i/5);
                }
                else{
                    led.unplot(j, i/5);
                }
            }
        }
    }

    /**
    * Servo Execute
    * @param index Servo Channel; eg: S1, S2
    * @param degree [0-180] degree of servo; eg: 0, 90, 180
   */
   //% blockId=Servo_IIC block="Servo|%index|degree %degree"
   //% degree.min=0 degree.max=180
   //% group="Servo"
   //% subcategory="Executive"
   export function Servo_IIC(index: Servos, degree: number): void {
       if (!initialized) {
           initPCA9685()
       }
       let v_us = (degree * 1800 / 180 + 600)
       let value = v_us * 4096 / 20000
       setPwm(index * 5, 0, value)
   }

   //% blockId=Servo_IO block="Servo|%pin|degree %degree"
   //% degree.min=0 degree.max=180
   //% group="Servo"
   //% subcategory="Executive"
   export function Servo_IO(pin: ServoPin, degree: number): void{
       let port = getAnalogPin(pin)
       if (degree > 180) degree = 180
       if (degree < 0) degree = 0

       pins.servoWritePin(port, degree)
   }

    // RGB OnBoard @start
    //% blockId=RGB_OnBoard block="RGB on board |%index|show(R:|%red|G:|%green|B:|%blue|)"
    //% red.min=0 red.max=255
    //% green.min=0 green.max=255
    //% blue.min=0 blue.max=255
    //% group="RGB LED"
    //% subcategory="Display"
    //% inlineInputMode=inline
    export function RGB_OnBoard(index:RGB_Index, red: number, green: number, blue: number): void {
        if (!initialized) {
            initPCA9685()
        }

        switch (index) {
            case 1:
                setPwm(1, 0, red*16)
                setPwm(0, 0, green*16)
                setPwm(2, 0, blue*16)
                break
            case 2:
                setPwm(14, 0, red*16)
                setPwm(13, 0, green*16)
                setPwm(15, 0, blue*16)
                break
        }
    }
    // RGB OnBoard @end

    // DC Motor @start
    const MOTORS_PIN: number[][] = [[4, 3], [12, 11], [7, 6], [9, 8]]
    //% blockId=dc_motor_run block="DC Motor|%index|run speed %speed"
    //% speed.min=-255 speed.max=255
    //% group="DC Motor"
    //% subcategory="Executive"
    export function dc_motor_run(index: Motors, speed: number): void {
        if (!initialized) {
            initPCA9685()
        }
        speed = speed * 16; // map 255 to 4096
        if (speed >= 4096) {
            speed = 4095
        }
        if (speed <= -4096) {
            speed = -4095
        }

        if (speed >= 0) {
            setPwm(MOTORS_PIN[index][0], 0, speed)
            setPwm(MOTORS_PIN[index][1], 0, 0)
        } else {
            setPwm(MOTORS_PIN[index][0], 0, 0)
            setPwm(MOTORS_PIN[index][1], 0, -speed)
        }
    }
    // DC Motor @end

    // 4-Digital Tube @start
    const characterBytes: number[] = [
        0x3F, 0x06, 0x5B, 0x4F, 0x66, 0x6D, 0x7D, 0x07, 0x7F, 0x6F,  /* 0 - 9 */
        0x77, 0x7C, 0x39, 0x5E, 0x79, 0x71, 0x3D, 0x76, 0x06, 0x0E,  /* A - J */
        0x38, 0x54, 0x74, 0x73, 0x67, 0x50, 0x78, 0x1C, 0x40, 0x63,  /* LnoPQrtu-* (degree) */
        0x00]
    const digitAddress: number[] = [0x68, 0x6A, 0x6C, 0x6E]

    class TM1650Class {
        public displayDigitsRaw: number[] = [0, 0, 0, 0]

        constructor(clock: DigitalPin = DigitalPin.P1, data: DigitalPin = DigitalPin.P0) {
            this.reconfigure(clock, data)
        }
        public setSpeed( baud : number = 8333 ) : void {
            /* baud = microseconds per bit, clockLength - clock pulse width */
            let clockLength = 120
            /* Time per bit transmitted is one clock cycle, 2 pulse widths */
            clockLength = 1000000 / baud
            if(clockLength >= 4) {
                this.pulseWidth = Math.floor(clockLength / 2)
                this.halfPulseWidth = Math.floor(clockLength / 4)
            } else {
                this.pulseWidth = 2
                this.halfPulseWidth = 1
            }
        }
        public reconfigure(clock: DigitalPin = DigitalPin.P1, data: DigitalPin = DigitalPin.P0) : void {
            this.clockPin = clock
            this.dataPin = data
            pins.digitalWritePin(this.clockPin, 0)
            pins.digitalWritePin(this.dataPin, 0)
            pins.setPull(this.dataPin, PinPullMode.PullUp)
            pins.digitalWritePin(this.dataPin, 0)
            this.goIdle()
        }
        public displayOn(brightness: number = 0) : void {
            this.goIdle()
            brightness &= 7
            brightness <<= 4
            brightness |= 1
            this.sendPair(0x48, brightness)
        }
        public displayOff() : void {
            this.sendPair(0x48, 0)
        }
        public displayClear() : void {
            for( let i = 0 ; i < 4 ; i++ ) {
                this.sendPair(digitAddress[i], 0)
                this.displayDigitsRaw[i] = 0
            }
        }
        public showSegments(pos: number = 0, pattern: number = 0) : void {
            pos &= 3
            this.displayDigitsRaw[pos] = pattern
            this.sendPair(digitAddress[pos], this.displayDigitsRaw[pos])
        }
        public showChar(pos: number = 0, c: number = 0) : void {
            let charindex = 30
            pos &= 3
            charindex = this.charToIndex(c)
            if (c == 0x2E) {
                this.displayDigitsRaw[pos] |= 128
            } else {
                this.displayDigitsRaw[pos] = characterBytes[charindex]
            }
            this.sendPair(digitAddress[pos], this.displayDigitsRaw[pos])
        }
        public showCharWithPoint(pos: number = 0, c: number = 0) : void {
            let charindex2 = 30
            pos &= 3
            charindex2 = this.charToIndex(c)
            this.displayDigitsRaw[pos] = characterBytes[charindex2] | 128
            this.sendPair(digitAddress[pos], this.displayDigitsRaw[pos])
        }
        public showString(s: string) : void {
            let outc: number[] = []
            let dp: number[] = [0, 0, 0, 0]
            let c = 0
            let index = 0
            let di = 0

            for (index = 0, di = 0; (index < s.length) && (di < 4); index++) {
                c = s.charCodeAt(index)
                if (c == 0x2E) {
                    if (di == 0) {
                        outc[di] = 32
                        dp[di] = 1
                        di++
                    } else {
                        if (dp[di - 1] == 0) {
                            dp[di - 1] = 1
                        } else {
                            dp[di] = 1
                            di++
                            outc[di] = 32
                        }
                    }
                } else {
                    outc[di] = c
                    di++
                }
            }
            for (index = 0; index < di; index++) {
                c = outc[index]
                if (dp[index] == 0) {
                    this.showChar(index, c)
                }
                else {
                    this.showCharWithPoint(index, c)
                }
            }
        }
        public showInteger(n: number = 0) : void {
            let outc2: number[] = [32, 32, 32, 32]
            let i = 3
            let absn = 0

            if ((n > 9999) || (n < -999)) {
                this.showString("Err ")
            } else {
                absn = Math.abs(n)
                if (absn == 0) {
                    outc2[3] = 0x30
                } else {
                    while (absn != 0) {
                        outc2[i] = (absn % 10) + 0x30
                        absn = Math.floor(absn / 10)
                        i = i - 1
                    }
                    if (n < 0) {
                        outc2[i] = 0x2D
                    }
                }
                for (i = 0; i < 4; i++) {
                    this.showChar(i, outc2[i])
                }
            }
        }
        public showHex(n: number = 0) : void {
            let j = 3

            if ((n > 0xFFFF) || (n < -32768)) {
                this.showString("Err ")
            } else {
                for( j = 0 ; j < 3 ; j++ ) {
                    this.displayDigitsRaw[j] = 0
                }
                this.displayDigitsRaw[3] = characterBytes[0]
                if (n < 0) {
                    n = 0x10000 + n
                }
               for( j = 3 ; (n != 0) ; j-- ) {
                    this.displayDigitsRaw[j] = characterBytes[n & 15]
                    n >>= 4
                }
                for (j = 0; j < 4; j++) {
                    this.sendPair(digitAddress[j], this.displayDigitsRaw[j])
                }
            }
        }
        public showDecimal(n: number = 0) : void {
            let s: string = ""
            let targetlen = 4

            if (n > 9999) {
                this.showString("9999")
            }
            else if (n < -999) {
                this.showString("-999")
            }
             else {
                s = n.toString()
                if (s.includes(".")) {
                    targetlen = 5
                }
                while (s.length < targetlen) {
                    s = " " + s
                }
                this.showString(s)
            }
        }
        public toggleDP(pos: number = 0) : void {
            this.displayDigitsRaw[pos] ^= 128
            this.sendPair(digitAddress[pos], this.displayDigitsRaw[pos])
        }
        public digitRaw(pos : number = 0) : number {
            return this.displayDigitsRaw[pos & 3]
        }
        public digitChar(pos: number = 0) : number {
            let raw=this.displayDigitsRaw[pos&3]
            let c = 0
            let found = 0
            let i = 0
            if(raw == 0){
                c = 32
            }
            while( (i < 30) && ( found == 0) ){
                if( characterBytes[i] == raw) {
                    found = 1
                    if(i < 10){
                        c = 0x30 + i
                    } else {
                        if( i < 20 ) {
                            c = 55 + i
                        } else {
                            c = 77
                            if( i > 20 ) {
                                c = c + ( i - 19 )
                                if( i > 25 ){
                                    c = c + 1
                                    if( i == 28 ) {
                                        c = 0x2d
                                    }
                                    if( i == 29 ) {
                                        c = 0x2a
                                    }
                                    if( i == 128 ) {
                                        c = 0x2e
                                    }
                                }
                            }
                        }
                    }
                } else {
                    i++
                }
            }
            return c
        }
        private clockPin: DigitalPin = DigitalPin.P1
        private dataPin: DigitalPin = DigitalPin.P0
        private pulseWidth: number = 120
        private halfPulseWidth: number = 60
        private charToIndex(c: number) {
            let charCode = 30
            if (c < 30) {
                charCode = c
            } else {
                if ((c > 0x2F) && (c < 0x3A)) {
                    charCode = c - 0x30
                } else {
                    if (c > 0x40) {
                        c &= 0xDF    /* uppercase */
                    }
                    if ((c > 0x40) && (c < 0x4B)) {
                        charCode = c - 0x37
                    } else {
                        if (c == 0x4C) {
                            charCode = 20
                        }
                        if ((c >= 0x4E) && (c <= 0x52)) {
                            charCode = 21 + (c - 0x4E)
                        }
                        if (c == 0x54) {
                            charCode = 26
                        }
                        if (c == 0x55) {
                            charCode = 27
                        }
                        if (c == 0x2D) {
                            charCode = 28
                        }
                        if (c == 0x2A) {
                            charCode = 29
                        }
                    }
                }
            }
            return (charCode)
        }
        private sendPair(byte1: number, byte2: number) {
            this.sendStart()
            this.sendByte(byte1)
            this.sendByte(byte2)
            this.goIdle()
        }
        private sendStart() {
            /* Clock and data both start at 1 */
            pins.digitalWritePin(this.dataPin, 0)
            control.waitMicros(this.pulseWidth)
            pins.digitalWritePin(this.clockPin, 0)
        }
        private goIdle() {
            pins.digitalWritePin(this.clockPin, 1)
            control.waitMicros(this.pulseWidth)
            pins.digitalWritePin(this.dataPin, 1)
            control.waitMicros(this.pulseWidth)
        }
        private sendByte(byte: number) {
            /* The idle state has both clock (SCL) and data (SDA) HIGH.     */
            /* In this function, SCL will start and end LOW, SDA unknown    */
            /* Data are clocked out MSB first. 8 bits are clocked out,      */
            /* latched by the display on the falling edge of SCL. A final   */
            /* ninth clock is sent to allow the display to send an ACK bit. */
            let bitMask = 128
            let ackBit = 0      /* Debug only - discarded */

            bitMask = 128
            while (bitMask != 0) {
                control.waitMicros(this.halfPulseWidth)
                if ((byte & bitMask) == 0) {
                    pins.digitalWritePin(this.dataPin, 0)
                } else {
                    pins.digitalWritePin(this.dataPin, 1)
                }
                control.waitMicros(this.halfPulseWidth)
                pins.digitalWritePin(this.clockPin, 1)
                control.waitMicros(this.pulseWidth)
                pins.digitalWritePin(this.clockPin, 0)
                bitMask >>= 1
            }
            /* Clock is now low and we want the ACK bit so this time read SDA */
            ackBit = pins.digitalReadPin(this.dataPin) /* put pin in read mode with pullup */
            control.waitMicros(this.pulseWidth)
            /* Do one clock */
            pins.digitalWritePin(this.clockPin, 1)
            control.waitMicros(this.pulseWidth)
            ackBit = pins.digitalReadPin(this.dataPin) /* read actual ACK bit */
            pins.digitalWritePin(this.clockPin, 0)
            /* Display takes about half a pulse width to release SDA */
            pins.setPull(this.dataPin, PinPullMode.PullUp)
            while (0 == ackBit) {
                ackBit = pins.digitalReadPin(this.dataPin)
            }
            pins.digitalWritePin(this.dataPin, 0)
            control.waitMicros(this.halfPulseWidth)
        }
    }

    let instanceNames: string[] = []
    let instanceCount: number = 0
    let instances: TM1650Class[] = []
    let currentInstanceIndex: number = 0;

    function findInstanceIndex(name: string) {
        let found = 0;
        let i = 0;
        while((found == 0) && ( i < instanceCount )) {
            if (instanceNames[i] == name) {
                found = 1
            } else {
                i++
            }
        }
        return i
    }

   //% blockId=tm1650_displayOff block="4-Digit Tube |named %name| turn off"
   //% name.defl="1"
   //% subcategory="Display"
   //% group="4-Digit Tube"
   export function tm1650_displayOff(name: string = "1") : void {
       let index: number = findInstanceIndex(name)
       instances[index].displayOff()
   }

   //% blockId=tm1650_showString block="4-Digit Tube |named %name| show string|%s"
   //% name.defl="1" s.defl="Ace"
   //% subcategory="Display"
   //% group="4-Digit Tube"
   export function tm1650_showString(name: string = "1", s: string = "Ace") : void {
       let index: number = findInstanceIndex(name)
       instances[index].showString(s)
   }

   //% blockId=tm1650_showDecimal block="4-Digit Tube |named %name|show number|%n"
   //% name.defl="1"
   //% n.min=-999 n.max=9999 n.defl=0
   //% subcategory="Display"
   //% group="4-Digit Tube"
   export function tm1650_showDecimal(name: string = "1", n: number = 0) : void {
       let index: number = findInstanceIndex(name)
       instances[index].showDecimal(n)
   }

   //% blockId=tm1650_configure block="4-Digit Tube |named %name| with CLK %clk|DIO %dio"
   //% name.defl="1" clk.defl=DigitalWritePin.P0 dio.defl=DigitalWritePin.P1
   //% subcategory="Display"
   //% group="4-Digit Tube"
   export function tm1650_configure(name: string = "1", clk:DigitalWritePin, dio:DigitalWritePin) : void {
       let index: number = 0
       let clkPin = getDigitalPin(clk)
       let dioPin = getDigitalPin(dio)
       index = findInstanceIndex(name)
       if (index == instanceCount) {
           instanceNames[index] = name;
           instances[index] = new TM1650Class(clkPin, dioPin)
           currentInstanceIndex = index
           instanceCount++
       } else {
           instances[index].reconfigure(clkPin, dioPin)
           currentInstanceIndex = index
       }
       instances[currentInstanceIndex].displayOn(6)
   }
   // 4-Digital Tube @end

   // LCD1602 @start
  let i2cAddr: number // 0x27: PCF8574
  let BK: number      // backlight control
  let RS: number      // command/data
  let Custom_Char: number[][] = []

  // set LCD reg
  function setreg(d: number) {
    pins.i2cWriteNumber(i2cAddr, d, NumberFormat.Int8LE)
    basic.pause(1)
    }

    // send data to I2C bus
    function set(d: number) {
        d = d & 0xF0
        d = d + BK + RS
        setreg(d)
        setreg(d + 4)
        setreg(d)
    }

    // send command
    function cmd(d: number) {
        RS = 0
        set(d)
        set(d << 4)
    }

    // send data
    function dat(d: number) {
        RS = 1
        set(d)
        set(d << 4)
    }

    //% blockId="LCD1602_Clear" block="LCD1602 clear screen"
    //% subcategory="Display"
    //% group="LCD1602"
    export function LCD1602_Clear(): void {
        cmd(0x01)
    }

    //% blockId="LCD1602_shl" block="LCD1602 shift left"
    //% subcategory="Display"
    //% group="LCD1602"
    export function LCD1602_shl(): void {
        cmd(0x18)
    }

    //% blockId="LCD1602_shr" block="LCD1602 shift right"
    //% subcategory="Display"
    //% group="LCD1602"
    export function LCD1602_shr(): void {
        cmd(0x1C)
    }

    //% blockId="LCD1602_Makecharacter"
    //% block="LCD1602 create custom character %char_index|%im"
    //% subcategory="Display"
    //% group="LCD1602"
    export function LCD1602_CreateCharacter(char_index: CharIndex, im: Image): void {
      const customChar = [0, 0, 0, 0, 0, 0, 0, 0];
      for(let y = 0; y < 8; y++) {
        for(let x = 0; x < 5; x++) {
          if (im.pixel(x, y)) {
            customChar[y] |= 1 << (4 - x)
          }
        }
      }
      Custom_Char[char_index] = customChar;
    }

    //% blockId="LCD1602_Characterpixels"
    //% block="Custom character"
    //% imageLiteral=1
    //% imageLiteralColumns=5
    //% imageLiteralRows=8
    //% imageLiteralScale=0.6
    //% shim=images::createImage
    //% subcategory="Display"
    //% group="LCD1602"
    export function LCD1602_CharacterPixels(i: string): Image {
        return <Image><any>i;
    }


    //% blockId="LCD1602_Showchararacter"
    //% block="LCD1602 at (x:|%x|,y:|%y) show custom character|%char_index"
    //% x.min=0 x.max=15
    //% y.min=0 y.max=1
    //% subcategory="Display"
    //% group="LCD1602"
    export function LCD1602_Showchararacter(x: number, y: number, char_index: CharIndex): void {
      let a: number
      if (y > 0)
          a = 0xC0
      else
          a = 0x80
      a += x
      cmd(0x40 | (char_index << 3));
      for (let y = 0; y < 8; y++) {
          dat(Custom_Char[char_index][y]);
      }
      cmd(a)
      dat(char_index)

    }

    //% blockId="LCD1602_ShowString" block="LCD1602 at (x:|%x|,y:|%y) show string|%s|"
    //% x.min=0 x.max=15
    //% y.min=0 y.max=1
    //% s.defl="Hello,Acebott!"
    //% subcategory="Display"
    //% group="LCD1602"
    export function LCD1602_ShowString(x: number, y: number, s: string): void {
        let a: number

        if (y > 0)
            a = 0xC0
        else
            a = 0x80
        a += x
        cmd(a)

        for (let i = 0; i < s.length; i++) {
            dat(s.charCodeAt(i))
        }
    }

    //% blockId="LCD16202_ShowNumber" block="LCD1602 at (x:|%x|,y:|%y) show number|%n|"
    //% x.min=0 x.max=15
    //% y.min=0 y.max=1
    //% subcategory="Display"
    //% group="LCD1602"
    export function LCD1602_ShowNumber(x: number, y: number, n: number): void {
        let s = n.toString()
        LCD1602_ShowString(x, y, s)
    }

    //% blockId="LCD1602_Init" block="LCD1602 initialization"
    //% subcategory="Display"
    //% group="LCD1602"
    export function LCD1602_Init(): void {
        i2cAddr = 39
        BK = 8
        RS = 0
        cmd(0x33)       // set 4bit mode
        basic.pause(5)
        set(0x30)
        basic.pause(5)
        set(0x20)
        basic.pause(5)
        cmd(0x28)       // set mode
        cmd(0x0C)
        cmd(0x06)
        cmd(0x01)       // clear
    }
  // LCD1602 @end

   // Laser @start
   //% blockId=setLaser block="Laser at %pin| set %status"
    //% weight=70
    //% subcategory="Display"
    //% group="Laser"
   export function setLaser(pin: DigitalWritePin, status: SwitchStatus): void{
    let port = getDigitalPin(pin)
    pins.digitalWritePin(port, status)

   }
   // Laser @end

    //% blockId=Photoresistance block="Photoresistance at %pin get value"
    //% weight=70
    //% group="Photoresistance"
    //% subcategory="Sensor"
    export function Photoresistance(pin: AnalogReadPin): number {
        let port = getAnalogPin(pin)
        return pins.analogReadPin(port)
    }

    //% blockId=Mosisture_Sensor block="Mosisture Sensor at %pin get value"
    //% group="Mosisture Sensor"
    //% subcategory="Sensor"
    export function Mosisture(pin: AnalogReadPin): number {
        let port = getAnalogPin(pin)
        return pins.analogReadPin(port)
    }

    //% blockId=PIR block="PIR Motion at %pin get value"
    //% weight=70
    //% group="PIR Motion"
    //% subcategory="Sensor"
    export function PIRMotion(pin: DigitalPin): number {
        return pins.digitalReadPin(pin)
    }

    //% blockId=Sound_Sensor block="Sound Sensor at %pin get value"
    //% group="Sound Sensor"
    //% subcategory="Sensor"
    export function SoundSensor(pin: AnalogReadPin): number {
      let port = getAnalogPin(pin)
      return pins.analogReadPin(port)
    }

    /**
     *
     * @param _INA  ina eg: AnalogPin.P1
     * @param _INB  inb eg: AnalogPin.P2
     * @param turn
     * @param speed
     */
    //% blockId=actuator_motor_run block="130 DC Motor at IN+ | %_INA | IN- | %_INB | run speed %speed"  group="130 DC Motor"
    //% weight=70
    //% inlineInputMode=inline
    //% speed.min=-255 speed.max=255
    //% _INA.defl=AnalogWritePin.P0
    //% _INB.defl=DigitalWritePin.P1
    //% speed.defl=100
    //% group="130 DC Motor"
    //% subcategory="Executive"
    export function _130_DC_motor_run(_INA: AnalogWritePin, _INB: DigitalWritePin, speed: number): void {
        let pwmPin = getAnalogPin(_INA)
        let dirPin = getDigitalPin(_INB)
        speed = speed * 4; // map 256 to 1024

        if (speed >= 0) {
            pins.digitalWritePin(dirPin, 1)
            pins.analogWritePin(pwmPin, 1020-speed)
        }
        else{
            pins.digitalWritePin(dirPin, 0)
            pins.analogWritePin(pwmPin, -speed)
        }
    }
    // 130 DC Motor @end

    // Ultrasonic Sensor @start
    //% blockId="ultrasonic_distance"
    //% block="Ultrasonic Sensor with Echo|%echo|Trig|%trig|get distance in %unit"
    //% echo.defl=AnalogWritePin.P0
    //% trig.defl=DigitalWritePin.P1
    //% group="Ultrasonic Sensor"
    //% subcategory="Sensor"
    export function UltrasonicDistance(echo: DigitalPin, trig: DigitalWritePin, unit: DistanceUnit): number {
      let trigPin = getDigitalPin(trig)
      // send pulse
      pins.setPull(trigPin, PinPullMode.PullNone)
      pins.digitalWritePin(trigPin, 0)
      control.waitMicros(2)
      pins.digitalWritePin(trigPin, 1)
      control.waitMicros(10)
      pins.digitalWritePin(trigPin, 0)

      // read pulse
      let d = pins.pulseIn(echo, PulseValue.High)
      let distance = d / 58

      if (distance > 500) {
        distance = 500
      }

      switch (unit) {
        case 0:
          return Math.floor(distance)  //cm
          break
        case 1:
          return Math.floor(distance / 254)   //inch
          break
        default:
          return 500
      }
  }
  // Ultrasonic Sensor @end

  // Button Module @start
  //% blockId="isButtonPressed"
  //% block="Button at|%pin|is pressed"
  //% pin.defl=DigitalReadPin.P0
  //% group="Button"
  //% subcategory="Sensor"

  export function isButtonPressed(pin: DigitalReadPin): boolean {
    let port = getDigitalPin(pin)
    return pins.digitalReadPin(port) == 0;
  }
  // Button Module @end

  // DHT11 @Start
  let dht11Humidity = 0
  let dht11Temperature = 0
  let startTime = 0

  //% blockId="DHT11_getvalue" block="Temperature and Humidity Sensor at|%pin| get value|%data_type"
  //% group="Temperature and Humidity"
  //% subcategory="Sensor"
  export function DHT11_getvalue(pin: DigitalWritePin, data_type: DHT11Type): number {
    const DHT11_TIMEOUT = 100
    const buffer = pins.createBuffer(40)
    const data = [0, 0, 0, 0, 0]
    let dht11pin = getDigitalPin(pin)

    if(control.micros() - startTime > 2000){
      // 1.start signal
      pins.digitalWritePin(dht11pin, 0)
      basic.pause(18)

      // 2.pull up and wait 40us
      pins.setPull(dht11pin, PinPullMode.PullUp)
      pins.digitalReadPin(dht11pin)
      control.waitMicros(40)

      // 3.read data
      startTime = control.micros()
      while (pins.digitalReadPin(dht11pin) === 0) {
          if (control.micros() - startTime > DHT11_TIMEOUT) break
      }
      startTime = control.micros()
      while (pins.digitalReadPin(dht11pin) === 1) {
          if (control.micros() - startTime > DHT11_TIMEOUT) break
      }

      for (let dataBits = 0; dataBits < 40; dataBits++) {
          startTime = control.micros()
          while (pins.digitalReadPin(dht11pin) === 1) {
              if (control.micros() - startTime > DHT11_TIMEOUT) break
          }
          startTime = control.micros()
          while (pins.digitalReadPin(dht11pin) === 0) {
              if (control.micros() - startTime > DHT11_TIMEOUT) break
          }
          control.waitMicros(28)
          if (pins.digitalReadPin(dht11pin) === 1) {
              buffer[dataBits] = 1
          }
      }

      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 8; j++) {
          if (buffer[8 * i + j] === 1) {
            data[i] += 2 ** (7 - j)
          }
        }
      }

      if (((data[0] + data[1] + data[2] + data[3]) & 0xff) === data[4]) {
        dht11Humidity = data[0] + data[1] * 0.1
        dht11Temperature = data[2] + data[3] * 0.1
      }
      startTime = control.micros()
    }

    switch (data_type) {
      case DHT11Type.Temperature_C:
        return dht11Temperature
      case DHT11Type.Temperature_F:
        return (dht11Temperature * 1.8) + 32
      case DHT11Type.Humidity:
        return dht11Humidity
    }
  }
  // DHT11 @end

  // Raindrop Sensor @start
  //% blockId=RaindropSensor block="Raindrop Sensor at %pin get value"
  //% group="Raindrop Sensor"
  //% subcategory="Sensor"
  export function RaindropSensor(pin: AnalogReadPin): number {
    let port = getAnalogPin(pin)
    return pins.analogReadPin(port)
  }
  // Raindrop Sensor @end

  // MQ-4 Sensor @start
  //% blockId=MQ4_Sensor block="MQ-4 Sensor at %pin get value"
  //% group="MQ-4 Sensor"
  //% subcategory="Sensor"
  export function MQ4_Sensor(pin: AnalogReadPin): number {
    let port = getAnalogPin(pin)
    return pins.analogReadPin(port)
  }
  // MQ-4 Sensor @end

  // IR Receiver @startTime
    let irState: IrState;

    const IR_REPEAT = 256;
    const IR_INCOMPLETE = 257;
    const IR_DATAGRAM = 258;

    const REPEAT_TIMEOUT_MS = 120;

    interface IrState {
      protocol: IrProtocol;
      hasNewDatagram: boolean;
      bitsReceived: uint8;
      addressSectionBits: uint16;
      commandSectionBits: uint16;
      hiword: uint16;
      loword: uint16;
      activeCommand: number;
      repeatTimeout: number;
      onIrButtonPressed: IrButtonHandler[];
      onIrButtonReleased: IrButtonHandler[];
      onIrDatagram: () => void;
    }
    class IrButtonHandler {
      irButton: IR_Button;
      onEvent: () => void;

      constructor(
        irButton: IR_Button,
        onEvent: () => void
      ) {
        this.irButton = irButton;
        this.onEvent = onEvent;
      }
    }


    function appendBitToDatagram(bit: number): number {
      irState.bitsReceived += 1;

      if (irState.bitsReceived <= 8) {
        irState.hiword = (irState.hiword << 1) + bit;
        if (irState.protocol === IrProtocol.Keyestudio && bit === 1) {
          // recover from missing message bits at the beginning
          // Keyestudio address is 0 and thus missing bits can be detected
          // by checking for the first inverse address bit (which is a 1)
          irState.bitsReceived = 9;
          irState.hiword = 1;
        }
      } else if (irState.bitsReceived <= 16) {
        irState.hiword = (irState.hiword << 1) + bit;
      } else if (irState.bitsReceived <= 32) {
        irState.loword = (irState.loword << 1) + bit;
      }

      if (irState.bitsReceived === 32) {
        irState.addressSectionBits = irState.hiword & 0xffff;
        irState.commandSectionBits = irState.loword & 0xffff;
        return IR_DATAGRAM;
      } else {
        return IR_INCOMPLETE;
      }
    }

    function decode(markAndSpace: number): number {
      if (markAndSpace < 1600) {
        // low bit
        return appendBitToDatagram(0);
      } else if (markAndSpace < 2700) {
        // high bit
        return appendBitToDatagram(1);
      }

      irState.bitsReceived = 0;

      if (markAndSpace < 12500) {
        // Repeat detected
        return IR_REPEAT;
      } else if (markAndSpace < 14500) {
        // Start detected
        return IR_INCOMPLETE;
      } else {
        return IR_INCOMPLETE;
      }
    }

    function enableIrMarkSpaceDetection(pin: DigitalPin) {
      pins.setPull(pin, PinPullMode.PullNone);

      let mark = 0;
      let space = 0;

      pins.onPulsed(pin, PulseValue.Low, () => {
        // HIGH, see https://github.com/microsoft/pxt-microbit/issues/1416
        mark = pins.pulseDuration();
      });

      pins.onPulsed(pin, PulseValue.High, () => {
        // LOW
        space = pins.pulseDuration();
        const status = decode(mark + space);

        if (status !== IR_INCOMPLETE) {
          handleIrEvent(status);
        }
      });
    }

    function handleIrEvent(irEvent: number) {

      // Refresh repeat timer
      if (irEvent === IR_DATAGRAM || irEvent === IR_REPEAT) {
        irState.repeatTimeout = input.runningTime() + REPEAT_TIMEOUT_MS;
      }

      if (irEvent === IR_DATAGRAM) {
        irState.hasNewDatagram = true;

        if (irState.onIrDatagram) {
          background.schedule(irState.onIrDatagram, background.Thread.UserCallback, background.Mode.Once, 0);
        }

        const newCommand = irState.commandSectionBits >> 8;

        // Process a new command
        if (newCommand !== irState.activeCommand) {

          if (irState.activeCommand >= 0) {
            const releasedHandler = irState.onIrButtonReleased.find(h => h.irButton === irState.activeCommand || IR_Button.Any === h.irButton);
            if (releasedHandler) {
              background.schedule(releasedHandler.onEvent, background.Thread.UserCallback, background.Mode.Once, 0);
            }
          }

          const pressedHandler = irState.onIrButtonPressed.find(h => h.irButton === newCommand || IR_Button.Any === h.irButton);
          if (pressedHandler) {
            background.schedule(pressedHandler.onEvent, background.Thread.UserCallback, background.Mode.Once, 0);
          }

          irState.activeCommand = newCommand;
        }
      }
    }

    function initIrState() {
      if (irState) {
        return;
      }

      irState = {
        protocol: undefined,
        bitsReceived: 0,
        hasNewDatagram: false,
        addressSectionBits: 0,
        commandSectionBits: 0,
        hiword: 0, // TODO replace with uint32
        loword: 0,
        activeCommand: -1,
        repeatTimeout: 0,
        onIrButtonPressed: [],
        onIrButtonReleased: [],
        onIrDatagram: undefined,
      };
    }

    function notifyIrEvents() {
      if (irState.activeCommand === -1) {
        // skip to save CPU cylces
      } else {
        const now = input.runningTime();
        if (now > irState.repeatTimeout) {
          // repeat timed out

          const handler = irState.onIrButtonReleased.find(h => h.irButton === irState.activeCommand || IR_Button.Any === h.irButton);
          if (handler) {
            background.schedule(handler.onEvent, background.Thread.UserCallback, background.Mode.Once, 0);
          }

          irState.bitsReceived = 0;
          irState.activeCommand = -1;
        }
      }
    }

    //% blockId=IR_onButton
    //% block="IR on button | %button | %action"
    //% button.fieldEditor="gridpicker"
    //% button.fieldOptions.columns=3
    //% button.fieldOptions.tooltips="false"
    //% group="IR Receiver"
    //% subcategory="Sensor"
    export function IR_onButton(
      button: IR_Button,
      action: IR_ButtonAction,
      handler: () => void
    ) {
      initIrState();
      if (action === IR_ButtonAction.Pressed) {
        irState.onIrButtonPressed.push(new IrButtonHandler(button, handler));
      }
      else {
        irState.onIrButtonReleased.push(new IrButtonHandler(button, handler));
      }
    }


    //% blockId=IR_DecodeResult
    //% block="IR button decode result is %button"
    //% button.fieldEditor="gridpicker"
    //% button.fieldOptions.columns=3
    //% button.fieldOptions.tooltips="false"
    //% group="IR Receiver"
    //% subcategory="Sensor"
    export function IR_isDecodeResult(button: IR_Button): boolean {
      let d=-1
      basic.pause(0); // Yield to support background processing when called in tight loops
      if (!irState) {
        d = IR_Button.Any
      }else{
        d = irState.commandSectionBits >> 8
      }
      return (d ==button)
    }

    //% blockId=IR_isReceived
    //% block="IR data is received"
    //% group="IR Receiver"
    //% subcategory="Sensor"
    export function IR_isReceived(): boolean {
      basic.pause(0); // Yield to support background processing when called in tight loops
      initIrState();
      if (irState.hasNewDatagram) {
        irState.hasNewDatagram = false;
        return true;
      } else {
        return false;
      }
    }

    // /**
    //  * Returns the command code of a specific IR button.
    //  * @param button the button
    //  */
    // //% blockId=IR_ButtonCode
    // //% button.fieldEditor="gridpicker"
    // //% button.fieldOptions.columns=3
    // //% button.fieldOptions.tooltips="false"
    // //% block="IR button code %button"
    // //% group="IR Receiver"
    // //% subcategory="Sensor"
    // export function IR_ButtonCode(button: IR_Button): number {
    //   basic.pause(0); // Yield to support background processing when called in tight loops
    //   return button as number;
    // }

    function ir_rec_to16BitHex(value: number): string {
      let hex = "";
      for (let pos = 0; pos < 4; pos++) {
        let remainder = value % 16;
        if (remainder < 10) {
          hex = remainder.toString() + hex;
        } else {
          hex = String.fromCharCode(55 + remainder) + hex;
        }
        value = Math.idiv(value, 16);
      }
      return hex;
    }

    //% blockId="IRReceiver_init"
    //% block="IR receiver at %pin"
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=4
    //% pin.fieldOptions.tooltips="false"
    //% group="IR Receiver"
    //% subcategory="Sensor"
    export function IRReceiver_init(pin: DigitalPin): void {
      initIrState();

      if (irState.protocol) {
        return;
      }

      irState.protocol = 1;

      enableIrMarkSpaceDetection(pin);

      background.schedule(notifyIrEvents, background.Thread.Priority, background.Mode.Repeat, REPEAT_TIMEOUT_MS);
    }
    // IR Receiver @end

    // RC522 RFID @start
    let MFRC522_ADDRESS = 0x28
    let Type2 = 0
    const BlockAdr: number[] = [8, 9, 10]
    let TPrescalerReg = 0x2B
    let TxControlReg = 0x14
    let PICC_READ = 0x30
    let PICC_ANTICOLL = 0x93
    let PCD_RESETPHASE = 0x0F
    let temp = 0
    let val = 0
    let uid: number[] = []

    let returnLen = 0
    let returnData: number[] = []
    let status = 0
    let u = 0
    let ChkSerNum = 0
    let returnBits: any = null
    let recvData: number[] = []
    let PCD_IDLE = 0
    let d = 0

    let Status2Reg = 0x08
    let CommandReg = 0x01
    let BitFramingReg = 0x0D
    let MAX_LEN = 16
    let PCD_AUTHENT = 0x0E
    let PCD_TRANSCEIVE = 0x0C
    let PICC_REQIDL = 0x26
    let PICC_AUTHENT1A = 0x60

    let ComIrqReg = 0x04
    let DivIrqReg = 0x05
    let FIFODataReg = 0x09
    let FIFOLevelReg = 0x0A
    let ControlReg = 0x0C
    let Key = [255, 255, 255, 255, 255, 255]

    function SetBits(reg: number, mask: number) {
        let tmp = i2cread(MFRC522_ADDRESS,reg)
        i2cwrite(MFRC522_ADDRESS, reg, (tmp | mask))
    }

    function readFromCard(): string {
        let [status, Type2] = Request(PICC_REQIDL)
        if (status != 0) {
            return null, null
        }

        [status, uid] = AvoidColl()

        if (status != 0) {
            return null, null
        }

        let id = getIDNum(uid)
        TagSelect(uid)
        status = Authent(PICC_AUTHENT1A, 11, Key, uid)
        let data: NumberFormat.UInt8LE[] = []
        let text_read = ''
        let block: number[] = []
        if (status == 0) {
            for (let BlockNum of BlockAdr) {
                block = ReadRFID(BlockNum)
                if (block) {
                    data = data.concat(block)
                }
            }
            if (data) {
                for (let c of data) {
                    text_read = text_read.concat(String.fromCharCode(c))
                }
            }
        }
        Crypto1Stop()
        return text_read
    }

    function writeToCard(txt: string): number {
        [status, Type2] = Request(PICC_REQIDL)

        if (status != 0) {
            return null, null
        }
        [status, uid] = AvoidColl()

        if (status != 0) {
            return null, null
        }

        let id = getIDNum(uid)
        TagSelect(uid)
        status = Authent(PICC_AUTHENT1A, 11, Key, uid)
        ReadRFID(11)

        if (status == 0) {
            let data: NumberFormat.UInt8LE[] = []
            for (let i = 0; i < txt.length; i++) {
                data.push(txt.charCodeAt(i))
            }

            for (let j = txt.length; j < 48; j++) {
                data.push(32)
            }

            let b = 0
            for (let BlockNum2 of BlockAdr) {
                WriteRFID(BlockNum2, data.slice((b * 16), ((b + 1) * 16)))
                b++
            }
        }

        Crypto1Stop()
        serial.writeLine("Written to Card")
        return id
    }


    function ReadRFID(blockAdr: number) {
        recvData = []
        recvData.push(PICC_READ)
        recvData.push(blockAdr)
        let pOut2 = []
        pOut2 = CRC_Calculation(recvData)
        recvData.push(pOut2[0])
        recvData.push(pOut2[1])
        let [status, returnData, returnLen] = MFRC522_ToCard(PCD_TRANSCEIVE, recvData)

        if (status != 0) {
            serial.writeLine("Error while reading!")
        }

        if (returnData.length != 16) {
            return null
        }
        else {
            return returnData
        }
    }

    function ClearBits(reg: number, mask: number) {
        let tmp = i2cread(MFRC522_ADDRESS,reg)
        i2cwrite(MFRC522_ADDRESS, reg, tmp & (~mask))
    }



    function Request(reqMode: number): [number, any] {
        let Type: number[] = []
        i2cwrite(MFRC522_ADDRESS, BitFramingReg, 0x07)
        Type.push(reqMode)
        let [status, returnData, returnBits] = MFRC522_ToCard(PCD_TRANSCEIVE, Type)

        if ((status != 0) || (returnBits != 16)) {
            status = 2
        }

        return [status, returnBits]
    }

    function AntennaON() {
        temp = i2cread(MFRC522_ADDRESS,TxControlReg)
        if (~(temp & 0x03)) {
            SetBits(TxControlReg, 0x03)
        }
    }

    function AvoidColl(): [number, number[]] {
        let SerNum = []
        ChkSerNum = 0
        i2cwrite(MFRC522_ADDRESS, BitFramingReg, 0)
        SerNum.push(PICC_ANTICOLL)
        SerNum.push(0x20)
        let [status, returnData, returnBits] = MFRC522_ToCard(PCD_TRANSCEIVE, SerNum)

        if (status == 0) {
            if (returnData.length == 5) {
                for (let k = 0; k <= 3; k++) {
                    ChkSerNum = ChkSerNum ^ returnData[k]
                }
                if (ChkSerNum != returnData[4]) {
                    status = 2
                }
            }
            else {
                status = 2
            }
        }
        return [status, returnData]
    }

    function Crypto1Stop() {
        ClearBits(Status2Reg, 0x08)
    }


    function Authent(authMode: number, BlockAdr: number, Sectorkey: number[], SerNum: number[]) {
        let buff: number[] = []
        buff.push(authMode)
        buff.push(BlockAdr)
        for (let l = 0; l < (Sectorkey.length); l++) {
            buff.push(Sectorkey[l])
        }
        for (let m = 0; m < 4; m++) {
            buff.push(SerNum[m])
        }
        [status, returnData, returnLen] = MFRC522_ToCard(PCD_AUTHENT, buff)
        if (status != 0) {
            serial.writeLine("AUTH ERROR!")
        }
        if ((i2cread(MFRC522_ADDRESS,Status2Reg) & 0x08) == 0) {
            serial.writeLine("AUTH ERROR2!")
        }
        return status
    }

    function MFRC522_ToCard(command: number, sendData: number[]): [number, number[], number] {
        returnData = []
        returnLen = 0
        status = 2
        let irqEN = 0x00
        let waitIRQ = 0x00
        let lastBits = null
        let n = 0

        if (command == PCD_AUTHENT) {
            irqEN = 0x12
            waitIRQ = 0x10
        }

        if (command == PCD_TRANSCEIVE) {
            irqEN = 0x77
            waitIRQ = 0x30
        }

        i2cwrite(MFRC522_ADDRESS, 0x02, irqEN | 0x80)
        ClearBits(ComIrqReg, 0x80)
        SetBits(FIFOLevelReg, 0x80)
        i2cwrite(MFRC522_ADDRESS, CommandReg, PCD_IDLE)

        for (let o = 0; o < (sendData.length); o++) {
            i2cwrite(MFRC522_ADDRESS, FIFODataReg, sendData[o])
        }
        i2cwrite(MFRC522_ADDRESS, CommandReg, command)

        if (command == PCD_TRANSCEIVE) {
            SetBits(BitFramingReg, 0x80)
        }

        let p = 2000
        while (true) {
            n = i2cread(MFRC522_ADDRESS,ComIrqReg)
            p--
            if (~(p != 0 && ~(n & 0x01) && ~(n & waitIRQ))) {
                break
            }
        }
        ClearBits(BitFramingReg, 0x80)

        if (p != 0) {
            if ((i2cread(MFRC522_ADDRESS,0x06) & 0x1B) == 0x00) {
                status = 0
                if (n & irqEN & 0x01) {
                    status = 1
                }
                if (command == PCD_TRANSCEIVE) {
                    n = i2cread(MFRC522_ADDRESS,FIFOLevelReg)
                    lastBits = i2cread(MFRC522_ADDRESS,ControlReg) & 0x07
                    if (lastBits != 0) {
                        returnLen = (n - 1) * 8 + lastBits
                    }
                    else {
                        returnLen = n * 8
                    }
                    if (n == 0) {
                        n = 1
                    }
                    if (n > MAX_LEN) {
                        n = MAX_LEN
                    }
                    for (let q = 0; q < n; q++) {
                        returnData.push(i2cread(MFRC522_ADDRESS,FIFODataReg))
                    }
                }
            }
            else {
                status = 2
            }
        }

        return [status, returnData, returnLen]
    }

    function TagSelect(SerNum: number[]) {
        let buff: number[] = []
        buff.push(0x93)
        buff.push(0x70)
        for (let r = 0; r < 5; r++) {
            buff.push(SerNum[r])
        }

        let pOut = CRC_Calculation(buff)
        buff.push(pOut[0])
        buff.push(pOut[1])
        let [status, returnData, returnLen] = MFRC522_ToCard(PCD_TRANSCEIVE, buff)
        if ((status == 0) && (returnLen == 0x18)) {
            return returnData[0]
        }
        else {
            return 0
        }
    }

    function CRC_Calculation(DataIn: number[]) {
        ClearBits(DivIrqReg, 0x04)
        SetBits(FIFOLevelReg, 0x80)
        for (let s = 0; s < (DataIn.length); s++) {
            i2cwrite(MFRC522_ADDRESS, FIFODataReg, DataIn[s])
        }
        i2cwrite(MFRC522_ADDRESS, CommandReg, 0x03)
        let t = 0xFF

        while (true) {
            let v = i2cread(MFRC522_ADDRESS,DivIrqReg)
            t--
            if (!(t != 0 && !(v & 0x04))) {
                break
            }
        }

        let DataOut: number[] = []
        DataOut.push(i2cread(MFRC522_ADDRESS,0x22))
        DataOut.push(i2cread(MFRC522_ADDRESS,0x21))
        return DataOut
    }

    function WriteRFID(blockAdr: number, writeData: number[]) {
        let buff: number[] = []
        let crc: number[] = []

        buff.push(0xA0)
        buff.push(blockAdr)
        crc = CRC_Calculation(buff)
        buff.push(crc[0])
        buff.push(crc[1])
        let [status, returnData, returnLen] = MFRC522_ToCard(PCD_TRANSCEIVE, buff)
        if ((status != 0) || (returnLen != 4) || ((returnData[0] & 0x0F) != 0x0A)) {
            status = 2
            serial.writeLine("ERROR")
        }

        if (status == 0) {
            let buff2: number[] = []
            for (let w = 0; w < 16; w++) {
                buff2.push(writeData[w])
            }
            crc = CRC_Calculation(buff2)
            buff2.push(crc[0])
            buff2.push(crc[1])
            let [status, returnData, returnLen] = MFRC522_ToCard(PCD_TRANSCEIVE, buff2)
            if ((status != 0) || (returnLen != 4) || ((returnData[0] & 0x0F) != 0x0A)) {
                serial.writeLine("Error while writing")
            }
            else {
                serial.writeLine("Data written")
            }
        }
    }

    function getIDNum(uid: number[]) {
        let a = 0

        for (let e = 0; e < 5; e++) {
            a = a * 256 + uid[e]
        }
        return a
    }

    function readID() {
        [status, Type2] = Request(PICC_REQIDL)

        if (status != 0) {
            return null
        }
        [status, uid] = AvoidColl()

        if (status != 0) {
            return null
        }

        return getIDNum(uid)
    }

    //% block="RFID read ID"
    //% group="RFID"
    //% subcategory="Sensor"
    export function RFID_getID() {
        let id = readID()
        while (!(id)) {
            id = readID()
            if (id != undefined) {
                return id
            }
        }
        return id
    }

    //% block="RFID read data"
    //% group="RFID"
    //% subcategory="Sensor"
    export function RFID_readData(): string {
        let text = readFromCard()
        while (!text) {
            let text = readFromCard()

            if (text != '') {
                return text
            }
        }
        return text
    }


    //% block="RFID write data %text to card"
    //% text.defl="Acebott"
    //% group="RFID"
    //% subcategory="Sensor"
    export function RFID_writeTocard(text: string) {
        let id = writeToCard(text)

        while (!id) {
            let id = writeToCard(text)

            if (id != undefined) {
                return
            }
        }
        return
    }

    //% block="RFID Module initialization"
    //% group="RFID"
    //% subcategory="Sensor"
    export function RFID_init() {
        // reset module
        i2cwrite(MFRC522_ADDRESS, CommandReg, PCD_RESETPHASE)

        i2cwrite(MFRC522_ADDRESS, 0x2A, 0x8D)
        i2cwrite(MFRC522_ADDRESS, 0x2B, 0x3E)
        i2cwrite(MFRC522_ADDRESS, 0x2D, 30)
        i2cwrite(MFRC522_ADDRESS, 0x2E, 0)
        i2cwrite(MFRC522_ADDRESS, 0x15, 0x40)
        i2cwrite(MFRC522_ADDRESS, 0x11, 0x3D)
        AntennaON()
    }

    // RC522 RFID @end

    // Trace Sensor @start
    let L_PIN = 0;
    let M_PIN = 0;
    let R_PIN = 0;


    //% blockId=Trace_Sensor_getValue block="Trace Sensor get value %index"
    //% group="Trace Sensor"
    //% subcategory="Sensor"
    export function Trace_Sensor_getValue(index: Trace_Sensor_Index): number {
      switch (index) {
          case 0:
              return pins.analogReadPin(R_PIN)
          case 1:
              return pins.analogReadPin(M_PIN)
          case 2:
              return pins.analogReadPin(L_PIN)
          default:
              return -1
      }
    }

    //% blockId=Trace_Sensor_init block="Trace Sensor set pin at (R:%rpin, M:|%mpin|, L:|%lpin)"
    //% rpin.defl=AnalogReadPin.P0
    //% mpin.defl=AnalogReadPin.P1
    //% lpin.defl=AnalogReadPin.P2
    //% group="Trace Sensor"
    //% subcategory="Sensor"
    export function Trace_Sensor_init(rpin: AnalogReadPin, mpin: AnalogReadPin, lpin: AnalogReadPin): void {
      R_PIN = getAnalogPin(rpin)
      M_PIN = getAnalogPin(mpin)
      L_PIN = getAnalogPin(lpin)
    }
    // Trace Sensor @end


    // Speech Recognition @start

    let speech_cmd = 0;

    //% block="Speech Recognition getCMD is %cmd_in"
    //% blockId = Speech_Recognition_getCMD
    //% group="Speech Recognition"
    //% subcategory="Sensor"
    export function Speech_Recognition_getCMD(cmd_in: number): boolean {
        return cmd_in == speech_cmd;
    }
    

    //% blockId="Speech_Recognition_Init" 
    //% block="Speech Recognition Init TX at %asrTX"
    //% group="Speech Recognition"
    //% subcategory="Sensor"
    export function Speech_Recognition_Init(asrTX: UARTPin): void {
        serial.redirect(SerialPin.USB_TX, getUartPin(asrTX), BaudRate.BaudRate115200);
        basic.forever(function () {
            let list = serial.readBuffer(1).toArray(NumberFormat.UInt8BE);
            speech_cmd = list[0];
        })
    }
    // Speech Recognition @end

    export enum RGBLights {
        //% blockId="Right_RGB" block="Right"
         RGB_R = 1,
        //% blockId="Left_RGB" block="Left"
         RGB_L = 2,
        //% blockId="ALL" block="ALL"
         ALL = 3
    }

    //% blockId=colorLight block="Set LED %light color $color"
    //% color.shadow="colorNumberPicker"
    //% weight=65
    //% group="Microbit car"
    //% subcategory="Executive"
    export function colorLight(light: RGBLights, color: number): void {
        let r: number, g: number, b: number;
        r = (color >> 16) & 0xFF; // 提取红色分量
        g = (color >> 8) & 0xFF;  // 提取绿色分量
        b = color & 0xFF;         // 提取蓝色分量
        singleheadlights(light, r, g, b); // 调用底层函数设置灯光颜色
    }

    
    //% inlineInputMode=inline
    //% blockId=singleheadlights block="Set %light lamp color R:%r G:%g B:%b"
    //% r.min=0 r.max=255
    //% g.min=0 g.max=255
    //% b.min=0 b.max=255
    //% weight=60
    //% group="Microbit car"
    //% subcategory="Executive"
    export function singleheadlights(light: RGBLights, r: number, g: number, b: number): void {
        let buf = pins.createBuffer(5);
        
        buf[0] = 0x00;                  
        buf[2] = r;		                
        buf[3] = g;		                
        buf[4] = b;

        if (light == 1) { buf[1] = 0x03; pins.i2cWriteBuffer(0x18, buf); basic.pause(10) }

        else if (light == 2) { buf[1] = 0x04; pins.i2cWriteBuffer(0x18, buf); basic.pause(10) }

         else if (light == 3) { buf[1] = 0x05; pins.i2cWriteBuffer(0x18, buf);  }               
    }

    
    // Microbit Car  @start

    export enum Direction {
        //% block="Forward" enumval=0
        forward,
        //% block="Backward" enumval=1
        backward,
        //% block="Left" enumval=2
        left,
        //% block="Right" enumval=3
        right
    }

    //% blockId=stopcar block="Stop"
    //% subcategory="Executive"
    //% group="Microbit car"
    //% weight=70
    export function stopcar(): void {
        let buf = pins.createBuffer(5);
        buf[0] = 0x00;                      //补位
        buf[1] = 0x01;		                //左轮
        buf[2] = 0x00;
        buf[3] = 0;	                        //速度	
        pins.i2cWriteBuffer(0x18, buf);     //数据发送

        buf[1] = 0x02;		                //右轮停止
        pins.i2cWriteBuffer(0x18, buf);     //数据发送
    }

    //% blockId=motors block="Left wheel speed %lspeed\\% | right speed %rspeed\\%"
    //% lspeed.min=-100 lspeed.max=100
    //% rspeed.min=-100 rspeed.max=100
    //% weight=100
    //% group="Microbit car"
    //% subcategory="Executive"
    export function motors(lspeed: number = 50, rspeed: number = 50): void {
        let buf = pins.createBuffer(4);
        if (lspeed > 100) {
            lspeed = 100;
        } else if (lspeed < -100) {
            lspeed = -100;
        }
        if (rspeed > 100) {
            rspeed = 100;
        } else if (rspeed < -100) {
            rspeed = -100;
        }
        if (lspeed > 0) {
            buf[0] = 0x00;                      
            buf[1] = 0x01;   //左轮
            buf[2] = 0x02;   //向前
            buf[3] = lspeed;	  
            pins.i2cWriteBuffer(0x18, buf);
        }
        else {
            lspeed = ~lspeed;
            buf[0] = 0x00;                     
            buf[1] = 0x01;   //左轮
            buf[2] = 0x01;   //向后
            buf[3] = lspeed;	 
            pins.i2cWriteBuffer(0x18, buf);
        }
        if (rspeed > 0) {
            buf[0] = 0x00;                      
            buf[1] = 0x02;   //右轮
            buf[2] = 0x02;   //向前
            buf[3] = rspeed;	 
            pins.i2cWriteBuffer(0x18, buf);
        }
        else {
            rspeed = ~rspeed;
            buf[0] = 0x00;                      
            buf[1] = 0x02;   //右轮
            buf[2] = 0x01;   //向前
            buf[3] = rspeed;	    
            pins.i2cWriteBuffer(0x18, buf);
        }
          
    }

    
    //% blockId=c block="Set direction %dir | speed %speed"
    //% weight=100
    //% speed.min=0 speed.max=100
    //% group="Microbit car"
    //% subcategory="Executive"
    export function moveTime(dir: Direction, speed: number = 50): void {

        let buf = pins.createBuffer(5);
        if (dir == 0) {                      
            buf[0] = 0x00;                  
            buf[1] = 0x01;
            buf[2] = 0x02;
            buf[3] = speed;	                 
            pins.i2cWriteBuffer(0x18, buf);

            buf[1] = 0x02;
            pins.i2cWriteBuffer(0x18, buf);
        }
        if (dir == 1) {                  
            buf[0] = 0x00;                  
            buf[1] = 0x01;
            buf[2] = 0x01;
            buf[3] = speed;	               
            pins.i2cWriteBuffer(0x18, buf);

            buf[1] = 0x02;
            pins.i2cWriteBuffer(0x18, buf);
        }
        if (dir == 2) {                    
            buf[0] = 0x00;                 
            buf[1] = 0x01;	
            buf[2] = 0x01;
            buf[3] = speed;	             
            pins.i2cWriteBuffer(0x18, buf);

            buf[1] = 0x02;
            buf[2] = 0x02;
            pins.i2cWriteBuffer(0x18, buf);
        }
        if (dir == 3) {                   
            buf[0] = 0x00;                
            buf[1] = 0x01;	
            buf[2] = 0x02;
            buf[3] = speed;	                        
            pins.i2cWriteBuffer(0x18, buf);

            buf[1] = 0x02;
            buf[2] = 0x01;
            pins.i2cWriteBuffer(0x18, buf);

        }

    }

    
    // Microbit Car  @start

    let _initEvents = true

    export enum MbPins {
        //% block="Left" 
        Left = DAL.MICROBIT_ID_IO_P1,
        //% block="Right" 
        Right = DAL.MICROBIT_ID_IO_P0
    }

    
    //% blockId=tracking block="%pin tracking value"
    //% state.fieldEditor="gridpicker" state.fieldOptions.columns=2
    //% side.fieldEditor="gridpicker" side.fieldOptions.columns=2
    //% weight=45
    //% subcategory="Executive"
    export function tracking(side: MbPins): number {
        pins.setPull(AnalogReadWritePin.P0, PinPullMode.PullUp); 
        pins.setPull(AnalogReadWritePin.P1, PinPullMode.PullUp);  
        let left_tracking = pins.analogReadPin(AnalogReadWritePin.P0); 
        let right_tracking = pins.analogReadPin(AnalogReadWritePin.P1); 

        if (side == MbPins.Left) {
            return left_tracking;
        }
        else if (side == MbPins.Right) {
            return right_tracking;
        }
        else {
            return 0;
        }
    }
    // Microbit Car  @end

    // Microbit controller  @start

    //% blockId=Rocker_X_read block="读取摇杆X"
    //% group="Microbit controller"
    //% subcategory="Executive"
    export function Rocker_X_read(): number {
        return pins.analogReadPin(AnalogPin.P1);
    }

    //% blockId=Rocker_Y_read block="读取摇杆Y"
    //% group="Microbit controller"
    //% subcategory="Executive"
    export function Rocker_Y_read(): number {
        return pins.analogReadPin(AnalogPin.P2);
    }

    //% blockId=Rocker_Key_read block="读取摇杆按键"
    //% group="Microbit controller"
    //% subcategory="Executive"
    export function Rocker_Key_read(): number {
        pins.setPull(DigitalPin.P8, PinPullMode.PullUp)
        return pins.digitalReadPin(DigitalPin.P8);
    }

    export enum Four_key {
        //% block="Up" enumval=0
        up,
        //% block="Down" enumval=1
        down,
        //% block="Left" enumval=2
        left,
        //% block="Right" enumval=3
        right
    }

    //% blockId=Four_bit_key block="读取 Four_key %dir 按键"
    //% group="Microbit controller"
    //% subcategory="Executive"
    export function Four_bit_key(dir: Four_key): boolean {
        // 设置引脚的上拉电阻
        pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P14, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P16, PinPullMode.PullUp)

        // 根据方向读取对应的按键状态
        switch (dir) {
            case Four_key.up:
                return pins.digitalReadPin(DigitalPin.P16) === 0;
            case Four_key.down:
                return pins.digitalReadPin(DigitalPin.P14) === 0;
            case Four_key.left:
                return pins.digitalReadPin(DigitalPin.P15) === 0;
            case Four_key.right:
                return pins.digitalReadPin(DigitalPin.P13) === 0;
            default:
                return false; // 如果传入无效的方向，返回 false
        }
    }


    export enum Vibration_motor_condition {
        //% block="ON" enumval=0
        on,
        //% block="OFF" enumval=1
        off,
    }

    // 控制震动电机
    //% blockId=Vibrating_machine block="震动电机 %condition"
    //% group="Microbit controller"
    //% subcategory="Executive"
    export function Vibrating_machine(condition: Vibration_motor_condition): void {
        if (condition === Vibration_motor_condition.on) {
            pins.digitalWritePin(DigitalPin.P12, 1); // 打开震动电机
        } else {
            pins.digitalWritePin(DigitalPin.P12, 0); // 关闭震动电机
        }
    }
        // Microbit controller  @end

}
