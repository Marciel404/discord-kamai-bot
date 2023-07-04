var options = {
    db_name: "dbquestions",
}
import { JsonDB, Config } from "node-json-db";


class dbQuestions {

    dbquestions: JsonDB = new JsonDB(new Config(options.db_name, true, true))

    async saveQuestion(question: String){
        if (! await this.dbquestions.exists("/questions")){
            this.dbquestions.push("/questions", [question], true)
        } else {
            let list: String[] = await this.dbquestions.getData("/questions") 
            list.push(question)
            this.dbquestions.push("/questions", list, true)
        }
    }

    async deleteQuestion(question: String){
        if (! await this.dbquestions.exists("/questions")){
            return false
        } else {
            let list: String[] = await this.dbquestions.getData("/questions") 
            if (list.indexOf(question) == -1){
                return false
            } else {
                const index = list.indexOf(question)
                list.splice(index,1)
                this.dbquestions.push("/questions", list, true)
                return true
            }
        }
    }

    async getQuestions(){
        if (! await this.dbquestions.exists("/questions")){
            return false
        } else {
            let list: String[] = await this.dbquestions.getData("/questions") 
            return list
        }
    }
}

export = new dbQuestions()