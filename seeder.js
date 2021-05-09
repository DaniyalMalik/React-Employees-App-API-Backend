const fs = require('fs'),
  mongoose = require('mongoose'),
  colors = require('colors'),
  dotenv = require('dotenv'),
  Employee = require('./models/Employee');

dotenv.config({ path: 'config/config.env' });

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
});

const employees = JSON.parse(
  fs.readFileSync(`${__dirname}/data/employees.json`, 'utf-8')
);

const ImportData = async () => {
  try {
    await Employee.create(employees);

    console.log('Data Imported!'.green.inverse);
  } catch (error) {
    console.log(error);
  }
};

const DeleteData = async () => {
  try {
    await Employee.deleteMany();

    console.log('Data Destroyed!'.green.inverse);
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '-i') {
  ImportData();
} else if (process.argv[2] === '-d') {
  DeleteData();
}
