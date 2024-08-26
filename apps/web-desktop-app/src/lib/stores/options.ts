import { createStoreSyncedWithStorage } from './createStore';

type Options = {
	copyToClipboard: boolean;
	pasteContentsOnSuccess: boolean;
	currentGlobalShortcut: string;
};

const initialOptions: Options = {
	copyToClipboard: true,
	pasteContentsOnSuccess: false,
	currentGlobalShortcut: 'Control+A'
};

export const options = createStoreSyncedWithStorage<Options>({
	key: 'options',
	initialValue: initialOptions
});
