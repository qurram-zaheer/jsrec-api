const profileHandle = (req,res,db) => {
    const {id} = req.params;
    
    db.select('*').from('users').where({'id':id}).
            then(user => {
                if(user.length){
                    res.json(user[0])
                } else {
                    res.status(404).json('Error getting user')
                }
            })
            .catch(err => res.status(400).json('Error in fetching profile'))
    
    
}

module.exports = {
    profileHandle:profileHandle
}