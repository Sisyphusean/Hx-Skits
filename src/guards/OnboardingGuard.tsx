//Custom Hooks
import { useIsUserTypeSet } from "../customhooks/useOnboardingGuardHook";

//Pages
import Home from "../pages/Home";
import Onboarding from "../pages/Onboarding";

export const OnboardingGuard = () => {
    const isUserTypeSet = useIsUserTypeSet()

    return (
        isUserTypeSet ? <Home /> : <Onboarding />
    )
}