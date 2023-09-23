const {InfluxDB, Point} = require('@influxdata/influxdb-client');
const {
  influxDBCon: {url, token, org, bucket},
} = require('../config/forInfluxDb');

const influxDB = new InfluxDB({url, token});
const writeApi = influxDB.getWriteApi(org, bucket);

const saveData = (data) => {
  const point = new Point('video_metrics')
    .tag('source', data.source)
    .tag('requiressl', data.requiressl)
    .tag('mime', data.mime)
    .tag('c', data.c)
    .intField('expire', data.expire)
    .stringField('ei', data.ei)
    .stringField('ip', data.ip)
    .stringField('id', data.id)
    .intField('itag', data.itag)
    .stringField('aitags', data.aitags)
    .tag('mh', data.mh)
    .stringField('mm', data.mm)
    .stringField('mn', data.mn)
    .stringField('ms', data.ms)
    .tag('mv', data.mv)
    .intField('mvi', data.mvi)
    .tag('pcm2cms', data.pcm2cms)
    .intField('pl', data.pl)
    .intField('initcwndbps', data.initcwndbps)
    .intField('siu', data.siu)
    .stringField('spc', data.spc)
    .intField('vprv', data.vprv)
    .intField('svpuc', data.svpuc)
    .tag('ns', data.ns)
    .tag('gir', data.gir)
    .intField('clen', data.clen)
    .floatField('dur', data.dur)
    .intField('lmt', data.lmt)
    .intField('mt', data.mt)
    .intField('fvip', data.fvip)
    .tag('keepalive', data.keepalive)
    .intField('fexp', data.fexp)
    .tag('c', data.c)
    .intField('txp', data.txp)
    .stringField('n', data.n)
    .tag('sparams', data.sparams)
    .stringField('sig', data.sig)
    .stringField('lsparams', data.lsparams)
    .stringField('lsig', data.lsig)
    .tag('alr', data.alr)
    .stringField('cpn', data.cpn)
    .stringField('cver', data.cver)
    .stringField('range', data.range)
    .intField('rn', data.rn)
    .intField('rbuf', data.rbuf)
    .stringField('pot', data.pot);

  writeApi.writePoint(point);
  // writeApi.close();
};

const getData = async () => {
  try {
    const queryApi = new InfluxDB({url, token}).getQueryApi(org);
    const fluxQuery = `
      from(bucket: "${bucket}")
        |> range(start: -1h)
        |> limit(n: 2000)  // Query 1000 records
    `;

    const results = [];

    // Execute the query and log results here
    for await (const {values, tableMeta} of queryApi.iterateRows(fluxQuery)) {
      const o = tableMeta.toObject(values);
      results.push(o);
    }
    return results;
  } catch (error) {
    console.error('Error retrieving data:', error);
    throw error;
  }
};

module.exports = {
  saveData,
  getData,
};
