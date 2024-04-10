import { Reactor } from '../reactor.js';

export class MultipleParameterConstructorReactor extends Reactor<void, string> {
	constructor(arg1: number, arg2: number) {
		super('');

		this.on<void>(
			(_, emit) => emit(`${arg1} | ${arg2}`),
			(event) => event !== undefined
		);
	}
}
