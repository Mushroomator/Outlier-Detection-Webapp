FROM python:3.9-buster as base
# ----------
# 1. Stage
# ----------
FROM base as builder
ENV DUMB_INIT_VERSION=1.2.5
RUN mkdir /install
WORKDIR /install
COPY backend/requirements.txt /requirements.txt
# Install python dependencies
RUN pip install --prefix="/install" -r /requirements.txt
# install NodeJS and npm
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs
COPY frontend /frontend
WORKDIR /frontend
# Install frontend dependencies
RUN ["npm", "ci"]
# Build an optimized react app
RUN ["npm", "run", "build"] 
# download and install dumb-init using binaries (https://github.com/Yelp/dumb-init)
RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v${DUMB_INIT_VERSION}/dumb-init_${DUMB_INIT_VERSION}_x86_64 && \
    chmod +x /usr/local/bin/dumb-init

# ----------
# 2. Stage
# - Create user dedicated to run the application (security!)
# - Copy over dependencies
# - Copy over application code
# - Start program and let dumb-init handle PID 1 responsibilities
# ----------
FROM base
ENV USERNAME=pythonuser
ENV APP_HOME=/outlier-dection-webapp
# create special user to run the application to prevent running the application as root (security!)
RUN addgroup --system ${USERNAME} && \
    # no login shell; username, group
    useradd -s /sbin/nologin -g ${USERNAME} ${USERNAME}
# Copy over dumb-init binaries
COPY --from=builder /usr/local/bin/dumb-init /usr/local/bin/dumb-init
# Copy over dependencies
COPY --from=builder /install /usr/local
# Copy source code
COPY /backend/src ${APP_HOME}/backend/src
# Copy over built React app
COPY --from=builder /frontend/build ${APP_HOME}/frontend/build
RUN chown -R ${USERNAME}:${USERNAME} /${APP_HOME}
WORKDIR ${APP_HOME}/backend/src
USER ${USERNAME}
# Start gunicorn
CMD ["/usr/local/bin/dumb-init", "python", "main.py"]