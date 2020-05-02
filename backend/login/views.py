from django.shortcuts import render, HttpResponse
from login.models import add_user, add_session, get_user_data, user_valid


# Create your views here.
def register(request):
    if request.method == 'GET':
        return render(request, 'stories/registration.html')

    name = request.POST.get('name')
    email = request.POST.get('email')
    password = request.POST.get('password')
    age = request.POST.get('age')
    profile_image = request.POST.get('profile_image')
    if add_user(name, email, profile_image, age, password):
        session_id = add_session(email)
        data = get_user_data(email)
        data.update({'session_id': session_id})
        return render(request, 'stories/profile.html', data)
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
        session_id = add_session(email)
        data = get_user_data(email)
        data.update({'session_id': session_id})
        return render(request, 'stories/profile.html', data)
    else:
        return render(request, 'stories/login.html',
                      {'response_message': 'Login Failed.'})

