module.exports = (sequelize, DataTypes) => {

    const Factory = sequelize.define("Factory", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        Low: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        High: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Numbers: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: false
        },
        Expires: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
    });
    
    return Factory;
};