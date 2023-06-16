var options = {
    db_name: "dbembeds",
}
import { JsonDB, Config } from "node-json-db";

class embedDb {
    dbemb: JsonDB = new JsonDB(new Config(options.db_name, true, true))

    async saveEmb(embed: any,embName: any,embCreator: any){

        var newEmb: any = {};
        if(await this.dbemb.exists(`/last`)){
            let embId = await this.dbemb.getObject(`/last`)
            newEmb.id = parseInt(`${Object.values(embId!)[0]}`) + 1
        } else {
            newEmb.id = 1
        }
        newEmb.embed = embed;
        newEmb.embName = embName;
        newEmb.embCreator = embCreator;
        
        this.dbemb.push(`/embeds/${parseInt(newEmb.id)}/embeds`,newEmb,true);
        this.dbemb.push(`/last`,newEmb,true);
    }

    async getEmb(id: any){
        if(await this.dbemb.exists(`/embeds/${id}/embeds`)){
            return await this.dbemb.getData(`/embeds/${id}/embeds`)
        } else {
            return null
        }
    }

    async delEmb(id: any){
        if(await this.dbemb.exists(`/embeds/${id}`)){
            await this.dbemb.delete(`/embeds/${id}`)
            return true
        }else{
            return false
        }

    }    

    async EmbList(){
        if(await this.dbemb.exists(`/embeds/`)){
            var embeds = await this.dbemb.getObject(`/embeds/`);
            var temp = Object.values(embeds!);""
            var emb_person = "";
            let embs = []
            
            for (var x=0;temp.length>x;x++){
                if(temp[x].embeds){
                    if(emb_person.length<1000){
                        emb_person += `ID: [${temp[x].embeds.id}] Nome:${temp[x].embeds.embName} Por: ${temp[x].embeds.embCreator}\n`
                    }else{
                        embs.push(emb_person)
                        emb_person = ""
                    }          
                }    
            }
            if(emb_person) embs.push(emb_person)
            return embs
        }        
    }
}

export = new embedDb()