import { Reactor } from '../../../src';

type CounterEvent = 'inc' | 'dec'

type CounterState = number

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