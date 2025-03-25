from django.shortcuts import render

from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import Todo

def welcome_page(request):
  return render(request, 'taskapp/welcome.html')
class TodoView(viewsets.ModelViewSet):
  serializer_class =TodoSerializer
  queryset =Todo.objects.all()