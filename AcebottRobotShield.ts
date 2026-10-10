// AcebottSTC.ts
// STC8H I2C servo controller driver.
//
// The STC firmware accepts a two-byte I2C write:
//   [channel] [angle]
// The I2C address is the 7-bit address 0x37.

class AcebottSTC {
    private i2cAddr: number

    constructor() {
        this.i2cAddr = 0x37
    }

    public setServoAngle(channel: number, degree: number): void {
        if (channel < 0 || channel > 5) {
            return
        }

        if (degree < 0) {
            degree = 0
        }
        if (degree > 180) {
            degree = 180
        }

        let buf = pins.createBuffer(2)
        buf[0] = Math.round(channel)
        buf[1] = Math.round(degree)
        pins.i2cWriteBuffer(this.i2cAddr, buf)
    }
}

// Mechanical-arm support extracted from AcebottAdvanced.ts and AcebottMicrobit.ts.
namespace Acebott {
    let adc7828Init = false
    let adc7828: AcebottADC7828

    export enum Adc7828Channel {
        //% block="CH0"
        CH0 = 0,
        //% block="CH1"
        CH1 = 1,
        //% block="CH2"
        CH2 = 2,
        //% block="CH3"
        CH3 = 3,
        //% block="CH4"
        CH4 = 4,
        //% block="CH5"
        CH5 = 5,
        //% block="CH6"
        CH6 = 6,
        //% block="CH7"
        CH7 = 7
    }

    function initADC7828(): void {
        if (!adc7828Init) {
            adc7828 = new AcebottADC7828()
            adc7828Init = true
        }
    }
    /**
     * ADC7828 read channel.
     */

    //% blockId=adc7828ReadChannel block="ADC7828 read channel %channel"
    //% subcategory="Sensor"
    //% group="ADC7828 Sensor"
    //% help=github:acebott/docs/reference
    export function adc7828ReadChannel(channel: Adc7828Channel): number {
        initADC7828()
        return adc7828.readChannel(channel)
    }
    /**
     * ADC7828 set address.
     */

    //% blockId=adc7828SetAddress block="ADC7828 set address %addr"
    //% subcategory="Sensor"
    //% group="ADC7828 Sensor"
    //% help=github:acebott/docs/reference
    export function adc7828SetAddress(addr: Adc7828I2cAddress): void {
        initADC7828()
        adc7828.setAddress(addr)
    }
    function acebottI2cProbe(address: number): boolean {
        // 0x00-0x07 and 0x78-0x7F are reserved 7-bit addresses.
        if (address < 0x08 || address > 0x77) {
            return false
        }

        // An empty buffer does not issue an I2C transaction on some targets.
        // Send one zero byte so the device must acknowledge its address.
        let probe = pins.createBuffer(1)
        probe[0] = 0
        let status = pins.i2cWriteBuffer(address, probe, false)
        return status == 0
    }

    function acebottHexDigitValue(code: number): number {
        if (code >= 48 && code <= 57) {
            return code - 48
        }
        if (code >= 65 && code <= 70) {
            return code - 65 + 10
        }
        if (code >= 97 && code <= 102) {
            return code - 97 + 10
        }
        return -1
    }

    function acebottParseI2cHexAddress(text: string): number {
        if (text.length != 4 || text.charAt(0) != "0") {
            return -1
        }
        let prefix = text.charAt(1)
        if (prefix != "x" && prefix != "X") {
            return -1
        }

        let high = acebottHexDigitValue(text.charCodeAt(2))
        let low = acebottHexDigitValue(text.charCodeAt(3))
        if (high < 0 || low < 0) {
            return -1
        }
        return high * 16 + low
    }

    function acebottI2cAddressText(address: number): string {
        let hex = "0123456789ABCDEF"
        return "0x" + hex.charAt((address >> 4) & 0x0F) + hex.charAt(address & 0x0F)
    }

    /**
     * Scan all standard usable 7-bit I2C addresses and print responding addresses to serial.
     */
    //% blockId=i2cAddressRead block="I2C address read"
    //% subcategory="Display"
    //% group="I2C Tools"
    //% weight=100
    //% help=github:acebott/docs/reference
    export function i2cAddressRead(): void {
        let found = 0
        serial.writeLine("I2C scan start")

        // 0x00-0x07 and 0x78-0x7F are reserved I2C addresses.
        for (let address = 0x08; address <= 0x77; address++) {
            if (acebottI2cProbe(address)) {
                serial.writeLine("I2C found: " + acebottI2cAddressText(address))
                found += 1
            }
        }

        if (found == 0) {
            serial.writeLine("I2C scan: no device")
        } else {
            serial.writeLine("I2C scan done")
        }
    }

    /** Check whether a manually entered hexadecimal 7-bit IIC address acknowledges. */
    //% blockId=i2cAddressCheck block="check IIC address %address"
    //% address.defl="0x37"
    //% subcategory="Display"
    //% group="I2C Tools"
    //% weight=95
    //% help=github:acebott/docs/reference
    export function i2cAddressCheck(address: string): boolean {
        return acebottI2cProbe(acebottParseI2cHexAddress(address))
    }

