var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>
var pxsim;
(function (pxsim) {
    var DalBoard = (function (_super) {
        __extends(DalBoard, _super);
        function DalBoard() {
            _super.call(this);
            // components
            this.fileSystem = new pxsim.FileSystemState();
            this.builtinParts["ledmatrix"] = this.ledMatrixState = new pxsim.LedMatrixState(pxsim.runtime);
            this.builtinParts["buttonpair"] = this.buttonPairState = new pxsim.ButtonPairState({
                ID_BUTTON_A: 1 /* MICROBIT_ID_BUTTON_A */,
                ID_BUTTON_B: 2 /* MICROBIT_ID_BUTTON_B */,
                ID_BUTTON_AB: 26 /* MICROBIT_ID_BUTTON_AB */,
                BUTTON_EVT_UP: 2 /* MICROBIT_BUTTON_EVT_UP */,
                BUTTON_EVT_CLICK: 3 /* MICROBIT_BUTTON_EVT_CLICK */
            });
            this.builtinParts["edgeconnector"] = this.edgeConnectorState = new pxsim.EdgeConnectorState({
                pins: [
                    7 /* MICROBIT_ID_IO_P0 */,
                    8 /* MICROBIT_ID_IO_P1 */,
                    9 /* MICROBIT_ID_IO_P2 */,
                    10 /* MICROBIT_ID_IO_P3 */,
                    11 /* MICROBIT_ID_IO_P4 */,
                    12 /* MICROBIT_ID_IO_P5 */,
                    13 /* MICROBIT_ID_IO_P6 */,
                    14 /* MICROBIT_ID_IO_P7 */,
                    15 /* MICROBIT_ID_IO_P8 */,
                    16 /* MICROBIT_ID_IO_P9 */,
                    17 /* MICROBIT_ID_IO_P10 */,
                    18 /* MICROBIT_ID_IO_P11 */,
                    19 /* MICROBIT_ID_IO_P12 */,
                    20 /* MICROBIT_ID_IO_P13 */,
                    21 /* MICROBIT_ID_IO_P14 */,
                    22 /* MICROBIT_ID_IO_P15 */,
                    23 /* MICROBIT_ID_IO_P16 */,
                    0,
                    0,
                    24 /* MICROBIT_ID_IO_P19 */,
                    25 /* MICROBIT_ID_IO_P20 */
                ],
                servos: {
                    "P0": 7 /* MICROBIT_ID_IO_P0 */,
                    "P1": 8 /* MICROBIT_ID_IO_P1 */,
                    "P2": 9 /* MICROBIT_ID_IO_P2 */,
                    "P3": 10 /* MICROBIT_ID_IO_P3 */
                }
            });
            this.builtinParts["radio"] = this.radioState = new pxsim.RadioState(pxsim.runtime);
            this.builtinParts["accelerometer"] = this.accelerometerState = new pxsim.AccelerometerState(pxsim.runtime);
            this.builtinParts["serial"] = this.serialState = new pxsim.SerialState();
            this.builtinParts["thermometer"] = this.thermometerState = new pxsim.ThermometerState();
            this.builtinParts["lightsensor"] = this.lightSensorState = new pxsim.LightSensorState();
            this.builtinParts["compass"] = this.compassState = new pxsim.CompassState();
            this.builtinParts["neopixel"] = this.neopixelState = new pxsim.NeoPixelState();
            this.builtinParts["microservo"] = this.edgeConnectorState;
            this.builtinVisuals["buttonpair"] = function () { return new pxsim.visuals.ButtonPairView(); };
            this.builtinVisuals["ledmatrix"] = function () { return new pxsim.visuals.LedMatrixView(); };
            this.builtinVisuals["neopixel"] = function () { return new pxsim.visuals.NeoPixelView(); };
            this.builtinVisuals["microservo"] = function () { return new pxsim.visuals.MicroServoView(); };
            this.builtinPartVisuals["buttonpair"] = function (xy) { return pxsim.visuals.mkBtnSvg(xy); };
            this.builtinPartVisuals["ledmatrix"] = function (xy) { return pxsim.visuals.mkLedMatrixSvg(xy, 8, 8); };
            this.builtinPartVisuals["neopixel"] = function (xy) { return pxsim.visuals.mkNeoPixelPart(xy); };
            this.builtinPartVisuals["microservo"] = function (xy) { return pxsim.visuals.mkMicroServoPart(xy); };
        }
        DalBoard.prototype.receiveMessage = function (msg) {
            if (!pxsim.runtime || pxsim.runtime.dead)
                return;
            switch (msg.type || "") {
                case "eventbus":
                    var ev = msg;
                    this.bus.queue(ev.id, ev.eventid, ev.value);
                    break;
                case "serial":
                    var data = msg.data || "";
                    this.serialState.receiveData(data);
                    break;
                case "radiopacket":
                    var packet = msg;
                    this.radioState.receivePacket(packet);
                    break;
            }
        };
        DalBoard.prototype.initAsync = function (msg) {
            _super.prototype.initAsync.call(this, msg);
            var options = (msg.options || {});
            var boardDef = msg.boardDefinition;
            var cmpsList = msg.parts;
            var cmpDefs = msg.partDefinitions || {};
            var fnArgs = msg.fnArgs;
            var opts = {
                state: this,
                boardDef: boardDef,
                partsList: cmpsList,
                partDefs: cmpDefs,
                fnArgs: fnArgs,
                maxWidth: "100%",
                maxHeight: "100%",
                highContrast: msg.highContrast
            };
            var viewHost = new pxsim.visuals.BoardHost(pxsim.visuals.mkBoardView({
                visual: boardDef.visual,
                highContrast: msg.highContrast
            }), opts);
            document.body.innerHTML = ""; // clear children
            document.body.appendChild(this.view = viewHost.getView());
            return Promise.resolve();
        };
        DalBoard.prototype.screenshot = function () {
            return pxsim.svg.toDataUri(new XMLSerializer().serializeToString(this.view));
        };
        return DalBoard;
    }(pxsim.CoreBoard));
    pxsim.DalBoard = DalBoard;
    function initRuntimeWithDalBoard() {
        pxsim.U.assert(!pxsim.runtime.board);
        var b = new DalBoard();
        pxsim.runtime.board = b;
        pxsim.runtime.postError = function (e) {
            pxsim.led.setBrightness(255);
            var img = board().ledMatrixState.image;
            img.clear();
            img.set(0, 4, 255);
            img.set(1, 3, 255);
            img.set(2, 3, 255);
            img.set(3, 3, 255);
            img.set(4, 4, 255);
            img.set(0, 0, 255);
            img.set(1, 0, 255);
            img.set(0, 1, 255);
            img.set(1, 1, 255);
            img.set(3, 0, 255);
            img.set(4, 0, 255);
            img.set(3, 1, 255);
            img.set(4, 1, 255);
            pxsim.runtime.updateDisplay();
        };
    }
    pxsim.initRuntimeWithDalBoard = initRuntimeWithDalBoard;
    if (!pxsim.initCurrentRuntime) {
        pxsim.initCurrentRuntime = initRuntimeWithDalBoard;
    }
    function board() {
        return pxsim.runtime.board;
    }
    pxsim.board = board;
})(pxsim || (pxsim = {}));
/// <reference path="../node_modules/pxt-core/typings/globals/bluebird/index.d.ts"/>
/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../node_modules/pxt-core/built/pxtrunner.d.ts"/>
//HACK: allows instructions.html to access pxtblocks without requiring simulator.html to import blocks as well
if (!window.pxt)
    window.pxt = {};
