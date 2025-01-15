from app import app, db
from schemas.userschema import UserSchema
from schemas.theaterschema import TheaterSchema
from app.models import Theater
from app.models import User
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

@app.route('/checklogin/<username>/<password>')
def check_login(username, password):
    # fetch users from the database and check against the username and password received
    userSelect = sa.Select(User).where(User.username == username)
    userObject = db.session.scalars(userSelect).all()
    schema = UserSchema(many=True)


