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
    
    async criarImovel(){
        
        const res = await prisma.imovel.create({data: {titulo:"Casa para alugar" ,  
            nome: "Manoel Da Silva" ,
            descricao: "Casa para alugar com 4 quartos" , 
            valor: 500 ,
            contato: "99899989",
            latitude:-6.84249319266054 ,   
            longitude:  -38.3474349975586}})

        return res
    }
}