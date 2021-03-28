from vh.commands import ValheimCommand, ValheimCommandOptions
import os
import logging

import awsgi
from discord_interactions import verify_key_decorator
from flask import Flask, jsonify, request

# Your public key can be found on your application in the Developer Portal
PUBLIC_KEY = os.environ.get("APPLICATION_PUBLIC_KEY")

options = ValheimCommandOptions(
    ecs_cluster_arn=os.environ["ECS_CLUSTER_ARN"],
    ecs_services=[os.environ["ECS_SERVICE_NAME"]],
    ecs_desired_count=int(os.environ.get("ECS_DESIRED_COUNT", 1)),
)
vh_command = ValheimCommand(options)

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

app = Flask(__name__)

# tell flask that we are serving that application at `/prod` (default for API Gateway)
# app.config["APPLICATION_ROOT"] = "/prod"


@app.route("/discord", methods=["POST"])
@verify_key_decorator(PUBLIC_KEY)
def index():
    logger.info(request.json)

    try:
        interaction_option = request.json["data"]["options"][0]["value"]
    except KeyError:
        logger.info("Could not parse the interaction option")
        interaction_option = "status"

    logger.info(f"Interaction: {interaction_option=}")

    content = getattr(vh_command, interaction_option)()

    return jsonify(
        {
            "type": 4,
            "data": {
                "tts": False,
                "content": content,
                "embeds": [],
                "allowed_mentions": {"parse": []},
            },
        }
    )


def handler(event, context):
    return awsgi.response(app, event, context, base64_content_types={"image/png"})
