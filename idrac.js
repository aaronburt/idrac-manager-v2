import { promisify } from 'util';
import { exec } from 'child_process';
const promisedExec = promisify(exec);
class IDRAC {
    constructor(hostname, username, password) {
        this.hostname = '';
        this.username = '';
        this.password = '';
        this.ipmiStarter = '';
        Object.assign(this, { hostname, username, password });
        this.ipmiStarter = `ipmitool -H ${this.hostname} -I lanplus -U ${this.username} -P ${this.password}`;
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async status() {
        try {
            console.log(`Running: ${this.ipmiStarter} chassis power status`);
            const idracStatus = await this.run(`${this.ipmiStarter} chassis power status`);
            if (idracStatus?.includes('on'))
                return true;
            return false;
        }
        catch (err) {
            console.log(err);
        }
    }
    async fanspeed(speed) {
        try {
            console.log(`Running: ${this.ipmiStarter} raw 0x30 0x30 0x02 0xff 0x${speed.toString(16)}`);
            await this.run(`${this.ipmiStarter} sel clear`);
            await this.run(`${this.ipmiStarter} raw 0x30 0x30 0x01 0x00`);
            await this.run(`${this.ipmiStarter} raw 0x30 0x30 0x02 0xff 0x${speed.toString(16)}`);
        }
        catch (err) {
            console.log(err);
        }
    }
    async startup() {
        try {
            console.log(`Running: ${this.ipmiStarter} chassis power on`);
            await this.run(`${this.ipmiStarter} chassis power on`);
        }
        catch (err) {
            console.log(err);
        }
    }
    async shutdown() {
        try {
            await this.run(`${this.ipmiStarter} chassis power off`);
        }
        catch (err) {
            console.log(err);
        }
    }
    async run(command) {
        try {
            const { stdout, stderr } = await promisedExec(command);
            if (stderr)
                throw new Error(stderr);
            return stdout;
        }
        catch (err) {
            console.log(err);
        }
    }
}
export default IDRAC;
