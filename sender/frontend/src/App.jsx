import React, { useState } from "react";

const FACILITIES = [
  "kern", "user", "mail", "daemon", "auth", "syslog", "lpr", "news",
  "uucp", "cron", "authpriv", "ftp", "local0", "local1", "local2",
  "local3", "local4", "local5", "local6", "local7"
];


export default function App() {
  const [host, setHost] = useState("tester");
  const [ports, setPorts] = useState("514");
  const [transport, setTransport] = useState("tcp");
  const [facility, setFacility] = useState("user");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    const portList = ports.split(",").map(p => parseInt(p.trim(), 10)).filter(p => !isNaN(p));
    if (portList.length === 0) {
      setStatus({ type: "error", text: "Please enter at least one valid port." });
      return;
    }
    let allOk = true;
    let messages = [];
    for (const port of portList) {
      try {
        const res = await fetch("/api/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ host, port, transport, facility, message })
        });
        const data = await res.json();
        if (res.ok) {
          messages.push(`Port ${port}: ${data.message}`);
        } else {
          allOk = false;
          messages.push(`Port ${port}: ${data.error || "Failed to send"}`);
        }
      } catch (err) {
        allOk = false;
        messages.push(`Port ${port}: ${err.message}`);
      }
    }
    setStatus({ type: allOk ? "success" : "error", text: messages.join("; ") });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Syslog Sender</h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Syslog Tester Host</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={host}
            onChange={e => setHost(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Ports (comma separated)</label>
          <input
            className="w-full border px-3 py-2 rounded"
            type="text"
            value={ports}
            onChange={e => setPorts(e.target.value)}
            placeholder="514,5514"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Transport</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={transport}
            onChange={e => setTransport(e.target.value)}
          >
            <option value="tcp">TCP</option>
            <option value="udp">UDP</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Facility</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={facility}
            onChange={e => setFacility(e.target.value)}
          >
            {FACILITIES.map(fac => (
              <option key={fac} value={fac}>{fac}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Message</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            rows={4}
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
          />
        </div>
        <button
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
          type="submit"
        >
          Send
        </button>
        {status && (
          <div
            className={`mt-4 text-center font-medium ${
              status.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status.text}
          </div>
        )}
      </form>
    </div>
  );
}
