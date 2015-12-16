from flask import\
    Flask
from flask_restful import\
    Api
from src.controllers.user_controller import \
    UsersController,\
    SignupController, \
    LoginController,\
    ResetpasswordController,\
    UserController
import redis

app = Flask(__name__)
app.redis = redis.StrictRedis(host='localhost', port=6379, db=0)
app.debug = True

api = Api(app, prefix="/api/")

api.add_resource(UsersController, 'users')
api.add_resource(UserController, 'users/<string:object_id>')

api.add_resource(LoginController, 'login')

api.add_resource(SignupController, 'signup')

api.add_resource(ResetpasswordController, 'resetpassword')

if __name__ == '__main__':
    app.run(debug=True)
