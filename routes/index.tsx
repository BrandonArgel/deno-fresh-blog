import { Handlers, PageProps } from "$fresh/server.ts";
import { Post } from "../types.d.ts";
import { listPosts } from "../utils/posts.ts";

export const handler: Handlers = {
  async GET(request, context) {
    const posts = await listPosts();

    return context.render({ posts });
  },
};

export default function Home(props: PageProps) {
  const { posts } = props?.data ?? [];

  return (
    <main class="p-4">
      <h1 class="text-4xl font-bold">
        Mi blog
      </h1>
      <ul>
        {posts.map((post: Post) => (
          <li>
            <article>
              <h2 class="text-2xl font-bold">
                <a href={`/blog/${post.id}`}>{post.title}</a>
              </h2>
              <time>
                {Intl.DateTimeFormat("es", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(new Date(post.date))}
              </time>
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
}