    /**
     * Legacy STC check retained for existing projects.
     * It is hidden from the blocks toolbox.
     */
    //% blockId=stcI2cCheck block="check STC I2C 0x37"
    //% blockHidden=true
    //% subcategory="Sensor"
    //% group="I2C Tools"
    //% help=github:acebott/docs/reference
    export function stcI2cCheck(): boolean {
        return acebottI2cProbe(0x37)
    }

    /**
     * Legacy ADC7828 check retained for existing projects.
     * It is hidden from the blocks toolbox.
     */
    //% blockId=adc7828I2cCheck block="check ADC7828 I2C address %addr"
    //% blockHidden=true
    //% addr.defl=Adc7828I2cAddress.Address0x48
    //% subcategory="Sensor"
    //% group="I2C Tools"
    //% help=github:acebott/docs/reference
    export function adc7828I2cCheck(addr: Adc7828I2cAddress): boolean {
        return acebottI2cProbe(addr)
    }

    /**
     * Legacy combined check retained only for existing projects.
     * It is silent and hidden from the blocks toolbox.
     */
    //% blockId=i2cInitCheck block="I2C initialization check|ADC address %addr"
    //% blockHidden=true
    //% addr.defl=Adc7828I2cAddress.Address0x48
    //% subcategory="Sensor"
    //% group="ADC7828 Sensor"
    //% help=github:acebott/docs/reference
    export function i2cInitCheck(addr: Adc7828I2cAddress): boolean {
        return stcI2cCheck() && adc7828I2cCheck(addr)
    }


    let stcInit = false
    let stc: AcebottSTC

    function initSTC(): void {
        if (!stcInit) {
            stc = new AcebottSTC()
            stcInit = true
        }
    }

    /**
     * Control a servo through the external STC8H robotic arm controller.
     */
    //% blockId=stcServoAngle block="microbit robotic arm|channel %channel|angle %degree"
    //% channel.min=0 channel.max=5 channel.defl=0
    //% degree.min=0 degree.max=180 degree.defl=90
    //% group="Microbit Controller"
    //% subcategory="Executive"
    //% help=github:acebott/docs/reference
    export function stcServoAngle(channel: number, degree: number): void {
        initSTC()
        stc.setServoAngle(channel, degree)
    }

}

// AcebottArm.ts
// First robotic-arm block: control the base joint with the ADC7828 joystick.

namespace Acebott {
    /**
     * Output channels for the robotic arm.
     * STC0-STC5 use the external STC controller.
     * P2 and P12 use the micro:bit pins directly.
     */
    export enum ArmOutputChannel {
        //% block="servo0"
        STC0 = 0,
        //% block="servo1"
        STC1 = 1,
        //% block="servo2"
        STC2 = 2,
        //% block="servo3"
        STC3 = 3,
        //% block="servo4"
        STC4 = 4,
        //% block="servo5"
        STC5 = 5,
        //% block="servo6"
        MicrobitP2 = 6,
        //% block="servo7"
        MicrobitP12 = 7
    }

    /** Robotic-arm joints. */
    export enum ArmJoint {
        //% block="chassis"
        Chassis = 0,
        //% block="shoulder"
        Shoulder = 1,
        //% block="elbow"
        Elbow = 2,
        //% block="claws"
        Claws = 3
    }

    /** Actions for the in-memory pose recorder. */
    export enum ArmMemoryMode {
        //% block="save"
        Save = 0,
        //% block="run"
        Run = 1,
        //% block="delete"
        Delete = 2
    }

    /** Cartesian coordinate axes. */
    export enum ArmCoordinateAxis {
        //% block="X"
        X = 0,
        //% block="Y"
        Y = 1,
        //% block="Z"
        Z = 2
    }

    /** Left or right ADC7828 joystick. */
    export enum ArmJoystickSide {
        //% block="left"
        Left = 0,
        //% block="right"
        Right = 1
    }

    /** Raw value to read from a configured ADC7828 joystick. */
    export enum ArmJoystickValue {
        //% block="X"
        X = 0,
        //% block="Y"
        Y = 1,
        //% block="SW"
        SW = 2
    }

    /** M1 or M2 motor on the robotic-arm controller board. */
    export enum ArmMotor {
        //% block="M1"
        M1 = 1,
        //% block="M2"
        M2 = 2
    }

    const ARM_BASE_HEIGHT = 10.5
    const ARM_SHOULDER_LENGTH = 8.5
    const ARM_ELBOW_LENGTH = 10.9
    const ARM_MAX_MEMORY_STATES = 20
    const ARM_JOYSTICK_LOW = 50
    const ARM_JOYSTICK_HIGH = 250
    const ARM_DEG_TO_RAD = 0.017453292519943295
    const ARM_RAD_TO_DEG = 57.29577951308232

