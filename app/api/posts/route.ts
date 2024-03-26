import * as z from 'zod';

import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';

const postCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
});

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || !user.id) {
      return new Response('Unauthorized', { status: 403 });
    }

    const posts = await db.post.findMany({
      select: {
        id: true,
        title: true,
        published: true,
        createdAt: true,
      },
      where: {
        authorId: user.id,
      },
    });

    return new Response(JSON.stringify(posts));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || !user.id) {
      return new Response('Unauthorized', { status: 403 });
    }

    // TODO: Check if user is on pro plan.

    const json = await req.json();
    const body = postCreateSchema.parse(json);

    const post = await db.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: user.id,
      },
      select: {
        id: true,
      },
    });

    return new Response(JSON.stringify(post));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    // TODO: Handle RequiresProPlanError

    return new Response(null, { status: 500 });
  }
}
