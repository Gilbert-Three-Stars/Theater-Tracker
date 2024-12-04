from typing import Optional
import sqlalchemy as sa
import sqlalchemy.orm as so
from app import db

class Theater(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    longitude: so.Mapped[float] = so.mapped_column()
    latitude: so.Mapped[float] = so.mapped_column()
    name: so.Mapped[str] = so.mapped_column(sa.String(100))
    address: so.Mapped[str] = so.mapped_column(sa.String(120))
    numScreens: so.Mapped[Optional[int]] = so.mapped_column()

    def __repr__(self) -> str:
        return '<Theater {}>'.format(self.name)