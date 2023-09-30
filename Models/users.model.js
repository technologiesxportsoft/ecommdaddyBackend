module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        _id: String,
        name: String,
        //published: Boolean
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const User = mongoose.model("users", schema);
    return User;
  };
  