# Create your models here.
from pymongo import MongoClient
from bson.objectid import ObjectId

client = MongoClient('localhost', 27017)
db = client.componats


def add_user(name, email, profile_image, age, password):
    """
    Adds a new user to the database.
    :return: True if successful.
    :return: False if user already exists.
    """
    users = db.users
    # Prevent creating a user with a pre-existing email
    if users.find({'email': email}).count() > 0:
        return False

    user = {
        'name': name,
        'email': email,
        'password': password,
        'profile_image': profile_image,
        'age': age,
        'images': []}
    users.insert(user)

    return True


def user_valid(email, password):
    users = db.users
    user = users.find({'email': email})
    if user.count() > 0 and user[0]['password'] == password:
        return True
    else:
        return False


def get_user_data(email):
    """
    Gets a specific user articles.
    :param email: User email.
    :return: Dictionary containing User"""
    user = db.users.find({'email': email})[0]
    return user


def get_session_email(session_id):
    return db.Sessions.find({'_id': ObjectId(session_id)})[0]['user_email']


def get_user_images(session_id):
    email = db.Sessions.find({'_id': ObjectId(session_id)})[0]['user_email']
    return db.users.find({'email': email})[0]['images']


def add_user_image(user_email):
    user = db.users.find({'email': user_email})[0]
    
