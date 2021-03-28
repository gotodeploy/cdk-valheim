import pytest

from vh.commands import client, ValheimCommand, ValheimCommandOptions


@pytest.mark.parametrize(
    ("desired_count", "running_count", "pending_count", "expected"),
    [
        (1, 0, 0, "Desired: 1 | Running: 0 | Pending: 0"),
        (0, 1, 0, "Desired: 0 | Running: 1 | Pending: 0"),
        (0, 0, 0, "Desired: 0 | Running: 0 | Pending: 0"),
    ],
)
def test_status(mocker, desired_count, running_count, pending_count, expected):
    """Test status command with parametrization."""
    options = ValheimCommandOptions("", "")
    command = ValheimCommand(options)
    mocker.patch.object(
        client,
        "describe_services",
        return_value={
            "services": [
                {
                    "desiredCount": desired_count,
                    "runningCount": running_count,
                    "pendingCount": pending_count,
                }
            ]
        },
    )
    assert command.status() == expected


def test_start(mocker):
    """Test start command."""
    options = ValheimCommandOptions("", "")
    command = ValheimCommand(options)
    mocker.patch.object(client, "update_service")
    assert command.start() == "Starting the server"


def test_stop(mocker):
    """Test stop command."""
    options = ValheimCommandOptions("", "")
    command = ValheimCommand(options)
    mocker.patch.object(client, "update_service")
    assert command.stop() == "Stopping the server"
