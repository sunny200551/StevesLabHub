
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, GraduationCap, LayoutDashboard, Gamepad2, Book, Code, FileQuestion, StickyNote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from './theme-toggle';
import { Separator } from '../ui/separator';

const mainNavItems = [
  { href: '/', label: 'Home', icon: GraduationCap },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/games', label: 'Games', icon: Gamepad2 },
];

const mobileExtraNavItems = [
    { href: '/dashboard#subjects', label: 'Subjects', icon: Book },
    { href: '/dashboard#all-programs', label: 'Lab Programs', icon: Code },
    { href: '/dashboard#study-materials', label: 'Study Materials', icon: FileQuestion },
    { href: '/dashboard#syllabus', label: 'Syllabus', icon: StickyNote },
];

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDashboardPage = pathname.startsWith('/dashboard');

  const NavLink = ({ href, label, icon: Icon, isMobile = false }: { href: string, label: string, icon: React.ElementType, isMobile?: boolean }) => {
    const isActive = (pathname === href || (href === '/dashboard' && isDashboardPage));
    
    return (
      <Button
        asChild
        variant="ghost"
        className={cn(
          "justify-start text-muted-foreground hover:text-foreground hover:bg-accent",
          isActive && "bg-primary/10 text-primary",
           isMobile ? "w-full text-lg py-6" : "text-sm"
        )}
        onClick={() => isMobile && setMobileMenuOpen(false)}
      >
        <Link href={href}>
          {isMobile && <Icon className="mr-4 h-6 w-6" />}
          {label}
        </Link>
      </Button>
    );
  };
  
  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled ? 'border-b border-border/40 bg-background/85 backdrop-blur-xl' : 'bg-transparent'
      )}
    >
      <div className="container flex h-16 items-center md:h-20">
        <div className="flex-1 md:flex-none">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary md:h-10 md:w-10 md:rounded-xl">
              <span className="font-extrabold text-primary-foreground text-xl md:text-2xl">S</span>
            </div>
            <p className="font-bold text-lg text-foreground md:text-xl">Steve's Lab Hub</p>
          </Link>
        </div>

        <nav className="hidden items-center space-x-1 md:ml-6 md:flex">
          {mainNavItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 md:gap-2">
          <ThemeToggle />
          
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85vw] max-w-xs p-0">
                <SheetHeader className="border-b p-4">
                  <SheetTitle className="flex items-center justify-between">
                     <Link href="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                            <span className="text-xl font-extrabold text-primary-foreground">S</span>
                        </div>
                        <p className="text-lg font-bold text-foreground">Steve's Lab Hub</p>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
              <div className="p-2">
                <nav className="flex flex-col gap-1">
                  {mainNavItems.map((item) => (
                    <NavLink key={item.href} {...item} isMobile />
                  ))}
                  <Separator className="my-2" />
                   <p className="px-4 text-sm font-semibold text-muted-foreground">Quick Access</p>
                  {mobileExtraNavItems.map((item) => (
                    <NavLink key={item.href} {...item} isMobile />
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
