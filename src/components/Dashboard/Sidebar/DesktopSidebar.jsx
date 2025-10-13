import Logo from "../../../svgs/Logo";
import NavItem from "./NavItem";

const DesktopSidebar = ({ navItems, activeItem, setActiveItem }) => {
  return (
    <aside className="hidden lg:flex flex-col w-72 bg-[var(--color-background)] border-r border-[var(--color-border)] shadow-sm fixed left-0 top-0 h-full z-30">
      {/* Header */}
      <div className="p-6 border-b border-[var(--color-border)] flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-xl shadow-md">
            <Logo className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
              ClassConnect
            </h1>
            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
              Learning Platform
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scroll">
        {navItems.map((item, index) => (
          <div
            key={item.name}
            className="animate-slide-in-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <NavItem
              item={item}
              isActive={activeItem === item.name}
              onClick={() => setActiveItem(item.name)}
            />
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--color-border)] flex-shrink-0">
        <div className="text-center">
          <p className="text-xs text-[var(--color-text-muted)]">
            © 2024 ClassConnect
          </p>
        </div>
      </div>
    </aside>
  );
};

export default DesktopSidebar;
