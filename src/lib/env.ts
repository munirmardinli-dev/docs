export default class EnvManager {
	static getEnv<T extends string>() {
		return {
			NEXT_PUBLIC_UI_URL: (process.env.NEXT_PUBLIC_UI_URL ||
				'http://localhost:3000') as T
		};
	}
}
