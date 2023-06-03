module.exports = {
    verifyRoles(msg, roles) {
        let v = false;
        for (const r of Object.values(msg.member.roles)[0]["_roles"]){
            if (roles.indexOf(r) == 1){
                v = true
            };
        };
        return v
    }
}