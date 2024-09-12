export async function getFollowingPosts() {
  const res = await fetch("http://localhost:9090/api/followingPosts", {
    next: {
      tags: ["posts", "followings"], // 데이터 업데이트 키
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
