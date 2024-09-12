export async function getTrends() {
  const res = await fetch("http://localhost:9090/api/trends", {
    next: {
      tags: ["trends"], // 데이터 업데이트 키
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
