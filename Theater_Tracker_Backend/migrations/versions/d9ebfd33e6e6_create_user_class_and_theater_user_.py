"""create user class and theater/user relation

Revision ID: d9ebfd33e6e6
Revises: 34661d80c858
Create Date: 2025-01-13 12:14:31.421292

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd9ebfd33e6e6'
down_revision = '34661d80c858'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=64), nullable=False),
    sa.Column('username', sa.String(length=120), nullable=False),
    sa.Column('password_hash', sa.String(length=256), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_user_email'), ['email'], unique=True)
        batch_op.create_index(batch_op.f('ix_user_username'), ['username'], unique=True)

    op.create_table('user_theater',
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('theater_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['theater_id'], ['theater.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], )
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_theater')
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_user_username'))
        batch_op.drop_index(batch_op.f('ix_user_email'))

    op.drop_table('user')
    # ### end Alembic commands ###
