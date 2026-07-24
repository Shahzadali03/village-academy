"""create web_admissions table

Revision ID: a1b2c3d4e5f6
Revises: 6df69d976d20
Create Date: 2026-07-18 13:40:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = 'a1b2c3d4e5f6'
down_revision: Union[str, Sequence[str], None] = '6df69d976d20'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'web_admissions',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('student_name', sa.String(length=255), nullable=False),
        sa.Column('father_name', sa.String(length=255), nullable=False),
        sa.Column('phone', sa.String(length=20), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=True),
        sa.Column('address', sa.String(length=255), nullable=True),
        sa.Column('admission_category', sa.String(length=50), nullable=False),
        sa.Column('class_applying', sa.String(length=255), nullable=True),
        sa.Column('course_name', sa.String(length=255), nullable=True),
        sa.Column('preferred_batch', sa.String(length=100), nullable=True),
        sa.Column('previous_school', sa.String(length=255), nullable=True),
        sa.Column('message', sa.Text(), nullable=True),
        sa.Column('isActive', sa.Boolean(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.PrimaryKeyConstraint('id'),
    )


def downgrade() -> None:
    op.drop_table('web_admissions')
