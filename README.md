# Readme

## Git commands

```bash
git pull origin main
git add .
git commit -m "Edit"
git push -u origin main
```
## Jekyll commands
```bash
bundle exec jekyll serve
```

 
## TO DO

- ✅ Implementazione di jekyll in locale, connessione a git motaggio prima 'impalcatura' del progetto
- ✅ Creare heroes con immagine bg caricata in html no in css
- ✅ implementare jekyll_picture_tag
- ✅ SEO strutturare la seo del sito, attenzione ai meta tags e alle immagini di anteprima '_incudes/seo.html'
- ✅ Completare la clonazione dei contenuti del sito
- 🔜 Editing di menu e footer per rispecchiare l'originale --> quasi fatto
- 🔜 analizzare e creare lo script di deploy [https://kiwi.Franco Trento.com/antonio/jekyll-Franco Trento/wiki/script-di-deploy](wiki)
- 🔜 Ideare uno script per effettuare il minify del sito di produzione [https://kiwi.Franco Trento.com/antonio/jekyll-Franco Trento/wiki/script-di-deploy](wiki)

### 1. Verifica se sei nella directory corretta
Assicurati di essere nella directory del progetto dove intendi configurare il repository Git. Usa il comando:
```bash
pwd
```
Questo comando mostrerà il percorso corrente. Assicurati che sia il percorso del tuo progetto.

### 2. Inizializza un repository Git
Se non hai ancora inizializzato Git nella directory, fallo con:
```bash
git init
```
Questo creerà una directory `.git` nel tuo progetto, rendendolo un repository Git.

### 3. Aggiungi il remote
Dopo aver inizializzato il repository, aggiungi il remote:
```bash
git remote add origin https://kiwi.Franco Trento.com/antonio/jekyll-Franco Trento.git
```

### 4. Conferma l'operazione
Per verificare che il remote sia stato aggiunto correttamente, usa:
```bash
git remote -v
```
Dovresti vedere qualcosa come:
```
origin  https://kiwi.Franco Trento.com/antonio/jekyll-Franco Trento.git (fetch)
origin  https://kiwi.Franco Trento.com/antonio/jekyll-Franco Trento.git (push)
```

### 5. Aggiungi file e fai il primo commit (se necessario)
Se è la prima configurazione del repository:
```bash
git add .
git commit -m "Initial commit"
```

### 6. Pusha al repository remoto
Infine, puoi caricare i tuoi file al repository remoto con:
```bash
git push -u origin main
```
### 7. recupera modifiche dal repository remoto

```bash
git pull origin main
```

Sostituisci `main` con il nome del branch principale se utilizzi un altro branch (es. `master`).
