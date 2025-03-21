from django.db import models

class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    company = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return str(self.name)
class Service(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return str(self.name)
    
class Request(models.Model):
    contact = models.ForeignKey(Contact, on_delete=models.CASCADE, null=False, blank=False)
    service = models.ForeignKey(Service, on_delete=models.CASCADE, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    text = models.TextField()

    def __str__(self):
        return f"Solicitud de {self.contact.nombre} el {self.date}"
    

        
