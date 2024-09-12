"use client";

import { useQuery } from "@tanstack/react-query";
import Trend from "../../_component/Trend";
import { getTrends } from "../../_lib/getTrends";
import { Hashtag } from "@/model/Hashtag";

export default function TrendSection() {
  const { data } = useQuery<Hashtag[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 60 * 1000, //기본값은 0, Flesh => Stale값이 되는 시간, 단위는 밀리세컨즈 1초=1000
    gcTime: 300 * 1000, // 기본값은 5분, InActive인 데이터들이 사라진다,
  });

  return data?.map((trend) => <Trend trend={trend} key={trend.tagId} />);
}
