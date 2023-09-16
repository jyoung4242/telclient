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

const client = new TelClient(config);

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
