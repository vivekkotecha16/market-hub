import { Navigate } from "react-router-dom";
import { getLoggedInUser } from "../helpers/getLoggedInUser"


export const ProtectedPage = ({ children }: React.PropsWithChildren) => {
    if (!getLoggedInUser()) {
        return <Navigate to="/login" />
    }

    return <main>
        {children}
    </main>
}