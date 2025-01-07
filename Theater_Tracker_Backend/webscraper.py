from app import app, db
from app.models import Theater
from bs4 import BeautifulSoup
import requests
import re
import random
import time

def scraper():
    app.app_context().push()
    pageNum = 1
    while(pageNum < 450):
        theaterRequest = requests.get('https://cinematreasures.org/theaters?page=' + str(pageNum) + '&status=open')
        if(theaterRequest.status_code != requests.codes.ok):
            break
        source = theaterRequest.text
        curSoup = BeautifulSoup(source, 'lxml')
        curTheaters = curSoup.find_all('tr', {'class': ['even location theater', 'location odd theater']})
        for theater in curTheaters:
            curLat = float(theater.get('data-lat'))
            curLon = float(theater.get('data-lng'))
            curName = theater.get('data-name')
            curAddress = re.sub('<br>', ' ', theater.get('data-address'))
            curNumScreens = int(theater.contents[7].text)
            curTheater = Theater(longitude=curLon, latitude=curLat, name=curName, address=curAddress, numScreens=curNumScreens)
            db.session.add(curTheater)
        time.sleep(1 + random.random())    
        pageNum += 1
    db.session.commit()   