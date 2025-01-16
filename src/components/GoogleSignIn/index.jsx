import React, { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { helper } from "@/helpers";
import Button from "../Common/Button";

const CustomGoogleLogin = ({ onLoginSuccess }) => {
  const [user, setUser] = useState(null); 
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Only proceed if the user object is populated
    if (helper.notEmpty(user?.access_token)) {
      console.log("Fetching user info...");
      getGoogleUserInfo(user.access_token); // Fetch Google user info
    }
  }, [user]); // Trigger effect when user state is updated

  useEffect(() => {
    // Only proceed if the profile object is populated
    if (helper.notEmpty(profile)) {
      onLoginSuccess(profile); // Call onLoginSuccess with the profile data
    }
  }, [profile]); // Trigger effect when profile state is updated

  // Google login success handler
  const signIn = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
    },
    onError: (error) => {
      console.error("Login Failed:", error);
    },
  });

  // Function to fetch Google's user profile using the access token
  const getGoogleUserInfo = async (accessToken) => {
    try {
      // Make an authenticated request to the Google API to fetch user info
      const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response && helper.cmpStr(response.status, '200')) {
        const data = {
          social_payload: {
            profileObj: {
              id: response.data.sub, // Google user ID
              email: response.data.email,
              verified_email: response.data.email_verified,
              name: response.data.name,
              given_name: response.data.given_name,
              family_name: response.data.family_name,
              picture: response.data.picture,
              locale: response.data.locale,
              hd: response.data.hd,
            },
            tokenId: accessToken, // Use the access token for authentication
          },
        };

        // Update profile state with the fetched data
        setProfile(data);
      }
    } catch (error) {
      return helper.general.alert("error", {
        message: "Something went wrong.",
      });
    }
  };

  return (
    <div className="relative">
      <Button
        onClick={signIn}
        icon="/icons/google-icon.svg"
        iconPosition="left"
        className="border-0 focus:outline-none text-midnight-blue"
        fullWidth
        isRound
      >
        Google
      </Button>
    </div>
  );
};

export default CustomGoogleLogin;