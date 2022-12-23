// Removes the 'optional' attributes from a type's properties
export type NoOptionals<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

export type UserCredentialsPayload = {
  readonly id?: string;
  readonly username?:string;
}