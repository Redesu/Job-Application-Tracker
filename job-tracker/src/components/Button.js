import styled, { css } from "styled-components";

const variantStyles = {
  default: css`
    background: #2563eb;
    color: white;
    &:hover {
      background: #1d4ed8;
    }
  `,
  
  delete: css`
    background: #ef4444;
    color: white;
    &:hover {
      background: #dc2626;
    }
  `,

  edit: css`
    background: #f59e0b;
    color: white;
    &:hover {
      background: #d97706;
    }
  `
}

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  border: none;
  transition: background 0.2s;
  cursor: pointer;
  position: static;
${({ variant}) => variantStyles[variant || 'default']}
`;
export default Button