from app import app, db
import sqlalchemy as sa
import sqlalchemy.orm as so
from app.models import Theater
from webscraper import scraper

# To access, make sure you're in the pipenv virtual environment and activate the flask shell
# -> if not in the pipenv virtual environment, do:
# pipenv run flask shell
@app.shell_context_processor
def make_shell_context():
    return {'app': app, 'db': db, 'sa': sa, 'so': so, 'Theater': Theater, 'scraper': scraper}
