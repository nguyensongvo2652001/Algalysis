from flask import Flask, request, jsonify
from flask_cors import CORS
from model import analyze_text
from dotenv import load_dotenv

import os

load_dotenv()

app = Flask(__name__)
app.config['DEBUG'] = True

NODEJS_BACKEND_BASE_URL = os.getenv("NODEJS_BACKEND_BASE_URL")
CORS(app, origins=NODEJS_BACKEND_BASE_URL, methods='*')


@app.route('/api/test/', methods=['GET'])
def hello():
    return 'Hello, World!'

@app.route('/api/model/analyzeText/', methods=['POST'])
def analyze_text_controller():
    try:
        data = request.get_json()
        text = data.get('text')
        response = None
        status_code = None 
        analyze_result = analyze_text(text)
        response = {
            "status": "success", 
            "data": {
                "analyzeResult": analyze_result 
            }
        }
        status_code = 200 
    except Exception as error:
        print(error)
        response = {
            "status": "fail",
            "message": str(error)
        }
        status_code = 500 

    return jsonify(response), status_code


if __name__ == '__main__':
    app.run()
