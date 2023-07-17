const {MongoClient} = require("mongodb")

const cluster = new MongoClient(process.env.mongoKet)
const db = cluster.db(process.env.database_name)
export const karaokeAct = db.collection("karaokeAct")
export const poemAct = db.collection("activitypoems")
export const artAct = db.collection("activityarte")
