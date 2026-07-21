export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t bg-card/40 py-6 text-center text-xs text-muted-foreground">
      <div className="space-y-2">
        <p>&copy; {currentYear} Mrityu. All rights reserved.</p>
        <p>
          UPSC PYQs - Previous Years Questions Archive
        </p>
      </div>
    </footer>
  );
}
