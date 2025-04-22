import dotenv from "dotenv";
dotenv.config();

export const kcConfig = {
    port: process.env.PORT,
    realm: process.env.KEYCLOAK_REALM,
    clientId: process.env.KEYCLOAK_CLIENT_ID,
    clientSecret: process.env.KEYCLOAK_CLIENT_SECRET
}