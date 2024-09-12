"use client";

import { User } from "@/model/User";
import { getUser } from "../_lib/getUser";
import style from "../profile.module.css";
import { useQuery } from "@tanstack/react-query";
import BackButton from "../../_component/BackButton";

type Props = {
  username: string;
};

export default function UserInfo({ username }: Props) {
  const { data: user, error } = useQuery<
    User,
    object,
    User,
    [_1: string, _2: string]
  >({
    queryKey: ["users", username],
    queryFn: getUser,
    staleTime: 60 * 1000, //기본값은 0, Flesh => Stale값이 되는 시간, 단위는 밀리세컨즈 1초=1000
    gcTime: 300 * 1000, // 기본값은 5분, InActive인 데이터들이 사라진다,
  });

  if (error) {
    return (
      <>
        <div className={style.header}>
          <BackButton />
          <h3 className={style.headerTitle}>프로필</h3>
        </div>
        <div className={style.userZone}>
          <div className={style.userImage}></div>
          <div className={style.userName}>
            <div>@{username}</div>
          </div>
        </div>
        <div
          style={{
            height: 100,
            alignItems: "center",
            fontSize: 31,
            fontWeight: "bold",
            justifyContent: "center",
            display: "flex",
          }}
        >
          계정이 존재하지 않음
        </div>
      </>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <div className={style.header}>
        <BackButton />
        <h3 className={style.headerTitle}>{user.nickname}</h3>
      </div>
      <div className={style.userZone}>
        <div className={style.userImage}>
          <img src={user.image} alt={user.id} />
        </div>
        <div className={style.userName}>
          <div>{user.nickname}</div>
          <div>@{user.id}</div>
        </div>
        <button className={style.followButton}>팔로우</button>
      </div>
    </>
  );
}
