import {  PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export default class Imovel{

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
    async buscarImoveis(){
        try {
            const res = await prisma.imovel.findMany();
            return res;
        } catch (error) {
            console.error("Erro ao criar imóvel:", error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }
    async delatarImovel(id){
        try {
            const res = await prisma.imovel.delete({where:{id:id}})
            return res
        } catch (error) {
            console.error("Erro ao criar imóvel:", error);
            throw error;
        }
    }
}