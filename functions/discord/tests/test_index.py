import json


def test_ping(client):
    res = client.post(
        "/discord",
        headers={
            "X-Signature-Ed25519": "dummy",
            "X-Signature-Timestamp": "dummy",
        },
        json={"type": 1},
    )
    assert res.status_code == 200
    expected = {"type": 1}
    assert json.loads(res.get_data(as_text=True)) == expected


def test_status(mocker, client, request_json):
    from handler.index import ValheimCommand  # noqa

    mocker.patch.object(
        ValheimCommand, "status", return_value="Desired: 0 | Running: 1 | Pending: 0"
    )
    res = client.post(
        "/discord",
        headers={
            "X-Signature-Ed25519": "dummy",
            "X-Signature-Timestamp": "dummy",
        },
        json=request_json,
    )
    assert res.status_code == 200
    expected = {
        "type": 4,
        "data": {
            "tts": False,
            "content": "Desired: 0 | Running: 1 | Pending: 0",
            "embeds": [],
            "allowed_mentions": {"parse": []},
        },
    }
    assert json.loads(res.get_data(as_text=True)) == expected
