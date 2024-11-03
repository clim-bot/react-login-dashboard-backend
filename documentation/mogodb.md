
# MongoDB Setup and Usage Guide

This guide will help you set up MongoDB on your machine, connect it to a Node.js application, and perform basic database operations.

## Table of Contents

- [Installing MongoDB](#installing-mongodb)
  - [macOS](#macos)
  - [Ubuntu/Debian](#ubuntudebian)
  - [Windows](#windows)
- [Starting MongoDB](#starting-mongodb)
- [Connecting MongoDB to a Node.js Application](#connecting-mongodb-to-a-nodejs-application)
- [Basic MongoDB Operations](#basic-mongodb-operations)

---

## Installing MongoDB

### macOS

1. **Install MongoDB** via Homebrew:
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community@6.0
   ```

### Ubuntu/Debian

1. **Import MongoDB's GPG key**:
   ```bash
   wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
   ```

2. **Add MongoDB repository**:
   ```bash
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
   ```

3. **Update the package list and install MongoDB**:
   ```bash
   sudo apt update
   sudo apt install -y mongodb-org
   ```

### Windows

1. **Download MongoDB** from [mongodb.com](https://www.mongodb.com/try/download/community) and follow the installation wizard.
2. Choose "Complete" installation and select "Run service as Network Service user" to install MongoDB as a Windows service.

---

## Starting MongoDB

Once MongoDB is installed, start the MongoDB service.

### macOS and Ubuntu/Debian

```bash
sudo systemctl start mongod
```

### Windows

1. MongoDB should start automatically. If not, open Command Prompt as Administrator and start it manually:
   ```bash
   net start MongoDB
   ```

### Verifying the Service

You can verify if MongoDB is running by checking the status (for Linux/macOS):
```bash
sudo systemctl status mongod
```

Alternatively, connect to MongoDB using the shell:
```bash
mongosh
```

---

## Connecting MongoDB to a Node.js Application

To connect MongoDB with Node.js, you need to configure a connection string in an `.env` file and use Mongoose to manage the database.

### Step 1: Create `.env` File

Add the following line to your `.env` file, replacing `<database_name>` with the name of your database:

```plaintext
MONGO_URI=mongodb://localhost:27017/<database_name>
```

### Step 2: Install Mongoose

In your Node.js project directory, install Mongoose:

```bash
npm install mongoose
```

### Step 3: Set Up Mongoose Connection

Create a `db.js` file to handle the database connection:

```javascript
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
```

Then import and call `connectDB()` in your main server file (`server.js` or `app.js`).

---

## Basic MongoDB Operations

Once connected, you can perform CRUD (Create, Read, Update, Delete) operations in MongoDB.

### 1. Define a Schema and Model

In Mongoose, a schema defines the structure of the documents in a MongoDB collection.

```javascript
// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', UserSchema);
```

### 2. CRUD Operations

Here's how to use the model to perform basic CRUD operations.

#### Create a Document

```javascript
const User = require('./models/User');

const createUser = async () => {
  const user = new User({ username: 'testuser', password: 'password123' });
  await user.save();
  console.log('User created:', user);
};
createUser();
```

#### Read Documents

```javascript
const getUsers = async () => {
  const users = await User.find();
  console.log('Users:', users);
};
getUsers();
```

#### Update a Document

```javascript
const updateUser = async (id) => {
  const user = await User.findByIdAndUpdate(id, { password: 'newpassword123' }, { new: true });
  console.log('Updated User:', user);
};
updateUser('<user_id>');
```

#### Delete a Document

```javascript
const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  console.log('User deleted');
};
deleteUser('<user_id>');
```

---

## Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
