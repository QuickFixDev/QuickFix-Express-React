/* eslint-disable react/prop-types */
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";


const Auth0ProviderWithNavigate = ({ children }) => {
    const navigate = useNavigate();

    const domain = "quick-fix.us.auth0.com"
    const clientId = "4Yc303ZSBiruXeidWvxgwbF0oE2a9MDy"
    const redirectUri = "https://wonderful-coast-00d3ea010.4.azurestaticapps.net/";

    const onRedirectCallback = (appState) => {
        navigate(appState?.returnTo || window.location.pathname);
    };

    if (!(domain && clientId && redirectUri)) {
        return null;
    }

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: redirectUri,
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithNavigate;