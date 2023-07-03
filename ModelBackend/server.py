from flask import Flask, request, jsonify
from model import analyze_text

app = Flask(__name__)

@app.route('/api/test/', methods=['GET'])
def hello():
    return 'Hello, World!'

@app.route('/api/model/analyzeText/', methods=['POST'])
def analyze_text_controller():
    data = request.get_json()
    text = data.get('text')
    response = None
    status_code = None 
    try:
        analyze_result = analyze_text(text)
        response = {
            "status": "success", 
            "data": {
                "analyzeResult": analyze_result 
            }
        }
        status_code = 200 
    except Exception as error:
        response = {
            "status": "fail",
            "message": str(error)
        }
        status_code = 500 

    return jsonify(response), status_code


if __name__ == '__main__':
    app.run()
