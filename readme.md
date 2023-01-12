# IDRAC Express Server
This is an express server that allows you to interact with the IDRAC of your Dell servers.

## Installation
1. Clone the repository
2. Build this docker image using a command like (docker build -t idrac .)
3. Run the container making sure to set these envs. `idrac_hostname`, `idrac_username`, `idrac_password` and optionally `debug`

## Available Routes
- `GET /status`: Returns the online status of the IDRAC.
- `GET /shutdown`: Shuts down the server.
- `GET /fanspeed/:speed`: Changes the fan speed. Speed must be between 0 and 100.
- `GET /startup`: Starts up the server.

## Note
Make sure the IDRAC is accessible over the network and that the ports are open.