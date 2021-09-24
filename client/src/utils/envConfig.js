const isProduction = process.env.NODE_ENV === "production";
const baseDomain = isProduction ? "" : "https://localhost:3002";

export { isProduction, baseDomain };