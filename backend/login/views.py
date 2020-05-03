from django.shortcuts import render, HttpResponse
from login.models import (add_user, add_session, get_user_data, user_valid,
                          get_user_images, add_user_image)


# Create your views here.
def register(request):
    if request.method == 'GET':
        return render(request, 'registration.html')

    name = request.POST.get('name')
    email = request.POST.get('email')
    password = request.POST.get('password')
    age = request.POST.get('age')
    profile_image = request.POST.get('profile_image')
    if add_user(name, email, profile_image, age, password):
        data = get_user_data(email)
        return render(request, 'profile.html', data)
    else:
        return HttpResponse('Email Already Used.')


def login(request):
    """
    Authenticates user and redirects to user profile.
    :return:
        - User profile page if authentication succeeds.
        - Login page with error msg dict.
    """
    email = request.POST['email']
    password = request.POST['password']
    if user_valid(email, password):
        data = get_user_data(email)
        return render(request, 'profile.html', data)
    else:
        return render(request, 'login.html',
                      {'response_message': 'Login Failed.'})


def get_images(request):
    """
    Get all user Images with his email
    """
    email = request.POST['email']
    images = get_user_images(email)
    return render(request, 'view.html', images)


def add_images_to_user_images(request):
    """
    Adding Image to user images
    """
    email = request.POST['email']
    image = request.POST['image']
    images = add_user_image(email, email)
    return render(request, 'view.html', {'response_message': 'image added.'})
