import AuthenticationForm from "../AuthenticationForm/AuthenticationForm";

const SignupForm = () => {
  return (
    <AuthenticationForm
      formTitle="Sign up"
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
