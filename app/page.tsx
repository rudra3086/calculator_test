import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Calculator App</h1>
        <p className="text-gray-600 mb-8">
          Sign in or register to use the calculator
        </p>
        <div className="space-y-4">
          <Link
            href="/login"
            className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="block w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
