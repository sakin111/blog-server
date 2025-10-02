
interface CookieType {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "lax" | "strict" | "none";
}

export const cookieHandler = (): CookieType => {


  return {
    httpOnly: true,
    secure: false,                       
    sameSite: "none"
  };
};
