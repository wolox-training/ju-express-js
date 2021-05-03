module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'first_name'
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'last_name'
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, 100]
        }
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'regular',
        values: ['regular', 'admin']
      },
      position: {
        type: DataTypes.STRING,
        defaultValue: 'Developer',
        values: ['Developer', 'Lead', 'TL', 'EM', 'HEAD', 'CEO']
      }
    },
    {
      timestamps: true,
      tableName: 'users',
      freezeTableName: true,
      underscored: true
    }
  );

  User.associate = models => {
    User.hasMany(models.Weet);
    User.hasMany(models.Rating);
  };

  return User;
};
