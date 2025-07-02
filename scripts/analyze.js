const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const UI = require('../packages/ui/package.json');

const dir = path.join(__dirname, '../apps/docs/versioned_components', UI.version);

const command = () => exec(`wca analyze packages/ui/src/components --format json --outFiles ${dir}/custom-element.json`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    if(stderr) console.error(`stderr: ${stderr}`);
  });

fs.access(dir, fs.constants.F_OK, (err) => {
  if (!err) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Directory already exists. Do you want to overwrite it? (yes/no) ', (answer) => {
      rl.close();

      if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
        // Overwrite the directory
        // You might want to delete the directory first before creating a new one
        fs.rm(dir, { recursive: true }, (err) => {
          if (err) throw err;

          fs.mkdir(dir, { recursive: true }, (err) => {
            if (err) throw err;
            command();
          });
        });
      } else {
        console.log('Quitting...');
        process.exit(1);
      }
    });
  } else {
    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) throw err;
      command()
      });
    }
  });

// console.log(UI.version);

// exec('wca analyze', (error, stdout, stderr) => {
//     if (error) {
//       console.error(`exec error: ${error}`);
//       return;
//     }
//     console.log(`stdout: ${stdout}`);
//     if(stderr) console.error(`stderr: ${stderr}`);
//   });