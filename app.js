const mongoose = require('mongoose');
const user = require('./user');

const User = require('./user');

mongoose.connect(
  'mongodb://localhost/testdb',
  () => {
    console.log('connected');
  },
  (e) => console.log(e)
);

test();

async function test() {
  try {
    //////////////////
    //****CREATE****//
    //////////////////
    // const user = await User.create({
    //   name: 'Andrea',
    //   age: 26,
    //   email: 'FALZER@asd.com',
    //   hobbies: ['Weight Lifting', 'Bowling'],
    //   address: {
    //     street: 'Bavnevej 107',
    //     city: 'Randers NØ',
    //   },
    // });
    // // user.name = 'Sally';
    // // user.save();
    // // save() to create a new document
    // // const user = new User({ name: 'Kyle', age: 26 });
    // // await user.save();
    // console.log(user);

    ////////////////
    //****FIND****//
    ////////////////
    // const user = await User.findById('627253a7189c65a9db9709ca');
    // const user = await User.findOne({ name: 'Kyle' });
    // const user = await User.findOne({ name: 'Andrea' });

    //Schema methods
    //STATIC method that we define in our userSchema
    // const user = await User.findByName('Andrea');
    //QUERY method that we define in our userSchema
    // const user = await User.find().byName('Andrea');
    //VARTUAL method
    const user = await User.findOne({ name: 'Andrea' });
    // user.sayHi();

    //MIDDLEWARE save
    user.save();
    console.log(user);
    console.log(user.namedEmail);
  } catch (e) {
    console.log(e.message);
  }
}
