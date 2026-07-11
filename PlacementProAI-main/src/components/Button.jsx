import { cn } from "../utils/cn";

export function Button({ children, variant = 'primary', className, ...props }) {
  const baseStyle = "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-indigo-600 focus:ring-primary shadow-sm hover:-translate-y-0.5",
    secondary: "bg-secondary text-white hover:bg-violet-600 focus:ring-secondary shadow-sm hover:-translate-y-0.5",
    outline: "border-2 border-primary text-primary hover:bg-primary-light focus:ring-primary hover:-translate-y-0.5",
    ghost: "text-text-secondary hover:bg-surface-alt hover:text-text-primary",
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button 
      className={cn(baseStyle, variants[variant], sizes[props.size || 'md'], className)}
      {...props}
    >
      {children}
    </button>
  );
}
