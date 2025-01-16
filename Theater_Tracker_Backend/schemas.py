from marshmallow import Schema, fields


# Use lambda functions when you need two-way nesting or self-nesting
class TheaterSchema(Schema):
    id = fields.Number()
    longitude = fields.Float()
    latitude = fields.Float()
    name = fields.Str()
    address = fields.Str()
    numScreens = fields.Number()
    users = fields.List(fields.Nested(lambda: UserSchema()))

class UserSchema(Schema):
    id = fields.Number()
    email = fields.Str()
    username = fields.Str()
    passwordHash = fields.Str()
    bookmarkedTheaters = fields.List(fields.Nested(lambda: TheaterSchema()))