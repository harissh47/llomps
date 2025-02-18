from functools import wraps
from flask import current_app, request
from flask_restful import Resource, reqparse
from extensions.ext_database import db
from libs.helper import email, str_len
from libs.password import valid_password
from models.model import DifySetup
from services.account_service import AccountService, RegisterService, TenantService
from . import api
from .error import AlreadySetupError, NotInitValidateError, NotSetupError
from .init_validate import get_init_validate_status
from .wraps import only_edition_self_hosted
class SetupApi(Resource):

    def get(self):
        if current_app.config['EDITION'] == 'SELF_HOSTED':
            setup_status = get_setup_status()
            if setup_status:
                return {
                    'step': 'finished',
                    'setup_at': setup_status.setup_at.isoformat()
                }
            return {'step': 'not_started'}
        return {'step': 'finished'}

    @only_edition_self_hosted
    def post(self):
        # is set up
        if get_setup_status():
            raise AlreadySetupError()

        # is tenant created
        tenant_count = TenantService.get_tenant_count()
        if tenant_count > 0:
            raise AlreadySetupError()
    
        if not get_init_validate_status():
            raise NotInitValidateError()

        parser = reqparse.RequestParser()
        parser.add_argument('email', type=email,
                            required=True, location='json')
        parser.add_argument('name', type=str_len(
            30), required=True, location='json')
        parser.add_argument('password', type=valid_password,
                            required=True, location='json')
        args = parser.parse_args()

        # Register
        account = RegisterService.register(
            email=args['email'],
            name=args['name'],
            password=args['password']
        )

        TenantService.create_owner_tenant_if_not_exist(account)

        setup()
        AccountService.update_last_login(account, request)

        return {'result': 'success'}, 201

class GuestTenantApi(Resource):
    @only_edition_self_hosted
    def post(self):
        # if get_setup_status():
        #     raise AlreadySetupError()
        
        parser = reqparse.RequestParser()
        parser.add_argument('email', type=email, required=True, location='json')
        parser.add_argument('name', type=str_len(30), required=True, location='json')
        parser.add_argument('password', type=valid_password, required=True, location='json')
        args = parser.parse_args()

        guestAccount = RegisterService.guestregister(
            email=args['email'],
            name=args['name'],
            password=args['password']
        )

        TenantService.create_guest_tenant_if_not_exist(guestAccount)

        AccountService.update_last_login(guestAccount, request)
        return {'result' : 'success'}, 201

def setup():
    dify_setup = DifySetup(
        version=current_app.config['CURRENT_VERSION']
    )
    db.session.add(dify_setup)


def setup_required(view):
    @wraps(view)
    def decorated(*args, **kwargs):
        # check setup
        if not get_init_validate_status():
            raise NotInitValidateError()
        
        elif not get_setup_status():
            raise NotSetupError()

        return view(*args, **kwargs)

    return decorated


def get_setup_status():
    if current_app.config['EDITION'] == 'SELF_HOSTED':
        return DifySetup.query.first()
    else:
        return True

class NewWorkspaceOwner(Resource):  
    @only_edition_self_hosted  
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email', type=email, required=True, location='json')
        parser.add_argument('name', type=str_len(30), required=True, location='json')
        parser.add_argument('password', type=valid_password, required=True, location='json')
        args = parser.parse_args()

        ownerAccount = RegisterService.guestregister(
            email=args['email'],
            name=args['name'],
            password=args['password'],
            # role='owner'  
        )
        TenantService.create_workspace_owner(ownerAccount)
        AccountService.update_last_login(ownerAccount, request)
        return {'message': 'Workspace owner created successfully'}, 201



api.add_resource(NewWorkspaceOwner, '/newworkspaceowner')
api.add_resource(SetupApi, '/setup')
api.add_resource(GuestTenantApi, '/guesttenantapi')