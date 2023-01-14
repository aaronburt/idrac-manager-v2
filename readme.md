# IDRAC Express Server
This is an express server that allows you to interact with the IDRAC of your Dell servers.


## Run from Docker (Recommended)
```
docker run -p 8080:8080 -e idrac_hostname=<hostname or ip> -e idrac_username=<username> -e idrac_password=<password> -d mrburtuk/idrac_manager_v2
```

```
-p 8080:8080: Maps port 8080 on the host to port 8080 on the container. This allows you to access the application running in the container on port 8080 on your host machine.

-e idrac_hostname=<hostname or ip>: sets environment variable idrac_hostname to the provided value of <hostname or ip>

-e idrac_username=<username>: sets environment variable idrac_username to the provided value of <username>

-e idrac_password=<password>: sets environment variable idrac_password to the provided value of <password>

-d : run the container in detached mode, allowing the container to run in the background.
```

Make sure to replace <hostname or ip>, <username>, and <password> with the appropriate values for your use case.




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