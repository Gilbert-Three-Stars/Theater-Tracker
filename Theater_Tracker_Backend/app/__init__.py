from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from flask_migrate import Migrate
from flask_cors import CORS

class Base(DeclarativeBase):
    pass

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
db = SQLAlchemy(model_class=Base)
db.init_app(app)
migrate = Migrate(app, db)


from app import routes, models