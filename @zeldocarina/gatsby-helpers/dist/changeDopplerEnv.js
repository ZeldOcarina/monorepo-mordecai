import axios from "axios";
const API_ROOT = "https://api.doppler.com/v3/configs/config/secrets";
const changeEnvInDoppler = async ({ project, config, secrets }) => {
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
