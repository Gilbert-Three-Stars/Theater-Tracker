from app import app, db, bcrypt
from schemas import UserSchema, TheaterSchema
from app.models import Theater, User
import sqlalchemy as sa
import sqlalchemy.orm as so
from flask import jsonify, request, make_response
# the lowercase request is an object that is an instance of the class Request

@app.route('/')
def default():
    return 'hello world'


@app.route('/theaters')
def get_theaters():
    # fetch theaters from the database and return as json object
    query = sa.select(Theater)
    theater_objects = db.session.scalars(query).all()
    schema = TheaterSchema(many=True)
    theaters = schema.dump(theater_objects)
    return jsonify(theaters)

@app.route('/login', methods=['POST'])
def check_login():
    # fetch users from the database and check against the username and password received
    # curUser = request.get_json(force=True)
    # print(curUser)
    userLoginInfo = request.get_json(force=True)
    username = userLoginInfo['username']
    password = userLoginInfo['password']

    userSelect = sa.Select(User).where(User.username == username)
    userObject = db.session.scalars(userSelect).all()
    schema = UserSchema(many=True)
    curUser = schema.dump(userObject)
    if(len(curUser) == 0): # there is no user with this username
        # (body, status)
        # unexpected character at line 1 column 1 of JSON data
        # string encoded to UTF-8 as the body.
        return make_response(jsonify("Username not found"), 200)
    # there is a user with the username, so we need to check the password
    if(bcrypt.check_password_hash(curUser[0]['passwordHash'], password)):
        userDict = {
            "id": curUser[0]['id'],
            "email": curUser[0]['email'],
            "username": curUser[0]['username'],
            "bookmarkedTheaters": curUser[0]['bookmarkedTheaters']
        }
        return make_response(jsonify(userDict), 200)
    # if we made it here, the user exists but the password is wrong.
    # https://stackoverflow.com/questions/32752578/whats-the-appropriate-http-status-code-to-return-if-a-user-tries-logging-in-wit
    return make_response(jsonify("Incorrect password"), 200)


@app.route('/register', methods=['POST'])
def register_user():
    userLoginInfo = request.get_json(force=True)
    username = userLoginInfo['username']
    password = userLoginInfo['password']
    userSelect = sa.Select(User).where(User.username == username)
    userObject = db.session.scalars(userSelect).all()
    schema = UserSchema(many=True)
    curUser = schema.dump(userObject)
    if(len(curUser) != 0):
        return make_response(jsonify("Username taken", 200))
    passwordHash = bcrypt.generate_password_hash(password).decode('utf-8')
    newUser = User(username=username, passwordHash=passwordHash)
    db.session.add(newUser)
    db.session.commit()
    return make_response(jsonify("Successfully registered", 200))


