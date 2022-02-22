module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define("taskdetails", {
        taskId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      taskHolderName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      taskDate: {
        type: DataTypes.STRING,
        allowNull: false
      },
      taskName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      taskStatus: {
        type: DataTypes.STRING,
        allowNull: false
      },
    });
    return model;
  };
