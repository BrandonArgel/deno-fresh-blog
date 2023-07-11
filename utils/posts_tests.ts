import { assertEquals } from "$std/testing/asserts.ts";
import { loadPost } from "./posts.ts";
import { Post } from "../types.d.ts";

Deno.test("loadPost() returns null if the post does not exist", async () => {
  const post: Post | null = await loadPost("non-existent");
  assertEquals(post, null);
});

Deno.test("loadPost() returns a post object if the post exists", async () => {
  const post: Post | null = await loadPost("hello-world");

  assertEquals(post?.id, "hello-world");
  assertEquals(typeof post?.title, "string");
  assertEquals(typeof post?.excerpt, "string");
  assertEquals(post?.date instanceof Date, true);
  assertEquals(typeof post?.body, "string");
});
