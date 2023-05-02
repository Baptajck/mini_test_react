import ClipLoader from "react-spinners/ClipLoader";

function Spinner({ loading = false }) {
  return (
    <div className="flex h-[calc(100vh-4.75rem)] w-screen items-center justify-center">
      <ClipLoader
        color="#a78bfa"
        loading={loading}
        size={80}
        aria-label="Chargement..."
      />
    </div>
  );
}

export default Spinner;
