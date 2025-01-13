from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore
from apscheduler.executors.pool import ThreadPoolExecutor
from app import app
from flask_migrate import upgrade
from flask_migrate import downgrade
from webscraper import scraper

jobstores = {
    'default': SQLAlchemyJobStore(url=app.config['SQLALCHEMY_DATABASE_URI'])
}

executors = {
    'default': ThreadPoolExecutor(20)
}

job_defaults = {
    'coalesce': True,
    'max_instances': 3
}

sched = BlockingScheduler(jobstores=jobstores, executors=executors, job_defaults=job_defaults)
# TODO: Need to change how this works once I have added in the links.
@sched.scheduled_job('interval', minutes=2160)
def update_theaters():
    downgrade()
    upgrade()
    scraper()

sched.start()