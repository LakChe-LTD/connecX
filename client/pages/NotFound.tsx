import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";




const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | KonnectX</title>
        <meta
          name="description"
          content="Oops! The page you are looking for does not exist. Return to the KonnectX homepage."
        />
        <meta
          name="keywords"
          content="Konnectx 404, page not found, error, missing page"
        />
        <meta property="og:title" content="404 - Page Not Found | KonnectX" />
        <meta
          property="og:description"
          content="Oops! The page you are looking for does not exist. Return to the KonnectX homepage."
        />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/images/favicon.png" />
      </Helmet>


    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
    </>
  );
};

export default NotFound;
