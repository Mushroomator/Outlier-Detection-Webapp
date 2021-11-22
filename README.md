![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)

# Outlier-Detection-Webapp
Webapp to display results of AI model which detects "outliers" to known images.

## Table of Contents
- [Outlier-Detection-Webapp](#outlier-detection-webapp)
  - [Table of Contents](#table-of-contents)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [License](#license)

## Frontend
The frontend is an React app which receives JSON data in real-time via a WebSocket connection and displays that data.
It will generally display the latest information but it will also hold a small history of the last few datasets it has received.

## Backend
The backend consists of a simple Flask application which runs a WebSocket server on port `5000`. Only the event `"/outlier-detection/result"` will be actively listened on and any message arriving there will be broadcasted to all clients. Those clients will i. a. be instances of the [fronted](#frontend) application.

## License
Copyright 2021 Thomas Pilz

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[https://www.apache.org/licenses/LICENSE-2.0](https://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

