import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    # sqlite for local pipenv virtual environment.
    # heroku uses postgres://, but sqlalchemy expects postgresql:// url
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', '').replace('postgres://', 'postgresql://') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')