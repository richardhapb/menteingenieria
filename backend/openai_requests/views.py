import logging

from decouple import config
from django.core.cache import cache
from django.http import JsonResponse
from django.utils import timezone
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.http import require_http_methods
from django_ratelimit.decorators import ratelimit
from openai import OpenAI

logger = logging.getLogger(__name__)

PROMPT = """
Muestra recomendaciones concretas para aumentar rentabilidad y sostenibilidad mediante IA, investigación de operaciones o inteligencia de negocios. Incluye:
- Metodología específica (ej. ML, Lean, Six Sigma)
- Caso de éxito con métricas
- Pasos de implementación viables
- ROI esperado

IMPORTANTE: Limita a 40 palabras. No uses listas, ni numeradas ni en viñetas.
"""
TIME_THRESHOLD = 20


@csrf_protect
@require_http_methods(["POST"])
@ratelimit(key="ip", rate="10/m", block=True)
def openai_request(request):
    # Get client IP for logging
    client_ip = get_client_ip(request)

    # Check global cache first (shared across all users)
    current_time = timezone.now()
    last_request_time = cache.get("last_request_time")
    last_request_content = cache.get("last_request_content")

    # If we have a cached response, return it
    if last_request_content:
        logger.info(f"Serving cached response to {client_ip}")
        return JsonResponse({"text": last_request_content})

    # Set last request time if not set
    if not last_request_time:
        cache.set("last_request_time", current_time, TIME_THRESHOLD)

    # Get API key securely
    api_key = config("OPENAI_API_KEY")
    if not api_key:
        logger.error("OpenAI API key not configured")
        return JsonResponse({"error": "Service configuration error"}, status=500)

    try:
        # Initialize OpenAI client
        openai = OpenAI(api_key=api_key)

        # Make request to OpenAI
        response = openai.completions.create(
            model="gpt-3.5-turbo-instruct",
            prompt=PROMPT,
            max_tokens=200,
            temperature=0.7,
        )

        # Extract and validate response
        generated_text = response.choices[0].text.strip()

        # Cache the result
        cache.set("last_request_content", generated_text, TIME_THRESHOLD)

        logger.info(f"Generated new response for {client_ip}")
        return JsonResponse({"text": generated_text})

    except Exception as e:
        logger.error(f"OpenAI request failed for {client_ip}: {e}")
        # Return generic error message (don't expose detailed errors to users)
        return JsonResponse(
            {"error": "Unable to generate recommendations at this time"}, status=500
        )


def get_client_ip(request):
    """Get client IP address from request"""
    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded_for:
        ip = x_forwarded_for.split(",")[0]
    else:
        ip = request.META.get("REMOTE_ADDR")
    return ip
