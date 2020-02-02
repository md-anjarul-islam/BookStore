/// the first letter of each word of each database element is Capital Letter
const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost/BookShop')
        .then(()=> console.log('Connected to MongoDB'))
        .catch( (err) => console.log('Error connecting DB', err));

const userSchema = new mongoose.Schema({
    username    : String,
    fullname    : String,
    email       : String,
    password    : String,
    flag        : Boolean
});

const bookSchema = new mongoose.Schema({
    title       : String,
    description : String,
    author      : String,
    isbn        : String,
    rating      : Number,
    seller      : String,
    image       : String,
    modifier    : String
});

const User = new mongoose.model('Users', userSchema);
const Book = new mongoose.model('Books', bookSchema);

// returns false or the saved result from database
async function createUser(Auser){
    const validation = await regValidate(Auser);

    // console.log('Validation ',validation);
    if(!validation)
        return false;
    
    const newUser = new User(Auser);
    newUser.flag = true;
    return await newUser.save();
}

/// creates a book and sends back nothing
async function createBook(Abook){
    const newBook = new Book(Abook);
    await newBook.save();
}

async function showBook(){
   return await Book.find();
}

/// returns the success/failure (true/false) of registering
async function regValidate(user){
    if(user.password !== user.confirmpass)
        return false;
    delete user.confirmpass;
    const result = await User.find().or([
                                        {username: user.username}, 
                                        {email: user.email}
                                    ]);
    // console.log('query result ', result, result.length == 0);
    return result.length == 0;
}

/// returns false or the result of user data
async function loginValidate(user){        
    const result = await User.find(user);
    if(result.length == 0)
        return false;
    else
        return result;
}

async function addSession(user){
    console.log('user', user);
    const userInfo = await User.find(user);
    console.log('userinfo', userInfo);

    userInfo[0].flag = true;
    await userInfo[0].save();
}

async function removeSession(user){
    const userInfo = await User.find(user);
    userInfo[0].flag = false;
    await userInfo[0].save();
}

async function loggedUser(){
    return await User.find({flag: true});    
}

module.exports = {
    createBook,
    createUser,
    showBook,
    loginValidate,
    bookSchema,
    userSchema,
    loggedUser,
    addSession,
    removeSession
};