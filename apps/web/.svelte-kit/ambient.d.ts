
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const COREPACK_ROOT: string;
	export const DEEPINFRA_API_KEY: string;
	export const MANPATH: string;
	export const DB_HOST: string;
	export const TERM_PROGRAM: string;
	export const DB_NAME: string;
	export const NODE: string;
	export const INIT_CWD: string;
	export const TURBO_INVOCATION_DIR: string;
	export const npm_package_devDependencies_typescript: string;
	export const DB_PASS: string;
	export const SHELL: string;
	export const TERM: string;
	export const npm_package_devDependencies_vite: string;
	export const DB_PORT: string;
	export const HOMEBREW_REPOSITORY: string;
	export const TMPDIR: string;
	export const npm_package_dependencies_svelte_sonner: string;
	export const TERM_PROGRAM_VERSION: string;
	export const npm_package_scripts_dev: string;
	export const MallocNanoZone: string;
	export const ORIGINAL_XDG_CURRENT_DESKTOP: string;
	export const ZDOTDIR: string;
	export const npm_package_private: string;
	export const npm_package_devDependencies__sveltejs_kit: string;
	export const npm_config_registry: string;
	export const ZSH: string;
	export const npm_package_devDependencies_unplugin_icons: string;
	export const USER: string;
	export const LS_COLORS: string;
	export const npm_package_scripts_check_watch: string;
	export const COMMAND_MODE: string;
	export const OPENAI_API_KEY: string;
	export const npm_config__registry: string;
	export const PNPM_SCRIPT_SRC_DIR: string;
	export const npm_package_devDependencies__sveltejs_adapter_static: string;
	export const npm_package_devDependencies_svelte_headless_table: string;
	export const SSH_AUTH_SOCK: string;
	export const __CF_USER_TEXT_ENCODING: string;
	export const npm_package_devDependencies_postcss: string;
	export const npm_package_devDependencies_tslib: string;
	export const npm_execpath: string;
	export const PAGER: string;
	export const npm_package_devDependencies_svelte: string;
	export const LSCOLORS: string;
	export const npm_package_dependencies__repo_services: string;
	export const npm_config_frozen_lockfile: string;
	export const PATH: string;
	export const npm_package_dependencies_svelte_french_toast: string;
	export const npm_config_engine_strict: string;
	export const COREPACK_ENABLE_DOWNLOAD_PROMPT: string;
	export const USER_ZDOTDIR: string;
	export const __CFBundleIdentifier: string;
	export const npm_config_auto_install_peers: string;
	export const PWD: string;
	export const npm_package_devDependencies_tailwindcss: string;
	export const npm_command: string;
	export const npm_package_scripts_preview: string;
	export const npm_lifecycle_event: string;
	export const LANG: string;
	export const npm_package_name: string;
	export const npm_package_devDependencies__sveltejs_vite_plugin_svelte: string;
	export const npm_config__codefi_registry: string;
	export const npm_package_dependencies_mode_watcher: string;
	export const NODE_PATH: string;
	export const npm_package_scripts_build: string;
	export const TURBO_HASH: string;
	export const VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
	export const XPC_FLAGS: string;
	export const npm_config_node_gyp: string;
	export const XPC_SERVICE_NAME: string;
	export const npm_package_version: string;
	export const npm_package_devDependencies__iconify_json: string;
	export const VSCODE_INJECTION: string;
	export const npm_package_devDependencies_autoprefixer: string;
	export const npm_package_devDependencies_svelte_check: string;
	export const HOME: string;
	export const SHLVL: string;
	export const npm_package_type: string;
	export const npm_package_dependencies__repo_ui: string;
	export const GOROOT: string;
	export const VSCODE_GIT_ASKPASS_MAIN: string;
	export const HOMEBREW_PREFIX: string;
	export const npm_package_dependencies_nanoid: string;
	export const LESS: string;
	export const LOGNAME: string;
	export const DB_USER: string;
	export const npm_package_dependencies_zod: string;
	export const npm_lifecycle_script: string;
	export const VSCODE_GIT_IPC_HANDLE: string;
	export const BUN_INSTALL: string;
	export const npm_config_user_agent: string;
	export const GIT_ASKPASS: string;
	export const HOMEBREW_CELLAR: string;
	export const INFOPATH: string;
	export const VSCODE_GIT_ASKPASS_NODE: string;
	export const npm_package_dependencies__epicenterhq_svelte_persisted_writable: string;
	export const npm_package_scripts_check: string;
	export const npm_package_dependencies_effect: string;
	export const COLORTERM: string;
	export const npm_node_execpath: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		COREPACK_ROOT: string;
		DEEPINFRA_API_KEY: string;
		MANPATH: string;
		DB_HOST: string;
		TERM_PROGRAM: string;
		DB_NAME: string;
		NODE: string;
		INIT_CWD: string;
		TURBO_INVOCATION_DIR: string;
		npm_package_devDependencies_typescript: string;
		DB_PASS: string;
		SHELL: string;
		TERM: string;
		npm_package_devDependencies_vite: string;
		DB_PORT: string;
		HOMEBREW_REPOSITORY: string;
		TMPDIR: string;
		npm_package_dependencies_svelte_sonner: string;
		TERM_PROGRAM_VERSION: string;
		npm_package_scripts_dev: string;
		MallocNanoZone: string;
		ORIGINAL_XDG_CURRENT_DESKTOP: string;
		ZDOTDIR: string;
		npm_package_private: string;
		npm_package_devDependencies__sveltejs_kit: string;
		npm_config_registry: string;
		ZSH: string;
		npm_package_devDependencies_unplugin_icons: string;
		USER: string;
		LS_COLORS: string;
		npm_package_scripts_check_watch: string;
		COMMAND_MODE: string;
		OPENAI_API_KEY: string;
		npm_config__registry: string;
		PNPM_SCRIPT_SRC_DIR: string;
		npm_package_devDependencies__sveltejs_adapter_static: string;
		npm_package_devDependencies_svelte_headless_table: string;
		SSH_AUTH_SOCK: string;
		__CF_USER_TEXT_ENCODING: string;
		npm_package_devDependencies_postcss: string;
		npm_package_devDependencies_tslib: string;
		npm_execpath: string;
		PAGER: string;
		npm_package_devDependencies_svelte: string;
		LSCOLORS: string;
		npm_package_dependencies__repo_services: string;
		npm_config_frozen_lockfile: string;
		PATH: string;
		npm_package_dependencies_svelte_french_toast: string;
		npm_config_engine_strict: string;
		COREPACK_ENABLE_DOWNLOAD_PROMPT: string;
		USER_ZDOTDIR: string;
		__CFBundleIdentifier: string;
		npm_config_auto_install_peers: string;
		PWD: string;
		npm_package_devDependencies_tailwindcss: string;
		npm_command: string;
		npm_package_scripts_preview: string;
		npm_lifecycle_event: string;
		LANG: string;
		npm_package_name: string;
		npm_package_devDependencies__sveltejs_vite_plugin_svelte: string;
		npm_config__codefi_registry: string;
		npm_package_dependencies_mode_watcher: string;
		NODE_PATH: string;
		npm_package_scripts_build: string;
		TURBO_HASH: string;
		VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
		XPC_FLAGS: string;
		npm_config_node_gyp: string;
		XPC_SERVICE_NAME: string;
		npm_package_version: string;
		npm_package_devDependencies__iconify_json: string;
		VSCODE_INJECTION: string;
		npm_package_devDependencies_autoprefixer: string;
		npm_package_devDependencies_svelte_check: string;
		HOME: string;
		SHLVL: string;
		npm_package_type: string;
		npm_package_dependencies__repo_ui: string;
		GOROOT: string;
		VSCODE_GIT_ASKPASS_MAIN: string;
		HOMEBREW_PREFIX: string;
		npm_package_dependencies_nanoid: string;
		LESS: string;
		LOGNAME: string;
		DB_USER: string;
		npm_package_dependencies_zod: string;
		npm_lifecycle_script: string;
		VSCODE_GIT_IPC_HANDLE: string;
		BUN_INSTALL: string;
		npm_config_user_agent: string;
		GIT_ASKPASS: string;
		HOMEBREW_CELLAR: string;
		INFOPATH: string;
		VSCODE_GIT_ASKPASS_NODE: string;
		npm_package_dependencies__epicenterhq_svelte_persisted_writable: string;
		npm_package_scripts_check: string;
		npm_package_dependencies_effect: string;
		COLORTERM: string;
		npm_node_execpath: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}