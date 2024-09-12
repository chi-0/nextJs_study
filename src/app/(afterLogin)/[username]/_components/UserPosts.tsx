"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Post from "../../_component/Post";
import { Post as IPost } from "@/model/Post";
import { getUserPosts } from "../_lib/getUserPosts";

type Props = {
  username: string;
};

export default function UserPosts({ username }: Props) {
  const { data } = useQuery<
    IPost[],
    object,
    IPost[],
    [_1: string, _2: string, _3: string]
  >({
    queryKey: ["posts", "users", username],
    queryFn: getUserPosts,
    staleTime: 60 * 1000, //기본값은 0, Flesh => Stale값이 되는 시간, 단위는 밀리세컨즈 1초=1000
    gcTime: 300 * 1000, // 기본값은 5분, InActive인 데이터들이 사라진다,
  });

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["users", username]);

  if (user) {
    return data?.map((post) => <Post key={post.postId} post={post} />);
  }
}
