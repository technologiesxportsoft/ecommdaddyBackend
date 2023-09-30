const db = require("../Models");
const User = db.users;
const itemsPerPage = 10;
const ObjectId = db.mongoose.Types.ObjectId;
// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({ message: "Username param can not be empty!" });
    return;
  }
  //delete Object.assign(req.body, {['city_code']: req.body['code'] })['code'];

  // Create a User
  const users = new User(req.body);

  // Save User in the database
  users
    .save(users)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = async (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  const { page } = req.query;
  if(page){
    
    const pageNumber = parseInt(page, 10) || 1;
    const totalCount = await User.find(condition).countDocuments();

    await User.find(condition).skip((pageNumber - 1) * itemsPerPage)
    .limit(itemsPerPage)
      .then(data => {
        res.send({
          data:data,
          currentPage: pageNumber,
          totalPages: Math.ceil(totalCount / itemsPerPage)
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving userss."
        });
      });

    }else{

      await User.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving userss."
        });
      });
    
    }


};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  const alias = "code"; // The alias you want to use for the field
  const filter = { "_id":ObjectId(req.params.id)  };

  User.aggregate([
    {
      $match: filter // Apply the filter criteria
    },
    {
    //   $addFields: {
    //     ["id"]: "$_id", // Use alias for the field "originalFieldName"
    //     [alias]: "$city_code" // Use alias for the field "originalFieldName"
    //   }
    },
    {
      $limit: 1 // Fetch only one document
    }
  ]) //.findById(id)
    .then(data => {
      console.log(data)
      if (!data)
        res.status(404).send({ message: "Not found User with id " + id });
      else if(data.length>0) res.send(data[0]);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving User with id=" + id });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  //delete Object.assign(req.body, {['city_code']: req.body['code'] })['code'];
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      } else {
        res.send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Users were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all userss."
      });
    });
};

// Find all published Users
exports.findAllPublished = (req, res) => {
  User.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving userss."
      });
    });
};
