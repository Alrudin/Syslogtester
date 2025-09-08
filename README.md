# Syslog-ng Tester System

This project provides a Docker-based system for testing syslog-ng configurations. It consists of two main components:

- **Tester**: Runs syslog-ng with a configurable setup, listening on one or more ports for syslog messages.
- **Sender**: A web-based tool (React + Tailwind CSS) for sending syslog messages to the tester on one or more ports, with configurable facility, protocol (TCP/UDP), and message content.

## Features
- Test syslog-ng with both TCP and UDP transports.
- Send to multiple ports at once.
- Choose syslog facility and message content.
- Modern web UI for easy testing.

## Quick Start

### Prerequisites
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

### 1. Clone the repository
```
git clone <this-repo-url>
cd syslogtester-web
```

### 2. Build and start the system
```
docker compose up --build
```
This will build both the `tester` and `sender` images, including the React frontend for the sender.

### 3. Access the Sender Web UI
Open your browser and go to:
```
http://localhost:8080
```

### 4. Usage
- Enter the syslog-ng tester host (default: `tester` if using Docker Compose).
- Enter one or more ports (comma separated, e.g. `514,5514`).
- Select the transport protocol (TCP or UDP).
- Choose the syslog facility.
- Enter your test message.
- Click **Send**. The message will be sent to all specified ports.

### 5. View Received Logs
- Syslog-ng logs are written to `/var/log/syslog-ng/messages.log` inside the tester container.
- To view logs:
  ```
  docker exec -it syslog-tester tail -f /var/log/syslog-ng/messages.log
  ```

## Customization
- Edit `tester/syslog-ng.conf` to change syslog-ng configuration.
- Edit the sender React app in `sender/frontend` for UI changes.

## Troubleshooting
- Ensure ports in the syslog-ng config and the sender UI match.
- Use `docker logs syslog-tester` to check for syslog-ng errors.
- Use `tcpdump` or similar tools to verify network traffic if needed.

## License
MIT
