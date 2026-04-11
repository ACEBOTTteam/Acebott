class SugarServo {
    private _pin: AnalogPin
    private _speed: number
    private _reversed: boolean
    private _neutral: number

    constructor(pin: AnalogPin) {
        this._pin = pin
        this._speed = 0
        this._reversed = false
        this._neutral = 1500
        pins.servoSetPulse(this._pin, this._neutral)
    }

    setReversed(enable: boolean): void {
        this._reversed = enable
    }

    setNeutral(micros: number): void {
        this._neutral = micros
    }

    run(speed: number): void {
        if (speed > 100) speed = 100
        if (speed < -100) speed = -100

        if (this._reversed) {
            speed = -speed
        }

        // 死区
        if (Math.abs(speed) < 5) {
            speed = 0
        }

        let pulse = this._neutral + speed * 5
        pins.servoSetPulse(this._pin, pulse)

        this._speed = speed
    }

    stop(): void {
        pins.servoSetPulse(this._pin, this._neutral)
        this._speed = 0
    }

    getSpeed(): number {
        return this._speed
    }
}