import Link from 'next/link';

export default function LoggedOutLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <header className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">Welcome</h1>
      </header> */}
      <Link href="/calendar">Go to Login</Link>
      <main className="flex-grow flex items-center justify-center">
        {children}
      </main>
    </div>
  );
}