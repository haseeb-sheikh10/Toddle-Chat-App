import axios from "axios";

type Command = "zrange" | "sismember" | "get" | "smembers";

export const fetchRedis = async (
  command: Command,
  ...args: (string | number)[]
) => {
  const commandUrl = `${process.env.REDIS_URL}/${command}/${args.join("/")}`;
  const response = await axios(commandUrl, {
    headers: {
      Authorization: `Bearer ${process.env.REDIS_TOKEN}`,
      "Cache-Control": "no-store",
    },
  });

  if (!response?.status) {
    throw new Error(`Error Executing Redis Command: ${response.statusText}`);
  }

  return response.data.result;
};
