import {
  IntrospectionType,
  IntrospectionTypeRef,
  IntrospectionNonNullTypeRef,
  TypeKind,
} from 'graphql';

type GraphQLTypes =
  | IntrospectionType
  | IntrospectionNonNullTypeRef
  | IntrospectionTypeRef;

/**
 * Ensure we get the real type even if the root type is NON_NULL or LIST
 * @param {GraphQLType} type
 */
const getFinalType = (type: GraphQLTypes): IntrospectionType => {
  if (type.kind === TypeKind.NON_NULL || type.kind === TypeKind.LIST) {
    return getFinalType(type.ofType);
  }

  return type as IntrospectionType;
};

export default getFinalType;
