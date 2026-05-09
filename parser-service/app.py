from flask import Flask, jsonify

app = Flask(__name__)


@app.get("/health")
def health_check():
    return jsonify({
        "status": "ok",
        "service": "logshield-parser-service",
        "purpose": "educational prototype parser"
    })


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
