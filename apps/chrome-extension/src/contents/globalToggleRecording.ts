import { toggleRecording } from './toggleRecording';
import type { PlasmoCSConfig } from 'plasmo';
import type { Icon } from '~background/setIcon';
import { writeTextToClipboard, writeTextToCursor } from '~lib/apis/clipboard';
import { sendMessageToBackground, type MessageToContentScriptRequest } from '~lib/utils/messaging';

export const config: PlasmoCSConfig = {
	matches: ['<all_urls>'],
	exclude_matches: ['https://chat.openai.com/*']
};
let focusedItem = {
	element: null,
	x: 0,
	y: 0
};

chrome.runtime.onMessage.addListener(async function (message: MessageToContentScriptRequest) {
	if (message.command === 'toggle-recording')
		await toggleRecording({
			activeLocation: focusedItem,
			switchIcon: (icon: Icon) => sendMessageToBackground({ action: 'setExtensionIcon', icon }),
			onSuccessfulTranscription: (
				text: string,
				activeLocation: { element: HTMLElement | null; x: number; y: number }
			) => {
				console.debug('Recording toggled successfully');
				writeTextToClipboard(text);
				writeTextToCursor(text, activeLocation);
			}
		});
});

/**
 * Updates the focused element when a pointerdown event is triggered. Used to track location of cursor
 * @param {PointerEvent} event - The pointerdown event.
 * @returns {void}
 */
document.addEventListener('pointerdown', (event) => {
	focusedItem = {
		element: event.target,
		x: event.clientX,
		y: event.clientY
	};
	console.log('Focused element:', focusedItem);
});

document.addEventListener('keydown', (event) => {
	console.log('Mouse down:', focusedItem, event, event.target);
});
