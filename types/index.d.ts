type clientConfig = {
    serverport: number;
    verbose: boolean;
};
type UserDefinedTelData = {
    label: string;
    payload: any[];
};
type UserInputTelData = {
    inputType: "Keyboard" | "Mouse" | "Touch" | "Gamepad";
    label: string;
    eventName: string;
    inputData: any[];
};
type GameStateTelData = {
    state: any;
};
type EntityEventTelData = {
    entitydata: any;
    eventdata: any;
};
type ErrorEventTelData = {
    errorMessage: string;
    payload: any[];
};
type DurationTelData = {
    label: string;
    callback: Function;
    useGLID?: boolean;
};
declare enum TelConnection {
    connected = "connected",
    unconnected = "unconnected"
}
export declare class TelClient {
    telstatus: TelConnection;
    socketClient: SocketClient;
    port: number;
    verbose: boolean;
    glID: string;
    constructor(config: clientConfig);
    create(serverport: number, verbose?: boolean): TelClient;
    sendTelemetry(data: any): void;
    configureGameLoopID(): string;
    setConnectionStatus(): void;
    gameLoopWithTelemetry(glCallback: Function): Promise<void>;
    durationWithTelemetry(data: DurationTelData): Promise<void>;
    logUserDefinedEventWithTelemetry(data: UserDefinedTelData): void;
    logUserInputWithTelemetry(data: UserInputTelData): void;
    logGameStateWithTelemetry(data: GameStateTelData): void;
    logEntityEvent(data: EntityEventTelData): void;
    logErrorEvent(data: ErrorEventTelData): void;
}
declare class SocketClient {
    private socket;
    socketStatus: boolean;
    constructor(port: number);
    private setupEventListeners;
    getConnectionStatus(): boolean;
    sendMessage(message: string): void;
}
export {};
