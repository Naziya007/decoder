import React, { useState, useEffect } from "react";

function App() {
  const [jwt, setJwt] = useState("");
  const [header, setHeader] = useState(null);
  const [payload, setPayload] = useState(null);
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");

  const decodeBase64Url = (str) => {
    try {
      const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
      const decoded = atob(base64);
      return JSON.parse(decoded);
    } catch (err) {
      throw new Error("Decoding failed");
    }
  };

  const decodeJWT = () => {
    setError("");
    setHeader(null);
    setPayload(null);
    setSignature("");

    if (!jwt.includes(".")) {
      setError("Invalid JWT format. Missing '.' separators.");
      return;
    }

    const parts = jwt.split(".");
    if (parts.length !== 3) {
      setError("JWT should have 3 parts (header.payload.signature)");
      return;
    }

    try {
      const decodedHeader = decodeBase64Url(parts[0]);
      const decodedPayload = decodeBase64Url(parts[1]);
      setHeader(decodedHeader);
      setPayload(decodedPayload);
      setSignature(parts[2]);
    } catch (err) {
      setError("Error decoding JWT: " + err.message);
    }
  };

  const handleClear = () => {
    setJwt("");
    setHeader(null);
    setPayload(null);
    setSignature("");
    setError("");
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  // useEffect(() => {
  //   if (jwt.trim().length > 0) {
  //     decodeJWT();
  //   }
  // }, [jwt]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>🛡️ JWT Decoder</h1>
        <textarea
          placeholder="Paste your JWT token here..."
          value={jwt}
          onChange={(e) => setJwt(e.target.value)}
          style={styles.textarea}
        />

        <div style={styles.buttonGroup}>
          <button onClick={decodeJWT} style={styles.buttonPrimary}>Decode</button>
          <button onClick={handleClear} style={styles.buttonDanger}>Clear</button>
          <button onClick={() => copyToClipboard(jwt)} style={styles.buttonSecondary}>Copy JWT</button>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        {header && (
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>🔹 Header</h3>
            <pre style={styles.code}>{JSON.stringify(header, null, 2)}</pre>
            <button onClick={() => copyToClipboard(JSON.stringify(header))} style={styles.smallButton}>Copy Header</button>
          </div>
        )}

        {payload && (
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>📦 Payload</h3>
            <pre style={styles.code}>{JSON.stringify(payload, null, 2)}</pre>
            <button onClick={() => copyToClipboard(JSON.stringify(payload))} style={styles.smallButton}>Copy Payload</button>
          </div>
        )}

        {signature && (
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>✍️ Signature</h3>
            <pre style={styles.code}>{signature}</pre>
            <button onClick={() => copyToClipboard(signature)} style={styles.smallButton}>Copy Signature</button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#111827",
    color: "#e5e7eb",
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "'Fira Code', monospace",
  },
  container: {
    maxWidth: "700px",
    margin: "0 auto",
    backgroundColor: "#1f2937",
    borderRadius: "10px",
    padding: "30px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "30px",
    color: "#22d3ee",
  },
  textarea: {
    width: "100%",
    height: "120px",
    fontSize: "16px",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #4b5563",
    backgroundColor: "#374151",
    color: "#f9fafb",
    fontFamily: "monospace",
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "16px",
    marginBottom: "20px",
  },
  buttonPrimary: {
    backgroundColor: "#10b981",
    color: "#fff",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
  buttonSecondary: {
    backgroundColor: "#6366f1",
    color: "#fff",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
  buttonDanger: {
    backgroundColor: "#ef4444",
    color: "#fff",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
  smallButton: {
    marginTop: "10px",
    padding: "8px 16px",
    fontSize: "14px",
    backgroundColor: "#f59e0b",
    color: "#000",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  card: {
    backgroundColor: "#111827",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    border: "1px solid #374151",
  },
  cardTitle: {
    color: "#facc15",
    marginBottom: "10px",
  },
  code: {
    backgroundColor: "#1e293b",
    padding: "10px",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#d1d5db",
    overflowX: "auto",
    fontFamily: "monospace",
  },
  error: {
    backgroundColor: "#dc2626",
    color: "#fff",
    padding: "10px",
    borderRadius: "6px",
    marginTop: "10px",
  },
};

export default App;