var pxtrunner = pxt.runner;
var pxtdocs = pxt.docs;
var pxsim;
(function (pxsim) {
    var instructions;
    (function (instructions) {
        function drawInstructions() {
            pxsim.visuals.mkBoardView = function (opts) {
                return new pxsim.visuals.MicrobitBoardSvg({
                    runtime: pxsim.runtime,
                    theme: pxsim.visuals.randomTheme(),
                    disableTilt: false,
                    wireframe: opts.wireframe,
                });
            };
            var getQsVal = pxsim.parseQueryString();
            //project name
            var name = getQsVal("name") || "Untitled";
            // board def
            var boardDef = JSON.parse(getQsVal("board"));
            //parts list
            var parts = (getQsVal("parts") || "").split(" ");
            parts.sort();
            // parts definitions
            var partDefinitions = JSON.parse(getQsVal("partdefs") || "{}");
            //fn args
            var fnArgs = JSON.parse((getQsVal("fnArgs") || "{}"));
            //project code
            var tsCode = getQsVal("code");
            var tsPackage = getQsVal("package") || "";
            var codeSpinnerDiv = document.getElementById("proj-code-spinner");
            var codeContainerDiv = document.getElementById("proj-code-container");
            if (tsCode) {
                //we use the docs renderer to decompile the code to blocks and render it
                //TODO: render the blocks code directly
                var md = "```blocks\n" + tsCode + "\n```\n```package\n" + tsPackage + "\n```\n";
                pxtdocs.requireMarked = function () { return window.marked; };
                pxtrunner.renderMarkdownAsync(codeContainerDiv, md)
                    .done(function () {
                    var codeSvg = $("#proj-code-container svg");
                    if (codeSvg.length > 0) {
                        //code rendered successfully as blocks
                        codeSvg.css("width", "inherit");
                        codeSvg.css("height", "inherit");
                        //takes the svg out of the wrapper markdown
                        codeContainerDiv.innerHTML = "";
                        codeContainerDiv.appendChild(codeSvg[0]);
                    }
                    else {
                        //code failed to convert to blocks, display as typescript instead
                        codeContainerDiv.innerText = tsCode;
                    }
                    $(codeContainerDiv).show();
                    $(codeSpinnerDiv).hide();
                });
            }
            if (name)
                $("#proj-title").text(name);
            //init runtime
            if (!pxsim.initCurrentRuntime)
                pxsim.initCurrentRuntime = pxsim.initRuntimeWithDalBoard;
            instructions.renderParts({
                name: name,
                boardDef: boardDef,
                parts: parts,
                partDefinitions: partDefinitions,
                fnArgs: fnArgs
            });
        }
        instructions.drawInstructions = drawInstructions;
    })(instructions = pxsim.instructions || (pxsim.instructions = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var input;
    (function (input) {
        function onGesture(gesture, handler) {
            var b = pxsim.board().accelerometerState;
            b.accelerometer.activate();
            if (gesture == 11 && !b.useShake) {
                b.useShake = true;
                pxsim.runtime.queueDisplayUpdate();
            }
            pxsim.pxtcore.registerWithDal(27 /* MICROBIT_ID_GESTURE */, gesture, handler);
        }
        input.onGesture = onGesture;
        function acceleration(dimension) {
            var b = pxsim.board().accelerometerState;
            var acc = b.accelerometer;
            acc.activate();
            switch (dimension) {
                case 0: return acc.getX();
                case 1: return acc.getY();
                case 2: return acc.getZ();
                default: return Math.floor(Math.sqrt(acc.instantaneousAccelerationSquared()));
            }
        }
        input.acceleration = acceleration;
        function rotation(kind) {
            var b = pxsim.board().accelerometerState;
            var acc = b.accelerometer;
            acc.activate();
            var x = acc.getX(pxsim.MicroBitCoordinateSystem.NORTH_EAST_DOWN);
            var y = acc.getY(pxsim.MicroBitCoordinateSystem.NORTH_EAST_DOWN);
            var z = acc.getZ(pxsim.MicroBitCoordinateSystem.NORTH_EAST_DOWN);
            var roll = Math.atan2(y, z);
            var pitch = Math.atan(-x / (y * Math.sin(roll) + z * Math.cos(roll)));
            var r = 0;
            switch (kind) {
                case 0:
                    r = pitch;
                    break;
                case 1:
                    r = roll;
                    break;
            }
            return Math.floor(r / Math.PI * 180);
        }
        input.rotation = rotation;
        function setAccelerometerRange(range) {
            var b = pxsim.board().accelerometerState;
            b.accelerometer.setSampleRange(range);
        }
        input.setAccelerometerRange = setAccelerometerRange;
    })(input = pxsim.input || (pxsim.input = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    /**
      * Co-ordinate systems that can be used.
      * RAW: Unaltered data. Data will be returned directly from the accelerometer.
      *
      * SIMPLE_CARTESIAN: Data will be returned based on an easy to understand alignment, consistent with the cartesian system taught in schools.
      * When held upright, facing the user:
      *
      *                            /
      *    +--------------------+ z
      *    |                    |
      *    |       .....        |
      *    | *     .....      * |
      * ^  |       .....        |
      * |  |                    |
      * y  +--------------------+  x-->
      *
      *
      * NORTH_EAST_DOWN: Data will be returned based on the industry convention of the North East Down (NED) system.
      * When held upright, facing the user:
      *
      *                            z
      *    +--------------------+ /
      *    |                    |
      *    |       .....        |
      *    | *     .....      * |
      * ^  |       .....        |
      * |  |                    |
      * x  +--------------------+  y-->
      *
      */
    (function (MicroBitCoordinateSystem) {
        MicroBitCoordinateSystem[MicroBitCoordinateSystem["RAW"] = 0] = "RAW";
        MicroBitCoordinateSystem[MicroBitCoordinateSystem["SIMPLE_CARTESIAN"] = 1] = "SIMPLE_CARTESIAN";
        MicroBitCoordinateSystem[MicroBitCoordinateSystem["NORTH_EAST_DOWN"] = 2] = "NORTH_EAST_DOWN";
    })(pxsim.MicroBitCoordinateSystem || (pxsim.MicroBitCoordinateSystem = {}));
    var MicroBitCoordinateSystem = pxsim.MicroBitCoordinateSystem;
    var Accelerometer = (function () {
        function Accelerometer(runtime) {
            this.runtime = runtime;
            this.sigma = 0; // the number of ticks that the instantaneous gesture has been stable.
            this.lastGesture = 0; // the last, stable gesture recorded.
            this.currentGesture = 0; // the instantaneous, unfiltered gesture detected.
            this.sample = { x: 0, y: 0, z: -1023 };
            this.shake = { x: false, y: false, z: false, count: 0, shaken: 0, timer: 0 }; // State information needed to detect shake events.
            this.isActive = false;
            this.sampleRange = 2;
            this.id = 4 /* MICROBIT_ID_ACCELEROMETER */;
        }
        Accelerometer.prototype.setSampleRange = function (range) {
            this.activate();
            this.sampleRange = Math.max(1, Math.min(8, range));
        };
        Accelerometer.prototype.activate = function () {
            if (!this.isActive) {
                this.isActive = true;
                this.runtime.queueDisplayUpdate();
            }
        };
        /**
         * Reads the acceleration data from the accelerometer, and stores it in our buffer.
         * This is called by the tick() member function, if the interrupt is set!
         */
        Accelerometer.prototype.update = function (x, y, z) {
            // read MSB values...
            this.sample.x = Math.floor(x);
            this.sample.y = Math.floor(y);
            this.sample.z = Math.floor(z);
            // Update gesture tracking
            this.updateGesture();
            // Indicate that a new sample is available
            pxsim.board().bus.queue(this.id, 1 /* MICROBIT_ACCELEROMETER_EVT_DATA_UPDATE */);
        };
        Accelerometer.prototype.instantaneousAccelerationSquared = function () {
            // Use pythagoras theorem to determine the combined force acting on the device.
            return this.sample.x * this.sample.x + this.sample.y * this.sample.y + this.sample.z * this.sample.z;
        };
        /**
         * Service function. Determines the best guess posture of the device based on instantaneous data.
         * This makes no use of historic data (except for shake), and forms this input to the filter implemented in updateGesture().
         *
         * @return A best guess of the current posture of the device, based on instantaneous data.
         */
        Accelerometer.prototype.instantaneousPosture = function () {
            var force = this.instantaneousAccelerationSquared();
            var shakeDetected = false;
            // Test for shake events.
            // We detect a shake by measuring zero crossings in each axis. In other words, if we see a strong acceleration to the left followed by
            // a string acceleration to the right, then we can infer a shake. Similarly, we can do this for each acxis (left/right, up/down, in/out).
            //
            // If we see enough zero crossings in succession (MICROBIT_ACCELEROMETER_SHAKE_COUNT_THRESHOLD), then we decide that the device
            // has been shaken.
            if ((this.getX() < -400 /* MICROBIT_ACCELEROMETER_SHAKE_TOLERANCE */ && this.shake.x) || (this.getX() > 400 /* MICROBIT_ACCELEROMETER_SHAKE_TOLERANCE */ && !this.shake.x)) {
                shakeDetected = true;
                this.shake.x = !this.shake.x;
            }
            if ((this.getY() < -400 /* MICROBIT_ACCELEROMETER_SHAKE_TOLERANCE */ && this.shake.y) || (this.getY() > 400 /* MICROBIT_ACCELEROMETER_SHAKE_TOLERANCE */ && !this.shake.y)) {
                shakeDetected = true;
                this.shake.y = !this.shake.y;
            }
            if ((this.getZ() < -400 /* MICROBIT_ACCELEROMETER_SHAKE_TOLERANCE */ && this.shake.z) || (this.getZ() > 400 /* MICROBIT_ACCELEROMETER_SHAKE_TOLERANCE */ && !this.shake.z)) {
                shakeDetected = true;
                this.shake.z = !this.shake.z;
            }
            if (shakeDetected && this.shake.count < 4 /* MICROBIT_ACCELEROMETER_SHAKE_COUNT_THRESHOLD */ && ++this.shake.count == 4 /* MICROBIT_ACCELEROMETER_SHAKE_COUNT_THRESHOLD */)
                this.shake.shaken = 1;
            if (++this.shake.timer >= 10 /* MICROBIT_ACCELEROMETER_SHAKE_DAMPING */) {
                this.shake.timer = 0;
                if (this.shake.count > 0) {
                    if (--this.shake.count == 0)
                        this.shake.shaken = 0;
                }
            }
            if (this.shake.shaken)
                return 11 /* MICROBIT_ACCELEROMETER_EVT_SHAKE */;
            var sq = function (n) { return n * n; };
            if (force < sq(400 /* MICROBIT_ACCELEROMETER_FREEFALL_TOLERANCE */))
                return 7 /* MICROBIT_ACCELEROMETER_EVT_FREEFALL */;
            if (force > sq(3072 /* MICROBIT_ACCELEROMETER_3G_TOLERANCE */))
                return 8 /* MICROBIT_ACCELEROMETER_EVT_3G */;
            if (force > sq(6144 /* MICROBIT_ACCELEROMETER_6G_TOLERANCE */))
                return 9 /* MICROBIT_ACCELEROMETER_EVT_6G */;
            if (force > sq(8192 /* MICROBIT_ACCELEROMETER_8G_TOLERANCE */))
                return 10 /* MICROBIT_ACCELEROMETER_EVT_8G */;
            // Determine our posture.
            if (this.getX() < (-1000 + 200 /* MICROBIT_ACCELEROMETER_TILT_TOLERANCE */))
                return 3 /* MICROBIT_ACCELEROMETER_EVT_TILT_LEFT */;
            if (this.getX() > (1000 - 200 /* MICROBIT_ACCELEROMETER_TILT_TOLERANCE */))
                return 4 /* MICROBIT_ACCELEROMETER_EVT_TILT_RIGHT */;
            if (this.getY() < (-1000 + 200 /* MICROBIT_ACCELEROMETER_TILT_TOLERANCE */))
                return 2 /* MICROBIT_ACCELEROMETER_EVT_TILT_DOWN */;
            if (this.getY() > (1000 - 200 /* MICROBIT_ACCELEROMETER_TILT_TOLERANCE */))
                return 1 /* MICROBIT_ACCELEROMETER_EVT_TILT_UP */;
            if (this.getZ() < (-1000 + 200 /* MICROBIT_ACCELEROMETER_TILT_TOLERANCE */))
                return 5 /* MICROBIT_ACCELEROMETER_EVT_FACE_UP */;
            if (this.getZ() > (1000 - 200 /* MICROBIT_ACCELEROMETER_TILT_TOLERANCE */))
                return 6 /* MICROBIT_ACCELEROMETER_EVT_FACE_DOWN */;
            return 0;
        };
        Accelerometer.prototype.updateGesture = function () {
            // Determine what it looks like we're doing based on the latest sample...
            var g = this.instantaneousPosture();
            // Perform some low pass filtering to reduce jitter from any detected effects
            if (g == this.currentGesture) {
                if (this.sigma < 5 /* MICROBIT_ACCELEROMETER_GESTURE_DAMPING */)
                    this.sigma++;
            }
            else {
                this.currentGesture = g;
                this.sigma = 0;
            }
            // If we've reached threshold, update our record and raise the relevant event...
            if (this.currentGesture != this.lastGesture && this.sigma >= 5 /* MICROBIT_ACCELEROMETER_GESTURE_DAMPING */) {
                this.lastGesture = this.currentGesture;
                pxsim.board().bus.queue(27 /* MICROBIT_ID_GESTURE */, this.lastGesture);
            }
        };
        /**
          * Reads the X axis value of the latest update from the accelerometer.
          * @param system The coordinate system to use. By default, a simple cartesian system is provided.
          * @return The force measured in the X axis, in milli-g.
          *
          * Example:
          * @code
          * uBit.accelerometer.getX();
          * uBit.accelerometer.getX(RAW);
          * @endcode
          */
        Accelerometer.prototype.getX = function (system) {
            if (system === void 0) { system = MicroBitCoordinateSystem.SIMPLE_CARTESIAN; }
            this.activate();
            switch (system) {
                case MicroBitCoordinateSystem.SIMPLE_CARTESIAN:
                    return -this.sample.x;
                case MicroBitCoordinateSystem.NORTH_EAST_DOWN:
                    return this.sample.y;
                //case MicroBitCoordinateSystem.SIMPLE_CARTESIAN.RAW:
                default:
                    return this.sample.x;
            }
        };
        /**
          * Reads the Y axis value of the latest update from the accelerometer.
          * @param system The coordinate system to use. By default, a simple cartesian system is provided.
          * @return The force measured in the Y axis, in milli-g.
          *
          * Example:
          * @code
          * uBit.accelerometer.getY();
          * uBit.accelerometer.getY(RAW);
          * @endcode
          */
        Accelerometer.prototype.getY = function (system) {
            if (system === void 0) { system = MicroBitCoordinateSystem.SIMPLE_CARTESIAN; }
            this.activate();
            switch (system) {
                case MicroBitCoordinateSystem.SIMPLE_CARTESIAN:
                    return -this.sample.y;
                case MicroBitCoordinateSystem.NORTH_EAST_DOWN:
                    return -this.sample.x;
                //case RAW:
                default:
                    return this.sample.y;
            }
        };
        /**
          * Reads the Z axis value of the latest update from the accelerometer.
          * @param system The coordinate system to use. By default, a simple cartesian system is provided.
          * @return The force measured in the Z axis, in milli-g.
          *
          * Example:
          * @code
          * uBit.accelerometer.getZ();
          * uBit.accelerometer.getZ(RAW);
          * @endcode
          */
        Accelerometer.prototype.getZ = function (system) {
            if (system === void 0) { system = MicroBitCoordinateSystem.SIMPLE_CARTESIAN; }
            this.activate();
            switch (system) {
                case MicroBitCoordinateSystem.NORTH_EAST_DOWN:
                    return -this.sample.z;
                //case MicroBitCoordinateSystem.SIMPLE_CARTESIAN:
                //case MicroBitCoordinateSystem.RAW:
                default:
                    return this.sample.z;
            }
        };
        /**
          * Provides a rotation compensated pitch of the device, based on the latest update from the accelerometer.
          * @return The pitch of the device, in degrees.
          *
          * Example:
          * @code
          * uBit.accelerometer.getPitch();
          * @endcode
          */
        Accelerometer.prototype.getPitch = function () {
            this.activate();
            return Math.floor((360 * this.getPitchRadians()) / (2 * Math.PI));
        };
        Accelerometer.prototype.getPitchRadians = function () {
            this.recalculatePitchRoll();
            return this.pitch;
        };
        /**
          * Provides a rotation compensated roll of the device, based on the latest update from the accelerometer.
          * @return The roll of the device, in degrees.
          *
          * Example:
          * @code
          * uBit.accelerometer.getRoll();
          * @endcode
          */
        Accelerometer.prototype.getRoll = function () {
            this.activate();
            return Math.floor((360 * this.getRollRadians()) / (2 * Math.PI));
        };
        Accelerometer.prototype.getRollRadians = function () {
            this.recalculatePitchRoll();
            return this.roll;
        };
        /**
         * Recalculate roll and pitch values for the current sample.
         * We only do this at most once per sample, as the necessary trigonemteric functions are rather
         * heavyweight for a CPU without a floating point unit...
         */
        Accelerometer.prototype.recalculatePitchRoll = function () {
            var x = this.getX(MicroBitCoordinateSystem.NORTH_EAST_DOWN);
            var y = this.getY(MicroBitCoordinateSystem.NORTH_EAST_DOWN);
            var z = this.getZ(MicroBitCoordinateSystem.NORTH_EAST_DOWN);
            this.roll = Math.atan2(y, z);
            this.pitch = Math.atan(-x / (y * Math.sin(this.roll) + z * Math.cos(this.roll)));
        };
        return Accelerometer;
    }());
    pxsim.Accelerometer = Accelerometer;
    var AccelerometerState = (function () {
        function AccelerometerState(runtime) {
            this.useShake = false;
            this.accelerometer = new Accelerometer(runtime);
        }
        return AccelerometerState;
    }());
    pxsim.AccelerometerState = AccelerometerState;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var input;
    (function (input) {
        function onButtonPressed(button, handler) {
            var b = pxsim.board().buttonPairState;
            if (button == b.props.ID_BUTTON_AB && !b.usesButtonAB) {
                b.usesButtonAB = true;
                pxsim.runtime.queueDisplayUpdate();
            }
            pxsim.pxtcore.registerWithDal(button, 3 /* MICROBIT_BUTTON_EVT_CLICK */, handler);
        }
        input.onButtonPressed = onButtonPressed;
        function buttonIsPressed(button) {
            var b = pxsim.board().buttonPairState;
            if (button == b.abBtn.id && !b.usesButtonAB) {
                b.usesButtonAB = true;
                pxsim.runtime.queueDisplayUpdate();
            }
            if (button == b.aBtn.id)
                return b.aBtn.pressed;
            if (button == b.bBtn.id)
                return b.bBtn.pressed;
            return b.abBtn.pressed || (b.aBtn.pressed && b.bBtn.pressed);
        }
        input.buttonIsPressed = buttonIsPressed;
    })(input = pxsim.input || (pxsim.input = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var input;
    (function (input) {
        function compassHeading() {
            var b = pxsim.board().compassState;
            if (!b.usesHeading) {
                b.usesHeading = true;
                pxsim.runtime.queueDisplayUpdate();
            }
            return b.heading;
        }
        input.compassHeading = compassHeading;
        function magneticForce() {
            // TODO
            return 0;
        }
        input.magneticForce = magneticForce;
    })(input = pxsim.input || (pxsim.input = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var input;
    (function (input) {
        function onPinPressed(pinId, handler) {
            var pin = pxsim.getPin(pinId);
            if (!pin)
                return;
            pin.isTouched();
            pxsim.runtime.queueDisplayUpdate();
            pxsim.pxtcore.registerWithDal(pin.id, 3 /* MICROBIT_BUTTON_EVT_CLICK */, handler);
        }
        input.onPinPressed = onPinPressed;
        function onPinReleased(pinId, handler) {
            var pin = pxsim.getPin(pinId);
            if (!pin)
                return;
            pin.isTouched();
            pxsim.runtime.queueDisplayUpdate();
            pxsim.pxtcore.registerWithDal(pin.id, 2 /* MICROBIT_BUTTON_EVT_UP */, handler);
        }
        input.onPinReleased = onPinReleased;
        function pinIsPressed(pinId) {
            var pin = pxsim.getPin(pinId);
            if (!pin)
                return false;
            return pin.isTouched();
        }
        input.pinIsPressed = pinIsPressed;
    })(input = pxsim.input || (pxsim.input = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    function getPin(id) {
        return pxsim.board().edgeConnectorState.getPin(id);
    }
    pxsim.getPin = getPin;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var pins;
    (function (pins_1) {
        function digitalReadPin(pinId) {
            var pin = pxsim.getPin(pinId);
            if (!pin)
                return;
            pin.mode = pxsim.PinFlags.Digital | pxsim.PinFlags.Input;
            return pin.value > 100 ? 1 : 0;
        }
        pins_1.digitalReadPin = digitalReadPin;
        function digitalWritePin(pinId, value) {
            var pin = pxsim.getPin(pinId);
            if (!pin)
                return;
            pin.mode = pxsim.PinFlags.Digital | pxsim.PinFlags.Output;
            pin.value = value > 0 ? 1023 : 0;
            pxsim.runtime.queueDisplayUpdate();
        }
        pins_1.digitalWritePin = digitalWritePin;
        function setPull(pinId, pull) {
            var pin = pxsim.getPin(pinId);
            if (!pin)
                return;
            pin.pull = pull;
        }
        pins_1.setPull = setPull;
        function analogReadPin(pinId) {
            var pin = pxsim.getPin(pinId);
            if (!pin)
                return;
            pin.mode = pxsim.PinFlags.Analog | pxsim.PinFlags.Input;
            return pin.value || 0;
        }
        pins_1.analogReadPin = analogReadPin;
        function analogWritePin(pinId, value) {
            var pin = pxsim.getPin(pinId);
            if (!pin)
                return;
            pin.mode = pxsim.PinFlags.Analog | pxsim.PinFlags.Output;
            pin.value = value ? 1 : 0;
            pxsim.runtime.queueDisplayUpdate();
        }
        pins_1.analogWritePin = analogWritePin;
        function analogSetPeriod(pinId, micros) {
            var pin = pxsim.getPin(pinId);
            if (!pin)
                return;
            pin.mode = pxsim.PinFlags.Analog | pxsim.PinFlags.Output;
            pin.period = micros;
            pxsim.runtime.queueDisplayUpdate();
        }
        pins_1.analogSetPeriod = analogSetPeriod;
        function servoWritePin(pinId, value) {
            var pin = pxsim.getPin(pinId);
            if (!pin)
                return;
            analogSetPeriod(pinId, 20000);
            pin.servoAngle = value;
        }
        pins_1.servoWritePin = servoWritePin;
        function servoSetPulse(pinId, micros) {
            var pin = pxsim.getPin(pinId);
            if (!pin)
                return;
            // TODO
        }
        pins_1.servoSetPulse = servoSetPulse;
        function analogSetPitchPin(pinId) {
            var pin = pxsim.getPin(pinId);
            if (!pin)
                return;
            pxsim.board().edgeConnectorState.pins.filter(function (p) { return !!p; }).forEach(function (p) { return p.pitch = false; });
            pin.pitch = true;
        }
        pins_1.analogSetPitchPin = analogSetPitchPin;
        function analogPitch(frequency, ms) {
            // update analog output
            var pins = pxsim.board().edgeConnectorState.pins;
            var pin = pins.filter(function (pin) { return !!pin && pin.pitch; })[0] || pins[0];
            pin.mode = pxsim.PinFlags.Analog | pxsim.PinFlags.Output;
            if (frequency <= 0) {
                pin.value = 0;
                pin.period = 0;
            }
            else {
                pin.value = 512;
                pin.period = 1000000 / frequency;
            }
            pxsim.runtime.queueDisplayUpdate();
            var cb = pxsim.getResume();
            pxsim.AudioContextManager.tone(frequency, 1);
            if (ms <= 0)
                cb();
            else {
                setTimeout(function () {
                    pxsim.AudioContextManager.stop();
                    pin.value = 0;
                    pin.period = 0;
                    pin.mode = pxsim.PinFlags.Unused;
                    pxsim.runtime.queueDisplayUpdate();
                    cb();
                }, ms);
            }
        }
        pins_1.analogPitch = analogPitch;
    })(pins = pxsim.pins || (pxsim.pins = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var files;
    (function (files) {
        function appendLine(filename, text) {
            var b = pxsim.board();
            b.fileSystem.append(filename, text + "\r\n");
        }
        files.appendLine = appendLine;
        function appendString(filename, text) {
            var b = pxsim.board();
            b.fileSystem.append(filename, text);
        }
        files.appendString = appendString;
        function appendNumber(filename, value) {
            var b = pxsim.board();
            b.fileSystem.append(filename, value.toString());
        }
        files.appendNumber = appendNumber;
        function remove(filename) {
            var b = pxsim.board();
            b.fileSystem.remove(filename);
        }
        files.remove = remove;
        function readToSerial(filename) {
            var b = pxsim.board();
            var f = b.fileSystem.files[filename];
            if (f)
                b.serialState.writeSerial(f);
        }
        files.readToSerial = readToSerial;
    })(files = pxsim.files || (pxsim.files = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    (function (DisplayMode) {
        DisplayMode[DisplayMode["bw"] = 0] = "bw";
        DisplayMode[DisplayMode["greyscale"] = 1] = "greyscale";
    })(pxsim.DisplayMode || (pxsim.DisplayMode = {}));
    var DisplayMode = pxsim.DisplayMode;
    var LedMatrixState = (function () {
        function LedMatrixState(runtime) {
            this.image = createInternalImage(5);
            this.brigthness = 255;
            this.displayMode = DisplayMode.bw;
            this.font = createFont();
            this.animationQ = new pxsim.AnimationQueue(runtime);
        }
        return LedMatrixState;
    }());
    pxsim.LedMatrixState = LedMatrixState;
    var Image = (function (_super) {
        __extends(Image, _super);
        function Image(width, data) {
            _super.call(this);
            this.width = width;
            this.data = data;
        }
        Image.prototype.print = function () {
            // console.debug(`Image id:${this.id} refs:${this.refcnt} size:${this.width}x${Image.height}`)
        };
        Image.prototype.get = function (x, y) {
            if (x < 0 || x >= this.width || y < 0 || y >= 5)
                return 0;
            return this.data[y * this.width + x];
        };
        Image.prototype.set = function (x, y, v) {
            if (x < 0 || x >= this.width || y < 0 || y >= 5)
                return;
            this.data[y * this.width + x] = Math.max(0, Math.min(255, v));
        };
        Image.prototype.copyTo = function (xSrcIndex, length, target, xTargetIndex) {
            for (var x = 0; x < length; x++) {
                for (var y = 0; y < 5; y++) {
                    var value = this.get(xSrcIndex + x, y);
                    target.set(xTargetIndex + x, y, value);
                }
            }
        };
        Image.prototype.shiftLeft = function (cols) {
            for (var x = 0; x < this.width; ++x)
                for (var y = 0; y < 5; ++y)
                    this.set(x, y, x < this.width - cols ? this.get(x + cols, y) : 0);
        };
        Image.prototype.shiftRight = function (cols) {
            for (var x = this.width - 1; x >= 0; --x)
                for (var y = 0; y < 5; ++y)
                    this.set(x, y, x >= cols ? this.get(x - cols, y) : 0);
        };
        Image.prototype.clear = function () {
            for (var i = 0; i < this.data.length; ++i)
                this.data[i] = 0;
        };
        Image.height = 5;
        return Image;
    }(pxsim.RefObject));
    pxsim.Image = Image;
    function createInternalImage(width) {
        var img = createImage(width);
        pxsim.noLeakTracking(img);
        return img;
    }
    pxsim.createInternalImage = createInternalImage;
    function createImage(width) {
        return new Image(width, new Array(width * 5));
    }
    pxsim.createImage = createImage;
    function createImageFromBuffer(data) {
        return new Image(data.length / 5, data);
    }
    pxsim.createImageFromBuffer = createImageFromBuffer;
    function createImageFromString(text) {
        var font = pxsim.board().ledMatrixState.font;
        var w = font.width;
        var sprite = createInternalImage(6 * text.length - 1);
        var k = 0;
        for (var i = 0; i < text.length; i++) {
            var charCode = text.charCodeAt(i);
            var charStart = (charCode - 32) * 5;
            if (charStart < 0 || charStart + 5 > w) {
                charCode = " ".charCodeAt(0);
                charStart = (charCode - 32) * 5;
            }
            font.copyTo(charStart, 5, sprite, k);
            k = k + 5;
            if (i < text.length - 1) {
                k = k + 1;
            }
        }
        return sprite;
    }
    pxsim.createImageFromString = createImageFromString;
    function createFont() {
        var data = [0x0, 0x0, 0x0, 0x0, 0x0, 0x8, 0x8, 0x8, 0x0, 0x8, 0xa, 0x4a, 0x40, 0x0, 0x0, 0xa, 0x5f, 0xea, 0x5f, 0xea, 0xe, 0xd9, 0x2e, 0xd3, 0x6e, 0x19, 0x32, 0x44, 0x89, 0x33, 0xc, 0x92, 0x4c, 0x92, 0x4d, 0x8, 0x8, 0x0, 0x0, 0x0, 0x4, 0x88, 0x8, 0x8, 0x4, 0x8, 0x4, 0x84, 0x84, 0x88, 0x0, 0xa, 0x44, 0x8a, 0x40, 0x0, 0x4, 0x8e, 0xc4, 0x80, 0x0, 0x0, 0x0, 0x4, 0x88, 0x0, 0x0, 0xe, 0xc0, 0x0, 0x0, 0x0, 0x0, 0x8, 0x0, 0x1, 0x22, 0x44, 0x88, 0x10, 0xc, 0x92, 0x52, 0x52, 0x4c, 0x4, 0x8c, 0x84, 0x84, 0x8e, 0x1c, 0x82, 0x4c, 0x90, 0x1e, 0x1e, 0xc2, 0x44, 0x92, 0x4c, 0x6, 0xca, 0x52, 0x5f, 0xe2, 0x1f, 0xf0, 0x1e, 0xc1, 0x3e, 0x2, 0x44, 0x8e, 0xd1, 0x2e, 0x1f, 0xe2, 0x44, 0x88, 0x10, 0xe, 0xd1, 0x2e, 0xd1, 0x2e, 0xe, 0xd1, 0x2e, 0xc4, 0x88, 0x0, 0x8, 0x0, 0x8, 0x0, 0x0, 0x4, 0x80, 0x4, 0x88, 0x2, 0x44, 0x88, 0x4, 0x82, 0x0, 0xe, 0xc0, 0xe, 0xc0, 0x8, 0x4, 0x82, 0x44, 0x88, 0xe, 0xd1, 0x26, 0xc0, 0x4, 0xe, 0xd1, 0x35, 0xb3, 0x6c, 0xc, 0x92, 0x5e, 0xd2, 0x52, 0x1c, 0x92, 0x5c, 0x92, 0x5c, 0xe, 0xd0, 0x10, 0x10, 0xe, 0x1c, 0x92, 0x52, 0x52, 0x5c, 0x1e, 0xd0, 0x1c, 0x90, 0x1e, 0x1e, 0xd0, 0x1c, 0x90, 0x10, 0xe, 0xd0, 0x13, 0x71, 0x2e, 0x12, 0x52, 0x5e, 0xd2, 0x52, 0x1c, 0x88, 0x8, 0x8, 0x1c, 0x1f, 0xe2, 0x42, 0x52, 0x4c, 0x12, 0x54, 0x98, 0x14, 0x92, 0x10, 0x10, 0x10, 0x10, 0x1e, 0x11, 0x3b, 0x75, 0xb1, 0x31, 0x11, 0x39, 0x35, 0xb3, 0x71, 0xc, 0x92, 0x52, 0x52, 0x4c, 0x1c, 0x92, 0x5c, 0x90, 0x10, 0xc, 0x92, 0x52, 0x4c, 0x86, 0x1c, 0x92, 0x5c, 0x92, 0x51, 0xe, 0xd0, 0xc, 0x82, 0x5c, 0x1f, 0xe4, 0x84, 0x84, 0x84, 0x12, 0x52, 0x52, 0x52, 0x4c, 0x11, 0x31, 0x31, 0x2a, 0x44, 0x11, 0x31, 0x35, 0xbb, 0x71, 0x12, 0x52, 0x4c, 0x92, 0x52, 0x11, 0x2a, 0x44, 0x84, 0x84, 0x1e, 0xc4, 0x88, 0x10, 0x1e, 0xe, 0xc8, 0x8, 0x8, 0xe, 0x10, 0x8, 0x4, 0x82, 0x41, 0xe, 0xc2, 0x42, 0x42, 0x4e, 0x4, 0x8a, 0x40, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x1f, 0x8, 0x4, 0x80, 0x0, 0x0, 0x0, 0xe, 0xd2, 0x52, 0x4f, 0x10, 0x10, 0x1c, 0x92, 0x5c, 0x0, 0xe, 0xd0, 0x10, 0xe, 0x2, 0x42, 0x4e, 0xd2, 0x4e, 0xc, 0x92, 0x5c, 0x90, 0xe, 0x6, 0xc8, 0x1c, 0x88, 0x8, 0xe, 0xd2, 0x4e, 0xc2, 0x4c, 0x10, 0x10, 0x1c, 0x92, 0x52, 0x8, 0x0, 0x8, 0x8, 0x8, 0x2, 0x40, 0x2, 0x42, 0x4c, 0x10, 0x14, 0x98, 0x14, 0x92, 0x8, 0x8, 0x8, 0x8, 0x6, 0x0, 0x1b, 0x75, 0xb1, 0x31, 0x0, 0x1c, 0x92, 0x52, 0x52, 0x0, 0xc, 0x92, 0x52, 0x4c, 0x0, 0x1c, 0x92, 0x5c, 0x90, 0x0, 0xe, 0xd2, 0x4e, 0xc2, 0x0, 0xe, 0xd0, 0x10, 0x10, 0x0, 0x6, 0xc8, 0x4, 0x98, 0x8, 0x8, 0xe, 0xc8, 0x7, 0x0, 0x12, 0x52, 0x52, 0x4f, 0x0, 0x11, 0x31, 0x2a, 0x44, 0x0, 0x11, 0x31, 0x35, 0xbb, 0x0, 0x12, 0x4c, 0x8c, 0x92, 0x0, 0x11, 0x2a, 0x44, 0x98, 0x0, 0x1e, 0xc4, 0x88, 0x1e, 0x6, 0xc4, 0x8c, 0x84, 0x86, 0x8, 0x8, 0x8, 0x8, 0x8, 0x18, 0x8, 0xc, 0x88, 0x18, 0x0, 0x0, 0xc, 0x83, 0x60];
        var nb = data.length;
        var n = nb / 5;
        var font = createInternalImage(nb);
        for (var c = 0; c < n; c++) {
            for (var row = 0; row < 5; row++) {
                var char = data[c * 5 + row];
                for (var col = 0; col < 5; col++) {
                    if ((char & (1 << col)) != 0)
                        font.set((c * 5 + 4) - col, row, 255);
                }
            }
        }
        return font;
    }
    pxsim.createFont = createFont;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var images;
    (function (images) {
        function createImage(img) {
            return img;
        }
        images.createImage = createImage;
        function createBigImage(img) {
            return img;
        }
        images.createBigImage = createBigImage;
    })(images = pxsim.images || (pxsim.images = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var ImageMethods;
    (function (ImageMethods) {
        function showImage(leds, offset, interval) {
            pxsim.pxtrt.nullCheck(leds);
            var cb = pxsim.getResume();
            var first = true;
            pxsim.board().ledMatrixState.animationQ.enqueue({
                interval: interval,
                frame: function () {
                    if (first) {
                        leds.copyTo(offset, 5, pxsim.board().ledMatrixState.image, 0);
                        first = false;
                        return true;
                    }
                    return false;
                },
                whenDone: cb
            });
        }
        ImageMethods.showImage = showImage;
        function plotImage(leds, offset) {
            pxsim.pxtrt.nullCheck(leds);
            pxsim.board().ledMatrixState.animationQ.enqueue({
                interval: 0,
                frame: function () {
                    leds.copyTo(offset, 5, pxsim.board().ledMatrixState.image, 0);
                    return false;
                }
            });
        }
        ImageMethods.plotImage = plotImage;
        function height(leds) {
            pxsim.pxtrt.nullCheck(leds);
            return pxsim.Image.height;
        }
        ImageMethods.height = height;
        function width(leds) {
            pxsim.pxtrt.nullCheck(leds);
            return leds.width;
        }
        ImageMethods.width = width;
        function plotFrame(leds, frame) {
            ImageMethods.plotImage(leds, frame * pxsim.Image.height);
        }
        ImageMethods.plotFrame = plotFrame;
        function showFrame(leds, frame, interval) {
            ImageMethods.showImage(leds, frame * pxsim.Image.height, interval);
        }
        ImageMethods.showFrame = showFrame;
        function pixel(leds, x, y) {
            pxsim.pxtrt.nullCheck(leds);
            return leds.get(x, y);
        }
        ImageMethods.pixel = pixel;
        function setPixel(leds, x, y, v) {
            pxsim.pxtrt.nullCheck(leds);
            leds.set(x, y, v);
        }
        ImageMethods.setPixel = setPixel;
        function clear(leds) {
            pxsim.pxtrt.nullCheck(leds);
            leds.clear();
        }
        ImageMethods.clear = clear;
        function setPixelBrightness(i, x, y, b) {
            pxsim.pxtrt.nullCheck(i);
            i.set(x, y, b);
        }
        ImageMethods.setPixelBrightness = setPixelBrightness;
        function pixelBrightness(i, x, y) {
            pxsim.pxtrt.nullCheck(i);
            return i.get(x, y);
        }
        ImageMethods.pixelBrightness = pixelBrightness;
        function scrollImage(leds, stride, interval) {
            pxsim.pxtrt.nullCheck(leds);
            if (stride == 0)
                stride = 1;
            var cb = pxsim.getResume();
            var off = stride > 0 ? 0 : leds.width - 1;
            var display = pxsim.board().ledMatrixState.image;
            pxsim.board().ledMatrixState.animationQ.enqueue({
                interval: interval,
                frame: function () {
                    if (off >= leds.width || off < 0)
                        return false;
                    if (stride > 0) {
                        display.shiftLeft(stride);
                        var c = Math.min(stride, leds.width - off);
                        leds.copyTo(off, c, display, 5 - stride);
                    }
                    else {
                        display.shiftRight(-stride);
                        var c = Math.min(-stride, leds.width - off);
                        leds.copyTo(off, c, display, 0);
                    }
                    off += stride;
                    return true;
                },
                whenDone: cb
            });
        }
        ImageMethods.scrollImage = scrollImage;
    })(ImageMethods = pxsim.ImageMethods || (pxsim.ImageMethods = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var basic;
    (function (basic) {
        function showNumber(x, interval) {
            if (interval <= 0)
                interval = 1;
            var leds = pxsim.createImageFromString(x.toString());
            if (x < 0 || x >= 10)
                pxsim.ImageMethods.scrollImage(leds, 1, interval);
            else
                showLeds(leds, interval * 5);
        }
        basic.showNumber = showNumber;
        function showString(s, interval) {
            if (interval <= 0)
                interval = 1;
            if (s.length == 0) {
                clearScreen();
                basic.pause(interval * 5);
            }
            else {
                if (s.length == 1)
                    showLeds(pxsim.createImageFromString(s), 0);
                else
                    pxsim.ImageMethods.scrollImage(pxsim.createImageFromString(s + " "), 1, interval);
            }
        }
        basic.showString = showString;
        function showLeds(leds, delay) {
            showAnimation(leds, delay);
        }
        basic.showLeds = showLeds;
        function clearScreen() {
            pxsim.board().ledMatrixState.image.clear();
            pxsim.runtime.queueDisplayUpdate();
        }
        basic.clearScreen = clearScreen;
        function showAnimation(leds, interval) {
            pxsim.ImageMethods.scrollImage(leds, 5, interval);
        }
        basic.showAnimation = showAnimation;
        function plotLeds(leds) {
            pxsim.ImageMethods.plotImage(leds, 0);
        }
        basic.plotLeds = plotLeds;
    })(basic = pxsim.basic || (pxsim.basic = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var led;
    (function (led) {
        function plot(x, y) {
            pxsim.board().ledMatrixState.image.set(x, y, 0xff);
            pxsim.runtime.queueDisplayUpdate();
        }
        led.plot = plot;
        function plotBrightness(x, y, brightness) {
            var state = pxsim.board().ledMatrixState;
            brightness = Math.max(0, Math.min(0xff, brightness));
            if (brightness != 0 && brightness != 0xff && state.displayMode != pxsim.DisplayMode.greyscale)
                state.displayMode = pxsim.DisplayMode.greyscale;
            state.image.set(x, y, brightness);
            pxsim.runtime.queueDisplayUpdate();
        }
        led.plotBrightness = plotBrightness;
        function unplot(x, y) {
            pxsim.board().ledMatrixState.image.set(x, y, 0);
            pxsim.runtime.queueDisplayUpdate();
        }
        led.unplot = unplot;
        function point(x, y) {
            return !!pxsim.board().ledMatrixState.image.get(x, y);
        }
        led.point = point;
        function brightness() {
            return pxsim.board().ledMatrixState.brigthness;
        }
        led.brightness = brightness;
        function setBrightness(value) {
            pxsim.board().ledMatrixState.brigthness = Math.max(0, Math.min(255, value));
            pxsim.runtime.queueDisplayUpdate();
        }
        led.setBrightness = setBrightness;
        function stopAnimation() {
            pxsim.board().ledMatrixState.animationQ.cancelAll();
            pxsim.board().ledMatrixState.image.clear();
        }
        led.stopAnimation = stopAnimation;
        function setDisplayMode(mode) {
            pxsim.board().ledMatrixState.displayMode = mode;
            pxsim.runtime.queueDisplayUpdate();
        }
        led.setDisplayMode = setDisplayMode;
        function displayMode() {
            return pxsim.board().ledMatrixState.displayMode;
        }
        led.displayMode = displayMode;
        function screenshot() {
            var img = pxsim.createImage(5);
            pxsim.board().ledMatrixState.image.copyTo(0, 5, img, 0);
            return img;
        }
        led.screenshot = screenshot;
        function enable(on) {
            pxsim.board().ledMatrixState.disabled = !on;
            pxsim.runtime.queueDisplayUpdate();
        }
        led.enable = enable;
    })(led = pxsim.led || (pxsim.led = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var input;
    (function (input) {
        function lightLevel() {
            var b = pxsim.board().lightSensorState;
            if (!b.usesLightLevel) {
                b.usesLightLevel = true;
                pxsim.runtime.queueDisplayUpdate();
            }
            return b.lightLevel;
        }
        input.lightLevel = lightLevel;
    })(input = pxsim.input || (pxsim.input = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    /**
     * Error codes used in the micro:bit runtime.
    */
    (function (PanicCode) {
        // PANIC Codes. These are not return codes, but are terminal conditions.
        // These induce a panic operation, where all code stops executing, and a panic state is
        // entered where the panic code is diplayed.
        // Out out memory error. Heap storage was requested, but is not available.
        PanicCode[PanicCode["MICROBIT_OOM"] = 20] = "MICROBIT_OOM";
        // Corruption detected in the micro:bit heap space
        PanicCode[PanicCode["MICROBIT_HEAP_ERROR"] = 30] = "MICROBIT_HEAP_ERROR";
        // Dereference of a NULL pointer through the ManagedType class,
        PanicCode[PanicCode["MICROBIT_NULL_DEREFERENCE"] = 40] = "MICROBIT_NULL_DEREFERENCE";
    })(pxsim.PanicCode || (pxsim.PanicCode = {}));
    var PanicCode = pxsim.PanicCode;
    ;
    function panic(code) {
        console.log("PANIC:", code);
        throw new Error("PANIC " + code);
    }
    pxsim.panic = panic;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var basic;
    (function (basic) {
        basic.pause = pxsim.thread.pause;
        basic.forever = pxsim.thread.forever;
    })(basic = pxsim.basic || (pxsim.basic = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var control;
    (function (control) {
        control.inBackground = pxsim.thread.runInBackground;
        function reset() {
            pxsim.U.userError("reset not implemented in simulator yet");
        }
        control.reset = reset;
        function waitMicros(micros) {
            // TODO
        }
        control.waitMicros = waitMicros;
        function deviceName() {
            var b = pxsim.board();
            return b && b.id
                ? b.id.slice(0, 4)
                : "abcd";
        }
        control.deviceName = deviceName;
        function deviceSerialNumber() {
            var b = pxsim.board();
            return parseInt(b && b.id
                ? b.id.slice(1)
                : "42");
        }
        control.deviceSerialNumber = deviceSerialNumber;
        function onEvent(id, evid, handler) {
            pxsim.pxtcore.registerWithDal(id, evid, handler);
        }
        control.onEvent = onEvent;
        function raiseEvent(id, evid, mode) {
            // TODO mode?
            pxsim.board().bus.queue(id, evid);
        }
        control.raiseEvent = raiseEvent;
        function eventTimestamp() {
            return pxsim.board().bus.getLastEventTime();
        }
        control.eventTimestamp = eventTimestamp;
        function eventValue() {
            return pxsim.board().bus.getLastEventValue();
        }
        control.eventValue = eventValue;
    })(control = pxsim.control || (pxsim.control = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var pxtcore;
    (function (pxtcore) {
        function registerWithDal(id, evid, handler) {
            pxsim.board().bus.listen(id, evid, handler);
        }
        pxtcore.registerWithDal = registerWithDal;
    })(pxtcore = pxsim.pxtcore || (pxsim.pxtcore = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var input;
    (function (input) {
        function runningTime() {
            return pxsim.runtime.runningTime();
        }
        input.runningTime = runningTime;
        function runningTimeMicros() {
            return pxsim.runtime.runningTimeUs();
        }
        input.runningTimeMicros = runningTimeMicros;
        function calibrateCompass() {
            // device calibrates...
        }
        input.calibrateCompass = calibrateCompass;
    })(input = pxsim.input || (pxsim.input = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var pins;
    (function (pins) {
        function onPulsed(name, pulse, body) {
        }
        pins.onPulsed = onPulsed;
        function pulseDuration() {
            return 0;
        }
        pins.pulseDuration = pulseDuration;
        function createBuffer(sz) {
            return pxsim.BufferMethods.createBuffer(sz);
        }
        pins.createBuffer = createBuffer;
        function pulseIn(name, value, maxDuration) {
            var pin = pxsim.getPin(name);
            if (!pin)
                return 0;
            return 5000;
        }
        pins.pulseIn = pulseIn;
        function spiWrite(value) {
            // TODO
            return 0;
        }
        pins.spiWrite = spiWrite;
        function spiFrequency(f) {
            // TODO
        }
        pins.spiFrequency = spiFrequency;
        function spiFormat(bits, mode) {
            // TODO
        }
        pins.spiFormat = spiFormat;
        function spiPins(mosi, miso, sck) {
            // TODO
        }
        pins.spiPins = spiPins;
        function i2cReadBuffer(address, size, repeat) {
            // fake reading zeros
            return createBuffer(size);
        }
        pins.i2cReadBuffer = i2cReadBuffer;
        function i2cWriteBuffer(address, buf, repeat) {
            // fake - noop
        }
        pins.i2cWriteBuffer = i2cWriteBuffer;
        // this likely shouldn't be called
        function getPinAddress(name) {
            return pxsim.getPin(name);
        }
        pins.getPinAddress = getPinAddress;
        function setEvents(name, event) {
        }
        pins.setEvents = setEvents;
    })(pins = pxsim.pins || (pxsim.pins = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var devices;
    (function (devices) {
        function tellCameraTo(action) {
            // TODO
        }
        devices.tellCameraTo = tellCameraTo;
        function tellRemoteControlTo(action) {
            // TODO
        }
        devices.tellRemoteControlTo = tellRemoteControlTo;
        function raiseAlertTo(action) {
            // TODO
        }
        devices.raiseAlertTo = raiseAlertTo;
        function onSignalStrengthChanged(action) {
            // TODO
        }
        devices.onSignalStrengthChanged = onSignalStrengthChanged;
        function signalStrength() {
            // TODO
            return 0;
        }
        devices.signalStrength = signalStrength;
        function onGamepadButton(button, body) {
            // TODO
        }
        devices.onGamepadButton = onGamepadButton;
    })(devices = pxsim.devices || (pxsim.devices = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var bluetooth;
    (function (bluetooth) {
        function startIOPinService() {
            // TODO
        }
        bluetooth.startIOPinService = startIOPinService;
        function startLEDService() {
            // TODO
        }
        bluetooth.startLEDService = startLEDService;
        function startTemperatureService() {
            // TODO
        }
        bluetooth.startTemperatureService = startTemperatureService;
        function startMagnetometerService() {
            // TODO
        }
        bluetooth.startMagnetometerService = startMagnetometerService;
        function startAccelerometerService() {
            // TODO
        }
        bluetooth.startAccelerometerService = startAccelerometerService;
        function startButtonService() {
            // TODO
        }
        bluetooth.startButtonService = startButtonService;
        function startUartService() {
            // TODO
        }
        bluetooth.startUartService = startUartService;
        function uartWriteString(s) {
            pxsim.serial.writeString(s);
        }
        bluetooth.uartWriteString = uartWriteString;
        function uartReadUntil(del) {
            return pxsim.serial.readUntil(del);
        }
        bluetooth.uartReadUntil = uartReadUntil;
        function onUartDataReceived(delimiters, handler) {
            var b = pxsim.board();
            b.bus.listen(1200 /* MICROBIT_ID_BLE_UART */, 1 /* MICROBIT_UART_S_EVT_DELIM_MATCH */, handler);
        }
        bluetooth.onUartDataReceived = onUartDataReceived;
        function onBluetoothConnected(a) {
            // TODO
        }
        bluetooth.onBluetoothConnected = onBluetoothConnected;
        function onBluetoothDisconnected(a) {
            // TODO
        }
        bluetooth.onBluetoothDisconnected = onBluetoothDisconnected;
        function advertiseUrl(url, power, connectable) { }
        bluetooth.advertiseUrl = advertiseUrl;
        function advertiseUidBuffer(nsAndInstance, power, connectable) { }
        bluetooth.advertiseUidBuffer = advertiseUidBuffer;
        function stopAdvertising() { }
        bluetooth.stopAdvertising = stopAdvertising;
        function setTransmitPower(power) { }
        bluetooth.setTransmitPower = setTransmitPower;
    })(bluetooth = pxsim.bluetooth || (pxsim.bluetooth = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    function sendBufferAsm(buffer, pin) {
        var b = pxsim.board();
        if (b) {
            var np = b.neopixelState;
            if (np) {
                var buf = buffer.data;
                np.updateBuffer(buf, pin); // TODO this is wrong
                pxsim.runtime.queueDisplayUpdate();
            }
        }
    }
    pxsim.sendBufferAsm = sendBufferAsm;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var RadioDatagram = (function () {
        function RadioDatagram(runtime) {
            this.runtime = runtime;
            this.datagram = [];
            this.lastReceived = RadioDatagram.defaultPacket();
        }
        RadioDatagram.prototype.queue = function (packet) {
            if (this.datagram.length < 4) {
                this.datagram.push(packet);
            }
            pxsim.runtime.board.bus.queue(29 /* MICROBIT_ID_RADIO */, 1 /* MICROBIT_RADIO_EVT_DATAGRAM */);
        };
        RadioDatagram.prototype.send = function (payload) {
            var b = pxsim.board();
            pxsim.Runtime.postMessage({
                type: "radiopacket",
                rssi: 70,
                serial: b.radioState.bus.transmitSerialNumber ? pxsim.control.deviceSerialNumber() : 0,
                time: new Date().getTime(),
                payload: payload
            });
        };
        RadioDatagram.prototype.recv = function () {
            var r = this.datagram.shift();
            if (!r)
                r = RadioDatagram.defaultPacket();
            return this.lastReceived = r;
        };
        RadioDatagram.defaultPacket = function () {
            return {
                rssi: -1,
                serial: 0,
                time: 0,
                payload: { type: -1, groupId: 0 }
            };
        };
        return RadioDatagram;
    }());
    pxsim.RadioDatagram = RadioDatagram;
    var RadioBus = (function () {
        function RadioBus(runtime) {
            this.runtime = runtime;
            // uint8_t radioDefaultGroup = MICROBIT_RADIO_DEFAULT_GROUP;
            this.power = 0;
            this.transmitSerialNumber = false;
            this.datagram = new RadioDatagram(runtime);
        }
        RadioBus.prototype.setTransmitPower = function (power) {
            this.power = Math.max(0, Math.min(7, power));
        };
        RadioBus.prototype.setTransmitSerialNumber = function (sn) {
            this.transmitSerialNumber = !!sn;
        };
        RadioBus.prototype.broadcast = function (msg, groupId) {
            pxsim.Runtime.postMessage({
                type: "eventbus",
                id: 2000 /* MES_BROADCAST_GENERAL_ID */,
                eventid: msg,
                power: this.power,
                group: groupId
            });
        };
        return RadioBus;
    }());
    pxsim.RadioBus = RadioBus;
    var RadioState = (function () {
        function RadioState(runtime) {
            this.bus = new RadioBus(runtime);
            this.groupId = 0;
        }
        RadioState.prototype.setGroup = function (id) {
            this.groupId = id & 0xff; // byte only
        };
        RadioState.prototype.broadcast = function (msg) {
            this.bus.broadcast(msg, this.groupId);
        };
        RadioState.prototype.receivePacket = function (packet) {
            if (this.groupId == packet.payload.groupId)
                this.bus.datagram.queue(packet);
        };
        return RadioState;
    }());
    pxsim.RadioState = RadioState;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var radio;
    (function (radio) {
        var PacketPayloadType;
        (function (PacketPayloadType) {
            PacketPayloadType[PacketPayloadType["NUMBER"] = 0] = "NUMBER";
            PacketPayloadType[PacketPayloadType["VALUE"] = 1] = "VALUE";
            PacketPayloadType[PacketPayloadType["STRING"] = 2] = "STRING";
        })(PacketPayloadType || (PacketPayloadType = {}));
        function broadcastMessage(msg) {
            pxsim.board().radioState.broadcast(msg);
        }
        radio.broadcastMessage = broadcastMessage;
        function onBroadcastMessageReceived(msg, handler) {
            pxsim.pxtcore.registerWithDal(2000 /* MES_BROADCAST_GENERAL_ID */, msg, handler);
        }
        radio.onBroadcastMessageReceived = onBroadcastMessageReceived;
        function setGroup(id) {
            pxsim.board().radioState.setGroup(id);
        }
        radio.setGroup = setGroup;
        function setTransmitPower(power) {
            pxsim.board().radioState.bus.setTransmitPower(power);
        }
        radio.setTransmitPower = setTransmitPower;
        function setTransmitSerialNumber(transmit) {
            pxsim.board().radioState.bus.setTransmitSerialNumber(transmit);
        }
        radio.setTransmitSerialNumber = setTransmitSerialNumber;
        function sendNumber(value) {
            pxsim.board().radioState.bus.datagram.send({
                type: PacketPayloadType.NUMBER,
                groupId: pxsim.board().radioState.groupId,
                numberData: value,
            });
        }
        radio.sendNumber = sendNumber;
        function sendString(msg) {
            msg = msg.substr(0, 19);
            pxsim.board().radioState.bus.datagram.send({
                type: PacketPayloadType.STRING,
                groupId: pxsim.board().radioState.groupId,
                stringData: msg,
            });
        }
        radio.sendString = sendString;
        function writeValueToSerial() {
            var b = pxsim.board();
            writePacketToSerial(b, b.radioState.bus.datagram.recv());
        }
        radio.writeValueToSerial = writeValueToSerial;
        function writeReceivedPacketToSerial() {
            var b = pxsim.board();
            writePacketToSerial(b, b.radioState.bus.datagram.lastReceived);
        }
        radio.writeReceivedPacketToSerial = writeReceivedPacketToSerial;
        function sendValue(name, value) {
            name = name.substr(0, 12);
            var msg = [];
            msg.push();
            pxsim.board().radioState.bus.datagram.send({
                type: PacketPayloadType.VALUE,
                groupId: pxsim.board().radioState.groupId,
                stringData: name,
                numberData: value
            });
        }
        radio.sendValue = sendValue;
        function receiveNumber() {
            var packet = pxsim.board().radioState.bus.datagram.recv();
            return receivedNumber();
        }
        radio.receiveNumber = receiveNumber;
        function receiveString() {
            var packet = pxsim.board().radioState.bus.datagram.recv();
            return receivedString();
        }
        radio.receiveString = receiveString;
        function receivedSignalStrength() {
            return pxsim.board().radioState.bus.datagram.lastReceived.rssi;
        }
        radio.receivedSignalStrength = receivedSignalStrength;
        function onDataReceived(handler) {
            pxsim.pxtcore.registerWithDal(29 /* MICROBIT_ID_RADIO */, 1 /* MICROBIT_RADIO_EVT_DATAGRAM */, handler);
            radio.receiveNumber();
        }
        radio.onDataReceived = onDataReceived;
        function receivedNumber() {
            return pxsim.board().radioState.bus.datagram.lastReceived.payload.numberData || 0;
        }
        radio.receivedNumber = receivedNumber;
        function receivedSerial() {
            return pxsim.board().radioState.bus.datagram.lastReceived.serial;
        }
        radio.receivedSerial = receivedSerial;
        function receivedString() {
            return pxsim.initString(pxsim.board().radioState.bus.datagram.lastReceived.payload.stringData || "");
        }
        radio.receivedString = receivedString;
        function receivedTime() {
            return pxsim.board().radioState.bus.datagram.lastReceived.time;
        }
        radio.receivedTime = receivedTime;
        function writePacketToSerial(b, p) {
            switch (p.payload.type) {
                case PacketPayloadType.NUMBER:
                    b.writeSerial("{\"t\":" + p.time + ",\"s\":" + p.serial + ",\"v\":" + p.payload.numberData + "}\r\n");
                    break;
                case PacketPayloadType.VALUE:
                    b.writeSerial("{\"t\":" + p.time + ",\"s\":" + p.serial + ",\"n\":\"" + p.payload.stringData + "\",\"v\":" + p.payload.numberData + "}\r\n");
                    break;
                case PacketPayloadType.STRING:
                    b.writeSerial("{\"t\":" + p.time + ",\"s\":" + p.serial + ",\"n\":\"" + p.payload.stringData + "\"}\r\n");
                    break;
                default:
            }
        }
    })(radio = pxsim.radio || (pxsim.radio = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var SERIAL_BUFFER_LENGTH = 16;
    var SerialState = (function () {
        function SerialState() {
            this.serialIn = [];
            this.serialOutBuffer = "";
        }
        SerialState.prototype.receiveData = function (data) {
            this.serialIn.push();
        };
        SerialState.prototype.readSerial = function () {
            var v = this.serialIn.shift() || "";
            return v;
        };
        SerialState.prototype.writeSerial = function (s) {
            this.serialOutBuffer += s;
            if (/\n/.test(this.serialOutBuffer) || this.serialOutBuffer.length > SERIAL_BUFFER_LENGTH) {
                pxsim.Runtime.postMessage({
                    type: 'serial',
                    data: this.serialOutBuffer,
                    id: pxsim.runtime.id,
                    sim: true
                });
                this.serialOutBuffer = '';
            }
        };
        return SerialState;
    }());
    pxsim.SerialState = SerialState;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var serial;
    (function (serial) {
        function writeString(s) {
            pxsim.board().writeSerial(s);
        }
        serial.writeString = writeString;
        function readUntil(del) {
            return readString();
        }
        serial.readUntil = readUntil;
        function readString() {
            return pxsim.board().serialState.readSerial();
        }
        serial.readString = readString;
        function onDataReceived(delimiters, handler) {
            var b = pxsim.board();
            b.bus.listen(32 /* MICROBIT_ID_SERIAL */, 1 /* MICROBIT_SERIAL_EVT_DELIM_MATCH */, handler);
        }
        serial.onDataReceived = onDataReceived;
        function redirect(tx, rx, rate) {
            // TODO?
        }
        serial.redirect = redirect;
    })(serial = pxsim.serial || (pxsim.serial = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var ThermometerState = (function () {
        function ThermometerState() {
            this.usesTemperature = false;
            this.temperature = 21;
        }
        return ThermometerState;
    }());
    pxsim.ThermometerState = ThermometerState;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var input;
    (function (input) {
        function temperature() {
            var b = pxsim.board();
            if (!b.thermometerState.usesTemperature) {
                b.thermometerState.usesTemperature = true;
                pxsim.runtime.queueDisplayUpdate();
            }
            return b.thermometerState.temperature;
        }
        input.temperature = temperature;
    })(input = pxsim.input || (pxsim.input = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var visuals;
    (function (visuals) {
        visuals.mkBoardView = function (opts) {
            return new visuals.MicrobitBoardSvg({
                runtime: pxsim.runtime,
                theme: visuals.randomTheme(opts.highContrast),
                disableTilt: false,
                wireframe: opts.wireframe
            });
        };
    })(visuals = pxsim.visuals || (pxsim.visuals = {}));
})(pxsim || (pxsim = {}));
/// <reference path="../../node_modules/pxt-core/typings/globals/bluebird/index.d.ts"/>
/// <reference path="../../node_modules/pxt-core/built/pxtsim.d.ts"/>
var pxsim;
(function (pxsim) {
    var visuals;
    (function (visuals) {
        function mkLedMatrixSvg(xy, rows, cols) {
            var result = { el: null, y: 0, x: 0, w: 0, h: 0, leds: [], ledsOuter: [], background: null };
            result.el = pxsim.svg.elt("g");
            var width = cols * visuals.PIN_DIST;
            var height = rows * visuals.PIN_DIST;
            var ledRad = Math.round(visuals.PIN_DIST * .35);
            var spacing = visuals.PIN_DIST;
            var padding = (spacing - 2 * ledRad) / 2.0;
            var x = xy[0], y = xy[1];
            var left = x - (ledRad + padding);
            var top = y - (ledRad + padding);
            result.x = left;
            result.y = top;
            result.w = width;
            result.h = height;
            result.background = pxsim.svg.child(result.el, "rect", { class: "sim-display", x: left, y: top, width: width, height: height });
            // ledsOuter
            result.leds = [];
            result.ledsOuter = [];
            var hoverRad = ledRad * 1.2;
            for (var i = 0; i < rows; ++i) {
                var y_1 = top + ledRad + i * spacing + padding;
                for (var j = 0; j < cols; ++j) {
                    var x_1 = left + ledRad + j * spacing + padding;
                    result.ledsOuter.push(pxsim.svg.child(result.el, "circle", { class: "sim-led-back", cx: x_1, cy: y_1, r: ledRad }));
                    result.leds.push(pxsim.svg.child(result.el, "circle", { class: "sim-led", cx: x_1, cy: y_1, r: hoverRad, title: "(" + j + "," + i + ")" }));
                }
            }
            //default theme
            pxsim.svg.fill(result.background, visuals.defaultLedMatrixTheme.background);
            pxsim.svg.fills(result.leds, visuals.defaultLedMatrixTheme.ledOn);
            pxsim.svg.fills(result.ledsOuter, visuals.defaultLedMatrixTheme.ledOff);
            //turn off LEDs
            result.leds.forEach(function (l) { return l.style.opacity = 0 + ""; });
            return result;
        }
        visuals.mkLedMatrixSvg = mkLedMatrixSvg;
        visuals.defaultLedMatrixTheme = {
            background: "#000",
            ledOn: "#ff5f5f",
            ledOff: "#DDD",
        };
        visuals.LED_MATRIX_STYLE = "\n            .sim-led-back:hover {\n                stroke:#a0a0a0;\n                stroke-width:3px;\n            }\n            .sim-led:hover {\n                stroke:#ff7f7f;\n                stroke-width:3px;\n            }\n            ";
        var LedMatrixView = (function () {
            function LedMatrixView() {
                this.DRAW_SIZE = 8;
                this.ACTIVE_SIZE = 5;
                this.style = visuals.LED_MATRIX_STYLE;
            }
            LedMatrixView.prototype.init = function (bus, state) {
                this.bus = bus;
                this.state = state;
                this.theme = visuals.defaultLedMatrixTheme;
                this.defs = [];
                this.element = this.buildDom();
            };
            LedMatrixView.prototype.moveToCoord = function (xy) {
                visuals.translateEl(this.element, xy);
            };
            LedMatrixView.prototype.updateTheme = function () {
                pxsim.svg.fill(this.background, this.theme.background);
                pxsim.svg.fills(this.leds, this.theme.ledOn);
                pxsim.svg.fills(this.ledsOuter, this.theme.ledOff);
            };
            LedMatrixView.prototype.updateState = function () {
                var _this = this;
                if (this.state.disabled) {
                    this.leds.forEach(function (led, i) {
                        var sel = led;
                        sel.style.opacity = 0 + "";
                    });
                    return;
                }
                var bw = this.state.displayMode == pxsim.DisplayMode.bw;
                var img = this.state.image;
                this.leds.forEach(function (led, i) {
                    var sel = led;
                    var dx = i % _this.DRAW_SIZE;
                    var dy = (i - dx) / _this.DRAW_SIZE;
                    if (dx < _this.ACTIVE_SIZE && dy < _this.ACTIVE_SIZE) {
                        var j = dx + dy * _this.ACTIVE_SIZE;
                        sel.style.opacity = ((bw ? img.data[j] > 0 ? 255 : 0 : img.data[j]) / 255.0) + "";
                    }
                    else {
                        sel.style.opacity = 0 + "";
                    }
                });
            };
            LedMatrixView.prototype.buildDom = function () {
                var res = mkLedMatrixSvg([0, 0], this.DRAW_SIZE, this.DRAW_SIZE);
                var display = res.el;
                this.background = res.background;
                this.leds = res.leds;
                this.ledsOuter = res.ledsOuter;
                return display;
            };
            return LedMatrixView;
        }());
        visuals.LedMatrixView = LedMatrixView;
    })(visuals = pxsim.visuals || (pxsim.visuals = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var visuals;
    (function (visuals) {
        var MB_STYLE = "\n        svg.sim {\n            box-sizing: border-box;\n            width: 100%;\n            height: 100%;\n            display: block;\n        }\n        svg.sim.grayscale {\n            -moz-filter: grayscale(1);\n            -webkit-filter: grayscale(1);\n            filter: grayscale(1);\n        }\n        .sim-button {\n            pointer-events: none;\n        }\n\n        .sim-button-outer:hover {\n            stroke:grey;\n            stroke-width: 3px;\n        }\n        .sim-button-nut {\n            fill:#704A4A;\n            pointer-events:none;\n        }\n        .sim-button-nut:hover {\n            stroke:1px solid #704A4A;\n        }\n        .sim-pin:hover {\n            stroke:#D4AF37;\n            stroke-width:2px;\n        }\n\n        .sim-pin-touch.touched:hover {\n            stroke:darkorange;\n        }\n\n        .sim-led-back:hover {\n            stroke:#a0a0a0;\n            stroke-width:3px;\n        }\n        .sim-led:hover {\n            stroke:#ff7f7f;\n            stroke-width:3px;\n        }\n\n        .sim-systemled {\n            fill:#333;\n            stroke:#555;\n            stroke-width: 1px;\n        }\n\n        .sim-light-level-button {\n            stroke:#fff;\n            stroke-width: 3px;\n        }\n\n        .sim-antenna {\n            stroke:#555;\n            stroke-width: 2px;\n        }\n\n        .sim-text {\n        font-family:\"Lucida Console\", Monaco, monospace;\n        font-size:25px;\n        fill:#fff;\n        pointer-events: none;\n        }\n\n        .sim-text-pin {\n        font-family:\"Lucida Console\", Monaco, monospace;\n        font-size:20px;\n        fill:#fff;\n        pointer-events: none;\n        }\n\n        .sim-thermometer {\n            stroke:#aaa;\n            stroke-width: 3px;\n        }\n\n        /* animations */\n        .sim-theme-glow {\n            animation-name: sim-theme-glow-animation;\n            animation-timing-function: ease-in-out;\n            animation-direction: alternate;\n            animation-iteration-count: infinite;\n            animation-duration: 1.25s;\n        }\n        @keyframes sim-theme-glow-animation {\n            from { opacity: 1; }\n            to   { opacity: 0.75; }\n        }\n\n        .sim-flash {\n            animation-name: sim-flash-animation;\n            animation-duration: 0.1s;\n        }\n\n        @keyframes sim-flash-animation {\n            from { fill: yellow; }\n            to   { fill: default; }\n        }\n\n        .sim-flash-stroke {\n            animation-name: sim-flash-stroke-animation;\n            animation-duration: 0.4s;\n            animation-timing-function: ease-in;\n        }\n\n        @keyframes sim-flash-stroke-animation {\n            from { stroke: yellow; }\n            to   { stroke: default; }\n        }\n\n        /* wireframe */\n        .sim-wireframe * {\n            fill: none;\n            stroke: black;\n        }\n        .sim-wireframe .sim-display,\n        .sim-wireframe .sim-led,\n        .sim-wireframe .sim-led-back,\n        .sim-wireframe .sim-head,\n        .sim-wireframe .sim-theme,\n        .sim-wireframe .sim-button-group,\n        .sim-wireframe .sim-button-label,\n        .sim-wireframe .sim-button,\n        .sim-wireframe .sim-text-pin\n        {\n            visibility: hidden;\n        }\n        .sim-wireframe .sim-label\n        {\n            stroke: none;\n            fill: #777;\n        }\n        .sim-wireframe .sim-board {\n            stroke-width: 2px;\n        }\n        *:focus {\n            outline: none;\n        }\n        *:focus .sim-button-outer,\n        .sim-pin:focus,\n        .sim-thermometer:focus,\n        .sim-shake:focus,\n        .sim-light-level-button:focus {\n            stroke: #4D90FE;\n            stroke-width: 5px !important;\n        }\n        .no-drag, .sim-text, .sim-text-pin {\n            user-drag: none;\n            user-select: none;\n            -moz-user-select: none;\n            -webkit-user-drag: none;\n            -webkit-user-select: none;\n            -ms-user-select: none;\n        }\n    ";
        var MB_HIGHCONTRAST = "\n.sim-led {\n    stroke: red;\n}\n*:focus .sim-button-outer,\n.sim-pin:focus,\n.sim-thermometer:focus,\n.sim-shake:focus,\n.sim-light-level-button:focus {\n    stroke: #10C8CD !important;\n}\n    ";
        var pins4onXs = [66.7, 79.1, 91.4, 103.7, 164.3, 176.6, 188.9, 201.3, 213.6, 275.2, 287.5, 299.8, 312.1, 324.5, 385.1, 397.4, 409.7, 422];
        var pins4onMids = pins4onXs.map(function (x) { return x + 5; });
        var littlePinDist = pins4onMids[1] - pins4onMids[0];
        var bigPinWidth = pins4onMids[4] - pins4onMids[3];
        var pin0mid = pins4onXs[0] - bigPinWidth / 2.0;
        var pin3mid = pin0mid - bigPinWidth / 2.0;
        var pin1mid = pins4onMids[3] + bigPinWidth / 2.0;
        var pin2mid = pins4onMids[8] + bigPinWidth / 2.0;
        var pin3Vmid = pins4onMids[13] + bigPinWidth / 2.0;
        var pinGNDmid = pins4onMids[pins4onMids.length - 1] + bigPinWidth / 2.0;
        var pinGND2mid = pinGNDmid + bigPinWidth / 2.0;
        var pinMids = [pin0mid, pin1mid, pin2mid, pin3mid].concat(pins4onMids).concat([pinGNDmid, pin3Vmid, pinGND2mid]);
        var pinNames = [
            "P0", "P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10",
            "P11", "P12", "P13", "P14", "P15", "P16", "P17", "P18", "P19", "P20",
            "GND0", "GND", "+3v3", "GND1"];
        var pinTitles = [
            "P0, ANALOG IN",
            "P1, ANALOG IN",
            "P2, ANALOG IN",
            "P3, ANALOG IN, LED Col 1",
            "P4, ANALOG IN, LED Col 2",
            "P5, BUTTON A",
            "P6, LED Col 9",
            "P7, LED Col 8",
            "P8",
            "P9, LED Col 7",
            "P10, ANALOG IN, LED Col 3",
            "P11, BUTTON B",
            "P12, RESERVED ACCESSIBILITY",
            "P13, SPI - SCK",
            "P14, SPI - MISO",
            "P15, SPI - MOSI",
            "P16, SPI - Chip Select",
            "P17, +3v3",
            "P18, +3v3",
            "P19, I2C - SCL",
            "P20, I2C - SDA",
            "GND", "GND", "+3v3", "GND"
        ];
        var MB_WIDTH = 500;
        var MB_HEIGHT = 408;
        visuals.themes = ["#3ADCFE", "#FFD43A", "#3AFFB3", "#FF3A54"].map(function (accent) {
            return {
                accent: accent,
                display: "#000",
                pin: "#D4AF37",
                pinTouched: "#FFA500",
                pinActive: "#FF5500",
                ledOn: "#ff7f7f",
                ledOff: "#202020",
                buttonOuter: "#979797",
                buttonUp: "#000",
                buttonDown: "#FFA500",
                virtualButtonOuter: "#333",
                virtualButtonUp: "#fff",
                lightLevelOn: "yellow",
                lightLevelOff: "#555"
            };
        });
        function randomTheme(highContrast) {
            var theme = visuals.themes[Math.floor(Math.random() * visuals.themes.length)];
            if (highContrast) {
                theme = JSON.parse(JSON.stringify(theme));
                theme.highContrast = true;
                theme.ledOff = "#888";
                theme.ledOn = "#0000bb";
                theme.display = "#ffffff";
                theme.pin = "#D4AF37";
                theme.accent = "#273EE2";
            }
            return theme;
        }
        visuals.randomTheme = randomTheme;
        var MicrobitBoardSvg = (function () {
            function MicrobitBoardSvg(props) {
                var _this = this;
                this.props = props;
                this.headInitialized = false;
                this.pinNmToCoord = {};
                this.lastFlashTime = 0;
                this.lastAntennaFlash = 0;
                this.recordPinCoords();
                this.buildDom();
                if (props && props.wireframe)
                    pxsim.svg.addClass(this.element, "sim-wireframe");
                if (props && props.theme)
                    this.updateTheme();
                if (props && props.runtime) {
                    this.board = this.props.runtime.board;
                    this.board.updateSubscribers.push(function () { return _this.updateState(); });
                    this.updateState();
                    this.attachEvents();
                }
            }
            MicrobitBoardSvg.prototype.getView = function () {
                return {
                    el: this.element,
                    y: 0,
                    x: 0,
                    w: MB_WIDTH,
                    h: MB_HEIGHT
                };
            };
            MicrobitBoardSvg.prototype.getCoord = function (pinNm) {
                return this.pinNmToCoord[pinNm];
            };
            MicrobitBoardSvg.prototype.highlightPin = function (pinNm) {
                //TODO: for instructions
            };
            MicrobitBoardSvg.prototype.getPinDist = function () {
                return littlePinDist * 1.7;
            };
            MicrobitBoardSvg.prototype.recordPinCoords = function () {
                var _this = this;
                var pinsY = 356.7 + 40;
                pinNames.forEach(function (nm, i) {
                    var x = pinMids[i];
                    _this.pinNmToCoord[nm] = [x, pinsY];
                });
            };
            MicrobitBoardSvg.prototype.updateTheme = function () {
                var theme = this.props.theme;
                pxsim.svg.fill(this.display, theme.display);
                pxsim.svg.fills(this.leds, theme.ledOn);
                pxsim.svg.fills(this.ledsOuter, theme.ledOff);
                pxsim.svg.fills(this.buttonsOuter.slice(0, 2), theme.buttonOuter);
                pxsim.svg.fills(this.buttons.slice(0, 2), theme.buttonUp);
                pxsim.svg.fill(this.buttonsOuter[2], theme.virtualButtonOuter);
                pxsim.svg.fill(this.buttons[2], theme.virtualButtonUp);
                pxsim.svg.fills(this.logos, theme.accent);
                if (this.shakeButton)
                    pxsim.svg.fill(this.shakeButton, theme.virtualButtonUp);
                this.pinGradients.forEach(function (lg) { return pxsim.svg.setGradientColors(lg, theme.pin, theme.pinActive); });
                pxsim.svg.setGradientColors(this.lightLevelGradient, theme.lightLevelOn, theme.lightLevelOff);
                pxsim.svg.setGradientColors(this.thermometerGradient, theme.ledOff, theme.ledOn);
            };
            MicrobitBoardSvg.prototype.updateState = function () {
                var _this = this;
                var state = this.board;
                if (!state)
                    return;
                var theme = this.props.theme;
                var bpState = state.buttonPairState;
                var buttons = [bpState.aBtn, bpState.bBtn, bpState.abBtn];
                buttons.forEach(function (btn, index) {
                    pxsim.svg.fill(_this.buttons[index], btn.pressed ? theme.buttonDown : theme.buttonUp);
                });
                if (state.ledMatrixState.disabled) {
                    this.leds.forEach(function (led, i) {
                        var sel = led;
                        sel.style.opacity = "0";
                    });
                }
                else {
                    var bw_1 = state.ledMatrixState.displayMode == pxsim.DisplayMode.bw;
                    var img_1 = state.ledMatrixState.image;
                    var br_1 = state.ledMatrixState.brigthness != undefined ? state.ledMatrixState.brigthness : 255;
                    this.leds.forEach(function (led, i) {
                        var sel = led;
                        var imgbr = bw_1 ? (img_1.data[i] > 0 ? br_1 : 0) : img_1.data[i];
                        // correct brightness
                        var opacity = imgbr > 0 ? imgbr / 255 * 155 + 100 : 0;
                        var transfrom = imgbr > 0 ? imgbr / 255 * 0.4 + 0.6 : 0;
                        sel.style.opacity = (opacity / 255) + "";
                        if (transfrom > 0) {
                            sel.style.transformOrigin = '50% 50%';
                            sel.style.transform = "scale(" + transfrom + ")";
                        }
                    });
                }
                this.updatePins();
                this.updateTilt();
                this.updateHeading();
                this.updateLightLevel();
                this.updateTemperature();
                this.updateButtonAB();
                this.updateGestures();
                if (!pxsim.runtime || pxsim.runtime.dead)
                    pxsim.svg.addClass(this.element, "grayscale");
                else
                    pxsim.svg.removeClass(this.element, "grayscale");
            };
            MicrobitBoardSvg.prototype.updateGestures = function () {
                var _this = this;
                var state = this.board;
                if (state.accelerometerState.useShake && !this.shakeButton) {
                    this.shakeButton = pxsim.svg.child(this.g, "circle", { cx: 380, cy: 100, r: 16.5, class: "sim-shake" });
                    pxsim.accessibility.makeFocusable(this.shakeButton);
                    pxsim.svg.fill(this.shakeButton, this.props.theme.virtualButtonUp);
                    this.shakeButton.addEventListener(pxsim.pointerEvents.down, function (ev) {
                        var state = _this.board;
                        pxsim.svg.fill(_this.shakeButton, _this.props.theme.buttonDown);
                    });
                    this.shakeButton.addEventListener(pxsim.pointerEvents.leave, function (ev) {
                        var state = _this.board;
                        pxsim.svg.fill(_this.shakeButton, _this.props.theme.virtualButtonUp);
                    });
                    this.shakeButton.addEventListener(pxsim.pointerEvents.up, function (ev) {
                        var state = _this.board;
                        pxsim.svg.fill(_this.shakeButton, _this.props.theme.virtualButtonUp);
                        _this.board.bus.queue(27 /* MICROBIT_ID_GESTURE */, 11); // GESTURE_SHAKE
                    });
                    pxsim.accessibility.enableKeyboardInteraction(this.shakeButton, undefined, function () {
                        _this.board.bus.queue(27 /* MICROBIT_ID_GESTURE */, 11);
                    });
                    pxsim.accessibility.setAria(this.shakeButton, "button", "Shake the board");
                    this.shakeText = pxsim.svg.child(this.g, "text", { x: 400, y: 110, class: "sim-text" });
                    this.shakeText.textContent = "SHAKE";
                }
            };
            MicrobitBoardSvg.prototype.updateButtonAB = function () {
                var state = this.board;
                if (state.buttonPairState.usesButtonAB && !this.buttonABText) {
                    this.buttonsOuter[2].style.visibility = "visible";
                    this.buttons[2].style.visibility = "visible";
                    this.buttonABText = pxsim.svg.child(this.g, "text", { class: "sim-text", x: 370, y: 272 });
                    this.buttonABText.textContent = "A+B";
                    this.updateTheme();
                }
            };
            MicrobitBoardSvg.prototype.updatePin = function (pin, index) {
                if (!pin)
                    return;
                var text = this.pinTexts[index];
                var v = "";
                if (pin.mode & pxsim.PinFlags.Analog) {
                    v = Math.floor(100 - (pin.value || 0) / 1023 * 100) + "%";
                    if (text)
                        text.textContent = (pin.period ? "~" : "") + (pin.value || 0) + "";
                }
                else if (pin.mode & pxsim.PinFlags.Digital) {
                    v = pin.value > 0 ? "0%" : "100%";
                    if (text)
                        text.textContent = pin.value > 0 ? "1" : "0";
                }
                else if (pin.mode & pxsim.PinFlags.Touch) {
                    v = pin.touched ? "0%" : "100%";
                    if (text)
                        text.textContent = "";
                }
                else {
                    v = "100%";
                    if (text)
                        text.textContent = "";
                }
                if (v)
                    pxsim.svg.setGradientValue(this.pinGradients[index], v);
                if (pin.mode !== pxsim.PinFlags.Unused) {
                    pxsim.accessibility.makeFocusable(this.pins[index]);
                    pxsim.accessibility.setAria(this.pins[index], "slider", this.pins[index].firstChild.textContent);
                    this.pins[index].setAttribute("aria-valuemin", "0");
                    this.pins[index].setAttribute("aria-valuemax", pin.mode & pxsim.PinFlags.Analog ? "1023" : "100");
                    this.pins[index].setAttribute("aria-orientation", "vertical");
                    this.pins[index].setAttribute("aria-valuenow", text ? text.textContent : v);
                    pxsim.accessibility.setLiveContent(text ? text.textContent : v);
                }
            };
            MicrobitBoardSvg.prototype.updateTemperature = function () {
                var _this = this;
                var state = this.board;
                if (!state || !state.thermometerState.usesTemperature)
                    return;
                var tmin = -5;
                var tmax = 50;
                if (!this.thermometer) {
                    var gid = "gradient-thermometer";
                    this.thermometerGradient = pxsim.svg.linearGradient(this.defs, gid);
                    this.thermometer = pxsim.svg.child(this.g, "rect", {
                        class: "sim-thermometer no-drag",
                        x: 120,
                        y: 110,
                        width: 20,
                        height: 160,
                        rx: 5, ry: 5,
                        fill: "url(#" + gid + ")"
                    });
                    this.thermometerText = pxsim.svg.child(this.g, "text", { class: 'sim-text', x: 58, y: 130 });
                    this.updateTheme();
                    var pt_1 = this.element.createSVGPoint();
                    pxsim.svg.buttonEvents(this.thermometer, 
                    // move
                    function (ev) {
                        var cur = pxsim.svg.cursorPoint(pt_1, _this.element, ev);
                        var t = Math.max(0, Math.min(1, (260 - cur.y) / 140));
                        state.thermometerState.temperature = Math.floor(tmin + t * (tmax - tmin));
                        _this.updateTemperature();
                    }, 
                    // start
                    function (ev) { }, 
                    // stop
                    function (ev) { }, 
                    // keydown
                    function (ev) {
                        var charCode = (typeof ev.which == "number") ? ev.which : ev.keyCode;
                        if (charCode === 40 || charCode === 37) {
                            state.thermometerState.temperature--;
                            if (state.thermometerState.temperature < -5) {
                                state.thermometerState.temperature = 50;
                            }
                            _this.updateTemperature();
                        }
                        else if (charCode === 38 || charCode === 39) {
                            state.thermometerState.temperature++;
                            if (state.thermometerState.temperature > 50) {
                                state.thermometerState.temperature = -5;
                            }
                            _this.updateTemperature();
                        }
                    });
                    pxsim.accessibility.makeFocusable(this.thermometer);
                    pxsim.accessibility.setAria(this.thermometer, "slider", "Thermometer");
                    this.thermometer.setAttribute("aria-valuemin", "-5");
                    this.thermometer.setAttribute("aria-valuemax", "50");
                    this.thermometer.setAttribute("aria-orientation", "vertical");
                    this.thermometer.setAttribute("aria-valuenow", "21");
                    this.thermometer.setAttribute("aria-valuetext", "21°C");
                }
                var t = Math.max(tmin, Math.min(tmax, state.thermometerState.temperature));
                var per = Math.floor((state.thermometerState.temperature - tmin) / (tmax - tmin) * 100);
                pxsim.svg.setGradientValue(this.thermometerGradient, 100 - per + "%");
                this.thermometerText.textContent = t + "°C";
                this.thermometer.setAttribute("aria-valuenow", t.toString());
                this.thermometer.setAttribute("aria-valuetext", t + "°C");
                pxsim.accessibility.setLiveContent(t + "°C");
            };
            MicrobitBoardSvg.prototype.updateHeading = function () {
                var _this = this;
                var xc = 258;
                var yc = 75;
                var state = this.board;
                if (!state || !state.compassState.usesHeading)
                    return;
                if (!this.headInitialized) {
                    var p = this.head.firstChild.nextSibling;
                    p.setAttribute("d", "m269.9,50.134647l0,0l-39.5,0l0,0c-14.1,0.1 -24.6,10.7 -24.6,24.8c0,13.9 10.4,24.4 24.3,24.7l0,0l39.6,0c14.2,0 40.36034,-22.97069 40.36034,-24.85394c0,-1.88326 -26.06034,-24.54606 -40.16034,-24.64606m-0.2,39l0,0l-39.3,0c-7.7,-0.1 -14,-6.4 -14,-14.2c0,-7.8 6.4,-14.2 14.2,-14.2l39.1,0c7.8,0 14.2,6.4 14.2,14.2c0,7.9 -6.4,14.2 -14.2,14.2l0,0l0,0z");
                    this.updateTheme();
                    var pt_2 = this.element.createSVGPoint();
                    pxsim.svg.buttonEvents(this.head, function (ev) {
                        var cur = pxsim.svg.cursorPoint(pt_2, _this.element, ev);
                        state.compassState.heading = Math.floor(Math.atan2(cur.y - yc, cur.x - xc) * 180 / Math.PI + 90);
                        if (state.compassState.heading < 0)
                            state.compassState.heading += 360;
                        _this.updateHeading();
                    });
                    this.headInitialized = true;
                }
                var txt = state.compassState.heading.toString() + "°";
                if (txt != this.headText.textContent) {
                    pxsim.svg.rotateElement(this.head, xc, yc, state.compassState.heading + 180);
                    this.headText.textContent = txt;
                }
            };
            MicrobitBoardSvg.prototype.flashSystemLed = function () {
                if (!this.systemLed)
                    this.systemLed = pxsim.svg.child(this.g, "circle", { class: "sim-systemled", cx: 300, cy: 20, r: 5 });
                var now = Date.now();
                if (now - this.lastFlashTime > 150) {
                    this.lastFlashTime = now;
                    pxsim.svg.animate(this.systemLed, "sim-flash");
                }
            };
            MicrobitBoardSvg.prototype.flashAntenna = function () {
                if (!this.antenna) {
                    var ax = 380;
                    var dax = 18;
                    var ayt = 10;
                    var ayb = 40;
                    this.antenna = pxsim.svg.child(this.g, "polyline", { class: "sim-antenna", points: ax + "," + ayb + " " + ax + "," + ayt + " " + (ax += dax) + "," + ayt + " " + ax + "," + ayb + " " + (ax += dax) + "," + ayb + " " + ax + "," + ayt + " " + (ax += dax) + "," + ayt + " " + ax + "," + ayb + " " + (ax += dax) + "," + ayb + " " + ax + "," + ayt + " " + (ax += dax) + "," + ayt });
                }
                var now = Date.now();
                if (now - this.lastAntennaFlash > 200) {
                    this.lastAntennaFlash = now;
                    pxsim.svg.animate(this.antenna, 'sim-flash-stroke');
                }
            };
            MicrobitBoardSvg.prototype.updatePins = function () {
                var _this = this;
                var state = this.board;
                if (!state)
                    return;
                state.edgeConnectorState.pins.forEach(function (pin, i) { return _this.updatePin(pin, i); });
            };
            MicrobitBoardSvg.prototype.updateLightLevel = function () {
                var _this = this;
                var state = this.board;
                if (!state || !state.lightSensorState.usesLightLevel)
                    return;
                if (!this.lightLevelButton) {
                    var gid = "gradient-light-level";
                    this.lightLevelGradient = pxsim.svg.linearGradient(this.defs, gid);
                    var cy_1 = 50;
                    var r_1 = 35;
                    this.lightLevelButton = pxsim.svg.child(this.g, "circle", {
                        cx: "50px", cy: cy_1 + "px", r: r_1 + "px",
                        class: 'sim-light-level-button no-drag',
                        fill: "url(#" + gid + ")"
                    });
                    var pt_3 = this.element.createSVGPoint();
                    pxsim.svg.buttonEvents(this.lightLevelButton, 
                    // move
                    function (ev) {
                        var pos = pxsim.svg.cursorPoint(pt_3, _this.element, ev);
                        var rs = r_1 / 2;
                        var level = Math.max(0, Math.min(255, Math.floor((pos.y - (cy_1 - rs)) / (2 * rs) * 255)));
                        if (level != _this.board.lightSensorState.lightLevel) {
                            _this.board.lightSensorState.lightLevel = level;
                            _this.applyLightLevel();
                        }
                    }, 
                    // start
                    function (ev) { }, 
                    // stop
                    function (ev) { }, 
                    // keydown
                    function (ev) {
                        var charCode = (typeof ev.which == "number") ? ev.which : ev.keyCode;
                        if (charCode === 40 || charCode === 37) {
                            _this.board.lightSensorState.lightLevel--;
                            if (_this.board.lightSensorState.lightLevel < 0) {
                                _this.board.lightSensorState.lightLevel = 255;
                            }
                            _this.applyLightLevel();
                        }
                        else if (charCode === 38 || charCode === 39) {
                            _this.board.lightSensorState.lightLevel++;
                            if (_this.board.lightSensorState.lightLevel > 255) {
                                _this.board.lightSensorState.lightLevel = 0;
                            }
                            _this.applyLightLevel();
                        }
                    });
                    this.lightLevelText = pxsim.svg.child(this.g, "text", { x: 85, y: cy_1 + r_1 - 5, text: '', class: 'sim-text' });
                    this.updateTheme();
                    pxsim.accessibility.makeFocusable(this.lightLevelButton);
                    pxsim.accessibility.setAria(this.lightLevelButton, "slider", "Light level");
                    this.lightLevelButton.setAttribute("aria-valuemin", "0");
                    this.lightLevelButton.setAttribute("aria-valuemax", "255");
                    this.lightLevelButton.setAttribute("aria-orientation", "vertical");
                    this.lightLevelButton.setAttribute("aria-valuenow", "128");
                }
                pxsim.svg.setGradientValue(this.lightLevelGradient, Math.min(100, Math.max(0, Math.floor(state.lightSensorState.lightLevel * 100 / 255))) + '%');
                this.lightLevelText.textContent = state.lightSensorState.lightLevel.toString();
            };
            MicrobitBoardSvg.prototype.applyLightLevel = function () {
                var lv = this.board.lightSensorState.lightLevel;
                pxsim.svg.setGradientValue(this.lightLevelGradient, Math.min(100, Math.max(0, Math.floor(lv * 100 / 255))) + '%');
                this.lightLevelText.textContent = lv.toString();
                this.lightLevelButton.setAttribute("aria-valuenow", lv.toString());
                pxsim.accessibility.setLiveContent(lv.toString());
            };
            MicrobitBoardSvg.prototype.updateTilt = function () {
                if (this.props.disableTilt)
                    return;
                var state = this.board;
                if (!state || !state.accelerometerState.accelerometer.isActive)
                    return;
                var x = state.accelerometerState.accelerometer.getX();
                var y = -state.accelerometerState.accelerometer.getY();
                var af = 8 / 1023;
                var s = 1 - Math.min(0.1, Math.pow(Math.max(Math.abs(x), Math.abs(y)) / 1023, 2) / 35);
                this.element.style.transform = "perspective(30em) rotateX(" + y * af + "deg) rotateY(" + x * af + "deg) scale(" + s + ", " + s + ")";
                this.element.style.perspectiveOrigin = "50% 50% 50%";
                this.element.style.perspective = "30em";
            };
            MicrobitBoardSvg.prototype.buildDom = function () {
                var _this = this;
                this.element = pxsim.svg.elt("svg");
                pxsim.svg.hydrate(this.element, {
                    "version": "1.0",
                    "viewBox": "0 0 " + MB_WIDTH + " " + MB_HEIGHT,
                    "class": "sim",
                    "x": "0px",
                    "y": "0px",
                    "width": MB_WIDTH + "px",
                    "height": MB_HEIGHT + "px",
                });
                this.style = pxsim.svg.child(this.element, "style", {});
                this.style.textContent = MB_STYLE + (this.props.theme.highContrast ? MB_HIGHCONTRAST : "");
                this.defs = pxsim.svg.child(this.element, "defs", {});
                this.g = pxsim.svg.elt("g");
                this.element.appendChild(this.g);
                // filters
                var ledglow = pxsim.svg.child(this.defs, "filter", { id: "ledglow", x: "-75%", y: "-75%", width: "300%", height: "300%" });
                pxsim.svg.child(ledglow, "feMorphology", { operator: "dilate", radius: "4", in: "SourceAlpha", result: "thicken" });
                pxsim.svg.child(ledglow, "feGaussianBlur", { stdDeviation: "5", in: "thicken", result: "blurred" });
                pxsim.svg.child(ledglow, "feFlood", { "flood-color": "rgb(255, 17, 77)", result: "glowColor" });
                pxsim.svg.child(ledglow, "feComposite", { in: "glowColor", in2: "blurred", operator: "in", result: "ledglow_colored" });
                var ledglowMerge = pxsim.svg.child(ledglow, "feMerge", {});
                pxsim.svg.child(ledglowMerge, "feMergeNode", { in: "ledglow_colored" });
                pxsim.svg.child(ledglowMerge, "feMergeNode", { in: "SourceGraphic" });
                var glow = pxsim.svg.child(this.defs, "filter", { id: "filterglow", x: "-5%", y: "-5%", width: "120%", height: "120%" });
                pxsim.svg.child(glow, "feGaussianBlur", { stdDeviation: "5", result: "glow" });
                var merge = pxsim.svg.child(glow, "feMerge", {});
                for (var i = 0; i < 3; ++i)
                    pxsim.svg.child(merge, "feMergeNode", { in: "glow" });
                // outline
                pxsim.svg.path(this.g, "sim-board", "M498,31.9C498,14.3,483.7,0,466.1,0H31.9C14.3,0,0,14.3,0,31.9v342.2C0,391.7,14.3,406,31.9,406h434.2c17.6,0,31.9-14.3,31.9-31.9V31.9z M14.3,206.7c-2.7,0-4.8-2.2-4.8-4.8c0-2.7,2.2-4.8,4.8-4.8c2.7,0,4.8,2.2,4.8,4.8C19.2,204.6,17,206.7,14.3,206.7z M486.2,206.7c-2.7,0-4.8-2.2-4.8-4.8c0-2.72.2-4.8,4.8-4.8c2.7,0,4.8,2.2,4.8,4.8C491,204.6,488.8,206.7,486.2,206.7z");
                // script background
                this.display = pxsim.svg.path(this.g, "sim-display", "M333.8,310.3H165.9c-8.3,0-15-6.7-15-15V127.5c0-8.3,6.7-15,15-15h167.8c8.3,0,15,6.7,15,15v167.8C348.8,303.6,342.1,310.3,333.8,310.3z");
                this.logos = [];
                this.logos.push(pxsim.svg.child(this.g, "polygon", { class: "sim-theme", points: "115,56.7 173.1,0 115,0" }));
                this.logos.push(pxsim.svg.path(this.g, "sim-theme", "M114.2,0H25.9C12.1,2.1,0,13.3,0,27.7v83.9L114.2,0z"));
                this.logos.push(pxsim.svg.child(this.g, "polygon", { class: "sim-theme", points: "173,27.9 202.5,0 173,0" }));
                this.logos.push(pxsim.svg.child(this.g, "polygon", { class: "sim-theme", points: "54.1,242.4 54.1,274.1 22.4,274.1" }));
                this.logos.push(pxsim.svg.child(this.g, "polygon", { class: "sim-theme", points: "446.2,164.6 446.2,132.8 477.9,132.8" }));
                // leds
                this.leds = [];
                this.ledsOuter = [];
                var left = 154, top = 113, ledoffw = 46, ledoffh = 44;
                for (var i = 0; i < 5; ++i) {
                    var ledtop = i * ledoffh + top;
                    for (var j = 0; j < 5; ++j) {
                        var ledleft = j * ledoffw + left;
                        var k = i * 5 + j;
                        this.ledsOuter.push(pxsim.svg.child(this.g, "rect", { class: "sim-led-back", x: ledleft, y: ledtop, width: 10, height: 20, rx: 2, ry: 2 }));
                        var led_1 = pxsim.svg.child(this.g, "rect", { class: "sim-led", x: ledleft - 2, y: ledtop - 2, width: 14, height: 24, rx: 3, ry: 3, title: "(" + j + "," + i + ")" });
                        pxsim.svg.filter(led_1, "url(#ledglow)");
                        this.leds.push(led_1);
                    }
                }
                // head
                this.head = pxsim.svg.child(this.g, "g", { class: "sim-head no-drag" });
                pxsim.svg.child(this.head, "circle", { cx: 258, cy: 75, r: 100, fill: "transparent" });
                this.logos.push(pxsim.svg.path(this.head, "sim-theme sim-theme-glow", "M269.9,50.2L269.9,50.2l-39.5,0v0c-14.1,0.1-24.6,10.7-24.6,24.8c0,13.9,10.4,24.4,24.3,24.7v0h39.6c14.2,0,24.8-10.6,24.8-24.7C294.5,61,284,50.3,269.9,50.2 M269.7,89.2L269.7,89.2l-39.3,0c-7.7-0.1-14-6.4-14-14.2c0-7.8,6.4-14.2,14.2-14.2h39.1c7.8,0,14.2,6.4,14.2,14.2C283.9,82.9,277.5,89.2,269.7,89.2"));
                this.logos.push(pxsim.svg.path(this.head, "sim-theme sim-theme-glow", "M230.6,69.7c-2.9,0-5.3,2.4-5.3,5.3c0,2.9,2.4,5.3,5.3,5.3c2.9,0,5.3-2.4,5.3-5.3C235.9,72.1,233.5,69.7,230.6,69.7"));
                this.logos.push(pxsim.svg.path(this.head, "sim-theme sim-theme-glow", "M269.7,80.3c2.9,0,5.3-2.4,5.3-5.3c0-2.9-2.4-5.3-5.3-5.3c-2.9,0-5.3,2.4-5.3,5.3C264.4,77.9,266.8,80.3,269.7,80.3"));
                this.headText = pxsim.svg.child(this.g, "text", { x: 310, y: 100, class: "sim-text" });
                // https://www.microbit.co.uk/device/pins
                // P0, P1, P2
                this.pins = [
                    "M16.5,341.2c0,0.4-0.1,0.9-0.1,1.3v60.7c4.1,1.7,8.6,2.7,12.9,2.7h34.4v-64.7h0.3c0,0,0-0.1,0-0.1c0-13-10.6-23.6-23.7-23.6C27.2,317.6,16.5,328.1,16.5,341.2z M21.2,341.6c0-10.7,8.7-19.3,19.3-19.3c10.7,0,19.3,8.7,19.3,19.3c0,10.7-8.6,19.3-19.3,19.3C29.9,360.9,21.2,352.2,21.2,341.6z",
                    "M139.1,317.3c-12.8,0-22.1,10.3-23.1,23.1V406h46.2v-65.6C162.2,327.7,151.9,317.3,139.1,317.3zM139.3,360.1c-10.7,0-19.3-8.6-19.3-19.3c0-10.7,8.6-19.3,19.3-19.3c10.7,0,19.3,8.7,19.3,19.3C158.6,351.5,150,360.1,139.3,360.1z",
                    "M249,317.3c-12.8,0-22.1,10.3-23.1,23.1V406h46.2v-65.6C272.1,327.7,261.8,317.3,249,317.3z M249.4,360.1c-10.7,0-19.3-8.6-19.3-19.3c0-10.7,8.6-19.3,19.3-19.3c10.7,0,19.3,8.7,19.3,19.3C268.7,351.5,260.1,360.1,249.4,360.1z"
                ].map(function (p, pi) { return pxsim.svg.path(_this.g, "sim-pin sim-pin-touch", p); });
                // P3
                this.pins.push(pxsim.svg.path(this.g, "sim-pin", "M0,357.7v19.2c0,10.8,6.2,20.2,14.4,25.2v-44.4H0z"));
                pins4onXs.forEach(function (x) {
                    _this.pins.push(pxsim.svg.child(_this.g, "rect", { x: x, y: 356.7, width: 10, height: 50, class: "sim-pin" }));
                });
                this.pins.push(pxsim.svg.path(this.g, "sim-pin", "M483.6,402c8.2-5,14.4-14.4,14.4-25.1v-19.2h-14.4V402z"));
                this.pins.push(pxsim.svg.path(this.g, "sim-pin", "M359.9,317.3c-12.8,0-22.1,10.3-23.1,23.1V406H383v-65.6C383,327.7,372.7,317.3,359.9,317.3z M360,360.1c-10.7,0-19.3-8.6-19.3-19.3c0-10.7,8.6-19.3,19.3-19.3c10.7,0,19.3,8.7,19.3,19.3C379.3,351.5,370.7,360.1,360,360.1z"));
                this.pins.push(pxsim.svg.path(this.g, "sim-pin", "M458,317.6c-13,0-23.6,10.6-23.6,23.6c0,0,0,0.1,0,0.1h0V406H469c4.3,0,8.4-1,12.6-2.7v-60.7c0-0.4,0-0.9,0-1.3C481.6,328.1,471,317.6,458,317.6z M457.8,360.9c-10.7,0-19.3-8.6-19.3-19.3c0-10.7,8.6-19.3,19.3-19.3c10.7,0,19.3,8.7,19.3,19.3C477.1,352.2,468.4,360.9,457.8,360.9z"));
                this.pins.forEach(function (p, i) { return pxsim.svg.hydrate(p, { title: pinTitles[i] }); });
                this.pinGradients = this.pins.map(function (pin, i) {
                    var gid = "gradient-pin-" + i;
                    var lg = pxsim.svg.linearGradient(_this.defs, gid);
                    pin.setAttribute("fill", "url(#" + gid + ")");
                    return lg;
                });
                this.pinTexts = [67, 165, 275].map(function (x) { return pxsim.svg.child(_this.g, "text", { class: "sim-text-pin", x: x, y: 345 }); });
                this.buttonsOuter = [];
                this.buttons = [];
                var outerBtn = function (left, top, label) {
                    var btnr = 4;
                    var btnw = 56.2;
                    var btnn = 6;
                    var btnnm = 10;
                    var btng = pxsim.svg.child(_this.g, "g", { class: "sim-button-group" });
                    pxsim.accessibility.makeFocusable(btng);
                    pxsim.accessibility.setAria(btng, "button", label);
                    _this.buttonsOuter.push(btng);
                    pxsim.svg.child(btng, "rect", { class: "sim-button-outer", x: left, y: top, rx: btnr, ry: btnr, width: btnw, height: btnw });
                    pxsim.svg.child(btng, "circle", { class: "sim-button-nut", cx: left + btnnm, cy: top + btnnm, r: btnn });
                    pxsim.svg.child(btng, "circle", { class: "sim-button-nut", cx: left + btnnm, cy: top + btnw - btnnm, r: btnn });
                    pxsim.svg.child(btng, "circle", { class: "sim-button-nut", cx: left + btnw - btnnm, cy: top + btnw - btnnm, r: btnn });
                    pxsim.svg.child(btng, "circle", { class: "sim-button-nut", cx: left + btnw - btnnm, cy: top + btnnm, r: btnn });
                };
                outerBtn(25.9, 176.4, "A");
                this.buttons.push(pxsim.svg.path(this.g, "sim-button", "M69.7,203.5c0,8.7-7,15.7-15.7,15.7s-15.7-7-15.7-15.7c0-8.7,7-15.7,15.7-15.7S69.7,194.9,69.7,203.5"));
                outerBtn(418.1, 176.4, "B");
                this.buttons.push(pxsim.svg.path(this.g, "sim-button", "M461.9,203.5c0,8.7-7,15.7-15.7,15.7c-8.7,0-15.7-7-15.7-15.7c0-8.7,7-15.7,15.7-15.7C454.9,187.8,461.9,194.9,461.9,203.5"));
                outerBtn(417, 250, "A+B");
                this.buttons.push(pxsim.svg.child(this.g, "circle", { class: "sim-button", cx: 446, cy: 278, r: 16.5 }));
                this.buttonsOuter[2].style.visibility = "hidden";
                this.buttons[2].style.visibility = "hidden";
                pxsim.svg.path(this.g, "sim-label", "M35.7,376.4c0-2.8,2.1-5.1,5.5-5.1c3.3,0,5.5,2.4,5.5,5.1v4.7c0,2.8-2.2,5.1-5.5,5.1c-3.3,0-5.5-2.4-5.5-5.1V376.4zM43.3,376.4c0-1.3-0.8-2.3-2.2-2.3c-1.3,0-2.1,1.1-2.1,2.3v4.7c0,1.2,0.8,2.3,2.1,2.3c1.3,0,2.2-1.1,2.2-2.3V376.4z");
                pxsim.svg.path(this.g, "sim-label", "M136.2,374.1c2.8,0,3.4-0.8,3.4-2.5h2.9v14.3h-3.4v-9.5h-3V374.1z");
                pxsim.svg.path(this.g, "sim-label", "M248.6,378.5c1.7-1,3-1.7,3-3.1c0-1.1-0.7-1.6-1.6-1.6c-1,0-1.8,0.6-1.8,2.1h-3.3c0-2.6,1.8-4.6,5.1-4.6c2.6,0,4.9,1.3,4.9,4.3c0,2.4-2.3,3.9-3.8,4.7c-2,1.3-2.5,1.8-2.5,2.9h6.1v2.7h-10C244.8,381.2,246.4,379.9,248.6,378.5z");
                pxsim.svg.path(this.g, "sim-button-label", "M48.1,270.9l-0.6-1.7h-5.1l-0.6,1.7h-3.5l5.1-14.3h3.1l5.2,14.3H48.1z M45,260.7l-1.8,5.9h3.5L45,260.7z");
                pxsim.svg.path(this.g, "sim-button-label", "M449.1,135.8h5.9c3.9,0,4.7,2.4,4.7,3.9c0,1.8-1.4,2.9-2.5,3.2c0.9,0,2.6,1.1,2.6,3.3c0,1.5-0.8,4-4.7,4h-6V135.8zM454.4,141.7c1.6,0,2-1,2-1.7c0-0.6-0.3-1.7-2-1.7h-2v3.4H454.4z M452.4,144.1v3.5h2.1c1.6,0,2-1,2-1.8c0-0.7-0.4-1.8-2-1.8H452.4z");
                pxsim.svg.path(this.g, "sim-label", "M352.1,381.1c0,1.6,0.9,2.5,2.2,2.5c1.2,0,1.9-0.9,1.9-1.9c0-1.2-0.6-2-2.1-2h-1.3v-2.6h1.3c1.5,0,1.9-0.7,1.9-1.8c0-1.1-0.7-1.6-1.6-1.6c-1.4,0-1.8,0.8-1.8,2.1h-3.3c0-2.4,1.5-4.6,5.1-4.6c2.6,0,5,1.3,5,4c0,1.6-1,2.8-2.1,3.2c1.3,0.5,2.3,1.6,2.3,3.5c0,2.7-2.4,4.3-5.2,4.3c-3.5,0-5.5-2.1-5.5-5.1H352.1z");
                pxsim.svg.path(this.g, "sim-label", "M368.5,385.9h-3.1l-5.1-14.3h3.5l3.1,10.1l3.1-10.1h3.6L368.5,385.9z");
                pxsim.svg.path(this.g, "sim-label", "M444.4,378.3h7.4v2.5h-1.5c-0.6,3.3-3,5.5-7.1,5.5c-4.8,0-7.5-3.5-7.5-7.5c0-3.9,2.8-7.5,7.5-7.5c3.8,0,6.4,2.3,6.6,5h-3.5c-0.2-1.1-1.4-2.2-3.1-2.2c-2.7,0-4.1,2.3-4.1,4.7c0,2.5,1.4,4.7,4.4,4.7c2,0,3.2-1.2,3.4-2.7h-2.5V378.3z");
                pxsim.svg.path(this.g, "sim-label", "M461.4,380.9v-9.3h3.3v14.3h-3.5l-5.2-9.2v9.2h-3.3v-14.3h3.5L461.4,380.9z");
                pxsim.svg.path(this.g, "sim-label", "M472.7,371.6c4.8,0,7.5,3.5,7.5,7.2s-2.7,7.2-7.5,7.2h-5.3v-14.3H472.7z M470.8,374.4v8.6h1.8c2.7,0,4.2-2.1,4.2-4.3s-1.6-4.3-4.2-4.3H470.8z");
            };
            MicrobitBoardSvg.prototype.attachEvents = function () {
                var _this = this;
                pxsim.Runtime.messagePosted = function (msg) {
                    switch (msg.type || "") {
                        case "serial":
                            _this.flashSystemLed();
                            break;
                        case "radiopacket":
                            _this.flashAntenna();
                            break;
                    }
                };
                var tiltDecayer = 0;
                this.element.addEventListener(pxsim.pointerEvents.move, function (ev) {
                    var state = _this.board;
                    if (!state.accelerometerState.accelerometer.isActive)
                        return;
                    if (tiltDecayer) {
                        clearInterval(tiltDecayer);
                        tiltDecayer = 0;
                    }
                    var bbox = _this.element.getBoundingClientRect();
                    var ax = (ev.clientX - bbox.width / 2) / (bbox.width / 3);
                    var ay = (ev.clientY - bbox.height / 2) / (bbox.height / 3);
                    var x = -Math.max(-1023, Math.min(1023, Math.floor(ax * 1023)));
                    var y = -Math.max(-1023, Math.min(1023, Math.floor(ay * 1023)));
                    var z2 = 1023 * 1023 - x * x - y * y;
                    var z = Math.floor((z2 > 0 ? -1 : 1) * Math.sqrt(Math.abs(z2)));
                    state.accelerometerState.accelerometer.update(x, y, z);
                    _this.updateTilt();
                }, false);
                this.element.addEventListener(pxsim.pointerEvents.leave, function (ev) {
                    var state = _this.board;
                    if (!state.accelerometerState.accelerometer.isActive)
                        return;
                    if (!tiltDecayer) {
                        tiltDecayer = setInterval(function () {
                            var accx = state.accelerometerState.accelerometer.getX(pxsim.MicroBitCoordinateSystem.RAW);
                            accx = Math.floor(Math.abs(accx) * 0.85) * (accx > 0 ? 1 : -1);
                            var accy = state.accelerometerState.accelerometer.getY(pxsim.MicroBitCoordinateSystem.RAW);
                            accy = Math.floor(Math.abs(accy) * 0.85) * (accy > 0 ? 1 : -1);
                            var accz = -Math.sqrt(Math.max(0, 1023 * 1023 - accx * accx - accy * accy));
                            if (Math.abs(accx) <= 24 && Math.abs(accy) <= 24) {
                                clearInterval(tiltDecayer);
                                tiltDecayer = 0;
                                accx = 0;
                                accy = 0;
                                accz = -1023;
                            }
                            state.accelerometerState.accelerometer.update(accx, accy, accz);
                            _this.updateTilt();
                        }, 50);
                    }
                }, false);
                this.pins.forEach(function (pin, index) {
                    if (!_this.board.edgeConnectorState.pins[index])
                        return;
                    var pt = _this.element.createSVGPoint();
                    pxsim.svg.buttonEvents(pin, 
                    // move
                    function (ev) {
                        var state = _this.board;
                        var pin = state.edgeConnectorState.pins[index];
                        var svgpin = _this.pins[index];
                        if (pin.mode & pxsim.PinFlags.Input) {
                            var cursor = pxsim.svg.cursorPoint(pt, _this.element, ev);
                            var v = (400 - cursor.y) / 40 * 1023;
                            pin.value = Math.max(0, Math.min(1023, Math.floor(v)));
                        }
                        _this.updatePin(pin, index);
                    }, 
                    // start
                    function (ev) {
                        var state = _this.board;
                        var pin = state.edgeConnectorState.pins[index];
                        var svgpin = _this.pins[index];
                        pxsim.svg.addClass(svgpin, "touched");
                        if (pin.mode & pxsim.PinFlags.Input) {
                            var cursor = pxsim.svg.cursorPoint(pt, _this.element, ev);
                            var v = (400 - cursor.y) / 40 * 1023;
                            pin.value = Math.max(0, Math.min(1023, Math.floor(v)));
                        }
                        _this.updatePin(pin, index);
                    }, 
                    // stop
                    function (ev) {
                        var state = _this.board;
                        var pin = state.edgeConnectorState.pins[index];
                        var svgpin = _this.pins[index];
                        pxsim.svg.removeClass(svgpin, "touched");
                        _this.updatePin(pin, index);
                        return false;
                    }, 
                    // keydown
                    function (ev) {
                        var charCode = (typeof ev.which == "number") ? ev.which : ev.keyCode;
                        var state = _this.board;
                        var pin = state.edgeConnectorState.pins[index];
                        if (charCode === 40 || charCode === 37) {
                            pin.value -= 10;
                            if (pin.value < 0) {
                                pin.value = 1023;
                            }
                            _this.updatePin(pin, index);
                        }
                        else if (charCode === 38 || charCode === 39) {
                            pin.value += 10;
                            if (pin.value > 1023) {
                                pin.value = 0;
                            }
                            _this.updatePin(pin, index);
                        }
                    });
                });
                this.pins.slice(0, 3).forEach(function (btn, index) {
                    btn.addEventListener(pxsim.pointerEvents.down, function (ev) {
                        var state = _this.board;
                        state.edgeConnectorState.pins[index].touched = true;
                        _this.updatePin(state.edgeConnectorState.pins[index], index);
                    });
                    btn.addEventListener(pxsim.pointerEvents.leave, function (ev) {
                        var state = _this.board;
                        state.edgeConnectorState.pins[index].touched = false;
                        _this.updatePin(state.edgeConnectorState.pins[index], index);
                    });
                    btn.addEventListener(pxsim.pointerEvents.up, function (ev) {
                        var state = _this.board;
                        state.edgeConnectorState.pins[index].touched = false;
                        _this.updatePin(state.edgeConnectorState.pins[index], index);
                        _this.board.bus.queue(state.edgeConnectorState.pins[index].id, 2 /* MICROBIT_BUTTON_EVT_UP */);
                        _this.board.bus.queue(state.edgeConnectorState.pins[index].id, 3 /* MICROBIT_BUTTON_EVT_CLICK */);
                    });
                    pxsim.accessibility.enableKeyboardInteraction(btn, undefined, function () {
                        var state = _this.board;
                        _this.board.bus.queue(state.edgeConnectorState.pins[index].id, 2 /* MICROBIT_BUTTON_EVT_UP */);
                        _this.board.bus.queue(state.edgeConnectorState.pins[index].id, 3 /* MICROBIT_BUTTON_EVT_CLICK */);
                    });
                });
                var bpState = this.board.buttonPairState;
                var stateButtons = [bpState.aBtn, bpState.bBtn, bpState.abBtn];
                this.buttonsOuter.slice(0, 2).forEach(function (btn, index) {
                    btn.addEventListener(pxsim.pointerEvents.down, function (ev) {
                        var state = _this.board;
                        stateButtons[index].pressed = true;
                        pxsim.svg.fill(_this.buttons[index], _this.props.theme.buttonDown);
                    });
                    btn.addEventListener(pxsim.pointerEvents.leave, function (ev) {
                        var state = _this.board;
                        stateButtons[index].pressed = false;
                        pxsim.svg.fill(_this.buttons[index], _this.props.theme.buttonUp);
                    });
                    btn.addEventListener(pxsim.pointerEvents.up, function (ev) {
                        var state = _this.board;
                        stateButtons[index].pressed = false;
                        pxsim.svg.fill(_this.buttons[index], _this.props.theme.buttonUp);
                        _this.board.bus.queue(stateButtons[index].id, 2 /* MICROBIT_BUTTON_EVT_UP */);
                        _this.board.bus.queue(stateButtons[index].id, 3 /* MICROBIT_BUTTON_EVT_CLICK */);
                    });
                    pxsim.accessibility.enableKeyboardInteraction(btn, undefined, function () {
                        _this.board.bus.queue(stateButtons[index].id, 2 /* MICROBIT_BUTTON_EVT_UP */);
                        _this.board.bus.queue(stateButtons[index].id, 3 /* MICROBIT_BUTTON_EVT_CLICK */);
                    });
                });
                this.buttonsOuter[2].addEventListener(pxsim.pointerEvents.down, function (ev) {
                    var state = _this.board;
                    stateButtons[0].pressed = true;
                    stateButtons[1].pressed = true;
                    stateButtons[2].pressed = true;
                    pxsim.svg.fill(_this.buttons[0], _this.props.theme.buttonDown);
                    pxsim.svg.fill(_this.buttons[1], _this.props.theme.buttonDown);
                    pxsim.svg.fill(_this.buttons[2], _this.props.theme.buttonDown);
                });
                this.buttonsOuter[2].addEventListener(pxsim.pointerEvents.leave, function (ev) {
                    var state = _this.board;
                    stateButtons[0].pressed = false;
                    stateButtons[1].pressed = false;
                    stateButtons[2].pressed = false;
                    pxsim.svg.fill(_this.buttons[0], _this.props.theme.buttonUp);
                    pxsim.svg.fill(_this.buttons[1], _this.props.theme.buttonUp);
                    pxsim.svg.fill(_this.buttons[2], _this.props.theme.virtualButtonUp);
                });
                this.buttonsOuter[2].addEventListener(pxsim.pointerEvents.up, function (ev) {
                    var state = _this.board;
                    stateButtons[0].pressed = false;
                    stateButtons[1].pressed = false;
                    stateButtons[2].pressed = false;
                    pxsim.svg.fill(_this.buttons[0], _this.props.theme.buttonUp);
                    pxsim.svg.fill(_this.buttons[1], _this.props.theme.buttonUp);
                    pxsim.svg.fill(_this.buttons[2], _this.props.theme.virtualButtonUp);
                    _this.board.bus.queue(stateButtons[2].id, 2 /* MICROBIT_BUTTON_EVT_UP */);
                    _this.board.bus.queue(stateButtons[2].id, 3 /* MICROBIT_BUTTON_EVT_CLICK */);
                });
                pxsim.accessibility.enableKeyboardInteraction(this.buttonsOuter[2], undefined, function () {
                    _this.board.bus.queue(stateButtons[2].id, 2 /* MICROBIT_BUTTON_EVT_UP */);
                    _this.board.bus.queue(stateButtons[2].id, 3 /* MICROBIT_BUTTON_EVT_CLICK */);
                });
            };
            return MicrobitBoardSvg;
        }());
        visuals.MicrobitBoardSvg = MicrobitBoardSvg;
    })(visuals = pxsim.visuals || (pxsim.visuals = {}));
})(pxsim || (pxsim = {}));
/// <reference path="../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../libs/core/dal.d.ts"/>
/// <reference path="../../libs/core/enums.d.ts"/>
var pxsim;
(function (pxsim) {
    var visuals;
    (function (visuals) {
        var PIXEL_SPACING = visuals.PIN_DIST * 3;
        var PIXEL_RADIUS = visuals.PIN_DIST;
        var CANVAS_WIDTH = 1.2 * visuals.PIN_DIST;
        var CANVAS_HEIGHT = 12 * visuals.PIN_DIST;
        var CANVAS_VIEW_WIDTH = CANVAS_WIDTH;
        var CANVAS_VIEW_HEIGHT = CANVAS_HEIGHT;
        var CANVAS_VIEW_PADDING = visuals.PIN_DIST * 4;
        var CANVAS_LEFT = 1.4 * visuals.PIN_DIST;
        var CANVAS_TOP = visuals.PIN_DIST;
        // For the instructions parts list
        function mkNeoPixelPart(xy) {
            if (xy === void 0) { xy = [0, 0]; }
            var NP_PART_XOFF = -13.5;
            var NP_PART_YOFF = -11;
            var NP_PART_WIDTH = 87.5;
            var NP_PART_HEIGHT = 190;
            var NEOPIXEL_PART_IMG = "<svg viewBox=\"-5 -1 53 112\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:bx=\"https://boxy-svg.com\">\n  <rect x=\"2.5\" width=\"38\" height=\"100\" style=\"fill: rgb(68, 68, 68);\"/>\n  <rect x=\"11.748\" y=\"3.2\" width=\"1.391\" height=\"2.553\" style=\"fill: none; stroke-linejoin: round; stroke-width: 3; stroke: rgb(165, 103, 52);\"/>\n  <rect x=\"20.75\" y=\"3.2\" width=\"1.391\" height=\"2.553\" style=\"fill: none; stroke-linejoin: round; stroke-width: 3; stroke: rgb(165, 103, 52);\"/>\n  <rect x=\"29.75\" y=\"3.2\" width=\"1.391\" height=\"2.553\" style=\"fill: none; stroke-linejoin: round; stroke-width: 3; stroke: rgb(165, 103, 52);\"/>\n  <g>\n    <rect x=\"9\" y=\"16.562\" width=\"25\" height=\"3.238\" style=\"fill: rgb(216, 216, 216);\"/>\n    <rect x=\"9\" y=\"22.562\" width=\"25\" height=\"3.238\" style=\"fill: rgb(216, 216, 216);\"/>\n    <rect x=\"9\" y=\"28.563\" width=\"25\" height=\"3.238\" style=\"fill: rgb(216, 216, 216);\"/>\n    <rect x=\"11.607\" y=\"14.833\" width=\"19.787\" height=\"18.697\" style=\"fill: rgb(0, 0, 0);\"/>\n    <ellipse style=\"fill: rgb(216, 216, 216);\" cx=\"21.5\" cy=\"24.181\" rx=\"7\" ry=\"7\"/>\n  </g>\n  <path d=\"M -7.25 -103.2 L -2.5 -100.003 L -12 -100.003 L -7.25 -103.2 Z\" style=\"fill: rgb(68, 68, 68);\" transform=\"matrix(-1, 0, 0, -1, 0, 0)\" bx:shape=\"triangle -12 -103.2 9.5 3.197 0.5 0 1@ad6f5cac\"/>\n  <path d=\"M -16.75 -103.197 L -12 -100 L -21.5 -100 L -16.75 -103.197 Z\" style=\"fill: rgb(68, 68, 68);\" transform=\"matrix(-1, 0, 0, -1, 0, 0)\" bx:shape=\"triangle -21.5 -103.197 9.5 3.197 0.5 0 1@07d73149\"/>\n  <path d=\"M -26.25 -103.2 L -21.5 -100.003 L -31 -100.003 L -26.25 -103.2 Z\" style=\"fill: rgb(68, 68, 68);\" transform=\"matrix(-1, 0, 0, -1, 0, 0)\" bx:shape=\"triangle -31 -103.2 9.5 3.197 0.5 0 1@54403e2d\"/>\n  <path d=\"M -35.75 -103.197 L -31 -100 L -40.5 -100 L -35.75 -103.197 Z\" style=\"fill: rgb(68, 68, 68);\" transform=\"matrix(-1, 0, 0, -1, 0, 0)\" bx:shape=\"triangle -40.5 -103.197 9.5 3.197 0.5 0 1@21c9b772\"/>\n  <g transform=\"matrix(1, 0, 0, 1, 0.000002, 29.999994)\">\n    <rect x=\"9\" y=\"16.562\" width=\"25\" height=\"3.238\" style=\"fill: rgb(216, 216, 216);\"/>\n    <rect x=\"9\" y=\"22.562\" width=\"25\" height=\"3.238\" style=\"fill: rgb(216, 216, 216);\"/>\n    <rect x=\"9\" y=\"28.563\" width=\"25\" height=\"3.238\" style=\"fill: rgb(216, 216, 216);\"/>\n    <rect x=\"11.607\" y=\"14.833\" width=\"19.787\" height=\"18.697\" style=\"fill: rgb(0, 0, 0);\"/>\n    <ellipse style=\"fill: rgb(216, 216, 216);\" cx=\"21.5\" cy=\"24.181\" rx=\"7\" ry=\"7\"/>\n  </g>\n  <g transform=\"matrix(1, 0, 0, 1, 0.000005, 59.999992)\">\n    <rect x=\"9\" y=\"16.562\" width=\"25\" height=\"3.238\" style=\"fill: rgb(216, 216, 216);\"/>\n    <rect x=\"9\" y=\"22.562\" width=\"25\" height=\"3.238\" style=\"fill: rgb(216, 216, 216);\"/>\n    <rect x=\"9\" y=\"28.563\" width=\"25\" height=\"3.238\" style=\"fill: rgb(216, 216, 216);\"/>\n    <rect x=\"11.607\" y=\"14.833\" width=\"19.787\" height=\"18.697\" style=\"fill: rgb(0, 0, 0);\"/>\n    <ellipse style=\"fill: rgb(216, 216, 216);\" cx=\"21.5\" cy=\"24.181\" rx=\"7\" ry=\"7\"/>\n  </g>\n</svg>";
            var x = xy[0], y = xy[1];
            var l = x + NP_PART_XOFF;
            var t = y + NP_PART_YOFF;
            var w = NP_PART_WIDTH;
            var h = NP_PART_HEIGHT;
            var img = pxsim.svg.elt("image");
            pxsim.svg.hydrate(img, {
                class: "sim-neopixel-strip", x: l, y: t, width: w, height: h,
                href: pxsim.svg.toDataUri(NEOPIXEL_PART_IMG)
            });
            return { el: img, x: l, y: t, w: w, h: h };
        }
        visuals.mkNeoPixelPart = mkNeoPixelPart;
        var NeoPixel = (function () {
            function NeoPixel(xy) {
                if (xy === void 0) { xy = [0, 0]; }
                var el = pxsim.svg.elt("rect");
                var r = PIXEL_RADIUS;
                var cx = xy[0], cy = xy[1];
                var y = cy - r;
                pxsim.svg.hydrate(el, { x: "-50%", y: y, width: "100%", height: r * 2, class: "sim-neopixel" });
                this.el = el;
                this.cy = cy;
            }
            NeoPixel.prototype.setRgb = function (rgb) {
                var hsl = visuals.rgbToHsl(rgb);
                var h = hsl[0], s = hsl[1], l = hsl[2];
                // at least 70% luminosity
                l = Math.max(l, 60);
                var fill = "hsl(" + h + ", " + s + "%, " + l + "%)";
                this.el.setAttribute("fill", fill);
            };
            return NeoPixel;
        }());
        visuals.NeoPixel = NeoPixel;
        var NeoPixelCanvas = (function () {
            function NeoPixelCanvas(pin) {
                this.pixels = [];
                this.pin = pin;
                var el = pxsim.svg.elt("svg");
                pxsim.svg.hydrate(el, {
                    "class": "sim-neopixel-canvas",
                    "x": "0px",
                    "y": "0px",
                    "width": CANVAS_WIDTH + "px",
                    "height": CANVAS_HEIGHT + "px",
                });
                this.canvas = el;
                this.background = pxsim.svg.child(el, "rect", { class: "sim-neopixel-background hidden" });
                this.updateViewBox(-CANVAS_VIEW_WIDTH / 2, 0, CANVAS_VIEW_WIDTH, CANVAS_VIEW_HEIGHT);
            }
            NeoPixelCanvas.prototype.updateViewBox = function (x, y, w, h) {
                this.viewBox = [x, y, w, h];
                pxsim.svg.hydrate(this.canvas, { "viewBox": x + " " + y + " " + w + " " + h });
                pxsim.svg.hydrate(this.background, { "x": x, "y": y, "width": w, "height": h });
            };
            NeoPixelCanvas.prototype.update = function (colors) {
                if (!colors || colors.length <= 0)
                    return;
                for (var i = 0; i < colors.length; i++) {
                    var pixel = this.pixels[i];
                    if (!pixel) {
                        var cxy = [0, CANVAS_VIEW_PADDING + i * PIXEL_SPACING];
                        pixel = this.pixels[i] = new NeoPixel(cxy);
                        pxsim.svg.hydrate(pixel.el, { title: "offset: " + i });
                        this.canvas.appendChild(pixel.el);
                    }
                    var color = colors[i];
                    pixel.setRgb(color);
                }
                //show the canvas if it's hidden
                pxsim.svg.removeClass(this.background, "hidden");
                //resize if necessary
                var _a = [this.pixels[0], this.pixels[this.pixels.length - 1]], first = _a[0], last = _a[1];
                var yDiff = last.cy - first.cy;
                var newH = yDiff + CANVAS_VIEW_PADDING * 2;
                var _b = this.viewBox, oldX = _b[0], oldY = _b[1], oldW = _b[2], oldH = _b[3];
                if (oldH < newH) {
                    var scalar = newH / oldH;
                    var newW = oldW * scalar;
                    this.updateViewBox(-newW / 2, oldY, newW, newH);
                }
            };
            NeoPixelCanvas.prototype.setLoc = function (xy) {
                var x = xy[0], y = xy[1];
                pxsim.svg.hydrate(this.canvas, { x: x, y: y });
            };
            return NeoPixelCanvas;
        }());
        visuals.NeoPixelCanvas = NeoPixelCanvas;
        ;
        function digitalPinToPinNumber(gpioPin) {
            var MICROBIT_ID_IO_P0 = 7; //TODO: don't hardcode this, import enums.d.ts
            if (gpioPin == "*") {
                return MICROBIT_ID_IO_P0;
            }
            var pinSplit = gpioPin.split("DigitalPin.P");
            pxsim.U.assert(pinSplit.length === 2, "Unknown format for pin (for NeoPixel): " + gpioPin);
            var pinNumStr = pinSplit[1];
            var pinNum = Number(pinNumStr) + MICROBIT_ID_IO_P0;
            return pinNum;
        }
        function parseNeoPixelMode(modeStr) {
            var modeMap = {
                "NeoPixelMode.RGB": pxsim.NeoPixelMode.RGB,
                "NeoPixelMode.RGBW": pxsim.NeoPixelMode.RGBW
            };
            return modeMap[modeStr] || pxsim.NeoPixelMode.RGB;
        }
        var NeoPixelView = (function () {
            function NeoPixelView() {
                this.style = "\n            .sim-neopixel-canvas {\n            }\n            .sim-neopixel-canvas-parent:hover {\n                transform-origin: center;\n                transform: scale(4) translateY(-60px);\n                -moz-transform: scale(4) translateY(-220px);\n            }\n            .sim-neopixel-canvas .hidden {\n                visibility:hidden;\n            }\n            .sim-neopixel-background {\n                fill: rgba(255,255,255,0.9);\n            }\n            .sim-neopixel-strip {\n            }\n        ";
            }
            NeoPixelView.prototype.init = function (bus, state, svgEl, otherParams) {
                pxsim.U.assert(!!otherParams["mode"], "NeoPixels assumes a RGB vs RGBW mode is passed to it");
                pxsim.U.assert(!!otherParams["pin"], "NeoPixels assumes a pin is passed to it");
                var modeStr = otherParams["mode"];
                this.mode = parseNeoPixelMode(modeStr);
                this.state = state;
                this.stripGroup = pxsim.svg.elt("g");
                this.element = this.stripGroup;
                var pinStr = otherParams["pin"];
                this.pin = digitalPinToPinNumber(pinStr);
                this.lastLocation = [0, 0];
                var part = mkNeoPixelPart();
                this.part = part;
                this.stripGroup.appendChild(part.el);
                var canvas = new NeoPixelCanvas(this.pin);
                this.canvas = canvas;
                var canvasG = pxsim.svg.elt("g", { class: "sim-neopixel-canvas-parent" });
                this.overElement = canvasG;
                canvasG.appendChild(canvas.canvas);
                this.updateStripLoc();
            };
            NeoPixelView.prototype.moveToCoord = function (xy) {
                var x = xy[0], y = xy[1];
                var loc = [x, y];
                this.lastLocation = loc;
                this.updateStripLoc();
            };
            NeoPixelView.prototype.updateStripLoc = function () {
                var _a = this.lastLocation, x = _a[0], y = _a[1];
                pxsim.U.assert(typeof x === "number" && typeof y === "number", "invalid x,y for NeoPixel strip");
                this.canvas.setLoc([x + CANVAS_LEFT, y + CANVAS_TOP]);
                pxsim.svg.hydrate(this.part.el, { transform: "translate(" + x + " " + y + ")" }); //TODO: update part's l,h, etc.
            };
            NeoPixelView.prototype.updateState = function () {
                var colors = this.state.getColors(this.pin, this.mode);
                this.canvas.update(colors);
            };
            NeoPixelView.prototype.updateTheme = function () { };
            return NeoPixelView;
        }());
        visuals.NeoPixelView = NeoPixelView;
    })(visuals = pxsim.visuals || (pxsim.visuals = {}));
})(pxsim || (pxsim = {}));
