interface ConfirmDialogProps {

    open: boolean;

    title: string;

    message: string;

    confirmText?: string;

    cancelText?: string;

    onConfirm: () => void;

    onCancel: () => void;

}

const ConfirmDialog = ({
    open,
    title,
    message,
    confirmText = "Delete",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
}: ConfirmDialogProps) => {

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white rounded-lg shadow-lg w-96 p-6">

                <h2 className="text-xl font-bold mb-3">
                    {title}
                </h2>

                <p className="text-gray-600 mb-6">
                    {message}
                </p>

                <div className="flex justify-end gap-3">

                    <button
    onClick={onCancel}
    className="px-4 py-2 rounded border"
>
    {cancelText}
</button>

                    <button
    onClick={onConfirm}
    className="px-4 py-2 rounded bg-red-600 text-white"
>
    {confirmText}
</button>

                </div>

            </div>

        </div>

    );

};

export default ConfirmDialog;