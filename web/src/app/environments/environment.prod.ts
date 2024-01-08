import {commonEnvironment} from "./environment.common";

const env: Partial<typeof commonEnvironment> = {
  production: true,
  isConsoleLoggingEnabled: false,
}

export const environment = Object.assign(commonEnvironment, env);
