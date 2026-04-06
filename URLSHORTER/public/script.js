const shortenForm = document.getElementById('shorten-form');
const longUrlInput = document.getElementById('long-url');
const shortenBtn = document.getElementById('shorten-btn');
const btnText = shortenBtn.querySelector('span');
const spinner = document.getElementById('shorten-spinner');
const resultContainer = document.getElementById('result-container');
const shortLinkEl = document.getElementById('short-link');
const copyBtn = document.getElementById('copy-btn');
const errorMessage = document.getElementById('error-message');

const analyticsForm = document.getElementById('analytics-form');
const shortIdInput = document.getElementById('short-id');
const analyticsResult = document.getElementById('analytics-result');
const totalClicksEl = document.getElementById('total-clicks');
const analyticsError = document.getElementById('analytics-error');

// Shorten URL Handlers
shortenForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Reset states
    errorMessage.classList.add('hidden');
    resultContainer.classList.add('hidden');
    setLoading(true);

    const url = longUrlInput.value.trim();

    try {
        const response = await fetch('/url', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to shorten URL');
        }

        // Show result
        const shortUrl = `${window.location.origin}/${data.id}`;
        shortLinkEl.href = shortUrl;
        shortLinkEl.textContent = shortUrl;
        resultContainer.classList.remove('hidden');
        longUrlInput.value = ''; // clear input

    } catch (error) {
        showError(errorMessage, error.message);
    } finally {
        setLoading(false);
    }
});

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(shortLinkEl.textContent).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('copied');
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.classList.remove('copied');
        }, 2000);
    });
});

// Analytics Handlers
analyticsForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Reset states
    analyticsError.classList.add('hidden');
    analyticsResult.classList.add('hidden');

    const shortId = shortIdInput.value.trim();
    // In case user pastes the full URL, extract the ID
    const extractedId = shortId.split('/').pop();

    try {
        const response = await fetch(`/url/analytics/${extractedId}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch analytics');
        }

        totalClicksEl.textContent = data.totalClicks;
        analyticsResult.classList.remove('hidden');

    } catch (error) {
        showError(analyticsError, error.message);
    }
});

// Helper functions
function setLoading(isLoading) {
    if (isLoading) {
        btnText.style.display = 'none';
        spinner.style.display = 'block';
        shortenBtn.disabled = true;
    } else {
        btnText.style.display = 'block';
        spinner.style.display = 'none';
        shortenBtn.disabled = false;
    }
}

function showError(element, msg) {
    element.textContent = msg;
    element.classList.remove('hidden');
}
