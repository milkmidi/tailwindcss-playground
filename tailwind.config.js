// https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js#L7
const plugin = require('tailwindcss/plugin');
const defaultConfig = require('tailwindcss/defaultConfig');

module.exports = {
  // https://tailwindcss.com/docs/just-in-time-mode
  mode: 'jit',
  purge: ["./public/**/*.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#0d6efd',
        danger: '#dc3545',
        warning: '#ffc107',
        info: '#0dcaf0',
        red: 'red',
      },
    },
  },
  variants: {
    extend: {
      // jit 模式下，加不加都沒差
      /* ...Object.keys(defaultConfig.variants).reduce((prev, key) => {
        prev[key] = ['children', 'important', 'logged-in', 'data-disabled', 'data-required'];
        // console.log(key, defaultConfig.variants[key]);
        return prev;
      }, {}), */
      // opacity: ['important', 'data-disabled', 'data-required'],
      /* opacity: ['important', 'disabled'],
      display: ['important', 'logged-in'],
      textColor: ['required', 'important'],
      fontSize: ['important'],
      borderRadius: ['important', 'disabled'], */
      // https://tailwindcss.com/docs/configuring-variants#default-variants-reference
    },
  },
  plugins: [
    plugin(({ addUtilities, addVariant, e, variants, addComponents, theme  })=> {
      
      const newUtilities = {
        '.skew-10deg': {
          transform: 'skewY(-10deg)',
        },
        '.skew-15deg': {
          transform: 'skewY(-15deg)',
        },
      }
      addUtilities(newUtilities);

      const buttons = {
        '.btn' : {
          display: 'inline-block',
          fontWeight: 400,
          lineHeight: 1.5,
          textAlign: 'center',
          verticalAlign: 'middle',
          userSelect: 'none',
          border: '1px solid transparent',
          padding: '0.375rem 0.75rem',
          fontSize: '1rem',
          borderRadius: '.25rem',
          border: '2px solid black',
        }
      }
      addComponents(buttons);

      /* addVariant('disabled', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`disabled${separator}${className}`)}:disabled`
        })
      }); */

      addVariant('data-disabled', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`data-disabled${separator}${className}`)}[data-disabled="true"]`;
        })
      });
      addVariant('data-required', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`data-required${separator}${className}`)}[data-required="true"]`;
        })
      });

      addVariant('logged-in', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `body[class*="logged-in"] .${e(`logged-in${separator}${className}`)}`
        })
      });

      addVariant('children', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`children${separator}${className}`)} > *`
        })
      });

      // https://github.com/neojp/tailwindcss-important-variant/blob/master/index.js
      addVariant('important', ({ container }) => {
        container.walkRules((rule) => {
          rule.selector = `.${rule.selector.slice(1)}\\!`;
          rule.walkDecls(decl => {
            decl.important = true;
          });
        });
      });
      
    })
  ],
};
