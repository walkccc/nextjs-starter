import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';

export const getPosts = async (userId: string) => {
  try {
    const currentUser = await getCurrentUser();
    return await db.post.findMany({
      select: {
        id: true,
        title: true,
        published: true,
        createdAt: true,
      },
      where: {
        authorId: userId,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  } catch {
    return [];
  }
};
