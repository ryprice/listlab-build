var fs = require('fs');

fs.createReadStream('package.json').pipe(fs.createWriteStream('lib/package.json'))
