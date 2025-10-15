import prisma from '../../config/database';

export class UserRepository {
  async create(data: { email: string; password: string; name: string; avatar?: string }) {
    return await prisma.user.create({ data });
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, name: true, avatar: true, createdAt: true }
    });
  }

  async findAll() {
    return await prisma.user.findMany({
      select: { id: true, email: true, name: true, avatar: true, createdAt: true }
    });
  }

  async update(id: string, data: { name?: string; avatar?: string }) {
    return await prisma.user.update({
      where: { id },
      data,
      select: { id: true, email: true, name: true, avatar: true }
    });
  }

  async delete(id: string) {
    return await prisma.user.delete({ where: { id } });
  }
}
