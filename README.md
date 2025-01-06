# Search-Agent

> [!WARNING]
> Dieses Projekt ist zum aktuellen Zeitpunkt möglicherweise unvollständig oder fehlerhaft.

## Einführung

Der **Search-Agent** ist ein Forschungsprojekt, das eine automatisierte, rekursive Online-Recherche anstrebt. Ziel ist es, generative KI-Modelle (am Beispiel GPT 4o) mit der Google-Suche zu kombinieren, um komplexe Rechercheaufträge automatisiert durchzuführen. Dabei wird das LLM von OpenAI genutzt, um Suchbegriffe zu optimieren, Ergebnisse zu analysieren und relevante Informationen strukturiert bereitzustellen.

Initial stellt der Anwender eine Rechercheanfrage in natürlicher Sprache über ein Web Dashboard.

Der Search-Agent übernimmt folgende Schritte:

1. Die Rechercheanfrage wird auf einen sinnvollen Google-Suchbefehl abstrahiert.
2. Die Google-Suche wird ausgeführt, und die Ergebnisse werden KI-gerecht reduziert.
3. Das LLM analysiert die Ergebnisse und wählt die relevanteste Quelle aus.
4. Die Inhalte der ausgewählten Quelle werden abgerufen und erneut analysiert.
5. Falls das gewünschte Ergebnis nicht gefunden wird, setzt der Agent die Suche rekursiv fort, bis eine Antwort gefunden oder eine vordefinierte Suchtiefe/Suchzeit erreicht ist. Dabei kann die Suche in der Breite als auch in die Tiefe erfolgen.
6. Mit jedem weiteren Suchauftrag, wird der Kontext erweitert, um alle analysierten Inhalte für ein Rechercheergebnis vorzuhalten.

Das Projekt soll die Frage beantworten, wie einfach sich mit aktueller Technologie ein manueller Rechereprozess über die Google Suche automatisieren lässt.

## Zielsetzung für MVP

- Einfache webbasierte Eingabemaske
- Einfaches NodeJS Backend
- Rekursion in der Breite (Agent folgt nur den direkten Suchergebnissen von Google)
- Limitation der Interationen

## Gütekriterien

- Anzahl an erforderlicher Tokens
- Anzahl an Suchaufträgen (Google API)

## Installation

### Voraussetzungen

1. **Node.js** (Version 16 oder höher).
2. **Google Cloud API-Schlüssel**:
   - Aktiviere die Google Custom Search JSON API in der [Google Cloud Console](https://console.cloud.google.com/).
   - Erstelle eine benutzerdefinierte Suchmaschine unter [Custom Search Engine](https://cse.google.com/cse/all).
   - Notiere den API-Schlüssel (`GOOGLE_API_KEY`) und die Suchmaschinen-ID (`SEARCH_ENGINE_ID`).

### Setup

1. **Repository klonen**:

```bash
git clone https://github.com/mgiesen/Search-Agent.git
cd search-agent
```

2. **Abhängigkeiten installieren**:

```bash
npm install
```

3. **.env-Datei konfigurieren**:
   Erstelle im Projektverzeichnis eine `.env`-Datei mit folgendem Inhalt:

```
GOOGLE_API_KEY=DeinGoogleAPIKey
SEARCH_ENGINE_ID=DeineSuchmaschinenID
```

4. **Server starten**:

```bash
node main.js
```

Der Server läuft unter `http://localhost:3000`.

> [!CAUTION]
> Dieses Projekt ist ausschließlich für Forschungszwecke gedacht. Es liegt in der Verantwortung des Nutzers, die rechtlichen Rahmenbedingungen für den Einsatz der Technologien zu prüfen. Der Begriff "Agent" wird hier im Sinne eines autonomen Systems verwendet, das eigenständig Aufgaben ausführt und Entscheidungen trifft.
