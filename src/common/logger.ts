import {TransportMultiOptions,Logger, pino} from 'pino';
import * as path from 'path';

const transport = pino.transport(<TransportMultiOptions>{
  targets: [{
    level: 'info',
    target: 'pino/file',
    // target: 'pino-pretty',
    options:  { destination: path.join(__dirname, '../logs/all.txt'), mkdir: true}
  }, {
    level: 'trace',
    target: 'pino/file',
    options: { destination: path.join(__dirname, '../logs/all.txt'), mkdir: true}
  }]
})
export default <Logger>pino(transport);