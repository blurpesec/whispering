export async function transcribeAudioWithWhisperApi(
	audioBlob: Blob,
	WHISPER_API_KEY: string
): Promise<string> {
	// Check if the size is less than 25MB
	if (audioBlob.size > 25 * 1024 * 1024)
		throw new Error('Please upload an audio file less than 25MB');

	const fileName = 'recording.wav';
	const wavFile = new File([audioBlob], fileName);
	const formData = new FormData();
	formData.append('file', wavFile);
	formData.append('model', 'whisper-1');
	let DEPLOY_ENV = 'PROD';
	if (process.env.DEPLOY_ENV === 'TEST') {
		DEPLOY_ENV = 'TEST';
	}
	if (DEPLOY_ENV === 'TEST') {
		return 'This is a test transcription';
	} else {
		const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${WHISPER_API_KEY}`
			},
			body: formData
		});

		const data = await response.json();

		if (!response.ok) throw new Error(data.error || 'Error transcribing the audio');

		return data.text;
	}
}
