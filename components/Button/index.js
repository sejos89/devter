import { colors } from '../../styles/theme.js';

export default function Button({ children, onClick, disabled }) {
  return (
    <>
      <button disabled={disabled} onClick={onClick}>
        {children}
      </button>
      <style jsx>
        {`
          button {
            align-items: center;
            background: ${colors.black};
            border-radius: 9999px;
            border: 0;
            color: ${colors.white};
            cursor: pointer;
            display: flex;
            font-size: 16px;
            font-weight: 800;
            padding: 8px 24px;
            transition: opacity 0.3s ease;
            user-select: none;
          }

          button[disabled] {
            pointer-events: none;
            opacity: 0.2;
          }

           {
            /* Con global le estamos indicando que el svg viene de un contexto global y no de este componente */
            /* Con el > indicamos a css que solo busque en los hijos de primer nivel, asi no busca en todo el arbol de descendientes de button y será mas eficiente*/
          }
          button > :global(svg) {
            margin-right: 8px;
          }

          button:hover {
            opacity: 0.7;
          }
        `}
      </style>
    </>
  );
}
