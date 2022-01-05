import { useQuery, gql } from "@apollo/client";
import { useLogout } from "../../../ContextProvider/AuthUserContextProvider";

const GET = gql`
  query test {
    books {
      title
    }
  }
`;

function Top() {
  const { loading, error, data } = useQuery(GET);
  const logout = useLogout();

  if (loading) return <p>...loading</p>;
  if (error) return <p>error {error.message}</p>;
  return (
    <div>
      Top
      <div>
        <button onClick={logout}>LOGOUT</button>
      </div>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}

export default Top;
