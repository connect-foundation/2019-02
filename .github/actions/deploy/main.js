#!/usr/bin/env node

const shelljs = require("shelljs");
const core = require("@actions/core");

const [
  SERVER_HOST,
  SERVER_USERNAME,
  SERVER_PASSWORD,
  SCRIPT_ALL_PATH,
] = getInputs();

const [
  SCRIPT_PATH,
  SCRIPT_NAME,
] = substrPathAndFile(SCRIPT_ALL_PATH);

const REMOTE_CMD = `cd ${SCRIPT_PATH} && bash -s < ${SCRIPT_NAME}`;
const SHELL_CMD = `sshpass -p ${SERVER_PASSWORD} ssh -o StrictHostKeyChecking=no ${SERVER_USERNAME}@${SERVER_HOST} "${REMOTE_CMD}"`;

shelljs.exec(SHELL_CMD);

function getInputs() {
  return [
    core.getInput("server-host"),
    core.getInput("server-username"),
    core.getInput('server-password'),
    core.getInput('script-path'),
  ];
}

function substrPathAndFile(path) {
  const i = path.lastIndexOf('/');
  const filePath = path.substring(0, i);
  const fileName = path.substring(i + 1);

  return [filePath, fileName];
}
