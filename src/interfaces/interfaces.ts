/**
 * These are props that are passed to the Nabar component
 */
export interface navbarProps {
    /**
     * This property sets whether the current user is an admin or a regular user
     * It can either be set to 'admin' or 'limited'
     */
    userType: string
}

/**
 * These are props that are passed to the Input component
 */
export interface inputProps {
    //This is the label of the input field
    label: string,
    //This is the placeholder of the input field
    placeholder: string,
    //This is the type of the input field
    type: string,
    //This is the id of the input field
    id: string,
    //This is the help text of the input field that renders on the right
    helpText: string | null,
    //This is the error message of the input field that renders below the input field
    errorMessage: string | null,
}