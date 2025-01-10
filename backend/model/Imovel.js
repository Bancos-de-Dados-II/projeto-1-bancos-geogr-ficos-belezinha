import sequelize from "../database/sequelize.js";
import { DataTypes } from "sequelize";

const Imovel = sequelize.define('imovel', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
 valor: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  contato: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cordenadas: {
    type: DataTypes.GEOMETRY('POINT'), // Suporte a dados geoespaciais
    allowNull: false,
  },
});

Imovel.sync();
export default Imovel;