    let armJointOutputs = [
        ArmOutputChannel.STC0,
        ArmOutputChannel.STC1,
        ArmOutputChannel.STC2,
        ArmOutputChannel.STC3
    ]
    let armJointAngles = [90, 90, 90, 90]
    // Offset of the active XYZ origin in the original coordinate frame.
    let armCoordinateOrigin = [0, 0, 0]
    let armLastSpeed = 10

    let armMemoryChassis: number[] = []
    let armMemoryShoulder: number[] = []
    let armMemoryElbow: number[] = []
    let armMemoryClaws: number[] = []

    let armLeftJoystick = [0, 1, 4]
    let armRightJoystick = [2, 3, 5]
    let armLeftJoystickConfigured = false
    let armRightJoystickConfigured = false
    let armJoystickLoopStarted = false

    function constrainArmJointAngle(joint: ArmJoint, angle: number): number {
        angle = Math.round(angle)
        if (joint == ArmJoint.Elbow) {
            return Math.constrain(angle, 0, 119)
        }
        return Math.constrain(angle, 0, 180)
    }

    // Measured shoulder minimum for each elbow angle.
    // Boundary points: (36,6), (62,18), (90,27), (105,30).
    // Angles outside the measured interval keep the nearest endpoint limit.
    function armShoulderMinimumForElbow(elbow: number): number {
        elbow = Math.constrain(elbow, 0, 119)
        if (elbow <= 36) {
            return 6
        } else if (elbow <= 62) {
            return 6 + (elbow - 36) * 12 / 26
        } else if (elbow <= 90) {
            return 18 + (elbow - 62) * 9 / 28
        } else if (elbow <= 105) {
            return 27 + (elbow - 90) * 3 / 15
        }
        return 30
    }

    function isArmJointPairSafe(shoulder: number, elbow: number): boolean {
        return shoulder >= armShoulderMinimumForElbow(elbow)
    }

    function writeArmJoint(joint: ArmJoint, angle: number): void {
        angle = constrainArmJointAngle(joint, angle)

        let proposedShoulder = armJointAngles[ArmJoint.Shoulder]
        let proposedElbow = armJointAngles[ArmJoint.Elbow]
        if (joint == ArmJoint.Shoulder) {
            proposedShoulder = angle
        } else if (joint == ArmJoint.Elbow) {
            proposedElbow = angle
        }

        // Stop only the requested joint when the shoulder/elbow limit is reached.
        if (!isArmJointPairSafe(proposedShoulder, proposedElbow)) {
            return
        }

        armJointAngles[joint] = angle
        writeArmOutput(armJointOutputs[joint], angle)
    }

    // Validate and update one complete four-joint pose as a single operation.
    function writeArmPose(
        chassis: number,
        shoulder: number,
        elbow: number,
        claws: number
    ): boolean {
        chassis = constrainArmJointAngle(ArmJoint.Chassis, chassis)
        shoulder = constrainArmJointAngle(ArmJoint.Shoulder, shoulder)
        elbow = constrainArmJointAngle(ArmJoint.Elbow, elbow)
        claws = constrainArmJointAngle(ArmJoint.Claws, claws)

        if (!isArmJointPairSafe(shoulder, elbow)) {
            return false
        }

        writeArmOutput(armJointOutputs[ArmJoint.Chassis], chassis)
        writeArmOutput(armJointOutputs[ArmJoint.Shoulder], shoulder)
        writeArmOutput(armJointOutputs[ArmJoint.Elbow], elbow)
        writeArmOutput(armJointOutputs[ArmJoint.Claws], claws)
        armJointAngles[ArmJoint.Chassis] = chassis
        armJointAngles[ArmJoint.Shoulder] = shoulder
        armJointAngles[ArmJoint.Elbow] = elbow
        armJointAngles[ArmJoint.Claws] = claws
        return true
    }

    function armStepDelay(speed: number): number {
        speed = Math.constrain(Math.round(speed), 1, 100)
        return Math.idiv(101 - speed, 2) + 1
    }

