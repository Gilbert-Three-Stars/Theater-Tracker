from app import app, db
from app.schemas import TheaterSchema
from app.models import Theater
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