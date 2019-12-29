const {PingRequest} = require('./ping_pb.js');
const {CoreServiceClient} = require('./ping_grpc_web_pb.js');
var AsyncLock = require('async-lock');
// var sleep = require('sleep');
var sleep = require('system-sleep');


var lock = new AsyncLock();
global.XMLHttpRequest = require('xhr2');

var client = new CoreServiceClient('http://' + "localhost" + ':8080', null, null);
var counter = 0;
var total = 5000;

// simple unary call
var start = Math.floor(Date.now());
var request = new PingRequest();
request.setTimestamp(123);

for (var i=0;i<total;i++) {
    const curI = i;
    client.ping(request, {}, (err, response) => {
        if (err) {
            console.log(err)
            return;  
        } 

        console.log("idx="+ curI+" curTime= " + (Math.floor(Date.now() ) - start));
    });
    if (i % 5 == 0 && i > 0 ) {
        sleep(10);
    }
}

// while (counter < total ) {
//     // sleep.msleep(1000);
//     console.log(Math.floor(Date.now() / 1000) - start)
//     sleep(5000);
// }



