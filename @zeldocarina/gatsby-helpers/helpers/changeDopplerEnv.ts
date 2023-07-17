import axios, { AxiosResponse } from "axios";

const API_ROOT = "https://api.doppler.com/v3/configs/config/secrets";

interface ChangeEnvInDopplerOptions {
  project: string;
  config: string;
  secrets: {
    [key: string]: string;
  };
}

const changeEnvInDoppler: (options: ChangeEnvInDopplerOptions) => Promise<
  AxiosResponse<{
    raw: string;
    computed: string;
    note: string;
  }>
> = async ({ project, config, secrets }: ChangeEnvInDopplerOptions) => {
  const promise = axios({
    method: "POST",
    url: API_ROOT,
    data: {
      project: project,
      config: config,
      secrets: secrets,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DOPPLER_TOKEN}`,
    },
  });
  return promise;
};

export default changeEnvInDoppler;
