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
    Gets a specific user data
    :param email: User email.
    :return: Dictionary containing User data
    """
    user = db.users.find({'email': email})[0]
    return user


def get_user_images(user_email):
    """
    Add Image to User account.
    :param email: User email.
    :return: Dictionary containing User Image
    """

    return db.users.find({'email': user_email})[0]['images']


def add_user_image(user_email, image):
    """
    Add Image to User account.
    :param email: User email.
    """

    user = db.users.find({'email': user_email})[0]
    # > db.users.update({"email":"Mostafamousa"},{$push:{"images":"2dsd"}})
    user.update({'email': user_email}, {'$push': {'images': image}})
