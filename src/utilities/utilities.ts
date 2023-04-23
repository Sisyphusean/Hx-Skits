//Import Toast
import { toast } from 'react-toastify';

/**
 * @description This is a Notification object that contains all the functions
 * used in displaying notification toasts
 */
export const toastHandler = {
    /**
     * This is a function that is used that is used to show error toasts
     * @param errorMessage Error message to be rendered
     */
    showErrorToast: (errorMessage: string) => {
        toast.error(errorMessage, {
            position: "top-right",
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
    showSuccessToast: (successMessage: string) => {
        toast.success(successMessage, {
            position: "top-right",
            autoClose: 5000,
            closeOnClick: true,
            draggable: true,
            hideProgressBar: true,
            icon: true
        })
    }
}