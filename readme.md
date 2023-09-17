# Telemetry (Tel) Client

The Telemetry (Tel) Client is a TypeScript library designed for handling telemetry data and communicating it to a server using
Socket.io. This library provides various methods for sending different types of telemetry data, making it suitable for game development
and other real-time monitoring applications.

## Features

- Send telemetry data of various types to a remote server.
- Monitor game loops, durations, user-defined events, user input events, game state, entity events, and error events.
- Establish a Socket.io connection to the server for real-time communication.
- Keep track of the connection status with the server.

## Getting Started

### Installation

To use the Telemetry Client in your project, you can install it via npm:

```bash
npm install telclient
```

## Usage

Here's a basic example of how to use the Telemetry Client:

```ts
import { TelClient, DurationTelData } from "telemetry-client";

const config = {
  serverport: 8080, // Replace with your server's port
  verbose: true, // Enable verbose logging
};

const client = TelClient.create();

// Send a duration telemetry event
const durationData: DurationTelData = {
  label: "MyDurationEvent",
  callback: () => {
    // Your duration event logic here
  },
};

client.durationWithTelemetry(durationData);

// You can use other telemetry methods for different event types.
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Dependencies

Socket.io & UUID

## Contact

If you have any questions or need further assistance, feel free to contact the project maintainers:

Mookie @ GameDevShift discord server https://discord.gg/6jSNaJBY

Twitter - @jyoung424242

Itch.io - https://mookie4242.itch.io/

# API Documentation

## TelClient Class

The TelClient class represents a telemetry client for sending various types of telemetry data to a remote server using Socket.io. This
class provides methods for handling game loops, durations, user-defined events, user input events, game state, entity events, and error
events.

## Table of Contents

### Methods

- create
- gameLoopWithTelemetry
- durationWithTelemetry
- logUserDefinedEventWithTelemetry
- logUserInputWithTelemetry
- logGameStateWithTelemetry
- logEntityEvent
- logErrorEvent

## Methods

### create(serverport: number, verbose?: boolean): TelClient

Static method to create a new TelClient instance.

Parameters:

serverport (number): The port number of the Socket.io server. verbose (boolean, optional): Enable verbose logging (default: false).
Returns:

TelClient: A new instance of the TelClient class.

Example:

```ts
client = TelClient.create(8080, true);
```

### gameLoopWithTelemetry(glCallback: Function): Promise<void>

Logs the start and end of a game loop and sends duration telemetry data.

Parameters:

glCallback (Function): The game loop function to be executed.

Example:

```ts
async function gameLoop() {
  // Your game loop logic here
}

await client.gameLoopWithTelemetry(gameLoop);
```

### durationWithTelemetry(data: DurationTelData): Promise<void>

Logs the start and end of a duration event and sends duration telemetry data.

Parameters:

data (DurationTelData): Configuration for the duration event.

Example:

```ts
const durationData = {
  label: "DurationEvent",
  callback: async () => {
    // Your duration event logic here
  },
};
await client.durationWithTelemetry(durationData);
```

### logUserDefinedEventWithTelemetry(data: UserDefinedTelData): void

Logs a user-defined event and sends telemetry data.

Parameters:

data (UserDefinedTelData): Configuration for the user-defined event.

Example:

```ts
const userData = { label: "UserEvent", payload: ["data1", "data2"] };
client.logUserDefinedEventWithTelemetry(userData);
```

### logUserInputWithTelemetry(data: UserInputTelData): void

Logs a user input event and

sends telemetry data.

Parameters:

data (UserInputTelData): Configuration for the user input event.

Example:

```ts
const userInputData = { inputType: "Keyboard", label: "KeyPress", eventName: "KeyA", inputData: ["keyCode", "timestamp"] };
client.logUserInputWithTelemetry(userInputData);
```

### logGameStateWithTelemetry(data: GameStateTelData): void

Logs a game state event and sends telemetry data.

Parameters:

data (GameStateTelData): Configuration for the game state event.

Example:

```ts
typescript Copy code const gameStateData = { state: { playerHealth: 100, score: 500 } };
client.logGameStateWithTelemetry(gameStateData);
```

### logEntityEvent(data: EntityEventTelData): void

Logs an entity event and sends telemetry data.

Parameters:

data (EntityEventTelData): Configuration for the entity event.

Example:

```ts
const entityEventData = {
  entitydata: { entityID: 1, entityType: "Enemy" },
  eventdata: { action: "Destroy", location: { x: 10, y: 20 } },
};

client.logEntityEvent(entityEventData);
```

### logErrorEvent(data: ErrorEventTelData): void

Logs an error event and sends telemetry data.

Parameters:

data (ErrorEventTelData): Configuration for the error event.

Example:

```ts
const errorEventData = { errorMessage: "An error occurred", payload: ["details"] };
client.logErrorEvent(errorEventData);
```
