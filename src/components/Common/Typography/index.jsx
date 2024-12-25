import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TYPOGRAPHY_STYLES = {
  title: 'text-32px font-semibold text-midnight-blue', // 32px/48px;
  subtitle: 'text-2xl font-semibold text-midnight-blue', // 24px/32px
  heading: 'text-xl font-semibold text-midnight-blue', // 20px/28px
  body: 'text-base font-normal text-midnight-blue', // 16px/24px
  caption: 'text-sm font-normal text-dark-gray',  // 14px/20px
  small: 'text-xs font-normal',  // 12px/16px
};

const Typography = ({ 
  variant = 'body', 
  as = 'p', 
  className, 
  children, 
  ...props 
}) => {
  const Tag = as; // Dynamically render an HTML tag (e.g., h1, h2, p, etc.)
  const typographyClass = TYPOGRAPHY_STYLES[variant];

  return (
    <Tag className={classNames(typographyClass, className)} {...props}>
      {children}
    </Tag>
  );
};

Typography.propTypes = {
  variant: PropTypes.oneOf(['title', 'subtitle', 'heading', 'body', 'caption']),
  as: PropTypes.string, 
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Typography;
