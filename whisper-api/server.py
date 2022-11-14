from flask import Flask
from flask import request
from flask_cors import CORS
import whisper
import os

app = Flask(__name__)
cors = CORS(app)

app.config['FILE_UPLOADS'] = "./files"

model = whisper.load_model("large")

@app.route("/", methods=['GET'])
def home():
    return "Test Route"

@app.route('/api/upload', methods = ['POST'])
def upload_file():
    file = request.files['file']
    file.save(os.path.join(app.config['FILE_UPLOADS'], 'audio'))
    result = model.transcribe(f'./files/audio')
    return result["text"]

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
