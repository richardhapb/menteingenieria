from pathlib import Path
import os
from decouple import config

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config('SECRET_KEY')
DEBUG = config('DEBUG', default=False, cast=bool)

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'contacto',
    'rest_framework',
    'blog',
    'storages',
    'openai_requests',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    # 'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # 'openai_requests.middleware.RestrictIPMiddleware',
]

CORS_ALLOW_CREDENTIALS = True
CSRF_COOKIE_SECURE = True
CSRF_COOKIE_SAMESITE = 'Lax'

CSRF_TRUSTED_ORIGINS = [
    'http://localhost:5173',
    'http://localhost:4173',
    'http://127.0.0.1',
    'https://3.145.58.151',
    'https://3.145.58.151:443',
    'http://3.145.58.151:443',
    'http://179.2.28.24',
    'https://179.2.28.24',
    'http://172.26.13.221',
    'https://172.26.13.221',
    'https://www.menteingenieria.com',
    'https://menteingenieria.com',
    '*'
]

ALLOWED_HOSTS = [
    '3.145.58.151',  
    'menteingenieria.com',
    'www.menteingenieria.com',
    'localhost',  
    '172.26.13.221'
]

ROOT_URLCONF = 'menteingenieria.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'menteingenieria.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': config('DBNAME'),
        'USER': config('USERNAME'),
        'PASSWORD': config('USERPASS'),
        'HOST': config('HOSTNAME'),
        'PORT': '3306',
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'es-cl'

TIME_ZONE = 'America/Santiago'

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://localhost:4173',
    'http://127.0.0.1',
    'https://3.145.58.151',
    'http://179.2.28.24',
    'https://179.2.28.24',
    'http://172.26.13.221',
    'https://172.26.13.221',
    'https://www.menteingenieria.com',
    'https://menteingenieria.com',
]

REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema',
}

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.mail.me.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = config('MAIL_USER')
EMAIL_HOST_PASSWORD = config('MAIL_PASS')


# Configuración para S3
AWS_ACCESS_KEY_ID = config('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = config('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = config('AWS_BUCKET_NAME')
AWS_S3_REGION_NAME = config('AWS_REGION') 
AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
AWS_S3_OBJECT_PARAMETERS = {
    'CacheControl': 'max-age=86400',
}

# Directorio donde se guardarán temporalmente los archivos estáticos antes de subirlos a S3
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Directorio donde se guardarán temporalmente los archivos estáticos antes de subirlos a S3
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Almacenar archivos estáticos en S3
STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
STATIC_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/static/'  

# Almacenar archivos multimedia en S3
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
MEDIA_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/media/' 


## SECURITY
SECURE_HSTS_SECONDS = 3600
SECURE_SSL_REDIRECT = not config('DEBUG', default=False, cast=bool)
SECURE_HSTS_INCLUDE_SUBDOMAINS = SECURE_SSL_REDIRECT
SESSION_COOKIE_SECURE = SECURE_SSL_REDIRECT
SECURE_HSTS_PRELOAD = SECURE_SSL_REDIRECT
