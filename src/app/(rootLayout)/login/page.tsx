import SignIn from '@/components/pages/signIn';

const Login = () => {
  const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const NOTION_API = process.env.NOTION_API;
  const NEXT_PUBLIC_RUN_MODE = process.env.NEXT_PUBLIC_RUN_MODE;
  const AUTH_URL = process.env.AUTH_URL;
  const AUTH_SECRET = process.env.AUTH_SECRET;
  console.log({
    NEXT_PUBLIC_BACKEND_URL,
    NOTION_API,
    NEXT_PUBLIC_RUN_MODE,
    AUTH_URL,
    AUTH_SECRET,
  });
  return <SignIn />;
};

export default Login;
