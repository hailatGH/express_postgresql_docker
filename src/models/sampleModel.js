module.exports = (sequelize, DataTypes) => {
    const Sample = sequelize.define(
      "samples",
      {
        key: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        sampleName: {
          type: DataTypes.STRING,
          allowNull: false,
        }
      },
      {
        freezeTableName: true,
      }
    );
    return Sample;
};