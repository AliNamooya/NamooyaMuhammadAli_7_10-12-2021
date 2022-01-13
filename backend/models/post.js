"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      userId: DataTypes.INTEGER,
      content: DataTypes.STRING,
      attachement: DataTypes.STRING,
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
    models.User.hasMany(models.Comments);
  };
  return Post;
};
