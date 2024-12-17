export default function LoggedInLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-green-600 text-white p-4">
        <h1 className="text-xl font-bold">Dashboard</h1>
      </header>
      <main className="flex-grow p-4 bg-gray-50">{children}</main>
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; 2024 My App - Logged In</p>
      </footer>
    </div>
  );
}