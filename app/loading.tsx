export default function Loading() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50/80 backdrop-blur-sm animate-fade-in">
      <div className="flex flex-col items-center space-y-4">
        {/* Glowing Dual Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-primary-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-4 border-primary-200 border-b-transparent animate-spin [animation-direction:reverse] opacity-50"></div>
        </div>
        <p className="text-sm font-semibold text-primary-800 tracking-wider animate-pulse">
          ABSSS
        </p>
      </div>
    </div>
  );
}
