from flask import Flask, render_template, request, make_response, jsonify
from req import getApi
app = Flask(__name__)

@app.route('/',)
def index():
    return render_template("index.html")

@app.route('/result', methods=["POST"])
def result():
    req = request.get_json()

    city = req['city']

    data = getApi(city)
    res = make_response(jsonify(data), 200)

    return res

if __name__ == "__main__":
    app.run()
