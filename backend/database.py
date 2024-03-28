from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError
from pydantic import BaseModel


class User(BaseModel):
    username: str
    email: str
    password: str
    phone: str


class Database:
    def __init__(self, uri: str):
        self.client = MongoClient(uri)
        self.db = self.client["user_reg"]
        self.collection = self.db["users"]
        self.collection.create_index(
            [("username", 1), ("email", 1), ("phone", 1)], unique=True
        )

    def add_user(self, user: User):
        try:
            self.collection.insert_one(user.dict())
            return True
        except DuplicateKeyError:
            return False
