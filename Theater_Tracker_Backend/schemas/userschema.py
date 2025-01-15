from marshmallow import Schema, fields
from theaterschema import TheaterSchema

class UserSchema(Schema):
    id = fields.Number()
    email = fields.Str()
    username = fields.Str()
    passwordHash = fields.Str()
    bookmarkedTheaters = fields.List(fields.Nested(TheaterSchema))