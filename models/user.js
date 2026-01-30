const mongoose = require('mongoose');
const {Schema} = mongoose;

main()
.then(()=>console.log("Connection successfull"
))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');

}

const userSchema = new Schema({
     username: String,
     addresses: [{
          _id: false,
        location: String,
        city: String
     }],
});

const User = mongoose.model('User', userSchema);

const addUser = async ()=>{
     let user1 = new User({
        username: "john_doe",
        addresses: [{
               location: "123 Main St",
               city: "New York"

        }]
     });
     user1.addresses.push({
        location: "456 Elm St",
        city: "Los Angeles"   
     });
    let result = await user1.save();
     console.log(result);
}
addUser();