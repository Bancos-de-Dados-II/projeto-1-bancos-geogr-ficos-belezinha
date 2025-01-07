import {  PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export default class Imovel{
     
//    constructor(titulo ,  
//     nome ,
//     descricao , 
//     valor ,
//     contato ,
//     latitude ,   
//     longitude){
//         this.titulo = titulo
//         this.nome = nome
//         this.descricao =descricao
//         this.valor = valor
//         this.contato = contato
//         this.latitude = latitude
//         this.longitude = longitude
constructor(){}
    
    async criarImovel(data){
        
        try {
            const res = await prisma.imovel.create({ data });
            return res;
        } catch (error) {
            console.error("Erro ao criar imóvel:", error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }
}