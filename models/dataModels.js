const {InfluxDB, Point} = require("@influxdata/influxdb-client")
const {hostname, type} = require("node:os")
const {OrgsAPI, BucketsAPI} = require("@influxdata/influxdb-client-apis")
const {
  influxDBCon: {url, token, org, bucket},
} = require("../config/forInfluxDb")

const influxDB = new InfluxDB({url, token})
let writeApi = influxDB.getWriteApi(org, bucket)
writeApi.useDefaultTags({location: hostname()})

async function checkOrganizationAndBucket(orgName, bucketName) {
  try {
    const orgsAPI = new OrgsAPI(influxDB)
    const organizations = await orgsAPI.getOrgs()

    const organization = organizations.orgs.find((o) => o.name === orgName)
    if (!organization) {
      console.error(`Organization "${orgName}" does not exist.`)
      return
    }

    const orgID = organization.id

    // Get buckets in the organization
    const bucketsAPI = new BucketsAPI(influxDB)
    const {buckets} = await bucketsAPI.getBuckets({orgID, name: bucketName})
    if (buckets) {
      console.log(`Bucket "${bucketName}" exists in "${orgName}".`)
    } else {
      console.log(`Bucket "${bucketName}" not exist in "${orgName}".`)
    }
  } catch (e) {
    console.error("Error:", e)
  }
}

const saveData = async (videoData) => {
  try {
    const point = new Point("vediotable")
      .tag("videoTime", videoData.videoTime)
      .tag("videoId", videoData.videoId)
      .tag("userId", videoData.userId)
      .tag("state", videoData.state)
      .floatField("durationInSec", videoData.durationInSec)
      .timestamp(new Date())
    writeApi.writePoint(point)
    writeApi.flush()
    
    return true
  } catch (error) {
    console.error("Error writing data:", error)
    return false
  }
}

const getData = async () => {
  try {
    const queryApi = new InfluxDB({url, token}).getQueryApi(org)
    const results = []
    const fluxQuery = `
    from(bucket: "${bucket}")
      |> range(start: -3d)
      |> filter(fn: (r) => r["_measurement"] == "vediotable")
      |> limit(n: 1000)
  `

    for await (const {values, tableMeta} of queryApi.iterateRows(fluxQuery)) {
      const o = tableMeta.toObject(values)
      results.push(o)
    }
    return results
  } catch (error) {
    console.error("Error retrieving data:", error)
    throw error
  }
}

module.exports = {
  saveData,
  getData,
  checkOrganizationAndBucket,
}
