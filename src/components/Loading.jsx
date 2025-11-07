export default function FullScreenLoader({ label = "Loading..." }) {
  return (
    <div className="fixed inset-0 z-[9999] grid place-items-center bg-white/70 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-12 h-12 rounded-full border-4 border-[#00205B] border-t-transparent animate-spin"></div>

        <p className="text-sm font-medium text-[#00205B]">{label}</p>
      </div>
    </div>
  );
}
