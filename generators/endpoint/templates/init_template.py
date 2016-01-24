
class Base<%= endpoint %>Controller(BaseController):
    model = <%= endpoint %>Model()
    get_form = <%= endpoint %>GetForm
    put_form = <%= endpoint %>PutForm
    post_form = <%= endpoint %>PostForm
    delete_form = <%= endpoint %>DeleteForm
