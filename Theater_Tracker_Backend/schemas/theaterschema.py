from marshmallow import Schema, fields
from userschema import UserSchema

class TheaterSchema(Schema):
    id = fields.Number()
    longitude = fields.Float()
    latitude = fields.Float()
    name = fields.Str()
    address = fields.Str()
    numScreens = fields.Number()
    users = fields.List(fields.Nested(UserSchema))