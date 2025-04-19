export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CatGql = {
  __typename?: 'CatGql';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  position?: Maybe<Scalars['Int']['output']>;
  template?: Maybe<Scalars['Int']['output']>;
};

export type ObjCatGql = {
  __typename?: 'ObjCatGql';
  id: Scalars['ID']['output'];
};

export type ObjGql = {
  __typename?: 'ObjGql';
  cat: ObjCatGql;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  template?: Maybe<Scalars['Int']['output']>;
};

export type Query = {
  __typename?: 'Query';
  categories: Array<CatGql>;
  objects: Array<ObjGql>;
  years: Array<YearGql>;
};


export type QueryObjectsArgs = {
  where?: InputMaybe<ObjectsWhereInput>;
};

export type YearGql = {
  __typename?: 'YearGql';
  name: Scalars['String']['output'];
};

export type ObjectsWhereInput = {
  catId?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};
