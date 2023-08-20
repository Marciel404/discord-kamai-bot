var options = {
    db_name: "",
}

import { JsonDB, Config } from "node-json-db";

class gamesDb {

    dbGames: JsonDB = new JsonDB(new Config(options.db_name, true, true))

    async adcQuestion(game: String, array: any) {

        this.dbGames = new JsonDB(new Config(`${game}`, true, true))

        if (game == "quiz") {

            if (! await this.dbGames.exists("./")) {
                this.dbGames.push("./",
                    [
                        {
                            pergunta: array.pergunta,
                            resposta: array.resposta,
                            informativo: array.informativo
                        }
                    ], true)
            } else {
                let list = await this.dbGames.getData("./")
                list.push(
                    {
                        pergunta: array.pergunta,
                        resposta: array.resposta,
                        informativo: array.informativo
                    }
                )
                this.dbGames.push("./", list, true)
            }
        }
    }

    async getArrayQuestion(game: string) {

        this.dbGames = new JsonDB(new Config(`${game}`, true, true))

        return await this.dbGames.getData(game)
    }

}

export = new gamesDb()