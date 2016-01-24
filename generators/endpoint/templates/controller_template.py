# @name <%= app_name %>
# @description
# UserControler handles everything related to users' information from
# registration, verification, authenciation, ....

import json
from src.controllers import\
    Base<%= endpoint %>Controller
from src.models.authentication_model import\
    requires_auth,\
    check_all_request_limit

_parse_class_name = Base<%= endpoint %>Controller.model._parse_class_name


class <%= endpoint %>Controller(BaseUserController):
    pass