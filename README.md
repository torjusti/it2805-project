Prosjekt i webteknologi
=======================

Dette er IT2805-gruppeprosjektet til Torjus, Balázs, Johannes og Andreas.

Kjøring
-------

Alt som blir pushet til GitHub blir automatisk lastet opp på `gh-pages`. Dette vil si at en kopi av nettsiden er live [her](https://torjusti.github.io/it2805-project/index.html).

Byggesystem
-----------

Kommandoen `make compress` kan brukes til å lagre relevante dokumenter i en zip-fil, `make upload` laster filene opp til brukeren `torjusti` på NTNU sine nettsider, og `make clean` fjerner unødvendige filer.

For å komprimere bilder må du først laste ned pakkesystemet Yarn eller NPM og kjøre `yarn` i mappen med nettsidefilene. Deretter må du installere gulp globalt med `yarn global add gulp`. Til slutt kan du kjøre kommandoen `gulp minify` for å komprimere alle bildene automatisk. Legg til alle bilder i `img-orig`, da mappen `img` er automatisk generert.

Du kan også kjøre kommandoen `gulp watch` for live-reload, og automatisk PUG/SASS kompilering.