    function moveArmPose(
        chassis: number,
        shoulder: number,
        elbow: number,
        claws: number,
        speed: number
    ): void {
        chassis = constrainArmJointAngle(ArmJoint.Chassis, chassis)
        shoulder = constrainArmJointAngle(ArmJoint.Shoulder, shoulder)
        elbow = constrainArmJointAngle(ArmJoint.Elbow, elbow)
        claws = constrainArmJointAngle(ArmJoint.Claws, claws)
        speed = Math.constrain(Math.round(speed), 1, 100)
        armLastSpeed = speed

        if (!isArmJointPairSafe(shoulder, elbow)) {
            serial.writeLine("Arm shoulder/elbow safety limit")
            return
        }

        // At maximum speed, send only the final target angle. The servo then
        // moves at its own maximum physical speed instead of being slowed by
        // one-degree I2C updates.
        if (speed == 100) {
            writeArmPose(chassis, shoulder, elbow, claws)
            return
        }

        let starts = [
            armJointAngles[ArmJoint.Chassis],
            armJointAngles[ArmJoint.Shoulder],
            armJointAngles[ArmJoint.Elbow],
            armJointAngles[ArmJoint.Claws]
        ]
        let targets = [chassis, shoulder, elbow, claws]
        let maxDelta = 0
        for (let joint = 0; joint < 4; joint++) {
            let delta = Math.abs(targets[joint] - starts[joint])
            if (delta > maxDelta) {
                maxDelta = delta
            }
        }

        if (maxDelta == 0) {
            writeArmPose(targets[0], targets[1], targets[2], targets[3])
            return
        }

        let delayMs = armStepDelay(speed)
        for (let step = 1; step <= maxDelta; step++) {
            writeArmPose(
                starts[0] + (targets[0] - starts[0]) * step / maxDelta,
                starts[1] + (targets[1] - starts[1]) * step / maxDelta,
                starts[2] + (targets[2] - starts[2]) * step / maxDelta,
                starts[3] + (targets[3] - starts[3]) * step / maxDelta
            )
            basic.pause(delayMs)
        }
    }

    function saveArmPose(): void {
        if (armMemoryChassis.length >= ARM_MAX_MEMORY_STATES) {
            serial.writeLine("Arm memory full")
            return
        }
        armMemoryChassis.push(armJointAngles[ArmJoint.Chassis])
        armMemoryShoulder.push(armJointAngles[ArmJoint.Shoulder])
        armMemoryElbow.push(armJointAngles[ArmJoint.Elbow])
        armMemoryClaws.push(armJointAngles[ArmJoint.Claws])
        serial.writeLine("Arm pose saved")
    }

    function runArmPoses(): void {
        for (let index = 0; index < armMemoryChassis.length; index++) {
            moveArmPose(
                armMemoryChassis[index],
                armMemoryShoulder[index],
                armMemoryElbow[index],
                armMemoryClaws[index],
                armLastSpeed
            )
            basic.pause(100)
        }
        serial.writeLine("Arm poses complete")
    }

    function deleteArmPoses(): void {
        armMemoryChassis = []
        armMemoryShoulder = []
        armMemoryElbow = []
        armMemoryClaws = []
        serial.writeLine("Arm poses deleted")
    }

    function adjustArmJoint(joint: ArmJoint, delta: number): void {
        writeArmJoint(joint, armJointAngles[joint] + delta)
    }

    function updateArmJoystick(): void {
        if (armLeftJoystickConfigured) {
            let leftX = adc7828ReadChannel(armLeftJoystick[0])
            let leftY = adc7828ReadChannel(armLeftJoystick[1])

            if (leftY < ARM_JOYSTICK_LOW) {
                adjustArmJoint(ArmJoint.Chassis, 1)
            } else if (leftY > ARM_JOYSTICK_HIGH) {
                adjustArmJoint(ArmJoint.Chassis, -1)
            }
            if (leftX < ARM_JOYSTICK_LOW) {
                adjustArmJoint(ArmJoint.Shoulder, 1)
            } else if (leftX > ARM_JOYSTICK_HIGH) {
                adjustArmJoint(ArmJoint.Shoulder, -1)
            }
        }

        if (armRightJoystickConfigured) {
            let rightX = adc7828ReadChannel(armRightJoystick[0])
            let rightY = adc7828ReadChannel(armRightJoystick[1])

            if (rightX < ARM_JOYSTICK_LOW) {
                adjustArmJoint(ArmJoint.Elbow, 1)
            } else if (rightX > ARM_JOYSTICK_HIGH) {
                adjustArmJoint(ArmJoint.Elbow, -1)
            }
            if (rightY > ARM_JOYSTICK_HIGH) {
                adjustArmJoint(ArmJoint.Claws, 1)
            } else if (rightY < ARM_JOYSTICK_LOW) {
                adjustArmJoint(ArmJoint.Claws, -1)
            }
        }
    }

    function ensureArmJoystickLoop(): void {
        if (armJoystickLoopStarted) {
            return
        }
        armJoystickLoopStarted = true
        control.inBackground(function () {
            while (true) {
                updateArmJoystick()
                basic.pause(20)
            }
        })
    }

    function writeArmMotor(
        in1: DigitalPin,
        in2: DigitalPin,
        pwmPin: AnalogPin,
        speed: number
    ): void {
        speed = Math.constrain(Math.round(speed), -255, 255)
        let pwm = Math.round(Math.abs(speed) * 1023 / 255)

        // Disable PWM before changing direction.
        pins.analogWritePin(pwmPin, 0)
        if (speed > 0) {
            pins.digitalWritePin(in1, 1)
            pins.digitalWritePin(in2, 0)
        } else if (speed < 0) {
            pins.digitalWritePin(in1, 0)
            pins.digitalWritePin(in2, 1)
        } else {
            pins.digitalWritePin(in1, 0)
            pins.digitalWritePin(in2, 0)
        }
        pins.analogWritePin(pwmPin, pwm)
    }

