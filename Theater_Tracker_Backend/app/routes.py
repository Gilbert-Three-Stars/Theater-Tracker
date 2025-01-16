from app import app, db, bcrypt
from schemas import UserSchema, TheaterSchema
from app.models import Theater, User
import sqlalchemy as sa
import sqlalchemy.orm as so
from flask import jsonify

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

@app.route('/login/<username>/<password>')
def check_login(username, password):
    # fetch users from the database and check against the username and password received
    userSelect = sa.Select(User).where(User.username == username)
    userObject = db.session.scalars(userSelect).all()
    schema = UserSchema(many=True)
    curUser = schema.dump(userObject)
    if(len(curUser) == 0): # there is no user with this username
        return jsonify('no user') # TODO: figure out what to return
    # there is a user with the username, so we need to check the password
    if(bcrypt.check_password_hash(curUser[0]['passwordHash'], password)):
        return jsonify(curUser)
    # if we made it here, the user exists but the password is wrong.
    return jsonify('wrong password') # TODO: figure out what to return

@app.route('/register/<username>/<password>')
def register_user(username, password):
    userSelect = sa.Select(User).where(User.username == username)
    userObject = db.session.scalars(userSelect).all()
    schema = UserSchema(many=True)
    curUser = schema.dump(userObject)
    if(len(curUser) != 0):
        return jsonify('username taken -> {}'.format(curUser))
    passwordHash = bcrypt.generate_password_hash(password).decode('utf-8')
    newUser = User(username=username, passwordHash=passwordHash)
    db.session.add(newUser)
    db.session.commit()
    return jsonify(200)


