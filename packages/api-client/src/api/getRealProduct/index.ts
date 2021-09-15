/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */

import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import query from './getRealProductQuery';
import { FetchResult } from 'apollo-link/lib/types';
import { GraphQlGetProductVariantParams } from '../../types';

export default async function getRealProduct(
  context: Context,
  params: GraphQlGetProductVariantParams,
  customQuery?: CustomQuery
): Promise<FetchResult> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  try {
    const response = await apolloClient.query({
      query,
      variables: params,
      fetchPolicy: 'no-cache'
    });

    return response.data;
  } catch (error) {
    if (error.graphQLErrors) {
      return {
        errors: error.graphQLErrors,
        data: null
      };
    }
    throw error.networkError?.result || error;
  }
}
