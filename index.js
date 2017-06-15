const readline = require('readline');
const deepstream = require('deepstream.io-client-js');
const client = deepstream(`${process.env.DSIO || localhost}:6020`);

const channel = 'driver/thisisdriverid';
const subscription = 'status';

let ds;

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

r1.on('line', (input) => {
  ds.set(subscription, { input: input });
});

client.on('connectionStateChanged', (state) => {
  console.log(state);
});

client.on('error', (err, event, topic) => {
  console.log(err, event, topic);
});

client.login(/*{ username: 'john', password: 'doe' },*/ (success, data) => {
  if (success)
    console.log('success');
  else
    console.log(data);

  ds = client.record.getRecord(channel);
  ds.subscribe(subscription, update);
});

function update(a) {
  console.log('Received:', a);
}
