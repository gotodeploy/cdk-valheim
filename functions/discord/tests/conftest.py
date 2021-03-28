import os
from unittest import mock
import pytest


@pytest.fixture(autouse=True)
def mock_env_vars():
    with mock.patch.dict(
        os.environ,
        {
            "ECS_CLUSTER_ARN": "",
            "ECS_SERVICE_NAME": "",
        },
    ):
        yield


@pytest.fixture
def app(mocker):
    mocker.patch("discord_interactions.verify_key")
    from handler.index import app as flask_app  # noqa

    yield flask_app


@pytest.fixture
def client(app):
    return app.test_client()


@pytest.fixture
def request_json():
    return {
        "type": 2,
        "token": "A_UNIQUE_TOKEN",
        "member": {
            "user": {
                "id": 887242693170696614,
                "username": "Bot",
                "avatar": "a_7145b28e67ce17e702c94dc698e9f825",
                "discriminator": "1337",
                "public_flags": 131141,
            },
            "roles": ["897816957638698436"],
            "premium_since": None,
            "permissions": "2147483647",
            "pending": False,
            "nick": None,
            "mute": False,
            "joined_at": "2017-03-13T19:19:14.040000+00:00",
            "is_pending": False,
            "deaf": False,
        },
        "id": "779936466792816595",
        "guild_id": "541769547928249797",
        "data": {
            "options": [{"name": "status", "value": "status"}],
            "name": "cardsearch",
            "id": "822288867403605889",
        },
        "channel_id": "676393029849365283",
    }
