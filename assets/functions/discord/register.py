"""
https://discord.com/developers/docs/interactions/slash-commands#registering-a-command
"""

import os

import requests

APPLICATION_ID = os.environ.get("APPLICATION_ID")
GUILD_ID = os.environ.get("GUILD_ID")
BOT_TOKEN = os.environ.get("BOT_TOKEN")

url = f"https://discord.com/api/v8/applications/{APPLICATION_ID}/guilds/{GUILD_ID}/commands"

json = {
    "name": "vh",
    "description": "Start, stop or get the status of the Valheim server",
    "options": [
        {
            "name": "valheim_server_controls",
            "description": "What do you want to do?",
            "type": 3,
            "required": True,
            "choices": [
                {
                    "name": "status",
                    "value": "status"
                },
                {
                    "name": "start",
                    "value": "start"
                },
                {
                    "name": "stop",
                    "value": "stop"
                }
            ]
        },
    ]
}

# For authorization, you can use either your bot token 
headers = {
    "Authorization": f"Bot {BOT_TOKEN}"
}

# or a client credentials token for your app with the applications.commands.update scope
# headers = {
#     "Authorization": "Bearer abcdefg"
# }

if __name__ == "__main__":
    r = requests.post(url, headers=headers, json=json)
    # print(dir(r))
    print(r.content)