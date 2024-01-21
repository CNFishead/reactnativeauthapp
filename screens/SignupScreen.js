import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { authenticate } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";

function SignupScreen() {
  const [loading, setLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  const signupHandler = async ({ email, password }) => {
    setLoading(true);
    const data = await authenticate("signUp", email, password);
    authCtx.login(data.idToken);
    setLoading(false);
  };

  if (loading) {
    return <LoadingOverlay message={`Creating User....`} />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
