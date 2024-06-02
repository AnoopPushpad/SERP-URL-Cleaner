function cleanUrlWithFragment(url) {
	return url.split('#')[0];
}

function cleanUrlsOnPage() {
	const links = document.querySelectorAll('a[href*="#"]');
	links.forEach(link => {
		link.href = cleanUrlWithFragment(link.href);
	});
}

function checkAndCleanUrls() {
	chrome.storage.local.get('enabled', (data) => {
		if (data.enabled) {
			cleanUrlsOnPage();
		}
	});
}

window.addEventListener('load', checkAndCleanUrls);
document.addEventListener('DOMContentLoaded', checkAndCleanUrls);