import { promisify } from 'util';
import { exec } from 'child_process';
const promisedExec = promisify(exec);

class IDRAC {
    public hostname: string = '';
    public username: string = '';
    public password: string = '';
    public ipmiStarter: string = '';

    constructor(hostname: string, username: string, password: string){
        Object.assign(this, { hostname, username, password });
        this.ipmiStarter = `ipmitool -H ${this.hostname} -I lanplus -U ${this.username} -P ${this.password}`;
    }

    sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async status(){
        try {
            console.log(`Running: ${this.ipmiStarter} chassis power status`)
            const idracStatus = await this.run(`${this.ipmiStarter} chassis power status`);
            if(idracStatus?.includes('on')) return true;
            return false;
        } catch(err: any){
            console.log(err);
        }
    }

    async fanspeed(speed: number){
        try {
            console.log(`Running: ${this.ipmiStarter} raw 0x30 0x30 0x02 0xff 0x${speed.toString(16)}`)
            await this.run(`${this.ipmiStarter} sel clear`);
            await this.run(`${this.ipmiStarter} raw 0x30 0x30 0x01 0x00`);
            await this.run(`${this.ipmiStarter} raw 0x30 0x30 0x02 0xff 0x${speed.toString(16)}`);
        } catch(err: any){
            console.log(err);
        }
    }

    async startup(){
        try {
            console.log(`Running: ${this.ipmiStarter} chassis power on`);
            await this.run(`${this.ipmiStarter} chassis power on`);
        } catch(err: any){
            console.log(err);
        }
    }

    async shutdown(){
        try {
            await this.run(`${this.ipmiStarter} chassis power off`);
        } catch(err: any){
            console.log(err);
        }
    }

    async run(command: string){
        try {
            const { stdout, stderr } = await promisedExec(command);
            if(stderr) throw new Error(stderr);
            return stdout;
        } catch(err: any){
            console.log(err);
        }
    }
}

export default IDRAC;