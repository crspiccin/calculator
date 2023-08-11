export default class InvalidPasswordException extends Error {
	constructor(msg: string) {
		super(msg);
		Object.setPrototypeOf(this, InvalidPasswordException.prototype);
	}
}
