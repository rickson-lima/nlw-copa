import { api } from "./axios";

export async function getCounts() {
  const [poolCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      api.get("pools/count"),
      api.get("guesses/count"),
      api.get("users/count"),
    ]);

  return {
    poolCount: poolCountResponse.data.count,
    guessCount: guessCountResponse.data.count,
    userCount: userCountResponse.data.count,
  };
}
