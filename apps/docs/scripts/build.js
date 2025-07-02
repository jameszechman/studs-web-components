const { exec } = require('child_process')

exec(`node scripts/make-metadata.js --outdir "${dir}"`, { stdio: 'inherit' });