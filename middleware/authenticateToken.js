const { getAuth } = require("firebase-admin/auth");
const { initializeApp } = require("firebase-admin/app");
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};
initializeApp(firebaseConfig);

module.exports = authenticateToken;

async function authenticateToken(req, res, next) {
  try {
    const token = req.headers.authorization;
    const userDetails = await getAuth().verifyIdToken(token);
    req.uid = userDetails.sub;
    next();
  } catch (error) {
    console.log(error);
    next({ status: true, code: 401 });
  }
}
