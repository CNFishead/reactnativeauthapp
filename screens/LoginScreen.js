import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { authenticate } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/errorOverlay/ErrorOverlay.component";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const authCtx = useContext(AuthContext);

  const signinHandler = async ({ email, password }) => {
    setLoading(true);
    const result = await authenticate("signInWithPassword", email, password);
    if (!result.success) {
      setError(true);
      setErrorMessage(`${result.error}`);
      setLoading(false);
      return;
    } else {
      // store token in local storage
      // redirect to home screen
      setLoading(false);
      authCtx.login(result.token);
    }
  };

  if (loading) {
    return <LoadingOverlay message={`Signing In User....`} />;
  }

  if (error) {
    return (
      <ErrorOverlay
        message={errorMessage}
        onConfirm={() => {
          setError(!error);
          setErrorMessage("");
          setLoading(false);
        }}
      />
    );
  }

  return <AuthContent isLogin onAuthenticate={signinHandler} />;
}

export default LoginScreen;
