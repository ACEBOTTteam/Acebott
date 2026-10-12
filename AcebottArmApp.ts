// 机械臂动作与记忆封装。蓝牙通信和指令分发留在学生主程序。
// XYZ 调用当前机械臂库；回位不更改 XYZ 原点。
namespace Acebott {
    export enum ArmAppSide {
        //% block="left directional pad"
        Left = 0,
        //% block="right directional pad"
        Right = 1
    }
    let appMessageHandler: (message: string) => void = null

    let appStarted = false
    let appAngles = [90, 90, 90, 90]
    let appSliderTargets = [90, 90, 90, 90]
    let appSliderPending = [false, false, false, false]
    let appSliderSpeeds = [100, 100, 100, 100]
    let appLeft = 0
    let appRight = 0
    let appLastTick = -20
    let appLastSlider = 0
    let appLastLimit = -500
    let appOrder = [0, 2, 1, 3]
    let appNextAngles = [90, 90, 90, 90]
    let appPoseAngles = [90, 90, 90, 90]
    let appXYZPending = false
    let appXYZExecuting = false
    let appXYZRevision = 0
    let appXYZCoordinates = [0, 0, 0]

    // 每组顺序存储 C、S、E、G；一个姿态占四个数字。
    let appMemories: number[][] = [[], [], []]
    let appMode = 1
    let appRecording = false
    let appPlaying = false
    let appLoop = false
    let appPoseIndex = 0
    let appPoseStep = 0
    let appPoseStart = [90, 90, 90, 90]
    let appHoldUntil = 0

    function appStatus(text: string): void {
        if (appMessageHandler) {
            appMessageHandler(text)
        }
    }

    function appReadAngles(): void {
        for (let joint = 0; joint < 4; joint++) {
            appAngles[joint] = Acebott.armGetJointAngle(joint)
        }
    }

    function appReportAngles(): void {
        appStatus("ANGLE " + appAngles[0] + " " + appAngles[1] + " " + appAngles[2] + " " + appAngles[3])
    }

    function appClearManual(): void {
        appLeft = 0
        appRight = 0
        for (let joint = 0; joint < 4; joint++) {
            appSliderPending[joint] = false
        }
    }

    function appStopPlayback(): void {
        appPlaying = false
        appLoop = false
        appPoseIndex = 0
        appPoseStep = 0
    }

    function appCancelXYZ(): void {
        if (appXYZExecuting) {
            Acebott.armCancelPositionMove()
        }
        appXYZPending = false
        appXYZRevision += 1
    }

    function appManualPriority(): void {
        appCancelXYZ()
        if (appPlaying) {
            appStopPlayback()
            serial.writeLine("MEMORY INTERRUPTED BY MANUAL")
        }
    }

    function appWritePose(c: number, s: number, e: number, g: number): boolean {
        if (!(c >= 0 && c <= 180 && s >= 0 && s <= 180 && e >= 0 && e <= 120 && g >= 90 && g <= 180)) {
            return false
        }
        Acebott.armSetPose(c, s, e, g)
        appReadAngles()
        // 这里只检查库接受的目标角，不代表舵机实测位置。
        return appAngles[0] == Math.round(c) && appAngles[1] == Math.round(s) && appAngles[2] == Math.round(e) && appAngles[3] == Math.round(g)
    }

    function appSetJoint(joint: number, angle: number, speed: number = 100): void {
        let minimum = joint == 3 ? 90 : 0
        let maximum = joint == 2 ? 120 : 180
        let target = Math.constrain(Math.round(angle), minimum, maximum)
        if (target != appAngles[joint]) {
            Acebott.armExecuteJoint(joint, target, speed)
            appReadAngles()
            if (appAngles[joint] != target && control.millis() - appLastLimit >= 500) {
                serial.writeLine("LIMIT joint=" + joint + " target=" + target)
                appLastLimit = control.millis()
            }
        }
    }

    function appReset(): void {
        appCancelXYZ()
        appClearManual()
        appStopPlayback()
        // 保留原来的回位顺序，但每次更新只执行一个关节、等待由循环安排。
        // 新的手动或回放指令可取消回位，避免动作争用。
        appResetStep = 0
        appResetting = true
        appResetAt = control.millis()
        appResetReport = false
    }

    let appResetting = false
    let appResetStep = 0
    let appResetAt = 0
    let appResetReport = false

