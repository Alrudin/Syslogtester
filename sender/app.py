
from flask import Flask, request, jsonify, send_from_directory
import syslog_client
import os

app = Flask(__name__, static_folder="frontend/dist", static_url_path="/")

FACILITIES = [
	'kern', 'user', 'mail', 'daemon', 'auth', 'syslog', 'lpr', 'news',
	'uucp', 'cron', 'authpriv', 'ftp', 'local0', 'local1', 'local2',
	'local3', 'local4', 'local5', 'local6', 'local7'
]

@app.route("/api/send", methods=["POST"])
def api_send():
	data = request.get_json()
	host = data.get("host", "tester")
	port = int(data.get("port", 514))
	facility = data.get("facility", "user")
	message = data.get("message", "")
	transport = data.get("transport", "tcp")
	try:
		syslog_client.send(message, host=host, port=port, facility=facility, transport=transport)
		return jsonify({"message": "Message sent successfully!"})
	except Exception as e:
		return jsonify({"error": str(e)}), 500

# Serve React static files
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
	if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
		return send_from_directory(app.static_folder, path)
	else:
		return send_from_directory(app.static_folder, "index.html")

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=8080, debug=True)
