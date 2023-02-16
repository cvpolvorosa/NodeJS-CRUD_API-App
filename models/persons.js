//will contain all models
const getPersonModel =(db, { DataTypes }) =>
{
    const Person = db.define('persons', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        address: {
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true,
            }
        },
    });
    
    return Person;
};

module.exports = {
    getPersonModel
}