import prisma from '../../config/database';

export class BlogRepository {
  async create(data: { title: string; content: string; image?: string; authorId: string }) {
    return await prisma.blog.create({
      data,
      include: { author: { select: { id: true, name: true, email: true, avatar: true } } }
    });
  }

  async findAll() {
    return await prisma.blog.findMany({
      include: { author: { select: { id: true, name: true, email: true, avatar: true } } },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findById(id: string) {
    return await prisma.blog.findUnique({
      where: { id },
      include: { author: { select: { id: true, name: true, email: true, avatar: true } } }
    });
  }

  async findByAuthorId(authorId: string) {
    return await prisma.blog.findMany({
      where: { authorId },
      include: { author: { select: { id: true, name: true, email: true, avatar: true } } },
      orderBy: { createdAt: 'desc' }
    });
  }

  async update(id: string, data: { title?: string; content?: string; image?: string }) {
    return await prisma.blog.update({
      where: { id },
      data,
      include: { author: { select: { id: true, name: true, email: true, avatar: true } } }
    });
  }

  async delete(id: string) {
    return await prisma.blog.delete({ where: { id } });
  }
}
