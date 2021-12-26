import {Logger, pino} from 'pino';
import colorGreen from 'pino-pretty';
import * as path from 'path';
import fs from 'fs';
import {LOG_FILE_ALL, LOG_FILE_ERROR} from '../constants';
import {config} from './config'

const transport:pino.TransportTargetOptions[] = []


const logger:Logger = pino({
  transport:{
    targets: [{
      level: config.LOG_LEVEL as pino.LevelWithSilent,
      // target:'pino/file',
      target: 'pino-pretty',
      options:  {
        // destination: path.join(__dirname, LOG_FILE_ALL),
        mkdir: true,
        ignore: 'pid, hostname',
        translateTime: 'SYS:standard',
        colorize: true,
        // customPrettifiers: {
        //   time: (timestamp:Date) => `🕰 ${timestamp}`,
        //   // hostname: (hostname:any) => colorGreen(hostname)
        //   // query: prettifyQuery
        // },
        levelKey: 'level',
        }
    },
     {
      level: 'error',
      target: 'pino/file',
      options: { destination: path.join(__dirname, LOG_FILE_ERROR), mkdir: true}
    }
  ]
  }
})






export default logger;