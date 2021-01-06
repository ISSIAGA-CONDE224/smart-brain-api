const handleSignin = (req,res,db,bcrypt) =>{

const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json('Identifiant incorrect !')
    }

    db.select('email','hash').from('login').where('email', '=',email)
    .then(data =>{
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if(isValid){
           return db.select('*').from('users')
            .where('email', '=',email)
            .then(user =>{
                res.json(user[0])
            }).catch(error =>res.status(400).json('Utilisateur introuvable !'))
        }else{
            res.status(400).json(' Indentifiant incorrect !')
        }
    }).catch(error => res.status(400).json('Indentifiant incorrect !'))
}
module.exports = {
    handleSignin: handleSignin
}