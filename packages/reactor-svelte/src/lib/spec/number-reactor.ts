import { Reactor } from '../reactor.js';

export class NumberReactor extends Reactor<number, number> {
	constructor() {
		super(0);
	}
}
