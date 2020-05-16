from flask import Flask, request, jsonify, abort
from Inference import Inference


app = Flask(__name__)
api = Inference()


@app.route('/')
def index():
    return "Our Very deep Model is ALIVE"


@app.route('/predict/<name>', methods=['GET', 'POST'])
def prediction(name):
    receiver = request.get_json()
<<<<<<< HEAD
    
    data_json = api.predict(receiver['style'], receiver['Base64Image'])
    print(data_json)
    print()
    return jsonify(data_json)
=======
    print(receiver)
    print()
    data_json = api.predict(name, receiver['Base64Image'])
    return jsonify({'Base64Image': data_json})
>>>>>>> master


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5020)
