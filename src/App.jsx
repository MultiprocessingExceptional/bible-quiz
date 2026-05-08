import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";

// ✅ Paste your Firebase config here
const firebaseConfig = {
  apiKey: "AIzaSyCv2YQWjNH-pyMrvBh4Bm4VPZYB2_SZMfE",
  authDomain: "bible-quiz-63f59.firebaseapp.com",
  databaseURL: "https://bible-quiz-63f59-default-rtdb.firebaseio.com",
  projectId: "bible-quiz-63f59",
  storageBucket: "bible-quiz-63f59.firebasestorage.app",
  messagingSenderId: "1053776137310",
  appId: "1:1053776137310:web:f8a23ce95e3da8b1f338cf",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Detect URL params
const params = new URLSearchParams(window.location.search);
const isHost = params.get("host") === "true";
const isAdmin = params.get("admin") === "true";

function App() {
  const [dbStatus, setDbStatus] = useState("Connecting...");

  useEffect(() => {
    // Simple connectivity check
    const testRef = ref(db, ".info/connected");
    const unsub = onValue(testRef, (snap) => {
      setDbStatus(snap.val() ? "✅ Firebase Connected" : "⚠️ Offline");
    });
    return () => unsub();
  }, []);

  const view = isAdmin ? "admin" : isHost ? "host" : "audience";

  const styles = {
    wrapper: {
      minHeight: "100vh",
      background: "#0f0f1a",
      color: "#f0f0f0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Segoe UI', sans-serif",
      gap: "16px",
    },
    badge: {
      fontSize: "12px",
      background: "#1e1e3a",
      border: "1px solid #444",
      borderRadius: "6px",
      padding: "4px 12px",
      color: "#aaa",
      letterSpacing: "1px",
      textTransform: "uppercase",
    },
    title: {
      fontSize: "48px",
      fontWeight: "800",
      background: "linear-gradient(135deg, #f0c040, #e07020)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      margin: 0,
    },
    subtitle: {
      fontSize: "18px",
      color: "#888",
      margin: 0,
    },
    status: {
      fontSize: "13px",
      color: "#66ccaa",
      marginTop: "8px",
    },
  };

  return (
    <div style={styles.wrapper}>
      <span style={styles.badge}>
        {view === "admin"
          ? "🛠 Admin — Question Editor"
          : view === "host"
            ? "🎙 Host Controls"
            : "👥 Audience View"}
      </span>
      <h1 style={styles.title}>Bible Quiz</h1>
      <p style={styles.subtitle}>Coming Soon — App Under Construction</p>
      <p style={styles.status}>{dbStatus}</p>
    </div>
  );
}

export default App;
