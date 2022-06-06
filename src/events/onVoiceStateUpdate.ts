import { VoiceState } from "discord.js";
import redis from "../services/redis";

const onVoiceStateUpdate = (oldState: VoiceState, newState: VoiceState) => {
  if (newState.channelId) {
    if (oldState.channelId === null && oldState.id === newState.id) {
      redis.set(`joined:${newState.channelId}`, newState.id);
    }
  } else {
    redis.set(`left:${oldState.channelId}`, newState.id);
  }
};

export default onVoiceStateUpdate;