    function appUpdateReset(): void {
        if (control.millis() < appResetAt) {
            return
        }
        appSetJoint(appResetStep, 90)
        appResetStep += 1
        if (appResetStep == 4) {
            appResetting = false
            for (let joint = 0; joint < 4; joint++) {
                appSliderTargets[joint] = appAngles[joint]
            }
            if (appAngles[0] == 90 && appAngles[1] == 90 && appAngles[2] == 90 && appAngles[3] == 90) {
                appStatus("RESET OK")
            } else {
                appStatus("RESET JOINT LIMIT")
            }
            if (appResetReport) {
                appReportAngles()
            }
        } else {
            appResetAt = control.millis() + 100
        }
    }

    function appNumberValid(text: string, integerOnly: boolean): boolean {
        let digits = 0
        let dots = 0
        for (let index = 0; index < text.length; index++) {
            let code = text.charCodeAt(index)
            if (code >= 48 && code <= 57) {
                digits += 1
            } else if (!integerOnly && code == 46) {
                dots += 1
            } else if (!integerOnly && index == 0 && (code == 43 || code == 45)) {
                // 正负号只能出现在第一个字符。
            } else {
                return false
            }
        }
        return digits > 0 && dots <= 1
    }

    function appManualUpdate(): void {
        // 高频滑块指令只保留各关节的最新值，每 120 ms 应用一次。
        if (control.millis() - appLastSlider >= 120) {
            for (let index = 0; index < 4; index++) {
                let joint = appOrder[index]
                if (appSliderPending[joint]) {
                    appSetJoint(joint, appSliderTargets[joint], appSliderSpeeds[joint])
                    appSliderPending[joint] = false
                }
            }
            appLastSlider = control.millis()
        }
        for (let joint = 0; joint < 4; joint++) {
            appNextAngles[joint] = appAngles[joint]
        }
        if (appLeft == 1) {
            appNextAngles[1] -= 2
        } else if (appLeft == 2) {
            appNextAngles[1] += 2
        } else if (appLeft == 3) {
            appNextAngles[0] += 2
        } else if (appLeft == 4) {
            appNextAngles[0] -= 2
        }
        if (appRight == 1) {
            appNextAngles[2] += 2
        } else if (appRight == 2) {
            appNextAngles[2] -= 2
        } else if (appRight == 3) {
            appNextAngles[3] += 2
        } else if (appRight == 4) {
            appNextAngles[3] -= 2
        }
        for (let index = 0; index < 4; index++) {
            let joint = appOrder[index]
            appSetJoint(joint, appNextAngles[joint])
        }
    }

    /** Convert APP text to three numbers; actual movement uses armSetPosition. */
    //% blockId=acebott_arm_app_parse_xyz block="convert APP XYZ text %coordinates to a number list"
    //% coordinates.defl="7 13 2"
    //% group="Microbit Robotic Arm APP" subcategory="Executive" weight=80
    export function armAppParseCoordinates(coordinates: string): number[] {
        let normalized = ""
        for (let index = 0; index < coordinates.length; index++) {
            let code = coordinates.charCodeAt(index)
            if (code == 9 || code == 10 || code == 13 || code == 32 || code == 44 || code == 160 || code == 12288 || code == 65292) {
                normalized += " "
            } else {
                normalized += coordinates.charAt(index)
            }
        }
        let raw = normalized.split(" ")
        let parts: string[] = []
        for (let part of raw) {
            if (part.length > 0) {
                parts.push(part)
            }
        }
        if (parts.length != 3 && normalized.length == 9) {
            parts = [normalized.substr(0, 3), normalized.substr(3, 3), normalized.substr(6, 3)]
        }
        if (parts.length != 3) {
            appStatus("XYZ FORMAT ERROR")
            return []
        }
        for (let part of parts) {
            if (!appNumberValid(part, false)) {
                appStatus("XYZ NUMBER ERROR")
                return []
            }
        }
        let x = parseFloat(parts[0])
        let y = parseFloat(parts[1])
        let z = parseFloat(parts[2])
        if (!(x >= -10000 && x <= 10000 && y >= -10000 && y <= 10000 && z >= -10000 && z <= 10000)) {
            appStatus("XYZ NUMBER ERROR")
            return []
        }
        return [x, y, z]
    }

    function appQueuePosition(x: number, y: number, z: number): void {
        appClearManual()
        appManualPriority()
        appResetting = false
        appXYZCoordinates = [x, y, z]
        appXYZPending = true
    }

