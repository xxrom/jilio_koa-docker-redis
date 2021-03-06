import Koa from 'koa';
import logger from 'koa-morgan';
import env from 'dotenv';
import Redis from 'redis';
import bluebird from 'bluebird';

env.config()

bluebird.promisifyAll(Redis.RedisClient.prototype);
bluebird.promisifyAll(Redis.Multi.prototype);

const server = new Koa();
const redis = Redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

redis.set('test', 'redis data');


server
  .use(logger('tiny'))
  .use(async ctx => {
    ctx.body = await redis.getAsync('test');
    // ctx.body = 'HELLO!!!!444';
  })
  .listen(process.env.PORT, () => {
    console.log(`server okay ${process.env.PORT}`);
  });


