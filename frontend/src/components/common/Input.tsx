import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input = ({
    label,
    error,
    className = "",
    ...props
}: InputProps) => {

    return (

        <div className="mb-4">

            {label && (

                <label className="block mb-2 text-sm font-medium text-gray-700">

                    {label}

                </label>

            )}

            <input
                {...props}
                className={`w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-200
                disabled:bg-gray-100
                ${className}`}
            />

            {

                error && (

                    <p className="mt-1 text-sm text-red-500">

                        {error}

                    </p>

                )

            }

        </div>

    );

};

export default Input;