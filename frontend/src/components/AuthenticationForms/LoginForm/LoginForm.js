import AuthenticationForm from "../AuthenticationForm/AuthenticationForm";

const LoginForm = () => {
  return (
    <AuthenticationForm
      formTitle="Login"
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
