import boto3
import io
import json
import smtplib
import os
import time
from botocore.client import Config
from datetime import datetime
from boto3.dynamodb.conditions import Key, Attr
from fastapi import Body, FastAPI, Request, Form, Response, File, UploadFile
from typing import List
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from fastapi.responses import HTMLResponse
from datetime import date, datetime
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

load_dotenv()

awsAccessKey = os.getenv('ACCESS_KEY')
awsSecretAccessKey = os.getenv('SECRET_ACCESS_KEY')
region = os.getenv('REGION')
bucketName = os.getenv('BUCKET')

dynamodb = boto3.resource('dynamodb', region_name=region,
         aws_access_key_id=awsAccessKey,
         aws_secret_access_key= awsSecretAccessKey)
table = dynamodb.Table(os.getenv('TABLE'))

s3Bucket = boto3.resource(service_name='s3', region_name=region, 
         aws_access_key_id=awsAccessKey, aws_secret_access_key=awsSecretAccessKey)

s3_client = boto3.client('s3', aws_access_key_id=awsAccessKey, aws_secret_access_key=awsSecretAccessKey, region_name=region)

app.add_middleware(
    CORSMiddleware,
    allow_origins="http://localhost:8000/",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NewMonster(BaseModel):
    PK: str | None = None
    name: str | None = None
    monsterClass: int | None = None
    size: int | None = None
    toughness: int | None = None
    intelligence: int | None = None
    riskFactor: int | None = None
    specialAbilityRating: int | None = None
    specialAbilities: str | None = ""
    notes: str | None = ""

@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    with open('static/index.html') as f:
        html = f.read()
    return HTMLResponse(content=html, status_code=200)

@app.get("/{index}", response_class=HTMLResponse)
async def index(request: Request):
    with open('static/index.html') as f:
        html = f.read()
    return HTMLResponse(content=html, status_code=200)

@app.get("/monsters/{monsterId}")
async def get_monsters(monsterId):
    if(monsterId == 'all'):
        monsters = table.scan()
    
    else:
        monsters = table.scan(
            FilterExpression=Attr('PK').eq(monsterId)
        )

    return monsters

@app.get("/monsterImage/{monsterId}")
async def get_monsters(monsterId):
    monster = table.scan(
        FilterExpression=Attr('PK').eq(monsterId)
    )
    fileName = monster['Items'][0]['Name'] + '.png'
    monsterImage = s3_client.generate_presigned_url('get_object',
                                                    Params={'Bucket': bucketName,
                                                            'Key': fileName},
                                                    ExpiresIn=600)
    return monsterImage

@app.post("/newMonster")
async def new_monster(newMonster: NewMonster):
    table.put_item(
        Item={
            'PK': newMonster.PK,
            'Name': newMonster.name,
            'MonsterClass': newMonster.monsterClass,
            'Size': newMonster.size,
            'Toughness': newMonster.toughness, 
            'Intelligence': newMonster.intelligence,
            'RiskFactor': newMonster.riskFactor,
            'SpecialAbilityRating': newMonster.specialAbilityRating,
            'SpecialAbilities': newMonster.specialAbilities,
            'Notes': newMonster.notes
        },
    )
    response = '{"message": "Monster created successfully", "success": "true"}'
    return Response(content=response, media_type="application/json")

@app.get("/searchMonsters/{search}")
async def get_patients(search):
    monsters = table.scan()
    searchResults = []
    
    for i in range(len(monsters['Items'])):
        name = monsters["Items"][i]['Name'].lower()
        if (name in search.lower()) or (search.lower() in name):
            searchResults.append(monsters["Items"][i])
    
    return searchResults