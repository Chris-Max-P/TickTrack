import {commonEnvironment} from "./environment.common";

const env: Partial<typeof commonEnvironment> = {
  production: true,
}

export const environment = Object.assign(commonEnvironment, env);
