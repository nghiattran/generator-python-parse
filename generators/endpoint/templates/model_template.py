# @name <%= app_name %>
# @description
# Models for UserControler.

import json
from src.models import BaseModel


class <%= endpoint %>Model(BaseModel):
    _parse_class_name = '<%= table %>'
    pass