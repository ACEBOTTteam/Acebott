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

    /** Shared speed presets for joint and XYZ movement. */
    export enum ArmSpeed {
        //% block="slow"
        Slow = 0,
        //% block="medium"
        Medium = 1,
        //% block="fast"
        Fast = 2
    }

    /** Open or close the gripper at the classroom defaults. */
    export enum ArmClawState {
        //% block="open"
        Open = 0,
        //% block="close"
        Close = 1
    }

    /** Actions for the in-memory pose recorder. */
    export enum ArmMemoryMode {
        //% block="save"
        Save = 0,
        //% block="run"
        Run = 1,
        //% block="delete"
        Delete = 2,
        //% block="start recording"
        StartRecording = 3,
        //% block="end recording"
        EndRecording = 4,
        //% block="run in a loop"
        RunLoop = 5,
        //% block="stop playback"
        Stop = 6
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

    const ARM_BASE_HEIGHT = 8
    const ARM_SHOULDER_LENGTH = 7
    const ARM_ELBOW_LENGTH = 12
    const ARM_MAX_MEMORY_STATES = 20
    const ARM_JOYSTICK_LOW = 50
    const ARM_JOYSTICK_HIGH = 250
    const ARM_DEG_TO_RAD = 0.017453292519943295
    const ARM_RAD_TO_DEG = 57.2957795

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
    // Keep the selected preset separate from immediate APP joint commands.
    let armPresetSpeed = 10

    // APP control supplies scheduling while the existing action blocks stay reusable.
    let armAppJointHook: (joint: ArmJoint, angle: number, speed: number) => void = null
    let armAppPositionHook: (x: number, y: number, z: number) => void = null
    let armAppHomeHook: () => void = null
    let armAppMemoryHook: (mode: ArmMemoryMode) => void = null

    export function armAttachAppControl(
        joint: (joint: ArmJoint, angle: number, speed: number) => void,
        position: (x: number, y: number, z: number) => void,
        home: () => void,
        memory: (mode: ArmMemoryMode) => void
    ): void {
        armAppJointHook = joint
        armAppPositionHook = position
        armAppHomeHook = home
        armAppMemoryHook = memory
    }

    let armMemoryChassis: number[] = []
    let armMemoryShoulder: number[] = []
    let armMemoryElbow: number[] = []
    let armMemoryClaws: number[] = []

    let armLeftJoystick = [0, 1, 4]
    let armRightJoystick = [2, 3, 5]
    let armLeftJoystickConfigured = false
    let armRightJoystickConfigured = false
    let armJoystickLoopStarted = false

    // XYZ conversion and measured calibration from the supplied IK-v1 program.
    let ARM_XYZ_MOVE_STEP_MS = 10
    let armXYZBusy = false
    let armXYZLastResult = ""
    let armXYZCalibrationReady = false
    // Measured XYZ -> chassis, shoulder, elbow (same index across the arrays).
    // IK-v1 keeps the Z2 records and the three latest centre-line records at Z3..5.
    // Older higher-point records remain in the previous program for comparison.
    let armXYZCalibrationPoint = -1
    let armXYZCalibrationX = [6.9, 6.5, 0, 7, -6, 0, 0, 0, 0, 0]
    let armXYZCalibrationY = [11.8, 11.5, 8.8, 12, 11, 10, 13, 13, 12.4, 14]
    let armXYZCalibrationZ = [2, 2, 2, 2, 2, 2, 2, 4, 3, 5]
    let armXYZCalibrationC = [68, 69, 90, 68, 112, 90, 90, 90, 90, 90]
    let armXYZCalibrationS = [30, 32, 40, 31, 31, 38, 32, 39, 38, 39]
    let armXYZCalibrationE = [79, 85, 119, 79, 83, 110, 87, 86, 95, 80]

    // Ground reach: measured actual radius -> old-model radius (X=0,Z=0).
    let armXYZGroundRadius = [12.8, 13.5, 15.2]
    let armXYZGroundModelRadius = [16, 14, 10]
    // Actual bearing -> chassis command, with separate positive/negative samples.
    let armXYZBearingAngles = [-51.34019174590991, -31.038263355502803, -16.534837857345153, 0, 12.994616791916505, 30.596009467062675]
    let armXYZBearingServo = [127, 113, 102, 90, 78, 67]
    // Latest ground measurement: send 3,14,0 -> measured 3.8,13.8,0; accepted C79.
    let armXYZGroundYawX = 3.8
    let armXYZGroundYawY = 13.8
    let armXYZGroundYawC = 79
    let armXYZCalibrationDeltaC: number[] = []
    let armXYZCalibrationDeltaS: number[] = []
    let armXYZCalibrationDeltaE: number[] = []
    // Z2 data expressed as armXYZHorizontal radius, independent of chassis rotation.
    // Final endpoint R16.16/S26/E51.2 is interpolated from measured R15.2/Z0 and R16.4/Z2.5;
    // it is an estimate awaiting a direct Z2 measurement.
    let armXYZHeightTwoRadius = [8.8, 13.209844813622906, 13.66930868771351, 16.16]
    let armXYZHeightTwoShoulder = [40, 32, 30, 26.0]
    let armXYZHeightTwoElbow = [119, 85, 79, 51.2]
    let armXYZHeightTwoWeight = 0
    let armXYZInterpolatedValue = 0
    // Latest yaw-only measurement: send -8,10,2 -> actual X=-10,Y=8; accepted C127.
    // Actual Z was not reported, so this record is only used for bearing.
    let armXYZYawExtrapolated = false
    let armXYZConversionMode = "READY"

    let armXYZPoseG = 0
    let armXYZPoseE = 0
    let armXYZPoseS = 0
    let armXYZPoseC = 0
    let armXYZSteps = 0
    let armXYZStartG = 0
    let armXYZStartE = 0
    let armXYZStartS = 0
    let armXYZStartC = 0
    let armXYZDistance = 0
    let armXYZOutputElbow = 0
    let armXYZOutputShoulder = 0
    let armXYZOutputChassis = 0
    let armXYZTargetElbow = 0
    let armXYZTargetShoulder = 0
    let armXYZElbowCos = 0
    let armXYZShoulderCos = 0
    let armXYZDistance2 = 0
    let armXYZVertical = 0
    let armXYZHorizontal = 0
    // IK-v1: offsets fitted to the five latest centre-line measurements.
    // (Y,Z,S,E): (13,4,39,86), (12.4,3,38,95), (14,5,39,80), (10,2,38,110), (13,2,32,87).
    let armXYZIK_SHOULDER_OFFSET = -4.24128430
    let armXYZIK_ELBOW_OFFSET = -2.24660213
    let armXYZIkWeight = 0
    let armXYZGeometricShoulder = 0
    let armXYZGeometricElbow = 0
    let armXYZMinimumShoulder = 0
    let armXYZPoseAllowed = false
    let armXYZTransportRunning = false
    let armXYZClaws = 0
    let armXYZTransportStage = ""

    function constrainArmJointAngle(joint: ArmJoint, angle: number): number {
        angle = Math.round(angle)
        if (joint == ArmJoint.Elbow) {
            return Math.constrain(angle, 0, 120)
        }
        if (joint == ArmJoint.Claws) {
            return Math.constrain(angle, 90, 180)
        }
        return Math.constrain(angle, 0, 180)
    }

    function constrainArmOutputAngle(channel: ArmOutputChannel, angle: number): number {
        let minAngle = channel == armJointOutputs[ArmJoint.Claws] ? 90 : 0
        return Math.constrain(Math.round(angle), minAngle, 180)
    }

    // Measured shoulder minimum for each elbow angle.
    // Boundary points: (36,6), (62,18), (90,27), (105,30).
    // Angles outside the measured interval keep the nearest endpoint limit.
    function armShoulderMinimumForElbow(elbow: number): number {
        elbow = Math.constrain(elbow, 0, 120)
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
        if (armAppJointHook) {
            armAppJointHook(joint, angle, speed)
        } else {
            armExecuteJoint(joint, angle, speed)
        }
    }

    /** Shared joint driver; the APP scheduler uses it after queuing a target. */
    export function armExecuteJoint(joint: ArmJoint, angle: number, speed: number): void {
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
    //% elbow.min=0 elbow.max=120 elbow.defl=90
    //% claws.min=90 claws.max=180 claws.defl=90
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

    /** Select one speed preset for both joint and XYZ moves. */
    //% blockId=armSetSpeed block="set robotic arm speed %speed"
    //% speed.defl=ArmSpeed.Slow
    //% group="Microbit Robotic Arm"
    //% subcategory="Executive"
    //% weight=91
    //% help=github:acebott/docs/reference
    export function armSetSpeed(speed: ArmSpeed): void {
        if (speed == ArmSpeed.Slow) {
            armLastSpeed = 10
            ARM_XYZ_MOVE_STEP_MS = 20
        } else if (speed == ArmSpeed.Medium) {
            armLastSpeed = 50
            ARM_XYZ_MOVE_STEP_MS = 10
        } else {
            armLastSpeed = 90
            ARM_XYZ_MOVE_STEP_MS = 5
        }
        armPresetSpeed = armLastSpeed
    }

    /** Internal timing for the non-blocking APP home movement. */
    //% blockHidden=true
    export function armGetPresetStepDelay(): number {
        return armStepDelay(armPresetSpeed)
    }

    /** Open to 150 degrees or close to 90 degrees, keeping the other joints still. */
    //% blockId=armClaw block="robotic arm claw %state"
    //% state.defl=ArmClawState.Open
    //% group="Microbit Robotic Arm"
    //% subcategory="Executive"
    //% weight=90
    //% help=github:acebott/docs/reference
    export function armClaw(state: ArmClawState): void {
        let targetClaws = state == ArmClawState.Open ? 150 : 90
        moveArmPose(
            armJointAngles[ArmJoint.Chassis],
            armJointAngles[ArmJoint.Shoulder],
            armJointAngles[ArmJoint.Elbow],
            targetClaws,
            armLastSpeed
        )
    }

    /** Return all four joints to 90 degrees without changing the XYZ origin. */
    //% blockId=armHomePose block="robotic arm return to home pose"
    //% group="Microbit Robotic Arm"
    //% subcategory="Executive"
    //% weight=89
    //% help=github:acebott/docs/reference
    export function armHomePose(): void {
        if (armAppHomeHook) {
            armAppHomeHook()
        } else {
            moveArmPose(90, 90, 90, 90, armLastSpeed)
        }
    }

    /** Smoothly reset the four joints to 90 degrees and use that pose as XYZ (0,0,0). */
    //% blockId=armReset block="robotic arm reset"
    //% group="Microbit Robotic Arm"
    //% subcategory="Executive"
    //% weight=93
    //% help=github:acebott/docs/reference
    export function armReset(): void {
        let resetSpeed = armLastSpeed
        moveArmPose(90, 90, 90, 90, resetSpeed)
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

        angle = constrainArmOutputAngle(channel, angle)
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
        if (armAppMemoryHook) {
            armAppMemoryHook(mode)
        } else if (mode == ArmMemoryMode.Save) {
            saveArmPose()
        } else if (mode == ArmMemoryMode.Run) {
            runArmPoses()
        } else if (mode == ArmMemoryMode.Delete) {
            deleteArmPoses()
        } else {
            serial.writeLine("APP memory control is not prepared")
        }
    }

    function armXYZWaitTransport(ms: number): void {
        for (let index = 0; index < Math.ceil(ms / 20); index++) {
            if (armXYZTransportRunning) {
                basic.pause(20)
            }
        }
    }

    function armXYZCheckPoseLimit(c: number, s: number, e: number, g: number): void {
        armXYZMinimumShoulder = armShoulderMinimumForElbow(e)
        armXYZPoseAllowed = c >= 0 && c <= 180 && s >= 0 && s <= 180 &&
            e >= 0 && e <= 120 && g >= 90 && g <= 180 &&
            isArmJointPairSafe(s, e)
    }

    function armXYZApplyLimitedPose(c: number, s: number, e: number, g: number): void {
        if (armXYZTransportRunning) {
            armXYZCheckPoseLimit(c, s, e, g)
            if (armXYZPoseAllowed) {
                Acebott.armSetPose(c, s, e, g)
                if (Acebott.armGetJointAngle(Acebott.ArmJoint.Chassis) != c || Acebott.armGetJointAngle(Acebott.ArmJoint.Shoulder) != s || Acebott.armGetJointAngle(Acebott.ArmJoint.Elbow) != e || Acebott.armGetJointAngle(Acebott.ArmJoint.Claws) != g) {
                    serial.writeLine("POSE REJECTED stage=" + armXYZTransportStage + " C=" + c + " S=" + s + " E=" + e + " G=" + g)
                    armXYZLastResult = "XYZ JOINT LIMIT"
                    armXYZTransportRunning = false
                }
            } else {
                serial.writeLine("JOINT LIMIT stage=" + armXYZTransportStage + " C=" + c + " S=" + s + " E=" + e + " G=" + g + " Smin=" + Math.ceil(armXYZMinimumShoulder))
                armXYZLastResult = "XYZ JOINT LIMIT"
                armXYZTransportRunning = false
            }
        }
    }

    function armXYZInterpolateCalibration(value: number, inputs: number[], outputs: number[]): void {
        let segment = 0
        for (let index = 0; index < inputs.length - 1; index++) {
            if ((inputs[0] < inputs[1] && value >= inputs[index]) ||
                (inputs[0] > inputs[1] && value <= inputs[index])) {
                segment = index
            }
        }
        armXYZInterpolatedValue = outputs[segment] + (outputs[segment + 1] - outputs[segment]) * (value - inputs[segment]) / (inputs[segment + 1] - inputs[segment])
    }

    function armXYZCalculateBasePose(x: number, y: number, z: number): void {
        armXYZCalculateModelPose(x, y, z)
        if (armXYZTransportRunning) {
            let originalS = armXYZOutputShoulder
            let originalE = armXYZOutputElbow
            let radius = Math.sqrt(x * x + y * y)
            let bearing = Math.atan2(x, y) * ARM_RAD_TO_DEG
            let bearingOutside = Math.max(0, Math.max(armXYZBearingAngles[0] - bearing, bearing - armXYZBearingAngles[armXYZBearingAngles.length - 1]))
            armXYZYawExtrapolated = bearingOutside > 0
            armXYZInterpolateCalibration(bearing, armXYZBearingAngles, armXYZBearingServo)
            let correctedC = armXYZInterpolatedValue
            // C79/S21/E61 was measured at X3.8/Y13.8/Z0.
            // Add its yaw residual locally; reach and joint-height corrections are separate.
            let yawDistance = Math.sqrt((x - armXYZGroundYawX) * (x - armXYZGroundYawX) + (y - armXYZGroundYawY) * (y - armXYZGroundYawY))
            let yawRadiusWeight = Math.constrain((radius - 13.5) / (Math.sqrt(armXYZGroundYawX * armXYZGroundYawX + armXYZGroundYawY * armXYZGroundYawY) - 13.5), 0, 1)
            let yawLocalWeight = Math.constrain((2 - yawDistance) / 1.5, 0, 1) * yawRadiusWeight * Math.max(0, 1 - z / 1.5)
            armXYZInterpolateCalibration(Math.atan2(armXYZGroundYawX, armXYZGroundYawY) * ARM_RAD_TO_DEG, armXYZBearingAngles, armXYZBearingServo)
            correctedC += yawLocalWeight * (armXYZGroundYawC - armXYZInterpolatedValue)
            let groundWeight = Math.max(0, 1 - z / 1.5)
            armXYZConversionMode = "IK ESTIMATE + YAW CALIBRATION"
            if (groundWeight > 0) {
                armXYZInterpolateCalibration(radius, armXYZGroundRadius, armXYZGroundModelRadius)
                let modelRadius = armXYZInterpolatedValue
                let modelDistance = Math.sqrt(modelRadius * modelRadius + ARM_BASE_HEIGHT * ARM_BASE_HEIGHT)
                if (modelRadius < 0 || modelDistance > ARM_SHOULDER_LENGTH + ARM_ELBOW_LENGTH || modelDistance < Math.abs(ARM_SHOULDER_LENGTH - ARM_ELBOW_LENGTH)) {
                    serial.writeLine("CALIBRATION NOT AVAILABLE: target r=" + radius + " Z=" + z + "; correction r=" + modelRadius)
                    armXYZLastResult = "XYZ CALIBRATION ERROR"
                    armXYZTransportRunning = false
                } else {
                    armXYZCalculateModelPose(0, modelRadius, 0)
                }
                if (armXYZTransportRunning) {
                    armXYZOutputShoulder = originalS + groundWeight * (armXYZOutputShoulder - originalS)
                    armXYZOutputElbow = originalE + groundWeight * (armXYZOutputElbow - originalE)
                    armXYZConversionMode = "GROUND ESTIMATE"
                    if (z == 0) {
                        armXYZConversionMode = "GROUND EXTRAPOLATION: unmeasured target"
                        if (radius >= 12.8 && radius <= 15.2 && bearingOutside == 0) {
                            armXYZConversionMode = "GROUND CALIBRATION"
                        }
                        if (yawLocalWeight > 0) {
                            armXYZConversionMode += " + LOCAL YAW"
                        }
                    }
                }
            } else {
                armXYZOutputShoulder = originalS
                armXYZOutputElbow = originalE
            }
            armXYZOutputChassis = correctedC
            armXYZApplyHeightTwoRow(radius, z)
        }
    }

    function armXYZApplyHeightTwoRow(radius: number, z: number): void {
        let outside = Math.max(0, Math.max(armXYZHeightTwoRadius[0] - radius, radius - armXYZHeightTwoRadius[armXYZHeightTwoRadius.length - 1]))
        armXYZHeightTwoWeight = Math.max(0, 1 - Math.abs(z - 2) / 0.5) * Math.max(0, 1 - outside)
        if (armXYZHeightTwoWeight > 0) {
            armXYZInterpolateCalibration(radius, armXYZHeightTwoRadius, armXYZHeightTwoShoulder)
            armXYZOutputShoulder += armXYZHeightTwoWeight * (armXYZInterpolatedValue - armXYZOutputShoulder)
            armXYZInterpolateCalibration(radius, armXYZHeightTwoRadius, armXYZHeightTwoElbow)
            armXYZOutputElbow += armXYZHeightTwoWeight * (armXYZInterpolatedValue - armXYZOutputElbow)
            armXYZConversionMode = "HEIGHT2 ESTIMATE"
            if (armXYZHeightTwoWeight == 1) {
                armXYZConversionMode = "HEIGHT2 INTERPOLATION"
            }
        }
    }

    function armXYZApplyLocalCalibration(x: number, y: number, z: number): void {
        armXYZCalibrationPoint = -1
        let nearestSquared = 1000000
        let sumWeights = 0
        let sumHeightTwoWeights = 0
        let nearestHeightTwoSquared = 1000000
        let heightTwoCorrectionS = 0
        let heightTwoCorrectionE = 0
        let correctionC = 0
        let correctionS = 0
        let correctionE = 0
        for (let index = 0; index < armXYZCalibrationX.length; index++) {
            let squared = (x - armXYZCalibrationX[index]) * (x - armXYZCalibrationX[index]) + (y - armXYZCalibrationY[index]) * (y - armXYZCalibrationY[index]) + (z - armXYZCalibrationZ[index]) * (z - armXYZCalibrationZ[index])
            nearestSquared = Math.min(nearestSquared, squared)
            if (squared < 0.00000001) {
                armXYZCalibrationPoint = index
            }
            let weight = 1 / Math.max(0.00000001, squared)
            sumWeights += weight
            correctionC += weight * armXYZCalibrationDeltaC[index]
            correctionS += weight * armXYZCalibrationDeltaS[index]
            correctionE += weight * armXYZCalibrationDeltaE[index]
            if (armXYZCalibrationZ[index] == 2) {
                nearestHeightTwoSquared = Math.min(nearestHeightTwoSquared, squared)
                sumHeightTwoWeights += weight
                heightTwoCorrectionS += weight * armXYZCalibrationDeltaS[index]
                heightTwoCorrectionE += weight * armXYZCalibrationDeltaE[index]
            }
        }
        let strength = Math.constrain((2 - Math.sqrt(nearestSquared)) / 1.5, 0, 1) * Math.constrain(z / 1.5, 0, 1)
        if (armXYZCalibrationPoint >= 0) {
            correctionC = armXYZCalibrationDeltaC[armXYZCalibrationPoint]
            correctionS = armXYZCalibrationDeltaS[armXYZCalibrationPoint]
            correctionE = armXYZCalibrationDeltaE[armXYZCalibrationPoint]
            strength = 1
            armXYZConversionMode = "CALIBRATED POINT " + (armXYZCalibrationPoint + 1)
        } else {
            correctionC = correctionC / sumWeights
            correctionS = correctionS / sumWeights
            correctionE = correctionE / sumWeights
            if (sumHeightTwoWeights > 0) {
                let heightStrength = Math.constrain((2 - Math.sqrt(nearestHeightTwoSquared)) / 1.5, 0, 1)
                correctionS = (1 - armXYZHeightTwoWeight) * strength * correctionS + armXYZHeightTwoWeight * heightStrength * heightTwoCorrectionS / sumHeightTwoWeights
                correctionE = (1 - armXYZHeightTwoWeight) * strength * correctionE + armXYZHeightTwoWeight * heightStrength * heightTwoCorrectionE / sumHeightTwoWeights
            } else {
                correctionS *= strength
                correctionE *= strength
            }
            if (strength > 0 && armXYZHeightTwoWeight == 0) {
                armXYZConversionMode = "LOCAL ESTIMATE"
            }
        }
        armXYZOutputChassis += strength * correctionC
        armXYZOutputShoulder += correctionS
        armXYZOutputElbow += correctionE
    }

    function armXYZInitializeCalibrationOffsets(): void {
        armXYZCalibrationDeltaC = []
        armXYZCalibrationDeltaS = []
        armXYZCalibrationDeltaE = []
        armXYZTransportRunning = true
        for (let index = 0; index < armXYZCalibrationX.length; index++) {
            armXYZCalculateBasePose(armXYZCalibrationX[index], armXYZCalibrationY[index], armXYZCalibrationZ[index])
            armXYZCalibrationDeltaC.push(armXYZCalibrationC[index] - armXYZOutputChassis)
            armXYZCalibrationDeltaS.push(armXYZCalibrationS[index] - armXYZOutputShoulder)
            armXYZCalibrationDeltaE.push(armXYZCalibrationE[index] - armXYZOutputElbow)
        }
        armXYZTransportRunning = false
    }

    function armXYZMoveXYZ(x: number, y: number, z: number): void {
        if (armXYZTransportRunning) {
            armXYZCheckXYZRange(x, y, z)
        }
        if (armXYZTransportRunning) {
            armXYZCalculateBasePose(x, y, z)
        }
        if (armXYZTransportRunning) {
            armXYZApplyLocalCalibration(x, y, z)
            armXYZOutputChassis = Math.round(armXYZOutputChassis)
            armXYZOutputShoulder = Math.round(armXYZOutputShoulder)
            armXYZOutputElbow = Math.round(armXYZOutputElbow)
            if (armXYZYawExtrapolated) {
                armXYZConversionMode += " + YAW EXTRAPOLATION"
            }
            serial.writeLine(armXYZConversionMode)
            serial.writeLine("XYZ X=" + x + " Y=" + y + " Z=" + z + " -> C=" + armXYZOutputChassis + " S=" + armXYZOutputShoulder + " E=" + armXYZOutputElbow)
            if (!(armXYZOutputChassis >= 0 && armXYZOutputChassis <= 180 && armXYZOutputShoulder >= 0 && armXYZOutputShoulder <= 180 && armXYZOutputElbow >= 0 && armXYZOutputElbow <= 120)) {
                serial.writeLine("XYZ ANGLE LIMIT")
                armXYZLastResult = "XYZ JOINT LIMIT"
                armXYZTransportRunning = false
            }
        }
        // Reject a target if its output is already known to correspond to a very different measured point.
        if (armXYZTransportRunning) {
            for (let index = 0; index < armXYZCalibrationX.length; index++) {
                if (armXYZOutputChassis == armXYZCalibrationC[index] && armXYZOutputShoulder == armXYZCalibrationS[index] && armXYZOutputElbow == armXYZCalibrationE[index]) {
                    let mismatch = Math.sqrt((x - armXYZCalibrationX[index]) * (x - armXYZCalibrationX[index]) + (y - armXYZCalibrationY[index]) * (y - armXYZCalibrationY[index]) + (z - armXYZCalibrationZ[index]) * (z - armXYZCalibrationZ[index]))
                    if (mismatch > 1) {
                        serial.writeLine("UNCALIBRATED TARGET: these angles were measured at X=" + armXYZCalibrationX[index] + " Y=" + armXYZCalibrationY[index] + " Z=" + armXYZCalibrationZ[index])
                        armXYZLastResult = "XYZ CALIBRATION ERROR"
                        armXYZTransportRunning = false
                    }
                }
            }
        }
        if (armXYZTransportRunning) {
            armXYZMovePoseSlow(armXYZOutputChassis, armXYZOutputShoulder, armXYZOutputElbow, armXYZClaws)
            if (armXYZTransportRunning && (Acebott.armGetJointAngle(Acebott.ArmJoint.Chassis) != armXYZOutputChassis || Acebott.armGetJointAngle(Acebott.ArmJoint.Shoulder) != armXYZOutputShoulder || Acebott.armGetJointAngle(Acebott.ArmJoint.Elbow) != armXYZOutputElbow || Acebott.armGetJointAngle(Acebott.ArmJoint.Claws) != armXYZClaws)) {
                serial.writeLine("XYZ JOINT LIMIT")
                armXYZLastResult = "XYZ JOINT LIMIT"
                armXYZTransportRunning = false
            }
        }
    }

    function armXYZCalculateModelPose(x: number, y: number, z: number): void {
        if (armXYZTransportRunning) {
            armXYZHorizontal = Math.sqrt(x * x + y * y)
            armXYZVertical = z - ARM_BASE_HEIGHT
            armXYZDistance2 = Math.sqrt(armXYZHorizontal * armXYZHorizontal + armXYZVertical * armXYZVertical)
            if (armXYZDistance2 == 0) {
                serial.writeLine("IK DISTANCE ERROR")
                armXYZLastResult = "IK DISTANCE ERROR"
                armXYZTransportRunning = false
            }
        }
        if (armXYZTransportRunning) {
            armXYZShoulderCos = (armXYZDistance2 * armXYZDistance2 + ARM_SHOULDER_LENGTH * ARM_SHOULDER_LENGTH - ARM_ELBOW_LENGTH * ARM_ELBOW_LENGTH) / (2 * ARM_SHOULDER_LENGTH * armXYZDistance2)
            armXYZElbowCos = (0 - (armXYZDistance2 * armXYZDistance2 - ARM_SHOULDER_LENGTH * ARM_SHOULDER_LENGTH - ARM_ELBOW_LENGTH * ARM_ELBOW_LENGTH)) / (2 * ARM_SHOULDER_LENGTH * ARM_ELBOW_LENGTH)
            if (!(armXYZShoulderCos >= -1 && armXYZShoulderCos <= 1 && armXYZElbowCos >= -1 && armXYZElbowCos <= 1)) {
                serial.writeLine("IK ERROR")
                armXYZLastResult = "IK ANGLE ERROR"
                armXYZTransportRunning = false
            }
        }
        if (armXYZTransportRunning) {
            armXYZTargetShoulder = Math.round(180 - (Math.atan2(armXYZVertical, armXYZHorizontal) + Math.acos(armXYZShoulderCos)) * ARM_RAD_TO_DEG)
            armXYZTargetElbow = Math.round(Math.acos(armXYZElbowCos) * ARM_RAD_TO_DEG)
            armXYZOutputChassis = Math.round(90 - Math.atan2(x, y) * ARM_RAD_TO_DEG)
            // Z>=2 使用独立的几何角映射；低处连续过渡到现有地面校准。
            // 本次零位取五个最新确认点的平均值，仍是待实机验证的试验值。
            armXYZIkWeight = Math.constrain(z / 2, 0, 1)
            armXYZGeometricShoulder = (Math.atan2(armXYZVertical, armXYZHorizontal) + Math.acos(armXYZShoulderCos)) * ARM_RAD_TO_DEG + armXYZIK_SHOULDER_OFFSET
            armXYZGeometricElbow = 180 - Math.acos(armXYZElbowCos) * ARM_RAD_TO_DEG + armXYZIK_ELBOW_OFFSET
            armXYZOutputShoulder = Math.round((1 - armXYZIkWeight) * (124.87984 - 1.032771 * armXYZTargetShoulder + 0.61569 * armXYZTargetElbow) + armXYZIkWeight * armXYZGeometricShoulder)
            armXYZOutputElbow = Math.round((1 - armXYZIkWeight) * (56.13555 - 0.417577 * armXYZTargetShoulder + 0.739325 * armXYZTargetElbow - 0.25 * x) + armXYZIkWeight * armXYZGeometricElbow)
        }
    }

    function armXYZCheckXYZRange(x: number, y: number, z: number): void {
        armXYZDistance = Math.sqrt(x * x + y * y + (z - ARM_BASE_HEIGHT) * (z - ARM_BASE_HEIGHT))
        if (!(x >= -19 && x <= 19 && y >= 0 && y <= 19 && z >= 0 && z <= 27 && armXYZDistance >= 8 && armXYZDistance <= 19)) {
            serial.writeLine("XYZ OUT OF RANGE")
            armXYZLastResult = "XYZ OUT OF RANGE"
            armXYZTransportRunning = false
        } else if (x == 0 && y == 0 && z < 20) {
            serial.writeLine("XYZ OUT OF RANGE")
            armXYZLastResult = "XYZ OUT OF RANGE"
            armXYZTransportRunning = false
        }
    }

    function armXYZMovePoseSlow(c: number, s: number, e: number, g: number): void {
        if (armXYZTransportRunning) {
            armXYZStartC = Acebott.armGetJointAngle(Acebott.ArmJoint.Chassis)
            armXYZStartS = Acebott.armGetJointAngle(Acebott.ArmJoint.Shoulder)
            armXYZStartE = Acebott.armGetJointAngle(Acebott.ArmJoint.Elbow)
            armXYZStartG = Acebott.armGetJointAngle(Acebott.ArmJoint.Claws)
            armXYZSteps = Math.max(Math.max(Math.abs(c - armXYZStartC), Math.abs(s - armXYZStartS)), Math.max(Math.abs(e - armXYZStartE), Math.abs(g - armXYZStartG)))
            armXYZSteps = Math.max(1, Math.ceil(armXYZSteps))
            // 先检查全部插值点；发现超限时，本次移动不发送舵机指令。
            for (let step = 0; step <= armXYZSteps - 1; step++) {
                if (armXYZTransportRunning) {
                    armXYZPoseC = Math.round(armXYZStartC + (c - armXYZStartC) * (step + 1) / armXYZSteps)
                    armXYZPoseS = Math.round(armXYZStartS + (s - armXYZStartS) * (step + 1) / armXYZSteps)
                    armXYZPoseE = Math.round(armXYZStartE + (e - armXYZStartE) * (step + 1) / armXYZSteps)
                    armXYZPoseG = Math.round(armXYZStartG + (g - armXYZStartG) * (step + 1) / armXYZSteps)
                    armXYZCheckPoseLimit(armXYZPoseC, armXYZPoseS, armXYZPoseE, armXYZPoseG)
                    if (!(armXYZPoseAllowed)) {
                        serial.writeLine("PATH LIMIT stage=" + armXYZTransportStage + " step=" + (step + 1) + "/" + armXYZSteps + " C=" + armXYZPoseC + " S=" + armXYZPoseS + " E=" + armXYZPoseE + " G=" + armXYZPoseG + " Smin=" + Math.ceil(armXYZMinimumShoulder))
                        armXYZLastResult = "XYZ JOINT LIMIT"
                        armXYZTransportRunning = false
                    }
                }
            }
            // 预检通过后，沿同一组插值点移动，并检查四关节缓存。
            for (let step = 0; step <= armXYZSteps - 1; step++) {
                if (armXYZTransportRunning) {
                    armXYZPoseC = Math.round(armXYZStartC + (c - armXYZStartC) * (step + 1) / armXYZSteps)
                    armXYZPoseS = Math.round(armXYZStartS + (s - armXYZStartS) * (step + 1) / armXYZSteps)
                    armXYZPoseE = Math.round(armXYZStartE + (e - armXYZStartE) * (step + 1) / armXYZSteps)
                    armXYZPoseG = Math.round(armXYZStartG + (g - armXYZStartG) * (step + 1) / armXYZSteps)
                    armXYZApplyLimitedPose(armXYZPoseC, armXYZPoseS, armXYZPoseE, armXYZPoseG)
                    armXYZWaitTransport(ARM_XYZ_MOVE_STEP_MS)
                }
            }
        }
    }

    /** Move using the calibrated IK-v1 model; XYZ is relative after armReset. */
    //% blockId=armSetPosition block="robotic arm coordinate control|X %x|Y %y|Z %z"
    //% x.defl=0
    //% y.defl=0
    //% z.defl=0
    //% group="Microbit Robotic Arm"
    //% subcategory="Executive"
    //% weight=85
    //% help=github:acebott/docs/reference
    export function armSetPosition(x: number, y: number, z: number): void {
        if (armAppPositionHook) {
            armAppPositionHook(x, y, z)
        } else {
            armExecutePosition(x, y, z)
        }
    }

    /** Shared XYZ implementation; the APP scheduler uses it for queued coordinates. */
    export function armExecutePosition(x: number, y: number, z: number): void {
        if (armXYZBusy) {
            serial.writeLine("Arm XYZ busy")
            return
        }
        armXYZBusy = true
        armXYZLastResult = "XYZ BUSY"
        if (!armXYZCalibrationReady) {
            armXYZInitializeCalibrationOffsets()
            armXYZCalibrationReady = true
        }
        // Preserve the home-relative coordinate frame requested for armReset.
        x += armCoordinateOrigin[ArmCoordinateAxis.X]
        y += armCoordinateOrigin[ArmCoordinateAxis.Y]
        z += armCoordinateOrigin[ArmCoordinateAxis.Z]
        armXYZTransportStage = "XYZ"
        armXYZTransportRunning = true
        armXYZClaws = armJointAngles[ArmJoint.Claws]
        armXYZMoveXYZ(x, y, z)
        if (armXYZTransportRunning) {
            armXYZLastResult = "XYZ OK"
        } else if (armXYZLastResult == "XYZ BUSY") {
            armXYZLastResult = "XYZ JOINT LIMIT"
        }
        armXYZTransportRunning = false
        armXYZBusy = false
    }

    /** Result of the latest XYZ request; used by the APP adapter. */
    export function armGetPositionResult(): string {
        return armXYZLastResult
    }

    /** Stop subsequent interpolated XYZ steps without changing the origin. */
    export function armCancelPositionMove(): void {
        if (armXYZBusy) {
            armXYZLastResult = "XYZ CANCELLED"
            armXYZTransportRunning = false
        }
    }

    // Coordinates are estimates from cached angles and measured calibration points.
    // The geometric fallback does not turn the local residual corrections into
    // hardware feedback, nor claim exact XYZ at unmeasured positions.
    function armCoordinateValue(axis: ArmCoordinateAxis): number {
        let chassis = armJointAngles[ArmJoint.Chassis]
        let shoulder = armJointAngles[ArmJoint.Shoulder]
        let elbow = armJointAngles[ArmJoint.Elbow]
        for (let index = 0; index < armXYZCalibrationC.length; index++) {
            if (chassis == armXYZCalibrationC[index] &&
                shoulder == armXYZCalibrationS[index] && elbow == armXYZCalibrationE[index]) {
                if (axis == ArmCoordinateAxis.X) return armXYZCalibrationX[index]
                if (axis == ArmCoordinateAxis.Y) return armXYZCalibrationY[index]
                return armXYZCalibrationZ[index]
            }
        }
        let shoulderRadians = (shoulder - armXYZIK_SHOULDER_OFFSET) / ARM_RAD_TO_DEG
        let elbowRadians = (elbow - armXYZIK_ELBOW_OFFSET) / ARM_RAD_TO_DEG
        let radial = ARM_SHOULDER_LENGTH * Math.cos(shoulderRadians) +
            ARM_ELBOW_LENGTH * Math.cos(shoulderRadians - elbowRadians)
        let z = ARM_BASE_HEIGHT + ARM_SHOULDER_LENGTH * Math.sin(shoulderRadians) +
            ARM_ELBOW_LENGTH * Math.sin(shoulderRadians - elbowRadians)
        armXYZInterpolateCalibration(chassis, armXYZBearingServo, armXYZBearingAngles)
        let chassisRadians = armXYZInterpolatedValue / ARM_RAD_TO_DEG
        if (axis == ArmCoordinateAxis.X) return radial * Math.sin(chassisRadians)
        if (axis == ArmCoordinateAxis.Y) return radial * Math.cos(chassisRadians)
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
        angle = constrainArmOutputAngle(channel, angle)

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

        angle = constrainArmOutputAngle(outputChannel, Math.constrain(angle, minAngle, maxAngle))
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
     * Control the robotic arm claws from 90 to 180 degrees.
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
        controlArmJoint(adcChannel, outputChannel, step, 90, 180, false)
    }

}
