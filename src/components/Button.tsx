export default function Button({ children, variant = "primary", onClick, disabled, type = "button", className = "" }) {
    const baseClasses = "btn";
    const variantClasses = {
      primary: "btn-primary",
      secondary: "btn-secondary",
      outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
    };
    
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseClasses} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      >
        {children}
      </button>
    );
  }