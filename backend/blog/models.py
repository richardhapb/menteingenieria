from django.db import models
from django.contrib.auth.models import User
from storages.backends.s3boto3 import S3Boto3Storage

# Article of the blog

class Article(models.Model):
    title = models.CharField(max_length=100)
    author = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    content = models.TextField()
    image = models.ImageField(upload_to='articles/cover/', storage=S3Boto3Storage(), null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    published = models.BooleanField()
    
    def __str__(self):
        return str(self.title)
