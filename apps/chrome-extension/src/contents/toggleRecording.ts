import { get } from 'svelte/store';
import type { Icon } from '~background/setIcon';
import { transcriptionTimeout } from '~constants/transcriptionTimeout';
import { writeTextToClipboard } from '~lib/apis/clipboard';
import { startRecording, stopRecording } from '~lib/recorder/mediaRecorder';
import { apiKey } from '~lib/stores/apiKey';
import { options } from '~lib/stores/options';
import { audioSrc, recordingState } from '~lib/stores/recordingState';
import { transcribeAudioWithWhisperApi } from '~lib/transcribeAudioWithWhisperApi';
import { sendMessageToBackground } from '~lib/utils/messaging';

type ToggleRecordingOptions = {
	switchIcon: (icon: Icon) => void;
	/** Called after text is successfully transcribed and (possibly) copied to clipboard */
	onSuccessfulTranscription: (text: string) => void;
};

type ToggleRecordingOffOptions = {
	apiKeyValue: string;
	cancelTranscription: boolean;
} & ToggleRecordingOptions;

export async function toggleOff({
	switchIcon,
	apiKeyValue,
	onSuccessfulTranscription,
	cancelTranscription
}: ToggleRecordingOffOptions) {
	try {
		const audioBlob = await stopRecording();
		console.debug('changing cursor to wait');
		document.body.style.cursor = 'wait';
		audioSrc.set(URL.createObjectURL(audioBlob));
		switchIcon('arrowsCounterclockwise');
		await recordingState.set('transcribing');
		if (!cancelTranscription) {
			console.debug('transcription not cancelled');
			const text = await transcribeAudioWithWhisperApi(audioBlob, apiKeyValue);
			console.debug('transcription:', text);
			writeTextToClipboardIfEnabled(text);
			// outputText.set(text);
			onSuccessfulTranscription(text);
		} else {
			console.debug(
				`Transcription cancelled due to timeout of ${transcriptionTimeout / 1000} seconds`
			);
		}
		document.body.style.cursor = 'auto';
	} catch (error) {
		console.error('Error occurred during transcription:', error);
	} finally {
		switchIcon('studioMicrophone');
		await recordingState.set('idle');
	}
}

let timer: NodeJS.Timeout | undefined;

export async function toggleRecording({
	switchIcon,
	onSuccessfulTranscription
}: ToggleRecordingOptions): Promise<void> {
	await apiKey.init();
	const apiKeyValue = get(apiKey);
	let cancel = false;

	if (!apiKeyValue) {
		alert('Please set your API key in the extension options');
		openOptionsPage();
		return;
	}
	// recording state is idle, start recording
	if (get(recordingState) === 'idle') {
		// recording state is idle, clearing pre-existing timer
		if (timer !== undefined) {
			console.debug('clearing timer');
			clearTimeout(timer);
		}
		console.debug('changing cursor to help');
		document.body.style.cursor = 'help';
		await startRecording();
		switchIcon('redLargeSquare');
		await recordingState.set('recording');
		// If the recording takes too long, cancel it
		timer = setTimeout(async () => {
			cancel = true;
			console.debug(`Transcription exceeded ${transcriptionTimeout / 1000} seconds, cancelling`);
			return await toggleOff({
				switchIcon,
				apiKeyValue,
				onSuccessfulTranscription,
				cancelTranscription: cancel
			});
		}, transcriptionTimeout);
	} else {
		// recording state is not idle, stop recording
		if (timer !== undefined) {
			console.debug('clearing timer');
			clearTimeout(timer);
		}
		return await toggleOff({
			switchIcon,
			apiKeyValue,
			onSuccessfulTranscription,
			cancelTranscription: cancel
		});
	}
}

function openOptionsPage() {
	sendMessageToBackground({ action: 'openOptionsPage' });
}

async function writeTextToClipboardIfEnabled(text: string) {
	await options.init();
	const { copyToClipboard } = get(options);
	if (!copyToClipboard) return;
	writeTextToClipboard(text);
}
