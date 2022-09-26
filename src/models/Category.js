module.exports = (Sequelize, DataTypes) => {
  const Category = Sequelize.define(
    'Category',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'categories',
    }
  );

  return Category;
};
