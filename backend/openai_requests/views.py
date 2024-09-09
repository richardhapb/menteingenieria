from openai import OpenAI
from django.http import JsonResponse
from decouple import config
import logging

logger = logging.getLogger(__name__)

def openai_request(request):
    openai = OpenAI(api_key=config('OPENAI_API_KEY'))

    try:
        response = openai.completions.create(
            model="gpt-3.5-turbo-instruct",
            prompt=request.body.decode("utf-8"),
            max_tokens=200,
            temperature=0.7,
        )
        generated_text = response.choices[0].text.strip()

        return JsonResponse({"text": generated_text})
    
    except Exception as e:
        logger.error(f"OpenAI request failed: {e}")
        return JsonResponse({"error": str(e)}, status=500)
