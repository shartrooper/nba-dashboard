// Helper functions
const chainParamArguments = (args: string[]): string => {
  const re: RegExp = /(\$(\w+)):/;

  const paramArray = args
    .map((arg) => {
      const keyword = re.exec(arg);
      if (!keyword) return '';
      return keyword[0].replace(re, '$2: $1');
    })
    .filter((sentence) => sentence)
    .join();

  return paramArray.length ? `(${paramArray})` : paramArray;
};

const chainQueryArguments = (args: string[]): string => `(${args.join()})`;

// Utility functions
export const gqlQueryBuilder = (queryName: string, fields: string[], args?: string): string => {
  return `
        ${queryName}${args}{
            ${fields.join()}
        }
    `;
};

export const gqlQueryBuilderWithParsedArgs = (queryName: string, fields: string[], args?: string[]): string => {
  const params = args ? chainParamArguments(args) : '';
  return gqlQueryBuilder(queryName, fields, params);
};

export const queryArranger = (
  queries: string[],
  args?: string[],
  queryType: 'query' | 'mutation' = 'query'
): string => {
  const queryArguments = args ? chainQueryArguments(args) : '';
  return `${queryType} ${queryArguments}{
        ${queries.join(' ')}
    }`;
};

export const mapIntoValuesArray = <T, R extends number | string>(fields: { [key in keyof T]?: R }): R[] =>
  Object.entries(fields).reduce(
    (acc: R[], current: [key: string, value: unknown]): R[] => {
      const [, value] = current;
      return [...acc, value as R];
    },
    []
  );
