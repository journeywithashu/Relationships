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

const order = mongoose.model('Order', orderSchema);
const customer = mongoose.model('Customer', customerSchema);

const findCustomer = async()=>{
let result = await customer.find({}).populate('orders');
console.log(result[0]);
};

findCustomer();

// const addCustomer = async()=>{ 
//      let cust = new customer({
//           name: "John Doe",
//      });
//      let order1 = await order.findOne({item: "Book"});
//      let order2 = await order.findOne({item: "Laptop"});
//      cust.orders.push(order1);
//      cust.orders.push(order2);
//      let result = await cust.save();
//      console.log(result);
// };

// addCustomer();

// const addOrder = async()=>{
//     let result = await order.insertMany([
//           {item: "Book", price: 200},
//           {item: "Pen", price: 20},
//           {item: "Laptop", price: 50000},
//     ]);
//      console.log(result);

// };
//addOrder();