export default function LoggedOutLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">Welcome</h1>
      </header>
      <main className="flex-grow flex items-center justify-center p-4">
        {children}
      </main>
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; 2024 My App</p>
      </footer>
    </div>
  );
}