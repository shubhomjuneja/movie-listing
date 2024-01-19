import React from "react";

type ButtonProps = {
  label: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  onClick,
  disabled = false,
  loading = false,
}) => {
  const primaryButtonStyle = `w-full text-white text-[16px] bg-primary h-[48px] rounded-[10px] font-[700]`;
  const secondaryButtonStyle = `w-full text-white text-[16px] bg-transparent border border-white h-[48px] rounded-[10px] font-[700]`;

  const getClassName = () => {
    switch (variant) {
      case "primary":
        return primaryButtonStyle;
      case "secondary":
        return secondaryButtonStyle;
      default:
        return primaryButtonStyle;
    }
  };

  return (
    <button
      className={getClassName()}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-t-4 border-white"></div>
        </div>
      ) : (
        label
      )}
    </button>
  );
};

export default Button;
