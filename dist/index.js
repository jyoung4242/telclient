import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
var TelConnection;
(function (TelConnection) {
    TelConnection["connected"] = "connected";
    TelConnection["unconnected"] = "unconnected";
})(TelConnection || (TelConnection = {}));
export class TelClient {
    telstatus;
    socketClient;
    port;
    verbose;
    glID;
    constructor(config) {
        this.port = config.serverport;
        this.verbose = config.verbose;
        this.telstatus = TelConnection.unconnected;
        this.socketClient = new SocketClient(this.port);
        this.glID = "";
        if (this.verbose)
            console.log(`*************************`);
        if (this.verbose)
            console.log(`Starting Telemetry Client`);
        if (this.verbose)
            console.log(`*************************`);
        if (this.verbose)
            console.log(`Client connecting to ${this.port}`);
    }
    create(serverport, verbose = false) {
        return new TelClient({
            serverport,
            verbose,
        });
    }
    sendTelemetry(data) {
        this.setConnectionStatus();
        if (this.telstatus == TelConnection.connected) {
            if (this.verbose)
                console.log(`Sending Data: ${data}`);
            this.socketClient.sendMessage(data);
        }
        else {
            if (this.verbose)
                console.log(`Tel Server not connected`);
        }
    }
    configureGameLoopID() {
        if (this.glID == "")
            this.glID = uuidv4();
        return this.glID;
    }
    setConnectionStatus() {
        if (this.socketClient.getConnectionStatus())
            this.telstatus = TelConnection.connected;
        else
            this.telstatus = TelConnection.unconnected;
    }
    async gameLoopWithTelemetry(glCallback) {
        let firsttime, secondtime, id;
        if (this.glID == "")
            this.configureGameLoopID();
        this.sendTelemetry({
            methodName: "gameloop enter",
            id: this.glID,
            ts: (firsttime = performance.now()),
        });
        await glCallback();
        this.sendTelemetry({
            methodName: "gameloop exit",
            id: this.glID,
            ts: (secondtime = performance.now()),
            duration: +(secondtime - firsttime).toFixed(2),
        });
    }
    async durationWithTelemetry(data) {
        let firsttime, secondtime, id;
        let useGLID = data.useGLID ? true : false;
        id = uuidv4();
        if (useGLID && this.glID != "") {
            this.sendTelemetry({
                methodName: data.label,
                type: "enter",
                id,
                gameloopID: this.glID,
                ts: (firsttime = performance.now()),
            });
        }
        else {
            this.sendTelemetry({
                methodName: data.label,
                type: "enter",
                id,
                ts: (firsttime = performance.now()),
            });
        }
        await data.callback();
        if (useGLID && this.glID != "") {
            this.sendTelemetry({
                methodName: data.label,
                id,
                type: "exit",
                gameloopID: this.glID,
                ts: (secondtime = performance.now()),
                duration: +(secondtime - firsttime).toFixed(2),
            });
        }
        else {
            this.sendTelemetry({
                methodName: data.label,
                type: "exit",
                id,
                ts: (firsttime = performance.now()),
            });
        }
    }
    logUserDefinedEventWithTelemetry(data) {
        this.sendTelemetry({
            methodName: data.label,
            type: "userDefinedEvent",
            id: uuidv4(),
            payload: [...data.payload],
            ts: performance.now(),
        });
    }
    logUserInputWithTelemetry(data) {
        this.sendTelemetry({
            methodName: data.label,
            type: "userInputEvent",
            eventType: data.inputType,
            eventName: data.eventName,
            id: uuidv4(),
            payload: [...data.inputData],
            ts: performance.now(),
        });
    }
    logGameStateWithTelemetry(data) {
        this.sendTelemetry({
            type: "gameState",
            id: uuidv4(),
            state: data.state,
            ts: performance.now(),
        });
    }
    logEntityEvent(data) {
        this.sendTelemetry({
            type: "entityEvent",
            id: uuidv4(),
            entity: data.entitydata,
            event: data.eventdata,
            ts: performance.now(),
        });
    }
    logErrorEvent(data) {
        this.sendTelemetry({
            type: "errorEvent",
            id: uuidv4(),
            payload: [...data.payload],
            ts: performance.now(),
        });
    }
}
class SocketClient {
    socket;
    socketStatus = false;
    constructor(port) {
        this.socket = io(`http://localhost:${port}`); // Connect to the Socket.io server
        this.setupEventListeners();
    }
    setupEventListeners() {
        this.socket.on("connect", () => { });
        this.socket.on("acknowledgment", () => {
            this.socketStatus = true;
        });
        this.socket.on("disconnect", () => {
            this.socketStatus = false;
        });
    }
    getConnectionStatus() {
        return this.socketStatus;
    }
    sendMessage(message) {
        this.socket.emit("datasend", JSON.stringify(message));
    }
}