    /**
     * Set the speed and direction of motor M1 or M2.
     * Positive values rotate forward, negative values rotate backward, and 0 stops.
     */
    //% blockId=armMotorSpeed block="control motor %motor speed %speed -255~255"
    //% motor.fieldEditor="gridpicker" motor.fieldOptions.columns=2
    //% speed.min=-255 speed.max=255 speed.defl=0
    //% group="Microbit Robotic Arm"
    //% subcategory="Executive"
    //% weight=105
    //% help=github:acebott/docs/reference
    export function armMotorSpeed(motor: ArmMotor, speed: number): void {
        if (motor == ArmMotor.M1) {
            // M1: AIN1=P14, AIN2=P15, PWMA=P16
            writeArmMotor(DigitalPin.P14, DigitalPin.P15, AnalogPin.P16, speed)
        } else {
            // M2: BIN1=P13, BIN2=P12, PWMB=P2
            writeArmMotor(DigitalPin.P13, DigitalPin.P12, AnalogPin.P2, speed)
        }
    }

    /** Initialize the four robotic-arm joint outputs at 90 degrees. */
    //% blockId=armInitialize block="robotic arm initialize chassis %chassis shoulder %shoulder elbow %elbow claws %claws"
    //% inlineInputMode=inline
    //% chassis.defl=ArmOutputChannel.STC0
    //% shoulder.defl=ArmOutputChannel.STC1
    //% elbow.defl=ArmOutputChannel.STC2
    //% claws.defl=ArmOutputChannel.STC3
    //% group="Microbit Robotic Arm"
    //% subcategory="Executive"
    //% weight=100
    //% help=github:acebott/docs/reference
    export function armInitialize(
        chassis: ArmOutputChannel,
        shoulder: ArmOutputChannel,
        elbow: ArmOutputChannel,
        claws: ArmOutputChannel
    ): void {
        armJointOutputs[ArmJoint.Chassis] = chassis
        armJointOutputs[ArmJoint.Shoulder] = shoulder
        armJointOutputs[ArmJoint.Elbow] = elbow
        armJointOutputs[ArmJoint.Claws] = claws
        armJointAngles = [90, 90, 90, 90]
        armCoordinateOrigin = [0, 0, 0]
        for (let joint = 0; joint < 4; joint++) {
            writeArmJoint(joint, 90)
        }
    }

    /** Set one robotic-arm joint angle and movement speed. */
    //% blockId=armSetJoint block="set robotic arm %joint|angle %angle|speed %speed"
    //% angle.min=0 angle.max=180 angle.defl=90
    //% speed.min=1 speed.max=100 speed.defl=50
    //% group="Microbit Robotic Arm"
    //% subcategory="Executive"
    //% weight=95
    //% help=github:acebott/docs/reference
    export function armSetJoint(joint: ArmJoint, angle: number, speed: number): void {
        let targets = [
            armJointAngles[ArmJoint.Chassis],
            armJointAngles[ArmJoint.Shoulder],
            armJointAngles[ArmJoint.Elbow],
            armJointAngles[ArmJoint.Claws]
        ]
        targets[joint] = angle
        moveArmPose(targets[0], targets[1], targets[2], targets[3], speed)
    }

    /** Set all four robotic-arm joints in one synchronized pose update. */
    //% blockId=armSetPose block="set robotic arm pose|chassis %chassis|shoulder %shoulder|elbow %elbow|claws %claws"
    //% chassis.min=0 chassis.max=180 chassis.defl=90
    //% shoulder.min=0 shoulder.max=180 shoulder.defl=90
    //% elbow.min=0 elbow.max=119 elbow.defl=90
    //% claws.min=0 claws.max=180 claws.defl=90
    //% inlineInputMode=inline
    //% group="Microbit Robotic Arm"
    //% subcategory="Executive"
    //% weight=94
    //% help=github:acebott/docs/reference
    export function armSetPose(
        chassis: number,
        shoulder: number,
        elbow: number,
        claws: number
    ): void {
        writeArmPose(chassis, shoulder, elbow, claws)
    }

    /** Reset the four configured joints to 90 degrees and use that pose as XYZ (0,0,0). */
    //% blockId=armReset block="robotic arm reset"
    //% group="Microbit Robotic Arm"
    //% subcategory="Executive"
    //% weight=93
    //% help=github:acebott/docs/reference
    export function armReset(): void {
        moveArmPose(90, 90, 90, 90, 50)
        if (armJointAngles[ArmJoint.Chassis] == 90 &&
            armJointAngles[ArmJoint.Shoulder] == 90 &&
            armJointAngles[ArmJoint.Elbow] == 90 &&
            armJointAngles[ArmJoint.Claws] == 90) {
            armCoordinateOrigin = [
                armCoordinateValue(ArmCoordinateAxis.X),
                armCoordinateValue(ArmCoordinateAxis.Y),
                armCoordinateValue(ArmCoordinateAxis.Z)
            ]
        } else {
            serial.writeLine("Arm reset incomplete")
        }
    }

