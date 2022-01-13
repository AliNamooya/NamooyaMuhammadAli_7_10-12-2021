"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    "Comments",
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
      content: DataTypes.STRING,
      attachement: DataTypes.STRING,
    },
    {}
  );
  Comments.associate = function (models) {
    // associations can be defined here
    models.Comments.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    models.Comments.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Comments;
};
