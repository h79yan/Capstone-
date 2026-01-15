import json

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from FoodSuggestion.feature_extraction import estimate_meal_calories
from FoodSuggestion.random_forest import recommend_food

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with your frontend URL for security
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (POST, GET, OPTIONS, etc.)
    allow_headers=["*"],  # Allow all headers
)


class UserInput(BaseModel):
    text: str


@app.post("/api/ml/recommend")
def get_food_recommendation(user_input: UserInput):
    calorie_result = estimate_meal_calories(user_input.text)

    if isinstance(calorie_result, str):
        return {"error": calorie_result}

    low_cal, high_cal = calorie_result

    low_cal_recommendation = json.loads(recommend_food(low_cal))
    high_cal_recommendation = json.loads(recommend_food(high_cal))

    return {
        "low_cal_recommendation": low_cal_recommendation,
        "high_cal_recommendation": high_cal_recommendation
    }