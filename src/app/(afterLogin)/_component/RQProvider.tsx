"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type Props = {
  children: ReactNode;
};

export default function RQProvider({ children }: Props) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        // react-query 전역설정
        queries: {
          refetchOnWindowFocus: false, // 브라우저 탭전환할 경우 데이터를 새로 가져올지
          refetchOnMount: true, // 컴포넌트가 언마운트 되었다가 다시 마운트 될 경우
          refetchOnReconnect: false, // 인터넷 연결이 끊겼다가 다시 연결될 경우
          retry: false, // 데이터 가져오기를 실패했을 경우
        },
      },
    })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools
        initialIsOpen={process.env.NEXT_PUBLIC_MODE === "local"}
      />
    </QueryClientProvider>
  );
}
