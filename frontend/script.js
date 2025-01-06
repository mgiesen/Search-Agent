document.getElementById('search-btn').addEventListener('click', async () =>
{
    const query = document.getElementById('search-query').value.trim();

    if (!query)
    {
        alert('Bitte einen Suchbegriff eingeben.');
        return;
    }

    try
    {
        const response = await fetch('/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });

        if (!response.ok)
        {
            throw new Error('Fehler bei der Anfrage.');
        }

        const data = await response.json();
        const reducedData = reduceResponse(data);

        const results = document.getElementById('results');
        results.innerHTML = reducedData.results.length > 0
            ? reducedData.results.map(item => `
                    <div class="result-item">
                        <div class="result-title">
                            <a href="${item.link}" target="_blank">${item.title}</a>
                        </div>
                        <div class="result-snippet">${item.snippet || 'Keine Vorschau verfügbar'}</div>
                    </div>
                `).join('')
            : 'Keine Ergebnisse gefunden';

        const simplifiedJson = document.getElementById('simplified-json');
        simplifiedJson.value = JSON.stringify(reducedData, null, 2);
    } catch (error)
    {
        const results = document.getElementById('results');
        results.innerHTML = 'Es gab ein Problem bei der Suche. Bitte versuchen Sie es später erneut.';
        console.error('Fehler:', error);
    }
});

function reduceResponse(fullResponse)
{
    if (!fullResponse.result || !Array.isArray(fullResponse.result))
    {
        return { results: [] };
    }

    const reduced = fullResponse.result.map(item => ({
        title: item.title || "",
        link: item.link || "",
        snippet: item.snippet || ""
    }));

    return { results: reduced };
}
