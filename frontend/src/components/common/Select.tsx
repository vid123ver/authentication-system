import type { SelectHTMLAttributes } from "react";

interface Option {
    label: string;
    value: string;
}

interface SelectProps
    extends SelectHTMLAttributes<HTMLSelectElement> {

    label?: string;

    options: Option[];

    error?: string;
}

const Select = ({
    label,
    options,
    error,
    className = "",
    ...props
}: SelectProps) => {

    return (

        <div className="mb-4">

            {

                label && (

                    <label className="block mb-2 text-sm font-medium text-gray-700">

                        {label}

                    </label>

                )

            }

            <select
                {...props}
                className={`w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-200
                disabled:bg-gray-100
                ${className}`}
            >

                {

                    options.map((option) => (

                        <option
                            key={option.value}
                            value={option.value}
                        >

                            {option.label}

                        </option>

                    ))

                }

            </select>

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

export default Select;