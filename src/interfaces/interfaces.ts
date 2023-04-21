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