export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.ico"]),
	mimeTypes: {},
	_: {
		client: {"start":"_app/immutable/entry/start.BqmqEzoY.js","app":"_app/immutable/entry/app.BybzzFxG.js","imports":["_app/immutable/entry/start.BqmqEzoY.js","_app/immutable/chunks/entry.BnFJY_pK.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/entry/app.BybzzFxG.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/chunks/index.CDIhRLKe.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
