'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function NotificationDropdownFooter() {
  return (
    <div className="p-3 bg-gradient-to-r from-[#63B3ED]/5 to-[#d32f2f]/5 border-t border-[#63B3ED]/10">
      <Link href="/notifications">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full bg-white/50 backdrop-blur-sm border-[#63B3ED]/20 hover:bg-[#63B3ED]/10 hover:text-[#63B3ED] transition-all duration-300 hover:border-[#63B3ED]/30"
        >
          View All Notifications
        </Button>
      </Link>
    </div>
  );
}
