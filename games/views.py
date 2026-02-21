from django.shortcuts import render

def index(request):
    context = {}
    return render(request, 'games/base.html', context)

def memorice(request):
    return render(request, 'games/memorice.html')