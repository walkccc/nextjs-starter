import * as z from 'zod';

import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { postPatchSchema } from '@/lib/validations/post';

const routeContextSchema = z.object({
  params: z.object({
    postId: z.string(),
  }),
});

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context);

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToPost(params.postId))) {
      return new Response(null, { status: 403 });
    }

    // Delete the post.
    await db.post.delete({
      where: {
        id: params.postId as string,
      },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context);

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToPost(params.postId))) {
      return new Response(null, { status: 403 });
    }

    // Get the request body and validate it.
    const json = await req.json();
    const body = postPatchSchema.parse(json);

    // Update the post.
    // TODO: Implement sanitization for content.
    await db.post.update({
      data: {
        title: body.title,
        content: body.content,
      },
      where: {
        id: params.postId,
      },
    });

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

async function verifyCurrentUserHasAccessToPost(postId: string) {
  const user = await getCurrentUser();
  if (!user || !user.id) {
    return false;
  }

  const count = await db.post.count({
    where: {
      id: postId,
      authorId: user.id,
    },
  });

  return count > 0;
}
