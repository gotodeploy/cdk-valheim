from typing import Sequence
from dataclasses import dataclass
import logging

import boto3
from botocore.exceptions import ClientError

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

client = boto3.client("ecs")


@dataclass(frozen=True)
class ValheimCommandOptions:
    ecs_cluster_arn: str
    ecs_services: Sequence[str]
    ecs_desired_count: int = 1


@dataclass(frozen=True)
class ValheimCommand:
    options: ValheimCommandOptions

    def status(self, *args) -> str:
        """Describe ECS service status.

        Returns:
            str: Service status
        """

        content = "Could not get server status"

        try:
            resp = client.describe_services(
                cluster=self.options.ecs_cluster_arn,
                services=self.options.ecs_services,
            )
            desired_count = resp["services"][0]["desiredCount"]
            running_count = resp["services"][0]["runningCount"]
            pending_count = resp["services"][0]["pendingCount"]

            content = f"Desired: {desired_count} | Running: {running_count} | Pending: {pending_count}"

        except ClientError as e:
            logger.info("Could not get the server status")
            logger.info(e)

        return content

    def start(self, *args) -> str:
        content = "Starting the server"
        client.update_service(
            cluster=self.options.ecs_cluster_arn,
            services=self.options.ecs_services,
            desiredCount=self.options.ecs_desired_count,
        )

        return content

    def stop(self, *args) -> str:
        content = "Stopping the server"
        client.update_service(
            cluster=self.options.ecs_cluster_arn,
            services=self.options.ecs_services,
            desiredCount=0,
        )

        return content
