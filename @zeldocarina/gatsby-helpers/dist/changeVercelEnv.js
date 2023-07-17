import axios from "axios";
import chalk from "chalk";
export const changeEnvInVercel = async ({ env, value, }) => {
    const API_ROOT = "https://api.vercel.com";
    const TEAM_ID = process.env.VERCEL_TEAM_ID;
    const vercelToken = process.env.VERCEL_TOKEN;
    try {
        console.log(`${API_ROOT}/v10/projects/${process.env.PROGRAMMATIC_BUSINESS_NAME}/env?teamId=${TEAM_ID}`);
        await axios.post(`${API_ROOT}/v10/projects/${process.env.PROGRAMMATIC_BUSINESS_NAME}/env?teamId=${TEAM_ID}`, {
            key: env,
            value: value,
            type: "encrypted",
            target: ["production", "preview", "development"],
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${vercelToken}`,
            },
        });
    }
    catch (error) {
        if (error.response.data.error.code === "ENV_ALREADY_EXISTS" ||
            error.response.data.error.code === "ENV_CONFLICT") {
            try {
                console.log(chalk.yellow("warning ") +
                    "env already exists in Vercel, creating a new one...");
                // FInd the existing env variable
                const existingEnv = await axios.get(`${API_ROOT}/v10/projects/wintergreen-${process.env.PROGRAMMATIC_BUSINESS_NAME}/env?teamId=${TEAM_ID}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${vercelToken}`,
                    },
                });
                const existingEnvVariable = existingEnv.data.envs.find((existingEnv) => existingEnv.key === env);
                // Replace the env variable with the new one
                await axios({
                    method: "PATCH",
                    url: `${API_ROOT}/v10/projects/wintergreen-${process.env.PROGRAMMATIC_BUSINESS_NAME}/env/${existingEnvVariable.id}?teamId=${TEAM_ID}`,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${vercelToken}`,
                    },
                    data: {
                        value: value,
                        type: "encrypted",
                        target: ["production", "preview", "development"],
                    },
                });
                console.log(chalk.green("success ") + "env successfully updated in Vercel.");
                return;
            }
            catch (error) {
                console.log(chalk.red("error ") + "error updating env in Vercel");
                console.log(error.message);
                console.log(error.response.data.error);
                process.exit(1);
            }
        }
        else {
            console.log(env, value);
            console.log(chalk.red("error ") + "error creating env in Vercel");
            console.log(error.message);
            console.log(error.response.data.error);
            process.exit(1);
        }
    }
};
