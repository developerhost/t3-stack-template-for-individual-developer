export default function Container({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="container mx-auto p-4">{children}</div>
    </main>
  );
}
