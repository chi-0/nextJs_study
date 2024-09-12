export async function getFollowRecommends() {
  const res = await fetch("http://localhost:9090/api/followRecommends", {
    next: {
      tags: ["users", "followRecommends"], // 데이터 업데이트 키
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
