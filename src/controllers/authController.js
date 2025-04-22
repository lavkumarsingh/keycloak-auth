import axios from "axios";
import qs from "qs";
import crypto from "crypto";
import pkceChallenge from "pkce-challenge";
import dotenv from "dotenv";
dotenv.config();


const keycloakBaseURI = process.env.KEYCLOAK_BASE_URI;
const realm = process.env.KEYCLOAK_REALM;
const clientId = process.env.KEYCLOAK_CLIENT_ID;
const redirectUri = `${process.env.AUTH_URI}/callback`;
const clientSecret = process.env.KEYCLOAK_CLIENT_SECRET;

export const login = async (req, res) => {
    const challenge = await pkceChallenge(128);
    const state = crypto.randomUUID();
    
    // Store codeVerifier and state in session
    req.session.codeVerifier = challenge?.code_verifier;
    req.session.state = state;
  
    console.log("Session ID:", req.sessionID, req.session);

    const authUrl = `${keycloakBaseURI}/realms/${realm}/protocol/openid-connect/auth?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&code_challenge=${challenge?.code_challenge}&code_challenge_method=S256&state=${state}`;
    
    // Redirect the client to the authentication URL
    res.status(200).json({ url: authUrl });
  };
  

  export const callback = async (req, res) => {
    const { code, state } = req.query;
  
    console.log("Session ID:", req.sessionID, req.session);
    
    // Check if the state is valid (to prevent CSRF attacks)
    if (state !== req.session.state) return res.status(400).json({ error: 'Invalid state' });
  
    try {
      // Continue with token exchange
      const response = await axios.post(
        `${keycloakBaseURI}/realms/${realm}/protocol/openid-connect/token`,
        qs.stringify({
          grant_type: "authorization_code",
          code,
          redirect_uri: redirectUri,
          client_id: clientId,
          client_secret: clientSecret,
          code_verifier: req.session.codeVerifier,
        }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
  
      res.status(200).json(response.data);
    } catch (err) {
      console.log("callback error ::: ", err)
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
