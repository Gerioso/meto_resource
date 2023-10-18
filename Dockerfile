FROM python:3.9-slim

ENV FLASK_APP=wsgi.py
ENV FLASK_RUN_HOST=127.0.0.1
ENV FLASK_RUN_PORT=8000

WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

CMD ["gunicorn", "-b", "127.0.0.1:8000", "web_app.wsgi:app"]