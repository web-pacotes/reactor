/**
 * An object that contains a property named 'type'. This property uniquely identifies a type among
 * other types that also contain the same property.
 */
type TypedObject = { type: string };

/**
 * Type guard for objects that represent their types via the `type` property.
 *
 * @param value - the object being type guarded
 * @param type - the name of the type that matches the object
 */
export function isTypedOf<T extends TypedObject>(value: TypedObject, type: T['type']): value is T {
	return value.type === type;
}
