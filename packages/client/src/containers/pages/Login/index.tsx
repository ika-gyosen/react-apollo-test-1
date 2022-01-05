/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import { useLogin } from "../../../ContextProvider/AuthUserContextProvider";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();

  const handleChangeUsername = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setUsername(value);
  };

  const handleChangePassword = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setPassword(value);
  };

  const handleClickLogin = () => {
    login(username, password);
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 24px;
      `}
    >
      <h1>Test Page</h1>
      <div
        css={css`
          gap: 8px;
          display: grid;
          grid-template-columns: 100px 200px;
          grid-template-rows: 24px 24px 24px 100px;
          justify-content: center;
          align-items: center;
        `}
      >
        <p
          css={css`
            grid-column: 1/2;
            grid-row: 1/2;
          `}
        >
          username
        </p>
        <input
          onChange={(e) => {
            handleChangeUsername(e);
          }}
          css={css`
            grid-column: 2/3;
            grid-row: 1/2;
          `}
        />
        <p
          css={css`
            grid-column: 1/2;
            grid-row: 2/3;
          `}
        >
          password
        </p>
        <input
          onChange={(e) => {
            handleChangePassword(e);
          }}
          css={css`
            grid-column: 2/3;
            grid-row: 2/3;
          `}
        />
        <button
          css={css`
            grid-column: 1/3;
          `}
          onClick={handleClickLogin}
        >
          login
        </button>
        <div
          css={css`
            grid-column: 1/3;
          `}
        ></div>
      </div>
    </div>
  );
}

export default Login;
