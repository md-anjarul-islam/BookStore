
function bookValidate(req, res){
    let book = req.body;

    for(prop of book){
        if(prop === '')
            res.render(404, 'No field can be empty');
    }

    /// take data from database.
    /// for each book, if book title and book author is already
    /// then show error message
}

async function regValidate(req, res){
    let user = req.body;

    for(prop of user){
        if(prop === '')
            return false;
    }

    if(user.password !== user.confirmpass)
        return false;
    /// for each user in database, if the username and email
    /// already exists or the password and confirm password is
    /// not the same then reject.
    
    delete user.confirmpass;

    return await User.find({username: user.username, email: user.email});
}

async function loginValidate(req, res){
    let user = req.body;

    for(prop of user){
        if(prop === '')
            res.render(404, 'No field can be empty');
    }

    /// for each user in database, if the username and email
    /// does not exist and the password does not match then 
    /// return error meessage
    return await User.find(user);
}
