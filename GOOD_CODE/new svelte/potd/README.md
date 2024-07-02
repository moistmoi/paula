# - Astronomiebild des Tages (APOD) Projekt

Dieses Projekt zeigt Bilder und Videos von der NASA's Astronomy Picture of the Day (APOD) API an. Benutzer können ein Datum auswählen, um das entsprechende Bild oder Video zusammen mit der Erklärung anzuzeigen. Darüber hinaus können Benutzer ihre Lieblingsbilder und -videos der aktuellen und der vorherigen Woche ansehen.

# - Abhängigkeiten

Das Projekt verwendet die folgenden Abhängigkeiten:
- Svelte: Ein modernes JavaScript-Framework zum Erstellen von Benutzeroberflächen.
- Svelte SPA Router: Ein Svelte-Router zum Erstellen von Single-Page-Anwendungen.
- Axios: Ein auf Versprechen basierender HTTP-Client zum Durchführen von API-Anfragen.
- DaisyUI: Eine Tailwind CSS-Komponentenbibliothek zum schnellen Erstellen moderner Benutzeroberflächen.
- Tailwind CSS: Ein Utility-First-CSS-Framework zum schnellen Erstellen benutzerdefinierter Designs.

# - Installation und Einrichtung

Folgen Sie diesen Schritten, um das Projekt einzurichten und auszuführen:

1. **Repository klonen**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Abhängigkeiten installieren**
   Stellen Sie sicher, dass Node.js installiert ist. Führen Sie dann aus:
   ```bash
   npm install
   ```

3. **Umgebungsvariablen einrichten**
   Erstellen Sie eine `.env` Datei im Stammverzeichnis und fügen Sie Ihren NASA API-Schlüssel hinzu:
   ```
   VITE_API_KEY=Ihr_nasa_api_schlüssel
   ```

4. **Entwicklungsserver starten**
   ```bash
   npm run dev
   ```

5. **Projekt öffnen**
   Öffnen Sie Ihren Browser und navigieren Sie zu `http://localhost:5000`. Sie sollten das laufende Projekt sehen.

# - API-Informationen

Das Projekt verwendet die NASA's Astronomy Picture of the Day (APOD) API, um Bilder und Videos abzurufen. Sie können Ihren API-Schlüssel erhalten, indem Sie sich bei [NASA API](https://api.nasa.gov/) anmelden.

Das Projekt führt Anfragen an die APOD-API durch, um Bilder und Videos innerhalb eines bestimmten Datumsbereichs abzurufen. Die abgerufenen Daten enthalten den Medientyp (Bild oder Video), URL, Titel und Erklärung.

# - Projektstruktur und Navigation

* Übersicht:

1. **Startseite**: Zeigt ein zufälliges APOD-Bild oder Video zusammen mit der Erklärung an.
2. **Übersicht**: Zeigt Bilder und Videos der aktuellen und vorherigen Wochen an.
3. **Favoriten**: Zeigt Lieblingsbilder und -videos an, die Benutzer hinzugefügt haben.
4. **Geburtstagskarte**: Ermöglicht Benutzern die Auswahl eines Datums und die Anzeige des APOD-Bildes oder Videos für dieses Datum.

* Navigation:

1. **Startseite**: 
   - Zeigt ein zufälliges APOD-Bild oder Video an.
   - Bietet eine kurze Erklärung zum APOD.

2. **Übersicht**: 
   - Zeigt Bilder und Videos der aktuellen und vorherigen Wochen an.
   - Benutzer können auf ein Bild oder Video klicken, um mehr Details zu sehen und lustige Fakten zu lesen.

3. **Favoriten**: 
   - Zeigt Lieblingsbilder und -videos an.
   - Benutzer können auf ein Bild oder Video klicken, um mehr Details zu sehen und lustige Fakten zu lesen.
   - Benutzer können Elemente aus den Favoriten entfernen.

4. **Geburtstagskarte**: 
   - Ermöglicht Benutzern die Auswahl eines Datums mit einem Kalender-Input.
   - Ruft das APOD-Bild oder Video für das ausgewählte Datum ab und zeigt es an.

# - Zusätzliche Funktionen

* Modal-Ansicht:
Durch Klicken auf ein Bild oder Video wird ein Modal mit detaillierten Informationen und lustigen Fakten angezeigt, die von OpenAI's GPT-3.5 API generiert werden.

* Responsive Design:
Das Projekt ist responsive gestaltet und funktioniert gut auf verschiedenen Bildschirmgrößen.

* Favoritenverwaltung:
Benutzer können Bilder und Videos zu ihren Favoriten hinzufügen und ihre Favoritenliste verwalten.