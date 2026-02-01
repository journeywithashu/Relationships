const mongoose = require('mongoose');
const {Schema} = mongoose;

main()
.then(()=>console.log("Connection successfull"
))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');

}

const orderSchema = new Schema({
     item: String,
     price: Number,
});

const customerSchema = new Schema({
     name: String,
     orders: [
          {
               type: Schema.Types.ObjectId, 
               ref: 'Order'
          }
     ],
});

// 

customerSchema.post("findOneAndDelete", async (customer)=>{
     if(customer.orders.length){
       let result =   await order.deleteMany({_id:{$in:customer.orders}});
       console.log(result);
       
     }
});
const order = mongoose.model('Order', orderSchema);
const customer = mongoose.model('Customer', customerSchema);

const findCustomer = async()=>{
let result = await customer.find({}).populate('orders');
console.log(result[0]);
};



const addCust = async()=>{
     let newCust = new customer({
          name: 'karan-arjun'
     });
     let newOrder = new order({
          item: 'pizza',
          price: 499
     });
    newCust.orders.push(newOrder); 
     await newOrder.save();
     await newCust.save();

     console.log("added new customer");
     
};

const delCus = async()=>{
     let data = await customer.findByIdAndDelete("697ec39471f7f2b31f4cd573");
     console.log(data);

     
};

//addCust();
delCus();
