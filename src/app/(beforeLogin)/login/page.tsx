"use client";

import { useRouter } from "next/navigation";
import Main from "../_component/Main";
import { useSession } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  const { data: session } = useSession();

  if (session?.user) {
    router.replace("/home");
    return null;
  }

  router.replace("/i/flow/login");

  return <Main />;
}

// export const Login = () => {
//   const router = useRouter();
//   const { data: session } = useSession();

//   if (session?.user) {
//     router.replace("/home");
//     return null;
//   }

//   router.replace("/i/flow/login");

//   return <Main />;
// };
