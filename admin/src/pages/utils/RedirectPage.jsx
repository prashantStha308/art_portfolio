import { useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Loading from "../../components/Loader";
import { useState, useEffect } from "react";

const RedirectPage = ({ to }) => {
    const navigator = useNavigate();
    const [error, setError] = useState({ error: false, title: "", description: "", status: 0 });

    useEffect(() => {
        // Ensure the `to` prop is a string before navigating
        if (typeof to !== "string") {
            setError({
                error: true,
                title: "Invalid Page",
                description: "Invalid page request. The page you searched for is not available",
                status: 404
            });
        } else {
            // Perform navigation after validation
            navigator(to);
        }
    }, [to, navigator]);

    // If error occurred, show the ErrorPage component
    if (error.error) {
        return <ErrorPage error={error} />;
    }

    return <Loading />;
}

export default RedirectPage;
