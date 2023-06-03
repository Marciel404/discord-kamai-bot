const { MongoClient } = require("mongodb")
const cluster = new MongoClient(process.env.mongoKet)
const db = cluster.db("IVM")
const cargosReg = db.collection("configReg")

module.exports = {

    addCargoReg(guild, cargo, name, categoria) {
        cargosReg.updateOne(
            {_id: guild.id}, 
            {$set: { 
                    [`${categoria}.${name}`]: {
                        name: name,
                        cargo_id: cargo.id
                    }
                }
            },
            {upsert: true}
        )
    }

}