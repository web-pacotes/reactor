import { Reactor } from '../reactor.js';

export class CounterReactor extends Reactor<'inc' | 'dec', number> {
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
