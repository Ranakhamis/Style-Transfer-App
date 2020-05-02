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
