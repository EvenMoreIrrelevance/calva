const { createWriteStream } = require('fs');
const { https } = require('follow-redirects');

const clojureLspVersion = '2021.02.02-14.02.23';
const fileName = "./clojure-lsp.jar"

const file = createWriteStream(fileName);

https.get({
    host: 'github.com',
    port: 443,
    path: `/clojure-lsp/clojure-lsp/releases/download/${clojureLspVersion}/clojure-lsp.jar`
}, function (res) {
    res.on('data', function (data) {
        file.write(data);
    }).on('end', function () {
        file.end();
        console.log(fileName + ' downloaded');
    });
});
