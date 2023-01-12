# IDRAC Express Server
This is an express server that allows you to interact with the IDRAC of your Dell servers.

## Installation
1. Clone the repository
2. Run `npm install`
3. Set the environment variables `idrac_hostname`, `idrac_username`, `idrac_password` and `debug`.
    - `idrac_hostname`: The hostname or IP address of the IDRAC.
    - `idrac_username`: The username to login to the IDRAC.
    - `idrac_password`: The password to login to the IDRAC.
    - `debug`: Whether to show error messages to the client or not.
4. Run `npm start`

## Available Routes
- `GET /status`: Returns the online status of the IDRAC.
- `GET /shutdown`: Shuts down the server.
- `GET /fanspeed/:speed`: Changes the fan speed. Speed must be between 0 and 100.
- `GET /startup`: Starts up the server.

## Note
Make sure the IDRAC is accessible over the network and that the ports are open.