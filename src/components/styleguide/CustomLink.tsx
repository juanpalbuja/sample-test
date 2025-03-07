import {
  LayoutServicePageState,
  Link,
  LinkField,
  LinkFieldValue,
  LinkProps,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';


type CustomLinkField = LinkField | LinkFieldValue;

type CustomLinkProps = {
  field: CustomLinkField;
} & LinkProps;

const getLinkValue = (linkField: CustomLinkField): LinkFieldValue => {
  return 'href' in linkField ? linkField : (linkField.value as LinkFieldValue);
};


const linksFixer = (
  field: CustomLinkField
): LinkFieldValue => {
  if (!field) return field;

  const value = getLinkValue(field);
  if (!value.href) return value;

  const indexOfQueryString = value.href.indexOf('?');
  const hasQueryString = indexOfQueryString !== -1;

  if (!hasQueryString) return value;

  let href = value.href;
  let querystring = '';

  if (hasQueryString) {
    querystring = href.substring(indexOfQueryString + 1);
    href = href.substring(0, indexOfQueryString);
  }

  const fixedLink = {
    ...value,
    href,
    querystring,
  };

  return fixedLink;
};

export const CustomLink = ({ field, ...props }: CustomLinkProps) => {
  const { sitecoreContext } = useSitecoreContext();
  const isEditMode = sitecoreContext?.pageState === LayoutServicePageState.Edit;

  // Do not alter the field value in edit mode
  if (isEditMode) {
    return <Link field={field} {...props} />;
  }

  const updatedField = {
    ...field,
    value: linksFixer(field),
  };

  return <Link field={updatedField} {...props} />;
};