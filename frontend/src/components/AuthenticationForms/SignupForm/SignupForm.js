import AuthenticationForm from "../AuthenticationForm/AuthenticationForm";

const SignupForm = () => {
  return (
    <AuthenticationForm
      formTitle="Sign up"
      submitURL={`${process.env.REACT_APP_BACKEND_BASE_URL}/auth/signUp`}
      successText="Sign up successfully !"
      submitButtonText="Create an account"
      infoTextOptions={{
        question: "Already had an account ?",
        linkText: "Click here to sign in",
        link: "/login",
      }}
    />
  );
};

export default SignupForm;
