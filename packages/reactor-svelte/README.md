# reactor-svelte

Reactive state manager based on Flutter Bloc library using Svelte stores

![npm version](https://badgen.net/npm/v/@web-pacotes/reactor-svelte) ![npm total downloads](https://badgen.net/npm/dt/@web-pacotes/reactor-svelte) ![bundlephobia bundle size](https://badgen.net/bundlephobia/min/@web-pacotes/reactor-svelte)

---

## How to use

First, install the dependency using your package manager:

```shell
npm i @web-pacotes/reactor-svelte
```

Now create your first reactor:

```typescript
// counter-reactor.ts

type CounterEvent = 'inc' | 'dec';
type CounterState = number;

export class CounterReactor extends Reactor<CounterEvent, CounterState> {
	constructor() {
		super(0);

		this.on(
			(event, emit) => {
				switch (event) {
					case 'inc':
						emit(this.state + 1);
						break;
					case 'dec':
						emit(this.state - 1);
						break;
				}
			},
			(event) => event !== undefined
		);
	}
}
```

On your Svelte component/page, instantiate the reactor and react to state changes:

```sveltehtml

<script lang="ts">
	import { CounterReactor } from './counter-reactor';

	const counter = new CounterReactor();
</script>

<div>
	Counter: {$counter}
	<div>
		<button on:click={() => counter.add('inc')}>+</button>
		<button on:click={() => counter.add('dec')}>-</button>
	</div>
</div>
```

## Features

Currently, the package provides APIs for:

- implementing new reactors
- providing reactors to child components ([ReactorProvider](src/lib/provider.svelte))
- resolving reactors from parent components ([resolve](src/lib/provider.ts))
- listening to reactor state changes ([ReactorListener](src/lib/reactor.svelte))

### Upcoming features

In the future I plan to bring:

- providing multiple reactors from a single parent component
- globally observe reactor events and states

---

## Bugs and Contributions

Found any bug (including typos) in the package? Do you have any suggestion
or feature to include for future releases? Please create an issue via
GitHub in order to track each contribution. Also, pull requests are very
welcome!

To contribute, start by setting up your local development environment. The [setup.md](setup.md) document will onboard
you on how to do so!
