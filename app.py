from flask import Flask, render_template, request, redirect
import requests 
import datetime

app = Flask(__name__)

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/stock/<id>')
def stock(id):
  today =   datetime.date.today()
  pastdate = datetime.date.today() + datetime.timedelta(-28) 
  apikey='6TXYPTLVAQDT4WRK'
  
  url = f'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={id}&apikey={apikey}'
  data = requests.get(url).json()
  print(data)
  return data


@app.route('/about')
def about():
  return render_template('about.html')

if __name__ == '__main__':
  app.run(debug=True)
