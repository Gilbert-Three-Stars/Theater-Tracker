"""numScreens not optional

Revision ID: d4e722cce714
Revises: 3541e017316f
Create Date: 2025-01-16 15:38:18.409142

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd4e722cce714'
down_revision = '3541e017316f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('theater', schema=None) as batch_op:
        batch_op.alter_column('numScreens',
               existing_type=sa.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('theater', schema=None) as batch_op:
        batch_op.alter_column('numScreens',
               existing_type=sa.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###
