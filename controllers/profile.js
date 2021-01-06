const handleProfileGet = (req, res,db) =>{

    const {id} = req.params;
    //let found = false;
     db.select('*').from('users').where({id}).then(user =>{
         if(user.length){
           res.json(user[0])
         }else{
           res.status(404).json('Aucun utilisateur correspondant !')
         }
        
     }).catch(error =>res.status(400).json('Mauvaise requête'))
}
module.exports = {
    handleProfileGet 
}