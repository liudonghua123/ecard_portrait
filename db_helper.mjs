import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function find_by_id(id) {
    const info = await prisma.info.findUnique({
        where: {
            STUEMPNO: Number(id),
        }
    });
    return info;
}