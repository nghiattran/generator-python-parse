# @name <%= app_name %>
# @description
# Models for UserControler.

from src.forms import \
    BaseGetForm,\
    BasePostForm,\
    BasePutForm,\
    BaseDeleteForm

class <%= endpoint %>GetForm(BaseGetForm):
	pass


class <%= endpoint %>PostForm(BasePostForm):
	pass


class <%= endpoint %>PutForm(BasePutForm):
	pass


class <%= endpoint %>DeleteForm(BaseDeleteForm):
	pass
