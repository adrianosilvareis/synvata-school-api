export function getEnvOrDefault(envName: string, defaultValue: string): string {
  return process.env[envName] ?? defaultValue;
}

export const EXPRESS_PORT = Number(getEnvOrDefault('EXPRESS_PORT', '3000'));
