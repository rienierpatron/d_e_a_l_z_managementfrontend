import React from "react";
import { useGoogleLogin } from "@react-oauth/google"; 
import axios from "axios"; 
import { helper } from "@/helpers"; 
import { api } from "@/api";
import Button from "../Common/Button";

const CustomGoogleLogin = ({ onLoginSuccess }) => {
  const auth_type = "google"; // Auth type

  // Initialize the Google login using the useGoogleLogin hook
  const signIn = useGoogleLogin({
    onSuccess: async (response) => {

      const accessToken = response.access_token;
      if (accessToken) {
        // Store access token in cookies
        helper.cookie.setAccessToken(accessToken);

        try {
          // Fetch user info using the access token
          const userInfo = await getGoogleUserInfo(accessToken);
          // console.log("User Info:", userInfo);

          // social payload for Google registration
          const data = {
            social_payload: {
              profileObj: {
                id: userInfo.sub, // Google userInfo ID
                email: userInfo.email,
                verified_email: userInfo.email_verified,
                name: userInfo.name,
                given_name: userInfo.given_name,
                family_name: userInfo.family_name,
                picture: userInfo.picture,
                locale: userInfo.locale,
                hd: userInfo.hd, // Google domain if present (G Suite)
              },
              tokenId: accessToken, // Use the access token for authentication
            },
          };

          if (onLoginSuccess && typeof onLoginSuccess === "function") {
            onLoginSuccess(data);
          }

        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
    },
    onError: (err) => {
      console.error("Google login failed:", err);
    },
  });

  // Function to fetch user's Google profile using the access token
  const getGoogleUserInfo = async (accessToken) => {
    try {
      // Make an authenticated request to the Google API to fetch user info
      const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Return the user's profile data
      return response.data;
    } catch (error) {
      throw new Error("Error fetching user profile data.");
    }
  };

  return (
    <div className="relative">
      <Button
        onClick={signIn} // Trigger Google login on button click
        icon="/icons/google-icon.svg" // Path to your Google logo icon
        iconPosition="left" // Icon on the left of the text
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