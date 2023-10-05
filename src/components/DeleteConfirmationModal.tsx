import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect } from 'react';

interface DeleteConfirmationModalProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isVisible,
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isVisible) {
        if (e.key === 'Enter') {
          e.preventDefault();
          onConfirm();
        } else if (e.key === 'Escape') {
          onCancel();
        }
      }
    };

    if (isVisible) {
      window.addEventListener('keydown', handleKeyPress);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    }
  }, [isVisible, onConfirm, onCancel])


  return (
    <Transition.Root show={isVisible} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={onCancel}>
        <div className="flex items-center justify-center min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-4"
          >
            <div className="relative bg-white p-4 max-w-md mx-auto rounded-lg text-center shadow-xl">
              <Dialog.Title as="h3" className="text-lg font-medium text-gray-900">
                Delete Confirmation
              </Dialog.Title>
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this item?
                </p>
              </div>
              <div className="mt-6">
                <button
                  onClick={onConfirm}
                  className="inline-block px-4 py-2 mr-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-opacity-50"
                >
                  Yes
                </button>
                <button
                  onClick={onCancel}
                  className="inline-block px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-opacity-50"
                >
                  No
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default DeleteConfirmationModal;
