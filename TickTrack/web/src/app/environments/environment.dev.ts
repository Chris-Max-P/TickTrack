import {commonEnvironment} from "./environment.common";

const env: Partial<typeof commonEnvironment> = {
  isConsoleLoggingEnabled: true,
}

export const environment = Object.assign(commonEnvironment, env);