    /**
     * Set servo0-servo7 output angle and movement speed.
     * servo0-servo5 use STC; servo6 and servo7 use micro:bit P2 and P12.
     */
    //% blockId=armSetOutput block="set %channel servo angle %angle speed %speed"
    //% channel.defl=ArmOutputChannel.STC0
    //% angle.min=0 angle.max=180 angle.defl=90
    //% speed.min=1 speed.max=100 speed.defl=50
    //% group="Microbit Robotic Arm"
    //% subcategory="Executive"
    //% weight=92
    //% help=github:acebott/docs/reference
    export function armSetOutput(
        channel: ArmOutputChannel,
        angle: number,
        speed: number
    ): void {
        let outputIndex = channel
        if (outputIndex < 0 || outputIndex > 7) {
            return
        }

        angle = Math.constrain(Math.round(angle), 0, 180)
        speed = Math.constrain(Math.round(speed), 1, 100)
        let currentAngle = armOutputAngles[outputIndex]

        if (speed == 100 || currentAngle == angle) {
            writeArmOutput(channel, angle)
            armOutputAngles[outputIndex] = angle
            armOutputLastAngles[outputIndex] = angle
            return
        }

        let direction = angle > currentAngle ? 1 : -1
        let delayMs = armStepDelay(speed)
        while (currentAngle != angle) {
            currentAngle += direction
            writeArmOutput(channel, currentAngle)
            basic.pause(delayMs)
        }

        armOutputAngles[outputIndex] = angle
        armOutputLastAngles[outputIndex] = angle
    }

    /** Save, run, or delete recorded robotic-arm poses. */
    //% blockId=armMemory block="robotic arm memory %mode"
    //% group="Microbit Robotic Arm"
    //% subcategory="Executive"
    //% weight=90
    //% help=github:acebott/docs/reference
    export function armMemory(mode: ArmMemoryMode): void {
        if (mode == ArmMemoryMode.Save) {
            saveArmPose()
        } else if (mode == ArmMemoryMode.Run) {
            runArmPoses()
        } else {
            deleteArmPoses()
        }
    }

    /** Move to XYZ in centimeters, relative to the home pose after armReset. */
    //% blockId=armSetPosition block="robotic arm coordinate control|X %x|Y %y|Z %z"
    //% x.min=-10 x.max=10 x.defl=0
    //% y.defl=0
    //% z.defl=0
    //% group="Microbit Robotic Arm"
    //% subcategory="Executive"
    //% weight=85
    //% help=github:acebott/docs/reference
    export function armSetPosition(x: number, y: number, z: number): void {
        // Apply the same origin offset that armGetCoordinate subtracts.
        x += armCoordinateOrigin[ArmCoordinateAxis.X]
        y += armCoordinateOrigin[ArmCoordinateAxis.Y]
        z += armCoordinateOrigin[ArmCoordinateAxis.Z]
        if (x < -10 || x > 10 || y < 5 || y > 16 || z < 5 || z > 20) {
            serial.writeLine("Arm XYZ out of range")
            return
        }

        let horizontal = Math.sqrt(x * x + y * y)
        let vertical = z - ARM_BASE_HEIGHT
        let distance = Math.sqrt(horizontal * horizontal + vertical * vertical)
        if (distance < 7 || distance > 18) {
            serial.writeLine("Arm XYZ unreachable")
            return
        }

        let chassis = 90 - Math.atan2(x, y) * ARM_RAD_TO_DEG
        let shoulderCos = (distance * distance +
            ARM_SHOULDER_LENGTH * ARM_SHOULDER_LENGTH -
            ARM_ELBOW_LENGTH * ARM_ELBOW_LENGTH) /
            (2 * ARM_SHOULDER_LENGTH * distance)
        let elbowCos = -(distance * distance -
            ARM_SHOULDER_LENGTH * ARM_SHOULDER_LENGTH -
            ARM_ELBOW_LENGTH * ARM_ELBOW_LENGTH) /
            (2 * ARM_SHOULDER_LENGTH * ARM_ELBOW_LENGTH)
        shoulderCos = Math.constrain(shoulderCos, -1, 1)
        elbowCos = Math.constrain(elbowCos, -1, 1)

        let verticalAngle = Math.acos(horizontal / distance)
        if (vertical < 0) {
            verticalAngle = -verticalAngle
        }
        let shoulder = 180 -
            (verticalAngle + Math.acos(shoulderCos)) * ARM_RAD_TO_DEG
        let elbow = Math.acos(elbowCos) * ARM_RAD_TO_DEG

        if (shoulder < 0 || shoulder > 180 || elbow < 0 || elbow > 180) {
            serial.writeLine("Arm XYZ solution out of range")
            return
        }
        moveArmPose(chassis, shoulder, elbow,
            armJointAngles[ArmJoint.Claws], armLastSpeed)
    }

