import Redis from "ioredis";
const redis = new Redis({ lazyConnect: true });

redis
  .on("connect", () => {
    console.log("Koakuma connected to redis.");
  })
  .on("error", (err) => {
    console.error("Koakuma redis connection error", err);
  })
  .on("reconnecting", () => {
    console.log("Koakuma reconnecting to redis!");
  })
  .on("close", () => {
    console.warn("Koakuma redis connection was closed");
  });

export default redis;
