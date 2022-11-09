const mongoose = require('mongoose');

//move an Object from inside a Schema outside
//Nested Schema
// const addressSchema = new mongoose.Schema({
//   street: String,
//   city: String,
// });

const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 1,
    max: 100,
    validate: {
      validator: (v) => v % 2 === 0,
      message: (props) => `${props.value} is not an even number`,
    },
  },
  email: {
    type: String,
    minlength: 5,
    required: true,
    lowercase: true,
  },
  craetedAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  bestFriend: mongoose.SchemaTypes.ObjectId,
  hobbies: [String],
  //schema from addressSchema calls NestedSchema. In this way you get also an ID for each elements in the object
  //address: addressSchema,
  address: {
    street: String,
    city: String,
  },
});

//you cannot use an ARROW function because you have to use $this to access the property

userSchema.methods.sayHi = function () {
  console.log(`Hi. My name is ${this.name}`);
};

//Method direct to our userSchema
userSchema.statics.findByName = function (name) {
  return this.find({ name: new RegExp(name, 'i') });
  // both are valid
  // return this.where({ name: new RegExp(name, 'i') });
};

//Method that refer to a query
userSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, 'i') });
};
//Method that create a virtual key value inside the schema but it doesn't get saved
userSchema.virtual('namedEmail').get(function () {
  return `${this.name} <${this.email}>`;
});

//MIDDLEWARE .pre if is something you want do happend before or .post if it is something that you want to do after

userSchema.pre('save', function (next) {
  this.updateAt = Date.now();
  next();
});

userSchema.post('save', function (doc, next) {
  doc.sayHi();
  next();
});

module.exports = mongoose.model('User', userSchema);
