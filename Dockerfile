FROM python:3.8

ENV PYTHONUNBUFFERED 1

RUN mkdir /app
WORKDIR /app
# COPY requirements.txt /app/
# RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

# COPY create_schema.sql /app/
# COPY create_tables.sql /app/

# RUN psql -U yourusername -d yourdbname -a -f create_schema.sql
# RUN psql -U yourusername -d yourdbname -a -f create_tables.sql

CMD ["python", "app.py"]