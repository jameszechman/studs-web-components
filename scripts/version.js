const { exec } = require('child_process');
const fs = require('fs');
const { spawn } = require('child_process');
const path = require('path');

function runCommand(command) {
    return new Promise((resolve, reject) => {
        const [cmd, ...args] = command.split(' ');
        const child = spawn(cmd, args, { stdio: 'inherit' });

        child.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`${command} exited with code ${code}`));
            } else {
                resolve();
            }
        });
    });
}

function getPackageVersion() {
    const packageJsonPath = path.join(__dirname, '../packages/ui/package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    return packageJson.version;
}

runCommand('pnpm changeset')
    .then(() => runCommand('pnpm changeset-version'))
    .then(() => runCommand('pnpm analyze'))
    .then(() => {
        const version = getPackageVersion();
        const command = exec(`cd apps/docs && pnpm docusaurus docs:version ${version}`, (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }
            console.log(`stdout: ${stdout}`);
            if(stderr) console.error(`stderr: ${stderr}`);
          });
        return command;
    })
    .catch(console.error);