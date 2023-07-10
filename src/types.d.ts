/// <reference types="node" />

import { Client, Collection } from 'discord.js'

type ClientWithCommands = Client & { commands?: Collection<unknown, unknown> }
