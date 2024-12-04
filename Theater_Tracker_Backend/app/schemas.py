from marshmallow import Schema, fields

class TheaterSchema(Schema):
    id = fields.Number()
    longitude = fields.Float()
    latitude = fields.Float()
    name = fields.Str()
    address = fields.Str()
    numScreens = fields.Number()