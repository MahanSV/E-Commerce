import { createClient } from 'redis';
import env from '#substructure/env.ts';


interface RedisDataModel {
	specification: string;
}

const client = createClient({
	url: env.redisPath,
});
client.on('error', (err) => console.log('Redis Client Error', err));

const redisSet = async (redisDataModel: RedisDataModel): Promise<void> => {
	try {
		await client.connect();

		await client.set(redisDataModel.specification, JSON.stringify(redisDataModel));
	} catch (err) {
		throw err;
	} finally {
		await client.quit();
	}
};

const redisGet = async (key: string): Promise<string | null>  => {
	try {
		await client.connect();

		return await client.get(key);
	} catch (err) {
		throw err;
	} finally {
		await client.quit();
	}
};

const redisDel = async (redisDataModel: RedisDataModel): Promise<void> => {
	console.log(redisDataModel);
	try {
		await client.connect();
		await client.del(redisDataModel.specification);
	} catch (err) {
		throw err;
	} finally {
		await client.quit();
	}
};

export {
	redisSet,
	redisGet,
	redisDel,
};
