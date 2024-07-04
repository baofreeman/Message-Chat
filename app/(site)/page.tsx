import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-2 lg:px-8 bg-light">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center font-bold">Welcome !!!</h2>
      </div>
      <AuthForm />
    </div>
  );
}
