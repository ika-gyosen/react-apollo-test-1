import { createContext, ReactNode, useContext, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

type AuthUserContextProviderProps = {
  children: ReactNode;
};

type OperationType = {
  login: (username: string, password: string) => void;
  logout: () => void;
};

type AuthType = {
  user: string | null;
};
const AuthUserContextInit: AuthType = { user: null };
const AuthUserContext = createContext<AuthType>(AuthUserContextInit);
const AuthOperationContext = createContext<OperationType>({
  login: (_username, _password) => console.error("Provider Error"),
  logout: () => console.log("Provider Error"),
});

const LOGIN = gql`
  mutation Login($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      result {
        user
      }
    }
  }
`;

function AuthUserContextProvider({ children }: AuthUserContextProviderProps) {
  const [auth, setAuth] = useState<AuthType>(AuthUserContextInit);
  const navigate = useNavigate();
  const [mutateFunction, { data }] = useMutation(LOGIN, {
    update(
      cache,
      {
        data: {
          login: { result },
        },
      }
    ) {
      setAuth(result);
      navigate("/");
    },
  });

  function login(username: string, password: string) {
    mutateFunction({ variables: { name: username, password } });
  }

  function logout() {
    setAuth({ user: null });
  }

  return (
    <AuthOperationContext.Provider value={{ login, logout }}>
      <AuthUserContext.Provider value={auth}>
        {children}
      </AuthUserContext.Provider>
    </AuthOperationContext.Provider>
  );
}

export const useAuthUser = () => useContext(AuthUserContext);
export const useLogin = () => useContext(AuthOperationContext).login;
export const useLogout = () => useContext(AuthOperationContext).logout;

export default AuthUserContextProvider;
