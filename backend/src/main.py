import json
import os

from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from signal import signal, SIGINT
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(name)s]  [%(levelname)s] %(message)s')
logger = logging.getLogger(__name__)
# serve static file from build directory (React optimized production build) and serve static files without prefix "static"
app = Flask(__name__, static_folder="../../frontend/build", static_url_path="/")
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)
logger = app.logger

def signal_handler(sig, frame):
    """
    Handle signals. Especially important for Docker

    :param sig: singal
    :type sig: int
    :param frame: Frame
    :type frame: sys.FrameType
    :return:
    """
    logger.info("Received signal %s. Gracefully shutting down application...", str(sig))
    logger.info("Application shutdown.")
    exit(0)


signal(SIGINT, signal_handler)

@app.route('/')
def index():
    """
    Serve index.html so the react frontend can start up and take over.
    :return: index.html
    """
    return app.send_static_file("index.html")


@socketio.on("connect")
def on_connect(auth):
    """
    Callback triggered whenever a client connects to the WebSocket server.

    :param auth: authentication details
    :return:
    """
    logger.info("Client connected. Details: %s", str(auth))


@socketio.on("disconnect")
def on_disconnect():
    """
    Callback triggered whenever a client disconnects from the WebSocket server.

    :return:
    """
    logger.info("Client disconnected")


@socketio.on("/outlier-detection/result")
def handle_outlier_detection_result(msg):
    """
    Callback triggered whenever a message is sent to the "/outlier-detection/result" event

    :param msg: sent message
    :return:
    """
    logger.debug("Received message on %s", "/outlier-detection/result")
    logger.debug("Broadcast received message to %s", "/outlier-detection/result")
    parsed = json.loads(msg)
    parsed
    # broadcast the received message to all clients that are currently connected
    socketio.emit("/outlier-detection/result", msg, broadcast=True)


def read_server_config():
    """
    Read server configuration from environment variables.

    :return: hostname of server, port for server to listen on
    """
    hostname = os.getenv("HOSTNAME", "localhost")
    port = os.getenv("PORT", 5000)
    logger.info(
    """
    Server configuration:
        - Hostname: %s
        - Port: %s
    """, hostname, str(port))
    return hostname, port


if __name__ == '__main__':
    host, port = read_server_config()
    # start Flask app and the WebSocket server
    logger.info("Starting Flask and Socket.io WebSocket server on %s:%s", host, str(port))
    socketio.run(app, host, port)
