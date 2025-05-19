import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface NavProps {
  items: {
    title: string
    href: string
  }[]
}

export function Nav({ items }: NavProps) {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-8">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="relative group"
        >
          <span
            className={cn(
              "text-sm font-medium transition-all duration-300 group-hover:text-[#d32f2f] hover:-translate-y-1 inline-block",
              pathname === item.href
                ? "text-foreground font-semibold"
                : "text-muted-foreground"
            )}
          >
            {item.title}
          </span>
          {pathname === item.href && (
            <div 
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#d32f2f] to-[#63B3ED] rounded-full animate-fadeIn"
            />
          )}
        </Link>
      ))}
    </nav>
  )
}