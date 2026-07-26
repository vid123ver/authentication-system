interface ToastProps {
    message: string;
    type?: "success" | "error";
}

const Toast = ({
    message,
    type = "success",
}: ToastProps) => {

    if (!message) return null;

    return (

        <div
            className={`fixed top-5 right-5 px-4 py-3 rounded shadow-lg text-white
            ${
                type === "success"
                    ? "bg-green-600"
                    : "bg-red-600"
            }`}
        >
            {message}
        </div>

    );

};

export default Toast;