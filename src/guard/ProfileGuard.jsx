import { Outlet, Navigate, useNavigate } from "react-router";
import Cookies from "universal-cookie";
import useHttp from "../hooks/useHttp";
import { useState, useEffect } from "react";

const ProfileGuard = () => {
  const [request, setRequest] = useState(null);
  const [httpResponse, httpError, httpLoader] = useHttp(request);
  const navigate = useNavigate();

  const verifyToken = () => {
    return setRequest({
      method: "get",
      url: "http://localhost:8080/verify-token/" + token,
    });
  };

  const cookie = new Cookies();
  const token = cookie.get("sukdldtojken");

  useEffect(() => {
    if (!token) {
      navigate("/login"); // If there's no token, navigate to the login page.
    } else {
      verifyToken();
    }
  }, [token]);

  if (httpResponse) {
   // console.log('Response from server:', httpResponse.data);
    const userData = httpResponse.data;
    //console.log('Parsed user data:', userData);
  
    sessionStorage.setItem("user", JSON.stringify(userData));
  
    if (userData.emailVerified) {
      //console.log('User is email verified');
      return <Outlet />;
    } else {
      //console.log('User is not email verified');
      return navigate("/verification-mail");
    }
  }


  if (httpError) {
    return <Navigate to="/login" />;
  }

  // Return a loading indicator, null, or any other relevant UI while verifying the token.
  return null;
};

export default ProfileGuard;