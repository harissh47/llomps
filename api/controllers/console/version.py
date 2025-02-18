
import json
import logging

import requests
from flask import current_app
from flask_restful import Resource, reqparse

from . import api


class VersionApi(Resource):

    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('current_version', type=str, required=True, location='args')
        args = parser.parse_args()
        # check_update_url = current_app.config['CHECK_UPDATE_URL']

        result = {
            'version': current_app.config['CURRENT_VERSION'],
            'release_date': '',
            'release_notes': '',
            'can_auto_update': False,
            'features': {
                'can_replace_logo': current_app.config['CAN_REPLACE_LOGO'],
                'model_load_balancing_enabled': current_app.config['MODEL_LB_ENABLED']
            }
        }

        # if not check_update_url:
        #     return result

        # try:
        #     response = requests.get(check_update_url, {
        #         'current_version': args.get('current_version')
        #     })
        # except Exception as error:
        #     logging.warning("Check update version error: {}.".format(str(error)))
        #     result['version'] = args.get('current_version')
        #     return result

        # content = json.loads(response.content)
        # result['version'] = content['version']
        # result['release_date'] = content['releaseDate']
        # result['release_notes'] = content['releaseNotes']
        # result['can_auto_update'] = content['canAutoUpdate']
        return result


api.add_resource(VersionApi, '/version')