    function appExecuteXYZ(): void {
        let revision = appXYZRevision
        let x = appXYZCoordinates[0]
        let y = appXYZCoordinates[1]
        let z = appXYZCoordinates[2]
        appXYZPending = false
        appXYZExecuting = true
        Acebott.armExecutePosition(x, y, z)
        appXYZExecuting = false
        appReadAngles()
        // 新的手动、回位、断线或坐标指令已取代本次动作时，不发送过期结果。
        if (revision != appXYZRevision) {
            return
        }
        let result = Acebott.armGetPositionResult()
        if (result == "XYZ OK") {
            for (let joint = 0; joint < 4; joint++) {
                appSliderTargets[joint] = appAngles[joint]
            }
            appStatus("XYZ OK " + x + " " + y + " " + z)
        } else {
            appStatus(result)
        }
        appReportAngles()
    }

    function appStartPlayback(loopMode: boolean): void {
        appCancelXYZ()
        appRecording = false
        appClearManual()
        appStopPlayback()
        appResetting = false
        if (appMemories[appMode - 1].length == 0) {
            appStatus("MEMORY EMPTY")
            return
        }
        appPlaying = true
        appLoop = loopMode
        if (loopMode) {
            appStatus("MEMORY LOOP MODE=" + appMode)
        } else {
            appStatus("MEMORY RUN MODE=" + appMode)
        }
    }

    function appMemory(action: Acebott.ArmMemoryMode): void {
        let bank = appMemories[appMode - 1]
        if (action == Acebott.ArmMemoryMode.StartRecording) {
            appStopPlayback()
            appRecording = true
            appStatus("MEMORY START MODE=" + appMode)
        } else if (action == Acebott.ArmMemoryMode.Save) {
            if (!appRecording) {
                appStatus("MEMORY NOT STARTED")
            } else if (bank.length >= 20 * 4) {
                appStatus("MEMORY FULL")
            } else {
                appReadAngles()
                for (let joint = 0; joint < 4; joint++) {
                    bank.push(appAngles[joint])
                }
                appStatus("MEMORY SAVED MODE=" + appMode + " COUNT=" + bank.length / 4)
            }
        } else if (action == Acebott.ArmMemoryMode.EndRecording) {
            appRecording = false
            appStatus("MEMORY END MODE=" + appMode)
        } else if (action == Acebott.ArmMemoryMode.Run) {
            appStartPlayback(false)
        } else if (action == Acebott.ArmMemoryMode.Delete) {
            appStopPlayback()
            appRecording = false
            appMemories[appMode - 1] = []
            appStatus("MEMORY CLEARED MODE=" + appMode)
        } else if (action == Acebott.ArmMemoryMode.RunLoop) {
            appStartPlayback(true)
        } else if (action == Acebott.ArmMemoryMode.Stop) {
            appCancelXYZ()
            appStopPlayback()
            appClearManual()
            appResetting = false
            appStatus("MEMORY LOOP STOPPED MODE=" + appMode)
        } else {
            appStatus("UNKNOWN COMMAND")
        }
    }

    function appPlaybackUpdate(): void {
        let bank = appMemories[appMode - 1]
        if (appPoseStep == 30) {
            if (control.millis() < appHoldUntil) {
                return
            }
            appReportAngles()
            appPoseIndex += 1
            appPoseStep = 0
            if (appPoseIndex * 4 >= bank.length) {
                if (appLoop) {
                    appPoseIndex = 0
                } else {
                    appPlaying = false
                    appStatus("MEMORY DONE MODE=" + appMode)
                    return
                }
            }
        }
        if (appPoseStep == 0) {
            for (let joint = 0; joint < 4; joint++) {
                appPoseStart[joint] = appAngles[joint]
            }
        }
        for (let joint = 0; joint < 4; joint++) {
            appPoseAngles[joint] = Math.round(appPoseStart[joint] + (bank[appPoseIndex * 4 + joint] - appPoseStart[joint]) * (appPoseStep + 1) / 30)
        }
        if (!appWritePose(appPoseAngles[0], appPoseAngles[1], appPoseAngles[2], appPoseAngles[3])) {
            appPlaying = false
            appLoop = false
            appStatus("MEMORY JOINT LIMIT INDEX=" + appPoseIndex)
            appReportAngles()
            return
        }
        appPoseStep += 1
        if (appPoseStep == 30) {
            // 第 30 步的 20 ms 加上原程序姿态间的 100 ms。
            appHoldUntil = control.millis() + 120
        }
    }

    /** 机械臂产生结果时触发；由主程序决定显示、打印或发送方式。 */
    //% blockId=acebott_arm_app_result block="when robotic arm reports a result"
    //% draggableParameters="reporter"
    //% group="Microbit Robotic Arm APP" subcategory="Executive" weight=84
    export function onArmAppResult(handler: (message: string) => void): void {
        appMessageHandler = handler
    }

