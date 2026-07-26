import type { ReactNode } from "react";

interface ModalProps {
    open: boolean;
    title?: string;
    children: ReactNode;
    onClose: () => void;
}

const Modal = ({
    open,
    title,
    children,
    onClose,
}: ModalProps) => {

    if (!open) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">

                <div className="flex items-center justify-between border-b px-6 py-4">

                    <h2 className="text-xl font-semibold">

                        {title}

                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-black text-xl"
                    >

                        ×

                    </button>

                </div>

                <div className="p-6">

                    {children}

                </div>

            </div>

        </div>

    );

};

export default Modal;