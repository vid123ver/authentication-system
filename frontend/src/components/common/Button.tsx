import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger";
    loading?: boolean;
}

const Button = ({
    children,
    variant = "primary",
    loading = false,
    className = "",
    disabled,
    ...props
}: ButtonProps) => {

    const baseStyle =
        "w-full px-4 py-2 rounded-lg font-medium transition duration-200 focus:outline-none focus:ring-2";

    const variants = {
        primary:
            "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300",

        secondary:
            "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300",

        danger:
            "bg-red-600 text-white hover:bg-red-700 focus:ring-red-300",
    };

    return (

        <button
            {...props}
            disabled={disabled || loading}
            className={`${baseStyle} ${variants[variant]} ${
                disabled || loading
                    ? "opacity-50 cursor-not-allowed"
                    : ""
            } ${className}`}
        >

            {

                loading

                    ? "Please wait..."

                    : children

            }

        </button>

    );

};

export default Button;