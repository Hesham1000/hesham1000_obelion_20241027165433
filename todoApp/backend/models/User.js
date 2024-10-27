```javascript
const { Model, DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = new Sequelize('todoApp', 'root', 'root', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});

class User extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'Users',
      timestamps: false,
      hooks: {
        beforeCreate: async (user) => {
          user.password = await bcrypt.hash(user.password, 10);
        }
      }
    });
  }

  // Instance method to check password
  async checkPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

module.exports = User;
```