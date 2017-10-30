import Koa from 'koa';
import logger from 'koa-morgan';
import env from 'dotenv';
import Redis from 'redis';
import bluebird from 'bluebird';

bluebird.promisifyAll(Redis.RedisClient.prototype);
bluebird.promisifyAll(Redis.Multi.prototype);

const server = new Koa();
const redis = Redis.createClient();

server.use(logger('tiny')).listen(process.env.PORT);


