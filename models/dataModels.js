// models/dataModel.js
const { InfluxDB, Point } = require('@influxdata/influxdb-client');
const { url, token, org, bucket } = require('../config');

const influxDB = new InfluxDB({ url, token });
const writeApi = influxDB.getWriteApi(org, bucket);

// Define your model functions here
const saveData = (data) => {
  const point = new Point('video_metrics') // Measurement name: 'video_metrics'
    .tag('source', data.source) // e.g., 'youtube'
    .tag('requiressl', data.requiressl) // e.g., 'yes'
    .tag('mime', data.mime) // e.g., 'video/webm'
    .tag('c', data.c) // e.g., 'WEB'
    .intField('expire', data.expire) // e.g., 1695469327 (integer)
    .stringField('ei', data.ei) // e.g., 'r3oOZaG9JoWWx_APv5C2-Ag'
    .stringField('ip', data.ip) // e.g., '223.123.86.172'
    .stringField('id', data.id) // e.g., 'o-AArtom6VW-ce9qkViG8DQHePU7PyPkB_W7Ebys5fywzB'
    .intField('itag', data.itag) // e.g., 302 (integer)
    .stringField('aitags', data.aitags) // e.g., '133,134,135,136,160,242,243,244,247,278,298,299,302,303'
    .tag('mh', data.mh) // e.g., 'uR'
    .stringField('mm', data.mm) // e.g., '31,29'
    .stringField('mn', data.mn) // e.g., 'sn-1vob-pncs,sn-4g5e6nsd'
    .stringField('ms', data.ms) // e.g., 'au,rdu'
    .tag('mv', data.mv) // e.g., 'm'
    .intField('mvi', data.mvi) // e.g., 2 (integer)
    .tag('pcm2cms', data.pcm2cms) // e.g., 'yes'
    .intField('pl', data.pl) // e.g., 24 (integer)
    .intField('initcwndbps', data.initcwndbps) // e.g., 217500 (integer)
    .intField('siu', data.siu) // e.g., 1 (integer)
    .stringField('spc', data.spc) // e.g., 'UWF9f0Sl7wLNO-d3A-U72he1NZJw05vkh7ym7uP-KdAhsO-G4Okc9Q4'
    .intField('vprv', data.vprv) // e.g., 1 (integer)
    .intField('svpuc', data.svpuc) // e.g., 1 (integer)
    .tag('ns', data.ns) // e.g., '_umtTOzybArHn6K3w1VpJTMP'
    .tag('gir', data.gir) // e.g., 'yes'
    .intField('clen', data.clen) // e.g., 59394827 (integer)
    .floatField('dur', data.dur) // e.g., 281.797 (float)
    .intField('lmt', data.lmt) // e.g., 1643393432580560 (integer)
    .intField('mt', data.mt) // e.g., 1695447436 (integer)
    .intField('fvip', data.fvip) // e.g., 5 (integer)
    .tag('keepalive', data.keepalive) // e.g., 'yes'
    .intField('fexp', data.fexp) // e.g., 24007246 (integer)
    .tag('c', data.c) // e.g., 'WEB'
    .intField('txp', data.txp) // e.g., 5432434 (integer)
    .stringField('n', data.n) // e.g., 'CaSUc8WEOEX8Og'
    .tag('sparams', data.sparams) // e.g., 'expire,ei,ip,id,aitags,source,requiressl,siu,spc,vprv,svpuc,mime,ns,gir,clen,dur,lmt'
    .stringField('sig', data.sig) // e.g., 'AOq0QJ8wRgIhAMEbr9xDk0v5_D1fBoVfGvQuaQZy-tHGqP1sPNqcXQDRAiEAvUWnslL1_l5Gvy2rphGtimVygWcN6vEiWHEzWwPCjhc='
    .stringField('lsparams', data.lsparams) // e.g., 'mh,mm,mn,ms,mv,mvi,pcm2cms,pl,initcwndbps'
    .stringField('lsig', data.lsig) // e.g., 'AG3C_xAwRQIhAN8AsgU1jUw90g9eRKUJdTFRo5QLyO-YHHV9bksHpY8MAiBLs6Zba4Pob7EcCG5JHdjRE_ZnzQ6vGyt5l5pQ1d1eLw=='
    .tag('alr', data.alr) // e.g., 'yes'
    .stringField('cpn', data.cpn) // e.g., 'R7g9qXIJpiy6aIor'
    .stringField('cver', data.cver) // e.g., '2.20230921.04.01'
    .stringField('range', data.range) // e.g., '6520639-8608482'
    .intField('rn', data.rn) // e.g., 11 (integer)
    .intField('rbuf', data.rbuf) // e.g., 19084 (integer)
    .stringField('pot', data.pot); // e.g., 'Mluligt5F9QtPaWyeN0UY4zNRQIsRSp-yy7cpvxTnTcdmL5z1jlVgX-ubYqlpF8w2VVC4xNjfdmB0KR2npp93vNwlF-NoUq4kSvcTWqsBcEZJr3okIRVycfwus5B'

  writeApi.writePoint(point);
  writeApi.close();
};

module.exports = {
  saveData,
};

