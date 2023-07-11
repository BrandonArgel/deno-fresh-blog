import { extract } from "$std/front_matter/any.ts";
import { Post } from "../types.d.ts";
import { render } from "$x/gfm@0.2.5/mod.ts";

export async function loadPost(id: string): Promise<Post | null> {
  const raw: string | null = await Deno
    .readTextFile(`./content/posts/${id}.md`)
    .catch(
      () => null,
    );

  if (!raw) return null;

  const { attrs, body } = extract(raw);
  const params = attrs as Record<string, string>;
  const tags = Array.isArray(params.tags)
    ? params.tags
    : params.tags?.split(",");

  const post: Post = {
    id,
    title: params.title,
    body: render(body),
    date: new Date(params.date),
    excerpt: params.excerpt,
    tags,
  };

  return post;
}

export async function listPosts(): Promise<Post[]> {
  const promises: Promise<Post | null>[] = [];
  for await (const entry of Deno.readDir("./content/posts")) {
    const { name } = entry;
    const [id] = name.split(".");
    if (id) promises.push(loadPost(id));
  }
  const posts = await Promise.all(promises)
    .then((posts) => {
      const _posts = posts
        .filter(Boolean) as Post[];

      return _posts.sort((a, b) => {
        return b.date.getTime() - a.date.getTime();
      });
    });

  return posts;
}

// export async function listPostsSequentially(): Promise<Post[]> {
//   const posts: Post[] = [];
//   for await (const entry of Deno.readDir("./content/posts")) {
//     const { name } = entry;
//     const [id] = name.split(".");
//     const post = await loadPost(id);
//     if (post) posts.push(post);
//   }
//   return posts;
// }

listPosts();
