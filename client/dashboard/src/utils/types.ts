// Removes the 'optional' attributes from a type's properties
export type NoOptionals<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

// Filter out keys in mapped type
export type Filter<Obj extends Object, ValueType> = {
  [Key in keyof Obj
  as ValueType extends Obj[Key] ? Key : never]
  : Obj[Key]
}

export type UserCredentialsPayload = {
  readonly id?: string;
  readonly username?: string;
}