"use client";

import { usePathname } from "next/navigation";
import Trend from "./Trend";
import style from "./trendSection.module.css";
import { useSession } from "next-auth/react";
import { getTrends } from "../_lib/getTrends";
import { Hashtag } from "@/model/Hashtag";
import { useQuery } from "@tanstack/react-query";

export default function TrendSection() {
  const { data: session } = useSession();

  const { data } = useQuery<Hashtag[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 60 * 1000, //기본값은 0, Flesh => Stale값이 되는 시간, 단위는 밀리세컨즈 1초=1000
    gcTime: 300 * 1000, // 기본값은 5분, InActive인 데이터들이 사라진다,
    enabled: !!session?.user,
  });

  const pathname = usePathname();

  if (pathname === "/explore") return null;
  if (session?.user) {
    return (
      <div className={style.trendBg}>
        <div className={style.trend}>
          <h3>나를 위한 트렌드</h3>
          {data?.map((trend) => (
            <Trend trend={trend} key={trend.tagId} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className={style.trendBg}>
      <div className={style.noTrend}>트렌드를 가져올수 없습니다.</div>
    </div>
  );
}
