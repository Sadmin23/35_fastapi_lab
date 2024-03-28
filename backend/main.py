from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import Database, User

app = FastAPI()
db = Database(
    uri="mongodb+srv://sadmin:01704601664@cluster0.cjitxwo.mongodb.net/?retryWrites=true&w=majority"
)

origins = ["http://localhost/5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/users/")
async def create_user(user: User):
    if db.add_user(user):
        return {"message": "User created successfully"}
    else:
        raise HTTPException(status_code=400, detail="User already exists")
