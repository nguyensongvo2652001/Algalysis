import AuthenticationForm from "../AuthenticationForm/AuthenticationForm";

const LoginForm = () => {
  return (
    <AuthenticationForm
      formTitle="Login"
      submitURL={`${process.env.REACT_APP_BACKEND_BASE_URL}/auth/login`}
      successText="Login successfully !"
      submitButtonText="Sign in"
      infoTextOptions={{
        question: "Don't have an account ?",
        linkText: "Click here to create an account",
        link: "/signUp",
      }}
    />
  );
};

export default LoginForm;
