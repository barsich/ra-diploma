export default function Container({ children }) {
  return (
    <main className="container">
      <div className="row">
        <div className="col">{children}</div>
      </div>
    </main>
  );
}
