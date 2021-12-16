// "use strict";
// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       models.User.hasMany(models.Post);
//     }
//   }
//   User.init(
//     {
//       email: DataTypes.STRING,
//       username: DataTypes.STRING,
//       password: DataTypes.STRING,
//       isAdmin: DataTypes.BOOLEAN,
//     },
//     {
//       sequelize,
//       modelName: "User",
//     }
//   );
//   return User;
// };

"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
    models.User.hasMany(models.Post);
  };
  return User;
};
