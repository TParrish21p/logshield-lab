from flask import Flask, jsonify, request

from log_parser import detect_alerts

app = Flask(__name__)


@app.get("/health")
def health_check():
    return jsonify({
        "status": "ok",
        "service": "logshield-parser-service",
        "purpose": "educational prototype parser"
    })


@app.post("/analyze")
def analyze_log_text():
    request_data = request.get_json(silent=True) or {}
    log_text = request_data.get("logText", "")

    if not log_text.strip():
        return jsonify({
            "error": "logText is required and cannot be empty"
        }), 400

    analysis_result = detect_alerts(log_text)

    return jsonify(analysis_result)


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)