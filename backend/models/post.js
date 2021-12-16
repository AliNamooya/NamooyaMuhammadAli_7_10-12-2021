// "use strict";
// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class Posts extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       models.Post.belongsTo(models.Users, {
//         foreignKey: {
//           allowNull: false,
//         },
//       });
//     }
//   }
//   Posts.init(
//     {
//       userId: DataTypes.INTEGER,
//       title: DataTypes.STRING,
//       content: DataTypes.STRING,
//       attachement: DataTypes.STRING,
//       likes: DataTypes.INTEGER,
//     },
//     {
//       sequelize,
//       modelName: "Posts",
//     }
//   );
//   return Posts;
// };

"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      attachement: DataTypes.STRING,
      likes: DataTypes.INTEGER,
    },
    {}
  );
  Post.associate = function (models) {
    // associations can be defined here
    models.Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Post;
};
