# Authentication System

> **Terminal** npm i -D @babel/node @babel/preset-env

Babel analizza la struttura del codice JS (come un [Abstract Syntax Tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree)) alla ricerca di specifici construtti e applica una trasformazione a questi in modo da ottenere una sintassi eseguibile da runtime environment più datati. In Babel ogni trasformazione AST è impacchettata sotto forma di un _plugin_; un _preset_ consiste in una combinazione di plugins necessari a supportare un particolare environment. Ad esempio il _preset-es2015_ compila ES6(es2015) a ES5; _preset-es2016_ compila ES7(es2016) a ES6(es2015).

Il problema emerge dal fatto che browser e servers non sono allo stesos punto per quanto riguarda il supporto alle features di diverse ES. Di conseguenza alcune nuove features potrebbero non essere compilate se si sta utilizzando lo il preset errato. Una possibile soluzione potrebbe essere quella di compilare direttamente alla versione più bassa, la ES5; tuttavia così facendo si avrebbe in parte compilazione superflua.

Per ovviare a questa problematica gli sviluppatori di Babel hanno creato uno strumento molto utile: _preset-env_ compila a un minimo di ES5 ma può anche esaminare una versione runtime o browser e determinare quali plugins sono richiesti per quello specifico environment. Grazie ad esso è evitata una superflua compilazione del codice. _preset-env_ utilizza il data di _[compat-table]_(http://kangax.github.io/compat-table/es6/) per determinare quali features debbano essere trasformate in modo da poter essere eseguite all'interno di un particolare browser o versione.

_@babel/node_ è una una CLI (Command-Line Interface) che funziona esattamente come la CLI di Node.js ma con il benefit di compilare con i presets e plugins di Babel prima del run. Non è progettata per l'utilizzo in produzione in quanto pesante e utilizza molta memoria a causa del fatto che la cache è immagazzinata nella memoria. Per vedere come utilizzare Babel in un deployment in produzione vedi [qui](https://github.com/babel/example-node-server).

Quindi procedo alla configurazione di Babel creando a livello root il file `.babelrc`. Next cerca automaticamente un file così denominato e, se trovato, lo considera _source of truth_. Quindi, prima ancora di aggiungere eventuali presets, è necessario ripristinare il preset utilizzato di default, _next/babel_ (incluso in next). Nel file appena creato dunque:

```json
{
	"presets": ["next/babel", "@babel/preset-env"]
}
```

Grazie a questa operazione sarà supportata la forma `import [] from []` (in alternativa a `const [] = require([])`).

---

> **Terminal** npm i express

Utilizzo _express_ come framework per la costruzione del custom-server. Importo dunque express e next.

Per connettere il server alla next app importo next `const next = require('next')`, una funzione che presenta diverse opzioni.

1. `dev` (_Boolean_, default: `false`). Se _true_ lancia l'app in modalità dev. Quindi con `const dev = process.env.NODE_ENV !== 'production'` ottengo che `dev` è false solamente quando l'environment è `production`.
1. `dir` (_String_, default: `.`). Indica la posizione del progetto next.
1. `quiet` (_Boolean_, default: `false`). Se _true_ nasconde i messaggi contenenti informazioni riguardanti il server.
1. `conf` (_Object_, default: `{}`). Rappresenta lo stesso oggetto che andrà a comporre `next.config.js`.

TODO: next.config.js

Una volta definite le opzioni le passo come argomenti all'interno della funzione per inizializzare la nextApp. In questo caso è sufficiente solamente `dev`.
Quindi creo `server/index.js`:

```js
import express from 'express'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

const port = 3000

nextApp.prepare().then(() => {
	const app = express()

	app.get('/my-custom-route', (req, res) =>
		res.status(200).json({ hello: 'Hello, from the back-end world!' })
	)

	app.get('*', (req, res) => {
		return handle(req, res)
	})

	app.listen(port, (err) => {
		if (err) throw err
		console.log(`> Ready on localhost:${port}`)
	})
})
```

> **Terminal** npm i -D nodemon

E modifico in `package.json` lo script `"dev": "next dev"` a `"dev": "nodemon"`. Tuttavvia così facendo non sto dando alcuna indicazione a _nodemon_ su cosa guardare e cosa eseguire. Quindi creo a livello root `nodemon.json`:

```json
{
	"watch": ["server"],
	"exec": "cross-env NODE_ENV=development babel-node server/index.js",
	"ext": "js"
}
```

Quindi quando chiamo lo script `npm run dev` viene attivato _nodemon_ che esegue _babel/node_ (quindi node, ma con i presets e plugins di Babel) sul file specificato `server/index.js`. Inoltre viene impostat la variabile environment su `development`. Sarebbe bastato `set NODE_ENV=development` ma utilizzando `cross-env ...` (`npm i cross-env`) si ha la certezza che il comando sia riconosciuto su tutte le piattaforme. Quindi _nodemon_ riavvierà in automatico il server ogni volta che verrà salvata una modifica in un qualsiasi file con estenzione `js` contenuto all'interno della folder `server`.