    // Coordinate estimate from cached target angles, in the original frame.
    function armCoordinateValue(axis: ArmCoordinateAxis): number {
        let shoulderRadians =
            (armJointAngles[ArmJoint.Shoulder] - 90) * ARM_DEG_TO_RAD
        let elbowRadians =
            (180 - armJointAngles[ArmJoint.Elbow]) * ARM_DEG_TO_RAD
        let radial = ARM_SHOULDER_LENGTH * Math.sin(shoulderRadians) +
            ARM_ELBOW_LENGTH * Math.sin(shoulderRadians + elbowRadians)
        let z = ARM_BASE_HEIGHT +
            ARM_SHOULDER_LENGTH * Math.cos(shoulderRadians) +
            ARM_ELBOW_LENGTH * Math.cos(shoulderRadians + elbowRadians)
        let chassisRadians =
            (90 - armJointAngles[ArmJoint.Chassis]) * ARM_DEG_TO_RAD
        let x = radial * Math.sin(chassisRadians)
        let y = radial * Math.cos(chassisRadians)

        if (axis == ArmCoordinateAxis.X) {
            return x
        } else if (axis == ArmCoordinateAxis.Y) {
            return y
        }
        return z
    }

    /** Get modeled XYZ in centimeters; armReset makes the home pose the origin. */
    //% blockId=armGetCoordinate block="get robotic arm coordinate %axis"
    //% group="Microbit Robotic Arm"
    //% subcategory="Executive"
    //% weight=80
    //% help=github:acebott/docs/reference
    export function armGetCoordinate(axis: ArmCoordinateAxis): number {
        // Keep one decimal place (0.1 cm) after subtracting the shared origin.
        return Math.round((armCoordinateValue(axis) - armCoordinateOrigin[axis]) * 10) / 10
    }

    /** Get the current angle of one robotic-arm joint. */
    //% blockId=armGetJointAngle block="get robotic arm %joint angle"
    //% group="Microbit Robotic Arm"
    //% subcategory="Executive"
    //% weight=75
    //% help=github:acebott/docs/reference
    export function armGetJointAngle(joint: ArmJoint): number {
        return armJointAngles[joint]
    }

    /** Configure one ADC7828 joystick and start background arm control. */
    //% blockId=armSetJoystick block="set %side joystick X %xChannel Y %yChannel SW %swChannel"
    //% inlineInputMode=inline
    //% xChannel.defl=Adc7828Channel.CH0
    //% yChannel.defl=Adc7828Channel.CH1
    //% swChannel.defl=Adc7828Channel.CH4
    //% group="ADC7828 Sensor"
    //% subcategory="Sensor"
    //% weight=90
    //% help=github:acebott/docs/reference
    export function armSetJoystick(
        side: ArmJoystickSide,
        xChannel: Adc7828Channel,
        yChannel: Adc7828Channel,
        swChannel: Adc7828Channel
    ): void {
        if (side == ArmJoystickSide.Left) {
            armLeftJoystick = [xChannel, yChannel, swChannel]
            armLeftJoystickConfigured = true
        } else {
            armRightJoystick = [xChannel, yChannel, swChannel]
            armRightJoystickConfigured = true
        }
        ensureArmJoystickLoop()
    }

    /** Read the raw X, Y, or SW value from a configured joystick (0-255). */
    //% blockId=armReadJoystick block="read %side joystick %value value"
    //% group="ADC7828 Sensor"
    //% subcategory="Sensor"
    //% weight=85
    //% help=github:acebott/docs/reference
    export function armReadJoystick(
        side: ArmJoystickSide,
        value: ArmJoystickValue
    ): number {
        if (side == ArmJoystickSide.Left) {
            return adc7828ReadChannel(armLeftJoystick[value])
        }
        return adc7828ReadChannel(armRightJoystick[value])
    }

    const ARM_ADC_LOW = 50
    const ARM_ADC_HIGH = 200

    // Every physical output keeps an independent angle.
    let armOutputAngles = [90, 90, 90, 90, 90, 90, 90, 90]
    let armOutputLastAngles = [-1, -1, -1, -1, -1, -1, -1, -1]

    function writeArmOutput(channel: ArmOutputChannel, angle: number): void {
        angle = Math.constrain(Math.round(angle), 0, 180)

        if (channel <= ArmOutputChannel.STC5) {
            stcServoAngle(channel, angle)
        } else if (channel == ArmOutputChannel.MicrobitP2) {
            pins.servoWritePin(AnalogPin.P2, angle)
        } else if (channel == ArmOutputChannel.MicrobitP12) {
            pins.servoWritePin(AnalogPin.P12, angle)
        }
        // Keep output and mapped-joint caches synchronized, including after reset.
        armOutputAngles[channel] = angle
        armOutputLastAngles[channel] = angle
        for (let joint = 0; joint < 4; joint++) {
            if (armJointOutputs[joint] == channel) {
                armJointAngles[joint] = angle
            }
        }
    }

