from typing import Optional
import sqlalchemy as sa
import sqlalchemy.orm as so
from app import db

# used for bookmarking theaters.
# users and theaters have a many-to-many relationship
user_theater_association = sa.Table(
    "user_theater",
    db.Model.metadata,
    sa.Column('user_id', sa.Integer, sa.ForeignKey('user.id')),
    sa.Column('theater_id', sa.Integer, sa.ForeignKey('theater.id'))
)


# *** From Miguel Grinberg tutorial: ***
'''
Note that Flask-SQLAlchemy uses a "snake case" naming convention for database tables by default. 
For the User model above, the corresponding table in the database will be named user. 
For a AddressAndPhone model class, the table would be named address_and_phone. 
If you prefer to choose your own table names, you can add an attribute named __tablename__ to the model class, 
set to the desired name as a string.
'''


class Theater(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    longitude: so.Mapped[float] = so.mapped_column()
    latitude: so.Mapped[float] = so.mapped_column()
    name: so.Mapped[str] = so.mapped_column(sa.String(100))
    address: so.Mapped[str] = so.mapped_column(sa.String(120))
    numScreens: so.Mapped[Optional[int]] = so.mapped_column()
    # For a many-to-many relationship, secondary specifies the intermediary table, 
    # and is typically an instance of Table
    users: so.Mapped[Optional[list["User"]]] = so.relationship('User', secondary=user_theater_association, back_populates='user')

    def __repr__(self) -> str:
        return '<Theater {}>'.format(self.name)
    
class User(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    email: so.Mapped[Optional[str]] = so.mapped_column(sa.String(64), index=True, unique=True)
    username: so.Mapped[str] = so.mapped_column(sa.String(120), index=True, unique=True)
    password_hash: so.Mapped[str] = so.mapped_column(sa.String(256))
    bookmarkedTheaters: so.Mapped[Optional[list["Theater"]]] = so.relationship('Theater', secondary=user_theater_association, back_populates='theater')

    def __repr__(self) -> str:
        return '<User {}'.format(self.username)
    
# See: https://medium.com/@warrenzhang17/many-to-many-relationships-in-sqlalchemy-ba08f8e9ccf7
# Go to end of article for adding, querying, and removing associations.