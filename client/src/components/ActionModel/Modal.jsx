const Modal = ({ show, onClose, children, title, onConfirm }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="modal-container bg-white rounded-lg shadow-lg overflow-hidden w-96">
                <div className="modal-header p-4 bg-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button
                        className="close-btn text-gray-500 hover:text-red-500 text-xl"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>
                <div className="modal-body p-4">{children}</div>
                <div className="modal-footer p-4 bg-gray-200 flex justify-end">
                    <button
                        className="btn btn-secondary mr-2 px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        onClick={() => {
                            if (onConfirm) onConfirm(); // Execute action
                            onClose();
                        }}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
