import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: "/i/flow/login", // 로그인창
    newUser: "/i/flow/signup", // 회원가입창
  }, // /api/auth/signin으로 가면 auth에서 제공하는 로그인창이 뜨는데 이것을 내가 만든 로그인 창으로 변경

  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const authResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: credentials.username,
              password: credentials.password,
            }), // id가 username으로 고정이므로 id로 변경
          }
        );

        if (!authResponse.ok) {
          return null;
        }

        const user = await authResponse.json();

        return {
          email: user.id,
          name: user.nickname,
          image: user.image,
          ...user,
        }; // 로그인 정보로 활용
      },
    }),
  ],
});
