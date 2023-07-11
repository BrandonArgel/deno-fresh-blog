import { Handlers, PageProps } from "$fresh/server.ts";
import { CSS } from "$x/gfm@0.2.5/mod.ts";
import { loadPost } from "../../utils/posts.ts";

export const handler: Handlers = {
  async GET(request, context) {
    const { id } = context.params;
    const post = await loadPost(id);

    return context.render(post);
  },
};

export default function PagePost(props: PageProps) {
  const post = props?.data ?? {};

  return (
    <article class="p-4">
      <ul>
        {post.tags?.map((tag: string) => (
          <li class="mx-2">
            <a
              class="hover:text-blue-500"
              href={`/blog?tag=${tag}`}
            >
              {tag}
            </a>
          </li>
        ))}
      </ul>
      <h1 class="text-2xl font-bold">{post?.title}</h1>
      <time>
        {Intl.DateTimeFormat("es", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(new Date(post?.date))}
      </time>
      <div
        class="markdown-body"
        dangerouslySetInnerHTML={{ __html: post?.body }}
      />
      <style
        dangerouslySetInnerHTML={{ __html: CSS }}
      >
      </style>
    </article>
  );
}
