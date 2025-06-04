import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-white/70 flex items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-black" />
    </div>
  );
}