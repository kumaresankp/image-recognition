import os
from PIL import Image
from datetime import datetime, timedelta
from flask import Flask, render_template, request, flash, redirect, url_for
from werkzeug.utils import secure_filename
from threading import Timer
from pytesseract import pytesseract

UPLOAD_FOLDER = r'D:\Project1\image_recognition\uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SECRET_KEY'] = 'sxcvgygfvbgfdsdcvbhg'
app.config['OCR_RESULT'] = ''
app.config['OCR_COMPLETED'] = False

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_data(image_path):
    path_to_tesseract = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
    img = Image.open(image_path)
    pytesseract.tesseract_cmd = path_to_tesseract
    text = pytesseract.image_to_string(img)
    return text

def schedule_extraction(image_path, scheduled_time):
    current_time = datetime.now()
    time_diff = (scheduled_time - current_time).total_seconds()

    if time_diff <= 0:
        app.config['OCR_RESULT'] = extract_data(image_path)
        app.config['OCR_COMPLETED'] = True
    else:
        t = Timer(time_diff, extract_data, args=[image_path])
        t.start()

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # Check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)

        file = request.files['file']

        # Check if no file is selected
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)

        # Check if the file is allowed
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            flash('File uploaded successfully')

            # Schedule the data extraction
            scheduled_time = request.form['scheduled_time']
            scheduled_time = datetime.strptime(scheduled_time, '%Y-%m-%dT%H:%M')

            # Perform the data extraction at the scheduled time
            schedule_extraction(os.path.join(app.config['UPLOAD_FOLDER'], filename), scheduled_time)

            return redirect(url_for('image_ocr'))

    return render_template('index.html')

@app.route('/image-ocr')
def image_ocr():
    ocr_completed = app.config['OCR_COMPLETED']
    if ocr_completed:
        ocr_result = app.config['OCR_RESULT']
        return redirect(url_for('ocr', ocr_result=ocr_result))
    else:
        remaining_time = 0
        return render_template('image_ocr.html', remaining_time=remaining_time)

@app.route('/ocr')
def ocr():
    ocr_result = request.args.get('ocr_result')
    return render_template('ocr.html', ocr_result=ocr_result)

if __name__ == '__main__':
    app.run(debug=True)
