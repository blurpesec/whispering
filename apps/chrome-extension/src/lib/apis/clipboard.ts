/**
 * Writes the specified text to the user's clipboard without removing focus from the current input element.
 *
 * @param text - The text to write to the clipboard.
 */
export function writeTextToClipboard(text: string): void {
	try {
		copyToClipboard(text);
		console.debug('changing cursor to auto');
		document.body.style.cursor = 'auto';
		console.debug('changing cursor to auto');
	} catch (error) {
		console.error('Failed to write text to the clipboard:', error);
		console.debug('changing cursor to auto');

		document.body.style.cursor = 'auto';
	}
}

/**
 * Executes the copy command on the given textarea.
 *
 * @param {string} text - The text to copy to clipboard.
 * @throws {Error} If failed to execute the copy command.
 */
function copyToClipboard(text: string): void {
	navigator.clipboard.writeText(text).catch((e) => {
		console.error('Failed to write text to the clipboard:', e);
	});
}

/**
 * Restores focus to the previously focused element, if it exists.
 *
 * @param {HTMLElement | null} element - The previously focused element.
 */
function restorePreviousFocus(element: HTMLElement | null): void {
	if (element && typeof element.focus === 'function') {
		element.focus();
	}
}

function selectCursorElementInContentEditable(): Element {
	const selection = window.getSelection();
	let node: Element;

	if (selection.rangeCount > 0) {
		const range = selection.getRangeAt(0);
		const nodeItem = range.startContainer;
		// `node` is the specific inner element or text node
		// Traverse up to find the nearest element
		console.debug('nodeItem', nodeItem, nodeItem.nodeType);
		node = nodeItem as Element;
		let maxElems = 100;
		while (nodeItem && nodeItem.nodeType !== Node.ELEMENT_NODE) {
			node = nodeItem.parentNode as Element;
			if (maxElems == 0) {
				console.debug('maxElems reached');
				break;
			}
			maxElems--;
		}
		return node;
	}
	return node;
}

function selectActiveElement(): Element {
	function getDeepActiveElement(): Element {
		let activeElement = document.activeElement;
		// attempt to negotiate where contenteditable is true.
		activeElement = selectCursorElementInContentEditable();
		if (activeElement) {
			console.debug('activeElement in select 2', activeElement);
			return activeElement;
		}
		// attempt to negotiate using shadoroot.
		while (activeElement.shadowRoot && activeElement.shadowRoot.activeElement) {
			activeElement = activeElement.shadowRoot.activeElement;
		}

		return activeElement;
	}

	const deepestActiveElement = getDeepActiveElement();
	console.log('deepest active element', deepestActiveElement);
	return deepestActiveElement;
}

/**
 * Checks if the active element is the deepest element in the DOM tree.
 * @returns - True if the active element is the deepest, false otherwise.
 */
function isElementDeepest(activeElement: Element) {
	// Get the currently focused element

	// Function to check if an element is focusable
	function isFocusable(element) {
		if (element.tabIndex > -1 || element.contentEditable === 'true') return true;
		const focusableElements = [
			'a',
			'button',
			'input',
			'textarea',
			'select',
			'details',
			'[tabindex]:not([tabindex="-1"])'
		];
		return focusableElements.some((selector) => element.matches(selector));
	}

	// Function to check for focusable children
	function hasFocusableChild(element) {
		const allChildren = element.querySelectorAll('*');
		return Array.from(allChildren).some(isFocusable);
	}

	// Check if the active element is the deepest by seeing if it has no focusable children
	return !hasFocusableChild(activeElement);
}

/**
 * Insert the provided text at the cursor position in the currently active input element or append it
 * to the non-input active element.
 *
 * @param text - The text to be inserted.
 */
export function writeTextToCursor(text: string): void {
	const activeElement = selectActiveElement();
	console.debug('activeElement', activeElement);
	const isDeepest = isElementDeepest(activeElement);
	console.debug('isDeepest', isDeepest);
	if (!isHTMLElement(activeElement) || !isElementDeepest(activeElement)) return;

	if (isInputElement(activeElement)) {
		console.debug('activeElement is input element');
		handleInputElement(activeElement, text);
	} else if (isInnerElement(activeElement)) {
		console.debug('activeElement is inner element');
		handleInnerElement(activeElement, text);
	} else {
		console.debug('activeElement is non-input element');
		handleNonInputElement(activeElement, text);
	}
}

function isHTMLElement(element: unknown): element is HTMLElement {
	return element instanceof HTMLElement;
}

/**
 * Check if the given element is an input or textarea element.
 *
 * @param element - The HTML element to check.
 * @returns True if the element is an input or textarea element, false otherwise.
 */
function isInputElement(element: HTMLElement): element is HTMLInputElement | HTMLTextAreaElement {
	return element.tagName === 'INPUT' || element.tagName === 'TEXTAREA';
}

/**
 * Checks if the element is a div, p, or span element.
 *
 * @param element - The HTML element to check.
 * @returns - True if the element is a div, p, or span element, false otherwise.
 */
function isInnerElement(element: HTMLElement): boolean {
	return element.tagName === 'DIV' || element.tagName === 'P' || element.tagName === 'SPAN';
}

/**
 * Handle the insertion of text for inner elements.
 * @param element - The inner element.
 * @param text- The text to be inserted.
 * @returns - void
 */
function handleInnerElement(element: HTMLElement, text: string): void {
	console.log('element is editable?', element.isContentEditable);

	if (!element.isContentEditable) return;
	console.log('element is content editable', element.innerHTML, 'text', element.innerText);
	element.innerText += text;
}

/**
 * Handle the insertion of text for input and textarea elements.
 *
 * @param inputElement - The input element.
 * @param text - The text to be inserted.
 */
function handleInputElement(
	inputElement: HTMLInputElement | HTMLTextAreaElement,
	text: string
): void {
	const startPos = inputElement.selectionStart ?? 0;
	const endPos = inputElement.selectionEnd ?? 0;

	inputElement.focus();
	inputElement.setSelectionRange(startPos, endPos);

	// Use document.execCommand to insert the text, so it gets added to the undo stack
	document.execCommand('insertText', false, text);

	const event = new Event('input', { bubbles: true });
	inputElement.dispatchEvent(event);
}

/**
 * Handle the appending of text for non-input and non-textarea elements.
 *
 * @param element - The non-input element.
 * @param text - The text to be appended.
 */
function handleNonInputElement(element: HTMLElement, text: string): void {
	if (!element.isContentEditable) return;
	element.innerHTML += text;
}