    function controlArmJoint(
        adcChannel: Adc7828Channel,
        outputChannel: ArmOutputChannel,
        step: number,
        minAngle: number,
        maxAngle: number,
        reverse: boolean
    ): void {
        let outputIndex = outputChannel
        if (outputIndex < 0 || outputIndex > 7) {
            return
        }

        minAngle = Math.constrain(minAngle, 0, 180)
        maxAngle = Math.constrain(maxAngle, minAngle, 180)

        let adcValue = adc7828ReadChannel(adcChannel)
        let angle = armOutputAngles[outputIndex]

        if (step < 1) {
            step = 1
        }
        if (step > 20) {
            step = 20
        }

        if (adcValue > ARM_ADC_HIGH) {
            if (reverse) {
                angle -= step
            } else {
                angle += step
            }
        } else if (adcValue < ARM_ADC_LOW) {
            if (reverse) {
                angle += step
            } else {
                angle -= step
            }
        }

        angle = Math.constrain(angle, minAngle, maxAngle)
        armOutputAngles[outputIndex] = angle

        if (angle != armOutputLastAngles[outputIndex]) {
            writeArmOutput(outputChannel, angle)
            armOutputLastAngles[outputIndex] = angle
        }
    }

    /**
     * Control a robotic arm joint with the ADC7828 joystick.
     * Put this block inside forever.
     */
    //% blockId=armBaseControl block="robotic arm joint|controller %adcChannel|output %outputChannel|step %step"
    //% blockHidden=true
    //% adcChannel.defl=Adc7828Channel.CH0
    //% outputChannel.defl=ArmOutputChannel.STC0
    //% step.min=1 step.max=20 step.defl=1
    //% group="Microbit Robotic Arm"
    //% subcategory="Executive"
    //% weight=90
    //% help=github:acebott/docs/reference
    export function armBaseControl(
        adcChannel: Adc7828Channel,
        outputChannel: ArmOutputChannel,
        step: number
    ): void {
        controlArmJoint(adcChannel, outputChannel, step, 0, 180, false)
    }

    /**
     * Control the robotic arm chassis. Its joystick direction is reversed.
     */
    //% blockId=armChassisControl block="robotic arm chassis|controller %adcChannel|output %outputChannel|step %step"
    //% blockHidden=true
    //% adcChannel.defl=Adc7828Channel.CH0
    //% outputChannel.defl=ArmOutputChannel.STC0
    //% step.min=1 step.max=20 step.defl=1
    //% group="Microbit Robotic Arm"
    //% subcategory="Executive"
    //% weight=100
    //% help=github:acebott/docs/reference
    export function chassisControl(
        adcChannel: Adc7828Channel,
        outputChannel: ArmOutputChannel,
        step: number
    ): void {
        controlArmJoint(adcChannel, outputChannel, step, 0, 180, true)
    }

    /**
     * Control the robotic arm shoulder.
     */
    //% blockId=armShoulderControl block="robotic arm shoulder|controller %adcChannel|output %outputChannel|step %step"
    //% blockHidden=true
    //% adcChannel.defl=Adc7828Channel.CH1
    //% outputChannel.defl=ArmOutputChannel.STC1
    //% step.min=1 step.max=20 step.defl=1
    //% group="Microbit Robotic Arm"
    //% subcategory="Executive"
    //% weight=95
    //% help=github:acebott/docs/reference
    export function shoulderControl(
        adcChannel: Adc7828Channel,
        outputChannel: ArmOutputChannel,
        step: number
    ): void {
        controlArmJoint(adcChannel, outputChannel, step, 0, 180, false)
    }

    /**
     * Control the robotic arm elbow.
     */
    //% blockId=armElbowControl block="robotic arm elbow|controller %adcChannel|output %outputChannel|step %step"
    //% blockHidden=true
    //% adcChannel.defl=Adc7828Channel.CH2
    //% outputChannel.defl=ArmOutputChannel.STC2
    //% step.min=1 step.max=20 step.defl=1
    //% group="Microbit Robotic Arm"
    //% subcategory="Executive"
    //% weight=90
    //% help=github:acebott/docs/reference
    export function elbowControl(
        adcChannel: Adc7828Channel,
        outputChannel: ArmOutputChannel,
        step: number
    ): void {
        controlArmJoint(adcChannel, outputChannel, step, 0, 180, false)
    }

    /**
     * Control the robotic arm claws from 0 to 180 degrees.
     */
    //% blockId=armClawsControl block="robotic arm claws|controller %adcChannel|output %outputChannel|step %step"
    //% blockHidden=true
    //% adcChannel.defl=Adc7828Channel.CH3
    //% outputChannel.defl=ArmOutputChannel.STC3
    //% step.min=1 step.max=20 step.defl=1
    //% group="Microbit Robotic Arm"
    //% subcategory="Executive"
    //% weight=85
    //% help=github:acebott/docs/reference
    export function clawsControl(
        adcChannel: Adc7828Channel,
        outputChannel: ArmOutputChannel,
        step: number
    ): void {
        controlArmJoint(adcChannel, outputChannel, step, 0, 180, false)
    }

}
