"use client";

import { useQuery } from "@tanstack/react-query";
import Post from "../../_component/Post";
import { Post as IPost } from "@/model/Post";
import { getFollowingPosts } from "../_lib/getFollowingPosts";

export default function FollowingPosts() {
  const { data } = useQuery<IPost[]>({
    queryKey: ["posts", "followings"],
    queryFn: getFollowingPosts,
    staleTime: 60 * 1000, //기본값은 0, Flesh => Stale값이 되는 시간, 단위는 밀리세컨즈 1초=1000
    gcTime: 300 * 1000, // 기본값은 5분, InActive인 데이터들이 사라진다,
  });

  return data?.map((post) => <Post key={post.postId} post={post} />);
}
