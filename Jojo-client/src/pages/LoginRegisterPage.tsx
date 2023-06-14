import { useState } from "react";
import { LoginPage } from "./LoginPage";
import { SignUpPage } from "./SignUpPage";

export function LoginRegisterPage() {
  const [page, setPage] = useState("login");
  return (
    <>
      {page === "login" ? (
        <LoginPage setPage={setPage} />
      ) : (
        <SignUpPage setPage={setPage} />
      )}
    </>
  );
}