    /** Invalid angle text returns -1 and reports an error. */
    //% blockId=acebott_arm_app_parse_angle block="convert APP angle text %angleText to a number"
    //% angleText.defl="90"
    //% group="Microbit Robotic Arm APP" subcategory="Executive" weight=81
    export function armAppParseAngle(angleText: string): number {
        if (!appNumberValid(angleText, true)) {
            appStatus("UNKNOWN COMMAND")
            return -1
        }
        let value = parseInt(angleText)
        if (!(value >= 0 && value <= 180)) {
            appStatus("UNKNOWN COMMAND")
            return -1
        }
        return value
    }

    function appQueueJoint(joint: ArmJoint, value: number, speed: number): void {
        if (!(joint >= 0 && joint <= 3) || joint != Math.round(joint) || !(value >= 0 && value <= 180)) {
            appStatus("UNKNOWN COMMAND")
            return
        }
        appReadAngles()
        appManualPriority()
        appResetting = false
        if (joint < 2) {
            appLeft = 0
        } else {
            appRight = 0
        }
        appSliderTargets[joint] = Math.constrain(Math.round(value), joint == 3 ? 90 : 0, joint == 2 ? 120 : 180)
        appSliderSpeeds[joint] = speed
        appSliderPending[joint] = true
    }

    /** 设置机械臂动作状态；先使用初始化机械臂积木设置输出通道。 */
    //% blockId=acebott_arm_app_prepare block="prepare APP arm control"
    //% group="Microbit Robotic Arm APP" subcategory="Executive" weight=83
    export function armAppPrepare(): void {
        if (!appStarted) {
            appStarted = true
            Acebott.armAttachAppControl(appQueueJoint, appQueuePosition, function () {
                appReset()
                appResetReport = true
            }, function (mode) {
                appReadAngles()
                appMemory(mode)
            })
            appReadAngles()
            appReset()
        }
    }

    /** 方向 0=停止，1=上，2=下，3=左，4=右，保持原 APP 对应的关节方向。 */
    //% blockId=acebott_arm_app_joystick block="set APP %side direction %direction"
    //% side.defl=Acebott.ArmAppSide.Left
    //% direction.min=0 direction.max=4 direction.defl=0
    //% group="Microbit Robotic Arm APP" subcategory="Executive" weight=82
    export function armAppSetJoystick(side: ArmAppSide, direction: number): void {
        if (!appStarted) {
            return
        }
        if ((side != ArmAppSide.Left && side != ArmAppSide.Right) || !(direction >= 0 && direction <= 4) || direction != Math.round(direction)) {
            appStatus("UNKNOWN COMMAND")
            return
        }
        if (direction != 0) {
            appManualPriority()
            appResetting = false
        }
        if (side == ArmAppSide.Left) {
            appLeft = direction
        } else {
            appRight = direction
        }
    }

    /** 选择 1、2、3 记忆组，保留其他组数据，停止当前回放和记录。 */
    //% blockId=acebott_arm_app_group block="select APP arm memory group %group"
    //% group.min=1 group.max=3 group.defl=1
    //% group="Microbit Robotic Arm APP" subcategory="Executive" weight=77
    export function armAppSelectGroup(group: number): void {
        if (appStarted && group >= 1 && group <= 3 && group == Math.round(group)) {
            appCancelXYZ()
            appStopPlayback()
            appRecording = false
            appMode = group
        }
    }

    /** 清除待执行的手动输入，停止回放、记录及回位；不清除已保存姿态。 */
    //% blockId=acebott_arm_app_stop block="stop APP arm actions"
    //% group="Microbit Robotic Arm APP" subcategory="Executive" weight=76
    export function armAppStop(): void {
        appCancelXYZ()
        appClearManual()
        appStopPlayback()
        appRecording = false
        appResetting = false
    }

    /** 放在重复执行中，每轮推进摇杆、滑块、复位或回放。 */
    //% blockId=acebott_arm_app_update block="update APP arm actions"
    //% group="Microbit Robotic Arm APP" subcategory="Executive" weight=75
    export function armAppUpdate(): void {
        if (!appStarted || appXYZExecuting || control.millis() - appLastTick < 20) {
            return
        }
        appLastTick = control.millis()
        appReadAngles()
        if (appXYZPending) {
            appExecuteXYZ()
        } else if (appResetting) {
            appUpdateReset()
        } else if (appPlaying) {
            appPlaybackUpdate()
        } else {
            appManualUpdate()
        }
    }
}
