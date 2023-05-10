//Import Toast
import { ToastPosition, toast } from 'react-toastify';

/**
 * @description This is a Notification object that contains all the functions
 * used in displaying notification toasts
 */
export const toastHandler = {
    /**
     * This is a function that is used that is used to show error toasts
     * @param errorMessage Error message to be rendered
     */
    showErrorToast: (errorMessage: string, toastPosition: ToastPosition) => {
        toast.error(errorMessage, {
            position: toastPosition,
            autoClose: 5000,
            closeOnClick: true,
            draggable: true,
            hideProgressBar: true,
            icon: true
        })
    },
    /**
    * This is a function that is used that is used to show success toasts
    * @param successMessage Success message to be rendered
    */
    showSuccessToast: (successMessage: string, toastPosition: ToastPosition) => {
        toast.success(successMessage, {
            position: toastPosition,
            autoClose: 5000,
            closeOnClick: true,
            draggable: true,
            hideProgressBar: true,
            icon: true
        })
    }
}