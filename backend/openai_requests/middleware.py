from django.http import HttpResponseForbidden


class RestrictIPMiddleware:
    ALLOWED_IPS = ['127.0.0.1', '3.145.58.151', '179.2.28.24', '172.26.13.221']  

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        ip = self.get_client_ip(request)
        if ip not in self.ALLOWED_IPS:
            return HttpResponseForbidden("Access denied.")
        return self.get_response(request)

    def get_client_ip(self, request):
        # Verifica si el encabezado 'X-Forwarded-For' está presente (usualmente usado por proxies)
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]  # Toma la primera IP en la lista
        else:
            ip = request.META.get('REMOTE_ADDR')  # Usa 'REMOTE_ADDR' si no hay proxy
        return ip
