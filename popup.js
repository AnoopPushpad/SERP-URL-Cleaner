document.addEventListener('DOMContentLoaded', () => {
	const toggleButton = document.getElementById('toggleButton');
	const urlInput = document.getElementById('urlInput');
	const cleanButton = document.getElementById('cleanButton');
	const result = document.getElementById('result');

	// Initialize button state
	chrome.storage.local.get('enabled', (data) => {
		toggleButton.textContent = data.enabled ? 'Click to Disable' : 'Click to Enable';
	});


	toggleButton.addEventListener('click', () => {
		chrome.runtime.sendMessage({
			action: 'toggleEnabled'
		}, (response) => {
			toggleButton.textContent = response.enabled ? 'Click to Disable' : 'Click to Enable';
		});
	});

	cleanButton.addEventListener('click', () => {
		const urlInputValue = urlInput.value;

		if (!urlInputValue) {
			result.textContent = 'Please enter a URL.';
			return;
		}

		const cleanedUrl = cleanUrl(urlInputValue);

		if (cleanedUrl) {
			urlInput.value = cleanedUrl;
			result.textContent = 'URL is Cleaned';
		} else {
			result.textContent = 'Invalid URL';
		}
	});

	function cleanUrl(url) {
		try {
			const urlObj = new URL(url);
			// If it's a Google search URL, only retain the 'q' parameter
			if (urlObj.hostname.includes("google.com") && urlObj.pathname === "/search") {
				const searchParams = new URLSearchParams(urlObj.search);
				const query = searchParams.get('q');
				// Encode the query parameter with spaces replaced by '+'
				const encodedQuery = encodeURIComponent(query).replace(/%20/g, '+');
				return `${urlObj.origin}${urlObj.pathname}?q=${encodedQuery}`;
			}
			// For other URLs, return only origin and pathname
			return `${urlObj.origin}${urlObj.pathname}`;
		} catch (e) {
			return null;
		}
	}

});