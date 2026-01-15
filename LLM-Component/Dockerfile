FROM python:3.10

WORKDIR /app

COPY main.py ./
COPY FoodSuggestion ./FoodSuggestion
COPY data/food_data_encoded.csv ./data/

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5678

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5678"]